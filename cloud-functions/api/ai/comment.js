/**
 * POST /api/ai/comment —— AI 学生评语生成
 * ------------------------------------------------------------------
 * - 数据源：Blob 该生真实成绩（total_score）与学生/课程文档
 * - AI Gateway 生成评语；无凭据/失败时用真实总评均分规则兜底
 * - 评语落 Blob `edu-ai/comments/<studentId>/<id>.json`
 * - 响应结构对齐 mock.ts：{ studentName, totalScore, performance, aiComment }
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import {
  askAI, pick, num, getDoc, scoresOf, courseMap, studentName,
  courseName, scoreValue,
} from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const body = await bodyOf(context.request)
    const studentId = num(pick(body, 'studentId', 'student_id'), 0)
    const commentType = String(pick(body, 'commentType', 'comment_type') || 'semester')
    if (!studentId) return json(fail('缺少 studentId', 400), 400)

    const academic = S.academic()
    const studentDoc = await getDoc(academic, `students/${studentId}.json`)
    const scores = await scoresOf(studentId)
    const valid = scores.map(scoreValue).filter((v) => v > 0)
    const totalScore = valid.length
      ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
      : 85

    const name = await studentName(studentId, studentDoc, scores[0]) || '演示学生'
    const performance = totalScore >= 90 ? '优秀' : totalScore >= 80 ? '良好' : totalScore >= 70 ? '中等' : '待提升'

    const courses = await courseMap()
    const courseNames = scores
      .map((s) => courseName(courses.get(num(pick(s, 'courseId', 'course_id', 'subjectId'), 0)), s))
      .filter(Boolean)

    // 规则兜底评语（基于真实总评）
    const ruleComment = `${name}同学思想端正，尊敬师长，团结同学，遵守校纪校规。学习上态度认真，能够主动完成各项学习任务，本学期总评成绩${totalScore}分，表现${performance}。课堂参与积极，具备较好的自主学习能力。希望在今后的学习中进一步加强专业知识体系构建，积极参与科研项目与竞赛活动，全面提升综合素养。`

    const aiText = await askAI(context.env, [
      {
        role: 'system',
        content: '你是班主任评语生成助手。请用简体中文写一段 120-180 字的学期评语，语气积极客观、内容具体，直接输出评语正文，不要 markdown 标记或标题。',
      },
      {
        role: 'user',
        content: `学生姓名：${name}；修读课程：${courseNames.slice(0, 6).join('、') || '多门课程'}；真实总评均分：${totalScore} 分；综合等级：${performance}；共有 ${valid.length} 门课程成绩。请据此生成${commentType === 'daily' ? '日常表现' : '学期'}评语。`,
      },
    ], { temperature: 0.7, maxTokens: 512 })

    const aiComment = aiText && aiText.length >= 20 ? aiText : ruleComment

    // 落库评语记录
    try {
      await S.ai().setJSON(`comments/${studentId}/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`, {
        studentId,
        studentName: name,
        commentType,
        totalScore,
        performance,
        aiComment,
        createdAt: Date.now(),
        time: now(),
      })
    } catch { /* 落库失败不影响主流程 */ }

    return json(ok({
      studentName: name,
      totalScore: String(totalScore),
      performance,
      aiComment,
    }))
  } catch (e) {
    return json(fail(`评语生成失败：${(e && e.message) || '未知错误'}`))
  }
}
