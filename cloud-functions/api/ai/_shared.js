/**
 * AI 云函数共用工具
 * ------------------------------------------------------------------
 * 1. 字段读取同时兼容 camelCase / snake_case（seed 数据两种风格都能用）
 * 2. AI Gateway 调用走标准 OpenAI 兼容协议；无凭据或失败返回 null，
 *    由每个调用方用「基于 Blob 真实数据的规则」兜底，保证公开演示不白屏
 * 3. Blob 真实数据读取助手（成绩 / 学生 / 课程 / 班级）
 */
import { S, now } from '../../_lib/store.js'

/** 多字段回退读取：pick(obj, 'totalScore', 'total_score') */
export function pick(obj, ...keys) {
  if (!obj || typeof obj !== 'object') return undefined
  for (const k of keys) {
    const v = obj[k]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return undefined
}

/** 安全数字转换 */
export function num(v, d = 0) {
  if (v === '' || v === null || v === undefined) return d
  const n = Number(v)
  return Number.isFinite(n) ? n : d
}

/** 数值区间限制 */
export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

/** 从 context.env 读取 AI Gateway 配置（云函数内禁用 process.env） */
export function aiConfig(env = {}) {
  return {
    apiKey: String(env.AI_GATEWAY_API_KEY || ''),
    baseURL: String(env.AI_GATEWAY_BASE_URL || ''),
    model: String(env.AI_GATEWAY_MODEL || '@makers/deepseek-v4-flash'),
  }
}

/**
 * 调用 AI Gateway（OpenAI 兼容 chat/completions），返回原始 assistant message。
 * 无凭据 / 非 2xx / 无 message → 返回 null。askAI 与 askAIWithTools 共用。
 */
async function callChatCompletion(env, payload, options = {}) {
  const { apiKey, baseURL, model } = aiConfig(env)
  if (!apiKey || !baseURL) return null
  const { temperature = 0.7, maxTokens = 1024 } = options
  try {
    const url = `${baseURL.replace(/\/+$/, '')}/chat/completions`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, ...payload, temperature, max_tokens: maxTokens }),
    })
    if (!res.ok) return null
    const data = await res.json()
    const message = data && data.choices && data.choices[0] && data.choices[0].message
    return message && typeof message === 'object' ? message : null
  } catch {
    return null
  }
}

/**
 * 调用 AI Gateway（纯文本）。无凭据 / 非 2xx / 无有效文本 → 返回 null，
 * 调用方必须规则兜底。原有语义保持不变。
 */
export async function askAI(env, messages, options = {}) {
  const { model } = aiConfig(env)
  const message = await callChatCompletion(env, { model, messages }, options)
  if (!message || typeof message.content !== 'string') return null
  const text = message.content.trim()
  return text || null
}

/** 工具结果摘要（供前端卡片展示）：从工具返回的 JSON 文本里抽取关键字段 */
function summarizeToolResult(name, content) {
  try {
    const o = typeof content === 'string' ? JSON.parse(content) : content
    if (o && o.error) return `错误：${o.error}`
    if (!o || typeof o !== 'object') return String(content || '').slice(0, 80)
    const keys = ['studentName', 'courseName', 'className', 'count', 'total', 'avgScore',
      'predictedScore', 'riskLevel', 'totalRisks', 'score', 'semester', 'grade']
    const parts = []
    for (const k of keys) if (o[k] !== undefined && o[k] !== null) parts.push(`${k}:${o[k]}`)
    if (!parts.length) {
      for (const k of Object.keys(o).slice(0, 3)) {
        const v = o[k]
        parts.push(`${k}:${Array.isArray(v) ? `[${v.length}项]` : (v && typeof v === 'object' ? '{...}' : v)}`)
      }
    }
    return parts.slice(0, 4).join('，') || name
  } catch {
    return String(content || '').slice(0, 80)
  }
}

/**
 * Function calling 工具循环（契约 §5.1）。
 * - 携带 tools + tool_choice:'auto' 调用模型
 * - 解析 tool_calls，逐个执行注册工具的 run(args, context)，以
 *   {role:'tool', tool_call_id, content} 追加后再次调用模型
 * - 直到无 tool_calls 或达到 maxRounds（默认 3，防死循环）
 * - 任何失败返回 null，调用方走规则兜底；工具明细写入 options.toolResults（数组，出参）
 */
export async function askAIWithTools(env, messages, tools, options = {}) {
  const { apiKey, baseURL, model } = aiConfig(env)
  if (!apiKey || !baseURL) return null

  const registry = new Map()
  for (const t of (Array.isArray(tools) ? tools : [])) {
    if (t && t.name) registry.set(t.name, t)
  }
  const convo = Array.isArray(messages) ? [...messages] : []
  const toolResults = Array.isArray(options.toolResults) ? options.toolResults : []
  const maxRounds = Math.max(1, Math.min(5, num(options.maxRounds, 3)))
  const toolContext = options.context || {}

  for (let round = 0; round < maxRounds; round++) {
    const message = await callChatCompletion(env, {
      model,
      messages: convo,
      tools,
      tool_choice: 'auto',
    }, options)
    if (!message) return null

    const calls = Array.isArray(message.tool_calls) ? message.tool_calls : []
    // OpenAI 协议要求：assistant(带 tool_calls) 必须先入会话，再跟 tool 消息
    convo.push({
      role: 'assistant',
      content: typeof message.content === 'string' ? message.content : '',
      tool_calls: calls,
    })

    if (!calls.length) {
      return typeof message.content === 'string' && message.content.trim()
        ? message.content.trim()
        : null
    }

    for (const call of calls) {
      const name = String((call && call.function && call.function.name) || '')
      const rawArgs = call && call.function && call.function.arguments
      let args = {}
      try {
        args = typeof rawArgs === 'string'
          ? (rawArgs.trim() ? JSON.parse(rawArgs) : {})
          : (rawArgs && typeof rawArgs === 'object' ? rawArgs : {})
      } catch { args = {} }

      const tool = registry.get(name)
      let result
      if (!tool || typeof tool.run !== 'function') {
        result = { error: `未知工具: ${name}` }
      } else {
        try {
          result = await tool.run(args, toolContext)
        } catch (e) {
          result = { error: (e && e.message) || '工具执行失败' }
        }
      }
      const content = typeof result === 'string' ? result : JSON.stringify(result || {})
      toolResults.push({ name, args, summary: summarizeToolResult(name, content) })
      convo.push({ role: 'tool', tool_call_id: String((call && call.id) || name), content })
    }
  }
  // 超过轮次仍未收敛：放弃，交给调用方规则兜底
  return null
}

/** 列出某前缀下所有 JSON 文档（附 __key，按 key 排序，即写入时间顺序） */
export async function listDocs(storeObj, prefix) {
  try {
    const { blobs } = await storeObj.list({ prefix })
    const docs = await Promise.all(
      (blobs || [])
        .filter((b) => b && b.key && !b.key.endsWith('/'))
        .map(async (b) => {
          try {
            const d = await storeObj.get(b.key, { type: 'json' })
            if (!d || typeof d !== 'object') return null
            return { ...d, __key: b.key }
          } catch {
            return null
          }
        })
    )
    return docs.filter(Boolean).sort((a, b) => String(a.__key || '').localeCompare(String(b.__key || '')))
  } catch {
    return []
  }
}

/** 读取单个 JSON 文档，失败返回 null */
export async function getDoc(storeObj, key) {
  try {
    const d = await storeObj.get(key, { type: 'json' })
    return d && typeof d === 'object' ? d : null
  } catch {
    return null
  }
}

/** 全部成绩文档 */
export const allScores = () => listDocs(S.academic(), 'scores/')

/**
 * 某学生的成绩文档。
 * 主用方案文档的 `scores/<studentId>/<courseId>.json` 分区 key；
 * 兼容扁平 `scores/<id>.json`（按文档内 studentId 字段过滤）。
 */
export async function scoresOf(studentId) {
  const byPrefix = await listDocs(S.academic(), `scores/${studentId}/`)
  if (byPrefix.length) return byPrefix
  const all = await listDocs(S.academic(), 'scores/')
  const sid = Number(studentId)
  return all.filter((s) => num(pick(s, 'studentId', 'student_id'), 0) === sid)
}

/** key -> 文档 映射（通用） */
export async function docMap(storeObj, prefix, idKeys) {
  const docs = await listDocs(storeObj, prefix)
  const map = new Map()
  for (const d of docs) {
    const id = num(pick(d, ...idKeys), 0)
    if (id) map.set(id, d)
  }
  return map
}

/** 全部课程 Map<id, doc> */
export const courseMap = () => docMap(S.academic(), 'courses/', ['id', 'courseId', 'course_id'])

/** 全部班级 Map<id, doc> */
export const classMap = () => docMap(S.academic(), 'classes/', ['id', 'classId', 'class_id'])

/** 全部学生 Map<id, doc> */
export const studentMap = () => docMap(S.academic(), 'students/', ['id', 'studentId', 'student_id'])

/**
 * 学生用户 -> 本人学生档案 id（student.userId === user.id），找不到返回 0；非学生返回 0。
 * 与 homework/_shared.js 的 ownStudentProfile 同思路，供 ai 端点做学生数据隔离。
 */
export async function ownStudentIdOf(user, academic) {
  if (!user || Number(user.userType) !== 1) return 0
  const uid = num(user.id ?? user.userId, 0)
  if (!uid) return 0
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const found = docs.find((d) => d && d.deleted !== 1 && num(pick(d, 'userId', 'user_id'), 0) === uid)
  return found ? num(pick(found, 'id', 'studentId', 'student_id'), 0) : 0
}

/**
 * 解析学生姓名：学生文档 → 成绩冗余字段 → edu-auth/users/<userId>
 */
export async function studentName(studentId, studentDoc = null, scoreDoc = null) {
  const s = studentDoc || (await getDoc(S.academic(), `students/${studentId}.json`))
  const direct = pick(s, 'realName', 'real_name', 'name', 'studentName')
  if (direct) return String(direct)
  const fromScore = pick(scoreDoc, 'studentName', 'student_name', 'realName', 'real_name')
  if (fromScore) return String(fromScore)
  const uid = num(pick(s, 'userId', 'user_id'), 0)
  if (uid) {
    const u = await getDoc(S.auth(), `users/${uid}.json`)
    const un = pick(u, 'realName', 'real_name', 'name')
    if (un) return String(un)
  }
  return ''
}

/** 解析课程名 */
export function courseName(courseDoc, scoreDoc = null) {
  return String(
    pick(courseDoc, 'courseName', 'course_name', 'name') ||
    pick(scoreDoc, 'courseName', 'course_name', 'subjectName') ||
    ''
  )
}

/** 解析班级名 */
export async function className(classId, classDoc = null, studentDoc = null) {
  const c = classDoc || (classId ? await getDoc(S.academic(), `classes/${classId}.json`) : null)
  const direct = pick(c, 'className', 'class_name', 'name')
  if (direct) return String(direct)
  const fromStudent = pick(studentDoc, 'className', 'class_name')
  return fromStudent ? String(fromStudent) : ''
}

/** 成绩总分（兼容命名与字符串数字） */
export const scoreValue = (doc) => num(pick(doc, 'totalScore', 'total_score', 'total', 'score'), 0)

/** 全系统成绩汇总：条数 + 平均分（真实数据） */
export async function scoreStats() {
  const scores = await allScores()
  let sum = 0
  let cnt = 0
  for (const s of scores) {
    const v = scoreValue(s)
    if (v > 0) { sum += v; cnt++ }
  }
  return { count: cnt, avg: cnt ? Math.round((sum / cnt) * 10) / 10 : 0 }
}

/**
 * 出勤率推导：Blob 无独立出勤表，基于该生真实成绩均分做确定性推导，
 * 保证每次请求结果一致且区间合理（60-100）。
 */
export function deriveAttendance(avgScore, seed = 0) {
  return clamp(Math.round(avgScore * 0.85 + 18 + (seed % 5)), 60, 100)
}

/** 从 AI 文本里提取 0-100 的分数，失败返回 null */
export function extractScore(text) {
  if (!text) return null
  const m = String(text).match(/(\d{1,3}(?:\.\d+)?)\s*分?/)
  if (!m) return null
  const n = Number(m[1])
  return Number.isFinite(n) && n >= 0 && n <= 100 ? Math.round(n) : null
}

/** 从 AI 文本里提取风险等级，失败返回 null */
export function extractRiskLevel(text) {
  if (!text) return null
  const t = String(text)
  if (/高风险|挂科风险较高|high/i.test(t)) return 'high'
  if (/中风险|中等风险|medium/i.test(t)) return 'medium'
  if (/低风险|风险较低|low/i.test(t)) return 'low'
  return null
}

/** 把一条对话消息追加到 Blob：chats/<sessionId>/<时间戳>-<序号>.json */
export async function appendChatMessage(storeObj, sessionId, role, content, extra = {}) {
  const prefix = `chats/${sessionId}/`
  let seq = 0
  try {
    const { blobs } = await storeObj.list({ prefix })
    seq = (blobs || []).length
  } catch { /* 忽略：按 0 开始 */ }
  const ts = Date.now()
  const key = `${prefix}${String(ts).padStart(13, '0')}-${String(seq).padStart(4, '0')}.json`
  const clock = now().slice(11) // HH:MM:SS
  await storeObj.setJSON(key, {
    sessionId,
    role: role === 'assistant' ? 'assistant' : 'user',
    content: String(content),
    createTime: ts,
    time: clock,
    ...extra,
  })
  return key
}
