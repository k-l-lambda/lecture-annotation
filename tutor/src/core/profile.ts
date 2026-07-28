/**
 * Mastery math and the profile digest. Pure functions — no ports, no I/O.
 *
 * Every formula here is transcribed from design.local/tutor/data-model.md §2-§3.
 * Deliberately small: the point is that a student can audit why a number moved,
 * and that a bad grading run can be reverted exactly via the stored `delta`.
 */

import type {
  DigestEntry,
  EffectiveMastery,
  EvidenceSource,
  KnowledgePoint,
  MasteryEvidence,
  MasteryRecord,
  ProfileDigest,
  Score,
  TargetLevel,
} from './types.ts';

const DAY_MS = 86_400_000;
const HISTORY_CAP = 20;

export const BASE_WEIGHT = 0.45;
export const CONFIDENCE_GAIN = 0.35;

/** data-model.md §2: a level-3 pass moves mastery more than a level-1 pass. */
export const LEVEL_WEIGHT: Record<TargetLevel, number> = { 1: 0.7, 2: 1.0, 3: 1.15 };

/** Hints damp the move: 0.75 ^ hintsUsed. */
export function hintPenalty(hintsUsed: number): number {
  return Math.pow(0.75, Math.max(0, hintsUsed));
}

export function clamp01(x: number): number {
  if (Number.isNaN(x)) return 0;
  return Math.min(1, Math.max(0, x));
}

export function levelWeight(targetLevel: TargetLevel): number {
  return LEVEL_WEIGHT[targetLevel] ?? 1.0;
}

// ---------------------------------------------------------------------------
// Decay on read (never on a timer)
// ---------------------------------------------------------------------------

export function ageDays(updatedAt: string, now: number): number {
  const then = Date.parse(updatedAt);
  if (Number.isNaN(then)) return 0;
  return Math.max(0, (now - then) / DAY_MS);
}

/**
 * effectiveLevel      = level · (1 − 0.25 · min(1, ageDays / 180))
 * effectiveConfidence = confidence · (1 − 0.5 · min(1, ageDays / 180))
 *
 * So a year-old pass no longer buys a prep-step skip (harness.md §3.1).
 */
export function effective(record: MasteryRecord, now: number): EffectiveMastery {
  const age = ageDays(record.updatedAt, now);
  const t = Math.min(1, age / 180);
  return {
    kpId: record.kpId,
    level: clamp01(record.level * (1 - 0.25 * t)),
    confidence: clamp01(record.confidence * (1 - 0.5 * t)),
    ageDays: age,
    source: record.source,
    attempts: record.attempts,
  };
}

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

export function emptyRecord(kpId: string, nowIso: string): MasteryRecord {
  return {
    kpId,
    level: 0,
    confidence: 0,
    attempts: 0,
    passes: 0,
    lastLevel: null,
    source: 'graded',
    history: [],
    firstSeenAt: nowIso,
    updatedAt: nowIso,
  };
}

function pushHistory(record: MasteryRecord, entry: MasteryEvidence): void {
  record.history.push(entry);
  if (record.history.length > HISTORY_CAP) {
    record.history.splice(0, record.history.length - HISTORY_CAP);
  }
}

export interface ApplyEvidenceInput {
  record: MasteryRecord;
  observed: number; // 0..1
  targetLevel: TargetLevel;
  hintsUsed: number;
  source: Extract<EvidenceSource, 'graded' | 'discussion'>;
  sessionId: string;
  attemptId: string;
  score: Score | null;
  variant: number;
  nowIso: string;
  note?: string;
}

/**
 * The update rule (data-model.md §2):
 *
 *   w           = 0.45 · levelWeight(targetLevel) · hintPenalty(hintsUsed)
 *   level'      = clamp01(level + w · (observed − level))
 *   confidence' = clamp01(1 − (1 − confidence) · (1 − 0.35 · levelWeight))
 *
 * `source: 'discussion'` is deliberately weaker (harness.md §5.1): observed is
 * clamped to <= 0.6 and the weight is halved. Talking a student to the right
 * answer is real learning but not an independent test.
 */
export function applyEvidence(input: ApplyEvidenceInput): MasteryRecord {
  const { record, targetLevel, hintsUsed, source, nowIso } = input;

  const lw = levelWeight(targetLevel);
  const observed =
    source === 'discussion' ? Math.min(0.6, clamp01(input.observed)) : clamp01(input.observed);
  const weight = BASE_WEIGHT * lw * hintPenalty(hintsUsed) * (source === 'discussion' ? 0.5 : 1);

  const before = record.level;
  const level = clamp01(before + weight * (observed - before));
  const confidence = clamp01(1 - (1 - record.confidence) * (1 - CONFIDENCE_GAIN * lw));

  const next: MasteryRecord = {
    ...record,
    level,
    confidence,
    attempts: record.attempts + 1,
    passes: record.passes + (input.score !== null && input.score >= 3 ? 1 : 0),
    lastLevel: targetLevel,
    source,
    history: [...record.history],
    updatedAt: nowIso,
  };

  pushHistory(next, {
    at: nowIso,
    sessionId: input.sessionId,
    attemptId: input.attemptId,
    score: input.score,
    targetLevel,
    hintsUsed,
    variant: input.variant,
    delta: level - before,
    source,
    ...(input.note ? { note: input.note } : {}),
  });

  return next;
}

// ---------------------------------------------------------------------------
// Student-side mutations (tools.md §6). The model cannot call these.
// ---------------------------------------------------------------------------

export interface MutationContext {
  nowIso: string;
  sessionId: string;
}

/** Slider in the profile drawer. Self-set values carry confidence 0.4, which sits
 *  below the prep gate's 0.5 threshold — self-reporting informs, never skips. */
export function setMasteryLevel(
  record: MasteryRecord,
  level: number,
  ctx: MutationContext,
): MasteryRecord {
  const before = record.level;
  const next: MasteryRecord = {
    ...record,
    level: clamp01(level),
    confidence: 0.4,
    source: 'student_manual',
    history: [...record.history],
    updatedAt: ctx.nowIso,
  };
  pushHistory(next, {
    at: ctx.nowIso,
    sessionId: ctx.sessionId,
    attemptId: 'student_manual',
    score: null,
    targetLevel: record.lastLevel ?? 1,
    hintsUsed: 0,
    variant: 0,
    delta: next.level - before,
    source: 'student_manual',
  });
  return next;
}

export function resetMastery(record: MasteryRecord, ctx: MutationContext): MasteryRecord {
  const before = record.level;
  const next: MasteryRecord = {
    ...record,
    level: 0,
    confidence: 0,
    attempts: 0,
    passes: 0,
    lastLevel: null,
    source: 'student_manual',
    history: [...record.history],
    updatedAt: ctx.nowIso,
  };
  pushHistory(next, {
    at: ctx.nowIso,
    sessionId: ctx.sessionId,
    attemptId: 'student_reset',
    score: null,
    targetLevel: 1,
    hintsUsed: 0,
    variant: 0,
    delta: -before,
    source: 'student_manual',
  });
  return next;
}

/**
 * Undo exactly one grading using the stored `delta` (data-model.md §2).
 * Returns the record unchanged when the attempt is not in history.
 */
export function revertEvidence(
  record: MasteryRecord,
  attemptId: string,
  ctx: MutationContext,
): { record: MasteryRecord; reverted: boolean } {
  const idx = record.history.findIndex((h) => h.attemptId === attemptId);
  if (idx < 0) return { record, reverted: false };

  const entry = record.history[idx]!;
  const history = record.history.filter((_, i) => i !== idx);
  const next: MasteryRecord = {
    ...record,
    level: clamp01(record.level - entry.delta),
    attempts: Math.max(0, record.attempts - 1),
    passes: Math.max(0, record.passes - (entry.score !== null && entry.score >= 3 ? 1 : 0)),
    source: 'student_revert',
    history,
    updatedAt: ctx.nowIso,
  };
  return { record: next, reverted: true };
}

// ---------------------------------------------------------------------------
// Digest sent to the model (data-model.md §3)
// ---------------------------------------------------------------------------

const MAX_KNOWN = 12;
const MAX_WEAK = 8;
const MAX_UNSEEN = 8;

const KNOWN_LEVEL = 0.6;

function round2(x: number): number {
  return Math.round(x * 100) / 100;
}

function toDigestEntry(m: EffectiveMastery, label: string): DigestEntry {
  return {
    kpId: m.kpId,
    label,
    level: round2(m.level),
    confidence: round2(m.confidence),
    ageDays: Math.round(m.ageDays),
  };
}

/**
 * `beginner < 0.35 <= intermediate < 0.7 <= advanced` on the mean effective
 * level, so the questioner can pitch tone without doing float arithmetic.
 */
export function overallLevel(levels: number[]): ProfileDigest['overallLevel'] {
  if (levels.length === 0) return 'beginner';
  const mean = levels.reduce((a, b) => a + b, 0) / levels.length;
  if (mean < 0.35) return 'beginner';
  if (mean < 0.7) return 'intermediate';
  return 'advanced';
}

export interface DigestInput {
  kpIds: string[];
  records: MasteryRecord[];
  knowledgePoints: KnowledgePoint[];
  recentAchievements: string[];
  now: number;
  background?: string;
  backgroundConflicts?: Array<{ kpId: string; claimed: string; measured: number }>;
}

/**
 * The model never receives the whole profile — only a bounded, decayed digest:
 * at most 12 known + 8 weak + 8 unseen.
 */
export function digest(input: DigestInput): ProfileDigest {
  const labels = new Map(input.knowledgePoints.map((k) => [k.id, k.label]));
  const byId = new Map(input.records.map((r) => [r.kpId, r]));
  const relevant = input.kpIds.length > 0 ? input.kpIds : [...byId.keys()];

  const known: DigestEntry[] = [];
  const weak: DigestEntry[] = [];
  const unseen: string[] = [];
  const allLevels: number[] = [];

  for (const kpId of relevant) {
    const record = byId.get(kpId);
    const label = labels.get(kpId) ?? kpId;
    if (!record || record.attempts === 0) {
      unseen.push(label);
      continue;
    }
    const eff = effective(record, input.now);
    allLevels.push(eff.level);
    (eff.level >= KNOWN_LEVEL ? known : weak).push(toDigestEntry(eff, label));
  }

  known.sort((a, b) => b.level - a.level);
  weak.sort((a, b) => a.level - b.level);

  const out: ProfileDigest = {
    known: known.slice(0, MAX_KNOWN),
    weak: weak.slice(0, MAX_WEAK),
    unseen: unseen.slice(0, MAX_UNSEEN),
    recentAchievements: input.recentAchievements.slice(0, 5),
    overallLevel: overallLevel(allLevels),
  };
  if (input.background) out.background = input.background;
  if (input.backgroundConflicts?.length) out.backgroundConflicts = input.backgroundConflicts;
  return out;
}

// ---------------------------------------------------------------------------
// Prerequisite gate (harness.md §3.1)
// ---------------------------------------------------------------------------

export const PREP_LEVEL_MIN = 0.7;
export const PREP_CONFIDENCE_MIN = 0.5;
export const PREP_AGE_MAX_DAYS = 60;

export interface PrepGateResult {
  skip: boolean;
  reason: string;
  satisfied: Array<{ kpId: string; level: number }>;
  failing: Array<{ kpId: string; level: number; confidence: number; ageDays: number; why: string }>;
}

/**
 * skipPrep  <=>  prereqs.length > 0
 *            AND  for every p: level >= 0.7 AND confidence >= 0.5 AND ageDays <= 60
 *
 * Only *measured* evidence counts. A student-manual record carries confidence
 * 0.4, so a dragged slider cannot buy a skip; nor can background prose, which
 * is not a mastery record at all (data-model.md §3).
 */
export function evaluatePrepGate(
  prereqKpIds: string[],
  records: MasteryRecord[],
  now: number,
): PrepGateResult {
  if (prereqKpIds.length === 0) {
    return {
      skip: false,
      reason: 'no_prerequisites: 本节自足，准备步骤作为轻量导入保留',
      satisfied: [],
      failing: [],
    };
  }

  const byId = new Map(records.map((r) => [r.kpId, r]));
  const satisfied: PrepGateResult['satisfied'] = [];
  const failing: PrepGateResult['failing'] = [];

  for (const kpId of prereqKpIds) {
    const record = byId.get(kpId);
    if (!record || record.attempts === 0) {
      failing.push({ kpId, level: 0, confidence: 0, ageDays: 0, why: 'untested' });
      continue;
    }
    // Student-manual evidence is not measured evidence.
    if (record.source === 'student_manual') {
      const eff = effective(record, now);
      failing.push({
        kpId,
        level: round2(eff.level),
        confidence: round2(eff.confidence),
        ageDays: Math.round(eff.ageDays),
        why: 'self_reported',
      });
      continue;
    }
    const eff = effective(record, now);
    const why =
      eff.level < PREP_LEVEL_MIN
        ? 'level_below_0.7'
        : eff.confidence < PREP_CONFIDENCE_MIN
          ? 'confidence_below_0.5'
          : eff.ageDays > PREP_AGE_MAX_DAYS
            ? 'older_than_60d'
            : null;
    if (why) {
      failing.push({
        kpId,
        level: round2(eff.level),
        confidence: round2(eff.confidence),
        ageDays: Math.round(eff.ageDays),
        why,
      });
    } else {
      satisfied.push({ kpId, level: round2(eff.level) });
    }
  }

  if (failing.length === 0) {
    const detail = satisfied.map((s) => `${s.kpId} ${s.level}`).join('、');
    return { skip: true, reason: `已根据你的档案跳过准备步骤（${detail}）`, satisfied, failing };
  }
  const first = failing[0]!;
  return {
    skip: false,
    reason: `先做一个准备步骤，确认前置知识（${first.kpId}: ${first.why}）`,
    satisfied,
    failing,
  };
}
