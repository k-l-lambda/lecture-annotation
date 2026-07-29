/**
 * The section entry icon's click, against Material's instant navigation.
 *
 * `navigation.instant` is enabled in mkdocs.yml. Material subscribes to `document.body`
 * clicks and routes any in-site anchor itself, filtering only on the anchor's `target`
 * and on `metaKey`/`ctrlKey` — it never consults `defaultPrevented`. The entry icon IS
 * an anchor (deliberately: reusing the heading's own `a.headerlink` keeps "copy link to
 * section" working), so a bubble-phase `preventDefault()` was honoured by the browser
 * and ignored by Material, which then swapped the whole `md-container` for the same URL
 * with the hash stripped.
 *
 * The panel had already been appended into `.md-main__inner` — it has to be, since on
 * desktop it *is* the second grid column and a grid item must be a child of the grid —
 * so it went out with the replaced subtree. Measured symptom: a session that starts, a
 * panel that exists for one frame inside a now-detached parent, and a second click
 * reporting 「已有进行中的会话」 because the runtime's session outlived the DOM showing it.
 *
 * Browser-verified: tmp/check-59-parentswap.mjs identified the swap (an ancestor
 * carrying the panel was removed: md-container), tmp/check-60-order.mjs showed our
 * handler *did* run and *did* preventDefault, and tmp/check-61-entryfix.mjs is the
 * end-to-end check — 8 assertions, confirmed to report 5 failures against the
 * pre-change file once mkdocs had actually rebuilt it.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const tutorJs = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/tutor.js', import.meta.url)),
  'utf8',
);
const mkdocs = readFileSync(
  fileURLToPath(new URL('../../mkdocs.yml', import.meta.url)),
  'utf8',
);

/** The body of `handleEntryClick`, as shipped. */
function handler(): string {
  const match = /function handleEntryClick\(event\) \{([\s\S]*?)\n  \}/.exec(tutorJs);
  assert.ok(match, 'handleEntryClick not found');
  return match[1] as string;
}

test('instant navigation is still enabled, so the hazard is still live', () => {
  // If this feature is ever dropped, the capture-phase listener below becomes
  // unnecessary rather than wrong — but the reader should know which it is.
  assert.match(mkdocs, /navigation\.instant/);
});

test('the entry handler is registered in the capture phase', () => {
  // Bubble phase is too late to be sure of ordering against Material's own
  // document-level listener.
  assert.match(tutorJs, /addEventListener\("click", handleEntryClick, true\)/);
});

test('a handled entry click stops propagating', () => {
  // Without this, Material re-routes the page and discards the freshly mounted panel.
  // Both handled paths need it: the active-start path and the disabled-icon path.
  const body = handler();
  const stops = (body.match(/stopPropagation/g) ?? []).length;
  assert.equal(stops, 2, `expected both handled paths to stop propagation, saw ${stops}`);
});

test('every stopPropagation is paired with a preventDefault', () => {
  // Stopping propagation alone would leave the browser to follow the href.
  const body = handler();
  const prevents = (body.match(/preventDefault/g) ?? []).length;
  assert.equal(prevents, 2);
});

test('modifier and middle clicks are left to the browser', () => {
  // The icon is an anchor so that "copy link to section" and open-in-new-tab keep
  // working (ui-spec.md §1.1). Those clicks must return *before* either call.
  const body = handler();
  const guard = body.indexOf('event.button !== 0');
  const firstPrevent = body.indexOf('preventDefault');
  assert.ok(guard > -1, 'the modifier/middle-click guard is gone');
  assert.ok(guard < firstPrevent, 'the guard must precede any preventDefault');
});

test('clicking the already-active section toggles instead of restarting', () => {
  // `runtime.start()` throws 「已有进行中的会话」 on a live session. That is right for the
  // runtime and useless as a response to clicking the section you are already on —
  // the active icon stays enabled precisely so it can reach a collapsed panel.
  const match = /function startSession\(sectionId\) \{([\s\S]*?)\n    if \(!r\.settingsStore/.exec(
    tutorJs,
  );
  assert.ok(match, 'startSession preamble not found');
  const preamble = match[1] as string;
  assert.match(preamble, /r\.live && state\.activeSectionId === sectionId/);
  assert.match(preamble, /state\.panel\.toggle\(\)/);
});

test('the toggle check runs before the settings gate', () => {
  // Otherwise a configured-check or dialog could fire on what is only a panel toggle.
  //
  // Scoped to startSession's own body. A document-wide `indexOf` matched the identical
  // comparison in `applyEntryIcons` (`live && state.activeSectionId === sectionId`,
  // which predates this fix), so the assertion passed against the unfixed file — a
  // pass that measured the wrong line.
  const fn = /function startSession\(sectionId\) \{([\s\S]*?)\n    state\.activeSectionId = sectionId;/.exec(
    tutorJs,
  );
  assert.ok(fn, 'startSession body not found');
  const body = fn[1] as string;
  const toggle = body.indexOf('state.activeSectionId === sectionId');
  const configured = body.indexOf('!r.settingsStore.configured()');
  assert.ok(toggle > -1, 'the live-session toggle is not in startSession');
  assert.ok(configured > -1, 'the settings gate is not in startSession');
  assert.ok(toggle < configured, 'the live-session toggle must be checked first');
});

test('the panel is still mounted into the grid, not the body', () => {
  // The reason the swap took the panel with it. Moving the mount to `body` would dodge
  // this bug and break the desktop dock, so it must stay — with the click fixed
  // instead. Asserted in panel.js, which owns the decision.
  const panelJs = readFileSync(
    fileURLToPath(new URL('../../docs/javascripts/tutor/panel.js', import.meta.url)),
    'utf8',
  );
  assert.match(panelJs, /querySelector\("\.md-main__inner"\)/);
});
