/** /api/moral/groups —— 兼容入口：GET 小组列表 / POST 新增小组，转发到规范端点 /moral/groups/groups */
// 注意：不要写 `export { onRequest } from ...`——EdgeOne 打包合并云函数时，
// 裸 onRequest 符号会与其生成的 onRequestN 重命名声明冲突导致 BUILD_ERROR，必须用显式 wrapper。
import { onRequest as groupsHandler } from './groups/groups/index.js'
export async function onRequest(ctx) {
  return groupsHandler(ctx)
}
