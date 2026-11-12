// ============================================================
// SHORT — "Why Your Savings Account Pays Almost Nothing"
// (s1–s26, ≈ 2:09), six tall pieces. Sourced: FDIC national rates
// (Oct 19, 2026) — savings 0.38%, interest checking 0.07%, money
// market 0.63%, 12-month CD 1.76%; FRED — IORB 3.90% (Nov 2, 2026),
// 3-month T-bill 3.99% (Oct 30, 2026); FDIC QBP Q2 2026 — net
// interest margin 3.32%, net income $90.1B; FDIC insurance at least
// $250,000 per depositor, per ownership category, per bank.
// Our maths: $10,000 → $38 (0.38%), $390 (3.9%), $399 (3.99%).
// House rules: every picture lands on its spoken word, never before;
// one main group at a time, the last leaves before the next arrives;
// no zooms or camera moves (owner r56) — the drawing itself changes;
// all inside x 60–940, y 380–1270 (captions sit at y 1290–1490).
// ============================================================
import React from 'react'
import { Mini } from '../../rig/Mini'
import { Label } from '../charts'
import { easeOut, lerp, on, P, pop, span, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, fly, Person, Phone, Tick } from '../aimoney/common'
import { Prop, TallStage } from './tall'

const CX = 500
const RED = '#D8432F', BLUE = '#2F5FD0', MINT = '#3DAA6E', GOLD = '#E9B53A'
// # visible from a to b with clean fades (gone by b)
const win = (f: number, a: number, b: number, d = 5) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # one headline slot at y 330: each line from its cue until the next line's cue
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines, until = 9e9, y = 330 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 5) * (1 - easeOut(span(f, b - 5, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.94 + 0.06 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)
// # a columned building (the Fed / the government) with a word on the pediment
const Temple: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; color?: string }> = ({ x, y, s = 1, o = 1, text, color = '#E8E1D0' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-150 -90 L0 -170 L150 -90 Z" fill={color} stroke={P.edge} strokeWidth={4} />
    <rect x={-150} y={-90} width={300} height={22} fill={color} stroke={P.edge} strokeWidth={4} />
    {[-120, -60, 0, 60, 120].map((cx) => <rect key={cx} x={cx - 14} y={-68} width={28} height={130} fill="#F7F2E8" stroke={P.edge} strokeWidth={3} />)}
    <rect x={-165} y={62} width={330} height={26} rx={4} fill={color} stroke={P.edge} strokeWidth={4} />
    <text x={0} y={-104} textAnchor="middle" fill={P.ink} style={{ font: '400 30px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)
// # a stack of banknotes with a value label
const Stack: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; dark?: boolean }> = ({ x, y, s = 1, o = 1, text, dark }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(0 ${-k * 16})`}><rect x={-110} y={-30} width={220} height={60} rx={8} fill="#7DBE7A" stroke="#3F7A3D" strokeWidth={3} /><circle cx={0} cy={0} r={18} fill="#5FA05C" /></g>)}
    {text && <Label x={0} y={86} text={text} size={56} font="Bebas Neue" color={dark ? '#FFFFFF' : P.ink} />}
  </g>
)
// # a vertical bar on a baseline with value on top and a label under it
const Bar: React.FC<{ x: number; base: number; h: number; w?: number; color: string; label: string; value?: string; o?: number; vo?: number; dark?: boolean }> = ({ x, base, h, w = 170, color, label, value, o = 1, vo = 1, dark }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={base - Math.max(h, 4)} width={w} height={Math.max(h, 4)} rx={10} fill={color} />
    <Label x={x} y={base + 50} text={label} size={42} font="Bebas Neue" color={dark ? '#C9D3E8' : P.ink} />
    {value && <Label x={x} y={base - Math.max(h, 4) - 20} text={value} size={56} font="Bebas Neue" color={dark ? '#FFFFFF' : P.ink} o={vo} />}
  </g>
)
// # a vertical bracket between two heights at x with a label to the right
const Gap: React.FC<{ x: number; y1: number; y2: number; o: number; text: string; color?: string }> = ({ x, y1, y2, o, text, color = P.coralInk }) => (
  <g opacity={o}>
    <path d={`M${x} ${y1} L${x + 24} ${y1} L${x + 24} ${y2} L${x} ${y2}`} fill="none" stroke={color} strokeWidth={6} />
    <Label x={x + 120} y={(y1 + y2) / 2 + 16} text={text} size={48} font="Bebas Neue" color={color} />
  </g>
)

// ------------------------------------------------------------ 1) s1–s5: 0.38% vs the Fed's 3.9%
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), savings = c('s1:savings'), d038 = c('s1:038')
  const put = c('s2:put'), d10k = c('s2:10000'), whole = c('s2:whole'), earn = c('s2:earn'), d38 = c('s2:38')
  const bank3 = c('s3:bank'), take = c('s3:take'), park = c('s3:park'), federal = c('s3:federal'), earn3 = c('s3:earn'), d39 = c('s3:39')
  const d390 = c('s4:390'), ten = c('s4:ten'), pays = c('s4:pays')
  const s5 = c('s5'), why = c('s5:why'), nothing = c('s5:nothing')
  const A = win(f, s1, bank3), B = win(f, bank3, c("s4:that's")), C = win(f, c("s4:that's"), s5), D = on(f, s5, 6)
  return (
    <g>
      <TallStage id="sv-hook" f={f} />
      <Headline f={f} lines={[[d038, 'SAVINGS: 0.38%', P.coralInk, 104], [d38, '$10,000 → $38 A YEAR', P.ink, 88], [federal, 'THE FEDERAL RESERVE', P.ink, 88], [d39, 'PAYS BANKS ≈ 3.9%', P.mintInk, 96], [ten, '10× MORE', P.mintInk, 120], [why, 'WHY SO LITTLE?', P.ink, 104]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, savings, 5)} transform={`translate(${CX} 640) scale(${pop(f, savings)})`}><Prop id="piggy-bank" x={0} y={0} size={230} f={f} /></g>
        <g opacity={on(f, c('s1:america'), 5) * (1 - on(f, put, 5))} transform={`translate(760 600) scale(${pop(f, c('s1:america'))})`}><Prop id="map-pin" x={0} y={0} size={130} f={f} /></g>
        <g opacity={on(f, d038, 5) * (1 - on(f, put, 5))}><g transform={`translate(${CX} 860) scale(${pop(f, d038)})`}><rect x={-110} y={-44} width={220} height={88} rx={14} fill="#FFE9A8" stroke={P.edge} strokeWidth={4} /><text x={0} y={22} textAnchor="middle" fill={P.coralInk} style={{ font: '400 64px "Bebas Neue"' }}>0.38%</text></g></g>
        <g opacity={on(f, put, 5)}><Stack x={lerp(250, 280, on(f, d10k + 4, 16))} y={lerp(1000, 900, on(f, d10k + 4, 16))} s={0.9 * pop(f, put)} o={1 - on(f, whole, 6) * 0.3} text={f >= d10k ? '$10,000' : undefined} /></g>
        <g opacity={on(f, whole, 5)} transform={`translate(760 1060) scale(${pop(f, whole)})`}><Prop id="calendar" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, earn, 5)}><Coin x={CX} y={1110} s={0.55 * pop(f, earn)} /></g>
        <g opacity={on(f, d38, 5)}><Label x={CX} y={1230} text="+$38" size={72} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(220 760) scale(${pop(f, bank3)})`}><Prop id="bank" x={0} y={0} size={240} f={f} /></g>
        <Stack x={lerp(220, 780, on(f, park, 22))} y={lerp(980, 1010, on(f, park, 22)) - Math.sin(on(f, park, 22) * Math.PI) * 120} s={0.6 * pop(f, take)} o={on(f, take, 5)} />
        <g opacity={on(f, federal, 5)}><Temple x={780} y={760} s={1.0 * pop(f, federal)} text="FEDERAL RESERVE" /></g>
        <g opacity={on(f, d39, 5)}><g transform={`translate(780 560) scale(${pop(f, d39)})`}><rect x={-90} y={-40} width={180} height={80} rx={14} fill="#DFF3E4" stroke={P.edge} strokeWidth={4} /><text x={0} y={20} textAnchor="middle" fill={P.mintInk} style={{ font: '400 60px "Bebas Neue"' }}>3.9%</text></g></g>
        <g opacity={on(f, earn3, 5)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, earn3 + k * 3, [780, 900], [220 + (k - 2) * 50, 1120], 16, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
      </g>}
      {C > 0 && <g opacity={C}>
        <line x1={200} y1={1180} x2={800} y2={1180} stroke={P.ink2} strokeWidth={5} opacity={on(f, c("s4:that's"), 5)} />
        <Bar x={340} base={1180} h={60} color={RED} label="YOU GET" value="$38" o={on(f, c("s4:that's"), 5)} />
        <Bar x={660} base={1180} h={600 * on(f, d390, 18)} color={MINT} label="THE FED PAYS" value="$390" />
        <g opacity={on(f, pays, 5)}><Gap x={760} y1={580} y2={1120} o={1} text="" /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(${CX} 720) scale(${pop(f, s5)})`}><Prop id="piggy-bank" x={0} y={0} size={280} f={f} /></g>
        <g opacity={on(f, why, 5)} transform="translate(760 560)"><Prop id="question" x={0} y={0} size={150} f={f} /></g>
        <g opacity={on(f, nothing, 5)}><Coin x={CX} y={1050} s={0.3 * pop(f, nothing)} /><Label x={CX} y={1150} text="0.38%" size={64} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      <Vignette id="sv-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s6–s9: deposits are loans; buy cheap, sell for more
const Model: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), bank6 = c('s6:bank'), makes = c('s6:makes')
  const deposit = c('s7:deposit'), loan = c('s7:loan'), lend7 = c('s7:lend'), bank7 = c('s7:bank')
  const pays8 = c('s8:pays'), small = c('s8:small'), lends8 = c('s8:lends'), invests = c('s8:invests'), higher = c('s8:higher')
  const shop = c('s8a:shop'), cheap = c('s8a:cheap'), sell = c('s8a:sell'), savings = c('s8a:savings'), stock = c('s8a:stock')
  const gap = c('s9:gap'), profit = c('s9:profit'), engine = c('s9:engine'), margin = c('s9:margin')
  const A = win(f, s6, shop), B = win(f, shop, gap), C = on(f, gap, 6)
  return (
    <g>
      <TallStage id="sv-model" f={f} tint="navy" />
      <Headline f={f} lines={[[makes, 'HOW BANKS MAKE MONEY', '#FFFFFF', 88], [loan, 'YOUR DEPOSIT = A LOAN', P.gold, 88], [small, 'PAYS YOU A LITTLE', '#FFFFFF', 92], [higher, 'CHARGES MORE', P.gold, 104], [cheap, 'BUY CHEAP', '#FFFFFF', 110], [sell, 'SELL FOR MORE', P.gold, 104], [margin, 'NET INTEREST MARGIN', P.gold, 92]]} />
      {A > 0 && <g opacity={A}>
        <g transform={`translate(${CX} 700) scale(${pop(f, bank6)})`} opacity={on(f, bank6, 5)}><Prop id="bank" x={0} y={0} size={260} f={f} /></g>
        <Person f={f} who="buyer" beats={[[0, 'think', 'thinking'], [deposit, 'offer', 'smiling'], [pays8, 'receive', 'smiling']]} x={180} y={1250} s={0.6} o={on(f, deposit, 5)} />
        <g opacity={on(f, lend7, 5)}><Stack x={lerp(220, 360, on(f, lend7, 18))} y={lerp(1050, 960, on(f, lend7, 18))} s={0.45} /></g>
        <g opacity={on(f, loan, 5) * (1 - on(f, pays8, 5))}><Doc x={760} y={1010} s={0.42 * pop(f, loan)} title="IOU" /></g>
        <g opacity={on(f, small, 5)}>{Array.from({ length: 1 }, (_, k) => { const p = fly(f, small + k * 3, [CX, 820], [200, 1000], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.32} o={p.o} /> : null })}<Label x={340} y={900} text="0.38%" size={48} font="Bebas Neue" color="#FF9A85" /></g>
        <g opacity={on(f, lends8, 5)} transform={`translate(800 1080) scale(${pop(f, lends8)})`}><Prop id="house" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, invests, 5)} transform={`translate(800 820) scale(${pop(f, invests)})`}><Prop id="stock-certificate" x={0} y={0} size={150} f={f} /></g>
        <g opacity={on(f, higher, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, higher + k * 3, [800, 960], [CX + (k - 1.5) * 40, 820], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${CX} 760) scale(${pop(f, shop)})`}><Prop id="shop-mini" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, cheap, 5)}><g transform={`translate(220 1000) scale(${pop(f, cheap)})`}><Prop id="price-tag" x={0} y={0} size={130} f={f} /></g><Label x={220} y={1110} text="IN: CHEAP" size={52} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, sell, 5)}><g transform={`translate(780 1000) scale(${pop(f, sell)})`}><Prop id="price-tag" x={0} y={0} size={170} f={f} /></g><Label x={780} y={1120} text="OUT: MORE" size={52} font="Bebas Neue" color={P.gold} /></g>
        <g opacity={on(f, savings, 5)}><Stack x={220} y={1210} s={0.4 * pop(f, savings)} /></g>
        <g opacity={on(f, stock, 5)}><Label x={220} y={1265} text="YOUR SAVINGS" size={40} font="Bebas Neue" color="#C9D3E8" /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <line x1={180} y1={1150} x2={760} y2={1150} stroke="#C9D3E8" strokeWidth={5} />
        <Bar x={300} base={1150} h={60} color={RED} label="PAYS SAVERS" dark />
        <Bar x={600} base={1150} h={460 * on(f, gap, 16)} color={MINT} label="EARNS" dark />
        <Gap x={700} y1={1150 - 460} y2={1150 - 60} o={on(f, gap + 10, 6)} text="GAP" color={P.gold} />
        <g opacity={on(f, profit, 5)} transform={`translate(860 560) scale(${pop(f, profit)})`}><Prop id="money-bag" x={0} y={0} size={130} f={f} /></g>
        <g opacity={on(f, engine, 5)} transform={`translate(250 560) scale(${pop(f, engine)})`}><Prop id="lightning" x={0} y={0} size={120} f={f} /></g>
      </g>}
      <Vignette id="sv-model" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s10–s12: 3.32% margin, $90.1B in a quarter, ≈$1B a day
const Profit: React.FC<PieceProps> = ({ f, c }) => {
  const middle = c('s10:middle'), d2026 = c('s10:2026'), banks10 = c('s10:banks'), margin = c('s10:margin'), d332 = c('s10:332')
  const months = c('s11:months'), april = c('s11:april'), june = c('s11:june'), banks11 = c('s11:banks'), d901 = c('s11:901'), profit11 = c('s11:profit')
  const one = c('s11a:one'), every = c('s11a:every'), day = c('s11a:day')
  const deposits = c('s12:deposits'), nothing = c('s12:nothing'), cheapest = c('s12:cheapest'), money = c('s12:money')
  const A = win(f, c('s10'), months), B = win(f, months, one), C = win(f, one, deposits), D = on(f, deposits, 6)
  return (
    <g>
      <TallStage id="sv-profit" f={f} />
      <Headline f={f} lines={[[d2026, 'MID-2026', P.ink, 110], [d332, 'MARGIN: 3.32%', P.mintInk, 104], [april, 'APRIL – JUNE', P.ink, 104], [d901, '$90.1 BILLION PROFIT', P.mintInk, 92], [one, '≈ $1 BILLION A DAY', P.mintInk, 96], [cheapest, 'CHEAP MONEY', P.goldInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, middle, 5)} transform={`translate(260 640) scale(${pop(f, middle)})`}><Prop id="calendar" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, d2026, 5)}><Label x={260} y={790} text="2026" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, c('s10:across'), 5)}><line x1={150} y1={1000} x2={870} y2={1000} stroke={P.ink2} strokeWidth={5} /></g>
        <g opacity={on(f, banks10, 5)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, banks10 + k * 3, 4)} transform={`translate(${260 + k * 240} 1120)`}><Prop id="bank" x={0} y={0} size={170} f={f} /></g>)}</g>
        <g opacity={on(f, margin, 5)}>
          <circle cx={680} cy={720} r={150} fill="none" stroke={P.edge} strokeWidth={50} />
          <circle cx={680} cy={720} r={150} fill="none" stroke={MINT} strokeWidth={50} strokeDasharray={`${2 * Math.PI * 150 * 0.0332 * 4 * on(f, d332, 16)} 9999`} transform="rotate(-90 680 720)" />
          <Label x={680} y={748} text="3.32%" size={84} font="Bebas Neue" color={P.ink} o={on(f, d332, 5)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        {['APR', 'MAY', 'JUN'].map((m, k) => <g key={m} opacity={on(f, (k === 0 ? april : k === 1 ? april + 6 : june), 5)} transform={`translate(${250 + k * 250} 620)`}>
          <rect x={-90} y={-80} width={180} height={160} rx={14} fill="#F7F2E8" stroke={P.edge} strokeWidth={4} /><rect x={-90} y={-80} width={180} height={44} rx={14} fill={RED} />
          <Label x={0} y={40} text={m} size={60} font="Bebas Neue" color={P.ink} />
        </g>)}
        <g opacity={on(f, banks11, 5)} transform={`translate(${CX} 980) scale(${pop(f, d901)})`}><Prop id="money-bag" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, profit11, 5)}><Label x={CX} y={1210} text="$90.1B" size={80} font="Bebas Neue" color={P.mintInk} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g transform={`translate(300 760) scale(${pop(f, one)})`}><Prop id="clock" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, every, 5)}><Stack x={720} y={820} s={0.9 * pop(f, every)} text="$1 BILLION" /></g>
        <g opacity={on(f, day, 5)}><Label x={300} y={960} text="EVERY DAY" size={64} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Stack x={CX} y={760} s={1.1 * pop(f, deposits)} />
        <g opacity={on(f, nothing, 5)}><g transform={`translate(780 640) scale(${pop(f, nothing)})`}><Prop id="price-tag" x={0} y={0} size={160} f={f} /></g><Label x={780} y={760} text="0.38%" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, money, 5)} transform={`translate(${CX} 1080) scale(${pop(f, money)})`}><Prop id="bank" x={0} y={0} size={200} f={f} /></g>
      </g>}
      <Vignette id="sv-profit" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s13–s16: checking 0.07, money market 0.63, CD 1.76
const Rates: React.FC<PieceProps> = ({ f, c }) => {
  const s13 = c('s13'), savings = c('s13:savings')
  const checking = c('s14:checking'), d007 = c('s14:007')
  const market = c('s15:market'), d063 = c('s15:063')
  const cd = c('s16:cd'), only = c('s16:only'), d176 = c('s16:176')
  const H = 160 // # px per percent
  return (
    <g>
      <TallStage id="sv-rates" f={f} tint="navy" />
      <Headline f={f} lines={[[s13, 'NOT JUST SAVINGS', '#FFFFFF', 104], [d007, 'CHECKING: 0.07%', '#FF9A85', 96], [d063, 'MONEY MARKET: 0.63%', '#FFFFFF', 88], [d176, '1-YEAR CD: 1.76%', P.gold, 96]]} />
      <g opacity={on(f, s13, 5)}>
        <line x1={110} y1={1150} x2={900} y2={1150} stroke="#C9D3E8" strokeWidth={5} />
        <line x1={110} y1={1150 - 4 * H} x2={900} y2={1150 - 4 * H} stroke="#C9D3E8" strokeWidth={2} strokeDasharray="12 10" opacity={0.5} />
        <Label x={150} y={1150 - 4 * H - 16} text="4%" size={40} font="Bebas Neue" color="#C9D3E8" />
        <Bar x={210} base={1150} h={0.38 * H * on(f, savings, 14)} w={140} color={RED} label="SAVINGS" value="0.38%" dark />
        <Bar x={410} base={1150} h={0.07 * H * on(f, d007, 14)} w={140} color={RED} label="CHECKING" value="0.07%" o={on(f, checking, 5)} vo={on(f, d007, 5)} dark />
        <Bar x={610} base={1150} h={0.63 * H * on(f, d063, 14)} w={140} color={GOLD} label="MONEY MKT" value="0.63%" o={on(f, market, 5)} vo={on(f, d063, 5)} dark />
        <Bar x={810} base={1150} h={1.76 * H * on(f, d176, 14)} w={140} color={GOLD} label="1-YEAR CD" value="1.76%" o={on(f, cd, 5)} vo={on(f, d176, 5)} dark />
        <g opacity={on(f, only, 5)}><Prop id="magnifier" x={410} y={880} size={140} f={f} /></g>
      </g>
      <Vignette id="sv-rates" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s17–s20a: T-bills 3.99% → $399 vs $38
const Tbill: React.FC<PieceProps> = ({ f, c }) => {
  const s17 = c('s17'), compare = c('s17:compare'), lending = c('s17:lending'), government = c('s17:government')
  const treasury = c('s17a:treasury'), loan = c('s17a:loan'), weeks = c('s17a:weeks'), year = c('s17a:year')
  const bill = c('s18:bill'), paying = c('s18:paying'), d399 = c('s18:399')
  const rate19 = c('s19:rate'), d10k = c('s19:10000'), earn = c('s19:earn'), d399b = c('s19:399'), d38 = c('s19:38')
  const same = c('s20:same'), year20 = c('s20:year'), ten = c('s20:ten'), interest = c('s20:interest')
  const gap = c('s20a:gap'), matters = c('s20a:matters')
  const A = win(f, s17, bill), B = win(f, bill, rate19), C = on(f, rate19, 6)
  return (
    <g>
      <TallStage id="sv-tbill" f={f} />
      <Headline f={f} lines={[[government, 'LEND TO THE GOVERNMENT', P.ink, 84], [treasury, 'A TREASURY BILL', P.ink, 100], [d399, '3-MONTH BILL: 3.99%', P.mintInk, 92], [d399b, '$399 vs $38', P.mintInk, 110], [ten, '10× THE INTEREST', P.mintInk, 104], [matters, 'YOUR RATE MATTERS', P.goldInk, 100]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, compare, 5)} transform={`translate(${CX} 640) scale(${pop(f, compare)})`}><Prop id="scale-balance" x={0} y={0} size={180} f={f} /></g>
        <g opacity={on(f, government, 5)}><Temple x={720} y={980} s={1.0 * pop(f, government)} text="US GOVERNMENT" color="#DCE6F5" /></g>
        <Person f={f} who="investor" beats={[[0, 'think', 'thinking'], [lending, 'offer', 'smiling'], [loan, 'explain', 'smiling']]} x={230} y={1250} s={0.6} o={on(f, lending, 5)} />
        <g opacity={on(f, loan, 5)}><Stack x={lerp(300, 600, on(f, loan, 18))} y={lerp(1060, 1010, on(f, loan, 18))} s={0.4} /></g>
        <g opacity={on(f, weeks, 5)} transform={`translate(260 640) scale(${pop(f, weeks)})`}><Prop id="calendar" x={0} y={0} size={150} f={f} /></g>
        <g opacity={on(f, year, 5)}><Label x={260} y={760} text="WEEKS → 1 YEAR" size={44} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${CX} 800) rotate(-4) scale(${pop(f, bill)})`}>
          <rect x={-260} y={-130} width={520} height={260} rx={18} fill="#E9F2E4" stroke={P.edge} strokeWidth={5} />
          <rect x={-240} y={-110} width={480} height={220} rx={12} fill="none" stroke="#7DBE7A" strokeWidth={4} />
          <text x={0} y={-40} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>TREASURY BILL</text>
          <text x={0} y={60} textAnchor="middle" fill="#2E7D32" style={{ font: '400 96px "Bebas Neue"' }} opacity={on(f, d399, 5)}>3.99%</text>
        </g>
        <g opacity={on(f, paying, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, paying + k * 3, [CX, 900], [300 + k * 130, 1180], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
      </g>}
      {C > 0 && <g opacity={C}>
        <line x1={200} y1={1150} x2={800} y2={1150} stroke={P.ink2} strokeWidth={5} />
        <Bar x={340} base={1150} h={56 * on(f, d38, 10)} color={RED} label="SAVINGS" value="$38" o={on(f, d10k, 5)} vo={on(f, d38, 5)} />
        <Bar x={660} base={1150} h={580 * on(f, earn, 18)} color={MINT} label="T-BILL" value="$399" o={on(f, d10k, 5)} vo={on(f, d399b, 5)} />
        <g opacity={on(f, same, 5) * (1 - on(f, gap, 5))}><Stack x={340} y={760} s={0.45} /></g>
        <g opacity={on(f, year20, 5) * (1 - on(f, gap, 5))} transform="translate(200 620)"><Prop id="calendar" x={0} y={0} size={110} f={f} /></g>
        <g opacity={on(f, interest, 5)}><Tick x={860} y={540} o={1} /></g>
        <Gap x={770} y1={1150 - 580} y2={1150 - 56} o={on(f, gap, 6)} text="GAP" color={P.coralInk} />
      </g>}
      <Vignette id="sv-tbill" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 6) s21–s26: just an average, check your rate, FDIC, $38 loop
const End: React.FC<PieceProps> = ({ f, c }) => {
  const s21 = c('s21'), d038 = c('s21:038'), average = c('s21:average')
  const less = c('s22:less'), more = c('s22:more')
  const checking = c('s23:checking'), rate = c('s23:rate'), line = c('s23:line'), statement = c('s23:statement'), app = c('s23:app')
  const move = c('s24:move'), fdic = c('s24:fdic'), insured = c('s24:insured'), d250 = c('s24:250000'), person = c('s24:person'), type = c('s24:type'), bank24 = c('s24:bank#2')
  const s25 = c('s25'), rules = c('s25:rules')
  const borrowing = c('s26:borrowing'), d10k = c('s26:10000'), year = c('s26:year'), paying = c('s26:paying'), d38 = c('s26:38')
  const A = win(f, s21, checking), B = win(f, checking, move), C = win(f, move, s25), D = on(f, s25, 6)
  const AV = 900 // # y of the average line
  const dots: [number, number, number][] = [[180, 0.1, 0], [300, 0.05, 0], [420, 0.25, 0], [560, 1.6, 1], [690, 2.9, 1], [820, 3.6, 1]]
  return (
    <g>
      <TallStage id="sv-end" f={f} />
      <Headline f={f} lines={[[average, 'JUST THE AVERAGE', P.ink, 104], [checking, 'CHECK YOUR RATE', P.goldInk, 104], [fdic, 'FDIC INSURED?', P.ink, 104], [d250, 'AT LEAST $250,000', P.mintInk, 96], [rules, 'NO RULES BROKEN', P.ink, 104], [d38, '$10,000 → $38', P.coralInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <line x1={120} y1={AV} x2={900} y2={AV} stroke={P.ink2} strokeWidth={5} strokeDasharray="18 12" opacity={on(f, d038, 5)} />
        <g opacity={on(f, d038, 5)}><Label x={830} y={AV + 50} text="AVG 0.38%" size={44} font="Bebas Neue" color={P.ink} /></g>
        {dots.map(([x, r, up], k) => { const at = up ? more : less; const y = AV - (r - 0.38) * 110; return <g key={k} opacity={on(f, at + k * 2, 5)} transform={`translate(${x} ${y})`}><Prop id="bank" x={0} y={0} size={110} f={f} /></g> })}
        <g opacity={on(f, s21, 5) * (1 - on(f, less, 5))} transform={`translate(${CX} 700)`}><Prop id="piggy-bank" x={0} y={0} size={200} f={f} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Phone x={CX} y={820} s={1.4 * pop(f, checking)}>
          <rect x={-120} y={-200} width={240} height={50} rx={8} fill={BLUE} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-110} y={-120 + k * 70} width={220} height={44} rx={8} fill={k === 1 && f >= line ? '#FFE9A8' : '#E6EAF2'} />)}
          <text x={0} y={-40} textAnchor="middle" fill={P.ink} style={{ font: '400 34px "Bebas Neue"' }} opacity={on(f, rate, 5)}>RATE 0.38%</text>
        </Phone>
        <g opacity={on(f, statement, 5)}><Doc x={220} y={1060} s={0.42 * pop(f, statement)} title="STATEMENT" /></g>
        <g opacity={on(f, app, 5)}><Tick x={790} y={1080} o={1} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g transform={`translate(220 700) scale(${pop(f, move)})`}><Prop id="bank" x={0} y={0} size={180} f={f} /></g>
        <g opacity={on(f, move, 5) * (1 - on(f, fdic, 6))}><Stack x={lerp(220, 600, on(f, move + 6, 18))} y={900} s={0.4} /></g>
        <g opacity={on(f, fdic, 5)} transform={`translate(700 720) scale(${pop(f, fdic)})`}><Prop id="shield" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, insured, 5)}><Label x={700} y={880} text="FDIC" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, c('s24:covers'), 5)}><circle cx={700} cy={720} r={150 + 10 * Math.sin((f - c('s24:covers')) / 6)} fill="none" stroke={MINT} strokeWidth={8} opacity={0.7} /></g>
        <g opacity={on(f, d250, 5)}><Label x={700} y={960} text="$250,000+" size={60} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, person, 5)}><Mini look="buyer" x={300} y={1240} scale={0.55} frame={f} seed={31} mood="happy" /></g>
        <g opacity={on(f, type, 5)}>{['SAVINGS', 'JOINT'].map((t, k) => <g key={t} opacity={on(f, k ? c('s24:account') : type, 5)} transform={`translate(${520 + k * 200} 1120)`}><rect x={-80} y={-36} width={160} height={72} rx={12} fill="#F7F2E8" stroke={P.edge} strokeWidth={3} /><Label x={0} y={16} text={t} size={40} font="Bebas Neue" color={P.ink} /></g>)}</g>
        <g opacity={on(f, bank24, 5)}><Label x={620} y={1230} text="AT EACH BANK" size={44} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(${CX} 680) scale(${pop(f, s25)})`}><Prop id="bank" x={0} y={0} size={260} f={f} /></g>
        <g opacity={on(f, rules, 5)}><Tick x={720} y={580} o={1} /></g>
        <g opacity={on(f, borrowing, 5)}><Stack x={lerp(220, 420, on(f, d10k, 18))} y={lerp(1080, 900, on(f, d10k, 18))} s={0.6} text={f >= d10k ? '$10,000' : undefined} o={1 - on(f, paying, 6) * 0.4} /></g>
        <g opacity={on(f, year, 5)} transform="translate(790 1000)"><Prop id="calendar" x={0} y={0} size={140} f={f} /></g>
        <g opacity={on(f, paying, 5)}>{(() => { const p = fly(f, paying, [CX, 760], [700, 1180], 18, 80); return p.o > 0 ? <Coin x={p.x} y={p.y} s={0.5} o={p.o} /> : null })()}</g>
        <g opacity={on(f, d38, 5)}><Label x={700} y={1250} text="+$38" size={64} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      <Vignette id="sv-end" w={1080} h={1920} />
    </g>
  )
}

export const SAVINGS = [
  makePiece('sv-hook', 'Short: savings pay 0.38% — $10,000 earns $38 — the Fed pays banks ≈3.9% — $390, ten times more — why?', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1", "s1:savings", "s1:038", "s2:put", "s2:10000", "s2:whole", "s2:earn", "s2:38", "s3:bank", "s3:take", "s3:park", "s3:federal", "s3:earn", "s3:39", "s4:390", "s4:ten", "s4:pays", "s5", "s5:why", "s5:nothing", "s4:that's", "s1:america"],
    sfx: [['s1:038', 'thud', 0.3], ['s2:38', 'coin', 0.3], ['s3:39', 'ding', 0.3], ['s4:ten', 'riser', 0.3]] }),
  makePiece('sv-model', 'Short: your deposit is a loan — the bank pays a little and lends/invests for more — buy cheap, sell for more — net interest margin', { canvas: 'tall', mood: 'dark', Component: Model,
    beats: ["s6", "s6:bank", "s6:makes", "s7:deposit", "s7:loan", "s7:lend", "s8:pays", "s8:small", "s8:lends", "s8:invests", "s8:higher", "s8a:shop", "s8a:cheap", "s8a:sell", "s8a:savings", "s8a:stock", "s9:gap", "s9:profit", "s9:engine", "s9:margin"],
    sfx: [['s7:loan', 'pop', 0.3], ['s8:higher', 'coin', 0.3], ['s8a:sell', 'ding', 0.3], ['s9:margin', 'chime', 0.3]] }),
  makePiece('sv-profit', 'Short: mid-2026 margin 3.32% — $90.1B profit April–June — ≈$1B a day — cheap deposits', { canvas: 'tall', mood: 'light', Component: Profit,
    beats: ["s10:middle", "s10:2026", "s10:banks", "s10:margin", "s10:332", "s11:months", "s11:april", "s11:june", "s11:banks", "s11:901", "s11:profit", "s11a:one", "s11a:every", "s11a:day", "s12:deposits", "s12:nothing", "s12:cheapest", "s12:money", "s10", "s10:across"],
    sfx: [['s10:332', 'tick', 0.3], ['s11:901', 'riser', 0.35], ['s11a:day', 'coin', 0.3]] }),
  makePiece('sv-rates', 'Short: FDIC averages — checking 0.07%, money market 0.63%, 1-year CD 1.76% — all tiny on a 4% scale', { canvas: 'tall', mood: 'dark', Component: Rates,
    beats: ["s13", "s13:savings", "s14:checking", "s14:007", "s15:market", "s15:063", "s16:cd", "s16:only", "s16:176"],
    sfx: [['s14:007', 'tick', 0.3], ['s15:063', 'tick', 0.3], ['s16:176', 'tick', 0.3]] }),
  makePiece('sv-tbill', 'Short: lend to the government — a Treasury bill, weeks to a year — 3.99% — $399 vs $38 — ten times — the gap', { canvas: 'tall', mood: 'light', Component: Tbill,
    beats: ["s17", "s17:compare", "s17:lending", "s17:government", "s17a:treasury", "s17a:loan", "s17a:weeks", "s17a:year", "s18:bill", "s18:paying", "s18:399", "s19:rate", "s19:10000", "s19:earn", "s19:399", "s19:38", "s20:same", "s20:year", "s20:ten", "s20:interest", "s20a:gap", "s20a:matters"],
    sfx: [['s18:399', 'ding', 0.3], ['s19:399', 'riser', 0.3], ['s20:ten', 'chime', 0.35]] }),
  makePiece('sv-end', 'Short: 0.38% is an average — some pay less, some more — check your rate — FDIC insured, at least $250,000 — no rules broken — $10,000 for $38', { canvas: 'tall', mood: 'light', Component: End,
    beats: ["s21", "s21:038", "s21:average", "s22:less", "s22:more", "s23:checking", "s23:rate", "s23:line", "s23:statement", "s23:app", "s24:move", "s24:fdic", "s24:insured", "s24:250000", "s24:person", "s24:type", "s24:bank#2", "s25", "s25:rules", "s26:borrowing", "s26:10000", "s26:year", "s26:paying", "s26:38", "s24:covers", "s24:account"],
    sfx: [['s22:more', 'pop', 0.3], ['s23:line', 'tick', 0.3], ['s24:fdic', 'ding', 0.3], ['s26:38', 'coin', 0.35]] }),
]
