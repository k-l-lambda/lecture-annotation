/**
 * Student-turn routing at AWAIT_ANSWER and DISCUSSING.
 *
 * These are the first tests that drive a real `TutorSession` rather than calling
 * `executeTool` or a validator directly, because routing is only meaningful as a
 * property of the machine: what matters is which state the session lands in and
 * what it recorded, not what any single function returned.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { FakeLlm } from '../src/shells/node/fake-llm.ts';
import { parseRouterReply } from '../src/core/roles.ts';
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
  '',
  '$$\\Delta S \\ge 0$$',
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
    formulaCount: 2,
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
 * Wraps FakeLlm's auto mode so the planner/questioner/grader behave normally, but
 * the router returns whatever the test dictates. Routing is what is under test;
 * the rest of the ladder is scaffolding.
 */
class RoutingLlm implements Llm {
  readonly inner: FakeLlm;
  #routes: string[];
  routerCalls = 0;

  constructor(routes: string[]) {
    this.inner = new FakeLlm(section());
    this.#routes = routes;
  }

  async call(req: LlmRequest): Promise<LlmResponse> {
    if (req.role !== 'router') return this.inner.call(req);
    this.routerCalls += 1;
    const next = this.#routes.shift() ?? '{"route":"answer","secondary":null,"reason":"默认"}';
    if (next === '__throw__') throw new Error('router endpoint down');
    return {
      text: next,
      toolCalls: [],
      usage: { calls: 1, promptTokens: 10, completionTokens: 5, reasoningTokens: 0 },
    };
  }
}

async function freshStore(): Promise<IdbStore> {
  const factory = new IDBFactory() as unknown as IDBFactoryLike;
  return IdbStore.open({ factory, name: `routing-${Math.random().toString(36).slice(2)}` });
}

/** A session parked at AWAIT_ANSWER on step 1, ready for a routed turn. */
async function atAwaitAnswer(routes: string[]) {
  const llm = new RoutingLlm(routes);
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
  return { session, llm };
}

test('a clarification request is explained without being graded', async () => {
  const { session } = await atAwaitAnswer([
    '{"route":"clarify","secondary":null,"reason":"先解释题目"}',
  ]);

  const route = await session.routeStudentTurn('这题问的是什么意思？');
  assert.equal(route.route, 'clarify');
  await session.discuss('这题问的是什么意思？', 'needs_clarification');

  // The point of the whole change: asking what a question means must not consume
  // the attempt or score it.
  assert.equal(session.state, 'AWAIT_ANSWER');
  const step = session.currentStep!;
  const attempt = step.attempts[step.attempts.length - 1]!;
  assert.equal(attempt.score, null);
  assert.equal(attempt.answer, null);
  assert.equal(attempt.clarifications.length, 2, 'student turn + tutor reply');
  assert.equal(attempt.clarifications[0]!.role, 'student');
  assert.equal(attempt.discussion.length, 0, 'pre-answer talk is not post-grade discussion');
});

test('a clarification does not feed discussedPoints', async () => {
  // discussedPoints drives the repetition guard. If explaining a question counted
  // as teaching its answer, the guard would reject the variant the student still
  // has to attempt — the clarification would cost them the question.
  const { session } = await atAwaitAnswer([
    '{"route":"clarify","secondary":null,"reason":"先解释题目"}',
  ]);
  await session.routeStudentTurn('「粗粒化」在这里指什么？');
  await session.discuss('「粗粒化」在这里指什么？', 'needs_clarification');

  const attempt = session.currentStep!.attempts.at(-1)!;
  assert.deepEqual(attempt.discussedPoints, []);
  assert.ok(attempt.clarifications.length > 0);
});

test('an answer still routes to grading', async () => {
  const { session } = await atAwaitAnswer([
    '{"route":"answer","secondary":null,"reason":"去评分"}',
  ]);
  const route = await session.routeStudentTurn('熵是盒子体积的对数。');
  assert.equal(route.route, 'answer');
  await session.submitAnswer('熵是盒子体积的对数。');
  assert.equal(session.state, 'DISCUSSING');
  assert.notEqual(session.currentStep!.attempts.at(-1)!.score, null);
});

test('a router that throws falls back to grading instead of blocking the student', async () => {
  // Routing is a convenience on top of the old behaviour, so losing it must
  // degrade to exactly that old behaviour — never to a student who cannot submit.
  const { session } = await atAwaitAnswer(['__throw__']);
  const route = await session.routeStudentTurn('熵是盒子体积的对数。');
  assert.equal(route.route, 'answer');
  await session.submitAnswer('熵是盒子体积的对数。');
  assert.equal(session.state, 'DISCUSSING');
});

test('skip is legal from AWAIT_ANSWER and records the step as skipped', async () => {
  const { session } = await atAwaitAnswer([
    '{"route":"skip","secondary":null,"reason":"跳过本步"}',
  ]);
  const first = session.currentStep!;
  const route = await session.routeStudentTurn('这步跳过吧');
  assert.equal(route.route, 'skip');
  await session.choose('skip');

  assert.equal(first.chipState, 'skipped');
  assert.equal(first.attempts.at(-1)!.score, null, 'skipped without being graded');
  // The session moved on. State is AWAIT_ANSWER again because the next step
  // immediately asks its own question, so identity is what to assert on, not phase.
  assert.notEqual(session.currentStep?.id, first.id);
});

test('advance is refused from AWAIT_ANSWER', async () => {
  // A step advanced without an attempt and without a `skipped` mark is
  // indistinguishable from one that was completed, which would corrupt the
  // achievement gate's denominator. Wanting to move on unanswered IS skip.
  const { session } = await atAwaitAnswer([]);
  await assert.rejects(() => session.choose('advance'), /not valid in state AWAIT_ANSWER/);
  assert.equal(session.state, 'AWAIT_ANSWER');
});

test('advance is accepted from DISCUSSING', async () => {
  const { session } = await atAwaitAnswer([
    '{"route":"answer","secondary":null,"reason":"去评分"}',
    '{"route":"advance","secondary":null,"reason":"进入下一步"}',
  ]);
  await session.routeStudentTurn('熵是盒子体积的对数。');
  await session.submitAnswer('熵是盒子体积的对数。');
  assert.equal(session.state, 'DISCUSSING');

  const before = session.currentStep!.id;
  const route = await session.routeStudentTurn('懂了，下一步吧');
  assert.equal(route.route, 'advance');
  await session.choose('advance');
  assert.notEqual(session.currentStep?.id, before);
});

// ---------------------------------------------------------------------------
// parseRouterReply — the failure paths, unit-tested directly
// ---------------------------------------------------------------------------

test('a fenced or prose-wrapped route object still parses', async () => {
  const fenced = parseRouterReply('```json\n{"route":"clarify","reason":"先解释"}\n```', 'AWAIT_ANSWER');
  assert.equal(fenced.route, 'clarify');
  const chatty = parseRouterReply('好的。{"route":"hint","reason":"给提示"} 就这样。', 'AWAIT_ANSWER');
  assert.equal(chatty.route, 'hint');
});

test('unparseable or invented routes fall back to the phase default', async () => {
  for (const bad of ['', 'not json at all', '{"route":"teleport"}', '{"route":', 'null']) {
    assert.equal(parseRouterReply(bad, 'AWAIT_ANSWER').route, 'answer', `input: ${bad}`);
  }
  // DISCUSSING has no `answer` route — its default is to keep talking.
  assert.equal(parseRouterReply('garbage', 'DISCUSSING').route, 'clarify');
});

test('each fallback names its own cause', async () => {
  // Every one of these produced the same reason string once, which made a live
  // misroute undiagnosable: an empty reply and an invented route are different
  // bugs with the same visible behaviour.
  const reasons = [
    parseRouterReply('', 'AWAIT_ANSWER').reason,
    parseRouterReply('抱歉我不确定', 'AWAIT_ANSWER').reason,
    // Braces present but the contents are not valid JSON — a distinct failure
    // from `{"route":`, which has no closing brace and so never reaches the parse.
    parseRouterReply('{route: clarify,}', 'AWAIT_ANSWER').reason,
    parseRouterReply('{"route":"teleport"}', 'AWAIT_ANSWER').reason,
  ];
  assert.equal(new Set(reasons).size, reasons.length, `not distinct: ${reasons.join(' / ')}`);
  // The empty case is the one that actually happened live: reasoning consumed the
  // whole output cap, so the turn came back with no text.
  assert.match(reasons[0]!, /没有输出/);
});

test('a route legal only in the other phase is refused, not remapped', async () => {
  // `advance` at AWAIT_ANSWER would abandon a step with no attempt recorded.
  assert.equal(parseRouterReply('{"route":"advance"}', 'AWAIT_ANSWER').route, 'answer');
  // `answer` at DISCUSSING refers to a question that was already graded.
  assert.equal(parseRouterReply('{"route":"answer"}', 'DISCUSSING').route, 'clarify');
});

test('a secondary intent is kept when valid and dropped when not', async () => {
  const both = parseRouterReply(
    '{"route":"answer","secondary":"needs_clarification","reason":"先评分"}',
    'AWAIT_ANSWER',
  );
  assert.equal(both.route, 'answer', 'an answer with a question attached is still an answer');
  assert.equal(both.secondary, 'needs_clarification');

  assert.equal(parseRouterReply('{"route":"answer","secondary":"nonsense"}', 'AWAIT_ANSWER').secondary, null);
  assert.equal(parseRouterReply('{"route":"answer","secondary":"null"}', 'AWAIT_ANSWER').secondary, null);
});

