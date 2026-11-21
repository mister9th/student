/**
 * 教师档案反查助手（K12-P4 §2）
 * ------------------------------------------------------------------
 * 契约约定 teacherId = user.id（登录账号 id），而 teachers/<档案id> 是档案主键，
 * 二者不同。旧代码直接用 teachers/${teacherId}.json 查名会落空，这里统一按
 * userId === teacherId 在 teachers/ 中反查。
 */
import { num } from './util.js'

/** 列出未删除教师档案 */
export async function teacherDocs(storeObj) {
  const { blobs } = await storeObj.list({ prefix: 'teachers/' })
  const docs = await Promise.all(blobs.map((b) => storeObj.get(b.key, { type: 'json' })))
  return docs.filter((d) => d && d.deleted !== 1)
}

/** 按 user.id 反查教师档案（找不到返回 null） */
export async function teacherByUserId(storeObj, userId) {
  const uid = num(userId, 0)
  if (!uid) return null
  const docs = await teacherDocs(storeObj)
  return docs.find((d) => num(d.userId, 0) === uid) || null
}

/** 按 user.id 反查教师姓名，找不到回退到 fallback（通常是 body 传入的 teacherName） */
export async function teacherNameByUserId(storeObj, userId, fallback = '') {
  const t = await teacherByUserId(storeObj, userId)
  return t && t.realName ? String(t.realName) : String(fallback || '')
}
