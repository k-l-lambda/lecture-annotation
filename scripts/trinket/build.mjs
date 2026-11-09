#!/usr/bin/env node
/**
 * Build docs/static/trinket/ — a static, backend-less host for the archived Trinket music
 * embeds used by Open Music Theory (trinket.io shut down 2026-08-31).
 *
 *   index.html     the archived embed page, de-branded, all assets local; boots from #<id>
 *   list.html      every archived trinket, by OMT page
 *   embed-music.js the archived Trinket bundle (VexFlow + MIDI.js + notation widget), unmodified
 *   embed.css      the archived stylesheet, with fonts pointed at static/vendor/google-fonts
 *   trinkets.js    window.OMT_TRINKETS = trinkets.json (data recovered from Wayback snapshots)
 *   boot.js / after.js  see src/
 *
 * Vendor libraries live in docs/static/vendor/, the piano soundfont in docs/static/soundfont/.
 *
 *   node scripts/trinket/build.mjs [--check]
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../docs/static/trinket');
const check = process.argv.includes('--check');
const read = f => fs.readFileSync(path.join(here, f), 'utf8');
const data = JSON.parse(read('trinkets.json'));

// --- index.html from the archived page --------------------------------------------------
let html = read('archive/embed-music-a089e987ca.20240601111854.html');
const edit = (what, from, to = '') => {
	const re = from instanceof RegExp ? from : new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
	const n = (html.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []).length;
	if (!n) throw new Error(`archive page changed: "${what}" not found`);
	html = html.replace(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'), to);
};
const V = '../vendor';
edit('favicons', /\s*<link rel="(icon|apple-touch-icon-precomposed)"[^>]*>/g);
edit('favicon', '<head>', '<head>\n  <link rel="icon" href="data:,">');
edit('font-awesome css', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', `${V}/font-awesome/4.7.0/css/font-awesome.min.css`);
edit('font-mfizz css', /\s*<link rel='stylesheet'[^>]*font-mfizz[^>]*>/);
edit('embed css', '/cache-prefix-778c9cfb/css/embed.css', 'embed.css');
edit('jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', `${V}/jquery/2.1.1/jquery.min.js`);
edit('modernizr', '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min.js', `${V}/modernizr/2.8.2/modernizr.min.js`);
edit('detectizr', /\s*<script src="\/cache-prefix-410d6d0a\/components\/detectizr[^>]*><\/script>/);
edit('crypto-js', /\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/crypto-js\/3\.1\.2\//g, `${V}/crypto-js/3.1.2/`);
edit('XDomainRequest', /\s*<script type="text\/javascript" src="\/js\/vendor\/jQuery\.XDomainRequest\.js"><\/script>/);
edit('gtag', /\s*<script async src="https:\/\/www\.googletagmanager\.com[^>]*><\/script>\s*<script>\s*window\.dataLayer[\s\S]*?<\/script>/);
edit('recaptcha', /\s*<script src='https:\/\/www\.google\.com\/recaptcha\/api\.js'><\/script>\s*<script>\s*function submitRecaptchaForm[\s\S]*?<\/script>/);
edit('trinketObject', /<script>\s*trinketObject\s*=[\s\S]*?<\/script>/,
	'<script src="trinkets.js"></script>\n  <script src="boot.js"></script>');
edit('localStorage shim', /\s*<script src="\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/localStorage[^>]*><\/script>/);
edit('jszip', 'https://trinket-vendor-assets.trinket.io/jszip/3.1.4/dist/jszip.min.js', `${V}/jszip/3.1.4/jszip.min.js`);
edit('jszip-utils', /\s*<script src='https:\/\/trinket-vendor-assets\.trinket\.io\/jszip-utils[^>]*><\/script>/);
edit('jszip-utils-ie', /\s*<script src="\/cache-prefix-\d+dist\/jszip-utils-ie\.min\.js"[^>]*><\/script>/);
edit('FileSaver', /\s*<script src='https:\/\/trinket-vendor-assets\.trinket\.io\/file-saver[^>]*><\/script>/);
edit('lodash', 'https://trinket-vendor-assets.trinket.io/lodash/2.4.1/dist/lodash.min.js', `${V}/lodash/2.4.1/lodash.min.js`);
edit('bluebird', /\s*<script src='https:\/\/trinket-vendor-assets\.trinket\.io\/bluebird[^>]*><\/script>/);
edit('moment', '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js', `${V}/moment/2.18.1/moment.min.js`);
edit('jquery-ui', 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', `${V}/jqueryui/1.12.1/jquery-ui.min.js`);
edit('yamljs', 'https://trinket-vendor-assets.trinket.io/yamljs/0.1.5/bin/yaml.js', `${V}/yamljs/0.1.5/yaml.js`);
edit('bundle', /<script src="https:\/\/trinket-cdn\.trinket\.io\/embed-music-[0-9a-f]+\.js" type="text\/javascript"><\/script>/,
	'<script src="embed-music.js" type="text/javascript"></script>\n  <script src="after.js"></script>');
// trinket.io account / branding / sharing UI: there is no backend any more
edit('brand + logo', /<section class="left title-bar">[\s\S]*?<\/section>/);
edit('share button', /<button class="show-for-medium-up button split item menu-button" data-action="sharing\.social"[\s\S]*?<\/button>/,
	'<a class="menu-button item omt-copy-link" href="#" title="复制本曲谱链接（含修改）"><i class="fa fa-link"></i><label class="show-for-large-up">复制链接</label></a>');
edit('remix / save / login', /<section class="mode-indicator right">[\s\S]*?<\/section>/);
edit('sharing menu', /<li><label>Sharing<\/label><\/li>[\s\S]*?(?=<li><label>Font Size)/);
edit('user menu', /<aside class="right-off-canvas-menu"[\s\S]*?<\/aside>/);
edit('vendorHost', "vendorHost        : 'https://trinket-vendor-assets.trinket.io'", "vendorHost        : '../vendor'");
edit('title', /<title>[^<]*<\/title>/, '<title>Open Music Theory · Trinket</title>');
edit('head end', '</head>', `  <style>
    /* static host: tidy the archived toolbar */
    .omt-copy-link label { margin-left: .3em; }
  </style>
</head>`);
// nothing may still be loaded from outside the site (config hostnames for unused services are inert)
const remote = [...html.matchAll(/\b(?:src|href)=["'](?:https?:)?\/\/[^"']+/g)].map(m => m[0]);
if (remote.length) throw new Error('index.html still loads remote assets:\n  ' + remote.join('\n  '));
if (html.includes('trinket-vendor-assets')) throw new Error('index.html still references trinket-vendor-assets');

// --- stylesheet: local fonts, no images from trinket.io ----------------------------------
let css = read('archive/embed.css');
css = css.replace('@import url("//fonts.googleapis.com/css?family=Lato:300,900|Merriweather:300,300italic,900")', '@import url("../vendor/google-fonts/fonts.css")');
// Dropzone styles belong to Trinket's file-upload UI, which the music embed does not have
css = css.replace('@import "//cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.css";', '');
css = css.replace(/url\("\/cache-prefix-[0-9a-f]+\/img\/[^"]+"\)/g, 'none');
// icon fonts of other Trinket languages (R, pygame): not used by the music embed
css = css.replace(/@font-face\{font-family:'(icomoon|pygame)';[^}]*\}/g, '');
if (/fonts\.googleapis|url\("\/cache-prefix|@import "\/\//.test(css)) throw new Error('embed.css still references remote assets');

// --- list.html -----------------------------------------------------------------------------
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
const byPage = new Map();
for (const [id, r] of Object.entries(data)) for (const p of r.pages) {
	if (!byPage.has(p)) byPage.set(p, []);
	byPage.get(p).push([id, r]);
}
const list = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Open Music Theory · Trinket 曲谱</title>
<style>
:root { color-scheme: light dark; --bg: #fff; --fg: #1d1d1b; --muted: #666; --line: #ddd; --link: #3f51b5; }
@media (prefers-color-scheme: dark) { :root { --bg: #1e1f24; --fg: #e8e8e6; --muted: #a0a0a0; --line: #3a3a3a; --link: #8c9eff; } }
body { margin: 0 auto; max-width: 760px; padding: 16px; background: var(--bg); color: var(--fg); font: 15px/1.6 system-ui, "Noto Sans CJK SC", sans-serif; }
h1 { font-size: 20px; } h2 { font-size: 16px; margin-top: 24px; border-bottom: 1px solid var(--line); }
a { color: var(--link); } code { color: var(--muted); font-size: 12px; } .note { color: var(--muted); font-size: 13px; }
.missing { background: color-mix(in srgb, #e8590c 15%, transparent); padding: 8px 12px; border-radius: 6px; }
</style></head><body>
<h1>Open Music Theory · Trinket 曲谱</h1>
<p class="note">trinket.io 已于 2026-08-31 关闭。这里的曲谱数据由 Wayback Machine 存档恢复，用 Trinket 原版（开源）前端在本站静态呈现。链接格式：<code>index.html#&lt;id&gt;</code>；修改后点“复制链接”会把修改编码进链接。</p>
<p id="missing" class="missing" hidden></p>
${[...byPage].map(([page, items]) => `<h2>${esc(page.replace(/\.md$/, ''))}</h2>
<ul>${items.map(([id, r]) => `<li><a href="index.html#${id}">${esc(r.name)}</a> <code>${id}</code>${r.reconstructed ? ' <span class="note">（据上下文重建）</span>' : ''}</li>`).join('')}</ul>`).join('\n')}
<script>
var m = /^#missing-(.+)$/.exec(location.hash);
if (m) { var el = document.getElementById('missing'); el.hidden = false; el.textContent = '没有找到 trinket ' + decodeURIComponent(m[1]) + ' 的存档数据。'; }
</script>
</body></html>
`;

// --- write / check ---------------------------------------------------------------------------
const files = {
	'index.html': html,
	'list.html': list,
	'embed.css': css,
	'embed-music.js': read('archive/embed-music-2a24c47621.js'),
	'trinkets.js': '/* Archived Open Music Theory trinkets, recovered from Wayback Machine snapshots. Generated by scripts/trinket/build.mjs from trinkets.json. */\nwindow.OMT_TRINKETS = ' + JSON.stringify(Object.fromEntries(Object.entries(data).map(([id, r]) => [id, {name: r.name, code: r.code}]))) + ';\n',
	'boot.js': read('src/boot.js'),
	'after.js': read('src/after.js'),
};
const stale = [];
for (const [name, content] of Object.entries(files)) {
	const file = path.join(out, name);
	if (check) { if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) stale.push(name); }
	else { fs.mkdirSync(out, {recursive: true}); fs.writeFileSync(file, content); }
}
if (stale.length) { console.error('stale static/trinket files: ' + stale.join(', ') + ' (run node scripts/trinket/build.mjs)'); process.exit(1); }
console.log(`trinket: ${check ? 'verified' : 'built'} ${Object.keys(files).length} files, ${Object.keys(data).length} trinkets`);
