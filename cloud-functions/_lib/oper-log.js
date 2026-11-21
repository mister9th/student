/**
 * 轻量运行时操作日志写入（非阻塞）。
 * 日志失败不影响主流程：整个函数体 try-catch 吞掉所有异常，不抛错、不返回需要调用方处理的结果。
 */
import { S, nextId, now } from './store.js'
import { currentUser } from './util.js'

export async function writeOperLog(context, { module, operation, requestUrl, status } = {}) {
  try {
    const user = await currentUser(context)
    const store = S.logs()
    // key 前缀与 seed.js / oper-log/page.js 保持一致：logs store 内直接用 oper/
    const id = await nextId(store, 'oper/')
    const headers = context.request?.headers || {}
    const forwarded = typeof headers.get === 'function'
      ? (headers.get('x-forwarded-for') || '')
      : (headers['x-forwarded-for'] || '')
    await store.setJSON(`oper/${id}.json`, {
      id,
      userId: user?.id ?? user?.userId ?? 0,
      username: user?.username || 'system',
      module,
      operation,
      requestMethod: context.request?.method,
      requestUrl: requestUrl || context.request?.url,
      ip: String(forwarded).split(',')[0].trim(),
      duration: 0,
      status: status || 1,
      createTime: now(),
      deleted: 0,
    })
  } catch (_) {
    // 日志失败不影响主流程：静默吞掉，业务请求照常返回
  }
}
