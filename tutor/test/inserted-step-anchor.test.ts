/**
 * An inserted prerequisite step has nothing in the section to quote.
 *
 * Reported from `temp/tutor-session-段落-1 (1).json`: the student said 太难了, the tutor
 * called `insert_prerequisite_step` to add 舒尔引理回顾, and then `ask_question` failed
 * three times on the same rejection —
 *
 *   sourceAnchor does not locate anywhere in this section:
 *   '与所有生成元对易的算符，在不可约表示中只能是常数倍恒等算符'
 *
 * — which is the inserted step's own `goal`, not section text. The gate was right to
 * reject it, and the questioner had nothing better to offer: 舒尔引理 is prerequisite
 * background, so by construction it is not in this section. The repair budget ran out,
 * `ask()` threw, and the session died at `ASKING` (see `concurrent-turns.test.ts` for
 * that half).
 *
 * The exemption already existed for prep steps, with a docstring describing this exact
 * failure — the questioner narrating harness state until the budget ran out. An inserted
 * step is the same situation under a different flag: `insert_prerequisite_step` takes no
 * `anchors` argument and the harness builds the step with `anchors: []`. It simply was
 * not covered.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { validateAskQuestion } from '../src/core/validate.ts';
import { PROMPTS } from '../src/core/prompts.ts';

const SECTION = ['熵是对混乱程度的量度。', '', '$$S = k \\log V$$', '', '这里 $V$ 是粗粒化盒子体积。'].join('\n');

/** A well-formed question, anchor supplied separately per case. */
function question(sourceAnchor: string) {
  return {
    genre: 'descriptive' as const,
    question: '为什么熵要取相空间体积的对数，而不是体积本身？',
    setup: null,
    expectedPoints: [{ point: '对数把乘性的体积变成加性的量', weight: 1 }],
    rubric: { '5': '说清可加性', '3': '只说了对数', '1': '未触及' },
    hintLadder: ['想想两个独立系统合起来', '体积相乘时熵应该相加'],
    sourceAnchor,
  };
}

function ctx(over: Record<string, unknown> = {}) {
  return {
    sectionText: SECTION,
    genrePreference: 'descriptive-first' as const,
    askedQuestions: [],
    targetLevel: 1 as const,
    kpIds: ['kp:entropy'],
    ...over,
  };
}

test('an inserted step may leave sourceAnchor empty', () => {
  const errors = validateAskQuestion(question(''), ctx({ inserted: true }));
  assert.deepEqual(
    errors.filter((e) => /sourceAnchor/.test(e)),
    [],
    'the step the tutor just inserted must be askable',
  );
});

test('a section step still must supply a real anchor', () => {
  // The exemption must not become a way to skip the gate on an ordinary step.
  const errors = validateAskQuestion(question(''), ctx());
  assert.ok(errors.some((e) => /sourceAnchor/.test(e)));
});

test('an inserted step that DOES supply an anchor still has it checked', () => {
  // This is the live failure: the model filled the field with the step's own goal.
  // Exempting the field entirely would have let that through as a quote from the
  // section, which is worse than rejecting it — it teaches the student that a
  // sentence appears in their reading when it does not.
  const errors = validateAskQuestion(
    question('与所有生成元对易的算符，在不可约表示中只能是常数倍恒等算符'),
    ctx({ inserted: true }),
  );
  assert.ok(
    errors.some((e) => /sourceAnchor/.test(e)),
    'an invented quote must be rejected even on an inserted step',
  );
});

test('a prep step keeps the exemption it already had', () => {
  assert.deepEqual(
    validateAskQuestion(question(''), ctx({ isPrep: true })).filter((e) => /sourceAnchor/.test(e)),
    [],
  );
});

test('the tool passes the flag through, so the gate can see it', () => {
  // The step carries `inserted`, but the validation context only gained it now; without
  // this wiring the exemption is dead code.
  const tools = readFileSync(
    fileURLToPath(new URL('../src/core/tools.ts', import.meta.url)),
    'utf8',
  );
  const call = /validateAskQuestion\(args, \{[\s\S]*?\}\);/.exec(tools);
  assert.ok(call, 'the validateAskQuestion call was not found');
  assert.match(call[0], /inserted: step\.inserted/);
});

test('the questioner is told to leave the anchor empty on an inserted step', () => {
  const q = PROMPTS.questioner.text;
  assert.match(q, /step\.inserted = true/);
  // And told not to do the specific thing it did live: quote its own goal.
  assert.match(q, /`goal`/);
  assert.match(q, /inserted/);
});
