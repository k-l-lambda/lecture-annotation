/**
 * Pure validators. These are the quality gates the design insists on enforcing
 * mechanically rather than requesting in a prompt (tools.md §2-§3, harness.md §4).
 *
 * Every function returns error strings written *for the model to act on* —
 * "sourceAnchor not found: '熵是无序的度量'", not "validation failed" — because
 * the whole point of in-band rejection is that the repair is informed
 * (llm-io.md §1.1).
 */

import type {
  AskedQuestion,
  ExpectedPoint,
  GenrePreference,
  QuestionGenre,
  SectionAnalysis,
  TargetLevel,
} from './types.ts';
import { QUESTION_GENRES } from './types.ts';

// ---------------------------------------------------------------------------
// Text normalisation
// ---------------------------------------------------------------------------

/**
 * Anchors are compared after folding whitespace, typographic variants of the same
 * character, and equivalent notations for the same symbol. Word content is left
 * intact: the check exists to catch invented content, so it must not be so
 * lenient that a paraphrase passes.
 *
 * Both foldings come from live runs against §27.3, and both were the difference
 * between a working gate and an unpassable one:
 *
 * - **Quotes.** The planner quoted `熵是一种对系统「混乱程度」的量度` — verbatim
 *   except that it rendered the source's `“”` as `「」`.
 * - **Math notation.** It then quoted `其思想是，𝒫 中表示…` where the source has
 *   `$\mathcal{P}$`. The corpus writes `\mathcal{}` with 23 different letters, so
 *   a model that renders LaTeX to Unicode math — which is a reasonable thing to
 *   do when quoting prose — could never anchor to any of those sentences.
 *
 * Substituting an equivalent glyph for the same symbol is not the failure mode
 * this gate exists to catch; inventing a sentence is. §27.3 also produced a real
 * fabrication (`对 $\mathcal{P}$ 中某点 $x$ 所代表的系统态` for the source's
 * `体积 $V$ 的盒子 $\mathcal{V}$ 中态 $x$ 的熵为…`), and that must still fail.
 */
export function normalizeForAnchor(s: string): string {
  return (
    foldMathNotation(s)
      // Quotation marks fold to ONE character, single and double alike. Keeping
      // the two families distinct made `“实数”` (source) and `'实数'` (what the
      // model emitted for it) unmatchable forever: the corpus uses curly doubles
      // for scare quotes and models freely substitute singles, 「」, or ASCII.
      // Which glyph encloses a phrase carries no meaning a verbatim check should
      // police — the words inside do.
      //
      // Known cost: this also folds prime notation, so the section's `a'` and a
      // model's `a"` compare equal (chapter 8 uses `a' b' c'`, and 28 double
      // primes exist corpus-wide). That was weighed against exempting a mark
      // after a letter — which cannot work, because it makes folding asymmetric:
      // in `'dx'` the opener would fold and the closer after `x` would not, so a
      // model's `'dx'` still could not match the source's `“dx”`. An asymmetric
      // rule recreates the bug it was meant to avoid. A model mistyping a prime
      // as a double quote is both unlikely and, now that rejections name the
      // divergence point, immediately visible if it happens.
      .replace(/['‘’"“”「」『』｢｣′″]/g, '"')
      .replace(/[—–−]/g, '-')
      .replace(/\s+/g, '')
      .trim()
  );
}

/** LaTeX commands that have one conventional Unicode glyph a model may use instead. */
const MATH_GLYPH: Record<string, string> = {
  times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓',
  le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠',
  approx: '≈', equiv: '≡', infty: '∞', to: '→', rightarrow: '→',
  Delta: 'Δ', delta: 'δ', partial: '∂', sum: '∑', prod: '∏', int: '∫',
  // Ellipses: longer names must precede their prefixes in the alternation below,
  // or `\cdots` matches `cdot` and leaves a stray `s`.
  cdots: '⋯', ldots: '…', dots: '…', vdots: '⋮', ddots: '⋱',
};

/** Ordered longest-first so `cdots` is tried before `cdot`. */
const MATH_GLYPH_RE = new RegExp(
  `\\\\(${Object.keys(MATH_GLYPH).sort((a, b) => b.length - a.length).join('|')})(?![a-zA-Z])`,
  'g',
);

/**
 * Collapses the ways the same symbol can be written: `$\mathcal{P}$`, `\mathcal{P}`
 * and `𝒫` all become `P`; `\times` and `×` both become `×`. Applied to both the
 * anchor and the section, so the comparison is notation-blind but still
 * content-sensitive.
 */
function foldMathNotation(s: string): string {
  return (
    s
      // Unicode math alphanumerics (script/fraktur/double-struck/bold/italic) back
      // to their ASCII base letter, via NFKD which decomposes exactly these.
      .normalize('NFKD')
      // `\mathcal{P}` / `\mathbb{R}` / `\text{JK}` -> their argument
      .replace(/\\(?:math(?:cal|bb|bf|rm|it|sf|tt|frak)|text(?:rm|bf|it)?|bm)\s*\{([^{}]*)\}/g, '$1')
      // Operators with a standard Unicode glyph, folded to that glyph so the
      // source's `1.38 \times 10^{-23}` matches a model's `1.38 × 10^{-23}`.
      .replace(MATH_GLYPH_RE, (_, name: string) => MATH_GLYPH[name] ?? name)
      // Any other bare command keeps its name but loses the backslash, so the
      // source's `$S = k \log V$` and a model's `S = k log V` agree. Dropping the
      // name instead would let `\log` and `\exp` compare equal.
      .replace(/\\([a-zA-Z]+)/g, '$1')
      // Sub/superscript markup, which a model quoting prose drops because that is
      // how the rendered formula reads: the source's `a_0 + a_1z + a_2z^2` and a
      // model's `a0 + a1z + a2z2` are the same formula. The operands survive, so
      // `a_0` and `a_1` still differ — only the `_`/`^` marks go.
      .replace(/[_^](?=\{?[0-9A-Za-z+\-,])/g, '')
      // Braces exist only to group sub/superscripts once the marks are gone.
      .replace(/[{}]/g, '')
      // Remaining `$` delimiters carry no content
      .replace(/\$+/g, '')
  );
}

/**
 * For overlap comparison (tools.md §3.1): strip punctuation, fold whitespace,
 * drop LaTeX delimiters. Deliberately crude — it catches "same question
 * reworded", which is the failure mode, and does not attempt semantic
 * equivalence.
 */
export function normalizeForOverlap(s: string): string {
  return s
    .replace(/\$\$?/g, ' ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}()[\]]/g, ' ')
    .replace(/[，。、；：？！“”‘’（）《》—…,.;:?!"'`~/\\|@#%^&*+=<>_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Token split that works for CJK and Latin at once: Latin runs stay whole words,
 * each CJK codepoint is its own token. A pure `split(/\s+/)` would make every
 * Chinese sentence a single token and the Jaccard similarity meaningless.
 */
export function tokenize(s: string): Set<string> {
  const normalized = normalizeForOverlap(s);
  const tokens: string[] = [];
  const latin = /[a-z0-9]+/g;
  let match: RegExpExecArray | null;
  let lastEnd = 0;
  while ((match = latin.exec(normalized)) !== null) {
    for (const ch of normalized.slice(lastEnd, match.index)) {
      if (ch.trim()) tokens.push(ch);
    }
    tokens.push(match[0]);
    lastEnd = match.index + match[0].length;
  }
  for (const ch of normalized.slice(lastEnd)) {
    if (ch.trim()) tokens.push(ch);
  }
  return new Set(tokens);
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared += 1;
  return shared / (a.size + b.size - shared);
}

/**
 * Fraction of `a`'s tokens present in `b`. Asymmetric on purpose: for "is this
 * text contained in that sentence" Jaccard is the wrong measure, because it
 * penalises the container for being longer, and source sentences are long.
 */
export function containment(a: Set<string>, b: Set<string>): number {
  if (a.size === 0) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared += 1;
  return shared / a.size;
}

/** A point counts as matched at Jaccard >= 0.7 (tools.md §3.1). */
export const POINT_MATCH_THRESHOLD = 0.7;
/** More than 60 % of expected points overlapping is a duplicate question. */
export const OVERLAP_REJECT_RATIO = 0.6;

export function pointsMatch(a: string, b: string): boolean {
  return jaccard(tokenize(a), tokenize(b)) >= POINT_MATCH_THRESHOLD;
}

/** Fraction of `candidate` points that match something in `prior`. */
export function overlapRatio(candidate: string[], prior: string[]): number {
  if (candidate.length === 0) return 0;
  let matched = 0;
  for (const c of candidate) {
    if (prior.some((p) => pointsMatch(c, p))) matched += 1;
  }
  return matched / candidate.length;
}

// ---------------------------------------------------------------------------
// Anchors
// ---------------------------------------------------------------------------

/**
 * Page furniture left in the corpus by the scan/OCR pipeline: page-break comments,
 * horizontal rules, running titles, centred folios, bare page numbers and
 * translator footnote markers.
 *
 * This has to be removed before an anchor comparison because the debris lands
 * *inside* sentences — ~800 sentences across 43 of the 50 files are interrupted
 * this way. §4.2 has a sentence split as:
 *
 *   尽管这个方程看上去与复数无关——方程有实系数，解也是实的
 *   [76] [---] [〔1〕 Tartaglia…——译注] [·51·] [<!-- page 71 -->] [通向实在之路]
 *   （在“不可约情形”下）——但我们需要到复数领地里走一遭…
 *
 * A model quotes that the way a reader sees it, continuously. Rejecting the quote
 * because a page number sits in the middle tests the scan pipeline, not the model.
 */
const PAGE_FURNITURE = new RegExp(
  [
    String.raw`<!--[^>]*-->`, // <!-- page 71 -->
    String.raw`^\s*-{3,}\s*$`, // --- rule
    String.raw`^\s*通向实在之路\s*$`, // running title
    String.raw`^\s*第[一二三四五六七八九十百零〇\d]+章[^\n]{0,40}$`, // running chapter head
    String.raw`^\s*·\s*\d{1,4}\s*·\s*$`, // ·51· folio
    String.raw`^\s*\d{1,4}\s*$`, // bare page number
    String.raw`^\s*〔\d+〕[^\n]*$`, // 〔1〕 translator footnote
  ].join('|'),
  'gm',
);

/** Strips page furniture, leaving the prose that a reader actually sees. */
export function stripPageFurniture(text: string): string {
  return text.replace(PAGE_FURNITURE, '\n');
}

export function anchorAppears(anchor: string, sectionText: string): boolean {
  const needle = normalizeForAnchor(anchor);
  if (needle.length === 0) return false;
  return normalizeForAnchor(stripPageFurniture(sectionText)).includes(needle);
}

/**
 * The longest normalized prefix of `anchor` that still occurs in the section,
 * and the character that broke the match.
 *
 * A 30-character head of the anchor tells neither the model nor a human *where*
 * a long quote stopped matching, and a quote can be right for 200 characters and
 * wrong in its last clause. Binary search over prefixes is O(log n) `includes`
 * calls, so naming the divergence point costs nothing worth saving.
 */
export function anchorDivergence(
  anchor: string,
  sectionText: string,
): { matched: string; rest: string } {
  const needle = normalizeForAnchor(anchor);
  const hay = normalizeForAnchor(stripPageFurniture(sectionText));
  let lo = 0;
  let hi = needle.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (hay.includes(needle.slice(0, mid))) lo = mid;
    else hi = mid - 1;
  }
  return { matched: needle.slice(0, lo), rest: needle.slice(lo) };
}

/** Names the offending anchor, so the model can fix that one rather than guess. */
export function checkAnchors(
  anchors: Array<{ value: string; field: string }>,
  sectionText: string,
): string[] {
  const errors: string[] = [];
  for (const { value, field } of anchors) {
    if (!anchorAppears(value, sectionText)) {
      const { matched, rest } = anchorDivergence(value, sectionText);
      const shown = value.length > 30 ? `${value.slice(0, 30)}…` : value;
      // Name the anchor first (so the model knows *which* quote to fix), then the
      // divergence point (so it knows where its memory drifted). The head alone is
      // useless for a quote that is right for 200 characters and wrong in its last
      // clause — which is the common failure, not wholesale fabrication.
      const tail = rest.length > 24 ? `${rest.slice(0, 24)}…` : rest;
      const detail =
        matched.length >= 8
          ? `it matches for its first ${matched.length} characters ` +
            `(…${matched.slice(-16)}) and then diverges at '${tail}'`
          : `it does not match the section at all, from '${tail}' onward`;
      errors.push(
        `${field} not found verbatim in the section: '${shown}' — ${detail}. ` +
          'Re-read the section and quote one unbroken sentence exactly as written.',
      );
    }
  }
  return errors;
}

// ---------------------------------------------------------------------------
// analyze_section (tools.md §2)
// ---------------------------------------------------------------------------

export const MIN_ARGUMENT_CHAIN = 3;
export const FORMULA_COVERAGE_MIN = 0.6;

/**
 * Counts display-math blocks the way prepare_docs.py leaves them: `$$…$$` in the
 * source, `\[…\]` after preprocessing. Both forms are counted so the gate works
 * on raw source and on preprocessed text alike.
 */
export function countDisplayFormulas(sectionText: string): number {
  const dollar = sectionText.match(/\$\$[\s\S]+?\$\$/g)?.length ?? 0;
  const bracket = sectionText.match(/\\\[[\s\S]+?\\\]/g)?.length ?? 0;
  return dollar + bracket;
}

export interface AnalyzeContext {
  sectionText: string;
  /** Sidecar `formulaCount`; falls back to counting the text. */
  formulaCount: number;
  /** True when the section came from the DOM fallback (data-model.md §5.5). */
  degradedContext: boolean;
}

export function validateAnalyzeSection(
  args: SectionAnalysis,
  ctx: AnalyzeContext,
): string[] {
  const errors: string[] = [];

  if (!args.coreQuestion || args.coreQuestion.trim().length === 0) {
    errors.push('coreQuestion is empty: state in one sentence what this section answers.');
  }

  const chain = args.argumentChain ?? [];
  if (chain.length < MIN_ARGUMENT_CHAIN) {
    errors.push(
      `argumentChain has ${chain.length} links, needs at least ${MIN_ARGUMENT_CHAIN}: trace the section's reasoning from premise to conclusion.`,
    );
  }
  if (!chain.some((l) => l.role === 'conclusion')) {
    errors.push("argumentChain has no link with role 'conclusion': name what the section concludes.");
  }

  if ((args.commonMisreadings ?? []).length < 1) {
    errors.push(
      'commonMisreadings is empty: name at least one way a student typically misreads this section.',
    );
  }

  // Formula coverage — relaxed for DOM-fallback sections, since the model cannot
  // cover formulas it was never shown.
  const expected = ctx.formulaCount > 0 ? ctx.formulaCount : countDisplayFormulas(ctx.sectionText);
  if (!ctx.degradedContext && expected > 0) {
    const covered = (args.formulas ?? []).length;
    if (covered / expected < FORMULA_COVERAGE_MIN) {
      errors.push(
        `formulas: ${covered} of ${expected} covered, need at least ${Math.ceil(
          expected * FORMULA_COVERAGE_MIN,
        )}. A formula-dense section cannot be planned without reading its formulas.`,
      );
    }
  }

  errors.push(
    ...checkAnchors(
      [
        ...chain.map((l, i) => ({ value: l.sourceAnchor, field: `argumentChain[${i}].sourceAnchor` })),
        ...(args.formulas ?? []).map((f, i) => ({
          value: f.sourceAnchor,
          field: `formulas[${i}].sourceAnchor`,
        })),
      ],
      ctx.sectionText,
    ),
  );

  return errors;
}

// ---------------------------------------------------------------------------
// set_steps (tools.md §2)
// ---------------------------------------------------------------------------

export interface LadderContext {
  stepRange: [number, number];
  genrePreference: GenrePreference;
  knownKpIds: Set<string>;
  sectionText: string;
}

export const STEP_HARD_CAP = 6;

export function validateSteps(
  steps: Array<{
    id: string;
    title: string;
    knowledgePointIds: string[];
    targetLevel: TargetLevel;
    questionGenre: QuestionGenre;
    anchors: string[];
  }>,
  ctx: LadderContext,
): string[] {
  const errors: string[] = [];
  const [min, max] = ctx.stepRange;
  const cap = Math.min(max, STEP_HARD_CAP);

  if (steps.length < min || steps.length > cap) {
    errors.push(
      `steps: ${steps.length} given, must be between ${min} and ${cap}. Re-plan the ladder rather than padding or truncating it.`,
    );
  }

  const ids = new Set<string>();
  for (const s of steps) {
    if (ids.has(s.id)) errors.push(`duplicate step id: ${s.id}`);
    ids.add(s.id);
  }

  // targetLevel must be non-decreasing across the ladder.
  for (let i = 1; i < steps.length; i += 1) {
    const prev = steps[i - 1]!;
    const cur = steps[i]!;
    if (cur.targetLevel < prev.targetLevel) {
      errors.push(
        `targetLevel decreases at step ${cur.id} (${prev.targetLevel} -> ${cur.targetLevel}): the ladder must not go backwards.`,
      );
    }
  }

  // Every KP must exist after upsert_knowledge_points.
  for (const s of steps) {
    if (s.knowledgePointIds.length === 0) {
      errors.push(`step ${s.id} has no knowledgePointIds.`);
    }
    for (const kp of s.knowledgePointIds) {
      if (!ctx.knownKpIds.has(kp)) {
        errors.push(
          `step ${s.id} references unknown knowledge point '${kp}': call upsert_knowledge_points first and use the ids it returns.`,
        );
      }
    }
  }

  // No KP may be the sole target of more than two steps.
  const soleCounts = new Map<string, number>();
  for (const s of steps) {
    if (s.knowledgePointIds.length === 1) {
      const kp = s.knowledgePointIds[0]!;
      soleCounts.set(kp, (soleCounts.get(kp) ?? 0) + 1);
    }
  }
  for (const [kp, n] of soleCounts) {
    if (n > 2) {
      errors.push(`knowledge point '${kp}' is the sole target of ${n} steps (max 2): spread the ladder.`);
    }
  }

  errors.push(...validateGenreMix(steps.map((s) => s.questionGenre), ctx.genrePreference));

  errors.push(
    ...checkAnchors(
      steps.flatMap((s) => s.anchors.map((a, i) => ({ value: a, field: `step ${s.id} anchors[${i}]` }))),
      ctx.sectionText,
    ),
  );

  return errors;
}

/**
 * harness.md §4.1: `descriptive-only` permits one genre; `descriptive-first`
 * requires a majority of planned steps to be descriptive; `mixed` is free.
 */
export function validateGenreMix(genres: QuestionGenre[], pref: GenrePreference): string[] {
  const errors: string[] = [];
  for (const g of genres) {
    if (!QUESTION_GENRES.includes(g)) errors.push(`unknown questionGenre '${g}'`);
  }
  if (pref === 'descriptive-only') {
    const bad = [...new Set(genres.filter((g) => g !== 'descriptive'))];
    if (bad.length > 0) {
      errors.push(
        `genrePreference is descriptive-only, but genres ${bad.join(', ')} were used: use 'descriptive'.`,
      );
    }
  } else if (pref === 'descriptive-first' && genres.length > 0) {
    const n = genres.filter((g) => g === 'descriptive').length;
    if (n * 2 <= genres.length) {
      errors.push(
        `genrePreference is descriptive-first: ${n} of ${genres.length} steps are descriptive, a majority must be.`,
      );
    }
  }
  return errors;
}

export function validateGenreForQuestion(genre: QuestionGenre, pref: GenrePreference): string[] {
  if (!QUESTION_GENRES.includes(genre)) return [`unknown genre '${genre}'`];
  if (pref === 'descriptive-only' && genre !== 'descriptive') {
    return [`genrePreference is descriptive-only: genre '${genre}' is not permitted, use 'descriptive'.`];
  }
  return [];
}

// ---------------------------------------------------------------------------
// ask_question (tools.md §3)
// ---------------------------------------------------------------------------

export const QUESTION_MAX_CHARS = 120;
export const SETUP_MAX_CHARS = 400;

/** Yes/no answerability and multiple-choice shape are forbidden in every mode. */
const YES_NO_PATTERNS = [
  /是不是[?？]?\s*$/,
  /对不对[?？]?\s*$/,
  /对吗[?？]?\s*$/,
  /是吗[?？]?\s*$/,
  /有没有[^?？]{0,12}[?？]\s*$/,
  /能不能[^?？]{0,12}[?？]\s*$/,
  /会不会[^?？]{0,12}[?？]\s*$/,
  /^\s*(is|are|does|do|did|can|could|will|would|should|has|have|was|were)\b[^?]*\?\s*$/i,
];

const MULTIPLE_CHOICE_PATTERNS = [
  /(^|\n)\s*[（(]?[ABCD][）)][\s\S]{0,80}(^|\n)\s*[（(]?[BCD][）)]/m,
  /(^|\n)\s*[ABCD][.、][\s\S]{0,80}(^|\n)\s*[BCD][.、]/m,
  /以下(哪|那)一?(个|项|条)/,
  /下列(哪|那)一?(个|项|条)/,
  /which of the following/i,
];

export function looksYesNo(question: string): boolean {
  const q = question.trim();
  return YES_NO_PATTERNS.some((re) => re.test(q));
}

export function looksMultipleChoice(text: string): boolean {
  return MULTIPLE_CHOICE_PATTERNS.some((re) => re.test(text));
}

/**
 * The answer must not sit in the section within the same sentence as the ask —
 * that is a lookup, not a comprehension test. Approximated by checking whether
 * an expected point matches a single sentence that also matches the question.
 */
export function answerInSameSentence(
  question: string,
  expectedPoints: string[],
  sectionText: string,
): boolean {
  const sentences = sectionText
    .split(/[。！？\n]|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);
  const qTokens = tokenize(question);
  for (const sentence of sentences) {
    const sTokens = tokenize(sentence);
    // Both tests are containment, not similarity: the question's subject matter
    // must appear in the sentence, and the answer must too. A long section
    // sentence that literally states the answer is exactly the case to catch.
    if (containment(qTokens, sTokens) < 0.6) continue;
    for (const point of expectedPoints) {
      if (containment(tokenize(point), sTokens) >= 0.8) return true;
    }
  }
  return false;
}

export interface QuestionContext {
  sectionText: string;
  genrePreference: GenrePreference;
  askedQuestions: AskedQuestion[];
  targetLevel: TargetLevel;
  kpIds: string[];
}

export function validateAskQuestion(
  args: {
    genre: QuestionGenre;
    question: string;
    setup: string | null;
    expectedPoints: ExpectedPoint[];
    rubric: Record<string, string>;
    hintLadder: string[];
    sourceAnchor: string;
  },
  ctx: QuestionContext,
): string[] {
  const errors: string[] = [];
  const points = (args.expectedPoints ?? []).map((p) => p.point);

  if (!args.question || args.question.trim().length === 0) {
    errors.push('question is empty.');
  }
  if (args.question && args.question.length > QUESTION_MAX_CHARS) {
    errors.push(
      `question is ${args.question.length} chars, max ${QUESTION_MAX_CHARS}: move background into 'setup'.`,
    );
  }
  if (args.setup && args.setup.length > SETUP_MAX_CHARS) {
    errors.push(`setup is ${args.setup.length} chars, max ${SETUP_MAX_CHARS}.`);
  }
  if (points.length === 0) {
    errors.push('expectedPoints is empty: list what a correct answer must contain.');
  }
  for (const key of ['5', '3', '1']) {
    if (!args.rubric?.[key]) errors.push(`rubric is missing the '${key}' band.`);
  }

  if (args.question && looksYesNo(args.question)) {
    errors.push(
      'question is answerable yes/no: ask for reasoning the student must produce (why / how / under what condition).',
    );
  }
  const whole = `${args.setup ?? ''}\n${args.question ?? ''}`;
  if (looksMultipleChoice(whole)) {
    errors.push('question has a multiple-choice shape: options are not permitted, ask for an open answer.');
  }

  errors.push(...validateGenreForQuestion(args.genre, ctx.genrePreference));
  errors.push(...checkAnchors([{ value: args.sourceAnchor, field: 'sourceAnchor' }], ctx.sectionText));

  if (args.question && points.length > 0 && answerInSameSentence(args.question, points, ctx.sectionText)) {
    errors.push(
      'the answer appears in the section in the same sentence as the ask: this tests lookup, not comprehension. Ask for the reason behind the statement instead.',
    );
  }

  errors.push(...checkRepetition({ ...args, expectedPoints: points }, ctx));

  return errors;
}

// ---------------------------------------------------------------------------
// Repetition guard (tools.md §3.1)
// ---------------------------------------------------------------------------

export function checkRepetition(
  args: { genre: QuestionGenre; expectedPoints: string[]; sourceAnchor: string },
  ctx: QuestionContext,
): string[] {
  const errors: string[] = [];
  const kpSet = new Set(ctx.kpIds);

  for (const prior of ctx.askedQuestions) {
    // Identical anchor + kpIds + genre is a duplicate regardless of overlap.
    const sameKps =
      prior.kpIds.length === kpSet.size && prior.kpIds.every((k) => kpSet.has(k));
    if (
      sameKps &&
      prior.genre === args.genre &&
      normalizeForAnchor(prior.sourceAnchor) === normalizeForAnchor(args.sourceAnchor)
    ) {
      errors.push(
        `duplicate of the question on step ${prior.stepId} variant ${prior.variant}: same sourceAnchor, same knowledge points, same genre. Pick a different case or a different aspect.`,
      );
      continue;
    }

    const ratio = overlapRatio(args.expectedPoints, prior.expectedPoints);
    if (ratio > OVERLAP_REJECT_RATIO) {
      // The targetLevel escape clause: re-testing a knowledge point at a HIGHER
      // level is the ladder working, not a repeat. Only same-or-lower repeats
      // are defects — over-strict dedup would make level-3 steps unaskable.
      const higherLevel = ctx.targetLevel > prior.targetLevel;
      if (!higherLevel) {
        errors.push(
          `expectedPoints overlap ${Math.round(ratio * 100)}% with step ${prior.stepId} variant ${
            prior.variant
          } at targetLevel ${prior.targetLevel}: this repeats a question already asked. Test a different aspect, or raise the targetLevel.`,
        );
      }
    }

    // A variant answerable from what was just explained tests the last three
    // minutes of chat, not understanding.
    if (prior.discussedPoints.length > 0) {
      const covered = overlapRatio(args.expectedPoints, prior.discussedPoints);
      if (covered > OVERLAP_REJECT_RATIO) {
        errors.push(
          `expectedPoints are ${Math.round(
            covered * 100,
          )}% covered by what was already explained in the discussion of step ${prior.stepId}: the student could answer from that explanation. Ask about something not yet spelled out.`,
        );
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// submit_evaluation (tools.md §3)
// ---------------------------------------------------------------------------

export function validateEvaluation(
  args: { score: number; evaluation: string; pointsHit: string[]; pointsMissed: string[] },
  expectedPoints: string[],
): string[] {
  const errors: string[] = [];

  if (!Number.isInteger(args.score) || args.score < 0 || args.score > 5) {
    errors.push(`score must be an integer 0–5, got ${JSON.stringify(args.score)}.`);
  }
  if (!args.evaluation || args.evaluation.trim().length === 0) {
    errors.push('evaluation is empty: the student needs to read what was right and what was wrong.');
  }

  // pointsHit ∪ pointsMissed must cover every expectedPoint — this forces the
  // grader to actually check each one.
  const claimed = [...(args.pointsHit ?? []), ...(args.pointsMissed ?? [])];
  const uncovered = expectedPoints.filter((p) => !claimed.some((c) => pointsMatch(c, p)));
  if (uncovered.length > 0) {
    const shown = uncovered.map((p) => (p.length > 24 ? `${p.slice(0, 24)}…` : p));
    errors.push(
      `pointsHit and pointsMissed together must account for every expectedPoint; these are unaccounted for: ${shown.join(
        ' | ',
      )}`,
    );
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Achievement gate (harness.md §6)
// ---------------------------------------------------------------------------

export interface AchievementGateInput {
  plannedStepsTotal: number;
  plannedStepsPassed: number;
  scores: number[]; // planned steps only
  hintedPasses: number;
  totalPasses: number;
  anyStepSkippedAsUnmastered: boolean;
}

export const MEAN_SCORE_MIN = 3.5;
export const HINTED_PASS_RATIO_MAX = 0.5;

export function evaluateAchievementGate(input: AchievementGateInput): {
  eligible: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  if (input.plannedStepsTotal === 0) {
    return { eligible: false, reasons: ['gate_not_met: no planned steps'] };
  }
  if (input.plannedStepsPassed !== input.plannedStepsTotal) {
    reasons.push(
      `gate_not_met: ${input.plannedStepsPassed} of ${input.plannedStepsTotal} planned steps passed`,
    );
  }
  const mean =
    input.scores.length > 0 ? input.scores.reduce((a, b) => a + b, 0) / input.scores.length : 0;
  if (mean < MEAN_SCORE_MIN) {
    reasons.push(`gate_not_met: meanScore ${mean.toFixed(2)} < ${MEAN_SCORE_MIN}`);
  }
  const hintedRatio = input.totalPasses > 0 ? input.hintedPasses / input.totalPasses : 0;
  if (hintedRatio > HINTED_PASS_RATIO_MAX) {
    reasons.push(
      `gate_not_met: hintedPassRatio ${hintedRatio.toFixed(2)} > ${HINTED_PASS_RATIO_MAX}`,
    );
  }
  if (input.anyStepSkippedAsUnmastered) {
    reasons.push('gate_not_met: a step was skipped as unmastered');
  }

  return { eligible: reasons.length === 0, reasons };
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------

export const KP_ID_RE = /^kp:[a-z0-9][a-z0-9-]*$/;

export function validateKpId(id: string): string[] {
  return KP_ID_RE.test(id)
    ? []
    : [`knowledge point id '${id}' must match kp:<lowercase-slug> (letters, digits, hyphens).`];
}

/**
 * Strip the delimiter tokens from a value before wrapping it, so a student who
 * types `BACKGROUND>>>` cannot close the block early (llm-io.md §2).
 */
export function stripDelimiters(value: string): string {
  return value
    .replace(/<<<\s*(SECTION|BACKGROUND|ANALYSIS)/gi, '')
    .replace(/(SECTION|BACKGROUND|ANALYSIS)\s*>>>/gi, '');
}

export function delimit(tag: 'SECTION' | 'BACKGROUND' | 'ANALYSIS', value: string): string {
  return `<<<${tag}\n${stripDelimiters(value)}\n${tag}>>>`;
}
