#!/usr/bin/env node
/**
 * Sync the Open Music Theory ebook (ebooks/omt) with the lilylet transcriptions and
 * assets in a local openmusictheory-lilylet checkout. Run it by hand after the
 * transcriptions change; the site build does not need the OMT checkout.
 *
 *   node scripts/lilylet/sync-omt.mjs [--omt ../openmusictheory-lilylet] [--check]
 *
 * 1. Rebuilds the OMT image → lilylet map (omr-review/build.mjs → omr-review/data.js).
 * 2. After every image whose figure has a transcription, inserts a playable score:
 *        <!-- lilylet-begin: assets/x.png -->
 *        ```lyl.play
 *        …
 *        ```
 *        <!-- lilylet-end -->
 *    The score follows the image's caption line when one repeats the alt text.
 *    Existing blocks and `<!-- lilylet: … -->` placeholders are replaced, so re-runs are idempotent.
 * 3. Copies every referenced assets/… file from OMT's Graphics/ (and media/ for the
 *    schemata mp3s, whose openmusictheory.com links are made local).
 *
 * --check  report what would change and exit 1 if anything is stale; writes nothing.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const book = path.join(repo, 'ebooks/omt');
const argv = process.argv.slice(2);
const opt = (name, def) => {const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : def;};
const omt = path.resolve(opt('--omt', process.env.OMT_REPO || path.join(repo, '../openmusictheory-lilylet')));
const check = argv.includes('--check');

execFileSync(process.execPath, [path.join(omt, 'omr-review/build.mjs')], {cwd: omt, stdio: ['ignore', 'ignore', 'inherit']});
const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(omt, 'omr-review/data.js'), 'utf8'), sandbox);
const byImage = new Map();
for (const it of sandbox.window.OMR_REVIEW.items) if (it.lyl) byImage.set(it.image, it);

// lyl blocks of a source; a .md source (several scores, prose, KaTeX) contributes its ```lyl blocks only
const scoresOf = it => {
	const code = it.format === 'md'
		? [...it.code.matchAll(/^```[ \t]*(?:lyl|lilylet)[^\n]*\n([\s\S]*?)^```[ \t]*$/gm)].map(m => m[1])
		: [it.code];
	// the figure's caption is in the text already; Verovio's header is off anyway
	return code.map(c => c.replace(/^\[(?:title|subtitle)\s+"[^"]*"\]\s*\n/gm, '').trim()).filter(Boolean);
};
const findItem = assetPath => {
	const rel = 'Graphics/' + assetPath.replace(/^assets\//, '');
	if (byImage.has(rel)) return byImage.get(rel);
	const stem = rel.replace(/\.[a-z0-9]+$/i, '');
	for (const ext of ['.png', '.svg', '.jpg']) if (byImage.has(stem + ext)) return byImage.get(stem + ext);
	return null;
};

const IMAGE = /^!\[([^\]]*)\]\((assets\/[^)\s]+)\)\s*$/;
const BLOCK = /\n*<!-- lilylet-begin: [^>]*-->\n[\s\S]*?<!-- lilylet-end -->\n?/g;
const MARKER = /^<!-- lilylet: [^>]*-->\n?/gm;
const MEDIA = /https?:\/\/openmusictheory\.com\/media\/([^)\s"]+)/g;

const report = {pages: 0, scores: 0, figures: 0, changed: [], copied: 0, missing: new Set(), dirs: new Set()};
const assets = new Set();
const mediaDir = path.join(omt, 'media');
const mediaCase = new Map(); // case-insensitive lookup: links say Prinner4.mp3, file is prinner4.mp3
const walk = (d, out = []) => {for (const e of fs.readdirSync(d, {withFileTypes: true})) {const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : out.push(p);} return out;};
if (fs.existsSync(mediaDir)) for (const f of walk(mediaDir)) mediaCase.set(path.relative(mediaDir, f).toLowerCase(), path.relative(mediaDir, f));

for (const name of fs.readdirSync(book).filter(f => f.endsWith('.md') && f !== 'index.md').sort()) {
	const file = path.join(book, name);
	const before = fs.readFileSync(file, 'utf8');
	let text = before.replace(BLOCK, '\n').replace(MARKER, '');
	text = text.replace(MEDIA, (all, rel) => {
		const real = mediaCase.get(decodeURIComponent(rel).toLowerCase());
		if (!real) {report.missing.add('media/' + rel); return all;}
		assets.add('media/' + real);
		return 'assets/media/' + real;
	});

	const lines = text.split('\n');
	const out = [];
	for (let i = 0; i < lines.length; i++) {
		out.push(lines[i]);
		const m = IMAGE.exec(lines[i]);
		if (!m) continue;
		const it = findItem(m[2]);
		if (!it) continue;
		// keep a caption line that repeats the alt text between the image and the score
		let j = i + 1;
		while (j < lines.length && !lines[j].trim()) j++;
		if (m[1] && j < lines.length && lines[j].trim() === m[1].trim()) {
			for (let k = i + 1; k <= j; k++) out.push(lines[k]);
			i = j;
		}
		const scores = scoresOf(it);
		out.push('', `<!-- lilylet-begin: ${m[2]} -->`);
		for (const s of scores) out.push('```lyl.play', s, '```');
		out.push('<!-- lilylet-end -->');
		report.figures++; report.scores += scores.length;
	}
	text = out.join('\n').replace(/\n{3,}/g, '\n\n');
	for (const m of text.matchAll(/\]\((assets\/[^)\s#]+)/g)) assets.add(m[1].replace(/^assets\//, ''));
	report.pages++;
	if (text !== before) {
		report.changed.push(name);
		if (!check) fs.writeFileSync(file, text);
	}
}

for (const rel of [...assets].sort()) {
	const dest = path.join(book, 'assets', rel);
	const src = rel.startsWith('media/') ? path.join(omt, rel) : path.join(omt, 'Graphics', decodeURIComponent(rel));
	if (!fs.existsSync(src)) {report.missing.add(rel); continue;}
	if (fs.statSync(src).isDirectory()) {report.dirs.add(rel); continue;}
	if (fs.existsSync(dest) && fs.readFileSync(dest).equals(fs.readFileSync(src))) continue;
	report.copied++;
	if (!check) {fs.mkdirSync(path.dirname(dest), {recursive: true}); fs.copyFileSync(src, dest);}
}

console.log(`omt sync: ${report.pages} pages, ${report.figures} figures with ${report.scores} scores; ` +
	`${report.changed.length} pages ${check ? 'stale' : 'updated'}, ${report.copied} assets ${check ? 'stale' : 'copied'}`);
if (report.missing.size) console.log('missing in OMT checkout:\n  ' + [...report.missing].join('\n  '));
if (report.dirs.size) console.log('links to directories (not copied):\n  ' + [...report.dirs].join('\n  '));
if (check && (report.changed.length || report.copied)) process.exit(1);
