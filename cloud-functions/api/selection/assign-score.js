/** POST /api/selection/assign-score —— 按考试+科目计算赋分双列（派生视图，不写回 score） */
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { rankPercentOf, assignDetail } from '../../_lib/assign-score.js'

const NON_ELECTIVE = new Set(['语文', '数学', '英语'])

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'assign-score')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const examId = num(body.examId, 0)
    const semester = String(body.semester || '').trim()
    const grade = num(body.grade, 0)
    const examNameQ = String(body.examName || '').trim()

    const examStore = S.exam()
    const academic = S.academic()
    let exam = null
    if (examId > 0) {
      const found = await examStore.get(`exams/${examId}.json`, { type: 'json' })
      if (found && found.deleted !== 1) exam = found
    }
    const examName = exam ? String(exam.examName || '') : examNameQ

    // 班级 -> 年级 映射（score 文档本身无 grade）
    const { blobs: cBlobs } = await academic.list({ prefix: 'classes/' })
    const classDocs = await Promise.all(cBlobs.map((b) => academic.get(b.key, { type: 'json' })))
    const gradeByClass = {}
    classDocs.forEach((c) => { if (c) gradeByClass[num(c.id, 0)] = num(c.grade, 0) })

    const { blobs } = await academic.list({ prefix: 'scores/' })
    const allScores = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
    const matched = allScores.filter((s) => {
      if (!s || s.deleted === 1) return false
      const sid = num(s.examId, 0)
      // 考试匹配：examId 命中，或（无 examId 时）examName 回退匹配，兼容 seed 单考次数据
      if (exam) {
        const byId = sid && sid === num(exam.id, 0)
        const byName = !sid && String(s.examName || '') === examName
        if (!byId && !byName) return false
      } else if (examId > 0) {
        if (sid !== examId) return false
      } else if (examNameQ) {
        if (String(s.examName || '') !== examNameQ) return false
      }
      if (semester && String(s.semester || '') !== semester) return false
      if (grade && gradeByClass[num(s.classId, 0)] !== grade) return false
      return true
    })

    // 按科目分组
    const bySubject = {}
    matched.forEach((s) => {
      const key = num(s.subjectId, 0)
      if (!bySubject[key]) bySubject[key] = { subjectId: key, subjectName: String(s.subjectName || ''), rows: [] }
      bySubject[key].rows.push(s)
    })

    const subjects = Object.values(bySubject).map((grp) => {
      const isElective = !NON_ELECTIVE.has(grp.subjectName)
      const raws = grp.rows.map((s) => num(s.score, 0))
      const list = grp.rows.map((s) => {
        const raw = num(s.score, 0)
        const base = { studentId: num(s.studentId, 0), studentName: String(s.studentName || ''), rawScore: raw }
        if (!isElective) return { ...base, rankPercent: null, assignedScore: null, level: null }
        const d = assignDetail(raw, rankPercentOf(raw, raws))
        return { ...base, rankPercent: d.rankPercent, assignedScore: d.assignedScore, level: d.level }
      })
      list.sort((a, b) => b.rawScore - a.rawScore || a.studentId - b.studentId)
      return { subjectId: grp.subjectId, subjectName: grp.subjectName, isElective, count: list.length, list }
    })

    // 直接返回科目数组（前端 AssignScoreVO[] 期望；每项 {subjectId,subjectName,isElective,count,list}）
    // 说明：examId/examName 等元数据不再随响应返回，查询上下文由前端请求参数持有。
    return json(ok(subjects))
  } catch (e) {
    return json(fail(e?.message || '赋分计算失败', 500))
  }
}
