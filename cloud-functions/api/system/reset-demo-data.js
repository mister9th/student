/** POST /api/system/reset-demo-data —— 清空全部 store 后重新播种 */
import { ok, fail, json } from '../../_lib/store.js'
import { resetAll } from '../../_lib/seed.js'

export async function onRequest(context) {
  try {
    await resetAll()
    return json(ok({ success: true, message: '演示数据已重置' }))
  } catch (e) {
    return json(fail(e?.message || '重置失败', 500))
  }
}
