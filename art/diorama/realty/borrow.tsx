// ---------------------------------------------------------------- s18–s33: step two — buyers pay with borrowed money.
// A bank hall with tall arched windows. A) A paper pie: only 27% of sales all cash; everyone else signs a MORTGAGE paid
//    monthly for 30 years; the banker agrees because interest coins roll in, and if payments stop the house slides back to
//    the bank (its safety net). The family holds a $2,000 A MONTH card: they shop for a payment.
// B) The same $2,000 coin stack buys two different houses on two pedestals: 2.65% (Jan 2021) → a big house, ≈ $496,000
//    loan; 7.18% (Nov 2026) → a small house, ≈ $295,000; a bracket: ≈ $200,000 LESS.
// C) The typical $417,500 home as one paper bar: 20% down $83,500 lifts off, loan $334,000; two monthly bills $1,346 vs
//    $2,263 = +$917 A MONTH; two coin towers of 30-year interest, ≈ $151,000 vs ≈ $481,000.
// D) Buyers can bid less: an arrow pushes the price down … but it did not fall: the other side of the street.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { House, Tag, Coin, CoinStack, Paper, Cross, Vig, TXT, INK, CORAL, MINT, MUSTARD, PAPER, SLATE, TEAL, ROOFS, WALLS, Life } from './kit'

const FLOOR = 900

// # the bank hall: teal walls, three tall arched windows with sky, a wainscot, a chequered floor
const Hall: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs><linearGradient id="re-hall-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#DCEBE6" /><stop offset="100%" stopColor="#BFD9D2" /></linearGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill="url(#re-hall-w)" />
    {[380, 960, 1540].map((x, k) => <g key={k}>
      <Paper d={`M${x - 170} 760 L${x - 170} 360 Q${x} 170 ${x + 170} 360 L${x + 170} 760 Z`} fill="#FFFFFF" dx={6} dy={8} />
      <path d={`M${x - 150} 750 L${x - 150} 370 Q${x} 196 ${x + 150} 370 L${x + 150} 750 Z`} fill="#BFE3F0" />
      <ellipse cx={x - 40 + 20 * Math.sin(f / 80 + k)} cy={420} rx={60} ry={18} fill="#FFFFFF" opacity={0.8} />
      <line x1={x} y1={200} x2={x} y2={750} stroke="#FFFFFF" strokeWidth={8} /><line x1={x - 150} y1={560} x2={x + 150} y2={560} stroke="#FFFFFF" strokeWidth={8} />
    </g>)}
    <rect x={-40} y={760} width={2000} height={140} fill="#A9C9BF" /><rect x={-40} y={760} width={2000} height={12} fill="#8DB3A7" />
    {Array.from({ length: 24 }, (_, i) => <rect key={i} x={-40 + i * 90} y={FLOOR} width={90} height={200} fill={i % 2 ? '#E9E1D1' : '#D3C8B3'} />)}
  </g>
)

// # a pedestal with a house on it
const Pedestal: React.FC<{ x: number; s: number; o?: number; roof: string; wall: string }> = ({ x, s, o = 1, roof, wall }) => (
  <g opacity={o}>
    <Paper d={`M${x - 150} ${FLOOR} L${x - 130} ${FLOOR - 70} L${x + 130} ${FLOOR - 70} L${x + 150} ${FLOOR} Z`} fill="#CDBFA6" />
    <House x={x} y={FLOOR - 70} s={s} roof={roof} wall={wall} />
  </g>
)

const Bill: React.FC<{ x: number; y: number; t: string; sub: string; col: string; s?: number }> = ({ x, y, t, sub, col, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Paper d="M-150 -110 L150 -110 L150 110 L-150 110 Z" fill={PAPER} />
    <rect x={-150} y={-110} width={300} height={56} fill={col} /><text y={-70} textAnchor="middle" fill="#FFFFFF" style={TXT(38)}>{sub}</text>
    <text y={30} textAnchor="middle" fill={INK} style={TXT(74)}>{t}</text><text y={80} textAnchor="middle" fill={INK} style={TXT(32)}>A MONTH</text>
  </g>
)

const Borrow: React.FC<PieceProps> = ({ f, c }) => {
  const cash = c('s18:cash'), d27 = c('s18:27'), cash2 = c('s18:cash#2')
  const mortgage = c('s19:mortgage'), month19 = c('s19:month'), interest19 = c('s19:interest'), d30 = c('s19:30')
  const agree = c('s20:agree'), earns = c('s20:earns'), stop = c('s20:stop'), back = c('s20:back'), safety = c('s20:safety')
  const miss = c('s21:miss'), payment = c('s21:payment'), afford = c('s21:afford')
  const d2000 = c('s22:2000'), buys = c('s22:buys')
  const jan = c('s23:january'), d265 = c('s23:265')
  const d496 = c('s24:496000')
  const nov = c('s25:november'), d718 = c('s25:718')
  const same26 = c('s26:same'), d295 = c('s26:295000')
  const d200 = c('s27:200000'), less = c('s27:less')
  const typical = c('s28:typical'), d20 = c('s28:20'), d417 = c('s28:417500'), d334 = c('s28:334000')
  const p265 = c('s29:265'), d1346 = c('s29:1346'), p718 = c('s29:718'), d2263 = c('s29:2263')
  const d917 = c('s30:917'), single = c('s30:single')
  const years = c('s31:years'), d481 = c('s31:481000'), d151 = c('s31:151000')
  const bid = c('s32:bid'), down = c('s32:down')
  const fall = c('s33:fall'), other = c('s33:other'), street = c('s33:street')

  const A = 1 - on(f, d2000 - 6, 12), B = win(f, d2000 - 6, typical - 6, 12), C = win(f, typical - 6, bid - 6, 12), D = on(f, bid - 6, 12)
  const fam: Beat[] = [[cash, 'idle', 'neutral'], [mortgage, 'signA', 'neutral', 'signB', 10], [agree, 'handshake', 'smiling'], [miss, 'think', 'thinking'], [payment, 'holdUp', 'smiling']]
  const banker: Beat[] = [[mortgage, 'present', 'smiling'], [agree, 'handshake', 'smiling'], [earns, 'countA', 'smiling', 'countB', 10], [stop, 'stop', 'neutral'], [back, 'pull', 'neutral'], [safety, 'explain', 'smiling']]
  const hp = hand(f, fam, 300, FLOOR + 20, 0.85, false)

  return (
    <g>
      <Hall f={f} />
      {/* # A) cash or mortgage, and why the bank lends */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="buyer" beats={fam} x={300} y={FLOOR + 20} s={0.85} />
        <g opacity={on(f, mortgage - 6, 10)}><Person f={f} who="investor" beats={banker} x={720} y={FLOOR + 20} s={0.85} flip /></g>
        {/* the cash pie */}
        <g opacity={win(f, cash, mortgage + 20, 10)} transform="translate(1340 520)">
          <circle r={200} fill={SLATE} opacity={0.12} transform="translate(8 10)" />
          <circle r={200} fill="#5C8FC2" />
          <path d={`M0 0 L0 -200 A200 200 0 0 1 ${200 * Math.sin(0.27 * 2 * Math.PI * on(f, d27, 20))} ${-200 * Math.cos(0.27 * 2 * Math.PI * on(f, d27, 20))} Z`} fill={MUSTARD} />
          <g opacity={on(f, d27, 8)}><text x={150} y={-150} fill={INK} style={TXT(70)}>27% CASH</text></g>
          <g opacity={on(f, cash2, 8)}><text x={-60} y={60} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>BORROW</text></g>
        </g>
        {/* the mortgage paper, monthly for 30 years */}
        <g opacity={win(f, mortgage, agree, 10)} transform={`translate(1340 520) scale(${pop(f, mortgage, 12)})`}>
          <Paper d="M-170 -220 L170 -220 L170 220 L-170 220 Z" fill={PAPER} />
          <text y={-150} textAnchor="middle" fill={INK} style={TXT(60)}>MORTGAGE</text>
          {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-120} y={-100 + k * 40} width={k === 4 ? 140 : 240} height={12} rx={6} fill="#CBBFA8" />)}
          <g opacity={on(f, month19, 8)}><Tag x={0} y={150} t={f >= d30 ? '30 YEARS' : 'EVERY MONTH'} size={44} col={MUSTARD} /></g>
          <g opacity={on(f, interest19, 8) * (1 - on(f, d30, 6))}><text y={200} textAnchor="middle" fill={CORAL} style={TXT(40)}>+ INTEREST</text></g>
        </g>
        {/* why the bank agrees: interest coins roll to the bank; a house slides back if payments stop */}
        <g opacity={win(f, agree, miss, 10)}>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, earns + k * 4, 6) * (1 - on(f, stop, 6))}><Coin x={lerp(360, 1200, ((f - earns) / 40 + k * 0.25) % 1)} y={560 - 40 * Math.sin(Math.PI * (((f - earns) / 40 + k * 0.25) % 1))} s={0.9} /></g>)}
          <g opacity={on(f, earns, 8)}><Tag x={1340} y={430} t="INTEREST EVERY MONTH" size={44} /></g>
          <g opacity={on(f, back, 8)} transform={`translate(${lerp(1100, 1500, on(f, back, 24))} 760)`}><House x={0} y={0} s={0.55} roof={ROOFS[0]} wall={WALLS[1]} /></g>
          <g opacity={on(f, safety, 8)}><Tag x={1500} y={560} t="THE BANK'S SAFETY NET" size={44} col={MUSTARD} /></g>
        </g>
        {f >= payment && <g transform={`translate(${hp.x + 20} ${hp.y - 60}) scale(${pop(f, payment, 12)})`}><Paper d="M-110 -50 L110 -50 L110 50 L-110 50 Z" fill={MINT} /><text y={-8} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>$2,000</text><text y={32} textAnchor="middle" fill="#FFFFFF" style={TXT(28)}>A MONTH</text></g>}
        <g opacity={on(f, afford, 8)}><Tag x={1340} y={430} t="SHOPPING FOR A MONTHLY PAYMENT" size={44} /></g>
      </g>}

      {/* # B) one budget, two rates, two houses */}
      {B > 0.001 && <g opacity={B}>
        <g transform="translate(960 840)"><CoinStack x={0} y={0} n={lerp(0, 9, on(f, d2000, 20))} s={1} /><g opacity={on(f, d2000, 8)}><text y={60} textAnchor="middle" fill={INK} style={TXT(48)}>$2,000 A MONTH</text></g></g>
        <g opacity={on(f, jan, 8)}>
          <Pedestal x={480} s={lerp(0.3, 1.0, on(f, d496 - 10, 24))} roof={ROOFS[1]} wall={WALLS[2]} />
          <Tag x={480} y={300} t={f >= d265 ? '2.65% · JAN 2021' : 'JANUARY 2021'} size={46} col={MINT} tc="#FFFFFF" />
          <g opacity={on(f, d496, 8)}><Tag x={480} y={390} t="LOAN ≈ $496,000" size={44} /></g>
        </g>
        <g opacity={on(f, nov, 8)}>
          <Pedestal x={1440} s={lerp(0.3, 0.6, on(f, d295 - 10, 24))} roof={ROOFS[0]} wall={WALLS[0]} />
          <Tag x={1440} y={300} t={f >= d718 ? '7.18% · NOV 2026' : 'NOVEMBER 2026'} size={46} col={CORAL} tc="#FFFFFF" />
          <g opacity={on(f, d295, 8)}><Tag x={1440} y={390} t="LOAN ≈ $295,000" size={44} /></g>
        </g>
        <g opacity={on(f, d200, 8)} transform={`translate(960 520) scale(${pop(f, d200, 12)})`}><Paper d="M-190 -50 L190 -50 L190 50 L-190 50 Z" fill={CORAL} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>≈ $200,000 LESS</text></g>
      </g>}

      {/* # C) the typical home's loan, the monthly bill and the 30-year interest */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={1 - on(f, p265 - 6, 10)} transform="translate(960 600)">
          <rect x={-600} y={-70} width={1200} height={140} rx={24} fill={SLATE} opacity={0.12} transform="translate(8 10)" />
          <rect x={-360} y={-70} width={960} height={140} rx={24} fill="#5C8FC2" />
          <g transform={`translate(${-60 * on(f, d20, 20)} ${-170 * on(f, d20, 20)})`}><rect x={-600} y={-70} width={232} height={140} rx={24} fill={f >= d20 ? MUSTARD : '#5C8FC2'} /></g>
          <g opacity={on(f, d417, 8) * (1 - on(f, d20, 8))}><text y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(70)}>TYPICAL HOME $417,500</text></g>
          <g opacity={on(f, d20, 8)}><text x={-544} y={-218} textAnchor="middle" fill={INK} style={TXT(48)}>20% DOWN $83,500</text></g>
          <g opacity={on(f, d334, 8)}><text x={120} y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(70)}>LOAN $334,000</text></g>
        </g>
        <g opacity={win(f, p265 - 6, years - 6, 10)}>
          <g opacity={on(f, d1346 - 6, 8)}><Bill x={620} y={560} t="$1,346" sub="AT 2.65%" col={MINT} s={pop(f, d1346 - 6, 12)} /></g>
          <g opacity={on(f, d2263 - 6, 8)}><Bill x={1300} y={560} t="$2,263" sub="AT 7.18%" col={CORAL} s={pop(f, d2263 - 6, 12)} /></g>
          <g opacity={on(f, d917, 8)} transform={`translate(960 820) scale(${pop(f, d917, 12)})`}><Paper d="M-210 -50 L210 -50 L210 50 L-210 50 Z" fill={CORAL} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>+$917 A MONTH</text></g>
        </g>
        <g opacity={on(f, years - 6, 10)}>
          <g transform="translate(700 860)"><CoinStack x={0} y={0} n={lerp(0, 8, on(f, d151, 20))} /><g opacity={on(f, d151, 8)}><Tag x={0} y={-160} t="≈ $151,000 AT 2.65%" size={40} col={MINT} tc="#FFFFFF" /></g></g>
          <g transform="translate(1220 860)"><CoinStack x={0} y={0} n={lerp(0, 26, on(f, d481, 30))} /><g opacity={on(f, d481, 8)}><Tag x={0} y={-400} t="≈ $481,000 AT 7.18%" size={40} col={CORAL} tc="#FFFFFF" /></g></g>
          <Tag x={960} y={300} t="INTEREST OVER 30 YEARS" size={48} />
        </g>
      </g>}

      {/* # D) buyers bid less … but prices did not fall */}
      {D > 0.001 && <g opacity={D}>
        <House x={960} y={FLOOR - 20} s={1.2} roof={ROOFS[2]} wall={WALLS[1]} />
        <g transform={`translate(1300 ${lerp(lerp(420, 560, on(f, down, 20)), 420, on(f, fall, 14))})`}><Paper d="M-120 -44 L120 -44 L120 44 L-120 44 Z" fill={PAPER} /><text y={16} textAnchor="middle" fill={INK} style={TXT(48)}>PRICE</text></g>
        <g opacity={win(f, bid, fall, 8)}><path d="M1480 380 L1480 600 M1450 570 L1480 610 L1510 570" stroke={CORAL} strokeWidth={12} fill="none" strokeLinecap="round" /></g>
        <g opacity={on(f, fall, 8)}><Cross x={1480} y={490} s={0.7} /></g>
        <g opacity={on(f, other, 8)}><Tag x={620} y={330} t="THE OTHER SIDE OF THE STREET →" size={44} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s18:2026")} x={1340} y={520} kind="glint" />
        <Life f={f} at={c("s20:month")} x={1340} y={520} kind="glint" />
        <Life f={f} at={c("s21:here")} x={300} y={520} kind="glint" />
        <Life f={f} at={c("s21:really")} x={300} y={520} kind="glint" />
        <Life f={f} at={c("s22:family")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s22:let")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s23:mortgage")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s23:the")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s24:dollars")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s24:rate")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s25:the")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s26:2000")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s26:the")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s26:pays")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s27:same#2")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s27:home")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s29:718")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s29:month")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s29:month#2")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s31:adds")} x={960} y={520} kind="glint" />
        <Life f={f} at={c("s32:up")} x={1300} y={420} kind="glint" />
        <Life f={f} at={c("s32:own")} x={1300} y={420} kind="glint" />
        <Life f={f} at={c("s33:why")} x={1300} y={420} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="re-borrow" k={0.18} />
      <Headline f={f} lines={[[cash, 'MOST BUYERS BORROW', INK, 88], [d2000, 'ONE BUDGET, TWO RATES', INK, 88], [typical, 'THE TYPICAL HOME', INK, 88], [years, 'THE INTEREST ADDS UP', INK, 88], [bid, 'SO BUYERS BID LESS…', INK, 88]]} />
    </g>
  )
}

export const RE_BORROW = makePiece('re-borrow', "Step two in a bank hall with tall arched windows: a paper pie shows only 27% CASH, the rest BORROW; a MORTGAGE paper paid EVERY MONTH for 30 YEARS + interest; the banker shakes hands because interest coins roll in every month, and a house slides back to the bank if payments stop — THE BANK'S SAFETY NET; the buyer holds a $2,000 A MONTH card — SHOPPING FOR A MONTHLY PAYMENT; one $2,000 coin stack between two pedestals: 2.65% · JAN 2021 holds a big house, LOAN ≈ $496,000, while 7.18% · NOV 2026 holds a small one, LOAN ≈ $295,000 — ≈ $200,000 LESS; the typical $417,500 home as one paper bar whose 20% DOWN $83,500 lifts off, leaving LOAN $334,000; monthly bills $1,346 at 2.65% vs $2,263 at 7.18% = +$917 A MONTH; coin towers of interest over 30 years, ≈ $151,000 vs ≈ $481,000; a price tag pushed down by an arrow, then crossed: prices did not fall — the other side of the street.", {
  mood: 'light', Component: Borrow,
  beats: ["s18:cash", "s18:27", "s18:cash#2", "s19:mortgage", "s19:month", "s19:interest", "s19:30", "s20:agree", "s20:earns", "s20:stop", "s20:back", "s20:safety", "s21:miss", "s21:payment", "s21:afford", "s22:2000", "s22:buys", "s23:january", "s23:265", "s24:496000", "s25:november", "s25:718", "s26:295000", "s27:200000", "s27:less", "s28:typical", "s28:20", "s28:417500", "s28:334000", "s29:265", "s29:1346", "s29:2263", "s30:917", "s30:single", "s31:years", "s31:481000", "s31:151000", "s32:bid", "s32:down", "s33:fall", "s33:other", "s33:street", "s18:2026", "s20:month", "s21:here", "s21:really", "s22:family", "s22:let", "s23:mortgage", "s23:the", "s24:dollars", "s24:rate", "s25:the", "s26:2000", "s26:the", "s26:pays", "s27:same#2", "s27:home", "s29:718", "s29:month", "s29:month#2", "s31:adds", "s32:up", "s32:own", "s33:why"],
  sfx: [['s18:27', 'pop', 0.08], ['s20:agree', 'swish', 0.08], ['s27:200000', 'thud', 0.12], ['s30:917', 'pop', 0.1], ['s33:fall', 'thud', 0.1]] })
