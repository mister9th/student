/** PUT/DELETE /api/moral/groups/groups/{id} —— 小组改名/删除（级联删成员；未分组不可改删） */
import { S, ok, fail, json, bodyOf, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'DELETE' ? 'group:delete' : 'group:edit')
    if (user instanceof Response) return user
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `groups/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('小组不存在', 400))
    if (num(doc.isUnassigned, 0) === 1) return json(fail('"未分组"容器不可编辑或删除', 400))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = {}
      if (body.name !== undefined) {
        const name = String(body.name || '').trim()
        if (!name) return json(fail('小组名称不能为空', 400))
        patch.name = name
      }
      if (body.colorIndex !== undefined) patch.colorIndex = num(body.colorIndex, 0)
      if (body.sortOrder !== undefined) patch.sortOrder = num(body.sortOrder, 0)
      await store.setJSON(key, { ...doc, ...patch, updateTime: now() })
      return json(ok(null))
    }

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      // 级联删该组成员
      const { blobs } = await store.list({ prefix: 'members/' })
      const members = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      for (const m of members) {
        if (!m || m.deleted === 1 || num(m.groupId, 0) !== num(id, 0)) continue
        await store.setJSON(`members/${m.id}.json`, { ...m, deleted: 1, updateTime: now() })
      }
      return json(ok(null))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '小组操作失败', 500))
  }
}
