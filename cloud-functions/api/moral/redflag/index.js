/** /api/moral/redflag —— 兼容入口：榜单查询转发到规范端点 /moral/redflag/rankings */
// 同上：显式 wrapper 代替 re-export，避免打包符号冲突。
import { onRequest as rankingsHandler } from './rankings/index.js'
export async function onRequest(ctx) {
  return rankingsHandler(ctx)
}
