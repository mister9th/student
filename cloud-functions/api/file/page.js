/** GET /api/file/page —— 文件元数据分页（每条保证 url/fileUrl 非空） */
import { S, ok, fail, json, paged } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { enc, stripRecords, requirePermission } from '../../_lib/util.js'

const publicUrlOf = (key) => `/api/file/public/${enc(key || '')}`

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'file:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const name = q.fileName ? String(q.fileName).trim() : ''
    const filter = (x) => !name || String(x.fileName || '').includes(name)
    const result = stripRecords(await paged(S.content(), 'files/', q, filter))
    // 前端 FileManager 下载用 row.url || row.fileUrl，两者至少一个要有值
    result.records = (result.records || []).map((r) => {
      const url = r.url || r.fileUrl || publicUrlOf(r.fileKey || r.key || r.id)
      return { ...r, url, fileUrl: r.fileUrl || url }
    })
    return json(ok(result))
  } catch (e) {
    return json(fail(e?.message || '查询文件失败', 500))
  }
}
