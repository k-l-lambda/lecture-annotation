#!/usr/bin/env python3
"""Append ``{ .tutor-section }`` marks to tutorable headings in markdown sources.

The mark declares "this heading starts a section a Tutor session can be scoped to".
It is consumed by ``prepare_docs.py`` (to emit ``<basename>.tutor-sections.json``)
and by the frontend (``:is(h2,h3).tutor-section > a.headerlink`` becomes the entry
button). An unmarked heading is not a section at all -- see
``design.local/tutor/content-marking.md``.

The script is a no-op by default: it prints a diff and only writes with --apply.
It is idempotent -- running it twice marks nothing the second time.

What counts as a real section (ebook chapters):

  ## 27.1 动力学演化的时间对称性        -> marked   (numbered section)
  ### 32.1 正则量子引力                 -> marked   (same, mis-levelled as h3)
  ## 注释 / ## 注 释                     -> skipped  (endnotes container)
  ### §27.2 / ## § 25.3                  -> skipped  (per-section endnotes)
  ## 第二章 古代定理和现代问题           -> skipped  (running chapter title)
  ## 通向实在之路 / ## 第二十五章         -> skipped  (running book/chapter title)
  # 大爆炸及其热力学传奇                 -> skipped  (h1: page title, not a section)

And in lecture notes (``content-marking.md`` §6):

  ## 段落 1：庞加莱群的定义 { #段落-1 }  -> marked   (the 段落 unit)
  ## 段落 3                              -> marked   (same, untitled variant)
  ## 一、板书/PPT截图内容描述             -> skipped  (absorbed into the 段落 above
                                                     it by extent rule 2, §3)
  ## 目录                                -> skipped  (navigation)

The two corpora share this script because the *decision* differs but the edit does
not: both insert ` .tutor-section` into an existing or new attr_list block.

Which rule applies is chosen **per page**, not per heading, and that is load-bearing.
A page carrying any `段落 N` heading is a lecture page, and on such a page the numbered
rule is switched off entirely: lecture notes number their analysis subsections
(`## 2.1 为什么两点函数里会有 Z？`, `### 3.2 时空间隔的三种类型`) in the same `\\d+\\.\\d+`
form an ebook uses for real sections. Marking one would not merely add a spurious
entry -- by extent rule 2 (`content-marking.md` §3) a section ends at the next *marked*
heading at any level, so a marked subsection truncates the 段落 that contains it. On
one page (`yt-_2G-v6mio3g`) that was 233 false marks against 5 real ones.

Usage:
    scripts/mark_tutor_sections.py ebooks/The_Road_to_Reality
    scripts/mark_tutor_sections.py ebooks/The_Road_to_Reality --apply
    scripts/mark_tutor_sections.py lectures --apply
    scripts/mark_tutor_sections.py ebooks/**/chapter_27.md --show-skipped
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

MARK = ".tutor-section"

# Heading line: capture level, text, and any trailing attr_list block.
HEADING_RE = re.compile(r"^(?P<hashes>#{1,6})[ \t]+(?P<text>.*?)[ \t]*$")

# A trailing attr_list block, e.g. `{ #段落-1 .tutor-section }`. Deliberately
# conservative: it must contain an attr_list sigil and no backslash, so a heading
# ending in LaTeX such as `$\frac{1}{2}$` is never mistaken for one.
ATTR_RE = re.compile(r"(?P<body>\{[^{}\\]*\})[ \t]*$")

# A numbered section: `27.1 …`, `27.10　…`, optionally `27.1. …`.
NUMBERED_RE = re.compile(r"^\d+\.\d+[.．]?(?:[ \t　]|$)")

# A lecture 段落 unit: `段落 1：…`, or bare `段落 3` where the generator had no
# title to give it. `段落` alone is not enough -- the number is what distinguishes
# the unit heading from prose that happens to mention 段落.
PARAGRAPH_RE = re.compile(r"^段落[ \t　]*\d+(?:[:：.．][ \t　]*\S|[ \t　]*$)")

# Endnote headings: `§27.2`, `§ 25.3`, `注释`, `注 释`, `注　释`.
NOTES_RE = re.compile(r"^(?:§|注[ \t　]*释)")

# Running titles repeated mid-chapter by the OCR/layout of the source book:
# `第二章 古代定理和现代问题`, `第二十五章`, `通向实在之路`.
RUNNING_TITLE_RE = re.compile(r"^(?:第[一二三四五六七八九十百零〇\d]+章|通向实在之路)")

MARKABLE_LEVELS = (2, 3)


def strip_attrs(text: str) -> tuple[str, str | None]:
    """Split heading text into (visible text, attr_list body or None)."""
    m = ATTR_RE.search(text)
    if not m:
        return text, None
    return text[: m.start()].rstrip(), m.group("body")


def is_lecture_page(markdown: str) -> bool:
    """True if this page's sections are 段落 units rather than numbered sections.

    Detected from content, not from the path, so a lecture page living anywhere
    (`lectures/<id>/index.md` is one) is classified the same way. See the module
    docstring for why the two rules must not both apply to one page.
    """
    for line in markdown.split("\n"):
        m = HEADING_RE.match(line)
        if not m:
            continue
        text, _ = strip_attrs(m.group("text"))
        if len(m.group("hashes")) in MARKABLE_LEVELS and PARAGRAPH_RE.match(text):
            return True
    return False


def classify(level: int, text: str, lecture: bool) -> tuple[bool, str]:
    """Return (should_mark, reason)."""
    if level not in MARKABLE_LEVELS:
        return False, f"h{level}: not a section heading"
    if NOTES_RE.match(text):
        return False, "endnotes"
    if RUNNING_TITLE_RE.match(text):
        return False, "running title"
    if lecture:
        if PARAGRAPH_RE.match(text):
            return True, "lecture 段落"
        # Everything else on a lecture page is analysis, absorbed by extent rule 2.
        return False, "absorbed into the 段落 above it"
    if NUMBERED_RE.match(text):
        return True, "numbered section"
    return False, "unnumbered"


def add_mark(attrs: str | None) -> str:
    """Produce the attr_list block carrying the mark, preserving existing attrs."""
    if attrs is None:
        return "{ " + MARK + " }"
    inner = attrs[1:-1].strip()
    if not inner:
        return "{ " + MARK + " }"
    return "{ " + inner + " " + MARK + " }"


def label(path: Path) -> str:
    """A path short enough to read but unique across the corpus.

    Every lecture file is named `lecture_notes.md`, so `path.name` would attribute
    all 45 files' diffs to the same label. The parent directory is the video id,
    which is the part that identifies the lecture.
    """
    return f"{path.parent.name}/{path.name}" if path.parent.name else path.name


def process_file(path: Path, show_skipped: bool) -> tuple[list[str], int, int, list[str]]:
    """Return (new_lines, marked_count, already_count, report_lines)."""
    original = path.read_text(encoding="utf-8")
    lines = original.splitlines(keepends=True)
    out: list[str] = []
    marked = already = 0
    report: list[str] = []
    in_fence = False
    # Decided once for the whole page, before marking anything.
    lecture = is_lecture_page(original)

    for lineno, line in enumerate(lines, 1):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            out.append(line)
            continue
        m = None if in_fence else HEADING_RE.match(line.rstrip("\n"))
        if not m:
            out.append(line)
            continue

        level = len(m.group("hashes"))
        text, attrs = strip_attrs(m.group("text"))
        should, reason = classify(level, text, lecture)

        if attrs and MARK in attrs:
            already += 1
            out.append(line)
            continue
        if not should:
            if show_skipped and level in MARKABLE_LEVELS:
                report.append(f"  skip  {label(path)}:{lineno}  h{level} {text}  ({reason})")
            out.append(line)
            continue

        newline = "\n" if line.endswith("\n") else ""
        rebuilt = f"{m.group('hashes')} {text} {add_mark(attrs)}{newline}"
        out.append(rebuilt)
        marked += 1
        report.append(f"  mark  {label(path)}:{lineno}  h{level} {text}")

    return out, marked, already, report


def collect(targets: list[str]) -> list[Path]:
    files: list[Path] = []
    for t in targets:
        p = Path(t)
        if p.is_dir():
            # Recursive: ebook chapters sit directly in the directory, but lecture
            # notes are one level down (`lectures/<video-id>/lecture_notes.md`), so a
            # non-recursive glob would silently report "nothing to do" for `lectures`.
            files.extend(sorted(p.rglob("*.md")))
        elif p.is_file():
            files.append(p)
        else:
            print(f"warning: no such path: {t}", file=sys.stderr)
    return files


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("targets", nargs="+", help="markdown files or directories")
    ap.add_argument("--apply", action="store_true", help="write changes (default: dry run)")
    ap.add_argument("--show-skipped", action="store_true",
                    help="also list h2/h3 headings that were left unmarked")
    ap.add_argument("--quiet", action="store_true", help="per-file summary only")
    args = ap.parse_args()

    files = collect(args.targets)
    if not files:
        print("nothing to do", file=sys.stderr)
        return 1

    total_marked = total_already = touched = 0
    for path in files:
        out, marked, already, report = process_file(path, args.show_skipped)
        total_marked += marked
        total_already += already
        if marked:
            touched += 1
        state = []
        if marked:
            state.append(f"{marked} marked")
        if already:
            state.append(f"{already} already")
        if not state:
            state.append("no tutorable heading")
        print(f"{label(path)}: {', '.join(state)}")
        if report and not args.quiet:
            print("\n".join(report))
        if marked and args.apply:
            path.write_text("".join(out), encoding="utf-8")

    verb = "marked" if args.apply else "would mark"
    print(f"\n{verb} {total_marked} heading(s) in {touched} file(s); "
          f"{total_already} already marked")
    if total_marked and not args.apply:
        print("dry run -- pass --apply to write")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
