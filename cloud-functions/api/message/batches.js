/** GET /api/message/batches —— 按发送批次汇总消息（已读/未读统计） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, requirePermission } from '../../_lib/util.js'

/** 列出某前缀下全部未删除文档 */
async function docsOf(storeObj, prefix) {
  const { blobs } = await storeObj.list({ prefix })
  const docs = await Promise.all(blobs.map((b) => storeObj.get(b.key, { type: 'json' })))
  return docs.filter((d) => d && d.deleted !== 1)
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message:list')
    if (guard instanceof Response) return guard
    const meId = num(guard.id ?? guard.userId, 0)
    const userType = Number(guard.userType)
    const snapshotPerms = Array.isArray(guard.permissions) ? guard.permissions : []
    const isAdmin = userType === 3 || snapshotPerms.includes('*:*')
    const isLeader = userType === 4

    const docs = await docsOf(S.content(), 'messages/')

    // 角色过滤：管理员全量；年级组长只看自己发的；教师/学生只看自己收的
    let scoped = docs
    if (isLeader) scoped = docs.filter((d) => num(d.senderId, 0) === meId)
    else if (!isAdmin) scoped = docs.filter((d) => num(d.receiverId, 0) === meId)

    // 教师档案：userId -> realName（receiverName 反查，查不到用「用户<id>」）
    const nameByUser = new Map()
    for (const t of await docsOf(S.academic(), 'teachers/')) {
      if (t.userId) nameByUser.set(num(t.userId, 0), String(t.realName || `用户${t.userId}`))
    }

    // 按 batchId 分组；历史无 batchId 消息各自单条成组（batchId = single-<id>）
    const groups = new Map()
    for (const d of scoped) {
      const bid = d.batchId ? String(d.batchId) : `single-${d.id}`
      let g = groups.get(bid)
      if (!g) {
        g = {
          batchId: bid,
          title: String(d.batchTitle || d.title || ''),
          targetType: String(d.targetType || ''),
          targetDesc: String(d.targetDesc || ''),
          senderId: num(d.senderId, 0),
          senderName: String(d.senderName || ''),
          total: 0,
          readCount: 0,
          unreadCount: 0,
          createTime: d.createTime || '',
          receivers: [],
        }
        groups.set(bid, g)
      }
      g.total += 1
      const read = num(d.isRead, 0) === 1
      if (read) g.readCount += 1
      else g.unreadCount += 1
      const rid = num(d.receiverId, 0)
      g.receivers.push({
        receiverId: rid,
        receiverName: nameByUser.get(rid) || `用户${rid}`,
        isRead: read ? 1 : 0,
        readTime: d.readTime || null,
      })
    }

    // 按 createTime 倒序，全量返回（批次不多，不分页）
    const list = [...groups.values()].sort((a, b) =>
      String(b.createTime).localeCompare(String(a.createTime))
    )
    return json(ok(list))
  } catch (e) {
    return json(fail(e?.message || '查询发送批次失败', 500))
  }
}
