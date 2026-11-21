/**
 * 课表全局配置共享常量与读取工具（契约 §2.1）
 * ------------------------------------------------------------------
 * settings.js（GET/PUT）、timetable/slots/index.js（写前校验）、
 * ai/schedule.js（候选空间）共用，避免默认值与校验口径分散。
 * 本文件不依赖 Blob store 实例，readLimits 由调用方传入 store。
 */
export const TIMETABLE_SETTINGS_KEY = 'config/timetable-settings.json'

export const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export const DAYS_RANGE = { min: 3, max: 7 }
export const PERIODS_RANGE = { min: 4, max: 12 }

export const dayNamesOf = (days) => DAY_LABELS.slice(0, Math.max(1, Math.min(7, Number(days) || 5)))

export const DEFAULT_TIMETABLE_SETTINGS = {
  days: 5,
  periods: 8,
  dayNames: dayNamesOf(5),
}

const toNum = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : NaN
}

/** 校验天数，合法返回整数，否则返回 null */
export function validDays(v) {
  const n = toNum(v)
  return Number.isInteger(n) && n >= DAYS_RANGE.min && n <= DAYS_RANGE.max ? n : null
}

/** 校验节数，合法返回整数，否则返回 null */
export function validPeriods(v) {
  const n = toNum(v)
  return Number.isInteger(n) && n >= PERIODS_RANGE.min && n <= PERIODS_RANGE.max ? n : null
}

/** 归一化 PUT 入参：缺省沿用旧值/默认值，越界返回 error。返回 {error, data} */
export function normalizeSettings(body = {}, base = null) {
  const b = body && typeof body === 'object' ? body : {}
  const rawDays = b.days !== undefined && b.days !== null && b.days !== ''
    ? b.days : (base ? base.days : DEFAULT_TIMETABLE_SETTINGS.days)
  const rawPeriods = b.periods !== undefined && b.periods !== null && b.periods !== ''
    ? b.periods : (base ? base.periods : DEFAULT_TIMETABLE_SETTINGS.periods)
  const days = validDays(rawDays)
  if (days === null) return { error: `days 须为 ${DAYS_RANGE.min}-${DAYS_RANGE.max} 的整数`, data: null }
  const periods = validPeriods(rawPeriods)
  if (periods === null) return { error: `periods 须为 ${PERIODS_RANGE.min}-${PERIODS_RANGE.max} 的整数`, data: null }
  return { error: null, data: { days, periods, dayNames: dayNamesOf(days) } }
}

/** GET 读配置：默认值 + 已保存值合并（只认合法字段） */
export function mergeSettings(saved) {
  const days = validDays(saved && saved.days) ?? DEFAULT_TIMETABLE_SETTINGS.days
  const periods = validPeriods(saved && saved.periods) ?? DEFAULT_TIMETABLE_SETTINGS.periods
  return { days, periods, dayNames: dayNamesOf(days) }
}

/** 从 config store 读取候选空间上限；未配置/配置非法时回退 5×8 */
export async function readLimits(configStore) {
  let saved = null
  try { saved = await configStore.get(TIMETABLE_SETTINGS_KEY, { type: 'json' }) } catch { /* 回退默认 */ }
  const cfg = mergeSettings(saved)
  return { days: cfg.days, periods: cfg.periods, dayNames: cfg.dayNames }
}
