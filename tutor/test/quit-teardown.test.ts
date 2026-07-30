/**
 * 退出辅导 must take the panel with it.
 *
 * Reported from a live page: "Tutor panel 即使在退出辅导后页面上还有一个残留." Confirming
 * it took reading three files, because each half looked correct on its own:
 *
 *  - `confirmQuit` calls `session.abandon()`, which marks the record `abandoned` and
 *    transitions to `ABANDONED`. It never touches the DOM, and nothing said it should.
 *  - `setComposerFor('ABANDONED')` hides the composer and calls `options.onEnd()`.
 *  - `onEnd` in `tutor.js` cleared `activeSectionId`, restored the fold, and refreshed
 *    the icons — but never removed the panel.
 *
 * So `panel.destroy()` — which removes the element AND drops `tutor-active` /
 * `tutor-fullscreen` from `html` — was **dead code**: defined, exported from `mount`,
 * and called by nothing. What was left on the page was a panel with its composer
 * hidden: header, rail and transcript still there, nothing interactive, and the page
 * still held in the two-column `tutor-active` layout by a session that had ended.
 *
 * `ui-spec.md` §6 already specified this ("focus/fold is restored, panel animates out,
 * `html.tutor-active` removed"); only the wiring was missing.
 *
 * The asymmetry is the part worth protecting: `DONE` must NOT dismiss the panel, since
 * on completion it is holding the summary and the achievement card. Both states end the
 * session and both reach the same branch, so a fix that keys on "ended" rather than on
 * which ending it was would throw away the achievement moment.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p: string) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const panel = read('../../docs/javascripts/tutor/panel.js');
const tutorJs = read('../../docs/javascripts/tutor/tutor.js');

/** The `onEnd` callback `tutor.js` hands to `mount`, as shipped. */
function onEndSource(): string {
  const match = /onEnd: function \((\w*)\) \{([\s\S]*?)\n      \},/.exec(tutorJs);
  assert.ok(match, 'the onEnd callback was not found in tutor.js');
  return match[0];
}

test('destroy() is reachable: something actually calls it', () => {
  // The whole bug in one assertion. `destroy` did everything right and was never run.
  assert.match(tutorJs, /\.destroy\(\)/, 'panel.destroy() is dead code again');
});

test('quitting dismisses the panel', () => {
  const body = onEndSource();
  assert.match(body, /destroy\(\)/);
  // Keyed on the ending, not merely on "the session ended".
  assert.match(body, /"abandoned"/);
});

test('completing does NOT dismiss the panel', () => {
  // The summary card and the achievement card are the payoff, and they live in the
  // panel. A destroy on DONE deletes them at the moment they appear.
  const body = onEndSource();
  assert.doesNotMatch(
    body,
    /if \(state\.panel\) \{?\s*state\.panel\.destroy/,
    'destroy must be conditional on how the session ended',
  );
});

test('the panel tells its caller which ending it was', () => {
  assert.match(panel, /options\.onEnd\(state === "ABANDONED" \? "abandoned" : "completed"\)/);
});

test('the stale handle is dropped, so a later toggle cannot resurrect a dead panel', () => {
  // `state.panel` is read by the header button, the Alt+T shortcut and flashBusy. A
  // handle to a removed element would toggle classes on a node in no document.
  assert.match(onEndSource(), /state\.panel = null/);
});

test('destroy clears the html classes that outlive the panel element', () => {
  const body = /destroy: function \(\) \{([\s\S]*?)\n      \},/.exec(panel);
  assert.ok(body, 'destroy() not found in panel.js');
  assert.match(body[1] as string, /root\.remove\(\)/);
  assert.match(body[1] as string, /remove\("tutor-active"\)/);
  // A stranded `tutor-fullscreen` leaves the page `overflow: hidden` with no panel
  // left on screen able to unset it — unrecoverable without a reload.
  assert.match(body[1] as string, /remove\("tutor-fullscreen"\)/);
  // Document-level listeners are not unbound by removing the element.
  assert.match(body[1] as string, /teardown/);
});
