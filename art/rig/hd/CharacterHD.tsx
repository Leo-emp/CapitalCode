// ============================================================
// CHARACTER HD — the owner's reference style (2026-10-24 sheets
// "Five Roles, One Vision" + "Seven Expressions"): natural
// proportions, open blazer over a white tee, real eyes, volume
// hair, two-tone cel shading with a rim light, proper shoes.
// Same joints and poses as the v1 rig (art/rig/pose.ts), so pose
// tracks, cue timing and forward kinematics keep working.
// Drawn in neck-origin coordinates; the origin ends up between
// the feet (place with translate(x y)).
// ============================================================

import React from 'react'
import { useUid } from '../../uid'
import { type ArmPose, type ExpressionId, footDrop, type HandShape, type LegPose, type Pose, SKELETON, type Skeleton } from '../pose'

// # Longer legs and a smaller head than v1 (≈ 1 : 6.6 head-to-body)
export const HD_SKELETON: Skeleton = {
  ...SKELETON,
  shoulderR: { x: 92, y: 50 }, shoulderL: { x: -92, y: 50 },
  hipR: { x: 40, y: 270 }, hipL: { x: -40, y: 270 }, hipCentre: { x: 0, y: 270 },
  upperArm: 132, foreArm: 150, handOffset: 16, thigh: 170, shin: 168, foot: 18,
}

export type LookHD = {
  top: 'blazer' | 'shirt' | 'hivis'
  jacket: [string, string, string]   // # highlight, base, shadow
  tee: string                        // # shirt/tee showing in the opening
  tie?: string
  pants: [string, string]            // # base, shadow
  shoes: 'sneaker' | 'dress' | 'boot'
  skin: [string, string]             // # face base, shadow
  hair: 'swoop' | 'side' | 'slick' | 'bun' | 'none'
  hairColor: [string, string]        // # base, highlight
  glasses: boolean
  rim: string
  brow?: string                     // # eyebrow colour (default light blue)
  apron?: boolean
  hardhat?: boolean
}

export const LOOKS_HD: Record<string, LookHD> = {
  hero: { top: 'blazer', jacket: ['#5CC6FF', '#2B8FE0', '#1A62B0'], tee: '#EEF3FA', pants: ['#1C3466', '#132449'], shoes: 'sneaker',
    skin: ['#1E2F55', '#15213F'], hair: 'swoop', hairColor: ['#13306B', '#3E6FD0'], glasses: true, rim: '#7FD0FF' },
  buyer: { top: 'blazer', jacket: ['#B8C0CA', '#8C96A3', '#646E7B'], tee: '#F2F4F7', tie: '#E0464B', pants: ['#2A2F38', '#1D2128'], shoes: 'dress',
    skin: ['#1F2B4A', '#161F37'], hair: 'side', hairColor: ['#1A2134', '#5A6680'], glasses: false, brow: '#E8B48A', rim: '#D8E2EE' },
  investor: { top: 'blazer', jacket: ['#3A4E9A', '#22306E', '#151F4E'], tee: '#F2F4F7', pants: ['#1B2450', '#121939'], shoes: 'dress',
    skin: ['#1F2B4A', '#161F37'], hair: 'slick', hairColor: ['#1A1636', '#4B3E8A'], glasses: false, brow: '#E8B48A', rim: '#7F8FEF' },
  owner: { top: 'shirt', jacket: ['#48B87A', '#2A8C57', '#1D6640'], tee: '#EEF3FA', pants: ['#232634', '#191B25'], shoes: 'dress',
    skin: ['#1F2B4A', '#161F37'], hair: 'bun', hairColor: ['#101A2C', '#2E6E5A'], glasses: false, brow: '#E8B48A', rim: '#9FE8C2', apron: true },
  worker: { top: 'hivis', jacket: ['#FFB04D', '#F38A1E', '#C76A0E'], tee: '#EEF3FA', pants: ['#26355C', '#1A2645'], shoes: 'boot',
    skin: ['#1F2B4A', '#161F37'], hair: 'none', hairColor: ['#101A2C', '#2A3550'], glasses: false, brow: '#E8B48A', rim: '#FFD39E', hardhat: true },
}

export const getLookHD = (id: string): LookHD => {
  const l = LOOKS_HD[id]
  if (!l) throw new Error(`unknown HD look "${id}" (known: ${Object.keys(LOOKS_HD).join(', ')})`)
  return l
}

// # Tapered capsule along +y: width w1 at the joint, w2 at length L
const capsule = (L: number, w1: number, w2: number) =>
  `M${-w1 / 2} 0 L${-w2 / 2} ${L} A${w2 / 2} ${w2 / 2} 0 0 0 ${w2 / 2} ${L} L${w1 / 2} 0 A${w1 / 2} ${w1 / 2} 0 0 0 ${-w1 / 2} 0 Z`

// ------------------------------------------------------------
// FACE — white of the eye, pupil, highlight; light brows; small
// nose; mouth. Expression changes brows, lids and mouth.
// ------------------------------------------------------------
const BROW = '#8FC8F5', LINE = '#0B1326'
type FaceSpec = { browL: [number, number]; browR: [number, number]; browArc: number; eye: 'open' | 'wide' | 'happy' | 'lidded' | 'squint'; look: number; mouth: string; mouthFill?: string }
const FACES: Record<ExpressionId, FaceSpec> = {
  neutral: { browL: [-122, -120], browR: [-120, -122], browArc: -4, eye: 'open', look: 3, mouth: 'M-4 -63 Q10 -59 24 -65 Q16 -50 2 -56 Q-2 -59 -4 -63 Z', mouthFill: '#F4F7FC' },
  thinking: { browL: [-120, -120], browR: [-132, -126], browArc: -4, eye: 'open', look: 4, mouth: 'M2 -61 Q13 -58 23 -64 Q16 -52 5 -56 Z', mouthFill: '#F4F7FC' },
  shocked: { browL: [-130, -132], browR: [-132, -130], browArc: -6, eye: 'wide', look: 0, mouth: 'M-3 -60 A8 10 0 1 0 13 -60 A8 10 0 1 0 -3 -60', mouthFill: '#0A0F1E' },
  worried: { browL: [-114, -124], browR: [-124, -114], browArc: 2, eye: 'open', look: 0, mouth: 'M-6 -56 Q-1 -62 4 -58 Q9 -54 15 -60' },
  smiling: { browL: [-122, -124], browR: [-124, -122], browArc: -5, eye: 'happy', look: 0, mouth: 'M-8 -64 Q9 -59 26 -66 Q18 -45 0 -52 Q-6 -57 -8 -64 Z', mouthFill: '#F4F7FC' },
  smug: { browL: [-116, -116], browR: [-126, -122], browArc: -3, eye: 'lidded', look: 3, mouth: 'M2 -61 Q14 -59 24 -68 Q18 -54 4 -57 Z', mouthFill: '#F4F7FC' },
  angry: { browL: [-126, -114], browR: [-114, -126], browArc: 2, eye: 'squint', look: 0, mouth: 'M-6 -55 Q5 -63 16 -55' },
}

const Eye: React.FC<{ cx: number; spec: FaceSpec }> = ({ cx, spec }) => {
  const cy = -100
  if (spec.eye === 'happy') return <path d={`M${cx - 9} ${cy + 2} Q${cx} ${cy - 9} ${cx + 9} ${cy + 2}`} stroke={LINE} strokeWidth={4} fill="none" strokeLinecap="round" />
  const rx = 11.5, ry = spec.eye === 'wide' ? 15 : spec.eye === 'squint' ? 8 : 13
  const lid = spec.eye === 'lidded' ? 8 : spec.eye === 'squint' ? 4 : 0
  const pr = spec.eye === 'wide' ? 6.5 : 8          // # big dark pupil like the reference
  const px = cx + spec.look, py = cy + 1.5
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#F3F6FC" />
      <circle cx={px} cy={py} r={pr} fill={LINE} />
      <circle cx={px + 2.8} cy={py - 3.2} r={2.6} fill="#FFFFFF" />
      <circle cx={px - 2.4} cy={py + 2.6} r={1.1} fill="#FFFFFF" opacity={0.7} />
      {lid > 0 && <path d={`M${cx - rx - 1} ${cy - ry - 1} L${cx + rx + 1} ${cy - ry - 1} L${cx + rx + 1} ${cy - ry + lid + 4} Q${cx} ${cy - ry + lid + 8} ${cx - rx - 1} ${cy - ry + lid + 4} Z`} fill="#1E2F55" />}
      {/* # dark upper lash line */}
      <path d={`M${cx - rx - 1.5} ${cy - ry * 0.25 + (lid > 0 ? lid : 0)} Q${cx} ${cy - ry - 3 + (lid > 0 ? lid + 4 : 0)} ${cx + rx + 1.5} ${cy - ry * 0.35 + (lid > 0 ? lid : 0)}`} stroke={LINE} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    </g>
  )
}

export const FaceHD: React.FC<{ expression: ExpressionId; brow?: string }> = ({ expression, brow: browColor = BROW }) => {
  const s = FACES[expression]
  const brow = (x1: number, x2: number, y: [number, number]) =>
    <path d={`M${x1} ${y[0]} Q${(x1 + x2) / 2} ${(y[0] + y[1]) / 2 + s.browArc} ${x2} ${y[1]}`} stroke={browColor} strokeWidth={4.5} strokeLinecap="round" fill="none" />
  return (
    <g data-expression={expression}>
      <g transform="translate(0 -3)">{brow(-28, -4, s.browL)}{brow(14, 38, s.browR)}</g>
      <Eye cx={-15} spec={s} /><Eye cx={25} spec={s} />
      <path d="M6 -90 Q11 -80 5 -76" stroke="#0E1730" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={s.mouth} stroke={s.mouthFill === '#F4F7FC' ? 'none' : LINE} strokeWidth={3.5} fill={s.mouthFill ?? 'none'} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

// ------------------------------------------------------------
// HEAD — oval with jaw, ears, hair styles, glasses
// ------------------------------------------------------------
const Head: React.FC<{ look: LookHD; expression: ExpressionId; tilt: number; u: (n: string) => string }> = ({ look, expression, tilt, u }) => (
  <g transform={`rotate(${tilt} 4 -60)`}>
    <defs>
      <linearGradient id={u('face')} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={look.skin[0]} /><stop offset="100%" stopColor={look.skin[1]} /></linearGradient>
    </defs>
    {look.hair === 'bun' && <circle cx={-22} cy={-150} r={24} fill={look.hairColor[0]} />}
    <ellipse cx={-47} cy={-96} rx={9} ry={14} fill={look.skin[1]} /><ellipse cx={55} cy={-96} rx={9} ry={14} fill={look.skin[1]} />
    <path d="M-46 -104 C-46 -150 -14 -170 8 -168 C42 -166 56 -136 54 -104 C54 -72 44 -50 26 -40 C14 -33 -4 -33 -16 -40 C-34 -50 -46 -74 -46 -104 Z" fill={`url(#${u('face')})`} />
    <path d="M-44 -116 C-46 -80 -36 -52 -16 -40" stroke={look.rim} strokeWidth={3} fill="none" opacity={0.55} />
    {look.hair === 'swoop' && <g>
      <path d="M-50 -98 C-58 -128 -52 -162 -26 -178 C-4 -194 32 -196 52 -178 C68 -164 68 -138 60 -110 L54 -96 C52 -116 46 -126 36 -130 C22 -136 2 -134 -14 -126 C-30 -120 -42 -110 -50 -98 Z" fill={look.hairColor[0]} />
      <path d="M-40 -128 C-22 -156 14 -160 40 -140 C22 -142 4 -138 -12 -128 C-22 -124 -32 -122 -40 -128 Z" fill={look.hairColor[1]} opacity={0.55} />
      <path d="M-26 -170 C-2 -192 34 -190 54 -164" stroke={look.hairColor[1]} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.85} />
      <path d="M-6 -158 C10 -176 32 -176 46 -160" stroke={look.hairColor[1]} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} /></g>}
    {look.hair === 'side' && <g>
      <path d="M-50 -98 C-56 -146 -26 -180 12 -180 C48 -180 66 -152 58 -108 L54 -98 C52 -118 42 -130 22 -134 L-8 -128 C-26 -122 -40 -112 -50 -98 Z" fill={look.hairColor[0]} />
      <path d="M-20 -164 C6 -178 36 -174 52 -150" stroke={look.hairColor[1]} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.75} /></g>}
    {look.hair === 'slick' && <g>
      <path d="M-50 -98 C-58 -150 -20 -184 16 -182 C52 -180 68 -150 58 -106 L54 -98 C50 -122 36 -136 12 -138 C-14 -138 -36 -124 -50 -98 Z" fill={look.hairColor[0]} />
      <path d="M-24 -168 C8 -186 40 -176 54 -146" stroke={look.hairColor[1]} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} /></g>}
    {look.hair === 'bun' && <g>
      <path d="M-52 -96 C-58 -148 -24 -180 10 -178 C46 -178 66 -150 60 -100 C52 -124 34 -136 8 -136 C-18 -134 -40 -120 -52 -96 Z" fill={look.hairColor[0]} />
      <path d="M58 -104 C62 -80 58 -60 50 -50" stroke={look.hairColor[0]} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M-20 -164 C6 -176 34 -172 50 -150" stroke={look.hairColor[1]} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.75} /></g>}
    <FaceHD expression={expression} brow={look.brow} />
    {look.glasses && <g fill="rgba(160,215,255,0.07)" stroke="#8FD0FF" strokeWidth={3}>
      <circle cx={-15} cy={-100} r={17} /><circle cx={25} cy={-100} r={17} /><path d="M2 -102 Q5 -106 8 -102" fill="none" />
      <path d="M-32 -102 L-44 -104 M42 -102 L52 -104" fill="none" /></g>}
    {look.hardhat && <g>
      <path d="M-56 -118 C-56 -176 -14 -196 8 -196 C46 -196 66 -168 64 -118 Z" fill="#F7C531" />
      <rect x={-66} y={-122} width={142} height={14} rx={7} fill="#E0A912" />
      <path d="M-24 -184 C0 -196 34 -192 52 -170" stroke="#FFE38A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={2} y={-196} width={12} height={74} rx={5} fill="#E0A912" opacity={0.6} /></g>}
  </g>
)

// ------------------------------------------------------------
// HANDS — palm + fingers in skin tone
// ------------------------------------------------------------
const Hand: React.FC<{ shape: HandShape; skin: string; rim: string }> = ({ shape, skin, rim }) => {
  if (shape === 'pocket') return null
  const f = (x: number, len: number, rot: number, k: number) => <path key={k} d={capsule(len, 11, 9)} transform={`translate(${x} 10) rotate(${rot})`} fill={skin} />
  const fingers =
    shape === 'fist' ? [<rect key="f" x={-16} y={2} width={32} height={22} rx={10} fill={skin} />]
    : shape === 'point' ? [f(-4, 34, 0, 0), <rect key="r" x={0} y={4} width={20} height={18} rx={8} fill={skin} />]
    : shape === 'open' ? [-12, -4, 4, 12].map((x, k) => f(x * 1.2, 26, x * 2.2, k))
    : shape === 'chin' ? [-10, -2, 6].map((x, k) => f(x, 26, -16 + k * 6, k))
    : [-10, -3, 4, 11].map((x, k) => f(x, 22 - Math.abs(x) * 0.3, x * 0.6, k))
  return (
    <g>
      <ellipse cx={0} cy={4} rx={16} ry={16} fill={skin} />
      {fingers}
      {shape !== 'fist' && <path d={capsule(20, 11, 9)} transform={`translate(${shape === 'chin' ? 12 : -14} 2) rotate(${shape === 'open' ? 70 : shape === 'chin' ? -60 : 40})`} fill={skin} />}
      <path d="M14 -6 Q19 6 14 16" stroke={rim} strokeWidth={2} fill="none" opacity={0.5} />
    </g>
  )
}

// ------------------------------------------------------------
// ARM — sleeve in the jacket colours (or bare forearm for tees)
// ------------------------------------------------------------
const Arm: React.FC<{ a: ArmPose; side: 1 | -1; look: LookHD }> = ({ a, side, look }) => {
  const S = HD_SKELETON, L1 = S.upperArm * a.up, L2 = S.foreArm * a.fo
  const base = side === 1 ? look.jacket[2] : look.jacket[1]
  return (
    <g transform={`rotate(${a.sh})`}>
      <path d={capsule(L1, 50, 42)} fill={base} />
      <path d={`M${-side * 22} 10 L${-side * 18} ${Math.max(12, L1 - 4)}`} stroke={side === 1 ? look.jacket[1] : look.jacket[0]} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      <g transform={`translate(0 ${L1}) rotate(${a.el})`}>
        <path d={capsule(L2 + 4, 42, 36)} fill={base} />
        <path d={`M${-side * 18} 6 L${-side * 15} ${Math.max(8, L2 - 6)}`} stroke={side === 1 ? look.jacket[1] : look.jacket[0]} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
        {look.top === 'hivis' && <rect x={-20} y={L2 * 0.45} width={40} height={9} fill="#F4E8C8" opacity={0.85} />}
        {a.hand !== 'pocket' && <rect x={-17} y={L2 - 6} width={34} height={8} rx={4} fill={look.top === 'blazer' ? look.tee : look.jacket[2]} />}
        <g transform={`translate(0 ${L2 + S.handOffset})`}><Hand shape={a.hand} skin={look.skin[0]} rim={look.rim} /></g>
      </g>
    </g>
  )
}

const Leg: React.FC<{ g: LegPose; look: LookHD; side: 1 | -1 }> = ({ g, look, side }) => {
  const S = HD_SKELETON, L1 = S.thigh * g.up, L2 = S.shin * g.lo
  const fill = side === 1 ? look.pants[1] : look.pants[0]
  const shoe = look.shoes === 'sneaker'
    ? <g><path d={`M-26 ${L2 - 4} Q-6 ${L2 - 18} 30 ${L2 - 4} L36 ${L2 + 12} L-30 ${L2 + 12} Z`} fill="#EEF3FA" /><rect x={-31} y={L2 + 10} width={68} height={7} rx={3} fill="#C9D3E0" />
        <path d={`M-6 ${L2 - 8} L14 ${L2 - 6}`} stroke="#9FB2CA" strokeWidth={2} /></g>
    : look.shoes === 'boot'
      ? <path d={`M-28 ${L2 - 16} L28 ${L2 - 16} L34 ${L2 + 16} L-32 ${L2 + 16} Z`} fill="#2A2F3C" />
      : <path d={`M-24 ${L2 - 4} Q0 ${L2 - 14} 30 ${L2 - 2} L34 ${L2 + 12} L-28 ${L2 + 12} Z`} fill="#141824" />
  return (
    <g transform={`rotate(${g.hip})`}>
      <path d={capsule(L1 + 8, 62, 52)} fill={fill} />
      <g transform={`translate(0 ${L1}) rotate(${g.knee})`}>
        <path d={capsule(L2, 52, 44)} fill={fill} />
        <path d={`M${side * 8} -${L1 * 0.6} L${side * 6} ${L2 - 10}`} stroke={look.pants[side === 1 ? 0 : 1]} strokeWidth={2} opacity={0.5} />
        {look.top === 'hivis' && side === -1 && <rect x={-30} y={20} width={20} height={44} rx={3} fill={look.pants[1]} stroke={look.pants[0]} strokeWidth={2} />}
        <g transform={`translate(0 ${L2}) scale(1.3) translate(0 ${-L2})`}>{shoe}</g>
      </g>
    </g>
  )
}

// ------------------------------------------------------------
// TORSO — open blazer over a tee (or shirt / hi-vis jacket)
// ------------------------------------------------------------
const Torso: React.FC<{ look: LookHD }> = ({ look }) => {
  const [hi, base, sh] = look.jacket
  return (
    <g>
      {/* # Tee / shirt in the opening */}
      <path d="M-42 4 L46 4 L42 300 L-38 300 Z" fill={look.tee} />
      <path d="M12 4 L46 4 L42 300 L18 300 Z" fill="#000" opacity={0.08} />
      {look.tie && <path d="M-2 14 L10 14 L14 30 L8 150 L2 164 L-4 150 L-8 30 Z" fill={look.tie} />}
      {look.top === 'shirt' && <path d="M-26 0 L4 24 L32 0 L40 14 L4 40 L-34 14 Z" fill={hi} />}
      {/* # Left panel (lit), right panel (shadow) */}
      <path d={look.top === 'shirt' ? 'M-104 46 Q-98 12 -30 2 L-6 40 L-10 300 L-94 298 Q-108 170 -104 46 Z' : 'M-104 46 Q-98 12 -38 2 L-14 150 L-18 304 L-96 300 Q-110 170 -104 46 Z'} fill={base} />
      <path d={look.top === 'shirt' ? 'M108 46 Q102 12 36 2 L12 40 L16 300 L98 298 Q112 170 108 46 Z' : 'M108 46 Q102 12 44 2 L20 150 L24 304 L100 300 Q114 170 108 46 Z'} fill={sh} />
      {look.top === 'blazer' && <g>
        {/* # Lapels */}
        <path d="M-38 2 L-26 2 L-12 112 L-30 70 L-50 60 Z" fill={hi} opacity={0.9} />
        <path d="M44 2 L32 2 L18 112 L36 70 L56 60 Z" fill={base} opacity={0.9} />
        {/* # Pockets + button */}
        <path d="M-86 232 L-44 236" stroke={sh} strokeWidth={4} strokeLinecap="round" /><path d="M34 236 L78 232" stroke={hi} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
        <circle cx={-16} cy={200} r={4} fill={sh} /></g>}
      {look.top === 'hivis' && <g fill="#F4E8C8" opacity={0.9}>
        <rect x={-100} y={170} width={84} height={14} /><rect x={22} y={170} width={84} height={14} />
        <rect x={-60} y={10} width={14} height={160} /><rect x={50} y={10} width={14} height={160} /></g>}
      {/* # Rim light on the lit edge */}
      <path d="M-104 50 Q-110 170 -96 300" stroke={look.rim} strokeWidth={4} fill="none" opacity={0.6} />
      {look.apron && <g>
        <path d="M-66 110 L70 110 L78 330 Q4 344 -74 330 Z" fill="#F0E6D4" />
        <path d="M-60 110 L-34 6 M64 110 L38 6" stroke="#F0E6D4" strokeWidth={9} />
        <rect x={-30} y={190} width={64} height={46} rx={4} fill="none" stroke="#D2C2A6" strokeWidth={3} /></g>}
    </g>
  )
}

// ------------------------------------------------------------
// THE HD CHARACTER
// ------------------------------------------------------------
export const CharacterHD: React.FC<{ pose: Pose; look?: LookHD; frame?: number; breathe?: boolean }> = ({ pose: p, look = LOOKS_HD.hero, frame: f = 0, breathe = true }) => {
  const base = useUid('chd')
  const u = (n: string) => `${base}-${n}`
  const S = HD_SKELETON
  const b = breathe ? Math.sin(f / 18) * 0.8 : 0
  const crossed = p.r.hand === 'fist' && p.l.hand === 'fist' && Math.abs(p.r.el) > 80
  return (
    <g transform={`translate(0 ${-footDrop(p, S) + p.bob})`}>
      <g transform={`translate(${S.hipL.x} ${S.hipL.y})`}><Leg g={{ ...p.ll, hip: p.ll.hip + 5 }} look={look} side={-1} /></g>
      <g transform={`translate(${S.hipR.x} ${S.hipR.y})`}><Leg g={{ ...p.rl, hip: p.rl.hip - 5 }} look={look} side={1} /></g>
      <g transform={`rotate(${p.lean} ${S.hipCentre.x} ${S.hipCentre.y})`}>
        {/* # Arms that hang behind the body when crossed are drawn first */}
        <g transform={`translate(0 ${b})`}><Torso look={look} /></g>
        <path d="M-16 -30 L18 -30 L20 14 L-16 14 Z" fill={look.skin[1]} />
        <g transform="translate(0 26) scale(1.14) translate(0 -4)"><Head look={look} expression={p.expression} tilt={Math.sin(f / 40) * 1.5 + p.head} u={u} /></g>
        <g transform={`translate(0 ${b})`}>
          <g transform={`translate(${S.shoulderL.x} ${S.shoulderL.y})`}><Arm a={p.l} side={-1} look={look} /></g>
          <g transform={`translate(${S.shoulderR.x} ${S.shoulderR.y})`}><Arm a={p.r} side={1} look={look} /></g>
          {crossed && <path d="M-70 186 Q2 168 74 182" stroke={look.rim} strokeWidth={2} fill="none" opacity={0.3} />}
        </g>
      </g>
    </g>
  )
}

