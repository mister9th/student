/** GET /api/moral/redflag/awards?periodWeek=&periodYear= —— 颁奖历史（按 awardDate 倒序） */
import { S, ok, fail, json } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'redflag:list')
    if (user instanceof Response) return user
    if (context.request.method !== 'GET') return json(fail('方法不允许', 405))
    const q = context.request.query || {}
    const periodWeek = q.periodWeek ? num(q.periodWeek, 0) : 0
    const periodYear = q.periodYear ? num(q.periodYear, 0) : 0

    const store = S.moral()
    const { blobs } = await store.list({ prefix: 'redflag-awards/' })
    let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    items = items
      .filter((x) => x && x.deleted !== 1)
      .filter((x) => (!periodWeek || num(x.periodWeek, 0) === periodWeek) && (!periodYear || num(x.periodYear, 0) === periodYear))
      .sort((a, b) => String(b.awardDate || '').localeCompare(String(a.awardDate || '')) || (num(b.periodWeek, 0) - num(a.periodWeek, 0)))
    return json(ok({ records: items, total: items.length }))
  } catch (e) {
    return json(fail(e?.message || '颁奖历史查询失败', 500))
  }
}
