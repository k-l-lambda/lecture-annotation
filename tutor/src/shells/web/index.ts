/**
 * The web shell's bundle entry — everything the hand-written UI scripts need,
 * exposed as one global.
 *
 * The site itself has no bundler (README §1 constraint 2): `docs/javascripts/*.js`
 * are classic IIFE scripts listed in `mkdocs.yml`. So the typed half of the shell
 * arrives as `window.Tutor` and the UI scripts read off it, rather than importing
 * modules. That keeps the boundary honest — anything the UI needs has to be
 * exported here deliberately.
 */

export { TutorRuntime, providerConfig, assertConfigured } from './runtime.ts';
export { SidecarContent, CACHE_PREFIX, type Sidecar } from './sidecar-content.ts';
export {
  SettingsStore,
  browserSettingsStore,
  memoryStorage,
  SETTINGS_KEY,
  KEY_STORAGE_KEY,
  KEY_MODE_KEY,
  type KeyMode,
  type StorageLike,
} from './settings-store.ts';
export { probeConnection, describeProbeFailure, type ProbeResult } from './probe.ts';
// The panel offers a 重试 button only for failures that retrying can fix. The same
// predicate the core's own retry policy uses, so the button and the automatic retries
// never disagree about what is transient.
export { isRetriable } from '../../core/provider.ts';

// Re-exported so the UI can render phase labels, chip states and validation
// limits from the same constants the harness enforces, rather than from a second
// copy that drifts (README §2 layering rule 2).
export {
  CHIP_GLYPHS,
  PASS_THRESHOLD,
  PHASE_LABELS,
  ROLE_NAMES,
  TARGET_LEVEL_LABELS,
  type ChipState,
  type RoleName,
  type SessionState,
  type Settings,
  type Step,
} from '../../core/types.ts';
export { QUESTION_MAX_CHARS, questionLength } from '../../core/validate.ts';
export { applySettings, defaultSettings } from '../../core/settings.ts';
export type { SessionEvent } from '../../core/ports.ts';

// The profile drawer renders the *decayed* effective mastery, not the stored
// number: a level measured two months ago is not the level today, and showing the
// raw value would tell the student they know something the prep gate will
// disagree about (data-model.md §2).
export { effective, setMasteryLevel, resetMastery, revertEvidence } from '../../core/profile.ts';
export type { Achievement, KnowledgePoint, MasteryRecord } from '../../core/types.ts';
