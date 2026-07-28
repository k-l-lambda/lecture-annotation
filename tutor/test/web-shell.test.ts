/**
 * Web shell adapters, tested headless.
 *
 * These are the parts of the browser shell that are pure enough to test without a
 * DOM: settings persistence and the sidecar fetch/cache/fallback decision. The
 * rendering is verified in a real browser instead — asserting against a fake DOM
 * would mostly test the fake.
 *
 * Imported from `src/shells/web/`, which the main tsconfig excludes (it has no DOM
 * lib). `node --test --experimental-strip-types` only strips types, so it runs
 * these fine; `tsconfig.web.json` is what typechecks them.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  SettingsStore,
  memoryStorage,
  KEY_STORAGE_KEY,
  SETTINGS_KEY,
} from '../src/shells/web/settings-store.ts';
import { SidecarContent, type Sidecar } from '../src/shells/web/sidecar-content.ts';
import { describeProbeFailure, probeConnection } from '../src/shells/web/probe.ts';
import { defaultSettings } from '../src/core/settings.ts';
import { HttpError } from '../src/core/provider.ts';

function env() {
  return { local: memoryStorage(), session: memoryStorage() };
}

// ---------------------------------------------------------------------------
// Settings store
// ---------------------------------------------------------------------------

test('nothing stored yields defaults with no warnings', () => {
  const { settings, warnings, path } = new SettingsStore(env()).load();
  assert.equal(path, null);
  assert.deepEqual(warnings, []);
  assert.equal(settings.callBudgetPerSession, 40);
});

test('the api key is stored apart from the settings object', () => {
  const e = env();
  const store = new SettingsStore(e);
  store.save({ ...defaultSettings(), apiKey: 'sk-secret', model: 'm', baseUrl: 'https://x/v1' });

  const persisted = e.local.getItem(SETTINGS_KEY)!;
  assert.ok(!persisted.includes('sk-secret'), 'key must not be inside tutor.settings');
  assert.equal(e.local.getItem(KEY_STORAGE_KEY), 'sk-secret');
  assert.equal(store.load().settings.apiKey, 'sk-secret');
});

test("keyMode 'session' keeps the key out of localStorage, and switching clears the old copy", () => {
  const e = env();
  const store = new SettingsStore(e);
  const base = { ...defaultSettings(), apiKey: 'sk-a', model: 'm', baseUrl: 'https://x/v1' };

  store.save(base, 'local');
  assert.equal(e.local.getItem(KEY_STORAGE_KEY), 'sk-a');

  store.save(base, 'session');
  // The point of the mode is that the key stops persisting; a leftover copy in
  // localStorage would silently defeat it.
  assert.equal(e.local.getItem(KEY_STORAGE_KEY), null);
  assert.equal(e.session.getItem(KEY_STORAGE_KEY), 'sk-a');
  assert.equal(store.load().settings.apiKey, 'sk-a');
});

test('a hand-edited value is clamped on read, not trusted', () => {
  const e = env();
  e.local.setItem(SETTINGS_KEY, JSON.stringify({ callBudgetPerSession: 99999, stepRange: [9, 9] }));

  const { settings } = new SettingsStore(e).load();
  assert.equal(settings.callBudgetPerSession, 500);
  assert.deepEqual(settings.stepRange, [6, 6]);
});

test('unparseable settings fall back to defaults with a warning rather than throwing', () => {
  const e = env();
  e.local.setItem(SETTINGS_KEY, '{not json');

  const { settings, warnings } = new SettingsStore(e).load();
  assert.equal(settings.callBudgetPerSession, 40);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0]!, /无法解析/);
});

test('configured() requires all three of baseUrl, apiKey and model', () => {
  const e = env();
  const store = new SettingsStore(e);
  assert.equal(store.configured(), false);

  store.save({ ...defaultSettings(), baseUrl: 'https://x/v1', model: 'm', apiKey: '' });
  assert.equal(store.configured(), false, 'no key is not configured');

  store.save({ ...defaultSettings(), baseUrl: 'https://x/v1', model: 'm', apiKey: 'sk' });
  assert.equal(store.configured(), true);
});

test('exportable() omits the key by construction', () => {
  const store = new SettingsStore(env());
  const json = store.exportable({ ...defaultSettings(), apiKey: 'sk-leak', model: 'm' });
  assert.ok(!json.includes('sk-leak'));
  assert.ok(json.includes('"model": "m"'));
});

test('a storage that throws on write does not throw out of save()', () => {
  const hostile = {
    getItem: () => null,
    setItem: () => {
      throw new Error('QuotaExceededError');
    },
    removeItem: () => {},
  };
  const store = new SettingsStore({ local: hostile, session: hostile });
  // Reported as false rather than raised: the settings dialog can say persistence
  // failed, but a page that cannot write localStorage must still render.
  assert.equal(store.save({ ...defaultSettings(), apiKey: 'k' }), false);
});

// ---------------------------------------------------------------------------
// Sidecar content
// ---------------------------------------------------------------------------

const SIDECAR: Sidecar = {
  page: 'ebooks/x/chapter_27',
  pageUrl: '/lecture-annotation/ebooks/x/chapter_27/',
  title: '第二十七章',
  kind: 'ebook',
  generatedAt: '2026-07-28T00:00:00Z',
  sections: [
    {
      id: '273-熵',
      idSource: 'slugify',
      heading: '27.3 熵',
      tutorTitle: null,
      level: 2,
      spanEndsAt: '274-下一节',
      hint: null,
      chars: 12,
      annotation: '熵是相空间体积的对数。',
      transcript: null,
      subHeadings: [],
      formulaCount: 2,
      links: [],
      truncated: false,
    },
  ],
};

function contentWith(response: { ok: boolean; body?: unknown }, cache?: Map<string, string>) {
  let calls = 0;
  const fetchImpl = (async () => {
    calls += 1;
    return {
      ok: response.ok,
      json: async () => response.body,
    } as unknown as Response;
  }) as unknown as typeof fetch;

  const content = new SidecarContent({
    fetchImpl,
    pathname: () => '/lecture-annotation/ebooks/x/chapter_27/',
    ...(cache
      ? {
          cache: {
            getItem: (k: string) => cache.get(k) ?? null,
            setItem: (k: string, v: string) => void cache.set(k, v),
          },
        }
      : {}),
  });
  return { content, calls: () => calls };
}

test('a section resolves from the sidecar with math still LaTeX', async () => {
  const { content } = contentWith({ ok: true, body: SIDECAR });
  const section = await content.getSection('ebooks/x/chapter_27', '273-熵');

  assert.ok(section);
  assert.equal(section.annotation, '熵是相空间体积的对数。');
  assert.equal(section.formulaCount, 2);
  assert.equal(section.fromSource, true);
  assert.equal(content.degradedPages.has('ebooks/x/chapter_27'), false);
});

test('the sidecar is fetched once per page and then served from memory', async () => {
  const { content, calls } = contentWith({ ok: true, body: SIDECAR });
  await content.getSection('ebooks/x/chapter_27', '273-熵');
  await content.getSection('ebooks/x/chapter_27', '273-熵');
  await content.list();
  assert.equal(calls(), 1);
});

test('sessionStorage serves a reload without refetching', async () => {
  const cache = new Map<string, string>();
  const first = contentWith({ ok: true, body: SIDECAR }, cache);
  await first.content.getSection('ebooks/x/chapter_27', '273-熵');
  assert.equal(first.calls(), 1);
  assert.equal(cache.size, 1);

  // A fresh instance is what a reload produces: same tab, empty memory cache.
  const second = contentWith({ ok: false }, cache);
  const section = await second.content.getSection('ebooks/x/chapter_27', '273-熵');
  assert.equal(second.calls(), 0, 'cache hit must not reach the network');
  assert.equal(section?.annotation, '熵是相空间体积的对数。');
});

test('a corrupt cache entry falls through to the network instead of failing', async () => {
  const cache = new Map([['tutor.sidecar./lecture-annotation/ebooks/x/chapter_27.tutor-sections.json', '{bad']]);
  const { content, calls } = contentWith({ ok: true, body: SIDECAR }, cache);
  const section = await content.getSection('ebooks/x/chapter_27', '273-熵');
  assert.equal(calls(), 1);
  assert.ok(section);
});

test('a 404 with no DOM yields null rather than throwing', async () => {
  const { content } = contentWith({ ok: false });
  assert.equal(await content.getSection('ebooks/x/chapter_27', '273-熵'), null);
});

test('an unknown section id in a present sidecar is not silently another section', async () => {
  const { content } = contentWith({ ok: true, body: SIDECAR });
  assert.equal(await content.getSection('ebooks/x/chapter_27', '999-不存在'), null);
});

test('a truncated section is treated as unusable, not half-usable', async () => {
  const truncated: Sidecar = {
    ...SIDECAR,
    sections: [{ ...SIDECAR.sections[0]!, truncated: true }],
  };
  const { content } = contentWith({ ok: true, body: truncated });
  // Half a section fails the anchor gate on the missing half in a way that looks
  // like a model error, so the DOM fallback (null here, with no DOM) is correct.
  assert.equal(await content.getSection('ebooks/x/chapter_27', '273-熵'), null);
});

test('list() reports what a picker shows, and is empty without a sidecar', async () => {
  const present = contentWith({ ok: true, body: SIDECAR });
  assert.deepEqual(await present.content.list(), [
    { id: '273-熵', heading: '27.3 熵', chars: 12, formulas: 2 },
  ]);

  const absent = contentWith({ ok: false });
  assert.deepEqual(await absent.content.list(), []);
});

// ---------------------------------------------------------------------------
// Connection probe
//
// Each branch gets its own assertion because each needs its own message naming
// its own cause: "连接失败" for a CORS rejection leaves the student with nothing
// to act on, and CORS is exactly the failure a browser cannot work around.
// ---------------------------------------------------------------------------

test('a TypeError with no status is not yet attributed to CORS', () => {
  // `fetch` reports a CORS rejection and an absent host identically, so the
  // synchronous classifier must not pick one — `probeConnection` decides with a
  // second request. Asserting the weaker label here is the point of the test.
  const result = describeProbeFailure(new TypeError('Failed to fetch'), 'pa/x');
  assert.equal(result.failure, 'network');
});

test('401 and 403 are the key, not the path', () => {
  for (const status of [401, 403]) {
    const result = describeProbeFailure(new HttpError(status, 'unauthorized'), 'pa/x');
    assert.equal(result.failure, 'auth', `status ${status}`);
  }
});

test('a 404 naming the model says the model, a bare 404 says the path', () => {
  const modelFail = describeProbeFailure(new HttpError(404, 'model pa/nope not found'), 'pa/nope');
  assert.equal(modelFail.failure, 'model');
  assert.match(modelFail.message, /pa\/nope/);

  const pathFail = describeProbeFailure(new HttpError(404, 'Not Found'), 'pa/nope');
  assert.equal(pathFail.failure, 'path');
  assert.match(pathFail.message, /\/v1/);
});

test('a model id with regex metacharacters does not break classification', () => {
  // `pa/gpt-5.2` contains `.`, which as a pattern would match any character and
  // could misclassify an unrelated body as a model error.
  const result = describeProbeFailure(new HttpError(404, 'Not Found'), 'pa/gpt-5.2');
  assert.equal(result.failure, 'path');
});

test('an abort is a timeout, distinct from an outage', () => {
  const result = describeProbeFailure(new Error('The operation was aborted'), 'pa/x');
  assert.equal(result.failure, 'timeout');
});

test('every probe failure branch produces a distinct message', () => {
  const messages = [
    describeProbeFailure(new TypeError('Failed to fetch'), 'm'),
    describeProbeFailure(new HttpError(401, 'nope'), 'm'),
    describeProbeFailure(new HttpError(404, 'Not Found'), 'm'),
    describeProbeFailure(new HttpError(404, 'model m missing'), 'm'),
    describeProbeFailure(new Error('aborted'), 'm'),
    describeProbeFailure(new Error('something else entirely'), 'm'),
  ].map((r) => r.message);
  assert.equal(new Set(messages).size, messages.length, 'two branches share a message');
});

// The two halves of the opaque `TypeError`: same thrown error, opposite advice, so
// the reachability retry has to decide it rather than the copy.
test('an opaque fetch failure with something listening is named as CORS', async () => {
  let calls = 0;
  const fetchImpl = (async (_url: string, init?: RequestInit) => {
    calls += 1;
    if (init?.mode === 'no-cors') {
      // An opaque response: a server answered, the browser just will not show it.
      return { ok: false, status: 0, type: 'opaque' } as unknown as Response;
    }
    throw new TypeError('Failed to fetch');
  }) as unknown as typeof fetch;

  const result = await probeConnection(
    { baseUrl: 'https://blocked.example/v1', apiKey: 'k', model: 'm', flavor: 'openai' },
    fetchImpl,
  );
  assert.equal(result.failure, 'cors');
  assert.match(result.message, /Access-Control-Allow-Origin/);
  assert.equal(calls, 2, 'the reachability retry did not run');
});

test('an opaque fetch failure with nothing listening is named as unreachable', async () => {
  const fetchImpl = (async () => {
    throw new TypeError('Failed to fetch');
  }) as unknown as typeof fetch;

  const result = await probeConnection(
    { baseUrl: 'http://127.0.0.1:9/v1', apiKey: 'k', model: 'm', flavor: 'openai' },
    fetchImpl,
  );
  assert.equal(result.failure, 'unreachable');
  // Must not blame CORS: the student's fix here is the address or the server.
  assert.doesNotMatch(result.message, /CORS/);
  assert.match(result.message, /Base URL/);
});

test('a gateway that ignores tools refuses to pass the probe', async () => {
  const fetchImpl = (async () =>
    ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({
        choices: [{ message: { content: 'sure, ready!' } }],
        usage: {},
      }),
    }) as unknown as Response) as unknown as typeof fetch;

  const result = await probeConnection(
    { baseUrl: 'https://x/v1', apiKey: 'k', model: 'm', flavor: 'openai' },
    fetchImpl,
  );
  assert.equal(result.ok, false);
  assert.equal(result.failure, 'tools-unsupported');
  assert.equal(result.toolCalls, false);
  // Refusing to save is the point: state lives in tool calls, so a session here
  // would plan nothing and grade nothing.
  assert.match(result.message, /工具调用/);
});

test('a tool call in the response passes and records the capability', async () => {
  const fetchImpl = (async () =>
    ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({
        choices: [
          {
            message: {
              content: '',
              tool_calls: [
                { id: '1', type: 'function', function: { name: 'report_ready', arguments: '{"ok":true}' } },
              ],
            },
          },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 4 },
      }),
    }) as unknown as Response) as unknown as typeof fetch;

  const result = await probeConnection(
    { baseUrl: 'https://x/v1', apiKey: 'k', model: 'm', flavor: 'openai' },
    fetchImpl,
  );
  assert.equal(result.ok, true);
  assert.equal(result.failure, null);
  assert.equal(result.toolCalls, true);
});

test('an empty reply is called out as such, not as a tool failure', async () => {
  const fetchImpl = (async () =>
    ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ choices: [{ message: { content: '' } }], usage: {} }),
    }) as unknown as Response) as unknown as typeof fetch;

  const result = await probeConnection(
    { baseUrl: 'https://x/v1', apiKey: 'k', model: 'm', flavor: 'openai' },
    fetchImpl,
  );
  // The distinction matters: an empty reply is usually a too-small token budget on
  // a reasoning model, which is fixable, whereas tools-unsupported is not.
  assert.equal(result.failure, 'empty');
});
