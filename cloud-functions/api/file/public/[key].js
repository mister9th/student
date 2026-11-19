/**
 * GET /api/file/public/{encoded-key} —— 公开读取 Blob 字节
 * ------------------------------------------------------------------
 * 前端 URL 形如 /api/file/public/uploads%2F1699999999999_foo.png，
 * key 解码后含 `/`，需还原；seed 演示文件只有元数据没有字节，
 * 此时返回可访问的文本占位说明，保证 fileUrl 不会是死链。
 */
import { S } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { contentTypeOf } from '../../../_lib/util.js'

/** 解析并还原 key（兼容 %2F / 双重编码 / 已解码 / URL 中带斜杠） */
function resolveKey(context) {
  let raw = String((context.params && context.params.key) || '')
  if (!raw) {
    const m = String((context.request && context.request.url) || '').match(/\/file\/public\/(.+)$/)
    if (m) raw = m[1]
  }
  raw = raw.split('?')[0].split('#')[0]
  let key = raw
  for (let i = 0; i < 3; i++) {
    if (!/%2f/i.test(key) && !/%[0-9a-f]{2}/i.test(key)) break
    try { key = decodeURIComponent(key) } catch { break }
  }
  return key.replace(/^\/+/, '')
}

export async function onRequest(context) {
  try {
    // 健康检查不依赖 seed 成功；此处 seed 失败仍尝试读已有文件
    try { await ensureSeeded() } catch { /* ignore */ }

    const key = resolveKey(context)
    if (!key) return new Response('Not Found', { status: 404 })

    const store = S.content()
    let mime = contentTypeOf(key)
    let meta = null

    // 优先从文件元数据取 MIME（一次 list + 匹配 fileKey）
    try {
      const { blobs } = await store.list({ prefix: 'files/' })
      for (const b of blobs) {
        const doc = await store.get(b.key, { type: 'json' })
        if (doc && doc.deleted !== 1 && doc.fileKey === key) {
          meta = doc
          mime = String(doc.mimeType || doc.contentType || mime)
          break
        }
      }
    } catch { /* 元数据不可用时按扩展名推断 */ }

    const buf = await store.get(key, { type: 'arrayBuffer' })
    if (buf) {
      return new Response(new Uint8Array(buf), {
        status: 200,
        headers: {
          'Content-Type': mime,
          'Cache-Control': 'public, max-age=31536000',
          'X-Content-Type-Options': 'nosniff',
        },
      })
    }

    // 无字节：seed 演示文件返回占位文本，保证链接可访问、前端下载不报错
    const tip = meta
      ? `演示文件：${meta.fileName || key}（该记录为种子元数据，未包含实际二进制内容）。`
      : `文件不存在：${key}`
    return new Response(tip, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
    })
  } catch (e) {
    return new Response(e?.message || 'Internal Server Error', { status: 500 })
  }
}
