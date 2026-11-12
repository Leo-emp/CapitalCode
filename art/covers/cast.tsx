// ============================================================
// COVER CAST — the hero, other characters, library objects and
// hand-drawn parts, each reporting its box to the cover gate.
// ============================================================
import React from 'react'
import { Actor, actorHeight, heldPoint } from '../rig/Actor'
import { getPose, type ExpressionId, type PoseId } from '../rig/pose'
import { getProp } from '../props/registry'
import { type BoxKind, Shadow, useReport } from './kit'

// # x, y = the point between the feet (may sit below the canvas for a close-up). main = THE hero (one per cover).
export const Hero: React.FC<{ name?: string; who?: string; pose: PoseId; expression: ExpressionId; x: number; y: number; scale: number
  flip?: boolean; main?: boolean; touches?: string[]
  hold?: (hand: { x: number; y: number }) => React.ReactNode }> = ({ name = 'hero', who = 'hero', pose, expression, x, y, scale, flip, main = true, touches, hold }) => {
  const report = useReport()
  const p = getPose(pose)
  const H = actorHeight(p, scale), bw = H * 0.46
  const fh = H * 0.22, fw = fh * 0.95 // # the HD head is the top ≈ 22 % of the figure
  report({ name, kind: main ? 'hero' : 'extra', x: x - bw / 2, y: y - H, w: bw, h: H, touches, info: { pose, expression, who } })
  if (main) report({ name: `${name}-face`, kind: 'face', x: x - fw / 2, y: y - H, w: fw, h: fh, info: { expression } })
  // # hold: draws a thing in the right hand, in front of the body
  return <g><Actor who={who} pose={{ ...p, expression }} x={x} y={y} scale={scale} breathe={false} flip={flip} />{hold?.(heldPoint(p, { x, y, scale }, flip))}</g>
}

// # a library prop as a main object (centre x, y)
export const Thing: React.FC<{ name: string; prop: string; x: number; y: number; size: number; rotate?: number; kind?: 'object' | 'extra' | 'scenery'
  shadow?: boolean; touches?: string[] }> = ({ name, prop, x, y, size, rotate = 0, kind = 'object', shadow = true, touches }) => {
  // # library props leave ≈ 12 % padding inside their box: report the drawn part
  const d = size * 0.76
  useReport()({ name, kind, x: x - d / 2, y: y - d / 2, w: d, h: d, touches, info: { prop } })
  const C = getProp(prop).Component
  return <g transform={`rotate(${rotate} ${x} ${y})`}>
    {shadow && <Shadow x={x} y={y + size * 0.5} w={size * 0.8} />}
    <C size={size} x={x - size / 2} y={y - size / 2} frame={0} />
  </g>
}

// # anything hand-drawn in the cover file: wrap it so the gate knows its box (x, y = top-left)
export const Part: React.FC<{ name: string; kind: BoxKind; x: number; y: number; w: number; h: number; touches?: string[]; children: React.ReactNode }> = ({ name, kind, x, y, w, h, touches, children }) => {
  useReport()({ name, kind, x, y, w, h, touches })
  return <g data-part={name}>{children}</g>
}
