// ============================================================
// SHORT — "The Lottery Keeps 33 Cents of Every Dollar"
// (s1–s25, ≈ 2:09), six tall pieces. Sourced: US Census Bureau
// ASFIN (FY2024) — ticket sales $104.7B, prizes $70.2B, net revenue
// $34.5B; FY2008 sales $52.8B, net $20.6B; prizes +118%; Virginia
// paid 80% (highest); 45 lottery states. Powerball prize chart —
// $2 play, jackpot 1 in 292,201,338, any prize 1 in 24.87, $4 tiers
// at 1 in 38.32 and 1 in 91.98.
// Our maths: 67¢ prizes / 33¢ kept; 39¢ kept in 2008; ≈92% of
// winning plays win $4; 5.6M years weekly; 56,000 years at 100/week.
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
import { Coin, fly, Person, Tick } from '../aimoney/common'
import { Prop, TallStage } from './tall'

const CX = 500
const RED = '#D8432F', MINT = '#3DAA6E', GOLD = '#E9B53A', PURPLE = '#7B4FC9'
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
// # a lottery ticket: number row of balls, a price/word on the right
const Ticket: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string; win?: boolean }> = ({ x, y, s = 1, o = 1, r = 0, text, win: w }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-80} width={340} height={160} rx={16} fill={w ? '#FFE9A8' : '#F7F2E8'} stroke={P.edge} strokeWidth={4} />
    <rect x={-170} y={-80} width={340} height={40} rx={16} fill={PURPLE} />
    <text x={0} y={-50} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"', letterSpacing: 4 }}>LOTTERY</text>
    {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={-130 + k * 50} cy={10} r={20} fill="#FFFFFF" stroke={P.edge} strokeWidth={3} />)}
    <circle cx={130} cy={10} r={20} fill={RED} />
    {text && <text x={0} y={66} textAnchor="middle" fill={P.ink} style={{ font: '400 36px "Bebas Neue"' }}>{text}</text>}
  </g>
)
// # a lottery ball
const Ball: React.FC<{ x: number; y: number; r?: number; color?: string; o?: number; n?: string }> = ({ x, y, r = 40, color = '#FFFFFF', o = 1, n }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill={color} stroke={P.edge} strokeWidth={3} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.22} fill="#FFFFFF" opacity={0.6} />
    {n && <text x={x} y={y + r * 0.35} textAnchor="middle" fill={color === '#FFFFFF' ? P.ink : '#FFFFFF'} style={{ font: `400 ${r}px "Bebas Neue"` }}>{n}</text>}
  </g>
)
// # a dollar bill
const Dollar: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-75} width={320} height={150} rx={12} fill="#9FD39B" stroke="#3F7A3D" strokeWidth={4} />
    <rect x={-140} y={-55} width={280} height={110} rx={8} fill="none" stroke="#3F7A3D" strokeWidth={3} />
    <circle cx={0} cy={0} r={40} fill="#7DBE7A" stroke="#3F7A3D" strokeWidth={3} />
    <text x={0} y={16} textAnchor="middle" fill="#2F5F2D" style={{ font: '400 48px "Bebas Neue"' }}>$1</text>
  </g>
)
// # a columned state house
const State: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = 'STATE' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={-150} rx={60} ry={50} fill="#E8E1D0" stroke={P.edge} strokeWidth={4} />
    <path d="M-150 -90 L0 -130 L150 -90 Z" fill="#E8E1D0" stroke={P.edge} strokeWidth={4} />
    {[-120, -60, 0, 60, 120].map((cx) => <rect key={cx} x={cx - 14} y={-88} width={28} height={140} fill="#F7F2E8" stroke={P.edge} strokeWidth={3} />)}
    <rect x={-165} y={52} width={330} height={26} rx={4} fill="#E8E1D0" stroke={P.edge} strokeWidth={4} />
    <text x={0} y={-98} textAnchor="middle" fill={P.ink} style={{ font: '400 28px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)
// # a coin split into a ring: share (0→1) in colour, the rest in `rest`
const Ring: React.FC<{ x: number; y: number; r?: number; share: number; grow: number; color: string; rest?: string; o?: number }> = ({ x, y, r = 200, share, grow, color, rest = P.edge, o = 1 }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill="none" stroke={rest} strokeWidth={66} />
    <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={66} strokeDasharray={`${2 * Math.PI * r * share * grow} 9999`} transform={`rotate(-90 ${x} ${y})`} />
  </g>
)
// # a vertical bar on a baseline with value on top and a label under it
const Bar: React.FC<{ x: number; base: number; h: number; w?: number; color: string; label: string; value?: string; o?: number; vo?: number; dark?: boolean }> = ({ x, base, h, w = 190, color, label, value, o = 1, vo = 1, dark }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={base - Math.max(h, 4)} width={w} height={Math.max(h, 4)} rx={10} fill={color} />
    <Label x={x} y={base + 50} text={label} size={44} font="Bebas Neue" color={dark ? '#C9D3E8' : P.ink} />
    {value && <Label x={x} y={base - Math.max(h, 4) - 20} text={value} size={58} font="Bebas Neue" color={dark ? '#FFFFFF' : P.ink} o={vo} />}
  </g>
)

// ------------------------------------------------------------ 1) s1–s4: $104.7B, 33¢ kept, where does it go?
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), americans = c('s1:americans'), d1047 = c('s1:1047'), tickets = c('s1:tickets')
  const dollar2 = c('s2:dollar'), states = c('s2:states'), kept = c('s2:kept'), d33 = c('s2:33'), prizes = c('s2:prizes')
  const s3 = c('s3'), go = c('s3:go'), chances = c('s3:chances')
  const s4 = c('s4'), one = c('s4:one'), dollar4 = c('s4:dollar')
  const A = win(f, s1, dollar2), B = win(f, dollar2, s3), C = win(f, s3, s4), D = on(f, s4, 6)
  return (
    <g>
      <TallStage id="lt-hook" f={f} />
      <Headline f={f} lines={[[d1047, '$104.7 BILLION', P.ink, 110], [d33, 'STATES KEEP 33¢', P.coralInk, 104], [go, 'WHERE DOES IT GO?', P.ink, 96], [chances, 'YOUR REAL CHANCES?', P.ink, 92], [one, 'FOLLOW $1', P.mintInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, americans, 5)}>{[0, 1, 2, 3, 4].map((k) => <Mini key={k} look={['buyer', 'investor', 'hero', 'worker', 'investorF'][k]} x={160 + k * 170} y={1250} scale={0.55} frame={f} seed={k + 11} mood="happy" />)}</g>
        <g opacity={on(f, s1, 5)}>{Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, s1 + k * 3, 4)}><Ticket x={300 + (k % 3) * 200} y={640 + Math.floor(k / 3) * 110 - (k % 2) * 20} s={0.55} r={-10 + k * 4} /></g>)}</g>
        <g opacity={on(f, d1047, 5)} transform={`translate(${CX} 1000) scale(${pop(f, d1047)})`}><Prop id="money-bag" x={0} y={0} size={180} f={f} /></g>
        <g opacity={on(f, tickets, 5)}><Label x={CX} y={1130} text="ON TICKETS" size={52} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Ring x={CX} y={760} r={190} share={0.33} grow={on(f, d33, 18)} color={RED} rest={MINT} />
        <Dollar x={CX} y={760} s={0.6 * pop(f, dollar2)} />
        <g opacity={on(f, states, 5)}><State x={820} y={1120} s={0.7 * pop(f, states)} /></g>
        <g opacity={on(f, kept, 5)}>{Array.from({ length: 3 }, (_, k) => { const p = fly(f, kept + k * 4, [CX, 900], [820, 1060], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.42} o={p.o} /> : null })}</g>
        <g opacity={on(f, prizes, 5)}><Label x={250} y={1150} text="AFTER PRIZES" size={52} font="Bebas Neue" color={P.mintInk} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Ticket x={CX} y={700} s={1.3 * pop(f, s3)} />
        <g opacity={on(f, go, 5)} transform="translate(780 520)"><Prop id="question" x={0} y={0} size={140} f={f} /></g>
        <g opacity={on(f, chances, 5)} transform={`translate(${CX} 1030) scale(${pop(f, chances)})`}><Prop id="dice" x={0} y={0} size={180} f={f} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Dollar x={lerp(260, CX, on(f, one, 18))} y={800} s={1.3 * pop(f, s4)} r={lerp(-8, 0, on(f, one, 18))} />
        <g opacity={on(f, dollar4, 5)}><path d="M440 1000 L560 1000 M540 980 L565 1000 L540 1020" stroke={P.ink} strokeWidth={8} fill="none" /></g>
      </g>}
      <Vignette id="lt-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s5–s7: 67¢ to winners (mostly $4), 33¢ to the state
const Split: React.FC<PieceProps> = ({ f, c }) => {
  const d67 = c('s5:67'), prizes5 = c('s5:prizes')
  const not = c('s6:not'), you = c('s6:you'), winners = c('s6:winners'), most = c('s6:most'), small = c('s6:small')
  const powerball = c('s6a:powerball'), d9 = c('s6a:9'), d10 = c('s6a:10'), d4 = c('s6a:4')
  const other = c('s7:other'), d33 = c('s7:33'), state = c('s7:state')
  const A = win(f, c('s5'), powerball), B = win(f, powerball, other), C = on(f, other, 6)
  return (
    <g>
      <TallStage id="lt-split" f={f} tint="navy" />
      <Headline f={f} lines={[[d67, '67¢ → PRIZES', P.gold, 110], [not, 'NOT TO YOU', '#FF9A85', 110], [winners, 'TO THE WINNERS', '#FFFFFF', 100], [d9, '9 IN 10 WIN JUST $4', P.gold, 92], [d33, '33¢ → THE STATE', '#FF9A85', 104]]} />
      {A > 0 && <g opacity={A}>
        <Dollar x={CX} y={620} s={0.9} />
        <g opacity={on(f, d67, 5)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, d67 + k * 3, [CX, 680], [260 + k * 120, 900], 16, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
        <g opacity={on(f, prizes5, 5) * (1 - on(f, winners, 5))}><g transform="translate(500 900)"><Prop id="trophy" x={0} y={0} size={150} f={f} /></g></g>
        <Person f={f} who="buyer" beats={[[0, 'think', 'thinking'], [not, 'shrug', 'thinking'], [winners, 'think', 'thinking']]} x={190} y={1250} s={0.6} o={on(f, not, 5) * (1 - on(f, winners, 5))} />
        <g opacity={on(f, you, 5) * (1 - on(f, winners, 5))}><path d="M300 900 L420 900" stroke="#FF9A85" strokeWidth={10} /><path d="M330 870 L390 930 M390 870 L330 930" stroke="#FF9A85" strokeWidth={10} /></g>
        <g opacity={on(f, winners, 5)}>{[0, 1, 2].map((k) => <Mini key={k} look={['hero', 'investorF', 'owner'][k]} x={330 + k * 170} y={1250} scale={0.6} frame={f} seed={k + 21} mood="happy" />)}</g>
        <g opacity={on(f, most, 5)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${330 + k * 170} 1010)`}><Coin x={0} y={0} s={k === 2 ? 0.6 : 0.4} text={k === 2 ? '$$$' : '$4'} /></g>)}</g>
        <g opacity={on(f, small, 5)}><Label x={420} y={1100} text="SMALL PRIZES" size={48} font="Bebas Neue" color="#FFFFFF" /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${CX} 560) scale(${pop(f, powerball)})`}><Ball x={0} y={0} r={70} color={RED} n="PB" /></g>
        {Array.from({ length: 10 }, (_, k) => { const x = 180 + (k % 5) * 160, y = 800 + Math.floor(k / 5) * 220; const four = k < 9; return <g key={k} opacity={on(f, d9 + k * 1.2, 4)}>
          <Ticket x={x} y={y} s={0.4} win />
          <g opacity={on(f, d4, 5)}><Label x={x} y={y + 90} text={four ? '$4' : 'MORE'} size={52} font="Bebas Neue" color={four ? P.gold : '#FFFFFF'} /></g>
        </g> })}
        <g opacity={on(f, d10, 5)}><rect x={100} y={720} width={800} height={420} rx={20} fill="none" stroke="#C9D3E8" strokeWidth={3} strokeDasharray="14 10" /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Dollar x={300} y={660} s={0.8 * pop(f, other)} />
        <g opacity={on(f, d33, 5)}><Coin x={300} y={880} s={1.2 * pop(f, d33)} text="33¢" /></g>
        <g opacity={on(f, state, 5)}><State x={700} y={980} s={1.0 * pop(f, state)} /></g>
        <g opacity={on(f, d33, 5)}>{Array.from({ length: 3 }, (_, k) => { const p = fly(f, d33 + 8 + k * 4, [300, 860], [700, 940], 16, 90); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.4} o={p.o} /> : null })}</g>
      </g>}
      <Vignette id="lt-split" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s8–s10: 45 states, $34.5B, run costs + spending, Virginia 80%
const States: React.FC<PieceProps> = ({ f, c }) => {
  const s8 = c('s8'), d45 = c('s8:45'), lottery8 = c('s8:lottery'), added = c('s8:added'), d345 = c('s8:345'), year = c('s8:year')
  const pays = c('s9:pays'), run = c('s9:run'), spends = c('s9:spends'), rest = c('s9:rest'), decides = c('s9:decides')
  const split = c('s10:split'), everywhere = c('s10:everywhere'), virginia = c('s10:virginia'), d80 = c('s10:80'), sales = c('s10:sales'), most = c('s10:most')
  const A = win(f, s8, pays), B = win(f, pays, split), C = on(f, split, 6)
  return (
    <g>
      <TallStage id="lt-states" f={f} />
      <Headline f={f} lines={[[d45, '45 STATES', P.ink, 120], [d345, '$34.5 BILLION KEPT', P.coralInk, 96], [run, 'RUN THE LOTTERY', P.ink, 96], [spends, 'SPEND THE REST', P.ink, 100], [virginia, 'VIRGINIA', P.ink, 120], [d80, 'PAID 80% IN PRIZES', P.mintInk, 96]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, d45, 5)}>{Array.from({ length: 15 }, (_, k) => <g key={k} opacity={on(f, d45 + k * 0.8, 3)} transform={`translate(${170 + (k % 5) * 165} ${560 + Math.floor(k / 5) * 120})`}><Prop id="map-pin" x={0} y={0} size={80} f={f} /></g>)}</g>
        <g opacity={on(f, lottery8, 5)}><Label x={CX} y={930} text="+ 30 MORE STATES" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, added, 5)}>{Array.from({ length: 6 }, (_, k) => { const p = fly(f, added + k * 3, [170 + k * 130, 700], [CX, 1080], 16, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.4} o={p.o} /> : null })}</g>
        <g opacity={on(f, d345, 5)} transform={`translate(${CX} 1100) scale(${pop(f, d345)})`}><Prop id="money-bag" x={0} y={0} size={200} f={f} /></g>
        <g opacity={on(f, year, 5)} transform="translate(780 1100)"><Prop id="calendar" x={0} y={0} size={120} f={f} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <State x={CX} y={720} s={1.1 * pop(f, pays)} />
        <g opacity={on(f, run, 5)}><g transform={`translate(240 1060) scale(${pop(f, run)})`}><Prop id="briefcase" x={0} y={0} size={150} f={f} /></g><Label x={240} y={1180} text="RUNNING COSTS" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, rest, 5)}><g transform={`translate(760 1060) scale(${pop(f, rest)})`}><Prop id="bills-stack" x={0} y={0} size={150} f={f} /></g><Label x={760} y={1180} text="STATE SPENDING" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, spends, 5)}>{Array.from({ length: 2 }, (_, k) => { const p = fly(f, spends + k * 5, [CX, 800], [760, 1040], 16, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.4} o={p.o} /> : null })}</g>
        <g opacity={on(f, decides, 5)} transform="translate(760 560)"><Prop id="gavel" x={0} y={0} size={120} f={f} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <line x1={200} y1={1150} x2={800} y2={1150} stroke={P.ink2} strokeWidth={5} opacity={on(f, everywhere, 5)} />
        <Bar x={340} base={1150} h={540 * 0.67 * on(f, everywhere, 16)} color={GOLD} label="ALL STATES" value="67%" o={on(f, everywhere, 5)} />
        <Bar x={660} base={1150} h={540 * 0.8 * on(f, d80, 16)} color={MINT} label="VIRGINIA" value="80%" o={on(f, virginia, 5)} vo={on(f, d80, 5)} />
        <g opacity={on(f, sales, 5)}><Label x={CX} y={1250} text="SHARE OF SALES PAID AS PRIZES" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, most, 5)} transform={`translate(800 600) scale(${pop(f, most)})`}><Prop id="crown" x={0} y={0} size={120} f={f} /></g>
      </g>}
      <Vignette id="lt-states" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s11–s14a: $2 ticket, 1 in 292M, 5.6M years, 56,000 years
const Odds: React.FC<PieceProps> = ({ f, c }) => {
  const s11 = c('s11'), chances = c('s11:chances')
  const powerball = c('s12:powerball'), costs = c('s12:costs'), d2 = c('s12:2')
  const hitting = c('s13:hitting'), jackpot = c('s13:jackpot'), d292 = c('s13:292'), million = c('s13:million')
  const bought = c('s14:bought'), week = c('s14:week'), d56 = c('s14:56'), expect = c('s14:expect')
  const d100 = c('s14a:100'), still = c('s14a:still'), d56k = c('s14a:56000')
  const A = win(f, s11, hitting), B = win(f, hitting, bought), C = on(f, bought, 6)
  return (
    <g>
      <TallStage id="lt-odds" f={f} tint="navy" />
      <Headline f={f} lines={[[chances, 'YOUR CHANCES', '#FFFFFF', 110], [d2, 'ONE TICKET: $2', P.gold, 104], [d292, '1 IN 292 MILLION', '#FF9A85', 104], [d56, '≈ 5.6 MILLION YEARS', P.gold, 96], [d56k, '100 A WEEK: 56,000 YEARS', '#FFFFFF', 80]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s11, 5)}>{[0, 1, 2, 3, 4].map((k) => <Ball key={k} x={220 + k * 140} y={600 + (k % 2) * 30} r={46} n={String([7, 19, 23, 41, 56][k])} o={on(f, s11 + k * 2, 4)} />)}</g>
        <g opacity={on(f, powerball, 5)}><Ticket x={CX} y={900} s={1.3 * pop(f, powerball)} text={f >= d2 ? '$2' : undefined} /></g>
        <g opacity={on(f, costs, 5)}><Coin x={800} y={1100} s={0.6 * pop(f, costs)} text="$2" /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        {Array.from({ length: 180 }, (_, k) => { const x = 130 + (k % 15) * 53, y = 540 + Math.floor(k / 15) * 53; const hit = k === 97; return <circle key={k} cx={x} cy={y} r={hit ? 20 : 16} fill={hit ? P.gold : '#3A4A66'} opacity={on(f, hitting + (k % 15) * 0.4, 3) * (hit ? on(f, jackpot, 5) : 1)} /> })}
        <g opacity={on(f, million, 5)}><Label x={CX} y={1250} text="EACH DOT = 1.6 MILLION TICKETS" size={44} font="Bebas Neue" color="#C9D3E8" /></g>
        <g opacity={on(f, d292, 5)}><circle cx={130 + 7 * 53} cy={540 + 6 * 53} r={34} fill="none" stroke={P.gold} strokeWidth={5} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, d100, 6)}>
          <Ticket x={300} y={700} s={0.7 * pop(f, bought)} />
          <g opacity={on(f, week, 5)} transform={`translate(720 700) scale(${pop(f, week)})`}><Prop id="calendar" x={0} y={0} size={180} f={f} /></g>
          <g opacity={on(f, d56, 5)} transform={`translate(${CX} 1040) scale(${pop(f, d56)})`}><Prop id="hourglass" x={0} y={0} size={220} f={f} /></g>
          <g opacity={on(f, expect, 5)}><Label x={CX} y={1240} text="FOR ONE JACKPOT" size={52} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        <g opacity={on(f, d100, 5)}>
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, d100 + k, 3)}><Ticket x={220 + (k % 4) * 190} y={620 + Math.floor(k / 4) * 120} s={0.42} r={-6 + (k % 3) * 6} /></g>)}
          <g opacity={on(f, still, 5)} transform={`translate(${CX} 1080) scale(${pop(f, still)})`}><Prop id="hourglass" x={0} y={0} size={180} f={f} /></g>
          <g opacity={on(f, d56k, 5)}><Label x={CX} y={1250} text="STILL ≈ 56,000 YEARS" size={56} font="Bebas Neue" color={P.gold} /></g>
        </g>
      </g>}
      <Vignette id="lt-odds" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s15–s18: 1 in 25 wins anything; most likely $4; 67¢ back; lose a third
const Prize: React.FC<PieceProps> = ({ f, c }) => {
  const winning = c('s15:winning'), any = c('s15:any'), d25 = c('s15:25')
  const prize = c('s16:prize'), likely = c('s16:likely'), d4 = c('s16:4'), twice = c('s16:twice'), ticket = c('s16:ticket')
  const together = c('s17:together'), lotteries = c('s17:lotteries'), dollar = c('s17:dollar'), d67 = c('s17:67'), prizes = c('s17:prizes')
  const players = c('s18:players'), lose = c('s18:lose'), third = c('s18:third'), spend = c('s18:spend')
  const A = win(f, c('s15'), prize), B = win(f, prize, together), C = win(f, together, players), D = on(f, players, 6)
  return (
    <g>
      <TallStage id="lt-prize" f={f} />
      <Headline f={f} lines={[[d25, 'ANY PRIZE: 1 IN 25', P.ink, 100], [d4, 'MOST LIKELY: $4', P.mintInk, 104], [d67, '67¢ BACK PER $1', P.mintInk, 104], [third, 'PLAYERS LOSE ⅓', P.coralInk, 110]]} />
      {A > 0 && <g opacity={A}>
        {Array.from({ length: 25 }, (_, k) => { const x = 180 + (k % 5) * 160, y = 520 + Math.floor(k / 5) * 140; const w = k === 12; return <g key={k} opacity={on(f, winning + k * 0.5, 3)}>
          <Ticket x={x} y={y} s={0.36} win={w && f >= d25} />
          {w && <g opacity={on(f, d25, 5)}><Tick x={x + 50} y={y - 40} o={1} r={28} /></g>}
        </g> })}
        <g opacity={on(f, any, 5)}><rect x={90} y={450} width={820} height={720} rx={20} fill="none" stroke={P.ink2} strokeWidth={3} strokeDasharray="14 10" /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, likely, 5)}><Coin x={300} y={760} s={1.9 * pop(f, likely)} text="$4" /></g>
        <g opacity={on(f, ticket, 5)}><Ticket x={700} y={760} s={0.8 * pop(f, ticket)} text="$2" /></g>
        <g opacity={on(f, twice, 5)}><Label x={CX} y={1000} text="$4 = 2 × $2" size={88} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, prize, 5) * (1 - on(f, likely, 5))} transform={`translate(${CX} 760)`}><Prop id="trophy" x={0} y={0} size={160} f={f} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Ring x={CX} y={760} r={200} share={0.67} grow={on(f, d67, 18)} color={MINT} rest={RED} o={on(f, lotteries, 5)} />
        <g opacity={on(f, dollar, 5)}><Dollar x={CX} y={760} s={0.55 * pop(f, dollar)} /></g>
        <g opacity={on(f, prizes, 5)}><Label x={CX} y={1060} text="67¢ PRIZES · 33¢ KEPT" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, together, 5) * (1 - on(f, lotteries, 5))} transform={`translate(${CX} 760)`}><Prop id="calculator" x={0} y={0} size={180} f={f} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <g>{[0, 1, 2, 3, 4].map((k) => <Mini key={k} look={['buyer', 'investor', 'hero', 'worker', 'investorF'][k]} x={160 + k * 170} y={1250} scale={0.55} frame={f} seed={k + 41} mood={f >= lose ? 'sad' : 'neutral'} />)}</g>
        <line x1={200} y1={1000} x2={800} y2={1000} stroke={P.ink2} strokeWidth={5} />
        <Bar x={340} base={1000} h={420} color={GOLD} label="SPENT" value="$1" vo={on(f, players, 5)} />
        <Bar x={660} base={1000} h={420 * lerp(1, 0.67, on(f, third, 16))} color={MINT} label="BACK" value={f >= third ? '67¢' : ''} />
        <g opacity={on(f, spend, 5)}><rect x={660 - 95} y={1000 - 420} width={190} height={420 * 0.33} rx={10} fill="none" stroke={P.coral} strokeWidth={5} strokeDasharray="10 8" /></g>
      </g>}
      <Vignette id="lt-prize" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 6) s19–s25: sales doubled, kept 39¢ → 33¢, people win, built to lose, 33¢ stays
const End: React.FC<PieceProps> = ({ f, c }) => {
  const growing = c('s19:growing')
  const doubled = c('s20:doubled'), d528 = c('s20:528'), d1047 = c('s20:1047')
  const prizes = c('s21:prizes'), faster = c('s21:faster'), d118 = c('s21:118'), smaller = c('s21:smaller'), d39 = c('s21:39'), d33 = c('s21:33')
  const nobody = c('s22:nobody'), people = c('s22:people'), win22 = c('s22:win')
  const built = c('s23:built'), average = c('s23:average'), less = c('s23:less'), put = c('s23:put')
  const tiny = c('s24:tiny'), fun = c('s24:fun'), grow = c('s24:grow'), money = c('s24:money')
  const dollar = c('s25:dollar'), goes = c('s25:goes'), d33b = c('s25:33'), behind = c('s25:behind')
  const A = win(f, c('s19'), prizes), B = win(f, prizes, nobody), C = win(f, nobody, built), D = win(f, built, tiny), E = win(f, tiny, dollar), F = on(f, dollar, 6)
  return (
    <g>
      <TallStage id="lt-end" f={f} />
      <Headline f={f} lines={[[growing, 'STILL GROWING', P.ink, 110], [doubled, 'SALES NEARLY DOUBLED', P.ink, 92], [d118, 'PRIZES UP 118%', P.mintInk, 104], [d39, 'KEPT: 39¢ → 33¢', P.ink, 104], [people, 'PEOPLE DO WIN', P.mintInk, 110], [less, 'BACK: LESS THAN IN', P.coralInk, 96], [fun, 'A BIT OF FUN', P.goldInk, 110], [d33b, '33¢ STAYS BEHIND', P.coralInk, 104]]} />
      {A > 0 && <g opacity={A}>
        <line x1={200} y1={1150} x2={800} y2={1150} stroke={P.ink2} strokeWidth={5} />
        <Bar x={340} base={1150} h={300 * on(f, d528, 14)} color={PURPLE} label="2008" value="$52.8B" o={on(f, growing, 5)} vo={on(f, d528, 5)} />
        <Bar x={660} base={1150} h={595 * on(f, d1047, 16)} color={PURPLE} label="2024" value="$104.7B" o={on(f, d528, 5)} vo={on(f, d1047, 5)} />
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, smaller, 6)}>
          <g transform={`translate(${CX} 760) scale(${pop(f, prizes)})`}><Prop id="trophy" x={0} y={0} size={220} f={f} /></g>
          <g opacity={on(f, faster, 5)} transform="translate(760 640)"><Prop id="arrow-up" x={0} y={0} size={150} f={f} /></g>
          <g opacity={on(f, d118, 5)}><Label x={CX} y={1010} text="+118%" size={96} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={on(f, c('s21:states'), 5) * (1 - on(f, smaller, 6))} transform="translate(250 1080)"><State x={0} y={0} s={0.5 * pop(f, c('s21:states'))} /></g>
        <g opacity={on(f, smaller, 5)}>
          <g opacity={on(f, c('s21:dollar'), 5)}><Dollar x={CX} y={560} s={0.45 * pop(f, c('s21:dollar'))} /></g>
          <Ring x={300} y={780} r={130} share={0.39} grow={on(f, d39, 16)} color={RED} rest={MINT} />
          <Label x={300} y={800} text="39¢" size={72} font="Bebas Neue" color={P.ink} o={on(f, d39, 5)} />
          <Label x={300} y={990} text="2008" size={52} font="Bebas Neue" color={P.ink} />
          <Ring x={700} y={780} r={130} share={0.33} grow={on(f, d33, 16)} color={RED} rest={MINT} o={on(f, d33, 5)} />
          <Label x={700} y={800} text="33¢" size={72} font="Bebas Neue" color={P.ink} o={on(f, d33, 5)} />
          <Label x={700} y={990} text="2024" size={52} font="Bebas Neue" color={P.ink} o={on(f, d33, 5)} />
        </g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Person f={f} who="hero" beats={[[0, 'think', 'thinking'], [people, 'holdUp', 'smiling'], [win22, 'holdUp', 'smiling']]} x={CX} y={1250} s={0.75} o={on(f, nobody, 5)} />
        <g opacity={on(f, win22, 5)}><Ticket x={760} y={700} s={0.7 * pop(f, win22)} win text="WINNER" /></g>
        <g opacity={on(f, win22, 5)}>{Array.from({ length: 10 }, (_, k) => <rect key={k} x={200 + k * 65} y={520 + ((k * 37) % 90) + (f - win22) * 2} width={14} height={24} rx={3} fill={[RED, GOLD, MINT, PURPLE][k % 4]} transform={`rotate(${k * 30} ${207 + k * 65} ${532 + ((k * 37) % 90)})`} />)}</g>
      </g>}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(${CX} 800) scale(${pop(f, built)})`}><Prop id="scale-balance" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, average, 5)}><Coin x={300} y={1060} s={1.2} text="$1" /><Label x={300} y={1180} text="PUT IN" size={48} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, less, 5)}><Coin x={700} y={1060} s={0.9} text="67¢" /><Label x={700} y={1180} text="BACK" size={48} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, put, 5)}><Tick x={850} y={600} o={1} ok={false} /></g>
      </g>}
      {E > 0 && <g opacity={E}>
        <Ticket x={300} y={720} s={0.8 * pop(f, tiny)} />
        <g opacity={on(f, fun, 5)} transform={`translate(720 720) scale(${pop(f, fun)})`}><Prop id="dice" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, grow, 5)} transform={`translate(${CX} 1060) scale(${pop(f, grow)})`}><Prop id="seedling" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, money, 5)}><path d={`M${CX - 90} 970 L${CX + 90} 1150 M${CX + 90} 970 L${CX - 90} 1150`} stroke={P.coral} strokeWidth={14} strokeLinecap="round" /></g>
      </g>}
      {F > 0 && <g opacity={F}>
        <Dollar x={lerp(220, CX, on(f, goes, 18))} y={680} s={1.1 * pop(f, dollar)} />
        <g opacity={on(f, d33b, 5)}><Coin x={CX} y={1010} s={1.5 * pop(f, d33b)} text="33¢" /></g>
        <g opacity={on(f, behind, 5)} transform="translate(780 1050)"><State x={0} y={0} s={0.6} /></g>
      </g>}
      <Vignette id="lt-end" w={1080} h={1920} />
    </g>
  )
}

export const LOTTERY = [
  makePiece('lt-hook', 'Short: $104.7B on lottery tickets — states keep 33¢ of each $1 — where does it go, what are the chances — follow one dollar', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1", "s1:americans", "s1:1047", "s1:tickets", "s2:dollar", "s2:states", "s2:kept", "s2:33", "s2:prizes", "s3", "s3:go", "s3:chances", "s4", "s4:one", "s4:dollar"],
    sfx: [['s1:1047', 'riser', 0.3], ['s2:33', 'thud', 0.3], ['s4:one', 'swish', 0.3]] }),
  makePiece('lt-split', 'Short: 67¢ to prizes — not to you, to the winners — 9 in 10 winning Powerball plays win $4 — 33¢ to the state', { canvas: 'tall', mood: 'dark', Component: Split,
    beats: ["s5:67", "s5:prizes", "s6:not", "s6:you", "s6:winners", "s6:most", "s6:small", "s6a:powerball", "s6a:9", "s6a:10", "s6a:4", "s7:other", "s7:33", "s7:state", "s5"],
    sfx: [['s5:67', 'coin', 0.3], ['s6a:4', 'pop', 0.3], ['s7:33', 'thud', 0.3]] }),
  makePiece('lt-states', 'Short: 45 lottery states — $34.5B kept — running costs + state spending — Virginia paid 80% in prizes', { canvas: 'tall', mood: 'light', Component: States,
    beats: ["s8", "s8:45", "s8:lottery", "s8:added", "s8:345", "s8:year", "s9:pays", "s9:run", "s9:spends", "s9:rest", "s9:decides", "s10:split", "s10:everywhere", "s10:virginia", "s10:80", "s10:sales", "s10:most"],
    sfx: [['s8:345', 'riser', 0.3], ['s9:rest', 'coin', 0.3], ['s10:80', 'ding', 0.3]] }),
  makePiece('lt-odds', 'Short: a $2 Powerball ticket — jackpot 1 in 292M — 5.6M years of weekly tickets — still 56,000 years at 100 a week', { canvas: 'tall', mood: 'dark', Component: Odds,
    beats: ["s11", "s11:chances", "s12:powerball", "s12:costs", "s12:2", "s13:hitting", "s13:jackpot", "s13:292", "s13:million", "s14:bought", "s14:week", "s14:56", "s14:expect", "s14a:100", "s14a:still", "s14a:56000"],
    sfx: [['s12:2', 'pop', 0.3], ['s13:292', 'thud', 0.35], ['s14:56', 'riser', 0.3], ['s14a:56000', 'thud', 0.3]] }),
  makePiece('lt-prize', 'Short: any prize 1 in 25 — most likely $4, twice the ticket — 67¢ back per $1 — players lose a third', { canvas: 'tall', mood: 'light', Component: Prize,
    beats: ["s15:winning", "s15:any", "s15:25", "s16:prize", "s16:likely", "s16:twice", "s16:ticket", "s17:together", "s17:lotteries", "s17:dollar", "s17:67", "s17:prizes", "s18:players", "s18:lose", "s18:third", "s18:spend", "s15"],
    sfx: [['s15:25', 'ding', 0.3], ['s16:4', 'coin', 0.3], ['s17:67', 'tick', 0.3], ['s18:third', 'thud', 0.35]] }),
  makePiece('lt-end', 'Short: sales $52.8B → $104.7B — prizes +118%, kept 39¢ → 33¢ — people do win — built so players get back less — a bit of fun, not growth — 33¢ stays', { canvas: 'tall', mood: 'light', Component: End,
    beats: ["s19:growing", "s20:doubled", "s20:528", "s20:1047", "s21:prizes", "s21:faster", "s21:118", "s21:smaller", "s21:39", "s21:33", "s22:nobody", "s22:people", "s22:win", "s23:built", "s23:average", "s23:less", "s23:put", "s24:tiny", "s24:fun", "s24:grow", "s24:money", "s25:dollar", "s25:goes", "s25:33", "s25:behind", "s19", "s21:states", "s21:dollar"],
    sfx: [['s20:1047', 'riser', 0.3], ['s21:33', 'tick', 0.3], ['s22:win', 'chime', 0.35], ['s25:33', 'thud', 0.35]] }),
]
