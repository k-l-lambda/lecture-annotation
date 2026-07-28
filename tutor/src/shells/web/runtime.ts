/**
 * Assembles the browser's ports into a running session, and exposes the whole
 * thing as `window.TutorRuntime` for the hand-written UI scripts.
 *
 * This is the only place the browser's four ports meet: `IdbStore` on
 * `window.indexedDB`, `HttpLlm` on `fetch`, `SidecarContent`, and the settings
 * store. `ui/*` calls methods here and subscribes to events; it never constructs a
 * provider or touches the store, which is layering rule 1 of README §2 — and the
 * reason the same harness is driveable from a terminal.
 */

import { IdbStore } from '../../core/idb-store.ts';
import { HttpLlm } from '../../core/provider.ts';
import { TutorSession } from '../../core/session.ts';
import { sequentialIdGen, systemClock } from '../../core/ports.ts';
import type { EventSink, Llm, SessionEvent } from '../../core/ports.ts';
import type { Settings } from '../../core/types.ts';

import { SidecarContent } from './sidecar-content.ts';
import { browserSettingsStore, SettingsStore } from './settings-store.ts';

export interface RuntimeEnv {
  settingsStore?: SettingsStore;
  content?: SidecarContent;
  /** Overridden in tests; production uses `window.indexedDB`. */
  llmFactory?: (settings: Settings) => Llm;
}

export interface StartOptions {
  page: string;
  sectionId: string;
  sink: EventSink;
}

export class TutorRuntime {
  #env: RuntimeEnv;
  #store: IdbStore | null = null;
  #session: TutorSession | null = null;
  #settings: SettingsStore;
  #content: SidecarContent;

  constructor(env: RuntimeEnv = {}) {
    this.#env = env;
    this.#settings = env.settingsStore ?? browserSettingsStore();
    this.#content = env.content ?? new SidecarContent({ cache: safeSessionStorage() });
  }

  get settingsStore(): SettingsStore {
    return this.#settings;
  }

  get content(): SidecarContent {
    return this.#content;
  }

  get session(): TutorSession | null {
    return this.#session;
  }

  get live(): boolean {
    const state = this.#session?.state;
    return Boolean(state && state !== 'DONE' && state !== 'ABANDONED');
  }

  /**
   * `page` is the sidecar's own `page` value, not a guess from the URL — it is the
   * join key between the sidecar, the session record and the profile, so it has
   * to come from one source.
   */
  async start(options: StartOptions): Promise<TutorSession> {
    if (this.live) {
      throw new Error('已有进行中的会话');
    }

    const { settings, warnings } = this.#settings.load();
    for (const w of warnings) {
      options.sink({ type: 'notice', level: 'warn', text: `设置：${w}` });
    }
    assertConfigured(settings);

    const store = await this.#openStore();
    const llm = this.#env.llmFactory?.(settings) ?? new HttpLlm(providerConfig(settings));

    this.#session = await TutorSession.create({
      page: options.page,
      sectionId: options.sectionId,
      settings,
      store,
      llm,
      content: this.#content,
      clock: systemClock,
      ids: sequentialIdGen(),
      sink: options.sink,
    });

    if (this.#content.degradedPages.has(options.page)) {
      options.sink({
        type: 'notice',
        level: 'warn',
        text: '本页缺少讲义源文本，已改用页面文本（公式可能不完整）',
      });
    }

    return this.#session;
  }

  /**
   * The opened store, for the profile drawer.
   *
   * Exposed as a method rather than a property because opening is async and the
   * drawer can be the first thing that needs it — a student may want to look at
   * their档案 before ever starting a session on this page.
   */
  async store(): Promise<IdbStore> {
    return this.#openStore();
  }

  /**
   * Wipes the profile stores. Irreversible, and the caller is expected to have
   * taken the typed confirmation first (ui-spec.md §6) — the runtime does not
   * second-guess it, but it does refuse while a session is live, since a session
   * mid-flight would immediately write new records into the cleared store.
   */
  async clearProfile(): Promise<void> {
    if (this.live) throw new Error('请先结束当前会话再清空档案');
    const store = await this.#openStore();
    await store.clearAll();
  }

  /** Unfinished sessions for this page — what the resume banner reads. */
  async resumable(page: string, sectionId: string) {
    const store = await this.#openStore();
    const found = await store.findSessions({ page, sectionId, status: 'active', limit: 1 });
    return found[0] ?? null;
  }

  async #openStore(): Promise<IdbStore> {
    if (this.#store) return this.#store;
    const factory = globalThis.indexedDB;
    if (!factory) {
      throw new Error('此浏览器不支持 IndexedDB，无法保存学习档案');
    }
    this.#store = await IdbStore.open({ factory });
    return this.#store;
  }

  /** The store outlives any one session, so it is closed only on teardown. */
  close(): void {
    this.#session = null;
    this.#store?.close?.();
    this.#store = null;
  }
}

export function providerConfig(settings: Settings) {
  return {
    baseUrl: settings.baseUrl,
    apiKey: settings.apiKey,
    flavor: settings.flavor,
    timeoutMs: settings.requestTimeoutMs,
    plannerTimeoutMs: settings.plannerTimeoutMs,
  };
}

/** Named separately from the settings dialog's own validation so the failure text
 *  says which field is missing rather than "not configured". */
export function assertConfigured(settings: Settings): void {
  const missing: string[] = [];
  if (!settings.baseUrl) missing.push('Base URL');
  if (!settings.apiKey) missing.push('API Key');
  if (!settings.model) missing.push('模型');
  if (missing.length > 0) {
    throw new Error(`请先在设置里填写：${missing.join('、')}`);
  }
}

function safeSessionStorage() {
  try {
    return globalThis.sessionStorage ?? undefined;
  } catch {
    return undefined;
  }
}

export type { SessionEvent };
