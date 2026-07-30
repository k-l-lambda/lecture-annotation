/**
 * executeTool — the ONLY writer of session and profile state (README.md §2
 * layering rule 3). roles.ts cannot mutate anything; it passes a tool call here
 * and relays the result back to the model.
 *
 * Every handler returns `{ok: true, ...}` or `{ok: false, errors: [...]}`, and a
 * rejection leaves state untouched so the model can repair in-band (tools.md §1).
 */

import type {
  AchievementGateInput,
} from './validate.ts';
import {
  evaluateAchievementGate,
  validateAnalyzeSection,
  validateAskQuestion,
  validateEvaluation,
  validateKpId,
  validateSteps,
} from './validate.ts';
import * as profile from './profile.ts';
import type { Clock, IdGen, Store } from './ports.ts';
import type {
  AnalyzeSectionArgs,
  AskQuestionArgs,
  FinishSessionArgs,
  GetStudentProfileArgs,
  InsertPrerequisiteStepArgs,
  ProposeAchievementArgs,
  SetStepsArgs,
  SubmitEvaluationArgs,
  ToolName,
  UpdateMasteryArgs,
  UpsertKnowledgePointsArgs,
} from './schema.ts';
import { roleMayCall } from './schema.ts';
import type {
  Attempt,
  KnowledgePoint,
  MasteryRecord,
  RoleName,
  Score,
  SectionContent,
  SessionRecord,
  Settings,
  Step,
  TargetLevel,
  ToolResult,
} from './types.ts';
import { PASS_THRESHOLD, toolErr } from './types.ts';

// ---------------------------------------------------------------------------
// Execution context
// ---------------------------------------------------------------------------

export interface ToolContext {
  session: SessionRecord;
  section: SectionContent;
  settings: Settings;
  store: Store;
  clock: Clock;
  ids: IdGen;
  /** Set by session.ts; used to scope update_mastery and resolve the live question. */
  liveQuestionId: string | null;
  /** True once analyze_section has passed in this session — gates set_steps. */
  analyzePassed: boolean;
  /** Digest cache invalidated whenever mastery is written. */
  invalidateDigest(): void;
}

function nowIso(ctx: ToolContext): string {
  return new Date(ctx.clock.now()).toISOString();
}

function currentStep(session: SessionRecord): Step | null {
  return session.steps[session.cursor.stepIndex] ?? null;
}

function sectionText(section: SectionContent): string {
  return `${section.heading}\n${section.annotation}`;
}

/**
 * Optional-string normalisation for values that came off the wire.
 *
 * A JSON Schema `["string","null"]` field frequently arrives as the four-
 * character string `"null"` (or `"none"`, or empty) from a real model. Those are
 * absent values, and treating them as content puts the word "null" in front of
 * the student.
 */
function emptyToNull(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  if (trimmed === '' || /^(null|none|n\/a|undefined)$/i.test(trimmed)) return null;
  return trimmed;
}

// ---------------------------------------------------------------------------
// get_student_profile
// ---------------------------------------------------------------------------

async function getStudentProfile(
  args: GetStudentProfileArgs,
  ctx: ToolContext,
): Promise<ToolResult> {
  const kps = await ctx.store.getAllKnowledgePoints();
  const hints = (args.kpHints ?? []).map((h) => h.toLowerCase().trim()).filter(Boolean);

  // Match hints against id, label and aliases; fall back to the section's own KPs.
  const matched = kps.filter((k) => {
    const haystack = [k.id, k.label, ...(k.aliases ?? [])].join(' ').toLowerCase();
    return hints.some((h) => haystack.includes(h));
  });
  const planned = ctx.session.plan?.knowledgePointIds ?? [];
  const kpIds = [...new Set([...matched.map((k) => k.id), ...planned])];

  const records = await ctx.store.getMastery(kpIds);
  const achievements = args.includeAchievements === false ? [] : await ctx.store.listAchievements();

  const digest = profile.digest({
    kpIds,
    records,
    knowledgePoints: kps,
    recentAchievements: achievements
      .filter((a) => a.accepted)
      .slice(-5)
      .map((a) => a.name),
    now: ctx.clock.now(),
    ...(ctx.settings.background && ctx.settings.backgroundAffectsQuestions
      ? { background: ctx.settings.background }
      : {}),
  });

  return { ok: true, ...digest };
}

// ---------------------------------------------------------------------------
// analyze_section — the gate that makes "read before you plan" mechanical
// ---------------------------------------------------------------------------

function analyzeSection(args: AnalyzeSectionArgs, ctx: ToolContext): ToolResult {
  const errors = validateAnalyzeSection(args, {
    sectionText: sectionText(ctx.section),
    formulaCount: ctx.section.formulaCount,
    degradedContext: ctx.session.degradedContext,
  });
  if (errors.length > 0) return toolErr(errors);

  ctx.session.analysis = args;
  return {
    ok: true,
    accepted: true,
    formulasCovered: args.formulas.length,
    formulasInSection: ctx.section.formulaCount,
    note: '分析已记录，可以设定步骤了。',
  };
}

// ---------------------------------------------------------------------------
// upsert_knowledge_points
// ---------------------------------------------------------------------------

async function upsertKnowledgePoints(
  args: UpsertKnowledgePointsArgs,
  ctx: ToolContext,
): Promise<ToolResult> {
  const proposed = args.knowledgePoints ?? [];
  if (proposed.length === 0) return toolErr(['knowledgePoints is empty.']);

  const errors: string[] = [];
  for (const kp of proposed) errors.push(...validateKpId(kp.id));
  if (errors.length > 0) return toolErr(errors);

  const iso = nowIso(ctx);
  const toWrite: KnowledgePoint[] = proposed.map((kp) => ({
    id: kp.id,
    label: kp.label,
    aliases: kp.aliases ?? [],
    sources: [{ page: ctx.session.page, sectionId: ctx.session.sectionId }],
    prerequisites: kp.prerequisites ?? [],
    createdAt: iso,
    updatedAt: iso,
  }));

  // The store dedups by id, then normalised label, then alias; the canonical id
  // it returns may differ from what was proposed. That reuse is what makes the
  // profile accumulate across sections instead of fragmenting.
  const canonical = await ctx.store.upsertKnowledgePoints(toWrite);

  const remap: Record<string, string> = {};
  canonical.forEach((c, i) => {
    const p = toWrite[i];
    if (p && p.id !== c.id) remap[p.id] = c.id;
  });

  return {
    ok: true,
    knowledgePoints: canonical.map((k) => ({ id: k.id, label: k.label })),
    ...(Object.keys(remap).length > 0
      ? { remapped: remap, note: '部分 id 已合并到已有知识点，请使用返回的 id。' }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// set_steps
// ---------------------------------------------------------------------------

async function setSteps(args: SetStepsArgs, ctx: ToolContext): Promise<ToolResult> {
  // Ordering is enforced here, not merely explained in the prompt — but only when
  // the analysis is required at all. With `requireAnalysis` off the ladder's own
  // anchors are still verbatim-checked below, which is the grounding that matters
  // for question generation.
  if (ctx.settings.requireAnalysis && (!ctx.analyzePassed || !ctx.session.analysis)) {
    return toolErr([
      'set_steps requires a successful analyze_section first in this session: read the section and submit the analysis, then set the ladder.',
    ]);
  }

  const known = await ctx.store.getAllKnowledgePoints();
  const errors = validateSteps(args.steps ?? [], {
    stepRange: ctx.settings.stepRange,
    genrePreference: ctx.settings.genrePreference,
    knownKpIds: new Set(known.map((k) => k.id)),
    sectionText: sectionText(ctx.section),
  });
  if (errors.length > 0) return toolErr(errors);

  // The prep decision is the harness's, not the model's (harness.md §3.1).
  const prereqIds = [
    ...new Set(
      known
        .filter((k) => (args.steps ?? []).some((s) => s.knowledgePointIds.includes(k.id)))
        .flatMap((k) => k.prerequisites ?? []),
    ),
  ];
  const prereqRecords = await ctx.store.getMastery(prereqIds);
  const gate = profile.evaluatePrepGate(prereqIds, prereqRecords, ctx.clock.now());

  const modelRecommended = args.prep?.include ?? true;
  const prepIncluded = !gate.skip;
  const overridden = modelRecommended !== prepIncluded;

  const iso = nowIso(ctx);
  const steps: Step[] = [];

  if (prepIncluded) {
    steps.push({
      id: 'prep',
      title: prereqIds.length === 0 ? '本节导入' : '准备：确认前置知识',
      goal:
        prereqIds.length === 0
          ? '建立本节的问题意识'
          : `确认前置知识：${(args.prep?.focusKpIds ?? prereqIds).join('、')}`,
      knowledgePointIds: args.prep?.focusKpIds?.length ? args.prep.focusKpIds : prereqIds,
      targetLevel: 1,
      questionGenre: 'descriptive',
      anchors: [],
      inserted: false,
      isPrep: true,
      attempts: [],
      passed: false,
      chipState: 'pending',
      dialogue: [],
    });
  }

  for (const s of args.steps) {
    steps.push({
      id: s.id,
      title: s.title,
      goal: s.goal,
      knowledgePointIds: s.knowledgePointIds,
      targetLevel: s.targetLevel,
      questionGenre: s.questionGenre,
      anchors: s.anchors,
      inserted: false,
      isPrep: false,
      attempts: [],
      passed: false,
      chipState: 'pending',
      dialogue: [],
    });
  }

  ctx.session.steps = steps;
  ctx.session.plan = {
    knowledgePointIds: [...new Set(args.steps.flatMap((s) => s.knowledgePointIds))],
    prereqs: prereqIds,
    prepRecommendation: {
      include: modelRecommended,
      reason: args.prep?.reason ?? '',
      focusKpIds: args.prep?.focusKpIds ?? [],
    },
    prepIncluded,
    prepDecision: {
      source: 'profile_rule',
      modelRecommended,
      reason: gate.reason,
    },
    rationale: args.rationale ?? '',
  };
  ctx.session.cursor = { stepIndex: 0, variant: 0, backtrackDepth: 0 };
  ctx.session.updatedAt = iso;

  return {
    ok: true,
    steps: steps.map((s) => ({ id: s.id, title: s.title, targetLevel: s.targetLevel, isPrep: s.isPrep })),
    prepIncluded,
    prepDecision: {
      source: 'profile_rule',
      modelRecommended,
      reason: gate.reason,
      ...(overridden ? { overrode: 'model_recommendation' } : {}),
    },
    cursor: { stepIndex: 0, isPrep: steps[0]?.isPrep ?? false },
    ...(overridden
      ? {
          note: `系统按档案规则${prepIncluded ? '保留' : '跳过'}了准备步骤，与你的建议不同。向学生说明实际计划时以此为准。`,
        }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// ask_question
// ---------------------------------------------------------------------------

function askQuestion(args: AskQuestionArgs, ctx: ToolContext): ToolResult {
  const step = currentStep(ctx.session);
  if (!step) return toolErr(['no current step: the ladder has not been set.']);
  if (args.stepId && args.stepId !== step.id) {
    return toolErr([
      `stepId '${args.stepId}' is not the current step ('${step.id}'): ask for the current step.`,
    ]);
  }

  const errors = validateAskQuestion(args, {
    sectionText: sectionText(ctx.section),
    genrePreference: ctx.settings.genrePreference,
    askedQuestions: collectAskedQuestions(ctx.session),
    targetLevel: step.targetLevel,
    kpIds: step.knowledgePointIds,
    isPrep: step.isPrep,
    inserted: step.inserted,
  });
  if (errors.length > 0) return toolErr(errors);

  const attemptId = ctx.ids.next('q');
  const attempt: Attempt = {
    attemptId,
    variant: ctx.session.cursor.variant,
    genre: args.genre,
    question: args.question,
    // Normalised here rather than in a shell: a live model emits the *string*
    // "null" for an absent optional often enough that `?? null` is not enough,
    // and a truthy "null" would render as literal text in every shell.
    setup: emptyToNull(args.setup),
    rubric: args.rubric,
    expectedPoints: args.expectedPoints,
    hintLadder: args.hintLadder ?? [],
    sourceAnchor: args.sourceAnchor,
    targetsMisreading: emptyToNull(args.targetsMisreading),
    answer: null,
    hintsUsed: 0,
    score: null,
    evaluation: null,
    pointsHit: [],
    pointsMissed: [],
    misconceptions: [],
    answerQuality: null,
    at: nowIso(ctx),
    discussion: [],
    discussedPoints: [],
    clarifications: [],
    exitChoice: null,
  };
  step.attempts.push(attempt);

  return { ok: true, questionId: attemptId, shownAt: attempt.at };
}

/**
 * The `askedQuestions` ledger (tools.md §3.1) is a *projection* of
 * steps[].attempts, not separate state — which is why it survives a reload and a
 * resumed session cannot start repeating questions it already asked.
 */
export function collectAskedQuestions(session: SessionRecord) {
  const out = [];
  for (const [i, step] of session.steps.entries()) {
    for (const a of step.attempts) {
      if (a.question === '') continue;
      out.push({
        stepId: step.id,
        stepTitle: step.title,
        variant: a.variant,
        targetLevel: step.targetLevel,
        genre: a.genre,
        question: a.question,
        expectedPoints: a.expectedPoints.map((p) => p.point),
        kpIds: step.knowledgePointIds,
        sourceAnchor: a.sourceAnchor,
        score: a.score,
        discussedPoints: a.discussedPoints,
        isCurrentStep: i === session.cursor.stepIndex,
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// submit_evaluation
// ---------------------------------------------------------------------------

function findAttempt(session: SessionRecord, questionId: string): { step: Step; attempt: Attempt } | null {
  for (const step of session.steps) {
    const attempt = step.attempts.find((a) => a.attemptId === questionId);
    if (attempt) return { step, attempt };
  }
  return null;
}

function submitEvaluation(args: SubmitEvaluationArgs, ctx: ToolContext): ToolResult {
  if (!ctx.liveQuestionId) return toolErr(['there is no question awaiting evaluation.']);
  if (args.questionId !== ctx.liveQuestionId) {
    return toolErr([
      `questionId '${args.questionId}' does not match the question awaiting evaluation ('${ctx.liveQuestionId}').`,
    ]);
  }
  const found = findAttempt(ctx.session, args.questionId);
  if (!found) return toolErr([`unknown questionId '${args.questionId}'.`]);

  const errors = validateEvaluation(args, found.attempt.expectedPoints.map((p) => p.point));
  if (errors.length > 0) return toolErr(errors);

  const score = args.score as Score;
  found.attempt.score = score;
  found.attempt.evaluation = args.evaluation;
  found.attempt.pointsHit = args.pointsHit ?? [];
  found.attempt.pointsMissed = args.pointsMissed ?? [];
  found.attempt.misconceptions = args.misconceptions ?? [];
  found.attempt.answerQuality = args.answerQuality;

  const passed = score >= PASS_THRESHOLD;
  if (passed) found.step.passed = true;
  ctx.session.updatedAt = nowIso(ctx);

  // The harness deliberately does NOT tell the model what happens next: the
  // student decides (tools.md §3).
  return {
    ok: true,
    passed,
    recorded: { questionId: args.questionId, score, stepId: found.step.id },
    studentChoicePending: true,
  };
}

// ---------------------------------------------------------------------------
// update_mastery
// ---------------------------------------------------------------------------

async function updateMastery(args: UpdateMasteryArgs, ctx: ToolContext): Promise<ToolResult> {
  const step = currentStep(ctx.session);
  if (!step) return toolErr(['no current step.']);

  const evidence = args.evidence ?? [];
  if (evidence.length === 0) return toolErr(['evidence is empty.']);

  const allowed = new Set(step.knowledgePointIds);
  const outOfScope = evidence.filter((e) => !allowed.has(e.kpId)).map((e) => e.kpId);
  if (outOfScope.length > 0) {
    return toolErr([
      `these knowledge points are not targets of the current step: ${outOfScope.join(
        ', ',
      )}. Only report evidence for ${[...allowed].join(', ')}.`,
    ]);
  }

  const source = args.source === 'discussion' ? 'discussion' : 'graded';
  const attempt = step.attempts[step.attempts.length - 1];
  const attemptId = attempt?.attemptId ?? 'no-attempt';
  const iso = nowIso(ctx);
  const applied: Array<{ kpId: string; level: number; confidence: number; clamped?: boolean }> = [];

  for (const e of evidence) {
    const existing = (await ctx.store.getMastery([e.kpId]))[0] ?? profile.emptyRecord(e.kpId, iso);

    // Idempotent per (questionId, kpId, source): a second call for the same
    // triple replaces the first rather than compounding (tools.md §3).
    const prior = existing.history.find(
      (h) => h.attemptId === attemptId && h.source === source,
    );
    const base = prior
      ? profile.revertEvidence(existing, attemptId, { nowIso: iso, sessionId: ctx.session.id }).record
      : existing;

    const clamped = source === 'discussion' && e.observed > 0.6;
    const next = profile.applyEvidence({
      record: base,
      observed: e.observed,
      targetLevel: step.targetLevel,
      hintsUsed: attempt?.hintsUsed ?? 0,
      source,
      sessionId: ctx.session.id,
      attemptId,
      // Discussion evidence carries no score, so it can never flip a step to passed.
      score: source === 'graded' ? (attempt?.score ?? null) : null,
      variant: attempt?.variant ?? 0,
      nowIso: iso,
      ...(e.note ? { note: e.note } : {}),
    });
    await ctx.store.putMastery(next);

    const eff = profile.effective(next, ctx.clock.now());
    applied.push({
      kpId: e.kpId,
      level: Math.round(eff.level * 100) / 100,
      confidence: Math.round(eff.confidence * 100) / 100,
      ...(clamped ? { clamped: true } : {}),
    });
  }

  ctx.invalidateDigest();

  return {
    ok: true,
    source,
    applied,
    ...(source === 'discussion'
      ? { note: '讨论证据按半权重记录，observed 上限 0.6，不会把未通过的步骤改为通过。' }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// insert_prerequisite_step
// ---------------------------------------------------------------------------

export const BACKTRACK_DEPTH_CAP = 2;

function insertPrerequisiteStep(
  args: InsertPrerequisiteStepArgs,
  ctx: ToolContext,
): ToolResult {
  if (ctx.session.degradedTools) {
    return toolErr(['insert_prerequisite_step is disabled in degraded (JSON) mode.']);
  }
  if (ctx.session.cursor.backtrackDepth >= BACKTRACK_DEPTH_CAP) {
    return toolErr([
      `backtrack depth is already ${ctx.session.cursor.backtrackDepth} (cap ${BACKTRACK_DEPTH_CAP}): explain the prerequisite in prose and point to the earlier section instead of inserting another step.`,
    ]);
  }

  const targetIdx = ctx.session.steps.findIndex((s) => s.id === args.beforeStepId);
  if (targetIdx < 0) return toolErr([`unknown beforeStepId '${args.beforeStepId}'.`]);

  // A prerequisite step already inserted in this session is not inserted twice.
  const wanted = new Set(args.knowledgePointIds ?? []);
  const duplicate = ctx.session.steps.find(
    (s) =>
      s.inserted &&
      s.knowledgePointIds.length === wanted.size &&
      s.knowledgePointIds.every((k) => wanted.has(k)),
  );
  if (duplicate) {
    return toolErr(
      [
        `a prerequisite step for ${[...wanted].join(', ')} was already inserted ('${duplicate.title}').`,
      ],
      { use_variant_instead: true, stepId: duplicate.id },
    );
  }

  const step: Step = {
    id: ctx.ids.next('ins'),
    title: args.title,
    goal: args.goal,
    knowledgePointIds: args.knowledgePointIds ?? [],
    targetLevel: 1,
    questionGenre: 'descriptive',
    anchors: [],
    inserted: true,
    isPrep: false,
    attempts: [],
    passed: false,
    chipState: 'pending',
    dialogue: [],
  };

  ctx.session.steps.splice(targetIdx, 0, step);
  ctx.session.cursor = {
    stepIndex: targetIdx,
    variant: 0,
    backtrackDepth: ctx.session.cursor.backtrackDepth + 1,
  };
  ctx.session.updatedAt = nowIso(ctx);

  return {
    ok: true,
    stepId: step.id,
    insertedAt: targetIdx,
    backtrackDepth: ctx.session.cursor.backtrackDepth,
    note: '已插入前置步骤并进入。该步骤不计入成就资格。',
  };
}

// ---------------------------------------------------------------------------
// Session end
// ---------------------------------------------------------------------------

export function achievementGateInput(session: SessionRecord): AchievementGateInput {
  // Inserted (backtrack) steps are excluded from both numerator and denominator:
  // backtracking must not be punished, but must not be a cheap route to a badge.
  const planned = session.steps.filter((s) => !s.inserted && !s.isPrep);
  const scores: number[] = [];
  let hintedPasses = 0;
  let totalPasses = 0;
  let skipped = false;

  for (const s of planned) {
    const graded = s.attempts.filter((a) => a.score !== null);
    const best = graded.reduce<number | null>(
      (acc, a) => (acc === null || (a.score ?? 0) > acc ? (a.score ?? 0) : acc),
      null,
    );
    if (best !== null) scores.push(best);
    if (s.chipState === 'skipped') skipped = true;
    for (const a of graded) {
      if ((a.score ?? 0) >= PASS_THRESHOLD) {
        totalPasses += 1;
        if (a.hintsUsed > 0) hintedPasses += 1;
      }
    }
  }

  return {
    plannedStepsTotal: planned.length,
    plannedStepsPassed: planned.filter((s) => s.passed).length,
    scores,
    hintedPasses,
    totalPasses,
    anyStepSkippedAsUnmastered: skipped,
  };
}

async function proposeAchievement(
  args: ProposeAchievementArgs,
  ctx: ToolContext,
): Promise<ToolResult> {
  if (ctx.session.degradedTools) {
    return toolErr(['propose_achievement is disabled in degraded (JSON) mode.'], {
      renderCard: false,
    });
  }

  const gate = evaluateAchievementGate(achievementGateInput(ctx.session));
  if (!gate.eligible) {
    return toolErr(gate.reasons, {
      renderCard: false,
      note: '不满足成就资格，请改为给出具体的下一步建议，不要向学生提及成就。',
    });
  }

  if (!args.name || args.name.trim().length === 0) return toolErr(['name is empty.']);

  // Uniqueness is the harness's job: a collision is disambiguated rather than
  // re-prompted (harness.md §6).
  const existing = await ctx.store.listAchievements();
  let name = args.name.trim();
  let renamed = false;
  if (existing.some((a) => a.accepted && a.name === name)) {
    const scope = ctx.session.sectionTitle.match(/\d+\.\d+/)?.[0];
    name = scope ? `${name} · §${scope}` : `${name} · ${ctx.session.sectionId}`;
    renamed = true;
  }

  ctx.session.achievement = {
    id: `ach:${ctx.session.sectionId}-${existing.length + 1}`,
    name,
    description: args.description,
    basis: args.basis,
    accepted: false,
    declined: false,
    renamed,
  };

  return {
    ok: true,
    name,
    renamed,
    renderCard: true,
    ...(renamed ? { note: '名称与已有成就冲突，系统已加上章节范围，请以返回的名称为准。' } : {}),
  };
}

function finishSession(args: FinishSessionArgs, ctx: ToolContext): ToolResult {
  if (!args.summary || args.summary.trim().length === 0) {
    return toolErr(['summary is empty.']);
  }
  ctx.session.summary = {
    text: args.summary,
    strengths: args.strengths ?? [],
    gaps: args.gaps ?? [],
    nextActions: args.nextActions ?? [],
  };
  ctx.session.updatedAt = nowIso(ctx);
  return { ok: true, closed: true };
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

export interface ExecuteResult {
  result: ToolResult;
  durationMs: number;
}

/**
 * Validates, mutates, and returns a result the model must react to. The caller
 * (session.ts) is responsible for the audit-log entry and for any state
 * transition the result implies.
 */
export async function executeTool(
  role: RoleName,
  name: string,
  args: unknown,
  ctx: ToolContext,
): Promise<ToolResult> {
  if (!roleMayCall(role, name)) {
    return toolErr([
      `tool '${name}' is not available to the ${role} role. Use only the tools you were given.`,
    ]);
  }

  const tool = name as ToolName;
  const a = (args ?? {}) as Record<string, never>;

  switch (tool) {
    case 'get_student_profile':
      return getStudentProfile(a as unknown as GetStudentProfileArgs, ctx);
    case 'analyze_section':
      return analyzeSection(a as unknown as AnalyzeSectionArgs, ctx);
    case 'upsert_knowledge_points':
      return upsertKnowledgePoints(a as unknown as UpsertKnowledgePointsArgs, ctx);
    case 'set_steps':
      return setSteps(a as unknown as SetStepsArgs, ctx);
    case 'ask_question':
      return askQuestion(a as unknown as AskQuestionArgs, ctx);
    case 'submit_evaluation':
      return submitEvaluation(a as unknown as SubmitEvaluationArgs, ctx);
    case 'update_mastery':
      return updateMastery(a as unknown as UpdateMasteryArgs, ctx);
    case 'insert_prerequisite_step':
      return insertPrerequisiteStep(a as unknown as InsertPrerequisiteStepArgs, ctx);
    case 'propose_achievement':
      return proposeAchievement(a as unknown as ProposeAchievementArgs, ctx);
    case 'finish_session':
      return finishSession(a as unknown as FinishSessionArgs, ctx);
  }
}

/** Exported for the student-side profile drawer (tools.md §6). */
export const studentMutations = {
  setMasteryLevel: profile.setMasteryLevel,
  resetMastery: profile.resetMastery,
  revertEvidence: profile.revertEvidence,
};

export type { MasteryRecord, TargetLevel };
