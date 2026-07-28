/**
 * Store port on raw IndexedDB. Used by BOTH shells: the browser supplies the API
 * natively, the Node debug shell supplies it via fake-indexeddb. So the real
 * object stores, indexes and dedup rules of data-model.md §2 are exercised by the
 * debug shell rather than staying unvalidated until the browser shell exists.
 *
 * No `idb` wrapper on purpose — the web shell keeps zero runtime dependencies.
 */

import type { SessionQuery, Store } from './ports.ts';
import type {
  Achievement,
  KnowledgePoint,
  MasteryRecord,
  SessionRecord,
} from './types.ts';

export const DB_NAME = 'tutor';
export const DB_VERSION = 1;

const STORE_KP = 'knowledgePoints';
const STORE_MASTERY = 'mastery';
const STORE_SESSIONS = 'sessions';
const STORE_ACHIEVEMENTS = 'achievements';
const STORE_META = 'meta';

/**
 * Minimal structural types so core does not depend on lib.dom.
 *
 * Event handlers take `never` rather than `unknown`: core never reads the event,
 * and `never` is the only parameter type a real `IDBRequest`'s
 * `(ev: Event) => any` is assignable to under `strictFunctionTypes`. With
 * `unknown` the browser's own `window.indexedDB` fails to satisfy `IDBFactoryLike`
 * — which would push the web shell into casting away the whole interface.
 */
export interface IDBFactoryLike {
  open(name: string, version?: number): IDBOpenDBRequestLike;
}
interface IDBOpenDBRequestLike {
  result: IDBDatabaseLike;
  error: unknown;
  onsuccess: ((this: never, ev: never) => void) | null;
  onerror: ((this: never, ev: never) => void) | null;
  onupgradeneeded: ((this: never, ev: never) => void) | null;
}
interface IDBDatabaseLike {
  objectStoreNames: { contains(name: string): boolean };
  createObjectStore(name: string, options?: { keyPath?: string }): IDBObjectStoreLike;
  transaction(names: string | string[], mode?: string): IDBTransactionLike;
  close(): void;
}
interface IDBTransactionLike {
  objectStore(name: string): IDBObjectStoreLike;
  oncomplete: ((ev: never) => void) | null;
  onerror: ((ev: never) => void) | null;
  onabort: ((ev: never) => void) | null;
  error: unknown;
}
interface IDBObjectStoreLike {
  put(value: unknown): IDBRequestLike;
  clear(): IDBRequestLike;
  get(key: unknown): IDBRequestLike;
  getAll(): IDBRequestLike;
  createIndex(name: string, keyPath: string | string[], options?: { unique?: boolean }): unknown;
  index(name: string): { getAll(key?: unknown): IDBRequestLike };
}
interface IDBRequestLike {
  result: unknown;
  error: unknown;
  onsuccess: ((ev: never) => void) | null;
  onerror: ((ev: never) => void) | null;
}

function promisify<T>(request: IDBRequestLike): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as T);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });
}

export interface OpenOptions {
  factory: IDBFactoryLike;
  name?: string;
}

export async function openDatabase(options: OpenOptions): Promise<IDBDatabaseLike> {
  const request = options.factory.open(options.name ?? DB_NAME, DB_VERSION);
  return new Promise((resolve, reject) => {
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_KP)) {
        const kp = db.createObjectStore(STORE_KP, { keyPath: 'id' });
        kp.createIndex('by_label', 'label');
      }
      if (!db.objectStoreNames.contains(STORE_MASTERY)) {
        db.createObjectStore(STORE_MASTERY, { keyPath: 'kpId' });
      }
      if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
        const s = db.createObjectStore(STORE_SESSIONS, { keyPath: 'id' });
        s.createIndex('by_status', 'status');
        s.createIndex('by_createdAt', 'createdAt');
        // Resume lookup (data-model.md §2).
        s.createIndex('by_page_section', ['page', 'sectionId']);
      }
      if (!db.objectStoreNames.contains(STORE_ACHIEVEMENTS)) {
        const a = db.createObjectStore(STORE_ACHIEVEMENTS, { keyPath: 'id' });
        a.createIndex('by_name', 'name');
        a.createIndex('by_page', 'page');
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('failed to open IndexedDB'));
  });
}

/** data-model.md §2: dedup on exact id, else normalised label, else alias. */
export function normalizeLabel(label: string): string {
  return label.replace(/\s+/g, '').toLowerCase();
}

export class IdbStore implements Store {
  #db: IDBDatabaseLike;

  constructor(db: IDBDatabaseLike) {
    this.#db = db;
  }

  static async open(options: OpenOptions): Promise<IdbStore> {
    return new IdbStore(await openDatabase(options));
  }

  #read(store: string): IDBObjectStoreLike {
    return this.#db.transaction(store, 'readonly').objectStore(store);
  }

  #write(store: string): IDBObjectStoreLike {
    return this.#db.transaction(store, 'readwrite').objectStore(store);
  }

  async getMastery(kpIds: string[]): Promise<MasteryRecord[]> {
    if (kpIds.length === 0) return [];
    const store = this.#read(STORE_MASTERY);
    const found = await Promise.all(
      kpIds.map((id) => promisify<MasteryRecord | undefined>(store.get(id))),
    );
    return found.filter((r): r is MasteryRecord => Boolean(r));
  }

  async getAllMastery(): Promise<MasteryRecord[]> {
    return promisify<MasteryRecord[]>(this.#read(STORE_MASTERY).getAll());
  }

  async putMastery(record: MasteryRecord): Promise<void> {
    await promisify(this.#write(STORE_MASTERY).put(record));
  }

  async getKnowledgePoints(ids: string[]): Promise<KnowledgePoint[]> {
    if (ids.length === 0) return [];
    const store = this.#read(STORE_KP);
    const found = await Promise.all(
      ids.map((id) => promisify<KnowledgePoint | undefined>(store.get(id))),
    );
    return found.filter((k): k is KnowledgePoint => Boolean(k));
  }

  async getAllKnowledgePoints(): Promise<KnowledgePoint[]> {
    return promisify<KnowledgePoint[]>(this.#read(STORE_KP).getAll());
  }

  /**
   * Returns the canonical record for each input, in input order. A proposed KP
   * that matches an existing one by label or alias reuses that id — this is what
   * makes the profile accumulate across sections instead of fragmenting.
   */
  async upsertKnowledgePoints(kps: KnowledgePoint[]): Promise<KnowledgePoint[]> {
    const existing = await this.getAllKnowledgePoints();
    const byId = new Map(existing.map((k) => [k.id, k]));
    const byLabel = new Map(existing.map((k) => [normalizeLabel(k.label), k]));
    const byAlias = new Map<string, KnowledgePoint>();
    for (const k of existing) {
      for (const alias of k.aliases ?? []) byAlias.set(normalizeLabel(alias), k);
    }

    const out: KnowledgePoint[] = [];
    for (const proposed of kps) {
      const match =
        byId.get(proposed.id) ??
        byLabel.get(normalizeLabel(proposed.label)) ??
        byAlias.get(normalizeLabel(proposed.label));

      if (match) {
        const merged: KnowledgePoint = {
          ...match,
          aliases: [...new Set([...match.aliases, ...proposed.aliases])],
          prerequisites: [...new Set([...match.prerequisites, ...proposed.prerequisites])],
          sources: dedupSources([...match.sources, ...proposed.sources]),
          updatedAt: proposed.updatedAt,
        };
        await promisify(this.#write(STORE_KP).put(merged));
        byId.set(merged.id, merged);
        byLabel.set(normalizeLabel(merged.label), merged);
        out.push(merged);
      } else {
        await promisify(this.#write(STORE_KP).put(proposed));
        byId.set(proposed.id, proposed);
        byLabel.set(normalizeLabel(proposed.label), proposed);
        out.push(proposed);
      }
    }
    return out;
  }

  async saveSession(session: SessionRecord): Promise<void> {
    await promisify(this.#write(STORE_SESSIONS).put(session));
  }

  async loadSession(id: string): Promise<SessionRecord | null> {
    return (await promisify<SessionRecord | undefined>(this.#read(STORE_SESSIONS).get(id))) ?? null;
  }

  async findSessions(query: SessionQuery): Promise<SessionRecord[]> {
    const index = this.#read(STORE_SESSIONS).index('by_page_section');
    const all = await promisify<SessionRecord[]>(index.getAll([query.page, query.sectionId]));
    const filtered = query.status ? all.filter((s) => s.status === query.status) : all;
    filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return query.limit ? filtered.slice(0, query.limit) : filtered;
  }

  async listAchievements(): Promise<Achievement[]> {
    return promisify<Achievement[]>(this.#read(STORE_ACHIEVEMENTS).getAll());
  }

  async putAchievement(a: Achievement): Promise<void> {
    await promisify(this.#write(STORE_ACHIEVEMENTS).put(a));
  }

  /**
   * 清空学习档案 (ui-spec.md §7a). Wipes the profile stores AND the session
   * history: leaving sessions behind would let `previouslyAsked` keep suppressing
   * questions the student no longer has any record of having seen.
   *
   * Irreversible — the typed confirmation is the caller's responsibility.
   */
  async clearAll(): Promise<void> {
    for (const name of [STORE_KP, STORE_MASTERY, STORE_SESSIONS, STORE_ACHIEVEMENTS, STORE_META]) {
      await promisify(this.#write(name).clear());
    }
  }

  close(): void {
    this.#db.close();
  }
}

function dedupSources(
  sources: Array<{ page: string; sectionId: string }>,
): Array<{ page: string; sectionId: string }> {
  const seen = new Set<string>();
  const out: Array<{ page: string; sectionId: string }> = [];
  for (const s of sources) {
    const key = `${s.page}#${s.sectionId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

/**
 * `previouslyAsked` for a new session on the same section: a query over the store,
 * not separate state (data-model.md §2).
 */
export async function previouslyAsked(
  store: Store,
  page: string,
  sectionId: string,
): Promise<string[]> {
  const sessions = await store.findSessions({ page, sectionId, status: 'completed', limit: 2 });
  return sessions.flatMap((s) =>
    s.steps.flatMap((step) => step.attempts.map((a) => a.question).filter(Boolean)),
  );
}
