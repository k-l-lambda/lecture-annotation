/**
 * Tool declarations. Transcribed from design.local/tutor/tools.md §2-§5.
 *
 * This file is the single source of truth for what goes on the wire: the JSON
 * Schema handed to the model and the argument types the handlers receive are
 * derived from the same table, so a tool the prompt names but the harness does
 * not implement is a compile error rather than a runtime surprise
 * (prompts/README.md, Build).
 */

import {
  QUESTION_GENRES,
  type AnswerQuality,
  type BacktrackReason,
  type ExpectedPoint,
  type QuestionGenre,
  type RoleName,
  type SectionAnalysis,
  type SuggestedNext,
  type TargetLevel,
} from './types.ts';

// ---------------------------------------------------------------------------
// Argument shapes, one per tool
// ---------------------------------------------------------------------------

export interface GetStudentProfileArgs {
  kpHints: string[];
  includeAchievements?: boolean;
}

export type AnalyzeSectionArgs = SectionAnalysis;

export interface UpsertKnowledgePointsArgs {
  knowledgePoints: Array<{
    id: string;
    label: string;
    aliases?: string[];
    prerequisites?: string[];
    coreIdea?: string;
  }>;
}

export interface SetStepsArgs {
  steps: Array<{
    id: string;
    title: string;
    goal: string;
    knowledgePointIds: string[];
    targetLevel: TargetLevel;
    questionGenre: QuestionGenre;
    anchors: string[];
  }>;
  prep: { include: boolean; reason: string; focusKpIds: string[] };
  rationale: string;
}

export interface AskQuestionArgs {
  stepId: string;
  variant: number;
  genre: QuestionGenre;
  question: string;
  setup: string | null;
  expectedPoints: ExpectedPoint[];
  rubric: Record<string, string>;
  hintLadder: string[];
  sourceAnchor: string;
  targetsMisreading: string | null;
}

export interface SubmitEvaluationArgs {
  questionId: string;
  score: number;
  evaluation: string;
  pointsHit: string[];
  pointsMissed: string[];
  misconceptions: string[];
  answerQuality: AnswerQuality;
  missingPrerequisiteKpId: string | null;
  suggestedNext: SuggestedNext;
}

export interface UpdateMasteryArgs {
  /** Omitted = the current step. Named explicitly by the concurrent profiler. */
  stepId?: string;
  evidence: Array<{ kpId: string; observed: number; note?: string }>;
  source: 'graded' | 'discussion';
}

export interface InsertPrerequisiteStepArgs {
  beforeStepId: string;
  title: string;
  goal: string;
  knowledgePointIds: string[];
  reason: BacktrackReason;
}

export interface ProposeAchievementArgs {
  name: string;
  description: string;
  basis: string;
  knowledgePointIds: string[];
}

export interface FinishSessionArgs {
  summary: string;
  strengths: string[];
  gaps: string[];
  nextActions: Array<{ text: string; sectionRef: string | null }>;
}

/** Maps every tool name to its argument type. The handler table is keyed on this. */
export interface ToolArgMap {
  get_student_profile: GetStudentProfileArgs;
  analyze_section: AnalyzeSectionArgs;
  upsert_knowledge_points: UpsertKnowledgePointsArgs;
  set_steps: SetStepsArgs;
  ask_question: AskQuestionArgs;
  submit_evaluation: SubmitEvaluationArgs;
  update_mastery: UpdateMasteryArgs;
  insert_prerequisite_step: InsertPrerequisiteStepArgs;
  propose_achievement: ProposeAchievementArgs;
  finish_session: FinishSessionArgs;
}

export type ToolName = keyof ToolArgMap;

// ---------------------------------------------------------------------------
// JSON Schema fragments
// ---------------------------------------------------------------------------

type JsonSchema = Record<string, unknown>;

const str = (description: string, extra: JsonSchema = {}): JsonSchema => ({
  type: 'string',
  description,
  ...extra,
});

const strArray = (description: string, extra: JsonSchema = {}): JsonSchema => ({
  type: 'array',
  description,
  items: { type: 'string' },
  ...extra,
});

const ANCHOR_NOTE = '必须是本节原文的逐字片段（系统会核对，编造会被拒绝）';

export interface ToolDeclaration {
  name: ToolName;
  description: string;
  parameters: JsonSchema;
}

const DECLARATIONS: Record<ToolName, ToolDeclaration> = {
  get_student_profile: {
    name: 'get_student_profile',
    description: '读取学生档案摘要（已衰减的有效掌握度）。可重复调用，不改变状态。',
    parameters: {
      type: 'object',
      properties: {
        kpHints: strArray('本节可能涉及的知识点关键词，用于筛选相关档案条目'),
        includeAchievements: { type: 'boolean', description: '是否包含最近的成就' },
      },
      required: ['kpHints'],
    },
  },

  analyze_section: {
    name: 'analyze_section',
    description:
      '提交你对本节原文的通读结果。这是设定步骤的前置条件：未通过本工具，set_steps 会被拒绝。',
    parameters: {
      type: 'object',
      properties: {
        coreQuestion: str('这一节要回答的问题，≤ 1 句'),
        argumentChain: {
          type: 'array',
          description: '本节的论证链条，至少 3 环，且至少包含一个 conclusion',
          items: {
            type: 'object',
            properties: {
              claim: str('原文的一个论断'),
              sourceAnchor: str(`原文片段 10–40 字。${ANCHOR_NOTE}`),
              role: { type: 'string', enum: ['premise', 'derivation', 'conclusion'] },
            },
            required: ['claim', 'sourceAnchor', 'role'],
          },
        },
        formulas: {
          type: 'array',
          description: '本节公式及其含义。需覆盖本节独立公式块的 60% 以上。',
          items: {
            type: 'object',
            properties: {
              latex: str('公式的 LaTeX'),
              meaning: str('这个公式说了什么，≤ 1 句'),
              sourceAnchor: str(`原文片段。${ANCHOR_NOTE}`),
            },
            required: ['latex', 'meaning', 'sourceAnchor'],
          },
        },
        conceptsIntroducedHere: strArray('本节新引入的概念'),
        conceptsAssumedKnown: strArray('本节假定读者已知的概念'),
        commonMisreadings: {
          type: 'array',
          description: '学生最容易误读的地方，至少 1 条；后续出题会针对这些误读',
          items: {
            type: 'object',
            properties: {
              misreading: str('误读内容'),
              whyTempting: str('为什么容易这样误读'),
              correction: str('正确的理解'),
            },
            required: ['misreading', 'whyTempting', 'correction'],
          },
        },
        sectionDifficulty: { type: 'string', enum: ['low', 'medium', 'high'] },
        notInSection: strArray('学生可能问、但本节没有讲的点'),
      },
      required: [
        'coreQuestion',
        'argumentChain',
        'formulas',
        'conceptsIntroducedHere',
        'conceptsAssumedKnown',
        'commonMisreadings',
        'sectionDifficulty',
      ],
    },
  },

  upsert_knowledge_points: {
    name: 'upsert_knowledge_points',
    description:
      '登记本节涉及的知识点。系统会与已有词表去重，返回规范 id —— 以返回的 id 为准，可能与你提议的不同。',
    parameters: {
      type: 'object',
      properties: {
        knowledgePoints: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: str('kp:<slug> 形式，小写英文与连字符'),
              label: str('知识点名称，用对话语言书写'),
              aliases: strArray('别名，含英文原名'),
              prerequisites: strArray('前置知识点的 kp: id'),
              coreIdea: str('一句话核心，≤ 1 句'),
            },
            required: ['id', 'label'],
          },
        },
      },
      required: ['knowledgePoints'],
    },
  },

  set_steps: {
    name: 'set_steps',
    description:
      '写入学习阶梯。必须先通过 analyze_section。返回值里的 prepIncluded 由系统决定，以它为准。',
    parameters: {
      type: 'object',
      properties: {
        steps: {
          type: 'array',
          description: 'targetLevel 必须单调不减；步数受设置的 stepRange 限制',
          items: {
            type: 'object',
            properties: {
              id: str('步骤 id，如 s1'),
              title: str('步骤标题，≤ 20 字'),
              goal: str('这一步要达到的、可观察的能力'),
              knowledgePointIds: strArray('本步针对的知识点 id'),
              targetLevel: {
                type: 'integer',
                enum: [1, 2, 3],
                description: '1=识别/复述 2=应用/计算 3=迁移/解释为什么',
              },
              questionGenre: { type: 'string', enum: [...QUESTION_GENRES] },
              anchors: strArray(`本步依据的原文片段。${ANCHOR_NOTE}`),
            },
            required: ['id', 'title', 'goal', 'knowledgePointIds', 'targetLevel', 'questionGenre', 'anchors'],
          },
        },
        prep: {
          type: 'object',
          description: '准备步骤建议。是否真的保留由系统的档案规则决定。',
          properties: {
            include: { type: 'boolean' },
            reason: str('理由'),
            focusKpIds: strArray('准备步骤应确认的前置知识点'),
          },
          required: ['include', 'reason', 'focusKpIds'],
        },
        rationale: str('为什么是这条阶梯，≤ 2 句'),
      },
      required: ['steps', 'prep', 'rationale'],
    },
  },

  ask_question: {
    name: 'ask_question',
    description:
      '为当前步骤出一道题。不得是是非题或选择题；答案不能在原文同一句里直接找到。会与 askedQuestions 去重。',
    parameters: {
      type: 'object',
      properties: {
        stepId: str('当前步骤 id'),
        variant: { type: 'integer', description: '同一步的第几个变体，从 0 开始' },
        genre: { type: 'string', enum: [...QUESTION_GENRES] },
        question: str('问题正文，≤ 120 字'),
        setup: str('题面背景，≤ 400 字；不需要则为 null', { nullable: true }),
        expectedPoints: {
          type: 'array',
          description: '评分要点，至少 1 条',
          items: {
            type: 'object',
            properties: { point: str('要点'), weight: { type: 'integer', minimum: 1 } },
            required: ['point', 'weight'],
          },
        },
        rubric: {
          type: 'object',
          description: '5/3/1 分各自的标准',
          properties: { '5': str('5 分标准'), '3': str('3 分标准'), '1': str('1 分标准') },
          required: ['5', '3', '1'],
        },
        hintLadder: strArray('提示阶梯：先方向，再受限中间结论。任何一条都不得包含最终答案。'),
        sourceAnchor: str(`本题依据的原文片段。${ANCHOR_NOTE}`),
        targetsMisreading: str('针对 commonMisreadings 中的哪一条；没有则 null', {
          nullable: true,
        }),
      },
      required: [
        'stepId',
        'variant',
        'genre',
        'question',
        'expectedPoints',
        'rubric',
        'hintLadder',
        'sourceAnchor',
      ],
    },
  },

  submit_evaluation: {
    name: 'submit_evaluation',
    description:
      '提交评分。pointsHit 与 pointsMissed 合起来必须覆盖每一条 expectedPoints。suggestedNext 只是建议，是否继续由学生决定。',
    parameters: {
      type: 'object',
      properties: {
        questionId: str('正在评分的问题 id'),
        score: { type: 'integer', minimum: 0, maximum: 5, description: '0–5，≥3 为通过' },
        evaluation: str('学生可见的评语，1–3 句，第二人称'),
        pointsHit: strArray('答到的要点'),
        pointsMissed: strArray('没答到的要点'),
        misconceptions: strArray('答案暴露的概念错误'),
        answerQuality: {
          type: 'string',
          enum: ['on-topic', 'off-topic', 'empty', 'asks-for-help'],
        },
        missingPrerequisiteKpId: str('明显缺失的前置知识点 id；没有则 null', { nullable: true }),
        suggestedNext: { type: 'string', enum: ['advance', 'remain', 'backtrack'] },
      },
      required: [
        'questionId',
        'score',
        'evaluation',
        'pointsHit',
        'pointsMissed',
        'answerQuality',
        'suggestedNext',
      ],
    },
  },

  update_mastery: {
    name: 'update_mastery',
    description:
      '写入某一步知识点的掌握度证据。只能是该步骤自己的知识点。source=discussion 时 observed 会被截到 0.6 且权重减半。',
    parameters: {
      type: 'object',
      properties: {
        // The profiler runs concurrently and returns after the cursor has already
        // moved on, so it must name its step instead of inheriting the cursor.
        // Omitted = the current step, which is what every pre-profiler caller meant.
        stepId: str('这些证据属于哪一步。省略则表示当前步骤。'),
        evidence: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              kpId: str('知识点 id'),
              observed: { type: 'number', minimum: 0, maximum: 1, description: '本次观察到的掌握程度' },
              note: str('依据，≤ 1 句'),
            },
            required: ['kpId', 'observed'],
          },
        },
        source: { type: 'string', enum: ['graded', 'discussion'] },
      },
      required: ['evidence', 'source'],
    },
  },

  insert_prerequisite_step: {
    name: 'insert_prerequisite_step',
    description:
      '在当前步骤前插入一个前置步骤。回溯深度上限 2；同一前置步骤不会插入两次（会返回 use_variant_instead）。',
    parameters: {
      type: 'object',
      properties: {
        beforeStepId: str('插在哪个步骤之前'),
        title: str('步骤标题，≤ 20 字'),
        goal: str('这一步要达到的能力'),
        knowledgePointIds: strArray('前置知识点 id'),
        reason: {
          type: 'string',
          enum: ['student_said_too_hard', 'repeated_low_score', 'missing_prerequisite'],
        },
      },
      required: ['beforeStepId', 'title', 'goal', 'knowledgePointIds', 'reason'],
    },
  },

  propose_achievement: {
    name: 'propose_achievement',
    description:
      '提议一个成就。系统会复核资格，不合格则不会展示给学生。名称冲突时系统会加上章节范围并在返回值里告知。',
    parameters: {
      type: 'object',
      properties: {
        name: str('4–12 字（或 ≤ 5 个英文词）。不含等级、分数或"优秀学员"式套话。'),
        description: str('以「能…」起头的可观察能力，≤ 2 句'),
        basis: str('依据，一句'),
        knowledgePointIds: strArray('这个成就覆盖的知识点'),
      },
      required: ['name', 'description', 'basis', 'knowledgePointIds'],
    },
  },

  finish_session: {
    name: 'finish_session',
    description: '写入小结并结束会话。即使超出调用预算也始终允许，以便会话总能干净收尾。',
    parameters: {
      type: 'object',
      properties: {
        summary: str('小结，3–5 句，第二人称'),
        strengths: strArray('学生表现好的地方，具体而非笼统'),
        gaps: strArray('仍存在的缺口'),
        nextActions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: str('建议的下一步'),
              sectionRef: str('相关章节，如 §27.3；没有则 null', { nullable: true }),
            },
            required: ['text'],
          },
        },
      },
      required: ['summary', 'strengths', 'gaps', 'nextActions'],
    },
  },
};

/** harness.md §1 — each role is given only its own tools. */
export const ROLE_TOOLS: Record<RoleName, readonly ToolName[]> = {
  planner: ['get_student_profile', 'analyze_section', 'upsert_knowledge_points', 'set_steps'],
  questioner: ['ask_question'],
  // `update_mastery` used to be here, and was unreachable: it was ordered after
  // `submit_evaluation`, which ends the grader's turn. Now the profiler owns it,
  // and owning it *alone* is the point — two roles writing MasteryRecords
  // concurrently would race, and `putMastery` has no transaction around its
  // read-modify-write.
  grader: ['submit_evaluation', 'insert_prerequisite_step'],
  tutor_reply: ['insert_prerequisite_step'],
  summarizer: ['propose_achievement', 'finish_session'],
  // The router classifies a student turn and writes nothing. It returns a small
  // JSON object as prose rather than calling a tool: a tool would cost a second
  // round-trip for a decision that fits in ~30 tokens, and this call sits in
  // front of every free-text turn, so its latency is felt directly.
  router: [],
  // One tool, and it is terminal, so the turn cannot end without the write the
  // grader kept skipping.
  profiler: ['update_mastery'],
};

/**
 * The tool that must be called for the role's turn to be complete
 * (tools.md §1: `tool_choice: "required"` on these).
 */
export const ROLE_TERMINAL_TOOL: Record<RoleName, ToolName | null> = {
  planner: 'set_steps',
  questioner: 'ask_question',
  grader: 'submit_evaluation',
  tutor_reply: null,
  summarizer: 'finish_session',
  router: null,
  profiler: 'update_mastery',
};

export function toolDeclaration(name: ToolName): ToolDeclaration {
  return DECLARATIONS[name];
}

/** OpenAI-compatible `tools` array for a role (llm-io.md §1). */
/**
 * `exclude` withholds a tool the role would otherwise have. Used for
 * `analyze_section` when `requireAnalysis` is off: offering a tool the harness
 * does not want called invites the model to spend a slow turn on it.
 */
export function toolsForRole(
  role: RoleName,
  exclude: readonly ToolName[] = [],
): Array<Record<string, unknown>> {
  return ROLE_TOOLS[role]
    .filter((name) => !exclude.includes(name))
    .map((name) => {
      const d = DECLARATIONS[name];
      return {
        type: 'function',
        function: { name: d.name, description: d.description, parameters: d.parameters },
      };
    });
}

export function isToolName(name: string): name is ToolName {
  return Object.prototype.hasOwnProperty.call(DECLARATIONS, name);
}

/** Every tool a role may call, for the "tool not granted to this role" check. */
export function roleMayCall(role: RoleName, name: string): boolean {
  return isToolName(name) && (ROLE_TOOLS[role] as readonly string[]).includes(name);
}
