/**
 * 「可以重试。」 with something to press.
 *
 * `StreamIdleError`'s message has always ended in that sentence, and the panel rendered
 * it as plain text. At AWAIT_ANSWER a student could at least retype their answer; a
 * planner or questioner turn that timed out left no route forward but reloading the
 * page, which loses the session.
 *
 * Two halves are pinned here: the UI offers the button only for failures retrying can
 * fix, and the harness leaves a state that a repeat is legal from. The second half is
 * what makes the first honest — the previous code commented that a failed call "returns
 * to the previous state" and then never did it, so a failed grade sat in `GRADING` with
 * the phase label still reading 评分中.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { FakeLlm } from '../src/shells/node/fake-llm.ts';
import { HttpError, StreamIdleError, isRetriable } from '../src/core/provider.ts';
import { TutorSession } from '../src/core/session.ts';
import type { ContentSource, Llm, LlmRequest, LlmResponse } from '../src/core/ports.ts';
import type { RoleName, SectionContent, Settings } from '../src/core/types.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

const read = (p: string) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const panel = read('../../docs/javascripts/tutor/panel.js');
const messages = read('../../docs/javascripts/tutor/messages.js');
const css = read('../../docs/stylesheets/tutor.css');

// ---------------------------------------------------------------------------
// The offer
// ---------------------------------------------------------------------------

test('the notice renderer accepts an action and renders a button for it', () => {
  assert.match(messages, /api\.notice = function \(text, level, action\)/);
  assert.match(messages, /tutor-notice__action/);
  // Spent on press: the outcome arrives as a new notice, and a second press would
  // stack another call on a session that is mid-turn again.
  assert.match(messages, /button\.disabled = true/);
});

test('the button is offered only for retriable failures', () => {
  // A 401 or a rejected tool payload does not become valid by asking again, and a
  // button that reruns it teaches the student the wrong thing about the error.
  assert.match(panel, /C\.isRetriable\(err\)/);
  assert.match(panel, /label: "重试"/);
});

test('isRetriable is exported to the UI, so both halves agree what is transient', () => {
  assert.match(read('../src/shells/web/index.ts'), /export \{ isRetriable \}/);
  assert.equal(isRetriable(new StreamIdleError(120_000)), true);
  assert.equal(isRetriable(new HttpError(401, 'bad key')), false);
  assert.equal(isRetriable(new HttpError(429, 'slow down')), true);
  assert.equal(isRetriable(new HttpError(503, 'upstream')), true);
  // An abort is the student pressing 停止; offering to undo that would be perverse.
  assert.equal(isRetriable(Object.assign(new Error('cancelled'), { name: 'AbortError' })), false);
});

test('every turn the panel starts is retriable, including startup', () => {
  // Startup used to bypass `guard` entirely, which is why a planner that died at
  // maxOutputTokens left the thinking counter ticking under the error notice.
  assert.match(panel, /guard\(planAndAsk\(\), planAndAsk\)/);
  assert.match(panel, /guard\(talk\(\), talk\)/);
  assert.match(panel, /guard\(routed\(\), routed\)/);
  assert.match(panel, /guard\(pick\(\), pick\)/);
  // A second run must not pay for a second planner call.
  assert.match(panel, /session\.record\.steps\.length \? null : session\.plan\(\)/);
});

test('the button is a real tap target, not a text link', () => {
  assert.match(css, /\.tutor-notice__action \{/);
  assert.match(css, /\.tutor-notice__action:disabled/);
});

// ---------------------------------------------------------------------------
// The state a retry starts from
// ---------------------------------------------------------------------------

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

/** Fails the named roles with a stream stall, then behaves once they are cleared. */
class StallingLlm implements Llm {
  readonly inner = new FakeLlm(section());
  readonly stall = new Set<RoleName>();

  async call(req: LlmRequest): Promise<LlmResponse> {
    if (this.stall.has(req.role)) throw new StreamIdleError(120_000);
    return this.inner.call(req);
  }
}

function settings(): Settings {
  return { ...defaultSettings(), model: 'm', apiKey: 'k', baseUrl: 'http://x/v1' };
}

async function started(llm: Llm) {
  const factory = new IDBFactory() as unknown as IDBFactoryLike;
  const session = await TutorSession.create({
    page: 'ebooks/x/ch.md',
    sectionId: 's',
    settings: settings(),
    store: await IdbStore.open({ factory, name: `retry-${Math.random().toString(36).slice(2)}` }),
    llm,
    content: { getSection: async () => section() } as ContentSource,
  });
  await session.plan();
  await session.ask();
  return session;
}

test('a failed grade returns to AWAIT_ANSWER instead of sticking in GRADING', async () => {
  const llm = new StallingLlm();
  const session = await started(llm);

  llm.stall.add('grader');
  await assert.rejects(() => session.submitAnswer('熵是体积的对数'), /没有新数据/);
  assert.equal(session.state, 'AWAIT_ANSWER', 'the phase label must not read 评分中 forever');

  llm.stall.clear();
  await session.submitAnswer('熵是体积的对数');
  assert.equal(session.state, 'DISCUSSING');
  assert.equal(session.currentStep!.attempts.length, 1, 'the retry did not open a second attempt');
  assert.notEqual(session.currentStep!.attempts.at(-1)!.score, null);
});

test('a failed reply leaves no orphan student turn for the retry to duplicate', async () => {
  const llm = new StallingLlm();
  const session = await started(llm);
  await session.submitAnswer('熵是体积的对数');

  llm.stall.add('tutor_reply');
  await assert.rejects(() => session.discuss('为什么取对数？'), /没有新数据/);
  const log = session.currentStep!.attempts.at(-1)!.discussion;
  assert.equal(log.length, 0, 'the unanswered question was un-logged');

  llm.stall.clear();
  await session.discuss('为什么取对数？');
  assert.deepEqual(
    log.map((d) => d.role),
    ['student', 'tutor'],
    'not student,student,tutor — the tutor would see the question asked twice',
  );
});

test('a failed reply at AWAIT_ANSWER also leaves the state alone', async () => {
  const llm = new StallingLlm();
  const session = await started(llm);

  llm.stall.add('tutor_reply');
  await assert.rejects(() => session.discuss('题目问的是什么？', 'needs_clarification'));
  assert.equal(session.state, 'AWAIT_ANSWER');
  assert.equal(session.currentStep!.attempts.at(-1)!.clarifications.length, 0);
});
