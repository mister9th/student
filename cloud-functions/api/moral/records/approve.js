/** POST /api/moral/records/approve —— 审核 {id, action:'Approved'|'Rejected'}；仅 Pending 可审 */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission } from '../../../_lib/util.js'
import { addMoralScore } from '../../../_lib/moral-store.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'moral:approve')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const id = String(body.id ?? '').replace(/\D/g, '')
    const action = String(body.action || '')
    if (action !== 'Approved' && action !== 'Rejected') return json(fail('审核动作无效', 400))

    const store = S.moral()
    const key = `records/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('记录不存在', 400))
    if (doc.status !== 'Pending') return json(fail('仅待审核记录可审核', 400))

    let moralScore = null
    if (action === 'Approved') {
      moralScore = await addMoralScore(S.academic(), doc.studentId, doc.scoreChange)
    }
    await store.setJSON(key, { ...doc, status: action, updateTime: now() })
    return json(ok({ id: Number(id), status: action, moralScore }))
  } catch (e) {
    return json(fail(e?.message || '审核记录失败', 500))
  }
}
