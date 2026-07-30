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
  /**
   * True when a stored value was rewritten by a schema migration, so the caller should
   * persist the result. `applySettings` is pure — it cannot write — and without this
   * signal a migration announced itself on every single load: the blob kept its old
   * `schemaVersion`, so the next read re-derived the same conclusion and warned again.
   * The notice only stopped if the student happened to open the settings dialog and
   * save, which is self-healing by coincidence rather than by design.
   */
  migrated?: boolean;
}

/** settings.md §4-§5 defaults. Thinking is ON by default; the planner is why. */
export function defaultSettings(): Settings {
  return {
    schemaVersion: 2,
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
    /**
     * Raised from 2000, which the planner could not fit. `set_steps` carries 3-5
     * steps each with a verbatim anchor quoted out of the section, so the call alone
     * runs to well over a thousand tokens — and with `reasoning.byRole.planner`
     * defaulting to `'medium'`, the thinking is drawn from the same budget before any
     * of that is emitted. The observed failure was the cap being spent mid-tool-call:
     * 「planner 在输出 set_steps 之前就到了 maxOutputTokens (2000)」.
     */
    maxOutputTokens: 6000,
    maxContextChars: 24000,
    stream: true,
    showReasoning: 'off',
    requireAnalysis: false,
    callBudgetPerSession: 40,
    hintCap: 2,
    variantCap: 3,
    // Floor 1, not 3: a short lecture section often carries exactly one checkable
    // idea, and a floor of 3 made the planner pad the ladder with steps the section
    // does not support — or get rejected and re-plan into the same wall. The cap
    // still stops a runaway ladder; the floor was only ever protecting against a
    // lazy plan, which is not the failure that actually happens.
    stepRange: [1, 5],
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
  let migrated = false;
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

  // Written by every save since v1 but never read until now. A v1 blob carrying the
  // old default of 2000 is not a choice the student made — there was no control for
  // this field, so nobody could have typed it — and keeping it means the planner goes
  // on failing at the cap for anyone who already ran a session. A value they did
  // change is preserved, as is anything saved at v2 or later.
  //
  // `migrated` is what makes this a one-time event rather than a permanent complaint:
  // the caller writes the result back, stamping `schemaVersion: 2`, so the next load
  // takes the `else` branch. Reporting without persisting meant the student was told
  // about an upgrade they had no way to acknowledge, on every page load.
  const stale =
    clampInt(src['schemaVersion'], 1, 1, 1_000) < 2 && src['maxOutputTokens'] === 2000;
  if (stale) {
    migrated = true;
    warnings.push(
      `单次回复 token 上限已从 2000 提高到 ${settings.maxOutputTokens}：规划一节放不进 2000。已为你调整`,
    );
  } else {
    settings.maxOutputTokens = clampInt(src['maxOutputTokens'], settings.maxOutputTokens, 256, 32_000);
  }
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
    const lo = clampInt(src['stepRange'][0], 1, 1, 6);
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

  return { settings, warnings, path: null, migrated };
}
