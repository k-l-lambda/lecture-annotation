/**
 * Public surface of the harness core — the barrel both shells import.
 *
 * Nothing here may import `node:*` or touch the DOM: that is what lets the same
 * modules run under Node (debug shell) and in the browser (production shell).
 * `npm run bundle` builds this entry into a classic IIFE for the web shell, so a
 * stray platform import is a build failure rather than a runtime surprise.
 */

export * from './types.ts';
export * from './schema.ts';
export * from './ports.ts';
export * from './validate.ts';
export * from './content.ts';
export { applySettings, defaultSettings, type LoadResult } from './settings.ts';
export { PROMPTS, PROMPT_HASH, type PromptSpec } from './prompts.ts';
export {
  DB_NAME,
  DB_VERSION,
  IdbStore,
  normalizeLabel,
  openDatabase,
  previouslyAsked,
  type IDBFactoryLike,
  type OpenOptions,
} from './idb-store.ts';
export {
  HttpError,
  HttpLlm,
  estimateTokens,
  isReasoningParamError,
  isRetriable,
  normalizeBaseUrl,
  reasoningPayload,
  withRetry,
  type ProviderConfig,
  type RetryOptions,
} from './provider.ts';
export {
  BACKTRACK_DEPTH_CAP,
  achievementGateInput,
  collectAskedQuestions,
  executeTool,
  studentMutations,
  type ToolContext,
} from './tools.ts';
export { SessionError, TutorSession, type SessionOptions } from './session.ts';

export * as profile from './profile.ts';
export * as roles from './roles.ts';
