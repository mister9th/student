/**
 * POST /api/ai/schedule —— AI 智能排课建议（建议型真实匹配，不写库，契约 §4）
 * ------------------------------------------------------------------
 * - 数据源：teachings(status=1，按 grade/semester/classId 过滤) + 已占用 slots
 *   年级取自 teaching→class.grade（修复旧版 courses.grade 过滤失效）
 * - 候选空间 day 1..days / period 1..periods 读全局 timetable-settings（与 §2 共用）
 * - 每条 teaching 按 weeklyPeriods 展开，逐课时选出无冲突且分散均衡的时段与空闲教室
 * - detectConflicts 纯函数复核，失败项剔除；reason 写明命中的约束
 * - advice 由 askAI 生成，失败用规则兜底；全程不写库
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import { currentSemester } from '../../_lib/k12.js'
import { buildScope } from '../../_lib/scope.js'
import { askAI, pick, num, clamp, listDocs } from './_shared.js'
import { readLimits } from '../timetable/_settings.js'
import { detectConflicts } from '../timetable/_shared.js'

const DEFAULT_ROOMS = ['A201', 'A202', 'A203', 'B101', 'B102', 'B103', 'C201']

/**
 * 构造真实排课建议（纯计算，不写库）。
 * 返回 { error, items, teachCount, semester, limits }；error 非空表示无权限。
 * 既供本端点使用，也供 ai/_tools.js 的 schedule_advice 工具复用。
 */
export async function buildScheduleItems(requestContext, params = {}) {
  const scope = await buildScope(requestContext)
  if (!scope || scope.type === 'guest' || scope.type === 'none' || !scope.filterFn) {
    return { error: '无权使用智能排课', items: [], teachCount: 0 }
  }

  const requestedGrade = String(pick(params, 'grade') || '').trim()
  const semester = String(pick(params, 'semester') || '').trim() || currentSemester()
  const classId = num(pick(params, 'classId'), 0)

  const [teachings, classDocs, tables, slotDocs, limits] = await Promise.all([
    listDocs(S.academic(), 'teachings/'),
    listDocs(S.academic(), 'classes/'),
    listDocs(S.timetable(), 'tables/'),
    listDocs(S.timetable(), 'slots/'),
    readLimits(S.config()),
  ])

  const classById = new Map()
  for (const c of classDocs) classById.set(num(pick(c, 'id'), 0), c)
  const validTables = tables.filter((t) => t && num(pick(t, 'deleted'), 0) !== 1)
  const semesterSlots = slotDocs.filter((s) =>
    s && num(pick(s, 'deleted'), 0) !== 1 && String(pick(s, 'semester', '') || '') === semester)

  // 目标授课关系：status=1 + 年级(经班级) + 学期 + 班级 + 五级 scope
  const targets = teachings.filter((t) => {
    if (!t || num(pick(t, 'status', 1), 1) === 0) return false
    const cid = num(pick(t, 'classId'), 0)
    const cls = classById.get(cid)
    const grade = num(pick(cls, 'grade'), 0)
    if (requestedGrade && String(grade) !== String(requestedGrade)) return false
    if (classId && cid !== classId) return false
    const ts = String(pick(t, 'semester', '') || '')
    if (ts && ts !== semester) return false
    return scope.filterFn({
      classId: cid,
      grade,
      subjectId: num(pick(t, 'subjectId'), 0),
    })
  })

  // 班级 → 课表（同学期优先），用于班级冲突隔离
  const tableOf = new Map()
  for (const t of validTables) {
    const cid = num(pick(t, 'classId'), 0)
    const key = `${cid}|${String(pick(t, 'semester', '') || '')}`
    if (!tableOf.has(key)) tableOf.set(key, t)
  }
  const tableOfClass = new Map()
  for (const t of validTables) {
    const cid = num(pick(t, 'classId'), 0)
    if (!tableOfClass.has(cid)) tableOfClass.set(cid, t)
  }

  // 已占用索引：本表时段 / 教师时段 / 教室时段 / 时段负载 / 教室池
  const occupiedByTableTime = new Set()
  const teacherBusy = new Set()
  const roomBusy = new Set()
  const loadByTime = new Map()
  const roomSet = new Set(DEFAULT_ROOMS)
  for (const s of semesterSlots) {
    const d = num(pick(s, 'day'), 0)
    const p = num(pick(s, 'period'), 0)
    const tid = num(pick(s, 'tableId'), 0)
    const teacherId = num(pick(s, 'teacherId'), 0)
    const room = String(pick(s, 'classroom', '') || '').trim()
    occupiedByTableTime.add(`${tid}|${d}|${p}`)
    if (teacherId) teacherBusy.add(`${semester}|${d}|${p}|${teacherId}`)
    if (room) {
      roomBusy.add(`${semester}|${d}|${p}|${room}`)
      roomSet.add(room)
    }
    const lk = `${d}|${p}`
    loadByTime.set(lk, (loadByTime.get(lk) || 0) + 1)
  }
  const roomList = [...roomSet]
  const dayNames = limits.dayNames || []

  const proposals = []
  const maxSlots = limits.days * limits.periods
  for (const t of targets) {
    if (proposals.length >= maxSlots) break
    const cid = num(pick(t, 'classId'), 0)
    const cls = classById.get(cid)
    const className = String(pick(cls, 'className', '') || pick(t, 'className', '') || '')
    const subjectId = num(pick(t, 'subjectId'), 0)
    const subjectName = String(pick(t, 'subjectName', '') || '')
    const teacherId = num(pick(t, 'teacherId'), 0)
    const teacherName = String(pick(t, 'teacherName', '') || '')
    const table = tableOf.get(`${cid}|${semester}`) || tableOfClass.get(cid) || null
    const tableId = table ? num(pick(table, 'id'), 0) : 0
    const weeklyPeriods = clamp(num(pick(t, 'weeklyPeriods', 2), 2), 1, 10)

    const usedDays = new Set()
    const usedPeriodsByDay = new Map()

    for (let k = 0; k < weeklyPeriods && proposals.length < maxSlots; k++) {
      let best = null
      for (let d = 1; d <= limits.days; d++) {
        for (let p = 1; p <= limits.periods; p++) {
          // ① 本表该时段已有课
          if (occupiedByTableTime.has(`${tableId}|${d}|${p}`)) continue
          // ② 教师该时段在同学期已占用
          if (teacherBusy.has(`${semester}|${d}|${p}|${teacherId}`)) continue
          // ③ 该时段存在空闲教室
          const room = roomList.find((r) => !roomBusy.has(`${semester}|${d}|${p}|${r}`))
          if (!room) continue

          // 分散均衡打分：同学科尽量不同天、同天不相邻，轻微偏好靠前时段与低负载时段
          let score = p * 0.6 + d * 0.2 + (loadByTime.get(`${d}|${p}`) || 0) * 0.3
          if (usedDays.has(d)) score += 50
          for (const usedP of (usedPeriodsByDay.get(d) || [])) {
            score += Math.max(0, 7 - Math.abs(p - usedP)) * 2
          }
          if (!best || score < best.score) best = { d, p, room, score }
        }
      }
      if (!best) break

      // 选定后即占位，避免同一批次内后续课时/授课关系互相冲突
      occupiedByTableTime.add(`${tableId}|${best.d}|${best.p}`)
      if (teacherId) teacherBusy.add(`${semester}|${best.d}|${best.p}|${teacherId}`)
      roomBusy.add(`${semester}|${best.d}|${best.p}|${best.room}`)
      usedDays.add(best.d)
      if (!usedPeriodsByDay.has(best.d)) usedPeriodsByDay.set(best.d, [])
      usedPeriodsByDay.get(best.d).push(best.p)
      const lk = `${best.d}|${best.p}`
      loadByTime.set(lk, (loadByTime.get(lk) || 0) + 1)

      const dayName = dayNames[best.d - 1] || `周${best.d}`
      const reason = `${dayName}第${best.p}节：${teacherName || '任课教师'}该时段无课，${best.room} 空闲，${className || '本班'}本时段无课（${subjectName || '课程'}）。`
      proposals.push({
        day: best.d,
        period: best.p,
        classId: cid,
        className,
        tableId,
        subjectId,
        subjectName,
        teacherId,
        teacherName,
        classroom: best.room,
        reason,
        // 兼容旧版前端字段
        courseName: subjectName || '课程',
        suggestedTime: `${dayName}第${best.p}节`,
        suggestedClassroom: best.room,
      })
    }
  }

  // detectConflicts 纯函数复核：负 id 标识新建议项，命中冲突的建议剔除
  let items = proposals
  try {
    const checkSlots = semesterSlots.concat(
      proposals.map((it, i) => ({ ...it, id: -(i + 1), semester, deleted: 0 }))
    )
    const conflicts = detectConflicts(checkSlots)
    const badIds = new Set()
    for (const c of conflicts) {
      if (num(c.slotA, 0) < 0) badIds.add(num(c.slotA, 0))
      if (num(c.slotB, 0) < 0) badIds.add(num(c.slotB, 0))
    }
    items = proposals.filter((_, i) => !badIds.has(-(i + 1)))
  } catch { items = proposals }

  return { error: null, items, teachCount: targets.length, semester, limits }
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'ai')
    if (guard instanceof Response) return guard

    const body = await bodyOf(context.request)
    const built = await buildScheduleItems(context, body)
    if (built.error) return json(fail(built.error, 403), 403)
    const { items, teachCount, semester, limits } = built

    const ruleAdvice = `本次基于 ${teachCount} 条授课关系、${limits.days} 天 × ${limits.periods} 节候选空间完成真实匹配，共给出 ${items.length} 条课时建议，已排除本班已占、教师跨班同段与教室占用冲突，并按同学科分散均衡原则分配。建议仅供手动编排参考，不会自动写入课表。`

    const lines = items
      .slice(0, 12)
      .map((it) => `${it.className || '班级'} ${it.subjectName || it.courseName}（${it.teacherName || '教师待定'}）→ 周${it.day}第${it.period}节 / ${it.classroom}`)
      .join('；')

    const aiText = await askAI(context.env, [
      {
        role: 'system',
        content: '你是排课顾问。请基于给出的真实匹配结果给出一段总体排课建议（不超过 150 字），直接输出正文，不要 markdown 标记，并提醒建议仅供手动编排参考、不会自动写入课表。',
      },
      {
        role: 'user',
        content: `学期 ${semester}，候选空间 ${limits.days} 天 × ${limits.periods} 节，共 ${teachCount} 条授课关系、${items.length} 条无冲突课时建议。参考安排：${lines || '暂无匹配结果'}。请给出总体建议。`,
      },
    ], { temperature: 0.7, maxTokens: 384 })

    const advice = aiText && aiText.length >= 20 ? aiText : ruleAdvice
    return json(ok({ advice, items }))
  } catch (e) {
    return json(fail(`排课建议生成失败：${(e && e.message) || '未知错误'}`), 500)
  }
}
