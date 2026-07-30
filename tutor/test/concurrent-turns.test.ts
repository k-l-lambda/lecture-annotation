/**
 * One turn at a time, and a failed `ask()` must not wedge the session.
 *
 * All three fixes here come from one live session
 * (`temp/tutor-session-段落-1 (1).json`) plus one reported UI defect, and they compound:
 *
 * 1. The 重试 button stayed clickable after a press. The DOM half is `button.disabled`,
 *    but the reason it mattered is that nothing refused the overlapping turn. `guard`
 *    was called as `guard(again(), again)` — `again()` fired the turn BEFORE `guard`
 *    could set `ui.busy` — and the harness had no concurrency rule at all. Measured on
 *    a double press: `submitAnswer` ran the grader 4 times and charged 6 budget calls
 *    for one answer while keeping one of the two scores; `discuss` logged
 *    `student, student, tutor, tutor`, the exact duplication `retry-notice.test.ts`
 *    exists to prevent, reached by a path it did not cover.
 *
 * 2. `ask()` moved to `ASKING` and threw without restoring the state. In the live log
 *    `ask_question` failed its anchor gate three times and the record ended
 *    `state: ASKING, status: active` — so every later turn answered
 *    「routeStudentTurn() is not valid in state ASKING」 and the retry button could only
 *    reproduce the same error.
 *
 * 3. Why `ask_question` could not succeed at all: see `inserted-step-anchor.test.ts`.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { FakeLlm } from '../src/shells/node/fake-llm.ts';
import { StreamIdleError } from '../src/core/provider.ts';
import { TutorSession } from '../src/core/session.ts';
import type { ContentSource, Llm, LlmRequest, LlmResponse } from '../src/core/ports.ts';
import type { RoleName, SectionContent } from '../src/core/types.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

const TEXT = ['熵是对混乱程度的量度。', '', '$$S = k \\log V$$', '', '这里 $V$ 是粗粒化盒子体积。'].join('\n');

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

class CountingLlm implements Llm {
  readonly inner = new FakeLlm(section());
  readonly stall = new Set<RoleName>();
  readonly calls: RoleName[] = [];

  async call(req: LlmRequest): Promise<LlmResponse> {
    this.calls.push(req.role);
    if (this.stall.has(req.role)) throw new StreamIdleError(120_000);
    return this.inner.call(req);
  }

  count(role: RoleName): number {
    return this.calls.filter((c) => c === role).length;
  }
}

async function started(llm: Llm) {
  const session = await TutorSession.create({
    page: 'ebooks/x/ch.md',
    sectionId: 's',
    settings: { ...defaultSettings(), model: 'm', apiKey: 'k', baseUrl: 'http://x/v1' },
    store: await IdbStore.open({
      factory: new IDBFactory() as unknown as IDBFactoryLike,
      name: `conc-${Math.random().toString(36).slice(2)}`,
    }),
    llm,
    content: { getSection: async () => section() } as ContentSource,
  });
  await session.plan();
  await session.ask();
  return session;
}

// ---------------------------------------------------------------------------
// One turn at a time
// ---------------------------------------------------------------------------

test('a second answer while the first is in flight is refused, not queued', async () => {
  const llm = new CountingLlm();
  const session = await started(llm);
  llm.calls.length = 0;

  const [first, second] = await Promise.allSettled([
    session.submitAnswer('熵是体积的对数'),
    session.submitAnswer('熵是体积的对数'),
  ]);

  assert.equal(first.status, 'fulfilled');
  assert.equal(second.status, 'rejected');
  assert.match(String((second as PromiseRejectedResult).reason), /still in flight/);
  // The measured symptom: one answer, one grading. Four grader calls was the bug.
  assert.equal(llm.count('grader'), 1);
  assert.equal(session.currentStep!.attempts.length, 1);
});

test('the refused turn costs nothing: no second grader call, no budget charge', async () => {
  const llm = new CountingLlm();
  const session = await started(llm);
  const before = session.record.usage.calls;

  await Promise.allSettled([
    session.submitAnswer('熵是体积的对数'),
    session.submitAnswer('熵是体积的对数'),
  ]);

  // One logical call for the grade. The double press charged two.
  assert.equal(session.record.usage.calls - before, 1);
});

test('a second reply does not duplicate the student turn in the log', async () => {
  const llm = new CountingLlm();
  const session = await started(llm);
  await session.submitAnswer('熵是体积的对数');

  await Promise.allSettled([
    session.discuss('为什么取对数？'),
    session.discuss('为什么取对数？'),
  ]);

  const log = session.currentStep!.attempts.at(-1)!.discussion;
  assert.deepEqual(
    log.map((d) => d.role),
    ['student', 'tutor'],
    'not student,student,tutor,tutor — the tutor would see the question twice',
  );
});

test('the guard releases on both paths, so a real retry still works', async () => {
  const llm = new CountingLlm();
  const session = await started(llm);

  llm.stall.add('grader');
  await assert.rejects(() => session.submitAnswer('熵是体积的对数'));
  assert.equal(session.busy, false, 'a thrown turn must not wedge the session shut');

  llm.stall.clear();
  await session.submitAnswer('熵是体积的对数');
  assert.equal(session.state, 'DISCUSSING');
  assert.equal(session.currentStep!.attempts.length, 1, 'the retry opened a second attempt');
});

test('busy is observable, so a shell can disable its composer from the harness', async () => {
  const llm = new CountingLlm();
  const session = await started(llm);
  assert.equal(session.busy, false);
  const inFlight = session.submitAnswer('熵是体积的对数');
  assert.equal(session.busy, true);
  await inFlight;
  assert.equal(session.busy, false);
});

test('the internal calls a turn makes are not refused by the guard', async () => {
  // `choose('remain')` ends in `ask()`, and a backtracking `discuss()` does too. Guarding
  // both the public method and its internal callee would deadlock the session against
  // itself — worse than the bug being fixed — so the wrapper is on the public method
  // only and internal callers use the unguarded body.
  //
  // Asserted via `choose('advance')`, whose internal `ask()` is reached on a step the
  // fake has not already questioned. A re-entrant refusal would surface as
  // 「ask() refused: choose() is still in flight」 rather than a new question.
  const llm = new CountingLlm();
  const session = await started(llm);
  await session.submitAnswer('熵是体积的对数');
  await session.choose('advance');
  assert.equal(session.state, 'AWAIT_ANSWER', 'choose -> ask was refused as re-entrant');
  assert.equal(session.busy, false);
  assert.equal(session.record.cursor.stepIndex, 1);
});

// ---------------------------------------------------------------------------
// A failed ask() must leave a state the student can act from
// ---------------------------------------------------------------------------

test('a questioner failure does not strand the session in ASKING', async () => {
  const llm = new CountingLlm();
  const session = await started(llm);
  await session.submitAnswer('熵是体积的对数');

  llm.stall.add('questioner');
  await assert.rejects(() => session.choose('remain'));
  assert.notEqual(session.state, 'ASKING', 'ASKING accepts no student input at all');
  assert.equal(session.state, 'STEP_ENTER');
});

test('after a failed ask the retry of ask() is legal from the state left behind', async () => {
  // The reported dead end: 「routeStudentTurn() is not valid in state ASKING」 twice, with
  // a retry button that could only reproduce it. What makes the retry legal is the state
  // `#attempt` restores — STEP_ENTER, the one state every internal caller of ask() moves
  // through, and the only one a repeat of ask() is valid from.
  const llm = new CountingLlm();
  const session = await started(llm);
  await session.submitAnswer('熵是体积的对数');

  llm.stall.add('questioner');
  await assert.rejects(() => session.choose('advance'));
  assert.equal(session.state, 'STEP_ENTER');

  llm.stall.clear();
  await session.ask();
  assert.equal(session.state, 'AWAIT_ANSWER', 'the retry of ask() had to be legal');
});
