// ============================================================
// CHARACTER — the owner-approved front-facing figure, now with
// jointed arms AND legs. Drawn in neck-origin coordinates (same
// numbers as the approved spike), then shifted so the origin sits
// between the feet: place it with <g transform="translate(x y)">.
// ============================================================

import React from 'react'
import { useUid } from '../uid'
import { Face as DefaultFace } from './faces'
import { HERO, type Look } from './looks'
import { type ArmPose, footDrop, type HandShape, type LegPose, type Pose, SKELETON } from './pose'

// # Tapered capsule along +y: width w1 at the joint, w2 at length L
export const capsule = (L: number, w1: number, w2: number) =>
  `M${-w1 / 2} 0 L${-w2 / 2} ${L} A${w2 / 2} ${w2 / 2} 0 0 0 ${w2 / 2} ${L} L${w1 / 2} 0 A${w1 / 2} ${w1 / 2} 0 0 0 ${-w1 / 2} 0 Z`

// # Optional slot so faces (Task 4) can be drawn inside the head
export type FaceSlot = React.FC<{ expression: Pose['expression']; look: Look }>

const Hand: React.FC<{ shape: HandShape; look: Look }> = ({ shape }) => {
  const skin = '#1B2D44', edge = '#2A5A86'
  if (shape === 'fist') return <ellipse rx={15} ry={15} fill={skin} stroke={edge} strokeWidth={2} />
  return (
    <g>
      {shape === 'open'
        ? <ellipse rx={22} ry={15} fill={skin} stroke={edge} strokeWidth={2} />
        : <ellipse rx={17} ry={18} fill={skin} stroke={edge} strokeWidth={2} />}
      {shape === 'point' && <path d={capsule(30, 11, 9)} transform="translate(-4 10)" fill={skin} stroke={edge} strokeWidth={2} />}
      {shape === 'chin' && <path d={capsule(22, 10, 8)} transform="translate(8 -8) rotate(150)" fill={skin} stroke={edge} strokeWidth={2} />}
      {shape === 'hold' && <path d={capsule(18, 10, 9)} transform="translate(12 -4) rotate(-120)" fill={skin} stroke={edge} strokeWidth={2} />}
    </g>
  )
}

const Arm: React.FC<{ a: ArmPose; side: 1 | -1; look: Look }> = ({ a, side, look }) => {
  const L1 = SKELETON.upperArm * a.up, L2 = SKELETON.foreArm * a.fo
  return (
    <g transform={`rotate(${a.sh})`}>
      <path d={capsule(L1, 46, 40)} fill={look.sleeve[0]} stroke={look.outline} strokeWidth={3} />
      <path d={`M${side * 19} 14 L${side * 16} ${Math.max(14, L1 - 6)}`} stroke={look.rim} strokeWidth={3} opacity={0.6} strokeLinecap="round" />
      <g transform={`translate(0 ${L1}) rotate(${a.el})`}>
        <path d={capsule(L2, 40, 34)} fill={look.sleeve[1]} stroke={look.outline} strokeWidth={3} />
        <path d={`M${side * 16} 10 L${side * 14} ${Math.max(10, L2 - 8)}`} stroke={look.rim} strokeWidth={3} opacity={0.6} strokeLinecap="round" />
        <rect x={-19} y={L2 - 8} width={38} height={10} rx={5} fill={look.collar} />
        <g transform={`translate(0 ${L2 + SKELETON.handOffset})`}><Hand shape={a.hand} look={look} /></g>
      </g>
    </g>
  )
}

const Leg: React.FC<{ g: LegPose; pants: string }> = ({ g, pants }) => {
  const L1 = SKELETON.thigh * g.up, L2 = SKELETON.shin * g.lo
  return (
    <g transform={`rotate(${g.hip})`}>
      <path d={capsule(L1 + 6, 70, 58)} fill={pants} />
      <g transform={`translate(0 ${L1}) rotate(${g.knee})`}>
        <path d={capsule(L2, 58, 46)} fill={pants} />
        {/* # Shoe */}
        <path d={`M-28 ${L2 - 2} Q0 ${L2 - 14} 30 ${L2 - 2} L32 ${L2 + 14} L-32 ${L2 + 14} Z`} fill="#05080F" />
      </g>
    </g>
  )
}

// # `frame` is passed in (not useCurrentFrame) so the art renders anywhere,
// # including tests and stills — library convention.
export const Character: React.FC<{ pose: Pose; frame?: number; look?: Look; Face?: FaceSlot; breathe?: boolean }> = ({
  pose: p, frame: f = 0, look = HERO, Face = DefaultFace, breathe = true,
}) => {
  const jacket = useUid('jacket'), head = useUid('head'), pants = useUid('pants')
  const b = breathe ? Math.sin(f / 18) * 0.8 : 0
  const S = SKELETON
  return (
    <g transform={`translate(0 ${-footDrop(p) + p.bob})`}>
      <defs>
        <linearGradient id={jacket} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={look.jacket[0]} /><stop offset="55%" stopColor={look.jacket[1]} /><stop offset="100%" stopColor={look.jacket[2]} />
        </linearGradient>
        <linearGradient id={head} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={look.skin[0]} /><stop offset="100%" stopColor={look.skin[1]} />
        </linearGradient>
        <linearGradient id={pants} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={look.pants[0]} /><stop offset="100%" stopColor={look.pants[1]} />
        </linearGradient>
      </defs>
      {/* # Legs behind the jacket */}
      <g transform={`translate(${S.hipL.x} ${S.hipL.y})`}><Leg g={p.ll} pants={`url(#${pants})`} /></g>
      <g transform={`translate(${S.hipR.x} ${S.hipR.y})`}><Leg g={p.rl} pants={`url(#${pants})`} /></g>
      <g transform={`rotate(${p.lean} ${S.hipCentre.x} ${S.hipCentre.y})`}>
        {/* # Jacket torso (breathing) */}
        <g transform={`translate(0 ${b})`}>
          <path d="M-100 40 Q0 0 100 40 L92 280 Q0 300 -92 280 Z" fill={`url(#${jacket})`} />
          <path d="M-100 40 Q-108 160 -92 280 L-70 280 Q-82 160 -74 52 Z" fill={look.jacketShade} opacity={0.6} />
          <path d="M-22 18 L0 96 L22 18 L12 14 L0 60 L-12 14 Z" fill={look.collar} />
          <path d="M-6 30 L0 92 L6 30 Z" fill={look.tie} />
          {look.accessory === 'apron' && (
            <g data-accessory="apron">
              <path d="M-62 104 L62 104 L70 292 Q0 304 -70 292 Z" fill="#F2E9DA" />
              <path d="M-62 104 L-34 30 M62 104 L34 30" stroke="#F2E9DA" strokeWidth={8} />
              <rect x={-30} y={170} width={60} height={42} rx={6} fill="none" stroke="#D8CBB4" strokeWidth={4} />
            </g>
          )}
        </g>
        {/* # Neck + head */}
        <rect x={-17} y={-30} width={34} height={44} fill="#0E1B2C" />
        <g transform={`rotate(${Math.sin(f / 40) * 2 + p.head} 0 -80)`}>
          <ellipse cx={0} cy={-88} rx={50} ry={60} fill={`url(#${head})`} />
          <path d="M44 -110 Q56 -80 42 -46" stroke={look.rim} strokeWidth={3} fill="none" opacity={0.8} />
          <g data-hair={look.hair}>
            {look.hair === 'short' && <path d="M-52 -96 Q-48 -156 4 -152 Q52 -150 52 -100 Q36 -128 0 -128 Q-30 -126 -52 -96 Z" fill={look.hairColor} />}
            {look.hair === 'long' && <path d="M-54 -60 Q-62 -150 2 -154 Q58 -152 54 -84 Q48 -126 4 -132 Q-36 -130 -44 -96 Q-46 -76 -54 -60 Z" fill={look.hairColor} />}
            {look.hair === 'cap' && <path d="M-54 -104 Q-50 -158 4 -156 Q54 -154 54 -108 L96 -104 Q98 -96 50 -98 L-54 -96 Z" fill={look.jacket[1]} />}
            {look.hair === 'bald' && <path d="M-30 -138 Q0 -150 30 -138" stroke={look.rim} strokeWidth={3} fill="none" opacity={0.35} />}
          </g>
          {look.accessory === 'hardhat' && (
            <g data-accessory="hardhat">
              <path d="M-58 -112 Q-56 -170 2 -172 Q60 -170 60 -112 Z" fill="#F7C531" />
              <rect x={-70} y={-116} width={140} height={14} rx={7} fill="#E0A912" />
              <path d="M-30 -160 Q2 -170 34 -160" stroke="#FFE38A" strokeWidth={5} fill="none" strokeLinecap="round" />
            </g>
          )}
          <ellipse cx={-50} cy={-84} rx={8} ry={14} fill="#0E1B2C" />
          {look.glasses && (
            <g>
              <circle cx={-16} cy={-84} r={15} fill="rgba(160,215,255,0.08)" stroke="#9FD8FF" strokeWidth={3} />
              <circle cx={22} cy={-84} r={15} fill="rgba(160,215,255,0.08)" stroke="#9FD8FF" strokeWidth={3} />
              <line x1={-1} x2={7} y1={-84} y2={-84} stroke="#9FD8FF" strokeWidth={3} />
            </g>
          )}
          <Face expression={p.expression} look={look} />
        </g>
        {/* # Arms on top: left first, right (the gesturing arm) over it */}
        <g transform={`translate(0 ${b})`}>
          <g transform={`translate(${S.shoulderL.x} ${S.shoulderL.y})`}><Arm a={p.l} side={-1} look={look} /></g>
          <g transform={`translate(${S.shoulderR.x} ${S.shoulderR.y})`}><Arm a={p.r} side={1} look={look} /></g>
        </g>
      </g>
    </g>
  )
}
