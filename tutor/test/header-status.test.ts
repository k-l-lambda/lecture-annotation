/**
 * The header button's state indication in `docs/stylesheets/tutor.css`.
 *
 * Tutor's state is shown by filtering the 🎓 glyph itself — grey and faded when
 * unconfigured, grey when idle, in colour when a session is live. There is no separate
 * dot element: one was tried and rendered as a 2x18px *bar*, because Material ships
 * `.md-header__button:not([hidden]) { display: inline-block }` at specificity 0,2,0,
 * which beat a bare `.tutor-header-button { display: inline-flex }`. The button never
 * became a flex container, so the child kept `display: inline`, where `width` and
 * `height` do not apply and only its own side borders painted.
 *
 * The cascade assertion outlives the dot: the button still has to win that fight for
 * its own layout, and losing it is invisible in a diff of the rule.
 *
 * `color` is deliberately not the mechanism. A color-emoji glyph is painted from the
 * font's own bitmap and ignores `color` entirely, so a `color`-based indicator would
 * have looked identical in all three states.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const cssPath = fileURLToPath(new URL('../../docs/stylesheets/tutor.css', import.meta.url));
const css = readFileSync(cssPath, 'utf8');
const js = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/tutor.js', import.meta.url)),
  'utf8',
);

/** The declaration block of the first rule whose selector matches `selector`. */
function block(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`, 'm').exec(css);
  assert.ok(match, `no rule for \`${selector}\` — was it renamed?`);
  return match[2] as string;
}

/** The `filter` value applied to the label in a given status. */
function filterFor(status: string): string {
  const decls = block(
    `.tutor-header-button[data-tutor-status="${status}"] .tutor-header-button__label`,
  );
  const match = /filter:\s*([^;]+);/.exec(decls);
  assert.ok(match, `no filter for status \`${status}\``);
  return (match[1] as string).trim();
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

test('the separate dot element is gone from both the markup and the stylesheet', () => {
  // Left behind, it would be an unstyled inline span painting nothing — or, worse,
  // a second indicator disagreeing with the glyph.
  assert.doesNotMatch(js, /tutor-header-button__dot/);
  assert.doesNotMatch(css, /tutor-header-button__dot/);
});

test('the label has a box for the filter to apply to', () => {
  // `filter` on an inline box is honoured, but the span is also a flex item here and
  // must not be allowed to stretch or shrink.
  const label = block('.tutor-header-button__label');
  assert.match(label, /display:\s*inline-block/);
  assert.match(label, /flex:\s*0 0 auto/);
});

test('the three states are visually distinct, and only the live one has colour', () => {
  const unconfigured = filterFor('unconfigured');
  const idle = filterFor('idle');
  const live = filterFor('live');

  // If any two match, the indicator conveys less than it claims to.
  assert.equal(new Set([unconfigured, idle, live]).size, 3, 'two states share a filter');

  // Colour is reserved for "a session is running", so both inactive states must
  // fully desaturate. `grayscale(1)` is the only value that does.
  assert.match(unconfigured, /grayscale\(1\)/);
  assert.match(idle, /grayscale\(1\)/);
  assert.doesNotMatch(live, /grayscale/);

  // Unconfigured is distinguished from idle by being dimmer, not by hue.
  assert.match(unconfigured, /brightness\(0?\.\d+\)/);
  assert.doesNotMatch(idle, /brightness\(/);
});

test('dimming does not go through `opacity`, which lets the header colour through', () => {
  // A translucent glyph composites with the header's primary colour and comes back
  // tinted: measured in the browser at mean saturation 54 for `opacity(0.55)` against
  // 2.9 for the opaque grey. That reintroduces colour into a state whose whole job is
  // not to have any, so the dim has to be `brightness`.
  for (const status of ['unconfigured', 'idle', 'live']) {
    const decls = block(
      `.tutor-header-button[data-tutor-status="${status}"] .tutor-header-button__label`,
    );
    assert.doesNotMatch(decls, /opacity/, `status \`${status}\` dims with opacity`);
  }
});

test('state is not expressed through `color`, which a colour-emoji glyph ignores', () => {
  for (const status of ['unconfigured', 'idle', 'live']) {
    const decls = block(
      `.tutor-header-button[data-tutor-status="${status}"] .tutor-header-button__label`,
    );
    assert.doesNotMatch(
      decls,
      /(^|[^-\w])color:/,
      `status \`${status}\` sets color, which the 🎓 bitmap glyph does not honour`,
    );
  }
});
