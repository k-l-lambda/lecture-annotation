/**
 * What the tutor_reply role is allowed to know, and whose instruction wins.
 *
 * Regression net for the 33.2 twistor session
 * (`temp/tutor-session-332-作为光线的扭量.json`). At `AWAIT_ANSWER` the student asked
 * 「事件在扭量空间变成直线了吗」, was restated at, then said 「我让你来讲清楚，不要局限在原文」 —
 * and got a second restatement plus 「本节没有展开到那个程度…通常会在彭罗斯的扭量几何讲义里
 * 系统讲授」. The section answers all three of that student's questions: 黎曼球面 at +6/+7
 * paragraphs from the anchor, 非局域 at −1.
 *
 * Three independent faults, each pinned below:
 *
 * 1. The reply role's section view was `step.anchors`, which belong to the *questioner*
 *    (they fix what a question may be built on). One pinned sentence is not a section.
 * 2. `expandAnchors` matched by whole-string containment, so the planner's paraphrase
 *    (source 「这样，与普通时空图景中…」 vs stored 「在普通时空图景中…」 — one character) fell
 *    back to the bare anchor *silently*. 68 characters of source, no signal.
 * 3. `expectedPoints` was never sent, so the model could not tell the graded answer
 *    from an adjacent fact. Refusing everything was its only safe policy — the
 *    rigidity the user reported.
 *
 * And the precedence rule now stated in the prompt: 让学生理解 is the objective, the quiz
 * is the instrument. An explicit student instruction outranks 不要给出答案.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { buildTutorReplyMessages, expandAnchors } from '../src/core/roles.ts';
import { PROMPTS } from '../src/core/prompts.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';
import type { SectionContent, Step } from '../src/core/types.ts';

/** Two paragraphs: the anchor's, and the one that actually answers the follow-up. */
const ANNOTATION = [
  '这些思想是如何被综合到扭量理论中的呢？这样，与普通时空图景中光线 $Z$ 是一条轨迹而事件 $R$ 是一个点不同的是，' +
    '在扭量空间中正相反，光线由点 $\\mathbf{Z}$ 来描述，而事件则由轨迹 $\\mathbf{R}$ 来描述。',
  '因此，$\\mathbb{PN}$ 中的点 $\\mathbf{Z}$ 对应于 $\\mathbb{M}$ 中的轨迹 $Z$（光线），' +
    '$\\mathbb{M}$ 中的点 $R$ 对应于 $\\mathbb{PN}$ 中的轨迹 $\\mathbf{R}$（黎曼球面）。',
  '如上所述，这个球面自然是黎曼球面，它是复一维空间（一条复曲线）。',
].join('\n\n');

const SECTION: SectionContent = {
  sectionId: '332-作为光线的扭量',
  heading: '33.2　作为光线的扭量',
  text: '',
  annotation: ANNOTATION,
  formulaCount: 0,
  subHeadings: [],
} as unknown as SectionContent;

/** The planner's stored anchor: a paraphrase, one character off the source. */
const STORED_ANCHOR =
  '在普通时空图景中光线 Z 是一条轨迹而事件 R 是一个点不同的是，在扭量空间中正相反，光线由点 Z 来描述，而事件则由轨迹 R 来描述。';

const STEP = {
  id: 's1',
  title: '理解光线与时空点的角色互换',
  goal: '用自己的话说清楚在扭量空间中「光线」和「时空点」分别用什么几何对象来表示。',
  targetLevel: 1,
  anchors: [STORED_ANCHOR],
  knowledgePointIds: [],
  attempts: [],
} as unknown as Step;

function context(overrides: Record<string, unknown> = {}): string {
  const messages = buildTutorReplyMessages(
    {
      analysis: null,
      section: SECTION,
      step: STEP,
      phase: 'AWAIT_ANSWER',
      history: [],
      digest: { known: [], weak: [], unseen: [], recentAchievements: [] },
      lastEvaluation: null,
      hintsUsed: 0,
      settings: defaultSettings(),
      stepDigest: [],
      intentHint: 'needs_clarification',
      question: '在扭量空间中，光线用什么几何对象来表示？',
      ...overrides,
    } as never,
    defaultSettings(),
  );
  return messages[1]?.content ?? '';
}

/** The section text as sent, unescaped — a raw regex against the JSON reports false misses. */
function sectionText(ctx: string): string {
  return (JSON.parse(ctx) as { sectionText: string }).sectionText;
}

// ---------------------------------------------------------------------------
// Fault 1: the section, not just the anchor
// ---------------------------------------------------------------------------

test('the reply role receives the section text, not only the anchors', () => {
  const text = sectionText(context());
  // The answer to the student's follow-up lives outside the anchor's own paragraph.
  assert.match(text, /对应于/);
  assert.match(text, /黎曼球面/);
});

test('the section is budgeted, and says so when truncated', () => {
  const parsed = JSON.parse(context()) as { sectionTruncated: boolean };
  assert.equal(parsed.sectionTruncated, false);
  const tiny = { ...defaultSettings(), maxContextChars: 120 };
  const messages = buildTutorReplyMessages(
    {
      analysis: null, section: SECTION, step: STEP, phase: 'AWAIT_ANSWER', history: [],
      digest: { known: [], weak: [], unseen: [], recentAchievements: [] },
      lastEvaluation: null, hintsUsed: 0, settings: tiny, stepDigest: [],
      intentHint: null, question: null,
    } as never,
    tiny,
  );
  assert.equal((JSON.parse(messages[1]!.content) as { sectionTruncated: boolean }).sectionTruncated, true);
});

// ---------------------------------------------------------------------------
// Fault 2: anchor expansion, and its silence
// ---------------------------------------------------------------------------

test('an anchor paraphrased away from the source still finds its paragraph', () => {
  // Whole-string containment failed here at the FIRST character (longest matching
  // prefix: 「在」), because the source opens 「这样，与普通…」 and the anchor 「在普通…」.
  const out = expandAnchors(SECTION, [STORED_ANCHOR]);
  assert.equal(out.expanded, true);
  assert.ok(
    out.texts[0]!.length > STORED_ANCHOR.length,
    'expansion returned the bare anchor rather than its paragraph',
  );
  assert.match(out.texts[0] as string, /这些思想是如何被综合/);
});

test('a genuinely absent anchor is reported as unexpanded, not passed off as found', () => {
  // The old shape made a miss indistinguishable from a hit, so a starved context looked
  // identical to a good one.
  const out = expandAnchors(SECTION, ['这一句在本节里根本不存在，是凭空写出来的锚点文字。']);
  assert.equal(out.expanded, false);
  assert.equal(out.texts.length, 1);
});

test('the context reports whether the anchors located anything', () => {
  assert.equal((JSON.parse(context()) as { anchorsExpanded: boolean }).anchorsExpanded, true);
});

test('expandAnchors still returns nothing for a step with no anchors', () => {
  const out = expandAnchors(SECTION, []);
  assert.deepEqual(out.texts, []);
  assert.equal(out.expanded, false);
});

// ---------------------------------------------------------------------------
// Fault 3: scoping the refusal
// ---------------------------------------------------------------------------

test('the graded points are sent so the refusal can be narrow', () => {
  const ctx = context({ expectedPoints: ['光线由一个点 Z 表示', '事件由一条轨迹表示'] });
  const parsed = JSON.parse(ctx) as { gradedPoints: string[]; gradedPointsNote: string };
  assert.deepEqual(parsed.gradedPoints, ['光线由一个点 Z 表示', '事件由一条轨迹表示']);
  assert.match(parsed.gradedPointsNote, /其他内容照常回答/);
});

test('graded points are withheld once the step is being discussed', () => {
  // After grading the answer may be explained in full, so there is nothing to scope.
  const ctx = context({ phase: 'DISCUSSING', expectedPoints: ['光线由一个点 Z 表示'] });
  assert.equal('gradedPoints' in (JSON.parse(ctx) as object), false);
});

// ---------------------------------------------------------------------------
// Precedence: the student's instruction outranks the quiz
// ---------------------------------------------------------------------------

test('an explicit request to be taught gets its own rule, not a restatement', () => {
  const rules = (JSON.parse(context({ intentHint: 'wants_explanation' })) as { rules: string }).rules;
  assert.match(rules, /不要再重述题目/);
  assert.match(rules, /不算分/);
});

test('even the clarify rule yields to an explicit student instruction', () => {
  const rules = (JSON.parse(context()) as { rules: string }).rules;
  assert.match(rules, /如果学生明确要求/);
  assert.match(rules, /最高原则是让他真的理解/);
  assert.match(rules, /放弃本题的评分/);
});

test('the prompt states the precedence and forbids a false 本节没讲', () => {
  const text = PROMPTS.tutor_reply.text;
  assert.match(text, /最高原则/);
  assert.match(text, /测验只是/);
  // The specific failure: claiming the section does not cover something without looking.
  assert.match(text, /说「本节没讲」之前/);
  assert.match(text, /stepRail/);
});

test('the router can tell "explain it to me" from "what does the question mean"', () => {
  // Once a `secondary: wants_explanation` on a `clarify` route, now a route of its
  // own: `applyRoute` dispatches on the primary route alone, so as a secondary the
  // distinction was parsed and then thrown away, and the student got the
  // restate-the-question rules anyway.
  assert.match(PROMPTS.router.text, /`explain`/);
  assert.match(PROMPTS.router.text, /不要局限在原文/);
  // The two routes are only useful if the prompt says which is which.
  assert.match(PROMPTS.router.text, /`clarify` 和 `explain` 的区别/);
});

test('the router is told it only runs before an answer', () => {
  // No `advance` route, and no DISCUSSING table: a classifier there could only guess
  // at moving the step, and the phase has explicit controls for that.
  assert.match(PROMPTS.router.text, /没有 `advance` 这条路线/);
  assert.doesNotMatch(PROMPTS.router.text, /`DISCUSSING`（已评分/);
});

test('tutor_reply is told studentText is what it must answer', () => {
  // The field exists because `history` was once empty on a step with no attempt, and
  // the reply role received a step description with no question in it.
  assert.match(PROMPTS.tutor_reply.text, /`studentText` 是学生这一轮说的原话/);
  assert.match(PROMPTS.tutor_reply.text, /wants_explanation/);
  assert.match(PROMPTS.tutor_reply.text, /不要重述题目/);
});
