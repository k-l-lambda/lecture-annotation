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


def rendered_path(page: str) -> str:
    """Where ``use_directory_urls: true`` puts a page's HTML.

    ``docs/a/b.md`` -> ``a/b/index.html``, but ``docs/a/index.md`` -> ``a/index.html``:
    MkDocs does NOT nest an index page inside a directory of its own name. Deriving the
    path without that case reported `lectures/yt-BYKhAbcMMg8/index` as "sidecar emitted
    but no HTML built" while the file was sitting there as `.../index.html`, and then
    also flagged the same page's real HTML as having no sidecar — one cause, two errors.
    """
    if page == "index":
        return "index.html"
    return f"{page[: -len('/index')]}/index.html" if page.endswith("/index") else f"{page}/index.html"


def sidecar_name(page_dir: str) -> str:
    """Inverse of `rendered_path` for the reverse scan: the sidecar a built page implies."""
    return "index.tutor-sections.json" if page_dir == "" else f"{page_dir}.tutor-sections.json"


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

        html_path = site / rendered_path(page)
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
        page_dir = html_path.parent.relative_to(site).as_posix()
        page_dir = "" if page_dir == "." else page_dir
        # `<dir>/index.html` is ambiguous: it is either `<dir>.md` or `<dir>/index.md`.
        # Either sidecar satisfies this check, so accept whichever exists rather than
        # reporting a page as unemitted because it was written the other way.
        candidates = [docs / sidecar_name(page_dir)]
        if page_dir:
            candidates.append(docs / page_dir / "index.tutor-sections.json")
        if not any(c.exists() for c in candidates):
            problems.append(
                f"{page_dir or 'index'}: {len(marked)} .tutor-section heading(s) rendered but no "
                "sidecar was emitted — Tutor would fall back to DOM text (formulas lost) here"
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
