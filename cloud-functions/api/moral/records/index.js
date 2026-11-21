/** GET /api/moral/records —— 分页列表（studentId/status/category 过滤）；POST —— 新增记录 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../../_lib/util.js'
import { ownStudentId } from '../fiveedu/_fiveedu.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'moral:list' : 'moral:add')
    if (guard instanceof Response) return guard
    const store = S.moral()

    if (method === 'GET') {
      const q = context.request.query || {}
      let studentId = q.studentId ? Number(q.studentId) : null
      if (Number(guard.userType) === 1) {
        // 学生强制只看本人记录；未找到本人档案时用 -1 保证结果为空，不退回全校
        studentId = (await ownStudentId(guard, S.academic())) || -1
      }
      const status = q.status ? String(q.status) : ''
      const category = q.category ? String(q.category) : ''
      const filter = (x) =>
        (!studentId || Number(x.studentId) === studentId) &&
        (!status || x.status === status) &&
        (!category || String(x.category || '') === category)
      return json(ok(stripRecords(await pagedOrdered(store, 'records/', q, filter, false))))
    }
    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const studentId = num(body.studentId, 0)
      const student = await S.academic().get(`students/${studentId}.json`, { type: 'json' })
      const id = await nextId(store, 'records/')
      await store.setJSON(`records/${id}.json`, {
        id,
        studentId,
        studentName: student?.realName || String(body.studentName || ''),
        teacherId: guard.id ?? guard.userId ?? null,
        teacherName: String(guard.realName || ''),
        category: String(body.category || ''),
        note: String(body.note || ''),
        date: body.date ? String(body.date) : now().slice(0, 10),
        scoreChange: num(body.scoreChange, 0),
        status: 'Pending',
        createTime: now(),
        deleted: 0,
      })
      return json(ok({ id }))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '德育记录操作失败', 500))
  }
}
