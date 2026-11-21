/** GET /api/homework/my —— 我的作业：本人班级作业 + 每条提交状态；学生端强制本人 */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../_lib/util.js'
import { buildScope } from '../../_lib/scope.js'
import { ownStudentProfile } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const academic = S.academic()
    const store = S.homework()
    const isStudent = Number(guard.userType) === 1

    let studentId = q.studentId ? num(q.studentId, 0) : 0
    let profile = null
    if (isStudent) {
      profile = await ownStudentProfile(guard, academic)
      studentId = profile ? num(profile.id, 0) : -1
    } else if (studentId) {
      const { blobs } = await academic.list({ prefix: 'students/' })
      const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
      profile = docs.find((d) => d && d.deleted !== 1 && num(d.id, 0) === studentId) || null
    }
    const classId = profile ? num(profile.classId, 0) : -1
    const semester = q.semester ? String(q.semester).trim() : ''
    const scope = await buildScope(context)

    // 取该班全部已发布作业（status=1）；强制本人班级 + scope 过滤
    const listAll = await pagedOrdered(store, 'assignments/', { page: 1, pageSize: 500 },
      (a) => num(a.classId, 0) === classId && num(a.status, 1) === 1 &&
        (!semester || String(a.semester || '') === semester) && scope.filterFn(a), false)
    // 该学生在该班的提交（同样受 scope 约束）
    const { blobs } = await store.list({ prefix: 'submissions/' })
    const subs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const mySubs = subs.filter((s) => s && s.deleted !== 1 && num(s.studentId, 0) === studentId && scope.filterFn(s))

    const records = listAll.records.map((a) => {
      const sub = mySubs.find((s) => num(s.assignmentId, 0) === num(a.id, 0)) || null
      return {
        ...a,
        submission: sub
          ? {
            id: sub.id, status: sub.status, score: sub.score, gradeLevel: sub.gradeLevel,
            isLate: sub.isLate, submitTime: sub.submitTime,
            // 学生读本人提交内容，供前端「重交」回填（无隐私问题）
            content: String(sub.content || ''),
            attachments: Array.isArray(sub.attachments) ? sub.attachments : [],
          }
          : null,
        submitStatus: sub ? (sub.status === 'graded' ? '已批改' : '已交') : '未交',
      }
    })
    return json(ok(stripRecords({ ...listAll, records })))
  } catch (e) {
    return json(fail(e?.message || '查询我的作业失败', 500))
  }
}
