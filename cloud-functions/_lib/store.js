/**
 * Blob 数据层 —— 全栈版的"数据库"
 * ------------------------------------------------------------------
 * EdgeOne 无托管数据库，Blob 即数据库。key 前缀即 schema。
 * 所有 store 使用 strong 一致性（写入后立即可读）。
 * 6 个 store 按域拆分，避免单一 store 过热。
 */
import { getStore } from '@edgeone/pages-blob'

const store = (name) => getStore({ name, consistency: 'strong' })

// 六个域 store
export const S = {
  auth: () => store('edu-auth'),       // users, rbac
  academic: () => store('edu-academic'), // students, teachers, classes, courses, scores, selections, counts
  content: () => store('edu-content'),  // notices, messages, files, uploads
  logs: () => store('edu-logs'),        // oper logs
  ai: () => store('edu-ai'),            // chats, predictions, comments
  config: () => store('edu-config'),    // settings, course-categories, stats
}

/** 统一响应结构，兼容前端 request.ts（code===200 取 data） */
export const ok = (data, message = 'success') => ({ code: 200, message, data, timestamp: Date.now() })
export const fail = (message, code = 500) => ({ code, message, data: null, timestamp: Date.now() })

/** 统一 Response 包装 */
export const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } })

/** 解析请求体（context.request.body 已由平台解析，兼容直接传 string） */
export async function bodyOf(request) {
  if (request.body !== undefined && request.body !== null) {
    return typeof request.body === 'string' ? JSON.parse(request.body) : request.body
  }
  try { return await request.json() } catch { return {} }
}

/** 读取分页参数（前端传 page/pageSize，从 query 或 body） */
export function pageOf(params = {}) {
  const page = Math.max(1, Number(params.page) || 1)
  const pageSize = Math.min(500, Math.max(1, Number(params.pageSize) || 10))
  return { page, pageSize }
}

/** Blob 内存分页：列出前缀下所有 JSON 文档后切片 */
export async function paged(storeObj, prefix, params = {}, filterFn = null) {
  const { page, pageSize } = pageOf(params)
  const { blobs } = await storeObj.list({ prefix })
  let items = await Promise.all(
    blobs.map((b) => storeObj.get(b.key, { type: 'json' }))
  )
  items = items.filter((x) => x && x.deleted !== 1)
  if (filterFn) items = items.filter(filterFn)
  items.sort((a, b) => (b.id || 0) - (a.id || 0))
  const total = items.length
  return { total, records: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

/** 生成下一个自增 id（基于前缀下现有 key 的最大值 + 1） */
export async function nextId(storeObj, prefix) {
  const { blobs } = await storeObj.list({ prefix })
  let max = 0
  for (const b of blobs) {
    const n = Number(b.key.slice(prefix.length).replace(/\.json$/, ''))
    if (Number.isFinite(n) && n > max) max = n
  }
  return max + 1
}

/** 哨兵键：保证唯一性（如学号、用户名） */
export async function ensureUnique(storeObj, key) {
  const existing = await storeObj.get(key)
  if (existing) throw new Error(`值已存在: ${key}`)
  await storeObj.setJSON(key, { createdAt: Date.now() }, { onlyIfNew: true })
}

/** 生成 JWT（登录签发） */
export function signToken(payload, secret) {
  // 动态 import 避免冷启动开销；cloud function 内 jwt 作为依赖可用
  return import('jsonwebtoken').then(({ default: jwt }) =>
    jwt.sign(payload, secret, { expiresIn: '7d' })
  )
}

/** 校验 Bearer token，返回 claims；失败返回 null */
export async function verifyToken(authHeader, secret) {
  if (!authHeader) return null
  const token = String(authHeader).replace(/^Bearer\s+/i, '')
  try {
    const { default: jwt } = await import('jsonwebtoken')
    return jwt.verify(token, secret)
  } catch { return null }
}

/** JWT 密钥：必须由调用方从 context.env 传入（云函数内禁用 process.env） */
export const jwtSecret = (env = {}) => env.JWT_SECRET || 'student-ai-system-secret-key-2025'

/** 当前时间字符串 */
export const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19)
