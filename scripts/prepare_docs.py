#!/usr/bin/env python3
"""
Prepare docs directory for MkDocs build.
- Copies lecture content into docs/lectures/
- Generates docs/index.md with a listing of all lectures
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
