/**
 * LLM client. Implements the Llm port against an OpenAI-compatible Chat
 * Completions endpoint (llm-io.md §1), using `fetch` — available in both the
 * browser and Node 18+, so this file is shell-agnostic like the rest of core.
 */

import type { Llm, LlmRequest, LlmResponse, LlmToolCall } from './ports.ts';
import type { Usage } from './types.ts';

export interface ProviderConfig {
  baseUrl: string;
  apiKey: string;
  flavor: 'openai' | 'anthropic';
  timeoutMs: number;
  /** Set false once the endpoint has rejected the reasoning parameter. */
  reasoningSupported?: boolean;
  fetchImpl?: typeof fetch;
}

/**
 * Trailing `/` stripped; if there is no path segment, `/v1` is appended — so
 * `https://api.ppinfra.com/v3/openai` and `https://api.example.com` both work
 * (llm-io.md §1).
 */
export function normalizeBaseUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, '');
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (parsed.pathname === '' || parsed.pathname === '/') url = `${url}/v1`;
  } catch {
    // Leave a malformed URL alone; the request will fail with a clear error.
  }
  return url;
}

export class HttpError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`HTTP ${status}: ${body.slice(0, 400)}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

/** llm-io.md §1.2 — one 思考强度 control, whatever the endpoint wants on the wire. */
export function reasoningPayload(
  flavor: 'openai' | 'anthropic',
  effort: 'off' | 'low' | 'medium' | 'high' | undefined,
): Record<string, unknown> {
  if (!effort || effort === 'off') return {};
  if (flavor === 'anthropic') {
    const budget = { low: 2048, medium: 8192, high: 16384 }[effort];
    return { thinking: { type: 'enabled', budget_tokens: budget } };
  }
  return { reasoning_effort: effort };
}

/** True when a 400 names the reasoning parameter, so it can be stripped and retried. */
export function isReasoningParamError(body: string): boolean {
  return /reasoning_effort|reasoning|thinking|enable_thinking/i.test(body);
}

function extractUsage(raw: unknown): Partial<Usage> {
  const u = (raw ?? {}) as Record<string, unknown>;
  const details = (u['completion_tokens_details'] ?? {}) as Record<string, unknown>;
  const out: Partial<Usage> = {};
  if (typeof u['prompt_tokens'] === 'number') out.promptTokens = u['prompt_tokens'];
  if (typeof u['completion_tokens'] === 'number') out.completionTokens = u['completion_tokens'];
  // Anthropic-style field names.
  if (typeof u['input_tokens'] === 'number') out.promptTokens = u['input_tokens'];
  if (typeof u['output_tokens'] === 'number') out.completionTokens = u['output_tokens'];
  if (typeof details['reasoning_tokens'] === 'number') {
    out.reasoningTokens = details['reasoning_tokens'];
  }
  return out;
}

/** CJK-heavy text runs about 2.2 chars per token (llm-io.md §5). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 2.2);
}

function parseToolCalls(message: Record<string, unknown>): LlmToolCall[] {
  const raw = message['tool_calls'];
  if (!Array.isArray(raw)) return [];
  const out: LlmToolCall[] = [];
  for (const [i, entry] of raw.entries()) {
    const e = entry as Record<string, unknown>;
    const fn = (e['function'] ?? {}) as Record<string, unknown>;
    const name = typeof fn['name'] === 'string' ? fn['name'] : '';
    if (!name) continue;
    out.push({
      id: typeof e['id'] === 'string' ? e['id'] : `call_${i}`,
      name,
      arguments: typeof fn['arguments'] === 'string' ? fn['arguments'] : JSON.stringify(fn['arguments'] ?? {}),
    });
  }
  return out;
}

export class HttpLlm implements Llm {
  #config: ProviderConfig;
  #fetch: typeof fetch;
  #reasoningSupported: boolean;

  constructor(config: ProviderConfig) {
    this.#config = { ...config, baseUrl: normalizeBaseUrl(config.baseUrl) };
    this.#fetch = config.fetchImpl ?? fetch;
    this.#reasoningSupported = config.reasoningSupported !== false;
  }

  get reasoningSupported(): boolean {
    return this.#reasoningSupported;
  }

  #body(req: LlmRequest, withReasoning: boolean): Record<string, unknown> {
    const messages = req.messages.map((m) => {
      if (m.role === 'tool') {
        return { role: 'tool', content: m.content, tool_call_id: m.toolCallId };
      }
      if (m.role === 'assistant' && m.toolCalls?.length) {
        return {
          role: 'assistant',
          content: m.content || null,
          tool_calls: m.toolCalls.map((t) => ({
            id: t.id,
            type: 'function',
            function: { name: t.name, arguments: t.arguments },
          })),
        };
      }
      return { role: m.role, content: m.content };
    });

    return {
      model: req.model,
      messages,
      temperature: req.temperature,
      max_tokens: req.maxOutputTokens,
      ...(req.tools?.length ? { tools: req.tools, tool_choice: req.toolChoice ?? 'auto' } : {}),
      ...(withReasoning ? reasoningPayload(this.#config.flavor, req.reasoningEffort) : {}),
      stream: false,
    };
  }

  async #post(
    body: Record<string, unknown>,
    signal: AbortSignal | undefined,
  ): Promise<Record<string, unknown>> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#config.timeoutMs);
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort, { once: true });

    try {
      const response = await this.#fetch(`${this.#config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.#config.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const text = await response.text();
      if (!response.ok) throw new HttpError(response.status, text);
      try {
        return JSON.parse(text) as Record<string, unknown>;
      } catch {
        throw new Error(`response was not JSON: ${text.slice(0, 200)}`);
      }
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }

  async call(req: LlmRequest, signal?: AbortSignal): Promise<LlmResponse> {
    const useReasoning = this.#reasoningSupported && req.reasoningEffort !== 'off';
    let payload: Record<string, unknown>;
    let strippedReasoning = false;

    try {
      payload = await this.#post(this.#body(req, useReasoning), signal);
    } catch (err) {
      // A 400 naming the reasoning parameter costs one retry, never a broken
      // session (llm-io.md §1.2).
      if (
        useReasoning &&
        err instanceof HttpError &&
        err.status === 400 &&
        isReasoningParamError(err.body)
      ) {
        this.#reasoningSupported = false;
        strippedReasoning = true;
        payload = await this.#post(this.#body(req, false), signal);
      } else {
        throw err;
      }
    }

    const choices = payload['choices'];
    const first = Array.isArray(choices) ? (choices[0] as Record<string, unknown>) : undefined;
    const message = (first?.['message'] ?? {}) as Record<string, unknown>;
    const text = typeof message['content'] === 'string' ? message['content'] : '';
    const reasoning =
      typeof message['reasoning_content'] === 'string'
        ? message['reasoning_content']
        : typeof message['reasoning'] === 'string'
          ? message['reasoning']
          : undefined;

    const usage = extractUsage(payload['usage']);
    if (usage.completionTokens === undefined && text) {
      usage.completionTokens = estimateTokens(text);
    }

    return {
      text,
      toolCalls: parseToolCalls(message),
      ...(reasoning ? { reasoning } : {}),
      usage,
      ...(strippedReasoning ? { reasoningUnsupported: true } : {}),
    };
  }
}

// ---------------------------------------------------------------------------
// Retry policy (harness.md §7): 2 retries with jittered backoff on 429/5xx,
// no retry on 4xx.
// ---------------------------------------------------------------------------

export function isRetriable(err: unknown): boolean {
  if (err instanceof HttpError) return err.status === 429 || err.status >= 500;
  // Network-level failures are retriable; explicit aborts are not.
  return err instanceof Error && err.name !== 'AbortError';
}

export interface RetryOptions {
  attempts?: number;
  baseDelayMs?: number;
  sleep?: (ms: number) => Promise<void>;
  random?: () => number;
}

export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const attempts = options.attempts ?? 3;
  const base = options.baseDelayMs ?? 500;
  const sleep = options.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const random = options.random ?? Math.random;

  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === attempts - 1 || !isRetriable(err)) throw err;
      await sleep(base * Math.pow(2, i) * (0.5 + random()));
    }
  }
  throw lastError;
}
