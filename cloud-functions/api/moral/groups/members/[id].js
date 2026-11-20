/** DELETE /api/moral/groups/members/{studentId}?schemeId= —— 退出分组（删成员记录） */
import { S, ok, fail, json, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'group:edit')
    if (user instanceof Response) return user
    if (context.request.method !== 'DELETE') return json(fail('方法不允许', 405))
    const studentId = String(context.params?.id || '').replace(/\D/g, '')
    if (!studentId) return json(fail('学生不能为空', 400))
    const schemeId = num(context.request.query?.schemeId, 0)
    if (!schemeId) return json(fail('分组方案不能为空', 400))

    const store = S.moral()
    const { blobs } = await store.list({ prefix: 'members/' })
    const members = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const found = members.find((x) => x && x.deleted !== 1 && num(x.schemeId, 0) === schemeId && num(x.studentId, 0) === num(studentId, 0))
    if (!found) return json(fail('该学生在此方案下没有分组记录', 400))
    await store.setJSON(`members/${found.id}.json`, { ...found, deleted: 1, updateTime: now() })
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '小组成员操作失败', 500))
  }
}
