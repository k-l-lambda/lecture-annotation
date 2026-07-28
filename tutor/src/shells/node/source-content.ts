/**
 * ContentSource for the Node shell: reads section markdown straight from the
 * marked `.md` sources in the repo.
 *
 * This is the debug-shell equivalent of the browser's sidecar fetch. No sidecar
 * generator exists yet (that is a later `prepare_docs.py` step), and reading the
 * source is strictly better for debugging anyway — it is the same text the
 * generator would emit, with math still LaTeX.
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { parseMarkedSections } from '../../core/content.ts';
import type { ContentSource } from '../../core/ports.ts';
import type { SectionContent } from '../../core/types.ts';

export class SourceContent implements ContentSource {
  #repoRoot: string;
  #cache = new Map<string, SectionContent[]>();

  constructor(repoRoot: string) {
    this.#repoRoot = repoRoot;
  }

  /** `page` is a repo-relative path, with or without the `.md` suffix. */
  #resolve(page: string): string {
    const withExt = page.endsWith('.md') ? page : `${page}.md`;
    return resolve(this.#repoRoot, withExt);
  }

  sectionsFor(page: string): SectionContent[] {
    const cached = this.#cache.get(page);
    if (cached) return cached;

    const path = this.#resolve(page);
    if (!existsSync(path)) {
      throw new Error(`markdown source not found: ${path}`);
    }
    const sections = parseMarkedSections(readFileSync(path, 'utf8'), { page });
    this.#cache.set(page, sections);
    return sections;
  }

  async getSection(page: string, sectionId: string): Promise<SectionContent | null> {
    const sections = this.sectionsFor(page);
    return sections.find((s) => s.sectionId === sectionId) ?? null;
  }

  /** For `--list`: what a picker would show. */
  list(page: string): Array<{ id: string; heading: string; chars: number; formulas: number }> {
    return this.sectionsFor(page).map((s) => ({
      id: s.sectionId,
      heading: s.heading,
      chars: s.chars,
      formulas: s.formulaCount,
    }));
  }
}
