/** GET/PUT/DELETE /api/score/{id}（PUT 重算 gradeLevel；P1 可选 examId 覆盖冗余字段） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, k12GradeOf, currentSemester, strip, requirePermission } from '../../_lib/util.js'
import { loadTeachings, findTeachingTeacherId } from '../../_lib/score-join.js'
import { buildScope } from '../../_lib/scope.js'

const pad2 = (n) => String(n).padStart(2, '0')
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'score:list' : 'score:edit')
    if (guard instanceof Response) return guard
    const scope = await buildScope(context)
    const store = S.academic()
    const key = `scores/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') {
      // 学生只能读本人成绩；其余角色按 scope 判定
      if (!doc || doc.deleted === 1) return json(ok(null))
      if (!scope.filterFn(doc)) return json(ok(null))
      return json(ok(strip(doc)))
    }
    if (!doc || doc.deleted === 1) return json(ok(null))
    if (!scope.filterFn(doc)) return json(fail('无权操作该成绩', 403), 403)

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const studentId = body.studentId !== undefined ? num(body.studentId, 0) : num(doc.studentId, 0)
      const subjectId = body.subjectId !== undefined ? num(body.subjectId, 0) : num(doc.subjectId, 0)
      if (!studentId) return json(fail('学生不能为空', 400))
      if (!subjectId) return json(fail('科目不能为空', 400))

      // P1 §1.3：examId 提供时读考试文档覆盖冗余字段；不提供沿用旧值（存量兼容）
      const examId = body.examId !== undefined ? num(body.examId, 0) : num(doc.examId, 0)
      let exam = null
      if (examId > 0) {
        const found = await S.exam().get(`exams/${examId}.json`, { type: 'json' })
        if (found && found.deleted !== 1) exam = found
      }
      const examName = exam ? String(exam.examName || '')
        : (body.examName !== undefined ? String(body.examName || '').trim() : String(doc.examName || ''))
      if (!examName) return json(fail('考试名称不能为空', 400))
      const rawScore = body.score !== undefined ? num(body.score, NaN) : num(doc.score, NaN)
      if (!Number.isFinite(rawScore) || rawScore < 0 || rawScore > 100) return json(fail('分数需在 0-100 之间', 400))
      const examType = exam ? num(exam.examType, 3)
        : (body.examType !== undefined ? num(body.examType, 0) : num(doc.examType, 3))
      if (examType < 1 || examType > 5) return json(fail('考试类型不合法（1-5）', 400))
      const examDate = exam ? String(exam.examDate || '')
        : (body.examDate !== undefined ? (String(body.examDate || '').trim() || today()) : String(doc.examDate || ''))

      // 学生/科目变更时同步冗余字段（宽松处理：查不到置空）
      const student = studentId !== num(doc.studentId, 0) ? await store.get(`students/${studentId}.json`, { type: 'json' }) : null
      const subject = subjectId !== num(doc.subjectId, 0) ? await store.get(`courses/${subjectId}.json`, { type: 'json' }) : null
      const semester = exam ? String(exam.semester || '')
        : (body.semester !== undefined ? String(body.semester || '').trim() : (subject?.semester || doc.semester || currentSemester()))
      const classId = student ? (student.classId ?? null) : (doc.classId ?? null)
      // 目标也必须落在 scope 内，防止把成绩改到别的班/科目
      if (!scope.filterFn({ ...doc, studentId, classId, subjectId, semester })) {
        return json(fail('无权将成绩改到该学生/科目', 403), 403)
      }
      // K12-P4 §2：teacherId 优先授课关系，回退 course.teacherId
      const taughtTeacherId = findTeachingTeacherId({ teachings: await loadTeachings() }, subjectId, classId, semester)
      const courseDoc = subject || await store.get(`courses/${subjectId}.json`, { type: 'json' })
      const teacherId = taughtTeacherId !== null ? taughtTeacherId : (courseDoc?.teacherId ?? doc.teacherId ?? null)
      await store.setJSON(key, {
        ...doc,
        studentId,
        studentName: student?.realName || doc.studentName || '',
        classId: student ? (student.classId ?? null) : doc.classId ?? null,
        className: student ? (student.className || '') : doc.className || '',
        subjectId,
        subjectName: subject ? (subject.courseName || '') : doc.subjectName || '',
        examId, examName, examType, examDate, semester,
        score: rawScore, gradeLevel: k12GradeOf(rawScore),
        teacherId,
        comment: body.comment !== undefined ? String(body.comment || '') : doc.comment || '',
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作成绩失败', 500))
  }
}
