/**
 * Node shell settings: a local YAML file, plus environment overrides.
 *
 * The defaults and the clamping rules live in `core/settings.ts` and are shared
 * with the browser shell (settings.md §6) — this file is only the Node-specific
 * source of the raw object and the env-var override, which is what lets a key be
 * supplied per invocation without ever being written to a file.
 *
 * The YAML file is gitignored by the repo's `*.local.*` rule, so an API key placed
 * here never reaches the repository.
 */

import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

import { applySettings, defaultSettings, type LoadResult } from '../../core/settings.ts';
import { normalizeBaseUrl } from '../../core/provider.ts';
import type { Settings } from '../../core/types.ts';

export { applySettings, defaultSettings, type LoadResult };

export const DEFAULT_SETTINGS_PATH = 'tutor.local.yaml';

/**
 * Loads YAML, then lets environment variables win — so a key can be supplied per
 * invocation without ever being written to a file.
 */
export function loadSettings(path = DEFAULT_SETTINGS_PATH): LoadResult {
  let raw: unknown = {};
  let resolved: string | null = null;

  if (existsSync(path)) {
    resolved = path;
    try {
      raw = parse(readFileSync(path, 'utf8')) ?? {};
    } catch (err) {
      throw new Error(`failed to parse ${path}: ${(err as Error).message}`);
    }
  }

  const result = applySettings(raw);
  result.path = resolved;

  const env = process.env;
  if (env['TUTOR_BASE_URL']) result.settings.baseUrl = normalizeBaseUrl(env['TUTOR_BASE_URL']);
  if (env['TUTOR_API_KEY']) result.settings.apiKey = env['TUTOR_API_KEY'];
  if (env['TUTOR_MODEL']) result.settings.model = env['TUTOR_MODEL'];
  if (env['TUTOR_FLAVOR'] === 'anthropic' || env['TUTOR_FLAVOR'] === 'openai') {
    result.settings.flavor = env['TUTOR_FLAVOR'];
  }

  return result;
}

/** Only needed for --live; the fake LLM needs no credentials. */
export function assertLiveReady(settings: Settings): void {
  const missing: string[] = [];
  if (!settings.baseUrl) missing.push('baseUrl (or TUTOR_BASE_URL)');
  if (!settings.apiKey) missing.push('apiKey (or TUTOR_API_KEY)');
  if (!settings.model) missing.push('model (or TUTOR_MODEL)');
  if (missing.length > 0) {
    throw new Error(
      `live mode needs: ${missing.join(', ')}.\n` +
        `Create ${DEFAULT_SETTINGS_PATH} (gitignored) or set the environment variables.`,
    );
  }
}
