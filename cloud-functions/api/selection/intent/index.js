/** GET/POST /api/selection/intent —— 选科意愿列表（学生仅本人）/ 提交覆盖（后端算 combo） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../../_lib/util.js'
import { ownStudentProfile, normalizeIntent } from '../_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'selection:list' : 'selection:add')
    if (guard instanceof Response) return guard
    const academic = S.academic()
    const store = S.selection()
    const isStudent = Number(guard.userType) === 1

    if (method === 'GET') {
      const q = context.request.query || {}
      const semester = q.semester ? String(q.semester).trim() : ''
      const classId = q.classId ? num(q.classId, 0) : 0
      const grade = q.grade ? num(q.grade, 0) : 0
      const studentIdQ = q.studentId ? num(q.studentId, 0) : 0
      const ownSid = isStudent ? num((await ownStudentProfile(guard, academic))?.id, 0) : 0
      const filter = (x) =>
        (!semester || String(x.semester || '') === semester) &&
        (!isStudent || num(x.studentId, 0) === ownSid) &&
        (isStudent || (!studentIdQ || num(x.studentId, 0) === studentIdQ)) &&
        (!classId || num(x.classId, 0) === classId) &&
        (!grade || num(x.grade, 0) === grade)
      return json(ok(stripRecords(await pagedOrdered(store, 'intents/', q, filter, false))))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      let profile = null
      let forcedSid = null
      if (isStudent) {
        profile = await ownStudentProfile(guard, academic)
        forcedSid = profile ? num(profile.id, 0) : 0
      } else {
        const sid = num(body.studentId, 0)
        if (sid) {
          const { blobs } = await academic.list({ prefix: 'students/' })
          const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
          profile = docs.find((d) => d && d.deleted !== 1 && num(d.id, 0) === sid) || null
        }
        forcedSid = sid
      }
      const { error, data } = normalizeIntent(body, profile, forcedSid)
      if (error) return json(fail(error, 400))

      const sentinelKey = `intent/${data.studentId}/${data.semester}`
      const ts = now()
      const sentinel = await store.get(sentinelKey, { type: 'json' })
      let id = sentinel ? num(sentinel.id, 0) : 0
      const old = id ? await store.get(`intents/${id}.json`, { type: 'json' }) : null
      if (!id) {
        id = await nextId(store, 'intents/')
        await store.setJSON(sentinelKey, { id, studentId: data.studentId, semester: data.semester, createdAt: ts }, { onlyIfNew: true })
      }
      await store.setJSON(`intents/${id}.json`, {
        ...data,
        id,
        deleted: 0,
        createTime: old?.createTime || ts,
        updateTime: ts,
      })
      return json(ok({ id, combo: data.combo, semester: data.semester }))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '选科意愿操作失败', 500))
  }
}
