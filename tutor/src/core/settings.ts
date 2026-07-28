/**
 * Settings defaults, validation and clamping — shared by both shells.
 *
 * This lives in core rather than in either shell because settings.md §6 requires
 * clamping **on read**, not only on write: a hand-edited localStorage value or a
 * hand-edited YAML file must degrade to defaults with a warning rather than put
 * the harness in an impossible state. Two implementations of that rule would
 * drift, and the drift would only show up as a session behaving differently in
 * the browser than in the debug shell — the exact class of bug the shared core
 * exists to prevent.
 *
 * `applySettings` takes any parsed object: YAML in the Node shell, JSON from
 * `localStorage['tutor.settings']` in the browser.
 */

import { normalizeBaseUrl } from './provider.ts';
import { ROLE_NAMES, type GenrePreference, type RoleName, type Settings } from './types.ts';

export interface LoadResult {
  settings: Settings;
  warnings: string[];
  /** Where the values came from; null when nothing was found and defaults apply. */
  path: string | null;
}

/** settings.md §4-§5 defaults. Thinking is ON by default; the planner is why. */
export function defaultSettings(): Settings {
  return {
    schemaVersion: 1,
    baseUrl: '',
    apiKey: '',
    model: '',
    flavor: 'openai',
    language: 'zh',
    bilingualTerms: true,
    background: '',
    backgroundAffectsQuestions: true,
    reasoning: {
      effort: 'high',
      byRole: {
        planner: 'medium',
        questioner: 'medium',
        grader: 'high',
        tutor_reply: 'low',
        summarizer: 'medium',
        // Classification, not thinking. Reasoning here buys nothing and this call
        // is on the critical path of every free-text turn.
        router: 'off',
      },
    },
    temperature: {
      byRole: {
        planner: 0.3,
        questioner: 0.7,
        grader: 0.1,
        tutor_reply: 0.6,
        summarizer: 0.4,
        // Deterministic: the same sentence must route the same way twice.
        router: 0,
      },
    },
    roleModels: {},
    maxOutputTokens: 2000,
    maxContextChars: 24000,
    stream: true,
    showReasoning: 'off',
    requireAnalysis: false,
    callBudgetPerSession: 40,
    hintCap: 2,
    variantCap: 3,
    stepRange: [3, 5],
    genrePreference: 'descriptive-first',
    requestTimeoutMs: 60_000,
    plannerTimeoutMs: 120_000,
  };
}

function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? Math.round(value) : Number.NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function clampFloat(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? value : Number.NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

const EFFORTS = new Set(['off', 'low', 'medium', 'high']);
const GENRE_PREFS = new Set<GenrePreference>(['descriptive-only', 'descriptive-first', 'mixed']);

/**
 * Clamp on read (settings.md §6): a hand-edited YAML file with nonsense values
 * degrades to defaults with a warning rather than breaking a session.
 */
export function applySettings(raw: unknown, base = defaultSettings()): LoadResult {
  const warnings: string[] = [];
  const settings = { ...base, reasoning: { ...base.reasoning, byRole: { ...base.reasoning.byRole } }, temperature: { byRole: { ...base.temperature.byRole } }, roleModels: { ...base.roleModels } };
  const src = (raw ?? {}) as Record<string, unknown>;

  if (typeof src['baseUrl'] === 'string') settings.baseUrl = normalizeBaseUrl(src['baseUrl']);
  if (typeof src['apiKey'] === 'string') settings.apiKey = src['apiKey'];
  if (typeof src['model'] === 'string') settings.model = src['model'];
  if (src['flavor'] === 'anthropic' || src['flavor'] === 'openai') settings.flavor = src['flavor'];
  if (typeof src['language'] === 'string') settings.language = src['language'];
  if (typeof src['bilingualTerms'] === 'boolean') settings.bilingualTerms = src['bilingualTerms'];

  if (typeof src['background'] === 'string') {
    const text = src['background'];
    if (text.length > 600) {
      warnings.push(`background is ${text.length} chars, truncated to 600`);
    }
    settings.background = text.slice(0, 600);
  }
  if (typeof src['backgroundAffectsQuestions'] === 'boolean') {
    settings.backgroundAffectsQuestions = src['backgroundAffectsQuestions'];
  }

  const reasoning = (src['reasoning'] ?? {}) as Record<string, unknown>;
  if (typeof reasoning['effort'] === 'string') {
    if (EFFORTS.has(reasoning['effort'])) {
      settings.reasoning.effort = reasoning['effort'] as Settings['reasoning']['effort'];
    } else {
      warnings.push(`unknown reasoning.effort '${reasoning['effort']}', keeping ${settings.reasoning.effort}`);
    }
  }
  const byRole = (reasoning['byRole'] ?? {}) as Record<string, unknown>;
  for (const role of ROLE_NAMES) {
    const v = byRole[role];
    if (typeof v === 'string' && EFFORTS.has(v)) settings.reasoning.byRole[role] = v;
    else if (v !== undefined) warnings.push(`ignoring reasoning.byRole.${role}='${String(v)}'`);
  }

  const temps = ((src['temperature'] ?? {}) as Record<string, unknown>)['byRole'] ?? {};
  for (const role of ROLE_NAMES) {
    const v = (temps as Record<string, unknown>)[role];
    if (v !== undefined) {
      settings.temperature.byRole[role] = clampFloat(v, settings.temperature.byRole[role], 0, 2);
    }
  }

  const roleModels = (src['roleModels'] ?? {}) as Record<string, unknown>;
  for (const role of ROLE_NAMES) {
    const v = roleModels[role];
    if (typeof v === 'string' && v) settings.roleModels[role as RoleName] = v;
  }

  settings.maxOutputTokens = clampInt(src['maxOutputTokens'], settings.maxOutputTokens, 256, 32_000);
  settings.maxContextChars = clampInt(src['maxContextChars'], settings.maxContextChars, 2_000, 200_000);
  if (typeof src['requireAnalysis'] === 'boolean') {
    settings.requireAnalysis = src['requireAnalysis'];
  }
  settings.callBudgetPerSession = clampInt(src['callBudgetPerSession'], settings.callBudgetPerSession, 5, 500);
  settings.hintCap = clampInt(src['hintCap'], settings.hintCap, 0, 5);
  settings.variantCap = clampInt(src['variantCap'], settings.variantCap, 1, 10);
  settings.requestTimeoutMs = clampInt(src['requestTimeoutMs'], settings.requestTimeoutMs, 5_000, 600_000);
  settings.plannerTimeoutMs = clampInt(src['plannerTimeoutMs'], settings.plannerTimeoutMs, 5_000, 600_000);

  if (typeof src['stream'] === 'boolean') settings.stream = src['stream'];
  if (src['showReasoning'] === 'off' || src['showReasoning'] === 'collapsed' || src['showReasoning'] === 'expanded') {
    settings.showReasoning = src['showReasoning'];
  }

  if (Array.isArray(src['stepRange']) && src['stepRange'].length === 2) {
    const lo = clampInt(src['stepRange'][0], 3, 1, 6);
    const hi = clampInt(src['stepRange'][1], 5, lo, 6);
    settings.stepRange = [lo, hi];
  }

  if (typeof src['genrePreference'] === 'string') {
    if (GENRE_PREFS.has(src['genrePreference'] as GenrePreference)) {
      settings.genrePreference = src['genrePreference'] as GenrePreference;
    } else {
      warnings.push(`unknown genrePreference '${src['genrePreference']}', keeping ${settings.genrePreference}`);
    }
  }

  return { settings, warnings, path: null };
}
