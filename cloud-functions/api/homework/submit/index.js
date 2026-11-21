/** POST /api/homework/submit —— 学生提交作业（一生一作业一条，重复提交覆盖；graded 后拒改） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { ownStudentProfile, isLateOf } from '../_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:submit')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const assignmentId = num(body.assignmentId, 0)
    if (!assignmentId) return json(fail('作业不能为空', 400))
    const store = S.homework()
    const academic = S.academic()
    const assignment = await store.get(`assignments/${assignmentId}.json`, { type: 'json' })
    if (!assignment || assignment.deleted === 1) return json(fail('作业不存在', 400))
    if (num(assignment.status, 1) !== 1) return json(fail('作业已撤回，不能提交', 400))

    const isStudent = Number(guard.userType) === 1
    let profile = null
    let studentId = 0
    if (isStudent) {
      profile = await ownStudentProfile(guard, academic)
      studentId = profile ? num(profile.id, 0) : 0
    } else {
      studentId = num(body.studentId, 0)
      if (studentId) {
        const { blobs } = await academic.list({ prefix: 'students/' })
        const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
        profile = docs.find((d) => d && d.deleted !== 1 && num(d.id, 0) === studentId) || null
      }
    }
    if (!studentId) return json(fail('未定位到学生档案', 400))

    const sentinelKey = `submission/${assignmentId}/${studentId}`
    const ts = now()
    const attachments = Array.isArray(body.attachments) ? body.attachments.map((x) => String(x)).filter(Boolean) : []
    const content = String(body.content || '')
    const sentinel = await store.get(sentinelKey, { type: 'json' })
    let id = sentinel ? num(sentinel.id, 0) : 0
    const old = id ? await store.get(`submissions/${id}.json`, { type: 'json' }) : null
    // 状态机：submitted -> graded；已批改不可再改提交
    if (old && old.status === 'graded') return json(fail('作业已批改，不能修改提交', 400))

    if (!id) {
      id = await nextId(store, 'submissions/')
      await store.setJSON(sentinelKey, { id, assignmentId, studentId, createdAt: ts }, { onlyIfNew: true })
    }
    const submitTime = old?.submitTime || ts
    await store.setJSON(`submissions/${id}.json`, {
      id,
      assignmentId,
      studentId,
      studentName: profile?.realName || String(body.studentName || ''),
      classId: profile?.classId ?? assignment.classId,
      content,
      attachments,
      submitTime,
      isLate: isLateOf(assignment.dueTime, submitTime),
      status: 'submitted',
      score: null,
      gradeLevel: null,
      comment: '',
      gradedBy: null,
      gradedTime: null,
      createTime: old?.createTime || ts,
      updateTime: ts,
      deleted: 0,
    })
    return json(ok({ id, status: 'submitted' }))
  } catch (e) {
    return json(fail(e?.message || '提交作业失败', 500))
  }
}
