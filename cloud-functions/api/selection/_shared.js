/**
 * 选科走班模块内部共享工具（P3 §2）
 * ------------------------------------------------------------------
 * - 3+1+2 规则常量与校验（combo 由后端计算，不信前端）
 * - ownStudentProfile：当前学生用户 -> 学生档案
 * - resolveIntentTarget：解析学生本人/指定学生的档案与目标学期
 */
import { S } from '../../_lib/store.js'
import { num, currentSemester } from '../../_lib/util.js'

export const PRIMARY = ['物理', '历史']
export const SECONDARY = ['化学', '生物', '政治', '地理']

/** 12 种合法组合（每个 primary 从 secondary 选二，按 SECONDARY 顺序排序后拼首字） */
export const COMBOS = (() => {
  const out = []
  for (const p of PRIMARY) {
    for (let i = 0; i < SECONDARY.length; i++) {
      for (let j = i + 1; j < SECONDARY.length; j++) {
        out.push(p[0] + SECONDARY[i][0] + SECONDARY[j][0])
      }
    }
  }
  return out
})()
const COMBO_SET = new Set(COMBOS)

/** 服务端计算 combo：primary 首字 + 两个 secondary 首字（按 SECONDARY 顺序排序） */
export function comboOf(primary, secondary) {
  const sorted = [...secondary].sort((a, b) => SECONDARY.indexOf(a) - SECONDARY.indexOf(b))
  return String(primary || '')[0] + sorted.map((x) => String(x)[0]).join('')
}

/** 学生用户 -> 学生档案（非学生返回 null） */
export async function ownStudentProfile(user, academic) {
  if (!user || Number(user.userType) !== 1) return null
  const uid = num(user.id ?? user.userId, 0)
  if (!uid) return null
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  return docs.find((d) => d && d.deleted !== 1 && num(d.userId, 0) === uid) || null
}

/** 归一化选科意愿。返回 {error,data,profile} */
export function normalizeIntent(body = {}, profile, forcedStudentId = null) {
  const b = body && typeof body === 'object' ? body : {}
  const studentId = forcedStudentId !== null ? num(forcedStudentId, 0) : num(b.studentId, 0)
  if (!studentId) return { error: '学生不能为空', data: null, profile }
  const grade = num(b.grade !== undefined ? b.grade : profile?.grade, 0)
  if (grade < 10 || grade > 12) return { error: '年级须为 10-12', data: null, profile }
  const primary = String(b.primary || '').trim()
  if (!PRIMARY.includes(primary)) return { error: '首选科目须为物理或历史', data: null, profile }
  const secRaw = b.secondary
  const secondary = Array.isArray(secRaw) ? secRaw.map((x) => String(x).trim()) : []
  if (secondary.length !== 2) return { error: '再选科目须选两门', data: null, profile }
  if (new Set(secondary).size !== 2) return { error: '再选科目不可重复', data: null, profile }
  if (secondary.some((x) => !SECONDARY.includes(x))) return { error: '再选科目须在化学/生物/政治/地理中', data: null, profile }
  if (secondary.includes(primary)) return { error: '再选科目不可等于首选科目', data: null, profile }
  const sorted = [...secondary].sort((a, b2) => SECONDARY.indexOf(a) - SECONDARY.indexOf(b2))
  const combo = comboOf(primary, sorted)
  if (!COMBO_SET.has(combo)) return { error: '选科组合不合法', data: null, profile }
  const semester = String(b.semester || '').trim() || currentSemester()
  return {
    error: null,
    data: {
      studentId,
      studentName: String(profile?.realName || b.studentName || ''),
      classId: profile?.classId ?? num(b.classId, 0),
      className: String(profile?.className || b.className || ''),
      grade, semester, primary, secondary: sorted, combo, status: 1,
    },
    profile,
  }
}

/** 重命名导出，便于 combo 统计复用集合判断 */
export const isValidCombo = (c) => COMBO_SET.has(String(c))
