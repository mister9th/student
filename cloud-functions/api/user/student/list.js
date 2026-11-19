/** GET /api/user/student/list —— 下拉选项 */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { strip } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const store = S.academic()
    const { blobs } = await store.list({ prefix: 'students/' })
    const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    return json(ok(
      items.filter((x) => x && x.deleted !== 1).sort((a, b) => a.id - b.id).map(strip)
    ))
  } catch (e) {
    return json(fail(e?.message || '查询学生失败', 500))
  }
}
