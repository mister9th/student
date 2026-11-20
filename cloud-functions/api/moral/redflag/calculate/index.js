/** POST /api/moral/redflag/calculate —— 计算引擎入口（body {periodWeek?,periodMonth?,periodYear?} 缺省当前日期）
 * weekly（传 periodWeek，或全缺省）：完整 5 步（周汇总排名 → 颁奖 → 幂等加分 → 月汇总）。
 * monthly（仅传 periodMonth 不传 periodWeek）：仅重算该年月 monthly 汇总与排名，不颁奖不加分。
 */
import { S, ok, fail, json, bodyOf } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { periodOf, calculatePeriod, recalcMonth } from '../_calc.js'

const monthValid = (m) => m > 0 && m <= 12

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'redflag:edit')
    if (user instanceof Response) return user
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const cur = periodOf(new Date().toISOString().slice(0, 10))
    const periodYear = num(body.periodYear, cur.periodYear)
    if (periodYear <= 0) return json(fail('年份参数无效', 400))
    const hasWeek = body.periodWeek !== undefined && body.periodWeek !== null && String(body.periodWeek) !== ''
    const hasMonth = body.periodMonth !== undefined && body.periodMonth !== null && String(body.periodMonth) !== ''

    if (!hasWeek && !hasMonth) {
      // 全缺省：按当前周执行完整周引擎
      const periodWeek = cur.periodWeek
      const periodMonth = cur.periodMonth
      const result = await calculatePeriod(S.moral(), { periodYear, periodWeek, periodMonth })
      return json(ok({ mode: 'weekly', periodYear, periodWeek, periodMonth, ...result }))
    }

    if (hasWeek) {
      const periodWeek = num(body.periodWeek, 0)
      if (periodWeek <= 0 || periodWeek > 53) return json(fail('周号参数无效（1-53）', 400))
      const periodMonth = num(body.periodMonth, cur.periodMonth)
      if (!monthValid(periodMonth)) return json(fail('月份参数无效（1-12）', 400))
      const result = await calculatePeriod(S.moral(), { periodYear, periodWeek, periodMonth })
      return json(ok({ mode: 'weekly', periodYear, periodWeek, periodMonth, ...result }))
    }

    // monthly：仅月汇总与排名，不颁奖不加分
    const periodMonth = num(body.periodMonth, 0)
    if (!monthValid(periodMonth)) return json(fail('月份参数无效（1-12）', 400))
    await recalcMonth(S.moral(), { periodYear, periodMonth })
    return json(ok({ mode: 'monthly', periodYear, periodMonth, awarded: [] }))
  } catch (e) {
    return json(fail(e?.message || '红旗计算失败', 500))
  }
}
