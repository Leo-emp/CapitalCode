// ============================================================
// LONG VIDEO — "How Insurance Companies Actually Make Money" (in- pieces)
// This video's own world (owner rules r82/r83, drawn fresh): "Harbour Town".
// A little seaside town seen as a deep diorama: layered hills, sea with a
// shimmering horizon, terracotta roofs, a lighthouse. YOU run the insurer:
// a stone office with a striped umbrella sign. Money here is WATER:
// premiums are coins that pour into a stone RESERVOIR (the float), a CLAIMS
// pipe drains it, and a WATER WHEEL turned by the reservoir is the investing
// engine. The weather changes chapter by chapter: clear morning, bright noon,
// golden evening, night storm with hail, rainbow after, calm dusk.
// Only engine helpers are shared (timing, Person rig, Headline).
// House rules: every picture lands ON its word; one picture group at a time;
// labels sit next to the thing they name; nothing covers anything.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

// ------------------------------------------------------------ palette
export const C = {
  ink: '#1B2A33', inkSoft: '#4A5D68', sea: '#2E7D8C', seaD: '#1C5563', seaL: '#7FC3C9', foam: '#E8F6F3',
  sand: '#EED9B0', sandD: '#C9AE7C', roof: '#C8553D', roofD: '#8F3626', wall: '#F4EBDD', wallD: '#D6C8B2',
  grass: '#7DB36A', grassD: '#4F8A4A', hill: '#A9C98A', stone: '#B8B2A6', stoneD: '#7E786E', stoneL: '#DAD5CB',
  water: '#3FA7D6', waterD: '#1F6F9C', waterL: '#A9DDF2', gold: '#F3BE45', goldD: '#B5832A', goldL: '#FFE39A',
  red: '#D9483B', redD: '#9C2E25', green: '#3FA36B', greenD: '#24714A', greenL: '#BFE8CF', cream: '#FFF8EC', lamp: '#FFD36E',
  navy: '#17324A', slate: '#4B5A6E', plum: '#5B4C78',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }

// ------------------------------------------------------------ timing helpers of this kit
export const fadeIn = (f: number, a: number, d = 10) => (f < a - 2 ? 0 : Math.min(1, (f - (a - 2)) / d))
export const scene = (f: number, a: number, b: number, d = 10) => (f >= b + d + 2 ? 0 : fadeIn(f, a, d))

// ------------------------------------------------------------ gradients (fixed ids, in- prefix)
export const Defs: React.FC = () => (
  <defs>
    <linearGradient id="in-morning" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FC9E6" /><stop offset="0.65" stopColor="#D8EEF2" /><stop offset="1" stopColor="#FCEFD8" /></linearGradient>
    <linearGradient id="in-noon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5FB3E0" /><stop offset="0.7" stopColor="#BFE3F2" /><stop offset="1" stopColor="#EAF6F6" /></linearGradient>
    <linearGradient id="in-evening" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6B6FA8" /><stop offset="0.5" stopColor="#E59A7E" /><stop offset="1" stopColor="#FFD9A0" /></linearGradient>
    <linearGradient id="in-storm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A2230" /><stop offset="0.6" stopColor="#34435A" /><stop offset="1" stopColor="#56677D" /></linearGradient>
    <linearGradient id="in-after" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9FB8D4" /><stop offset="0.6" stopColor="#E4ECEF" /><stop offset="1" stopColor="#F7EEDC" /></linearGradient>
    <linearGradient id="in-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2C3A66" /><stop offset="0.55" stopColor="#8E6E9E" /><stop offset="1" stopColor="#F2B48A" /></linearGradient>
    <linearGradient id="in-seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.seaL} /><stop offset="1" stopColor={C.seaD} /></linearGradient>
    <linearGradient id="in-waterG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.waterL} /><stop offset="0.25" stopColor={C.water} /><stop offset="1" stopColor={C.waterD} /></linearGradient>
    <linearGradient id="in-stoneG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.stoneL} /><stop offset="1" stopColor={C.stoneD} /></linearGradient>
    <linearGradient id="in-goldG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.goldL} /><stop offset="0.5" stopColor={C.gold} /><stop offset="1" stopColor={C.goldD} /></linearGradient>
    <linearGradient id="in-redG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F07A6C" /><stop offset="1" stopColor={C.redD} /></linearGradient>
    <linearGradient id="in-greenG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FD3A0" /><stop offset="1" stopColor={C.greenD} /></linearGradient>
    <linearGradient id="in-paperG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFDF7" /><stop offset="1" stopColor="#EADFC8" /></linearGradient>
    <radialGradient id="in-sunG"><stop offset="0" stopColor="#FFF6C8" /><stop offset="0.5" stopColor="#FFE08A" stopOpacity="0.8" /><stop offset="1" stopColor="#FFE08A" stopOpacity="0" /></radialGradient>
    <radialGradient id="in-glow"><stop offset="0" stopColor="#FFF0B0" stopOpacity="0.95" /><stop offset="1" stopColor="#FFF0B0" stopOpacity="0" /></radialGradient>
    <radialGradient id="in-vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.35" /></radialGradient>
    <filter id="in-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
    <filter id="in-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0" /></filter>
  </defs>
)
export const Grain: React.FC = () => <g pointerEvents="none"><rect width={1920} height={1080} filter="url(#in-grain)" /><rect width={1920} height={1080} fill="url(#in-vig)" /></g>

// ------------------------------------------------------------ sky + weather
export type Sky = 'morning' | 'noon' | 'evening' | 'storm' | 'after' | 'dusk'
export const SkyBg: React.FC<{ sky: Sky; f: number; sun?: [number, number] | null }> = ({ sky, f, sun = [1560, 260] }) => (
  <g>
    <rect width={1920} height={1080} fill={`url(#in-${sky})`} />
    {sun && sky !== 'storm' && <g><circle cx={sun[0]} cy={sun[1]} r={230} fill="url(#in-sunG)" /><circle cx={sun[0]} cy={sun[1]} r={70} fill={sky === 'evening' || sky === 'dusk' ? '#FFC47A' : '#FFF3C4'} /></g>}
    {sky === 'dusk' && [...Array(40)].map((_, k) => <circle key={k} cx={rnd(k) * 1920} cy={rnd(k + 9) * 380} r={1.2 + rnd(k + 3) * 1.6} fill="#fff" opacity={0.4 + 0.4 * Math.sin(f / 9 + k)} />)}
    {[0, 1, 2, 3].map((k) => { const x = ((k * 560 + f * (0.25 + k * 0.08)) % 2400) - 240, y = 210 + (k % 2) * 90
      return <Cloud key={k} x={x} y={y} s={0.8 + 0.25 * (k % 3)} dark={sky === 'storm'} /> })}
  </g>
)
export const Cloud: React.FC<{ x: number; y: number; s?: number; dark?: boolean; o?: number }> = ({ x, y, s = 1, dark, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={22} rx={130} ry={26} fill="#000" opacity={0.08} />
    {[[-70, 0, 50], [-15, -26, 64], [50, -6, 52], [100, 10, 38]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill={dark ? (k % 2 ? '#5A6678' : '#4A5568') : (k % 2 ? '#FFFFFF' : '#F1F6F8')} />)}
    <rect x={-120} y={0} width={260} height={34} rx={17} fill={dark ? '#4A5568' : '#F1F6F8'} />
  </g>
)
export const Hail: React.FC<{ f: number; o: number; x0?: number; x1?: number }> = ({ f, o, x0 = 0, x1 = 1920 }) => o <= 0.01 ? null : (
  <g opacity={o}>{[...Array(90)].map((_, k) => { const x = lerp(x0, x1, rnd(k)), sp = 14 + rnd(k + 5) * 10, y = ((rnd(k + 2) * 1100 + f * sp) % 1100) - 40
    return <g key={k}><line x1={x + 6} y1={y - 26} x2={x} y2={y} stroke="#DCE6F0" strokeWidth={2} opacity={0.5} /><circle cx={x} cy={y} r={4 + rnd(k + 7) * 3} fill="#F4F8FC" /></g> })}</g>
)
export const Lightning: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => o <= 0.01 ? null : (
  <g opacity={o}><path d={`M${x} ${y} l-40 120 l38 -6 l-50 150 l100 -180 l-42 6 l40 -90 Z`} fill="#FFF6B0" /><circle cx={x} cy={y + 120} r={160} fill="url(#in-glow)" opacity={0.5} /></g>
)
export const Rainbow: React.FC<{ cx: number; cy: number; r: number; t: number }> = ({ cx, cy, r, t }) => t <= 0.01 ? null : (
  <g opacity={0.75}>{['#E5534B', '#F29B4B', '#F5D35A', '#7CC66B', '#4FA3D9', '#7B6CC4'].map((col, k) => <path key={k} d={`M${cx - r + k * 16} ${cy} A ${r - k * 16} ${r - k * 16} 0 0 1 ${cx + r - k * 16} ${cy}`} fill="none" stroke={col} strokeWidth={16} pathLength={1} strokeDasharray={`${t} 1`} />)}</g>
)

// ------------------------------------------------------------ the land: hills, sea, a strip of beach, ground at y=G
export const Land: React.FC<{ f: number; G?: number; night?: boolean; sea?: boolean }> = ({ f, G = 900, night, sea = true }) => (
  <g>
    {sea && <g><rect x={0} y={G - 250} width={1920} height={260} fill="url(#in-seaG)" opacity={night ? 0.7 : 1} />
      {[...Array(14)].map((_, k) => <path key={k} d={`M${(k * 160 + f * 0.6) % 2080 - 160} ${G - 230 + (k % 4) * 46} q 20 -8 40 0 t 40 0`} fill="none" stroke={C.foam} strokeWidth={3} opacity={0.5} />)}</g>}
    <path d={`M0 ${G - 170} C 260 ${G - 260} 520 ${G - 150} 760 ${G - 200} S 1240 ${G - 280} 1500 ${G - 190} S 1820 ${G - 230} 1920 ${G - 200} L1920 ${G + 200} L0 ${G + 200} Z`} fill={night ? '#3E5A4A' : C.hill} opacity={0.85} />
    <path d={`M0 ${G - 60} C 400 ${G - 110} 900 ${G - 40} 1300 ${G - 80} S 1800 ${G - 60} 1920 ${G - 70} L1920 ${G + 200} L0 ${G + 200} Z`} fill={night ? '#2F4A3A' : C.grass} />
    <rect x={0} y={G} width={1920} height={200} fill={night ? '#263D30' : C.grassD} />
    <rect x={0} y={G} width={1920} height={6} fill="#000" opacity={0.12} />
  </g>
)
export const Lighthouse: React.FC<{ x: number; y: number; s?: number; f: number; beam?: number }> = ({ x, y, s = 1, f, beam = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {beam > 0 && <path d={`M0 -230 L ${-500 * Math.cos(f / 20)} ${-260} L ${-500 * Math.cos(f / 20)} ${-200} Z`} fill={C.lamp} opacity={0.25 * beam} />}
    <path d="M-34 0 L-22 -210 L22 -210 L34 0 Z" fill={C.wall} /><path d="M-30 -70 L-27 -110 L27 -110 L30 -70 Z M-25 -150 L-23 -180 L23 -180 L25 -150 Z" fill={C.roof} />
    <path d="M6 0 L14 -210 L22 -210 L34 0 Z" fill="#000" opacity={0.12} />
    <rect x={-28} y={-246} width={56} height={36} rx={4} fill={C.lamp} stroke={C.ink} strokeWidth={4} /><path d="M-34 -246 L0 -276 L34 -246 Z" fill={C.roofD} />
  </g>
)
// # a terracotta-roof house; lit windows at night
export const House: React.FC<{ x: number; y: number; s?: number; tint?: string; lit?: number; o?: number }> = ({ x, y, s = 1, tint = C.wall, lit = 0, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={70} ry={10} fill="#000" opacity={0.15} />
    <rect x={-56} y={-90} width={112} height={90} fill={tint} /><rect x={20} y={-90} width={36} height={90} fill="#000" opacity={0.08} />
    <path d="M-68 -86 L0 -146 L68 -86 Z" fill={C.roof} /><path d="M0 -146 L68 -86 L40 -86 Z" fill={C.roofD} />
    <rect x={-40} y={-66} width={26} height={26} fill={lit ? C.lamp : '#8FB8C8'} stroke={C.ink} strokeWidth={3} /><rect x={14} y={-66} width={26} height={26} fill={lit ? C.lamp : '#8FB8C8'} stroke={C.ink} strokeWidth={3} />
    <rect x={-12} y={-34} width={24} height={34} fill={C.roofD} />
  </g>
)
// # YOUR insurer: a stone office with columns and a striped umbrella sign on the roof
export const Office: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string; glow?: number }> = ({ x, y, s = 1, o = 1, sign = 'HARBOUR INSURANCE', glow = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <circle cx={0} cy={-150} r={260} fill="url(#in-glow)" opacity={glow} />}
    <ellipse cx={0} cy={6} rx={210} ry={18} fill="#000" opacity={0.18} />
    <rect x={-180} y={-200} width={360} height={200} fill="url(#in-stoneG)" />
    <path d="M-200 -200 L0 -270 L200 -200 Z" fill={C.stoneL} stroke={C.stoneD} strokeWidth={4} />
    {[-130, -65, 0, 65, 130].map((cx) => <g key={cx}><rect x={cx - 14} y={-190} width={28} height={180} fill={C.wall} /><rect x={cx + 4} y={-190} width={10} height={180} fill="#000" opacity={0.1} /></g>)}
    <rect x={-200} y={-14} width={400} height={14} fill={C.stoneD} />
    <g transform="translate(0 -300)"><Umbrella x={0} y={0} s={0.8} /></g>
    <rect x={-150} y={-236} width={300} height={34} rx={6} fill={C.navy} /><text y={-210} textAnchor="middle" fill={C.cream} style={{ font: `400 28px ${FONT.big}`, letterSpacing: 2 }}>{sign}</text>
  </g>
)
export const Umbrella: React.FC<{ x: number; y: number; s?: number; col?: string; col2?: string; o?: number }> = ({ x, y, s = 1, col = C.red, col2 = C.cream, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 0 L0 120 q0 22 -22 22" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M${-120 + k * 60} 0 Q ${-90 + k * 60} -${k === 1 || k === 2 ? 100 : 80} 0 -110 Q ${-60 + k * 60} -60 ${-60 + k * 60} 0 Q ${-90 + k * 60} -14 ${-120 + k * 60} 0 Z`} fill={k % 2 ? col2 : col} stroke={C.ink} strokeWidth={3} />)}
    <circle cx={0} cy={-112} r={8} fill={C.ink} />
  </g>
)
// # a little car seen from the side; `bent` dents the front, `hue` = body colour
export const Car: React.FC<{ x: number; y: number; s?: number; hue?: string; bent?: number; o?: number; flip?: boolean; wheel?: number }> = ({ x, y, s = 1, hue = C.sea, bent = 0, o = 1, flip, wheel = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <ellipse cx={0} cy={2} rx={95} ry={10} fill="#000" opacity={0.2} />
    <path d={`M-90 -20 L-90 -50 Q-86 -60 -70 -62 L-40 -64 L-18 -96 L44 -96 L70 -64 L${90 - 18 * bent} -56 Q${96 - 18 * bent} -52 ${94 - 18 * bent} -20 Z`} fill={hue} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M-30 -66 L-12 -88 L14 -88 L14 -66 Z M22 -66 L22 -88 L40 -88 L58 -66 Z" fill="#CFEAF2" stroke={C.ink} strokeWidth={3} />
    <path d="M-90 -34 L94 -34" stroke="#fff" strokeWidth={4} opacity={0.35} />
    {bent > 0 && <path d={`M${76 - 18 * bent} -60 l10 10 l-8 8 l10 10`} fill="none" stroke={C.ink} strokeWidth={4} />}
    {[-56, 56].map((wx) => <g key={wx} transform={`translate(${wx} -14) rotate(${wheel})`}><circle r={22} fill={C.ink} /><circle r={10} fill={C.stoneL} /><line x1={-10} y1={0} x2={10} y2={0} stroke={C.ink} strokeWidth={3} /></g>)}
  </g>
)
// # a drawn coin; `v` printed on it
export const Coin: React.FC<{ x: number; y: number; r?: number; v?: string; o?: number; tilt?: number }> = ({ x, y, r = 34, v = '$', o = 1, tilt = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${tilt} 1)`} opacity={o}>
    <ellipse cx={0} cy={r * 0.18} rx={r} ry={r} fill={C.goldD} /><circle r={r} fill="url(#in-goldG)" stroke={C.goldD} strokeWidth={3} /><circle r={r * 0.72} fill="none" stroke={C.goldD} strokeWidth={2} opacity={0.6} />
    <text y={r * 0.36} textAnchor="middle" fill={C.goldD} style={{ font: `400 ${r * 1.05}px ${FONT.big}` }}>{v}</text>
  </g>
)
// # a sealed bill / policy envelope
export const Bill: React.FC<{ x: number; y: number; s?: number; text?: string; o?: number; rot?: number }> = ({ x, y, s = 1, text = '$1,500', o = 1, rot = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-104} y={-64} width={216} height={136} rx={10} fill="#000" opacity={0.15} />
    <rect x={-110} y={-70} width={220} height={140} rx={10} fill="url(#in-paperG)" stroke={C.ink} strokeWidth={4} />
    <path d="M-110 -70 L0 10 L110 -70" fill="none" stroke={C.inkSoft} strokeWidth={4} />
    <rect x={-80} y={20} width={160} height={36} rx={6} fill={C.navy} /><text y={48} textAnchor="middle" fill={C.cream} style={{ font: `400 32px ${FONT.big}` }}>{text}</text>
  </g>
)
// # a bond certificate with a ribbon seal
export const Bond: React.FC<{ x: number; y: number; s?: number; text?: string; o?: number; rot?: number }> = ({ x, y, s = 1, text = 'BOND', o = 1, rot = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-96} y={-60} width={200} height={128} rx={6} fill="#000" opacity={0.15} />
    <rect x={-100} y={-64} width={200} height={128} rx={6} fill="#F6F0DA" stroke={C.greenD} strokeWidth={5} /><rect x={-88} y={-52} width={176} height={104} rx={4} fill="none" stroke={C.greenD} strokeWidth={2} />
    <text y={-14} textAnchor="middle" fill={C.greenD} style={{ font: `400 34px ${FONT.big}` }}>{text}</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-64} y={4 + k * 12} width={k === 2 ? 70 : 128} height={4} fill={C.greenD} opacity={0.4} />)}
    <circle cx={70} cy={34} r={18} fill={C.red} /><path d="M62 48 l-8 22 l12 -6 l6 10 l4 -22" fill={C.redD} />
  </g>
)
// # the STONE RESERVOIR — the float. level 0–1; width w, height h; drawn with its bottom at y
export const Reservoir: React.FC<{ x: number; y: number; w?: number; h?: number; level: number; f: number; o?: number; label?: string; dark?: boolean }> = ({ x, y, w = 520, h = 300, level, f, o = 1, label, dark }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={w / 2 + 40} ry={22} fill="#000" opacity={0.18} />
    <rect x={-w / 2 - 26} y={-h - 10} width={w + 52} height={h + 10} rx={16} fill="url(#in-stoneG)" />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={8} fill={dark ? '#24323F' : '#33424E'} />
    {level > 0.001 && <g><rect x={-w / 2} y={-h * clamp01(level)} width={w} height={h * clamp01(level)} rx={6} fill="url(#in-waterG)" />
      <path d={`M${-w / 2} ${-h * clamp01(level)} ${[...Array(9)].map((_, k) => `q ${w / 18} ${6 * Math.sin(f / 7 + k)} ${w / 9} 0`).join(' ')}`} fill="none" stroke={C.foam} strokeWidth={4} opacity={0.8} /></g>}
    {[...Array(Math.round((w + 52) / 52))].map((_, k) => <rect key={k} x={-w / 2 - 26 + k * 52} y={-h - 22} width={46} height={20} rx={4} fill={C.stoneL} stroke={C.stoneD} strokeWidth={2} />)}
    {label && <g transform={`translate(0 ${-h - 60})`}><Flag x={0} y={0} text={label} size={40} /></g>}
  </g>
)
// # a pipe leaving the reservoir; flow 0–1 animates water running along it
export const Pipe: React.FC<{ d: string; f: number; flow: number; o?: number; col?: string; w?: number }> = ({ d, f, flow, o = 1, col, w = 30 }) => o <= 0.01 ? null : (
  <g opacity={o}>
    <path d={d} fill="none" stroke={C.stoneD} strokeWidth={w + 14} strokeLinecap="round" /><path d={d} fill="none" stroke={C.stone} strokeWidth={w} strokeLinecap="round" />
    {flow > 0.01 && <path d={d} fill="none" stroke={col ?? C.water} strokeWidth={w * 0.55 * flow} strokeLinecap="round" strokeDasharray="30 22" strokeDashoffset={-f * 4} />}
  </g>
)
// # the WATER WHEEL — the investing engine; spin = degrees; size r
export const Wheel: React.FC<{ x: number; y: number; r?: number; spin: number; o?: number; glow?: number }> = ({ x, y, r = 150, spin, o = 1, glow = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {glow > 0 && <circle r={r * 1.6} fill="url(#in-glow)" opacity={glow} />}
    <rect x={-18} y={0} width={36} height={r + 40} fill={C.roofD} /><rect x={-r * 0.7} y={r + 30} width={r * 1.4} height={20} rx={6} fill={C.roofD} />
    <g transform={`rotate(${spin})`}>
      <circle r={r} fill="none" stroke="#8A5A36" strokeWidth={16} /><circle r={r * 0.82} fill="none" stroke="#A8744A" strokeWidth={6} />
      {[...Array(12)].map((_, k) => { const a = (k / 12) * Math.PI * 2; return <g key={k}><line x1={0} y1={0} x2={Math.cos(a) * r} y2={Math.sin(a) * r} stroke="#8A5A36" strokeWidth={8} />
        <rect x={Math.cos(a) * r - 18} y={Math.sin(a) * r - 12} width={36} height={24} rx={4} fill="#B98557" stroke="#6E4528" strokeWidth={3} transform={`rotate(${(a * 180) / Math.PI + 90} ${Math.cos(a) * r} ${Math.sin(a) * r})`} /></g> })}
      <circle r={26} fill={C.ink} /><circle r={10} fill={C.gold} />
    </g>
  </g>
)
// # a dial gauge: value v in percent between lo..hi, with a red zone above 100
export const Gauge: React.FC<{ x: number; y: number; v: number; s?: number; o?: number; lo?: number; hi?: number; label?: string }> = ({ x, y, v, s = 1, o = 1, lo = 80, hi = 120, label = 'COMBINED RATIO' }) => {
  if (o <= 0.01) return null
  const ang = (p: number) => Math.PI * (1 - (p - lo) / (hi - lo)), pt = (p: number, r: number) => [Math.cos(ang(p)) * r, -Math.sin(ang(p)) * r]
  const arc = (a: number, b: number, r: number) => { const [x0, y0] = pt(a, r), [x1, y1] = pt(b, r); return `M${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}` }
  const [nx, ny] = pt(Math.max(lo, Math.min(hi, v)), 190)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d={`M-260 30 A 260 260 0 0 1 260 30 L 260 50 L -260 50 Z`} fill="#000" opacity={0.12} transform="translate(6 8)" />
      <rect x={-230} y={30} width={460} height={150} rx={22} fill="url(#in-paperG)" stroke={C.ink} strokeWidth={6} />
      <path d={`M-260 40 A 260 260 0 0 1 260 40 Z`} fill="url(#in-paperG)" stroke={C.ink} strokeWidth={6} />
      <path d={arc(lo, 100, 220)} fill="none" stroke={C.green} strokeWidth={30} /><path d={arc(100, hi, 220)} fill="none" stroke={C.red} strokeWidth={30} />
      {[lo, 90, 100, 110, hi].map((p) => { const [a, b] = pt(p, 196), [c2, d2] = pt(p, 160); return <g key={p}><line x1={a} y1={b} x2={c2} y2={d2} stroke={C.ink} strokeWidth={p === 100 ? 8 : 4} />{p === 100 && <text x={c2 * 0.78} y={d2 * 0.78 + 12} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}` }}>100</text>}</g> })}
      <line x1={0} y1={0} x2={nx} y2={ny} stroke={C.ink} strokeWidth={12} strokeLinecap="round" /><circle r={22} fill={C.ink} />
      <text y={112} textAnchor="middle" fill={v > 100 ? C.red : C.greenD} style={{ font: `400 84px ${FONT.big}` }}>{Math.round(v)}%</text>
      <text y={160} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}`, letterSpacing: 3 }}>{label}</text>
    </g>
  )
}
// # a pennant-shaped label (this video's own label shape: a flag with a notch, not a pill)
export const Flag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; color?: string; ink?: string; w?: number }> = ({ x, y, text, o = 1, size = 40, color = C.cream, ink = C.ink, w }) => {
  if (o <= 0.01) return null
  const W = w ?? Math.max(130, text.length * size * 0.52 + 60), H = size + 24
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <path d={`M${-W / 2 + 4} ${-H / 2 + 6} h${W} l-18 ${H / 2} l18 ${H / 2} h${-W} l18 ${-H / 2} Z`} fill="#000" opacity={0.18} />
      <path d={`M${-W / 2} ${-H / 2} h${W} l-18 ${H / 2} l18 ${H / 2} h${-W} l18 ${-H / 2} Z`} fill={color} stroke={C.ink} strokeWidth={3} />
      <text y={size * 0.36} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 1.5 }}>{text}</text>
    </g>
  )
}
// # a little driver marker: a round head + body, used in big crowds (the pool)
export const Dot: React.FC<{ x: number; y: number; s?: number; col?: string; o?: number }> = ({ x, y, s = 1, col = C.sea, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle cy={-26} r={10} fill={col} /><path d="M-12 0 Q-12 -16 0 -16 Q12 -16 12 0 Z" fill={col} /></g>
)
// # a strike-through cross and a tick, drawn for this video (chunky brush style)
export const NoMark: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke={C.red} strokeWidth={22} strokeLinecap="round" /></g>
)
export const Tick: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle r={56} fill={C.green} /><path d="M-26 0 L-6 22 L30 -22" fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" /></g>
)
// # a stack of coins whose height is n coins
export const Stack: React.FC<{ x: number; y: number; n: number; r?: number; o?: number; col?: 'gold' | 'red' }> = ({ x, y, n, r = 46, o = 1, col = 'gold' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={r + 14} ry={12} fill="#000" opacity={0.18} />
    {[...Array(Math.max(0, Math.round(n)))].map((_, k) => <g key={k} transform={`translate(0 ${-k * 14})`}><ellipse cx={0} cy={0} rx={r} ry={12} fill={col === 'gold' ? C.goldD : C.redD} /><ellipse cx={0} cy={-5} rx={r} ry={12} fill={col === 'gold' ? C.gold : C.red} /></g>)}
  </g>
)
export const big = (size: number) => ({ font: `400 ${size}px ${FONT.big}` })
