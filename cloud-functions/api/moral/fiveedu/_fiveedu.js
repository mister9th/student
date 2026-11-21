/** 五育综评公共逻辑（P1 §3） */
import { S, now } from '../../../_lib/store.js'
import { num } from '../../../_lib/util.js'

export const DIMENSIONS = ['de', 'zhi', 'ti', 'mei', 'lao']
export const DIMENSION_LABELS = { de: '德', zhi: '智', ti: '体', mei: '美', lao: '劳' }
/** level -> 分值：待提高 -1 / 合格 1 / 良好 2 / 优秀 3 */
export const LEVEL_SCORE = { 1: -1, 2: 1, 3: 2, 4: 3 }
export const scoreOf = (level) => LEVEL_SCORE[num(level, 0)] || 0

/** 学生用户 -> 学生档案 id（student.userId === user.id），找不到返回 0 */
export async function ownStudentId(user, academic) {
  if (!user || Number(user.userType) !== 1) return 0
  const uid = num(user.id ?? user.userId, 0)
  if (!uid) return 0
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const found = docs.find((d) => d && d.deleted !== 1 && num(d.userId, 0) === uid)
  return found ? num(found.id, 0) : 0
}

/** 累加/回滚学生 fiveEdu 某维度分值，下限 0；返回最新 fiveEdu 或 null */
export async function applyFiveEduDelta(store, studentId, dimension, delta) {
  if (!delta || !studentId || !DIMENSIONS.includes(dimension)) return null
  const key = `students/${studentId}.json`
  const doc = await store.get(key, { type: 'json' })
  if (!doc || doc.deleted === 1) return null
  const fe = doc.fiveEdu && typeof doc.fiveEdu === 'object' ? { ...doc.fiveEdu } : {}
  for (const d of DIMENSIONS) fe[d] = Math.max(0, num(fe[d], 0))
  fe[dimension] = Math.max(0, num(fe[dimension], 0) + num(delta, 0))
  await store.setJSON(key, { ...doc, fiveEdu: fe, updateTime: now() })
  return fe
}

/**
 * 全量重算学生 fiveEdu 汇总（替代差值回滚）。
 * 读取 edu-moral store 下该生全部未删除打标记录，按维度累加 scoreOf(level) 后写回学生文档。
 * 避免触底 clamp(0) 导致差值回滚凭空加分，以及多次编辑产生的累积误差。
 * @param store S.academic() 实例（学生文档所在 store）
 * @param studentId 学生档案 id
 */
export async function rebuildFiveEdu(store, studentId) {
  if (!studentId) return null
  const key = `students/${studentId}.json`
  const doc = await store.get(key, { type: 'json' })
  if (!doc || doc.deleted === 1) return null

  const moral = S.moral()
  const { blobs } = await moral.list({ prefix: 'fiveedu/' })
  const records = await Promise.all(blobs.map((b) => moral.get(b.key, { type: 'json' })))

  const fe = {}
  for (const d of DIMENSIONS) fe[d] = 0
  for (const r of records) {
    if (!r || r.deleted === 1) continue
    if (num(r.studentId, 0) !== num(studentId, 0)) continue
    const dim = String(r.dimension || '')
    if (!DIMENSIONS.includes(dim)) continue
    fe[dim] += scoreOf(r.level)
  }
  for (const d of DIMENSIONS) fe[d] = Math.max(0, fe[d])

  await store.setJSON(key, { ...doc, fiveEdu: fe, updateTime: now() })
  return fe
}
