/** GET /api/selection/walking?grade&semester —— 走班班列表（isWalking=1）及组合人数 */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, strip } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'selection:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const grade = q.grade ? num(q.grade, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''

    const academic = S.academic()
    const { blobs: cBlobs } = await academic.list({ prefix: 'classes/' })
    const classes = (await Promise.all(cBlobs.map((b) => academic.get(b.key, { type: 'json' }))))
      .filter((c) => c && c.deleted !== 1 && num(c.isWalking, 0) === 1)
      .filter((c) => (!grade || num(c.grade, 0) === grade))

    // 组合人数（intents 实时聚合）
    const store = S.selection()
    const { blobs: iBlobs } = await store.list({ prefix: 'intents/' })
    const intents = (await Promise.all(iBlobs.map((b) => store.get(b.key, { type: 'json' }))))
      .filter((x) => x && x.deleted !== 1 && num(x.status, 1) === 1)
      .filter((x) => (!grade || num(x.grade, 0) === grade))
      .filter((x) => (!semester || String(x.semester || '') === semester))
    const countByCombo = {}
    intents.forEach((x) => {
      const c = String(x.combo || '')
      if (c) countByCombo[c] = (countByCombo[c] || 0) + 1
    })

    const list = classes.map((c) => {
      const combo = String(c.subjectCombo || '')
      return {
        ...strip(c),
        comboCount: combo ? (countByCombo[combo] || 0) : 0,
      }
    })
    return json(ok({ list, total: list.length, countByCombo }))
  } catch (e) {
    return json(fail(e?.message || '走班班查询失败', 500))
  }
}
