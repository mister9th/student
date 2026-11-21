/**
 * GET /api/ai/history/:sessionId —— 读取会话历史
 * ------------------------------------------------------------------
 * 响应结构对齐 mock.ts：数组 [{ role, content, time }]
 * （mockAdapter 统一用 ok() 包装，真实后端同样返回 json(ok(数组))）
 */
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission } from '../../../_lib/util.js'
import { S, ok, fail, json } from '../../../_lib/store.js'
import { listDocs, pick } from '../_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const method = String((context.request && context.request.method) || 'GET').toUpperCase()
    if (method !== 'GET') return json(fail('仅支持 GET 请求', 405), 405)

    const guard = await requirePermission(context, 'ai:chat')
    if (guard instanceof Response) return guard

    // 动态路由参数：优先取 context.params，再尝试从 URL 路径/query 解析
    let sessionId = String(
      (context.params && context.params.sessionId) ||
      (context.request && context.request.params && context.request.params.sessionId) ||
      ''
    )
    if (!sessionId) {
      const url = String((context.request && context.request.url) || '')
      const m = url.match(/\/ai\/history\/([^/?#]+)/)
      if (m) {
        try { sessionId = decodeURIComponent(m[1]) } catch { sessionId = m[1] }
      }
    }
    if (!sessionId && context.request && context.request.url) {
      try { sessionId = new URL(context.request.url).searchParams.get('sessionId') || '' } catch { /* ignore */ }
    }
    if (!sessionId) return json(fail('缺少 sessionId', 400), 400)

    // 归属校验：sessionId 必须带当前用户前缀（契约 §5.3），否则视为无数据，防止跨用户读取
    try { sessionId = decodeURIComponent(sessionId) } catch { /* 保持原值 */ }
    const uid = guard.id !== undefined ? guard.id : guard.userId
    if (!String(sessionId).startsWith(`${uid}-`)) return json(ok([]))

    const docs = await listDocs(S.ai(), `chats/${sessionId}/`)
    const rows = docs.map((h) => ({
      role: pick(h, 'role') === 'assistant' ? 'assistant' : 'user',
      content: String(pick(h, 'content', 'message') || ''),
      toolResults: Array.isArray(pick(h, 'toolResults')) ? pick(h, 'toolResults') : [],
      time: String(pick(h, 'time') || ''),
    }))

    return json(ok(rows))
  } catch (e) {
    return json(fail(`读取会话历史失败：${(e && e.message) || '未知错误'}`))
  }
}
