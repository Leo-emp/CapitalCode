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

const Eye: React.FC<{ cx: number; spec: FaceSpec; blink?: number }> = ({ cx, spec, blink = 0 }) => {
  const cy = -100
  // # blink (idle life): a mostly-closed eye is a soft lid curve
  if (blink >= 0.9 && spec.eye !== 'happy') return <path d={`M${cx - 11} ${cy + 1} Q${cx} ${cy + 6} ${cx + 11} ${cy + 1}`} stroke={LINE} strokeWidth={4} fill="none" strokeLinecap="round" />
  if (spec.eye === 'happy') return <path d={`M${cx - 9} ${cy + 2} Q${cx} ${cy - 9} ${cx + 9} ${cy + 2}`} stroke={LINE} strokeWidth={4} fill="none" strokeLinecap="round" />
  const rx = 11.5, ry = (spec.eye === 'wide' ? 15 : spec.eye === 'squint' ? 8 : 13) * (1 - blink * 0.8)
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

export const FaceHD: React.FC<{ expression: ExpressionId; brow?: string; blink?: number }> = ({ expression, brow: browColor = BROW, blink = 0 }) => {
  const s = FACES[expression]
  const brow = (x1: number, x2: number, y: [number, number]) =>
    <path d={`M${x1} ${y[0]} Q${(x1 + x2) / 2} ${(y[0] + y[1]) / 2 + s.browArc} ${x2} ${y[1]}`} stroke={browColor} strokeWidth={4.5} strokeLinecap="round" fill="none" />
  return (
    <g data-expression={expression}>
      <g transform="translate(0 -3)">{brow(-28, -4, s.browL)}{brow(14, 38, s.browR)}</g>
      <Eye cx={-15} spec={s} blink={blink} /><Eye cx={25} spec={s} blink={blink} />
      <path d="M6 -90 Q11 -80 5 -76" stroke="#0E1730" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={s.mouth} stroke={s.mouthFill === '#F4F7FC' ? 'none' : LINE} strokeWidth={3.5} fill={s.mouthFill ?? 'none'} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

// ------------------------------------------------------------
// HEAD — oval with jaw, ears, hair styles, glasses
// ------------------------------------------------------------
const Head: React.FC<{ look: LookHD; expression: ExpressionId; tilt: number; u: (n: string) => string; blink?: number }> = ({ look, expression, tilt, u, blink }) => (
  <g transform={`rotate(${tilt} 4 -60)`}>
    <defs>
      <linearGradient id={u('face')} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={look.skin[0]} /><stop offset="100%" stopColor={look.skin[1]} /></linearGradient>
    </defs>
    {look.hair === 'bun' && <g><circle cx={-44} cy={-142} r={26} fill={look.hairColor[0]} /><path d="M-66 -150 C-60 -170 -36 -172 -24 -158" stroke={look.hairColor[1]} strokeWidth={4} fill="none" /></g>}
    <ellipse cx={-47} cy={-96} rx={9} ry={14} fill={look.skin[1]} /><ellipse cx={55} cy={-96} rx={9} ry={14} fill={look.skin[1]} />
    <path d="M-46 -104 C-46 -150 -14 -170 8 -168 C42 -166 56 -136 54 -104 C54 -72 44 -50 26 -40 C14 -33 -4 -33 -16 -40 C-34 -50 -46 -74 -46 -104 Z" fill={`url(#${u('face')})`} />
    <path d="M-44 -116 C-46 -80 -36 -52 -16 -40" stroke={look.rim} strokeWidth={3} fill="none" opacity={0.55} />
    {/* # Hair — sculpted chunks with highlight strands and an edge light, after the reference sheet */}
    {look.hair === 'swoop' && <g>
      <path d="M-50 -96 C-58 -132 -50 -166 -22 -182 C2 -196 40 -196 58 -176 C70 -160 66 -130 58 -106 L54 -96 C50 -118 40 -128 26 -132 C8 -136 -14 -132 -30 -122 C-40 -116 -46 -106 -50 -96 Z" fill={look.hairColor[0]} />
      <path d="M-46 -122 C-50 -158 -22 -188 14 -192 C-8 -178 -16 -160 -18 -138 C-28 -136 -38 -130 -46 -122 Z" fill={look.hairColor[0]} />
      <path d="M-22 -140 C-16 -178 16 -204 52 -196 C30 -184 20 -168 16 -146 C4 -148 -10 -146 -22 -140 Z" fill={look.hairColor[0]} />
      <path d="M12 -148 C22 -184 54 -198 76 -170 C58 -170 44 -160 38 -142 C30 -146 20 -148 12 -148 Z" fill={look.hairColor[0]} />
      <path d="M-36 -146 C-26 -170 -8 -182 10 -186" stroke={look.hairColor[1]} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-6 -160 C8 -182 30 -192 48 -190" stroke={look.hairColor[1]} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M24 -164 C38 -180 56 -182 68 -172" stroke={look.hairColor[1]} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M58 -176 C70 -160 66 -130 58 -106" stroke={look.hairColor[1]} strokeWidth={3} fill="none" opacity={0.8} />
      <path d="M-50 -98 C-52 -88 -50 -80 -46 -76" stroke={look.hairColor[0]} strokeWidth={7} strokeLinecap="round" /></g>}
    {look.hair === 'side' && <g>
      <path d="M-50 -96 C-56 -140 -30 -178 8 -180 C46 -182 66 -156 60 -110 L56 -96 C52 -122 40 -134 18 -138 L-30 -134 C-40 -124 -46 -112 -50 -96 Z" fill={look.hairColor[0]} />
      <path d="M-30 -150 C-10 -174 30 -182 56 -158 C40 -160 22 -156 4 -146 C-8 -142 -20 -142 -30 -150 Z" fill={look.hairColor[0]} />
      <path d="M-30 -150 L-26 -176" stroke="#0A1020" strokeWidth={3} strokeLinecap="round" />
      <path d="M-18 -164 C4 -178 32 -178 52 -160" stroke={look.hairColor[1]} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M-50 -98 C-54 -120 -48 -140 -34 -152 L-28 -140 C-38 -128 -42 -114 -42 -98 Z" fill={look.hairColor[1]} opacity={0.8} />
      <path d="M56 -98 C60 -120 54 -140 40 -152 L34 -140 C44 -128 48 -114 48 -98 Z" fill={look.hairColor[1]} opacity={0.8} />
      <path d="M8 -180 C40 -182 62 -160 60 -112" stroke={look.hairColor[1]} strokeWidth={3} fill="none" opacity={0.8} /></g>}
    {look.hair === 'slick' && <g>
      <path d="M-50 -96 C-58 -142 -26 -184 12 -184 C50 -184 68 -152 60 -106 L56 -96 C52 -122 36 -136 12 -138 C-14 -138 -36 -124 -50 -96 Z" fill={look.hairColor[0]} />
      {[[-40, -150, -30, -186, -12, -150], [-22, -156, -6, -196, 10, -156], [-2, -158, 18, -198, 30, -154], [18, -154, 44, -190, 50, -146], [34, -146, 64, -172, 60, -128]].map(([x1, y1, cx, cy, x2, y2], k) => (
        <path key={k} d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} Z`} fill={look.hairColor[0]} />))}
      {[[-32, -154, -26, -168], [-12, -158, -6, -174], [8, -160, 14, -176], [28, -154, 36, -168]].map(([x1, y1, x2, y2], k) => (
        <path key={k} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={look.hairColor[1]} strokeWidth={4} strokeLinecap="round" />))}
      <path d="M12 -184 C50 -184 68 -152 60 -106" stroke={look.hairColor[1]} strokeWidth={3} fill="none" opacity={0.8} /></g>}
    {look.hair === 'bun' && <g>
      <path d="M58 -100 C64 -150 30 -182 -6 -180 C-36 -178 -56 -150 -54 -104 C-44 -138 -12 -152 22 -142 C38 -136 52 -122 58 -100 Z" fill={look.hairColor[0]} />
      <path d="M-50 -110 C-40 -150 0 -164 40 -150 C20 -148 -8 -140 -26 -122 C-36 -114 -44 -108 -50 -110 Z" fill={look.hairColor[0]} />
      <path d="M58 -102 C64 -80 60 -58 50 -46" stroke={look.hairColor[0]} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M-6 -180 C-36 -178 -56 -150 -54 -104" stroke={look.hairColor[1]} strokeWidth={4} fill="none" />
      <path d="M58 -100 C64 -150 30 -182 -6 -180" stroke={look.hairColor[1]} strokeWidth={4} fill="none" />
      <path d="M-24 -160 C0 -172 24 -168 40 -152" stroke={look.hairColor[1]} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} /></g>}
    {look.hair === 'none' && <g>
      <path d="M-50 -110 L-48 -86 L-42 -88 L-42 -112 Z M54 -110 L52 -86 L46 -88 L46 -112 Z" fill={look.hairColor[0]} /></g>}
    <FaceHD expression={expression} brow={look.brow} blink={blink} />
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
      <path d={capsule(L1 + 8, 58, 48)} fill={fill} />
      <g transform={`translate(0 ${L1}) rotate(${g.knee})`}>
        <path d={capsule(L2, 48, 42)} fill={fill} />
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
      <path d="M-44 4 L48 4 L46 262 L-42 262 Z" fill={look.tee} />
      <path d="M12 4 L48 4 L46 262 L18 262 Z" fill="#000" opacity={0.08} />
      <rect x={-48} y={258} width={98} height={16} rx={3} fill={look.pants[1]} />
      <rect x={-6} y={260} width={14} height={12} rx={2} fill="#9AA6B8" opacity={0.7} />
      {look.tie && <path d="M-2 14 L10 14 L14 30 L8 150 L2 164 L-4 150 L-8 30 Z" fill={look.tie} />}
      {look.top === 'shirt' && <path d="M-26 0 L4 24 L32 0 L40 14 L4 40 L-34 14 Z" fill={hi} />}
      {/* # Left panel (lit), right panel (shadow) */}
      <path d={look.top === 'shirt'
        ? 'M-30 2 C-74 8 -104 24 -108 68 C-110 120 -98 168 -90 200 C-92 236 -96 262 -98 282 L-10 284 L-6 40 Z'
        : 'M-38 2 C-78 8 -106 24 -110 68 C-112 120 -98 168 -88 200 C-90 236 -94 262 -96 284 L-18 288 L-14 150 Z'} fill={base} />
      <path d={look.top === 'shirt'
        ? 'M36 2 C80 8 110 24 114 68 C116 120 104 168 96 200 C98 236 102 262 104 282 L16 284 L12 40 Z'
        : 'M44 2 C84 8 112 24 116 68 C118 120 104 168 94 200 C96 236 100 262 102 284 L24 288 L20 150 Z'} fill={sh} />
      {/* # soft fold under the chest and at the waist */}
      <path d="M-84 150 C-70 160 -52 164 -36 162" stroke={sh} strokeWidth={3} fill="none" opacity={0.45} />
      <path d="M90 196 C78 204 62 206 50 204" stroke="#000" strokeWidth={3} fill="none" opacity={0.18} />
      {look.top === 'blazer' && <g>
        {/* # Lapels */}
        <path d="M-38 2 L-26 2 L-12 112 L-30 70 L-50 60 Z" fill={hi} opacity={0.9} />
        <path d="M44 2 L32 2 L18 112 L36 70 L56 60 Z" fill={base} opacity={0.9} />
        {/* # Pockets + button */}
        <path d="M-84 226 L-44 230" stroke={sh} strokeWidth={4} strokeLinecap="round" /><path d="M34 230 L76 226" stroke={hi} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
        <circle cx={-15} cy={196} r={4} fill={sh} /></g>}
      {look.top === 'hivis' && <g fill="#F4E8C8" opacity={0.9}>
        <rect x={-100} y={170} width={84} height={14} /><rect x={22} y={170} width={84} height={14} />
        <rect x={-60} y={10} width={14} height={160} /><rect x={50} y={10} width={14} height={160} /></g>}
      {/* # Rim light on the lit edge */}
      <path d="M-110 70 C-112 120 -98 168 -88 200 C-90 236 -94 262 -96 284" stroke={look.rim} strokeWidth={4} fill="none" opacity={0.6} />
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
// # life (optional): blink 0–1, breath −1..1, headTurn degrees — from art/motion/life idleLife()
export const CharacterHD: React.FC<{ pose: Pose; look?: LookHD; frame?: number; breathe?: boolean; life?: { blink: number; breath: number; headTurn: number } }> = ({ pose: p, look = LOOKS_HD.hero, frame: f = 0, breathe = true, life }) => {
  const base = useUid('chd')
  const u = (n: string) => `${base}-${n}`
  const S = HD_SKELETON
  const b = life ? life.breath * 1.4 : breathe ? Math.sin(f / 18) * 0.8 : 0
  const crossed = p.r.hand === 'fist' && p.l.hand === 'fist' && Math.abs(p.r.el) > 80
  return (
    <g transform={`translate(0 ${-footDrop(p, S) + p.bob})`}>
      <g transform={`translate(${S.hipL.x} ${S.hipL.y})`}><Leg g={{ ...p.ll, hip: p.ll.hip + 5 }} look={look} side={-1} /></g>
      <g transform={`translate(${S.hipR.x} ${S.hipR.y})`}><Leg g={{ ...p.rl, hip: p.rl.hip - 5 }} look={look} side={1} /></g>
      <g transform={`rotate(${p.lean} ${S.hipCentre.x} ${S.hipCentre.y})`}>
        {/* # Arms that hang behind the body when crossed are drawn first */}
        <g transform={`translate(0 ${b})`}><Torso look={look} /></g>
        <path d="M-16 -30 L18 -30 L20 14 L-16 14 Z" fill={look.skin[1]} />
        <g transform="translate(0 26) scale(1.14) translate(0 -4)"><Head look={look} expression={p.expression} tilt={(life ? life.headTurn : Math.sin(f / 40) * 1.5) + p.head} u={u} blink={life?.blink} /></g>
        <g transform={`translate(0 ${b})`}>
          <g transform={`translate(${S.shoulderL.x} ${S.shoulderL.y})`}><Arm a={p.l} side={-1} look={look} /></g>
          <g transform={`translate(${S.shoulderR.x} ${S.shoulderR.y})`}><Arm a={p.r} side={1} look={look} /></g>
          {crossed && <path d="M-70 186 Q2 168 74 182" stroke={look.rim} strokeWidth={2} fill="none" opacity={0.3} />}
        </g>
      </g>
    </g>
  )
}

