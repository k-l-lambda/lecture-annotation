/**
 * Section content resolution.
 *
 * `parseMarkedSections` implements the extent rule of content-marking.md §3
 * against markdown source: a section runs from its `{ .tutor-section }` heading to
 * the next *marked* heading. That rule is why lecture pages work with no
 * page-kind special case — unmarked analysis headings are absorbed rather than
 * treated as section boundaries.
 *
 * Both shells share this parser: the browser feeds it sidecar JSON when present
 * and falls back to DOM text, the Node shell feeds it the .md source directly.
 */

import type { SectionContent } from './types.ts';

const HEADING_RE = /^(#{1,6})[ \t]+(.*?)[ \t]*$/;
/** A trailing attr_list block. No backslash allowed, so a heading ending in
 *  LaTeX such as `$\frac{1}{2}$` is never mistaken for one. */
const ATTR_RE = /(\{[^{}\\]*\})[ \t]*$/;

export const TUTOR_MARK = '.tutor-section';

export interface ParsedHeading {
  level: number;
  text: string;
  line: number;
  marked: boolean;
  explicitId: string | null;
  attrs: Record<string, string>;
}

export function parseHeading(line: string, lineNumber: number): ParsedHeading | null {
  const m = HEADING_RE.exec(line);
  if (!m) return null;
  const hashes = m[1]!;
  let text = m[2]!;

  let marked = false;
  let explicitId: string | null = null;
  const attrs: Record<string, string> = {};

  const attrMatch = ATTR_RE.exec(text);
  if (attrMatch) {
    const body = attrMatch[1]!.slice(1, -1).trim();
    text = text.slice(0, attrMatch.index).trim();
    for (const token of body.split(/\s+/)) {
      if (token === TUTOR_MARK) marked = true;
      else if (token.startsWith('#')) explicitId = token.slice(1);
      else if (token.startsWith('data-')) {
        const eq = token.indexOf('=');
        if (eq > 0) attrs[token.slice(0, eq)] = token.slice(eq + 1).replace(/^["']|["']$/g, '');
        else attrs[token] = 'true';
      }
    }
  }

  return { level: hashes.length, text, line: lineNumber, marked, explicitId, attrs };
}

/**
 * Reproduces the id the built site actually carries, as configured in mkdocs.yml
 * (`toc` + `pymdownx.slugs.slugify(case=lower)`). Applied statefully so duplicate
 * headings get toc's `_1`/`_2` suffixes.
 *
 * Verified against the rendered HTML, and the subtlety is load-bearing: `toc`
 * normalises the heading text BEFORE slugifying, so an ideographic space becomes a
 * regular space and then the separator. `27.2　亚微观成分` -> `272-亚微观成分`.
 * Handing pymdownx the raw text returns `272亚微观成分` instead — matching that
 * would silently break every cross-chapter link to such a section, which is the
 * drift the build-time cross-check exists to catch.
 *
 * The Python side (`scripts/tutor_sidecars.py`) calls pymdownx directly, since it
 * is already a dependency there. Here it has to be reimplemented, so this mirrors
 * `_uslugify`'s steps rather than guessing at its output — the previous version
 * guessed with a character range list and was wrong about `-` and `_`.
 */
export function slugify(text: string, seen: Map<string, number>): string {
  // The steps and their order are pymdownx.slugs._uslugify's, not an approximation
  // of its results: NFC normalise, strip HTML tags, trim, lowercase, drop every
  // character that is not word/dash/space, then spaces to the separator.
  const base = normalizeHeadingSpaces(text.normalize('NFC'))
    // Inline math contributes its stripped LaTeX, it is NOT dropped: the real
    // pipeline removes only the `$` delimiters and slugifies what is inside, so
    // `$C^\infty$` -> `cinfty` and `$\frac{1}{2}$` -> `frac12`. Verified against
    // chapters 6, 24 and 29, the three in the corpus with math in a heading.
    .replace(/\$+/g, '')
    .replace(TAG_RE, '')
    .trim()
    .toLowerCase()
    .replace(INVALID_SLUG_CHAR_RE, '')
    // Only U+0020, matching pymdownx's `RE_SEP`. Every other space separator has
    // already been folded to U+0020 by normalizeHeadingSpaces.
    .replace(/ /g, '-');
  const n = seen.get(base) ?? 0;
  seen.set(base, n + 1);
  return n === 0 ? base : `${base}_${n}`;
}

/** pymdownx's `RE_TAGS`. */
const TAG_RE = /<\/?[^>]*>/g;

/**
 * pymdownx's `RE_INVALID_SLUG_CHAR` — `[^\w\- ]` under Python's Unicode `re`, whose
 * `\w` is letters, digits and underscore. `-` and `_` SURVIVE; this is the part the
 * previous hand-written range list got wrong, stripping both and so disagreeing with
 * the built HTML on 381 of the corpus's 5559 headings (`段落 16：…e+e-到强子…` gave
 * `…ee到强子…` here against `…ee-到强子…` in the DOM).
 */
const INVALID_SLUG_CHAR_RE = /[^\p{L}\p{N}_\- ]/gu;

/**
 * Folds every Unicode space separator — notably U+3000 IDEOGRAPHIC SPACE, which
 * the corpus uses in headings like `27.2　亚微观成分` — to a plain ASCII space.
 */
export function normalizeHeadingSpaces(text: string): string {
  return text.replace(/[   -   　]/g, ' ');
}

const TRANSCRIPT_RE = /<details>\s*<summary>\s*📝\s*原始字幕[\s\S]*?<\/details>/g;

export interface ParseOptions {
  page: string;
  /** Counted for the analyze_section coverage gate. */
  countFormulas?: boolean;
}

/**
 * Splits marked sections out of a markdown document. Returns them in document
 * order; an unmarked document yields an empty array (and gets no Tutor UI).
 */
export function parseMarkedSections(markdown: string, options: ParseOptions): SectionContent[] {
  const lines = markdown.split('\n');
  const headings: ParsedHeading[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const [i, line] of lines.entries()) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const heading = parseHeading(line, i);
    if (heading) headings.push(heading);
  }

  // Ids must be assigned over ALL headings, not just marked ones, because toc's
  // duplicate suffixes count every heading on the page.
  const ids = headings.map((h) => h.explicitId ?? slugify(h.text, seen));

  const sections: SectionContent[] = [];
  for (const [index, heading] of headings.entries()) {
    if (!heading.marked) continue;

    // Extent: data-tutor-span, else the next marked heading, else the next
    // heading of the same or shallower level, else end of document.
    let endLine = lines.length;
    const span = heading.attrs['data-tutor-span'];
    for (let j = index + 1; j < headings.length; j += 1) {
      const candidate = headings[j]!;
      if (span) {
        if (ids[j] === span) {
          endLine = candidate.line;
          break;
        }
        continue;
      }
      if (candidate.marked || candidate.level <= heading.level) {
        endLine = candidate.line;
        break;
      }
    }

    const body = lines.slice(heading.line + 1, endLine).join('\n');
    const transcriptMatches = body.match(TRANSCRIPT_RE);
    const annotation = body.replace(TRANSCRIPT_RE, '').trim();
    const skipTranscript = heading.attrs['data-tutor-skip-transcript'] === 'true';

    const subHeadings = headings
      .slice(index + 1)
      .filter((h) => h.line < endLine && !h.marked)
      .map((h) => ({
        id: ids[headings.indexOf(h)] ?? '',
        heading: h.text,
        level: h.level,
      }));

    sections.push({
      page: options.page,
      sectionId: ids[index] ?? '',
      heading: heading.text,
      tutorTitle: heading.attrs['data-tutor-title'] ?? null,
      level: heading.level,
      annotation,
      transcript: skipTranscript ? null : (transcriptMatches?.join('\n\n') ?? null),
      subHeadings,
      formulaCount: countDisplayMath(annotation),
      chars: annotation.length,
      truncated: false,
      fromSource: true,
    });
  }

  return sections;
}

export function countDisplayMath(text: string): number {
  const dollar = text.match(/\$\$[\s\S]+?\$\$/g)?.length ?? 0;
  const bracket = text.match(/\\\[[\s\S]+?\\\]/g)?.length ?? 0;
  return dollar + bracket;
}

/**
 * Sidecar URL derivation (data-model.md §5.4): strip the trailing slash from the
 * page path and append the suffix — never by string-matching `/ebooks/` or
 * `/lectures/`, since both kinds resolve the same way under
 * `use_directory_urls: true`.
 */
export function sidecarUrlFor(pathname: string): string {
  return `${pathname.replace(/\/+$/, '')}.tutor-sections.json`;
}
