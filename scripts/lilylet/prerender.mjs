#!/usr/bin/env node
/**
 * Bridge @k-l-lambda/lilylet-markdown (a markdown-it plugin) into the MkDocs build.
 *
 * MkDocs renders with Python-Markdown, which cannot run a markdown-it plugin. So after
 * `prepare_docs.py` has copied the ebooks into docs/, this script rewrites every
 * ```lyl / ```lilylet fence (optionally `.play`) in docs/**.md into the plugin's own
 * HTML: <div class="lilylet-container" data-lilylet data-mei="…">. Python-Markdown
 * passes that block through untouched, and docs/javascripts/lilylet/player.js engraves
 * the embedded MEI with Verovio in the browser (and plays it for `.play` fences).
 *
 * Only docs/ (the generated copy) is rewritten; the ebook sources keep readable fences.
 *
 * Usage: node prerender.mjs <docs-dir> [--strict]
 *   --strict  exit 1 if any score fails to parse (CI uses this).
 */
import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import lilyletPlugin, { prerender } from "@k-l-lambda/lilylet-markdown";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const root = path.resolve(args.find((a) => !a.startsWith("--")) || "docs");

const md = new MarkdownIt({ html: true });
md.use(lilyletPlugin);

// A fence at column 0: ```lyl, ```lilylet, ```lyl.play, ```lilylet.play.
const FENCE = /^(`{3,}|~{3,})[ \t]*((?:lyl|lilylet)(?:\.play)?)[ \t]*\n([\s\S]*?)^\1[ \t]*$/gm;

const walk = (dir, out = []) => {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walk(p, out);
		else if (ent.name.endsWith(".md")) out.push(p);
	}
	return out;
};

let files = 0, scores = 0;
const failures = [];

for (const file of walk(root)) {
	const text = fs.readFileSync(file, "utf8");
	if (!/^(?:`{3,}|~{3,})[ \t]*(?:lyl|lilylet)/m.test(text)) continue;
	const blocks = [];
	for (const m of text.matchAll(FENCE)) blocks.push(m);
	if (!blocks.length) continue;

	// prerender() parses every fence in the document and caches the MEI; md.render()
	// of a single fence then emits the finished container.
	await prerender(md, text);

	let out = "", last = 0;
	for (const m of blocks) {
		const [whole, , info, code] = m;
		let html = md.render("```" + info + "\n" + code + "```\n").trim();
		if (html.includes("lilylet-error")) {
			const line = text.slice(0, m.index).split("\n").length;
			failures.push(`${path.relative(root, file)}:${line}`);
		}
		// Python-Markdown ends a raw HTML block at a blank line, and data-mei / data-source
		// hold multi-line text: keep the whole container on one line.
		html = html.replace(/\r?\n/g, "&#10;");
		out += text.slice(last, m.index) + "\n" + html + "\n";
		last = m.index + whole.length;
		scores++;
	}
	out += text.slice(last);
	fs.writeFileSync(file, out);
	files++;
}

console.log(`lilylet prerender: ${scores} scores in ${files} files under ${path.relative(process.cwd(), root) || "."}`);
if (failures.length) {
	console.error(`lilylet prerender: ${failures.length} score(s) failed to parse:\n  ` + failures.join("\n  "));
	if (strict) process.exit(1);
}
