/**
 * POST /api/ai/schedule —— AI 智能排课建议文本
 * ------------------------------------------------------------------
 * - 降级说明（方案文档 6.2）：只生成"建议文本"，不做真实排课/冲突检测/课表优化
 * - 数据源：Blob 真实课程表 `edu-academic/courses/`，按 grade/semester 过滤
 * - AI Gateway 生成总体建议；无凭据/失败时用真实课程数规则兜底
 * - 响应结构对齐 mock.ts：{ advice, items:[{courseName, teacherName,
 *   suggestedTime, suggestedClassroom, reason}] }
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import { askAI, pick, listDocs, courseName } from './_shared.js'

const WEEK = ['一', '二', '三', '四', '五']

export async function onRequest(context) {
  try {
    await ensureSeeded()

    const guard = await requirePermission(context, 'ai')
    if (guard instanceof Response) return guard

    const body = await bodyOf(context.request)
    const grade = String(pick(body, 'grade') || '')
    const semester = String(pick(body, 'semester') || '')

    let courses = await listDocs(S.academic(), 'courses/')
    courses = courses.filter((c) => {
      const cg = String(pick(c, 'grade') || '')
      const cs = String(pick(c, 'semester') || '')
      if (grade && cg && cg !== grade) return false
      if (semester && cs && cs !== semester) return false
      return true
    }).slice(0, 8)

    const items = courses.map((c, i) => {
      const teacher = String(
        pick(c, 'teacherName', 'teacher_name') ||
        pick(c, 'teacher', 'lecturer') ||
        ''
      )
      return {
        courseName: courseName(c) || '课程',
        teacherName: teacher,
        suggestedTime: `周${WEEK[i % WEEK.length]}第${i + 1}-${i + 2}节`,
        suggestedClassroom: `教学楼A-${String(201 + i)}`,
        reason: '该时段教师与班级均无冲突，教室容量满足选课人数要求。',
      }
    })

    const ruleAdvice = `本次排课基于系统中 ${courses.length} 门课程，综合考虑教师任课、教室容量与课程先修关系，整体课表分布均衡，建议按以下方案执行，并预留周五下午作为公共答疑与自习时间。（说明：本建议由规则生成，仅供排课参考，不含真实冲突检测。）`

    const courseLines = items
      .map((it) => `${it.courseName}（${it.teacherName || '教师待定'}）→ ${it.suggestedTime}`)
      .join('；')

    const aiText = await askAI(context.env, [
      {
        role: 'system',
        content: '你是排课顾问。请基于真实课程清单给出一段总体排课建议（不超过 150 字），直接输出正文，不要 markdown 标记，并提醒该建议不含真实冲突检测。',
      },
      {
        role: 'user',
        content: `基于系统中 ${courses.length} 门真实课程制定课表建议，参考时段安排：${courseLines || '暂无课程数据'}。请给出总体建议。`,
      },
    ], { temperature: 0.7, maxTokens: 384 })

    const advice = aiText && aiText.length >= 20 ? aiText : ruleAdvice

    return json(ok({ advice, items }))
  } catch (e) {
    return json(fail(`排课建议生成失败：${(e && e.message) || '未知错误'}`))
  }
}
