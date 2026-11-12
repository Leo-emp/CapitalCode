// ============================================================
// SHORT — "How Visa Makes $23 Billion a Year From Your Card"
// (s1–s28, ≈ 2:12), six tall pieces. Sourced: Visa fiscal 2026
// earnings release — net revenue $45,903M, GAAP net income $23,504M
// (≈51%), $1.7B litigation provision; fiscal 2025 release — net
// revenue $40.0B, 257.5B processed transactions; fiscal 2025 10-K —
// $17T payments and cash volume, nearly 5B credentials, 175M+
// merchant locations; not a financial institution, issues no cards,
// extends no credit, bears no credit risk; interchange is paid by
// acquirers to issuers and is not Visa's revenue.
// Our maths: 40.0B / 17T ≈ 23.5¢ per $100; 40.0B / 257.5B ≈ 15.5¢.
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
import { Coin, Doc, fly, Person, Terminal, Tick } from '../aimoney/common'
import { Prop, TallStage } from './tall'

const CX = 500
const RED = '#D8432F', BLUE = '#2F5FD0', YEL = '#F2B632', MINT = '#3DAA6E'
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
// # a payment card (generic): chip, stripes, a word on it
const Card: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string; color?: string }> = ({ x, y, s = 1, o = 1, r = 0, text, color = BLUE }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill="#000" opacity={0.15} transform="translate(8 10)" />
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill={color} stroke={P.edge} strokeWidth={4} />
    <rect x={-120} y={-50} width={56} height={42} rx={8} fill={YEL} /><path d="M-120 -29 L-64 -29 M-92 -50 L-92 -8" stroke="#C99A20" strokeWidth={3} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-120 + k * 62} y={30} width={50} height={12} rx={6} fill="#FFFFFF" opacity={0.7} />)}
    {text && <text x={120} y={-44} textAnchor="end" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>}
  </g>
)
// # a flat road from x1 to x2 at y, with a dashed centre line
const Road: React.FC<{ x1: number; x2: number; y: number; o?: number; grow?: number }> = ({ x1, x2, y, o = 1, grow = 1 }) => {
  const xe = lerp(x1, x2, grow)
  return (
    <g opacity={o}>
      <rect x={x1} y={y - 40} width={xe - x1} height={80} rx={14} fill="#4A5266" />
      <line x1={x1 + 20} y1={y} x2={xe - 20} y2={y} stroke="#FFE27A" strokeWidth={6} strokeDasharray="26 22" />
    </g>
  )
}
// # a toll booth with a barrier arm (up 0→1)
const Toll: React.FC<{ x: number; y: number; s?: number; o?: number; up?: number }> = ({ x, y, s = 1, o = 1, up = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-50} y={-130} width={100} height={120} rx={10} fill="#F7F2E8" stroke={P.edge} strokeWidth={4} />
    <rect x={-60} y={-150} width={120} height={28} rx={8} fill={BLUE} />
    <rect x={-32} y={-100} width={64} height={40} rx={6} fill="#9FD4F0" />
    <g transform={`translate(50 -40) rotate(${-70 * up})`}><rect x={0} y={-8} width={170} height={16} rx={8} fill={RED} />{[40, 100].map((bx) => <rect key={bx} x={bx} y={-8} width={24} height={16} fill="#FFFFFF" />)}</g>
  </g>
)
// # a coin split into a ring: share (0→1) in colour, the rest in `rest`
const Ring: React.FC<{ x: number; y: number; r?: number; share: number; grow: number; color: string; rest?: string; o?: number }> = ({ x, y, r = 200, share, grow, color, rest = P.edge, o = 1 }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill="none" stroke={rest} strokeWidth={70} />
    <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={70} strokeDasharray={`${2 * Math.PI * r * share * grow} 9999`} transform={`rotate(-90 ${x} ${y})`} />
  </g>
)
// # a plain bar with a label under it and a value on top
const Bar: React.FC<{ x: number; base: number; h: number; w?: number; color: string; label: string; value?: string; o?: number; vo?: number; dark?: boolean }> = ({ x, base, h, w = 200, color, label, value, o = 1, vo = 1, dark }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={base - h} width={w} height={h} rx={12} fill={color} />
    <Label x={x} y={base + 52} text={label} size={44} font="Bebas Neue" color={dark ? '#C9D3E8' : P.ink} />
    {value && <Label x={x} y={base - h - 22} text={value} size={58} font="Bebas Neue" color={dark ? '#FFFFFF' : P.ink} o={vo} />}
  </g>
)
// # a big red cross over something (o 0→1)
const Cross: React.FC<{ x: number; y: number; r?: number; o: number }> = ({ x, y, r = 70, o }) => (
  <path d={`M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`} stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={o} />
)

// ------------------------------------------------------------ 1) s1–s3a: $23.5B profit, no loans
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), visa = c('s1:visa'), d235 = c('s1:235'), profit = c('s1:profit')
  const lend = c('s2:lend'), anyone = c('s2:anyone'), dollar = c('s2:dollar')
  const s3 = c('s3'), card3 = c('s3:card'), rich = c('s3:rich'), lending = c('s3:lending')
  const answer = c('s3a:answer'), hiding = c('s3a:hiding'), tap = c('s3a:tap')
  const A = win(f, s1, s3), B = on(f, s3, 6)
  return (
    <g>
      <TallStage id="vs-hook" f={f} />
      <Headline f={f} lines={[[d235, '$23.5 BILLION PROFIT', P.mintInk, 96], [lend, 'ZERO LOANS', P.coralInk, 110], [rich, 'HOW?', P.ink, 120], [tap, 'EVERY TAP', P.goldInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, visa, 5)}><Card x={CX} y={620} s={1.3 * pop(f, visa)} text="CARD" /></g>
        <g opacity={on(f, d235, 5)} transform={`translate(${CX} 980) scale(${pop(f, d235)})`}><Prop id="treasure-chest" x={0} y={0} size={340} f={f} /></g>
        <g opacity={on(f, profit, 5)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, profit + k * 3, [CX, 700], [220 + k * 140, 1180], 16, 110); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.55} o={p.o} /> : null })}</g>
        <g opacity={on(f, lend, 5) * (1 - on(f, anyone, 4)) + on(f, anyone, 4)}>
          <g opacity={on(f, lend, 5)} transform={`translate(800 600) scale(${pop(f, lend)})`}><Prop id="bills-stack" x={0} y={0} size={170} f={f} /></g>
          <Cross x={800} y={600} r={90} o={on(f, dollar, 5)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, answer, 6)}>
          <Card x={CX} y={700} s={1.4 * pop(f, card3)} o={on(f, card3, 5)} text="CARD" />
          <g opacity={on(f, rich, 5)} transform={`translate(${CX} 1060) scale(${pop(f, rich)})`}><Prop id="money-bag" x={0} y={0} size={220} f={f} /></g>
          <g opacity={on(f, lending, 5)} transform="translate(820 1040)"><Prop id="question" x={0} y={0} size={150} f={f} /></g>
        </g>
        <g opacity={on(f, answer, 5)}>
          <Terminal x={620} y={1060} s={1.8 * pop(f, answer)} lit={on(f, tap, 6)} />
          <Card x={lerp(260, 560, on(f, hiding, 18))} y={lerp(640, 720, on(f, hiding, 18))} s={0.9} r={lerp(-12, 8, on(f, hiding, 18))} text="CARD" />
          <g opacity={on(f, tap, 5)}>{[0, 1, 2].map((k) => <circle key={k} cx={620} cy={790} r={60 + k * 40 + 30 * span(f, tap, tap + 20)} fill="none" stroke={P.mint} strokeWidth={6} opacity={1 - span(f, tap + k * 3, tap + 24)} />)}</g>
        </g>
      </g>}
      <Vignette id="vs-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s4–s7: your bank gave you the card, lends, charges interest
const Bank: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), surprising = c('s4:surprising'), give = c('s4:give'), card4 = c('s4:card')
  const bank5 = c('s5:bank')
  const lends = c('s6:lends'), money6 = c('s6:money'), sets = c('s6:sets'), rate = c('s6:rate'), collects = c('s6:collects'), interest2 = c('s6:interest#2')
  const s7 = c('s7'), that7 = c('s7:that'), annual = c('s7:annual'), report = c('s7:report')
  const A = win(f, s4, s7), B = on(f, s7, 6)
  return (
    <g>
      <TallStage id="vs-bank" f={f} tint="navy" />
      <Headline f={f} lines={[[surprising, 'THE SURPRISE', '#FFFFFF', 104], [bank5, 'YOUR BANK GAVE IT', P.gold, 96], [lends, 'THE BANK LENDS', '#FFFFFF', 96], [rate, 'SETS THE RATE', '#FFFFFF', 96], [interest2, 'KEEPS THE INTEREST', P.gold, 96], [s7, 'NOT VISA', '#FF9A85', 110]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, bank5, 5)} transform={`translate(260 760) scale(${pop(f, bank5)})`}><Prop id="bank" x={0} y={0} size={300} f={f} /></g>
        <Person f={f} who="buyer" beats={[[0, 'think', 'thinking'], [give, 'shrug', 'thinking'], [bank5, 'holdUp', 'smiling'], [lends, 'receive', 'smiling']]} x={760} y={1250} s={0.62} o={on(f, s4, 5)} />
        <Card x={bank5 > 0 && f >= bank5 ? lerp(260, 720, on(f, bank5 + 4, 16)) : CX} y={f >= bank5 ? lerp(760, 800, on(f, bank5 + 4, 16)) : 640} s={0.75 * pop(f, card4)} o={on(f, card4, 5)} text="CARD" />
        <g opacity={on(f, money6, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, money6 + k * 3, [260, 760], [700, 950], 16, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
        <g opacity={on(f, sets, 5)} transform={`translate(${CX} 560) scale(${pop(f, sets)})`}><Prop id="interest-percent" x={0} y={0} size={150} f={f} /></g>
        <g opacity={on(f, collects, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, collects + k * 3, [760, 1000], [260, 820], 16, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} text="%" /> : null })}</g>
      </g>}
      {B > 0 && <g opacity={B}>
        {[['bills-stack', 'LEND'], ['interest-percent', 'RATES'], ['coin-stack', 'INTEREST']].map(([id, t], k) => <g key={k} transform={`translate(${200 + k * 300} 700)`} opacity={on(f, s7 + k * 3, 5)}>
          <Prop id={id} x={0} y={0} size={150} f={f} /><Label x={0} y={130} text={t} size={48} font="Bebas Neue" color="#FFFFFF" />
          <Cross x={0} y={0} r={80} o={on(f, that7 + k * 3, 5)} />
        </g>)}
        <g opacity={on(f, annual, 5)}><Doc x={CX} y={1080} s={0.62 * pop(f, annual)} title="ANNUAL REPORT" stamp="NOT A BANK" stampO={on(f, report, 6)} /></g>
      </g>}
      <Vignette id="vs-bank" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s8–s12: the road, yes/no, 5B cards, 175M places, the toll
const Road8: React.FC<PieceProps> = ({ f, c }) => {
  const s8 = c('s8'), runs = c('s8:runs'), road = c('s8:road'), travels = c('s8:travels')
  const tap = c('s9:tap'), message = c('s9:message'), shops = c('s9:shop\'s'), across = c('s9:across'), network = c('s9:network'), bank2 = c('s9:bank#2'), back = c('s9:back'), yes = c('s9:yes'), no = c('s9:no')
  const connects = c('s10:connects'), d5 = c('s10:5'), cards = c('s10:cards'), d175 = c('s10:175'), places = c('s10:places')
  const charges = c('s11:charges'), banks = c('s11:banks'), toll = c('s11:toll')
  const tiny = c('s12:tiny')
  const A = win(f, s8, connects), B = win(f, connects, charges), C = on(f, charges, 6)
  // # the message dot: shop bank (x 170) → Visa (500) → your bank (830), then back
  const go = span(f, shops, bank2 + 4), ret = span(f, back - 2, back + 14)
  const mx = ret > 0 ? lerp(830, 170, ret) : lerp(170, 830, go)
  return (
    <g>
      <TallStage id="vs-road" f={f} />
      <Headline f={f} lines={[[road, 'VISA = THE ROAD', P.ink, 104], [network, 'VISA\'S NETWORK', P.ink, 96], [yes, 'YES OR NO', P.mintInk, 104], [d5, '≈ 5 BILLION CARDS', P.ink, 96], [d175, '175 MILLION+ PLACES', P.ink, 92], [toll, 'A TINY TOLL', P.goldInk, 104], [tiny, 'HOW TINY?', P.coralInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <Road x1={80} x2={920} y={900} grow={on(f, runs, 22)} o={on(f, s8, 5)} />
        <g opacity={on(f, travels, 5) * (1 - on(f, tap, 5))}><Card x={lerp(160, 820, span(f, travels, travels + 30))} y={900} s={0.35} text="" /></g>
        <g opacity={on(f, tap, 5)}>
          <g transform={`translate(170 700) scale(${pop(f, shops)})`} opacity={on(f, shops, 5)}><Prop id="shop-mini" x={0} y={0} size={170} f={f} /><Label x={0} y={120} text="SHOP'S BANK" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, across, 5)}><rect x={CX - 90} y={640} width={180} height={110} rx={18} fill={BLUE} /><Label x={CX} y={712} text="VISA" size={60} font="Bebas Neue" color="#FFFFFF" /></g>
          <g transform={`translate(830 700) scale(${pop(f, bank2)})`} opacity={on(f, bank2, 5)}><Prop id="bank" x={0} y={0} size={170} f={f} /><Label x={0} y={120} text="YOUR BANK" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, message, 5) * (1 - on(f, no + 8, 5))}><rect x={mx - 34} y={876} width={68} height={48} rx={8} fill="#FFFFFF" stroke={P.edge} strokeWidth={3} /><path d={`M${mx - 34} 876 L${mx} 902 L${mx + 34} 876`} fill="none" stroke={P.edge} strokeWidth={3} /></g>
          <Tick x={410} y={1100} o={on(f, yes, 5)} />
          <g opacity={on(f, no, 5)}><circle cx={590} cy={1100} r={40} fill={P.coral} /><path d="M570 1080 L610 1120 M610 1080 L570 1120" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" /></g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Road x1={80} x2={920} y={860} />
        <g opacity={on(f, d5, 5)}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, cards + k * 2, 4)}><Card x={170 + k * 130} y={620 + (k % 2) * 40} s={0.38} r={-8 + (k % 3) * 8} /></g>)}</g>
        <g opacity={on(f, d175, 5)}>{Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, places + k * 2, 4)} transform={`translate(${200 + k * 200} 1100)`}><Prop id="shop-mini" x={0} y={0} size={150} f={f} /></g>)}</g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Road x1={80} x2={920} y={1000} />
        <Toll x={CX} y={1000} s={1.6 * pop(f, charges)} up={on(f, toll + 10, 8)} />
        <g opacity={on(f, banks, 5)}><g transform="translate(200 640)"><Prop id="bank" x={0} y={0} size={170} f={f} /></g><g transform="translate(800 640)"><Prop id="bank" x={0} y={0} size={170} f={f} /></g></g>
        <g opacity={on(f, toll, 5)}><Coin x={CX} y={lerp(560, 720, on(f, toll, 14))} s={0.5 * pop(f, toll)} /></g>
        <g opacity={on(f, tiny, 5)} transform={`translate(700 760) scale(${pop(f, tiny)})`}><Prop id="magnifier" x={0} y={0} size={170} f={f} /></g>
      </g>}
      <Vignette id="vs-road" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s13–s17a: $17T, 257B, $40B, <25¢ per $100, ≈15¢ a tap
const Toll13: React.FC<PieceProps> = ({ f, c }) => {
  const s13 = c('s13'), d17 = c('s13:17'), payments = c('s13:payments'), cash = c('s13:cash'), d257 = c('s13:257'), transactions = c('s13:transactions')
  const revenue = c('s14:revenue'), d40 = c('s14:40')
  const less = c('s15:less'), d25 = c('s15:25'), d100 = c('s15:100'), moved = c('s15:moved')
  const d15 = c('s16:15'), transaction = c('s16:transaction')
  const tolls = c('s17:tolls'), billions = c('s17:billions'), billions2 = c('s17:billions#2')
  const multiply = c('s17a:multiply'), d15b = c('s17a:15'), d257b = c('s17a:257'), get = c('s17a:get'), d40b = c('s17a:40')
  const A = win(f, s13, revenue), B = win(f, revenue, less), C = win(f, less, d15), D = win(f, d15, multiply), E = on(f, multiply, 6)
  return (
    <g>
      <TallStage id="vs-toll" f={f} tint="navy" />
      <Headline f={f} lines={[[d17, '$17 TRILLION MOVED', '#FFFFFF', 96], [d257, '257 BILLION PAYMENTS', P.gold, 88], [d40, 'VISA\'S REVENUE: $40B', P.gold, 88], [d25, 'UNDER 25¢ PER $100', '#FFFFFF', 92], [d15, '≈ 15¢ PER TAP', P.gold, 104], [billions, 'BILLIONS OF THEM', '#FFFFFF', 100], [d40b, '15¢ × 257B ≈ $40B', P.gold, 96]]} />
      {A > 0 && <g opacity={A}>
        <Road x1={80} x2={920} y={900} o={on(f, s13, 5)} />
        <g opacity={on(f, d17, 5)}>{Array.from({ length: 7 }, (_, k) => { const t = ((f - d17) / 40 + k / 7) % 1; return <g key={k} transform={`translate(${lerp(100, 900, t)} 900)`}><Prop id="banknote" x={0} y={0} size={110} f={f} /></g> })}</g>
        <g opacity={on(f, payments, 5)} transform="translate(250 640)"><Card x={0} y={0} s={0.6 * pop(f, payments)} text="" /></g>
        <g opacity={on(f, cash, 5)} transform={`translate(750 640) scale(${pop(f, cash)})`}><Prop id="atm" x={0} y={0} size={190} f={f} /></g>
        <g opacity={on(f, c('s13:network'), 5)}><rect x={CX - 90} y={840} width={180} height={120} rx={18} fill={BLUE} /><Label x={CX} y={918} text="VISA" size={60} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, d257, 5)}>{Array.from({ length: 10 }, (_, k) => <circle key={k} cx={140 + k * 80} cy={1100} r={14} fill={P.gold} opacity={on(f, d257 + k * 1.5, 3)} />)}</g>
        <g opacity={on(f, transactions, 5)}><Label x={CX} y={1190} text="257 BILLION PAYMENTS" size={56} font="Bebas Neue" color="#FFFFFF" /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${CX} 830) scale(${pop(f, revenue)})`}><Prop id="money-bag" x={0} y={0} size={340} f={f} /></g>
        <g opacity={on(f, d40, 5)}><Label x={CX} y={1130} text="$40 BILLION" size={96} font="Bebas Neue" color={P.gold} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g transform={`translate(330 800) scale(${1.4 * pop(f, less)})`}><Prop id="banknote" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, d100, 5)}><Label x={330} y={980} text="$100" size={80} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, d25, 5)}><Coin x={760} y={800} s={0.9 * pop(f, d25)} text="¢" /><Label x={760} y={980} text="< 25¢" size={80} font="Bebas Neue" color={P.gold} /></g>
        <g opacity={on(f, moved, 5)}><path d="M450 800 L650 800" stroke="#FFFFFF" strokeWidth={8} markerEnd="" /><path d="M630 780 L655 800 L630 820" fill="none" stroke="#FFFFFF" strokeWidth={8} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Terminal x={330} y={980} s={1.7 * pop(f, d15)} lit={1} />
        <Card x={330} y={660} s={0.7} r={-10} text="" />
        <g opacity={on(f, transaction, 5)}><Coin x={720} y={760} s={0.9 * pop(f, transaction)} text="15¢" /></g>
        <g opacity={on(f, tolls, 5)}>{Array.from({ length: 18 }, (_, k) => <g key={k} opacity={on(f, (k < 9 ? billions : billions2) + (k % 9), 3)}><Coin x={620 + (k % 6) * 55} y={960 + Math.floor(k / 6) * 60} s={0.32} /></g>)}</g>
      </g>}
      {E > 0 && <g opacity={E}>
        <g opacity={on(f, d15b, 5)}><Coin x={220} y={800} s={0.9 * pop(f, d15b)} text="15¢" /></g>
        <g opacity={on(f, d15b, 5)}><Label x={370} y={830} text="×" size={110} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, d257b, 5)}><Label x={600} y={830} text="257B" size={120} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, get, 5)}><Label x={CX} y={1000} text="=" size={110} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, d40b, 5)} transform={`translate(${CX} 1150) scale(${pop(f, d40b)})`}><Prop id="money-bag" x={-150} y={0} size={170} f={f} /><Label x={80} y={30} text="$40B" size={110} font="Bebas Neue" color={P.gold} /></g>
        <g opacity={on(f, multiply, 5) * (1 - on(f, d15b, 5))}><Prop id="calculator" x={CX} y={800} size={200} f={f} /></g>
      </g>}
      <Vignette id="vs-toll" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s18–s23: the risk is the bank's; interchange goes to your bank
const Risk: React.FC<PieceProps> = ({ f, c }) => {
  const s18 = c('s18'), clever = c('s18:clever'), risk = c('s18:risk'), isnt = c('s18:isn\'t')
  const never = c('s19:never'), bill = c('s19:bill'), bank19 = c('s19:bank'), loses = c('s19:loses'), visa19 = c('s19:visa')
  const fee = c('s20:fee'), shop = c('s20:shop'), pays = c('s20:pays'), part = c('s20:part'), interchange = c('s20:interchange'), goes = c('s20:goes'), bank20 = c('s20:bank'), visa20 = c('s20:visa')
  const sets = c('s21:sets'), rate = c('s21:rate'), none = c('s21:none'), revenue = c('s21:revenue')
  const s22 = c('s22'), lend = c('s22:lend'), debts = c('s22:debts'), keep = c('s22:keep')
  const runs = c('s23:runs'), road = c('s23:road'), collects = c('s23:collects'), trip = c('s23:trip')
  const A = win(f, s18, fee), B = win(f, fee, s22), C = win(f, s22, runs), D = on(f, runs, 6)
  return (
    <g>
      <TallStage id="vs-risk" f={f} />
      <Headline f={f} lines={[[clever, 'THE CLEVER PART', P.ink, 104], [loses, 'THE BANK LOSES', P.coralInk, 104], [interchange, '"INTERCHANGE"', P.ink, 104], [bank20, '→ YOUR BANK', P.mintInk, 104], [none, 'NOT VISA\'S MONEY', P.coralInk, 100], [s22, 'NO LOANS · NO BAD DEBT', P.ink, 84], [road, 'JUST THE ROAD', P.goldInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, c('s18:card'), 5) * (1 - on(f, never, 5))}><Card x={300} y={880} s={0.6 * pop(f, c('s18:card'))} text="CARD" /></g>
        <g opacity={on(f, risk, 5)} transform={`translate(${CX} 640) scale(${pop(f, risk)})`}><Prop id="warning" x={0} y={0} size={180} f={f} /></g>
        <g opacity={on(f, isnt, 5) * (1 - on(f, never, 5))}><rect x={620} y={800} width={200} height={110} rx={18} fill={BLUE} /><Label x={720} y={872} text="VISA" size={60} font="Bebas Neue" color="#FFFFFF" /><g transform="translate(720 1000)"><Prop id="shield" x={0} y={0} size={110} f={f} /></g></g>
        <g opacity={on(f, never, 5)}><Doc x={300} y={900} s={0.6 * pop(f, never)} title="CARD BILL" stamp="UNPAID" stampO={on(f, bill, 6)} /></g>
        <g opacity={on(f, bank19, 5)} transform={`translate(740 880) scale(${pop(f, bank19)})`}><Prop id="bank" x={0} y={0} size={240} f={f} /></g>
        <g opacity={on(f, loses, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, loses + k * 3, [740, 900], [740 + (k - 1.5) * 60, 1260], 14, -40); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
        <g opacity={on(f, visa19, 5)}><rect x={CX - 90} y={1140} width={180} height={90} rx={16} fill={BLUE} /><Label x={CX} y={1200} text="VISA" size={52} font="Bebas Neue" color="#FFFFFF" /><Tick x={CX + 130} y={1185} o={on(f, visa19 + 4, 5)} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, s22 - 1, 1)}>
          <g opacity={on(f, shop, 5)} transform={`translate(200 760) scale(${pop(f, shop)})`}><Prop id="shop-mini" x={0} y={0} size={200} f={f} /></g>
          <g opacity={on(f, fee, 5)}><Coin x={200} y={980} s={0.7 * pop(f, fee)} text="FEE" /></g>
          <g opacity={on(f, pays, 5)}>{Array.from({ length: 3 }, (_, k) => { const p = fly(f, part + k * 4, [200, 980], [800, 880], 18, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
          <g opacity={on(f, goes, 5)} transform={`translate(800 760) scale(${pop(f, goes)})`}><Prop id="bank" x={0} y={0} size={200} f={f} /></g>
          <g opacity={on(f, bank20, 5)}><Label x={800} y={960} text="YOUR BANK" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, visa20, 5)}><rect x={CX - 90} y={1080} width={180} height={90} rx={16} fill={BLUE} /><Label x={CX} y={1140} text="VISA" size={52} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, sets, 5)} transform={`translate(${CX} 620) scale(${pop(f, sets)})`}><rect x={-110} y={-50} width={220} height={100} rx={16} fill="#FFE9A8" stroke={P.edge} strokeWidth={4} /><text x={0} y={18} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"' }}>{f >= rate ? 'DEFAULT RATE' : 'RATE'}</text></g>
          <g opacity={on(f, revenue, 5)}><Cross x={CX + 150} y={1125} r={36} o={1} /></g>
        </g>
      </g>}
      {C > 0 && <g opacity={C}>
        {[['bills-stack', lend], ['warning', debts], ['coin-stack', keep]].map(([id, at], k) => <g key={k} transform={`translate(${200 + k * 300} 820)`} opacity={on(f, s22 + k * 3, 5)}>
          <Prop id={id as string} x={0} y={0} size={160} f={f} /><Cross x={0} y={0} r={80} o={on(f, at as number, 5)} />
        </g>)}
      </g>}
      {D > 0 && <g opacity={D}>
        <Road x1={80} x2={920} y={1000} />
        <Toll x={CX} y={1000} s={1.5} up={on(f, trip, 8)} />
        <g opacity={on(f, collects, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, collects + k * 4, [CX, 900], [CX + (k - 1.5) * 50, 640], 14, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.4} o={p.o} /> : null })}</g>
        <g opacity={on(f, trip, 5)}><Card x={lerp(150, 380, on(f, trip, 18))} y={1000} s={0.35} text="" /></g>
      </g>}
      <Vignette id="vs-risk" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 6) s24–s28: cheap to run, $45.9B in, $23.5B kept, the road under your tap
const End: React.FC<PieceProps> = ({ f, c }) => {
  const s24 = c('s24'), built = c('s24:built'), more = c('s24:more'), little = c('s24:little')
  const brought = c('s25:brought'), d459 = c('s25:459'), kept = c('s25:kept'), d235 = c('s25:235'), profit = c('s25:profit')
  const half = c('s26:half'), dollar = c('s26:dollar'), aside = c('s26:aside'), d17 = c('s26:17'), lawsuits = c('s26:lawsuits')
  const tap = c('s27:tap'), picture = c('s27:picture'), road = c('s27:road')
  const lends = c('s28:lends'), shop = c('s28:shop'), fee = c('s28:fee'), collects = c('s28:collects'), toll = c('s28:toll')
  const A = win(f, s24, brought), B = win(f, brought, half), C = win(f, half, tap), D = win(f, tap, lends), E = on(f, lends, 6)
  return (
    <g>
      <TallStage id="vs-end" f={f} />
      <Headline f={f} lines={[[built, 'BUILT ONCE', P.ink, 110], [little, 'CHEAP TO RUN', P.mintInk, 104], [d459, '$45.9B IN', P.ink, 104], [d235, '$23.5B KEPT', P.mintInk, 104], [half, 'ABOUT HALF', P.mintInk, 110], [d17, 'AFTER $1.7B FOR LAWSUITS', P.ink, 80], [road, 'THE ROAD UNDER IT', P.goldInk, 100]]} />
      {A > 0 && <g opacity={A}>
        <Road x1={80} x2={920} y={900} grow={on(f, s24, 20)} />
        <g opacity={on(f, built, 5)} transform={`translate(780 700) scale(${pop(f, built)})`}><Prop id="crane" x={0} y={0} size={200} f={f} /></g>
        <g opacity={on(f, more, 5)}><Card x={lerp(120, 860, span(f, more, more + 36))} y={900} s={0.35} text="" /></g>
        <g opacity={on(f, little, 5)}><Coin x={300} y={1100} s={0.45 * pop(f, little)} text="¢" /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <line x1={200} y1={1180} x2={800} y2={1180} stroke={P.ink2} strokeWidth={5} />
        <Bar x={340} base={1180} h={640 * on(f, d459, 16)} color={BLUE} label="REVENUE" value="$45.9B" vo={on(f, d459, 5)} />
        <Bar x={660} base={1180} h={328 * on(f, d235, 16)} color={MINT} label="PROFIT" value="$23.5B" o={on(f, kept, 5)} vo={on(f, d235, 5)} />
        <g opacity={on(f, profit, 5)}><Coin x={660} y={1180 - 328 - 120} s={0.5 * pop(f, profit)} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Ring x={CX} y={780} r={200} share={0.512} grow={on(f, half, 18)} color={MINT} />
        <g opacity={on(f, dollar, 5)}><Label x={CX} y={810} text="$1" size={120} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, aside, 5)} transform={`translate(330 1140) scale(${pop(f, aside)})`}><Prop id="gavel" x={0} y={0} size={160} f={f} /></g>
        <g opacity={on(f, lawsuits, 5)}><Label x={640} y={1160} text="$1.7B SET ASIDE" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Terminal x={620} y={820} s={1.6 * pop(f, tap)} lit={1} />
        <Card x={lerp(260, 540, on(f, tap, 14))} y={600} s={0.8} r={-10} text="CARD" />
        <g opacity={on(f, picture, 5)}><Road x1={80} x2={920} y={1100} grow={on(f, picture, 18)} /></g>
        <g opacity={on(f, road, 5)}><Toll x={CX} y={1100} s={1.1 * pop(f, road)} /></g>
      </g>}
      {E > 0 && <g opacity={E}>
        <Road x1={80} x2={920} y={1130} />
        <g opacity={on(f, lends, 5)} transform={`translate(200 760) scale(${pop(f, lends)})`}><Prop id="bank" x={0} y={0} size={190} f={f} /><Label x={0} y={140} text="LENDS" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, shop, 5)} transform={`translate(${CX} 760) scale(${pop(f, shop)})`}><Prop id="shop-mini" x={0} y={0} size={190} f={f} /><Label x={0} y={140} text={f >= fee ? 'PAYS THE FEE' : 'SHOP'} size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, collects, 5)}><Toll x={800} y={1130} s={1.2 * pop(f, collects)} up={on(f, toll, 8)} /><Label x={800} y={900} text="VISA: THE TOLL" size={50} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, toll, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, toll + k * 3, [CX, 1000], [800, 960], 14, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.4} o={p.o} /> : null })}</g>
        <Mini look="buyer" x={lerp(120, 300, on(f, lends, 30))} y={1250} scale={0.55} frame={f} seed={88} mood="happy" />
      </g>}
      <Vignette id="vs-end" w={1080} h={1920} />
    </g>
  )
}

export const VISA = [
  makePiece('vs-hook', 'Short: Visa made $23.5B profit without lending a dollar — how? — the answer is in every tap', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1", "s1:visa", "s1:235", "s1:profit", "s2:lend", "s2:anyone", "s2:dollar", "s3", "s3:card", "s3:rich", "s3:lending", "s3a:answer", "s3a:hiding", "s3a:tap"],
    sfx: [['s1:235', 'riser', 0.3], ['s2:dollar', 'thud', 0.3], ['s3a:tap', 'ding', 0.35]] }),
  makePiece('vs-bank', 'Short: your bank gave you the card, lends, sets the rate, keeps the interest — not Visa (annual report)', { canvas: 'tall', mood: 'dark', Component: Bank,
    beats: ["s4", "s4:surprising", "s4:give", "s4:card", "s5:bank", "s6:lends", "s6:money", "s6:sets", "s6:rate", "s6:collects", "s7", "s7:that", "s7:annual", "s7:report"],
    sfx: [['s5:bank', 'pop', 0.3], ['s6:collects', 'coin', 0.3], ['s7:report', 'thud', 0.35]] }),
  makePiece('vs-road', 'Short: Visa runs the road — message shop bank → Visa → your bank → yes/no — 5B cards, 175M places — a tiny toll', { canvas: 'tall', mood: 'light', Component: Road8,
    beats: ["s8", "s8:runs", "s8:road", "s8:travels", "s9:tap", "s9:message", "s9:across", "s9:network", "s9:bank#2", "s9:back", "s9:yes", "s9:no", "s10:connects", "s10:5", "s10:cards", "s10:175", "s10:places", "s11:charges", "s11:banks", "s11:toll", "s12:tiny"],
    sfx: [['s9:message', 'swish', 0.3], ['s9:yes', 'ding', 0.3], ['s10:5', 'tick', 0.3], ['s11:toll', 'coin', 0.35]] }),
  makePiece('vs-toll', 'Short: $17T moved in 257B transactions — $40B revenue — under 25¢ per $100 — ≈15¢ per tap — 15¢ × 257B ≈ $40B', { canvas: 'tall', mood: 'dark', Component: Toll13,
    beats: ["s13", "s13:17", "s13:payments", "s13:cash", "s13:257", "s13:transactions", "s14:revenue", "s14:40", "s15:less", "s15:25", "s15:100", "s15:moved", "s16:15", "s16:transaction", "s17:tolls", "s17:billions", "s17:billions#2", "s17a:multiply", "s17a:15", "s17a:257", "s17a:get", "s17a:40", "s13:network"],
    sfx: [['s13:17', 'riser', 0.3], ['s14:40', 'thud', 0.3], ['s16:15', 'coin', 0.35], ['s17a:40', 'chime', 0.35]] }),
  makePiece('vs-risk', 'Short: unpaid card bill — the bank loses, not Visa — interchange goes to your bank — Visa just runs the road', { canvas: 'tall', mood: 'light', Component: Risk,
    beats: ["s18", "s18:clever", "s18:risk", "s19:never", "s19:bill", "s19:bank", "s19:loses", "s19:visa", "s20:fee", "s20:shop", "s20:pays", "s20:part", "s20:interchange", "s20:goes", "s20:bank", "s20:visa", "s21:sets", "s21:rate", "s21:none", "s21:revenue", "s22", "s22:lend", "s22:debts", "s22:keep", "s23:runs", "s23:road", "s23:collects", "s23:trip", "s18:card"],
    sfx: [['s19:bill', 'thud', 0.3], ['s20:bank', 'coin', 0.3], ['s22:keep', 'pop', 0.3], ['s23:trip', 'coin', 0.35]] }),
  makePiece('vs-end', 'Short: built once, cheap to run — $45.9B in, $23.5B kept — about half, after $1.7B for lawsuits — bank lends, shop pays, Visa collects the toll', { canvas: 'tall', mood: 'light', Component: End,
    beats: ["s24", "s24:built", "s24:more", "s24:little", "s25:brought", "s25:459", "s25:kept", "s25:235", "s25:profit", "s26:half", "s26:dollar", "s26:aside", "s26:lawsuits", "s27:tap", "s27:picture", "s27:road", "s28:lends", "s28:shop", "s28:fee", "s28:collects", "s28:toll"],
    sfx: [['s25:235', 'riser', 0.3], ['s26:half', 'ding', 0.3], ['s28:toll', 'coin', 0.4]] }),
]
