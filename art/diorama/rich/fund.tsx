// ---------------------------------------------------------------- s41–s48: way 6, own a slice of every big company (golden valley).
// The INDEX FUND train crosses the valley; each wagon carries a load of tiny company buildings (S&P 500), and coins
// rise from their chimneys as profits. Then the long run: a track sign 1928 → 2025, ≈10% A YEAR · BEFORE INFLATION.
// Twenty coin towers, one per year, grow: the teal part is what Leo put in, the gold part is growth (to scale:
// 240,000 put in, ≈720,000 at the end). The gold part glows: growth on growth. A 2008 signpost: one tower loses 37%
// in a single year. A crystal ball labelled THE PAST gets a cross: not a promise. A bank arm reaches in: borrow.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Train, Coin, Cross, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND, PLUM, SKYB } from './kit'

const GY = 960
// # value after each year of 1,000 a month at 10.02% a year (monthly equivalent rate), and the money put in
const m = Math.pow(1.1002, 1 / 12) - 1
const FV = Array.from({ length: 20 }, (_, y) => 1000 * (Math.pow(1 + m, 12 * (y + 1)) - 1) / m)
const PUT = Array.from({ length: 20 }, (_, y) => 12000 * (y + 1))
const PX = 520 / 720000                                // px per dollar: 720,000 = 520 px tall

const Mini: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-50 - (k % 3) * 14} width={44} height={50 + (k % 3) * 14} fill={[CREAM, SAND, '#F6D2C2', '#CFE3E0'][k % 4]} stroke={INK} strokeWidth={3} />
    <rect x={-12} y={-38 - (k % 3) * 14} width={10} height={10} fill={DEEP} /><rect x={4} y={-38 - (k % 3) * 14} width={10} height={10} fill={DEEP} />
  </g>
)

const Fund: React.FC<PieceProps> = ({ f, c }) => {
  const own = c('s41:own'), slice = c('s41:slice'), company = c('s41:company')
  const index = c('s42:index'), hundreds = c('s42:hundreds'), once = c('s42:once'), d500 = c('s42:500#2')
  const grow = c('s43:grow'), profits = c('s43:profits'), share = c('s43:share')
  const y1928 = c('s44:1928'), y2025 = c('s44:2025'), dividends = c('s44:dividends'), d10 = c('s44:10'), inflation = c('s44:inflation')
  const invests = c('s45:invests'), rate = c('s45:rate'), years = c('s45:years'), d240 = c('s45:240000'), d720 = c('s45:720000')
  const d480 = c('s46:480000'), growth2 = c('s46:growth#2'), compounding = c('s46:compounding')
  const straight = c('s47:straight'), y2008 = c('s47:2008'), lost = c('s47:lost'), d37 = c('s47:37'), single = c('s47:single')
  const past = c('s48:past'), promise = c('s48:promise'), slow = c('s48:slow'), borrow = c('s48:borrow')

  const leo: Beat[] = [[own, 'present', 'smiling'], [profits, 'receive', 'smiling'], [invests, 'offer', 'smiling'], [d720, 'shock', 'shocked'], [compounding, 'celebrate', 'smiling'], [y2008, 'shock', 'worried'], [promise, 'crossNoA', 'neutral', 'crossNoB', 10], [borrow, 'think', 'thinking']]
  const A = 1 - on(f, y1928 - 10, 8), B = win(f, y1928 - 2, straight - 2, 8), Cc = on(f, straight - 2, 8)
  const roll = lerp(1960, 260, on(f, own - 6, 60))
  const yearsT = on(f, years - 10, 90)                  // the twenty towers grow one by one

  return (
    <g>
      <PosterWorld f={f} id="rh-fund" tone="golden" sunX={1500} sunY={380} />
      <g opacity={on(f, own - 4, 10)}><WayBadge x={200} y={320} n={6} s={pop(f, own, 12)} col={ORANGE} /></g>
      {/* # A) the index fund train */}
      {A > 0.001 && <g opacity={A}>
        <rect x={-40} y={GY + 2} width={2000} height={16} fill={INK} />
        {Array.from({ length: 40 }, (_, k) => <rect key={k} x={k * 50} y={GY + 14} width={26} height={10} fill="#6E4630" />)}
        <g transform={`translate(${roll} 0)`}>
          <Train x={0} y={GY} s={0.9} cars={4} />
          <g opacity={on(f, index, 8)}><Ticket x={120} y={GY - 260} t="INDEX FUND" size={44} col={RED} tc={CREAM} /></g>
          {/* tiny companies on every wagon */}
          {[0, 1, 2, 3].map((w) => <g key={w} opacity={on(f, hundreds + w * 4, 8)}>{[0, 1, 2, 3].map((k) => <Mini key={k} x={(280 + w * 250) * 0.9 + 30 + k * 50} y={GY - 160} k={w * 4 + k} />)}</g>)}
          {/* coins rise from the companies as profits */}
          {f >= profits && [0, 1, 2, 3].map((w) => { const p = ((f - profits + w * 8) % 40) / 40; return <Coin key={w} x={(280 + w * 250) * 0.9 + 100} y={GY - 230 - 160 * p} s={0.6} o={(1 - p) * (1 - on(f, y1928 - 10, 8))} /> })}
        </g>
        <g opacity={on(f, d500, 8)}><Ticket x={1100} y={420} t="ALL 500 COMPANIES OF THE S&P 500" size={46} col={CREAM} /></g>
        <g opacity={win(f, slice, d500, 8)}><Ticket x={1100} y={420} t={f >= once ? 'HUNDREDS OF COMPANIES AT ONCE' : 'A SLICE OF EVERY BIG COMPANY'} size={46} col={CREAM} /></g>
        <g opacity={on(f, share, 8)}><Ticket x={1100} y={540} t="FUND OWNERS SHARE THE PROFITS" size={42} col={GOLD} /></g>
        <Person f={f} who="worker" beats={leo} x={1700} y={GY + 40} s={0.62} flip />
      </g>}
      {/* # B) the long run: twenty towers */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, y1928, 8)} transform="translate(960 330)"><Ticket x={0} y={0} t={f >= d10 ? '≈10% A YEAR · 1928–2025' : f >= y2025 ? 'S&P 500 · 1928 → 2025' : 'S&P 500 · 1928'} size={52} col={CREAM} /></g>
        <g opacity={on(f, inflation, 8)}><Ticket x={960} y={420} t="WITH DIVIDENDS · BEFORE INFLATION" size={36} col={GOLD} /></g>
        <line x1={300} y1={GY} x2={1660} y2={GY} stroke={INK} strokeWidth={6} />
        {FV.map((v, y) => { const g = on(f, years - 10 + y * 4, 8) * (f >= invests ? 1 : 0), x = 340 + y * 64, hp = PUT[y] * PX, hv = v * PX
          return <g key={y} opacity={g}>
            <rect x={x - 24} y={GY - hp * g} width={48} height={hp * g} fill="#5FB7A6" />
            <rect x={x - 24} y={GY - hv * g} width={48} height={(hv - hp) * g} fill={GOLD} opacity={0.75 + 0.25 * win(f, d480, compounding + 40, 10) * Math.sin(f / 4 + y)} />
            {(y === 0 || y === 9 || y === 19) && <text x={x} y={GY + 46} textAnchor="middle" fill={INK} style={TXT(34)}>{`Y${y + 1}`}</text>}
          </g> })}
        <g opacity={on(f, d240, 8)}><Ticket x={640} y={540} t="PUT IN $240,000" size={44} col="#5FB7A6" tc={CREAM} /></g>
        <g opacity={on(f, d720, 8)}><Ticket x={1470} y={GY - FV[19] * PX - 30} t="≈ $720,000" size={56} col={GOLD} /></g>
        <g opacity={on(f, d480, 8)}><Ticket x={640} y={650} t={f >= growth2 ? 'GROWTH ON GROWTH ≈ $480,000' : 'GROWTH ≈ $480,000'} size={44} col={GOLD} /></g>
        <g opacity={on(f, compounding, 8)}><Ticket x={640} y={770} t="COMPOUNDING" size={56} col={ORANGE} tc={CREAM} /></g>
        <g opacity={on(f, rate, 8) * (1 - on(f, d240, 8))}><Ticket x={640} y={540} t="$1,000 A MONTH · 20 YEARS · PAST RATE" size={40} col={CREAM} /></g>
      </g>}
      {/* # C) not a straight line: 2008; the past is not a promise; slow → borrow */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={1 - on(f, past - 10, 8)}>
          <g transform="translate(720 0)"><rect x={-4} y={GY - 300} width={8} height={300} fill={INK} /><rect x={-110} y={GY - 360} width={220} height={70} rx={12} fill={RED} /><text y={GY - 308} textAnchor="middle" fill={CREAM} style={TXT(54)}>{f >= y2008 ? '2008' : ''}</text></g>
          {/* one tower loses 37% of its height */}
          <g transform="translate(1180 0)">
            <rect x={-80} y={GY - 400} width={160} height={400 * 0.63} transform={`translate(0 ${400 * 0.37})`} fill={GOLD} />
            <g opacity={1 - on(f, d37 + 10, 12)} transform={`translate(${60 * on(f, lost, 20)} ${300 * on(f, lost, 20) * on(f, lost, 20)}) rotate(${20 * on(f, lost, 20)})`}><rect x={-80} y={GY - 400} width={160} height={400 * 0.37} fill={RED} /></g>
            <g opacity={on(f, d37, 8)}><Ticket x={0} y={GY - 480} t="−37% IN ONE YEAR" size={52} col={RED} tc={CREAM} /></g>
          </g>
        </g>
        <g opacity={on(f, past - 2, 8)}>
          <g transform="translate(1100 640)">
            <ellipse cx={0} cy={200} rx={160} ry={26} fill="rgba(30,20,30,0.22)" />
            <path d="M-110 200 L-80 140 L80 140 L110 200 Z" fill={PLUM} />
            <circle r={150} fill={SKYB} opacity={0.75} /><circle r={150} fill="none" stroke="#FFFFFF" strokeWidth={8} />
            <path d="M-80 -60 A100 100 0 0 1 20 -110" stroke="#FFFFFF" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.6} />
            <text y={16} textAnchor="middle" fill={DEEP} style={TXT(54)}>THE PAST</text>
            <g opacity={on(f, promise, 8)}><Cross x={0} y={0} s={1.2} /></g>
          </g>
          <g opacity={on(f, promise + 6, 8)}><Ticket x={1100} y={390} t="NOT A PROMISE" size={52} col={RED} tc={CREAM} /></g>
          <g opacity={on(f, slow, 8)}><Ticket x={1560} y={560} t="RELIABLE BECAUSE SLOW" size={40} col={CREAM} /></g>
        </g>
        <Person f={f} who="worker" beats={leo} x={460} y={GY + 40} s={0.78} />
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={company} x={1100} y={600} kind="glint" />
        <Life f={f} at={grow} x={1100} y={600} kind="glint" />
        <Life f={f} at={dividends} x={960} y={330} kind="glint" />
        <Life f={f} at={single} x={1180} y={500} kind="glint" />
        <Life f={f} at={borrow} x={1560} y={500} kind="spark" />
        <Life f={f} at={c("s42:in")} x={1100} y={600} kind="glint" />
        <Life f={f} at={c("s43:who")} x={1100} y={600} kind="glint" />
        <Life f={f} at={c("s44:500")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s45:a")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s46:of")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s48:fairly")} x={1180} y={600} kind="glint" />
        <Life f={f} at={c("s48:faster")} x={1180} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-fund" />
      <Headline f={f} lines={[[own, 'OWN A SLICE OF EVERY BIG COMPANY', INK, 84], [y1928, 'THE LONG RUN', INK, 92], [straight, 'NOT A STRAIGHT LINE', INK, 92]]} />
    </g>
  )
}

export const RH_FUND = makePiece('rh-fund', 'Way 6 in a golden valley: a red poster train labelled INDEX FUND rolls in, every wagon loaded with tiny company buildings (A SLICE OF EVERY BIG COMPANY, HUNDREDS OF COMPANIES AT ONCE, ALL 500 COMPANIES OF THE S&P 500), coins rising from them as profits — FUND OWNERS SHARE THE PROFITS; then twenty yearly towers grow, teal for what Leo put in and gold for growth, to scale (S&P 500 · 1928 → 2025, ≈10% A YEAR, WITH DIVIDENDS · BEFORE INFLATION; $1,000 A MONTH · 20 YEARS · PAST RATE; PUT IN $240,000; ≈ $720,000; GROWTH ON GROWTH ≈ $480,000; COMPOUNDING); then a red 2008 signpost and a gold tower whose red top 37% breaks off and falls (−37% IN ONE YEAR); a crystal ball THE PAST gets a red cross (NOT A PROMISE, RELIABLE BECAUSE SLOW).', {
  mood: 'light', Component: Fund,
  beats: ["s41:own", "s41:slice", "s41:company", "s42:index", "s42:hundreds", "s42:once", "s42:500#2", "s43:grow", "s43:profits", "s43:share", "s44:1928", "s44:2025", "s44:dividends", "s44:10", "s44:inflation", "s45:invests", "s45:rate", "s45:years", "s45:240000", "s45:720000", "s46:480000", "s46:growth#2", "s46:compounding", "s47:straight", "s47:2008", "s47:lost", "s47:37", "s47:single", "s48:past", "s48:promise", "s48:slow", "s48:borrow", "s42:in", "s43:who", "s44:500", "s45:a", "s46:of", "s48:fairly", "s48:faster"],
  sfx: [['s45:720000', 'chime', 0.08], ['s47:lost', 'crack', 0.1], ['s48:promise', 'pop', 0.08]] })
