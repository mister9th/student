/**
 * GET /api/score/ranking —— 考试排名（P1 §2.2）
 * 教师/管理员 score:ranking 看完整排名；学生 score:list 只看自己且服务端剥离排名。
 */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { currentUser, requirePermission, num } from '../../_lib/util.js'
import { loadScoreJoinMaps, overlayScoreFields } from '../../_lib/score-join.js'
import { buildScope } from '../../_lib/scope.js'

/** 学生用户 -> 学生档案 id（student.userId === user.id），找不到返回 0 */
async function ownStudentId(user, academic) {
  if (!user || Number(user.userType) !== 1) return 0
  const uid = num(user.id ?? user.userId, 0)
  if (!uid) return 0
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const found = docs.find((d) => d && d.deleted !== 1 && num(d.userId, 0) === uid)
  return found ? num(found.id, 0) : 0
}

/** 读取排名策略单文档配置（缺省 publishRank=0 / rankMode=exam / useLevel=1） */
async function settingsOf() {
  const saved = await S.config().get('config/exam-settings.json', { type: 'json' })
  return {
    publishRank: saved && saved.publishRank !== undefined ? num(saved.publishRank, 0) : 0,
    rankMode: saved && saved.rankMode ? String(saved.rankMode) : 'exam',
    useLevelInsteadOfRank: saved && saved.useLevelInsteadOfRank !== undefined ? num(saved.useLevelInsteadOfRank, 1) : 1,
  }
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    // 先用 currentUser 判定角色以选择权限码，再由 requirePermission 统一守卫
    const probe = await currentUser(context)
    const isStudent = !!probe && Number(probe.userType) === 1
    const guard = await requirePermission(context, isStudent ? 'score:list' : 'score:ranking')
    if (guard instanceof Response) return guard
    const user = guard
    // 学生分支保留原有强制本人逻辑；非学生分支接入五级 scope
    const scope = isStudent ? null : await buildScope(context)
    const q = context.request.query || {}
    const academic = S.academic()
    const examStore = S.exam()

    // 定位考试：examId 优先；无 examId 时按 examName 匹配 exam 文档（存量兼容）
    const examId = q.examId ? num(q.examId, 0) : 0
    const examNameQ = q.examName ? String(q.examName).trim() : ''
    let exam = null
    if (examId > 0) {
      const found = await examStore.get(`exams/${examId}.json`, { type: 'json' })
      if (found && found.deleted !== 1) exam = found
    } else if (examNameQ) {
      const { blobs } = await examStore.list({ prefix: 'exams/' })
      const docs = await Promise.all(blobs.map((b) => examStore.get(b.key, { type: 'json' })))
      exam = docs.find((d) => d && d.deleted !== 1 && String(d.examName || '') === examNameQ) || null
    }

    const semester = q.semester ? String(q.semester).trim() : ''
    const classId = q.classId ? num(q.classId, 0) : 0
    const sidQ = q.studentId ? num(q.studentId, 0) : 0
    const ownSid = isStudent ? await ownStudentId(user, academic) : 0

    const { blobs } = await academic.list({ prefix: 'scores/' })
    const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
    const rows = []
    for (const s of docs) {
      if (!s || s.deleted === 1) continue
      const eid = num(s.examId, 0)
      if (exam) {
        const matched = eid ? eid === num(exam.id, 0) : String(s.examName || '') === String(exam.examName || '')
        if (!matched) continue
      } else if (examId > 0) {
        if (eid !== examId) continue
      } else if (examNameQ) {
        if (String(s.examName || '') !== examNameQ) continue
      }
      if (semester && String(s.semester || '') !== semester) continue
      if (classId && num(s.classId, 0) !== classId) continue
      if (isStudent) {
        // 学生强制只看自己：忽略传入 studentId/classId
        if (!ownSid || num(s.studentId, 0) !== ownSid) continue
      } else {
        if (sidQ && num(s.studentId, 0) !== sidQ) continue
        if (!scope.filterFn(s)) continue
      }
      const score = num(s.score, 0)
      rows.push({
        studentId: num(s.studentId, 0),
        studentName: String(s.studentName || ''),
        className: String(s.className || ''),
        subjectId: num(s.subjectId, 0),
        subjectName: String(s.subjectName || ''),
        score,
        gradeLevel: String(s.gradeLevel || ''),
        totalScore: score,
      })
    }

    // 读时联表：排序/剥离前用权威文档覆盖展示字段（学生/课程改名、换班后仍显示最新值）
    const maps = await loadScoreJoinMaps()
    for (const r of rows) {
      const over = overlayScoreFields(r, maps)
      r.studentName = over.studentName
      r.className = over.className
      r.subjectName = over.subjectName
    }

    // dense rank：同分同名次、名次连续（1,1,2,3...）
    rows.sort((a, b) => b.score - a.score || a.studentId - b.studentId)
    let prev = null
    let rank = 0
    for (let i = 0; i < rows.length; i++) {
      if (prev === null || rows[i].score !== prev) {
        rank = i + 1
        prev = rows[i].score
      }
      rows[i].rank = rank
    }

    const settings = await settingsOf()
    const examPr = exam && exam.publishRank !== null && exam.publishRank !== undefined
      ? num(exam.publishRank, 0) : null
    const publishRank = examPr !== null ? examPr : settings.publishRank
    // 学生端剥离 rank/totalScore，仅保留本人基本字段；
    // 教师/管理员始终可见完整排名（D3：义务教育默认不公开但教师可见排名）
    const list = isStudent
      ? rows.map((r) => ({ studentId: r.studentId, studentName: r.studentName, score: r.score, gradeLevel: r.gradeLevel }))
      : rows

    return json(ok({
      examId: exam ? num(exam.id, 0) : examId,
      examName: exam ? String(exam.examName || '') : examNameQ,
      publishRank,
      rankMode: settings.rankMode,
      useLevelInsteadOfRank: settings.useLevelInsteadOfRank,
      list,
      total: list.length,
      viewerType: isStudent ? 'student' : 'teacher',
    }))
  } catch (e) {
    return json(fail(e?.message || '排名查询失败', 500))
  }
}
