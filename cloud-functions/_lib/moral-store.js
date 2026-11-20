/**
 * 德育域工具 —— 学生德育分读写
 * ------------------------------------------------------------------
 * 学生档案仍存 edu-academic 的 students/<id>.json，德育分作为字段 moralScore。
 * Blob 无事务：累加在一次调用内先读后写，结果下限 0。
 */
import { now } from './store.js'
import { num } from './util.js'

/** 读取学生德育分；学生不存在或字段缺失按 0 处理 */
export async function moralScoreOf(store, studentId) {
  const doc = await store.get(`students/${studentId}.json`, { type: 'json' })
  if (!doc || doc.deleted === 1) return 0
  return num(doc.moralScore, 0)
}

/**
 * 累加学生德育分并写回，结果下限 0。
 * 返回最新分值；学生不存在或已逻辑删除时返回 null，不做写回。
 */
export async function addMoralScore(store, studentId, delta) {
  const key = `students/${studentId}.json`
  const doc = await store.get(key, { type: 'json' })
  if (!doc || doc.deleted === 1) return null
  const score = Math.max(0, num(doc.moralScore, 0) + num(delta, 0))
  await store.setJSON(key, { ...doc, moralScore: score, updateTime: now() })
  return score
}
