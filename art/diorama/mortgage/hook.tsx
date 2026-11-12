// ---------------------------------------------------------------- s1–s7: the hook (kitchen at sunset → the street).
// A) Your kitchen at golden hour. You sit at the table with the first mortgage bill; on "payment" the envelope opens
//    and a stack of 10 gold coins ($2,263) rises; a little model home glows on "house". On "no" 9 coins turn brick-red
//    and slide to a tiny lender's hall in the window (INTEREST $1,998); only 1 coin reaches the model home ($264).
//    "Didn't do anything wrong": you relax; a row of three homes all show the same 9-and-1 split ("most home loans").
// B) Signing: a big contract with a house drawn on it, a pen signs; a closed box with a "?" (nobody shows how it works).
//    Your two thoughts as bubbles: a 30-year calendar ("pay one off?") and a coin with a down arrow ("pay less?").
// C) The street at sunset: one home, a path from START to FINISH ("one simple example"); four signposts light along
//    the path as the steps are named, then a gold banner "OVER $100,000" on "100000".
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { BRICK, Coins, CREAM, Envelope, GOLD, GOLDD, Ground, Hills, Home, INK, LenderHall, PLUM, Room, SAGE, SAGED, Sky, Table, Tree, Fence, Bush, MonthGrid } from './kit'

const K = {
  you: 's1:you', make: 's1:make', first: 's1:first', payment: 's1:payment', k2263: 's1:2263', think1: "s1:you'd", house1: 's1:house', right1: 's1:right',
  no: 's2:no', k1998: 's2:1998', interest2: 's2:interest', almost: "s2:almost", nine: 's2:9', every10: 's2:every', ten: 's2:10',
  didnt: "s3:didn't", wrong: 's3:wrong', okay: 's3:okay', most3: 's3:most', loans: 's3:loans', exactly3: 's3:exactly',
  sign: "s4:you'll", biggest: 's4:biggest', life: 's4:life', most4: 's4:most', without: 's4:without', showing: 's4:showing', works4: 's4:works',
  thinking: 's5:thinking', anyone: 's5:anyone', payoff5: 's5:off', way: 's5:way', less: 's5:less',
  dont6: "s6:don't", maths: 's6:maths', use6: 's6:use', example: 's6:example', start: 's6:start', finish: 's6:finish',
  today: 's7:today', step7: 's7:step', mortgage7: 's7:mortgage', inside: 's7:inside', monthly: 's7:monthly', where: 's7:where', every7: 's7:every', years30: 's7:30', moves: 's7:moves', save: 's7:save', k100: 's7:100000',
}
type Key = keyof typeof K

// # the little model home on the table (fresh small drawing)
const ModelHome: React.FC<{ x: number; y: number; s?: number; glow?: number; o?: number }> = ({ x, y, s = 1, glow = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <circle cx={0} cy={-60} r={150} fill="#FFE3A0" opacity={0.35 * glow} />}
    <rect x={-80} y={-70} width={160} height={110} fill="#F6E3C4" stroke={INK} strokeWidth={4} />
    <path d="M-100 -66 L0 -140 L100 -66 Z" fill={BRICK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-20} y={-10} width={40} height={50} fill="#6C4A3A" stroke={INK} strokeWidth={3} />
    <rect x={-62} y={-46} width={30} height={28} fill="#FFD983" stroke={INK} strokeWidth={3} /><rect x={32} y={-46} width={30} height={28} fill="#FFD983" stroke={INK} strokeWidth={3} />
  </g>
)
// # one coin (gold → brick as `red` goes 0..1)
const Coin1: React.FC<{ x: number; y: number; red?: number; o?: number; s?: number }> = ({ x, y, red = 0, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={46} ry={14} fill={red > 0.5 ? '#9E3626' : GOLDD} /><rect x={-46} y={-8} width={92} height={14} fill={red > 0.5 ? '#9E3626' : GOLDD} />
    <ellipse cx={0} cy={-8} rx={46} ry={14} fill={red > 0.5 ? BRICK : GOLD} stroke={INK} strokeWidth={2} />
  </g>
)
// # a step signpost on the path
const Post: React.FC<{ x: number; y: number; n: number; t: string; o: number; lit: number }> = ({ x, y, n, t, o, lit }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-7} y={-150} width={14} height={150} fill="#7A5236" />
    <rect x={-172} y={-250} width={344} height={110} rx={14} fill={lit > 0.5 ? '#FFF4E2' : '#F3E6D0'} stroke={lit > 0.5 ? GOLDD : '#B98454'} strokeWidth={6} />
    <circle cx={-130} cy={-195} r={28} fill={lit > 0.5 ? GOLD : '#D9C3A0'} stroke={INK} strokeWidth={3} /><Label x={-130} y={-182} text={`${n}`} size={38} font="Bebas Neue" color={INK} />
    <Label x={28} y={-180} text={t} size={40} font="Bebas Neue" color={INK} />
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.sign - 8, BC = q.dont6 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const rise = on(f, q.payment, 18), split = on(f, q.no, 26), row = on(f, q.most3, 14)
  const you: Beat[] = [[0, 'sit', 'neutral'], [q.payment, 'read', 'neutral'], [q.think1, 'think', 'smiling'], [q.no, 'shock', 'shocked'], [q.interest2, 'read', 'worried'],
    [q.didnt, 'relax', 'smiling'], [q.okay, 'sit', 'smiling']]
  const signer: Beat[] = [[0, 'explain', 'neutral'], [q.biggest, 'holdChest', 'smiling'], [q.without, 'scratchHead', 'thinking'], [q.thinking, 'think', 'thinking'], [q.less, 'pointUp', 'smiling']]
  const guide: Beat[] = [[0, 'explain', 'smiling'], [q.use6, 'countOne', 'smiling'], [q.example, 'present', 'smiling'], [q.today, 'point', 'smiling'], [q.k100, 'celebrate', 'smiling']]
  // # coin i of 10: 0..8 go to interest (lender), 9 goes home
  const coinAt = (i: number): [number, number, number] => {
    const sx = 1000, sy = 690 - i * 16 * rise
    if (i < 9) { const t = span(f, q.no + i * 2, q.no + i * 2 + 20); return [lerp(sx, 1400 + (i % 3) * 70, t), lerp(sy, 742 - Math.floor(i / 3) * 18, t) - 120 * Math.sin(Math.PI * t), on(f, q.no + i * 2, 8)] }
    const t = span(f, q.no + 20, q.no + 40); return [lerp(sx, 720, t), lerp(sy, 642, t) - 80 * Math.sin(Math.PI * t), 0]
  }
  return (
    <g>
      <Stage id="mg-hook" frame={f} />
      {/* # A) the kitchen at sunset, the first bill, 9 coins of 10 go to interest */}
      {A > 0 && <g opacity={A}>
        <Room id="mgh-room" win={[1500, 190, 300, 220]} />
        <Table x={1060} y={760} w={980} />
        <g opacity={on(f, q.interest2, 10) * (1 - row)}><LenderHall id="mgh-hall" x={1470} y={756} s={0.42} /></g>
        <Person f={f} who="investorF" beats={you} x={330} y={930} s={1.0} />
        <g opacity={1 - row}>
          <Envelope x={1000} y={720} s={0.55} t="" open={on(f, q.payment, 12)} o={1 - on(f, q.k2263, 10) * 0.0} />
          <ModelHome x={720} y={760} s={0.9} glow={on(f, q.house1, 12) + 0.6 * on(f, q.no + 30, 12)} />
          {Array.from({ length: 10 }, (_, i) => { const [x, y, r] = coinAt(i); return <Coin1 key={i} x={x} y={y} red={r} o={on(f, q.payment + i, 6)} s={0.9} /> })}
          <g opacity={win(f, q.k2263, q.no + 6, 8)}><Label x={1000} y={430} text="$2,263" size={96} font="Bebas Neue" color={INK} /></g>
          <g opacity={on(f, q.k1998, 10)}><Label x={1450} y={510} text="INTEREST: $1,998" size={64} font="Bebas Neue" color={BRICK} /></g>
          <g opacity={on(f, q.no + 40, 10)}><Label x={720} y={540} text="YOUR HOME: $264" size={56} font="Bebas Neue" color={SAGED} /></g>
          <g opacity={on(f, q.nine, 10)} transform={`translate(1450 900) scale(${pop(f, q.ten, 12) * 0.2 + 0.8})`}><rect x={-170} y={-50} width={340} height={84} rx={42} fill={CREAM} stroke={BRICK} strokeWidth={5} /><Label x={0} y={12} text="9 OUT OF EVERY 10" size={48} font="Bebas Neue" color={BRICK} /></g>
        </g>
        {/* # most home loans: the same split on three homes */}
        {row > 0 && <g opacity={row}>{[860, 1220, 1580].map((hx, k) => <g key={k} transform={`translate(0 ${-14 * pop(f, q.most3 + k * 5, 12)})`}>
          <ModelHome x={hx} y={700} s={0.95} />
          <rect x={hx - 120} y={735} width={240} height={30} rx={15} fill="#EEDFC8" stroke={INK} strokeWidth={3} />
          <rect x={hx - 120} y={735} width={216} height={30} rx={15} fill={BRICK} /><rect x={hx + 96} y={735} width={24} height={30} rx={8} fill={SAGE} />
        </g>)}
          <Label x={1220} y={500} text="MOST HOME LOANS WORK THIS WAY" size={60} font="Bebas Neue" color={INK} /></g>}
      </g>}
      {/* # B) signing a big deal nobody explains; your two thoughts */}
      {B > 0 && <g opacity={B}>
        <Room id="mgh-room2" wall="#EED3B4" win={[1540, 170, 260, 200]} glow={0.7} />
        <Table x={1040} y={780} w={1060} />
        <g transform={`translate(920 ${640 - 10 * pop(f, q.sign, 12)})`} opacity={win(f, q.sign, q.thinking, 10)}>
          <rect x={-230} y={-280} width={460} height={420} rx={10} fill="#FFFBF2" stroke={INK} strokeWidth={5} />
          <g transform="translate(0 -110) scale(0.9)"><ModelHome x={0} y={60} s={1} /></g>
          <rect x={-170} y={30} width={340} height={10} rx={5} fill="#E6D8C0" /><rect x={-170} y={60} width={260} height={10} rx={5} fill="#E6D8C0" />
          <path d={`M-150 112 ${Array.from({ length: 8 }, (_, i) => `q 12 ${i % 2 ? 22 : -22} 24 0`).join(' ')}`} fill="none" stroke={PLUM} strokeWidth={5} strokeDasharray="400" strokeDashoffset={400 * (1 - span(f, q.sign + 6, q.biggest))} />
          <path d="M-170 124 L170 124" stroke={INK} strokeWidth={3} />
        </g>
        <g opacity={win(f, q.biggest, q.without, 10)}><Label x={960} y={1010} text="ONE OF THE BIGGEST DEALS OF YOUR LIFE" size={62} font="Bebas Neue" color={CREAM} /></g>
        {/* # a closed box with a question mark: how it works, never shown */}
        <g opacity={win(f, q.without, q.thinking, 10)} transform={`translate(1360 ${620 - 12 * pop(f, q.showing, 12)})`}>
          <path d="M-150 -60 L0 -120 L150 -60 L150 120 L0 180 L-150 120 Z" fill="#B98454" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M-150 -60 L0 0 L150 -60 M0 0 L0 180" fill="none" stroke={INK} strokeWidth={5} /><path d="M-150 -60 L0 -120 L150 -60 L0 0 Z" fill="#D9A06A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <Label x={-76} y={110} text="?" size={110} font="Bebas Neue" color={CREAM} /><Label x={76} y={110} text="?" size={110} font="Bebas Neue" color={CREAM} />
        </g>
        <Person f={f} who="investor" beats={signer} x={300} y={940} s={1.0} />
        {/* # thought bubbles: pay it off? pay less? */}
        <g opacity={on(f, q.thinking, 10)} transform={`translate(860 ${520 - 10 * pop(f, q.payoff5, 12)})`}>
          <ellipse cx={0} cy={0} rx={300} ry={190} fill="#FFFBF2" stroke={INK} strokeWidth={5} /><circle cx={-310} cy={190} r={22} fill="#FFFBF2" stroke={INK} strokeWidth={4} /><circle cx={-370} cy={250} r={13} fill="#FFFBF2" stroke={INK} strokeWidth={4} />
          <g opacity={on(f, q.anyone, 10)}><MonthGrid x={0} y={-40} paid={Math.round(360 * span(f, q.payoff5, q.way))} s={0.7} /></g>
          <Label x={0} y={140} text="EVER PAID OFF?" size={52} font="Bebas Neue" color={INK} />
        </g>
        <g opacity={on(f, q.way, 10)} transform={`translate(1480 ${600 - 10 * pop(f, q.less, 12)})`}>
          <ellipse cx={0} cy={0} rx={220} ry={170} fill="#FFFBF2" stroke={INK} strokeWidth={5} />
          <Coins x={-40} y={40} n={lerp(5, 2, on(f, q.less, 16))} s={0.8} />
          <path d={`M90 -60 L90 ${-60 + 100 * on(f, q.less, 16)}`} stroke={SAGED} strokeWidth={18} strokeLinecap="round" /><path d={`M60 ${-10 + 100 * on(f, q.less, 16) - 40} L90 ${30 + 100 * on(f, q.less, 16) - 40} L120 ${-10 + 100 * on(f, q.less, 16) - 40}`} fill={SAGED} />
          <Label x={0} y={120} text="PAY LESS?" size={52} font="Bebas Neue" color={SAGED} />
        </g>
      </g>}
      {/* # C) the street: one example from start to finish; the steps along the path */}
      {C > 0 && <g opacity={C}>
        <Sky id="mgh-sky" sun={[1620, 640]} f={f} />
        <Hills id="mgh-hills" y={760} seed={3} />
        <Ground id="mgh-ground" y={840} />
        <path d="M-40 1000 C 400 900, 700 980, 1000 900 S 1600 860, 1960 900" fill="none" stroke="#E9D3AE" strokeWidth={70} strokeLinecap="round" />
        <path d="M-40 1000 C 400 900, 700 980, 1000 900 S 1600 860, 1960 900" fill="none" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={5} strokeDasharray="22 26" />
        <Tree x={180} y={850} s={0.9} /><Bush x={1810} y={880} s={0.9} />
        <g opacity={1 - on(f, q.today, 12)} transform={`translate(0 ${-10 * pop(f, q.example, 12)})`}>
          <Home id="mgh-home" x={1300} y={680} s={0.85} lit={0.3} />
          <g opacity={on(f, q.start, 8)}><rect x={240} y={830} width={12} height={110} fill={INK} /><path d="M252 830 L360 856 L252 882 Z" fill={SAGE} stroke={INK} strokeWidth={3} /><Label x={300} y={980} text="START" size={44} font="Bebas Neue" color={INK} /></g>
          <g opacity={on(f, q.finish, 8)}><rect x={1700} y={790} width={12} height={110} fill={INK} /><path d="M1712 790 L1820 816 L1712 842 Z" fill={GOLD} stroke={INK} strokeWidth={3} /><Label x={1760} y={940} text="FINISH" size={44} font="Bebas Neue" color={INK} /></g>
        </g>
        <Person f={f} who="hero" beats={guide} x={lerp(700, 170, on(f, q.today, 16))} y={960} s={0.9} />
        {([[q.mortgage7, 'WHAT IT IS'], [q.inside, "WHAT'S INSIDE"], [q.where, 'WHERE IT GOES'], [q.moves, 'MOVES THAT SAVE']] as [number, string][]).map(([at, t], k) =>
          <Post key={k} x={600 + k * 360} y={900 - 20 * k - 14 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={on(f, at, 6)} />)}
        <g opacity={on(f, q.k100, 10)} transform={`translate(1160 ${420 - 12 * pop(f, q.k100, 14)})`}><rect x={-300} y={-62} width={600} height={110} rx={55} fill={GOLD} stroke={INK} strokeWidth={5} /><Label x={0} y={18} text="SAVE OVER $100,000" size={64} font="Bebas Neue" color={INK} /></g>
        <Fence x0={-20} x1={420} y={1080} />
      </g>}
      <Headline f={f} lines={[[q.you, 'YOUR FIRST MORTGAGE PAYMENT', INK, 92], [q.no, 'MOSTLY INTEREST', BRICK, 104], [q.didnt, 'NOTHING WENT WRONG', INK, 100],
        [q.sign, 'A BIG DEAL, NEVER EXPLAINED', INK, 92], [q.thinking, 'YOUR TWO QUESTIONS', INK, 96], [q.dont6, 'ONE SIMPLE EXAMPLE', INK, 100], [q.today, 'STEP BY STEP', INK, 104]]} />
      <Vignette id="mg-hook" />
    </g>
  )
}

export const MG_HOOK = makePiece('mg-hook', 'Mortgage hook (golden-hour kitchen): you at the table with your first mortgage bill; the envelope opens and 10 gold coins ($2,263) rise; on "no" 9 coins turn brick-red and slide to a tiny lender hall (INTEREST $1,998, 9 OUT OF EVERY 10) and 1 reaches the model home ($264); three model homes show the same split; then signing a big contract with a house on it beside a closed box with question marks; two thought bubbles (a 30-year calendar EVER PAID OFF?, coins shrinking PAY LESS?); a sunset street with one home, START and FINISH flags and four step signposts, a gold SAVE OVER $100,000 banner', {
  mood: 'light', Component: Hook, beats: Object.values(K),
  sfx: [['s1:payment', 'pop', 0.2], ['s2:no', 'thud', 0.25], ['s2:interest', 'pop', 0.2], ['s5:thinking', 'ding', 0.15], ['s7:100000', 'riser', 0.2]] })
