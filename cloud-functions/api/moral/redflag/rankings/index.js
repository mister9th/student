/** GET /api/moral/redflag/rankings?periodWeek=&periodYear=&periodType= —— 红旗榜单（summary 附 className） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { periodOf } from '../_calc.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'redflag:list')
    if (user instanceof Response) return user
    if (context.request.method !== 'GET') return json(fail('方法不允许', 405))
    const q = context.request.query || {}
    const cur = periodOf(new Date().toISOString().slice(0, 10))
    const periodType = String(q.periodType || 'weekly') === 'monthly' ? 'monthly' : 'weekly'
    const periodYear = q.periodYear ? num(q.periodYear, 0) : cur.periodYear
    const periodWeek = periodType === 'weekly' && q.periodWeek ? num(q.periodWeek, 0) : 0

    const store = S.moral()
    const { blobs } = await store.list({ prefix: 'redflag-summaries/' })
    let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    items = items
      .filter((x) => x && x.deleted !== 1 && x.periodType === periodType && num(x.periodYear, 0) === periodYear)
      .filter((x) => (periodType !== 'weekly' || !periodWeek || num(x.periodWeek, 0) === periodWeek))
      .sort((a, b) => (num(a.rankPosition, 0) - num(b.rankPosition, 0)) || (num(a.classId, 0) - num(b.classId, 0)))
    return json(ok({ records: items, total: items.length }))
  } catch (e) {
    return json(fail(e?.message || '红旗榜单查询失败', 500))
  }
}
