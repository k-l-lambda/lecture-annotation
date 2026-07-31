/**
 * The student profile is written by a concurrent `profiler` branch, not by the grader.
 *
 * Reported: the 学习档案 drawer showed nothing but 没测过. That was accurate.
 * `update_mastery` had never run in any live session — measured across three exports,
 * `submit_evaluation` 1 call each, `update_mastery` 0 — because the grader's prompt
 * ordered it *after* `submit_evaluation`, which is the grader's terminal tool. The
 * turn ended before the write could happen (`roles.ts`: `if (terminalCalled &&
 * !sawFailure) return`).
 *
 * That bug survived 355 tests because none of them asserted that grading writes a
 * mastery record, and `fake-llm.ts` emitted only `submit_evaluation` — so the fake
 * reproduced the production bug faithfully and silently. The first test here is that
 * missing assertion.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { FakeLlm } from '../src/shells/node/fake-llm.ts';
import { StreamIdleError } from '../src/core/provider.ts';
import { TutorSession } from '../src/core/session.ts';
import { executeTool } from '../src/core/tools.ts';
import { ROLE_TOOLS } from '../src/core/schema.ts';
import type { ContentSource, Llm, LlmRequest, LlmResponse, SessionEvent } from '../src/core/ports.ts';
import type { RoleName, SectionContent, Settings } from '../src/core/types.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

const read = (p: string) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');

const TEXT = [
  '熵是对混乱程度的量度，它衡量宏观状态对应的微观状态数目。',
  '',
  '$$S = k \\log V$$',
  '',
  '这里 $V$ 是粗粒化盒子体积，$k$ 是玻尔兹曼常数。取对数是关键的一步。',
].join('\n');

const GOOD_ANSWER =
  '取对数把体积的乘法变成熵的加法，所以两个独立系统合起来时熵可以直接相加。';

function section(): SectionContent {
  return {
    page: 'ebooks/x/ch.md',
    sectionId: 's',
    heading: '熵',
    tutorTitle: null,
    level: 2,
    annotation: TEXT,
    transcript: null,
    subHeadings: [],
    formulaCount: 1,
    chars: TEXT.length,
    truncated: false,
    fromSource: true,
  };
}

/** Counts calls per role and can stall or fail a chosen role on demand. */
class ProbeLlm implements Llm {
  readonly inner = new FakeLlm(section());
  readonly stall = new Set<RoleName>();
  readonly calls: RoleName[] = [];
  /** Resolves when the named role is first called, for interleaving assertions. */
  #gates = new Map<RoleName, () => void>();
  /** Held-open profiler calls, released by `release()`. */
  #held: Array<() => void> = [];
  hold = false;

  async call(req: LlmRequest): Promise<LlmResponse> {
    this.calls.push(req.role);
    this.#gates.get(req.role)?.();
    if (this.stall.has(req.role)) throw new StreamIdleError(120_000);
    if (this.hold && req.role === 'profiler') {
      await new Promise<void>((resolve) => this.#held.push(resolve));
    }
    return this.inner.call(req);
  }

  count(role: RoleName): number {
    return this.calls.filter((c) => c === role).length;
  }

  reached(role: RoleName): Promise<void> {
    return new Promise((resolve) => this.#gates.set(role, resolve));
  }

  release(): void {
    for (const r of this.#held) r();
    this.#held = [];
  }
}

async function started(llm: Llm, over: Partial<Settings> = {}) {
  const store = await IdbStore.open({
    factory: new IDBFactory() as unknown as IDBFactoryLike,
    name: `prof-${Math.random().toString(36).slice(2)}`,
  });
  const events: SessionEvent[] = [];
  const session = await TutorSession.create({
    page: 'ebooks/x/ch.md',
    sectionId: 's',
    settings: { ...defaultSettings(), model: 'm', apiKey: 'k', baseUrl: 'http://x/v1', ...over },
    store,
    llm,
    content: { getSection: async () => section() } as ContentSource,
    sink: (e) => events.push(e),
  });
  await session.plan();
  await session.ask();
  return { session, store, events };
}

/**
 * Walks to the first step that has knowledge points. The fake's prep step is
 * answerable but carries none, and a step with no KPs correctly spawns nothing —
 * so every test below has to be past it to be testing anything.
 */
async function onScoredStep(llm: ProbeLlm, over: Partial<Settings> = {}) {
  const ctx = await started(llm, over);
  await ctx.session.submitAnswer(GOOD_ANSWER);
  await ctx.session.choose('advance');
  await ctx.session.flushProfilers();
  return ctx;
}

// ---------------------------------------------------------------------------
// The assertion that never existed
// ---------------------------------------------------------------------------

test('leaving a graded step writes a mastery record for its knowledge points', async () => {
  const llm = new ProbeLlm();
  const { session, store } = await onScoredStep(llm);
  const step = session.record.steps[session.record.cursor.stepIndex]!;

  await session.submitAnswer(GOOD_ANSWER);
  await session.choose('advance');
  await session.flushProfilers();

  const records = await store.getMastery(step.knowledgePointIds);
  assert.ok(step.knowledgePointIds.length > 0, 'fixture must have a step with kpIds');
  assert.equal(
    records.length,
    step.knowledgePointIds.length,
    'every kpId of the step the student left must now have a record — this is what 没测过 meant',
  );
  for (const r of records) {
    assert.ok(r.attempts > 0, `${r.kpId} recorded no attempt`);
    assert.ok(r.level > 0, `${r.kpId} stayed at level 0`);
    assert.equal(r.source, 'graded');
  }
});

test('the profiler is the only role that may write mastery', async () => {
  // The dead path must not come back: the grader kept the tool for a long time
  // without ever reaching it, which is exactly how this went unnoticed.
  assert.ok(!ROLE_TOOLS.grader.includes('update_mastery'));
  assert.ok(!ROLE_TOOLS.tutor_reply.includes('update_mastery'));
  assert.deepEqual([...ROLE_TOOLS.profiler], ['update_mastery']);

  const result = await executeTool('grader', 'update_mastery', {}, {} as never);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(' '), /not available to the grader role/);
});

// ---------------------------------------------------------------------------
// Concurrency: it must not block, and must not be blocked
// ---------------------------------------------------------------------------

test('the main line does not wait for the profiler', async () => {
  const llm = new ProbeLlm();
  const { session } = await onScoredStep(llm);

  llm.hold = true;
  await session.submitAnswer(GOOD_ANSWER);
  await session.choose('advance');

  // The next question is already asked and answerable while the branch is held.
  assert.equal(session.state, 'AWAIT_ANSWER');
  assert.equal(session.busy, false, 'a held profiler must not leave the session busy');

  llm.release();
  await session.flushProfilers();
});

test('a held profiler does not make the next turn fail as re-entrant', async () => {
  // `#exclusive` refuses a second concurrent turn. The profiler IS one by design,
  // so it must not pass through that guard — otherwise every step departure
  // poisons the turn that follows it.
  const llm = new ProbeLlm();
  const { session } = await onScoredStep(llm);

  llm.hold = true;
  await session.submitAnswer(GOOD_ANSWER);
  await session.choose('advance');
  await session.submitAnswer(GOOD_ANSWER);

  assert.equal(session.state, 'DISCUSSING', 'the turn after a departure was refused');
  llm.release();
  await session.flushProfilers();
});

test('evidence is attributed to the step the student left, not the cursor', async () => {
  // The sharp edge of running concurrently: by the time the profiler returns, the
  // cursor has moved. Without an explicit `stepId` the tool scopes evidence to the
  // NEXT step's knowledge points — rejecting the write, or silently charging it to
  // the wrong attempt where the two steps share a kpId.
  const llm = new ProbeLlm();
  const { session, store } = await onScoredStep(llm);
  const left = session.record.steps[session.record.cursor.stepIndex]!;

  llm.hold = true;
  await session.submitAnswer(GOOD_ANSWER);
  await session.choose('advance');
  const arrivedAt = session.record.steps[session.record.cursor.stepIndex]!;
  assert.notEqual(arrivedAt.id, left.id, 'fixture must actually move the cursor');

  llm.release();
  await session.flushProfilers();

  const records = await store.getMastery(left.knowledgePointIds);
  assert.equal(records.length, left.knowledgePointIds.length);
  const attemptIds = new Set(left.attempts.map((a) => a.attemptId));
  for (const r of records) {
    const entry = r.history.at(-1)!;
    assert.ok(
      attemptIds.has(entry.attemptId),
      `evidence for ${r.kpId} was filed under ${entry.attemptId}, which is not an attempt of ${left.id}`,
    );
  }
});

// ---------------------------------------------------------------------------
// Nothing to say, or unable to say it
// ---------------------------------------------------------------------------

test('a step with no attempts spawns nothing', async () => {
  const llm = new ProbeLlm();
  const { session } = await onScoredStep(llm);
  const before = llm.count('profiler');

  // Skipped without answering: no evidence exists, so a write would be invention.
  await session.choose('skip');
  await session.flushProfilers();
  assert.equal(llm.count('profiler'), before, 'a skipped, unanswered step must not be profiled');
});

test('a failing profiler retries three times, then gives up without a notice', async () => {
  const llm = new ProbeLlm();
  const { session, events } = await onScoredStep(llm);
  events.length = 0;

  await session.submitAnswer(GOOD_ANSWER);
  llm.stall.add('profiler');
  // The departure must still succeed — the branch failing is not the turn failing.
  await session.choose('advance');
  await session.flushProfilers();

  assert.equal(llm.count('profiler'), 3, 'three attempts, not one and not forever');
  const updates = events.filter((e) => e.type === 'profile-update');
  assert.deepEqual(
    updates.map((e) => (e as { phase: string }).phase),
    ['running', 'running', 'running', 'failed'],
  );
  const failed = updates.at(-1) as { reason: string | null };
  assert.ok(failed.reason, 'the failure must name its cause');
  assert.equal(
    events.some((e) => e.type === 'notice'),
    false,
    'a failed archive write must not interrupt the student with a notice',
  );
  assert.equal(session.state, 'AWAIT_ANSWER', 'the main line moved on regardless');
});

// ---------------------------------------------------------------------------
// Budget
// ---------------------------------------------------------------------------

test('profiler calls do not spend the main call budget', async () => {
  const llm = new ProbeLlm();
  const { session } = await started(llm);
  await session.submitAnswer(GOOD_ANSWER);
  await session.choose('advance');

  const budgetBefore = session.budgetUsed;
  await session.submitAnswer(GOOD_ANSWER);
  await session.choose('advance');
  await session.flushProfilers();

  assert.ok(llm.count('profiler') > 0, 'fixture must have run a profiler');
  // The main line's own turns still count; what must not appear is the profiler's.
  const mainTurns = 2; // grader + questioner for the step just traversed
  assert.equal(
    session.budgetUsed - budgetBefore,
    mainTurns,
    'the profiler charged the main budget',
  );
});

test('profilerBudget 0 disables the branch and leaves the session working', async () => {
  const llm = new ProbeLlm();
  const { session } = await onScoredStep(llm, { profilerBudget: 0 });
  assert.equal(llm.count('profiler'), 0);
  assert.equal(session.state, 'AWAIT_ANSWER');
});

// ---------------------------------------------------------------------------
// Quitting
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Shown, but not in the way
// ---------------------------------------------------------------------------

test('the panel renders profile status in the footer, not the message flow', () => {
  const panel = read('../../docs/javascripts/tutor/panel.js');
  assert.match(panel, /case "profile-update":/);
  assert.match(panel, /renderProfileStatus/);
  // In the footer next to the usage meter. Routing it through `view.notice` would
  // put a background archive write into the conversation the student is reading.
  assert.match(panel, /root\.appendChild\(profileStatus\);/);
  assert.doesNotMatch(
    panel,
    /case "profile-update":[\s\S]{0,200}view\.notice/,
    'the profile status must not be rendered as a notice',
  );
});

test('success fades and failure persists', () => {
  const panel = read('../../docs/javascripts/tutor/panel.js');
  // The asymmetry is deliberate: a completed write is worth one glance, a failed
  // one is the student's only trace that a step is missing from the archive.
  assert.match(panel, /event\.phase === "done"[\s\S]{0,400}setTimeout/);
  assert.match(panel, /tutor-profile-status--failed/);
  const css = read('../../docs/stylesheets/tutor.css');
  assert.match(css, /\.tutor-profile-status\b/);
  assert.match(css, /\.tutor-profile-status--failed/);
});

test('the CLI prints a failure without -v, and success only with it', () => {
  const cli = read('../src/shells/node/debug-cli.ts');
  const branch = /case 'profile-update':[\s\S]*?break;/.exec(cli);
  assert.ok(branch, 'the CLI does not handle profile-update');
  // A failure is the only sign the archive write never landed, so it must not be
  // hidden behind a flag; the success line is noise next to the next question.
  assert.match(branch[0], /phase === 'failed'/);
  assert.match(branch[0], /else if \(verbose\)/);
});

test('quitting flushes the last write instead of dropping it', async () => {
  // ui-spec.md §6 already specified this ("profile writes are flushed"); only the
  // wiring was missing. The step being stood on at quit never had a departure, so
  // without an explicit spawn its evidence is simply lost.
  const llm = new ProbeLlm();
  const { session, store } = await onScoredStep(llm);
  const standingOn = session.record.steps[session.record.cursor.stepIndex]!;

  await session.submitAnswer(GOOD_ANSWER);
  await session.abandon();

  assert.equal(session.record.status, 'abandoned');
  const records = await store.getMastery(standingOn.knowledgePointIds);
  assert.ok(records.length > 0, 'the step the student quit on lost its evidence');
});
