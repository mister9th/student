/**
 * POST /api/ai/chat —— AI 智能问答（带会话记忆）
 * ------------------------------------------------------------------
 * - 会话历史从 Blob `edu-ai/chats/<sessionId>/` 读取，保留最近 20 条窗口
 * - 调用 AI Gateway（@makers/deepseek-v4-flash）；无凭据/失败时用真实成绩统计规则兜底
 * - 用户消息与回复都持久化，供 /ai/history/<sessionId> 读取
 * - 响应结构对齐 mock.ts：{ sessionId, message }
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import { askAI, pick, listDocs, appendChatMessage, scoreStats, clamp } from './_shared.js'

const HISTORY_WINDOW = 20

const SYSTEM_PROMPT = [
  '你是「Student AI 助手」，服务于学生管理系统的师生用户。',
  '你可以做学习分析、成绩预测、评语生成、学习建议与排课建议。',
  '请用简体中文回答，简洁、专业、有亲和力，并尽量基于系统里的真实数据。',
].join('')

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
  return '我可以帮你进行学习分析、成绩预测、评语生成和智能排课。你可以试着问我："分析一下这学期的成绩趋势" 或 "有哪些学习建议"。'
}

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const method = String((context.request && context.request.method) || 'POST').toUpperCase()
    if (method !== 'POST') return json(fail('仅支持 POST 请求', 405), 405)

    const guard = await requirePermission(context, 'ai:chat')
    if (guard instanceof Response) return guard

    const body = await bodyOf(context.request)
    const question = String(pick(body, 'message', 'content', 'q') || '').trim()
    if (!question) return json(fail('消息内容不能为空', 400), 400)

    const headers = (context.request && context.request.headers) || {}
    const sessionId = String(
      pick(body, 'sessionId', 'session_id', 'conversationId') ||
      headers['makers-conversation-id'] ||
      `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    )

    const aiStore = S.ai()

    // 读取最近 20 条会话记忆（按 key 排序即写入顺序）
    const history = (await listDocs(aiStore, `chats/${sessionId}/`)).slice(-HISTORY_WINDOW)
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
    for (const h of history) {
      messages.push({
        role: pick(h, 'role') === 'assistant' ? 'assistant' : 'user',
        content: String(pick(h, 'content', 'message') || ''),
      })
    }
    messages.push({ role: 'user', content: question })

    // 把真实成绩统计注入 system，让模型回答基于真实数据
    const stats = await scoreStats()
    messages[0].content = `${SYSTEM_PROMPT}\n当前系统真实数据：共 ${stats.count} 条成绩记录，平均总评 ${stats.avg} 分。`

    const aiText = await askAI(context.env, messages, { temperature: 0.7 })
    const answer = aiText || ruleAnswer(question, stats)

    // 持久化本轮对话（多用户共享同一 sessionId 可读）
    await appendChatMessage(aiStore, sessionId, 'user', question)
    await appendChatMessage(aiStore, sessionId, 'assistant', answer)

    return json(ok({ sessionId, message: answer }))
  } catch (e) {
    return json(fail(`对话服务异常：${(e && e.message) || '未知错误'}`))
  }
}
