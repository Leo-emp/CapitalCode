// ============================================================
// BANNER VARIANTS — three new directions for the owner to choose
// from (2026-11-10): bold & modern · luxury · cinematic city.
// All 2560 × 1440; every word sits inside YouTube's phone-safe box
// (x 507–2053, y 508–932). Decoration fills the rest for desktop / TV.
// ============================================================
import React from 'react'
import { AbsoluteFill } from 'remotion'
import { fontFaces } from '../tokens'
import { Emblem } from '../logo/Emblem'
import { Banner, BANNER, SAFE } from './Banner'

const { w: W, h: H } = BANNER
const rnd = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x) }

const Guides: React.FC<{ on?: boolean }> = ({ on }) => on ? <g fill="none" strokeWidth={4} strokeDasharray="18 12">
  <rect x={0} y={SAFE.y} width={W} height={SAFE.h} stroke="#1E6FA8" />
  <rect x={SAFE.x} y={SAFE.y} width={SAFE.w} height={SAFE.h} stroke="#F0454B" />
</g> : null

const Frame: React.FC<{ bg: string; children: React.ReactNode }> = ({ bg, children }) => (
  <AbsoluteFill style={{ background: bg }}>
    <style>{fontFaces()}</style>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>{children}</svg>
  </AbsoluteFill>
)

// ============================================================
// 1 — BOLD & MODERN: near-black, money green, heavy sans name,
// a plain promise line, the logo's three rising bars drawn huge.
// ============================================================
export const BannerBold: React.FC<{ guides?: boolean }> = ({ guides }) => {
  const G = '#1FE08F', GD = '#0E9F62'
  return <Frame bg="#080B10">
    <defs>
      <radialGradient id="bb-glow"><stop offset="0" stopColor={G} stopOpacity={0.28} /><stop offset="1" stopColor={G} stopOpacity={0} /></radialGradient>
      <linearGradient id="bb-bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={G} /><stop offset="1" stopColor={GD} /></linearGradient>
      <pattern id="bb-dots" width={36} height={36} patternUnits="userSpaceOnUse"><circle cx={2} cy={2} r={2} fill="#FFFFFF" /></pattern>
      <linearGradient id="bb-fadeR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity={0} /><stop offset="1" stopColor="#fff" stopOpacity={1} /></linearGradient>
      <linearGradient id="bb-fadeL" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#fff" stopOpacity={0} /><stop offset="1" stopColor="#fff" stopOpacity={1} /></linearGradient>
      <mask id="bb-dotmaskL"><rect width={W} height={H} fill="url(#bb-fadeL)" /></mask>
      <mask id="bb-dotmask"><rect width={W} height={H} fill="url(#bb-fadeR)" /></mask>
    </defs>
    {/* dotted field on the right, a green glow behind the bars */}
    <rect x={1500} width={W - 1500} height={H} fill="url(#bb-dots)" opacity={0.09} mask="url(#bb-dotmask)" />
    <circle cx={1900} cy={760} r={700} fill="url(#bb-glow)" />
    <rect x={0} width={900} height={H} fill="url(#bb-dots)" opacity={0.09} mask="url(#bb-dotmaskL)" />
    <circle cx={200} cy={720} r={520} fill="url(#bb-glow)" opacity={0.45} />
    {[[90, 300], [180, 230], [270, 160], [360, 110]].map(([x, h], i) =>
      <path key={"l" + i} d={`M${x} 912 L${x} ${912 - h + 12} L${x + 60} ${912 - h - 12} L${x + 60} 912 Z`} fill="none" stroke={G} strokeWidth={3} opacity={0.18} />)}
    {/* two long diagonal accent strokes crossing the desktop strip */}
    <path d={`M-100 1010 L${W + 100} 380`} stroke={G} strokeWidth={3} opacity={0.18} />
    <path d={`M-100 1090 L${W + 100} 460`} stroke="#FFFFFF" strokeWidth={2} opacity={0.06} />
    {/* the logo's three rising bars, huge (slanted tops like the emblem) */}
    {[[1790, 140], [1880, 230], [1970, 330]].map(([x, h], i) =>
      <path key={i} d={`M${x} 912 L${x} ${912 - h + 14} L${x + 70} ${912 - h - 14} L${x + 70} 912 Z`} fill="url(#bb-bar)" opacity={0.55 + i * 0.2} />)}
    {/* far-right echo, desktop only */}
    {[[2160, 90], [2250, 160], [2340, 250], [2430, 360]].map(([x, h], i) =>
      <path key={i} d={`M${x} 912 L${x} ${912 - h + 12} L${x + 60} ${912 - h - 12} L${x + 60} 912 Z`} fill="none" stroke={G} strokeWidth={3} opacity={0.25} />)}
    {/* left: emblem + name + promise */}
    <g transform="translate(590 600)"><rect width={150} height={150} rx={34} fill="#121821" stroke="#222C39" strokeWidth={2} /><g transform="translate(20 22)"><Emblem size={110} /></g></g>
    <text x={780} y={712} fill="#FFFFFF" style={{ font: '800 140px Inter', letterSpacing: -4 }}>Capital<tspan fill={G}>Code</tspan></text>
    <text x={786} y={806} fill="#B7C1CE" style={{ font: '600 56px Inter', letterSpacing: -1 }}>Learn how money really works.</text>
    <g transform="translate(786 850)">
      <rect width={700} height={56} rx={28} fill={G} />
      <text x={350} y={38} textAnchor="middle" fill="#06120C" style={{ font: '800 27px Inter', letterSpacing: 4 }}>INVESTING · BUSINESS · ECONOMY</text>
    </g>
    <Guides on={guides} />
  </Frame>
}

// ============================================================
// 2 — LUXURY / WEALTH: black marble, polished gold, art-deco frame,
// serif name. Feels like a private bank.
// ============================================================
export const BannerLuxury: React.FC<{ guides?: boolean }> = ({ guides }) => {
  const cx = 1280
  return <Frame bg="#060606">
    <defs>
      {/* marble: soft cloudy base + thin bright veins */}
      <filter id="bl-marble" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.0018 0.006" numOctaves={5} seed={23} result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.15  0 0 0 0 0.14  0.9 0 0 0 -0.25" />
      </filter>
      <filter id="bl-veins" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="turbulence" baseFrequency="0.0022 0.005" numOctaves={4} seed={41} result="t" />
        <feColorMatrix in="t" type="luminanceToAlpha" result="a" />
        <feComponentTransfer in="a"><feFuncA type="table" tableValues="0 0 0 0 0 0 0 0.05 0.55 0" /></feComponentTransfer>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.72  0 0 0 0 0.45  0 0 0 0.6 0" />
      </filter>
      <linearGradient id="bl-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFF3C9" /><stop offset="0.35" stopColor="#E7C16D" /><stop offset="0.55" stopColor="#B88A33" /><stop offset="0.75" stopColor="#F4D98F" /><stop offset="1" stopColor="#8E6824" />
      </linearGradient>
      <linearGradient id="bl-goldH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#C9A04A" stopOpacity={0} /><stop offset="0.5" stopColor="#E9C979" /><stop offset="1" stopColor="#C9A04A" stopOpacity={0} />
      </linearGradient>
      <radialGradient id="bl-spot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#3A2E1A" stopOpacity={0.55} /><stop offset="1" stopColor="#000" stopOpacity={0} /></radialGradient>
      <radialGradient id="bl-vig" cx="0.5" cy="0.5" r="0.7"><stop offset="0.5" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.75} /></radialGradient>
    </defs>
    <rect width={W} height={H} filter="url(#bl-marble)" />
    <rect width={W} height={H} filter="url(#bl-veins)" opacity={0.6} />
    <ellipse cx={cx} cy={720} rx={1100} ry={520} fill="url(#bl-spot)" />
    {/* art-deco sunburst fanning up from below the frame */}
    <g opacity={0.12}>{Array.from({ length: 23 }, (_, i) => {
      const a = Math.PI + (i + 1) * (Math.PI / 24)
      return <line key={i} x1={cx} y1={1000} x2={cx + Math.cos(a) * 1600} y2={1000 + Math.sin(a) * 1600} stroke="#E9C979" strokeWidth={2} />
    })}</g>
    <rect width={W} height={H} fill="url(#bl-vig)" />
    {/* the deco frame (inside the phone box) */}
    <g fill="none" stroke="url(#bl-gold)">
      <rect x={640} y={548} width={1280} height={344} strokeWidth={3} />
      <rect x={656} y={564} width={1248} height={312} strokeWidth={1.2} />
    </g>
    <rect x={641.5} y={549.5} width={1277} height={341} fill="#050505" opacity={0.55} />
    {[[640, 548], [1920, 548], [640, 892], [1920, 892]].map(([x, y], i) =>
      <rect key={i} x={x - 14} y={y - 14} width={28} height={28} fill="url(#bl-gold)" transform={`rotate(45 ${x} ${y})`} />)}
    {/* long gold rules running out to the desktop edges */}
    <rect x={0} y={719} width={600} height={2} fill="url(#bl-goldH)" opacity={0.7} />
    <rect x={1960} y={719} width={600} height={2} fill="url(#bl-goldH)" opacity={0.7} />
    {[300, 2260].map((x) => <rect key={x} x={x - 9} y={711} width={18} height={18} fill="url(#bl-gold)" transform={`rotate(45 ${x} 720)`} />)}
    {/* emblem + name + tagline */}
    <g transform={`translate(${cx - 48} 584)`}><Emblem size={96} /></g>
    <text x={cx} y={790} textAnchor="middle" fill="url(#bl-gold)" style={{ font: '400 136px Georgia, "Times New Roman", serif', letterSpacing: 10 }}>CAPITALCODE</text>
    <rect x={cx - 300} y={818} width={600} height={1.5} fill="url(#bl-goldH)" />
    <text x={cx} y={858} textAnchor="middle" fill="#E3CF9F" style={{ font: '500 28px Inter', letterSpacing: 16 }}>MONEY · MARKETS · BUSINESS</text>
    <Guides on={guides} />
  </Frame>
}

// ============================================================
// 3 — CINEMATIC CITY: a detailed financial-district skyline at dusk,
// thousands of lit windows, water reflection, a gold rising line
// glowing through the sky. Name in the open sky above the low centre.
// ============================================================
type Tower = { x: number; w: number; h: number; top?: 'flat' | 'spire' | 'step' | 'slant' }
const tower = (seed: number, x: number, w: number, h: number): Tower => ({ x, w, h, top: (['flat', 'spire', 'step', 'slant'] as const)[Math.floor(rnd(seed) * 4)] })
const layer = (seed: number, minH: number, maxH: number, lowMid: number, gap = 0): Tower[] => {
  const out: Tower[] = []
  let x = -60, i = 0
  while (x < W + 60) {
    const bw = 70 + rnd(seed + i) * 120
    const mid = x + bw / 2
    const centre = mid > 640 && mid < 1920 // # keep the centre low so the name sits in open sky
    const hh = centre ? lowMid * (0.6 + rnd(seed + i + 50) * 0.4) : minH + rnd(seed + i + 90) * (maxH - minH)
    out.push({ ...tower(seed + i, x, bw, hh), ...(centre ? { top: 'flat' as const } : {}) })
    x += bw + gap
    i++
  }
  return out
}
const BASE = 955 // # waterline: the skyline stands on it, the reflection hangs under it
const FAR = layer(11, 260, 470, 120, 6), MID = layer(37, 180, 420, 70, 10), NEAR = layer(73, 150, 520, 34, 18)

const Building: React.FC<{ t: Tower; fill: string; win: string; winO: number; seed: number }> = ({ t, fill, win, winO, seed }) => {
  const top = BASE - t.h
  const cols = Math.max(2, Math.floor(t.w / 22)), cw = t.w / cols
  const rows = Math.floor((t.h - 30) / 26)
  return <g>
    <rect x={t.x} y={top} width={t.w} height={t.h + 2} fill={fill} />
    {t.top === 'spire' && <><rect x={t.x + t.w * 0.3} y={top - 40} width={t.w * 0.4} height={42} fill={fill} /><rect x={t.x + t.w / 2 - 3} y={top - 130} width={6} height={92} fill={fill} />
      <circle cx={t.x + t.w / 2} cy={top - 132} r={5} fill="#FF6B5B" /></>}
    {t.top === 'step' && <><rect x={t.x + t.w * 0.12} y={top - 34} width={t.w * 0.76} height={36} fill={fill} /><rect x={t.x + t.w * 0.28} y={top - 62} width={t.w * 0.44} height={30} fill={fill} /></>}
    {t.top === 'slant' && <path d={`M${t.x} ${top} L${t.x + t.w} ${top - t.w * 0.45} L${t.x + t.w} ${top} Z`} fill={fill} />}
    {winO > 0 && Array.from({ length: rows * cols }, (_, k) => {
      const r = rnd(seed * 7 + k)
      if (r > 0.42) return null
      return <rect key={k} x={t.x + (k % cols) * cw + cw * 0.25} y={top + 22 + Math.floor(k / cols) * 26} width={cw * 0.5} height={12} fill={win} opacity={winO * (0.45 + r)} />
    })}
  </g>
}
const Skyline: React.FC = () => <g>
  {FAR.map((t, i) => <Building key={'f' + i} t={t} fill="#2A2F5E" win="#FFC98A" winO={0.35} seed={100 + i} />)}
  {MID.map((t, i) => <Building key={'m' + i} t={t} fill="#171B40" win="#FFD58A" winO={0.7} seed={300 + i} />)}
  {NEAR.map((t, i) => <Building key={'n' + i} t={t} fill="#0A0C22" win="#FFE2A6" winO={0.95} seed={600 + i} />)}
</g>

export const BannerCity: React.FC<{ guides?: boolean }> = ({ guides }) => {
  const LINE: [number, number][] = Array.from({ length: 41 }, (_, i) => [-40 + i * 66, 900 - i * 9.5 + Math.sin(i / 2.3) * 30 + (rnd(i + 5) - 0.5) * 34])
  const d = LINE.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  return <Frame bg="#070A1C">
    <defs>
      <linearGradient id="bc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#05081A" /><stop offset="0.45" stopColor="#141C4A" /><stop offset="0.72" stopColor="#33296A" />
        <stop offset="0.86" stopColor="#8E4577" /><stop offset="0.94" stopColor="#E07A5A" /><stop offset="1" stopColor="#FFB870" />
      </linearGradient>
      <linearGradient id="bc-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1A3E" /><stop offset="1" stopColor="#04050F" /></linearGradient>
      <linearGradient id="bc-refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity={0.5} /><stop offset="0.6" stopColor="#fff" stopOpacity={0} /></linearGradient>
      <mask id="bc-linemask"><rect width={W} height={H} fill="#fff" /><rect x={600} y={570} width={1360} height={260} rx={120} fill="#000" /></mask>
      <mask id="bc-reflmask"><rect x={0} y={BASE} width={W} height={H - BASE} fill="url(#bc-refl)" /></mask>
      <radialGradient id="bc-sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFE0A0" stopOpacity={0.85} /><stop offset="1" stopColor="#FF9A5A" stopOpacity={0} /></radialGradient>
      <filter id="bc-glow" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
      <filter id="bc-tglow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="18" /></filter>
      {/* # brushed silver like the owner's logo file: bright top, grey band, bright again, darker base */}
      <linearGradient id="bc-silver" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 640) scale(1 110)">
        <stop offset="0" stopColor="#FFFFFF" /><stop offset="0.4" stopColor="#E9EBEF" /><stop offset="0.58" stopColor="#B4B8BF" /><stop offset="0.78" stopColor="#E2E5EA" /><stop offset="1" stopColor="#9A9EA6" />
      </linearGradient>
      <radialGradient id="bc-shade" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#05081A" stopOpacity={0.55} /><stop offset="1" stopColor="#05081A" stopOpacity={0} /></radialGradient>
    </defs>
    {/* sky with the sunset sitting right on the waterline */}
    <rect width={W} height={BASE} fill="url(#bc-sky)" />
    {Array.from({ length: 140 }, (_, i) => <circle key={i} cx={rnd(i) * W} cy={rnd(i + 400) * 480} r={0.8 + rnd(i + 800) * 1.8} fill="#FFFFFF" opacity={0.25 + rnd(i + 900) * 0.6} />)}
    <ellipse cx={1280} cy={BASE} rx={900} ry={170} fill="url(#bc-sun)" opacity={0.6} />
    {/* the gold rising line glowing through the sky, behind the towers */}
    <g mask="url(#bc-linemask)">
      <path d={d} fill="none" stroke="#FFC861" strokeWidth={14} opacity={0.45} filter="url(#bc-glow)" />
      <path d={d} fill="none" stroke="#FFE3A3" strokeWidth={4} strokeLinejoin="round" />
    </g>
    <Skyline />
    {/* water + mirrored skyline */}
    <rect x={0} y={BASE} width={W} height={H - BASE} fill="url(#bc-water)" />
    <g mask="url(#bc-reflmask)" opacity={0.6}><g transform={`translate(0 ${BASE * 2}) scale(1 -1)`}><Skyline /></g></g>
    {Array.from({ length: 26 }, (_, i) => <rect key={i} x={rnd(i + 30) * W} y={BASE + 20 + rnd(i + 60) * 300} width={60 + rnd(i + 90) * 220} height={3} fill="#FFD9A0" opacity={0.08 + rnd(i) * 0.12} />)}
    {/* name in the open sky (soft dark halo for contrast) */}
    <ellipse cx={1280} cy={720} rx={780} ry={200} fill="url(#bc-shade)" />
    <g transform="translate(774 630)"><Emblem size={150} /></g>
    <text x={954} y={744} fill="#DDE3EE" opacity={0.28} filter="url(#bc-tglow)" style={{ font: '800 138px Inter', letterSpacing: -3 }}>CapitalCode</text>
    <text x={958} y={750} fill="#05081A" opacity={0.55} style={{ font: '800 138px Inter', letterSpacing: -3 }}>CapitalCode</text>
    <text x={954} y={744} fill="url(#bc-silver)" style={{ font: '800 138px Inter', letterSpacing: -3 }}>CapitalCode</text>
    <text x={1280} y={812} textAnchor="middle" fill="#F3E6D0" style={{ font: '600 40px Inter', letterSpacing: 10 }}>MONEY · MARKETS · BUSINESS</text>
    <Guides on={guides} />
  </Frame>
}

// # one composition, four looks: variant = premium | bold | luxury | city
export const BannerPick: React.FC<{ variant: string; guides?: boolean }> = ({ variant, guides }) => {
  const V = ({ bold: BannerBold, luxury: BannerLuxury, city: BannerCity } as Record<string, React.FC<{ guides?: boolean }>>)[variant] ?? Banner
  return <V guides={guides} />
}
