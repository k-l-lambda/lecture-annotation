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

export type RoleName = 'planner' | 'questioner' | 'grader' | 'tutor_reply' | 'summarizer';

export const ROLE_NAMES: readonly RoleName[] = [
  'planner',
  'questioner',
  'grader',
  'tutor_reply',
  'summarizer',
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
export type ReplyIntent = 'too_hard' | 'wants_hint' | 'wants_variant' | 'off_topic' | 'none';

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
