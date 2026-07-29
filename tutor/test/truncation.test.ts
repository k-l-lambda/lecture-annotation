/**
 * Truncation at `maxOutputTokens`, and why prose needs its own signal.
 *
 * A tool call that gets cut off is caught by structure: `parseToolArguments` counts
 * brackets and rejects every cut point, so a truncated `submit_evaluation` never
 * reaches the student as a half sentence — it becomes a repair. Prose has no such
 * structure. A reply cut at the cap is a grammatical Chinese sentence that simply
 * stops, indistinguishable from a terse tutor, so the endpoint's `finish_reason` is
 * the only evidence that anything was lost.
 *
 * That signal was captured by `StreamAccumulator` and then dropped: `LlmResponse` had
 * no field for it and `grep finishReason src/` matched only its own assignment. These
 * tests pin the whole path — accumulator → response → prose turn → notice — and the
 * asymmetry that makes the prose side the one that needs it.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { StreamAccumulator } from '../src/core/provider.ts';
import { parseToolArguments, runProseTurn, runToolLoop } from '../src/core/roles.ts';
import type { Llm, LlmRequest, LlmResponse } from '../src/core/ports.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

function chunk(delta: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  return { choices: [{ delta, ...extra }] } as Record<string, unknown>;
}

/** Answers every turn with the same response. */
function fixedLlm(response: Partial<LlmResponse>): Llm {
  return {
    async call(_req: LlmRequest): Promise<LlmResponse> {
      return {
        text: '',
        toolCalls: [],
        usage: { promptTokens: 10, completionTokens: 5 },
        ...response,
      };
    },
  };
}

// ---------------------------------------------------------------------------
// The signal reaches the response
// ---------------------------------------------------------------------------

test('a length stop is carried out of the stream accumulator', () => {
  const acc = new StreamAccumulator();
  acc.push(chunk({ content: '你抓住了要点，不过共轭的符号' }, { finish_reason: 'length' }));
  // Captured on the accumulator *and* present on the response it builds — the second
  // half is what was missing: nothing outside provider.ts could see it.
  assert.equal(acc.finishReason, 'length');
  assert.equal(acc.toResponse(false).finishReason, 'length');
});

test('a normal stop is not reported as truncation', () => {
  const acc = new StreamAccumulator();
  acc.push(chunk({ content: '说得对。' }, { finish_reason: 'stop' }));
  assert.equal(acc.toResponse(false).finishReason, 'stop');
  assert.notEqual(acc.toResponse(false).finishReason, 'length');
});

test('no finish_reason at all leaves the field unset rather than guessing', () => {
  // Some endpoints omit it on the final chunk. Absent must not read as truncated.
  const acc = new StreamAccumulator();
  acc.push(chunk({ content: '嗯' }));
  assert.equal(acc.toResponse(false).finishReason, undefined);
});

// ---------------------------------------------------------------------------
// The prose path acts on it
// ---------------------------------------------------------------------------

test('a truncated prose reply is flagged, and its text still delivered', async () => {
  const cut = '你抓住了要点：判别式小于零给出共轭复根。不过你把符号';
  const reply = await runProseTurn({
    llm: fixedLlm({ text: cut, finishReason: 'length' }),
    settings: defaultSettings(),
    model: 'm',
    messages: [{ role: 'user', content: '这题什么意思' }],
  });
  assert.equal(reply.truncated, true);
  // Flagged, not discarded: half an explanation is still worth reading, and the
  // student decides whether to ask for the rest.
  assert.equal(reply.text, cut);
});

test('a complete prose reply is not flagged', async () => {
  const reply = await runProseTurn({
    llm: fixedLlm({ text: '判别式小于零时给出两个共轭复根。', finishReason: 'stop' }),
    settings: defaultSettings(),
    model: 'm',
    messages: [{ role: 'user', content: '为什么' }],
  });
  assert.equal(reply.truncated, false);
});

test('the turn the student reads is the one judged for truncation', async () => {
  // With tools live, `runProseTurn` may take a second turn after the tool result and
  // show *that* text. Judging the first turn would report the wrong one.
  let n = 0;
  const llm: Llm = {
    async call(): Promise<LlmResponse> {
      n += 1;
      return n === 1
        ? {
            text: '',
            toolCalls: [{ id: 'c1', name: 'update_mastery', arguments: '{}' }],
            usage: {},
            finishReason: 'tool_calls',
          }
        : { text: '好，我们从更前面一步开始，先看', toolCalls: [], usage: {}, finishReason: 'length' };
    },
  };
  const reply = await runProseTurn({
    llm,
    settings: defaultSettings(),
    model: 'm',
    messages: [{ role: 'user', content: '太难了' }],
    execute: async () => ({ ok: true, errors: [] }),
  });
  assert.equal(reply.truncated, true);
});

// ---------------------------------------------------------------------------
// The tool path already had structure, and says so distinctly
// ---------------------------------------------------------------------------

test('a truncated evaluation payload is rejected at every cut point', () => {
  const full = JSON.stringify({
    questionId: 'q1',
    score: 3,
    evaluation: '你正确识别了判别式的作用，但把符号读反了：小于零给出两个共轭复根。',
    pointsHit: [],
    pointsMissed: ['共轭复根'],
    answerQuality: 'partial',
  });
  // The case that would be worst is a cut inside the `evaluation` string that still
  // happens to parse — it would show a half sentence with no error at all. Sweeping
  // every offset proves no such cut exists for this payload.
  for (let i = 1; i < full.length; i += 1) {
    const parsed = parseToolArguments(full.slice(0, i));
    assert.ok(parsed.error, `a cut at ${i} parsed silently: ${full.slice(0, i)}`);
  }
});

test('the truncation error names the token limit, not JSON syntax', () => {
  const parsed = parseToolArguments('{"evaluation": "你写出了 b^2-4ac');
  assert.match(parsed.error ?? '', /truncated mid-emission/);
  assert.match(parsed.error ?? '', /output token limit/);
});

test('a role cut off before its tool blames the cap, not the prompt', async () => {
  const settings = defaultSettings();
  const result = await runToolLoop({
    role: 'grader',
    llm: fixedLlm({ text: '让我先看看学生的答案', finishReason: 'length' }),
    settings,
    model: 'm',
    systemText: 's',
    userText: 'u',
    execute: async () => ({ ok: true, errors: [] }),
  });
  assert.equal(result.terminalToolCalled, false);
  // Distinct from the ordinary "did not call the tool" failure: that one sends the
  // reader after a prompt bug, while this one needs maxOutputTokens raised.
  assert.match(result.failure ?? '', /maxOutputTokens/);
  assert.match(result.failure ?? '', new RegExp(String(settings.maxOutputTokens)));
  assert.doesNotMatch(result.failure ?? '', /after a nudge/);
});

test('a role that merely ignores the tool keeps the original diagnosis', async () => {
  const result = await runToolLoop({
    role: 'grader',
    llm: fixedLlm({ text: '我觉得这个答案不错。', finishReason: 'stop' }),
    settings: defaultSettings(),
    model: 'm',
    systemText: 's',
    userText: 'u',
    execute: async () => ({ ok: true, errors: [] }),
  });
  assert.match(result.failure ?? '', /after a nudge/);
  assert.doesNotMatch(result.failure ?? '', /maxOutputTokens/);
});
