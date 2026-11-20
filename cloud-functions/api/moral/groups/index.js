/** /api/moral/groups —— 兼容入口：GET 小组列表 / POST 新增小组，转发到规范端点 /moral/groups/groups */
export { onRequest } from './groups/index.js'
