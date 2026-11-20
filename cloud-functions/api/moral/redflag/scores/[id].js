/** DELETE /api/moral/redflag/scores/{id} —— 删除评分记录并自动重算该周汇总排名 */
import { S, ok, fail, json, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'
import { recalcWeek } from '../_calc.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'redflag:edit')
    if (user instanceof Response) return user
    if (context.request.method !== 'DELETE') return json(fail('方法不允许', 405))
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `redflag-scores/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('评分记录不存在', 400))
    await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
    const period = { periodYear: num(doc.periodYear, 0), periodWeek: num(doc.periodWeek, 0), periodMonth: num(doc.periodMonth, 0) }
    if (period.periodYear && period.periodWeek) await recalcWeek(store, period)
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '红旗评分操作失败', 500))
  }
}
