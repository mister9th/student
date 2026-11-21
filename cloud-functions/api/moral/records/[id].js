/** GET/PUT/DELETE /api/moral/records/{id}（DELETE 逻辑删；status 仅由 approve 变更） */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, strip } from '../../../_lib/util.js'
import { buildScope } from '../../../_lib/scope.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'moral:list' : 'moral:edit')
    if (guard instanceof Response) return guard
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `records/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    const scope = await buildScope(context)

    if (method === 'GET') {
      if (!doc || doc.deleted === 1) return json(ok(null))
      if (!scope.filterFn(doc)) return json(ok(null))
      return json(ok(strip(doc)))
    }
    if (!doc || doc.deleted === 1) return json(ok(null))
    if (!scope.filterFn(doc)) return json(fail('无权操作该德育记录', 403), 403)

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const studentId = body.studentId !== undefined ? num(body.studentId, 0) : num(doc.studentId, 0)
      const student = await S.academic().get(`students/${studentId}.json`, { type: 'json' })
      await store.setJSON(key, {
        ...doc,
        studentId,
        studentName: student?.realName || String(doc.studentName || ''),
        category: body.category !== undefined ? String(body.category) : String(doc.category || ''),
        note: body.note !== undefined ? String(body.note) : String(doc.note || ''),
        date: body.date !== undefined ? String(body.date) : String(doc.date || ''),
        scoreChange: body.scoreChange !== undefined ? num(body.scoreChange, 0) : num(doc.scoreChange, 0),
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '德育记录操作失败', 500))
  }
}
