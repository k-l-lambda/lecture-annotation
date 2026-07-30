/**
 * Browser settings persistence: `localStorage['tutor.settings']` plus the key,
 * held separately.
 *
 * The key is **not** part of the settings object (settings.md §6). Two reasons,
 * both practical: 导出设置 must be shareable without leaking a credential, and
 * `keyMode: 'session'` has to put the key somewhere with a different lifetime
 * from everything else.
 *
 * Everything about validation lives in `core/settings.ts` — this file only reads,
 * writes, and decides which Storage a value belongs in.
 */

import { applySettings, defaultSettings } from '../../core/settings.ts';
import type { LoadResult } from '../../core/settings.ts';
import type { Settings } from '../../core/types.ts';

export const SETTINGS_KEY = 'tutor.settings';
export const KEY_STORAGE_KEY = 'tutor.apiKey';
export const KEY_MODE_KEY = 'tutor.keyMode';

export type KeyMode = 'local' | 'session';

/**
 * The parts of `Storage` we use. Injected so the whole store is testable under
 * Node without a DOM, and so a browser with storage disabled (Safari private
 * mode throws on `setItem`) degrades to in-memory rather than breaking the page.
 */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface StorageEnv {
  local: StorageLike;
  session: StorageLike;
}

export function memoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  };
}

/** Never throws: a quota error or a disabled Storage must not break the page. */
function safeWrite(storage: StorageLike, key: string, value: string): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRead(storage: StorageLike, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export class SettingsStore {
  #env: StorageEnv;

  constructor(env: StorageEnv) {
    this.#env = env;
  }

  keyMode(): KeyMode {
    return safeRead(this.#env.local, KEY_MODE_KEY) === 'session' ? 'session' : 'local';
  }

  #keyStore(mode = this.keyMode()): StorageLike {
    return mode === 'session' ? this.#env.session : this.#env.local;
  }

  /**
   * Reads and clamps. A stored object that fails to parse at all is replaced by
   * defaults with a warning rather than blocking the panel (settings.md §6) —
   * a student whose localStorage got corrupted should see a fixable settings
   * dialog, not a dead feature.
   */
  load(): LoadResult {
    const raw = safeRead(this.#env.local, SETTINGS_KEY);
    if (!raw) {
      return { settings: defaultSettings(), warnings: [], path: null };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return {
        settings: defaultSettings(),
        warnings: ['已保存的设置无法解析，已恢复默认值'],
        path: SETTINGS_KEY,
      };
    }

    const result = applySettings(parsed);
    result.path = SETTINGS_KEY;
    // The key is stored apart, so it is absent from the object every time and has
    // to be merged back in after clamping.
    result.settings.apiKey = safeRead(this.#keyStore(), KEY_STORAGE_KEY) ?? '';

    // A migration rewrote a stored value, so write the result back — otherwise the
    // blob keeps its old `schemaVersion` and the next load reports the same migration
    // again, forever. `warnings` is still returned this once, which is the point: the
    // student is told exactly one time.
    //
    // A write failure is not surfaced. The settings are correct in memory either way,
    // and the only cost is that the notice appears again next load — much less than
    // interrupting a session over a quota error the student cannot act on.
    if (result.migrated) this.save(result.settings);
    return result;
  }

  /** Returns false when persistence failed, so the dialog can say so. */
  save(settings: Settings, keyMode: KeyMode = this.keyMode()): boolean {
    const { apiKey, ...rest } = settings;

    safeWrite(this.#env.local, KEY_MODE_KEY, keyMode);
    // Clear the other storage on every save: switching local -> session must not
    // leave the key behind in localStorage, which is the whole point of the mode.
    this.#keyStore(keyMode === 'session' ? 'local' : 'session').removeItem(KEY_STORAGE_KEY);

    const keyOk = apiKey
      ? safeWrite(this.#keyStore(keyMode), KEY_STORAGE_KEY, apiKey)
      : (this.#keyStore(keyMode).removeItem(KEY_STORAGE_KEY), true);

    return safeWrite(this.#env.local, SETTINGS_KEY, JSON.stringify(rest)) && keyOk;
  }

  /** True when a session can actually start — the header button's state dot. */
  configured(): boolean {
    const { settings } = this.load();
    return Boolean(settings.baseUrl && settings.apiKey && settings.model);
  }

  clear(): void {
    for (const store of [this.#env.local, this.#env.session]) {
      store.removeItem(SETTINGS_KEY);
      store.removeItem(KEY_STORAGE_KEY);
      store.removeItem(KEY_MODE_KEY);
    }
  }

  /** 导出设置 — key excluded by construction, not by remembering to delete it. */
  exportable(settings: Settings): string {
    const { apiKey: _key, ...rest } = settings;
    return JSON.stringify(rest, null, 2);
  }
}

export function browserSettingsStore(): SettingsStore {
  const fallback = memoryStorage();
  const pick = (get: () => StorageLike | undefined): StorageLike => {
    try {
      return get() ?? fallback;
    } catch {
      // Accessing localStorage throws outright in some privacy configurations.
      return fallback;
    }
  };
  return new SettingsStore({
    local: pick(() => globalThis.localStorage),
    session: pick(() => globalThis.sessionStorage),
  });
}
