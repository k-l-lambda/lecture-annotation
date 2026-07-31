/**
 * The harness. Owns the state machine (harness.md §2) and decides every
 * control-flow question with deterministic rules, calling the model only to
 * produce content or a *recommendation*.
 *
 * "The model proposes, the harness decides": prep-step skip, backtracking,
 * advancing and achievement eligibility are computed here from profile data and
 * scores. This is what stops a compliant-sounding model from silently skipping
 * assessment (README.md §5).
 */

import { IdbStore } from './idb-store.ts';
import type { Clock, ContentSource, EventSink, IdGen, Llm, Store } from './ports.ts';
import { noopSink, sequentialIdGen, systemClock } from './ports.ts';
import * as profile from './profile.ts';
import {
  buildGraderUser,
  buildPlannerUser,
  buildProfilerUser,
  buildQuestionerUser,
  buildSummarizerUser,
  buildTutorReplyMessages,
  runProseTurn,
  runRouterTurn,
  runToolLoop,
  systemPrompt,
} from './roles.ts';
import { achievementGateInput, collectAskedQuestions, executeTool, type ToolContext } from './tools.ts';
import { evaluateAchievementGate } from './validate.ts';
import type {
  Achievement,
  DiscussionTurn,
  ExitChoice,
  ProfileDigest,
  ReplyIntent,
  RoleName,
  SectionContent,
  SessionRecord,
  SessionState,
  Settings,
  Step,
  StudentTurnRoute,
  ToolResult,
  Usage,
} from './types.ts';
import { PASS_THRESHOLD, PHASE_LABELS } from './types.ts';

export interface SessionOptions {
  page: string;
  sectionId: string;
  settings: Settings;
  store: Store;
  llm: Llm;
  content: ContentSource;
  clock?: Clock;
  ids?: IdGen;
  sink?: EventSink;
}

export class SessionError extends Error {}

/**
 * Total tries for one profiler branch, retries included. Three because the branch
 * is off the critical path — nobody is waiting — but each try still spends a call
 * from `profilerBudget`, so it cannot loop.
 */
const PROFILER_ATTEMPTS = 3;

/** Why a step was left, which colours what its evidence means. */
type ProfilerDeparture = 'advance' | 'skip' | 'inserted' | 'session_end';

export class TutorSession {
  #record: SessionRecord;
  #section: SectionContent;
  #settings: Settings;
  #store: Store;
  #llm: Llm;
  #clock: Clock;
  #ids: IdGen;
  #sink: EventSink;

  #analyzePassed = false;
  #liveQuestionId: string | null = null;
  /**
   * Set when `insert_prerequisite_step` succeeded during a reply turn, so `discuss()`
   * can ask the new step's question once the reply is delivered.
   *
   * A flag rather than an `ask()` inside the tool handler: tools are synchronous and
   * pure state edits, and asking from inside one would nest an LLM call inside the
   * turn that is still streaming. The insert must also be *told* to the student before
   * the new question appears, which only the caller can sequence.
   */
  #pendingInsertedStep = false;
  #digestCache: ProfileDigest | null = null;
  #previouslyAsked: string[] = [];
  /** Logical calls, not HTTP calls: a repaired call counts once (harness.md §7). */
  #logicalCalls = 0;
  #abort: AbortController | null = null;
  /**
   * The turn currently in flight, if any. Guards against a second turn starting while
   * the first is still awaiting the model.
   *
   * Reported: the 重试 button stayed clickable after a press. The DOM half of that is a
   * stale `messages.js`, but the reason it matters is here — nothing in the harness
   * refused the overlapping turn, and the browser's `guard()` set `ui.busy` only AFTER
   * evaluating `again()`, so the second call was already away. Measured on a double
   * retry: `submitAnswer` ran the grader 4 times and charged 6 calls to the budget for
   * one answer, keeping one of the two scores; `discuss` logged
   * `student, student, tutor, tutor` — the same duplication `retry-notice.test.ts`
   * exists to prevent, reached by a path that test did not cover.
   *
   * Held here rather than only in each shell because both shells and every future
   * entry point need it, and a per-shell flag is a rule that has to be re-implemented
   * correctly each time. `abortInFlight` and `abandon` deliberately do NOT check it:
   * cancelling is what you do to a turn that is running.
   */
  #inFlight: string | null = null;

  /**
   * Calls spent by the profiler branch, against `settings.profilerBudget` and
   * deliberately NOT against `callBudgetPerSession`. A background archive write
   * must never be the reason the student cannot be asked another question.
   */
  #profilerCalls = 0;

  /**
   * Profiler branches still in flight. Tracked, not awaited by the main line —
   * that overlap is the entire point: the write happens while the student is
   * already reading the next question.
   *
   * These deliberately do NOT pass through `#exclusive`. A profiler IS a second
   * turn running concurrently, which is what `#exclusive` exists to refuse. What
   * makes that safe is narrow, and each part is load-bearing:
   *
   *  - it never calls `#transition`, so it cannot move the state machine;
   *  - its only tool is `update_mastery`, which writes to the store, not to
   *    `#record.steps`;
   *  - it names its step via `stepId`, captured at spawn, so a cursor move
   *    mid-flight cannot make it attribute evidence to the wrong step.
   *
   * `flushProfilers()` awaits them, which is how a quit keeps its last write
   * (`ui-spec.md` §6: "profile writes are flushed") and how tests avoid racing a
   * detached promise.
   */
  #profilers = new Set<Promise<void>>();

  private constructor(
    record: SessionRecord,
    section: SectionContent,
    options: SessionOptions,
  ) {
    this.#record = record;
    this.#section = section;
    this.#settings = options.settings;
    this.#store = options.store;
    this.#llm = options.llm;
    this.#clock = options.clock ?? systemClock;
    this.#ids = options.ids ?? sequentialIdGen();
    this.#sink = options.sink ?? noopSink;
  }

  static async create(options: SessionOptions): Promise<TutorSession> {
    const section = await options.content.getSection(options.page, options.sectionId);
    if (!section) {
      throw new SessionError(
        `section '${options.sectionId}' not found on page '${options.page}'`,
      );
    }

    const clock = options.clock ?? systemClock;
    const iso = new Date(clock.now()).toISOString();
    const record: SessionRecord = {
      id: `sess:${iso.replace(/[-:.TZ]/g, '').slice(0, 14)}-${Math.random().toString(36).slice(2, 6)}`,
      page: options.page,
      sectionId: options.sectionId,
      sectionTitle: section.tutorTitle ?? section.heading,
      state: 'PLANNING',
      status: 'active',
      settingsSnapshot: {
        model: options.settings.model,
        language: options.settings.language,
        reasoningEffort: options.settings.reasoning.effort,
        genrePreference: options.settings.genrePreference,
        stepRange: options.settings.stepRange,
      },
      analysis: null,
      plan: null,
      cursor: { stepIndex: 0, variant: 0, backtrackDepth: 0 },
      toolLog: [],
      steps: [],
      achievement: null,
      summary: null,
      usage: { calls: 0, promptTokens: 0, completionTokens: 0, reasoningTokens: 0 },
      degradedContext: !section.fromSource,
      degradedTools: false,
      createdAt: iso,
      updatedAt: iso,
      endedAt: null,
    };

    const session = new TutorSession(record, section, options);
    session.#previouslyAsked = await previouslyAskedFor(options.store, options.page, options.sectionId);
    if (session.#record.degradedContext) {
      session.#emit({
        type: 'notice',
        level: 'warn',
        text: '本页缺少讲义源文本，已改用页面文本（公式可能不完整）',
      });
    }
    return session;
  }

  get record(): SessionRecord {
    return this.#record;
  }

  get state(): SessionState {
    return this.#record.state;
  }

  get section(): SectionContent {
    return this.#section;
  }

  get currentStep(): Step | null {
    return this.#record.steps[this.#record.cursor.stepIndex] ?? null;
  }

  get budgetExhausted(): boolean {
    return this.#logicalCalls >= this.#settings.callBudgetPerSession;
  }

  /**
   * Main-line logical calls only. The profiler's calls are counted separately
   * against `profilerBudget`, so this is deliberately smaller than
   * `record.usage.calls` — the gap between the two IS the background branch.
   */
  get budgetUsed(): number {
    return this.#logicalCalls;
  }

  /** Calls spent by the concurrent profiler branch, out of `profilerBudget`. */
  get profilerCallsUsed(): number {
    return this.#profilerCalls;
  }

  /** Serialised after every transition so a reload resumes at the last stable state. */
  async #transition(next: SessionState): Promise<void> {
    this.#record.state = next;
    this.#record.updatedAt = new Date(this.#clock.now()).toISOString();
    this.#emit({ type: 'phase', state: next, label: PHASE_LABELS[next] });
    this.#emitStepRail();
    await this.#store.saveSession(this.#record);
  }

  #emit(event: Parameters<EventSink>[0]): void {
    this.#sink(event);
  }

  /**
   * Runs a turn that has already moved the machine into a working state, and puts the
   * state back if it throws.
   *
   * `harness.md` §2 says a failed call returns to the previous stable state, and both
   * shells' error handlers say so in their comments — but nothing implemented it. A
   * grader that timed out left `state = 'GRADING'` permanently: the phase label went
   * on reading 评分中 under the error, `discuss()` refused (`not valid in state
   * GRADING`), and the only reason a retry worked at all is that `submitAnswer` never
   * checked the state it was in. So the message told the student to retry, and the
   * session was quietly in a state where half the ways to do that were rejected.
   *
   * Restoring emits a `phase` event, which is what lets a shell re-enable the composer
   * and stop the thinking counter without having to know which call failed.
   */
  async #attempt<T>(from: SessionState, run: () => Promise<T>): Promise<T> {
    try {
      return await run();
    } catch (err) {
      if (this.#record.state !== from) await this.#transition(from);
      throw err;
    }
  }

  /**
   * Refuses a turn while another is in flight. See `#inFlight`.
   *
   * Rejecting is right rather than queueing: the second press is the student asking for
   * the same thing again, not for it twice. Queueing would spend a second call and
   * append a second copy of the same exchange, which is the behaviour being fixed.
   *
   * The error names both turns, because "a turn is already running" alone does not tell
   * you whether you double-pressed 重试 or hit a genuine bug in a shell.
   */
  async #exclusive<T>(name: string, run: () => Promise<T>): Promise<T> {
    // Only the OUTERMOST entry point is wrapped, so this never sees a nested call. The
    // turn methods call each other by design — `choose('remain')` and a backtracking
    // `discuss()` both end in `ask()`, and `applyRoute` delegates to all of them — so
    // the wrapper goes on the public method and the internal callers go to the
    // unguarded `#…Turn` body. Wrapping both ends would deadlock the session against
    // itself, which is worse than the bug being fixed.
    if (this.#inFlight !== null) {
      throw new SessionError(
        `${name}() refused: ${this.#inFlight}() is still in flight. Wait for it to settle or call abortInFlight().`,
      );
    }
    this.#inFlight = name;
    try {
      return await run();
    } finally {
      // `finally`, so a thrown turn does not wedge the session shut — the failure paths
      // are exactly the ones the retry button then has to be able to use.
      this.#inFlight = null;
    }
  }

  /** True while a turn is awaiting the model. Shells use it to disable their composer. */
  get busy(): boolean {
    return this.#inFlight !== null;
  }

  #emitStepRail(): void {
    if (this.#record.steps.length === 0) return;
    this.#emit({
      type: 'steprail',
      chips: this.#record.steps.map((s, i) => ({
        title: s.title,
        state: chipStateFor(
          s,
          i,
          this.#record.cursor.stepIndex,
          this.#record.state === 'DONE' || this.#record.state === 'ABANDONED',
        ),
        inserted: s.inserted,
      })),
    });
  }

  #toolContext(): ToolContext {
    return {
      session: this.#record,
      section: this.#section,
      settings: this.#settings,
      store: this.#store,
      clock: this.#clock,
      ids: this.#ids,
      liveQuestionId: this.#liveQuestionId,
      analyzePassed: this.#analyzePassed,
      invalidateDigest: () => {
        this.#digestCache = null;
      },
    };
  }

  async #execute(role: RoleName, name: string, args: unknown): Promise<ToolResult> {
    const before = this.#record.state;
    const started = this.#clock.now();
    // Captured before the tool runs: `insert_prerequisite_step` splices a step in at
    // the cursor and points the cursor AT IT, so afterwards `currentStep` is the new
    // prerequisite step, not the one being left.
    const stepBefore = this.currentStep;
    const result = await executeTool(role, name, args, this.#toolContext());

    if (result.ok && name === 'analyze_section') this.#analyzePassed = true;

    // `insert_prerequisite_step` moves the cursor to a step that has no question yet.
    // The pending question belongs to the step we just left, so it has to be released
    // here: leaving `#liveQuestionId` set meant the next `submitAnswer` graded the
    // student's words against a question from a different step. In the live 段落-1
    // session that scored a correct answer to the tutor's own question as a 1/5 on the
    // questioner's, with 「你没有列出任何一条完整的公理」 as the feedback.
    if (result.ok && name === 'insert_prerequisite_step') {
      const abandoned = this.#liveAttempt();
      if (abandoned) abandoned.exitChoice = 'remain';
      // Backtracking is a step departure too, so whatever the student did show on
      // the step being left is evidence — and it is the evidence most worth
      // keeping, since it is what the tutor judged insufficient. `#liveAttempt()`
      // is read before the cursor moves for the same reason the choose() sites
      // spawn before `#advance()`.
      //
      // Guarded on `role !== 'profiler'` for form only: the profiler holds one
      // tool. If it ever gained another, a profiler spawning a profiler would be
      // a loop with no ceiling but the budget.
      if (role !== 'profiler' && stepBefore) this.#spawnProfiler(stepBefore, 'inserted');
      this.#liveQuestionId = null;
      this.#pendingInsertedStep = true;
    }

    this.#record.toolLog.push({
      at: new Date(started).toISOString(),
      role,
      tool: name,
      argsHash: hashArgs(args),
      args,
      ok: result.ok,
      errors: result.ok ? [] : result.errors,
      stateBefore: before,
      stateAfter: this.#record.state,
      durationMs: Math.max(0, this.#clock.now() - started),
    });
    this.#emit({ type: 'tool', role, tool: name, ok: result.ok, errors: result.ok ? [] : result.errors });
    return result;
  }

  #addUsage(usage: Usage): void {
    this.#record.usage.calls += usage.calls;
    this.#record.usage.promptTokens += usage.promptTokens;
    this.#record.usage.completionTokens += usage.completionTokens;
    this.#record.usage.reasoningTokens += usage.reasoningTokens;
    this.#emit({
      type: 'usage',
      usage: this.#record.usage,
      budgetUsed: this.#logicalCalls,
      budgetTotal: this.#settings.callBudgetPerSession,
    });
  }

  /** Counts one logical call and warns at 80 % (harness.md §7). */
  #countCall(): void {
    this.#logicalCalls += 1;
    const ratio = this.#logicalCalls / this.#settings.callBudgetPerSession;
    if (ratio >= 0.8 && ratio - 1 / this.#settings.callBudgetPerSession < 0.8) {
      this.#emit({
        type: 'notice',
        level: 'warn',
        text: `已用掉 ${this.#logicalCalls}/${this.#settings.callBudgetPerSession} 次调用${
          this.#record.state === 'DISCUSSING' ? '（讨论轮次较多）' : ''
        }`,
      });
    }
  }

  /**
   * The thinking counter, spread into every role's turn. This is the only
   * progress signal a reasoning model gives before its first output token —
   * planner calls measured 70-129s of silence without it.
   */
  #thinking(role: RoleName) {
    return { onReasoning: (tokens: number) => this.#emit({ type: 'reasoning', role, tokens }) };
  }

  // Prose deltas are wired only at tutor_reply, the one role whose answer *is*
  // prose — a tool-call role's visible content is empty or a stray preamble, and
  // rendering that would put junk on screen. See the onDelta there, which also
  // records whether the shell saw the stream.

  #modelFor(role: RoleName): string {
    return this.#settings.roleModels[role] ?? this.#settings.model;
  }

  async #digest(kpIds: string[]): Promise<ProfileDigest> {
    if (this.#digestCache) return this.#digestCache;
    const kps = await this.#store.getAllKnowledgePoints();
    const records = await this.#store.getMastery(kpIds.length ? kpIds : kps.map((k) => k.id));
    const achievements = await this.#store.listAchievements();
    const digest = profile.digest({
      kpIds: kpIds.length ? kpIds : kps.map((k) => k.id),
      records,
      knowledgePoints: kps,
      recentAchievements: achievements.filter((a) => a.accepted).map((a) => a.name).slice(-5),
      now: this.#clock.now(),
      ...(this.#settings.background && this.#settings.backgroundAffectsQuestions
        ? { background: this.#settings.background }
        : {}),
    });
    this.#digestCache = digest;
    return digest;
  }

  // -------------------------------------------------------------------------
  // PLANNING
  // -------------------------------------------------------------------------

  async plan(): Promise<void> {
    return this.#exclusive('plan', () => this.#planTurn());
  }

  async #planTurn(): Promise<void> {
    if (this.#record.steps.length > 0) throw new SessionError('plan() called twice');
    await this.#transition('PLANNING');

    // The digest is read up front and included in the planner's prompt, so the
    // model does not have to call get_student_profile at all. Labelled distinctly
    // because the model may still call it, and two identical progress lines would
    // read as a duplicated call rather than a prefetch plus a call.
    const digest = await this.#digest([]);
    this.#emit({ type: 'planning-progress', tool: '读取学生档案', done: true });

    this.#countCall();
    const result = await runToolLoop({
      role: 'planner',
      llm: this.#llm,
      settings: this.#settings,
      model: this.#modelFor('planner'),
      systemText: systemPrompt('planner', this.#settings),
      userText: buildPlannerUser({
        section: this.#section,
        digest,
        previouslyAsked: this.#previouslyAsked,
        settings: this.#settings,
      }),
      execute: (name, args) => this.#execute('planner', name, args),
      ...this.#thinking('planner'),
      // Withheld rather than merely unmentioned: a tool in the list is a tool the
      // model will eventually try, and this one is the slow, retry-prone call.
      ...(this.#settings.requireAnalysis ? {} : { excludeTools: ['analyze_section' as const] }),
      ...(this.#abort ? { signal: this.#abort.signal } : {}),
      onTool: (name, r) =>
        this.#emit({
          type: 'planning-progress',
          tool: name,
          done: r.ok,
          ...(r.ok ? {} : { note: r.errors[0] ?? '' }),
        }),
    });
    this.#addUsage(result.usage);

    if (result.failure || this.#record.steps.length === 0) {
      throw new SessionError(result.failure ?? 'planner produced no step ladder');
    }

    const plan = this.#record.plan!;
    this.#emit({
      type: 'plan',
      stepTitles: this.#record.steps.map((s) => s.title),
      prepIncluded: plan.prepIncluded,
      reason: plan.prepDecision?.reason ?? '',
    });

    await this.#transition('PREP_DECISION');
    await this.#transition('STEP_ENTER');
  }

  // -------------------------------------------------------------------------
  // ASKING -> AWAIT_ANSWER
  // -------------------------------------------------------------------------

  /**
   * Asks the current step's question.
   *
   * The body runs under `#attempt` because a questioner that cannot satisfy the
   * validators throws AFTER the move to `ASKING`, and `ASKING` accepts no student
   * input at all. Reported live (`temp/tutor-session-段落-1 (1).json`): a backtrack
   * inserted 舒尔引理回顾, `ask_question` failed its anchor gate three times, and the
   * record ended `state: ASKING, status: active`. Every later turn then answered
   * 「routeStudentTurn() is not valid in state ASKING」 — the retry button was live but
   * could only reproduce the same error, because the state it needed to leave was the
   * one the failure had pinned.
   *
   * `STEP_ENTER` is the state to return to: every internal caller transitions there
   * before calling this, and it is the one state from which a retry of `ask()` is
   * legal. Restoring `AWAIT_ANSWER` instead would invite an answer to a question that
   * was never asked.
   */
  async ask(): Promise<void> {
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');
    if (this.budgetExhausted) {
      this.#emit({ type: 'notice', level: 'warn', text: '已达调用上限，只能结束本节' });
      await this.#summarizeTurn();
      return;
    }

    await this.#exclusive('ask', () => this.#askTurn());
  }

  /** The unguarded body, for the internal callers that are already inside a turn. */
  async #askTurn(): Promise<void> {
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');
    if (this.budgetExhausted) {
      this.#emit({ type: 'notice', level: 'warn', text: '已达调用上限，只能结束本节' });
      await this.#summarizeTurn();
      return;
    }
    await this.#attempt('STEP_ENTER', () => this.#askOnce(step));
  }

  async #askOnce(step: Step): Promise<void> {
    await this.#transition('ASKING');
    const digest = await this.#digest(step.knowledgePointIds);

    this.#countCall();
    const result = await runToolLoop({
      role: 'questioner',
      llm: this.#llm,
      settings: this.#settings,
      model: this.#modelFor('questioner'),
      systemText: systemPrompt('questioner', this.#settings),
      userText: buildQuestionerUser({
        section: this.#section,
        analysis: this.#record.analysis,
        step,
        stepIndex: this.#record.cursor.stepIndex,
        variant: this.#record.cursor.variant,
        askedQuestions: collectAskedQuestions(this.#record),
        previouslyAsked: this.#previouslyAsked,
        digest,
        settings: this.#settings,
      }),
      execute: (name, args) => this.#execute('questioner', name, args),
      ...this.#thinking('questioner'),
      ...(this.#abort ? { signal: this.#abort.signal } : {}),
    });
    this.#addUsage(result.usage);

    const attempt = step.attempts[step.attempts.length - 1];
    if (result.failure || !attempt || attempt.score !== null) {
      throw new SessionError(result.failure ?? 'questioner produced no question');
    }

    this.#liveQuestionId = attempt.attemptId;
    this.#emit({
      type: 'question',
      stepIndex: this.#record.cursor.stepIndex,
      stepTitle: step.title,
      targetLevel: step.targetLevel,
      question: attempt.question,
      setup: attempt.setup,
      variant: attempt.variant,
    });
    await this.#transition('AWAIT_ANSWER');
  }

  /** A hint is a tutor_reply turn that returns to AWAIT_ANSWER, not an advance. */
  async requestHint(): Promise<string> {
    const step = this.currentStep;
    const attempt = this.#liveAttempt();
    if (!step || !attempt) throw new SessionError('no live question');

    if (attempt.hintsUsed >= this.#settings.hintCap) {
      const text = `提示已用完（${this.#settings.hintCap}/${this.#settings.hintCap}）。`;
      this.#emit({ type: 'notice', level: 'info', text });
      return text;
    }

    const canned = attempt.hintLadder[attempt.hintsUsed];
    attempt.hintsUsed += 1;
    const text = canned ?? '再想想这一步依赖的定义本身。';
    this.#emit({ type: 'hint', text, used: attempt.hintsUsed, cap: this.#settings.hintCap });
    await this.#store.saveSession(this.#record);
    return text;
  }

  #liveAttempt() {
    if (!this.#liveQuestionId) return null;
    for (const step of this.#record.steps) {
      const a = step.attempts.find((x) => x.attemptId === this.#liveQuestionId);
      if (a) return a;
    }
    return null;
  }

  // -------------------------------------------------------------------------
  // GRADING -> DISCUSSING
  // -------------------------------------------------------------------------

  async submitAnswer(answer: string): Promise<void> {
    return this.#exclusive('submitAnswer', () => this.#submitAnswerTurn(answer));
  }

  async #submitAnswerTurn(answer: string): Promise<void> {
    const step = this.currentStep;
    const attempt = this.#liveAttempt();
    if (!step || !attempt) throw new SessionError('no question awaiting an answer');
    // The live question must belong to the step the student is looking at. If the
    // cursor moved without releasing it, grading here would score this answer against
    // a question from another step — the failure observed in the 段落-1 session. Refuse
    // instead: a thrown error is visible, a mismatched grade is not.
    if (!step.attempts.some((a) => a.attemptId === attempt.attemptId)) {
      throw new SessionError(
        `live question ${attempt.attemptId} belongs to another step than the cursor's (${step.id})`,
      );
    }

    attempt.answer = answer;
    await this.#transition('GRADING');

    const score = await this.#attempt('AWAIT_ANSWER', async () => {
      this.#countCall();
      const r = await runToolLoop({
        role: 'grader',
        llm: this.#llm,
        settings: this.#settings,
        model: this.#modelFor('grader'),
        systemText: systemPrompt('grader', this.#settings),
        userText: buildGraderUser({
          analysis: this.#record.analysis,
          section: this.#section,
          step,
          questionId: attempt.attemptId,
          question: attempt.question,
          setup: attempt.setup,
          rubric: attempt.rubric,
          expectedPoints: attempt.expectedPoints,
          answer,
          hintsUsed: attempt.hintsUsed,
        }),
        execute: (name, args) => this.#execute('grader', name, args),
        ...this.#thinking('grader'),
        ...(this.#abort ? { signal: this.#abort.signal } : {}),
      });
      this.#addUsage(r.usage);
      if (attempt.score === null) {
        throw new SessionError(r.failure ?? 'grader produced no evaluation');
      }
      return attempt.score;
    });

    this.#liveQuestionId = null;
    this.#emit({
      type: 'evaluation',
      score,
      passed: score >= PASS_THRESHOLD,
      evaluation: attempt.evaluation ?? '',
      pointsHit: attempt.pointsHit,
      pointsMissed: attempt.pointsMissed,
    });

    // Two consecutive scores <= 1 on this step is a backtrack trigger
    // (harness.md §3.2). The insert itself is the model's call via the tool;
    // the harness only surfaces that the condition is met.
    const recent = step.attempts.filter((a) => a.score !== null).slice(-2);
    if (recent.length === 2 && recent.every((a) => (a.score ?? 5) <= 1)) {
      this.#emit({
        type: 'notice',
        level: 'info',
        text: '连续两次得分很低，可能需要回到前置知识',
      });
    }

    await this.#transition('DISCUSSING');
  }

  // -------------------------------------------------------------------------
  // DISCUSSING — a self-loop with no turn cap. Only a student choice leaves it.
  // -------------------------------------------------------------------------

  async discuss(
    studentText: string,
    intentHint: ReplyIntent | null = null,
    routeReason: string | null = null,
  ): Promise<{ text: string; intent: ReplyIntent | null }> {
    return this.#exclusive('discuss', () => this.#discussTurn(studentText, intentHint, routeReason));
  }

  async #discussTurn(
    studentText: string,
    intentHint: ReplyIntent | null = null,
    routeReason: string | null = null,
  ): Promise<{ text: string; intent: ReplyIntent }> {
    if (this.#record.state !== 'DISCUSSING' && this.#record.state !== 'AWAIT_ANSWER') {
      throw new SessionError(`discuss() is not valid in state ${this.#record.state}`);
    }
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');

    const attempt = step.attempts[step.attempts.length - 1];
    const iso = new Date(this.#clock.now()).toISOString();
    // Pre-answer exchanges are logged apart from post-grade discussion: the two
    // are read differently (see `Attempt.clarifications`), and mixing them would
    // feed question-clarifying talk into the repetition guard.
    const preAnswer = this.#record.state === 'AWAIT_ANSWER';
    // Falls back to the step's own log when there is no attempt to hang the turn on,
    // which is the state a backtrack insert leaves the cursor in. Never optional: the
    // previous `attempt?.` chain produced `undefined` there, and the `if (log)` guard
    // that followed made losing the whole exchange look like a no-op.
    const log: DiscussionTurn[] = attempt
      ? preAnswer
        ? attempt.clarifications
        : attempt.discussion
      : step.dialogue;
    const turn: DiscussionTurn = { role: 'student', text: studentText, at: iso };
    log.push(turn);

    // At 100 % of the budget discussion stops, but the choice buttons stay live —
    // a student must never be trapped in a state they cannot leave.
    if (this.budgetExhausted) {
      const text = '本次会话的调用次数已用完。你仍然可以选择继续下一步或结束本节。';
      this.#emit({ type: 'notice', level: 'warn', text });
      await this.#store.saveSession(this.#record);
      return { text, intent: 'none' };
    }

    const history = log.map((d) => ({ role: d.role, text: d.text }));
    /**
     * Un-logs the student's turn when the reply never arrives.
     *
     * It has to go in before the call — it is the last `user` message the model sees —
     * but leaving it there after a failure made the log disagree with what happened:
     * a question with no answer under it, and a retry appended a second copy, so the
     * tutor saw 「为什么？」 twice and the transcript showed the student stuttering. The
     * turn is only real once there is a reply to pair it with.
     */
    const unlog = (): void => {
      const at = log.lastIndexOf(turn);
      if (at >= 0) log.splice(at, 1);
    };
    // Whether the shell already saw this text arrive as deltas. A shell that
    // rendered the stream must not print the whole reply again underneath it.
    let streamed = false;
    const digest = await this.#digest(step.knowledgePointIds);
    this.#countCall();
    const reply = await this.#attempt(this.#record.state, () => runProseTurn({
      llm: this.#llm,
      settings: this.#settings,
      model: this.#modelFor('tutor_reply'),
      messages: buildTutorReplyMessages(
        {
          analysis: this.#record.analysis,
          section: this.#section,
          step,
          phase: this.#record.state === 'DISCUSSING' ? 'DISCUSSING' : 'AWAIT_ANSWER',
          studentText,
          history,
          digest,
          lastEvaluation:
            attempt && attempt.score !== null
              ? {
                  score: attempt.score,
                  evaluation: attempt.evaluation ?? '',
                  pointsMissed: attempt.pointsMissed,
                }
              : null,
          hintsUsed: attempt?.hintsUsed ?? 0,
          settings: this.#settings,
          stepDigest: this.#stepDigest(),
          intentHint,
          routeReason,
          question: attempt?.question ?? null,
          expectedPoints: (attempt?.expectedPoints ?? []).map((p) => p.point),
        },
        this.#settings,
      ),
      // Grants tutor_reply its declared tools (insert_prerequisite_step,
      // update_mastery), which no call path could reach before.
      execute: (name, args) => this.#execute('tutor_reply', name, args),
      onTool: (name, result) =>
        this.#emit({
          type: 'tool',
          role: 'tutor_reply',
          tool: name,
          ok: result.ok,
          errors: result.ok ? [] : result.errors,
        }),
      ...this.#thinking('tutor_reply'),
      onDelta: (text: string) => {
        streamed = true;
        this.#emit({ type: 'delta', role: 'tutor_reply', text });
      },
      ...(this.#abort ? { signal: this.#abort.signal } : {}),
    })).catch((err: unknown) => {
      unlog();
      throw err;
    });
    this.#addUsage({
      calls: 1,
      promptTokens: reply.usage.promptTokens ?? 0,
      completionTokens: reply.usage.completionTokens ?? 0,
      reasoningTokens: reply.usage.reasoningTokens ?? 0,
    });

    log.push({ role: 'tutor', text: reply.text, at: new Date(this.#clock.now()).toISOString() });
    if (attempt && !preAnswer) {
      // The harness digest of what was explained; feeds the repeat guard so a
      // new variant cannot be answerable from this explanation.
      //
      // Pre-answer clarifications are excluded deliberately. Restating what a
      // question asks is not teaching its answer, and folding it in here would let
      // the guard reject the very variant the student still needs to attempt.
      attempt.discussedPoints.push(...summariseExplained(reply.text));
    }
    this.#emit({ type: 'reply', text: reply.text, streaming: streamed });
    // A prose reply cut off at the cap is invisible in the text — it simply stops
    // mid-sentence, and a student cannot tell that from a terse tutor. Unlike the
    // tool-call path, which rejects a truncated payload by bracket balance, there is
    // no structure here to check, so the endpoint's stop reason is the only signal.
    if (reply.truncated) {
      this.#emit({
        type: 'notice',
        level: 'warn',
        text: `回复在 maxOutputTokens (${this.#settings.maxOutputTokens}) 处被截断，上面这段话不完整。可以让我接着说，或在设置里调高这个上限。`,
      });
    }
    await this.#store.saveSession(this.#record);

    // The reply backtracked. It has been delivered, so the new step can now ask its
    // own question — without this the session sat at AWAIT_ANSWER on a question from
    // the step it had just left, and every later turn was measured against it.
    if (this.#pendingInsertedStep) {
      this.#pendingInsertedStep = false;
      await this.#transition('STEP_ENTER');
      await this.#askTurn();
    }
    return { text: reply.text, intent: reply.intent };
  }

  #stepDigest(): string[] {
    return this.#record.steps
      .filter((s) => s.attempts.some((a) => a.score !== null))
      .map((s) => {
        const best = Math.max(...s.attempts.map((a) => a.score ?? 0));
        return `${s.title} ${best >= PASS_THRESHOLD ? '通过' : '未通过'} ${best}/5`;
      });
  }

  // -------------------------------------------------------------------------
  // The student's choice — the exit from DISCUSSING, and a limited exit from
  // AWAIT_ANSWER.
  // -------------------------------------------------------------------------

  /**
   * `skip`, `remain` and `quit` are legal from `AWAIT_ANSWER` too: a student who
   * has read the question and wants a different one, or none, should not have to
   * submit a throwaway answer first.
   *
   * `advance` stays DISCUSSING-only. From `AWAIT_ANSWER` it would leave the step
   * with zero attempts and no `skipped` mark — indistinguishable from a step that
   * was completed, which corrupts the achievement gate's denominator. Wanting to
   * move on without answering IS `skip`, and is recorded as such.
   */
  async choose(choice: ExitChoice): Promise<void> {
    return this.#exclusive('choose', () => this.#chooseTurn(choice));
  }

  async #chooseTurn(choice: ExitChoice): Promise<void> {
    const state = this.#record.state;
    const legal =
      state === 'DISCUSSING' ||
      (state === 'AWAIT_ANSWER' && (choice === 'skip' || choice === 'remain' || choice === 'quit'));
    if (!legal) {
      throw new SessionError(`choose('${choice}') is not valid in state ${state}`);
    }
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');

    const attempt = step.attempts[step.attempts.length - 1];
    if (attempt) attempt.exitChoice = choice;

    if (choice === 'quit') {
      await this.abandon();
      return;
    }

    if (choice === 'remain') {
      if (this.#record.cursor.variant + 1 >= this.#settings.variantCap) {
        this.#emit({
          type: 'notice',
          level: 'info',
          text: `本步已达 ${this.#settings.variantCap} 个变体上限，可以选择跳过并记为未掌握`,
        });
      }
      this.#record.cursor.variant += 1;
      await this.#transition('STEP_ENTER');
      await this.#askTurn();
      return;
    }

    // Spawned BEFORE `#advance()`, while `step` is still the step being left and
    // the cursor has not moved. `#advance()` immediately starts the next question,
    // so the profiler's call overlaps that latency instead of adding to it.
    if (choice === 'skip') {
      step.chipState = 'skipped';
      this.#spawnProfiler(step, 'skip');
      await this.#advance();
      return;
    }

    // 'advance' always advances, even after a fail: the student decides, and the
    // failed step keeps its low mastery (harness.md §5).
    this.#spawnProfiler(step, 'advance');
    await this.#advance();
  }

  // -------------------------------------------------------------------------
  // Routing a free-text student turn
  // -------------------------------------------------------------------------

  /**
   * Asks the router what the student's text is for. Classification only — the
   * caller acts on the returned route, and every action it can take is an
   * existing method that validates independently. The router cannot move the
   * machine, so a misclassification is a wasted turn, never a corrupt state.
   *
   * `AWAIT_ANSWER` only, and that boundary is the point. There, one question is
   * genuinely hard and worth a call: is this text an answer to be graded, or a
   * question about the question? Guess wrong and the student is either scored on a
   * request for help or has real work silently discarded.
   *
   * At `DISCUSSING` there is no such question. The step is already graded, the
   * `rules` the reply role gets are derived from the phase rather than the intent,
   * and every state move out of the phase has an explicit control — `n/r/s/q` in the
   * shell, buttons in the browser. All a router could add there is *guessing*
   * `advance`/`skip` out of prose, where a misread moves the step the student was
   * still asking about. So free text at `DISCUSSING` goes straight to `discuss()`:
   * one call, no classifier between the two of them.
   *
   * Costs one LLM call. Shells should skip it for input they can already
   * interpret (an explicit menu key, an empty line).
   */
  async routeStudentTurn(studentText: string): Promise<StudentTurnRoute> {
    return this.#exclusive('routeStudentTurn', () => this.#routeStudentTurnTurn(studentText));
  }

  async #routeStudentTurnTurn(studentText: string): Promise<StudentTurnRoute> {
    const state = this.#record.state;
    if (state !== 'AWAIT_ANSWER') {
      throw new SessionError(`routeStudentTurn() is not valid in state ${state}`);
    }
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');

    // Out of budget: grade rather than spend the last call on classification.
    // Grading is never budget-blocked, so the answer still gets through.
    if (this.budgetExhausted) {
      const route: StudentTurnRoute = {
        route: 'answer',
        secondary: null,
        reason: '调用次数已用完',
      };
      this.#emit({ type: 'route', route: route.route, reason: route.reason, secondary: null });
      return route;
    }

    const attempt = this.#liveAttempt() ?? step.attempts[step.attempts.length - 1];
    this.#countCall();
    const { route, usage } = await runRouterTurn({
      llm: this.#llm,
      settings: this.#settings,
      model: this.#modelFor('router'),
      input: {
        step: { title: step.title, goal: step.goal },
        question: attempt?.question ?? null,
        setup: attempt?.setup ?? null,
        studentText,
        hintsRemaining: Math.max(0, this.#settings.hintCap - (attempt?.hintsUsed ?? 0)),
        variantsRemaining: Math.max(
          0,
          this.#settings.variantCap - this.#record.cursor.variant - 1,
        ),
      },
      ...(this.#abort ? { signal: this.#abort.signal } : {}),
    });
    this.#addUsage({
      calls: 1,
      promptTokens: usage.promptTokens ?? 0,
      completionTokens: usage.completionTokens ?? 0,
      reasoningTokens: usage.reasoningTokens ?? 0,
    });

    this.#emit({
      type: 'route',
      route: route.route,
      reason: route.reason,
      secondary: route.secondary,
    });
    return route;
  }

  // -------------------------------------------------------------------------
  // The profiler branch
  // -------------------------------------------------------------------------

  /**
   * Starts a profiler branch for a step the student has just left, and returns
   * immediately. Nothing awaits the returned work except `flushProfilers()`.
   *
   * Skips silently in two cases, both of which are correct rather than degraded:
   * a step with no attempts has produced no evidence to weigh (a skipped step must
   * not become a mastery write), and an exhausted `profilerBudget` means the
   * archive goes stale rather than the session stalling.
   */
  #spawnProfiler(step: Step, departure: ProfilerDeparture): void {
    // A graded attempt, not merely an attempt: `ask()` creates the attempt record
    // when the question is posed, so `attempts.length > 0` is true the moment a
    // question exists and says nothing about whether the student answered it.
    // Skipping an unanswered question would otherwise file evidence built from an
    // attempt whose score is null — inventing a measurement for work never done,
    // and quietly moving the mastery that the achievement gate reads.
    const graded = step.attempts.some((a) => a.score !== null);
    if (!graded) return;
    // A step with no knowledge points has nothing the profiler could write about,
    // and `update_mastery` requires non-empty evidence — so without this guard the
    // branch is guaranteed to fail its full retry count and spend three budget
    // calls saying `evidence is empty`. Measured on the fake's prep step, which is
    // answered but carries no kpIds; real prep steps can be the same.
    if (step.knowledgePointIds.length === 0) return;
    if (this.#profilerCalls >= this.#settings.profilerBudget) return;

    const task = this.#runProfiler(step, departure)
      // A detached promise must never surface as an unhandled rejection: this
      // branch is invisible to the student by design, so it cannot be allowed to
      // take down the shell that is mid-question.
      .catch(() => {})
      .finally(() => {
        this.#profilers.delete(task);
      });
    this.#profilers.add(task);
  }

  /**
   * Retries up to `PROFILER_ATTEMPTS` and then gives up quietly — the indicator
   * carries the failure, no `notice` enters the dialogue. A missing archive write
   * changes nothing about the step in front of the student, so interrupting them
   * with it would cost more than it tells them.
   */
  async #runProfiler(step: Step, departure: ProfilerDeparture): Promise<void> {
    const kps = await this.#store.getKnowledgePoints(step.knowledgePointIds);
    const labels = new Map(kps.map((k) => [k.id, k.label]));

    let lastError = '';
    for (let attempt = 1; attempt <= PROFILER_ATTEMPTS; attempt += 1) {
      if (this.#profilerCalls >= this.#settings.profilerBudget) {
        lastError = lastError || 'profiler budget exhausted';
        break;
      }
      this.#profilerCalls += 1;
      this.#emit({
        type: 'profile-update',
        phase: 'running',
        stepTitle: step.title,
        updated: [],
        attempt,
        reason: null,
      });

      try {
        const result = await runToolLoop({
          role: 'profiler',
          llm: this.#llm,
          settings: this.#settings,
          model: this.#modelFor('profiler'),
          systemText: systemPrompt('profiler', this.#settings),
          userText: buildProfilerUser({
            step,
            knowledgePoints: step.knowledgePointIds.map((kpId) => ({
              kpId,
              label: labels.get(kpId) ?? kpId,
            })),
            departure,
          }),
          execute: (name, args) => this.#execute('profiler', name, args),
          // No `signal`: `abandon()` aborts the main line, and the last write is
          // exactly what a quit must not lose (`flushProfilers` runs in `#finish`).
        });
        this.#addUsage(result.usage);

        if (result.failure) {
          lastError = result.failure;
          continue;
        }

        const updated = await this.#masteryFor(step.knowledgePointIds);
        this.#emit({
          type: 'profile-update',
          phase: 'done',
          stepTitle: step.title,
          updated,
          attempt,
          reason: null,
        });
        return;
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
      }
    }

    this.#emit({
      type: 'profile-update',
      phase: 'failed',
      stepTitle: step.title,
      updated: [],
      attempt: PROFILER_ATTEMPTS,
      reason: lastError || 'profiler failed',
    });
  }

  /** Effective mastery for the indicator, read back after the write landed. */
  async #masteryFor(
    kpIds: string[],
  ): Promise<Array<{ kpId: string; level: number; confidence: number }>> {
    const records = await this.#store.getMastery(kpIds);
    const now = this.#clock.now();
    return records.map((r) => {
      const eff = profile.effective(r, now);
      return {
        kpId: r.kpId,
        level: Math.round(eff.level * 100) / 100,
        confidence: Math.round(eff.confidence * 100) / 100,
      };
    });
  }

  /**
   * Awaits every in-flight profiler branch. Called by `#finish` so quitting keeps
   * the last archive write, and by tests so an assertion is not racing a detached
   * promise.
   */
  async flushProfilers(): Promise<void> {
    while (this.#profilers.size > 0) {
      await Promise.allSettled([...this.#profilers]);
    }
  }

  async #advance(): Promise<void> {
    const next = this.#record.cursor.stepIndex + 1;
    if (next >= this.#record.steps.length) {
      // The last step's own departure was already spawned by the caller; this path
      // only ends the session. `#finish` flushes whatever is still in flight.
      await this.#summarizeTurn();
      return;
    }
    this.#record.cursor = {
      stepIndex: next,
      variant: 0,
      // Leaving an inserted step returns toward the original ladder.
      backtrackDepth: this.#record.steps[next]?.inserted
        ? this.#record.cursor.backtrackDepth
        : Math.max(0, this.#record.cursor.backtrackDepth - 1),
    };
    await this.#transition('STEP_ENTER');
    await this.#askTurn();
  }

  // -------------------------------------------------------------------------
  // SUMMARIZING -> AWARD_DECISION -> DONE
  // -------------------------------------------------------------------------

  async summarize(): Promise<void> {
    return this.#exclusive('summarize', () => this.#summarizeTurn());
  }

  async #summarizeTurn(): Promise<void> {
    await this.#transition('SUMMARIZING');

    const gate = evaluateAchievementGate(achievementGateInput(this.#record));
    const digest = await this.#digest(this.#record.plan?.knowledgePointIds ?? []);

    // finish_session is always permitted, even past the budget, so a session can
    // always close cleanly (tools.md §4).
    this.#countCall();
    const result = await runToolLoop({
      role: 'summarizer',
      llm: this.#llm,
      settings: this.#settings,
      model: this.#modelFor('summarizer'),
      systemText: systemPrompt('summarizer', this.#settings),
      userText: buildSummarizerUser({
        section: this.#section,
        steps: this.#record.steps,
        gateEligible: gate.eligible,
        gateReasons: gate.reasons,
        digest,
      }),
      execute: (name, args) => this.#execute('summarizer', name, args),
      ...this.#thinking('summarizer'),
      ...(this.#abort ? { signal: this.#abort.signal } : {}),
    });
    this.#addUsage(result.usage);

    if (this.#record.summary) {
      this.#emit({
        type: 'summary',
        text: this.#record.summary.text,
        strengths: this.#record.summary.strengths,
        gaps: this.#record.summary.gaps,
        nextActions: this.#record.summary.nextActions,
      });
    }

    if (this.#record.achievement) {
      this.#emit({
        type: 'achievement',
        name: this.#record.achievement.name,
        description: this.#record.achievement.description,
        basis: this.#record.achievement.basis,
        renamed: this.#record.achievement.renamed,
      });
      await this.#transition('AWARD_DECISION');
      return;
    }

    await this.#finish('completed');
  }

  /** Declining is recorded so the identical achievement is not re-offered. */
  async decideAchievement(accept: boolean): Promise<void> {
    if (this.#record.state !== 'AWARD_DECISION') {
      throw new SessionError(`decideAchievement() is not valid in state ${this.#record.state}`);
    }
    const proposed = this.#record.achievement;
    if (proposed) {
      proposed.accepted = accept;
      proposed.declined = !accept;
      const achievement: Achievement = {
        id: proposed.id,
        name: proposed.name,
        description: proposed.description,
        basis: proposed.basis,
        page: this.#record.page,
        sectionId: this.#record.sectionId,
        sessionId: this.#record.id,
        knowledgePointIds: this.#record.plan?.knowledgePointIds ?? [],
        accepted: accept,
        declined: !accept,
        awardedAt: new Date(this.#clock.now()).toISOString(),
      };
      await this.#store.putAchievement(achievement);
    }
    await this.#finish('completed');
  }

  async #finish(status: 'completed' | 'abandoned'): Promise<void> {
    // The step the student is standing on when the session ends never had a
    // departure, so it never got a branch. Quitting mid-step is the common way to
    // leave, and the work done on that step is real evidence.
    const last = this.currentStep;
    if (last) this.#spawnProfiler(last, 'session_end');
    // `ui-spec.md` §6: "profile writes are flushed" on quit. Awaited here and
    // nowhere else on the main line, because this is the one moment where nobody
    // is waiting on a next question.
    await this.flushProfilers();

    this.#record.status = status;
    this.#record.endedAt = new Date(this.#clock.now()).toISOString();
    // Trim discussion to the last 20 turns; discussedPoints is kept in full
    // because that is the part the harness reuses (data-model.md §6).
    for (const step of this.#record.steps) {
      for (const attempt of step.attempts) {
        if (attempt.discussion.length > 20) {
          attempt.discussion = attempt.discussion.slice(-20);
        }
      }
    }
    await this.#transition(status === 'completed' ? 'DONE' : 'ABANDONED');
  }

  /** Quit with the second confirmation already given by the UI (ui-spec.md §6). */
  async abandon(): Promise<void> {
    this.#abort?.abort();
    await this.#finish('abandoned');
  }

  /** Aborts an in-flight call; state returns to the previous stable one. */
  abortInFlight(): void {
    this.#abort?.abort();
    this.#abort = new AbortController();
  }

  /**
   * Sends a routed free-text turn to the method that route means.
   *
   * Here rather than in each shell because it is a pure mapping with nothing
   * environment-shaped in it, and both shells need every branch. Two copies would
   * be two places where routing rules live, and the second one would eventually
   * lag — a route added to the enum but not to the browser's switch would silently
   * fall through to grading.
   *
   * `advance` is absent by construction: routing is `AWAIT_ANSWER`-only now, and
   * advancing from there is illegal (see `choose`). At `DISCUSSING` a shell calls
   * `discuss()` directly.
   */
  async applyRoute(route: StudentTurnRoute, studentText: string): Promise<void> {
    switch (route.route) {
      case 'answer':
        await this.submitAnswer(studentText);
        return;
      case 'hint':
        await this.requestHint();
        return;
      case 'variant':
        await this.choose('remain');
        return;
      case 'skip':
        await this.choose('skip');
        return;
      case 'quit':
        await this.choose('quit');
        return;
      case 'clarify':
        await this.discuss(studentText, 'needs_clarification', route.reason);
        return;
      // A student who says 「你直接讲」/「不要重述题目」 is asking to be taught, not to
      // have the question paraphrased again. `wants_explanation` selects the one
      // `rules` branch that permits answering outright — unreachable before, which
      // is why asking twice got the restatement twice.
      case 'explain':
        await this.discuss(studentText, 'wants_explanation', route.reason);
        return;
      case 'too_hard':
        await this.discuss(studentText, 'too_hard', route.reason);
        return;
      case 'off_topic':
        await this.discuss(studentText, 'off_topic', route.reason);
        return;
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function chipStateFor(step: Step, index: number, cursor: number, ended: boolean): string {
  if (step.chipState === 'skipped') return 'skipped';
  // Once the session is over there is no current step: the cursor still points at
  // the last one, and leaving it as 'current' would report a finished session as
  // though it were mid-step.
  if (index === cursor && !ended) return 'current';
  if (step.inserted) return 'inserted';
  if (step.passed) return 'passed';
  if (step.attempts.some((a) => a.score !== null)) return 'failed';
  return 'pending';
}

function hashArgs(args: unknown): string {
  // A cheap stable digest — enough to spot a repeated identical call in the log
  // without pulling in a crypto dependency the browser bundle would carry.
  const text = JSON.stringify(args ?? {});
  let h = 5381;
  for (let i = 0; i < text.length; i += 1) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return `djb2:${(h >>> 0).toString(16)}`;
}

/**
 * Sentences the tutor asserted during discussion, used as `discussedPoints`.
 * Crude on purpose: it feeds a Jaccard overlap check, not a semantic model.
 */
function summariseExplained(text: string): string[] {
  return text
    .split(/[。！？\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 8 && !s.endsWith('？') && !s.includes('?'))
    .slice(0, 4);
}

async function previouslyAskedFor(store: Store, page: string, sectionId: string): Promise<string[]> {
  const sessions = await store.findSessions({ page, sectionId, status: 'completed', limit: 2 });
  return sessions
    .flatMap((s) => s.steps.flatMap((step) => step.attempts.map((a) => a.question)))
    .filter(Boolean);
}

export { IdbStore };
