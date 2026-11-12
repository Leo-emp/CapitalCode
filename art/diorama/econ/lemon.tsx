// ---------------------------------------------------------------- s23–s39: idea two — supply and demand, worked through with lemonade.
// A) A tug of war: two buyers pull one way, two sellers the other, a price tag hangs on the knot.
// B) Demand: a lemonade stand and a queue of ten buyers (1 = 10 people). At $1 all ten want a cup; at $3 six walk away.
// C) Supply: at $1 one stand makes 4 trays (40 cups); at $3 two more kids open stands and the trays grow to 10.
// D) Together, on a balance: people who want a cup vs cups for sale. $1 → 100 vs 40, the cup pan is SOLD OUT, price goes up;
//    $3 → 40 vs 100, six trays left over, price goes down; $2 → 70 vs 70, level. Then a buyer and a seller shake hands.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Arrow, Backdrop, Balance, Board, Cup, Dude, LemonStand, Rope, Tag, Tray, TXT, GREEN, RED } from './kit'

const GROUND = 930
const BUY = '#4F78AA', SELL = '#E5634F'

const Lemon: React.FC<PieceProps> = ({ f, c }) => {
  const tug = c('s23:tug'), buyers23 = c('s23:buyers'), sellers23 = c('s23:sellers')
  const madeup = c('s24:madeup'), town = c('s24:town'), stands24 = c('s24:stands')
  const buyers = c('s25:buyers'), demand = c('s25:demand'), each25 = c('s25:each')
  const d1 = c('s26:1'), d100 = c('s26:100'), d3 = c('s26:3'), d40 = c('s26:40')
  const goes27 = c('s27:goes'), fewer = c('s27:fewer'), half27 = c('s27:half')
  const sellers = c('s28:sellers'), supply = c('s28:supply'), other28 = c('s28:other'), sell28 = c('s28:sell')
  const d1b = c('s29:1'), barely = c('s29:barely'), c40 = c('s29:40')
  const d3b = c('s30:3'), worth = c('s30:worth'), kids = c('s30:kids'), c100 = c('s30:100')
  const goes31 = c('s31:goes'), make31 = c('s31:make'), half31 = c('s31:half')
  const together = c('s32:together')
  const d1c = c('s33:1'), p100 = c('s33:100'), only33 = c('s33:only'), runs = c('s33:runs'), line = c('s33:line')
  const raise = c('s34:raise')
  const d3c = c('s35:3'), c100b = c('s35:100'), b40 = c('s35:40'), sixty = c('s35:sixty'), left35 = c('s35:left')
  const cut = c('s36:cut')
  const d2 = c('s37:2'), p70 = c('s37:70'), make37 = c('s37:make')
  const nothing = c('s38:nothing'), wasted = c('s38:wasted')
  const equilibrium = c('s39:equilibrium'), nobody = c('s39:nobody'), find = c('s39:find'), together39 = c('s39:together')

  const A = win(f, 0, madeup - 4), B = win(f, madeup - 4, sellers - 4), Cw = win(f, sellers - 4, together - 4), D = win(f, together - 4, find - 6), E = on(f, find - 6, 10)

  // # A: the tug of war, the knot leans to whoever is named
  const lean = 60 * on(f, buyers23, 12) * (1 - on(f, sellers23, 12)) - 60 * on(f, sellers23, 12) + 60 * on(f, sellers23 + 18, 14)
  const knot = 960 - lean + 8 * Math.sin(f / 7)
  const pullL: Beat[] = [[0, 'pull', 'thinking']], pullR: Beat[] = [[0, 'pull', 'thinking']]

  // # B: queue of ten buyers; at $3 six walk away
  const price = f >= d3 ? '$3' : '$1'
  const away = on(f, d3 + 6, 20)
  // # C: supply
  const priceC = f >= d3b ? '$3' : '$1'
  const trays = f >= c100 ? 10 : f >= c40 ? 4 : f >= barely ? 4 : 0
  // # D: the balance states
  const st = f >= d2 ? 2 : f >= d3c ? 3 : f >= d1c ? 1 : 0
  const want = st === 1 ? 10 : st === 3 ? 4 : st === 2 ? 7 : 0
  const cups = st === 1 ? 4 : st === 3 ? 10 : st === 2 ? 7 : 0
  const tilt = st === 1 ? -on(f, only33, 20) : st === 3 ? lerp(-1, 1, on(f, d3c, 24)) : st === 2 ? lerp(1, 0, on(f, d2, 24)) : 0
  const boardT = st === 0 ? '' : `$${st}`
  const leftPan = <g transform="translate(0 -4)">{Array.from({ length: want }, (_, k) => <Dude key={k} x={-80 + (k % 5) * 40} y={-Math.floor(k / 5) * 74} s={0.55} col={BUY} />)}</g>
  const rightPan = <g transform="translate(0 -4)">{Array.from({ length: cups }, (_, k) => <g key={k}>{st === 3 && k >= 4 && <circle cx={-80 + (k % 5) * 40} cy={-30 - Math.floor(k / 5) * 60} r={24} fill={P.gold} opacity={0.5 * on(f, left35, 10)} />}<Cup x={-80 + (k % 5) * 40} y={-Math.floor(k / 5) * 60} s={0.5} full={st === 1 ? 1 - on(f, runs, 16) : 1} /></g>)}</g>

  return (
    <g>
      <Stage id="ec-lemon" frame={f} />
      <Backdrop f={f} />
      <Headline f={f} lines={[[tug, 'BUYERS VS SELLERS', P.ink, 96], [madeup, 'MADE-UP EXAMPLE: LEMONADE', P.ink, 80], [demand, 'DEMAND', BUY, 110], [supply, 'SUPPLY', SELL, 110], [together, 'PUT THEM TOGETHER', P.ink, 96], [equilibrium, 'THE EQUILIBRIUM PRICE', P.goldInk, 100]]} />
      <Ground y={GROUND} />

      {/* # A) the tug of war */}
      {A > 0 && <g opacity={A}>
        <Rope x1={360} x2={1560} y={720} knot={knot} />
        <g opacity={on(f, tug, 8)}><line x1={knot} y1={729} x2={knot} y2={780} stroke="#8E7A5A" strokeWidth={4} /><Tag x={knot} y={830} t="PRICE" s={0.9} r={0} /></g>
        <Person f={f} who="buyer" beats={pullL} x={300 - lean * 0.3} y={GROUND} s={0.95} />
        <Person f={f} who="investorF" beats={pullL} x={170 - lean * 0.3} y={GROUND} s={0.95} />
        <Person f={f} who="owner" beats={pullR} x={1620 - lean * 0.3} y={GROUND} s={0.95} flip />
        <Person f={f} who="worker" beats={pullR} x={1750 - lean * 0.3} y={GROUND} s={0.95} flip />
        <g opacity={on(f, buyers23, 8)}><Label x={240} y={330} text="BUYERS" size={70} font="Bebas Neue" color={BUY} /></g>
        <g opacity={on(f, sellers23, 8)}><Label x={1680} y={330} text="SELLERS" size={70} font="Bebas Neue" color={SELL} /></g>
      </g>}

      {/* # B) demand: the queue */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, stands24 - 6, 10)} transform={`translate(0 ${30 * (1 - pop(f, stands24 - 6, 14))})`}><LemonStand x={1380} y={GROUND} s={1.25} price={f >= d1 ? price : ''} /></g>
        <g opacity={on(f, stands24, 8)}><Person f={f} who="worker" beats={[[stands24, 'idle', 'smiling'], [d3, 'present', 'smiling']]} x={1680} y={GROUND} s={0.8} flip /></g>
        {Array.from({ length: 10 }, (_, k) => {
          const leaves = k < 6
          const x = 1080 - k * 92 - (leaves ? 260 * away : 0)
          const o = on(f, buyers + k * 2, 8) * (leaves ? 1 - away : 1)
          const who = ['buyer', 'investorF', 'investor', 'worker', 'owner'][k % 5]
          return o > 0.01 ? <g key={k} opacity={o}><Person f={f} who={who} beats={[[buyers, 'idle', 'smiling'], [d3 + 4, leaves ? 'walkA' : 'idle', leaves ? 'worried' : 'smiling', leaves ? 'walkB' : undefined, 10]]} x={x} y={GROUND} s={0.5} flip={leaves && away > 0.01} /></g> : null
        })}
        <g opacity={on(f, d100, 8) * (1 - on(f, d3, 8))}><Label x={620} y={560} text="100 WANT A CUP" size={64} font="Bebas Neue" color={BUY} /></g>
        <g opacity={on(f, d40, 8)}><Label x={880} y={560} text="ONLY 40" size={64} font="Bebas Neue" color={BUY} /></g>
        <g opacity={on(f, each25, 8) * (1 - on(f, d100, 8))}><Dude x={560} y={570} s={0.8} col={BUY} /><Label x={680} y={550} text="= 10 PEOPLE" size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, goes27, 8)}><Arrow x={1100} y={420} dir="up" col={RED} s={0.8} /><Label x={1100} y={540} text="PRICE UP" size={40} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, half27, 8)}><Label x={960} y={290} text="RULE, PART 1" size={56} font="Bebas Neue" color={BUY} /></g>
        <g opacity={on(f, fewer, 8)}><Arrow x={560} y={420} dir="down" col={BUY} s={0.8} /><Label x={560} y={530} text="FEWER BUY" size={40} font="Bebas Neue" color={BUY} /></g>
      </g>}

      {/* # C) supply: stands and trays */}
      {Cw > 0 && <g opacity={Cw}>
        <g transform={`translate(${-300 * (1 - on(f, other28, 18))} 0)`}><LemonStand x={560} y={GROUND} s={0.8 * (1 + 0.06 * win(f, sell28, d1b, 6))} price={f >= d1b ? priceC : ''} tint="#F28C6B" /></g>
        <g opacity={on(f, kids, 10)} transform={`translate(0 ${40 * (1 - pop(f, kids, 14))})`}><LemonStand x={230} y={GROUND} s={0.8} price={priceC} tint="#7FA8D8" /></g>
        <g opacity={on(f, kids + 8, 10)} transform={`translate(0 ${40 * (1 - pop(f, kids + 8, 14))})`}><LemonStand x={890} y={GROUND} s={0.8} price={priceC} tint="#3DBE84" /></g>
        {/* the cups for sale, by the tray (1 tray = 10 cups) */}
        <rect x={1100} y={GROUND - 26} width={760} height={26} rx={8} fill="#C9B18A" />
        {Array.from({ length: trays }, (_, k) => { const at = k < 4 ? barely + k * 3 : c100 + (k - 4) * 2; return <g key={k} opacity={on(f, at, 6)} transform={`translate(0 ${-30 * (1 - pop(f, at, 10))})`}><Tray x={1160 + (k % 5) * 150} y={GROUND - 26 - Math.floor(k / 5) * 120} s={0.8} /></g> })}
        <g opacity={on(f, c40, 8) * (1 - on(f, d3b, 8))}><Label x={1480} y={620} text="40 CUPS" size={70} font="Bebas Neue" color={SELL} /></g>
        <g opacity={on(f, c100, 8)}><Label x={1480} y={620} text="100 CUPS" size={70} font="Bebas Neue" color={SELL} /></g>
        <g opacity={on(f, supply + 10, 8) * (1 - on(f, c40, 8))}><Tray x={1380} y={560} s={0.8} /><Label x={1560} y={545} text="= 10 CUPS" size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, goes31, 8)}><Arrow x={1180} y={440} dir="up" col={RED} s={0.8} /><Label x={1180} y={350} text="PRICE UP" size={54} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, half31, 8)}><Label x={960} y={290} text="RULE, PART 2" size={56} font="Bebas Neue" color={SELL} /></g>
        <g opacity={on(f, make31, 8)}><Arrow x={1760} y={440} dir="up" col={SELL} s={0.8} /><Label x={1760} y={350} text="MORE MADE" size={54} font="Bebas Neue" color={SELL} /></g>
              </g>}

      {/* # D) both sides on a balance */}
      {D > 0 && <g opacity={D}>
        <Balance x={960} y={GROUND} s={1.12} tilt={tilt} left={leftPan} right={rightPan} />
        <g opacity={on(f, together, 8)}>
          <Label x={300} y={680} text="WANT A CUP" size={50} font="Bebas Neue" color={BUY} />
          <Label x={1620} y={680} text="CUPS FOR SALE" size={50} font="Bebas Neue" color={SELL} />
        </g>
        <g opacity={on(f, d1c, 8)} transform="translate(960 380)"><text x={0} y={0} textAnchor="middle" fill={P.ink} style={TXT(110)}>{boardT}</text></g>
        <g opacity={st === 1 ? on(f, p100, 8) : st === 3 ? on(f, b40, 8) : st === 2 ? on(f, p70, 8) : 0}><Label x={300} y={620} text={`${want * 10}`} size={90} font="Bebas Neue" color={BUY} /></g>
        <g opacity={st === 1 ? on(f, only33 + 6, 8) : st === 3 ? on(f, c100b, 8) : st === 2 ? on(f, make37, 8) : 0}><Label x={1620} y={620} text={`${cups * 10}`} size={90} font="Bebas Neue" color={SELL} /></g>
        <g opacity={win(f, runs, d3c, 6)} transform={`translate(${1620} 790) rotate(-8) scale(${pop(f, runs, 12)})`}><rect x={-140} y={-44} width={280} height={88} rx={10} fill="none" stroke={RED} strokeWidth={8} /><text y={22} textAnchor="middle" fill={RED} style={TXT(64)}>SOLD OUT</text></g>
        <g opacity={win(f, line, d3c, 6)}><Label x={300} y={780} text="LONG LINE" size={54} font="Bebas Neue" color={BUY} /></g>
        <g opacity={win(f, raise, d3c, 6)}><Arrow x={1120} y={330} dir="up" col={RED} s={0.8} /></g>
        <g opacity={win(f, sixty, d2, 6)}><Label x={1620} y={780} text="60 LEFT OVER" size={54} font="Bebas Neue" color={SELL} /></g>
        <g opacity={win(f, cut, d2, 6)}><Arrow x={1120} y={340} dir="down" col={GREEN} s={0.8} /></g>
        <g opacity={on(f, nothing, 8)}><Label x={300} y={800} text="NOTHING RUNS OUT" size={46} font="Bebas Neue" color={GREEN} /></g>
        <g opacity={on(f, wasted, 8)}><Label x={1620} y={800} text="NOTHING WASTED" size={46} font="Bebas Neue" color={GREEN} /></g>
        <g opacity={on(f, equilibrium, 10)}><circle cx={960} cy={350} r={110} fill={P.gold} opacity={0.25} /></g>
      </g>}

      {/* # E) nobody sets it: buyer and seller find it together */}
      {E > 0 && <g opacity={E}>
        <LemonStand x={960} y={GROUND} s={1.1} price="$2" />
        <Person f={f} who="buyer" beats={[[find - 6, 'walkA', 'smiling', 'walkB', 10], [find + 14, 'handshake', 'smiling']]} x={lerp(380, 640, on(f, find - 6, 20))} y={GROUND} s={1} />
        <Person f={f} who="worker" beats={[[find - 6, 'walkA', 'smiling', 'walkB', 10], [find + 14, 'handshake', 'smiling']]} x={lerp(1540, 1280, on(f, find - 6, 20))} y={GROUND} s={1} flip />
        <g opacity={on(f, together39, 8)}><Label x={960} y={330} text="FOUND TOGETHER" size={70} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}
      <g opacity={win(f, nobody, find - 6, 6)}><Label x={960} y={290} text="NOBODY SETS IT" size={54} font="Bebas Neue" color={P.ink} /></g>
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s25:on")} x={1380} y={760} rx={200} ry={200} />
        <Spot f={f} at={c("s25:people")} x={1380} y={760} rx={200} ry={200} />
        <Spot f={f} at={c("s26:lemonade")} x={1380} y={760} rx={200} ry={200} />
        <Spot f={f} at={c("s29:the")} x={1480} y={820} rx={230} ry={140} />
        <Spot f={f} at={c("s30:sale")} x={1480} y={820} rx={230} ry={140} />
        <Spot f={f} at={c("s32:now")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s33:a")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s34:so")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s39:economists")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s39:buyers")} x={960} y={700} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-lemon" />
    </g>
  )
}

export const EC_LEMON = makePiece('ec-lemon', 'Supply and demand with lemonade: a tug of war between buyers and sellers with a PRICE tag on the knot; a lemonade stand and a queue of ten buyers (one per 10 people), at $3 six walk away; at $1 one stand makes 4 trays of cups, at $3 two more kids open stands and the trays grow to 10; a balance of people who want a cup against cups for sale tips at $1 (SOLD OUT, price up), at $3 (60 left over, price down) and levels at $2 (70 and 70); a buyer and a seller shake hands at the $2 stand.', {
  mood: 'light', Component: Lemon,
  beats: ["s23:tug", "s23:buyers", "s23:sellers", "s24:madeup", "s24:town", "s24:stands", "s25:buyers", "s25:demand", "s25:each", "s26:1", "s26:100", "s26:3", "s26:40", "s27:goes", "s27:fewer", "s27:half", "s28:sellers", "s28:supply", "s28:other", "s28:sell", "s29:1", "s29:barely", "s29:40", "s30:3", "s30:worth", "s30:kids", "s30:100", "s31:goes", "s31:make", "s31:half", "s32:together", "s33:1", "s33:100", "s33:only", "s33:runs", "s33:line", "s34:raise", "s35:3", "s35:100", "s35:40", "s35:sixty", "s35:left", "s36:cut", "s37:2", "s37:70", "s37:make", "s38:nothing", "s38:wasted", "s39:equilibrium", "s39:nobody", "s39:find", "s39:together", "s25:on", "s25:people", "s26:lemonade", "s29:the", "s30:sale", "s32:now", "s33:a", "s34:so", "s39:economists", "s39:buyers"],
  sfx: [['s23:tug', 'swish', 0.12], ['s26:3', 'pop', 0.1], ['s30:kids', 'pop', 0.12], ['s33:runs', 'thud', 0.15], ['s37:2', 'chime', 0.18], ['s39:find', 'ding', 0.12]] })
