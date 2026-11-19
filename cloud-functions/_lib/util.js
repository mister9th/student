/**
 * 云函数公共小工具（仅依赖 _lib/store.js 与已声明依赖）
 */
import { S, verifyToken, jwtSecret, pageOf } from './store.js'

export const num = (v, def = 0) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}

export const val = (v, def = null) => (v === undefined || v === null || v === '' ? def : v)

export const gradeOf = (score) => (score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'E')
export const pointOf = (score) => Number((score >= 60 ? (score - 50) / 10 : 0).toFixed(1))

/** 响应中去掉内部逻辑删标记 */
export const strip = (obj) => {
  if (!obj) return null
  const { deleted, password, ...rest } = obj
  return rest
}
/**
 * 与 store.paged 同构的分页，但可指定排序方向。
 * mock.ts 中学生/教师/班级/课程/成绩按 id 升序，公告/消息/文件/日志按 id 降序，
 * store.paged 固定降序，故这几处用本函数对齐演示顺序。
 */
export async function pagedOrdered(storeObj, prefix, params = {}, filterFn = null, asc = true) {
  const { page, pageSize } = pageOf(params)
  const { blobs } = await storeObj.list({ prefix })
  let items = await Promise.all(blobs.map((b) => storeObj.get(b.key, { type: 'json' })))
  items = items.filter((x) => x && x.deleted !== 1)
  if (filterFn) items = items.filter(filterFn)
  items.sort((a, b) => (asc ? (a.id || 0) - (b.id || 0) : (b.id || 0) - (a.id || 0)))
  const total = items.length
  return { total, records: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

export const stripRecords = (pagedResult) => {
  const r = pagedResult || { total: 0, records: [], page: 1, pageSize: 10, totalPages: 0 }
  return { ...r, records: (r.records || []).map(strip) }
}

export const enc = (s) => encodeURIComponent(String(s ?? ''))

export const roleOf = (userType) => (Number(userType) === 2 ? 'ROLE_TEACHER' : Number(userType) === 1 ? 'ROLE_STUDENT' : 'ROLE_ADMIN')

export const ROLE_PERMISSIONS = {
  ROLE_ADMIN: ['*:*'],
  ROLE_TEACHER: [
    'dashboard', 'dashboard:screen', 'student', 'student:list', 'student:add', 'student:edit',
    'student:import', 'student:export', 'teacher', 'teacher:list', 'teacher:add', 'teacher:edit',
    'class', 'class:list', 'class:add', 'class:edit', 'course', 'course:list', 'course:add',
    'course:edit', 'score', 'score:list', 'score:add', 'score:edit', 'notice', 'message',
    'message:list', 'file', 'file:list', 'ai', 'ai:chat',
  ],
  ROLE_STUDENT: ['dashboard', 'dashboard:screen', 'ai', 'ai:chat', 'message', 'message:list', 'student:list', 'score:list'],
}
export const permsOf = (userType) => ROLE_PERMISSIONS[roleOf(userType)]

/** 从 Bearer header 解析当前用户；无效返回 null */
export async function currentUser(context) {
  const headers = context.request.headers || {}
  const authHeader = headers['authorization'] || headers.Authorization || ''
  const claims = await verifyToken(authHeader, jwtSecret(context.env))
  if (!claims) return null
  const uid = claims.id ?? claims.userId
  if (!uid) return null
  const user = await S.auth().get(`users/${uid}.json`, { type: 'json' })
  if (user && user.deleted !== 1) return user
  return { ...claims, id: uid, userId: uid }
}

/** 根据文件名推断 Content-Type */
const MIME = {
  txt: 'text/plain', html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
  pdf: 'application/pdf', doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  zip: 'application/zip', mp4: 'video/mp4', mp3: 'audio/mpeg',
}
export const extOf = (name) => {
  const s = String(name || '')
  const i = s.lastIndexOf('.')
  return i > 0 ? s.slice(i + 1).toLowerCase() : 'file'
}
export const contentTypeOf = (name, fallback) => MIME[extOf(name)] || fallback || 'application/octet-stream'
