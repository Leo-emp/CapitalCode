// ============================================================
// ACTING — feelings that change and things handed between people
// (living film spec §5). Pure functions of the absolute frame.
// ============================================================

import { getPose, type ExpressionId } from '../rig/pose'

export const EXPR_BLEND = 8   // # frames for one feeling to melt into the next
export const GIVE_FRAMES = 12 // # frames for an object to travel from one hand to the other

type Key = { at: number; pose: string; expression?: string }
// # The feeling a key shows: its own expression, else its pose's
const feel = (k: Key) => (k.expression ?? getPose(k.pose).expression) as ExpressionId

// # The face at a frame: the latest key's feeling, eased in from the one before over EXPR_BLEND frames
export const expressionAt = (frame: number, keys: Key[]): { expression: ExpressionId; from?: ExpressionId; mix?: number } => {
  const past = [...keys].sort((a, b) => a.at - b.at).filter((k) => k.at <= frame)
  if (!past.length) return { expression: feel([...keys].sort((a, b) => a.at - b.at)[0]) }
  const cur = past[past.length - 1], prev = past[past.length - 2]
  const e = feel(cur)
  const t = (frame - cur.at) / EXPR_BLEND
  if (!prev || feel(prev) === e || t >= 1) return { expression: e }
  return { expression: e, from: feel(prev), mix: t }
}

// # Who holds a prop at a frame. travel goes 0→1 while it moves from the giver's hand to the receiver's.
export const heldBy = (frame: number, prop: { on?: 'hand' | 'floor'; actor?: number; give?: { at: number; to: number } }): { actor: number; travel: number } => {
  const giver = prop.actor ?? 0
  const g = prop.give
  if (!g || frame < g.at) return { actor: giver, travel: 0 }
  if (frame >= g.at + GIVE_FRAMES) return { actor: g.to, travel: 1 }
  const x = (frame - g.at) / GIVE_FRAMES
  return { actor: x < 0.5 ? giver : g.to, travel: x * x * (3 - 2 * x) }
}
