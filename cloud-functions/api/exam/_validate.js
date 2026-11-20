/** 考试文档字段校验与归一化（POST/PUT 共用，P1 §1.2） */
import { num, currentSemester } from '../../_lib/util.js'

const pad2 = (n) => String(n).padStart(2, '0')
export const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

const intArray = (v) => (Array.isArray(v) ? v : [])
  .map((x) => num(x, 0))
  .filter((n) => Number.isFinite(n) && n > 0)

/**
 * 归一化考试字段。base 为编辑时的旧文档，未传字段回退到 base / 缺省值。
 * 返回 { error, data }；error 非空表示校验失败。
 */
export function normalizeExam(body = {}, base = null) {
  const b = body && typeof body === 'object' ? body : {}
  const examName = String(b.examName !== undefined ? b.examName : (base?.examName || '')).trim()
  if (!examName) return { error: '考试名称不能为空', data: null }
  const examType = b.examType !== undefined ? num(b.examType, 0) : num(base?.examType, 3)
  if (![1, 2, 3, 4, 5].includes(examType)) return { error: '考试类型不合法（1-5）', data: null }
  const examDate = String(b.examDate !== undefined ? b.examDate : (base?.examDate || '')).trim() || today()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(examDate)) return { error: '考试日期格式应为 YYYY-MM-DD', data: null }
  const stage = b.stage !== undefined ? num(b.stage, 0) : num(base?.stage, 0)
  if (![1, 2, 3].includes(stage)) return { error: '学段不合法（1-3）', data: null }
  const semester = String(b.semester !== undefined ? b.semester : (base?.semester || '')).trim() || currentSemester()
  const gradeScope = intArray(b.gradeScope !== undefined ? b.gradeScope : (base?.gradeScope || []))
  if (gradeScope.some((g) => g < 1 || g > 12)) return { error: '年级范围元素须在 1-12', data: null }
  const subjectScope = intArray(b.subjectScope !== undefined ? b.subjectScope : (base?.subjectScope || []))
  const statusRaw = b.status !== undefined ? b.status : (base?.status !== undefined ? base.status : 1)
  const status = num(statusRaw, 1) === 0 ? 0 : 1
  let publishRank = null
  const pr = b.publishRank !== undefined ? b.publishRank : (base?.publishRank !== undefined ? base.publishRank : null)
  if (pr !== null && pr !== undefined && pr !== '') {
    const n = Number(pr)
    if (n === 0 || n === 1) publishRank = n
  }
  const remark = String(b.remark !== undefined ? b.remark : (base?.remark || ''))
  return {
    error: null,
    data: { examName, examType, examDate, semester, stage, gradeScope, subjectScope, status, publishRank, remark },
  }
}
