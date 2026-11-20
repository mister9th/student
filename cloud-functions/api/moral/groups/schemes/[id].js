/** PUT/DELETE /api/moral/groups/schemes/{id} —— 方案改名/设默认/删除（级联删组与成员） */
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
    const key = `schemes/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('方案不存在', 400))

    const { blobs } = await store.list({ prefix: 'schemes/' })
    const schemes = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const classId = num(doc.classId, 0)

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = {}
      if (body.name !== undefined) {
        const name = String(body.name || '').trim()
        if (!name) return json(fail('方案名称不能为空', 400))
        const dup = schemes.some((x) => x && x.deleted !== 1 && num(x.id, 0) !== num(id, 0) && num(x.classId, 0) === classId && String(x.name || '').trim() === name)
        if (dup) return json(fail('该班级下已存在同名方案', 400))
        patch.name = name
      }
      if (num(body.isDefault, 0) === 1) {
        // 设默认时清除该班其他方案默认标记
        for (const x of schemes) {
          if (!x || x.deleted === 1 || num(x.id, 0) === num(id, 0) || num(x.classId, 0) !== classId || num(x.isDefault, 0) !== 1) continue
          await store.setJSON(`schemes/${x.id}.json`, { ...x, isDefault: 0, updateTime: now() })
        }
        patch.isDefault = 1
      } else if (body.isDefault !== undefined) {
        patch.isDefault = 0
      }
      if (body.colorIndex !== undefined) patch.colorIndex = num(body.colorIndex, 0)
      if (body.sortOrder !== undefined) patch.sortOrder = num(body.sortOrder, 0)
      await store.setJSON(key, { ...doc, ...patch, updateTime: now() })
      return json(ok(null))
    }

    if (method === 'DELETE') {
      // 每班至少保留一个方案
      const alive = schemes.filter((x) => x && x.deleted !== 1 && num(x.classId, 0) === classId)
      if (alive.length <= 1) return json(fail('每个班级至少保留一个分组方案', 400))
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      // 级联删该方案 groups + members
      const [groupBlobs, memberBlobs] = [await store.list({ prefix: 'groups/' }), await store.list({ prefix: 'members/' })]
      const groups = await Promise.all(groupBlobs.blobs.map((b) => store.get(b.key, { type: 'json' })))
      for (const g of groups) {
        if (!g || g.deleted === 1 || num(g.schemeId, 0) !== num(id, 0)) continue
        await store.setJSON(`groups/${g.id}.json`, { ...g, deleted: 1, updateTime: now() })
      }
      const members = await Promise.all(memberBlobs.blobs.map((b) => store.get(b.key, { type: 'json' })))
      for (const m of members) {
        if (!m || m.deleted === 1 || num(m.schemeId, 0) !== num(id, 0)) continue
        await store.setJSON(`members/${m.id}.json`, { ...m, deleted: 1, updateTime: now() })
      }
      return json(ok(null))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '分组方案操作失败', 500))
  }
}
