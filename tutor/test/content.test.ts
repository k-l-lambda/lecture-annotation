/**
 * Section parsing and id derivation.
 *
 * The slug cases here are not hypothetical: each one is a real heading in the
 * corpus, and the expected value is the id the built site actually carries. A
 * regression makes every cross-chapter link to that section dangle, silently.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseHeading, parseMarkedSections, slugify } from '../src/core/content.ts';

function slug(text: string): string {
  return slugify(text, new Map());
}

test('slugify folds the ideographic space the corpus uses in headings', () => {
  // `toc` normalises heading text BEFORE slugifying, so U+3000 becomes a plain
  // space and then the separator. Calling pymdownx slugify directly would give
  // `272亚微观成分` instead.
  assert.equal(slug('27.2　亚微观成分'), '272-亚微观成分');
});

test('slugify keeps the alphanumerics inside inline math', () => {
  assert.equal(slug('6.3 高阶导数：$C^\\infty$ 光滑函数'), '63-高阶导数cinfty-光滑函数');
  assert.equal(slug('29.4 自旋 $\\frac{1}{2}$ 的密度矩阵：布洛赫球'), '294-自旋-frac12-的密度矩阵布洛赫球');
  assert.equal(slug('24.5 $\\partial/\\partial t$ 的非不变性'), '245-partialpartial-t-的非不变性');
});

test('slugify keeps hyphens and underscores, which pymdownx does not strip', () => {
  // The bug this pins failed a Pages deploy. `RE_INVALID_SLUG_CHAR` is `[^\w\- ]`,
  // so `-` and `_` survive while `+` and `：` do not — but the character class this
  // replaced stripped `-` and `_` along with the rest of ASCII punctuation, so the
  // sidecar and the rendered HTML disagreed on 381 of the corpus's 5559 headings.
  // Only 7 were marked sections, which is why it went unnoticed until a lecture
  // page without an explicit id was marked.
  assert.equal(
    slug('段落 16：QCD例子：e+e-到强子总截面与红外抵消'),
    '段落-16qcd例子ee-到强子总截面与红外抵消',
  );
  assert.equal(slug('4. 涨落-耗散定理（Fluctuation-Dissipation Theorem）'),
    '4-涨落-耗散定理fluctuation-dissipation-theorem');
  assert.equal(slug('1. 生成元的统一表示：$M_{\\mu\\nu}$ 的引入'), '1-生成元的统一表示m_munu-的引入');
});

test('slugify strips symbols that are neither letter, digit, dash nor space', () => {
  // `⭐` is in 14 corpus headings; it is a symbol, so it goes, and the spaces
  // around it still collapse to separators independently.
  assert.equal(slug('图2：双轨制学习路径 ⭐新出现'), '图2双轨制学习路径-新出现');
});

test('slugify replaces each space with a separator, not each run', () => {
  // pymdownx's `RE_SEP` is a single U+0020, applied after the invalid chars are
  // removed — so a stripped character between two spaces leaves TWO separators.
  assert.equal(slug('4. 核心方程 $\\nabla \\cdot T = 0$ 的物理内涵'), '4-核心方程-nabla-cdot-t--0-的物理内涵');
});

test('slugify appends toc duplicate suffixes', () => {
  const seen = new Map<string, number>();
  assert.equal(slugify('小结', seen), '小结');
  assert.equal(slugify('小结', seen), '小结_1');
  assert.equal(slugify('小结', seen), '小结_2');
});

test('parseHeading does not mistake trailing LaTeX for an attr_list block', () => {
  const h = parseHeading('## 面积是 $\\frac{1}{2}$', 0);
  assert.equal(h?.marked, false);
  assert.equal(h?.text, '## 面积是 $\\frac{1}{2}$'.slice(3));
});

test('parseHeading reads the mark, explicit id and data attributes', () => {
  const h = parseHeading('### 27.3 熵 { .tutor-section #熵 data-tutor-title="熵与概率" }', 4);
  assert.equal(h?.level, 3);
  assert.equal(h?.marked, true);
  assert.equal(h?.explicitId, '熵');
  assert.equal(h?.attrs['data-tutor-title'], '熵与概率');
  assert.equal(h?.text, '27.3 熵');
});

const DOC = [
  '# 第27章',
  '',
  '## 27.1 引言 { .tutor-section }',
  '',
  '正文一。',
  '',
  '### 深入分析',
  '',
  '这是未标记的分析小节，应被吸收。',
  '',
  '$$E = mc^2$$',
  '',
  '## 27.2 熵 { .tutor-section }',
  '',
  '正文二。',
  '',
  '<details>',
  '<summary>📝 原始字幕</summary>',
  '字幕文本',
  '</details>',
  '',
  '## §注释',
  '',
  '尾注不该被收进任何一节的正文。',
].join('\n');

test('an unmarked heading is absorbed rather than ending the section', () => {
  const [first] = parseMarkedSections(DOC, { page: 'chapter_27.md' });
  assert.equal(first?.sectionId, '271-引言');
  assert.match(first!.annotation, /未标记的分析小节/);
  assert.equal(first!.formulaCount, 1);
  assert.deepEqual(
    first!.subHeadings.map((s) => s.heading),
    ['深入分析'],
  );
});

test('a section runs to the next marked heading, transcript split out', () => {
  const sections = parseMarkedSections(DOC, { page: 'chapter_27.md' });
  assert.equal(sections.length, 2);
  const second = sections[1]!;
  assert.equal(second.sectionId, '272-熵');
  assert.match(second.transcript ?? '', /字幕文本/);
  assert.doesNotMatch(second.annotation, /字幕文本/);
  // The final unmarked `## §注释` is a boundary at the same level, so the
  // endnotes stay out of the section body.
  assert.doesNotMatch(second.annotation, /尾注/);
});

test('an unmarked document yields no sections', () => {
  assert.deepEqual(parseMarkedSections('# 标题\n\n## 一节\n\n正文。', { page: 'x.md' }), []);
});

test('headings inside a fenced block are not headings', () => {
  const doc = ['## 真节 { .tutor-section }', '', '```md', '## 假节 { .tutor-section }', '```', '', '尾。'].join('\n');
  const sections = parseMarkedSections(doc, { page: 'x.md' });
  assert.equal(sections.length, 1);
  assert.match(sections[0]!.annotation, /假节/);
});
