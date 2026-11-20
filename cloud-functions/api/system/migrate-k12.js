/** POST /api/system/migrate-k12 —— 存量大学演示数据就地改写为 K12 模型（仅 *:* 权限，幂等） */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { k12GradeOf } from '../../_lib/k12.js'

// 与 seed.js 一致的 K12 目标映射
const CLASS_MAP = {
  1: { className: '三年级(1)班', stage: 1, grade: 3, enrollmentYear: 2022 },
  2: { className: '三年级(2)班', stage: 1, grade: 3, enrollmentYear: 2022 },
  3: { className: '初一(1)班', stage: 2, grade: 7, enrollmentYear: 2024 },
  4: { className: '初一(2)班', stage: 2, grade: 7, enrollmentYear: 2024 },
  5: { className: '高一(1)班', stage: 3, grade: 10, enrollmentYear: 2024 },
  6: { className: '高一(2)班', stage: 3, grade: 10, enrollmentYear: 2024 },
}
const COURSE_MAP = {
  1: { courseName: '语文', stage: 1 }, 2: { courseName: '数学', stage: 1 },
  3: { courseName: '英语', stage: 1 }, 4: { courseName: '道德与法治', stage: 1 },
  5: { courseName: '科学', stage: 1 }, 6: { courseName: '信息科技', stage: 1 },
  7: { courseName: '物理', stage: 2 }, 8: { courseName: '化学', stage: 2 },
  9: { courseName: '生物学', stage: 3 }, 10: { courseName: '历史', stage: 3 },
  11: { courseName: '地理', stage: 3 }, 12: { courseName: '信息技术', stage: 3 },
}
const gradeScopeOf = (stage) => (stage === 1 ? '1-6年级' : stage === 2 ? '7-9年级' : '10-12年级')
const TEACHER_SUBJECTS = ['语文', '数学', '英语', '物理', '化学', '生物学', '道德与法治', '历史', '地理', '信息科技']

const drop = (doc, keys) => {
  const next = { ...doc }
  for (const k of keys) delete next[k]
  return next
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard

    const config = S.config()
    const academic = S.academic()
    const meta = (await config.get('meta.json', { type: 'json' })) || {}
    // 幂等：已迁移过则直接跳过
    if (meta.k12Migrated) return json(ok({ skipped: true }))

    const migrated = { classes: 0, students: 0, courses: 0, scores: 0, selections: 0, teachers: 0 }

    // 1. classes：按 id 1..6 映射，删 major/department，其余保留
    for (const [id, m] of Object.entries(CLASS_MAP)) {
      const key = `classes/${id}.json`
      const doc = await academic.get(key, { type: 'json' })
      if (!doc) continue
      await academic.setJSON(key, {
        ...drop(doc, ['major', 'department']),
        className: m.className, stage: m.stage, grade: m.grade, enrollmentYear: m.enrollmentYear,
        updateTime: now(),
      })
      migrated.classes++
    }

    // 2. students：grade/stage 取所在班级，删 major
    {
      const { blobs } = await academic.list({ prefix: 'students/' })
      for (const b of blobs) {
        const doc = await academic.get(b.key, { type: 'json' })
        if (!doc) continue
        const cls = doc.classId != null ? await academic.get(`classes/${doc.classId}.json`, { type: 'json' }) : null
        await academic.setJSON(b.key, {
          ...drop(doc, ['major']),
          stage: cls?.stage ?? doc.stage ?? null,
          grade: cls?.grade ?? doc.grade ?? null,
          updateTime: now(),
        })
        migrated.students++
      }
    }

    // 3. courses：按 id 1..12 换 courseName/stage，删 courseCode/credit/selectedCount
    for (const [id, m] of Object.entries(COURSE_MAP)) {
      const key = `courses/${id}.json`
      const doc = await academic.get(key, { type: 'json' })
      if (!doc) continue
      await academic.setJSON(key, {
        ...drop(doc, ['courseCode', 'credit', 'selectedCount']),
        courseName: m.courseName, stage: m.stage, gradeScope: gradeScopeOf(m.stage),
        updateTime: now(),
      })
      migrated.courses++
    }

    // 4. scores：改写为单考次模型，classId/className 从学生文档回填
    {
      const { blobs } = await academic.list({ prefix: 'scores/' })
      for (const b of blobs) {
        const doc = await academic.get(b.key, { type: 'json' })
        if (!doc) continue
        const score = doc.totalScore ?? doc.finalScore ?? 0
        const student = doc.studentId != null ? await academic.get(`students/${doc.studentId}.json`, { type: 'json' }) : null
        await academic.setJSON(b.key, {
          ...drop(doc, ['usualScore', 'midtermScore', 'finalScore', 'totalScore', 'gradePoint', 'ranking', 'courseId', 'courseName']),
          subjectId: doc.subjectId ?? doc.courseId ?? null,
          subjectName: doc.subjectName ?? doc.courseName ?? '',
          classId: student?.classId ?? doc.classId ?? null,
          className: student?.className ?? doc.className ?? '',
          examName: doc.examName || '2024-2025学年第一学期期末考试',
          examType: doc.examType || 3,
          examDate: doc.examDate || '2025-01-15',
          score, gradeLevel: k12GradeOf(score),
          updateTime: now(),
        })
        migrated.scores++
      }
    }

    // 5. selections：全部软删（选课制废弃）
    {
      const { blobs } = await academic.list({ prefix: 'selections/' })
      for (const b of blobs) {
        const doc = await academic.get(b.key, { type: 'json' })
        if (!doc || doc.deleted === 1) continue
        await academic.setJSON(b.key, { ...doc, deleted: 1, updateTime: now() })
        migrated.selections++
      }
    }

    // 6. teachers：department 改任教学科（循环表同 seed）
    {
      const { blobs } = await academic.list({ prefix: 'teachers/' })
      const ids = blobs
        .map((b) => Number(b.key.slice('teachers/'.length).replace(/\.json$/, '')))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b)
      for (const id of ids) {
        const key = `teachers/${id}.json`
        const doc = await academic.get(key, { type: 'json' })
        if (!doc) continue
        await academic.setJSON(key, { ...doc, department: TEACHER_SUBJECTS[(id - 1) % TEACHER_SUBJECTS.length], updateTime: now() })
        migrated.teachers++
      }
    }

    // 7. 写回幂等标记（meta.json 已存在 seeded 标记，故用普通覆盖写而非 onlyIfNew）
    await config.setJSON('meta.json', { ...meta, k12Migrated: true, k12MigratedAt: now() })

    return json(ok({ migrated }))
  } catch (e) {
    return json(fail(e?.message || 'K12 迁移失败', 500))
  }
}
