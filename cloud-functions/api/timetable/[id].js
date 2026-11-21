/** GET/PUT/DELETE /api/timetable/{id} —— 详情(含 slots) / 改状态发布 / 软删(连 slots) */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, strip } from '../../_lib/util.js'
import { ownStudentClassId } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'timetable:list' : 'timetable:edit')
    if (guard instanceof Response) return guard
    const id = num(String(context.params?.id || '').replace(/\D/g, ''), 0)
    if (!id) return json(fail('课表 id 无效', 400))
    const store = S.timetable()
    const key = `tables/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') {
      if (!doc || doc.deleted === 1) return json(ok(null))
      // 学生端防御：只能看本人本班课表
      if (Number(guard.userType) === 1) {
        const ownClassId = await ownStudentClassId(guard, S.academic())
        if (!ownClassId || num(doc.classId, 0) !== ownClassId) return json(ok(null))
      }
      const { blobs } = await store.list({ prefix: 'slots/' })
      const all = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      const slots = all
        .filter((s) => s && s.deleted !== 1 && num(s.tableId, 0) === id)
        .map(strip)
        .sort((a, b) => num(a.day, 0) - num(b.day, 0) || num(a.period, 0) - num(b.period, 0))
      return json(ok({ ...strip(doc), slots }))
    }
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = { updateTime: now() }
      if (body.status !== undefined && body.status !== null && body.status !== '') {
        patch.status = num(body.status, 0) === 1 ? 1 : 0
      }
      if (body.subjectCombo !== undefined && body.subjectCombo !== null) {
        patch.subjectCombo = String(body.subjectCombo).trim()
      }
      await store.setJSON(key, { ...doc, ...patch })
      return json(ok(null))
    }
    if (method === 'DELETE') {
      const { blobs } = await store.list({ prefix: 'slots/' })
      const all = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      const ts = now()
      const jobs = []
      blobs.forEach((b, i) => {
        const s = all[i]
        if (s && s.deleted !== 1 && num(s.tableId, 0) === id) {
          jobs.push(() => store.setJSON(b.key, { ...s, deleted: 1, updateTime: ts }))
        }
      })
      for (let i = 0; i < jobs.length; i += 30) {
        await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
      }
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: ts })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '课表操作失败', 500))
  }
}
