/**
 * POST /api/file/get-upload-url —— 预签名 PUT URL（浏览器直传 Blob）
 * ------------------------------------------------------------------
 * 前端 upload.ts 传入 {fileName, contentType, businessType}，拿 {url, key} 后
 * 用 PUT 直传字节，PUT 的 Content-Type 必须与签名时一致（空则 application/octet-stream）。
 * 首步先写一条 fileSize=0 的 files 元数据；第 3 步 /api/file/confirm 按 fileKey
 * 找到这条并更新 fileSize/mime，避免重复插入。
 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { enc, extOf, num, currentUser } from '../../_lib/util.js'

// P3：业务类型白名单（作业附件 businessType='homework'）。未知类型归一为 other，保持向后兼容。
const ALLOWED_BUSINESS_TYPES = new Set([
  'other', 'avatar', 'homework', 'notice', 'message', 'score', 'moral', 'selection',
])

export async function onRequest(context) {
  try {
    await ensureSeeded()
    // 上传端点只需登录：学生无 file 码但要能传头像/作业附件；列表与删除仍由 file 码管控
    const guard = await currentUser(context)
    if (!guard) return json(fail('未登录', 401), 401)
    const body = await bodyOf(context.request)
    const fileName = String(body.fileName || body.name || 'upload')
    let businessType = String(body.businessType || body.business_type || 'other')
    if (!ALLOWED_BUSINESS_TYPES.has(businessType)) businessType = 'other'
    // 必须与前端 putToPresignedUrl 发送的 Content-Type 完全一致，否则 Blob 返回 403
    const contentType = String(body.contentType || body.mimeType || '') || 'application/octet-stream'
    const uid = guard.id ?? guard.userId ?? 1
    const ext = extOf(fileName)
    const safeName = fileName.replace(/[?#"\\]/g, '_')
    // 头像固定 key（重复上传覆盖）；普通文件用时间戳保证唯一
    const key = businessType === 'avatar'
      ? `avatars/${uid}.${ext}`
      : `uploads/${Date.now()}_${safeName}`

    const store = S.content()
    const signed = await store.createUploadUrl(key, {
      expireSeconds: 3600,
      contentType,
    })

    // 首步占位元数据：confirm 会按 fileKey 找到并更新（含真实 fileSize）
    // 头像等固定 key 重复上传时复用同一条，避免产生重复行
    const publicUrl = `/api/file/public/${enc(key)}`
    let existingKey = null
    let id = 0
    try {
      const { blobs } = await store.list({ prefix: 'files/' })
      for (const b of blobs) {
        const doc = await store.get(b.key, { type: 'json' })
        if (doc && doc.fileKey === key) { existingKey = b.key; id = doc.id; break }
      }
    } catch { /* 扫描失败则新建 */ }
    if (!existingKey) {
      id = await nextId(store, 'files/')
      existingKey = `files/${id}.json`
    }
    const old = existingKey && await store.get(existingKey, { type: 'json' }).catch(() => null)
    await store.setJSON(existingKey, {
      id, fileName, fileKey: key, fileSize: num(body.fileSize, 0), fileType: ext,
      mimeType: contentType, uploadBy: guard.realName || '系统管理员',
      url: publicUrl, fileUrl: publicUrl, businessType,
      createTime: old?.createTime || now(), deleted: 0,
    })

    return json(ok({
      url: signed.url,
      uploadUrl: signed.url,
      key: signed.key,
      contentType,
      fileUrl: publicUrl,
      expiresAt: signed.expiresAt,
      id,
      fileName,
    }))
  } catch (e) {
    return json(fail(e?.message || '获取上传地址失败', 500))
  }
}
