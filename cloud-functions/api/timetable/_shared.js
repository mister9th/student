/**
 * 课表管理模块内部共享工具（P3 §3）
 * ------------------------------------------------------------------
 * - normalizeTable / normalizeSlot：字段校验与归一化（同步纯函数，便于单测）
 * - detectConflicts：三类冲突检测核心算法（纯函数，输入 slot 数组）
 * - checkConflicts(store, tableId, candidateSlots?)：从 Blob 读全量 slot 后检测；
 *   candidateSlots 非 null 时视为该 tableId 的整表覆盖候选集（写前校验用）
 * - ownStudentClassId：学生用户 -> 本人班级 id（student.userId === user.id）
 *
 * 本文件刻意不依赖 _lib/store.js（仅依赖无副作用的 _lib/k12.js），
 * 以便冲突算法可在纯 node 环境下直接单测。
 */
import { currentSemester } from '../../_lib/k12.js'

const toNum = (v, def = 0) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}

const pickOf = (b, base) => (k, def = '') => {
  if (b && b[k] !== undefined && b[k] !== null) return b[k]
  if (base && base[k] !== undefined && base[k] !== null) return base[k]
  return def
}

/** 归一化 table 字段。返回 {error, data} */
export function normalizeTable(body = {}, base = null) {
  const b = body && typeof body === 'object' ? body : {}
  const pick = pickOf(b, base)
  const classId = toNum(pick('classId', 0), 0)
  if (!classId) return { error: '班级不能为空', data: null }
  const semester = String(pick('semester', '') ?? '').trim() || currentSemester()
  const type = String(pick('type', '行政') ?? '').trim() || '行政'
  if (!['行政', '走班'].includes(type)) return { error: '课表类型须为 行政 或 走班', data: null }
  const subjectCombo = String(pick('subjectCombo', '') ?? '').trim()
  const status = toNum(pick('status', 0), 0) === 1 ? 1 : 0
  return { error: null, data: { classId, semester, type, subjectCombo, status } }
}

/** 归一化单个 slot。tableId 由服务端注入，不信前端传值。返回 {error, data} */
export function normalizeSlot(raw = {}, tableId = 0, base = null) {
  const b = raw && typeof raw === 'object' ? raw : {}
  const pick = pickOf(b, base)
  const day = toNum(pick('day', 0), 0)
  const period = toNum(pick('period', 0), 0)
  if (!Number.isInteger(day) || day < 1 || day > 5) return { error: 'day 须为 1-5 的整数', data: null }
  if (!Number.isInteger(period) || period < 1 || period > 8) return { error: 'period 须为 1-8 的整数', data: null }
  const subjectId = toNum(pick('subjectId', 0), 0)
  const teacherId = toNum(pick('teacherId', 0), 0)
  if (!subjectId) return { error: '科目不能为空', data: null }
  if (!teacherId) return { error: '教师不能为空', data: null }
  const classroom = String(pick('classroom', '') ?? '').trim()
  if (!classroom) return { error: '教室不能为空', data: null }
  return {
    error: null,
    data: {
      tableId: toNum(tableId, 0),
      day,
      period,
      subjectId,
      subjectName: String(pick('subjectName', '') ?? '').trim(),
      teacherId,
      teacherName: String(pick('teacherName', '') ?? '').trim(),
      classroom,
    },
  }
}

const conflict = (type, a, b) => ({
  type,
  slotA: toNum(a.id, 0),
  slotB: toNum(b.id, 0),
  day: toNum(a.day, 0),
  period: toNum(a.period, 0),
  // 冲突对象附带学期（前端兼容：多余字段不影响现有展示）
  semester: String(a.semester ?? b.semester ?? ''),
  tableIdA: toNum(a.tableId, 0),
  tableIdB: toNum(b.tableId, 0),
})

/**
 * 三类冲突检测（纯函数）：
 *  1. 教师冲突：同学期同 day+period 下 teacherId 重复（跨所有 table）
 *  2. 教室冲突：同学期同 day+period 下 classroom 重复（跨所有 table）
 *  3. 班级冲突：同 tableId 内 day+period 重复（tableId 本身已隔离学期）
 * 返回 [{type, slotA, slotB, day, period, semester, tableIdA, tableIdB}]
 */
export function detectConflicts(slots) {
  const list = (Array.isArray(slots) ? slots : []).filter((s) => s && toNum(s.deleted, 0) !== 1)
  const out = []
  // 教师/教室冲突按「学期 + day + period」分组：不同学期不互相比较。
  // semester 形如 2024-2025-1 含连字符，故不能用 key.split('-') 反解 day/period，
  // 直接从 slot 文档取 day/period。
  const bySlotTime = new Map()
  for (const s of list) {
    const key = `${String(s.semester || '')}-${toNum(s.day, 0)}-${toNum(s.period, 0)}`
    if (!bySlotTime.has(key)) bySlotTime.set(key, [])
    bySlotTime.get(key).push(s)
  }
  for (const group of bySlotTime.values()) {
    // 教师冲突
    const byTeacher = new Map()
    for (const s of group) {
      const tid = toNum(s.teacherId, 0)
      if (!tid) continue
      if (byTeacher.has(tid)) out.push(conflict('教师冲突', byTeacher.get(tid), s))
      else byTeacher.set(tid, s)
    }
    // 教室冲突
    const byRoom = new Map()
    for (const s of group) {
      const room = String(s.classroom ?? '').trim()
      if (!room) continue
      if (byRoom.has(room)) out.push(conflict('教室冲突', byRoom.get(room), s))
      else byRoom.set(room, s)
    }
  }
  // 班级冲突：同 tableId 内 day+period 重复
  const byClassTerm = new Map()
  for (const s of list) {
    const tid = toNum(s.tableId, 0)
    if (!tid) continue
    const key = `${tid}-${toNum(s.day, 0)}-${toNum(s.period, 0)}`
    if (byClassTerm.has(key)) {
      out.push(conflict('班级冲突', byClassTerm.get(key), s))
    } else byClassTerm.set(key, s)
  }
  return out
}

/**
 * 从 Blob 读全量 slot 后检测冲突。
 * @param store S.timetable() 实例（需有 list/get）
 * @param tableId 关注课表；>0 时只返回涉及该表的冲突；=0 返回全部
 * @param candidateSlots 非 null 时视为该表整表覆盖候选集（写前校验：先剔除该表旧 slot 再并入候选）
 */
export async function checkConflicts(store, tableId = 0, candidateSlots = null) {
  const { blobs } = await store.list({ prefix: 'slots/' })
  const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
  let slots = docs.filter((s) => s && toNum(s.deleted, 0) !== 1)
  const tid = toNum(tableId, 0)
  if (candidateSlots !== null) {
    slots = slots.filter((s) => toNum(s.tableId, 0) !== tid)
    const prepared = (Array.isArray(candidateSlots) ? candidateSlots : [])
      .map((s) => ({ ...s, tableId: tid, deleted: 0 }))
    slots = slots.concat(prepared)
  }
  const all = detectConflicts(slots)
  if (!tid) return all
  return all.filter((c) => c.tableIdA === tid || c.tableIdB === tid)
}

/** 学生用户 -> 本人 classId（找不到返回 0）；非学生返回 0 */
export async function ownStudentClassId(user, academic) {
  if (!user || toNum(user.userType, 0) !== 1) return 0
  const uid = toNum(user.id ?? user.userId, 0)
  if (!uid) return 0
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const found = docs.find((d) => d && toNum(d.deleted, 0) !== 1 && toNum(d.userId, 0) === uid)
  return found ? toNum(found.classId, 0) : 0
}
