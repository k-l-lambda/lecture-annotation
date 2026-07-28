/**
 * ContentSource for the browser: the build-time sidecar, with DOM extraction as a
 * degraded fallback.
 *
 * The published site contains no `.md` at all, so the sidecar is not an
 * optimisation — it is the only way the model sees LaTeX rather than typeset
 * MathJax output (data-model.md §5). The fallback exists so a page whose sidecar
 * failed to build still runs a session, and it sets `degradedContext` so the
 * harness relaxes the formula-coverage gate: a model cannot cover formulas it was
 * never shown.
 */

import { sidecarUrlFor } from '../../core/content.ts';
import type { ContentSource } from '../../core/ports.ts';
import type { SectionContent } from '../../core/types.ts';

export interface Sidecar {
  page: string;
  pageUrl: string;
  title: string;
  kind: 'ebook' | 'lecture';
  generatedAt: string;
  sections: Array<{
    id: string;
    idSource: string;
    heading: string;
    tutorTitle: string | null;
    level: number;
    spanEndsAt: string | null;
    hint: string | null;
    chars: number;
    annotation: string;
    transcript: string | null;
    subHeadings: Array<{ id: string; heading: string; level: number }>;
    formulaCount: number;
    links: Array<{ text: string; target: string }>;
    truncated: boolean;
  }>;
}

export const CACHE_PREFIX = 'tutor.sidecar.';

export interface SidecarEnv {
  fetchImpl?: typeof fetch;
  /** `sessionStorage`; omitted in tests. Survives a reload, dies with the tab. */
  cache?: { getItem(k: string): string | null; setItem(k: string, v: string): void };
  /** Injected for tests; the real one reads `location.pathname`. */
  pathname?: () => string;
  /** The article element to fall back to. Defaults to the page's own. */
  articleFor?: () => Element | null;
}

export class SidecarContent implements ContentSource {
  #env: SidecarEnv;
  #memory = new Map<string, Sidecar | null>();
  /** Set when the last resolution came from the DOM, for `degradedContext`. */
  #degraded = new Set<string>();

  constructor(env: SidecarEnv = {}) {
    this.#env = env;
  }

  get degradedPages(): ReadonlySet<string> {
    return this.#degraded;
  }

  #pathname(): string {
    return this.#env.pathname?.() ?? globalThis.location?.pathname ?? '/';
  }

  /**
   * Lazily fetched on first activation, never on page load — a feature most page
   * views never use should not cost every reader the bandwidth (data-model.md
   * §5.4). Cached in memory and in sessionStorage so a mid-session reload does
   * not refetch.
   */
  async sidecar(): Promise<Sidecar | null> {
    const url = sidecarUrlFor(this.#pathname());
    if (this.#memory.has(url)) return this.#memory.get(url) ?? null;

    const cacheKey = `${CACHE_PREFIX}${url}`;
    const cached = this.#env.cache?.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Sidecar;
        this.#memory.set(url, parsed);
        return parsed;
      } catch {
        // Fall through to the network: a corrupt cache entry is not fatal.
      }
    }

    const doFetch = this.#env.fetchImpl ?? globalThis.fetch;
    let sidecar: Sidecar | null = null;
    try {
      const response = await doFetch(url, { credentials: 'omit' });
      // A 404 is the expected result on an unmarked page, not an error worth
      // reporting: such a page simply has no Tutor UI.
      if (response.ok) {
        sidecar = (await response.json()) as Sidecar;
        try {
          this.#env.cache?.setItem(cacheKey, JSON.stringify(sidecar));
        } catch {
          // Over quota — the memory cache still serves this page view.
        }
      }
    } catch {
      sidecar = null;
    }

    this.#memory.set(url, sidecar);
    return sidecar;
  }

  /**
   * The already-fetched sidecar for this page, or null.
   *
   * Focus mode needs `spanEndsAt` during one synchronous DOM mutation — awaiting a
   * fetch mid-partition would let the page repaint half-folded. The panel has
   * always resolved the section (and therefore the sidecar) before focus is
   * applied, so this is a cache read, and null legitimately means "fall back to
   * the next `.tutor-section`".
   */
  sidecarSync(): Sidecar | null {
    return this.#memory.get(sidecarUrlFor(this.#pathname())) ?? null;
  }

  async getSection(page: string, sectionId: string): Promise<SectionContent | null> {
    const sidecar = await this.sidecar();
    const found = sidecar?.sections.find((s) => s.id === sectionId);

    if (found && !found.truncated) {
      return {
        page,
        sectionId: found.id,
        heading: found.heading,
        tutorTitle: found.tutorTitle,
        level: found.level,
        annotation: found.annotation,
        transcript: found.transcript,
        subHeadings: found.subHeadings,
        formulaCount: found.formulaCount,
        chars: found.chars,
        truncated: false,
        fromSource: true,
      };
    }

    // Truncated as well as missing goes to the DOM: half a section would fail the
    // anchor gate on the missing half in a way that looks like a model error.
    const fromDom = this.extractFromDom(page, sectionId, found?.heading ?? null);
    if (fromDom) this.#degraded.add(page);
    return fromDom;
  }

  /** What a section picker shows. Empty on a page with no sidecar. */
  async list(): Promise<Array<{ id: string; heading: string; chars: number; formulas: number }>> {
    const sidecar = await this.sidecar();
    return (sidecar?.sections ?? []).map((s) => ({
      id: s.id,
      heading: s.tutorTitle ?? s.heading,
      chars: s.chars,
      formulas: s.formulaCount,
    }));
  }

  /**
   * The lossy path (data-model.md §5.5). Math is recovered from MathJax's
   * assistive MathML where present, but `<details>` subtrees are skipped
   * wholesale — on a lecture page that block is the ASR transcript and would
   * dominate the context window.
   */
  extractFromDom(page: string, sectionId: string, knownHeading: string | null): SectionContent | null {
    const doc = globalThis.document;
    if (!doc) return null;

    const heading = doc.getElementById(sectionId);
    if (!heading) return null;

    const level = Number(heading.tagName.slice(1)) || 2;
    const parts: string[] = [];
    let formulaCount = 0;

    for (let node = heading.nextElementSibling; node; node = node.nextElementSibling) {
      // Stop at the next marked heading — the same extent rule as the sidecar,
      // which the mark makes expressible without any depth heuristic.
      if (node.classList.contains('tutor-section')) break;
      if (/^H[1-6]$/.test(node.tagName) && Number(node.tagName.slice(1)) <= level) break;
      if (node.tagName === 'DETAILS') continue;

      const text = domText(node);
      if (text) parts.push(text);
      formulaCount += node.querySelectorAll('.arithmatex').length;
    }

    const annotation = parts.join('\n\n');
    if (!annotation) return null;

    return {
      page,
      sectionId,
      heading: knownHeading ?? headingText(heading),
      tutorTitle: null,
      level,
      annotation,
      transcript: null,
      subHeadings: [],
      formulaCount,
      chars: annotation.length,
      truncated: true,
      fromSource: false,
    };
  }
}

/** The permalink `¶` is part of the heading's text content and must come off. */
function headingText(heading: Element): string {
  const clone = heading.cloneNode(true) as Element;
  clone.querySelector('a.headerlink')?.remove();
  return (clone.textContent ?? '').trim();
}

/**
 * Text of one block, with math restored to LaTeX where MathJax left it
 * recoverable. `mjx-assistive-mml` holds MathML rather than TeX, so this is a
 * partial recovery — good enough to reason about, not good enough to quote as an
 * anchor, which is why the caller marks the result degraded.
 */
function domText(node: Element): string {
  const clone = node.cloneNode(true) as Element;

  for (const el of Array.from(clone.querySelectorAll('.arithmatex'))) {
    const tex = el.querySelector('script[type^="math/tex"]')?.textContent;
    const mml = el.querySelector('mjx-assistive-mml')?.textContent;
    el.replaceWith(clone.ownerDocument.createTextNode(tex ? `$${tex}$` : (mml ?? '')));
  }
  for (const el of Array.from(clone.querySelectorAll('details, .headerlink'))) el.remove();

  return (clone.textContent ?? '').replace(/[ \t]+\n/g, '\n').trim();
}
