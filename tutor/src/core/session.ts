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
  #digestCache: ProfileDigest | null = null;
  #previouslyAsked: string[] = [];
  /** Logical calls, not HTTP calls: a repaired call counts once (harness.md §7). */
  #logicalCalls = 0;
  #abort: AbortController | null = null;

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
    const result = await executeTool(role, name, args, this.#toolContext());

    if (result.ok && name === 'analyze_section') this.#analyzePassed = true;

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

  async ask(): Promise<void> {
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');
    if (this.budgetExhausted) {
      this.#emit({ type: 'notice', level: 'warn', text: '已达调用上限，只能结束本节' });
      await this.summarize();
      return;
    }

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
    const step = this.currentStep;
    const attempt = this.#liveAttempt();
    if (!step || !attempt) throw new SessionError('no question awaiting an answer');

    attempt.answer = answer;
    await this.#transition('GRADING');

    this.#countCall();
    const result = await runToolLoop({
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
    this.#addUsage(result.usage);

    if (attempt.score === null) {
      throw new SessionError(result.failure ?? 'grader produced no evaluation');
    }

    this.#liveQuestionId = null;
    this.#emit({
      type: 'evaluation',
      score: attempt.score,
      passed: attempt.score >= PASS_THRESHOLD,
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
    const log = preAnswer ? attempt?.clarifications : attempt?.discussion;
    if (log) log.push({ role: 'student', text: studentText, at: iso });

    // At 100 % of the budget discussion stops, but the choice buttons stay live —
    // a student must never be trapped in a state they cannot leave.
    if (this.budgetExhausted) {
      const text = '本次会话的调用次数已用完。你仍然可以选择继续下一步或结束本节。';
      this.#emit({ type: 'notice', level: 'warn', text });
      return { text, intent: 'none' };
    }

    const history = (log ?? []).map((d) => ({ role: d.role, text: d.text }));
    // Whether the shell already saw this text arrive as deltas. A shell that
    // rendered the stream must not print the whole reply again underneath it.
    let streamed = false;
    this.#countCall();
    const reply = await runProseTurn({
      llm: this.#llm,
      settings: this.#settings,
      model: this.#modelFor('tutor_reply'),
      messages: buildTutorReplyMessages(
        {
          analysis: this.#record.analysis,
          section: this.#section,
          step,
          phase: this.#record.state === 'DISCUSSING' ? 'DISCUSSING' : 'AWAIT_ANSWER',
          history,
          digest: await this.#digest(step.knowledgePointIds),
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
          question: attempt?.question ?? null,
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
    });
    this.#addUsage({
      calls: 1,
      promptTokens: reply.usage.promptTokens ?? 0,
      completionTokens: reply.usage.completionTokens ?? 0,
      reasoningTokens: reply.usage.reasoningTokens ?? 0,
    });

    if (log) log.push({ role: 'tutor', text: reply.text, at: iso });
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
    await this.#store.saveSession(this.#record);
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
      await this.ask();
      return;
    }

    if (choice === 'skip') {
      step.chipState = 'skipped';
      await this.#advance();
      return;
    }

    // 'advance' always advances, even after a fail: the student decides, and the
    // failed step keeps its low mastery (harness.md §5).
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
   * Costs one LLM call. Shells should skip it for input they can already
   * interpret (an explicit menu key, an empty line).
   */
  async routeStudentTurn(studentText: string): Promise<StudentTurnRoute> {
    const state = this.#record.state;
    if (state !== 'AWAIT_ANSWER' && state !== 'DISCUSSING') {
      throw new SessionError(`routeStudentTurn() is not valid in state ${state}`);
    }
    const step = this.currentStep;
    if (!step) throw new SessionError('no current step');

    // Out of budget: fall through to the phase default rather than spending the
    // last call on classification. Grading is never budget-blocked, so at
    // AWAIT_ANSWER the answer still gets through.
    if (this.budgetExhausted) {
      const route: StudentTurnRoute = {
        route: state === 'AWAIT_ANSWER' ? 'answer' : 'clarify',
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
        phase: state,
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

  async #advance(): Promise<void> {
    const next = this.#record.cursor.stepIndex + 1;
    if (next >= this.#record.steps.length) {
      await this.summarize();
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
    await this.ask();
  }

  // -------------------------------------------------------------------------
  // SUMMARIZING -> AWARD_DECISION -> DONE
  // -------------------------------------------------------------------------

  async summarize(): Promise<void> {
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
   * environment-shaped in it, and both shells need all nine branches. Two copies
   * would be two places where routing rules live, and the second one would
   * eventually lag — a route added to the enum but not to the browser's switch
   * would silently fall through to grading.
   *
   * Deliberately does NOT correct an illegal route (`advance` at AWAIT_ANSWER):
   * the guard in `choose()` owns that, so an illegal route throws rather than
   * being quietly rewritten out of sight of the event log.
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
      case 'advance':
        await this.choose('advance');
        return;
      case 'quit':
        await this.choose('quit');
        return;
      case 'clarify':
        await this.discuss(studentText, 'needs_clarification');
        return;
      case 'too_hard':
        await this.discuss(studentText, 'too_hard');
        return;
      case 'off_topic':
        await this.discuss(studentText, 'off_topic');
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
