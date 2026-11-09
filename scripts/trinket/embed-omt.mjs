#!/usr/bin/env node
/**
 * Embed the archived trinkets in the Open Music Theory ebook (ebooks/omt/*.md).
 *
 * Each `🖥 [Trinket …](https://trinket.io/embed/music/<id>)` line becomes
 *
 *     <!-- trinket: https://trinket.io/embed/music/<id> -->
 *     <div class="omt-trinket" data-trinket="<id>"><iframe …></iframe><a …>全屏打开 ↗</a></div>
 *
 * The original link survives only as the comment, which is also what re-runs match on.
 * Inline links to a trinket (`[here](https://trinket.io/music/<id>)`) are pointed at the
 * static page. Trinkets with no archived data keep a short note instead.
 *
 *   node scripts/trinket/embed-omt.mjs [--check]
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const book = path.resolve(here, '../../ebooks/omt');
const check = process.argv.includes('--check');
const data = JSON.parse(fs.readFileSync(path.join(here, 'trinkets.json'), 'utf8'));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);

// ebooks/omt/<page>.md is served at ebooks/omt/<page>/ (use_directory_urls), so the static
// player is three levels up from the page URL.
const PLAYER = '../../../static/trinket/';
const TRINKET_URL = /https?:\/\/trinket\.io\/(?:embed\/)?music\/([0-9a-f]{10})/;

const block = (url, id) => {
	const rec = data[id];
	const head = `<!-- trinket: ${url} -->`;
	if (!rec) return `${head}\n<p class="omt-trinket-missing">（原交互式乐谱 trinket <code>${id}</code> 随 trinket.io 关闭而失效，未找到存档。）</p>`;
	const src = `${PLAYER}#${id}`;
	return `${head}\n<div class="omt-trinket" data-trinket="${id}">` +
		`<iframe src="${src}" title="${esc(rec.name)}" loading="lazy" allow="clipboard-write; fullscreen" allowfullscreen></iframe>` +
		(rec.reconstructed ? '<span class="omt-trinket-note">原 trinket 未存档，此曲谱据上下文与录音重建</span>' : '') +
		`<a class="omt-trinket-open" href="${src}" target="_blank" rel="noopener">全屏打开 ↗</a></div>`;
};

// generated blocks (re-run) and the original link lines (first run)
const GENERATED = /<!-- trinket: (\S+) -->\n(?:<div class="omt-trinket"[^\n]*<\/div>|<p class="omt-trinket-missing">[^\n]*<\/p>)/g;
const LINK_LINE = new RegExp(`^🖥 \\[[^\\]]*\\]\\((${TRINKET_URL.source})\\)\\s*$`, 'gm');
const INLINE = /\[([^\]]+)\]\((https?:\/\/trinket\.io\/(?:embed\/)?music\/([0-9a-f]{10}))\)/g;

const report = {embedded: 0, missing: [], inline: 0, changed: []};
for (const name of fs.readdirSync(book).filter(f => f.endsWith('.md')).sort()) {
	const file = path.join(book, name);
	const before = fs.readFileSync(file, 'utf8');
	let text = before.replace(GENERATED, (all, url) => block(url, TRINKET_URL.exec(url)[1]));
	text = text.replace(LINK_LINE, (all, url, id) => block(url, id));
	// inline links: undo a previous run's rewrite first, so a trinket recovered later gets its link
	const U = '(https?:\\/\\/trinket\\.io\\/(?:embed\\/)?music\\/[0-9a-f]{10})';
	text = text.replace(new RegExp(`<a class="omt-trinket-link" href="[^"]*" target="_blank" rel="noopener">([^<]*)<\\/a><!-- trinket: ${U} -->`, 'g'), '[$1]($2)');
	text = text.replace(new RegExp(`<span class="omt-trinket-gone">([^<]*)<\\/span><!-- trinket: ${U}（未找到存档） -->`, 'g'), '[$1]($2)');
	text = text.replace(INLINE, (all, label, url, id) => {
		report.inline++;
		// raw <a>: MkDocs would try to validate a Markdown link to a non-page path
		return data[id] ? `<a class="omt-trinket-link" href="${PLAYER}#${id}" target="_blank" rel="noopener">${label}</a><!-- trinket: ${url} -->`
			: `<span class="omt-trinket-gone">${label}</span><!-- trinket: ${url}（未找到存档） -->`;
	});
	for (const m of text.matchAll(/<!-- trinket: (https?:\/\/trinket\.io\/[^\s（]+)/g)) {
		const id = TRINKET_URL.exec(m[1])?.[1];
		if (id && !data[id]) report.missing.push(`${name}: ${id}`);
		else if (id) report.embedded++;
	}
	if (text !== before) {
		report.changed.push(name);
		if (!check) fs.writeFileSync(file, text);
	}
}
console.log(`trinket embeds: ${report.embedded} archived, ${report.missing.length} missing, ${report.inline} inline links; ` +
	`${report.changed.length} pages ${check ? 'stale' : 'updated'}`);
if (report.missing.length) console.log('  no archive: ' + report.missing.join(', '));
if (check && report.changed.length) process.exit(1);
