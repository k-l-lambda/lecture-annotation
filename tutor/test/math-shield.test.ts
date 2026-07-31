/**
 * The math-shielding rules in `docs/javascripts/tutor/messages.js`.
 *
 * That file is a hand-written browser IIFE with no test coverage, and its markdown
 * pipeline had a defect that only showed up as garbled evaluation feedback: `marked`
 * treats `\(` and `\[` as markdown *escapes*, so it emitted a bare `(` / `[` and the
 * delimiter was destroyed before MathJax could ever see it. `$$…$$` happened to
 * survive, which is why the bug looked intermittent when it was really "whichever
 * delimiter the model chose this turn".
 *
 * The regexes are read out of the shipped file rather than duplicated here, so a test
 * cannot pass against a copy that has drifted from what the browser loads.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = readFileSync(
  fileURLToPath(new URL('../../docs/javascripts/tutor/messages.js', import.meta.url)),
  'utf8',
);

/** Pulls a regex literal out of the shipped source by variable name. */
function extractRegex(name: string): RegExp {
  const match = new RegExp(`var ${name} =\\s*(/[\\s\\S]*?/[gimsuy]*);`).exec(source);
  assert.ok(match, `${name} not found in messages.js — did it get renamed?`);
  // eslint-disable-next-line no-eval
  return eval(match[1] as string) as RegExp;
}

const MATH_SPAN = extractRegex('MATH_SPAN');
const OVERESCAPED_TEX_COMMAND = extractRegex('OVERESCAPED_TEX_COMMAND');

/** Uses the shipped regex; the replacement is asserted against restoreMath below. */
function normalizeMathSource(text: string): string {
  return text.replace(new RegExp(OVERESCAPED_TEX_COMMAND.source, 'g'), '$1\\');
}

/** Mirrors shieldMath: the code-span split plus the placeholder substitution. */
function shield(text: string): { text: string; spans: string[] } {
  const spans: string[] = [];
  const pieces = String(text).split(/(```[\s\S]*?```|`[^`\n]*`)/g);
  const out = pieces
    .map((piece, index) => {
      if (index % 2 === 1) return piece;
      return piece.replace(new RegExp(MATH_SPAN.source, 'g'), (m) => {
        spans.push(m);
        return `@@TUTORMATH${spans.length - 1}@@`;
      });
    })
    .join('');
  return { text: out, spans };
}

test('the file carries no NUL byte', () => {
  // A NUL sentinel was tried as the placeholder delimiter and DOMPurify silently
  // *strips* NUL, so every placeholder reached the DOM unrestored and every formula
  // rendered as the literal text `tutormath0`.
  assert.equal(source.includes('\u0000'), false);
});

test('the tagging pattern is derived from the shielding pattern, not written twice', () => {
  // If they drift, a span can be shielded but never tagged (renders as source) or
  // tagged but never shielded (already mangled by markdown).
  assert.match(source, /var MATH_PATTERN = new RegExp\(MATH_SPAN\.source\)/);
});

test('backslash-paren and backslash-bracket math is shielded from markdown', () => {
  for (const input of [
    'The root is \\(z = a+bi\\) exactly.',
    'Thus:\n\n\\[\nx^2 + 1 = 0\n\\]\n',
    'Thus:\n\\[ x = 1 \\]\ndone.',
  ]) {
    const { text, spans } = shield(input);
    assert.equal(spans.length, 1, `not shielded: ${input}`);
    assert.match(text, /@@TUTORMATH0@@/);
    // Nothing of the delimiter may be left behind for marked to eat.
    assert.doesNotMatch(text, /\\[([]/);
  }
});

test('dollar math of both kinds is shielded', () => {
  assert.equal(shield('The answer is $z = a + bi$.').spans.length, 1);
  assert.equal(shield('So $$z^2 = -1$$ holds.').spans.length, 1);
  assert.equal(shield('$$\n\\frac{1}{2}\n$$').spans.length, 1);
  // CJK with no spaces around the delimiters is the common case in this product.
  assert.equal(shield('所以$z^2=-1$成立，因此$$z=\\pm i$$。').spans.length, 2);
});

test('over-escaped TeX commands are repaired without changing valid commands', () => {
  // These string literals contain two and one real backslashes respectively.
  assert.equal(normalizeMathSource('$\\\\mathbb{C}^2$'), '$\\mathbb{C}^2$');
  assert.equal(normalizeMathSource('$\\mathbb{C}^2$'), '$\\mathbb{C}^2$');
  // Do not reinterpret longer runs: unlike the exact doubled-command defect, their
  // intended TeX meaning is ambiguous and a second pass must never decode again.
  assert.equal(normalizeMathSource('$\\\\\\mathbb{C}^2$'), '$\\\\\\mathbb{C}^2$');
  assert.equal(normalizeMathSource('$\\\\\\\\mathbb{C}^2$'), '$\\\\\\\\mathbb{C}^2$');
});

test('legitimate TeX row breaks and spacing options stay doubled', () => {
  for (const input of [
    '$$\\begin{align}a &= b \\\\ c &= d\\end{align}$$',
    '$$a &= b \\\\[4pt] c &= d$$',
    '$$a &= b \\\\\n c &= d$$',
  ]) {
    assert.equal(normalizeMathSource(input), input);
  }
});

test('restoreMath normalizes before HTML-escaping model output', () => {
  const start = source.indexOf('function restoreMath');
  const end = source.indexOf('\n  /**', start);
  const body = start >= 0 && end > start ? source.slice(start, end) : '';
  assert.match(body, /normalizeMathSource\(source\)[\s\S]*?\.replace\(\/&\/g, "&amp;"\)/);
  const repaired = normalizeMathSource('$\\\\mathrm{A&B<C>} $')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  assert.equal(repaired, '$\\mathrm{A&amp;B&lt;C&gt;} $');
});

test('a display block is never split by the inline rule', () => {
  // `$$…$$` must be tried before `$…$`, or one block becomes two empty inline spans.
  const { spans } = shield('$$\\begin{align} a &= b \\\\ c &= d \\end{align}$$');
  assert.equal(spans.length, 1);
  assert.match(spans[0] as string, /^\$\$[\s\S]*\$\$$/);
});

test('a row-spacing option inside a block is not read as a display delimiter', () => {
  // Real grader output from a §13.10 session contained `\\[4pt]` — a LaTeX line-break
  // option, not an opener. Because `$$…$$` is matched before the `\[` rule, the block
  // is shielded whole and the inner `\[` never gets a chance to pair with something
  // far away. If the alternation order were reversed this would swallow the wrong span.
  const input =
    '所以：\n\n$$\n\\begin{align}\ns(Tx, Ty) &= (Tx)^a \\, s_{ab} \\, (Ty)^b \\\\[4pt]\n&= 0\n\\end{align}\n$$\n\n因此成立。';
  const { text, spans } = shield(input);
  assert.equal(spans.length, 1);
  assert.match(spans[0] as string, /^\$\$[\s\S]*\$\$$/);
  assert.equal(text, '所以：\n\n@@TUTORMATH0@@\n\n因此成立。');
});

test('prices are not math', () => {
  // 「一共 $5 和 $7」 previously matched from the first `$` to the second, and MathJax
  // turned two prices into one formula — a grader mentioning money corrupted its own
  // feedback. Real inline math never ends on a space.
  assert.equal(shield('It costs $5 and $7 total.').spans.length, 0);
  assert.equal(shield('一共 $5 和 $7。').spans.length, 0);
  // But a single-token formula still counts.
  assert.equal(shield('the value $x$ here').spans.length, 1);
});

test('code spans are left alone, so a student quoting $x$ is not misread', () => {
  assert.equal(shield('The literal `$x$` is not math.').spans.length, 0);
  assert.equal(shield('Like:\n\n```\n$$x^2$$\n```\n').spans.length, 0);
  // Math outside the fence in the same message is still shielded.
  const mixed = shield('Real $a$ and quoted `$b$`.');
  assert.equal(mixed.spans.length, 1);
  assert.equal(mixed.spans[0], '$a$');
});

test('a message with no math is returned unchanged', () => {
  const input = 'Good answer. You identified the discriminant correctly.';
  const { text, spans } = shield(input);
  assert.equal(spans.length, 0);
  assert.equal(text, input);
});

test('the placeholder cannot be confused with adjacent digits', () => {
  // `@@TUTORMATH1@@` beside a literal digit must not read as index 12.
  const { text, spans } = shield('$a$2 and $b$');
  assert.equal(spans.length, 2);
  const restored = text.replace(/@@TUTORMATH(\d+)@@/g, (_m, i) => spans[Number(i)] as string);
  assert.equal(restored, '$a$2 and $b$');
});
