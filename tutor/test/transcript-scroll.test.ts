/**
 * The transcript follows the newest message to its end — and only then.
 *
 * Reported: "when a new tutor message finished to output, scroll to the end for the
 * conversation UI." Two defects, both measured in the panel's real flex layout
 * (`tmp/probe-scroll3.mjs`; a bare `height:` on a detached div reports
 * `clientHeight === scrollHeight`, so the first two probes read every gap as 0 and saw
 * nothing):
 *
 * 1. `api.reply` on the streamed path re-rendered the plain streamed text as markdown
 *    and returned without scrolling. Rendering makes the bubble TALLER — lists, block
 *    formulas, MathJax — so the end of the message the student had just watched arrive
 *    went 98px out of view at the moment it finished. MathJax compounds it: it resolves
 *    asynchronously, after any scroll the caller performs.
 *
 * 2. `append()` measured "is the student near the bottom" AFTER inserting the node, so
 *    the new node's own height counted against the 120px threshold. Any message taller
 *    than that suppressed its own autoscroll, and the leftover gap then suppressed the
 *    next one: 98px → 196px → further behind every turn.
 *
 * The exception this must not break: a student who has scrolled up to re-read an
 * earlier turn keeps their position. Yanking the view is worse than a missed scroll
 * they can perform themselves.
 *
 * Browser-verified: tmp/check-65-scroll.mjs (10 checks, every message kind).
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const messages = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/messages.js', import.meta.url)),
  'utf8',
);
const panel = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/panel.js', import.meta.url)),
  'utf8',
);

/** A named function's body, by brace matching from its declaration. */
function body(source: string, declaration: string): string {
  const start = source.indexOf(declaration);
  assert.ok(start >= 0, `${declaration} not found`);
  let depth = 0;
  for (let i = source.indexOf('{', start); i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    else if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  assert.fail(`unbalanced braces after ${declaration}`);
}

// ---------------------------------------------------------------------------
// Fault 1: the finished message
// ---------------------------------------------------------------------------

test('the streamed reply path scrolls after the final render', () => {
  const reply = body(messages, 'api.reply = function');
  // The early return for the streamed case is where it was missing entirely.
  const streamedBranch = reply.slice(0, reply.indexOf('return;'));
  assert.match(streamedBranch, /follow\(/, 'the streamed branch never re-follows');
});

test('the final render is given a post-typeset callback', () => {
  // MathJax is async: a scroll before it resolves is undone by the display formula it
  // inserts, so `renderMarkdown` has to be able to call back.
  assert.match(body(messages, 'api.reply = function'), /renderMarkdown\([^)]*,\s*follow\)/);
});

test('renderMarkdown forwards the callback to typeset', () => {
  const render = body(messages, 'function renderMarkdown');
  assert.match(render, /function renderMarkdown\(node, text, afterTypeset\)/);
  assert.match(render, /typeset\(node, afterTypeset\)/);
});

test('typeset runs the callback on every path, including no MathJax', () => {
  const fn = body(messages, 'function typeset(node, after)');
  // The no-MathJax early return must still fire it, or a page without MathJax would
  // silently lose every post-render scroll.
  assert.match(fn, /if \(!window\.MathJax[\s\S]*?if \(after\) after\(\);[\s\S]*?return;/);
  // And after the promise settles — .then, not only .catch, so a clean typeset counts.
  assert.match(fn, /\.then\(function \(\) \{\s*if \(after\) after\(\);/);
});

test('a malformed formula still lets the scroll happen', () => {
  // The catch swallows the error; the then must run regardless, or one bad formula
  // strands the transcript.
  const fn = body(messages, 'function typeset(node, after)');
  assert.ok(fn.indexOf('.catch(') < fn.indexOf('.then('), 'catch must precede then');
});

// ---------------------------------------------------------------------------
// Fault 2: measuring before the insert
// ---------------------------------------------------------------------------

test('append measures the scroll position before inserting the node', () => {
  const fn = body(messages, 'function append(node)');
  assert.ok(
    fn.indexOf('measure()') < fn.indexOf('container.appendChild'),
    'measured after the insert, so the new node counts against its own threshold',
  );
  assert.ok(fn.indexOf('container.appendChild') < fn.indexOf('follow()'));
});

test('the near-bottom threshold is still applied, not dropped', () => {
  // The fix must not become "always scroll": that breaks re-reading.
  assert.match(body(messages, 'function measure()'), /gap\(\) < 120/);
});

test('follow() respects the measured position unless forced', () => {
  const fn = body(messages, 'function follow(force)');
  assert.match(fn, /if \(force \|\| wasNearBottom\)/);
});

// ---------------------------------------------------------------------------
// Every card that is appended empty and then filled
// ---------------------------------------------------------------------------

for (const [name, declaration] of [
  ['a question card', 'api.question = function'],
  ['a hint', 'api.hint = function'],
  ['an evaluation', 'api.evaluation = function'],
  ['a summary', 'api.summary = function'],
  ['an achievement card', 'api.achievement = function'],
  ['a notice', 'api.notice = function'],
] as const) {
  test(`${name} follows once its content is in place`, () => {
    // `append` scrolls while the card is still empty — height ~0 — so the content it
    // then receives lands below the fold without this.
    assert.match(body(messages, declaration), /follow\(/);
  });
}

test('the student’s own message always takes the view', () => {
  // Sending is an explicit act: it is the one case where scrolling away from what they
  // were reading is what they asked for.
  assert.match(body(messages, 'api.student = function'), /follow\(true\)/);
});

// ---------------------------------------------------------------------------
// The shell's own scroll, now routed through the view
// ---------------------------------------------------------------------------

test('the view exposes an unconditional scrollToEnd', () => {
  assert.match(body(messages, 'api.scrollToEnd = function'), /follow\(true\)/);
});

test('the fullscreen toggle uses it rather than touching scrollTop', () => {
  const fn = body(panel, 'function setFullscreen');
  assert.match(fn, /view\.scrollToEnd\(\)/);
  assert.doesNotMatch(
    fn,
    /messages\.scrollTop\s*=/,
    'two owners of the scroll position will eventually disagree',
  );
});
