/** GET /api/ai/term-comment/list —— 班级学期评语列表（教师端；学生只读自己；年级组长按 manageGrades 过滤） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { currentUser, requirePermission, num } from '../../../_lib/util.js'
import { currentSemester } from '../../../_lib/k12.js'
import { listDocs } from '../_shared.js'

/** 学生用户 -> 学生档案 id（student.userId === user.id） */
async function ownStudentId(user, academic) {
  if (!user || Number(user.userType) !== 1) return 0
  const uid = num(user.id ?? user.userId, 0)
  if (!uid) return 0
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const found = docs.find((d) => d && d.deleted !== 1 && num(d.userId, 0) === uid)
  return found ? num(found.id, 0) : 0
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'termcomment:list')
    if (guard instanceof Response) return guard
    const user = await currentUser(context)
    const isStudent = !!user && Number(user.userType) === 1
    const q = context.request.query || {}
    const term = String(q.term || q.semester || '').trim() || currentSemester()
    const classId = q.classId ? num(q.classId, 0) : 0
    const academic = S.academic()
    const docs = await listDocs(S.ai(), 'term-comments/')
    let list = docs.filter((d) => d &&
      String(d.term || '') === term &&
      (!classId || num(d.classId, 0) === classId))

    if (isStudent) {
      const sid = await ownStudentId(user, academic)
      list = sid ? list.filter((d) => num(d.studentId, 0) === sid) : []
    } else if (user && Number(user.userType) === 4) {
      const grades = Array.isArray(user.manageGrades) ? user.manageGrades.map(Number).filter(Number.isFinite) : []
      const gs = new Set(grades)
      const { blobs } = await academic.list({ prefix: 'students/' })
      const students = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
      const allowed = new Set(students
        .filter((s) => s && s.deleted !== 1 && gs.has(Number(s.grade)))
        .map((s) => num(s.id, 0)))
      list = list.filter((d) => allowed.has(num(d.studentId, 0)) || gs.has(Number(d.grade)))
    }
    list.sort((a, b) => num(a.studentId, 0) - num(b.studentId, 0))
    return json(ok(list.map(({ __key, ...rest }) => rest)))
  } catch (e) {
    return json(fail(e?.message || '查询学期评语失败', 500))
  }
}
