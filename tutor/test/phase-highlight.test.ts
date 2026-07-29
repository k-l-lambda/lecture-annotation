/**
 * The busy-state highlight on the phase indicator.
 *
 * The phase line is small, muted, and sits under the step rail, so during a 40-120s
 * model call — the one time it is the only thing on screen carrying information — it
 * was easy to miss. Bold plus a tinted background makes it findable.
 *
 * The set of highlighted states is derived from `PHASE_LABELS` rather than written out
 * in prose: a state added to the machine and not classified here would silently get
 * the wrong treatment, and "wrong" in the busy direction means the student sees an
 * idle-looking panel while a call is in flight.
 *
 * Browser-verified separately (`tmp/check-42-phasehl.mjs`, 12 checks) with the tint
 * measured as an alpha, and contrast checked in both colour schemes (16.5:1 light,
 * 11.3:1 slate).
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PHASE_LABELS } from '../src/core/types.ts';

const css = readFileSync(
  fileURLToPath(new URL('../../docs/stylesheets/tutor.css', import.meta.url)),
  'utf8',
);
const steprail = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/steprail.js', import.meta.url)),
  'utf8',
);

/** States where a model call is in flight — the student is waiting on the agent. */
const BUSY = ['PLANNING', 'PREP_DECISION', 'ASKING', 'GRADING', 'SUMMARIZING'] as const;

/** The selector list of the highlight rule, as shipped. */
function highlightSelectors(): string[] {
  const match = /((?:\.tutor-phase\[data-state="[A-Z_]+"\],?\s*)+)\{([^}]*)\}/.exec(css);
  assert.ok(match, 'no .tutor-phase[data-state=...] rule found');
  return Array.from((match[1] as string).matchAll(/data-state="([A-Z_]+)"/g)).map(
    (m) => m[1] as string,
  );
}

test('exactly the in-flight states are highlighted', () => {
  const selected = highlightSelectors();
  assert.deepEqual(selected.slice().sort(), BUSY.slice().sort() as unknown as string[]);
});

test('every highlighted state is a real session state', () => {
  // A typo in a selector fails silently — the rule simply never matches.
  for (const state of highlightSelectors()) {
    assert.ok(state in PHASE_LABELS, `${state} is not a SessionState`);
  }
});

test('the states where the student is being waited on are not highlighted', () => {
  // Marking 等待作答 as agent activity would say the opposite of what is true.
  const selected = new Set(highlightSelectors());
  for (const state of ['AWAIT_ANSWER', 'DISCUSSING', 'AWARD_DECISION', 'DONE', 'ABANDONED']) {
    assert.equal(selected.has(state), false, `${state} must not be highlighted`);
  }
});

test('no session state is left unclassified', () => {
  // If a state is added to the machine, this fails until someone decides which side of
  // the busy/idle line it belongs on.
  const known = new Set<string>([
    ...BUSY,
    'STEP_ENTER',
    'AWAIT_ANSWER',
    'DISCUSSING',
    'AWARD_DECISION',
    'DONE',
    'ABANDONED',
  ]);
  for (const state of Object.keys(PHASE_LABELS)) {
    assert.ok(known.has(state), `${state} is unclassified — highlight it or list it as idle`);
  }
});

test('the highlight is bold and tinted, not colour alone', () => {
  const match = /((?:\.tutor-phase\[data-state="[A-Z_]+"\],?\s*)+)\{([^}]*)\}/.exec(css);
  const decls = match![2] as string;
  // ui-spec.md §8: state never rests on colour alone. Weight is the redundant channel.
  assert.match(decls, /font-weight:\s*700/);
  assert.match(decls, /background:\s*color-mix\(in srgb, var\(--md-primary-fg-color\)/);
  // The muted `--light` foreground loses contrast against the tint.
  assert.match(decls, /color:\s*var\(--md-default-fg-color\)/);
});

test('the highlight hugs the text rather than bleeding across the panel', () => {
  // A full-width bar reads as a section divider, not a status. Measured at 0.12-0.33
  // of the panel width across the states.
  const base = /(^|\})\s*\.tutor-phase\s*\{([^}]*)\}/m.exec(css);
  assert.ok(base, 'the .tutor-phase base rule is gone');
  assert.match(base[2] as string, /display:\s*inline-block/);
  assert.match(base[2] as string, /padding:/);
});

test('the transition names its properties, so padding does not animate', () => {
  // `transition: all` would animate the padding and make the line twitch on every
  // state change.
  const base = /(^|\})\s*\.tutor-phase\s*\{([^}]*)\}/m.exec(css);
  const decls = base![2] as string;
  assert.match(decls, /transition:\s*background-color[^;]*color/);
  assert.doesNotMatch(decls, /transition:\s*all/);
});

test('the thinking counter does not clear the attribute the highlight keys off', () => {
  // `setThinking` rewrites textContent every second. If it touched `data-state` the
  // highlight would flicker off for the whole call — exactly the case it exists for.
  const fn = /api\.setThinking = function \(role, tokens\) \{([\s\S]*?)\n    \};/.exec(steprail);
  assert.ok(fn, 'setThinking not found');
  assert.doesNotMatch(fn[1] as string, /data-state/);
  // And `setPhase` is the one place that sets it.
  assert.match(steprail, /phaseNode\.setAttribute\("data-state", state\)/);
});
