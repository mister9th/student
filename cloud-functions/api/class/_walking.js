/**
 * class 走班可选字段归一化（P3 §2.5，class 模型增量扩展，不动 P0 已有字段）
 * - isWalking: 0 行政班 / 1 走班班
 * - isWalking=1 时 subjectCombo 必填且须为 12 种合法组合之一
 * - isWalking=0 时忽略 subjectCombo/baseClassId，统一置空
 */
import { num } from '../../_lib/util.js'
import { isValidCombo } from '../selection/_shared.js'

export function normalizeWalking(body = {}, base = null) {
  const b = body && typeof body === 'object' ? body : {}
  const raw = b.isWalking !== undefined ? b.isWalking : (base ? base.isWalking : 0)
  const isWalking = num(raw, 0) === 1 ? 1 : 0
  if (isWalking === 0) {
    return { error: null, data: { isWalking: 0, subjectCombo: null, baseClassId: null } }
  }
  const subjectComboRaw = b.subjectCombo !== undefined ? b.subjectCombo : (base?.subjectCombo || '')
  const subjectCombo = String(subjectComboRaw || '').trim()
  if (!subjectCombo) return { error: '走班班须填写选科组合', data: null }
  if (!isValidCombo(subjectCombo)) return { error: '选科组合不合法（须为 12 种组合之一）', data: null }
  const baseClassIdRaw = b.baseClassId !== undefined ? b.baseClassId : (base?.baseClassId ?? null)
  const baseClassId = baseClassIdRaw === null || baseClassIdRaw === '' || num(baseClassIdRaw, 0) === 0
    ? null : num(baseClassIdRaw, 0)
  return { error: null, data: { isWalking: 1, subjectCombo, baseClassId } }
}
