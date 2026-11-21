/** DELETE /api/message/batch/{batchId} —— 按发送批次软删全部消息（我的发送） */
import { S, ok, fail, json, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message')
    if (guard instanceof Response) return guard
    const method = context.request?.method || 'GET'
    if (method !== 'DELETE') return json(fail('仅支持 DELETE', 405), 405)

    let batchId = String(
      (context.params && context.params.batchId) ||
      (context.request && context.request.params && context.request.params.batchId) || ''
    )
    if (!batchId && context.request?.url) {
      try { batchId = new URL(context.request.url).searchParams.get('batchId') || '' } catch { /* ignore */ }
    }
    try { batchId = decodeURIComponent(batchId) } catch { /* 保持原值 */ }
    if (!batchId) return json(fail('缺少 batchId', 400), 400)

    const store = S.content()
    const { blobs } = await store.list({ prefix: 'messages/' })
    const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const uid = guard.id !== undefined ? guard.id : guard.userId
    const isAdmin = Number(guard.userType) === 3 ||
      (Array.isArray(guard.permissions) && guard.permissions.includes('*:*'))
    const targets = docs.filter((d) => d && d.deleted !== 1 && String(d.batchId || '') === batchId)
    if (!targets.length) return json(ok({ deleted: 0 }))
    // 只能删自己发的批次；管理员可删任意
    if (!isAdmin && targets.some((d) => Number(d.senderId) !== Number(uid))) {
      return json(fail('只能删除自己发送的通知', 403), 403)
    }

    const ts = now()
    const jobs = targets.map((d) => async () => {
      const key = `messages/${d.id}.json`
      const cur = await store.get(key, { type: 'json' })
      if (cur && cur.deleted !== 1) await store.setJSON(key, { ...cur, deleted: 1, updateTime: ts })
    })
    for (let i = 0; i < jobs.length; i += 30) {
      await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
    }
    return json(ok({ deleted: targets.length }))
  } catch (e) {
    return json(fail(e?.message || '删除发送批次失败', 500))
  }
}
