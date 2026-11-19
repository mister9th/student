/** POST /api/auth/logout —— JWT 无状态，服务端无需销毁会话 */
import { ok, fail, json } from '../../_lib/store.js'

export async function onRequest(context) {
  try {
    return json(ok(null, '退出成功'))
  } catch (e) {
    return json(fail(e?.message || '退出失败', 500))
  }
}
