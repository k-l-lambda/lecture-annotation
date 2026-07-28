/**
 * A scripted Llm for deterministic runs.
 *
 * Two modes, and the difference matters:
 *
 * - **Fixture mode** replays exact tool calls from a JSON file. Use it to script
 *   a specific pathology (a fabricated anchor, a duplicate question) and assert
 *   the harness rejects it. The fixture is the test's input, so it is allowed to
 *   be wrong on purpose.
 * - **Auto mode** synthesises *valid* calls from the real section text — anchors
 *   are actual verbatim slices, formula coverage is computed from the section's
 *   own `$$…$$` blocks. This is what makes `npm run session` runnable end-to-end
 *   with no endpoint and no fixture, and it exercises the happy path of every
 *   gate rather than only the rejections.
 *
 * Auto mode deliberately does NOT know the validators' internals — it builds
 * plausible content from the section and lets the real gates judge it. When a
 * gate rejects an auto call, that is a finding about the gate, not a bug here.
 */

import { readFileSync } from 'node:fs';

import { PASS_THRESHOLD } from '../../core/types.ts';
import type { Llm, LlmRequest, LlmResponse, LlmToolCall } from '../../core/ports.ts';
import type { RoleName, SectionContent } from '../../core/types.ts';

/** One scripted turn. `arguments` is an object here; it is stringified on use. */
export interface FixtureTurn {
  role: RoleName;
  /** Optional label, for readable failures. */
  note?: string;
  text?: string;
  toolCalls?: Array<{ name: string; arguments: unknown }>;
}

export interface Fixture {
  page: string;
  sectionId: string;
  /** Consumed in order, filtered by role. */
  turns: FixtureTurn[];
  /** Fed to the session as student input, in order. */
  answers?: string[];
}

export function loadFixture(path: string): Fixture {
  const parsed = JSON.parse(readFileSync(path, 'utf8')) as Fixture;
  if (!parsed.page || !parsed.sectionId) {
    throw new Error(`fixture ${path} needs 'page' and 'sectionId'`);
  }
  return parsed;
}

const USAGE = { calls: 1, promptTokens: 900, completionTokens: 300, reasoningTokens: 0 };

export class FakeLlm implements Llm {
  #section: SectionContent;
  #turns: FixtureTurn[];
  #cursor = 0;
  /** Per-role counters so auto mode varies its output across steps. */
  #seen = new Map<RoleName, number>();

  readonly log: Array<{ role: RoleName; tools: string[] }> = [];

  constructor(section: SectionContent, fixture?: Fixture) {
    this.#section = section;
    this.#turns = fixture?.turns ?? [];
  }

  async call(req: LlmRequest): Promise<LlmResponse> {
    const n = (this.#seen.get(req.role) ?? 0) + 1;
    this.#seen.set(req.role, n);

    const scripted = this.#nextScripted(req.role);
    const response = scripted
      ? {
          text: scripted.text ?? '',
          toolCalls: (scripted.toolCalls ?? []).map((c, i) => toCall(c.name, c.arguments, i)),
          usage: USAGE,
        }
      : this.#auto(req, n);

    this.log.push({ role: req.role, tools: response.toolCalls.map((c) => c.name) });
    return response;
  }

  async stream(req: LlmRequest, onDelta: (chunk: string) => void): Promise<LlmResponse> {
    const response = await this.call(req);
    // Chunked so the shell's streaming path is exercised, not just awaited.
    for (const piece of response.text.match(/.{1,24}/gs) ?? []) onDelta(piece);
    return response;
  }

  #nextScripted(role: RoleName): FixtureTurn | null {
    for (let i = this.#cursor; i < this.#turns.length; i += 1) {
      if (this.#turns[i]!.role === role) {
        this.#cursor = i + 1;
        return this.#turns[i]!;
      }
    }
    return null;
  }

  // -------------------------------------------------------------------------
  // Auto mode
  // -------------------------------------------------------------------------

  #auto(req: LlmRequest, nth: number): LlmResponse {
    switch (req.role) {
      case 'planner':
        return this.#plan();
      case 'questioner':
        return this.#question(req, nth);
      case 'grader':
        return this.#grade(req);
      case 'summarizer':
        return this.#summarize();
      case 'tutor_reply':
        return {
          text:
            '这一步的关键是把定义本身讲清楚：先说它约束了什么，再说少了这个约束会出什么问题。' +
            '你已经说到了方向，缺的是把它和上一步的结论连起来。',
          toolCalls: [],
          usage: USAGE,
        };
    }
  }

  #plan(): LlmResponse {
    const anchors = sentences(this.#section.annotation, 8);
    const formulas = displayMath(this.#section.annotation);
    const kpIds = ['kp:auto-1', 'kp:auto-2', 'kp:auto-3'];

    // Coverage gate is >= 60 %, so annotate every formula found rather than a
    // sample: a fake that only just passes hides regressions in the gate.
    const analysis = {
      coreQuestion: `本节要回答的问题：${this.#section.heading}到底在说什么？`,
      argumentChain: [
        { claim: '给出本节讨论的对象与前提。', sourceAnchor: anchors[0] ?? '', role: 'premise' },
        { claim: '由前提推出中间结论。', sourceAnchor: anchors[1] ?? anchors[0] ?? '', role: 'derivation' },
        { claim: '得到本节的主结论。', sourceAnchor: anchors[2] ?? anchors[0] ?? '', role: 'conclusion' },
      ],
      formulas: formulas.map((latex, i) => ({
        latex,
        meaning: `第 ${i + 1} 个公式刻画了本节讨论量之间的关系。`,
        sourceAnchor: anchors[Math.min(i, anchors.length - 1)] ?? '',
      })),
      conceptsIntroducedHere: ['本节新引入的概念 A', '本节新引入的概念 B'],
      conceptsAssumedKnown: ['前置概念 X'],
      commonMisreadings: [
        {
          misreading: '把本节的结论当成对任意情形都成立。',
          whyTempting: '正文的表述省略了适用条件。',
          correction: '结论依赖前提中给出的限制条件。',
        },
      ],
      sectionDifficulty: 'medium',
      notInSection: ['本节没有给出完整证明。'],
    };

    return {
      text: '',
      toolCalls: [
        toCall('analyze_section', analysis, 0),
        toCall(
          'upsert_knowledge_points',
          {
            knowledgePoints: kpIds.map((id, i) => ({
              id,
              label: `自动知识点 ${i + 1}`,
              coreIdea: '用于本地调试的占位知识点。',
            })),
          },
          1,
        ),
        toCall(
          'set_steps',
          {
            steps: [
              {
                id: 'step:1',
                title: '说清定义',
                goal: '能用自己的话复述本节的核心定义。',
                knowledgePointIds: [kpIds[0]!],
                targetLevel: 1,
                questionGenre: 'descriptive',
                anchors: [anchors[0] ?? ''],
              },
              {
                id: 'step:2',
                title: '连起推理',
                goal: '能说出从前提到结论的中间一步。',
                knowledgePointIds: [kpIds[1]!],
                targetLevel: 2,
                questionGenre: 'descriptive',
                anchors: [anchors[1] ?? anchors[0] ?? ''],
              },
              {
                id: 'step:3',
                title: '用到新情形',
                goal: '能判断结论在给定条件下是否适用。',
                knowledgePointIds: [kpIds[2]!],
                targetLevel: 3,
                questionGenre: 'derivation-step',
                anchors: [anchors[2] ?? anchors[0] ?? ''],
              },
            ],
            prep: { include: false, reason: '本节的前置概念在档案中已达到要求。', focusKpIds: [] },
            rationale: '按定义 → 推理 → 应用三级递进，覆盖本节的主论证。',
          },
          2,
        ),
      ],
      usage: USAGE,
    };
  }

  #question(req: LlmRequest, nth: number): LlmResponse {
    // Read the live step out of the prompt exactly as a real model must: the
    // harness rejects a question aimed at any step but the current one, and the
    // current step may be a `prep` or inserted step the fake never chose.
    const step = jsonField(req, 'step') as Record<string, unknown> | null;
    const stepId = typeof step?.['id'] === 'string' ? step['id'] : 'step:1';
    const variant = Number(firstMatch(req, /"variant"\s*:\s*(\d+)/) ?? '0');
    const preferred = typeof step?.['preferredGenre'] === 'string' ? step['preferredGenre'] : null;
    const anchors = sentences(this.#section.annotation, 8);
    const anchor = anchors[(nth - 1) % Math.max(1, anchors.length)] ?? anchors[0] ?? '';

    // Each call asks a different thing, so the repetition guard sees genuinely
    // distinct questions rather than passing by accident.
    const angles = [
      '请用自己的话说明这一步涉及的核心概念是什么，并说明它约束了什么。',
      '从上一步的结论出发，推到本步结论还缺哪一步？请把这一步补出来。',
      '如果把本节的限制条件去掉，结论还成立吗？请说明理由。',
      '请举一个满足本节前提的具体情形，并说明结论如何体现。',
    ];

    return {
      text: '',
      toolCalls: [
        toCall(
          'ask_question',
          {
            stepId,
            variant,
            genre: preferred ?? 'descriptive',
            question: angles[(nth - 1) % angles.length],
            setup: null,
            // Distinct per step and per variant: identical expectedPoints across
            // two steps is precisely what the repetition guard rejects, so a
            // fake that reused one set could never get past step 1.
            expectedPoints: expectedPointsFor(stepId, nth),
            rubric: {
              '5': '三个要点齐全，且能指出适用范围。',
              '3': '说清对象与前提，推理不完整。',
              '1': '只复述词句，没有说明关系。',
            },
            hintLadder: ['先回到定义本身：它要求什么？', '把定义中的条件逐条对照本节的结论。'],
            sourceAnchor: anchor,
            targetsMisreading: null,
          },
          0,
        ),
      ],
      usage: USAGE,
    };
  }

  /**
   * Scores by answer length, monotonically. Crude, but it gives the CLI a
   * predictable lever: a one-word answer fails, a paragraph passes, so both
   * branches of every downstream rule are reachable by hand.
   */
  #grade(req: LlmRequest): LlmResponse {
    const questionId = String(jsonField(req, 'questionId') ?? '');
    // The answer is the `studentAnswer` field, delimiter-wrapped. Scanning the
    // whole prompt for a SECTION block instead would match the section text.
    const wrapped = String(jsonField(req, 'studentAnswer') ?? '');
    const answer = wrapped.replace(/<<<\s*SECTION|SECTION\s*>>>/g, '').trim();
    const len = answer.replace(/\s+/g, '').length;
    const expected = (jsonField(req, 'expectedPoints') ?? []) as Array<{ point: string }>;
    const points = expected.map((p) => p.point);
    const score = len === 0 ? 0 : len < 10 ? 1 : len < 30 ? 2 : len < 70 ? 3 : len < 140 ? 4 : 5;
    const passed = score >= PASS_THRESHOLD;

    return {
      text: '',
      toolCalls: [
        toCall(
          'submit_evaluation',
          {
            questionId,
            score,
            evaluation: passed
              ? `作答覆盖了主要要点（长度 ${len}）。继续保持把前提和结论连起来说的习惯。`
              : `作答偏短（长度 ${len}），主要缺少前提到结论的推理过程。`,
            // Every expected point must be accounted for as hit or missed, so
            // these are partitioned from the prompt rather than hardcoded.
            pointsHit: passed ? points.slice(0, Math.max(1, points.length - 1)) : points.slice(0, 1),
            pointsMissed: passed ? points.slice(Math.max(1, points.length - 1)) : points.slice(1),
            misconceptions: passed ? [] : ['把复述当成解释'],
            answerQuality: len === 0 ? 'empty' : 'on-topic',
            missingPrerequisiteKpId: null,
            suggestedNext: passed ? 'advance' : 'remain',
          },
          0,
        ),
      ],
      usage: USAGE,
    };
  }

  #summarize(): LlmResponse {
    return {
      text: '',
      toolCalls: [
        toCall(
          'finish_session',
          {
            summary: '本节围绕核心定义走了定义→推理→应用三步，主要收获在于把前提和结论连起来。',
            strengths: ['能复述核心定义', '能指出结论依赖的前提'],
            gaps: ['推理链的中间一步仍需补充'],
            nextActions: [{ text: '重读本节公式部分，逐条对照前提。', sectionRef: null }],
          },
          0,
        ),
      ],
      usage: USAGE,
    };
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toCall(name: string, args: unknown, index: number): LlmToolCall {
  return {
    id: `fake:${name}:${index}`,
    name,
    arguments: typeof args === 'string' ? args : JSON.stringify(args),
  };
}

/**
 * Verbatim sentence slices of the section, which is what makes auto mode able
 * to satisfy the anchor check: these are literally substrings of the source.
 */
export function sentences(text: string, limit: number): string[] {
  const stripped = text
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/^\s*[-*>|#].*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  const out: string[] = [];
  for (const raw of stripped.split(/(?<=[。！？])/)) {
    const s = raw.trim();
    // Long enough to be a meaningful anchor, short enough to stay verbatim.
    if (s.length >= 12 && s.length <= 120 && !s.includes('\n')) out.push(s);
    if (out.length >= limit) break;
  }
  return out;
}

function displayMath(text: string): string[] {
  return [...text.matchAll(/\$\$([\s\S]+?)\$\$/g)].map((m) => m[1]!.trim());
}

/**
 * Wholly disjoint point sets, cycled by step. The repetition guard compares
 * expectedPoints by token overlap, so these deliberately share no vocabulary.
 */
const POINT_SETS: string[][] = [
  ['给出这一节讨论的量是如何定义的', '指出定义里出现的每个符号代表什么', '说明定义要求哪些条件'],
  ['复原从假设走到结果的中间环节', '指出哪一步用到了乘法变成加法', '解释为何这个环节不能跳过'],
  ['判断在给定情形下结果是否仍然成立', '找出使结果失效的一个反例设定', '说明反例破坏了哪个条件'],
  ['估计相关的量大致有多少个数量级', '说明数量级差异为何足以支撑倾向性', '指出这个估计忽略了什么'],
];

function expectedPointsFor(stepId: string, nth: number): Array<{ point: string; weight: number }> {
  // Keyed on the step id so a step re-asked as a variant still moves to a fresh
  // set rather than repeating itself.
  const index = (hash(stepId) + nth - 1) % POINT_SETS.length;
  const set = POINT_SETS[index]!;
  const weights = [0.4, 0.4, 0.2];
  return set.map((point, i) => ({ point, weight: weights[i] ?? 0.2 }));
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Pulls one top-level key out of whichever message is the role's JSON payload.
 * Parsing the payload beats regexing it — the fake then fails the same way a
 * real model would when the payload shape changes, instead of silently falling
 * back to a stale default.
 */
function jsonField(req: LlmRequest, key: string): unknown {
  for (const m of req.messages) {
    const text = m.content.trim();
    if (!text.startsWith('{')) continue;
    try {
      const parsed = JSON.parse(text) as Record<string, unknown>;
      if (key in parsed) return parsed[key];
    } catch {
      // Not the JSON payload message; keep looking.
    }
  }
  return null;
}

function firstMatch(req: LlmRequest, re: RegExp): string | null {
  for (const m of req.messages) {
    const hit = re.exec(m.content);
    if (hit) return hit[1] ?? null;
  }
  return null;
}

