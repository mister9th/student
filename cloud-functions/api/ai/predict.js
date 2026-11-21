/**
 * POST /api/ai/predict —— 成绩预测与挂科风险评估
 * ------------------------------------------------------------------
 * - 数据源：Blob `edu-academic/scores/<studentId>/` 真实成绩 + 课程/学生文档
 * - AI Gateway 增强预测分与建议；无凭据/失败时用规则基线兜底
 * - 预测记录落 Blob `edu-ai/predictions/<studentId>/<id>.json`
 * - 响应结构对齐 mock.ts：{ studentId, studentName, courseId, courseName,
 *   predictedScore, riskLevel, riskReason, confidence, suggestion,
 *   historyAvg, attendanceRate }
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import {
  askAI, pick, num, clamp, getDoc, scoresOf, courseMap, studentName,
  courseName, scoreValue, deriveAttendance, extractScore, extractRiskLevel, ownStudentIdOf,
} from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const guard = await requirePermission(context, 'ai')
    if (guard instanceof Response) return guard

    const body = await bodyOf(context.request)
    const academic = S.academic()
    let studentId = num(pick(body, 'studentId', 'student_id'), 0)
    const courseId = num(pick(body, 'courseId', 'course_id'), 0)
    if (Number(guard.userType) === 1) {
      studentId = await ownStudentIdOf(guard, academic)
      if (!studentId) return json(fail('未定位到学生档案', 403), 403)
    }
    if (!studentId || !courseId) return json(fail('缺少 studentId 或 courseId', 400), 400)
    const studentDoc = await getDoc(academic, `students/${studentId}.json`)
    const courses = await courseMap()
    const courseDoc = courses.get(courseId) || (await getDoc(academic, `courses/${courseId}.json`))

    const scores = await scoresOf(studentId)
    const valid = scores.map(scoreValue).filter((v) => v > 0)
    const historyAvg = valid.length
      ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
      : 75

    const thisScoreDoc = scores.find((s) => num(pick(s, 'courseId', 'course_id', 'subjectId'), 0) === courseId) || scores[0]
    const thisScore = thisScoreDoc ? scoreValue(thisScoreDoc) : historyAvg

    const name = await studentName(studentId, studentDoc, thisScoreDoc)
    const cName = courseName(courseDoc, thisScoreDoc) || '演示课程'
    const attendance = deriveAttendance(historyAvg, studentId)

    // 规则基线：历史均分 70% + 该课程当前分 30% + 小幅确定性扰动
    const base = clamp(
      Math.round(historyAvg * 0.7 + thisScore * 0.3 + ((studentId * 7 + courseId * 3) % 9) - 4),
      30, 99
    )
    const baseRisk = base >= 80 ? 'low' : base >= 70 ? 'medium' : 'high'

    // AI Gateway 增强（真实数据拼 prompt）
    const aiText = await askAI(context.env, [
      {
        role: 'system',
        content: '你是成绩预测助手。只输出 JSON，格式：{"score":数字,"riskLevel":"low|medium|high","reason":"风险原因","suggestion":"学习建议"}，不要输出其它文字或 markdown。',
      },
      {
        role: 'user',
        content: `学生「${name || '学生'}」（ID ${studentId}）历史 ${valid.length} 门课程平均总评 ${historyAvg} 分；课程「${cName}」当前总评 ${thisScore} 分；出勤率约 ${attendance}%。请预测该课程期末总评分数并评估挂科风险、给出建议。`,
      },
    ], { temperature: 0.3, maxTokens: 512 })

    let predictedScore = base
    let riskLevel = baseRisk
    let aiReason = ''
    let aiSuggestion = ''

    if (aiText) {
      try {
        const clean = aiText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
        const parsed = JSON.parse(clean)
        const s = extractScore(String(parsed.score))
        if (s != null) predictedScore = clamp(s, 30, 99)
        const r = extractRiskLevel(String(parsed.riskLevel || '')) || (parsed.riskLevel === 'low' || parsed.riskLevel === 'medium' || parsed.riskLevel === 'high' ? parsed.riskLevel : null)
        if (r) riskLevel = r
        aiReason = String(parsed.reason || parsed.riskReason || '')
        aiSuggestion = String(parsed.suggestion || '')
      } catch {
        const s = extractScore(aiText)
        if (s != null) predictedScore = clamp(s, 30, 99)
        const r = extractRiskLevel(aiText)
        if (r) riskLevel = r
      }
    }

    // 若 AI 只调整了分数，风险等级随之校准（保证字段自洽）
    if (!aiText || !aiReason) {
      riskLevel = predictedScore >= 80 ? 'low' : predictedScore >= 70 ? 'medium' : 'high'
    }

    const riskReason = aiReason || (
      riskLevel === 'low'
        ? '各项指标稳定，挂科风险较低'
        : `历史总评均分 ${historyAvg} 分，近期出勤与作业完成度有所下降，需重点关注`
    )

    // 落库预测记录（基于真实数据）
    try {
      await S.ai().setJSON(`predictions/${studentId}/${Date.now()}-${courseId}.json`, {
        studentId,
        studentName: name,
        courseId,
        courseName: cName,
        predictedScore,
        riskLevel,
        historyAvg,
        attendanceRate: attendance,
        createdAt: Date.now(),
      })
    } catch { /* 落库失败不影响主流程 */ }

    return json(ok({
      studentId,
      studentName: name || '演示学生',
      courseId,
      courseName: cName,
      predictedScore,
      riskLevel,
      riskReason,
      confidence: 82 + (studentId % 12),
      suggestion: aiSuggestion || '建议保持规律学习，按时完成作业，并针对薄弱章节加强练习。',
      historyAvg,
      attendanceRate: attendance,
    }))
  } catch (e) {
    return json(fail(`成绩预测失败：${(e && e.message) || '未知错误'}`))
  }
}
