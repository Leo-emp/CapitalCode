// ---------------------------------------------------------------- s1–s9: the hook (casino-style rebuild).
// One cosy room at night that stays for the whole hook. You stand at a table and type "running shoes" on a big
// laptop; a $0 tag pops. Through the window, the ALPHABET building glows and a coin tower beside it climbs to
// $224.5B. Three sticky notes (FEE, SUBSCRIPTION, SIGN-UP) get crossed out as you shake your head. A wall calendar
// shows 1 DAY and a $615M coin drops into a jar. The building's floors fill blue past half (search ≈ 56%). A big "?"
// rises over the laptop; you press enter with a flash; the screen shows a bid paddle, a phone, a gavel in turn; coins
// stream from the laptop out to the building, one comes back to the phone in your hand, and an AI sparkle lands.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Jar, Person, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { CoinTower, gestB } from '../buffett/hook'
import { Gavel, PhoneB, SearchBar } from './kit'

// # the room: warm wall, wooden floor, skirting board
export const Room: React.FC<{ wall?: string; floor?: string }> = ({ wall = '#EFE6D6', floor = '#B98F63' }) => (
  <g>
    <rect x={0} y={0} width={1920} height={1000} fill={wall} />
    <rect x={0} y={1000} width={1920} height={80} fill={floor} /><rect x={0} y={990} width={1920} height={14} fill="#8E6A45" />
  </g>
)
// # a window onto the night city; children are drawn inside (clipped)
export const NightWindow: React.FC<{ x: number; y: number; w: number; h: number; f: number; id: string; children?: React.ReactNode }> = ({ x, y, w, h, f, id, children }) => (
  <g>
    <defs><clipPath id={`win-${id}`}><rect x={x} y={y} width={w} height={h} /></clipPath></defs>
    <rect x={x - 22} y={y - 22} width={w + 44} height={h + 44} rx={10} fill="#8E6A45" />
    <g clipPath={`url(#win-${id})`}>
      <rect x={x} y={y} width={w} height={h} fill="#16223D" />
      {Array.from({ length: 18 }, (_, k) => <circle key={k} cx={x + ((k * 137) % w)} cy={y + 20 + ((k * 71) % (h * 0.45))} r={2 + (k % 3)} fill="#FFFFFF" opacity={0.35 + 0.3 * Math.sin(f / 10 + k)} />)}
      {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={x + k * (w / 6)} y={y + h - 120 - (k % 3) * 40} width={w / 6 - 14} height={200} fill="#22304F" />)}
      {children}
    </g>
    <rect x={x + w / 2 - 8} y={y} width={16} height={h} fill="#8E6A45" opacity={0} />
  </g>
)
// # a standing table with a big laptop; screen children drawn in a 440 × 270 screen centred at (sx, sy)
export const Laptop: React.FC<{ x: number; y: number; glow?: number; children?: React.ReactNode }> = ({ x, y, glow = 0, children }) => (
  <g>
    <rect x={x - 280} y={y} width={560} height={30} rx={8} fill="#7A5236" />
    <rect x={x - 250} y={y + 30} width={26} height={1000 - y - 30} fill="#5C3D27" /><rect x={x + 224} y={y + 30} width={26} height={1000 - y - 30} fill="#5C3D27" />
    {glow > 0 && <ellipse cx={x} cy={y - 150} rx={330} ry={200} fill="#CFE3FF" opacity={0.35 * glow} />}
    <rect x={x - 240} y={y - 300} width={480} height={300} rx={18} fill="#2A3448" />
    <rect x={x - 220} y={y - 285} width={440} height={270} rx={8} fill="#FFFFFF" />
    <g>{children}</g>
    <rect x={x - 270} y={y - 12} width={540} height={18} rx={9} fill="#5B6680" />
  </g>
)
// # the ALPHABET building at night; fill 0–1 lights its floors blue from the bottom
export const HQ: React.FC<{ x: number; y: number; s?: number; fill?: number; label?: string }> = ({ x, y, s = 1, fill = 0, label = 'ALPHABET' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-480} width={300} height={480} fill="#2E3F66" />
    <rect x={-150} y={-480 * fill} width={300} height={480 * fill} fill="#1A73E8" opacity={0.85} />
    {Array.from({ length: 9 }, (_, r) => [0, 1, 2, 3].map((k) => <rect key={`${r}-${k}`} x={-120 + k * 66} y={-450 + r * 50} width={42} height={28} rx={4} fill={P.gold} opacity={0.55} />))}
    <rect x={-170} y={-520} width={340} height={50} rx={10} fill="#0D1424" />
    <text x={0} y={-484} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>{label}</text>
  </g>
)

// # a pie: part 0–1 of the circle filled (t animates it)
export const Pie: React.FC<{ x: number; y: number; r: number; part: number; t?: number; color?: string; rest?: string }> = ({ x, y, r, part, t = 1, color = '#1A73E8', rest = '#C9D3E2' }) => {
  const a = 2 * Math.PI * part * t, ex = x + r * Math.sin(a), ey = y - r * Math.cos(a)
  return <g><circle cx={x} cy={y} r={r} fill={rest} />{t > 0 && <path d={`M${x} ${y} L${x} ${y - r} A${r} ${r} 0 ${part * t > 0.5 ? 1 : 0} 1 ${ex} ${ey} Z`} fill={color} />}</g>
}

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), nothing = c('s1:nothing'), yet = c('s2:yet'), n224 = c('s2:224'), dollars2 = c('s2:dollars')
  const fee = c('s3:fee'), sub = c('s3:subscription'), sign = c('s3:signup'), calc4 = c('s4:calculation'), n615 = c('s4:615'), day4 = c('s4:day')
  const half = c('s5:half'), alphabet = c('s5:alphabet'), free6 = c('s6:free'), money6 = c('s6:money'), split = c('s7:split'), enter = c('s7:enter')
  const auction8 = c('s8:auction'), phone8 = c('s8:phone'), court = c('s8:court'), video = c('s9:video'), pays9 = c('s9:pays'), ai9 = c('s9:ai')
  // # sentence starts: every line's objects leave when the next line begins (owner rule)
  const s3 = c('s3'), s4 = c('s4'), s5 = c('s5'), s6 = c('s6'), s7 = c('s7')
  // # extra gesture words (you act on each pause)
  const G = [c('s2:google'), c('s5:parent'), c('s9:money'), c('s4:day')]
  const LX = 780, LY = 720, SX = LX, SY = LY - 150
  // # what the laptop screen shows: the search, then one icon at a time
  const scr = f < auction8 || f >= c('s9') ? 0 : f < phone8 ? 1 : f < court ? 2 : 3
  return (
    <g>
      <StageBg id="gg-hook" frame={f} />
      <Room />
      {/* # quiet room details: a framed picture, a rug, a floor lamp */}
      <g transform="translate(250 400)" opacity={1 - win(f, s4 - 6, s5, 8)}><rect x={-110} y={-80} width={220} height={160} rx={8} fill="#8E6A45" /><rect x={-94} y={-64} width={188} height={128} rx={4} fill="#BFD9EA" /><path d="M-94 64 L-30 -10 L20 40 L60 0 L94 40 L94 64 Z" fill="#7FB48E" /><circle cx={50} cy={-30} r={16} fill={P.gold} /></g>
      <ellipse cx={700} cy={1030} rx={520} ry={34} fill="#A8794F" opacity={0.55} />
      <g transform="translate(90 1000)"><rect x={-6} y={-420} width={12} height={420} fill="#5C4A3A" /><path d="M-60 -420 L60 -420 L40 -500 L-40 -500 Z" fill="#F2D27A" /><ellipse cx={0} cy={-380} rx={90} ry={50} fill={P.gold} opacity={0.15 + 0.03 * Math.sin(f / 11)} /><ellipse cx={0} cy={-4} rx={50} ry={8} fill="#5C4A3A" /></g>
      <Headline f={f} lines={[[nothing, 'FREE FOR YOU', P.mintInk, 110], [n224, 'GOOGLE SEARCH 2025: $224.5 BILLION', P.goldInk, 96], [fee, 'NO FEE · NO SUBSCRIPTION · NO SIGN-UP', P.ink, 92], [n615, '≈ $615 MILLION A DAY · OUR CALCULATION', P.goldInk, 90],
        [half, 'MORE THAN HALF OF ALPHABET’S REVENUE', P.ink, 92], [free6, 'HOW DOES FREE MAKE THAT MUCH?', P.ink, 100], [enter, 'THE SPLIT SECOND AFTER ENTER', P.ink, 100], [video, 'WHERE THE MONEY COMES FROM', P.ink, 100]]} />
      {/* # the window: the ALPHABET building, its coin tower, its floors filling past half */}
      <NightWindow x={1160} y={280} w={640} h={600} f={f} id="gg-hook">
        <HQ x={1400} y={880} s={0.85} fill={0.557 * easeInOut(span(f, half, half + 24)) * (1 - on(f, s6, 10))} />
        <g opacity={1 - on(f, s3, 8)}><CoinTower x={1680} y={860} n={Math.min(22, Math.max(0, (f - yet) / 1.4))} s={0.5} /></g>
        {f > n224 && <text x={1680} y={lerp(560, 520, on(f, n224, 10))} textAnchor="middle" fill={P.gold} opacity={on(f, n224, 6) * (1 - on(f, s3, 8))} style={{ font: '400 60px "Bebas Neue"' }}>$224.5B</text>}
        <g opacity={on(f, alphabet, 8) * (1 - on(f, s6, 8))}><rect x={1270} y={600} width={260} height={80} rx={14} fill="#0D1424" opacity={0.85} /><text x={1400} y={656} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"' }}>SEARCH ≈ 56%</text></g>
      </NightWindow>
      {/* # everything in front of the window, a little smaller (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.82) translate(-960 -1000)">
      {/* # sticky notes: FEE, SUBSCRIPTION, SIGN-UP crossed out — drawn on the laptop screen below */}
      <g opacity={0}>
        {[[fee, 'FEE', '#FDE68A'], [sub, 'SUBSCRIPTION', '#BFE3C9'], [sign, 'SIGN-UP', '#F8C4C0']].map(([at, lab, col], k) => <g key={k} transform={`translate(${620 + k * 240} 330) rotate(${(k - 1) * 4}) scale(${pop(f, at as number)})`} opacity={on(f, at as number, 4)}>
          <rect x={-110} y={-60} width={220} height={120} rx={6} fill={col as string} /><text x={0} y={14} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{lab as string}</text>
          <path d="M-90 -40 L90 40" stroke={P.coral} strokeWidth={12} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - on(f, (at as number) + 6, 6))} />
        </g>)}
      </g>
      {/* # the calendar and the $615M coin dropping into a jar */}
      <g opacity={win(f, s4, s5, 8)}>
        <g transform={`translate(170 330) scale(${pop(f, calc4) * 1.2})`}><rect x={-100} y={-110} width={200} height={220} rx={14} fill={P.paper} /><rect x={-100} y={-110} width={200} height={60} rx={14} fill={P.coral} /><text x={0} y={60} textAnchor="middle" fill={P.navy0} style={{ font: '400 80px "Bebas Neue"' }}>1 DAY</text></g>
        <g opacity={on(f, n615, 4)} transform={`translate(170 ${lerp(560, 860, easeInOut(span(f, n615 + 14, n615 + 30)))})`}><Coin x={0} y={0} s={1.5} /><text x={0} y={-90} textAnchor="middle" fill={P.goldInk} style={{ font: '400 64px "Bebas Neue"' }}>$615M</text></g>
        <Jar x={170} y={1000} s={1.1} fill={on(f, n615 + 28, 10) * 0.7} />
      </g>
      {/* # the table and laptop */}
      <g transform={`translate(${LX} 1000) scale(1.2) translate(${-LX} -1000)`}><Laptop x={LX} y={LY} glow={on(f, enter, 3) * (1 - on(f, enter + 6, 14))}>
        {scr === 0 && f >= fee - 4 && f < calc4 && <g>{[[fee, 'FEE'], [sub, 'SUBSCRIPTION'], [sign, 'SIGN-UP']].map(([at, lab], k) => <g key={k} opacity={on(f, (at as number) - 2, 4)} transform={`translate(${SX} ${SY - 60 + k * 76})`}><text textAnchor="middle" y={20} fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>{lab as string}</text><path d="M-170 0 L170 0" stroke={P.coral} strokeWidth={12} strokeLinecap="round" strokeDasharray={340} strokeDashoffset={340 * (1 - on(f, (at as number) + 6, 6))} /></g>)}</g>}
        {scr === 0 && (f < fee - 4 || f >= calc4) && <g>
          <SearchBar x={SX} y={SY - 40} w={620} s={0.68} text="running shoes" t={span(f, s1 + 4, s1 + 36)} press={on(f, enter, 2)} />
          <g opacity={on(f, nothing, 4) * (1 - on(f, yet, 8))} transform={`translate(${SX} ${SY + 70}) scale(${pop(f, nothing) * 0.9})`}><PriceTag x={0} y={0} text="$0" r={-6} color={P.mint} /></g>
          <g opacity={on(f, ai9, 6)} transform={`translate(${SX + 150} ${SY + 70}) scale(${pop(f, ai9)})`}><text textAnchor="middle" fill="#1A73E8" style={{ font: '700 90px Inter' }}>✦</text></g>
        </g>}
        {scr === 1 && <g transform={`translate(${SX} ${SY + 50}) scale(${pop(f, auction8) * 0.75})`}><rect x={-8} y={-20} width={16} height={130} fill="#8E5E36" /><circle cx={0} cy={-70} r={80} fill="#FFFFFF" stroke="#1A73E8" strokeWidth={10} /><text x={0} y={-44} textAnchor="middle" fill="#202124" style={{ font: '400 80px "Bebas Neue"' }}>$</text></g>}
        {scr === 2 && <g transform={`translate(${SX} ${SY}) scale(${pop(f, phone8) * 0.38})`}><PhoneB x={0} y={0} /></g>}
        {scr === 3 && <g transform={`translate(${SX - 40} ${SY - 10}) scale(${pop(f, court) * 0.8})`}><Gavel x={0} y={0} hit={easeInOut(span(f, court + 2, court + 10))} /></g>}
      </Laptop></g>
      {/* # the big question mark over the laptop */}
      <g opacity={win(f, money6 - 2, s7, 6)} transform={`translate(${LX} 640) scale(${pop(f, money6)})`}><text textAnchor="middle" y={60} fill={P.goldInk} style={{ font: '400 220px "Bebas Neue"' }}>?</text></g>
      {/* # coins stream from the laptop out to the building; one comes back to your phone */}
      {Array.from({ length: 6 }, (_, k) => { const p = fly(f, video + k * 4, [LX + 100, 560], [1380, 520], 18, 160); return <g key={k} opacity={p.o * (1 - on(f, ai9 + 20, 8))}><Coin x={p.x} y={p.y} s={0.6} /></g> })}
      {(() => { const p = fly(f, pays9, [1380, 520], [470, 620], 20, 140); return <g opacity={p.o}><Coin x={p.x} y={p.y} s={0.6} /></g> })()}
      <Person f={f} who="buyer" beats={gestB([[0, 'type', 'neutral'], [nothing, 'shrug', 'smiling'], [yet, 'lookFar', 'shocked'], [fee, 'crossNoA', 'smug'], [calc4, 'point', 'thinking'], [half, 'lookFar', 'shocked'], [free6, 'scratchHead', 'thinking'], [split, 'type', 'neutral'], [auction8, 'explain', 'neutral'], [phone8, 'phone', 'smiling'], [court, 'point', 'worried'], [video, 'present', 'smiling'], [pays9, 'phone', 'smiling']], G)} x={340} y={1000} s={1.15} />
      </g>
      <Vignette id="gg-hook" />
    </g>
  )
}

const BEATS = ['s4:day', 's2:google', 's5:parent', 's9:money', 's1', 's1:nothing', 's2:yet', 's2:224', 's2:dollars', 's3:fee', 's3:subscription', 's3:signup', 's4:calculation', 's4:615', 's5:half', 's5:alphabet', 's6:free', 's6:money', 's7:split', 's7:enter', 's8:auction', 's8:phone', 's8:court', 's9:video', 's9:pays', 's9:ai']
export const GG_HOOK = makePiece('gg-hook', 'Google long (casino-style): one cosy room at night; you type running shoes on a big laptop and a $0 tag pops; through the window the ALPHABET building glows and its coin tower climbs to $224.5B; FEE, SUBSCRIPTION and SIGN-UP sticky notes get crossed out; a 1 DAY calendar drops a $615M coin into a jar; the building floors fill blue past half (search ≈ 56%); a big ? over the laptop; enter is pressed with a flash; the screen shows a bid paddle, a phone and a striking gavel; coins stream out to the building, one returns to your phone, and an AI sparkle lands', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:nothing', 'pop', 0.3], ['s2:224', 'coin', 0.35], ['s3:signup', 'click', 0.3], ['s4:615', 'ding', 0.3], ['s7:enter', 'click', 0.35], ['s8:court', 'thud', 0.3]] })
