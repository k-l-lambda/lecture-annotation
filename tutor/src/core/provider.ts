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
    // Bound to `globalThis`, not stored bare. `this.#fetch(…)` calls the function
    // with `this` set to the HttpLlm instance, and the browser's `fetch` is a
    // Window method that throws `TypeError: Illegal invocation` when its receiver
    // is not the global — which the probe then read as a CORS rejection, so a
    // perfectly good gateway could never pass the save gate. Node's fetch is
    // receiver-agnostic, which is why the Node shell never saw this.
    const impl = config.fetchImpl ?? globalThis.fetch;
    this.#fetch = impl.bind(globalThis);
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
      ...(req.stream
        ? { stream: true, stream_options: { include_usage: true } }
        : { stream: false }),
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
      ...(typeof first?.['finish_reason'] === 'string'
        ? { finishReason: first['finish_reason'] }
        : {}),
    };
  }

  async #openStream(
    body: Record<string, unknown>,
    signal: AbortSignal | undefined,
  ): Promise<ReadableStream<Uint8Array>> {
    const controller = new AbortController();
    // Unlike #post, the timer guards only time-to-first-byte: a long generation
    // that is actively streaming must not be aborted mid-flight.
    const timer = setTimeout(() => controller.abort(), this.#config.timeoutMs);
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort, { once: true });

    try {
      const response = await this.#fetch(`${this.#config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${this.#config.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!response.ok) throw new HttpError(response.status, await response.text());
      if (!response.body) throw new Error('streaming response had no body');
      return response.body;
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }

  /**
   * Streams a turn. `onDelta` receives prose as it arrives; `onReasoning` receives
   * a running reasoning-token estimate while the model thinks, which is the only
   * signal available during the long silent phase of a reasoning model.
   */
  async stream(
    req: LlmRequest,
    onDelta: (chunk: string) => void,
    signal?: AbortSignal,
    onReasoning?: (tokens: number) => void,
  ): Promise<LlmResponse> {
    const useReasoning = this.#reasoningSupported && req.reasoningEffort !== 'off';
    const streaming = { ...req, stream: true };
    let body: ReadableStream<Uint8Array>;
    let strippedReasoning = false;

    try {
      body = await this.#openStream(this.#body(streaming, useReasoning), signal);
    } catch (err) {
      if (
        useReasoning &&
        err instanceof HttpError &&
        err.status === 400 &&
        isReasoningParamError(err.body)
      ) {
        this.#reasoningSupported = false;
        strippedReasoning = true;
        body = await this.#openStream(this.#body(streaming, false), signal);
      } else {
        throw err;
      }
    }

    const acc = new StreamAccumulator();
    for await (const chunk of sseChunks(body)) {
      const added = acc.push(chunk);
      if (added.text) onDelta(added.text);
      // Report the estimate as it grows rather than per-chunk deltas, so a shell
      // can render one updating counter.
      if (added.reasoning && onReasoning) onReasoning(estimateTokens(acc.reasoning));
    }
    return acc.toResponse(strippedReasoning);
  }
}

// ---------------------------------------------------------------------------
// SSE stream accumulation
// ---------------------------------------------------------------------------

/**
 * Accumulates OpenAI-style `chat.completions.chunk` deltas into one response.
 *
 * Kept separate from the transport and free of I/O so the assembly rules —
 * especially tool-call argument concatenation, where a single JSON object arrives
 * split across arbitrarily many chunks — can be tested without a socket.
 */
export class StreamAccumulator {
  text = '';
  reasoning = '';
  /** Tool calls by their `index`, since chunks identify them positionally. */
  #tools = new Map<number, { id: string; name: string; arguments: string }>();
  usage: Partial<Usage> = {};
  finishReason: string | null = null;

  /** Returns what this chunk added, so a caller can render incrementally. */
  push(chunk: Record<string, unknown>): { text: string; reasoning: string } {
    const usage = chunk['usage'];
    if (usage) Object.assign(this.usage, extractUsage(usage));

    const choices = chunk['choices'];
    const first = Array.isArray(choices) ? (choices[0] as Record<string, unknown>) : undefined;
    if (!first) return { text: '', reasoning: '' };

    if (typeof first['finish_reason'] === 'string') this.finishReason = first['finish_reason'];

    const delta = (first['delta'] ?? {}) as Record<string, unknown>;
    let addedText = '';
    let addedReasoning = '';

    if (typeof delta['content'] === 'string') {
      addedText = delta['content'];
      this.text += addedText;
    }
    // Providers disagree on the field name; both appear in the wild.
    const r = delta['reasoning_content'] ?? delta['reasoning'];
    if (typeof r === 'string') {
      addedReasoning = r;
      this.reasoning += addedReasoning;
    }

    const calls = delta['tool_calls'];
    if (Array.isArray(calls)) {
      for (const raw of calls) {
        const c = raw as Record<string, unknown>;
        const index = typeof c['index'] === 'number' ? c['index'] : 0;
        const fn = (c['function'] ?? {}) as Record<string, unknown>;
        const existing = this.#tools.get(index) ?? { id: '', name: '', arguments: '' };
        if (typeof c['id'] === 'string' && c['id']) existing.id = c['id'];
        if (typeof fn['name'] === 'string' && fn['name']) existing.name = fn['name'];
        // Arguments stream as fragments and must be concatenated, never replaced.
        if (typeof fn['arguments'] === 'string') existing.arguments += fn['arguments'];
        this.#tools.set(index, existing);
      }
    }

    return { text: addedText, reasoning: addedReasoning };
  }

  toResponse(strippedReasoning: boolean): LlmResponse {
    const usage: Partial<Usage> = { ...this.usage };
    // include_usage is not universally honoured, so estimate rather than report 0.
    if (usage.completionTokens === undefined && this.text) {
      usage.completionTokens = estimateTokens(this.text);
    }
    if (usage.reasoningTokens === undefined && this.reasoning) {
      usage.reasoningTokens = estimateTokens(this.reasoning);
    }
    const toolCalls = [...this.#tools.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([index, t]) => ({
        id: t.id || `call_${index}`,
        name: t.name,
        arguments: t.arguments,
      }))
      .filter((t) => t.name);

    return {
      text: this.text,
      toolCalls,
      ...(this.reasoning ? { reasoning: this.reasoning } : {}),
      usage,
      ...(strippedReasoning ? { reasoningUnsupported: true } : {}),
      ...(this.finishReason ? { finishReason: this.finishReason } : {}),
    };
  }
}

/** Splits an SSE byte stream into decoded JSON chunk objects. */
export async function* sseChunks(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<Record<string, unknown>> {
  const decoder = new TextDecoder();
  const reader = body.getReader();
  let buffer = '';

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Events are newline-delimited; a chunk boundary can fall mid-line, so only
      // complete lines are consumed and the remainder stays buffered.
      let nl: number;
      while ((nl = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') return;
        try {
          yield JSON.parse(data) as Record<string, unknown>;
        } catch {
          // A malformed chunk is skipped rather than killing the stream: the
          // accumulated text so far is still usable.
        }
      }
    }
  } finally {
    reader.releaseLock();
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
