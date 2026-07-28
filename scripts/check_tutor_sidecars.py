#!/usr/bin/env python3
"""Cross-check every emitted sidecar against the rendered HTML in ``site/``.

Run after ``mkdocs build``. Every sidecar id must exist on an element carrying
``class="tutor-section"``, and every such element must appear in the sidecar. A
mismatch is a build failure (``data-model.md`` §5.1).

This exists because the id is used by three independent things — the entry button,
the sidecar lookup, and ``getElementById`` for focus mode — and it is derived twice:
once by ``tutor_sidecars.slugify`` and once by MkDocs' ``toc`` extension. Without
this check a slug rule that drifts (the ideographic-space normalisation is the one
that already bit us) fails silently at runtime on a handful of sections rather than
loudly at build time.

Usage:
    scripts/check_tutor_sidecars.py            # site/ and docs/
    scripts/check_tutor_sidecars.py --site out --docs docs
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

# The rendered heading, e.g.
#   <h2 id="271-…" class="tutor-section">…<a class="headerlink" …>¶</a></h2>
# Attribute order is not guaranteed, so id and class are matched independently
# within one tag rather than in a fixed sequence.
TAG_RE = re.compile(r"<h[1-6](?P<attrs>[^>]*)>", re.I)
ID_RE = re.compile(r"""\bid=["']([^"']+)["']""")
CLASS_RE = re.compile(r"""\bclass=["']([^"']*)["']""")


def rendered_ids(html: str) -> set[str]:
    found = set()
    for tag in TAG_RE.finditer(html):
        attrs = tag.group("attrs")
        cls = CLASS_RE.search(attrs)
        if not cls or "tutor-section" not in cls.group(1).split():
            continue
        ident = ID_RE.search(attrs)
        if ident:
            found.add(ident.group(1))
    return found


def check(site: Path, docs: Path) -> list[str]:
    problems: list[str] = []
    checked = 0

    for sidecar in sorted(docs.rglob("*.tutor-sections.json")):
        payload = json.loads(sidecar.read_text(encoding="utf-8"))
        page = payload["page"]
        declared = {s["id"] for s in payload["sections"]}

        # use_directory_urls: true -> docs/a/b.md renders to site/a/b/index.html
        html_path = site / page / "index.html"
        if not html_path.exists():
            problems.append(f"{page}: sidecar emitted but {html_path} was not built")
            continue

        actual = rendered_ids(html_path.read_text(encoding="utf-8"))
        checked += 1

        for missing in sorted(declared - actual):
            problems.append(
                f"{page}: sidecar id '{missing}' is on no .tutor-section element in the "
                "rendered HTML — the slug rule in tutor_sidecars.slugify has drifted from toc's"
            )
        for extra in sorted(actual - declared):
            problems.append(
                f"{page}: rendered .tutor-section '{extra}' is absent from the sidecar — "
                "the section will have an entry button that cannot start a session"
            )

    # A marked page that produced no sidecar at all is the failure mode the two
    # set comparisons above cannot see, so it is checked separately.
    for html_path in sorted(site.rglob("index.html")):
        marked = rendered_ids(html_path.read_text(encoding="utf-8"))
        if not marked:
            continue
        page = html_path.parent.relative_to(site).as_posix()
        if not (docs / f"{page}.tutor-sections.json").exists():
            problems.append(
                f"{page}: {len(marked)} .tutor-section heading(s) rendered but no sidecar was "
                "emitted — Tutor would fall back to DOM text (formulas lost) on this page"
            )

    print(f"checked {checked} sidecar(s) against rendered HTML")
    return problems


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--site", type=Path, default=Path("site"))
    ap.add_argument("--docs", type=Path, default=Path("docs"))
    args = ap.parse_args()

    if not args.site.exists():
        print(f"{args.site} does not exist — run `mkdocs build` first", file=sys.stderr)
        return 2

    problems = check(args.site, args.docs)
    for p in problems:
        print(f"  ✗ {p}", file=sys.stderr)
    if problems:
        print(f"\n{len(problems)} sidecar/HTML mismatch(es)", file=sys.stderr)
        return 1
    print("  ✓ every sidecar id exists in the rendered HTML, and vice versa")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
