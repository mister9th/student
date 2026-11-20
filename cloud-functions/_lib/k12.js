/**
 * K12 学段/年级字典（与前端 src/utils/k12.ts 逻辑一致）
 * ------------------------------------------------------------------
 * stage: 1=小学(grades 1-6) 2=初中(grades 7-9) 3=高中(grades 10-12)
 * grade: 全国连续编号 1-12 整数
 */

export const STAGES = { 1: '小学', 2: '初中', 3: '高中' }

export const GRADE_NAMES = {
  1: '一年级', 2: '二年级', 3: '三年级', 4: '四年级', 5: '五年级', 6: '六年级',
  7: '初一', 8: '初二', 9: '初三', 10: '高一', 11: '高二', 12: '高三',
}

/** 年级展示名（stage 仅作语义校验位，1-12 编号本身已含学段信息） */
export const gradeLabel = (stage, grade) => {
  const g = Number(grade)
  if (!g || g < 1 || g > 12) return ''
  if ([1, 2, 3].includes(Number(stage))) {
    const stageRange = { 1: [1, 6], 2: [7, 9], 3: [10, 12] }[Number(stage)]
    if (g < stageRange[0] || g > stageRange[1]) return ''
  }
  return GRADE_NAMES[g]
}

/** 分数 → 等级：>=85 优秀 / >=75 良好 / >=60 合格 / 其余 待提高 */
export const k12GradeOf = (score) => {
  const s = Number(score) || 0
  return s >= 85 ? '优秀' : s >= 75 ? '良好' : s >= 60 ? '合格' : '待提高'
}

/** 当前学期（格式 2025-2026-1）：9-12 月为一学年上学期，1-2 月沿用上年上学期，3-8 月为下学期 */
export const currentSemester = (d = new Date()) => {
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  if (m >= 9) return `${y}-${y + 1}-1`
  if (m >= 3) return `${y - 1}-${y}-2`
  return `${y - 1}-${y}-1`
}
