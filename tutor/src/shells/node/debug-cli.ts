/**
 * The debug shell: a full tutoring session in the terminal.
 *
 * This exists because the harness's interesting logic is all decision-making —
 * the analyze_section gate, the repetition guard, the prep-skip rule, the
 * achievement gate — and putting that behind a browser UI first would make it
 * nearly untestable. Here every state change is visible as it happens.
 *
 *   npm run session -- --list --page ebooks/The_Road_to_Reality/chapter_27.md
 *   npm run session -- --page … --section 273-熵            # fake, deterministic
 *   npm run session -- --page … --section 273-熵 --live      # real endpoint
 *   npm run session -- --fixture test/fixtures/ch27-1.json
 *
 * Answers come from stdin. `?` asks for a hint, `.` opens the choice menu, and
 * a blank line at AWAIT_ANSWER submits an empty answer (which the grader will
 * score 0 — that is a legitimate path, not an error).
 */

import { createInterface } from 'node:readline/promises';
import { resolve } from 'node:path';
import { stdin, stdout, argv, env, exit } from 'node:process';

import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../../core/idb-store.ts';
import { HttpLlm } from '../../core/provider.ts';
import { TutorSession } from '../../core/session.ts';
import { sequentialIdGen, systemClock, type Llm, type SessionEvent } from '../../core/ports.ts';
import type { ExitChoice, Settings } from '../../core/types.ts';
import { FakeLlm, loadFixture, type Fixture } from './fake-llm.ts';
import { SourceContent } from './source-content.ts';
import { assertLiveReady, loadSettings, DEFAULT_SETTINGS_PATH } from './settings.ts';

// ---------------------------------------------------------------------------
// Terminal formatting
// ---------------------------------------------------------------------------

const useColor = stdout.isTTY && !env['NO_COLOR'];
const paint = (code: string) => (s: string) => (useColor ? `[${code}m${s}[0m` : s);
const dim = paint('2');
const bold = paint('1');
const red = paint('31');
const green = paint('32');
const yellow = paint('33');
const blue = paint('36');
const magenta = paint('35');

function say(text = ''): void {
  stdout.write(`${text}\n`);
}

function rule(label = ''): void {
  const line = '─'.repeat(Math.max(4, 68 - label.length));
  say(dim(label ? `── ${label} ${line}` : `──${line}────`));
}

// ---------------------------------------------------------------------------
// The live line — thinking counter and streamed prose
// ---------------------------------------------------------------------------

const ROLE_LABELS: Record<string, string> = {
  planner: '规划',
  questioner: '出题',
  grader: '评分',
  tutor_reply: '讲解',
  summarizer: '小结',
  router: '分流',
};

/**
 * Both the thinking counter and streamed prose write without a trailing newline,
 * so any other output would land on the same line. `endLive` closes it, and the
 * sink calls that first for every event that is not a delta.
 */
const live = { mode: 'idle' as 'idle' | 'thinking' | 'prose', role: '', tokens: 0 };

function liveReasoning(role: string, tokens: number): void {
  // Once prose has started the model has stopped thinking; a late counter update
  // would overwrite the text being read.
  if (live.mode === 'prose') return;
  live.role = ROLE_LABELS[role] ?? role;
  live.tokens = tokens;
  if (useColor) {
    stdout.write(`\r${dim(`  ${live.role}生成中… ${tokens} tokens`)}[K`);
  } else if (live.mode !== 'thinking') {
    // No cursor control in a pipe: announce once and let endLive report the total,
    // rather than writing one line per update into the log.
    stdout.write(dim(`  ${live.role}生成中…\n`));
  }
  live.mode = 'thinking';
}

function liveDelta(text: string): void {
  if (live.mode === 'thinking') stdout.write(useColor ? '\r[K' : '');
  if (live.mode !== 'prose') stdout.write('  ');
  stdout.write(text.replace(/\n/g, '\n  '));
  live.mode = 'prose';
}

function endLive(): void {
  if (live.mode === 'idle') return;
  if (live.mode === 'thinking') {
    if (useColor) stdout.write('\r[K');
    // The counter was transient; keep its final value so the transcript still
    // records what the turn cost.
    say(dim(`  ${live.role}生成 ${live.tokens} tokens`));
  } else {
    stdout.write('\n');
  }
  live.mode = 'idle';
  live.tokens = 0;
}

const CHIP_MARK: Record<string, string> = {
  passed: '✓',
  failed: '✗',
  current: '▶',
  skipped: '⤼',
  inserted: '↳',
  pending: '·',
};

function renderChips(chips: Array<{ title: string; state: string; inserted: boolean }>): string {
  return chips
    .map((c) => {
      const mark = CHIP_MARK[c.state] ?? '·';
      const text = `${mark} ${c.title}`;
      if (c.state === 'current') return bold(blue(text));
      if (c.state === 'passed') return green(text);
      if (c.state === 'failed') return red(text);
      if (c.state === 'skipped') return dim(text);
      return c.inserted ? magenta(text) : dim(text);
    })
    .join(dim(' │ '));
}

/** `showReasoning` controls only how much of a tool log line is printed. */
const ROUTE_LABELS: Record<string, string> = {
  answer: '评分',
  clarify: '解释题目',
  hint: '给提示',
  variant: '换一题',
  skip: '跳过本步',
  advance: '进入下一步',
  quit: '结束本节',
  too_hard: '退回前置知识',
  off_topic: '离题',
};

function makeSink(verbose: boolean) {
  return (event: SessionEvent): void => {
    // Anything other than the two live-line events terminates it, so nothing
    // ever prints into a half-written counter.
    if (event.type !== 'delta' && event.type !== 'reasoning') endLive();

    switch (event.type) {
      case 'reasoning':
        liveReasoning(event.role, event.tokens);
        break;
      case 'delta':
        liveDelta(event.text);
        break;
      case 'phase':
        say(dim(`[${event.state}] ${event.label}`));
        break;
      case 'steprail':
        say(`  ${renderChips(event.chips)}`);
        break;
      case 'plan':
        rule('计划');
        event.stepTitles.forEach((t, i) => say(`  ${i + 1}. ${t}`));
        say(dim(`  前置步骤：${event.prepIncluded ? '加入' : '跳过'} — ${event.reason}`));
        break;
      case 'planning-progress':
        say(dim(`  ${event.done ? '✓' : '…'} ${event.tool}${event.note ? ` — ${event.note}` : ''}`));
        break;
      case 'question':
        rule(`第 ${event.stepIndex + 1} 步 · ${event.stepTitle} · L${event.targetLevel}${event.variant > 0 ? ` · 变体 #${event.variant}` : ''}`);
        if (event.setup) say(dim(`  ${event.setup}`));
        say(bold(`  ${event.question}`));
        break;
      case 'evaluation': {
        const tag = event.passed ? green(`${event.score}/5 通过`) : red(`${event.score}/5 未通过`);
        rule(`评估 ${tag}`);
        say(`  ${event.evaluation}`);
        if (event.pointsHit.length) say(green(`  命中：${event.pointsHit.join('、')}`));
        if (event.pointsMissed.length) say(yellow(`  缺失：${event.pointsMissed.join('、')}`));
        break;
      }
      case 'hint':
        say(yellow(`  提示 ${event.used}/${event.cap}：${event.text}`));
        break;
      case 'reply':
        // Already on screen if it streamed; endLive above closed its last line.
        if (!event.streaming) say(`  ${event.text.replace(/\n/g, '\n  ')}`);
        break;
      case 'route': {
        // Always shown, not just under -v: a student needs to know their text was
        // read as a question rather than graded, and a live run needs misroutes
        // visible without a rerun.
        const label = ROUTE_LABELS[event.route] ?? event.route;
        const extra = verbose && event.secondary ? dim(` (+${event.secondary})`) : '';
        say(dim(`  → ${label}${event.reason ? `：${event.reason}` : ''}`) + extra);
        break;
      }
      case 'summary':
        rule('小结');
        say(`  ${event.text.replace(/\n/g, '\n  ')}`);
        if (event.strengths.length) say(green(`  已掌握：${event.strengths.join('、')}`));
        if (event.gaps.length) say(yellow(`  待补：${event.gaps.join('、')}`));
        for (const a of event.nextActions) {
          say(dim(`  → ${a.text}${a.sectionRef ? ` (${a.sectionRef})` : ''}`));
        }
        break;
      case 'achievement':
        rule('成就');
        say(`  ${bold(event.name)}${event.renamed ? dim(' (已改名避免重复)') : ''}`);
        say(`  ${event.description}`);
        say(dim(`  依据：${event.basis}`));
        break;
      case 'usage':
        say(
          dim(
            `  用量 ${event.budgetUsed}/${event.budgetTotal} 次 · ` +
              `prompt ${event.usage.promptTokens} · completion ${event.usage.completionTokens}` +
              (event.usage.reasoningTokens ? ` · reasoning ${event.usage.reasoningTokens}` : ''),
          ),
        );
        break;
      case 'notice': {
        const colour = event.level === 'error' ? red : event.level === 'warn' ? yellow : blue;
        say(colour(`  ! ${event.text}`));
        break;
      }
      case 'tool':
        if (event.ok) {
          if (verbose) say(dim(`  · ${event.role}/${event.tool} ok`));
        } else {
          say(red(`  · ${event.role}/${event.tool} 被拒绝`));
          for (const e of event.errors) say(red(`      ${e}`));
        }
        break;
    }
  };
}

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------

interface Args {
  page: string | null;
  section: string | null;
  fixture: string | null;
  live: boolean;
  list: boolean;
  verbose: boolean;
  settingsPath: string;
  repoRoot: string;
  help: boolean;
}

function parseArgs(rawArgs: string[]): Args {
  const args: Args = {
    page: null,
    section: null,
    fixture: null,
    live: false,
    list: false,
    verbose: false,
    settingsPath: DEFAULT_SETTINGS_PATH,
    repoRoot: resolve(import.meta.dirname, '../../../..'),
    help: false,
  };

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i]!;
    const next = () => {
      const v = rawArgs[i + 1];
      if (v === undefined) throw new Error(`${arg} needs a value`);
      i += 1;
      return v;
    };
    switch (arg) {
      case '--page': args.page = next(); break;
      case '--section': args.section = next(); break;
      case '--fixture': args.fixture = next(); break;
      case '--settings': args.settingsPath = next(); break;
      case '--repo-root': args.repoRoot = resolve(next()); break;
      case '--live': args.live = true; break;
      case '--list': args.list = true; break;
      case '-v': case '--verbose': args.verbose = true; break;
      case '-h': case '--help': args.help = true; break;
      default:
        throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

const HELP = `
用法: npm run session -- [options]

  --page <repo-relative.md>   讲义源文件，如 ebooks/The_Road_to_Reality/chapter_27.md
  --section <id>              小节 id（省略则用第一节）
  --list                      列出该页所有已标记小节后退出
  --fixture <file.json>       用固定脚本回放（page/section 从文件读取）
  --live                      调用真实 endpoint（需要 baseUrl/apiKey/model）
  --settings <file>           默认 ${DEFAULT_SETTINGS_PATH}
  --repo-root <dir>           讲义仓库根目录，默认为 tutor/ 的上一级
  -v, --verbose               打印成功的工具调用
  -h, --help

作答时可用：  ?  要提示     .  打开选择菜单     Ctrl-C 放弃本节
`.trim();

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<number> {
  const args = parseArgs(argv.slice(2));
  if (args.help) {
    say(HELP);
    return 0;
  }

  const { settings, warnings, path } = loadSettings(args.settingsPath);
  for (const w of warnings) say(yellow(`! 设置：${w}`));
  say(dim(path ? `设置来自 ${path}` : `未找到 ${args.settingsPath}，使用默认设置`));

  const content = new SourceContent(args.repoRoot);

  let fixture: Fixture | undefined;
  let page = args.page;
  let sectionId = args.section;

  if (args.fixture) {
    fixture = loadFixture(args.fixture);
    page ??= fixture.page;
    sectionId ??= fixture.sectionId;
  }

  if (!page) {
    say(red('需要 --page 或 --fixture'));
    say(HELP);
    return 2;
  }

  if (args.list) {
    const sections = content.list(page);
    if (sections.length === 0) {
      say(yellow(`${page} 中没有 { .tutor-section } 标记`));
      return 1;
    }
    rule(`${page} · ${sections.length} 个小节`);
    for (const s of sections) {
      say(`  ${bold(s.id)}\n     ${s.heading}  ${dim(`${s.chars} 字 · ${s.formulas} 个公式`)}`);
    }
    return 0;
  }

  // Defaulting to the first section keeps the common case a one-flag command.
  if (!sectionId) {
    const first = content.list(page)[0];
    if (!first) {
      say(red(`${page} 中没有 { .tutor-section } 标记`));
      return 1;
    }
    sectionId = first.id;
    say(dim(`未指定 --section，使用第一节 ${sectionId}`));
  }

  const section = await content.getSection(page, sectionId);
  if (!section) {
    say(red(`找不到小节 ${sectionId}；用 --list 查看可用的 id`));
    return 1;
  }

  let llm: Llm;
  if (args.live) {
    assertLiveReady(settings);
    llm = new HttpLlm(providerConfig(settings));
    say(dim(`live: ${settings.model} @ ${settings.baseUrl}`));
  } else {
    llm = new FakeLlm(section, fixture);
    say(dim(fixture ? `fake: 回放 ${args.fixture}` : 'fake: 自动生成（确定性，不联网）'));
  }

  // A fresh in-memory IndexedDB per run: the real store code runs, but a debug
  // session never inherits state from the last one.
  const store = await IdbStore.open({
    factory: new IDBFactory() as unknown as IDBFactoryLike,
    name: `tutor-debug-${Date.now()}`,
  });

  rule(`${section.tutorTitle ?? section.heading}`);
  say(dim(`  ${section.chars} 字 · ${section.formulaCount} 个公式 · ${page}#${sectionId}`));

  const session = await TutorSession.create({
    page,
    sectionId,
    settings,
    store,
    llm,
    content,
    clock: systemClock,
    ids: sequentialIdGen(),
    sink: makeSink(args.verbose),
  });

  const input = openInput(fixture?.answers ?? []);
  const ask = async (prompt: string): Promise<string> => {
    const line = await input.next(prompt);
    if (line === null) {
      say(dim('\n输入结束，放弃本节'));
      return 'q';
    }
    return line;
  };

  try {
    await session.plan();
    await session.ask();

    while (session.state !== 'DONE' && session.state !== 'ABANDONED') {
      if (session.state === 'AWAIT_ANSWER') {
        const line = await ask(bold('\n你的作答（也可以直接问题目的意思）> '));
        // Explicit keys are honoured without a router call: input we can already
        // read costs nothing to act on, and a menu key is unambiguous.
        if (line === '?') {
          await session.requestHint();
          continue;
        }
        if (line === '.') {
          await session.submitAnswer('');
          continue;
        }
        if (line === '') continue;
        const key = CHOICES[line.toLowerCase()];
        if (key) {
          await session.choose(key);
          continue;
        }
        await session.applyRoute(await session.routeStudentTurn(line), line);
        continue;
      }

      if (session.state === 'DISCUSSING') {
        const line = await ask(dim('\n继续讨论，或 n=下一步 r=换一题 s=跳过 q=结束 > '));
        const choice = CHOICES[line.toLowerCase()];
        if (choice) {
          await session.choose(choice);
          continue;
        }
        if (line === '') continue;
        // Straight to the tutor. The keys above are the only way out of this phase,
        // so there is nothing for a classifier to decide — and one that guessed
        // `advance` would move the step the student was still asking about.
        await session.discuss(line);
        continue;
      }

      if (session.state === 'AWARD_DECISION') {
        const line = await ask(dim('\n接受这个成就？ y/n > '));
        await session.decideAchievement(!line.toLowerCase().startsWith('n'));
        continue;
      }

      // Any other state means a transition ran without leaving the machine at a
      // student-input point — a harness bug, not bad input, so stop loudly.
      say(red(`意外状态 ${session.state}，退出`));
      return 1;
    }

    rule('结束');
    const { usage, status } = session.record;
    say(
      dim(
        `状态 ${status} · ${usage.calls} 次调用 · ` +
          `prompt ${usage.promptTokens} · completion ${usage.completionTokens}` +
          (usage.reasoningTokens ? ` · reasoning ${usage.reasoningTokens}` : ''),
      ),
    );
    return status === 'completed' ? 0 : 1;
  } finally {
    input.close();
    store.close?.();
  }
}

/**
 * Line source that works both interactively and under a pipe.
 *
 * readline's own `question()` is not enough here: when stdin is a pipe, every
 * line arrives long before the session is ready to consume it, and lines that
 * land while nothing is awaiting are discarded — so a scripted run reaches EOF
 * at the first prompt. Buffering every line as it arrives, and handing them out
 * on demand, makes `printf ... | npm run session` behave like typing.
 */
function openInput(scripted: string[]): {
  next(prompt: string): Promise<string | null>;
  close(): void;
} {
  const pending = scripted.map((s) => s.trim());
  const waiting: Array<(line: string | null) => void> = [];
  let done = false;

  const rl = createInterface({ input: stdin });
  rl.on('line', (line) => {
    const value = line.trim();
    const resolve = waiting.shift();
    if (resolve) resolve(value);
    else pending.push(value);
  });
  rl.on('close', () => {
    done = true;
    while (waiting.length > 0) waiting.shift()!(null);
  });

  return {
    async next(prompt: string): Promise<string | null> {
      const buffered = pending.shift();
      if (buffered !== undefined) {
        // Echo it, so a piped transcript reads like an interactive one.
        say(`${prompt}${buffered}`);
        return buffered;
      }
      if (done) return null;
      stdout.write(prompt);
      return new Promise((resolve) => waiting.push(resolve));
    },
    close: () => rl.close(),
  };
}

const CHOICES: Record<string, ExitChoice> = {
  n: 'advance',
  r: 'remain',
  s: 'skip',
  q: 'quit',
};

function providerConfig(settings: Settings) {
  return {
    baseUrl: settings.baseUrl,
    apiKey: settings.apiKey,
    flavor: settings.flavor,
    timeoutMs: settings.requestTimeoutMs,
    plannerTimeoutMs: settings.plannerTimeoutMs,
  };
}

try {
  exit(await main());
} catch (err) {
  say(red(`\n${(err as Error).message}`));
  if (env['TUTOR_DEBUG']) say(dim(String((err as Error).stack)));
  exit(1);
}
