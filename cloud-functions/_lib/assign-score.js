/**
 * 3+1+2 等级赋分工具（P3 §2.2）
 * ------------------------------------------------------------------
 * 五等级比例：A 15% / B 35% / C 35% / D 13% / E 2%
 * 累计分位：A[0,0.15) B[0.15,0.50) C[0.50,0.85) D[0.85,0.98) E[0.98,1.0]
 * 赋分区间：A[86,100] B[71,85] C[56,70] D[41,55] E[30,40]
 *
 * 约定说明（重要）：
 * - rankOf() 按契约公式返回「自下而上」百分位：分值越高值越大
 *   （(小于它的数量 + 0.5*等于它的数量) / 总数，最低分≈0，最高分≈1）。
 * - assignScore() 的 rankPercent 按契约定义为「自上而下」：0=最高分，
 *   按累计分位定等级，区间内从上限线性递减到下限（rankPercent=0 → 区间上限）。
 * - 因此调用链需用 rankPercentOf()=1-rankOf() 把自下而上百分位转换为自上而下，
 *   使「原始分最高 → A 等 → 赋分最高」，比例与单调性才正确。
 */
export const ASSIGN_LEVELS = [
  { level: 'A', ratio: 0.15, pctStart: 0,    pctEnd: 0.15, min: 86, max: 100 },
  { level: 'B', ratio: 0.35, pctStart: 0.15, pctEnd: 0.50, min: 71, max: 85 },
  { level: 'C', ratio: 0.35, pctStart: 0.50, pctEnd: 0.85, min: 56, max: 70 },
  { level: 'D', ratio: 0.13, pctStart: 0.85, pctEnd: 0.98, min: 41, max: 55 },
  { level: 'E', ratio: 0.02, pctStart: 0.98, pctEnd: 1.00, min: 30, max: 40 },
]

/** 省份参数位：预留，当前不改变区间（契约「留省份参数位」） */
const PROVINCE_OVERRIDES = {}
const levelsFor = (province) => {
  const custom = province && PROVINCE_OVERRIDES[province]
  return Array.isArray(custom) && custom.length === 5 ? custom : ASSIGN_LEVELS
}

const clamp01 = (v) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return 0
  return Math.min(1, Math.max(0, n))
}

/** 某原始分在全体中的「自下而上」百分位：(小于数 + 0.5*等数)/总数 */
export function rankOf(score, allScores) {
  const arr = Array.isArray(allScores) ? allScores.map((x) => Number(x)).filter(Number.isFinite) : []
  if (!arr.length) return 0.5
  const s = Number(score)
  let less = 0
  let equal = 0
  for (const x of arr) {
    if (x < s) less++
    else if (x === s) equal++
  }
  return (less + 0.5 * equal) / arr.length
}

/** 把 rankOf 的自下而上百分位转换为 assignScore 所需的自上而下 rankPercent（0=最高分） */
export function rankPercentOf(score, allScores) {
  return clamp01(1 - rankOf(score, allScores))
}

/** 按自上而下 rankPercent（0=最高分）判定等级 */
export function levelOf(rankPercent, province) {
  const rp = clamp01(rankPercent)
  const levels = levelsFor(province)
  for (const lv of levels) {
    if (rp < lv.pctEnd) return lv
  }
  return levels[levels.length - 1]
}

/**
 * 等级赋分：按累计分位定等级，区间内线性插值取整。
 * assigned = round(level.max - (rankPercent - pctStart)/(pctEnd-pctStart) * (max-min))，clamp 到区间。
 * 边界：rankPercent=0 → 区间上限；rankPercent 接近 pctEnd → 区间下限。
 * rawScore 仅保留签名（契约签名），不参与计算。
 */
export function assignScore(rawScore, rankPercent, province) {
  const rp = clamp01(rankPercent)
  const lv = levelOf(rp, province)
  const span = lv.pctEnd - lv.pctStart
  const frac = span > 0 ? (rp - lv.pctStart) / span : 0
  let assigned = Math.round(lv.max - frac * (lv.max - lv.min))
  if (assigned > lv.max) assigned = lv.max
  if (assigned < lv.min) assigned = lv.min
  return assigned
}

/** 赋分详情（端点复用）：返回 {rawScore, rankPercent, assignedScore, level} */
export function assignDetail(rawScore, rankPercent, province) {
  const rp = clamp01(rankPercent)
  const lv = levelOf(rp, province)
  return {
    rawScore: Number(rawScore),
    rankPercent: Math.round(rp * 10000) / 10000,
    assignedScore: assignScore(rawScore, rp, province),
    level: lv.level,
  }
}
