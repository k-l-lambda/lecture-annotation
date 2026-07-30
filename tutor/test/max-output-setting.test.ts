/**
 * `maxOutputTokens`: reachable, and large enough for the planner.
 *
 * Reported live: `planner 在输出 set_steps 之前就到了 maxOutputTokens (2000)，回复被截断。
 * 请调高 maxOutputTokens。` followed by "Not found maxOutputTokens in settings" — the
 * message named a field the dialog never rendered, so the advice could not be acted on.
 *
 * Two causes, both fixed here:
 *  - the default of 2000 does not fit `set_steps` (3-5 steps, each with a verbatim
 *    anchor quoted out of the section) plus the planner's own reasoning, which is
 *    drawn from the same budget at `reasoning.byRole.planner = 'medium'`;
 *  - group 4 of the settings dialog had controls for every other budget but this one.
 *    Note the Node shell never hit it: `tutor.local.yaml` sets 12000, so only the
 *    browser ran on the default.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { applySettings, defaultSettings } from '../src/core/settings.ts';

const dialog = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/settings-dialog.js', import.meta.url)),
  'utf8',
);

test('the default leaves room for a planner tool call plus its reasoning', () => {
  assert.ok(
    defaultSettings().maxOutputTokens >= 4000,
    `2000 was the observed failure; got ${defaultSettings().maxOutputTokens}`,
  );
});

test('the settings dialog renders a control for it', () => {
  assert.match(dialog, /maxOutputTokens/);
  // In group 4 with the other budgets, and labelled in the student's terms rather
  // than by the field name.
  assert.match(dialog, /单次回复 token 上限/);
});

test('the dialog collects the value it renders', () => {
  const collect = /function collect\(\)\s*\{[\s\S]*?\n    \}/.exec(dialog);
  assert.ok(collect, 'collect() not found');
  assert.match(collect[0], /maxOutputTokens: Number\(/);
});

test('the control bounds match the clamp, so a typed value is never rewritten', () => {
  // A control that accepts what the loader then silently clamps is worse than no
  // control: the student sees their number replaced with no explanation.
  assert.match(dialog, /numberInput\(settings\.maxOutputTokens, 256, 32000\)/);
  const clamped = applySettings({ maxOutputTokens: 32000, schemaVersion: 2 });
  assert.equal(clamped.settings.maxOutputTokens, 32000);
  const low = applySettings({ maxOutputTokens: 256, schemaVersion: 2 });
  assert.equal(low.settings.maxOutputTokens, 256);
});

test('an out-of-range value is clamped into range, and a non-number falls back', () => {
  // `clampInt` clamps rather than rejecting, so 10 lands on the floor. Pinned because
  // the control's `min`/`max` have to agree with it (previous test) and 256 is the one
  // value a student can reach that will truncate almost everything.
  assert.equal(applySettings({ maxOutputTokens: 10, schemaVersion: 2 }).settings.maxOutputTokens, 256);
  assert.equal(
    applySettings({ maxOutputTokens: 'lots', schemaVersion: 2 }).settings.maxOutputTokens,
    defaultSettings().maxOutputTokens,
  );
});

// ---------------------------------------------------------------------------
// The v1 → v2 lift
// ---------------------------------------------------------------------------

test('a v1 blob holding exactly the old default is lifted, with a warning', () => {
  // Nobody could have typed 2000 deliberately — there was no control — so keeping it
  // means the planner goes on failing for anyone who already ran a session.
  const result = applySettings({ schemaVersion: 1, maxOutputTokens: 2000 });
  assert.equal(result.settings.maxOutputTokens, defaultSettings().maxOutputTokens);
  assert.ok(
    result.warnings.some((w) => w.includes('2000')),
    'the lift was silent; a changed budget has to be stated',
  );
});

test('a v1 blob with any other value is a real choice and is preserved', () => {
  const result = applySettings({ schemaVersion: 1, maxOutputTokens: 12000 });
  assert.equal(result.settings.maxOutputTokens, 12000);
  assert.equal(result.warnings.some((w) => w.includes('2000')), false);
});

test('a v2 blob holding 2000 is honoured — by then it is a choice', () => {
  const result = applySettings({ schemaVersion: 2, maxOutputTokens: 2000 });
  assert.equal(result.settings.maxOutputTokens, 2000);
});

test('a blob with no schemaVersion is treated as v1', () => {
  // Everything written before the field was read is v1 whether it says so or not.
  assert.equal(
    applySettings({ maxOutputTokens: 2000 }).settings.maxOutputTokens,
    defaultSettings().maxOutputTokens,
  );
});

test('new saves carry the bumped schemaVersion', () => {
  assert.ok(defaultSettings().schemaVersion >= 2);
});

test('the lift reports itself as a migration so the caller can persist it', () => {
  // Without this the notice reappeared on every page load: the blob kept
  // `schemaVersion: 1`, so each read reached the same conclusion and warned again. The
  // student was told about an upgrade with no way to acknowledge it.
  assert.equal(applySettings({ schemaVersion: 1, maxOutputTokens: 2000 }).migrated, true);
  assert.notEqual(applySettings({ schemaVersion: 1, maxOutputTokens: 12000 }).migrated, true);
  assert.notEqual(applySettings({ schemaVersion: 2, maxOutputTokens: 2000 }).migrated, true);
});

test('the browser store writes the migration back, so it is announced once', async () => {
  const { SettingsStore, memoryStorage } = await import('../src/shells/web/settings-store.ts');
  const local = memoryStorage();
  const store = new SettingsStore({ local, session: memoryStorage() });
  local.setItem('tutor.settings', JSON.stringify({ schemaVersion: 1, maxOutputTokens: 2000 }));

  const first = store.load();
  assert.equal(first.settings.maxOutputTokens, defaultSettings().maxOutputTokens);
  assert.ok(first.warnings.some((w) => w.includes('2000')), 'told the first time');

  const second = store.load();
  assert.equal(second.settings.maxOutputTokens, defaultSettings().maxOutputTokens, 'still lifted');
  assert.equal(
    second.warnings.some((w) => w.includes('2000')),
    false,
    'and not told a second time',
  );
});
