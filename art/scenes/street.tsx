// ============================================================
// SCENES A — STREET & MONEY (10)
// shop-street is a port of the owner-approved first sample
// (spike/AluxSync.tsx ShopScene, 2026-10-23).
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import {
  BlindsWindow, BrandPoster, Desk, DeskLamp, Door, Extra, L, LightPool, Backdrop, makeScene, NightSky, wc, Pavement, Plant, rnd,
  RoomShell, Shelf, Skyline, StreetLamp,
} from './kit'

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })

// # Brick wall texture inside a box
const Bricks: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>{Array.from({ length: Math.ceil(h / 28) }, (_, r) => (
    <g key={r}><line x1={x} x2={x + w} y1={y + r * 28} y2={y + r * 28} stroke="rgba(60,10,25,0.35)" strokeWidth={2} />
      {Array.from({ length: Math.ceil(w / 60) }, (_, c) => { const xx = x + c * 60 + (r % 2) * 30; return xx < x + w && <line key={c} x1={xx} x2={xx} y1={y + r * 28} y2={y + r * 28 + 28} stroke="rgba(60,10,25,0.3)" strokeWidth={2} /> })}</g>))}</g>
)

// # Lit shop window with shelves of goods
const ShopWindow: React.FC<{ x: number; y: number; w: number; h: number; on: number; u: (n: string) => string; k: string }> = ({ x, y, w, h, on, u, k }) => (
  <g>
    <defs><linearGradient id={u(`int${k}`)} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFE3A3" /><stop offset="100%" stopColor="#D9913F" /></linearGradient></defs>
    <rect x={x} y={y} width={w} height={h} fill={wc().bodyShade} />
    <rect x={x} y={y} width={w} height={h} fill={`url(#${u(`int${k}`)})`} opacity={on} />
    {[0.25, 0.55, 0.85].map((f, i) => (
      <g key={i} opacity={0.3 + 0.7 * on}><rect x={x + 12} y={y + h * f} width={w - 24} height={7} fill="#8A5A2B" />
        {Array.from({ length: Math.floor((w - 24) / 50) }, (_, j) => { const hh = 22 + ((i * 5 + j * 7) % 18); return <rect key={j} x={x + 22 + j * 50} y={y + h * f - hh} width={32} height={hh} rx={3} fill={['#D9434E', '#2AA8F2', '#3DDC97', '#F4E9D8', '#E9B949'][(i + j) % 5]} /> })}</g>))}
    <path d={`M${x + 18} ${y + 12} L${x + w * 0.3} ${y + 12} L${x + 38} ${y + h - 16} L${x + 18} ${y + h - 16} Z`} fill="#fff" opacity={0.12} />
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={L.cream} strokeWidth={10} />
  </g>
)

export const STREET_SCENES = [
  // ---------------------------------------------------------------- the approved shop
  makeScene('shop-street', 'Corner shop at night', ['money', 'small-business', 'street', 'retail', 'business', 'personal-finance'],
    { stand: A(420, 1011, 1, 'front'), door: A(1470, 960, 0.45), prop1: A(1130, 150, 1), prop2: A(1000, 770, 0.8), sign: A(1190, 494, 1) },
    ({ u, frame, lightsOn }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} x0={-20} x1={640} ground={960} seed={3} /><Skyline frame={frame} x0={1770} x1={1990} ground={960} seed={8} /></g>,
      mid: (
        <g>
          <defs><linearGradient id={u('brick')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B4626E" /><stop offset="100%" stopColor="#5E2A3A" /></linearGradient></defs>
          <rect x={620} y={200} width={1140} height={760} fill={`url(#${u('brick')})`} />
          <Bricks x={620} y={214} w={1140} h={746} />
          <rect x={600} y={186} width={1180} height={22} fill="#3B1826" />
          {[700, 1050, 1400].map((wx) => (
            <g key={wx}><rect x={wx} y={250} width={260} height={170} fill={wc().bodyShade} stroke={L.cream} strokeWidth={8} />
              <line x1={wx + 130} x2={wx + 130} y1={250} y2={420} stroke={L.cream} strokeWidth={6} /><rect x={wx - 10} y={420} width={280} height={14} fill={L.cream} />
              <path d={`M${wx + 10} 262 L${wx + 90} 262 L${wx + 10} 340 Z`} fill="#fff" opacity={0.15} /></g>))}
          <rect x={690} y={452} width={1000} height={84} rx={6} fill={wc().bodyShade} stroke={COLORS.champagne} strokeWidth={3} />
          <text x={1190} y={512} textAnchor="middle" fill={L.warm} opacity={0.25 + 0.75 * lightsOn} style={{ font: '60px "Bebas Neue"', letterSpacing: 10 }}>CORNER  SHOP</text>
          {Array.from({ length: 16 }, (_, i) => <path key={i} fill={i % 2 ? L.cream : '#D9434E'} d={`M${680 + i * 65} 548 L${745 + i * 65} 548 L${745 + i * 65} 600 Q${712 + i * 65} 626 ${680 + i * 65} 600 Z`} />)}
          <ShopWindow x={700} y={640} w={600} h={260} on={lightsOn} u={u} k="w" />
          <g opacity={lightsOn}><rect x={1150} y={670} width={120} height={46} rx={23} fill="none" stroke="#FF5A8A" strokeWidth={4} />
            <text x={1210} y={703} textAnchor="middle" fill="#FF8AB0" style={{ font: '800 26px Inter' }}>OPEN</text></g>
          <rect x={1360} y={630} width={220} height={330} fill={wc().bodyShade} stroke={L.cream} strokeWidth={10} />
          <rect x={1384} y={652} width={172} height={170} fill="#FFD58A" opacity={0.25 + 0.65 * lightsOn} />
          {/* # people are never baked into scenes: the engine places cast Actors (e.g. owner at the 'door' anchor) */}
          <circle cx={1540} cy={840} r={7} fill={COLORS.champagne} />
          <Plant x={1320} y={930} frame={frame} s={0.85} /><Plant x={1620} y={930} frame={frame} s={0.85} />
        </g>
      ),
      front: <g><Pavement y={960} u={u} spill={{ cx: 1000, rx: 420, o: lightsOn }} /><StreetLamp x={1850} ground={1000} frame={frame} u={u} /></g>,
    })),

  // ---------------------------------------------------------------- ATM street
  makeScene('atm-street', 'ATM on a night street', ['money', 'bank', 'cash', 'street', 'personal-finance'],
    { stand: A(760, 1011, 1, 'front'), prop1: A(1260, 330), prop2: A(1260, 640, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} ground={960} seed={11} tall={1.2} /></g>,
      mid: <g><rect x={1060} y={380} width={400} height={580} fill="#2A3242" stroke={L.line} strokeWidth={3} />
        <rect x={1140} y={440} width={240} height={150} rx={8} fill="#4FB5E8" opacity={0.85} /><text x={1260} y={530} textAnchor="middle" fill="#0A2A3E" style={{ font: '800 44px Inter' }}>ATM</text>
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={1170 + (i % 3) * 64} y={620 + Math.floor(i / 3) * 44} width={52} height={32} rx={5} fill="#556275" />)}
        <rect x={1150} y={810} width={220} height={16} rx={6} fill={wc().sky[0]} />
        <LightPool cx={1260} cy={700} rx={420} ry={360} u={u} k="atm" color="#4FB5E8" o={0.18} /></g>,
      front: <g><Pavement y={960} u={u} /><StreetLamp x={300} ground={1000} frame={frame} u={u} /></g>,
    })),

  // ---------------------------------------------------------------- mansion
  makeScene('mansion', 'Mansion at night', ['money', 'wealth', 'property', 'luxury', 'investing', 'personal-finance'],
    { stand: A(300, 1011), prop1: A(1150, 200), prop2: A(1500, 860, 0.8) },
    ({ u, frame, lightsOn }) => ({
      back: <g><NightSky u={u} stars={70} /><path d="M0 760 Q480 680 960 740 T1920 720 L1920 1080 L0 1080 Z" fill={wc().bodyShade} /></g>,
      mid: <g>
        <rect x={560} y={420} width={1180} height={460} fill="#E9DED0" /><path d="M520 420 L1150 250 L1780 420 Z" fill="#8A6A5A" />
        {Array.from({ length: 10 }, (_, i) => <g key={i}><rect x={610 + i * 110} y={480} width={70} height={110} fill="#FFD58A" opacity={0.3 + 0.6 * lightsOn * (rnd(i) > 0.3 ? 1 : 0.2)} stroke="#B8A890" strokeWidth={4} />
          <rect x={610 + i * 110} y={660} width={70} height={110} fill="#FFD58A" opacity={0.3 + 0.6 * lightsOn * (rnd(i + 9) > 0.4 ? 1 : 0.2)} stroke="#B8A890" strokeWidth={4} /></g>)}
        {[1050, 1250].map((x) => <rect key={x} x={x - 18} y={620} width={36} height={260} fill="#F4EDE2" stroke="#B8A890" strokeWidth={3} />)}
        <rect x={1100} y={760} width={100} height={120} fill="#3A2A2E" />
        <rect x={400} y={880} width={1500} height={60} fill="#4FB5E8" opacity={0.25} /><LightPool cx={1150} cy={650} rx={700} ry={300} u={u} k="m" o={0.15 * lightsOn} /></g>,
      front: <g><Plant x={480} y={940} frame={frame} s={1.4} /><Plant x={1820} y={940} frame={frame} s={1.4} /><rect x={0} y={940} width={1920} height={140} fill={wc().sky[0]} /></g>,
    })),

  // ---------------------------------------------------------------- supermarket
  makeScene('supermarket', 'Supermarket aisle', ['money', 'consumer', 'inflation', 'retail', 'personal-finance', 'economy'],
    { stand: A(960, 1011), prop1: A(500, 300), prop2: A(1450, 300) },
    ({ u }) => ({
      back: <g><RoomShell floor={900} panels={false} />{Array.from({ length: 6 }, (_, i) => <rect key={i} x={120 + i * 300} y={60} width={200} height={14} fill="#DCEBF7" opacity={0.5} />)}</g>,
      mid: <g>{[[80, 700], [1220, 1840]].map(([x0, x1], s) => (
        <g key={s}>{[0, 1, 2, 3].map((r) => (
          <g key={r}><rect x={x0} y={300 + r * 150} width={x1 - x0} height={12} fill={wc().bodyShade} stroke={L.line} strokeWidth={2} />
            {Array.from({ length: Math.floor((x1 - x0) / 46) }, (_, i) => { const h = 50 + rnd(s * 99 + r * 13 + i) * 60; return <rect key={i} x={x0 + 8 + i * 46} y={300 + r * 150 - h} width={36} height={h} rx={4} fill={['#D9434E', '#2AA8F2', '#3DDC97', '#F4E9D8', '#E9B949', '#B48CFF'][(i + r + s) % 6]} opacity={0.85} /> })}
            {rnd(r + s * 5) > 0.4 && <g><rect x={x0 + 140 + r * 60} y={308 + r * 150} width={74} height={30} fill="#F7C531" /><text x={x0 + 177 + r * 60} y={330 + r * 150} textAnchor="middle" fill={wc().bodyShade} style={{ font: '800 18px Inter' }}>${(1 + rnd(r + s) * 8).toFixed(2)}</text></g>}</g>))}</g>))}
        <LightPool cx={960} cy={900} rx={500} ry={120} u={u} k="s" color="#DCEBF7" o={0.15} /></g>,
    })),

  // ---------------------------------------------------------------- city skyline
  makeScene('city-skyline', 'City skyline', ['world', 'economy', 'city', 'business'],
    { stand: A(300, 1011), prop1: A(960, 200), prop2: A(1500, 300) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={80} /><Skyline frame={frame} ground={980} seed={21} tall={0.8} /></g>,
      mid: <g><Skyline frame={frame} ground={1000} seed={5} tall={1.35} /></g>,
      front: <rect x={0} y={1000} width={1920} height={80} fill={wc().sky[0]} />,
    })),

  // ---------------------------------------------------------------- kitchen table bills
  makeScene('kitchen-bills', 'Kitchen table with bills', ['money', 'personal', 'debt', 'cost-of-living', 'personal-finance'],
    { stand: A(560, 1010), sit: A(980, 930, 0.9), prop1: A(1380, 640, 0.8), prop2: A(1100, 300) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={900} panels={false} />{[0, 1, 2].map((i) => <rect key={i} x={1300 + i * 140} y={180} width={120} height={160} fill="none" stroke={L.line} strokeWidth={2} />)}
        <path d="M200 160 L200 380 L700 380 L700 160" fill="none" stroke={L.line} strokeWidth={2} /></g>,
      mid: <g><LightPool cx={1150} cy={700} rx={420} ry={200} u={u} k="k" />
        <path d="M1150 120 L1150 360" stroke={L.line} strokeWidth={2} /><path d="M1090 360 L1210 360 L1180 410 L1120 410 Z" fill={wc().bodyShade} stroke={L.line} strokeWidth={2} />
        <rect x={760} y={700} width={800} height={18} fill={wc().bodyShade} stroke={L.line} strokeWidth={2} /><path d="M800 718 L800 900 M1520 718 L1520 900" stroke={L.line} strokeWidth={2} />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={1080 + i * 60} y={672 - (i % 2) * 6} width={90} height={34} fill={L.cream} stroke={wc().bodyShade} strokeWidth={2} transform={`rotate(${(i - 2) * 6} ${1125 + i * 60} 690)`} />)}
        <text x={1240} y={670} fill={COLORS.red} style={{ font: '800 22px Inter' }}>PAST DUE</text></g>,
    })),

  // ---------------------------------------------------------------- empty void (thumbnails, kinetic text)
  makeScene('void', 'Empty dark void', ['thumbnail', 'abstract', 'text'],
    { stand: A(560, 1040, 1.2), prop1: A(1300, 480, 1.8), prop2: A(1500, 300) },
    ({ u }) => ({
      back: <g><Backdrop u={u} /><LightPool cx={960} cy={600} rx={900} ry={520} u={u} k="vd" color="#1E6FA8" o={0.18} /></g>,
    })),
]

