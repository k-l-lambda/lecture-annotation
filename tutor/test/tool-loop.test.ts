/**
 * The tool loop's budgets.
 *
 * Three separate limits govern how a role's turn can end badly — repairs per tool,
 * redundant calls, and the iteration cap — and they interact: live, a planner that
 * re-called a *succeeding* read-only tool was charged nothing by any of them and
 * quietly consumed 7 of its 8 iterations, leaving one for `set_steps`, which then
 * hit the cap. The reported failure named the cap, which is the symptom.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  MAX_ITERATIONS,
  MAX_REDUNDANT_CALLS,
  MAX_REPAIRS,
  MAX_RUNS_PER_TOOL,
  runToolLoop,
} from '../src/core/roles.ts';
import type { Llm, LlmRequest, LlmResponse } from '../src/core/ports.ts';
import type { ToolResult } from '../src/core/types.ts';
import { defaultSettings } from '../src/shells/node/settings.ts';

/** Replays a scripted sequence of tool calls, one per turn. */
function scriptedLlm(turns: Array<Array<{ name: string; args?: unknown }>>): Llm & { calls: number } {
  let i = 0;
  return {
    calls: 0,
    async call(_req: LlmRequest): Promise<LlmResponse> {
      const turn = turns[Math.min(i, turns.length - 1)] ?? [];
      i += 1;
      this.calls = i;
      return {
        text: '',
        toolCalls: turn.map((t, n) => ({
          id: `c${i}_${n}`,
          name: t.name,
          arguments: JSON.stringify(t.args ?? {}),
        })),
        usage: { promptTokens: 10, completionTokens: 5 },
      };
    },
  };
}

function loop(
  turns: Array<Array<{ name: string; args?: unknown }>>,
  execute: (name: string) => ToolResult,
) {
  const executed: string[] = [];
  const llm = scriptedLlm(turns);
  return {
    executed,
    llm,
    run: () =>
      runToolLoop({
        role: 'planner',
        llm,
        settings: defaultSettings(),
        model: 'm',
        systemText: 's',
        userText: 'u',
        execute: async (name: string) => {
          executed.push(name);
          return execute(name);
        },
      }),
  };
}

const ok: ToolResult = { ok: true, value: {} } as ToolResult;

test('a completed non-terminal tool is not executed again when re-called', async () => {
  const h = loop(
    [
      [{ name: 'get_student_profile' }],
      [{ name: 'get_student_profile' }],
      [{ name: 'upsert_knowledge_points' }],
      [{ name: 'set_steps' }],
    ],
    () => ok,
  );
  const result = await h.run();

  assert.equal(result.failure, null);
  assert.deepEqual(
    h.executed,
    ['get_student_profile', 'upsert_knowledge_points', 'set_steps'],
    'the repeat is answered, not run a second time',
  );
  // The repeat must not be charged as a validation repair — the arguments were
  // fine, and two such calls would otherwise abandon the turn.
  assert.equal(result.repairs, 0);
  assert.equal(result.terminalToolCalled, true);
});

test('re-calling the terminal tool is always allowed', async () => {
  // set_steps is how the planner finishes; a second call is a legitimate revision,
  // and refusing it would make a mid-turn correction impossible.
  const h = loop([[{ name: 'set_steps' }], [{ name: 'set_steps' }]], () => ok);
  const result = await h.run();
  assert.equal(result.failure, null);
  assert.deepEqual(h.executed, ['set_steps']);
});

test('persistent re-calling fails with a diagnosis, not the iteration cap', async () => {
  // The live symptom: the loop ran out of iterations and blamed set_steps, which
  // had only ever been tried once.
  const h = loop([[{ name: 'get_student_profile' }]], () => ok);
  const result = await h.run();

  assert.ok(result.failure, 'must fail rather than spin');
  assert.match(result.failure, /re-calling completed tools/);
  assert.doesNotMatch(result.failure, /iteration cap/);
  assert.ok(
    result.iterations < MAX_ITERATIONS,
    `should stop before the cap, used ${result.iterations} of ${MAX_ITERATIONS}`,
  );
  assert.equal(h.executed.length, 1, 'executed exactly once, however many times asked');
});

test('a re-call with different arguments is real work and runs', async () => {
  // `get_student_profile` returns a different digest for different kpHints, so a
  // revised hint list is a new query, not a lost bearing. Live on §13.9 the planner
  // re-queried with a different hint list (Chinese, then English) and a name-only
  // repeat key refused it — killing the session before the first question.
  const h = loop(
    [
      [{ name: 'get_student_profile', args: { kpHints: ['酉群'] } }],
      [{ name: 'get_student_profile', args: { kpHints: ['unitary group'] } }],
      [{ name: 'set_steps' }],
    ],
    () => ok,
  );
  const result = await h.run();

  assert.equal(result.failure, null);
  assert.equal(
    h.executed.filter((n) => n === 'get_student_profile').length,
    2,
    'the second query has different arguments and must actually execute',
  );
});

test('argument key order does not make a call look new', async () => {
  const h = loop(
    [
      [{ name: 'get_student_profile', args: { kpHints: ['a'], includeAchievements: false } }],
      [{ name: 'get_student_profile', args: { includeAchievements: false, kpHints: ['a'] } }],
      [{ name: 'set_steps' }],
    ],
    () => ok,
  );
  await h.run();
  assert.equal(h.executed.filter((n) => n === 'get_student_profile').length, 1);
});

test('varying the arguments forever is still caught', async () => {
  // The other side of keying on arguments: on an empty store every hint list returns
  // the same empty digest, so each call succeeds and the redundant-call budget never
  // sees it. A per-tool run cap is what bounds this.
  // A different hint list every turn, so the argument-keyed repeat check never
  // matches and every call legitimately succeeds.
  let turn = 0;
  const llm: Llm = {
    async call(): Promise<LlmResponse> {
      turn += 1;
      return {
        text: '',
        toolCalls: [
          {
            id: `c${turn}`,
            name: 'get_student_profile',
            arguments: JSON.stringify({ kpHints: [`hint-${turn}`] }),
          },
        ],
        usage: {},
      };
    },
  };
  const executed: string[] = [];
  const result = await runToolLoop({
    role: 'planner',
    llm,
    settings: defaultSettings(),
    model: 'm',
    systemText: 's',
    userText: 'u',
    execute: async (name: string) => {
      executed.push(name);
      return ok;
    },
  });

  assert.ok(result.failure, 'must not spin');
  assert.match(result.failure, /varying arguments/);
  assert.ok(result.iterations < MAX_ITERATIONS, `used ${result.iterations} of ${MAX_ITERATIONS}`);
  assert.equal(executed.length, MAX_RUNS_PER_TOOL + 1, 'stops one past the cap');
});

test('the redundant-call budget is more generous than the repair budget', async () => {
  // Both bound the same loop, so their relative size is a real decision: a cheap
  // correction should be forgiven more often than a failing validation.
  assert.ok(MAX_REDUNDANT_CALLS > MAX_REPAIRS);
});

test('a genuinely failing tool still exhausts the repair budget and reports it', async () => {
  const h = loop([[{ name: 'set_steps' }]], () => ({
    ok: false,
    errors: ['targetLevel decreases at step s3'],
  }));
  const result = await h.run();

  assert.match(result.failure ?? '', /set_steps failed validation/);
  assert.match(result.failure ?? '', /targetLevel decreases/);
  assert.equal(result.repairs, MAX_REPAIRS + 1);
});

test('a tool that failed and is then re-called is retried, not refused', async () => {
  // Only *successful* calls are recorded as completed. A rejected call must stay
  // retryable, since repairing it in the same conversation is the whole design.
  let attempts = 0;
  const h = loop([[{ name: 'set_steps' }]], () => {
    attempts += 1;
    return attempts === 1 ? { ok: false, errors: ['anchor not found'] } : ok;
  });
  const result = await h.run();

  assert.equal(result.failure, null);
  assert.equal(attempts, 2, 'the second attempt actually executed');
  assert.equal(result.terminalToolCalled, true);
});
