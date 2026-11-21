/** POST /api/system/reset-demo-data —— 清空全部 store 后重新播种 */
import { ok, fail, json } from '../../_lib/store.js'
import { resetAll } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    await resetAll()
    return json(ok({ success: true, message: '演示数据已重置' }))
  } catch (e) {
    return json(fail(e?.message || '重置失败', 500))
  }
}
