import { test } from 'node:test';
import assert from 'node:assert/strict';
import { IDBFactory } from 'fake-indexeddb';

import { IdbStore, normalizeLabel, previouslyAsked, type IDBFactoryLike } from '../src/core/idb-store.ts';
import { emptyRecord } from '../src/core/profile.ts';
import type { KnowledgePoint, SessionRecord } from '../src/core/types.ts';

const ISO = '2026-07-27T00:00:00.000Z';

async function freshStore(): Promise<IdbStore> {
  // A new factory per test = a fresh database, no cross-test bleed.
  const factory = new IDBFactory() as unknown as IDBFactoryLike;
  return IdbStore.open({ factory, name: `tutor-test-${Math.random().toString(36).slice(2)}` });
}

function kp(over: Partial<KnowledgePoint> = {}): KnowledgePoint {
  return {
    id: 'kp:entropy',
    label: '熵作为相空间体积的对数',
    aliases: ['Boltzmann 熵'],
    sources: [{ page: 'ebooks/x/chapter_27', sectionId: '273-熵' }],
    prerequisites: ['kp:phase-space'],
    createdAt: ISO,
    updatedAt: ISO,
    ...over,
  };
}

test('mastery round-trips through IndexedDB', async () => {
  const store = await freshStore();
  const record = { ...emptyRecord('kp:entropy', ISO), level: 0.72, confidence: 0.55 };
  await store.putMastery(record);

  const [read] = await store.getMastery(['kp:entropy']);
  assert.equal(read?.level, 0.72);
  assert.deepEqual(await store.getMastery(['kp:missing']), []);
  store.close();
});

test('knowledge points dedup by exact id', async () => {
  const store = await freshStore();
  await store.upsertKnowledgePoints([kp()]);
  const again = await store.upsertKnowledgePoints([kp({ aliases: ['coarse-grained volume'] })]);

  assert.equal(again[0]?.id, 'kp:entropy');
  assert.deepEqual(
    again[0]?.aliases.sort(),
    ['Boltzmann 熵', 'coarse-grained volume'].sort(),
    'aliases merge rather than replace',
  );
  assert.equal((await store.getAllKnowledgePoints()).length, 1);
  store.close();
});

test('a different proposed id with the same label reuses the canonical id', async () => {
  const store = await freshStore();
  await store.upsertKnowledgePoints([kp()]);

  // This is what makes the profile accumulate across sections instead of
  // fragmenting: the planner proposing a fresh slug must not create a twin.
  const merged = await store.upsertKnowledgePoints([
    kp({ id: 'kp:entropy-phase-volume', label: '熵作为相空间体积的对数' }),
  ]);
  assert.equal(merged[0]?.id, 'kp:entropy', 'must reuse the existing id');
  assert.equal((await store.getAllKnowledgePoints()).length, 1);
  store.close();
});

test('an alias match also reuses the canonical id', async () => {
  const store = await freshStore();
  await store.upsertKnowledgePoints([kp()]);
  const merged = await store.upsertKnowledgePoints([
    kp({ id: 'kp:boltzmann', label: 'Boltzmann 熵', aliases: [] }),
  ]);
  assert.equal(merged[0]?.id, 'kp:entropy');
  store.close();
});

test('normalizeLabel folds whitespace and case', () => {
  assert.equal(normalizeLabel('Boltzmann 熵'), 'boltzmann熵');
  assert.equal(normalizeLabel('  A  B '), 'ab');
});

function session(over: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: 'sess:1',
    page: 'ebooks/The_Road_to_Reality/chapter_27',
    sectionId: '273-熵',
    sectionTitle: '27.3 熵',
    state: 'DONE',
    status: 'completed',
    settingsSnapshot: {
      model: 'm',
      language: 'zh',
      reasoningEffort: 'high',
      genrePreference: 'descriptive-first',
      stepRange: [3, 5],
    },
    analysis: null,
    plan: null,
    cursor: { stepIndex: 0, variant: 0, backtrackDepth: 0 },
    toolLog: [],
    steps: [],
    achievement: null,
    summary: null,
    usage: { calls: 0, promptTokens: 0, completionTokens: 0, reasoningTokens: 0 },
    degradedContext: false,
    degradedTools: false,
    createdAt: ISO,
    updatedAt: ISO,
    endedAt: null,
    ...over,
  };
}

test('by_page_section index finds sessions for resume, filtered by status', async () => {
  const store = await freshStore();
  await store.saveSession(session({ id: 'sess:1', status: 'completed' }));
  await store.saveSession(session({ id: 'sess:2', status: 'active' }));
  await store.saveSession(
    session({ id: 'sess:3', sectionId: '274-熵概念的鲁棒性', status: 'completed' }),
  );

  const all = await store.findSessions({
    page: 'ebooks/The_Road_to_Reality/chapter_27',
    sectionId: '273-熵',
  });
  assert.equal(all.length, 2, 'index must not leak other sections');

  const active = await store.findSessions({
    page: 'ebooks/The_Road_to_Reality/chapter_27',
    sectionId: '273-熵',
    status: 'active',
  });
  assert.deepEqual(active.map((s) => s.id), ['sess:2']);
  store.close();
});

test('previouslyAsked projects questions from the last completed sessions', async () => {
  const store = await freshStore();
  await store.saveSession(
    session({
      id: 'sess:old',
      steps: [
        {
          id: 's1',
          title: 't',
          goal: 'g',
          knowledgePointIds: ['kp:entropy'],
          targetLevel: 1,
          questionGenre: 'descriptive',
          anchors: [],
          inserted: false,
          isPrep: false,
          passed: true,
          chipState: 'passed',
          attempts: [
            {
              attemptId: 'q1',
              variant: 0,
              genre: 'descriptive',
              question: '为什么熵是体积的对数？',
              setup: null,
              rubric: {},
              expectedPoints: [],
              hintLadder: [],
              sourceAnchor: 'x',
              targetsMisreading: null,
              answer: null,
              hintsUsed: 0,
              score: 4,
              evaluation: null,
              pointsHit: [],
              pointsMissed: [],
              misconceptions: [],
              answerQuality: null,
              at: ISO,
              discussion: [],
              discussedPoints: [],
              exitChoice: null,
            },
          ],
        },
      ],
    }),
  );

  const asked = await previouslyAsked(
    store,
    'ebooks/The_Road_to_Reality/chapter_27',
    '273-熵',
  );
  assert.deepEqual(asked, ['为什么熵是体积的对数？']);
  store.close();
});
