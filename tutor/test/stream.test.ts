/**
 * SSE assembly.
 *
 * The transport is not tested here — a socket adds nothing. What needs testing is
 * the assembly, because the wire format is hostile in three specific ways: a tool
 * call's JSON arrives split across arbitrarily many chunks and must be
 * concatenated rather than replaced, an event boundary can fall mid-line so a
 * partial line must stay buffered, and `include_usage` is not universally
 * honoured so token counts sometimes have to be estimated instead of reported 0.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { HttpLlm, StreamAccumulator, sseChunks, estimateTokens } from '../src/core/provider.ts';

function chunk(delta: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  return { choices: [{ index: 0, delta, ...extra }] };
}

/** Feeds `parts` as separate reads, so a caller controls where boundaries fall. */
function streamOf(parts: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i >= parts.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(parts[i]!));
      i += 1;
    },
  });
}

async function collect(parts: string[]): Promise<Array<Record<string, unknown>>> {
  const out: Array<Record<string, unknown>> = [];
  for await (const c of sseChunks(streamOf(parts))) out.push(c);
  return out;
}

test('prose deltas accumulate and are reported incrementally', () => {
  const acc = new StreamAccumulator();
  const added = ['三', '维', '球面'].map((t) => acc.push(chunk({ content: t })).text);
  assert.deepEqual(added, ['三', '维', '球面']);
  assert.equal(acc.text, '三维球面');
});

test('tool-call arguments are concatenated across chunks, never replaced', () => {
  const acc = new StreamAccumulator();
  acc.push(chunk({ tool_calls: [{ index: 0, id: 'c1', function: { name: 'set_steps' } }] }));
  for (const part of ['{"ste', 'ps":[{"tit', 'le":"引入"}]}']) {
    acc.push(chunk({ tool_calls: [{ index: 0, function: { arguments: part } }] }));
  }
  const { toolCalls } = acc.toResponse(false);
  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0]!.id, 'c1');
  assert.equal(toolCalls[0]!.name, 'set_steps');
  assert.deepEqual(JSON.parse(toolCalls[0]!.arguments), { steps: [{ title: '引入' }] });
});

test('parallel tool calls stay separate and come back in index order', () => {
  const acc = new StreamAccumulator();
  // Arriving out of order, interleaved, and with the name split from the id —
  // all of which a provider is free to do.
  acc.push(chunk({ tool_calls: [{ index: 1, id: 'b', function: { name: 'two', arguments: '{"b' } }] }));
  acc.push(chunk({ tool_calls: [{ index: 0, id: 'a', function: { name: 'one', arguments: '{"a' } }] }));
  acc.push(chunk({ tool_calls: [{ index: 1, function: { arguments: '":2}' } }] }));
  acc.push(chunk({ tool_calls: [{ index: 0, function: { arguments: '":1}' } }] }));

  const { toolCalls } = acc.toResponse(false);
  assert.deepEqual(
    toolCalls.map((t) => [t.name, t.arguments]),
    [
      ['one', '{"a":1}'],
      ['two', '{"b":2}'],
    ],
  );
});

test('a nameless tool call is dropped rather than emitted as a broken call', () => {
  const acc = new StreamAccumulator();
  acc.push(chunk({ tool_calls: [{ index: 0, function: { arguments: '{}' } }] }));
  assert.deepEqual(acc.toResponse(false).toolCalls, []);
});

test('reasoning accumulates under either field name providers use', () => {
  const acc = new StreamAccumulator();
  assert.equal(acc.push(chunk({ reasoning_content: '先看' })).reasoning, '先看');
  assert.equal(acc.push(chunk({ reasoning: '定义' })).reasoning, '定义');
  assert.equal(acc.reasoning, '先看定义');
  assert.equal(acc.toResponse(false).reasoning, '先看定义');
});

test('reported usage wins; missing counts are estimated, not zero', () => {
  const withUsage = new StreamAccumulator();
  withUsage.push(chunk({ content: '答案' }));
  withUsage.push({ usage: { prompt_tokens: 800, completion_tokens: 12 } });
  assert.equal(withUsage.toResponse(false).usage.completionTokens, 12);

  const without = new StreamAccumulator();
  without.push(chunk({ content: '答案很长'.repeat(20) }));
  without.push(chunk({ reasoning_content: '思考'.repeat(30) }));
  const usage = without.toResponse(false).usage;
  assert.equal(usage.completionTokens, estimateTokens(without.text));
  assert.equal(usage.reasoningTokens, estimateTokens(without.reasoning));
});

test('finish_reason is captured and reasoning-stripped is passed through', () => {
  const acc = new StreamAccumulator();
  acc.push(chunk({ content: 'x' }, { finish_reason: 'length' }));
  assert.equal(acc.finishReason, 'length');
  assert.equal(acc.toResponse(true).reasoningUnsupported, true);
  assert.equal(acc.toResponse(false).reasoningUnsupported, undefined);
});

test('an event split across reads is reassembled', async () => {
  const chunks = await collect(['data: {"cho', 'ices":[{"delta":{"content":"半"}}]}\n', 'data: [DONE]\n']);
  assert.equal(chunks.length, 1);
  const first = (chunks[0]!['choices'] as Array<Record<string, unknown>>)[0]!;
  assert.equal((first['delta'] as Record<string, unknown>)['content'], '半');
});

test('[DONE] ends the stream and later data is not yielded', async () => {
  const chunks = await collect([
    'data: {"choices":[{"delta":{"content":"a"}}]}\n',
    'data: [DONE]\n',
    'data: {"choices":[{"delta":{"content":"b"}}]}\n',
  ]);
  assert.equal(chunks.length, 1);
});

test('comments, blank lines and malformed data are skipped without killing the stream', async () => {
  const chunks = await collect([
    ': keep-alive\n\n',
    'event: message\n',
    'data: not json at all\n',
    'data: {"choices":[{"delta":{"content":"ok"}}]}\n',
  ]);
  assert.equal(chunks.length, 1);
  const first = (chunks[0]!['choices'] as Array<Record<string, unknown>>)[0]!;
  assert.equal((first['delta'] as Record<string, unknown>)['content'], 'ok');
});

test('stream() reports prose per chunk and reasoning as a growing total', async () => {
  const sse = [
    'data: {"choices":[{"delta":{"reasoning_content":"先确认题目问的是维数"}}]}\n',
    'data: {"choices":[{"delta":{"reasoning_content":"再数自由度"}}]}\n',
    'data: {"choices":[{"delta":{"content":"是 "}}]}\n',
    'data: {"choices":[{"delta":{"content":"6n"}}]}\n',
    'data: {"choices":[{"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":700,"completion_tokens":9}}\n',
    'data: [DONE]\n',
  ];
  let sentBody: Record<string, unknown> = {};
  const llm = new HttpLlm({
    baseUrl: 'https://example.test/v1',
    apiKey: 'k',
    flavor: 'openai',
    timeoutMs: 5000,
    fetchImpl: (async (_url: string, init: RequestInit) => {
      sentBody = JSON.parse(String(init.body)) as Record<string, unknown>;
      return new Response(streamOf(sse), { status: 200 });
    }) as unknown as typeof fetch,
  });

  const deltas: string[] = [];
  const thinking: number[] = [];
  const res = await llm.stream(
    {
      role: 'tutor_reply',
      model: 'm',
      messages: [{ role: 'user', content: '维数是多少' }],
      temperature: 0.5,
      maxOutputTokens: 500,
      reasoningEffort: 'low',
    },
    (c) => deltas.push(c),
    undefined,
    (t) => thinking.push(t),
  );

  assert.equal(sentBody['stream'], true);
  assert.deepEqual(sentBody['stream_options'], { include_usage: true });
  assert.deepEqual(deltas, ['是 ', '6n'], 'prose arrives as written, not in one lump');
  // A running total, so a shell can render one updating counter rather than
  // summing deltas itself.
  assert.equal(thinking.length, 2);
  assert.ok(thinking[1]! > thinking[0]!);
  assert.equal(res.text, '是 6n');
  assert.equal(res.usage.completionTokens, 9);
  assert.equal(res.usage.promptTokens, 700);
});

test('stream() strips the reasoning param and retries once on a 400 naming it', async () => {
  const bodies: Array<Record<string, unknown>> = [];
  const llm = new HttpLlm({
    baseUrl: 'https://example.test/v1',
    apiKey: 'k',
    flavor: 'openai',
    timeoutMs: 5000,
    fetchImpl: (async (_url: string, init: RequestInit) => {
      const body = JSON.parse(String(init.body)) as Record<string, unknown>;
      bodies.push(body);
      if ('reasoning_effort' in body) {
        return new Response('{"error":{"message":"reasoning_effort not supported"}}', {
          status: 400,
        });
      }
      return new Response(streamOf(['data: {"choices":[{"delta":{"content":"ok"}}]}\n', 'data: [DONE]\n']), {
        status: 200,
      });
    }) as unknown as typeof fetch,
  });

  const res = await llm.stream(
    {
      role: 'grader',
      model: 'm',
      messages: [{ role: 'user', content: 'x' }],
      temperature: 0,
      maxOutputTokens: 100,
      reasoningEffort: 'high',
    },
    () => {},
  );

  assert.equal(bodies.length, 2, 'exactly one retry, not a loop');
  assert.equal('reasoning_effort' in bodies[1]!, false);
  assert.equal(res.text, 'ok');
  assert.equal(res.reasoningUnsupported, true);
  assert.equal(llm.reasoningSupported, false, 'the fact is remembered for later calls');
});

test('a multi-byte character split across reads is decoded intact', async () => {
  // '球' is E7 90 83; the read boundary falls inside it.
  const bytes = new TextEncoder().encode('data: {"choices":[{"delta":{"content":"球"}}]}\n');
  const out: Array<Record<string, unknown>> = [];
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes.slice(0, 40));
      controller.enqueue(bytes.slice(40));
      controller.close();
    },
  });
  for await (const c of sseChunks(body)) out.push(c);
  const first = (out[0]!['choices'] as Array<Record<string, unknown>>)[0]!;
  assert.equal((first['delta'] as Record<string, unknown>)['content'], '球');
});
