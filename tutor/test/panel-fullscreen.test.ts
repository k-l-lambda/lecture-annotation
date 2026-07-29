/**
 * The panel's fullscreen mode, read out of the shipped `panel.js` and `tutor.css`.
 *
 * Docking is already per `ui-spec.md` §2.1/§2.2 — a sticky right column on desktop, a
 * fixed bottom sheet on mobile. Fullscreen is the third layout, and the properties
 * asserted here are the ones whose absence is silent: a fullscreen panel that leaves
 * the dock's reserved space behind keeps a 420px gutter and a sheet-sized dead strip,
 * and a document-level listener that outlives its panel makes a *stale* handler win.
 *
 * Browser-verified separately (`tmp/check-31-fullscreen.mjs`, 14 checks at 1440x900 and
 * 414x896); these are the invariants that can be checked without one.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p: string) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const css = read('../../docs/stylesheets/tutor.css');
const panel = read('../../docs/javascripts/tutor/panel.js');

/** The declaration block of the first rule whose selector matches `selector`. */
function block(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`, 'm').exec(css);
  assert.ok(match, `no rule for \`${selector}\` — was it renamed?`);
  return match[2] as string;
}

test('the docks both stay: sticky column on desktop, bottom sheet on mobile', () => {
  // ui-spec.md §2.1 and §2.2. Fullscreen is additive; if it replaced either dock the
  // panel would have nowhere to return to.
  const desktop = /@media screen and \(min-width: 76\.25em\) \{([\s\S]*?)\n\}/.exec(css);
  assert.ok(desktop, 'the desktop dock media query is gone');
  assert.match(desktop[1] as string, /grid-template-columns:\s*1fr var\(--tutor-panel-w\)/);
  assert.match(desktop[1] as string, /position:\s*sticky/);

  const mobile = /@media screen and \(max-width: 76\.24em\) \{([\s\S]*?)\n\}/.exec(css);
  assert.ok(mobile, 'the mobile sheet media query is gone');
  assert.match(mobile[1] as string, /position:\s*fixed/);
  assert.match(mobile[1] as string, /bottom:\s*0/);
});

test('fullscreen fills the body below the header', () => {
  const rule = block('html.tutor-fullscreen .tutor-panel');
  assert.match(rule, /position:\s*fixed/);
  // Inset from the header down, so the site header stays usable — leaving fullscreen
  // is never a trapdoor.
  assert.match(rule, /inset:\s*var\(--tutor-header-h\) 0 0/);
  // The docks constrain width and height; both have to be released or the panel is
  // fixed at 420px or at the sheet height.
  assert.match(rule, /width:\s*auto/);
  assert.match(rule, /max-height:\s*none/);
});

test('fullscreen gives back the space the docks reserved', () => {
  // The desktop grid column and the mobile content padding are set on *ancestors* of
  // the panel, so a rule on the panel alone cannot undo them.
  assert.match(block('html.tutor-fullscreen.tutor-active .md-main__inner'), /display:\s*block/);
  assert.match(block('html.tutor-fullscreen.tutor-active .md-content'), /padding-bottom:\s*0/);
});

test('the scroll lock is on `html`, which is what governs the viewport', () => {
  // Measured: with `body { overflow: hidden }` the computed style read "hidden" and
  // the page still scrolled 900px. Material sets overflow on `html`, and the viewport
  // follows whichever of the two is not `visible`.
  assert.match(block('html.tutor-fullscreen'), /overflow:\s*hidden/);
  assert.doesNotMatch(css, /html\.tutor-fullscreen body\s*\{[^}]*overflow/);
});

test('fullscreen is a page-body layout, not the Fullscreen API', () => {
  // `requestFullscreen` puts the element in the top layer, where the panel's own
  // dialogs — appended to `body` — would render *behind* it and be unreachable.
  // Verified in the browser by hit-testing the settings dialog over a fullscreen
  // panel: topmost element was an input inside the overlay, z-index 10 over 7.
  assert.doesNotMatch(panel, /requestFullscreen|webkitRequestFullscreen/);
  assert.match(panel, /classList\.toggle\("tutor-fullscreen", on\)/);
});

test('the toggle cannot leave the panel collapsed behind a page-filling layout', () => {
  // A 3.2rem strip over a blank body, with the collapse control hidden, would have no
  // visible way back.
  const fn = /function setFullscreen\(on\)\s*\{([\s\S]*?)\n    \}/.exec(panel);
  assert.ok(fn, 'setFullscreen not found');
  assert.match(fn[1] as string, /if \(on\) root\.classList\.remove\("tutor-panel--collapsed"\)/);
  assert.match(fn[1] as string, /collapse\.hidden = on/);
});

test('the button reports its state to assistive tech, not by glyph alone', () => {
  const fn = /function setFullscreen\(on\)\s*\{([\s\S]*?)\n    \}/.exec(panel);
  assert.match(fn![1] as string, /aria-pressed", String\(on\)/);
  assert.match(fn![1] as string, /aria-label", on \?/);
});

test('a localStorage failure does not break the toggle', () => {
  // Private mode denies both reads and writes. Losing the preference is acceptable;
  // throwing out of a layout toggle is not.
  const writes = panel.slice(panel.indexOf('FULLSCREEN_KEY'));
  assert.match(writes, /try \{\s*window\.localStorage\.setItem\(FULLSCREEN_KEY/);
  assert.match(writes, /try \{\s*storedFullscreen = window\.localStorage\.getItem\(FULLSCREEN_KEY\)/);
});

test('document-level listeners are unbound on remount and destroy', () => {
  // Removing the panel element does not unbind a `document` listener. Observed: an
  // Escape press handled by a *dead* panel's closure dropped the fullscreen class, so
  // the live panel's handler took its "already left" early return and its button kept
  // showing the wrong state.
  assert.match(panel, /var teardown = \[\]/);
  assert.match(panel, /teardown\.push\(function \(\) \{\s*document\.removeEventListener\("keydown", onEscape\)/);
  // Both mount (previous panel's listeners) and destroy have to drain it.
  const drains = panel.match(/teardown\.forEach\(function \(undo\) \{/g) || [];
  assert.equal(drains.length, 2, 'teardown must be drained at both mount and destroy');
  // And destroy must clear the class, or the page keeps `overflow: hidden` with no
  // panel left to unset it.
  const destroy = /destroy: function \(\) \{([\s\S]*?)\n      \}/.exec(panel);
  assert.match(destroy![1] as string, /classList\.remove\("tutor-fullscreen"\)/);
});

test('the scroll lock does not reach paper', () => {
  // An overflow-hidden root clips paged output at the first page, so printing
  // mid-session would silently lose the rest of the chapter — the exact failure the
  // print rules exist to prevent. Measured under emulated print media: the panel was
  // correctly hidden while `html` still computed `overflow-y: hidden`.
  const print = /@media print \{([\s\S]*?)\n\}/.exec(css);
  assert.ok(print, 'the print block is gone');
  assert.match(print[1] as string, /html\.tutor-fullscreen \{\s*overflow:\s*visible !important/);
  // `position: fixed` would repeat the panel's box on every printed page.
  assert.match(print[1] as string, /html\.tutor-fullscreen \.tutor-panel \{\s*position:\s*static/);
});

test('Escape yields to anything layered over the panel', () => {
  // A dialog or menu owns Escape first; and a student clearing a draft should not
  // lose their layout in the same keystroke.
  const fn = /function onEscape\(event\)\s*\{([\s\S]*?)\n    \}/.exec(panel);
  assert.ok(fn, 'onEscape not found');
  assert.match(fn[1] as string, /\.tutor-overlay, \.tutor-menu/);
  assert.match(fn[1] as string, /activeElement === textarea && textarea\.value/);
});
