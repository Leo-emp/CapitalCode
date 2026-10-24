// ============================================================
// SCENES D — NICHE EXPANSION (30), owner 2026-10-24:
// investing · personal finance · AI & tech · business · crypto ·
// economy. Same style rules as the first 30: dark base, thin blue
// line art, one warm/lit focal area, 3 parallax layers, no people
// baked in (cast Actors are placed by the engine), no real brands.
// Every scene has a `focus` anchor for the close/medium camera.
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import {
  BlindsWindow, Desk, DeskLamp, Door, Extra, L, LightPool, makeScene, Monitor, NightSky, OfficeChair, Pavement, Plant, rnd,
  RoomShell, Shelf, Skyline, StreetLamp,
} from './kit'

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })
const G = COLORS

// ------------------------------------------------------------ shared pieces for this batch
const Columns: React.FC<{ x0: number; x1: number; top: number; bottom: number; n: number; fill?: string }> = ({ x0, x1, top, bottom, n, fill = '#E4DCCD' }) => (
  <g>{Array.from({ length: n }, (_, i) => {
    const x = x0 + (i * (x1 - x0)) / (n - 1)
    return <g key={i}><rect x={x - 22} y={top} width={44} height={bottom - top} fill={fill} stroke="#B8A890" strokeWidth={3} />
      {[0, 1, 2].map((k) => <line key={k} x1={x - 12 + k * 12} x2={x - 12 + k * 12} y1={top + 10} y2={bottom - 10} stroke="#B8A890" strokeWidth={1.5} opacity={0.6} />)}</g>
  })}</g>
)

const Candles: React.FC<{ x: number; y: number; w: number; h: number; n: number; seed: number; frame: number; trend?: number }> = ({ x, y, w, h, n, seed, frame, trend = 0 }) => {
  let level = 0.5
  return (
    <g>{Array.from({ length: n }, (_, i) => {
      const move = (rnd(seed + i) - 0.5 + trend * 0.25) * 0.16
      const o = level, c = Math.min(0.95, Math.max(0.05, level + move)); level = c
      const hi = Math.min(o, c) - rnd(seed + i + 9) * 0.05, lo = Math.max(o, c) + rnd(seed + i + 19) * 0.05
      const cx = x + (i + 0.5) * (w / n), col = c < o ? G.green : G.red   // # y grows downward: smaller y = higher price
      const vis = i < n - 1 || frame % 20 < 14
      return vis && <g key={i}><line x1={cx} x2={cx} y1={y + hi * h} y2={y + lo * h} stroke={col} strokeWidth={2} />
        <rect x={cx - (w / n) * 0.3} y={y + Math.min(o, c) * h} width={(w / n) * 0.6} height={Math.max(3, Math.abs(c - o) * h)} fill={col} /></g>
    })}</g>
  )
}

const Counter: React.FC<{ x: number; y: number; w: number; h?: number }> = ({ x, y, w, h = 150 }) => (
  <g><rect x={x} y={y} width={w} height={22} fill="#2A1C14" stroke={L.line} strokeWidth={2} />
    <rect x={x + 10} y={y + 22} width={w - 20} height={h} fill="#160F0B" stroke={L.line} strokeWidth={2} />
    {Array.from({ length: Math.floor((w - 20) / 70) }, (_, i) => <line key={i} x1={x + 45 + i * 70} x2={x + 45 + i * 70} y1={y + 30} y2={y + h + 14} stroke={L.dim} strokeWidth={1} />)}</g>
)

const Cubicle: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => (
  <g><path d={`M${x} ${y} L${x} ${y - 160} L${x + 260} ${y - 160} L${x + 260} ${y}`} fill="#0B1424" stroke={L.line} strokeWidth={2} />
    <rect x={x + 20} y={y - 70} width={220} height={12} fill={L.ink} stroke={L.line} strokeWidth={1.5} />
    <Monitor x={x + 80} y={y - 150} w={100} h={66} frame={frame + x} stand={false} /></g>
)

const RobotArm: React.FC<{ x: number; y: number; frame: number; phase: number }> = ({ x, y, frame, phase }) => {
  const a1 = -30 + Math.sin(frame / 18 + phase) * 22, a2 = 60 + Math.sin(frame / 14 + phase) * 30
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-40} y={-20} width={80} height={20} fill="#3A4558" stroke={L.line} strokeWidth={2} />
      <g transform={`rotate(${a1})`}><rect x={-12} y={-160} width={24} height={160} rx={10} fill="#F2A33A" stroke="#0A111C" strokeWidth={2} />
        <g transform={`translate(0 -160) rotate(${a2})`}><rect x={-10} y={-120} width={20} height={120} rx={8} fill="#F2A33A" stroke="#0A111C" strokeWidth={2} />
          <rect x={-18} y={-136} width={36} height={18} rx={4} fill="#3A4558" /></g></g>
    </g>
  )
}

const Bull: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#C9A06B" stroke="#6A4A22" strokeWidth={3}>
    <path d="M-150 -40 C-140 -100 -40 -120 40 -100 C100 -110 150 -80 160 -40 L150 40 L120 40 L110 0 L-90 0 L-100 40 L-130 40 L-140 0 Z" />
    <path d="M140 -70 C170 -90 200 -70 196 -40 C190 -20 170 -24 160 -30" />
    <path d="M176 -84 C190 -120 220 -120 228 -104 M168 -86 C150 -124 120 -122 116 -104" fill="none" strokeWidth={8} />
    <path d="M-150 -40 C-180 -40 -196 -20 -190 0" fill="none" strokeWidth={6} />
  </g>
)
const Bear: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#5A4A44" stroke="#2A201C" strokeWidth={3}>
    <path d="M-140 -30 C-140 -100 -40 -120 50 -104 C120 -96 150 -60 150 -20 L140 40 L110 40 L100 4 L-80 4 L-90 40 L-120 40 L-130 0 Z" />
    <circle cx={150} cy={-60} r={42} /><circle cx={136} cy={-98} r={14} /><circle cx={176} cy={-94} r={13} />
    <ellipse cx={186} cy={-50} rx={16} ry={11} fill="#3A2E2A" />
  </g>
)

const Jar: React.FC<{ x: number; y: number; fill: number; label: string; color: string }> = ({ x, y, fill, label, color }) => (
  <g><rect x={x - 46} y={y - 140} width={92} height={140} rx={16} fill="rgba(180,220,255,0.10)" stroke="#9FC4E8" strokeWidth={3} />
    <rect x={x - 40} y={y - 6 - 128 * fill} width={80} height={128 * fill} rx={10} fill={color} opacity={0.85} />
    <rect x={x - 50} y={y - 156} width={100} height={18} rx={6} fill="#7D8B9C" />
    <rect x={x - 34} y={y - 100} width={68} height={28} rx={4} fill={L.cream} /><text x={x} y={y - 80} textAnchor="middle" fill="#0A111C" style={{ font: '700 16px Inter' }}>{label}</text></g>
)

// ============================================================
// THE 30 SCENES
// ============================================================
export const NICHE_SCENES = [
  // ---------------------------------------------------------------- INVESTING (8)
  makeScene('wall-street', 'Wall Street at night', ['investing', 'markets', 'stocks', 'finance', 'street'],
    { stand: A(330, 1011, 1, 'front'), focus: A(1180, 520), prop1: A(1180, 230), prop2: A(1600, 700, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} ground={900} seed={51} tall={1.3} /></g>,
      mid: <g><rect x={700} y={300} width={960} height={600} fill="#1C1914" /><rect x={700} y={300} width={960} height={36} fill="#D9D0C2" />
        {[0, 1, 2].map((k) => <rect key={k} x={880 + k * 220} y={620} width={120} height={240} fill="#FFD58A" opacity={0.18} />)}<path d="M660 300 L1180 170 L1700 300 Z" fill="#CFC5B5" stroke="#B8A890" strokeWidth={3} />
        <Columns x0={760} x1={1600} top={330} bottom={860} n={6} />
        {[900, 1460].map((x) => <g key={x}><line x1={x} x2={x} y1={300} y2={140} stroke="#9AA6B4" strokeWidth={4} /><path d={`M${x} 140 L${x + 70} 156 L${x} 176 Z`} fill={G.blue} opacity={0.8} /></g>)}
        <LightPool cx={1180} cy={600} rx={700} ry={340} u={u} k="ws" o={0.18} /></g>,
      front: <g><Pavement y={900} u={u} /><StreetLamp x={560} ground={1000} frame={frame} u={u} /></g>,
    })),
  makeScene('bull-bear', 'Bull and bear statues', ['investing', 'markets', 'stocks', 'sentiment'],
    { stand: A(960, 1040, 0.85), focus: A(960, 760), prop1: A(960, 300), prop2: A(1500, 300) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={60} /><Skyline frame={frame} ground={880} seed={61} tall={0.9} /></g>,
      mid: <g><rect x={0} y={880} width={1920} height={200} fill="#0A0F18" />
        <rect x={180} y={860} width={640} height={40} fill="#3A4558" /><Bull x={480} y={800} s={1.45} />
        <rect x={1120} y={860} width={640} height={40} fill="#3A4558" /><Bear x={1420} y={806} s={1.45} />
        <LightPool cx={500} cy={800} rx={340} ry={200} u={u} k="bl" color={G.green} o={0.18} /><LightPool cx={1400} cy={800} rx={340} ry={200} u={u} k="br" color={G.red} o={0.18} /></g>,
    })),
  makeScene('chart-wall', 'Giant candlestick chart wall', ['investing', 'markets', 'stocks', 'trading', 'thumbnail'],
    { stand: A(300, 1011), focus: A(1100, 470), prop1: A(1100, 200), prop2: A(1600, 820, 0.8) },
    ({ u, frame, variant }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={480} y={110} width={1340} height={720} rx={10} fill="#050B16" stroke={L.line} strokeWidth={3} />
        {[0, 1, 2, 3].map((k) => <line key={k} x1={500} x2={1800} y1={200 + k * 160} y2={200 + k * 160} stroke={L.dim} strokeDasharray="4 10" />)}
        <Candles x={520} y={150} w={1260} h={640} n={34} seed={variant === 'crash' ? 7 : 3} frame={frame} trend={variant === 'crash' ? -1 : variant === 'boom' ? 1 : 0} /></g>,
      mid: <LightPool cx={1100} cy={470} rx={760} ry={420} u={u} k="cw" color="#4FB5E8" o={0.12} />,
    })),
  makeScene('portfolio-dashboard', 'Portfolio dashboard', ['investing', 'portfolio', 'etf', 'personal-finance', 'tech'],
    { stand: A(300, 1011), focus: A(1150, 470), prop1: A(1150, 200), prop2: A(1650, 820, 0.8) },
    ({ u, frame }) => {
      const parts: [number, string][] = [[0.42, G.blue], [0.23, G.green], [0.18, G.champagne], [0.1, '#B48CFF'], [0.07, G.red]]
      let acc = -Math.PI / 2
      return {
        back: <g><RoomShell floor={960} panels={false} /><rect x={560} y={130} width={1200} height={680} rx={14} fill="#071526" stroke={L.line} strokeWidth={3} /></g>,
        mid: <g>
          {parts.map(([f, c], i) => {
            const a0 = acc, a1 = acc + f * Math.PI * 2 * Math.min(1, frame / 30 + 0.2); acc += f * Math.PI * 2
            const big = a1 - a0 > Math.PI ? 1 : 0, R = 190, cx = 820, cy = 470
            return <path key={i} d={`M${cx} ${cy} L${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)} A${R} ${R} 0 ${big} 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} Z`} fill={c} stroke="#071526" strokeWidth={4} />
          })}
          <circle cx={820} cy={470} r={90} fill="#071526" />
          <text x={820} y={482} textAnchor="middle" fill={G.text} style={{ font: '800 40px Inter' }}>+12%</text>
          {['Index fund', 'Bonds', 'Gold', 'Tech', 'Cash'].map((t, i) => (
            <g key={t}><rect x={1100} y={300 + i * 70} width={22} height={22} rx={4} fill={parts[i][1]} />
              <text x={1140} y={318 + i * 70} fill={G.text} style={{ font: '600 26px Inter' }}>{t}</text>
              <text x={1650} y={318 + i * 70} textAnchor="end" fill={G.dim} style={{ font: '700 26px "JetBrains Mono"' }}>{Math.round(parts[i][0] * 100)}%</text></g>))}
          <LightPool cx={1150} cy={470} rx={760} ry={420} u={u} k="pd" color="#4FB5E8" o={0.1} /></g>,
      }
    }),
  makeScene('ipo-bell', 'IPO bell podium', ['investing', 'ipo', 'stocks', 'business'],
    { stand: A(760, 1000, 1.02), focus: A(1150, 520), prop1: A(1150, 260), prop2: A(1550, 360) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{Array.from({ length: 12 }, (_, i) => <rect key={i} x={140 + i * 140} y={120} width={100} height={60} fill="#071526" stroke={L.line} strokeWidth={2} />)}
        {Array.from({ length: 30 }, (_, i) => <rect key={i} x={rnd(i) * 1920} y={((rnd(i + 3) * 500 + frame * 5) % 600) - 40} width={10} height={16} fill={[G.champagne, G.blue, G.green, G.red][i % 4]} transform={`rotate(${frame * 6 + i * 30} ${rnd(i) * 1920} ${rnd(i + 3) * 500})`} opacity={0.8} />)}</g>,
      mid: <g><rect x={900} y={560} width={500} height={400} fill="#1A2638" stroke={G.champagne} strokeWidth={3} />
        <path d="M1110 330 Q1150 250 1190 330 L1210 430 L1090 430 Z" fill="#E9C25A" stroke="#7A5A12" strokeWidth={3} transform={`rotate(${Math.sin(frame / 3) * 8} 1150 300)`} />
        <rect x={1146} y={440} width={8} height={120} fill="#9AA6B4" /><LightPool cx={1150} cy={500} rx={500} ry={360} u={u} k="ip" o={0.25} /></g>,
    })),
  makeScene('gold-vault', 'Gold bars in a vault', ['investing', 'gold', 'commodities', 'wealth', 'economy'],
    { stand: A(330, 1010), focus: A(1150, 700), prop1: A(1150, 300), prop2: A(1600, 400) },
    ({ u }) => ({
      back: <g><RoomShell floor={960} />{[0, 1, 2].map((r) => <line key={r} x1={700} x2={1800} y1={480 + r * 160} y2={480 + r * 160} stroke={L.line} strokeWidth={3} />)}</g>,
      mid: <g>{Array.from({ length: 3 }, (_, r) => Array.from({ length: 9 }, (_, i) => (
        <path key={`${r}${i}`} d={`M${720 + i * 118} ${470 + r * 160} L${822 + i * 118} ${470 + r * 160} L${806 + i * 118} ${426 + r * 160} L${736 + i * 118} ${426 + r * 160} Z`} fill="#E9C25A" stroke="#7A5A12" strokeWidth={2} />)))}
        <LightPool cx={1250} cy={640} rx={700} ry={320} u={u} k="gv" color="#E9C25A" o={0.22} /></g>,
    })),
  makeScene('dividend-mailbox', 'Dividend cheques in the mailbox', ['investing', 'dividends', 'passive-income', 'personal-finance'],
    { stand: A(400, 1011), focus: A(1250, 620), prop1: A(1250, 360), prop2: A(1600, 300) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><path d="M0 820 Q480 760 960 800 T1920 780 L1920 1080 L0 1080 Z" fill="#06101C" /></g>,
      mid: <g><rect x={1240} y={700} width={20} height={260} fill="#5A3B2A" />
        <path d="M1130 560 L1370 560 L1370 700 L1130 700 Z M1130 560 Q1250 480 1370 560" fill="#2A5AA8" stroke="#0A111C" strokeWidth={3} />
        {[0, 1, 2].map((i) => <rect key={i} x={1180 + i * 30} y={540 - i * 26 - Math.sin(frame / 10 + i) * 6} width={120} height={56} fill={L.cream} stroke="#7D8896" strokeWidth={2} transform={`rotate(${-12 + i * 9} ${1240 + i * 30} 560)`} />)}
        <rect x={1370} y={580} width={10} height={70} fill={G.red} /><path d="M1380 580 L1420 592 L1380 606 Z" fill={G.red} />
        <LightPool cx={1250} cy={620} rx={360} ry={260} u={u} k="dm" o={0.25} /><Plant x={1500} y={960} frame={frame} s={1.2} /></g>,
      front: <rect x={0} y={960} width={1920} height={120} fill="#050A10" />,
    })),
  makeScene('bond-desk', 'Bond trading desk with ledgers', ['investing', 'bonds', 'interest-rates', 'finance'],
    { stand: A(360, 1010), sit: A(1000, 1000, 0.95), focus: A(1050, 640), prop1: A(1050, 300), prop2: A(1550, 380) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} /><Shelf x={1320} y={240} w={460} rows={3} seed={88} /><BlindsWindow x={180} y={160} w={420} h={360} city frame={frame} /></g>,
      mid: <g><Desk x={620} y={740} w={900} /><DeskLamp x={760} y={740} frame={frame} u={u} />
        {[0, 1, 2].map((i) => <rect key={i} x={980 + i * 16} y={700 - i * 14} width={220} height={40} fill={['#5A3B2A', '#2A5A3A', '#3A2A5A'][i]} stroke="#0A111C" strokeWidth={2} />)}
        <Monitor x={1240} y={600} w={220} h={130} frame={frame} trend="down" /><text x={1350} y={588} textAnchor="middle" fill={G.champagne} style={{ font: '700 22px "JetBrains Mono"' }}>10Y 4.2%</text></g>,
    })),

  // ---------------------------------------------------------------- PERSONAL FINANCE (7)
  makeScene('coffee-shop', 'Coffee shop counter', ['personal-finance', 'spending', 'small-business', 'business'],
    { stand: A(420, 1011), focus: A(1200, 620), prop1: A(1200, 300), prop2: A(1550, 560, 0.8), counter: A(1200, 720) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={760} y={140} width={880} height={170} rx={8} fill="#0B1424" stroke={G.champagne} strokeWidth={2} />
        {['LATTE  $5.40', 'CAPPUCCINO  $4.90', 'COLD BREW  $5.10'].map((t, i) => <text key={t} x={800} y={196 + i * 44} fill={L.cream} style={{ font: '600 30px Inter' }}>{t}</text>)}
        <Shelf x={780} y={420} w={840} seed={33} /></g>,
      mid: <g><Counter x={700} y={720} w={1000} /><rect x={1300} y={600} width={150} height={120} rx={8} fill="#7D8B9C" stroke={L.line} strokeWidth={2} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${1360 + i * 10} 590 Q${1350 + i * 10} ${560 - Math.sin(frame / 8 + i) * 10} ${1370 + i * 10} 530`} stroke="#C8D6E6" strokeWidth={4} fill="none" opacity={0.4} />)}
        {[0, 1, 2].map((i) => <path key={i} d={`M${880 + i * 90} 720 L${890 + i * 90} 660 L${940 + i * 90} 660 L${950 + i * 90} 720 Z`} fill={L.cream} stroke="#0A111C" strokeWidth={2} />)}
        <LightPool cx={1200} cy={640} rx={560} ry={260} u={u} k="cs" o={0.26} /></g>,
    })),
  makeScene('checkout', 'Checkout with card machine', ['personal-finance', 'spending', 'credit', 'retail'],
    { stand: A(420, 1011), focus: A(1250, 640), prop1: A(1250, 300), prop2: A(1600, 560, 0.8), counter: A(1250, 740) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><Shelf x={760} y={260} w={1000} rows={3} seed={44} /></g>,
      mid: <g><Counter x={760} y={740} w={1000} />
        <rect x={1180} y={600} width={140} height={140} rx={14} fill="#1A2233" stroke={L.line} strokeWidth={2} /><rect x={1200} y={620} width={100} height={52} rx={4} fill={(frame % 40) < 20 ? '#3DDC97' : '#123A5E'} />
        <text x={1250} y={654} textAnchor="middle" fill="#0A111C" style={{ font: '800 22px Inter' }}>{(frame % 40) < 20 ? 'PAID' : '$84.20'}</text>
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={860 + i * 60} y={690 - (i % 2) * 20} width={48} height={50 + (i % 2) * 20} rx={6} fill={['#D9434E', '#2AA8F2', '#3DDC97', '#F4E9D8', '#E9B949', '#B48CFF'][i]} />)}
        <LightPool cx={1250} cy={660} rx={520} ry={240} u={u} k="co" color="#DCEBF7" o={0.18} /></g>,
    })),
  makeScene('tax-office', 'Tax office counter', ['personal-finance', 'tax', 'government', 'economy'],
    { stand: A(420, 1011), focus: A(1200, 560), prop1: A(1200, 260), prop2: A(1600, 520, 0.8), counter: A(1200, 720) },
    ({ u }) => ({
      back: <g><RoomShell floor={960} />{[0, 1, 2].map((i) => <rect key={i} x={820 + i * 300} y={260} width={240} height={330} fill="none" stroke={L.line} strokeWidth={2} />)}
        <rect x={980} y={150} width={440} height={70} fill={G.red} /><text x={1200} y={198} textAnchor="middle" fill="#fff" style={{ font: '800 38px Inter', letterSpacing: 6 }}>TAX OFFICE</text></g>,
      mid: <g><Counter x={760} y={720} w={900} />{[0, 1, 2, 3].map((i) => <rect key={i} x={980 + i * 40} y={694 - i * 8} width={130} height={28} fill={L.cream} stroke="#7D8896" strokeWidth={2} />)}
        {Array.from({ length: 5 }, (_, i) => <Extra key={i} x={80 + i * 80} y={980} s={0.55} />)}
        <LightPool cx={1200} cy={600} rx={560} ry={280} u={u} k="to" color="#DCEBF7" o={0.15} /></g>,
    })),
  makeScene('savings-jars', 'Savings jars on a desk', ['personal-finance', 'saving', 'budget', 'thumbnail'],
    { stand: A(330, 1010), focus: A(1150, 640), prop1: A(1150, 300), prop2: A(1600, 380) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} /><BlindsWindow x={1380} y={160} w={380} h={380} city frame={frame} /></g>,
      mid: <g><Desk x={640} y={780} w={1000} drawers={false} /><DeskLamp x={720} y={780} frame={frame} u={u} />
        <Jar x={950} y={778} fill={0.8} label="RENT" color={G.blue} /><Jar x={1110} y={778} fill={0.45} label="SAVE" color={G.green} />
        <Jar x={1270} y={778} fill={0.25} label="FUN" color={G.champagne} /><Jar x={1430} y={778} fill={0.6} label="INVEST" color="#B48CFF" />
        <LightPool cx={1150} cy={700} rx={600} ry={240} u={u} k="sj" o={0.22} /></g>,
    })),
  makeScene('apartment-rent', 'Small apartment with rent notice', ['personal-finance', 'housing', 'rent', 'cost-of-living'],
    { stand: A(500, 1010), focus: A(1300, 560), prop1: A(1300, 300), prop2: A(1650, 760, 0.8) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} /><BlindsWindow x={160} y={180} w={320} h={360} city frame={frame} /></g>,
      mid: <g><Door x={1220} y={960} w={180} h={340} />
        <rect x={1250} y={680} width={120} height={150} fill={L.cream} stroke={G.red} strokeWidth={4} transform="rotate(-4 1310 750)" />
        <text x={1310} y={720} textAnchor="middle" fill={G.red} style={{ font: '800 22px Inter' }} transform="rotate(-4 1310 750)">RENT DUE</text>
        <text x={1310} y={770} textAnchor="middle" fill="#0A111C" style={{ font: '800 30px Inter' }} transform="rotate(-4 1310 750)">+8%</text>
        <path d="M620 960 L620 820 Q620 790 650 790 L960 790 Q990 790 990 820 L990 960" fill="#0B1424" stroke={L.line} strokeWidth={2} />
        <Plant x={1560} y={960} frame={frame} /><LightPool cx={1310} cy={760} rx={300} ry={220} u={u} k="ar" o={0.22} /></g>,
    })),
  makeScene('payday-office', 'Cubicle office on payday', ['personal-finance', 'jobs', 'salary', 'business'],
    { stand: A(330, 1010), focus: A(1150, 640), prop1: A(1150, 280), prop2: A(1600, 380) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} />{Array.from({ length: 6 }, (_, i) => <rect key={i} x={140 + i * 300} y={70} width={200} height={14} fill="#DCEBF7" opacity={0.4} />)}</g>,
      mid: <g>{[[620, 820], [900, 820], [1180, 820], [1460, 820], [760, 960], [1040, 960], [1320, 960]].map(([x, y], i) => <Cubicle key={i} x={x} y={y} frame={frame + i * 7} />)}
        <LightPool cx={1150} cy={700} rx={700} ry={300} u={u} k="po" color="#DCEBF7" o={0.12} /></g>,
    })),
  makeScene('pawn-shop', 'Pawn shop', ['personal-finance', 'debt', 'small-business', 'street'],
    { stand: A(360, 1011, 1, 'front'), focus: A(1200, 600), prop1: A(1200, 260), prop2: A(1600, 600, 0.8) },
    ({ u, frame, lightsOn }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} x0={-20} x1={600} ground={960} seed={71} /></g>,
      mid: <g><rect x={640} y={300} width={1160} height={660} fill="#3A3A46" /><rect x={700} y={340} width={1040} height={90} fill="#0B1220" stroke={G.champagne} strokeWidth={3} />
        <text x={1220} y={402} textAnchor="middle" fill="#7FD6FF" opacity={0.3 + 0.7 * lightsOn * (frame % 50 < 46 ? 1 : 0.3)} style={{ font: '64px "Bebas Neue"', letterSpacing: 12 }}>PAWN · CASH · GOLD</text>
        <rect x={720} y={480} width={620} height={360} fill="#FFD58A" opacity={0.25 + 0.5 * lightsOn} stroke={L.cream} strokeWidth={8} />
        {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={800 + i * 90} cy={600 + (i % 2) * 90} r={26} fill={['#E9C25A', '#C9D2DC', '#E9C25A', '#9AA6B4', '#E9C25A', '#C9D2DC'][i]} stroke="#0A111C" strokeWidth={2} />)}
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={720 + i * 52} x2={720 + i * 52} y1={480} y2={840} stroke="#1A2233" strokeWidth={4} />)}
        <Door x={1420} y={960} w={220} h={420} /><LightPool cx={1030} cy={660} rx={520} ry={300} u={u} k="pw" o={0.2 * lightsOn} /></g>,
      front: <Pavement y={960} u={u} />,
    })),

  // ---------------------------------------------------------------- AI & TECH (5)
  makeScene('datacenter-aisle', 'Data centre aisle', ['ai', 'tech', 'cloud', 'data', 'energy'],
    { stand: A(960, 1011), focus: A(960, 520), prop1: A(960, 220), prop2: A(1500, 300) },
    ({ u, frame }) => ({
      back: <g><rect width={1920} height={1080} fill="#03060C" />
        {Array.from({ length: 7 }, (_, d) => {
          const k = 1 - d * 0.12, w = 260 * k, h = 700 * k, y = 540 - h / 2 + 40 * d * 0.2
          return [-1, 1].map((side) => {
            const x = 960 + side * (180 + d * 120 * k * 1.6) - (side < 0 ? w : 0)
            return <g key={`${d}${side}`}><rect x={x} y={y} width={w} height={h} fill="#0B1424" stroke={L.line} strokeWidth={2 * k} />
              {Array.from({ length: 10 }, (_, r) => <circle key={r} cx={x + (side < 0 ? w - 20 : 20) * 1} cy={y + 30 + r * (h / 11)} r={3 * k} fill={(frame + r + d * 3) % 9 < 5 ? G.green : '#4FB5E8'} />)}</g>
          })
        })}</g>,
      mid: <g><path d="M760 1080 L940 560 L980 560 L1160 1080 Z" fill="#0B1E34" opacity={0.6} /><LightPool cx={960} cy={560} rx={520} ry={420} u={u} k="dc" color="#4FB5E8" o={0.2} /></g>,
    })),
  makeScene('chip-cleanroom', 'Chip factory clean room', ['ai', 'tech', 'semiconductors', 'manufacturing'],
    { stand: A(360, 1010), focus: A(1150, 560), prop1: A(1150, 260), prop2: A(1600, 700, 0.8) },
    ({ u, frame }) => ({
      back: <g><rect width={1920} height={1080} fill="#100A04" /><RoomShell floor={960} panels={false} />
        <rect width={1920} height={1080} fill="#E9A23A" opacity={0.08} /></g>,
      mid: <g>{[760, 1060, 1360].map((x, i) => (
        <g key={x}><rect x={x} y={420} width={220} height={420} rx={10} fill="#1A2233" stroke="#E9A23A" strokeWidth={2} />
          <circle cx={x + 110} cy={560} r={70} fill="#2A3446" stroke="#E9A23A" strokeWidth={2} />
          <circle cx={x + 110} cy={560} r={60} fill="none" stroke="#9FC4E8" strokeWidth={1} strokeDasharray="6 4" transform={`rotate(${frame * 3 + i * 40} ${x + 110} 560)`} />
          {Array.from({ length: 16 }, (_, k) => <rect key={k} x={x + 70 + (k % 4) * 20} y={520 + Math.floor(k / 4) * 20} width={14} height={14} fill="#E9A23A" opacity={0.35} />)}</g>))}
        <LightPool cx={1170} cy={600} rx={700} ry={380} u={u} k="cr" color="#E9A23A" o={0.16} /></g>,
    })),
  makeScene('robot-warehouse', 'Robot warehouse', ['ai', 'tech', 'automation', 'jobs', 'business'],
    { stand: A(330, 1010), focus: A(1150, 640), prop1: A(1150, 260), prop2: A(1600, 380) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{Array.from({ length: 4 }, (_, r) => <line key={r} x1={600} x2={1880} y1={340 + r * 150} y2={340 + r * 150} stroke={L.line} strokeWidth={3} />)}</g>,
      mid: <g>{[780, 1100, 1420].map((x, i) => <RobotArm key={x} x={x} y={900} frame={frame} phase={i * 1.7} />)}
        {Array.from({ length: 4 }, (_, i) => { const x = 600 + ((i * 360 + frame * 4) % 1300); return <g key={i}><rect x={x} y={920} width={110} height={40} rx={8} fill="#3A4558" /><rect x={x + 15} y={870} width={80} height={50} fill="#C9A06B" stroke="#0A111C" strokeWidth={2} /></g> })}
        <LightPool cx={1150} cy={700} rx={760} ry={300} u={u} k="rw" color="#F2A33A" o={0.14} /></g>,
    })),
  makeScene('coder-desk', 'Coder desk with code screens', ['tech', 'ai', 'software', 'startup', 'work'],
    { stand: A(330, 1010), sit: A(1000, 1000, 0.95), focus: A(1100, 520), prop1: A(1100, 220), prop2: A(1650, 380) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} /><BlindsWindow x={1500} y={170} w={340} h={380} city frame={frame} /></g>,
      mid: <g><Desk x={560} y={760} w={980} drawers={false} />
        {[[720, 440], [940, 420], [1160, 440]].map(([x, y], i) => (
          <g key={i}><rect x={x} y={y} width={200} height={140} rx={6} fill="#071526" stroke={L.line} strokeWidth={2} />
            {Array.from({ length: 7 }, (_, r) => <rect key={r} x={x + 14 + (r % 3) * 12} y={y + 14 + r * 17} width={40 + rnd(r + i * 9 + Math.floor(frame / 12)) * 120} height={8} rx={4} fill={['#7FD6FF', '#B48CFF', G.green, G.champagne][(r + i) % 4]} opacity={0.85} />)}
            <path d={`M${x + 90} ${y + 140} L${x + 84} ${y + 170} L${x + 116} ${y + 170} L${x + 110} ${y + 140} Z`} fill={L.ink} stroke={L.line} strokeWidth={1.5} /></g>))}
        <rect x={880} y={740} width={300} height={16} rx={4} fill="#2A3446" /><OfficeChair x={1040} y={960} />
        <LightPool cx={1040} cy={560} rx={600} ry={320} u={u} k="cd" color="#4FB5E8" o={0.18} /></g>,
    })),
  makeScene('ai-brain', 'AI brain hologram', ['ai', 'tech', 'future', 'thumbnail'],
    { stand: A(330, 1010), focus: A(1150, 480, 1.2), prop1: A(1150, 480, 1.2), prop2: A(1650, 300) },
    ({ u, frame }) => ({
      back: <g><rect width={1920} height={1080} fill="#02040A" />
        {Array.from({ length: 40 }, (_, i) => <line key={i} x1={1150} y1={480} x2={1150 + Math.cos(i * 0.47) * (420 + rnd(i) * 300)} y2={480 + Math.sin(i * 0.47) * (300 + rnd(i) * 200)} stroke="#4FB5E8" strokeWidth={1} opacity={0.15 + 0.15 * Math.sin(frame / 10 + i)} />)}</g>,
      mid: <g>
        <path d="M1010 480 C980 380 1060 300 1150 320 C1240 300 1320 380 1290 480 C1320 560 1250 640 1150 620 C1050 640 980 560 1010 480 Z" fill="none" stroke="#7FD6FF" strokeWidth={4} />
        <path d="M1150 320 C1130 400 1170 460 1150 620 M1040 420 C1090 430 1110 470 1100 520 M1260 420 C1210 430 1190 470 1200 520" stroke="#7FD6FF" strokeWidth={3} fill="none" opacity={0.8} />
        {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={1040 + rnd(i) * 220} cy={360 + rnd(i + 7) * 230} r={4} fill="#BFF0FF" opacity={0.4 + 0.6 * Math.abs(Math.sin(frame / 7 + i))} />)}
        <ellipse cx={1150} cy={860} rx={260} ry={40} fill="none" stroke="#4FB5E8" strokeWidth={3} /><path d="M930 860 L1060 620 M1370 860 L1240 620" stroke="#4FB5E8" strokeWidth={1.5} opacity={0.4} />
        <LightPool cx={1150} cy={480} rx={560} ry={460} u={u} k="ab" color="#4FB5E8" o={0.3} /></g>,
    })),

  // ---------------------------------------------------------------- BUSINESS (7)
  makeScene('startup-office', 'Startup open office with whiteboard', ['business', 'startup', 'entrepreneurship', 'work'],
    { stand: A(360, 1010), focus: A(1150, 420), prop1: A(1150, 220), prop2: A(1650, 380), board: A(1150, 420) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={860} y={220} width={600} height={360} fill="#F4F2EC" stroke={L.line} strokeWidth={3} />
        <path d="M900 520 L1000 460 L1080 480 L1180 360 L1260 380 L1400 260" stroke={G.green} strokeWidth={6} fill="none" />
        {['IDEA', 'MVP', 'USERS', '$$$'].map((t, i) => <g key={t}><rect x={900 + i * 130} y={250} width={110} height={44} rx={6} fill={[G.champagne, G.blue, G.green, '#B48CFF'][i]} /><text x={955 + i * 130} y={280} textAnchor="middle" fill="#0A111C" style={{ font: '800 22px Inter' }}>{t}</text></g>)}</g>,
      mid: <g>{[[600, 820], [1500, 820]].map(([x, y], i) => <g key={i}><Desk x={x - 160} y={y} w={340} drawers={false} /><Monitor x={x - 60} y={y - 130} w={140} h={90} frame={frame + i * 11} trend="up" /></g>)}
        <Plant x={1780} y={960} frame={frame} s={1.4} /><LightPool cx={1160} cy={480} rx={620} ry={320} u={u} k="so" color="#DCEBF7" o={0.12} /></g>,
    })),
  makeScene('assembly-line', 'Car assembly line', ['business', 'manufacturing', 'automation', 'industry', 'ai'],
    { stand: A(330, 1010), focus: A(1150, 680), prop1: A(1150, 280), prop2: A(1650, 380) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${i * 300} 160 L${i * 300 + 150} 80 L${i * 300 + 300} 160`} stroke={L.line} strokeWidth={2} fill="none" />)}</g>,
      mid: <g><rect x={540} y={860} width={1380} height={30} fill="#1A2638" stroke={L.line} strokeWidth={2} />
        {Array.from({ length: 3 }, (_, i) => { const x = 560 + ((i * 520 + frame * 3) % 1560)
          return <g key={i} transform={`translate(${x} 780)`}><path d="M0 70 L20 30 Q40 6 80 4 L190 2 Q230 2 250 30 L280 62 L280 80 L0 80 Z" fill={['#2A8FE0', '#E0464B', '#C9D2DC'][i]} stroke="#0A111C" strokeWidth={2} />
            <circle cx={60} cy={84} r={22} fill="#14181F" /><circle cx={220} cy={84} r={22} fill="#14181F" /></g> })}
        {[820, 1280].map((x, i) => <RobotArm key={x} x={x} y={760} frame={frame} phase={i * 2} />)}
        <LightPool cx={1150} cy={760} rx={760} ry={260} u={u} k="al" color="#DCEBF7" o={0.14} /></g>,
    })),
  makeScene('shopping-mall', 'Shopping mall', ['business', 'retail', 'consumer', 'economy'],
    { stand: A(960, 1011), focus: A(960, 520), prop1: A(960, 240), prop2: A(1500, 360) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{[0, 1].map((lvl) => Array.from({ length: 6 }, (_, i) => (
        <g key={`${lvl}${i}`}><rect x={120 + i * 290} y={180 + lvl * 340} width={250} height={260} fill="#0B1424" stroke={L.line} strokeWidth={2} />
          <rect x={140 + i * 290} y={200 + lvl * 340} width={210} height={46} fill={['#D9434E', '#2AA8F2', '#3DDC97', '#E9B949', '#B48CFF', '#F4E9D8'][(i + lvl) % 6]} opacity={0.8} />
          <rect x={150 + i * 290} y={270 + lvl * 340} width={190} height={150} fill="#FFD58A" opacity={0.18 + 0.1 * Math.sin(frame / 20 + i)} /></g>)))}
        <line x1={0} x2={1920} y1={510} y2={510} stroke={L.line} strokeWidth={3} /></g>,
      mid: <g>{Array.from({ length: 6 }, (_, i) => <Extra key={i} x={240 + i * 300} y={960 - (i % 2) * 14} s={0.6} />)}<LightPool cx={960} cy={700} rx={800} ry={300} u={u} k="sm" o={0.12} /></g>,
    })),
  makeScene('restaurant-kitchen', 'Restaurant kitchen', ['business', 'small-business', 'food', 'entrepreneurship'],
    { stand: A(360, 1010), focus: A(1150, 620), prop1: A(1150, 280), prop2: A(1600, 560, 0.8) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={640} y={160} width={1180} height={180} fill="#1A2233" stroke={L.line} strokeWidth={2} />
        {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${700 + i * 140} 340 L${720 + i * 140} 400 L${760 + i * 140} 400 L${780 + i * 140} 340`} fill="#7D8B9C" stroke="#0A111C" strokeWidth={2} />)}</g>,
      mid: <g><rect x={640} y={680} width={1180} height={280} fill="#9AA6B4" stroke={L.line} strokeWidth={2} /><rect x={640} y={660} width={1180} height={24} fill="#C9D2DC" />
        {[840, 1080, 1320].map((x, i) => <g key={x}><ellipse cx={x} cy={650} rx={70} ry={16} fill="#2A2F3C" />
          {[0, 1, 2].map((k) => <path key={k} d={`M${x - 20 + k * 20} 630 Q${x - 30 + k * 20} ${590 - Math.sin(frame / 6 + k + i) * 10} ${x - 10 + k * 20} 560`} stroke="#C8D6E6" strokeWidth={4} fill="none" opacity={0.35} />)}
          <path d={`M${x - 40} 650 Q${x} ${600 - (i === 1 ? Math.abs(Math.sin(frame / 4)) * 20 : 0)} ${x + 40} 650`} fill="#FF7A1F" opacity={0.7} /></g>)}
        <LightPool cx={1150} cy={640} rx={700} ry={260} u={u} k="rk" o={0.22} /></g>,
    })),
  makeScene('boardroom', 'Glass boardroom over the city', ['business', 'corporate', 'deal', 'investing'],
    { stand: A(330, 1010), focus: A(1100, 700), prop1: A(1100, 300), prop2: A(1650, 380) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} ground={700} seed={91} tall={0.8} />
        {Array.from({ length: 7 }, (_, i) => <line key={i} x1={i * 320} x2={i * 320} y1={0} y2={720} stroke="#7FD6FF" strokeWidth={4} opacity={0.35} />)}
        <rect x={0} y={0} width={1920} height={720} fill="#7FD6FF" opacity={0.04} /></g>,
      mid: <g><rect x={0} y={720} width={1920} height={360} fill="#070B14" />
        <path d="M520 760 L1680 760 L1800 880 L400 880 Z" fill="#14202E" stroke={L.line} strokeWidth={2} />
        {[620, 860, 1100, 1340, 1580].map((x) => <g key={x}><OfficeChair x={x} y={760} /></g>)}
        <LightPool cx={1100} cy={800} rx={760} ry={140} u={u} k="bd" color="#DCEBF7" o={0.14} /></g>,
    })),
  makeScene('pitch-meeting', 'Investor pitch meeting', ['business', 'startup', 'investing', 'fundraising', 'presentation'],
    { stand: A(1500, 1000), focus: A(900, 420), prop1: A(900, 420), prop2: A(1650, 300), board: A(900, 420) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={460} y={160} width={880} height={520} fill="#071526" stroke={L.line} strokeWidth={3} />
        <text x={520} y={240} fill={G.text} style={{ font: '700 40px Inter' }}>Series A</text>
        <text x={520} y={330} fill={G.green} style={{ font: '800 96px Inter' }}>$4.0m</text>
        {[0, 1, 2, 3].map((i) => <rect key={i} x={540 + i * 180} y={620 - (i + 1) * 60 - (i === 3 ? Math.abs(Math.sin(frame / 15)) * 20 : 0)} width={110} height={(i + 1) * 60} fill={G.blue} opacity={0.7} />)}</g>,
      mid: <g><path d="M300 860 L1100 860 L1180 960 L220 960 Z" fill="#14202E" stroke={L.line} strokeWidth={2} />
        {[420, 640, 860].map((x) => <Extra key={x} x={x} y={860} s={0.7} />)}<LightPool cx={900} cy={420} rx={560} ry={360} u={u} k="pm" color="#4FB5E8" o={0.18} /></g>,
    })),
  makeScene('delivery-street', 'Delivery van street', ['business', 'logistics', 'ecommerce', 'street'],
    { stand: A(330, 1011, 1, 'front'), focus: A(1200, 760), prop1: A(1200, 320), prop2: A(1650, 360) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} ground={900} seed={101} /></g>,
      mid: <g transform={`translate(${Math.sin(frame / 40) * 4} 0)`}>
        <path d="M840 900 L840 640 L1340 640 L1340 900 Z" fill="#E9EEF5" stroke="#0A111C" strokeWidth={3} />
        <path d="M1340 700 L1500 700 L1580 800 L1580 900 L1340 900 Z" fill="#2A8FE0" stroke="#0A111C" strokeWidth={3} /><path d="M1360 716 L1490 716 L1550 796 L1360 796 Z" fill="#BFE6FF" />
        <path d="M900 700 L1280 700 M900 760 L1280 760" stroke="#C9D2DC" strokeWidth={3} />
        <rect x={960} y={690} width={260} height={60} rx={6} fill={G.champagne} opacity={0.8} />
        {[940, 1460].map((x) => <g key={x}><circle cx={x} cy={910} r={42} fill="#14181F" stroke="#0A111C" strokeWidth={3} /><circle cx={x} cy={910} r={16} fill="#7D8B9C" /></g>)}
        {[0, 1, 2].map((i) => <rect key={i} x={620 + i * 70} y={840 - i * 24} width={64} height={60} fill="#C9A06B" stroke="#0A111C" strokeWidth={2} />)}</g>,
      front: <g><Pavement y={950} u={u} /><StreetLamp x={1820} ground={1000} frame={frame} u={u} /></g>,
    })),

  // ---------------------------------------------------------------- CRYPTO (2)
  makeScene('crypto-exchange', 'Crypto exchange screen', ['crypto', 'bitcoin', 'trading', 'investing', 'tech'],
    { stand: A(300, 1011), focus: A(1150, 470), prop1: A(1150, 200), prop2: A(1650, 820, 0.8) },
    ({ u, frame, variant }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={540} y={110} width={1240} height={720} rx={12} fill="#08060F" stroke="#B48CFF" strokeWidth={3} />
        <Candles x={580} y={180} w={760} h={600} n={26} seed={variant === 'crash' ? 17 : 13} frame={frame} trend={variant === 'crash' ? -1 : 1} />
        {['BTC', 'ETH', 'SOL', 'ADA', 'XRP', 'DOGE'].map((c, i) => (
          <g key={c}><text x={1380} y={210 + i * 90} fill={G.text} style={{ font: '700 30px "JetBrains Mono"' }}>{c}</text>
            <text x={1740} y={210 + i * 90} textAnchor="end" fill={(rnd(i + Math.floor(frame / 30)) > 0.45) ? G.green : G.red} style={{ font: '700 30px "JetBrains Mono"' }}>
              {(rnd(i + Math.floor(frame / 30)) > 0.45 ? '+' : '-')}{(rnd(i * 7 + Math.floor(frame / 30)) * 9).toFixed(1)}%</text></g>))}</g>,
      mid: <LightPool cx={1150} cy={470} rx={760} ry={420} u={u} k="cx" color="#B48CFF" o={0.14} />,
    })),
  makeScene('bitcoin-atm', 'Bitcoin ATM in a corner store', ['crypto', 'bitcoin', 'street', 'personal-finance'],
    { stand: A(400, 1011), focus: A(1250, 600), prop1: A(1250, 260), prop2: A(1650, 600, 0.8) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><Shelf x={1460} y={300} w={380} rows={3} seed={121} /></g>,
      mid: <g><rect x={1080} y={360} width={340} height={600} rx={18} fill="#F7931A" stroke="#0A111C" strokeWidth={4} />
        <rect x={1120} y={410} width={260} height={180} rx={8} fill="#08060F" />
        <text x={1250} y={500} textAnchor="middle" fill="#F7931A" style={{ font: '900 84px Inter' }}>₿</text>
        <text x={1250} y={560} textAnchor="middle" fill={G.text} style={{ font: '700 24px Inter' }}>BUY · SELL</text>
        <rect x={1150} y={640} width={200} height={20} rx={6} fill="#0A111C" /><rect x={1170} y={700} width={160} height={110} rx={10} fill="#C46A0E" />
        <LightPool cx={1250} cy={600} rx={420} ry={380} u={u} k="ba" color="#F7931A" o={0.2 + 0.05 * Math.sin(frame / 10)} /></g>,
    })),

  // ---------------------------------------------------------------- ECONOMY (1 + central bank)
  makeScene('central-bank', 'Central bank', ['economy', 'interest-rates', 'finance', 'government', 'investing'],
    { stand: A(330, 1011), focus: A(1150, 520), prop1: A(1150, 200), prop2: A(1650, 760, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={60} /></g>,
      mid: <g><path d="M620 330 L1150 160 L1680 330 Z" fill="#CFC5B5" stroke="#B8A890" strokeWidth={3} />
        <text x={1150} y={300} textAnchor="middle" fill="#6A5A44" style={{ font: '700 34px Georgia', letterSpacing: 8 }}>CENTRAL BANK</text>
        <rect x={640} y={330} width={1020} height={40} fill="#D8CBB8" /><Columns x0={700} x1={1600} top={370} bottom={860} n={8} />
        <rect x={600} y={860} width={1100} height={50} fill="#C4B6A2" /><rect x={560} y={910} width={1180} height={60} fill="#B4A692" />
        <LightPool cx={1150} cy={600} rx={800} ry={420} u={u} k="cb" color="#FFE7A8" o={0.14} /></g>,
      front: <g><rect x={0} y={970} width={1920} height={110} fill="#050A10" /><StreetLamp x={480} ground={1000} frame={frame} u={u} /></g>,
    })),
  makeScene('oil-rig', 'Oil rig at sea', ['economy', 'energy', 'commodities', 'oil', 'world'],
    { stand: A(300, 1040, 0.9), focus: A(1200, 480), prop1: A(1200, 200), prop2: A(1650, 300) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={70} /><rect x={0} y={760} width={1920} height={320} fill="#06121F" />
        {Array.from({ length: 16 }, (_, i) => <line key={i} x1={rnd(i) * 1920} x2={rnd(i) * 1920 + 120} y1={790 + i * 18} y2={790 + i * 18} stroke="#1E6FA8" strokeWidth={2} opacity={0.3 + 0.3 * Math.sin(frame / 12 + i)} />)}</g>,
      mid: <g>{[980, 1420].map((x) => <path key={x} d={`M${x} 900 L${x + 20} 560 L${x + 40} 900`} stroke="#7D8B9C" strokeWidth={10} fill="none" />)}
        <rect x={940} y={520} width={540} height={60} fill="#3A4558" stroke={L.line} strokeWidth={2} /><rect x={1000} y={440} width={220} height={80} fill="#5C6878" />
        <path d="M1300 520 L1340 180 L1380 520 Z" fill="none" stroke="#F2A33A" strokeWidth={6} />
        {Array.from({ length: 6 }, (_, k) => <line key={k} x1={1310 + k * 2} x2={1370 - k * 2} y1={480 - k * 55} y2={430 - k * 55} stroke="#F2A33A" strokeWidth={3} />)}
        <path d={`M1460 470 Q${1500 + Math.sin(frame / 3) * 8} 400 1480 350`} stroke="#FF7A1F" strokeWidth={14} fill="none" strokeLinecap="round" />
        <LightPool cx={1200} cy={500} rx={600} ry={360} u={u} k="or" color="#FF8A3A" o={0.16} /></g>,
    })),
]
