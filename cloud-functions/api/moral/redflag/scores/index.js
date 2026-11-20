/** GET/POST /api/moral/redflag/scores —— 评分录入（GET 分页过滤；POST 录入后自动重算该周汇总排名） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, pagedOrdered } from '../../../_lib/util.js'
import { periodOf, recalcWeek } from '../_calc.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'redflag:list' : 'redflag:add')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const q = context.request.query || {}
      const classId = q.classId ? num(q.classId, 0) : 0
      const dimensionId = q.dimensionId ? num(q.dimensionId, 0) : 0
      const from = q.from ? String(q.from) : ''
      const to = q.to ? String(q.to) : ''
      const filter = (x) =>
        (!classId || num(x.classId, 0) === classId) &&
        (!dimensionId || num(x.dimensionId, 0) === dimensionId) &&
        (!from || String(x.scoreDate || '') >= from) &&
        (!to || String(x.scoreDate || '') <= to)
      return json(ok(await pagedOrdered(store, 'redflag-scores/', q, filter, false)))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const classId = num(body.classId, 0)
      const dimensionId = num(body.dimensionId, 0)
      if (!classId) return json(fail('班级不能为空', 400))
      if (!dimensionId) return json(fail('评分维度不能为空', 400))
      const cls = await S.academic().get(`classes/${classId}.json`, { type: 'json' })
      if (!cls || cls.deleted === 1) return json(fail('班级不存在', 400))
      const dim = await store.get(`redflag-dimensions/${dimensionId}.json`, { type: 'json' })
      if (!dim || dim.deleted === 1) return json(fail('评分维度不存在', 400))
      if (num(dim.active, 1) !== 1) return json(fail('该评分维度已停用', 400))
      const scoreDate = String(body.scoreDate || now().slice(0, 10))
      const period = periodOf(scoreDate)
      const id = await nextId(store, 'redflag-scores/')
      await store.setJSON(`redflag-scores/${id}.json`, {
        id, classId, className: String(cls.className || ''),
        dimensionId, dimensionName: String(dim.name || ''),
        ruleId: num(body.ruleId, 0),
        score: num(body.score, 0),
        scoreDate,
        periodType: 'daily',
        periodWeek: period.periodWeek,
        periodMonth: period.periodMonth,
        periodYear: period.periodYear,
        note: String(body.note || ''),
        createTime: now(), deleted: 0,
      })
      // 自动重算该周汇总与排名（不颁奖、不加分，颁奖由 calculate 显式触发）
      await recalcWeek(store, period)
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '红旗评分操作失败', 500))
  }
}
