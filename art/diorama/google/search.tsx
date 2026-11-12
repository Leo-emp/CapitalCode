// ---------------------------------------------------------------- s10–s19: the search you did not see (casino-style).
// The same room: you type "running shoes" on the big laptop and a results page appears with two Sponsored rows that
// light up. On "auction" the right-hand wall rolls up like a curtain and reveals a hidden auction hall behind your
// screen: an auctioneer at a GOOGLE podium, a board with three empty AD SPOTS, and three shoe-shop owners with paddles.
// Search pills from everywhere fly in and the gavel bangs for each one. The shops raise paddles and race; each spot on
// the board gets its own little gavel flash; the spots fill with the shops' colours just before your page finishes
// loading. You show empty pockets; the shops keep their paddles up, pointed at your search.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { fly, Headline, Person, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { gestB } from '../buffett/hook'
import { Gavel, Row, SearchBar } from './kit'
import { Laptop, Room } from './hook'

export const SHOPS: [string, string][] = [['SHOP A', '#E05A4C'], ['SHOP B', '#2FA36B'], ['SHOP C', '#3A6EA8']]

// # the hidden auction hall: back wall, AD SPOTS board, podium; fill[k] 0–1 colours spot k
export const Hall: React.FC<{ f: number; x0?: number; fill?: number[]; flash?: number[]; label?: string }> = ({ f, x0 = 1000, fill = [0, 0, 0], flash = [0, 0, 0], label = 'AD SPOTS ON YOUR PAGE' }) => (
  <g>
    <rect x={x0} y={0} width={1920 - x0} height={1000} fill="#1E2A47" />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={x0 + 40 + k * 150} y={0} width={60} height={1000} fill="#24335A" />)}
    <g transform="translate(1520 380) scale(0.85)">
      <rect x={-320} y={-130} width={640} height={260} rx={18} fill="#0D1424" stroke={P.gold} strokeWidth={6} />
      <text x={0} y={-90} textAnchor="middle" fill={P.gold} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
      {[0, 1, 2].map((k) => <g key={k} transform={`translate(${-200 + k * 200} 20)`}>
        <rect x={-85} y={-60} width={170} height={120} rx={12} fill="#2A3448" />
        <rect x={-85} y={-60} width={170} height={120} rx={12} fill={SHOPS[k][1]} opacity={fill[k]} />
        <text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{fill[k] > 0.5 ? SHOPS[k][0] : `SPOT ${k + 1}`}</text>
        {flash[k] > 0 && flash[k] < 1 && <circle r={60 + 80 * flash[k]} fill="none" stroke={P.gold} strokeWidth={8} opacity={1 - flash[k]} />}
      </g>)}
    </g>
    <rect x={x0} y={0} width={1920 - x0} height={215} fill="#EFE6D6" /><rect x={x0} y={205} width={1920 - x0} height={22} fill="#8E6A45" />
    <ellipse cx={1460} cy={1000} rx={460} ry={30} fill="#000" opacity={0.25 + 0.05 * Math.sin(f / 9)} />
  </g>
)
// # a shop owner with a bid paddle; up 0–1 raises it
export const PaddleMini: React.FC<{ f: number; x: number; k: number; up: number; bid?: string; mood?: 'neutral' | 'happy' | 'sad'; s?: number }> = ({ f, x, k, up, bid = '$', mood = 'neutral', s = 1.7 }) => (
  <g>
    <g transform={`translate(${x + 70 * s} ${lerp(1000 - 40 * s, 1000 - 190 * s, up)})`}><rect x={-6} y={0} width={12} height={110} fill="#8E5E36" /><circle cx={0} cy={-44} r={54} fill="#FFFFFF" stroke={SHOPS[k][1]} strokeWidth={9} /><text x={0} y={-26} textAnchor="middle" fill="#202124" style={{ font: '400 50px "Bebas Neue"' }}>{bid}</text></g>
    <Mini look={['owner', 'buyer', 'worker'][k]} x={x} y={1000} scale={s} frame={f} seed={k + 300} mood={mood} />
    <g transform={`translate(${x} 1040)`}><rect x={-80} y={-22} width={160} height={44} rx={10} fill={SHOPS[k][1]} /><text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>{SHOPS[k][0]}</text></g>
  </g>
)

const Search: React.FC<PieceProps> = ({ f, c }) => {
  const s10 = c('s10:search'), running = c('s11:running'), google11 = c('s11:google'), page = c('s12:page'), sponsored = c('s12:sponsored')
  const ads13 = c('s13:ads'), waiting = c('s13:waiting'), moment = c('s14:moment'), auction14 = c('s14:auction'), every = c('s15:every'), searches = c('s15:searches')
  const shoe = c('s16:shoe'), competed = c('s16:competed'), spots = c('s16:spots'), separate = c('s17:separate'), page17 = c('s17:page')
  const loading = c('s18:loading'), pay19 = c('s19:pay'), bidding = c('s19:bidding')
  // # extra gesture words
  const G = [c('s13:just'), c('s15:an'), c('s16:searching'), c('s18:before'), c('s19:your')]
  const LX = 560, LY = 720, SX = LX, SY = LY - 150
  const curtain = easeInOut(span(f, auction14 - 4, auction14 + 18))
  const fillK = (k: number) => on(f, loading - 10 + k * 5, 6)
  const ads = SHOPS.map(([n]) => `Running shoes – ${n}`)
  return (
    <g>
      <StageBg id="gg-search" frame={f} />
      <Room />
      {/* # the hidden hall (behind the right wall) */}
      <Hall f={f} fill={[0, 1, 2].map(fillK)} flash={[0, 1, 2].map((k) => span(f, separate + k * 6, separate + k * 6 + 14))} />
      <g transform="translate(960 1000) scale(0.82) translate(-960 -1000)">
      <g opacity={on(f, auction14, 10)}>
        {/* # the auctioneer at the GOOGLE podium; the gavel bangs for every search pill */}
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [auction14 + 6, 'explain', 'smiling'], [every, 'point', 'smiling'], [separate, 'present', 'smiling'], [pay19, 'confident', 'smug']]} x={1120} y={1000} s={1} flip />
        <g transform="translate(1120 1000)"><rect x={-130} y={-230} width={260} height={230} rx={14} fill="#5A3A22" /><rect x={-150} y={-260} width={300} height={44} rx={10} fill="#1A73E8" /><text x={0} y={-226} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"', letterSpacing: 4 }}>GOOGLE</text></g>
        <Gavel x={1290} y={690} s={0.45} hit={Array.from({ length: 6 }, (_, k) => span(f, searches + k * 7, searches + k * 7 + 4) * (1 - span(f, searches + k * 7 + 4, searches + k * 7 + 7))).reduce((a, b) => Math.max(a, b), 0)} />
        {SHOPS.map((_, k) => <PaddleMini key={k} f={f} x={1360 + k * 200} k={k} up={Math.max(on(f, competed + k * 3, 8) * (0.6 + 0.4 * Math.abs(Math.sin((f - competed) / 6 + k))) * (1 - on(f, loading, 8)), on(f, bidding + k * 2, 8))} mood={f > loading ? 'happy' : 'neutral'} />)}
      </g>
      {/* # search pills from everywhere fly into the hall */}
      {Array.from({ length: 6 }, (_, k) => { const p = fly(f, every + k * 6, [80, 260 + (k % 3) * 120], [1120, 650], 16, 120); return <g key={k} opacity={p.o * on(f, auction14, 4)} transform={`translate(${p.x} ${p.y}) scale(0.5)`}><SearchBar x={0} y={0} w={460} text={['shoes', 'pizza', 'flights', 'jeans', 'hotels', 'phones'][k]} /></g> })}
      </g>
      {/* # the wall that rolls up like a curtain */}
      <g transform={`translate(0 ${-1000 * curtain})`}><rect x={1000} y={0} width={920} height={1000} fill="#EFE6D6" /><rect x={1000} y={980} width={920} height={20} fill="#C9B48E" /><rect x={1000} y={0} width={10} height={1000} fill="#D9CBB1" /><g transform="translate(1460 420)"><circle r={110} fill="#FFFFFF" stroke="#8E6A45" strokeWidth={14} /><path d={`M0 0 L${70 * Math.sin(f / 20)} ${-70 * Math.cos(f / 20)}`} stroke={P.ink} strokeWidth={10} strokeLinecap="round" /><path d="M0 0 L0 -50" stroke={P.ink} strokeWidth={14} strokeLinecap="round" /></g><g transform="translate(1460 820)"><rect x={-260} y={-20} width={520} height={24} rx={6} fill="#8E6A45" /><rect x={-220} y={-110} width={200} height={90} rx={8} fill="#E05A4C" /><rect x={10} y={-90} width={180} height={70} rx={8} fill="#3A6EA8" /><text x={-120} y={-52} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>SHOES</text></g></g>
      {/* # you at the laptop */}
      <g transform={`translate(${LX} 1000) scale(1.12) translate(${-LX} -1000)`}><Laptop x={LX} y={LY}>
        {f < page && <SearchBar x={SX} y={SY - 30} w={620} s={0.68} text="running shoes" t={span(f, running - 4, running + 20)} press={on(f, google11 + 10, 2)} />}
        {f >= page && <g transform={`translate(${SX - 205} ${SY - 105}) scale(0.46)`}>
          {[0, 1].map((k) => <Row key={k} x={0} y={k * 130} w={900} sponsored title={ads[k]} hi={on(f, sponsored + k * 8, 6) * (1 - on(f, moment, 8)) + (k < 3 ? fillK(k) * 0 : 0)} o={f < loading - 10 ? 1 : 0} />)}
          {f >= loading - 10 && [0, 1, 2].map((k) => <g key={k} opacity={fillK(k)}><Row x={0} y={k * 130} w={900} sponsored title={ads[k]} /><rect x={-30} y={k * 130 - 50} width={14} height={110} fill={SHOPS[k][1]} /></g>)}
          <g opacity={f < loading - 10 ? 1 : on(f, loading + 4, 8)}><Row x={0} y={(f < loading - 10 ? 2 : 3) * 130 + 10} w={900} title="How to choose running shoes" /></g>
          {f > loading - 14 && f < loading + 14 && <g><rect x={0} y={-110} width={900} height={14} rx={7} fill="#E8EAED" /><rect x={0} y={-110} width={900 * span(f, loading - 14, loading + 10)} height={14} rx={7} fill="#1A73E8" /></g>}
        </g>}
      </Laptop></g>
      <Person f={f} who="buyer" beats={gestB([[0, 'type', 'neutral'], [page, 'point', 'thinking'], [ads13, 'explain', 'neutral'], [moment, 'shock', 'shocked'], [every, 'lookFar', 'thinking'], [shoe, 'point', 'neutral'], [loading, 'type', 'neutral'], [pay19, 'emptyPockets', 'smiling'], [bidding, 'shrug', 'thinking']], G)} x={190} y={1000} s={1} />
      <Headline f={f} lines={[[s10, 'ONE SEARCH · EXAMPLE', P.ink, 100], [sponsored, '“SPONSORED” = ADS', P.goldInk, 104], [moment, 'IN THAT MOMENT: AN AUCTION', P.ink, 100], [every, 'EVERY SEARCH, AN AUCTION', P.goldInk, 104],
        [shoe, 'SHOE SHOPS COMPETE FOR THE SPOTS', P.ink, 96], [separate, 'A SEPARATE AUCTION PER SPOT', P.ink, 100], [loading, 'BEFORE THE PAGE LOADS', P.ink, 104], [pay19, 'YOU PAY NOTHING', P.mintInk, 110]]} />
      <Vignette id="gg-search" />
    </g>
  )
}

const BEATS = ['s13:just', 's15:an', 's16:searching', 's18:before', 's19:your', 's10:search', 's11:running', 's11:google', 's12:page', 's12:sponsored', 's13:ads', 's13:waiting', 's14:moment', 's14:auction', 's15:every', 's15:searches', 's16:shoe', 's16:competed', 's16:spots', 's17:separate', 's17:page', 's18:loading', 's19:pay', 's19:bidding']
export const GG_SEARCH = makePiece('gg-search', 'Google long (casino-style): in the same room you type running shoes and a results page with two Sponsored rows lights up; the right wall rolls up like a curtain to reveal a hidden auction hall behind your screen — an auctioneer at a GOOGLE podium, a board of three AD SPOTS and three shoe-shop owners with paddles; search pills fly in and the gavel bangs for each; the shops race with paddles, each spot flashes its own little auction and fills with a shop colour just before your page finishes loading; you show empty pockets while the paddles stay up', {
  mood: 'light', Component: Search, beats: BEATS,
  sfx: [['s14:auction', 'swish', 0.3], ['s15:searches', 'click', 0.3], ['s17:separate', 'ding', 0.3], ['s18:loading', 'pop', 0.3]] })
