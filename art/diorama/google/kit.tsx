// ============================================================
// LONG VIDEO — "How Google Makes Money From Your Searches" — objects for
// this story: a search bar that types itself, a results page with
// sponsored rows, bidding paddles held up by shops, an Ad Rank board, a
// mouse pointer that clicks, a phone with a browser, a big front door, a
// gavel, an AI answer card, a server rack, a billboard and a magnifier.
// Stages (one picture per beat) and Extras (one small thing on a word)
// come from ../buffett/kit; cast and coins from ../aimoney/common.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ the search bar: typed text appears letter by letter (t 0–1)
export const SearchBar: React.FC<{ x: number; y: number; w?: number; s?: number; text: string; t?: number; o?: number; press?: number }> = ({ x, y, w = 900, s = 1, text, t = 1, o = 1, press = 0 }) => {
  const shown = text.slice(0, Math.round(text.length * clamp01(t)))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-w / 2 + 8} y={-50 + 10} width={w} height={100} rx={50} fill="#000" opacity={0.14} />
      <rect x={-w / 2} y={-50} width={w} height={100} rx={50} fill="#FFFFFF" stroke="#DADCE0" strokeWidth={4} />
      <circle cx={-w / 2 + 60} cy={-6} r={18} fill="none" stroke="#5F6368" strokeWidth={6} /><path d={`M${-w / 2 + 72} 6 L${-w / 2 + 86} 20`} stroke="#5F6368" strokeWidth={7} strokeLinecap="round" />
      <text x={-w / 2 + 110} y={16} fill="#202124" style={{ font: '400 46px Inter' }}>{shown}{t < 1 ? '|' : ''}</text>
      <rect x={w / 2 - 130} y={-36} width={110} height={72} rx={36} fill={press > 0 ? '#1A73E8' : '#E8F0FE'} />
      <path d={`M${w / 2 - 92} -12 l20 12 l-20 12`} fill="none" stroke={press > 0 ? '#FFFFFF' : '#1A73E8'} strokeWidth={6} strokeLinecap="round" />
    </g>
  )
}
// # one result row: sponsored rows have a bold "Sponsored" label and a coloured stripe; hi 0–1 lights the row
export const Row: React.FC<{ x: number; y: number; w?: number; sponsored?: boolean; title: string; hi?: number; o?: number }> = ({ x, y, w = 900, sponsored, title, hi = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {hi > 0 && <rect x={-20} y={-58} width={w + 40} height={128} rx={18} fill={P.gold} opacity={0.35 * hi} />}
    {sponsored && <text x={0} y={-24} fill="#202124" style={{ font: '700 26px Inter' }}>Sponsored</text>}
    <text x={0} y={sponsored ? 16 : 0} fill="#1A0DAB" style={{ font: '500 40px Inter' }}>{title}</text>
    <rect x={0} y={sponsored ? 34 : 18} width={w * 0.8} height={12} rx={6} fill="#C4C7CC" />
    <rect x={0} y={sponsored ? 54 : 38} width={w * 0.55} height={12} rx={6} fill="#DADCE0" />
  </g>
)
// # a whole results page: n sponsored rows on top, then plain rows
export const ResultsPage: React.FC<{ x: number; y: number; s?: number; ads?: string[]; links?: string[]; hiAd?: number; hiK?: number; o?: number; ai?: number }> = ({ x, y, s = 1, ads = [], links = [], hiAd = 0, hiK = 0, o = 1, ai = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-520} y={-420} width={1040} height={840} rx={24} fill="#000" opacity={0.14} transform="translate(10 12)" />
    <rect x={-520} y={-420} width={1040} height={840} rx={24} fill="#FFFFFF" />
    <rect x={-520} y={-420} width={1040} height={70} rx={24} fill="#F1F3F4" />
    {[0, 1, 2].map((k) => <circle key={k} cx={-480 + k * 34} cy={-385} r={10} fill={['#F28B82', '#FDD663', '#81C995'][k]} />)}
    {ai > 0 && <g opacity={ai}><rect x={-460} y={-330} width={920} height={220 * ai} rx={20} fill="#E8F0FE" /><text x={-430} y={-280} fill="#1A73E8" style={{ font: '700 34px Inter' }}>✦ AI Overview</text>{[0, 1, 2].map((k) => <rect key={k} x={-430} y={-250 + k * 34} width={820 - k * 140} height={14} rx={7} fill="#9DB9F2" opacity={ai} />)}</g>}
    <g transform={`translate(0 ${ai * 240})`}>
      {ads.map((t, k) => <Row key={k} x={-460} y={-290 + k * 140} w={880} sponsored title={t} hi={k === hiK ? hiAd : 0} />)}
      {links.map((t, k) => <Row key={k} x={-460} y={-290 + ads.length * 140 + k * 110} w={880} title={t} />)}
    </g>
  </g>
)

// ------------------------------------------------------------ the auction
// # a shop (awning + name) holding up a bid paddle; up 0–1 raises the paddle
export const Bidder: React.FC<{ x: number; y: number; s?: number; name: string; color: string; bid?: string; up?: number; win?: number; o?: number }> = ({ x, y, s = 1, name, color, bid, up = 0, win = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {win > 0 && <circle cx={0} cy={-170} r={210} fill={P.gold} opacity={0.3 * win} />}
    <rect x={-150} y={-200} width={300} height={200} rx={12} fill="#F4F1EA" />
    <path d="M-170 -200 L170 -200 L150 -270 L-150 -270 Z" fill={color} />
    {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${-170 + k * 68} -200 q34 30 68 0`} fill={color} />)}
    <rect x={-50} y={-110} width={100} height={110} rx={8} fill={color} opacity={0.6} />
    <text x={0} y={-215} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{name}</text>
    {bid && <g transform={`translate(180 ${lerp(-60, -260, up)})`}><rect x={-8} y={0} width={16} height={180} fill="#8E5E36" /><circle cx={0} cy={-50} r={76} fill="#FFFFFF" stroke={color} strokeWidth={10} /><text x={0} y={-30} textAnchor="middle" fill="#202124" style={{ font: '400 56px "Bebas Neue"' }}>{bid}</text></g>}
  </g>
)
// # a mouse pointer; click 0–1 shows a ripple
export const Pointer: React.FC<{ x: number; y: number; s?: number; click?: number; o?: number }> = ({ x, y, s = 1, click = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {click > 0 && click < 1 && <circle r={30 + 90 * click} fill="none" stroke="#1A73E8" strokeWidth={8} opacity={1 - click} />}
    <path d="M0 0 L0 96 L26 72 L44 112 L62 104 L44 64 L80 64 Z" fill="#FFFFFF" stroke="#202124" strokeWidth={6} strokeLinejoin="round" />
  </g>
)
// # a phone with a browser and a search box on top
export const PhoneB: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string; glow?: number }> = ({ x, y, s = 1, o = 1, label = 'Search', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-170} y={-330} width={340} height={660} rx={50} fill={P.gold} opacity={0.35 * glow} />}
    <rect x={-150} y={-310} width={300} height={620} rx={44} fill="#0D1424" />
    <rect x={-132} y={-280} width={264} height={560} rx={28} fill="#F8F9FA" />
    <rect x={-110} y={-240} width={220} height={60} rx={30} fill="#FFFFFF" stroke="#DADCE0" strokeWidth={4} />
    <text x={-80} y={-200} fill="#5F6368" style={{ font: '400 28px Inter' }}>{label}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-110} y={-140 + k * 70} width={220 - (k % 2) * 60} height={20} rx={10} fill="#DADCE0" />)}
  </g>
)
// # a big front door; open 0–1 swings it
export const Door: React.FC<{ x: number; y: number; s?: number; open?: number; o?: number; sign?: string }> = ({ x, y, s = 1, open = 0, o = 1, sign }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-200} y={-500} width={400} height={500} rx={14} fill="#5A3A22" />
    <rect x={-170} y={-470} width={340} height={470} fill="#FFE9A8" />
    <g transform={`translate(-170 0) scale(${1 - 0.8 * open} 1) translate(170 0)`}><rect x={-170} y={-470} width={340} height={470} fill="#8E5E36" /><circle cx={120} cy={-230} r={14} fill={P.gold} /></g>
    {sign && <g transform="translate(0 -540)"><rect x={-180} y={-40} width={360} height={80} rx={14} fill="#1A73E8" /><text x={0} y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>{sign}</text></g>}
  </g>
)
// # a gavel that strikes (hit 0–1) on a block
export const Gavel: React.FC<{ x: number; y: number; s?: number; hit?: number; o?: number }> = ({ x, y, s = 1, hit = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-160} y={40} width={320} height={60} rx={14} fill="#5A3A22" />
    <g transform={`rotate(${lerp(-40, 0, hit)} 120 -40)`}><rect x={-140} y={-70} width={200} height={70} rx={16} fill="#8E5E36" /><rect x={40} y={-48} width={260} height={26} rx={12} fill="#6B4A2E" /></g>
    {hit > 0.9 && <g>{[0, 1, 2].map((k) => <path key={k} d={`M${-60 + k * 60} 30 l${(k - 1) * 20} -40`} stroke={P.gold} strokeWidth={8} strokeLinecap="round" />)}</g>}
  </g>
)
// # a server rack with blinking lights
export const Rack: React.FC<{ x: number; y: number; s?: number; f: number; o?: number }> = ({ x, y, s = 1, f, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-420} width={220} height={420} rx={14} fill="#2A3448" />
    {Array.from({ length: 8 }, (_, k) => <g key={k}><rect x={-90} y={-400 + k * 50} width={180} height={36} rx={6} fill="#3A4660" /><circle cx={60} cy={-382 + k * 50} r={7} fill={(Math.floor(f / 6) + k) % 3 ? P.mint : P.gold} /></g>)}
  </g>
)
// # a billboard by the road
export const Billboard: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = 'SHOES!' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-20} y={-200} width={40} height={200} fill="#5C4A3A" />
    <rect x={-260} y={-420} width={520} height={240} rx={14} fill="#FFFFFF" stroke="#5C4A3A" strokeWidth={10} />
    <text x={0} y={-270} textAnchor="middle" fill={P.coralD} style={{ font: '400 110px "Bebas Neue"' }}>{text}</text>
  </g>
)
