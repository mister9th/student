/** GET/POST /api/moral/groups/schemes —— 分组方案列表与创建（P2 小组管理） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'group:list' : 'group:add')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const q = context.request.query || {}
      const classId = q.classId ? num(q.classId, 0) : 0
      const { blobs } = await store.list({ prefix: 'schemes/' })
      let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      items = items.filter((x) => x && x.deleted !== 1 && (!classId || num(x.classId, 0) === classId))
      items.sort((a, b) => (num(a.sortOrder, 0) - num(b.sortOrder, 0)) || ((a.id || 0) - (b.id || 0)))
      return json(ok({ records: items, total: items.length }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const classId = num(body.classId, 0)
      const name = String(body.name || '').trim()
      if (!classId) return json(fail('班级不能为空', 400))
      if (!name) return json(fail('方案名称不能为空', 400))
      const cls = await S.academic().get(`classes/${classId}.json`, { type: 'json' })
      if (!cls || cls.deleted === 1) return json(fail('班级不存在', 400))
      // 同名同班校验
      const { blobs } = await store.list({ prefix: 'schemes/' })
      const schemes = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      const dup = schemes.some((x) => x && x.deleted !== 1 && num(x.classId, 0) === classId && String(x.name || '').trim() === name)
      if (dup) return json(fail('该班级下已存在同名方案', 400))
      const isDefault = num(body.isDefault, 0) ? 1 : 0
      // 设为默认时清除该班其他方案默认标记
      if (isDefault) {
        for (const x of schemes) {
          if (!x || x.deleted === 1 || num(x.classId, 0) !== classId || num(x.isDefault, 0) !== 1) continue
          await store.setJSON(`schemes/${x.id}.json`, { ...x, isDefault: 0, updateTime: now() })
        }
      }
      const id = await nextId(store, 'schemes/')
      await store.setJSON(`schemes/${id}.json`, {
        id, classId, className: String(cls.className || ''), name, isDefault,
        colorIndex: num(body.colorIndex, 0), sortOrder: num(body.sortOrder, 0),
        createTime: now(), deleted: 0,
      })
      // 自动创建该方案下"未分组"容器组（真实分组在 groups 端点管理）
      const gid = await nextId(store, 'groups/')
      await store.setJSON(`groups/${gid}.json`, {
        id: gid, schemeId: id, name: '未分组', isUnassigned: 1,
        colorIndex: 0, sortOrder: 0, createTime: now(), deleted: 0,
      })
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '分组方案操作失败', 500))
  }
}
