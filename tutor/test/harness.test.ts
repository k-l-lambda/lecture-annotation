/**
 * The harness.md §9 case list.
 *
 * These are the cases where the design's central claim — the model proposes, the
 * harness decides — either holds or does not. Each one is a rule a plausible-
 * looking model output would violate, so a passing suite here is the evidence
 * that prose from the model can never move state on its own.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { executeTool, achievementGateInput, type ToolContext } from '../src/core/tools.ts';
import { applyEvidence, emptyRecord, evaluatePrepGate, revertEvidence } from '../src/core/profile.ts';
import { anchorAppears, evaluateAchievementGate } from '../src/core/validate.ts';
import { sequentialIdGen } from '../src/core/ports.ts';
import { parseToolArguments } from '../src/core/roles.ts';
import type { Attempt, MasteryRecord, SectionContent, SessionRecord, Step } from '../src/core/types.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

const NOW = Date.parse('2026-07-27T00:00:00.000Z');
const ISO = new Date(NOW).toISOString();

const SECTION_TEXT = [
  '熵是相空间中粗粒化区域体积的对数。取对数是为了让独立系统的熵可以相加。',
  '',
  '$$S = k \\log V$$',
  '',
  '第二定律说的是熵不减少。粗粒化区域的划分依赖我们认为哪些宏观量可观测。',
  '',
  '$$\\Delta S \\ge 0$$',
].join('\n');

function section(over: Partial<SectionContent> = {}): SectionContent {
  return {
    page: 'ebooks/x/chapter_27.md',
    sectionId: '273-熵',
    heading: '27.3 熵',
    tutorTitle: null,
    level: 3,
    annotation: SECTION_TEXT,
    transcript: null,
    subHeadings: [],
    formulaCount: 2,
    chars: SECTION_TEXT.length,
    truncated: false,
    fromSource: true,
    ...over,
  };
}

function emptySession(over: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: 'sess:test',
    page: 'ebooks/x/chapter_27.md',
    sectionId: '273-熵',
    sectionTitle: '27.3 熵',
    state: 'PLANNING',
    status: 'active',
    settingsSnapshot: {
      model: 'test',
      language: 'zh',
      reasoningEffort: 'high',
      genrePreference: 'descriptive-first',
      stepRange: [3, 5],
    },
    analysis: null,
    plan: null,
    cursor: { stepIndex: 0, variant: 0, backtrackDepth: 0 },
    toolLog: [],
    steps: [],
    achievement: null,
    summary: null,
    usage: { calls: 0, promptTokens: 0, completionTokens: 0, reasoningTokens: 0 },
    degradedContext: false,
    degradedTools: false,
    createdAt: ISO,
    updatedAt: ISO,
    endedAt: null,
    ...over,
  };
}

async function context(over: Partial<ToolContext> = {}): Promise<ToolContext> {
  const store = await IdbStore.open({
    factory: new IDBFactory() as unknown as IDBFactoryLike,
    name: `tutor-h-${Math.random().toString(36).slice(2)}`,
  });
  return {
    session: emptySession(),
    section: section(),
    settings: defaultSettings(),
    store,
    clock: { now: () => NOW },
    ids: sequentialIdGen(),
    liveQuestionId: null,
    analyzePassed: false,
    invalidateDigest: () => {},
    ...over,
  };
}

const ANCHOR = '熵是相空间中粗粒化区域体积的对数。';

/** `errors` lives only on the failure branch of ToolResult. */
function errorsOf(result: { ok: boolean; errors?: string[] }): string {
  return (result.errors ?? []).join(' | ');
}

function validAnalysis(over: Record<string, unknown> = {}) {
  return {
    coreQuestion: '熵为什么要定义成体积的对数？',
    argumentChain: [
      { claim: '熵由粗粒化区域的体积定义。', sourceAnchor: ANCHOR, role: 'premise' },
      { claim: '取对数使熵可加。', sourceAnchor: '取对数是为了让独立系统的熵可以相加。', role: 'derivation' },
      { claim: '于是得到第二定律。', sourceAnchor: '第二定律说的是熵不减少。', role: 'conclusion' },
    ],
    formulas: [
      { latex: 'S = k \\log V', meaning: '熵是体积的对数。', sourceAnchor: ANCHOR },
      { latex: '\\Delta S \\ge 0', meaning: '熵不减少。', sourceAnchor: '第二定律说的是熵不减少。' },
    ],
    conceptsIntroducedHere: ['粗粒化'],
    conceptsAssumedKnown: ['相空间'],
    commonMisreadings: [
      { misreading: '熵是无序度。', whyTempting: '通俗说法如此。', correction: '熵是体积的对数。' },
    ],
    sectionDifficulty: 'medium',
    notInSection: ['没有给出证明。'],
    ...over,
  };
}

function validSteps() {
  return {
    steps: [
      {
        id: 'step:1',
        title: '定义',
        goal: '复述熵的定义。',
        knowledgePointIds: ['kp:entropy'],
        targetLevel: 1,
        questionGenre: 'descriptive',
        anchors: [ANCHOR],
      },
      {
        id: 'step:2',
        title: '可加性',
        goal: '解释为何取对数。',
        knowledgePointIds: ['kp:entropy'],
        targetLevel: 2,
        questionGenre: 'descriptive',
        anchors: ['取对数是为了让独立系统的熵可以相加。'],
      },
      {
        id: 'step:3',
        title: '第二定律',
        goal: '导出第二定律。',
        knowledgePointIds: ['kp:second-law'],
        targetLevel: 3,
        questionGenre: 'derivation-step',
        anchors: ['第二定律说的是熵不减少。'],
      },
    ],
    prep: { include: false, reason: '前置已掌握。', focusKpIds: [] },
    rationale: '定义→可加性→第二定律。',
  };
}

// ---------------------------------------------------------------------------
// The analyze_section gate
// ---------------------------------------------------------------------------

test('set_steps before analyze_section is rejected', async () => {
  const ctx = await context({ analyzePassed: false });
  const result = await executeTool('planner', 'set_steps', validSteps(), ctx);
  assert.equal(result.ok, false);
  assert.match(errorsOf(result), /analyze_section/);
  assert.equal(ctx.session.steps.length, 0);
});

test('set_steps is accepted once analyze_section has passed', async () => {
  const ctx = await context();
  const analyzed = await executeTool('planner', 'analyze_section', validAnalysis(), ctx);
  assert.equal(analyzed.ok, true, errorsOf(analyzed));

  // Steps may only reference knowledge points that exist, so the real planner
  // sequence is analyze -> upsert -> set_steps.
  const upserted = await executeTool(
    'planner',
    'upsert_knowledge_points',
    {
      knowledgePoints: [
        { id: 'kp:entropy', label: '熵作为体积的对数' },
        { id: 'kp:second-law', label: '第二定律' },
      ],
    },
    ctx,
  );
  assert.equal(upserted.ok, true, errorsOf(upserted));

  const after = { ...ctx, analyzePassed: true };
  const result = await executeTool('planner', 'set_steps', validSteps(), after);
  assert.equal(result.ok, true, errorsOf(result));

  // The model asked for `prep.include: false`, but the prep decision belongs to
  // the harness: with no measured prerequisite evidence the gate keeps prep as a
  // light warm-up, so the stored ladder is prep + the 3 proposed steps.
  assert.equal(after.session.steps.filter((s) => !s.isPrep).length, 3);
  assert.equal(after.session.steps.filter((s) => s.isPrep).length, 1);
  assert.equal(after.session.steps[0]?.isPrep, true);
});

test('a fabricated sourceAnchor is rejected, naming the anchor', async () => {
  const ctx = await context();
  const fake = '熵是系统无序程度的度量，这句话并不在本节里。';
  const result = await executeTool(
    'planner',
    'analyze_section',
    validAnalysis({
      argumentChain: [
        { claim: '编造的前提。', sourceAnchor: fake, role: 'premise' },
        { claim: '取对数使熵可加。', sourceAnchor: '取对数是为了让独立系统的熵可以相加。', role: 'derivation' },
        { claim: '于是得到第二定律。', sourceAnchor: '第二定律说的是熵不减少。', role: 'conclusion' },
      ],
    }),
    ctx,
  );
  assert.equal(result.ok, false);
  // The error must quote the offending anchor: a model cannot repair "some
  // anchor was wrong".
  assert.ok(
    errorsOf(result).includes(fake.slice(0, 12)),
    `errors did not name the anchor: ${errorsOf(result)}`,
  );
});

test('2-of-7 formula coverage is rejected', async () => {
  const ctx = await context({ section: section({ formulaCount: 7 }) });
  const result = await executeTool('planner', 'analyze_section', validAnalysis(), ctx);
  assert.equal(result.ok, false);
  assert.match(errorsOf(result), /公式|formula/i);
});

test('formula coverage is relaxed when the section came from DOM fallback', async () => {
  // A degraded section may be missing formulas the annotation never carried, so
  // holding the model to 60 % of a count it cannot see would deadlock the gate.
  // `degradedContext` is the session-level flag the validator reads; TutorSession
  // sets it from `section.fromSource`, so both are set here to match a real run.
  const ctx = await context({
    section: section({ formulaCount: 7, fromSource: false }),
    session: emptySession({ degradedContext: true }),
  });
  const result = await executeTool('planner', 'analyze_section', validAnalysis(), ctx);
  assert.equal(result.ok, true, errorsOf(result));
});

test('an argument chain without a conclusion is rejected', async () => {
  const ctx = await context();
  const result = await executeTool(
    'planner',
    'analyze_section',
    validAnalysis({
      argumentChain: [
        { claim: 'a', sourceAnchor: ANCHOR, role: 'premise' },
        { claim: 'b', sourceAnchor: ANCHOR, role: 'premise' },
        { claim: 'c', sourceAnchor: ANCHOR, role: 'derivation' },
      ],
    }),
    ctx,
  );
  assert.equal(result.ok, false);
  assert.match(errorsOf(result), /conclusion|结论/);
});

test('an anchor quoted with different quote glyphs still counts as verbatim', async () => {
  // From a real live run: the planner quoted this sentence exactly but rendered
  // the source's “” as 「」. That is a typographic substitution, not a
  // fabrication, and rejecting it burned the whole repair budget.
  const text = '粗略地说，熵是一种对系统“混乱程度”的量度。';
  const ctx = await context({
    section: section({ annotation: `${text}\n\n$$S = k \\log V$$\n\n第二定律说的是熵不减少。\n\n$$\\Delta S \\ge 0$$` }),
  });
  const result = await executeTool(
    'planner',
    'analyze_section',
    validAnalysis({
      argumentChain: [
        { claim: '熵度量混乱程度。', sourceAnchor: '粗略地说，熵是一种对系统「混乱程度」的量度。', role: 'premise' },
        // Live, §4.2: the source wrote `“实数”` and the planner emitted `'实数'`.
        // Single vs double is the same substitution class as 「」 above; folding
        // one family but not the other left it permanently unmatchable.
        { claim: '单引号也算。', sourceAnchor: "粗略地说，熵是一种对系统'混乱程度'的量度。", role: 'derivation' },
        { claim: '于是第二定律。', sourceAnchor: '第二定律说的是熵不减少。', role: 'conclusion' },
      ],
      formulas: [
        { latex: 'S = k \\log V', meaning: '熵是体积的对数。', sourceAnchor: text },
        { latex: '\\Delta S \\ge 0', meaning: '熵不减少。', sourceAnchor: '第二定律说的是熵不减少。' },
      ],
    }),
    ctx,
  );
  assert.equal(result.ok, true, errorsOf(result));
});

test('math notation variants of the same anchor are accepted', () => {
  // All three from live runs: the corpus writes `$\mathcal{P}$` (23 different
  // letters across the corpus), and a model quoting prose reasonably renders that
  // as `𝒫` and `\log` as `log`. Rejecting those made the gate unpassable.
  const src = '其思想是，$\\mathcal{P}$ 中的点都处于同一个盒子里，其熵为 $S = k \\log V$。';
  assert.ok(anchorAppears('其思想是，𝒫 中的点都处于同一个盒子里', src), 'unicode script letter');
  assert.ok(anchorAppears('其熵为 S = k log V。', src), 'bare log for \\log');
  assert.ok(anchorAppears('其思想是，\\mathcal{P} 中的点', src), 'latex without $ delimiters');
});

test('LaTeX operators and their Unicode glyphs are the same anchor', () => {
  // Live: the planner quoted the Boltzmann constant as `k = 1.38 × 10^{-23} JK^{-1}`
  // where the source has `\\times` and `\\text{JK}`.
  const src = '$$k = 1.38 \\times 10^{-23} \\text{JK}^{-1}$$ 以及 $$\\Delta S \\ge 0$$';
  assert.ok(anchorAppears('k = 1.38 × 10^{-23} JK^{-1}', src));
  assert.ok(anchorAppears('Δ S ≥ 0', src));
  // The glyph folding must not blur distinct operators or values.
  assert.equal(anchorAppears('k = 1.39 × 10^{-23} JK^{-1}', src), false);
  assert.equal(anchorAppears('Δ S ≤ 0', src), false);
});

test('sub/superscript markup and ellipses fold to the rendered form', () => {
  // Live, §4.2: the planner quoted a sentence spanning a display-math block as
  // `形如 a0+a1z+a2z2+⋯+anzn=0 这样的方程必有解`. The source writes `a_0`, `z^2`
  // and `\\cdots`. Most math prose in this corpus has a subscripted variable, so
  // without this the gate rejects nearly all of it.
  const src = '形如 $a_0 + a_1z + a_2z^2 + \\cdots + a_nz^n = 0$ 这样的方程必有解';
  assert.ok(anchorAppears('形如 a0+a1z+a2z2+⋯+anzn=0 这样的方程必有解', src));
  assert.ok(anchorAppears('形如 a_0 + a_1z + a_2z^2 + \\cdots + a_nz^n = 0 这样的方程必有解', src));
  // Folding the marks must not fold the operands: one wrong coefficient still fails.
  assert.equal(anchorAppears('形如 a0+a1z+a9z2+⋯+anzn=0 这样的方程必有解', src), false);
});

test('a sentence interrupted by page furniture is still one anchor', () => {
  // Live, §4.2. The scan pipeline drops page numbers, rules, running titles and
  // translator footnotes INSIDE sentences — ~800 sentences across 43 of the 50
  // corpus files. A model quotes such a sentence the way a reader sees it.
  const src = [
    '尽管这个方程看上去与复数无关——方程有实系数，解也是实的',
    '',
    '76',
    '',
    '---',
    '',
    '〔1〕 Tartaglia，意为“口吃者”。——译注',
    '',
    '·51·',
    '',
    '<!-- page 71 -->',
    '',
    '通向实在之路',
    '',
    '（在“不可约情形”下）——但我们需要到复数领地里走一遭才能得到纯粹的实数解。',
  ].join('\n');

  assert.ok(
    anchorAppears(
      '尽管这个方程看上去与复数无关——方程有实系数，解也是实的（在“不可约情形”下）——但我们需要到复数领地里走一遭才能得到纯粹的实数解。',
      src,
    ),
    'quote spanning the page break must be accepted',
  );
  // Removing the furniture must not join unrelated prose into a false match.
  assert.equal(anchorAppears('解也是实的通向实在之路', src), false);
  assert.equal(anchorAppears('尽管这个方程看上去与复数无关，但它其实没有实数解。', src), false);
});

test('notation folding does not let a paraphrase through', () => {
  const src = '体积 $V$ 的盒子 $\\mathcal{V}$ 中态 $x$ 的熵为 $S = k \\log V$。';
  assert.equal(anchorAppears('熵就是把盒子体积取个对数再乘上常数。', src), false);
  assert.equal(anchorAppears('熵是系统无序程度的度量。', src), false);
  // Same letters, different command: \log and \exp must not compare equal.
  assert.equal(anchorAppears('其熵为 $S = k \\exp V$。', src), false);
});

test('truncated tool arguments are reported as truncation, not bad JSON', () => {
  const cut = '{"steps": [{"id": "step:1", "knowledgePointIds": ["kp:sec';
  const { error } = parseToolArguments(cut);
  assert.ok(error, 'expected an error');
  // The distinction matters: told "invalid JSON" a model re-checks punctuation
  // and re-sends the same oversized payload.
  assert.match(error, /truncated/);
});

// ---------------------------------------------------------------------------
// The prep-skip gate (harness.md §3.1)
// ---------------------------------------------------------------------------

function measured(over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    ...emptyRecord('kp:phase-space', ISO),
    level: 0.85,
    confidence: 0.7,
    attempts: 3,
    passes: 3,
    source: 'graded',
    updatedAt: ISO,
    ...over,
  };
}

test('prep is skipped when every prerequisite is measured, strong and fresh', () => {
  const gate = evaluatePrepGate(['kp:phase-space'], [measured()], NOW);
  assert.equal(gate.skip, true);
});

test('prep is not skipped when a prerequisite is below the level floor', () => {
  const gate = evaluatePrepGate(['kp:phase-space'], [measured({ level: 0.65 })], NOW);
  assert.equal(gate.skip, false);
  assert.equal(gate.failing[0]?.why, 'level_below_0.7');
});

test('a student_manual record at confidence 0.4 does not buy a skip', () => {
  // The load-bearing case: dragging a slider is a claim, not a measurement.
  const gate = evaluatePrepGate(
    ['kp:phase-space'],
    [measured({ level: 0.95, confidence: 0.4, source: 'student_manual' })],
    NOW,
  );
  assert.equal(gate.skip, false);
  assert.equal(gate.failing[0]?.why, 'self_reported');
});

test('a stale prerequisite does not buy a skip', () => {
  const old = new Date(NOW - 90 * 86_400_000).toISOString();
  const gate = evaluatePrepGate(['kp:phase-space'], [measured({ updatedAt: old })], NOW);
  assert.equal(gate.skip, false);
  assert.equal(gate.failing[0]?.why, 'older_than_60d');
});

test('a section with no prerequisites keeps prep as a light warm-up', () => {
  const gate = evaluatePrepGate([], [], NOW);
  assert.equal(gate.skip, false);
  assert.match(gate.reason, /no_prerequisites/);
});

// ---------------------------------------------------------------------------
// Mastery math
// ---------------------------------------------------------------------------

test("source 'discussion' with observed 0.9 is clamped and halved", () => {
  const base = emptyRecord('kp:entropy', ISO);
  const graded = applyEvidence({
    record: base,
    observed: 0.9,
    targetLevel: 2,
    hintsUsed: 0,
    source: 'graded',
    sessionId: 's',
    attemptId: 'a1',
    score: 5,
    variant: 0,
    nowIso: ISO,
  });
  const discussed = applyEvidence({
    record: base,
    observed: 0.9,
    targetLevel: 2,
    hintsUsed: 0,
    source: 'discussion',
    sessionId: 's',
    attemptId: 'a2',
    score: null,
    variant: 0,
    nowIso: ISO,
  });

  // graded: 0 + 0.45·1.0·(0.9−0) = 0.405
  assert.ok(Math.abs(graded.level - 0.405) < 1e-9, `graded=${graded.level}`);
  // discussion: observed clamped to 0.6, weight halved -> 0.225·0.6 = 0.135
  assert.ok(Math.abs(discussed.level - 0.135) < 1e-9, `discussed=${discussed.level}`);
  assert.ok(discussed.level < graded.level);
});

test('hints damp the update by 0.75 per hint', () => {
  const base = emptyRecord('kp:entropy', ISO);
  const apply = (hintsUsed: number) =>
    applyEvidence({
      record: base,
      observed: 1,
      targetLevel: 2,
      hintsUsed,
      source: 'graded',
      sessionId: 's',
      attemptId: `a${hintsUsed}`,
      score: 5,
      variant: 0,
      nowIso: ISO,
    }).level;

  assert.ok(Math.abs(apply(0) - 0.45) < 1e-9);
  assert.ok(Math.abs(apply(1) - 0.3375) < 1e-9);
  assert.ok(Math.abs(apply(2) - 0.253125) < 1e-9);
});

test('revertEvidence restores the exact pre-grade level', () => {
  const before = measured({ kpId: 'kp:entropy', level: 0.42, confidence: 0.55 });
  const after = applyEvidence({
    record: before,
    observed: 0.8,
    targetLevel: 3,
    hintsUsed: 1,
    source: 'graded',
    sessionId: 's',
    attemptId: 'a-revert',
    score: 4,
    variant: 0,
    nowIso: ISO,
  });
  assert.notEqual(after.level, before.level);

  const { record: reverted, reverted: didRevert } = revertEvidence(after, 'a-revert', { nowIso: ISO, sessionId: 's' });
  assert.equal(didRevert, true);
  assert.ok(
    Math.abs(reverted.level - before.level) < 1e-12,
    `expected ${before.level}, got ${reverted.level}`,
  );
  assert.equal(reverted.attempts, before.attempts);
  assert.equal(reverted.history.length, before.history.length);
});

test('reverting an unknown attempt is a no-op', () => {
  const record = measured();
  const { record: out, reverted } = revertEvidence(record, 'nope', { nowIso: ISO, sessionId: 's' });
  assert.equal(reverted, false);
  assert.equal(out, record);
});

// ---------------------------------------------------------------------------
// The achievement gate (harness.md §6)
// ---------------------------------------------------------------------------

function attempt(over: Partial<Attempt> = {}): Attempt {
  return {
    attemptId: 'a',
    variant: 0,
    genre: 'descriptive',
    question: 'q',
    setup: null,
    rubric: {},
    expectedPoints: [],
    hintLadder: [],
    sourceAnchor: ANCHOR,
    targetsMisreading: null,
    answer: 'x',
    hintsUsed: 0,
    score: 4,
    evaluation: 'ok',
    pointsHit: [],
    pointsMissed: [],
    misconceptions: [],
    answerQuality: 'on-topic',
    at: ISO,
    discussion: [],
    discussedPoints: [],
    exitChoice: null,
    ...over,
  };
}

function step(over: Partial<Step> = {}): Step {
  return {
    id: 'step:1',
    title: 's',
    goal: 'g',
    knowledgePointIds: ['kp:entropy'],
    targetLevel: 2,
    questionGenre: 'descriptive',
    anchors: [ANCHOR],
    inserted: false,
    isPrep: false,
    passed: true,
    chipState: 'passed',
    attempts: [attempt()],
    ...over,
  };
}

test('achievement gate: mean 3.50 is eligible, 3.49 is not', () => {
  const at = (scores: number[]) =>
    evaluateAchievementGate({
      plannedStepsTotal: 2,
      plannedStepsPassed: 2,
      scores,
      hintedPasses: 0,
      totalPasses: 2,
      anyStepSkippedAsUnmastered: false,
    });
  // The boundary is >= 3.5, so these two differ by the smallest step that can
  // straddle it with integer scores.
  assert.equal(at([3, 4]).eligible, true, 'mean 3.50 must pass');
  assert.equal(at([3.49, 3.49]).eligible, false, 'mean 3.49 must fail');
});

test('inserted and prep steps are excluded from both sides of the gate', () => {
  const session = emptySession({
    steps: [
      step({ id: 'step:1', attempts: [attempt({ score: 4 })] }),
      step({ id: 'step:2', attempts: [attempt({ score: 4 })] }),
      // A backtrack step scored 1: must neither drag the mean down nor count as
      // a planned step that was not passed.
      step({ id: 'step:ins', inserted: true, passed: false, attempts: [attempt({ score: 1 })] }),
      step({ id: 'step:prep', isPrep: true, passed: false, attempts: [attempt({ score: 1 })] }),
    ],
  });

  const input = achievementGateInput(session);
  assert.equal(input.plannedStepsTotal, 2);
  assert.equal(input.plannedStepsPassed, 2);
  assert.deepEqual(input.scores, [4, 4]);
  assert.equal(evaluateAchievementGate(input).eligible, true);
});

test('a skipped step blocks the award', () => {
  const gate = evaluateAchievementGate({
    plannedStepsTotal: 3,
    plannedStepsPassed: 3,
    scores: [4, 5, 4],
    hintedPasses: 0,
    totalPasses: 3,
    anyStepSkippedAsUnmastered: true,
  });
  assert.equal(gate.eligible, false);
  assert.match(gate.reasons.join(' '), /skipped/);
});

test('a hinted-pass majority blocks the award', () => {
  const gate = evaluateAchievementGate({
    plannedStepsTotal: 3,
    plannedStepsPassed: 3,
    scores: [4, 5, 4],
    hintedPasses: 2,
    totalPasses: 3,
    anyStepSkippedAsUnmastered: false,
  });
  assert.equal(gate.eligible, false);
  assert.match(gate.reasons.join(' '), /hintedPassRatio/);
});
