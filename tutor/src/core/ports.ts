/**
 * The shell boundary.
 *
 * Everything environment-shaped goes through these interfaces. The core imports
 * nothing from `node:*` and touches no DOM, which is the single rule that lets
 * the web shell reuse the core unchanged (README.md §2 layering rule 1: ui/*
 * never talks to the provider, and the harness runs headless in Node).
 */

import type {
  Achievement,
  KnowledgePoint,
  MasteryRecord,
  RoleName,
  SectionContent,
  SessionRecord,
  SessionState,
  Usage,
} from './types.ts';

// ---------------------------------------------------------------------------
// Store — IndexedDB in both shells (fake-indexeddb under Node)
// ---------------------------------------------------------------------------

export interface SessionQuery {
  page: string;
  sectionId: string;
  status?: SessionRecord['status'];
  limit?: number;
}

export interface Store {
  getMastery(kpIds: string[]): Promise<MasteryRecord[]>;
  getAllMastery(): Promise<MasteryRecord[]>;
  putMastery(record: MasteryRecord): Promise<void>;

  getKnowledgePoints(ids: string[]): Promise<KnowledgePoint[]>;
  getAllKnowledgePoints(): Promise<KnowledgePoint[]>;
  /** Dedups by id, then normalised label, then alias (data-model.md §2). */
  upsertKnowledgePoints(kps: KnowledgePoint[]): Promise<KnowledgePoint[]>;

  saveSession(session: SessionRecord): Promise<void>;
  loadSession(id: string): Promise<SessionRecord | null>;
  findSessions(query: SessionQuery): Promise<SessionRecord[]>;

  listAchievements(): Promise<Achievement[]>;
  putAchievement(a: Achievement): Promise<void>;

  close?(): void;
}

// ---------------------------------------------------------------------------
// Llm — the provider seam. Fake in tests, fetch in both shells.
// ---------------------------------------------------------------------------

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCalls?: LlmToolCall[];
  toolCallId?: string;
}

export interface LlmToolCall {
  id: string;
  name: string;
  /** Raw JSON string as it came off the wire; parsed tolerantly (llm-io.md §4). */
  arguments: string;
}

export interface LlmRequest {
  role: RoleName;
  model: string;
  messages: LlmMessage[];
  tools?: Array<Record<string, unknown>>;
  toolChoice?: 'required' | 'auto' | 'none';
  temperature: number;
  maxOutputTokens: number;
  /** Mapped to the endpoint's flavor by provider.ts (llm-io.md §1.2). */
  reasoningEffort?: 'off' | 'low' | 'medium' | 'high';
  stream?: boolean;
}

export interface LlmResponse {
  text: string;
  toolCalls: LlmToolCall[];
  reasoning?: string;
  usage: Partial<Usage>;
  /** Set when the endpoint rejected the reasoning param and it was stripped. */
  reasoningUnsupported?: boolean;
}

export interface Llm {
  call(req: LlmRequest, signal?: AbortSignal): Promise<LlmResponse>;
  stream?(
    req: LlmRequest,
    onDelta: (chunk: string) => void,
    signal?: AbortSignal,
  ): Promise<LlmResponse>;
}

// ---------------------------------------------------------------------------
// Content — section text resolution
// ---------------------------------------------------------------------------

export interface ContentSource {
  /** Sidecar in the browser, markdown source in the Node shell. */
  getSection(page: string, sectionId: string): Promise<SectionContent | null>;
}

// ---------------------------------------------------------------------------
// Clock / ids / logging — injected so tests are deterministic
// ---------------------------------------------------------------------------

export interface Clock {
  /** Epoch ms. Decay and ageDays read this, so tests can move time freely. */
  now(): number;
}

export interface IdGen {
  next(prefix: string): string;
}

export const systemClock: Clock = { now: () => Date.now() };

export function sequentialIdGen(seed = 0): IdGen {
  let n = seed;
  return { next: (prefix: string) => `${prefix}:${String(++n).padStart(4, '0')}` };
}

// ---------------------------------------------------------------------------
// Events — what the harness emits for a shell to render
// ---------------------------------------------------------------------------

export type SessionEvent =
  | { type: 'phase'; state: SessionState; label: string }
  | { type: 'notice'; level: 'info' | 'warn' | 'error'; text: string }
  | { type: 'plan'; stepTitles: string[]; prepIncluded: boolean; reason: string }
  | {
      type: 'question';
      stepIndex: number;
      stepTitle: string;
      targetLevel: number;
      question: string;
      setup: string | null;
      variant: number;
    }
  | {
      type: 'evaluation';
      score: number;
      passed: boolean;
      evaluation: string;
      pointsHit: string[];
      pointsMissed: string[];
    }
  | { type: 'hint'; text: string; used: number; cap: number }
  | { type: 'reply'; text: string; streaming: boolean }
  | { type: 'steprail'; chips: Array<{ title: string; state: string; inserted: boolean }> }
  | { type: 'planning-progress'; tool: string; done: boolean; note?: string }
  | {
      type: 'summary';
      text: string;
      strengths: string[];
      gaps: string[];
      nextActions: Array<{ text: string; sectionRef: string | null }>;
    }
  | { type: 'achievement'; name: string; description: string; basis: string; renamed: boolean }
  | { type: 'usage'; usage: Usage; budgetUsed: number; budgetTotal: number }
  | { type: 'tool'; role: RoleName; tool: string; ok: boolean; errors: string[] };

export type EventSink = (event: SessionEvent) => void;

export const noopSink: EventSink = () => {};
