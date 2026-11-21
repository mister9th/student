/**
 * POST /api/file/confirm —— 预签名直传完成后写文件元数据
 * ------------------------------------------------------------------
 * 前端 upload.ts 第 3 步调用：{key, fileName, fileSize, contentType, businessType}
 * 幂等：若 get-upload-url 已写入同 fileKey 的元数据则更新之，否则新建。
 * 必须返回非空 fileUrl，前端只在为空时才回退到 `/api/file/public/<key>`。
 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { enc, extOf, contentTypeOf, num, currentUser } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    // 与 get-upload-url 对齐：上传确认只需登录，不检查 file 码
    const guard = await currentUser(context)
    if (!guard) return json(fail('未登录', 401), 401)
    const body = await bodyOf(context.request)
    const key = String(body.key || body.fileKey || '').replace(/^\/+/, '')
    if (!key) return json(fail('缺少文件 key', 400), 400)

    const fileName = String(body.fileName || key.split('/').pop() || 'upload')
    const ext = extOf(fileName)
    const mime = String(body.contentType || body.mimeType || contentTypeOf(fileName))
    const businessType = String(body.businessType || body.business_type || 'other')
    const fileUrl = `/api/file/public/${enc(key)}`
    const store = S.content()

    // 查找 get-upload-url 阶段可能已建的元数据（兼容旧实现），实现幂等确认
    let existing = null
    try {
      const { blobs } = await store.list({ prefix: 'files/' })
      for (const b of blobs) {
        const doc = await store.get(b.key, { type: 'json' })
        if (doc && doc.fileKey === key) { existing = { ...doc, __key: b.key }; break }
      }
    } catch { /* 元数据扫描失败则走新建 */ }

    const meta = {
      fileName,
      fileKey: key,
      fileSize: num(body.fileSize, 0),
      fileType: ext,
      mimeType: mime,
      uploadBy: guard.realName || '系统管理员',
      businessType,
      url: fileUrl,
      fileUrl,
      createTime: existing?.createTime || now(),
      updateTime: now(),
      deleted: 0,
    }

    let id
    if (existing) {
      id = existing.id
      const { __key, ...cleanExisting } = existing
      await store.setJSON(__key, { ...cleanExisting, ...meta })
    } else {
      id = await nextId(store, 'files/')
      await store.setJSON(`files/${id}.json`, { id, ...meta })
    }

    return json(ok({ fileUrl, url: fileUrl, id, fileName, key }))
  } catch (e) {
    return json(fail(e?.message || '确认上传失败', 500))
  }
}
