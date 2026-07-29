/**
 * Progress during a tool-call turn, and the two ways a stream could hang forever.
 *
 * Reported as "stuck at ✓ 读取你的学习档案, no further LLM api calling", then corrected:
 * "it seems it keeps streaming, but no tokens count display now". That correction is
 * the whole diagnosis. The stream was alive; the counter was blind to it.
 *
 * `onReasoning` only fired when a chunk carried `reasoning_content`. The planner's
 * work is a `set_steps` call — thousands of characters arriving as
 * `delta.tool_calls` — and on many models the reasoning stops before that starts. So
 * the longest call in the session reported one progress update and then nothing, which
 * is indistinguishable from a hang. Measured: 40 tool-call chunks → 1 update
 * (`tmp/probe-progress.mjs`).
 *
 * Two genuine hangs found while looking, both fixed here:
 *  - `plannerTimeoutMs` was passed in by both shells and never declared on
 *    `ProviderConfig`, so it was dropped and the planner ran on the 60s request
 *    deadline;
 *  - `#openStream`'s timer is cleared once the response headers arrive, and the read
 *    loop had no deadline at all. A stream that opened and went quiet hung forever:
 *    no error, no retry, no further call. Measured: still hanging at 8s with a 3s
 *    timeout (`tmp/probe-hang.mjs`).
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { HttpLlm, StreamIdleError, isRetriable, sseChunks } from '../src/core/provider.ts';
import type { LlmRequest } from '../src/core/ports.ts';

function sseBody(chunks: Array<Record<string, unknown>>): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(c) {
      const enc = new TextEncoder();
      for (const chunk of chunks) c.enqueue(enc.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      c.enqueue(enc.encode('data: [DONE]\n\n'));
      c.close();
    },
  });
}

const toolChunk = (fragment: string) => ({
  choices: [
    { delta: { tool_calls: [{ index: 0, id: 'c1', function: { name: 'set_steps', arguments: fragment } }] } },
  ],
});

function req(role: LlmRequest['role']): LlmRequest {
  return { role, model: 'm', messages: [{ role: 'user', content: 'hi' }], temperature: 0, maxOutputTokens: 6000 };
}

function llmOver(chunks: Array<Record<string, unknown>>, extra: Record<string, unknown> = {}) {
  return new HttpLlm({
    baseUrl: 'https://example.test/v1',
    apiKey: 'k',
    flavor: 'openai',
    timeoutMs: 60_000,
    fetchImpl: (async () => new Response(sseBody(chunks), { status: 200 })) as unknown as typeof fetch,
    ...extra,
  });
}

// ---------------------------------------------------------------------------
// Progress on a tool-call turn
// ---------------------------------------------------------------------------

test('streamed tool-call arguments drive the progress counter', async () => {
  const chunks = [
    { choices: [{ delta: { reasoning_content: '先看这一节讲什么。' } }] },
    ...Array.from({ length: 20 }, (_, i) => toolChunk(`{"steps":[${'x'.repeat(60)}${i}`)),
    { choices: [{ delta: {}, finish_reason: 'tool_calls' }] },
  ];
  const progress: number[] = [];
  await llmOver(chunks).stream(req('planner'), () => {}, undefined, (t) => progress.push(t));

  // One per producing chunk. Pre-fix this was 1, for the single reasoning chunk.
  assert.equal(progress.length, 21);
  const monotonic = progress.every((n, i) => i === 0 || n >= progress[i - 1]!);
  assert.ok(monotonic, `progress went backwards: ${progress.join(' → ')}`);
  assert.ok(
    progress[progress.length - 1]! > progress[0]! * 10,
    'the tool-call arguments barely moved the number',
  );
});

test('a turn with no reasoning at all still reports progress', async () => {
  // The exact reported case: a model that emits the tool call and nothing else.
  const progress: number[] = [];
  await llmOver(Array.from({ length: 8 }, (_, i) => toolChunk(`frag${i}`)))
    .stream(req('planner'), () => {}, undefined, (t) => progress.push(t));
  assert.equal(progress.length, 8);
});

test('the counter never goes backwards when reasoning and prose interleave', async () => {
  const chunks = [
    { choices: [{ delta: { reasoning_content: '想一想…' } }] },
    { choices: [{ delta: { content: '答案是 ' } }] },
    { choices: [{ delta: { reasoning_content: '再确认一下。' } }] },
    { choices: [{ delta: { content: '6n' } }] },
  ];
  const progress: number[] = [];
  await llmOver(chunks).stream(req('tutor_reply'), () => {}, undefined, (t) => progress.push(t));
  assert.equal(progress.length, 4);
  assert.deepEqual(progress, [...progress].sort((a, b) => a - b));
});

test('a chunk that adds nothing does not emit a progress update', async () => {
  // Keep-alives and the finish_reason chunk must not repaint, or the number would be
  // "updating" while nothing is being produced — the opposite failure.
  const progress: number[] = [];
  await llmOver([
    { choices: [{ delta: {} }] },
    { choices: [{ delta: {}, finish_reason: 'stop' }] },
  ]).stream(req('grader'), () => {}, undefined, (t) => progress.push(t));
  assert.equal(progress.length, 0);
});

test('tool-call arguments are still assembled correctly while being counted', async () => {
  const res = await llmOver([toolChunk('{"a":'), toolChunk('1}')])
    .stream(req('planner'), () => {}, undefined, () => {});
  assert.equal(res.toolCalls.length, 1);
  assert.equal(res.toolCalls[0]!.arguments, '{"a":1}');
});

// ---------------------------------------------------------------------------
// The planner's own deadline
// ---------------------------------------------------------------------------

/**
 * A provider whose fetch never resolves, so the only thing that ends the call is the
 * deadline. `timeoutMs` is tiny and `plannerTimeoutMs` is long: the planner must
 * survive, every other role must be cut. Pre-fix both were cut at `timeoutMs`,
 * because `ProviderConfig` did not declare the field the shells were passing.
 */
function hangingLlm() {
  return new HttpLlm({
    baseUrl: 'https://example.test/v1',
    apiKey: 'k',
    flavor: 'openai',
    timeoutMs: 25,
    plannerTimeoutMs: 30_000,
    fetchImpl: ((_url: string, init: RequestInit) =>
      new Promise((_res, rej) => {
        (init.signal as AbortSignal).addEventListener('abort', () =>
          rej(Object.assign(new Error('aborted'), { name: 'AbortError' })),
        );
      })) as unknown as typeof fetch,
  });
}

test('a non-planner role is bound by the short request deadline', async () => {
  await assert.rejects(hangingLlm().stream(req('grader'), () => {}), /abort/i);
});

test('the planner is not bound by the short request deadline', async () => {
  // 25ms would have aborted it before the fix; 30s means it is still in flight, which
  // is what "the planner has its own deadline" has to mean.
  const pending = hangingLlm().stream(req('planner'), () => {});
  const outcome = await Promise.race([
    pending.then(() => 'resolved').catch((e: Error) => `rejected: ${e.name}`),
    new Promise<string>((r) => setTimeout(() => r('still in flight'), 200)),
  ]);
  assert.equal(outcome, 'still in flight');
});

test('the planner deadline applies to the non-streaming path too', async () => {
  await assert.rejects(hangingLlm().call(req('summarizer')), /abort/i);
  const pending = hangingLlm().call(req('planner'));
  const outcome = await Promise.race([
    pending.then(() => 'resolved').catch((e: Error) => `rejected: ${e.name}`),
    new Promise<string>((r) => setTimeout(() => r('still in flight'), 200)),
  ]);
  assert.equal(outcome, 'still in flight');
});

test('with no plannerTimeoutMs configured the planner falls back to timeoutMs', async () => {
  const llm = new HttpLlm({
    baseUrl: 'https://example.test/v1',
    apiKey: 'k',
    flavor: 'openai',
    timeoutMs: 25,
    fetchImpl: ((_url: string, init: RequestInit) =>
      new Promise((_res, rej) => {
        (init.signal as AbortSignal).addEventListener('abort', () =>
          rej(Object.assign(new Error('aborted'), { name: 'AbortError' })),
        );
      })) as unknown as typeof fetch,
  });
  await assert.rejects(llm.stream(req('planner'), () => {}), /abort/i);
});

// ---------------------------------------------------------------------------
// A stream that opens and then goes quiet
// ---------------------------------------------------------------------------

test('sseChunks gives up when no data arrives within the idle deadline', async () => {
  const quiet = new ReadableStream<Uint8Array>({ start() {} });
  await assert.rejects(
    (async () => {
      for await (const _ of sseChunks(quiet, 30)) void _;
    })(),
    (err: unknown) => err instanceof StreamIdleError,
  );
});

test('the idle deadline bounds the gap between chunks, not the total duration', async () => {
  // A long generation that keeps producing must be allowed to run: this is why the
  // deadline is per-read. 6 chunks at 15ms apart with a 40ms idle budget = 90ms total,
  // comfortably past the budget, and must still complete.
  const slow = new ReadableStream<Uint8Array>({
    async start(c) {
      const enc = new TextEncoder();
      for (let i = 0; i < 6; i += 1) {
        await new Promise((r) => setTimeout(r, 15));
        c.enqueue(enc.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: 'x' } }] })}\n\n`));
      }
      c.close();
    },
  });
  let seen = 0;
  for await (const _ of sseChunks(slow, 40)) seen += 1;
  assert.equal(seen, 6);
});

test('a stream idle error is retriable, unlike an abort', () => {
  // The student pressing 停止 must not be retried; a dead connection should be.
  assert.equal(isRetriable(new StreamIdleError(60_000)), true);
  assert.equal(isRetriable(Object.assign(new Error('x'), { name: 'AbortError' })), false);
});

test('the idle error says what happened and that it can be retried', () => {
  const err = new StreamIdleError(60_000);
  assert.match(err.message, /60s/);
  assert.match(err.message, /重试/);
});

test('sseChunks without an idle deadline is unchanged', async () => {
  // The default is off, so nothing that passes a plain stream gains a timer.
  const chunks = [{ choices: [{ delta: { content: 'a' } }] }];
  let seen = 0;
  for await (const _ of sseChunks(sseBody(chunks))) seen += 1;
  assert.equal(seen, 1);
});
