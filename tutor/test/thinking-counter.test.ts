/**
 * The thinking counter: the number must not bounce, and it must stop.
 *
 * Both bugs were reported from a live browser session — "token 计数似乎总在两个数字之间
 * 来回跳动，后面的读秒也没有正确停止下来" — and both were reproduced in the real page
 * before being fixed (`tmp/probe-thinking.mjs`, `tmp/probe-thinkstop.mjs`).
 *
 * 1. `setInterval` closed over the `tokens` **argument** of whichever `setThinking`
 *    call created the timer. Once a later call reported a larger count, the timer
 *    kept repainting the stale one, so the display alternated between two numbers:
 *    the probe recorded 120 / 120 / 460 / 120 / 120.
 *
 * 2. The only `stopThinking()` caller was `setPhase`. A turn that *throws* never
 *    emits a `phase` event — the harness raises before `#transition` — so after a
 *    planner cut off at `maxOutputTokens` the seconds went on counting under the
 *    error notice, still claiming to think. `stopThinking` was not even reachable
 *    from the shell.
 *
 * Run against the shipped file with a DOM stub and a captured interval callback, so
 * the assertions are about behaviour rather than the shape of the source.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../../docs/javascripts/tutor/steprail.js', import.meta.url));
const steprail = readFileSync(SRC, 'utf8');
const panel = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/panel.js', import.meta.url)),
  'utf8',
);

interface Node {
  className: string;
  textContent: string;
  children: Node[];
  parentNode: Node | null;
  setAttribute(name: string, value: string): void;
  appendChild(child: Node): Node;
  remove(): void;
  querySelector(): Node | null;
  querySelectorAll(): Node[];
  classList: { add(): void; remove(): void; toggle(): void };
}

function node(): Node {
  const self: Node = {
    className: '',
    textContent: '',
    children: [],
    parentNode: null,
    setAttribute() {},
    appendChild(child) {
      child.parentNode = self;
      self.children.push(child);
      return child;
    },
    remove() {},
    querySelector: () => node(),
    querySelectorAll: () => [],
    classList: { add() {}, remove() {}, toggle() {} },
  };
  return self;
}

/**
 * Loads the shipped IIFE with a stub DOM, a controllable clock, and the interval
 * callback captured rather than scheduled — so a "tick" is an explicit call and the
 * test never sleeps.
 */
function railHarness() {
  const phase = node();
  let now = 1_000_000;
  const ticks: Array<() => void> = [];
  let cleared = 0;

  const sandbox = {
    document: { createElement: () => node() },
    window: {} as Record<string, unknown>,
    setInterval: (fn: () => void) => {
      ticks.push(fn);
      return ticks.length;
    },
    clearInterval: () => {
      cleared += 1;
      ticks.length = 0;
    },
    Date: { now: () => now },
  };

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function(
    'document', 'window', 'setInterval', 'clearInterval', 'Date',
    steprail,
  )(sandbox.document, sandbox.window, sandbox.setInterval, sandbox.clearInterval, sandbox.Date);

  const factory = sandbox.window['TutorStepRail'] as { create(t: unknown): Record<string, never> };
  const view = factory.create({ rail: node(), stepLine: node(), phase }) as unknown as {
    setThinking(role: string, tokens: number): void;
    setPhase(state: string, label: string): void;
    stopThinking?(label?: string): void;
  };

  return {
    view,
    text: () => phase.textContent,
    advance: (ms: number) => {
      now += ms;
    },
    tick: () => ticks.forEach((fn) => fn()),
    ticking: () => ticks.length > 0,
    cleared: () => cleared,
  };
}

// ---------------------------------------------------------------------------
// Bug 1: the number must not go backwards
// ---------------------------------------------------------------------------

test('a tick after a larger count repaints the larger count, not the first one', () => {
  const h = railHarness();
  h.view.setThinking('planner', 120);
  h.advance(1200);
  h.view.setThinking('planner', 460);
  assert.match(h.text(), /460 tokens/);

  h.advance(1000);
  h.tick();
  // The pre-fix timer closed over 120 and painted it here, which is the flip-flop.
  assert.match(h.text(), /460 tokens/, 'the timer repainted a stale token count');
});

test('the count never decreases across a full update-and-tick sequence', () => {
  const h = railHarness();
  const seen: number[] = [];
  const record = () => {
    const m = /… (\d+) tokens/.exec(h.text());
    if (m) seen.push(Number(m[1]));
  };

  for (const tokens of [40, 210, 640, 1500]) {
    h.view.setThinking('planner', tokens);
    record();
    h.advance(1000);
    h.tick();
    record();
  }

  const monotonic = seen.every((n, i) => i === 0 || n >= (seen[i - 1] as number));
  assert.ok(monotonic, `token count went backwards: ${seen.join(' → ')}`);
});

test('the seconds do advance between token updates', () => {
  // The counter exists because a reasoning model is otherwise silent for 70-129s, so
  // the guard against a bouncing number must not freeze the clock instead.
  const h = railHarness();
  h.view.setThinking('grader', 80);
  assert.match(h.text(), /· 0s$/);
  h.advance(3000);
  h.tick();
  assert.match(h.text(), /· 3s$/);
  assert.match(h.text(), /80 tokens/);
});

test('the role label follows the role that reported last', () => {
  const h = railHarness();
  h.view.setThinking('planner', 10);
  assert.match(h.text(), /^规划生成中…/);
  h.view.setThinking('tutor_reply', 20);
  h.advance(1000);
  h.tick();
  assert.match(h.text(), /^讲解生成中…/, 'a tick restored the previous role');
});

test('the label says 生成中, not 思考中', () => {
  // The counter now includes tool-call arguments and prose, so a planner writing
  // `set_steps` is being counted while it is past thinking. Claiming 思考中 there was
  // wrong in the one case the counter matters most.
  const h = railHarness();
  h.view.setThinking('planner', 10);
  assert.match(h.text(), /生成中/);
  assert.doesNotMatch(h.text(), /思考中/);
});

// ---------------------------------------------------------------------------
// Bug 2: it must stop when the turn ends, including when the turn threw
// ---------------------------------------------------------------------------

test('the rail exposes stopThinking, so a failed turn can end the counter', () => {
  const h = railHarness();
  assert.equal(typeof h.view.stopThinking, 'function');
});

test('stopThinking clears the interval and restores the phase label', () => {
  const h = railHarness();
  h.view.setThinking('planner', 300);
  assert.ok(h.ticking());
  h.view.stopThinking!('正在通读本节…');
  assert.equal(h.ticking(), false);
  assert.equal(h.cleared() > 0, true);
  assert.equal(h.text(), '正在通读本节…');
});

test('a tick can no longer repaint 思考中 after stopThinking', () => {
  const h = railHarness();
  h.view.setThinking('planner', 300);
  const stale = [...(function* () { yield* []; })()]; // no-op, keeps the intent explicit
  void stale;
  h.view.stopThinking!('等待作答');
  h.advance(5000);
  h.tick(); // the interval list is empty; nothing should repaint
  assert.equal(h.text(), '等待作答');
});

test('stopThinking with no label leaves the text alone', () => {
  // Called from the success path too, where a `phase` event has already written the
  // right label and overwriting it with a guess would be worse than doing nothing.
  const h = railHarness();
  h.view.setThinking('planner', 300);
  h.view.stopThinking!();
  assert.match(h.text(), /300 tokens/);
  assert.equal(h.ticking(), false);
});

test('setPhase still stops the counter', () => {
  const h = railHarness();
  h.view.setThinking('planner', 300);
  h.view.setPhase('ASKING', '正在出题…');
  assert.equal(h.ticking(), false);
  assert.equal(h.text(), '正在出题…');
});

test('a restarted counter measures from its own start, not the previous turn', () => {
  const h = railHarness();
  h.view.setThinking('planner', 100);
  h.advance(9000);
  h.view.setPhase('ASKING', '正在出题…');
  h.view.setThinking('questioner', 30);
  assert.match(h.text(), /· 0s$/, 'elapsed leaked across turns');
});

// ---------------------------------------------------------------------------
// The shell has to call it on both failure paths
// ---------------------------------------------------------------------------

test('the retriable-turn guard stops the counter', () => {
  // `guard()` catches, notices, and re-enables the composer. Without this the seconds
  // ran on under the error text.
  const body = /function guard\(promise, again\)\s*\{[\s\S]*?\n    \}\n\n/.exec(panel);
  assert.ok(body, 'guard() not found in panel.js');
  assert.match(body[0], /stopThinking/);
  // …and it must be on the settle path, not only inside the catch: the counter has to
  // stop whether the turn failed or not.
  assert.match(body[0], /\.then\(function \(\) \{[\s\S]*stopThinking/);
});

test('the startup chain stops the counter when plan() or ask() throws', () => {
  // This is the reported case: planner dies at maxOutputTokens. Startup used to have
  // its own `.catch` with a second `stopThinking` call in it; now it goes through
  // `guard`, which is where the settle path already lives — one place that stops the
  // counter rather than two that have to be kept in step. Asserting on the routing
  // rather than on a duplicated call is the point: a third entry point added later
  // gets the behaviour for free only if it, too, goes through `guard`.
  assert.match(panel, /guard\(planAndAsk\(\), planAndAsk\)/);
  assert.doesNotMatch(
    panel,
    /runtime\s+\.start\(\{[\s\S]*?\.catch\(/,
    'startup should not re-implement the catch that guard() owns',
  );
});
