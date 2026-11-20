/**
 * POST /api/ai/risk-warning —— 学业风险预警
 * ------------------------------------------------------------------
 * - 数据源：遍历 Blob 全部真实成绩，筛选 total_score < 70 的记录（最多 20 条）
 * - 规则部分（<60 挂科风险 / 60-70 成绩波动）本地算，AI Gateway 仅增强帮扶建议
 * - 响应结构对齐 mock.ts：{ totalRisks, highRiskCount, mediumRiskCount,
 *   lowRiskCount, riskItems:[{studentId,studentName,className,riskType,
 *   riskLevel,description,suggestion}] }
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import {
  askAI, pick, num, allScores, courseMap, classMap, studentMap,
  studentName, className, courseName, scoreValue,
} from './_shared.js'

const RULE_SUGGESTION = '建议辅导员及时与学生沟通，了解原因并提供学习帮扶。'

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const body = await bodyOf(context.request)
    const filterStudentId = num(pick(body, 'studentId', 'student_id'), 0)
    const filterClassId = num(pick(body, 'classId', 'class_id'), 0)

    const [scores, courses, classes, students] = await Promise.all([
      allScores(), courseMap(), classMap(), studentMap(),
    ])

    const lowScores = scores
      .filter((s) => {
        const sid = num(pick(s, 'studentId', 'student_id'), 0)
        const v = scoreValue(s)
        if (!(v > 0 && v < 70)) return false
        if (filterStudentId && sid !== filterStudentId) return false
        if (filterClassId) {
          const stu = students.get(sid)
          if (num(pick(stu, 'classId', 'class_id'), 0) !== filterClassId) return false
        }
        return true
      })
      .sort((a, b) => scoreValue(a) - scoreValue(b))
      .slice(0, 20)

    const riskItems = []
    for (const s of lowScores) {
      const sid = num(pick(s, 'studentId', 'student_id'), 0)
      const cid = num(pick(s, 'courseId', 'course_id', 'subjectId'), 0)
      const score = scoreValue(s)
      const stu = students.get(sid)
      const classId = num(pick(stu, 'classId', 'class_id'), 0)
      const high = score < 60
      const name = await studentName(sid, stu, s)
      const clsName = await className(classId, classes.get(classId), stu)
      const cName = courseName(courses.get(cid), s) || '课程'

      riskItems.push({
        studentId: sid,
        studentName: name || '未知学生',
        className: clsName,
        riskType: high ? '挂科风险' : '成绩波动',
        riskLevel: high ? 'high' : 'medium',
        description: `${cName}总评仅 ${score} 分，${high ? '存在挂科风险' : '成绩低于预警线'}，需要关注。`,
        suggestion: RULE_SUGGESTION,
      })
    }

    // AI Gateway 增强：基于真实风险清单生成总体帮扶建议
    if (riskItems.length) {
      const lines = riskItems.slice(0, 10)
        .map((r, i) => `${i + 1}. ${r.studentName}（${r.description}）`)
        .join('\n')
      const aiText = await askAI(context.env, [
        {
          role: 'system',
          content: '你是学生学业风险分析助手。基于给出的真实风险清单，给出简短的总体帮扶建议（不超过 120 字），直接输出正文，不要 markdown 标记。',
        },
        {
          role: 'user',
          content: `当前共有 ${riskItems.length} 条学业风险记录，部分明细如下：\n${lines}`,
        },
      ], { temperature: 0.5, maxTokens: 256 })
      if (aiText && aiText.length >= 10) {
        riskItems.forEach((r) => { r.suggestion = aiText })
      }
    }

    return json(ok({
      totalRisks: riskItems.length,
      highRiskCount: riskItems.filter((i) => i.riskLevel === 'high').length,
      mediumRiskCount: riskItems.filter((i) => i.riskLevel === 'medium').length,
      lowRiskCount: 0,
      riskItems,
    }))
  } catch (e) {
    return json(fail(`风险预警失败：${(e && e.message) || '未知错误'}`))
  }
}
