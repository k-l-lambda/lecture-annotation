#!/usr/bin/env python3
"""Emit ``<basename>.tutor-sections.json`` beside every marked page.

This is how a browser-only agent gets the markdown at all: ``mkdocs build``
renders every page to HTML and copies no ``.md``, so the source has to be emitted
deliberately (``design.local/tutor/data-model.md`` §5). MkDocs copies unknown
file types through verbatim, so no plugin and no config change is needed.

**Called before ``preprocess_docs_math``**, and that ordering is load-bearing:
that function rewrites ``$$…$$`` to ``\\[…\\]`` in ``docs/`` in place, and the
harness's anchor gate, ``formulaCount`` and the section text the model reads were
all tuned against the source form. Emitting afterwards would hand the model a
notation no other shell ever sees.

The extent rule, the id rule and the transcript split mirror
``tutor/src/core/content.ts`` — the same rules, one in each language, because the
browser needs them at runtime too. ``check_tutor_sidecars.py`` compares the
result against the rendered HTML so the two cannot silently drift.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

MARK = ".tutor-section"

HEADING_RE = re.compile(r"^(?P<hashes>#{1,6})[ \t]+(?P<text>.*?)[ \t]*$")
# Conservative: an attr_list block contains no backslash, so a heading ending in
# LaTeX such as `$\frac{1}{2}$` is never mistaken for one.
ATTR_RE = re.compile(r"(?P<body>\{[^{}\\]*\})[ \t]*$")

TRANSCRIPT_RE = re.compile(r"<details>\s*<summary>\s*📝\s*原始字幕.*?</details>", re.S)

# Every Unicode space separator, notably U+3000 IDEOGRAPHIC SPACE which the
# corpus uses in headings like `27.2　亚微观成分`.
SPACE_CHARS = "                　"
SPACE_RE = re.compile(f"[{SPACE_CHARS}]")

# Punctuation + symbol ranges that toc's slugify strips. Mirrors the character
# class in content.ts slugify().
STRIP_RE = re.compile(
    r"[!-/:-@\[-`{-~ -⁯　-〿＀-￯]"
)

# A page over this loses its per-section annotation to truncation rather than
# shipping a sidecar that costs every reader bandwidth (data-model.md §5.2).
MAX_SIDECAR_BYTES = 200 * 1024

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+\.md#[^)]+)\)")


def normalize_heading_spaces(text: str) -> str:
    return SPACE_RE.sub(" ", text)


def slugify(text: str, seen: dict[str, int]) -> str:
    """Reproduce the id the built site carries (toc + pymdownx slugify(case=lower)).

    The subtlety is that ``toc`` normalises the heading text *before* slugifying,
    so an ideographic space becomes a regular space and then the separator:
    ``27.2　亚微观成分`` -> ``272-亚微观成分``. Calling pymdownx's slugify directly
    yields ``272亚微观成分`` instead, which would break every cross-chapter link
    to such a section.
    """
    base = normalize_heading_spaces(text)
    base = base.replace("$", "")
    base = STRIP_RE.sub("", base)
    base = re.sub(r"\s+", "-", base.strip()).lower()
    n = seen.get(base, 0)
    seen[base] = n + 1
    return base if n == 0 else f"{base}_{n}"


def parse_heading(line: str, lineno: int) -> dict | None:
    m = HEADING_RE.match(line)
    if not m:
        return None
    text = m.group("text")
    marked = False
    explicit_id = None
    attrs: dict[str, str] = {}

    am = ATTR_RE.search(text)
    if am:
        body = am.group("body")[1:-1].strip()
        text = text[: am.start()].strip()
        for token in body.split():
            if token == MARK:
                marked = True
            elif token.startswith("#"):
                explicit_id = token[1:]
            elif token.startswith("data-"):
                key, _, value = token.partition("=")
                attrs[key] = value.strip("\"'") if value else "true"

    return {
        "level": len(m.group("hashes")),
        "text": text,
        "line": lineno,
        "marked": marked,
        "explicit_id": explicit_id,
        "attrs": attrs,
    }


def js_length(text: str) -> int:
    """Length in UTF-16 code units, i.e. what JavaScript's ``String.length`` gives.

    Not the same as ``len(text)``: the corpus uses astral-plane mathematical script
    letters (``𝒢``, ``𝒮``), each of which is one Python code point but two UTF-16
    units. ``chars`` feeds the harness's context budget and is read by the browser,
    so it has to be the number the browser will compute — otherwise the sidecar and
    the DOM fallback disagree for 12 sections of this corpus.
    """
    return len(text.encode("utf-16-le")) // 2


def count_display_math(text: str) -> int:
    return len(re.findall(r"\$\$.+?\$\$", text, re.S)) + len(
        re.findall(r"\\\[.+?\\\]", text, re.S)
    )


def parse_marked_sections(markdown: str, page: str) -> list[dict]:
    """Split marked sections out of a document, in document order."""
    lines = markdown.split("\n")
    headings: list[dict] = []
    in_fence = False

    for i, line in enumerate(lines):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        h = parse_heading(line, i)
        if h:
            headings.append(h)

    # Ids are assigned over ALL headings, not only marked ones, because toc's
    # duplicate suffixes count every heading on the page.
    seen: dict[str, int] = {}
    ids = [h["explicit_id"] or slugify(h["text"], seen) for h in headings]

    sections: list[dict] = []
    for index, heading in enumerate(headings):
        if not heading["marked"]:
            continue

        # Extent: data-tutor-span, else the next marked heading, else the next
        # heading of the same or shallower level, else end of document.
        end_line = len(lines)
        end_id = None
        span = heading["attrs"].get("data-tutor-span")
        for j in range(index + 1, len(headings)):
            candidate = headings[j]
            if span:
                if ids[j] == span:
                    end_line, end_id = candidate["line"], ids[j]
                    break
                continue
            if candidate["marked"] or candidate["level"] <= heading["level"]:
                end_line, end_id = candidate["line"], ids[j]
                break

        body = "\n".join(lines[heading["line"] + 1 : end_line])
        transcripts = TRANSCRIPT_RE.findall(body)
        annotation = TRANSCRIPT_RE.sub("", body).strip()
        skip_transcript = heading["attrs"].get("data-tutor-skip-transcript") == "true"

        sub_headings = [
            {"id": ids[j], "heading": headings[j]["text"], "level": headings[j]["level"]}
            for j in range(index + 1, len(headings))
            if headings[j]["line"] < end_line and not headings[j]["marked"]
        ]

        id_source = (
            "explicit"
            if heading["explicit_id"]
            else ("slugify+suffix" if "_" in ids[index].rsplit("-", 1)[-1] else "slugify")
        )

        sections.append(
            {
                "id": ids[index],
                "idSource": id_source,
                "heading": heading["text"],
                "tutorTitle": heading["attrs"].get("data-tutor-title"),
                "level": heading["level"],
                "spanEndsAt": end_id,
                "hint": heading["attrs"].get("data-tutor-hint"),
                "chars": js_length(annotation),
                "annotation": annotation,
                "transcript": None if skip_transcript else ("\n\n".join(transcripts) or None),
                "subHeadings": sub_headings,
                "formulaCount": count_display_math(annotation),
                "links": [
                    {"text": t, "target": target} for t, target in LINK_RE.findall(annotation)
                ],
                "truncated": False,
            }
        )

    return sections


def _first_h1(markdown: str) -> str | None:
    for line in markdown.split("\n"):
        if line.startswith("# "):
            text, _ = (line[2:].strip(), None)
            am = ATTR_RE.search(text)
            return text[: am.start()].strip() if am else text
    return None


def _fit_budget(sections: list[dict]) -> None:
    """Truncate annotations until the payload fits, largest section first.

    ``truncated: true`` is what makes this honest downstream: ``content.js`` falls
    back to DOM text for such a section, and the ``analyze_section`` formula gate
    is relaxed for it, since the model cannot cover formulas it was never shown.
    """

    def size() -> int:
        return len(json.dumps(sections, ensure_ascii=False).encode("utf-8"))

    if size() <= MAX_SIDECAR_BYTES:
        return
    for section in sorted(sections, key=lambda s: -len(s["annotation"])):
        if size() <= MAX_SIDECAR_BYTES:
            break
        keep = max(2000, len(section["annotation"]) // 2)
        section["annotation"] = section["annotation"][:keep]
        section["truncated"] = True


def emit_for_page(md_path: Path, docs_dir: Path, site_url_prefix: str = "") -> dict | None:
    """Write the sidecar for one page. Returns a summary, or None if unmarked."""
    markdown = md_path.read_text(encoding="utf-8")
    rel = md_path.relative_to(docs_dir)
    page = str(rel.with_suffix("")).replace("\\", "/")

    sections = parse_marked_sections(markdown, page)
    # A page with no marked heading gets no sidecar file at all, and Tutor is
    # unavailable there. That is the intended way to opt a page out.
    if not sections:
        return None

    _fit_budget(sections)

    payload = {
        "page": page,
        "pageUrl": f"{site_url_prefix}/{page}/",
        "title": _first_h1(markdown) or md_path.stem,
        "kind": "lecture" if rel.parts and rel.parts[0] == "lectures" else "ebook",
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sections": sections,
    }

    out = md_path.with_suffix(".tutor-sections.json")
    out.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return {
        "page": page,
        "path": out,
        "sections": len(sections),
        "bytes": out.stat().st_size,
        "truncated": sum(1 for s in sections if s["truncated"]),
        "ids": [s["id"] for s in sections],
    }


def emit_all(docs_dir: Path, site_url_prefix: str = "") -> list[dict]:
    """Emit sidecars for every marked page under ``docs_dir``."""
    results = []
    for md_file in sorted(docs_dir.rglob("*.md")):
        summary = emit_for_page(md_file, docs_dir, site_url_prefix)
        if summary:
            results.append(summary)
    return results


if __name__ == "__main__":
    import argparse

    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("docs_dir", nargs="?", default="docs", type=Path)
    ap.add_argument("--url-prefix", default="/lecture-annotation")
    args = ap.parse_args()

    for r in emit_all(args.docs_dir, args.url_prefix):
        note = f", {r['truncated']} truncated" if r["truncated"] else ""
        print(f"{r['page']}: {r['sections']} sections, {r['bytes'] / 1024:.1f} kB{note}")
