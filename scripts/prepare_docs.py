#!/usr/bin/env python3
"""
Prepare docs directory for MkDocs build.
- Copies lecture content into docs/lectures/
- Generates docs/index.md with a listing of all lectures
- Preprocesses math formulas for reliable MathJax rendering
- Updates the nav section in mkdocs.yml (preserving other config)
"""

import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
LECTURES_SRC = ROOT / "lectures"
DOCS_DIR = ROOT / "docs"
DOCS_LECTURES = DOCS_DIR / "lectures"


def extract_title(md_path: Path) -> str:
    """Extract the H1 title from a lecture_notes.md file."""
    try:
        with open(md_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("# "):
                    return line[2:].strip()
    except Exception:
        pass
    return md_path.parent.name


def extract_video_url(md_path: Path) -> str:
    """Extract the YouTube video URL from the metadata line."""
    try:
        with open(md_path, "r", encoding="utf-8") as f:
            content = f.read(2000)
            match = re.search(r'https://youtu\.be/[\w-]+', content)
            if match:
                return match.group(0)
            match = re.search(r'https://www\.youtube\.com/watch\?v=[\w-]+', content)
            if match:
                return match.group(0)
    except Exception:
        pass
    return ""


def get_video_id(dirname: str) -> str:
    """Extract video ID from directory name like yt-mG3KzhwXS1k."""
    if dirname.startswith("yt-"):
        return dirname[3:]
    return dirname


def _escape_pipe_in_math(line: str) -> str:
    """Escape | as \\| inside $...$ inline math within markdown table rows.

    In markdown tables, | is the cell delimiter. When inline math like $|G\\rangle$
    appears in a table cell, the | gets parsed as a cell boundary, breaking the formula.
    Only escapes bare | (not already-escaped \\|).
    """
    if not line.lstrip().startswith('|'):
        return line  # not a table row

    # Find all $...$ (inline math) spans and escape | inside them
    parts = []
    pos = 0
    text = line
    while pos < len(text):
        # Find next $ that isn't \$
        dollar = text.find('$', pos)
        if dollar == -1:
            parts.append(text[pos:])
            break
        if dollar > 0 and text[dollar - 1] == '\\':
            parts.append(text[pos:dollar + 1])
            pos = dollar + 1
            continue
        # Check for $$ (skip display math delimiters)
        if dollar + 1 < len(text) and text[dollar + 1] == '$':
            parts.append(text[pos:dollar + 2])
            pos = dollar + 2
            continue
        # Found opening $, find closing $
        close = text.find('$', dollar + 1)
        if close == -1:
            parts.append(text[pos:])
            break
        # Extract math content and escape bare | (not already \|)
        parts.append(text[pos:dollar])  # text before $
        math_content = text[dollar + 1:close]
        # Use regex to escape | that isn't preceded by \
        escaped_math = re.sub(r'(?<!\\)\|', r'\\|', math_content)
        parts.append(f'${escaped_math}$')
        pos = close + 1

    return ''.join(parts)


def preprocess_math(content: str) -> str:
    """Preprocess math blocks for reliable arithmatex rendering.

    pymdownx.arithmatex in generic mode sometimes fails to recognize $$ display
    math when it is indented (e.g. inside list items) or lacks blank lines around
    it. The \\[...\\] delimiters are handled much more reliably.

    This function handles:
    1. Single-line $$...$$ on its own line (possibly indented) → \\[...\\] or \\(...\\)
    2. Multi-line $$ blocks (opening/closing $$ on separate lines) → \\[...\\]
    3. Multi-line $$ where opening $$ has content → \\[...\\]
    4. Inline $$...$$ (text before/after on the same line) → \\(...\\)
    5. | inside $...$ in markdown table rows → escaped \\|
    """
    lines = content.split('\n')
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Pattern 1: Single-line display math $$...$$ on its own line
        single_line_match = re.match(r'^(\s*)\$\$(.+)\$\$\s*$', line)
        if single_line_match:
            indent = single_line_match.group(1)
            formula = single_line_match.group(2).strip()

            if indent:
                # Indented (inside list items) - use inline math to stay within list
                result.append(f'{indent}\\({formula}\\)')
            else:
                # Non-indented - use \[...\] with blank lines for display math
                if result and result[-1].strip() != '':
                    result.append('')
                result.append(f'\\[{formula}\\]')
                if i + 1 < len(lines) and lines[i + 1].strip() != '':
                    result.append('')
            i += 1
            continue

        # Pattern 2a: Multi-line display math block ($$ alone on its own line)
        open_match = re.match(r'^(\s*)\$\$\s*$', line)
        if open_match:
            indent = open_match.group(1)
            math_lines = []
            j = i + 1
            found_close = False
            while j < len(lines):
                close_match = re.match(r'^\s*\$\$\s*$', lines[j])
                if close_match:
                    found_close = True
                    break
                math_lines.append(lines[j])
                j += 1

            if found_close:
                math_content = ' '.join(ml.strip() for ml in math_lines)
                if indent:
                    result.append(f'{indent}\\({math_content}\\)')
                else:
                    if result and result[-1].strip() != '':
                        result.append('')
                    result.append(f'\\[')
                    result.extend(math_lines)
                    result.append(f'\\]')
                    if j + 1 < len(lines) and lines[j + 1].strip() != '':
                        result.append('')
                i = j + 1
                continue
            result.append(line)
            i += 1
            continue

        # Pattern 2b: Multi-line $$ with content on opening line
        # e.g., $$\frac{...  (content continues on next lines until $$)
        # Limit search to 20 lines and stop at blank lines to avoid runaway matching
        open_content_match = re.match(r'^(\s*)\$\$(.+)$', line)
        if open_content_match and not line.rstrip().endswith('$$'):
            indent = open_content_match.group(1)
            first_content = open_content_match.group(2)
            math_lines = [first_content]
            j = i + 1
            found_close = False
            max_search = min(j + 20, len(lines))
            while j < max_search:
                # Stop at blank lines (unclosed $$ shouldn't span across paragraphs)
                if lines[j].strip() == '':
                    break
                # Check for closing $$ at end of line
                if lines[j].rstrip().endswith('$$'):
                    # Content before closing $$
                    close_content = lines[j].rstrip()[:-2]
                    if close_content.strip():
                        math_lines.append(close_content)
                    found_close = True
                    break
                # Check for $$ alone on its own line
                close_match = re.match(r'^\s*\$\$\s*$', lines[j])
                if close_match:
                    found_close = True
                    break
                math_lines.append(lines[j])
                j += 1

            if found_close:
                if indent:
                    math_content = ' '.join(ml.strip() for ml in math_lines)
                    result.append(f'{indent}\\({math_content}\\)')
                else:
                    if result and result[-1].strip() != '':
                        result.append('')
                    result.append(f'\\[')
                    result.extend(math_lines)
                    result.append(f'\\]')
                    if j + 1 < len(lines) and lines[j + 1].strip() != '':
                        result.append('')
                i = j + 1
                continue
            # If no closing found, it's a broken/unclosed $$
            # Convert to inline math to prevent bleeding
            remaining = open_content_match.group(2).rstrip()
            result.append(f'{indent}\\({remaining}\\)')
            i += 1
            continue

        # Pattern 3: Inline $$...$$ mixed with other text on the same line
        if '$$' in stripped and not stripped.startswith('$$'):
            line = re.sub(r'\$\$(.+?)\$\$', r'\\(\1\\)', line)
            result.append(line)
            i += 1
            continue

        # Pattern 4: Escape | inside $...$ in table rows
        if stripped.startswith('|') and '$' in stripped:
            line = _escape_pipe_in_math(line)

        result.append(line)
        i += 1

    return '\n'.join(result)


def preprocess_docs_math(docs_dir: Path):
    """Apply math preprocessing to all markdown files in docs directory."""
    count = 0
    for md_file in docs_dir.rglob('*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            original = f.read()
        processed = preprocess_math(original)
        if processed != original:
            with open(md_file, 'w', encoding='utf-8') as f:
                f.write(processed)
            count += 1
            print(f"  Preprocessed math in {md_file.relative_to(docs_dir.parent)}")
    return count


def main():
    # Clean and recreate docs/lectures
    if DOCS_LECTURES.exists():
        shutil.rmtree(DOCS_LECTURES)
    DOCS_LECTURES.mkdir(parents=True, exist_ok=True)

    # Find all lecture directories
    lectures = []
    if LECTURES_SRC.exists():
        for entry in sorted(LECTURES_SRC.iterdir()):
            if entry.is_dir():
                md_file = entry / "lecture_notes.md"
                if md_file.exists():
                    title = extract_title(md_file)
                    video_url = extract_video_url(md_file)
                    video_id = get_video_id(entry.name)
                    lectures.append({
                        "dir_name": entry.name,
                        "title": title,
                        "video_url": video_url,
                        "video_id": video_id,
                    })

    # Copy each lecture directory into docs/lectures/
    for lec in lectures:
        src = LECTURES_SRC / lec["dir_name"]
        dst = DOCS_LECTURES / lec["dir_name"]
        shutil.copytree(src, dst, dirs_exist_ok=True)
        print(f"  Copied {src.name} -> docs/lectures/{lec['dir_name']}")

    # Preprocess math formulas in copied docs for reliable rendering
    processed = preprocess_docs_math(DOCS_DIR)
    if processed:
        print(f"  Math preprocessing applied to {processed} file(s)")

    # Generate index.md
    index_lines = [
        "# 📚 课程注解",
        "",
        "> 自动生成的课程笔记与深度解析，包含视频字幕整理、关键帧截图和 AI 注解。",
        "",
        "---",
        "",
        "## 课程列表",
        "",
    ]

    if not lectures:
        index_lines.append("*暂无课程内容。*")
    else:
        for i, lec in enumerate(lectures, 1):
            title = lec["title"]
            dir_name = lec["dir_name"]
            video_url = lec["video_url"]

            index_lines.append(f"### {i}. [{title}](lectures/{dir_name}/lecture_notes.md)")
            index_lines.append("")
            if video_url:
                index_lines.append(f"🎬 [原始视频]({video_url})")
                index_lines.append("")
            index_lines.append("---")
            index_lines.append("")

    index_lines.extend([
        "",
        "## 关于",
        "",
        "本站内容由 AI 自动生成，包括：",
        "",
        "- 📝 视频字幕的整理与分段",
        "- 🖼️ 关键帧的自动截取",
        "- 🤖 基于 LLM 的深度注解与解析",
        "",
        "所有数学公式使用 LaTeX 排版，支持行内公式（如 $E = mc^2$）和独立公式块。",
        "",
    ])

    index_md = DOCS_DIR / "index.md"
    with open(index_md, "w", encoding="utf-8") as f:
        f.write("\n".join(index_lines))

    print(f"Generated {index_md} with {len(lectures)} lectures")

    # Update nav section in mkdocs.yml by rewriting just the nav: block
    mkdocs_yml = ROOT / "mkdocs.yml"
    with open(mkdocs_yml, "r", encoding="utf-8") as f:
        content = f.read()

    # Build new nav block
    nav_lines = [
        "nav:",
        "  - 首页: index.md",
    ]

    if lectures:
        nav_lines.append("  - 课程:")
        for lec in lectures:
            nav_lines.append(f"    - {lec['title']}: lectures/{lec['dir_name']}/lecture_notes.md")

    new_nav = "\n".join(nav_lines) + "\n"

    # Replace existing nav section or append
    nav_pattern = re.compile(r'^nav:\n(?:  .*\n)*', re.MULTILINE)
    if nav_pattern.search(content):
        content = nav_pattern.sub(new_nav, content)
    else:
        content = content.rstrip() + "\n\n" + new_nav

    with open(mkdocs_yml, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Updated {mkdocs_yml} with nav config")


if __name__ == "__main__":
    main()
