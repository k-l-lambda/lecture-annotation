/**
 * The connection test that gates 保存 in the settings dialog (settings.md §2).
 *
 * It exists because a browser client cannot work around a gateway that omits
 * `Access-Control-Allow-Origin`, and cannot discover that fact from a failed
 * session either — `fetch` reports a CORS rejection as a bare `TypeError` with no
 * status, indistinguishable from a network outage unless you know to look. So the
 * probe classifies the failure while the student is still in the dialog and can
 * act on it, rather than during planning where it reads as "Tutor is broken".
 *
 * **Tool calling is required, not probed-and-noted.** Every state change in the
 * harness is a tool call (tools.md), so a gateway that drops `tools` would run a
 * session that plans nothing and grades nothing. The dialog refuses to save.
 */

import { HttpLlm, normalizeBaseUrl } from '../../core/provider.ts';
import type { Settings } from '../../core/types.ts';

export interface ProbeResult {
  ok: boolean;
  /** Which layer failed; `null` on success. Drives the message, not the copy. */
  failure:
    | 'cors'
    | 'unreachable'
    | 'network'
    | 'auth'
    | 'path'
    | 'model'
    | 'timeout'
    | 'tools-unsupported'
    | 'empty'
    | 'unknown'
    | null;
  message: string;
  /** Capabilities observed, so the harness never has to discover them mid-session. */
  toolCalls: boolean;
  reasoning: boolean;
  streaming: boolean;
  /** Round-trip in ms, shown so a very slow gateway is visible before use. */
  elapsedMs: number;
}

/** A trivial tool: the model has one obvious call to make, so a failure to call
 *  it is a capability signal rather than a prompt-difficulty artefact. */
const PROBE_TOOL = {
  type: 'function',
  function: {
    name: 'report_ready',
    description: 'Report that you are ready. Call this immediately.',
    parameters: {
      type: 'object',
      properties: { ok: { type: 'boolean', description: 'always true' } },
      required: ['ok'],
    },
  },
};

const PROBE_TIMEOUT_MS = 20_000;

export async function probeConnection(
  settings: Pick<Settings, 'baseUrl' | 'apiKey' | 'model' | 'flavor'>,
  fetchImpl?: typeof fetch,
): Promise<ProbeResult> {
  const started = Date.now();
  const base: Omit<ProbeResult, 'ok' | 'failure' | 'message'> = {
    toolCalls: false,
    reasoning: false,
    streaming: false,
    elapsedMs: 0,
  };

  const llm = new HttpLlm({
    baseUrl: normalizeBaseUrl(settings.baseUrl),
    apiKey: settings.apiKey,
    flavor: settings.flavor,
    timeoutMs: PROBE_TIMEOUT_MS,
    ...(fetchImpl ? { fetchImpl } : {}),
  });

  try {
    const response = await llm.call({
      role: 'router',
      model: settings.model,
      messages: [
        { role: 'system', content: 'You are a connectivity probe. Call report_ready at once.' },
        { role: 'user', content: 'ready?' },
      ],
      tools: [PROBE_TOOL],
      toolChoice: 'required',
      temperature: 0,
      // Small but not tiny: a 200-token cap on a reasoning model returned empty
      // text in this codebase before, because thinking consumed the whole budget.
      maxOutputTokens: 512,
      reasoningEffort: 'off',
    });

    const elapsedMs = Date.now() - started;
    const calledTool = response.toolCalls.some((c) => c.name === 'report_ready');

    if (calledTool) {
      return {
        ok: true,
        failure: null,
        message: `连接正常（${(elapsedMs / 1000).toFixed(1)}s），支持工具调用。`,
        ...base,
        toolCalls: true,
        reasoning: response.reasoningUnsupported !== true,
        streaming: typeof llm.stream === 'function',
        elapsedMs,
      };
    }

    if (response.toolCalls.length === 0 && !response.text.trim()) {
      return {
        ok: false,
        failure: 'empty',
        message:
          '接口返回了空回复：可能是 maxOutputTokens 太小，或该模型忽略了 tool_choice。' +
          '换一个模型再试。',
        ...base,
        elapsedMs,
      };
    }

    return {
      ok: false,
      failure: 'tools-unsupported',
      message:
        '该接口/模型没有执行工具调用。Tutor 的每一次状态变更都是工具调用，' +
        '因此无法在这个配置下工作——请换一个支持 function calling 的模型或网关。',
      ...base,
      reasoning: response.reasoningUnsupported !== true,
      elapsedMs,
    };
  } catch (err) {
    const elapsedMs = Date.now() - started;
    let described = describeProbeFailure(err, settings.model);
    // `network` means "opaque fetch failure" and nothing more; only a second,
    // credential-free request can say whether anything is listening. Doing it here
    // rather than in describeProbeFailure keeps that function synchronous and
    // total, which is what the message-distinctness test relies on.
    if (described.failure === 'network') {
      described = await distinguishNetworkFailure(settings.baseUrl, fetchImpl);
    }
    return { ...described, ...base, elapsedMs };
  }
}

/**
 * Tells a CORS rejection apart from a host that is simply not there.
 *
 * Both arrive as a bare `TypeError`, but the fixes are opposites — change gateway
 * versus start/point-at the server — so guessing either way sends half the students
 * down the wrong path. A `no-cors` request is exempt from the same-origin check, so
 * it resolves (opaquely) whenever a server answered at all: resolve means the host
 * is up and CORS was the blocker, reject means nothing answered.
 */
async function distinguishNetworkFailure(
  baseUrl: string,
  fetchImpl?: typeof fetch,
): Promise<Pick<ProbeResult, 'ok' | 'failure' | 'message'>> {
  const doFetch = fetchImpl ?? globalThis.fetch;
  if (!doFetch) return CORS_FAILURE;
  try {
    await doFetch(normalizeBaseUrl(baseUrl), {
      method: 'GET',
      mode: 'no-cors',
      // No Authorization header: `no-cors` would reject it as a non-simple header,
      // and reachability is all this asks.
      signal: AbortSignal.timeout(5000),
    });
    return CORS_FAILURE;
  } catch {
    return {
      ok: false,
      failure: 'unreachable',
      message:
        '连不上这个地址：没有任何服务响应。请检查 Base URL 拼写、端口，以及本机服务是否已启动。',
    };
  }
}

const CORS_FAILURE: Pick<ProbeResult, 'ok' | 'failure' | 'message'> = {
  ok: false,
  failure: 'cors',
  message:
    '服务有响应，但浏览器被 CORS 拦截：该接口未返回 Access-Control-Allow-Origin。' +
    '网页端无法绕过，请换一个允许浏览器直连的网关。',
};

/**
 * Maps a thrown error onto the table in settings.md §2. Exported separately
 * because each branch needs its own message naming its own cause — a single
 * "连接失败" would leave the student with no next action, and CORS in particular
 * looks identical to an outage unless it is called out by name.
 */
export function describeProbeFailure(
  err: unknown,
  model: string,
): Pick<ProbeResult, 'ok' | 'failure' | 'message'> {
  const status = (err as { status?: number }).status;
  const text = err instanceof Error ? err.message : String(err);

  if (status === 401 || status === 403) {
    return { ok: false, failure: 'auth', message: '密钥被拒绝（401/403）。' };
  }
  if (status === 404 || status === 400) {
    // Both codes are ambiguous between "wrong path" and "wrong model", and the
    // fix differs, so the body decides which one to name.
    if (new RegExp(model.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(text) || /model/i.test(text)) {
      return { ok: false, failure: 'model', message: `模型 ${model} 不可用。` };
    }
    return {
      ok: false,
      failure: 'path',
      message: '路径不存在，请检查 Base URL 是否需要 /v1 结尾。',
    };
  }
  if (/abort|timeout/i.test(text)) {
    return {
      ok: false,
      failure: 'timeout',
      message: `超时（>${PROBE_TIMEOUT_MS / 1000}s），接口可达但未响应。`,
    };
  }
  // A TypeError with no status is all `fetch` gives for *both* a CORS rejection and
  // a host that never answered — the spec deliberately withholds the difference. So
  // this branch reports only what is known, and `probeConnection` runs a second
  // `no-cors` request to decide which one to tell the student about. Naming CORS
  // here would be a guess, and it is the guess that reads as authoritative.
  if (err instanceof TypeError || /failed to fetch|load failed|networkerror/i.test(text)) {
    return {
      ok: false,
      failure: 'network',
      message: '请求没有发出去（CORS 拦截或地址不可达），正在判断具体原因…',
    };
  }
  return { ok: false, failure: 'unknown', message: `连接失败：${text}` };
}
