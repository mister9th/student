/** GET /api/class/page（K12：className 模糊 + stage/grade 数值精确过滤） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const name = q.className ? String(q.className).trim() : ''
    const stage = q.stage ? num(q.stage, 0) : 0
    const grade = q.grade ? num(q.grade, 0) : 0
    const filter = (x) =>
      (!name || String(x.className || '').includes(name)) &&
      (!stage || Number(x.stage) === stage) &&
      (!grade || Number(x.grade) === grade)
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'classes/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询班级失败', 500))
  }
}
