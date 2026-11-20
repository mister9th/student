/**
 * 年段工作三组资源（goals/summaries/plans）通用 CRUD 生成器。
 * 权限按契约：GET grade:list，POST grade:add，PUT/DELETE grade:edit。
 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

/**
 * @param {object} cfg
 * @param {string} cfg.prefix    Blob key 前缀，如 'goals/'
 * @param {string} cfg.label     中文资源名（错误信息用）
 * @param {Function} cfg.filterOf (q) => filterFn  查询过滤
 * @param {Function} cfg.buildOf  (body, base) => 字段对象或 {error:'...'}，base 为已有文档（PUT 时）
 */
export function gradeHandlers({ prefix, label, filterOf, buildOf }) {
  async function index(context) {
    try {
      await ensureSeeded()
      const method = context.request.method
      const user = await requirePermission(context, method === 'GET' ? 'grade:list' : 'grade:add')
      if (user instanceof Response) return user
      const store = S.moral()

      if (method === 'GET') {
        const q = context.request.query || {}
        const { blobs } = await store.list({ prefix })
        let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
        items = items.filter((x) => x && x.deleted !== 1).filter(filterOf(q))
        items.sort((a, b) => (b.id || 0) - (a.id || 0))
        const page = Math.max(1, Number(q.page) || 1)
        const pageSize = Math.min(500, Math.max(1, Number(q.pageSize) || 10))
        return json(ok({ total: items.length, records: items.slice((page - 1) * pageSize, page * pageSize) }))
      }

      if (method === 'POST') {
        const body = await bodyOf(context.request)
        const fields = buildOf(body, null)
        if (fields.error) return json(fail(fields.error, 400))
        const id = await nextId(store, prefix)
        await store.setJSON(`${prefix}${id}.json`, { id, ...fields, createTime: now(), updateTime: now(), deleted: 0 })
        return json(ok({ id }))
      }

      return json(fail('方法不允许', 405))
    } catch (e) {
      return json(fail(e?.message || `${label}操作失败`, 500))
    }
  }

  async function item(context) {
    try {
      await ensureSeeded()
      const method = context.request.method
      const user = await requirePermission(context, 'grade:edit')
      if (user instanceof Response) return user
      const id = String(context.params?.id || '').replace(/\D/g, '')
      const store = S.moral()
      const key = `${prefix}${id}.json`
      const doc = await store.get(key, { type: 'json' })
      if (!doc || doc.deleted === 1) return json(fail(`${label}不存在`, 400))

      if (method === 'PUT') {
        const body = await bodyOf(context.request)
        const fields = buildOf(body, doc)
        if (fields.error) return json(fail(fields.error, 400))
        await store.setJSON(key, { ...doc, ...fields, updateTime: now() })
        return json(ok(null))
      }

      if (method === 'DELETE') {
        await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
        return json(ok(null))
      }

      return json(fail('方法不允许', 405))
    } catch (e) {
      return json(fail(e?.message || `${label}操作失败`, 500))
    }
  }

  return { index, item }
}

/** 文本字段：body 提供则取，否则保留 base（PUT）或缺省（POST） */
export const textOf = (body, base, key, def = '') =>
  body[key] !== undefined ? String(body[key]) : String(base?.[key] ?? def)

export const numberClamp = (v, min, max, def) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return def
  return Math.min(max, Math.max(min, n))
}

export const today = () => now().slice(0, 10)

export const gradeNum = num
