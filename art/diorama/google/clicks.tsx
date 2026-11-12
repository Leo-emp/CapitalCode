// ---------------------------------------------------------------- s38–s52: clicks × price (casino-style rebuild).
// One setting: Google's money machine in a big engine room. Two hoppers on top — CLICKS (white pointers rain in from
// the whole world) and PRICE PER CLICK (coins) — feed a machine whose gears turn and whose pipe pours money into a
// bin. You stand at a chalkboard on the left and work the example. The CLICKS gauge reads +6%, the PRICE gauge +7%.
// The chalkboard: 100 clicks × $1 = $100 → 106 × $1.07 ≈ $113 → +13% (made-up numbers). Two money towers grow from
// $198B to $224.5B; the gears spin fast ("the engine"); then a YouTube pipe and a WEBSITES pipe join the machine and
// its display reads ALL ADS 2025 ≈ $295B.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, win } from '../aimoney/common'
import { CoinTower, gestB } from '../buffett/hook'
import { Pointer } from './kit'

// # a gear with n teeth turning by angle a
const Gear: React.FC<{ x: number; y: number; r: number; a: number; color?: string }> = ({ x, y, r, a, color = '#8A94A8' }) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-r * 0.16} y={-r - 18} width={r * 0.32} height={36} rx={6} fill={color} transform={`rotate(${k * 36})`} />)}
    <circle r={r} fill={color} /><circle r={r * 0.35} fill="#2A3448" />
  </g>
)
// # a hopper with a label and a gauge reading
const Hopper: React.FC<{ x: number; label: string; gauge?: string; go?: number; glow?: number; MX: number }> = ({ x, label, gauge, go = 0, glow = 0, MX }) => (
  <g transform={`translate(${x} 420)`}>
    {glow > 0 && <path d="M-170 -120 L170 -120 L80 40 L-80 40 Z" fill={P.gold} opacity={0.35 * glow} transform="scale(1.1)" />}
    <path d="M-160 -110 L160 -110 L70 30 L-70 30 Z" fill="#5B6680" stroke="#3A4660" strokeWidth={8} />
    <text x={0} y={-10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
    {gauge && <g opacity={go} transform={`translate(${x < MX ? -235 : 235} -40) scale(${0.6 + 0.4 * go})`}><circle r={74} fill="#FFFFFF" stroke={P.mint} strokeWidth={10} /><text y={18} textAnchor="middle" fill={P.mintInk} style={{ font: '400 56px "Bebas Neue"' }}>{gauge}</text></g>}
  </g>
)

const Clicks: React.FC<PieceProps> = ({ f, c }) => {
  const world = c('s38:world'), two = c('s39:two'), many = c('s40:many'), costs = c('s40:costs')
  const price41 = c('s41:price'), divided = c('s41:divided'), n6 = c('s42:6'), n7 = c('s43:7'), simple44 = c('s44:simple')
  const n100 = c('s45:100'), n106 = c('s46:106'), n113 = c('s47:113'), together = c('s48:together'), n13 = c('s48:13')
  const exactly = c('s49:exactly'), n198 = c('s50:198'), n224 = c('s50:224'), engine = c('s51:engine'), youtube = c('s52:youtube'), websites = c('s52:websites'), n295 = c('s52:295')
  // # extra gesture words
  const G = [c('s42:in'), c('s45:each'), c('s46:more'), c('s46:more#2'), c('s50:calculation'), c('s50:from'), c('s50:billion'), c('s39:from'), c('s40:and'), c('s41:from'), c('s42:google'), c('s42:said'), c('s43:of'), c('s44:numbers'), c('s45:100#2'), c('s46:now'), c('s46:1'), c('s46:7#2'), c('s48:put'), c('s50:revenue'), c('s50:grew'), c('s51:pricier'), c('s51:and'), c('s52:search'), c('s52:in')]
  const MX = 1200
  // # the gears turn always, faster on "engine"
  const spin = f * 3 + 900 * easeInOut(span(f, engine, engine + 40))
  // # the chalkboard lines (made-up example)
  const lines: [number, string, string][] = [[price41, 'PRICE PER CLICK =', P.paper], [divided, 'CLICK MONEY ÷ CLICKS', P.paper], [n100, '100 × $1 = $100', P.paper], [n106, '106 × $1.07', P.gold], [n113, '≈ $113', P.gold], [n13, '= ABOUT +13%', P.mint]]
  const page = f < n100 - 4 ? 0 : 1
  return (
    <g>
      <StageBg id="gg-clicks" frame={f} />
      {/* # the engine room */}
      <rect x={0} y={0} width={1920} height={1000} fill="#2B3A55" />
      {Array.from({ length: 8 }, (_, k) => <rect key={k} x={k * 260} y={230} width={14} height={770} fill="#33456A" />)}
      <rect x={0} y={0} width={1920} height={215} fill="#EFE6D6" /><rect x={0} y={205} width={1920} height={22} fill="#8E6A45" />
      <rect x={0} y={1000} width={1920} height={80} fill="#5A6680" /><rect x={0} y={990} width={1920} height={14} fill="#3A4660" />
      {/* # everything inside the room a little smaller (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.9) translate(-960 -1000)">
      {/* # everything inside the room at 80% (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.8) translate(-960 -1000)">
      {/* # the chalkboard */}
      <g transform="translate(290 520) scale(0.95)" opacity={1 - on(f, exactly, 10)}>
        <rect x={-250} y={-250} width={500} height={420} rx={14} fill="#8E6A45" /><rect x={-230} y={-230} width={460} height={380} rx={8} fill="#244D3A" />
        <text x={0} y={-186} textAnchor="middle" fill={P.gold} opacity={on(f, simple44, 6)} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 3 }}>{page ? 'EXAMPLE · MADE-UP NUMBERS' : ''}</text>
        {lines.filter((_, k) => (page ? k >= 2 : k < 2)).map(([at, t, col], k) => <text key={t} x={0} y={-120 + k * 70} textAnchor="middle" fill={col} opacity={on(f, at, 6)} style={{ font: '400 56px "Bebas Neue"' }}>{t}</text>)}
      </g>
      {/* # pipes from YouTube and websites join on top */}
      {[[youtube, MX - 420, '▶ YOUTUBE', '#E05A4C'], [websites, MX + 420, 'WEBSITES', '#3A6EA8']].map(([at, x, lab, col], k) => <g key={k} opacity={on(f, at as number, 8)} transform={`translate(0 ${lerp(-300, 0, easeInOut(span(f, at as number, (at as number) + 16)))})`}>
        <rect x={(x as number) - 30} y={230} width={60} height={300} fill="#8A94A8" />
        <g transform={`translate(${x} 300)`}><rect x={-120} y={-44} width={240} height={88} rx={16} fill={col as string} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{lab as string}</text></g>
      </g>)}
      {/* # the money machine */}
      <g opacity={1}>
        <rect x={MX - 330} y={480} width={660} height={500} rx={30} fill="#5B6680" />
        <rect x={MX - 300} y={510} width={600} height={440} rx={22} fill="#46516B" />
        <Gear x={MX - 160} y={800} r={90} a={spin} /><Gear x={MX + 10} y={860} r={60} a={-spin * 1.5} color="#A0A9BC" /><Gear x={MX + 170} y={790} r={80} a={spin * 1.1} />
        <g transform={`translate(${MX} 600)`}><rect x={-240} y={-60} width={480} height={120} rx={14} fill="#0D1424" />
          <text y={22} textAnchor="middle" fill={f > n295 ? P.gold : P.mint} style={{ font: '400 60px "Bebas Neue"' }}>{f > n295 ? 'ALL ADS 2025 ≈ $295B' : f > n224 ? 'SEARCH 2025 ≈ $224.5B' : 'CLICKS × PRICE'}</text></g>
      </g>
      <Hopper MX={MX} x={MX - 170} label="CLICKS" gauge="+6%" go={on(f, n6, 8) * (1 - on(f, simple44, 8))} glow={on(f, many, 6) * (1 - on(f, costs, 6))} />
      <Hopper MX={MX} x={MX + 170} label="PRICE / CLICK" gauge="+7%" go={on(f, n7, 8) * (1 - on(f, simple44, 8))} glow={on(f, costs, 6) * (1 - on(f, price41, 6))} />
      {/* # pointers rain into CLICKS, coins into PRICE */}
      {Array.from({ length: 6 }, (_, k) => { const t = ((f - world + k * 9) % 54) / 54; return <g key={k} opacity={on(f, world, 8) * (t < 0.9 ? 1 : 0)}><Pointer x={MX - 230 + (k % 3) * 50} y={lerp(240, 300, t)} s={0.45} /></g> })}
      {Array.from({ length: 5 }, (_, k) => { const t = ((f - two + k * 11) % 55) / 55; return <g key={k} opacity={on(f, two, 8) * (t < 0.9 ? 1 : 0)}><Coin x={MX + 120 + (k % 3) * 50} y={lerp(250, 300, t)} s={0.45} /></g> })}
      {/* # the output pipe pours into the bin, then the two money towers */}
      <rect x={MX + 330} y={880} width={160} height={50} fill="#8A94A8" />
      {Array.from({ length: 4 }, (_, k) => { const t = ((f + k * 8) % 32) / 32; return <g key={k} opacity={(1 - on(f, exactly, 10)) * on(f, world + 20, 8)}><Coin x={MX + 500} y={lerp(900, 980, t)} s={0.4} /></g> })}
      <g opacity={win(f, exactly - 4, youtube - 2, 10)}>
        <CoinTower x={1680} y={990} n={Math.min(15, Math.max(0, (f - n198) / 1.4))} s={0.6} color={P.sky} /><text x={1680} y={980 - 26 * 0.6 * Math.min(15, Math.max(0, (f - n198) / 1.4)) - 40} textAnchor="middle" fill="#FFFFFF" opacity={on(f, n198 + 10, 6)} style={{ font: '400 54px "Bebas Neue"' }}>$198B</text>
        <CoinTower x={1840} y={990} n={Math.min(17, Math.max(0, (f - n224) / 1.4))} s={0.6} /><text x={1840} y={980 - 26 * 0.6 * Math.min(17, Math.max(0, (f - n224) / 1.4)) - 40} textAnchor="middle" fill={P.gold} opacity={on(f, n224 + 10, 6)} style={{ font: '400 54px "Bebas Neue"' }}>$224.5B</text>
        <g opacity={on(f, n198, 6)}><text x={1680} y={1052} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>2024</text><text x={1840} y={1052} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>2025</text></g>
      </g>
      <g opacity={win(f, together, exactly, 8)} transform={`translate(1740 700) scale(${pop(f, n13)})`}><Coin x={0} y={0} s={1.6} text="+13%" /></g>
      {/* # you at the chalkboard */}
      <Person f={f} who="worker" beats={gestB([[0, 'lookFar', 'shocked'], [two, 'countA', 'neutral'], [many, 'point', 'neutral'], [price41, 'explain', 'thinking'], [n6, 'thumbsUp', 'smiling'], [simple44, 'explain', 'neutral'], [n100, 'countA', 'neutral'], [n106, 'countB', 'neutral'], [n113, 'present', 'smiling'], [n13, 'celebrate', 'smiling'], [exactly, 'point', 'smiling'], [engine, 'fistPump', 'smiling'], [youtube, 'lookFar', 'shocked']], G)} x={680} y={1000} s={1.05} flip />
      </g>
      </g>
      <Headline f={f} lines={[[world, 'NOW TIMES THE WHOLE WORLD', P.ink, 104], [two, 'CLICKS × PRICE PER CLICK', P.goldInk, 104], [price41, 'PRICE PER CLICK = CLICK MONEY ÷ CLICKS', P.ink, 88], [n6, '2025: PAID CLICKS +6%', P.mintInk, 104],
        [n7, 'PRICE PER CLICK +7%', P.mintInk, 104], [simple44, 'EXAMPLE', P.ink, 110], [together, '≈ +13% · OUR CALCULATION', P.goldInk, 104], [n198, 'SEARCH: $198B → $224.5B', P.goldInk, 104], [engine, 'THE ENGINE', P.ink, 110], [youtube, '2025 ADS: ABOUT $295B', P.goldInk, 104]]} />
      <Vignette id="gg-clicks" />
    </g>
  )
}

const BEATS = ['s42:in', 's45:each', 's46:more', 's46:more#2', 's50:calculation', 's50:from', 's50:billion', 's39:from', 's40:and', 's41:from', 's42:google', 's42:said', 's43:of', 's44:numbers', 's45:100#2', 's46:now', 's46:1', 's46:7#2', 's48:put', 's50:revenue', 's50:grew', 's51:pricier', 's51:and', 's52:search', 's52:in', 's38:world', 's39:two', 's40:many', 's40:costs', 's41:price', 's41:divided', 's42:6', 's43:7', 's44:simple', 's45:100', 's46:106', 's47:113', 's48:together', 's48:13', 's49:exactly', 's50:198', 's50:224', 's51:engine', 's52:youtube', 's52:websites', 's52:295']
export const GG_CLICKS = makePiece('gg-clicks', 'Google long (casino-style): Google’s money machine in an engine room — pointers rain into a CLICKS hopper and coins into a PRICE / CLICK hopper, gears turn and a pipe pours money into a bin; you work a chalkboard: price per click = click money ÷ clicks, then a made-up example 100 × $1 = $100 → 106 × $1.07 ≈ $113 = about +13%; gauges read +6% clicks and +7% price; towers grow from $198B (2024) to $224.5B (2025); the gears spin fast on “engine”; YouTube and WEBSITES pipes join and the display reads ALL ADS 2025 ≈ $295B', {
  mood: 'light', Component: Clicks, beats: BEATS,
  sfx: [['s42:6', 'ding', 0.3], ['s43:7', 'ding', 0.3], ['s47:113', 'coin', 0.3], ['s48:13', 'chime', 0.3], ['s51:engine', 'swish', 0.3], ['s52:295', 'coin', 0.35]] })
