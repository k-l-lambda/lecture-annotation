/**
 * Core vocabulary. Transcribed from design.local/tutor/data-model.md §2 and
 * harness.md §2-§6. No runtime code here — types only, so both shells and the
 * validators agree on one set of shapes.
 */

// ---------------------------------------------------------------------------
// Scales and enumerations
// ---------------------------------------------------------------------------

/** harness.md §3: 1 = 识别/复述, 2 = 应用/计算, 3 = 迁移/解释为什么. */
export type TargetLevel = 1 | 2 | 3;

/** harness.md §4.1 scoring scale. `pass ⟺ score >= 3`. */
export type Score = 0 | 1 | 2 | 3 | 4 | 5;

export const PASS_THRESHOLD = 3;

/** harness.md §4.1. `descriptive` is the recommended default, never the only form. */
export type QuestionGenre =
  | 'descriptive'
  | 'short-result'
  | 'counterexample'
  | 'derivation-step'
  | 'estimate'
  | 'compare';

export const QUESTION_GENRES: readonly QuestionGenre[] = [
  'descriptive',
  'short-result',
  'counterexample',
  'derivation-step',
  'estimate',
  'compare',
];

/** settings.md §5. Gates which genres `ask_question` will accept. */
export type GenrePreference = 'descriptive-only' | 'descriptive-first' | 'mixed';

export type RoleName =
  | 'planner'
  | 'questioner'
  | 'grader'
  | 'tutor_reply'
  | 'summarizer'
  | 'router';

export const ROLE_NAMES: readonly RoleName[] = [
  'planner',
  'questioner',
  'grader',
  'tutor_reply',
  'summarizer',
  'router',
];

/** harness.md §2. */
export type SessionState =
  | 'PLANNING'
  | 'PREP_DECISION'
  | 'STEP_ENTER'
  | 'ASKING'
  | 'AWAIT_ANSWER'
  | 'GRADING'
  | 'DISCUSSING'
  | 'SUMMARIZING'
  | 'AWARD_DECISION'
  | 'DONE'
  | 'ABANDONED';

export type SessionStatus = 'active' | 'completed' | 'abandoned';

/** ui-spec.md §4a step chip states. */
export type ChipState = 'passed' | 'failed' | 'current' | 'pending' | 'inserted' | 'skipped';

/**
 * Student-facing phase names (ui-spec.md §4a). Here rather than in session.ts
 * because the panel's phase indicator must render the label for the state the
 * harness emitted — a second copy in the UI would eventually disagree with the
 * state machine, which is the class of divergence layering rule 2 exists to stop.
 */
export const PHASE_LABELS: Record<SessionState, string> = {
  PLANNING: '正在通读本节…',
  PREP_DECISION: '正在检查前置知识',
  STEP_ENTER: '进入下一步',
  ASKING: '正在出题…',
  AWAIT_ANSWER: '等待作答',
  GRADING: '正在评估…',
  DISCUSSING: '讨论中 · 随时可以选择',
  SUMMARIZING: '正在总结本节',
  AWARD_DECISION: '成就待确认',
  DONE: '已结束',
  ABANDONED: '已结束',
};

/** `targetLevel` 1/2/3 as the step rail shows them (harness.md §3). */
export const TARGET_LEVEL_LABELS: Record<number, string> = {
  1: '识别',
  2: '应用',
  3: '迁移',
};

/** ui-spec.md §4a: a glyph AND a tooltip, so chip state never rests on colour. */
export const CHIP_GLYPHS: Record<ChipState, { glyph: string; label: string }> = {
  passed: { glyph: '✓', label: '已通过' },
  failed: { glyph: '✕', label: '未通过，已继续' },
  current: { glyph: '●', label: '进行中' },
  pending: { glyph: '○', label: '未开始' },
  inserted: { glyph: '↩', label: '补充的前置步骤' },
  skipped: { glyph: '⤼', label: '已跳过（记为未掌握）' },
};

/**
 * data-model.md §3 evidence tiers, in precedence order. `graded` is the only
 * tier the prep-skip gate reads; see harness.md §3.1.
 */
export type EvidenceSource = 'graded' | 'discussion' | 'student_manual' | 'student_revert';

export type ExitChoice = 'advance' | 'remain' | 'skip' | 'quit';

export type AnswerQuality = 'on-topic' | 'off-topic' | 'empty' | 'asks-for-help';

/** tools.md §3.3 — advisory only; the student's button decides. */
export type SuggestedNext = 'advance' | 'remain' | 'backtrack';

export type BacktrackReason =
  | 'student_said_too_hard'
  | 'repeated_low_score'
  | 'missing_prerequisite';

/** llm-io.md §3 tutor_reply intent, parsed from the optional `<<INTENT:…>>` line. */
export type ReplyIntent =
  | 'too_hard'
  | 'wants_hint'
  | 'wants_variant'
  | 'off_topic'
  | 'needs_clarification'
  /**
   * The student has asked to be taught rather than examined — 「你来讲清楚」,
   * 「不要局限在原文」, 「先别让我答」. Distinct from `needs_clarification`, which asks what
   * the question means: restating the question is the right answer to that and the
   * wrong answer to this. Recorded because answering it with a second restatement is
   * the observed failure, and because it is the signal that the quiz may be dropped.
   */
  | 'wants_explanation'
  | 'wants_next'
  | 'wants_skip'
  | 'answering'
  | 'none';

/**
 * Where a free-text student turn should go. The router role proposes one of
 * these; the harness decides whether it is legal in the current state and owns
 * the transition. The router never writes session state.
 *
 * `answer` is the safe default and the fallback for every failure path: grading a
 * borderline turn costs a score the student can retry with a variant, whereas
 * routing a real answer to `clarify` silently discards work they did.
 *
 * Routing happens at `AWAIT_ANSWER` only, so there is no `advance` route: leaving a
 * step unanswered is `skip`, and it must be recorded as such. `DISCUSSING` needs no
 * classifier at all — free text there is just conversation.
 */
export type StudentRoute =
  | 'answer'
  | 'clarify'
  /** 「你直接讲」 — teach it, do not restate the question a second time. */
  | 'explain'
  | 'hint'
  | 'variant'
  | 'skip'
  | 'quit'
  | 'too_hard'
  | 'off_topic';

export interface StudentTurnRoute {
  route: StudentRoute;
  /** A second reading of the same turn, when it carries one (see `answer` + `clarify`). */
  secondary: ReplyIntent | null;
  /** One line, shown to the student so an unexpected branch is never silent. */
  reason: string;
}

// ---------------------------------------------------------------------------
// Profile stores (data-model.md §2)
// ---------------------------------------------------------------------------

export interface KnowledgePoint {
  id: string; // `kp:<slug>`
  label: string;
  aliases: string[];
  sources: Array<{ page: string; sectionId: string }>;
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MasteryEvidence {
  at: string;
  sessionId: string;
  attemptId: string;
  score: Score | null;
  targetLevel: TargetLevel;
  hintsUsed: number;
  variant: number;
  /** `level' - level`, stored so revertEvidence can undo exactly one grading. */
  delta: number;
  source: EvidenceSource;
  note?: string;
}

export interface MasteryRecord {
  kpId: string;
  level: number; // 0..1
  confidence: number; // 0..1
  attempts: number;
  passes: number;
  lastLevel: TargetLevel | null;
  source: EvidenceSource;
  /** Ring buffer, capped at 20 (data-model.md §2). */
  history: MasteryEvidence[];
  firstSeenAt: string;
  updatedAt: string;
}

/** Decay is applied on read, never on a timer (data-model.md §2). */
export interface EffectiveMastery {
  kpId: string;
  level: number;
  confidence: number;
  ageDays: number;
  source: EvidenceSource;
  attempts: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  basis: string;
  page: string;
  sectionId: string;
  sessionId: string;
  knowledgePointIds: string[];
  accepted: boolean;
  declined: boolean;
  renamed?: boolean;
  awardedAt: string;
}

// ---------------------------------------------------------------------------
// Session record (data-model.md §2 `sessions`)
// ---------------------------------------------------------------------------

export interface ArgumentLink {
  claim: string;
  sourceAnchor: string;
  role: 'premise' | 'derivation' | 'conclusion';
}

export interface FormulaNote {
  latex: string;
  meaning: string;
  sourceAnchor: string;
}

export interface Misreading {
  misreading: string;
  whyTempting: string;
  correction: string;
}

/** tools.md §2 `analyze_section` payload, cached on the session and reused. */
export interface SectionAnalysis {
  coreQuestion: string;
  argumentChain: ArgumentLink[];
  formulas: FormulaNote[];
  conceptsIntroducedHere: string[];
  conceptsAssumedKnown: string[];
  commonMisreadings: Misreading[];
  sectionDifficulty: 'low' | 'medium' | 'high';
  notInSection: string[];
}

export interface ExpectedPoint {
  point: string;
  weight: number;
}

export interface DiscussionTurn {
  role: 'student' | 'tutor';
  text: string;
  at: string;
}

export interface Attempt {
  attemptId: string;
  variant: number;
  genre: QuestionGenre;
  question: string;
  setup: string | null;
  /** Persisted but never rendered (data-model.md §2). */
  rubric: Record<string, string>;
  expectedPoints: ExpectedPoint[];
  hintLadder: string[];
  sourceAnchor: string;
  targetsMisreading: string | null;
  answer: string | null;
  hintsUsed: number;
  score: Score | null;
  evaluation: string | null;
  pointsHit: string[];
  pointsMissed: string[];
  misconceptions: string[];
  answerQuality: AnswerQuality | null;
  at: string;
  discussion: DiscussionTurn[];
  /** Harness digest of what the tutor explained; feeds the repeat guard. */
  discussedPoints: string[];
  /**
   * Question-clarifying exchanges that happened BEFORE the answer, kept separate
   * from `discussion` (which is post-grade). These deliberately do NOT feed
   * `discussedPoints`: explaining what a question is asking is not teaching the
   * point it tests, and counting it as such would let the repetition guard block
   * a variant the student never actually saw answered.
   */
  clarifications: DiscussionTurn[];
  exitChoice: ExitChoice | null;
}

export interface Step {
  id: string;
  title: string;
  goal: string;
  knowledgePointIds: string[];
  targetLevel: TargetLevel;
  questionGenre: QuestionGenre;
  anchors: string[];
  /** True for backtrack steps; excluded from the achievement gate (harness.md §6). */
  inserted: boolean;
  isPrep: boolean;
  attempts: Attempt[];
  passed: boolean;
  chipState: ChipState;
  /**
   * Dialogue belonging to the step rather than to any one attempt — everything said
   * before its first question exists, which is exactly the window a backtrack insert
   * opens (`insert_prerequisite_step` moves the cursor to a step with no attempts).
   *
   * This field exists because the alternative was losing the turns. `discuss()` wrote
   * only to `attempt.clarifications`, guarded by `if (log)`, so on a step with no
   * attempt every student turn AND every tutor reply was silently dropped: absent from
   * the export, and absent from the `history` the next reply is built from, which left
   * the tutor answering from a step description with no question in front of it.
   */
  dialogue: DiscussionTurn[];
}

export interface PrepDecision {
  source: 'profile_rule' | 'model_recommendation' | 'student_override';
  modelRecommended: boolean;
  reason: string;
}

export interface SessionPlan {
  knowledgePointIds: string[];
  prereqs: string[];
  prepRecommendation: { include: boolean; reason: string; focusKpIds: string[] } | null;
  prepIncluded: boolean;
  prepDecision: PrepDecision | null;
  rationale: string;
}

export interface Cursor {
  stepIndex: number;
  variant: number;
  backtrackDepth: number;
}

export interface Usage {
  calls: number;
  promptTokens: number;
  completionTokens: number;
  reasoningTokens: number;
}

/** tools.md §8 audit log entry. */
export interface ToolLogEntry {
  at: string;
  role: RoleName;
  tool: string;
  argsHash: string;
  args?: unknown;
  ok: boolean;
  errors: string[];
  stateBefore: SessionState;
  stateAfter: SessionState;
  durationMs: number;
  usage?: Partial<Usage>;
}

export interface SettingsSnapshot {
  model: string;
  language: string;
  reasoningEffort: string;
  genrePreference: GenrePreference;
  stepRange: [number, number];
}

export interface SessionRecord {
  id: string;
  page: string;
  sectionId: string;
  sectionTitle: string;
  state: SessionState;
  status: SessionStatus;
  settingsSnapshot: SettingsSnapshot;
  analysis: SectionAnalysis | null;
  plan: SessionPlan | null;
  cursor: Cursor;
  toolLog: ToolLogEntry[];
  steps: Step[];
  achievement: {
    id: string;
    name: string;
    description: string;
    basis: string;
    accepted: boolean;
    declined: boolean;
    renamed: boolean;
  } | null;
  summary: {
    text: string;
    strengths: string[];
    gaps: string[];
    nextActions: Array<{ text: string; sectionRef: string | null }>;
  } | null;
  usage: Usage;
  /** True when the section text came from the DOM fallback; relaxes formula coverage. */
  degradedContext: boolean;
  /** True once a role has fallen back to JSON mode (tools.md §7). */
  degradedTools: boolean;
  createdAt: string;
  updatedAt: string;
  endedAt: string | null;
}

// ---------------------------------------------------------------------------
// Section content (data-model.md §5)
// ---------------------------------------------------------------------------

export interface SectionContent {
  page: string;
  sectionId: string;
  heading: string;
  tutorTitle: string | null;
  level: number;
  annotation: string;
  transcript: string | null;
  subHeadings: Array<{ id: string; heading: string; level: number }>;
  formulaCount: number;
  chars: number;
  truncated: boolean;
  /** False when extracted from the DOM rather than a sidecar / source file. */
  fromSource: boolean;
}

// ---------------------------------------------------------------------------
// Profile digest sent to the model (data-model.md §3)
// ---------------------------------------------------------------------------

export interface DigestEntry {
  kpId: string;
  label: string;
  level: number;
  confidence: number;
  ageDays: number;
}

export interface ProfileDigest {
  known: DigestEntry[];
  weak: DigestEntry[];
  unseen: string[];
  recentAchievements: string[];
  overallLevel: 'beginner' | 'intermediate' | 'advanced';
  background?: string;
  backgroundConflicts?: Array<{ kpId: string; claimed: string; measured: number }>;
}

/** tools.md §3.1 — the questioner's substitute for chat history. */
export interface AskedQuestion {
  stepId: string;
  stepTitle: string;
  variant: number;
  targetLevel: TargetLevel;
  genre: QuestionGenre;
  question: string;
  expectedPoints: string[];
  kpIds: string[];
  sourceAnchor: string;
  score: Score | null;
  discussedPoints: string[];
  isCurrentStep: boolean;
}

// ---------------------------------------------------------------------------
// Settings (settings.md §6)
// ---------------------------------------------------------------------------

export interface Settings {
  schemaVersion: number;
  baseUrl: string;
  apiKey: string;
  model: string;
  flavor: 'openai' | 'anthropic';
  language: string;
  bilingualTerms: boolean;
  background: string;
  backgroundAffectsQuestions: boolean;
  reasoning: { effort: 'off' | 'low' | 'medium' | 'high'; byRole: Record<RoleName, string> };
  temperature: { byRole: Record<RoleName, number> };
  roleModels: Partial<Record<RoleName, string>>;
  maxOutputTokens: number;
  maxContextChars: number;
  stream: boolean;
  showReasoning: 'off' | 'collapsed' | 'expanded';
  /**
   * Whether the planner must pass `analyze_section` before `set_steps`.
   *
   * Off by default. The analysis was the dominant startup cost: its verbatim
   * anchor requirements made it the call that got rejected and retried, at
   * 70-129s per attempt, and on dense sections (§13.9) it could not pass at all.
   *
   * The cost of disabling it is real and worth stating: `analysis` is also the
   * questioner's, grader's, and tutor_reply's view of the section — they are
   * never given the full text (harness.md §7). With it off they work from the
   * step's own anchors alone. Step anchors are still verbatim-checked by
   * `set_steps`, so grounding is reduced, not removed.
   */
  requireAnalysis: boolean;
  callBudgetPerSession: number;
  hintCap: number;
  variantCap: number;
  stepRange: [number, number];
  genrePreference: GenrePreference;
  requestTimeoutMs: number;
  plannerTimeoutMs: number;
}

// ---------------------------------------------------------------------------
// Tool results (llm-io.md §1.1: always `{ok, ...}`)
// ---------------------------------------------------------------------------

export type ToolOk<T> = { ok: true } & T;
export type ToolErr = { ok: false; errors: string[] } & Record<string, unknown>;
export type ToolResult<T = Record<string, unknown>> = ToolOk<T> | ToolErr;

export function toolErr(errors: string[], extra: Record<string, unknown> = {}): ToolErr {
  return { ok: false, errors, ...extra };
}
