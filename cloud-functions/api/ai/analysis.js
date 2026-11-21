/**
 * POST /api/ai/analysis —— AI 学习分析
 * ------------------------------------------------------------------
 * - 数据源：Blob 该生真实成绩（均分 / 课程数）+ 班级文档
 * - AI Gateway 生成 analysis/strengths/weaknesses/suggestion 四段文本；
 *   无凭据/失败时全部用真实均分规则兜底
 * - 响应结构对齐 mock.ts：{ studentId, studentName, className, avgScore,
 *   courseCount, attendanceRate, analysis, strengths, weaknesses, suggestion }
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import {
  askAI, pick, num, getDoc, scoresOf, classMap, studentName,
  className, scoreValue, deriveAttendance, ownStudentIdOf,
} from './_shared.js'

function ruleText(name, avg, courseCount) {
  const good = avg >= 80
  return {
    analysis: `${name}同学本学期共修读 ${courseCount} 门课程，平均成绩 ${avg} 分，${good ? '学习状态良好，各门课程成绩较为均衡' : '部分课程存在薄弱环节，需加强学习投入'}。`,
    strengths: good
      ? '逻辑思维清晰，课堂参与度高，擅长理论与实践结合。'
      : '学习态度较为端正，能够按时完成基本学习任务。',
    weaknesses: good
      ? '对综合性、设计性题目的处理能力有待提升，专业知识体系还需进一步梳理。'
      : '基础知识掌握不够扎实，成绩波动较大，需重点关注。',
    suggestion: '建议制定阶段性学习目标，加强项目实践，并主动寻求老师对疑难知识点的指导。',
  }
}

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const guard = await requirePermission(context, 'ai')
    if (guard instanceof Response) return guard

    const body = await bodyOf(context.request)
    const academic = S.academic()
    let studentId = num(pick(body, 'studentId', 'student_id'), 0)
    // 学生角色只能读取本人的分析结果，忽略前端传入的 studentId
    if (Number(guard.userType) === 1) {
      studentId = await ownStudentIdOf(guard, academic)
      if (!studentId) return json(fail('未定位到学生档案', 403), 403)
    }
    if (!studentId) return json(fail('缺少 studentId', 400), 400)
    const studentDoc = await getDoc(academic, `students/${studentId}.json`)
    const scores = await scoresOf(studentId)
    const valid = scores.map(scoreValue).filter((v) => v > 0)
    const avg = valid.length
      ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
      : 76
    const courseCount = scores.length

    const classId = num(pick(studentDoc, 'classId', 'class_id'), 0)
    const classes = await classMap()
    const clsName = await className(classId, classes.get(classId), studentDoc)
    const name = await studentName(studentId, studentDoc, scores[0]) || '演示学生'
    const attendance = deriveAttendance(avg, studentId)

    const fallback = ruleText(name, avg, courseCount)

    const aiText = await askAI(context.env, [
      {
        role: 'system',
        content: '你是学习分析助手。只输出 JSON，格式：{"analysis":"综合评语","strengths":"优势分析","weaknesses":"薄弱环节","suggestion":"学习建议"}，全部用简体中文，每项 40-80 字，不要 markdown 标记。',
      },
      {
        role: 'user',
        content: `学生「${name}」${clsName ? `（${clsName}）` : ''}共修读 ${courseCount} 门课程，真实平均总评 ${avg} 分，出勤率约 ${attendance}%。请基于这些真实数据生成四段学习分析。`,
      },
    ], { temperature: 0.7, maxTokens: 768 })

    let textFields = fallback
    if (aiText) {
      try {
        const clean = aiText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
        const parsed = JSON.parse(clean)
        const merged = {
          analysis: String(parsed.analysis || '').trim(),
          strengths: String(parsed.strengths || '').trim(),
          weaknesses: String(parsed.weaknesses || '').trim(),
          suggestion: String(parsed.suggestion || '').trim(),
        }
        if (merged.analysis && merged.strengths && merged.weaknesses && merged.suggestion) {
          textFields = merged
        }
      } catch { /* JSON 解析失败，使用规则兜底 */ }
    }

    return json(ok({
      studentId,
      studentName: name,
      className: clsName,
      avgScore: avg,
      courseCount,
      attendanceRate: attendance,
      ...textFields,
    }))
  } catch (e) {
    return json(fail(`学习分析失败：${(e && e.message) || '未知错误'}`))
  }
}
