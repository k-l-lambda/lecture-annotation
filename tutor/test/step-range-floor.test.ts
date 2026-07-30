/**
 * The ladder may be one step long.
 *
 * The floor was 3. `validateSteps` rejects an out-of-range ladder rather than trimming
 * it — deliberately, so the planner re-plans instead of shipping a truncated ladder —
 * and the message says so: `steps: 2 given, must be between 3 and 5. Re-plan the ladder
 * rather than padding or truncating it.` For a section carrying one checkable idea that
 * left the planner two options, both bad: pad the ladder with steps the section does not
 * support, or re-plan into the same wall.
 *
 * Lecture sections are short (median 338 chars, against 3680 for the ebooks), so this is
 * the common case there, not the corner one. The cap is what protects against a runaway
 * ladder; the floor was only ever protecting against a lazy plan, which is not the
 * failure that shows up in practice.
 *
 * `validateSteps` itself is unchanged — it honours whatever range it is handed, and with
 * a floor of 3 configured it still rejects one step (`validate.test.ts`). What moved is
 * the default, and that is what these tests pin.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { applySettings, defaultSettings } from '../src/core/settings.ts';
import { validateSteps, STEP_HARD_CAP } from '../src/core/validate.ts';
import { PROMPTS } from '../src/core/prompts.ts';

const dialog = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/settings-dialog.js', import.meta.url)),
  'utf8',
);

test('the default floor is 1, so a one-idea section needs no padding', () => {
  assert.equal(defaultSettings().stepRange[0], 1);
});

test('the default ceiling is unchanged: the cap is the half that was doing work', () => {
  assert.equal(defaultSettings().stepRange[1], 5);
  assert.equal(STEP_HARD_CAP, 6);
});

test('a single-step ladder validates under the default range', () => {
  const errors = validateSteps(
    [
      {
        id: 's1',
        title: '读出定义',
        knowledgePointIds: ['kp:entropy'],
        targetLevel: 1,
        questionGenre: 'descriptive',
        anchors: ['熵是相空间体积的对数'],
      },
    ],
    {
      stepRange: defaultSettings().stepRange,
      genrePreference: defaultSettings().genrePreference,
      knownKpIds: new Set(['kp:entropy']),
      sectionText: '熵是相空间体积的对数，这里的粗粒化是定义的前提。',
    },
  );
  assert.deepEqual(errors, [], 'one step must not be rejected on count alone');
});

test('a hand-edited low end below 1 still clamps to 1, not to the old floor', () => {
  // The clamp already allowed 1 while the default forbade it, so a student who edited
  // localStorage could reach a state the dialog could not produce. Both ends agree now.
  assert.deepEqual(applySettings({ stepRange: [0, 4] }).settings.stepRange, [1, 4]);
  assert.deepEqual(applySettings({ stepRange: [-3, 9] }).settings.stepRange, [1, 6]);
});

test('a malformed low end falls back to 1, matching the default', () => {
  // The fallback argument to clampInt was 3, left over from the old default: a
  // non-numeric low end silently reinstated the floor this change removes.
  assert.equal(applySettings({ stepRange: ['x', 4] }).settings.stepRange[0], 1);
});

test('the dialog can express the new floor', () => {
  // The spinner min was already 1; had it been 3 the setting would be unreachable from
  // the UI, which is the failure `maxOutputTokens` had.
  assert.match(dialog, /numberInput\(settings\.stepRange\[0\], 1, 6\)/);
});

test('the planner is told the floor is 1 and told not to pad to reach it', () => {
  const planner = PROMPTS.planner.text;
  assert.match(planner, /默认 1–5/);
  // Naming the temptation matters: a model told only the range will still even out a
  // one-idea section into three steps because three looks like a ladder.
  assert.match(planner, /下限是 1/);
  assert.match(planner, /不要为了凑够步数/);
});
