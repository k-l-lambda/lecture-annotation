/**
 * What happens when a reply turn backtracks — `insert_prerequisite_step` from inside
 * `tutor_reply`, which is the one tool call that moves the cursor while a question is
 * still pending.
 *
 * Every assertion here comes from one live session (`段落-1`, 2026-07-30) in which the
 * insert left three fields disagreeing about where the session was: the cursor pointed
 * at the new step, `#liveQuestionId` at the abandoned question, and the state at
 * AWAIT_ANSWER. The visible results were a tutor that answered nothing the student
 * asked, a transcript missing four turns, and a correct answer to the tutor's own
 * question scored 1/5 against the questioner's.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { FakeLlm } from '../src/shells/node/fake-llm.ts';
import { TutorSession } from '../src/core/session.ts';
import type { Llm, LlmRequest, LlmResponse, ContentSource } from '../src/core/ports.ts';
import type { SectionContent, Settings } from '../src/core/types.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

const SECTION_TEXT = [
  '粗略地说，熵是一种对系统"混乱程度"的量度。',
  '',
  '$$S = k \\log V$$',
  '',
  '这里 $V$ 是包含系统微观态的粗粒化盒子体积。第二定律说的是熵不减少。',
].join('\n');

function section(): SectionContent {
  return {
    page: 'ebooks/x/chapter_27.md',
    sectionId: '273-熵',
    heading: '27.3 熵',
    tutorTitle: null,
    level: 2,
    annotation: SECTION_TEXT,
    transcript: null,
    subHeadings: [],
    formulaCount: 1,
    chars: SECTION_TEXT.length,
    truncated: false,
    fromSource: true,
  };
}

const content: ContentSource = { getSection: async () => section() };

function settings(): Settings {
  return { ...defaultSettings(), model: 'test-model', apiKey: 'k', baseUrl: 'http://x/v1' };
}

/**
 * A `tutor_reply` that backtracks on its first turn and talks normally afterwards,
 * recording the context it was handed each time so the tests can assert on what the
 * model could actually see.
 */
class BacktrackingLlm implements Llm {
  readonly inner: FakeLlm;
  replies = 0;
  /** The `user` JSON block of every tutor_reply request, in order. */
  contexts: Array<Record<string, unknown>> = [];
  /** The trailing conversation messages of every tutor_reply request. */
  tails: Array<Array<{ role: string; content: string }>> = [];

  readonly route: string;

  constructor(route = '{"route":"too_hard","secondary":null,"reason":"先退一步"}') {
    this.route = route;
    this.inner = new FakeLlm(section());
  }

  async call(req: LlmRequest): Promise<LlmResponse> {
    if (req.role === 'router') {
      return {
        text: this.route,
        toolCalls: [],
        usage: { calls: 1, promptTokens: 10, completionTokens: 5, reasoningTokens: 0 },
      };
    }
    if (req.role !== 'tutor_reply') return this.inner.call(req);

    this.contexts.push(JSON.parse(req.messages[1]!.content) as Record<string, unknown>);
    this.tails.push(
      req.messages.slice(2).map((m) => ({ role: m.role, content: m.content })),
    );
    this.replies += 1;

    if (this.replies === 1) {
      return {
        text: '已经帮你退了一步，先只谈实数情形。',
        toolCalls: [
          {
            id: 'call:1',
            name: 'insert_prerequisite_step',
            arguments: JSON.stringify({
              beforeStepId: 'prep',
              title: '实向量空间的内积公理',
              goal: '说出三条公理',
              knowledgePointIds: ['kp:auto-1'],
              reason: 'student_said_too_hard',
            }),
          },
        ],
        usage: { calls: 1, promptTokens: 10, completionTokens: 5, reasoningTokens: 0 },
      };
    }
    return {
      text: '正定性是在复数上出问题的那一条。',
      toolCalls: [],
      usage: { calls: 1, promptTokens: 10, completionTokens: 5, reasoningTokens: 0 },
    };
  }
}

async function freshStore(): Promise<IdbStore> {
  const factory = new IDBFactory() as unknown as IDBFactoryLike;
  return IdbStore.open({ factory, name: `backtrack-${Math.random().toString(36).slice(2)}` });
}

async function atAwaitAnswer(llm: Llm) {
  const session = await TutorSession.create({
    page: 'ebooks/x/chapter_27.md',
    sectionId: '273-熵',
    settings: settings(),
    store: await freshStore(),
    llm,
    content,
  });
  await session.plan();
  await session.ask();
  assert.equal(session.state, 'AWAIT_ANSWER');
  return session;
}

test('a backtrack lands on the new step with its own question', async () => {
  const llm = new BacktrackingLlm();
  const session = await atAwaitAnswer(llm);
  const abandoned = session.currentStep!;

  await session.discuss('这题太难了', 'too_hard');

  const landed = session.currentStep!;
  assert.notEqual(landed.id, abandoned.id, 'the cursor moved to the inserted step');
  assert.equal(landed.inserted, true);
  // The live session stopped here, at AWAIT_ANSWER on the PREVIOUS step's question,
  // with the new step holding no attempt at all.
  assert.equal(landed.attempts.length, 1, 'the inserted step asked its own question');
  assert.equal(session.state, 'AWAIT_ANSWER');
});

test('an answer after a backtrack is graded against the new step, or not at all', async () => {
  const llm = new BacktrackingLlm();
  const session = await atAwaitAnswer(llm);
  const abandoned = session.currentStep!;
  const staleQuestion = abandoned.attempts.at(-1)!;

  await session.discuss('这题太难了', 'too_hard');
  await session.submitAnswer('对称性');

  // The abandoned question keeps no score: it was never answered.
  assert.equal(staleQuestion.score, null, 'the abandoned question was not graded');
  assert.equal(staleQuestion.answer, null);
  assert.equal(staleQuestion.exitChoice, 'remain', 'recorded as left, not as failed');
  // The answer went to the step the student was actually looking at.
  const graded = session.currentStep!.attempts.at(-1)!;
  assert.equal(graded.answer, '对称性');
  assert.notEqual(graded.score, null);
});

test('every turn of a backtracking exchange is recorded', async () => {
  const llm = new BacktrackingLlm();
  const session = await atAwaitAnswer(llm);
  const left = session.currentStep!;

  await session.discuss('这题太难了', 'too_hard');
  const landed = session.currentStep!;
  await session.discuss('那三条公理里哪条在复数上有问题？');

  // Turn 1 belongs to the question that was pending when it was said.
  assert.deepEqual(
    left.attempts.at(-1)!.clarifications.map((d) => d.role),
    ['student', 'tutor'],
  );
  // Turn 2 came after the insert. Before the fix `discuss()` found no attempt on the
  // new step, `if (log)` silently skipped the push, and both halves vanished — from
  // the export and from the next reply's history alike.
  const after = [
    ...landed.dialogue,
    ...landed.attempts.flatMap((a) => [...a.clarifications, ...a.discussion]),
  ];
  assert.equal(after.length, 2, `student turn + tutor reply, got ${after.length}`);
  assert.ok(
    after.some((d) => d.role === 'student' && d.text.includes('哪条在复数上有问题')),
    'the student turn survived',
  );
});

test('a turn on a step with no attempt is recorded, not dropped', async () => {
  // The `if (log)` bug, pinned on its own. The insert reconciliation now gives the new
  // step a question immediately, which hides this path in an end-to-end run — so drive
  // it directly: an inserted step, entered but not yet asked, is exactly the shape
  // `discuss()` used to lose a turn on, and any future path that reaches this state
  // must not lose one either.
  const llm = new BacktrackingLlm();
  const session = await atAwaitAnswer(llm);
  await session.discuss('这题太难了', 'too_hard');

  const step = session.currentStep!;
  step.attempts.length = 0; // as it was between the insert and the first ask
  await session.discuss('先讲讲这一条');

  assert.equal(step.dialogue.length, 2, 'the step-level log took both halves');
  assert.equal(step.dialogue[0]!.role, 'student');
  assert.match(step.dialogue[0]!.text, /先讲讲这一条/);
  assert.equal(step.dialogue[1]!.role, 'tutor');
});

test('the two halves of an exchange get distinct timestamps', async () => {
  // Both shared one `at` in the live export, because the ISO string was captured once
  // before the call and reused after it — so a transcript could not be ordered by time.
  const llm = new BacktrackingLlm();
  const session = await atAwaitAnswer(llm);
  // Held by identity: the insert splices ahead of this step, so its index shifts.
  const spoken = session.currentStep!;
  await session.discuss('这题太难了', 'too_hard');

  const [student, tutor] = spoken.attempts.at(-1)!.clarifications;
  assert.ok(student && tutor, 'both halves are present');
  assert.ok(tutor.at >= student.at, 'the reply is not stamped before the question');
});

test('the reply role always receives what the student said', async () => {
  const llm = new BacktrackingLlm();
  const session = await atAwaitAnswer(llm);
  await session.discuss('这题太难了', 'too_hard');
  await session.discuss('那三条公理里哪条在复数上有问题？');

  // Indexed by content, not position: the first `discuss()` spends two model calls,
  // because `runProseTurn` feeds the tool result back for the model to narrate.
  assert.deepEqual(
    llm.contexts.map((c) => c['studentText']),
    ['这题太难了', '这题太难了', '那三条公理里哪条在复数上有问题？'],
  );
  // The last turn is the one that broke: its history came from an empty log, so the
  // model saw a step description and no question, and replied by asking what to discuss.
  const tail = llm.tails.at(-1)!;
  assert.equal(tail.at(-1)!.role, 'user');
  assert.match(tail.at(-1)!.content, /哪条在复数上有问题/);
});

test('an explain route reaches the rules that permit answering outright', async () => {
  const llm = new BacktrackingLlm('{"route":"explain","secondary":null,"reason":"直接讲"}');
  const session = await atAwaitAnswer(llm);

  await session.applyRoute(
    await session.routeStudentTurn('你为什么不正面回答？到底哪一条在复数上有问题？'),
    '你为什么不正面回答？到底哪一条在复数上有问题？',
  );

  const ctx = llm.contexts[0]!;
  assert.equal(ctx['intentHint'], 'wants_explanation');
  // The router's own justification, which used to be shown to the student and withheld
  // from the tutor that had to act on it.
  assert.equal(ctx['routeReason'], '直接讲');
  assert.match(String(ctx['rules']), /不要再重述题目/);
});
