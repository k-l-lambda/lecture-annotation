/**
 * Where the phase line lives, and why the choice buttons are styled here.
 *
 * Two things this pins:
 *
 * 1. The phase line sits below the transcript, not in the header. 讲解思考中… describes
 *    the reply being written now, so it belongs at the edge the next message arrives
 *    from. Moving it means it must also collapse when idle — an always-on gap above
 *    the composer reads as a layout bug — and `padding: 0` on the wrapper was not
 *    enough, since an empty div still generates a line box (measured 17px).
 *
 * 2. Every Material `.md-button` rule is scoped under `.md-typeset`, and the panel is
 *    outside it. So `.tutor-choices__button md-button` inherited no border, no
 *    background, no padding and `cursor: default`: the choice row painted as bare
 *    black text. A request to "shrink the padding" had no padding to shrink, so the
 *    styling is declared here in full at the smaller size.
 *
 * Browser-verified: tmp/check-51-phasebar.mjs (11 checks, desktop),
 * tmp/check-52-relocated.mjs (highlight + planning checklist + AA contrast in both
 * schemes), tmp/check-53-mobile.mjs (6 checks, 390x844 bottom sheet).
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(
  fileURLToPath(new URL('../../docs/stylesheets/tutor.css', import.meta.url)),
  'utf8',
);
const panel = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/panel.js', import.meta.url)),
  'utf8',
);
const steprail = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/steprail.js', import.meta.url)),
  'utf8',
);

/** A CSS rule's declaration block, by exact selector. */
function rule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`, 'm').exec(css);
  assert.ok(match, `no rule for ${selector}`);
  return match[2] as string;
}

// ---------------------------------------------------------------------------
// The phase line's new home
// ---------------------------------------------------------------------------

test('the phase line is appended below the transcript, not to the header', () => {
  // Order in the DOM is the order on screen here, so the assertion is positional.
  const order = [...panel.matchAll(/root\.appendChild\((\w+)\)/g)].map((m) => m[1]);
  const messages = order.indexOf('messages');
  const bar = order.indexOf('phaseBar');
  const composer = order.indexOf('composer');
  assert.ok(bar > messages, 'the phase bar must come after the transcript');
  assert.ok(bar < composer, 'the phase bar must come before the composer');
});

test('the header no longer holds the phase line', () => {
  const headerAppends = [...panel.matchAll(/header\.appendChild\((\w+)\)/g)].map((m) => m[1]);
  assert.ok(!headerAppends.includes('phase'), 'phase is still appended to the header');
  // The rail and step line stay: they are context, not activity.
  assert.ok(headerAppends.includes('rail'));
  assert.ok(headerAppends.includes('stepLine'));
});

test('the phase node keeps its own live region after the move', () => {
  // Announcing 正在出题… without re-reading the transcript is the whole reason it is
  // not simply a message (ui-spec.md §8). The move must not drop it.
  assert.match(panel, /phase\.setAttribute\("aria-live", "polite"\)/);
});

test('an idle phase bar reserves no height', () => {
  // Both halves are needed. The wrapper's padding goes, and the empty div itself is
  // removed from flow — zeroing only the padding still measured 17px of line box.
  assert.match(css, /\.tutor-phase-bar:not\(:has\(\.tutor-phase:not\(:empty\)\)\)\s*\{[^}]*padding:\s*0/);
  assert.match(rule('.tutor-phase:empty'), /display:\s*none/);
});

test('the phase rule no longer carries its header-era top margin', () => {
  // `margin-top` positioned it under the step line. In the new row it would just be
  // an unexplained gap.
  assert.doesNotMatch(rule('.tutor-phase'), /margin-top/);
});

test('the busy highlight still keys off the state attribute', () => {
  // The highlight is selector-based, so relocating the node could silently orphan it.
  assert.match(css, /\.tutor-phase\[data-state="ASKING"\]/);
  assert.match(steprail, /phaseNode\.setAttribute\("data-state", state\)/);
});

test('the planning checklist follows the phase node to its new parent', () => {
  // It appends to `phaseNode.parentNode` — the phase bar now, the header before. That
  // is correct without change, and this pins the coupling so a future refactor that
  // hard-codes the header gets caught.
  assert.match(steprail, /phaseNode\.parentNode\.appendChild\(planning\)/);
});

test('the phase bar is hidden when the panel is collapsed', () => {
  // A 3.2rem collapsed panel with a status row leaking out of it.
  const collapsed = /\.tutor-panel--collapsed \.tutor-messages,([\s\S]*?)\{[^}]*display:\s*none/.exec(css);
  assert.ok(collapsed, 'the collapsed-panel hide rule is gone');
  assert.match(collapsed[1] as string, /\.tutor-phase-bar/);
});

test('the phase bar is centred in fullscreen like every other row', () => {
  const fs = /html\.tutor-fullscreen \.tutor-messages,([\s\S]*?)\{([^}]*)\}/.exec(css);
  assert.ok(fs, 'the fullscreen centring rule is gone');
  assert.match(fs[1] as string, /\.tutor-phase-bar/);
  assert.match(fs[2] as string, /max-width:\s*52rem/);
});

// ---------------------------------------------------------------------------
// The choice row
// ---------------------------------------------------------------------------

test('choice buttons declare their own box, since .md-button cannot reach them', () => {
  const decls = rule('.tutor-choices__button');
  for (const prop of [/border:/, /padding:/, /background:/, /color:/, /cursor:\s*pointer/]) {
    assert.match(decls, prop);
  }
});

test('the choice row is smaller than it was', () => {
  const decls = rule('.tutor-choices__button');
  const size = /font-size:\s*([\d.]+)rem/.exec(decls);
  assert.ok(size, 'no font-size on the choice button');
  assert.ok(Number(size[1]) < 0.66, `font-size ${size[1]}rem is not below the old 0.66rem`);

  const row = rule('.tutor-choices');
  const pad = /padding:\s*([\d.]+)rem/.exec(row);
  assert.ok(pad, 'no padding on the choice row');
  assert.ok(Number(pad[1]) < 0.5, `row padding ${pad[1]}rem is not below the old 0.5rem`);
  const gap = /gap:\s*([\d.]+)rem/.exec(row);
  assert.ok(Number(gap?.[1]) < 0.4, `gap ${gap?.[1]}rem is not below the old 0.4rem`);
});

test('the recommended choice is marked by weight as well as colour', () => {
  // ui-spec.md §8: state never rests on colour alone.
  const decls = rule('.tutor-choices__button.md-button--primary');
  assert.match(decls, /font-weight:\s*700/);
  assert.match(decls, /background:\s*var\(--md-primary-fg-color\)/);
});

test('choice buttons have a visible focus and hover state', () => {
  // They are keyboard-reachable, and a bare outline-less button in a panel is easy to
  // lose. Hover and focus share one rule.
  assert.match(css, /\.tutor-choices__button:hover,\s*\n?\.tutor-choices__button:focus-visible/);
});

test('the composer buttons are styled too, for the same reason', () => {
  // 提交 and 停止 carry `.md-button` and painted as plain text as well. Left larger
  // than the choice row: this is the panel's primary action.
  const decls = rule('.tutor-composer__submit,\n.tutor-composer__stop');
  assert.match(decls, /padding:/);
  assert.match(decls, /border:/);
  const choiceSize = Number(/font-size:\s*([\d.]+)rem/.exec(rule('.tutor-choices__button'))?.[1]);
  const submitSize = Number(/font-size:\s*([\d.]+)rem/.exec(decls)?.[1]);
  assert.ok(submitSize > choiceSize, 'the submit button must not be smaller than a choice');
});

test('a disabled submit button looks disabled', () => {
  assert.match(rule('.tutor-composer__submit:disabled'), /opacity/);
});
