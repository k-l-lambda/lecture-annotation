/**
 * The header button's status dot in `docs/stylesheets/tutor.css`.
 *
 * The dot is the only always-visible indication of whether Tutor is configured, idle,
 * or live (`tutor.js` sets `data-tutor-status`). It rendered as a 2x18px *bar* because
 * Material ships `.md-header__button:not([hidden]) { display: inline-block }` at
 * specificity 0,2,0, which beat a bare `.tutor-header-button { display: inline-flex }`.
 * The button never became a flex container, so the dot kept `display: inline`, where
 * `width` and `height` do not apply — all that painted was its own left and right
 * border, stretched to the line height.
 *
 * These assert the two properties that made it a bar, since neither is visible in a
 * diff of the rule itself: the button's display rule must out-specify Material's, and
 * the dot must not depend on its parent's display to get a box.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(
  fileURLToPath(new URL('../../docs/stylesheets/tutor.css', import.meta.url)),
  'utf8',
);

/** The declaration block of the first rule whose selector matches `selector`. */
function block(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`, 'm').exec(css);
  assert.ok(match, `no rule for \`${selector}\` — was it renamed?`);
  return match[2] as string;
}

test('the button out-specifies Material’s .md-header__button display rule', () => {
  // Material's rule is `.md-header__button:not([hidden])` (two classes + :not).
  // A bare `.tutor-header-button` loses, and losing means no flex container.
  const rule = /\.md-header__button\.tutor-header-button:not\(\[hidden\]\)\s*\{([^}]*)\}/.exec(css);
  assert.ok(rule, 'the button rule must carry both classes and :not([hidden])');
  assert.match(rule[1] as string, /display:\s*inline-flex/);
  // A bare single-class rule setting display would be the regression coming back.
  assert.doesNotMatch(css, /^\.tutor-header-button\s*\{[^}]*display:/m);
});

test('the dot gets its own box rather than inheriting one from the parent’s flex', () => {
  const dot = block('.tutor-header-button__dot');
  // `display: inline` is where width/height are ignored — the bar.
  assert.match(dot, /display:\s*inline-block/);
  assert.match(dot, /width:\s*0\.5rem/);
  assert.match(dot, /height:\s*0\.5rem/);
  // Square box + 50% radius is what makes it read as a dot at all.
  assert.match(dot, /border-radius:\s*50%/);
  // Without border-box the 1px border makes it 12px, not 10px, and off-centre.
  assert.match(dot, /box-sizing:\s*border-box/);
  // A flex parent must not be allowed to squeeze it back into a sliver.
  assert.match(dot, /flex:\s*0 0 auto/);
});

test('the three states are visually distinct', () => {
  // Hollow = unconfigured, part-filled = idle, solid = live (tutor.js:212). If two
  // states share a fill the element conveys nothing.
  const idle = block('.tutor-header-button[data-tutor-status="idle"] .tutor-header-button__dot');
  const live = block('.tutor-header-button[data-tutor-status="live"] .tutor-header-button__dot');
  assert.match(idle, /background:/);
  assert.match(live, /background:\s*currentColor/);
  assert.notEqual(idle.trim(), live.trim());
  // `unconfigured` deliberately sets no background: the bare border is the hollow
  // state, so it must not be given one anywhere.
  assert.doesNotMatch(css, /data-tutor-status="unconfigured"\][^{]*\{[^}]*background:/);
});
