#!/usr/bin/env node
// Bundle src/player.js into the committed docs/javascripts/lilylet/player.js.
// Normal site builds use the committed file; run this only after editing src/.
//   node build-player.mjs          write
//   node build-player.mjs --check  fail if the committed bundle is stale
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../docs/javascripts/lilylet/player.js');
const result = await build({
	entryPoints: [path.join(here, 'src/player.js')], bundle: true, write: false,
	minify: true, format: 'iife', platform: 'browser', target: ['es2020'], logLevel: 'warning',
});
const code = Buffer.from(result.outputFiles[0].contents);
if (process.argv.includes('--check')) {
	const old = fs.existsSync(out) ? fs.readFileSync(out) : null;
	if (!old || !old.equals(code)) {console.error(`Stale ${path.relative(process.cwd(), out)}: run npm run build:player in ${here}`); process.exit(1);}
	console.log('player bundle up to date');
} else {
	fs.writeFileSync(out, code);
	console.log(`wrote ${path.relative(process.cwd(), out)} (${code.length} bytes)`);
}
