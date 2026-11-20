/** GET /api/moral/fiveedu/summary —— 五育汇总（学生只看自己，P1 §3.2） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, currentUser, num } from '../../../_lib/util.js'
import { DIMENSIONS, ownStudentId } from './_fiveedu.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'fiveedu:list')
    if (guard instanceof Response) return guard
    const user = await currentUser(context)
    const isStudent = !!user && Number(user.userType) === 1
    const q = context.request.query || {}
    const semester = q.semester ? String(q.semester).trim() : ''
    const academic = S.academic()
    let studentId = q.studentId ? num(q.studentId, 0) : 0
    if (isStudent) {
      studentId = await ownStudentId(user, academic)
      if (!studentId) return json(ok(null))
    }
    if (!studentId) return json(fail('studentId 不能为空', 400))

    const student = await academic.get(`students/${studentId}.json`, { type: 'json' })
    const store = S.moral()
    const { blobs } = await store.list({ prefix: 'fiveedu/' })
    const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const recs = docs.filter((d) => d && d.deleted !== 1 &&
      num(d.studentId, 0) === studentId &&
      (!semester || String(d.semester || '') === semester))

    const source = student && student.fiveEdu && typeof student.fiveEdu === 'object' ? student.fiveEdu : {}
    const fiveEdu = {}
    const counts = {}
    for (const d of DIMENSIONS) {
      fiveEdu[d] = Math.max(0, num(source[d], 0))
      counts[d] = recs.filter((r) => String(r.dimension || '') === d).length
    }
    const tags = []
    for (const r of recs.slice().sort((a, b) => num(b.id, 0) - num(a.id, 0))) {
      for (const t of (Array.isArray(r.tags) ? r.tags : [])) {
        const s = String(t).trim()
        if (s && !tags.includes(s)) tags.push(s)
      }
    }
    return json(ok({
      studentId,
      studentName: String(student?.realName || recs[0]?.studentName || ''),
      fiveEdu, counts,
      recentTags: tags.slice(0, 10),
      total: recs.length,
      semester,
    }))
  } catch (e) {
    return json(fail(e?.message || '五育汇总失败', 500))
  }
}
