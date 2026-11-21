/** GET /api/homework/stats —— 作业时长/完成统计 + 双减班级汇总（实时计算，不落库） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { submissionStatsOf } from './_shared.js'

const DEFAULT_THRESHOLD = 90
const minutesBetween = (a, b) => {
  if (!a || !b) return null
  const x = new Date(String(a).replace(' ', 'T'))
  const y = new Date(String(b).replace(' ', 'T'))
  if (Number.isNaN(x.getTime()) || Number.isNaN(y.getTime())) return null
  return Math.max(0, (y.getTime() - x.getTime()) / 60000)
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const classId = q.classId ? num(q.classId, 0) : 0
    const subjectId = q.subjectId ? num(q.subjectId, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''

    const cfg = await S.homework().get('config.json', { type: 'json' })
    const thresholdMinutes = cfg && cfg.defaultMinutes !== undefined ? num(cfg.defaultMinutes, DEFAULT_THRESHOLD) : DEFAULT_THRESHOLD

    // 班级学生数映射
    const academic = S.academic()
    const { blobs: studentBlobs } = await academic.list({ prefix: 'students/' })
    const students = await Promise.all(studentBlobs.map((b) => academic.get(b.key, { type: 'json' })))
    const studentsByClass = {}
    students.forEach((s) => {
      if (!s || s.deleted === 1) return
      const cid = num(s.classId, 0)
      studentsByClass[cid] = (studentsByClass[cid] || 0) + 1
    })

    const store = S.homework()
    const { blobs: aBlobs } = await store.list({ prefix: 'assignments/' })
    const assignments = (await Promise.all(aBlobs.map((b) => store.get(b.key, { type: 'json' }))))
      .filter((a) => a && a.deleted !== 1 && num(a.status, 1) === 1)
      .filter((a) => (!classId || num(a.classId, 0) === classId))
      .filter((a) => (!subjectId || num(a.subjectId, 0) === subjectId))
      .filter((a) => (!semester || String(a.semester || '') === semester))

    const { blobs: sBlobs } = await store.list({ prefix: 'submissions/' })
    const allSubs = (await Promise.all(sBlobs.map((b) => store.get(b.key, { type: 'json' }))))
      .filter((s) => s && s.deleted !== 1)

    const rows = []
    const byClass = {}
    for (const a of assignments) {
      const cid = num(a.classId, 0)
      const subs = allSubs.filter((s) => num(s.assignmentId, 0) === num(a.id, 0))
      const stats = await submissionStatsOf(store, a.id)
      const totalStudents = studentsByClass[cid] || 0
      const actuals = subs.map((s) => minutesBetween(a.createTime, s.submitTime)).filter((v) => v !== null)
      const avgActualMinutes = actuals.length
        ? Math.round((actuals.reduce((x, y) => x + y, 0) / actuals.length) * 10) / 10
        : null
      rows.push({
        id: a.id,
        title: a.title,
        className: a.className || '',
        subjectName: a.subjectName || '',
        dueTime: a.dueTime,
        expectedMinutes: num(a.expectedMinutes, 0),
        submittedCount: stats.submittedCount,
        gradedCount: stats.gradedCount,
        totalStudents,
        avgScore: stats.avgScore,
        onTimeRate: stats.onTimeRate,
        avgExpectedMinutes: num(a.expectedMinutes, 0),
        avgActualMinutes,
      })
      if (!byClass[cid]) {
        const cls = await academic.get(`classes/${cid}.json`, { type: 'json' })
        byClass[cid] = { classId: cid, className: cls?.className || a.className || '', totalExpectedMinutes: 0, totalStudents }
      }
      byClass[cid].totalExpectedMinutes += num(a.expectedMinutes, 0)
    }
    const doubleReduction = Object.values(byClass).map((c) => ({
      ...c,
      avgPerStudent: c.totalStudents ? Math.round((c.totalExpectedMinutes / c.totalStudents) * 10) / 10 : 0,
      exceeded: c.totalStudents ? (c.totalExpectedMinutes / c.totalStudents) > thresholdMinutes : false,
    }))

    return json(ok({
      classId, subjectId, semester, thresholdMinutes,
      assignments: rows,
      doubleReduction,
      // 前端兼容别名（items/classes/threshold 与 assignments/doubleReduction/thresholdMinutes 同值）
      items: rows,
      classes: doubleReduction,
      threshold: thresholdMinutes,
      total: rows.length,
    }))
  } catch (e) {
    return json(fail(e?.message || '统计作业失败', 500))
  }
}
