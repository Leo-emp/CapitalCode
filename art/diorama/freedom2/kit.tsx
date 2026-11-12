// ============================================================
// LONG VIDEO — "From 9-to-5 to Financial Freedom, Step by Step" (ff- pieces)
// This video's own world (owner rules r82/r83): "from night shift to sunrise".
// A city drawn in depth layers — far skyline haze, mid towers with lit windows,
// a near street — whose sky moves from deep night (the 9-to-5 grind) through
// violet dusk and amber dawn to a warm golden day (freedom). Money is a living
// thing here: a brass "second paycheck" machine, a growing money tree, three
// buildings that pay (company, government, apartments) and four taps.
// Generic engine helpers (timing, Person rig, Headline) and the small money
// tokens (Tag, Cross, Check, Bundle, CoinG, Envelope) come from shared code.
// House rules: every picture lands ON its word; one picture group at a time;
// labels stick to the part they name; nothing covers anything.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'
export { Tag, Cross, Check, Bundle, CoinG, Envelope, fadeIn, scene } from '../freedom/kit'

// ------------------------------------------------------------ palette
export const C = {
  ink: '#1E2235', inkSoft: '#4E5470', night: '#141A33', navy: '#1F2A4F', violet: '#5B4B8A', dusk: '#B46A8E',
  amber: '#F2A65A', sun: '#FFCF6B', sunL: '#FFE9B0', cream: '#FFF5E6', paper: '#F7EBD6',
  brass: '#C9973F', brassL: '#EBC777', brassD: '#8C6424', teal: '#3FA6A0', tealD: '#23706C', tealL: '#A6E3DA',
  cash: '#5CC285', cashD: '#2C8A57', cashL: '#C4EFD3', red: '#E0503F', redD: '#A8342A', gold: '#F2C14E', goldD: '#B8862A',
  brick: '#C46A4E', brickD: '#8E4532', stone: '#E6DCCB', stoneD: '#B9AC96', leaf: '#5DAA6A', leafD: '#3B7A4A', bark: '#7A5235',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }

// ------------------------------------------------------------ gradients (fixed ids, ff- prefix)
export const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ff-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0E1430" /><stop offset="0.6" stopColor="#25305E" /><stop offset="1" stopColor="#3D3F78" /></linearGradient>
    <linearGradient id="ff-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2B2D63" /><stop offset="0.5" stopColor="#7A5592" /><stop offset="1" stopColor="#E59A8A" /></linearGradient>
    <linearGradient id="ff-dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6C76B8" /><stop offset="0.45" stopColor="#E7A1A0" /><stop offset="0.85" stopColor="#FFC98A" /><stop offset="1" stopColor="#FFE2B0" /></linearGradient>
    <linearGradient id="ff-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7CC0E8" /><stop offset="0.7" stopColor="#CDE8F3" /><stop offset="1" stopColor="#FFF2DC" /></linearGradient>
    <linearGradient id="ff-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F08A5D" /><stop offset="0.5" stopColor="#FFB86B" /><stop offset="1" stopColor="#FFE4B0" /></linearGradient>
    <linearGradient id="ff-storm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#252B44" /><stop offset="1" stopColor="#5E6788" /></linearGradient>
    <linearGradient id="ff-office" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2A3354" /><stop offset="1" stopColor="#3B466E" /></linearGradient>
    <linearGradient id="ff-room" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3E1C6" /><stop offset="1" stopColor="#E6CBA6" /></linearGradient>
    <radialGradient id="ff-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF1C2" stopOpacity="0.95" /><stop offset="0.4" stopColor="#FFD27A" stopOpacity="0.5" /><stop offset="1" stopColor="#FFD27A" stopOpacity="0" /></radialGradient>
    <radialGradient id="ff-lamp" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFE7A6" stopOpacity="0.6" /><stop offset="1" stopColor="#FFE7A6" stopOpacity="0" /></radialGradient>
    <radialGradient id="ff-vig" cx="0.5" cy="0.48" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#0A0E22" stopOpacity="0.34" /></radialGradient>
    <linearGradient id="ff-brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#A87A30" /><stop offset="0.45" stopColor="#F0CF85" /><stop offset="1" stopColor="#9C6E2A" /></linearGradient>
    <linearGradient id="ff-tealg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2E8C86" /><stop offset="0.5" stopColor="#5CC2BA" /><stop offset="1" stopColor="#24706B" /></linearGradient>
    <linearGradient id="ff-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0.04" /></linearGradient>
    <linearGradient id="ff-street" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A4E66" /><stop offset="1" stopColor="#2E3146" /></linearGradient>
    <pattern id="ff-grain" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="#000" opacity="0.06" /><circle cx="4" cy="4" r="0.6" fill="#fff" opacity="0.06" /></pattern>
    <pattern id="ff-tiles" width="120" height="40" patternUnits="userSpaceOnUse"><rect width="120" height="40" fill="none" stroke="#000" strokeOpacity="0.07" strokeWidth="2" /></pattern>
    <pattern id="ff-bricks" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 0 H60 M0 15 H60 M30 0 V15 M0 15 V30" stroke="#000" strokeOpacity="0.1" strokeWidth="2" fill="none" /></pattern>
  </defs>
)

// ------------------------------------------------------------ the city: sky + stars/sun + three skyline layers with lit windows + street
export type Sky = 'night' | 'dusk' | 'dawn' | 'day' | 'gold' | 'storm'
const LAYERS: Record<Sky, [string, string, string, string]> = {
  // far, mid, near, street
  night: ['#2C3566', '#1F2750', '#151B3A', '#232845'], dusk: ['#6A4E86', '#4A3C6E', '#2F2A52', '#3A3352'],
  dawn: ['#C99AAE', '#9A7CA0', '#6E5C86', '#5A4F70'], day: ['#B4D4E6', '#8FB4CC', '#6C8FAE', '#7D8AA0'],
  gold: ['#E9A88A', '#C98478', '#9C6470', '#7E5A66'], storm: ['#4A5272', '#3A4262', '#2A3150', '#2A2F44'],
}
const tower = (seed: number, x0: number, w: number, base: number, hmin: number, hmax: number) => {
  const out: { x: number; w: number; h: number }[] = []
  let x = x0
  while (x < 1980) { const ww = w * (0.7 + rnd(seed + x) * 0.6), h = hmin + rnd(seed + x * 3) * (hmax - hmin); out.push({ x, w: ww, h }); x += ww + 6 }
  return out.map((t) => ({ ...t, y: base - t.h }))
}
const FAR = tower(11, -40, 120, 760, 160, 340), MID = tower(23, -60, 150, 820, 180, 420), NEAR = tower(37, -80, 190, 880, 120, 300)
export const City: React.FC<{ sky: Sky; f: number; sun?: [number, number] | null; lights?: number; o?: number; ground?: number; near?: boolean }> = ({ sky, f, sun = null, lights, o = 1, ground = 930, near = true }) => {
  const L = LAYERS[sky], lit = lights ?? (sky === 'night' ? 1 : sky === 'dusk' ? 0.7 : sky === 'storm' ? 0.4 : 0.12)
  const dy = ground - 930
  return (
    <g opacity={o}>
      <rect width={1920} height={1080} fill={`url(#ff-${sky})`} />
      {(sky === 'night' || sky === 'dusk') && Array.from({ length: 60 }, (_, k) => <circle key={k} cx={rnd(k) * 1920} cy={rnd(k + 7) * 520} r={1.5 + rnd(k + 2) * 2} fill="#fff" opacity={(sky === 'night' ? 0.7 : 0.35) * (0.6 + 0.4 * Math.sin(f / 12 + k))} />)}
      {sun && <g><circle cx={sun[0]} cy={sun[1]} r={380} fill="url(#ff-glow)" /><circle cx={sun[0]} cy={sun[1]} r={96} fill={sky === 'night' ? '#F2F0E6' : '#FFE29A'} /><circle cx={sun[0]} cy={sun[1]} r={74} fill={sky === 'night' ? '#FFFFF4' : '#FFF4CF'} /></g>}
      <g transform={`translate(0 ${dy})`}>
        {FAR.map((t, k) => <rect key={'f' + k} x={t.x} y={t.y} width={t.w} height={t.h + 200} fill={L[0]} opacity={0.75} />)}
        {MID.map((t, k) => <g key={'m' + k}><rect x={t.x} y={t.y} width={t.w} height={t.h + 200} fill={L[1]} />
          <rect x={t.x} y={t.y} width={t.w * 0.22} height={t.h + 200} fill="#fff" opacity={0.05} />
          {lit > 0.02 && Array.from({ length: Math.floor(t.h / 46) * 3 }, (_, i) => { const cx = t.x + 18 + (i % 3) * (t.w - 36) / 2.4, cy = t.y + 24 + Math.floor(i / 3) * 46, on = rnd(k * 97 + i) < 0.55
            return on ? <rect key={i} x={cx} y={cy} width={14} height={20} rx={2} fill="#FFD983" opacity={lit * 0.85} /> : null })}
        </g>)}
        {near && NEAR.map((t, k) => <g key={'n' + k}><rect x={t.x} y={t.y} width={t.w} height={t.h + 200} fill={L[2]} /><rect x={t.x} y={t.y - 10} width={t.w} height={12} fill="#000" opacity={0.12} />
          {lit > 0.02 && Array.from({ length: Math.floor(t.h / 60) * 4 }, (_, i) => { const on = rnd(k * 53 + i + 5) < 0.45
            return on ? <rect key={i} x={t.x + 16 + (i % 4) * (t.w - 32) / 3.6} y={t.y + 26 + Math.floor(i / 4) * 60} width={18} height={26} rx={2} fill="#FFE29A" opacity={lit} /> : null })}
        </g>)}
      </g>
      <rect x={0} y={ground - 8} width={1920} height={1090 - ground} fill={L[3]} />
      <rect x={0} y={ground - 8} width={1920} height={10} fill="#fff" opacity={0.1} />
      <rect x={0} y={ground - 8} width={1920} height={1090 - ground} fill="url(#ff-tiles)" />
    </g>
  )
}
export const Grain: React.FC = () => <><rect width={1920} height={1080} fill="url(#ff-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#ff-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ an office at night: back wall with a big window onto the city, desk, monitor, lamp
export const Office: React.FC<{ f: number; sky?: Sky; o?: number }> = ({ f, sky = 'night', o = 1 }) => (
  <g opacity={o}>
    <rect width={1920} height={1080} fill="url(#ff-office)" />
    <g>
      <clipPath id="ff-winclip"><rect x={300} y={160} width={1320} height={560} rx={8} /></clipPath>
      <g clipPath="url(#ff-winclip)"><g transform="translate(300 160) scale(0.6875 0.5185)"><City sky={sky} f={f} sun={sky === 'night' ? [300, 200] : sky === 'dawn' ? [300, 760] : null} near={false} /></g></g>
      <rect x={300} y={160} width={1320} height={560} rx={8} fill="none" stroke="#151B33" strokeWidth={22} />
      <path d="M960 160 V720 M300 440 H1620" stroke="#151B33" strokeWidth={14} />
      <path d="M330 190 L520 190 L340 600 Z" fill="#fff" opacity={0.05} />
    </g>
    <rect x={0} y={900} width={1920} height={180} fill="#232A47" /><rect x={0} y={900} width={1920} height={180} fill="url(#ff-tiles)" />
  </g>
)
export const Desk: React.FC<{ x: number; y: number; f: number; s?: number; o?: number; screen?: string }> = ({ x, y, f, s = 1, o = 1, screen = '#5CC2BA' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={330} ry={16} fill="#000" opacity={0.2} />
    <rect x={-320} y={-230} width={640} height={30} rx={8} fill="#8A6748" /><rect x={-320} y={-230} width={640} height={8} rx={4} fill="#fff" opacity={0.15} />
    <rect x={-300} y={-200} width={24} height={200} fill="#5E4530" /><rect x={276} y={-200} width={24} height={200} fill="#5E4530" />
    <rect x={-150} y={-440} width={260} height={170} rx={12} fill="#1A1F33" /><rect x={-138} y={-428} width={236} height={146} rx={6} fill={screen} opacity={0.85} />
    {[0, 1, 2].map((k) => <rect key={k} x={-120} y={-410 + k * 34} width={150 - k * 30} height={12} rx={6} fill="#fff" opacity={0.55} />)}
    <rect x={-30} y={-270} width={20} height={40} fill="#1A1F33" /><rect x={-80} y={-236} width={120} height={8} rx={4} fill="#1A1F33" />
    {/* # a potted plant */}
    <g transform="translate(210 -230)"><path d="M-34 0 L-26 -60 L26 -60 L34 0 Z" fill={C.brick} /><path d="M0 -60 Q-50 -110 -40 -150 Q-10 -120 0 -60 Q10 -140 40 -160 Q50 -110 0 -60" fill={C.leaf} /></g>
    <ellipse cx={-10} cy={-232} rx={200} ry={26} fill="url(#ff-lamp)" opacity={0.5 + 0.1 * Math.sin(f / 9)} />
    <g transform="translate(-250 -230)"><rect x={-26} y={-60} width={52} height={60} rx={8} fill="#E8E2D6" /><path d="M26 -46 q 22 4 0 28" stroke="#E8E2D6" strokeWidth={8} fill="none" /></g>
  </g>
)

// ------------------------------------------------------------ the "second paycheck" machine: brass body, gauge, chute; out 0–1 = how hard it runs, label on its plate
export const Machine: React.FC<{ x: number; y: number; f: number; s?: number; o?: number; run?: number; plate?: string; glow?: number }> = ({ x, y, f, s = 1, o = 1, run = 0, plate, glow = 0 }) => {
  const shake = run * Math.sin(f * 1.7) * 2
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${s})`} opacity={o}>
      {glow > 0 && <circle cx={0} cy={-220} r={340} fill="url(#ff-glow)" opacity={glow} />}
      <ellipse cx={0} cy={6} rx={240} ry={20} fill="#000" opacity={0.22} />
      <rect x={-200} y={-360} width={400} height={360} rx={30} fill="url(#ff-brass)" />
      <rect x={-200} y={-360} width={400} height={50} rx={24} fill="#fff" opacity={0.18} />
      <rect x={-170} y={-60} width={340} height={40} rx={10} fill={C.brassD} />
      {/* # gauge */}
      <circle cx={-90} cy={-230} r={66} fill={C.cream} stroke={C.brassD} strokeWidth={10} />
      <line x1={-90} y1={-230} x2={-90 + 50 * Math.cos(Math.PI * (1.15 + 0.7 * clamp01(run)))} y2={-230 + 50 * Math.sin(Math.PI * (1.15 + 0.7 * clamp01(run)))} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
      <circle cx={-90} cy={-230} r={10} fill={C.ink} />
      {/* # gears */}
      {[[70, -250, 54], [140, -180, 36]].map(([gx, gy, gr], k) => <g key={k} transform={`translate(${gx} ${gy}) rotate(${(k ? -1 : 1) * f * 3 * run})`}>
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-9} y={-gr - 12} width={18} height={24} rx={4} fill={C.brassD} transform={`rotate(${i * 45})`} />)}
        <circle r={gr} fill={C.brassD} /><circle r={gr * 0.45} fill={C.brassL} /></g>)}
      {/* # chute */}
      <rect x={-120} y={-130} width={240} height={50} rx={12} fill="#2A2F44" /><rect x={-108} y={-122} width={216} height={14} rx={7} fill="#000" opacity={0.4} />
      {plate && <g><rect x={-150} y={-345} width={300} height={0} /><text x={0} y={-322} textAnchor="middle" fill={C.brassD} style={{ font: `400 38px ${FONT.big}`, letterSpacing: 2 }}>{plate}</text></g>}
      {/* # little pipes on top with steam when running */}
      <rect x={110} y={-420} width={30} height={64} rx={8} fill={C.brassD} />
      {run > 0.05 && [0, 1, 2].map((k) => { const t = (f / 30 + k / 3) % 1; return <circle key={k} cx={125 + Math.sin(t * 6 + k) * 10} cy={-430 - t * 120} r={14 + t * 26} fill="#fff" opacity={run * (1 - t) * 0.5} /> })}
    </g>
  )
}

// ------------------------------------------------------------ a glass investing jar with coins; level 0–1
export const Jar: React.FC<{ x: number; y: number; level: number; s?: number; o?: number; label?: string }> = ({ x, y, level, s = 1, o = 1, label }) => {
  const lv = clamp01(level), top = -330, ly = lerp(-24, top + 40, lv)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={170} ry={18} fill="#000" opacity={0.2} />
      <clipPath id={`ff-jarclip`}><path d="M-140 -300 Q-160 -300 -160 -270 L-160 -30 Q-160 0 -130 0 L130 0 Q160 0 160 -30 L160 -270 Q160 -300 140 -300 Z" /></clipPath>
      <path d="M-140 -300 Q-160 -300 -160 -270 L-160 -30 Q-160 0 -130 0 L130 0 Q160 0 160 -30 L160 -270 Q160 -300 140 -300 Z" fill="#DDEFF5" opacity={0.45} />
      <g clipPath="url(#ff-jarclip)">
        <rect x={-170} y={ly} width={340} height={-ly + 10} fill={C.gold} />
        {Array.from({ length: 30 }, (_, k) => { const cx = -140 + (k % 6) * 56 + (Math.floor(k / 6) % 2) * 26, cy = -20 - Math.floor(k / 6) * 40
          return cy > ly - 10 ? <g key={k}><ellipse cx={cx} cy={cy} rx={30} ry={13} fill={C.goldD} /><ellipse cx={cx} cy={cy - 4} rx={30} ry={13} fill={C.gold} /></g> : null })}
      </g>
      <path d="M-140 -300 Q-160 -300 -160 -270 L-160 -30 Q-160 0 -130 0 L130 0 Q160 0 160 -30 L160 -270 Q160 -300 140 -300 Z" fill="none" stroke="#B9D6E0" strokeWidth={8} />
      <path d="M-130 -270 L-130 -40" stroke="#fff" strokeWidth={16} strokeLinecap="round" opacity={0.4} />
      <rect x={-150} y={-336} width={300} height={40} rx={12} fill={C.tealD} />
      {label && <text y={-160} textAnchor="middle" fill={C.ink} style={{ font: `400 46px ${FONT.big}`, letterSpacing: 2 }} opacity={0.85}>{label}</text>}
    </g>
  )
}

// ------------------------------------------------------------ the money tree: trunk + canopy that grows (g 0–1); coins as fruit; season tint
export const MoneyTree: React.FC<{ x: number; y: number; g: number; f: number; s?: number; o?: number; storm?: number }> = ({ x, y, g, f, s = 1, o = 1, storm = 0 }) => {
  const k = clamp01(g), h = lerp(120, 520, k), cw = lerp(90, 420, k), sway = Math.sin(f / 25) * (2 + 10 * storm)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={cw * 0.9} ry={20} fill="#000" opacity={0.2} />
      <path d={`M-${18 + 20 * k} 0 Q-${10 + 8 * k} ${-h * 0.5} -6 ${-h} L6 ${-h} Q${10 + 8 * k} ${-h * 0.5} ${18 + 20 * k} 0 Z`} fill={C.bark} />
      <path d={`M-${18 + 20 * k} 0 Q-${10 + 8 * k} ${-h * 0.5} -6 ${-h} L-2 ${-h} Q-${4 + 4 * k} ${-h * 0.5} -${6 + 8 * k} 0 Z`} fill="#fff" opacity={0.12} />
      <g transform={`rotate(${sway} 0 ${-h * 0.4})`}>
        {[[0, -h - cw * 0.25, 1], [-cw * 0.5, -h + cw * 0.05, 0.75], [cw * 0.5, -h + cw * 0.05, 0.75], [-cw * 0.25, -h - cw * 0.45, 0.7], [cw * 0.3, -h - cw * 0.4, 0.7]].map(([cx, cy, r], i) =>
          <g key={i}><circle cx={cx} cy={cy + 8} r={cw * 0.42 * r} fill={C.leafD} /><circle cx={cx} cy={cy} r={cw * 0.42 * r} fill={storm > 0.5 ? '#6E9A78' : C.leaf} /><circle cx={cx - cw * 0.12 * r} cy={cy - cw * 0.14 * r} r={cw * 0.16 * r} fill="#fff" opacity={0.12} /></g>)}
        {Array.from({ length: Math.floor(4 + 18 * k) }, (_, i) => { const a = rnd(i + 3) * Math.PI * 2, rr = rnd(i + 9) * cw * 0.55
          return <g key={i} transform={`translate(${Math.cos(a) * rr} ${-h - cw * 0.15 + Math.sin(a) * rr * 0.7})`}><circle r={13 + 4 * k} fill={C.goldD} /><circle r={11 + 4 * k} cy={-2} fill={C.gold} /></g> })}
      </g>
    </g>
  )
}

// ------------------------------------------------------------ three buildings that pay
// # a company HQ / factory with a sawtooth roof and a chimney
export const Factory: React.FC<{ x: number; y: number; f: number; s?: number; o?: number }> = ({ x, y, f, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={240} ry={16} fill="#000" opacity={0.18} />
    <rect x={-210} y={-220} width={420} height={220} fill={C.teal} /><rect x={-210} y={-220} width={420} height={220} fill="url(#ff-bricks)" />
    <path d="M-210 -220 L-140 -300 L-140 -220 L-70 -300 L-70 -220 L0 -300 L0 -220 L70 -300 L70 -220 L140 -300 L140 -220 Z" fill={C.tealD} />
    <rect x={150} y={-380} width={44} height={160} fill={C.brickD} />
    {[0, 1, 2].map((k) => { const t = (f / 50 + k / 3) % 1; return <circle key={k} cx={172 + Math.sin(t * 5) * 14} cy={-400 - t * 140} r={18 + t * 30} fill="#fff" opacity={(1 - t) * 0.5} /> })}
    {[-150, -50, 50].map((wx) => <rect key={wx} x={wx} y={-170} width={70} height={60} rx={4} fill={C.sunL} opacity={0.9} />)}
    <rect x={110} y={-110} width={70} height={110} rx={4} fill={C.tealD} />
  </g>
)
// # a government building (dome + columns) for Treasuries
export const Capitol: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={240} ry={16} fill="#000" opacity={0.18} />
    <rect x={-220} y={-40} width={440} height={40} fill={C.stoneD} />
    {[-170, -100, -30, 40, 110, 170].map((cx) => <g key={cx}><rect x={cx - 16} y={-200} width={32} height={160} fill={C.stone} /><rect x={cx - 16} y={-200} width={9} height={160} fill="#000" opacity={0.06} /></g>)}
    <rect x={-220} y={-230} width={440} height={30} fill={C.stoneD} />
    <path d="M-120 -230 Q-120 -360 0 -370 Q120 -360 120 -230 Z" fill={C.stone} /><path d="M-120 -230 Q-120 -360 0 -370 L0 -230 Z" fill="#fff" opacity={0.15} />
    <rect x={-6} y={-410} width={12} height={44} fill={C.stoneD} /><circle cx={0} cy={-414} r={10} fill={C.gold} />
  </g>
)
// # an apartment block (rent)
export const Apartments: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0.6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={16} fill="#000" opacity={0.18} />
    <rect x={-170} y={-400} width={340} height={400} fill={C.brick} /><rect x={-170} y={-400} width={340} height={400} fill="url(#ff-bricks)" />
    <rect x={-170} y={-400} width={70} height={400} fill="#fff" opacity={0.08} />
    <rect x={-186} y={-420} width={372} height={26} fill={C.brickD} />
    {Array.from({ length: 12 }, (_, k) => { const cx = -120 + (k % 3) * 100, cy = -360 + Math.floor(k / 3) * 80
      return <g key={k}><rect x={cx - 26} y={cy} width={52} height={50} rx={3} fill={rnd(k + 2) < lit ? C.sunL : '#9CC0D8'} /><rect x={cx - 32} y={cy + 50} width={64} height={8} fill={C.brickD} /></g> })}
    <rect x={-34} y={-80} width={68} height={80} rx={6} fill={C.brickD} />
  </g>
)

// ------------------------------------------------------------ a tap (faucet) on a pipe that pours coins/cash at rate 0–1
export const Tap: React.FC<{ x: number; y: number; f: number; flow: number; s?: number; o?: number; color?: string }> = ({ x, y, f, flow, s = 1, o = 1, color = C.brass }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-20} y={-200} width={40} height={140} fill={color} /><rect x={-20} y={-200} width={12} height={140} fill="#fff" opacity={0.2} />
    <path d="M-20 -80 Q-20 -30 30 -30 L60 -30 L60 0 L20 0 Q-50 0 -50 -80 Z" fill={color} />
    <rect x={-50} y={-140} width={100} height={20} rx={10} fill={C.brassD} /><rect x={-8} y={-160} width={16} height={30} fill={C.brassD} />
    {flow > 0.02 && Array.from({ length: 5 }, (_, k) => { const t = (f / 18 + k / 5) % 1
      return <g key={k} opacity={flow * (t < 0.85 ? 1 : (1 - t) * 6)} transform={`translate(${40 + Math.sin(k * 7) * 6} ${10 + t * 170})`}><ellipse rx={16} ry={7} fill={C.goldD} /><ellipse cy={-3} rx={16} ry={7} fill={C.gold} /></g> })}
  </g>
)

// ------------------------------------------------------------ a safe (cash buffer); open 0–1
export const Safe: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; open?: number }> = ({ x, y, s = 1, o = 1, fill = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={18} fill="#000" opacity={0.22} />
    <rect x={-170} y={-330} width={340} height={330} rx={22} fill="#4B5578" /><rect x={-170} y={-330} width={340} height={40} rx={20} fill="#fff" opacity={0.12} />
    <rect x={-140} y={-300} width={280} height={270} rx={12} fill="#2C3352" />
    {Array.from({ length: Math.round(6 * clamp01(fill)) }, (_, k) => <g key={k} transform={`translate(${(k % 2 ? 50 : -50)} ${-60 - Math.floor(k / 2) * 70})`}><rect x={-58} y={-24} width={116} height={48} rx={6} fill={C.cash} stroke={C.cashD} strokeWidth={3} /><rect x={-12} y={-24} width={24} height={48} fill={C.cream} opacity={0.9} /></g>)}
    <g transform={`translate(-140 -300) scale(${1 - 0.9 * clamp01(open)} 1)`}>
      <rect x={0} y={0} width={280} height={270} rx={12} fill="#5A6690" /><rect x={0} y={0} width={280} height={30} rx={12} fill="#fff" opacity={0.1} />
      <circle cx={140} cy={135} r={56} fill="#3A4466" /><circle cx={140} cy={135} r={40} fill={C.brass} />
      {[0, 60, 120].map((a) => <rect key={a} x={136} y={85} width={8} height={100} rx={4} fill={C.brassD} transform={`rotate(${a} 140 135)`} />)}
    </g>
  </g>
)

// ------------------------------------------------------------ a door (leaving the office); open 0–1 shows the sunrise behind
export const Door: React.FC<{ x: number; y: number; open: number; s?: number; o?: number }> = ({ x, y, open, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-440} width={300} height={440} fill="url(#ff-gold)" />
    <circle cx={0} cy={-120} r={160} fill="url(#ff-glow)" opacity={open} />
    <rect x={-170} y={-460} width={340} height={20} fill="#3A3150" /><rect x={-170} y={-460} width={20} height={460} fill="#3A3150" /><rect x={150} y={-460} width={20} height={460} fill="#3A3150" />
    <g transform={`translate(-150 0) scale(${1 - 0.85 * clamp01(open)} 1)`}><rect x={0} y={-440} width={300} height={440} fill="#6E5A8A" /><rect x={30} y={-410} width={240} height={170} rx={6} fill="#5E4C7A" /><rect x={30} y={-210} width={240} height={180} rx={6} fill="#5E4C7A" /><circle cx={260} cy={-220} r={12} fill={C.brass} /></g>
  </g>
)

// ------------------------------------------------------------ simple chart frame (axes) for the crossover
export const Axes: React.FC<{ x: number; y: number; w: number; h: number; o?: number; xl?: string; yl?: string }> = ({ x, y, w, h, o = 1, xl, yl }) => (
  <g opacity={o}>
    <rect x={x - 30} y={y - h - 40} width={w + 80} height={h + 100} rx={24} fill={C.cream} opacity={0.94} />
    <path d={`M${x} ${y - h} V${y} H${x + w}`} stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {xl && <text x={x + w} y={y + 46} textAnchor="end" fill={C.inkSoft} style={{ font: `400 34px ${FONT.big}`, letterSpacing: 1 }}>{xl}</text>}
    {yl && <text x={x + 14} y={y - h + 8} fill={C.inkSoft} style={{ font: `400 34px ${FONT.big}`, letterSpacing: 1 }}>{yl}</text>}
  </g>
)
export { clamp01, lerp }
