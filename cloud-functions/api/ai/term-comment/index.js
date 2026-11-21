/** GET/POST /api/ai/term-comment —— 学期评语（P1 §6；学生只读自己） */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { currentUser, requirePermission, num } from '../../../_lib/util.js'
import { currentSemester } from '../../../_lib/k12.js'
import { pick } from '../_shared.js'
import { buildComment } from '../comment.js'
import { writeOperLog } from '../../../_lib/oper-log.js'

const keyOf = (studentId, term) => `term-comments/${studentId}/${term}.json`

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
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'termcomment:list' : 'termcomment:add')
    if (guard instanceof Response) return guard
    const user = await currentUser(context)
    const isStudent = !!user && Number(user.userType) === 1
    const q = context.request.query || {}
    const academic = S.academic()
    const store = S.ai()

    if (method === 'GET') {
      let studentId = q.studentId ? num(q.studentId, 0) : 0
      if (isStudent) {
        studentId = await ownStudentId(user, academic)
        if (!studentId) return json(ok(null))
      }
      const term = String(q.term || q.semester || '').trim() || currentSemester()
      if (!studentId) return json(fail('studentId 不能为空', 400))
      const doc = await store.get(keyOf(studentId, term), { type: 'json' })
      return json(ok(!doc || doc.deleted === 1 ? null : doc))
    }
    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const studentId = num(pick(body, 'studentId', 'student_id'), 0)
      if (!studentId) return json(fail('studentId 不能为空', 400))
      const term = String(pick(body, 'term', 'semester') || '').trim() || currentSemester()
      const student = await academic.get(`students/${studentId}.json`, { type: 'json' })
      if (!student || student.deleted === 1) return json(fail('学生档案不存在', 400))
      const generateAi = body.generateAi === true || body.generateAi === 1 || body.generateAi === 'true'
      const existing = await store.get(keyOf(studentId, term), { type: 'json' })
      let aiDraft = ''
      let content = String(pick(body, 'content') || '')
      if (generateAi) {
        // 同款 comment.js prompt 生成草稿并存 aiDraft、预填 content
        const c = await buildComment(context, studentId, 'semester', term)
        aiDraft = c.aiComment
        if (!content) content = aiDraft
      } else if (pick(body, 'aiDraft') !== undefined) {
        aiDraft = String(pick(body, 'aiDraft') || '')
      } else if (existing?.aiDraft) {
        aiDraft = String(existing.aiDraft)
      }
      const bodySource = String(pick(body, 'source') || '')
      const source = generateAi ? 'ai' : (bodySource === 'ai' || bodySource === 'manual' ? bodySource : 'manual')
      const doc = {
        id: existing?.id || Date.now(),
        studentId,
        studentName: String(student.realName || ''),
        classId: student.classId ?? null,
        className: String(student.className || ''),
        stage: num(student.stage, 0),
        grade: num(student.grade, 0),
        term,
        content,
        source,
        teacherId: guard.id ?? guard.userId ?? null,
        teacherName: String(guard.realName || ''),
        aiDraft,
        createTime: existing?.createTime || now(),
        updateTime: now(),
      }
      // key 即 term，覆盖写保证同生同学期只有一份
      await store.setJSON(keyOf(studentId, term), doc)
      await writeOperLog(context, { module: '学期评语', operation: '生成或保存评语' })
      return json(ok({ studentId, term, id: doc.id }))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '学期评语操作失败', 500))
  }
}
