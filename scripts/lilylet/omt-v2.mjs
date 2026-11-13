#!/usr/bin/env node
/**
 * Open Music Theory, 2nd edition, Chinese ebook (ebooks/omt-v2), built from the Markdown
 * conversion in an openmusictheory-lilylet checkout (branch v2, directory v2/).
 *
 *   node scripts/lilylet/omt-v2.mjs prep [--omt ../openmusictheory-lilylet] [--out /tmp/omt-v2-src]
 *   node scripts/lilylet/omt-v2.mjs sync [--omt …] [--check]
 *
 * prep  writes the English sources the translators work from (same part/file layout):
 *       - every lilylet block of v2/ becomes one placeholder line `<!-- lilylet: KEY -->`
 *         (KEY = the media path the block belongs to), so no music passes through a
 *         translator;
 *       - links to MuseScore files (.mscz/.mscx/.mxl) are dropped: the book shows the
 *         playable lilylet score instead;
 *       - a heading that some link points at (`…#assignments`) gets `{#assignments}`, so
 *         the anchor survives translation.
 *
 * sync  fills the translated chapters in ebooks/omt-v2:
 *       - each placeholder (or an earlier block) becomes the playable score(s):
 *           <!-- lilylet-begin: KEY -->  ```lyl.play … ```  <!-- lilylet-end -->
 *         taken from v2/lilylet (inline in v2/ or only linked there, e.g. long scores);
 *         the 48 WTC fugue subjects become one labelled score each;
 *       - after every block that links a YouTube/Vimeo video, a video embed
 *         (<!-- video-begin: URL --> … <!-- video-end -->);
 *       - copies every ../media/… file the chapters reference (images, audio).
 *       Idempotent; --check reports what would change and exits 1 if anything is stale.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const book = path.join(repo, 'ebooks/omt-v2');
const argv = process.argv.slice(2);
const mode = argv[0];
const opt = (name, def) => {const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : def;};
const omt = path.resolve(opt('--omt', process.env.OMT_REPO || path.join(repo, '../openmusictheory-lilylet')));
const v2 = path.join(omt, 'v2');
const check = argv.includes('--check');

const PART = /^\d\d-[a-z0-9-]+$/;
const chapters = () => fs.readdirSync(v2).filter(d => PART.test(d) && fs.statSync(path.join(v2, d)).isDirectory())
	.flatMap(d => fs.readdirSync(path.join(v2, d)).filter(f => f.endsWith('.md')).map(f => `${d}/${f}`)).sort();

const BLOCK = /^([ \t]*)<!-- lilylet-begin: (\S+) -->\n[\s\S]*?^[ \t]*<!-- lilylet-end -->[ \t]*$/gm;
const MUSESCORE = /\.(?:mscz|mscx|mxl)$/i;

/** Drop links to MuseScore files and the separators around them. */
const dropMusescoreLinks = s => {
	let out = s.replace(/(\s*(?:,|\band\b|\bor\b)\s*)?\.?\[[^\]]*\]\(([^)\s]+)\)/g, (all, sep, url) => MUSESCORE.test(url) ? '' : all);
	if (out === s) return s;
	return out.replace(/\(\s*,\s*/g, '(').replace(/\(\s*\)/g, '').replace(/[ \t]+([,;)])/g, '$1');
};

const slug = t => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[*_`[\]()]/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');

if (mode === 'prep') {
	const out = path.resolve(opt('--out', '/tmp/omt-v2-src'));
	const files = chapters();
	const targets = new Set();
	for (const f of files) for (const m of fs.readFileSync(path.join(v2, f), 'utf8').matchAll(/\]\([^)\s]*#([^)\s]+)\)/g)) targets.add(decodeURIComponent(m[1]));
	const sizes = [];
	for (const f of files) {
		let s = fs.readFileSync(path.join(v2, f), 'utf8');
		s = s.replace(BLOCK, (_, ind, key) => `${ind}<!-- lilylet: ${key} -->`);
		s = s.split('\n').map(line => {
			if (/<!-- lilylet: /.test(line)) return line;
			const h = line.match(/^(#{1,6})\s+(.+?)\s*$/);
			if (h && !/\{#/.test(h[2])) {
				const id = slug(h[2]);
				if (targets.has(id)) return `${h[1]} ${h[2]} {#${id}}`;
			}
			return dropMusescoreLinks(line);
		}).join('\n');
		fs.mkdirSync(path.dirname(path.join(out, f)), {recursive: true});
		fs.writeFileSync(path.join(out, f), s);
		sizes.push([f, s.length]);
	}
	fs.writeFileSync(path.join(out, 'sizes.json'), JSON.stringify(sizes, null, 0));
	console.log(`prep: ${files.length} chapters → ${out}; ${sizes.reduce((a, [, n]) => a + n, 0)} chars`);
	process.exit(0);
}

if (mode !== 'sync') { console.error('usage: omt-v2.mjs prep|sync'); process.exit(2); }

// ---- scores per KEY, from the blocks in v2/ ----
const stripHeader = c => c.replace(/^\[(?:title|subtitle)\s+"[^"]*"\]\s*\n/gm, '').trim();
const lylBlocks = text => [...text.matchAll(/^[ \t]*```[ \t]*(?:lyl|lilylet)[^\n]*\n([\s\S]*?)^[ \t]*```[ \t]*$/gm)].map(m => m[1]);
const dedent = c => {
	const lines = c.split('\n');
	const ind = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^[ \t]*/)[0].length));
	return lines.map(l => l.slice(ind)).join('\n');
};
const readLyl = rel => {
	const p = path.join(v2, rel);
	const t = fs.readFileSync(p, 'utf8');
	return p.endsWith('.md') ? lylBlocks(t).map(dedent) : [t];
};
const WTC_LABEL = l => l.replace(/^WTC (I+), Fugue (\d+) in (.+?), (BWV \d+): subject$/, (_, book, n, key, bwv) =>
	`《平均律钢琴曲集》第${book === 'I' ? '一' : '二'}卷 第 ${n} 首赋格（${key.replace(/ major$/, ' 大调').replace(/ minor$/, ' 小调')}，${bwv}）主题`);

// Python-Markdown continues a list item only at 4-space steps (a tab counts 4), so a
// block inside a list item is indented to the next multiple of 4, with blank lines
// around it; at column 0 it would end the list and restart the numbering.
const width = ind => [...ind].reduce((n, c) => c === '\t' ? n + 4 - n % 4 : n + 1, 0);
const listIndent = ind => ' '.repeat(Math.ceil(width(ind) / 4) * 4);
const indentBlock = (text, ind) => ind ? `\n${text.split('\n').map(l => l ? ind + l : l).join('\n')}\n` : text;

const scores = new Map();   // KEY -> [{label?, code}]
const srcIndent = new Map(); // `${file}\0${KEY}` -> indent of the block in v2
for (const f of chapters()) {
	const s = fs.readFileSync(path.join(v2, f), 'utf8');
	for (const m of s.matchAll(BLOCK)) {
		const key = m[2], body = m[0];
		if (!srcIndent.has(`${f}\0${key}`)) srcIndent.set(`${f}\0${key}`, m[1]);
		if (scores.has(key)) continue;
		const inline = lylBlocks(body).map(dedent);
		let list;
		if (inline.length) list = inline.map(code => ({code}));
		else {
			const items = [...body.matchAll(/^[ \t]*- \[([^\]]+)\]\(\.\.\/(lilylet\/[^)]+\.lyl)\)/gm)];
			if (items.length) list = items.map(it => ({label: WTC_LABEL(it[1]), code: readLyl(it[2])[0]}));
			else {
				const link = body.match(/\]\(\.\.\/(lilylet\/[^)]+\.(?:lyl|md))\)/);
				if (!link) { console.error(`no score for ${key} in ${f}`); continue; }
				list = readLyl(link[1]).map(code => ({code}));
			}
		}
		scores.set(key, list.map(x => ({...x, code: stripHeader(x.code)})).filter(x => x.code));
	}
}

// Chapters that list scores without saying which worksheet each one is: every score
// there gets its worksheet's file name as its label.
const LABEL_BY_FILE = new Set(['13-workbook/01-digital-workbook.md']);
const fileLabel = key => path.basename(key);

const renderScores = (key, ind = '', named = false) => {
	const list = scores.get(key);
	if (!list || !list.length) return null;
	const parts = [`<!-- lilylet-begin: ${key} -->`];
	for (const [i, {label: own, code}] of list.entries()) {
		const label = own || (named && i === 0 ? fileLabel(key) : null);
		if (label) parts.push(`**${label}**`, '');
		parts.push('```lyl.play', code, '```');
		if (label) parts.push('');
	}
	parts.push('<!-- lilylet-end -->');
	return indentBlock(parts.join('\n'), ind);
};

// ---- video embeds ----
const videoEmbed = url => {
	let u;
	try { u = new URL(url); } catch { return null; }
	const host = u.hostname.replace(/^www\.|^m\./, '');
	let src = null;
	if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
		const list = u.searchParams.get('list');
		const id = u.searchParams.get('v') || (u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{6,})/) || [])[1];
		if (id) src = `https://www.youtube-nocookie.com/embed/${id}`;
		else if (list) src = `https://www.youtube-nocookie.com/embed/videoseries?list=${list}`;
		const t = u.searchParams.get('t') || u.searchParams.get('start');
		if (src && t) { const sec = /^\d+$/.test(t) ? t : String((+(t.match(/(\d+)h/) || [0, 0])[1]) * 3600 + (+(t.match(/(\d+)m/) || [0, 0])[1]) * 60 + (+(t.match(/(\d+)s/) || [0, 0])[1])); src += `${src.includes('?') ? '&' : '?'}start=${sec}`; }
	} else if (host === 'youtu.be') {
		const id = u.pathname.slice(1).split('/')[0];
		if (id) src = `https://www.youtube-nocookie.com/embed/${id}`;
		const t = u.searchParams.get('t');
		if (src && t && /^\d+$/.test(t)) src += `?start=${t}`;
	} else if (host === 'vimeo.com' || host === 'player.vimeo.com') {
		const id = (u.pathname.match(/(\d{5,})/) || [])[1];
		if (id) src = `https://player.vimeo.com/video/${id}`;
	}
	if (!src) return null;
	return `<!-- video-begin: ${url} -->\n<div class="omt-video"><iframe src="${src}" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>\n<!-- video-end -->`;
};
const VIDEO_URL = /https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be|vimeo\.com)\/[^\s)<>"\]]+/g;
// Removes an earlier embed (video or score) with the blank / bare-`>` lines before it.
const OLD_VIDEO = /(?:\n[ \t]*>?[ \t]*)*\n[ \t]*(?:>[ \t]*)?<!-- (?:video|embed)-begin: [^>]*-->\n[\s\S]*?<!-- (?:video|embed)-end -->[ \t]*(?:\n[ \t]*>[ \t]*(?=\n))?(?=\n|$)/g;

// ---- MuseScore / Brian Jarvis embeds ----
// The 2nd edition embeds these as iframes; the v2 conversion turned each into a link
// line `🎼 [MuseScore score](…)` / `🖥 [Interactive notation (Brian Jarvis)](…)`. The
// iframe heights of the online edition are kept in omt-v2-embeds.json (from the
// Pressbooks API cache), keyed by the link target.
const EMBED_HEIGHT = JSON.parse(fs.readFileSync(path.join(here, 'omt-v2-embeds.json'), 'utf8'));
const EMBED_LINK = /(🎼|🖥) ?\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
const attr = v => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const scoreEmbed = (mark, raw) => {
	const url = raw.replace(/\\(.)/g, '$1');
	let src, kind, height = EMBED_HEIGHT[url];
	if (mark === '🎼' && /^https?:\/\/(?:www\.)?musescore\.com\/user\/\d+\/scores\/\d+(?:\/s\/[\w-]+)?$/.test(url)) {
		src = `${url}/embed`; kind = 'musescore'; height ??= 394;
	} else if (mark === '🖥' && /^https?:\/\/(?:www\.)?brianedwardjarvis\.com\//.test(url)) {
		src = url; kind = 'interactive'; height ??= 600;
	} else return null;
	return `<!-- embed-begin: ${url} -->\n<div class="omt-embed omt-embed-${kind}"><iframe src="${attr(src)}" title="${kind === 'musescore' ? 'MuseScore' : 'Brian Jarvis'}" loading="lazy" style="height: ${height}px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>\n<!-- embed-end -->`;
};

const addVideos = text => {
	const lines = text.replace(OLD_VIDEO, '\n').split('\n');
	const out = [];
	let fence = false, pending = [], ind = '', quote = '';
	const flush = () => {
		const blank = quote.trimEnd();
		for (const e of pending) out.push(blank, e.split('\n').map(l => quote + ind + l).join('\n'));
		if (pending.length) out.push(blank);
		pending = [];
	};
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (/^[ \t]*(```|~~~)/.test(line)) fence = !fence;
		out.push(line);
		if (fence || /^<!--/.test(line.trim())) continue;
		const found = [
			...(line.match(VIDEO_URL) || []).map(url => videoEmbed(url.replace(/[.,;]+$/, ''))),
			...[...line.matchAll(EMBED_LINK)].map(m => scoreEmbed(m[1], m[2])),
		];
		for (const e of found) {
			if (e && !pending.includes(e)) {
				if (!pending.length) {
					// inside a block quote the embed keeps the `>`; in a list item it is
					// indented to the item's content; a stray leading space is not a list
					const q = line.match(/^[ \t]*>[ \t]?/);
					quote = q ? '> ' : '';
					const body = q ? line.slice(q[0].length) : line;
					const item = body.match(/^([ \t]*)(?:[-*+]|\d+\.)\s/);
					const lead = body.match(/^[ \t]*/)[0];
					ind = item ? listIndent(item[1]) + '    ' : width(lead) >= 2 ? listIndent(lead) : '';
				}
				pending.push(e);
			}
		}
		// the embed goes after the paragraph / list item the link sits in
		const next = lines[i + 1];
		const endsBlock = next === undefined || /^[ \t]*>?[ \t]*$/.test(next) || /^\s*(>\s*)?([-*+]|\d+\.)\s/.test(next) || /^#/.test(next);
		if (pending.length && endsBlock) flush();
	}
	flush();
	return out.join('\n').replace(/\n{3,}/g, '\n\n');
};

// ---- fill the book ----
const PLACEHOLDER = /^([ \t]*)<!-- lilylet: (\S+) -->[ \t]*$/gm;
const FILLED = /^([ \t]*)<!-- lilylet-begin: (\S+) -->\n[\s\S]*?^[ \t]*<!-- lilylet-end -->[ \t]*$/gm;
let changed = 0, missing = 0, filled = 0, videos = 0, dropped = 0;
const embeds = {};
const media = new Set();
const bookFiles = fs.existsSync(book) ? chapters().filter(f => fs.existsSync(path.join(book, f))) : [];
// A translator may drop a placeholder line; the score is silent then, so report it.
const srcKeys = f => new Set([...fs.readFileSync(path.join(v2, f), 'utf8').matchAll(/^[ \t]*<!-- lilylet: (\S+) -->/gm)].map(m => m[1]));
for (const f of bookFiles) {
	const want = srcKeys(f), have = new Set([...fs.readFileSync(path.join(book, f), 'utf8')
		.matchAll(/^[ \t]*<!-- lilylet(?:-begin)?: (\S+) -->/gm)].map(m => m[1]));
	for (const k of want) if (!have.has(k)) { dropped++; console.error(`  ${f}: placeholder lost in translation: ${k}`); }
}
for (const f of bookFiles) {
	const p = path.join(book, f);
	const before = fs.readFileSync(p, 'utf8');
	const fill = (all, here, key) => {
		const ind = srcIndent.get(`${f}\0${key}`) ?? here;
		const r = renderScores(key, ind ? listIndent(ind) : '', LABEL_BY_FILE.has(f));
		if (!r) { missing++; console.error(`  ${f}: no score for ${key}`); return all; }
		filled++;
		return r;
	};
	let s = before.replace(FILLED, fill).replace(PLACEHOLDER, fill);
	s = addVideos(s);
	videos += (s.match(/<!-- video-begin:/g) || []).length;
	for (const m of s.matchAll(/<div class="omt-embed omt-embed-(\w+)"/g)) embeds[m[1]] = (embeds[m[1]] || 0) + 1;
	for (const m of s.matchAll(/\]\(\.\.\/(media\/[^)\s]+)\)/g)) if (!MUSESCORE.test(m[1])) media.add(decodeURIComponent(m[1]));
	if (s !== before) {
		changed++;
		if (check) console.log(`  stale: ${f}`);
		else fs.writeFileSync(p, s);
	}
}
let copied = 0, absent = 0;
for (const rel of media) {
	const src = path.join(v2, rel), dst = path.join(book, rel);
	if (!fs.existsSync(src)) { absent++; console.error(`  media missing in v2: ${rel}`); continue; }
	if (fs.existsSync(dst) && fs.statSync(dst).size === fs.statSync(src).size) continue;
	copied++;
	if (!check) { fs.mkdirSync(path.dirname(dst), {recursive: true}); fs.copyFileSync(src, dst); }
}
console.log(`sync: ${bookFiles.length} chapters, ${filled} score blocks, ${videos} videos, ${embeds.musescore || 0} MuseScore + ${embeds.interactive || 0} interactive embeds, ${changed} files ${check ? 'stale' : 'written'}; media ${media.size} referenced, ${copied} ${check ? 'to copy' : 'copied'}, ${absent} missing; ${missing} placeholders without a score; ${dropped} lost in translation`);
if (check && (changed || copied)) process.exit(1);
