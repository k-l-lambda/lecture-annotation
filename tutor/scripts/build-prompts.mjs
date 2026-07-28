#!/usr/bin/env node
/**
 * Compiles design.local/tutor/prompts/*.md into src/core/prompts.ts.
 *
 * Replaces the design's scripts/build_tutor_prompts.py: the output is now
 * TypeScript that must typecheck against schema.ts, so a prompt naming a tool the
 * harness does not implement is a build error rather than a runtime surprise.
 *
 * NOTE the generated file is COMMITTED, unlike what prompts/README.md says. Its
 * source lives in design.local/, which the repo's `*.local` rule ignores, so a
 * fresh clone could not otherwise build. Run this script after editing a prompt.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../..');
const PROMPT_DIR = join(REPO, 'design.local/tutor/prompts');
const OUT = resolve(HERE, '../src/core/prompts.ts');

const ROLE_FILES = {
  planner: '01-planner.md',
  questioner: '02-questioner.md',
  grader: '03-grader.md',
  tutor_reply: '04-tutor-reply.md',
  summarizer: '05-summarizer.md',
  router: '06-router.md',
};

const PREAMBLE = '00-shared-preamble.md';

/** Placeholders filled at REQUEST time, not build time, so a mid-session
 *  language switch takes effect on the next call without a rebuild. */
const REQUIRED_PLACEHOLDERS = ['{{LANGUAGE_DIRECTIVE}}', '{{BILINGUAL_TERMS_DIRECTIVE}}'];

function fail(message) {
  console.error(`build-prompts: ${message}`);
  process.exit(1);
}

/** Strips YAML front-matter and returns {meta, body}. */
function splitFrontMatter(text, file) {
  if (!text.startsWith('---')) return { meta: {}, body: text.trim() };
  const end = text.indexOf('\n---', 3);
  if (end < 0) fail(`${file}: front-matter opened but never closed`);
  const raw = text.slice(3, end).trim();
  const body = text.slice(end + 4).trim();

  const meta = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    const v = value.trim();
    if (v === '') continue;
    if (v.startsWith('[') && v.endsWith(']')) {
      meta[key] = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else if (/^-?\d+(\.\d+)?$/.test(v)) {
      meta[key] = Number(v);
    } else if (v === 'true' || v === 'false') {
      meta[key] = v === 'true';
    } else {
      meta[key] = v.replace(/^['"]|['"]$/g, '');
    }
  }
  return { meta, body };
}

if (!existsSync(PROMPT_DIR)) {
  fail(
    `prompt sources not found at ${PROMPT_DIR}.\n` +
      '  The prompts live in design.local/, which is gitignored. src/core/prompts.ts is\n' +
      '  committed precisely so a fresh clone still builds — you only need this script\n' +
      '  when editing the prompt markdown.',
  );
}

const preamblePath = join(PROMPT_DIR, PREAMBLE);
if (!existsSync(preamblePath)) fail(`missing ${PREAMBLE}`);
const preamble = splitFrontMatter(readFileSync(preamblePath, 'utf8'), PREAMBLE);

// A missing placeholder would silently leave the model to guess the language.
for (const ph of REQUIRED_PLACEHOLDERS) {
  const n = preamble.body.split(ph).length - 1;
  if (n !== 1) {
    fail(`${PREAMBLE}: placeholder ${ph} appears ${n} times, expected exactly 1`);
  }
}

// Fail loudly on an unknown prompt file rather than silently ignoring it.
const known = new Set([PREAMBLE, 'README.md', ...Object.values(ROLE_FILES)]);
for (const entry of readdirSync(PROMPT_DIR)) {
  if (entry.endsWith('.md') && !known.has(entry)) {
    fail(`unexpected prompt file '${entry}': add it to ROLE_FILES or remove it`);
  }
}

const roles = {};
for (const [role, file] of Object.entries(ROLE_FILES)) {
  const path = join(PROMPT_DIR, file);
  if (!existsSync(path)) fail(`missing ${file} for role ${role}`);
  const { meta, body } = splitFrontMatter(readFileSync(path, 'utf8'), file);
  if (body.length < 100) fail(`${file}: body looks empty (${body.length} chars)`);

  for (const ph of REQUIRED_PLACEHOLDERS) {
    if (body.includes(ph)) {
      fail(`${file}: ${ph} belongs in the shared preamble only (invariant 10)`);
    }
  }

  roles[role] = {
    text: `${preamble.body}\n\n---\n\n${body}`,
    temperature: typeof meta.temperature === 'number' ? meta.temperature : null,
    reasoning: typeof meta.reasoning === 'string' ? meta.reasoning : null,
    sourceFile: file,
  };
}

const hash = createHash('sha256');
hash.update(preamble.body);
for (const role of Object.keys(ROLE_FILES)) hash.update(roles[role].text);
const digest = `sha256:${hash.digest('hex').slice(0, 16)}`;

const lines = [
  '/**',
  ' * GENERATED FILE — do not edit by hand.',
  ' *',
  ' * Built from design.local/tutor/prompts/*.md by scripts/build-prompts.mjs.',
  ' * Run `npm run build:prompts` after editing a prompt.',
  ' *',
  ' * This file IS committed: its source lives in design.local/, which the repo',
  ' * gitignores via `*.local`, so a fresh clone could not regenerate it.',
  ' *',
  ` * Prompt hash: ${digest}`,
  ' * The hash invalidates the manual eval baseline (prompts/README.md).',
  ' */',
  '',
  "import type { RoleName } from './types.ts';",
  '',
  'export interface PromptSpec {',
  '  /** Shared preamble + role body, with {{…}} placeholders still unfilled. */',
  '  text: string;',
  '  temperature: number | null;',
  '  reasoning: string | null;',
  '  sourceFile: string;',
  '}',
  '',
  `export const PROMPT_HASH = ${JSON.stringify(digest)};`,
  '',
  'export const PROMPTS: Record<RoleName, PromptSpec> = {',
];

for (const [role, spec] of Object.entries(roles)) {
  lines.push(`  ${role}: {`);
  lines.push(`    text: ${JSON.stringify(spec.text)},`);
  lines.push(`    temperature: ${spec.temperature === null ? 'null' : spec.temperature},`);
  lines.push(`    reasoning: ${spec.reasoning === null ? 'null' : JSON.stringify(spec.reasoning)},`);
  lines.push(`    sourceFile: ${JSON.stringify(spec.sourceFile)},`);
  lines.push('  },');
}

lines.push('};', '');

writeFileSync(OUT, lines.join('\n'), 'utf8');

const total = Object.values(roles).reduce((n, r) => n + r.text.length, 0);
console.log(`build-prompts: ${Object.keys(roles).length} roles, ${total} chars, ${digest}`);
console.log(`build-prompts: wrote ${OUT}`);
