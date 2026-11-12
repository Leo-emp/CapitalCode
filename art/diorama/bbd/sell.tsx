// ---------------------------------------------------------------- s23–s28 (sample of the new look, owner 2026-10-31): "Way one: she sells 1 million of shares"
// One full drawn street — her house and her shelf of shares (left), the market stall (middle), the tax office (right).
// ONE object transforms on the words: her certificate becomes a $1M bundle on the stall, splits into ten parts (1 blue = the $100K
// she paid, 9 gold = the $900K gain), a 20% + 3.8% = 23.8% chunk is marked, tears off and slides into the tax office ($214K),
// the rest ($786K) settles into her arms and she walks home to a gap on her shelf where a sprout withers. No presenter, no stickers.
import React from 'react'
import { lerp, on, P, span, easeInOut, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person } from '../aimoney/common'
import { Cert, TaxOffice } from './kit'

// # the street's backdrop: soft far skyline, two slow clouds, the ground and a path from her door to the tax office
export const Street: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {[[80, 300], [300, 380], [560, 260], [1180, 340], [1420, 280], [1760, 360]].map(([x, h], k) => <rect key={k} x={x} y={860 - h} width={150} height={h} rx={8} fill={P.ink2} opacity={0.12} />)}
    {[[380, 250, 0.4], [1300, 210, 0.3]].map(([x, y, v], k) => <g key={k} transform={`translate(${(x + f * v) % 2100 - 100} ${y})`} opacity={0.5}><ellipse cx={0} cy={0} rx={90} ry={28} fill={P.white} /><ellipse cx={50} cy={-16} rx={60} ry={26} fill={P.white} /></g>)}
    <rect x={0} y={860} width={1920} height={220} fill="#E6D3AE" />
    <path d="M300 900 C 700 880, 1200 920, 1700 900 L1700 960 C 1200 980, 700 940, 300 960 Z" fill="#F3E6C8" />
  </g>
)
// # her house with a door and two windows
export const House: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={4} rx={200} ry={16} fill="#000" opacity={0.12} />
    <rect x={-170} y={-250} width={340} height={250} rx={8} fill="#F2D9A6" />
    <path d="M-200 -240 L0 -380 L200 -240 Z" fill="#C9553E" />
    <rect x={-40} y={-140} width={80} height={140} rx={8} fill="#7A4E2D" />
    {[-115, 115].map((wx) => <g key={wx}><rect x={wx - 40} y={-200} width={80} height={70} rx={6} fill="#AFD3EE" /><path d={`M${wx} -200 L${wx} -130 M${wx - 40} -165 L${wx + 40} -165`} stroke="#F2D9A6" strokeWidth={6} /></g>)}
  </g>
)
// # the market stall: counter, striped awning and its sign
export const Stall: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={4} rx={230} ry={16} fill="#000" opacity={0.12} />
    {[-190, 190].map((px) => <rect key={px} x={px - 10} y={-250} width={20} height={250} fill="#7A4E2D" />)}
    <rect x={-220} y={-150} width={440} height={150} rx={8} fill="#C98F5A" /><rect x={-230} y={-160} width={460} height={22} rx={6} fill="#A86F42" />
    {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-240 + k * 60} -250 L${-180 + k * 60} -250 L${-180 + k * 60} -200 Q${-210 + k * 60} -180 ${-240 + k * 60} -200 Z`} fill={k % 2 ? P.white : '#3A6EA8'} />)}
    <rect x={-110} y={-110} width={220} height={60} rx={10} fill={P.white} /><text x={0} y={-66} textAnchor="middle" fill="#3A6EA8" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 4 }}>MARKET</text>
  </g>
)
// # the $1M bundle as ten parts: dividers draw in (div), part 0 turns blue (blue), parts 1–9 gold (gold); the right `cut` parts are coral (the tax)
const SEG = 56
const BX = 1130, BY = 470 // # where the bundle floats: above the stall, right of where she stands
const Bundle: React.FC<{ div: number; blue: number; gold: number; cut: number; cutO: number; parts?: number }> = ({ div, blue, gold, cut, cutO, parts = 10 }) => {
  const w = parts * SEG
  return <g>
    <rect x={-w / 2 + 8} y={-92} width={w} height={200} rx={16} fill="#000" opacity={0.15} />
    <rect x={-w / 2} y={-100} width={w} height={200} rx={16} fill="#7FC98A" stroke="#3E8A4E" strokeWidth={6} />
    <rect x={-w / 2 + 20} y={-80} width={w - 40} height={160} rx={10} fill="none" stroke="#3E8A4E" strokeWidth={3} opacity={1 - div} />
    <rect x={-w / 2} y={-100} width={SEG} height={200} rx={16} fill="#7FB2E5" opacity={blue} />
    <rect x={-w / 2 + SEG} y={-100} width={w - SEG} height={200} rx={16} fill={P.gold} opacity={gold} />
    <rect x={w / 2 - cut * SEG} y={-100} width={cut * SEG} height={200} rx={16} fill={P.coral} opacity={cutO} />
    {Array.from({ length: parts - 1 }, (_, k) => <path key={k} d={`M${-w / 2 + (k + 1) * SEG} -100 L${-w / 2 + (k + 1) * SEG} ${-100 + 200 * span(div, k / parts, k / parts + 0.3)}`} stroke="#2F5E3A" strokeWidth={4} opacity={0.6} />)}
  </g>
}

const Sell: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const one = c('s23:one'), sells = c('s23:sells'), shares = c('s23:shares')
  const ten = c('s24:ten'), d100k = c('s24:100000'), original = c('s24:original')
  const d900 = c('s25:900000'), taxed = c('s25:taxed'), d20 = c('s26:20'), d38 = c('s26:38'), d238 = c('s27:238'), d214 = c('s27:214000'), office = c('s27:office')
  const keeps = c('s27a:keeps'), d786 = c('s27a:786000'), gone = c('s28:gone'), grow = c('s28:grow')
  // # her walk: from her shelf to the stall on "sells" → "shares"; back home after "786,000"
  const out = easeInOut(span(f, sells, shares + 6)), home = easeInOut(span(f, d786 + 10, gone - 4))
  const ix = lerp(lerp(650, 730, out), 650, home)
  const inv: Beat[] = [[0, 'idle', 'neutral'], [one, 'present', 'smiling'], [sells, 'walkA', 'neutral', 'walkB', 10], [shares + 6, 'offer', 'smiling'], [ten, 'think', 'thinking'],
    [d100k, 'explain', 'neutral'], [d900, 'confident', 'smiling'], [taxed, 'nervous', 'worried'], [d20, 'oops', 'shocked'], [d214, 'despair', 'worried'],
    [keeps, 'carry', 'worried'], [d786 + 10, 'walkA', 'neutral', 'walkB', 10], [gone - 4, 'carry', 'worried'], [gone, 'facepalm', 'worried']]
  const hp = hand(f, inv, ix, 1000, 0.95)
  // # the certificate: in her hands on the walk, then onto the stall where it becomes the bundle
  const certAt = span(f, shares, shares + 10)
  const certX = lerp(hp.x, BX, certAt), certY = lerp(hp.y, BY, certAt)
  const bundleIn = on(f, shares + 6, 12)
  // # the tax chunk: 20% of the gain (1.8 parts) on "20", +3.8% (to 2.14 parts) on "3.8"; tears off on "214,000" and slides into the open door
  const cut = f < d38 ? 1.8 : lerp(1.8, 2.14, on(f, d38, 10))
  const tear = easeInOut(span(f, d214 + 4, d214 + 34))
  const chunkX = lerp(BX + 280 - (cut * SEG) / 2, 1610, tear), chunkY = lerp(BY, 780, tear) - Math.sin(tear * Math.PI) * 120
  const door = on(f, taxed, 10) * (1 - on(f, office + 6, 8))
  // # what is left settles into her arms on "keeps"
  const keep = easeInOut(span(f, keeps, keeps + 18))
  const bx = lerp(BX - (2.14 * SEG) / 2, hp.x, keep), by = lerp(BY, hp.y + 70, keep), bs = lerp(1, 0.32, keep)
  const label = (x: number, y: number, text: string, color: string, o: number, size = 54) => o > 0.01 ? <Label x={x} y={y} text={text} size={size} font="Bebas Neue" color={color} o={o} /> : null
  return (
    <g>
      <Stage id="bs" frame={f} />
      <g>
        <Street f={f} />
        <House x={250} y={880} />
        {/* # her shelf of shares beside the house; one certificate leaves on "sells", the gap shows on "gone" and a sprout there withers on "grow" */}
        <g transform="translate(530 880)">
          <rect x={-90} y={-330} width={180} height={330} rx={8} fill="#A86F42" />
          {Array.from({ length: 10 }, (_, k) => (k === 9 && f >= sells ? null : <g key={k} transform={`translate(0 ${-20 - k * 30})`}><rect x={-75} y={-12} width={150} height={24} rx={5} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={2} /><circle cx={60} cy={0} r={6} fill={P.gold} /></g>))}
          <g opacity={on(f, gone, 8)}><rect x={-80} y={-302} width={160} height={30} rx={6} fill="none" stroke={P.coral} strokeWidth={4} strokeDasharray="10 8" /></g>
          <g opacity={on(f, gone + 4, 8)} transform={`translate(0 -300) rotate(${lerp(0, 70, on(f, grow, 30))})`}><path d="M0 0 C 0 -30, 0 -40, 0 -55" stroke="#3DA672" strokeWidth={6} fill="none" /><ellipse cx={-14} cy={-50} rx={16} ry={8} fill="#3DA672" opacity={1 - 0.5 * on(f, grow, 30)} /><ellipse cx={14} cy={-58} rx={16} ry={8} fill="#3DA672" opacity={1 - 0.5 * on(f, grow, 30)} /></g>
        </g>
        <Stall x={1040} y={880} />
        <g transform={sw(['s26:federal', 's26:rate', 's28:again', 's28:her'], 1610, 880, 0.1)}><TaxOffice x={1610} y={880} s={0.95} eat={door} /></g>
        {/* # the certificate in her hands, then laid on the stall where it turns into the bundle */}
        {f >= sells && f < shares + 14 && <g opacity={1 - on(f, shares + 8, 6)}><Cert x={certX} y={certY} s={lerp(0.35, 1, certAt)} /></g>}
        {/* # the bundle: ten parts → blue + gold → coral chunk marked; after the tear the rest stays, then moves into her arms */}
        {f >= shares + 6 && <g transform={`translate(${f < d214 + 4 ? BX : bx} ${f < d214 + 4 ? BY : by}) scale(${(f < d214 + 4 ? 1 : bs) * lerp(0.6, 1, bundleIn)})`} opacity={bundleIn}>
          {f < d214 + 4
            ? <g transform={sw(['s27:900000', 's27:about'], 0, 0, 0.1)}><Bundle div={on(f, ten, 20)} blue={on(f, d100k, 10)} gold={on(f, d900, 10)} cut={cut} cutO={on(f, d20, 10)} /></g>
            : <g transform={sw(['s27a:from', 's27a:sale', 's27a:she'], 0, 0, 0.1)}><g transform={`translate(${(-2.14 * SEG) / 2} 0)`}><Bundle div={1} blue={1} gold={1} cut={0} cutO={0} parts={7.86} /></g></g>}
        </g>}
        {/* # labels stuck to their parts */}
        {label(BX, BY + 10, '$1M', P.navy0, on(f, shares + 8, 8) * (1 - on(f, ten, 8)), 80)}
        {f < keeps && label(BX - 5 * SEG + 30, BY - 130, '$100K PAID', P.skyInk, on(f, d100k, 8) * (1 - on(f, d214, 8)), 50)}
        <g transform={sw(['s26:earner', 's26:gain', 's25:gain#2', 's25:gets'], BX + 70, BY - 130, 0.25)}>{label(BX + 70, BY - 130, '$900K GAIN', P.goldInk, on(f, d900, 8) * (1 - on(f, d20, 8)))}</g>
        <g transform={sw(['s26:investment', 's26:income', 's27:together'], BX + 280, BY - 130, 0.25)}>{f < d214 + 4 && label(BX + 280 - (cut * SEG) / 2, BY - 130, f >= d238 ? '23.8%' : f >= d38 ? '20% + 3.8%' : '20%', P.coralInk, on(f, d20, 8))}</g>
        {/* # the chunk tears off and slides into the tax office door (it shuts on "office") */}
        {f >= d214 + 4 && tear < 1 && <g transform={`translate(${chunkX} ${chunkY}) scale(${lerp(1, 0.3, tear)})`}><rect x={-(2.14 * SEG) / 2} y={-100} width={2.14 * SEG} height={200} rx={14} fill={P.coral} stroke={P.coralD} strokeWidth={5} /></g>}
        {f >= d214 + 4 && label(chunkX, chunkY - 130 * lerp(1, 0.4, tear), '$214K', P.coralInk, 1 - on(f, office + 10, 8), 60)}
        {/* # what she keeps, in her arms */}
        {label(hp.x + 170, hp.y + 40, '$786K', P.mintInk, on(f, d786, 8) * (1 - on(f, gone, 8)), 56)}
        <Person f={f} who="investorF" beats={inv} x={ix} y={1000} s={0.95} />
      </g>
      <Headline f={f} lines={[[one, 'WAY ONE: SELL', P.coralInk, 120], [d214, '≈ $214K TAX', P.coralInk, 124], [d786, 'SHE KEEPS ≈ $786K', P.ink, 116]]} />
      <Vignette id="bs" />
    </g>
  )
}

const BEATS: string[] = ['s25:gain#2', 's25:gets', 's27a:from', 's27a:sale', 's27a:she', 's28:again', 's28:her', 's26:investment', 's26:income', 's27:together', 's27:900000', 's27:about', 's26:federal', 's26:rate', 's26:earner', 's26:gain', 's26:20', 's23:one', 's23:sells', 's23:shares', 's24:ten', 's24:100000', 's24:original', 's25:900000', 's25:taxed', 's26:20', 's26:38', 's27:238', 's27:214000', 's27:office',
  's27a:keeps', 's27a:786000', 's28:gone', 's28:grow']
export const BB_SELL = makePiece('bb-sell', 'Long (sample, new look): $1M sale on a street — bundle splits $100K paid / $900K gain, 23.8% (≈ $214K) slides into the tax office, she keeps ≈ $786K', {
  mood: 'light', Component: Sell, beats: BEATS,
  sfx: [['s23:shares', 'swish', 0.4], ['s24:ten', 'click', 0.3], ['s27:214000', 'whoosh', 0.4], ['s27:office', 'thud', 0.4], ['s28:gone', 'softpop', 0.3]] })
