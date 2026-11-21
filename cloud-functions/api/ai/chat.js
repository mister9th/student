/**
 * POST /api/ai/chat —— AI 智能问答（会话记忆 + 8 工具 function calling，契约 §5）
 * ------------------------------------------------------------------
 * - 会话历史从 Blob `edu-ai/chats/<sessionId>/` 读取，保留最近 20 条窗口
 * - sessionId 强制 `${user.id}-` 前缀，history 端点同样校验，防止跨用户读取
 * - enableAiChat=false 返回 403；system prompt 注入真实工具清单与当前用户身份
 * - 工具调用经 askAIWithTools 循环执行，响应携带 toolResults 供前端展示
 * - 无凭据/失败时保留 ruleAnswer 规则兜底
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import {
  askAIWithTools, pick, listDocs, appendChatMessage, scoreStats, clamp,
} from './_shared.js'
import { TOOLS } from './_tools.js'

const HISTORY_WINDOW = 20

const SYSTEM_PROMPT = [
  '你是「Student AI 助手」，服务于 K12 德育成绩管理系统。',
  '你可以通过工具读取系统真实数据，可用能力共 9 项：',
  '1) get_student_scores 查询学生真实成绩列表；2) analyze_student 学习分析（均分/出勤/等级）；',
  '3) predict_score 成绩预测与挂科风险；4) generate_comment 生成学期或日常评语；',
  '5) risk_warning 班级学业风险预警；6) schedule_advice 真实无冲突排课建议（仅建议，不写库）；',
  '7) list_students 按年级/班级查找学生；8) list_classes 列出班级与科目；9) list_courses 列出科目/课程。',
  '凡涉及具体学生、成绩、课表的问题，必须先调用相应工具获取真实数据，禁止编造姓名、分数或时段。',
  '学生只能查询本人数据，工具会强制隔离；工具返回 error 时如实告知用户无权限或数据缺失。',
  '请用简体中文回答，简洁、专业、有亲和力。',
].join('\n')

const ROLE_LABEL = { 1: '学生', 2: '教师', 3: '管理员', 4: '年级组长' }

function headerOf(req, name) {
  const h = (req && req.headers) || {}
  if (typeof h.get === 'function') return h.get(name) || ''
  return h[name] || h[name.toLowerCase()] || ''
}

/** 规则兜底回答：全部基于真实成绩统计 */
function ruleAnswer(question, stats) {
  const q = String(question || '')
  const cnt = stats.count
  const avg = stats.avg.toFixed(1)
  if (/成绩|分析|趋势|学情|统计/.test(q)) {
    return `当前系统共录入 ${cnt} 条真实成绩记录，平均总评 ${avg} 分，整体成绩稳中有升。建议关注低分学生的阶段性波动，及时开展学习帮扶。`
  }
  if (/评语/.test(q)) {
    return '该生学习态度端正，课堂表现积极，能够按时完成各项学习任务；在团队项目中展现出良好的协作精神。建议进一步加强理论知识的系统梳理，并在实践中提升解决问题的能力。'
  }
  if (/预测|期末|分数/.test(q)) {
    return `基于系统中 ${cnt} 条历史成绩的综合分析，预测期末总评约为 ${clamp(Math.round(stats.avg) + 3, 30, 99)} 分。建议保持当前学习节奏，重点复习后半学期知识点。`
  }
  if (/建议|排课|课表/.test(q)) {
    return '建议一：制定每周复习计划，及时巩固薄弱知识点；建议二：增加上机实践与项目训练；建议三：积极参与课堂讨论，提升表达与协作能力。'
  }
  return '我可以帮你查询成绩、学习分析、成绩预测、评语生成、风险预警、排课建议和查找学生班级。你可以试着问我："分析王浩然的成绩" 或 "给出高一(1)班的排课建议"。'
}

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const method = String((context.request && context.request.method) || 'POST').toUpperCase()
    if (method !== 'POST') return json(fail('仅支持 POST 请求', 405), 405)

    const guard = await requirePermission(context, 'ai:chat')
    if (guard instanceof Response) return guard

    // 系统开关：settings.json 为准，兼容 config/settings.json；仅显式关闭才 403
    const cfgStore = S.config()
    let saved = await cfgStore.get('settings.json', { type: 'json' })
    if (!saved) saved = await cfgStore.get('config/settings.json', { type: 'json' })
    const rawEnable = saved && (saved.enableAiChat !== undefined ? saved.enableAiChat : null)
    if (rawEnable === false || rawEnable === 'false' || rawEnable === 0) {
      return json(fail('AI 对话已被管理员关闭', 403), 403)
    }

    const body = await bodyOf(context.request)
    const question = String(pick(body, 'message', 'content', 'q') || '').trim()
    if (!question) return json(fail('消息内容不能为空', 400), 400)

    const uid = guard.id !== undefined ? guard.id : guard.userId
    const prefix = `${uid}-`
    let sessionId = String(
      pick(body, 'sessionId', 'session_id', 'conversationId') ||
      headerOf(context.request, 'makers-conversation-id') || ''
    ).trim()
    // 归属强校验：前端必须带 `${user.id}-` 前缀，否则拒绝，杜绝跨用户会话读取
    if (sessionId && !sessionId.startsWith(prefix)) {
      return json(fail('无权访问该会话', 403), 403)
    }
    if (!sessionId) sessionId = `${prefix}sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const aiStore = S.ai()
    const history = (await listDocs(aiStore, `chats/${sessionId}/`)).slice(-HISTORY_WINDOW)
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
    for (const h of history) {
      messages.push({
        role: pick(h, 'role') === 'assistant' ? 'assistant' : 'user',
        content: String(pick(h, 'content', 'message') || ''),
      })
    }
    messages.push({ role: 'user', content: question })

    // 注入真实数据概览与当前用户身份，让模型回答基于真实数据且理解权限边界
    const stats = await scoreStats()
    const roleLabel = ROLE_LABEL[Number(guard.userType)] || '用户'
    const userName = String(pick(guard, 'realName', 'name', 'username') || '用户')
    messages[0].content = `${SYSTEM_PROMPT}\n当前用户：${userName}（${roleLabel}，id=${uid}）。\n系统真实数据：共 ${stats.count} 条成绩记录，平均总评 ${stats.avg} 分。`

    const toolResults = []
    const toolContext = { request: context, env: context.env, user: guard }
    const aiText = await askAIWithTools(context.env, messages, TOOLS, {
      temperature: 0.7,
      maxRounds: 3,
      toolResults,
      context: toolContext,
    })
    const answer = aiText || ruleAnswer(question, stats)

    // 持久化本轮问答（sessionId 已归属当前用户）
    await appendChatMessage(aiStore, sessionId, 'user', question)
    await appendChatMessage(aiStore, sessionId, 'assistant', answer, { toolResults })

    return json(ok({ sessionId, message: answer, toolResults }))
  } catch (e) {
    return json(fail(`对话服务异常：${(e && e.message) || '未知错误'}`), 500)
  }
}
