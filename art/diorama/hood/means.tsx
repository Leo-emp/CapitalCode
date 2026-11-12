// ---------------------------------------------------------------- s83–s96: what it means for you, and the payoff.
// A) The twist: Leo with his phone; his order slips leave it with price tags on and flow into the trading tower, and
//    coins come back to the app — his orders are what is sold.
// B) A SCAM? stamp gets crossed. The tiny hidden cost (a few cent coins) next to the old $4.95 tag — much smaller.
//    A magnifier over a routing report: check it yourself.
// C) An app paid per trade: a trade counter ticks up and the coin pile grows with it; an options contract makes the
//    biggest pile. The phone flashes like a game; every tap sends a coin to the tower's side.
// D) Payoff: the four stations light one by one as they are said; the $2.6B pile; the order slip with its price tag:
//    the trade is free, the order isn't.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, Stamp, fly, win, type Beat } from '../aimoney/common'
import { Ground, Magnifier } from '../power/kit2'
import { Stack } from '../fee/kit'
import { AppPhone, Cent, Ladder, Path, Slip, Tower, XMark } from './kit'

const GROUND = 920

const Means: React.FC<PieceProps> = ({ f, c }) => {
  const twist = c('s83:twist'), free84 = c('s84:free'), not84 = c('s84:not'), customer84 = c('s84:customer')
  const orders85 = c('s85:orders'), sells85 = c('s85:sells'), firms85 = c('s85:firms'), pay85 = c('s85:pay')
  const doesnt86 = c("s86:doesn't"), scam = c('s86:scam')
  const few = c('s87:few'), hidden = c('s87:hidden'), tiny = c('s87:tiny'), less = c('s87:less'), d4 = c('s87:4'), d95 = c('s87:95')
  const check = c('s88:check'), publishes = c('s88:publishes'), routing = c('s88:routing'), firms88 = c('s88:firms'), paid88 = c('s88:paid')
  const change = c('s89:change'), wants = c('s89:wants')
  const paid90 = c('s90:paid'), trade90 = c('s90:trade'), earns90 = c('s90:earns'), more90 = c('s90:more'), options90 = c('s90:options'), most90 = c('s90:most')
  const app91 = c('s91:app'), game = c('s91:game'), remember91 = c('s91:remember'), earns91 = c('s91:earns'), tap91 = c('s91:tap')
  const remember92 = c('s92:remember'), four92 = c('s92:four')
  const sold = c('s93:sold'), gap93 = c('s93:gap'), cut93 = c('s93:cut'), better93 = c('s93:better'), sight = c('s93:sight')
  const nothing94 = c('s94:nothing'), d26 = c('s94:26'), trading94 = c('s94:trading')
  const trade95 = c('s95:trade'), free95 = c('s95:free'), order95 = c('s95:order'), isnt = c("s95:isn't")
  const money96 = c('s96:money'), advice = c('s96:advice')
  const AB = doesnt86 - 4, BC = change - 4, CD = remember92 - 4
  const A = win(f, twist - 30, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const D2 = on(f, nothing94 - 6, 10)
  return (
    <g>
      <Stage id="hd-means" frame={f} />
      <Spot f={f} at={c("s96:not")} x={960} y={1000} rx={600} ry={60} />
      <Spot f={f} at={c("s96:advice")} x={1480} y={540} rx={200} ry={160} />
      <Spot f={f} at={c("s88:much")} x={960} y={520} rx={300} ry={240} />
      <Spot f={f} at={c("s89:wants")} x={420} y={540} rx={220} ry={280} />
      <Spot f={f} at={c("s90:app")} x={420} y={540} rx={220} ry={280} />
      <Spot f={f} at={c("s90:most")} x={1450} y={760} rx={200} ry={260} />
      <Spot f={f} at={c("s91:next")} x={420} y={540} rx={220} ry={280} />
      <Spot f={f} at={c("s91:feel")} x={420} y={540} rx={220} ry={280} />
      <Headline f={f} lines={[[twist, 'THE REAL TWIST', P.ink, 108], [customer84, 'NOT ONLY THE CUSTOMER…', P.ink, 100], [sells85, '…YOUR ORDERS ARE SOLD', P.coralInk, 104], [scam, 'NOT A SCAM', P.ink, 108], [tiny, 'USUALLY TINY', P.ink, 104], [check, 'CHECK IT YOURSELF', P.ink, 104], [change, 'BUT IT CHANGES WHAT THE APP WANTS', P.ink, 84], [more90, 'MORE TRADES = MORE MONEY', P.ink, 100], [game, '', P.ink], [tap91, 'WHO EARNS FROM EVERY TAP?', P.ink, 96], [four92, 'THE FOUR STEPS', P.ink, 108], [d26, '≈ $2.6 BILLION FROM TRADING', P.goldInk, 96], [free95, 'THE TRADE IS FREE…', P.ink, 104], [isnt, "…YOUR ORDER ISN'T", P.coralInk, 112]]} />

      {/* # A) your orders are what's sold */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="buyer" beats={[[0, 'phone', 'smiling'], [not84, 'phone', 'thinking'], [sells85, 'scratchHead', 'thinking']]} x={300} y={GROUND} s={0.85} />
        <AppPhone x={700} y={540} s={0.9} />
        <g opacity={on(f, orders85, 10)}><Tower x={1560} y={GROUND} s={0.8} f={f} sign="MARKET MAKER" /></g>
        {f >= orders85 && [0, 1, 2].map((k) => { const fl = fly(f, orders85 + k * 10, [760, 460], [1500, GROUND - 160], 26, 140); return fl.t < 1 ? <Slip key={k} x={fl.x} y={fl.y} s={0.55} tag={on(f, sells85, 6)} /> : null })}
        {f >= pay85 && [0, 1, 2].map((k) => { const fl = fly(f, pay85 + k * 6, [1500, GROUND - 420], [760, 420], 24, 140); return fl.t < 1 ? <Cent key={k} x={fl.x} y={fl.y} r={24} t="$" /> : null })}
      </g>}

      {/* # B) not a scam; tiny vs $4.95; check the report */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, few, 10)}><AppPhone x={960} y={540} s={1.0} /><Stamp x={1340} y={480} text="SCAM?" f={f} at={doesnt86} size={84} /><XMark x={1340} y={480} o={on(f, scam - 2, 6)} size={100} /></g>
        <g opacity={on(f, few, 10) * (1 - on(f, check, 10))}>
          <Person f={f} who="buyer" beats={[[0, 'phone', 'smiling']]} x={300} y={GROUND} s={0.8} />
          <g opacity={on(f, hidden, 8)}><Cent x={760} y={GROUND - 40} r={20} /><Cent x={800} y={GROUND - 40} r={20} /><Label x={780} y={GROUND + 70} text="HIDDEN COST" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d4, 8)} transform="translate(1300 520)"><line x1={0} y1={-140} x2={0} y2={-80} stroke="#8A97AA" strokeWidth={4} /><path d="M-170 -80 L170 -80 L170 100 L-170 100 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <text x={0} y={40} textAnchor="middle" fill={P.navy0} style={{ font: '400 110px "Bebas Neue"' }}>{f >= d95 ? '$4.95' : '$4'}</text>
            <Label x={0} y={170} text="THE OLD COMMISSION" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, check, 10)}>
          <g transform={`translate(960 520) scale(${lerp(0.5, 1, on(f, publishes, 14))})`}>
            <rect x={-260} y={-200} width={520} height={400} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={4} />
            <text x={0} y={-140} textAnchor="middle" fill={P.navy2} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }}>ROUTING REPORT</text>
            {['CITADEL', 'VIRTU', 'JANE ST.', 'G1'].map((nm, k) => <g key={k} opacity={on(f, publishes + k * 6, 6)}><text x={-200} y={-60 + k * 64} fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>{nm}</text><rect x={40} y={-84 + k * 64} width={60 + k * 30} height={30} rx={8} fill={P.gold} /></g>)}
          </g>
          <g opacity={on(f, paid88, 8)}><Magnifier x={1200} y={460} s={1.1}><circle r={14} fill={P.gold} /></Magnifier></g>
        </g>
      </g>}

      {/* # C) paid per trade: more trades, more money; options most; a game-like app */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {(() => { const n = Math.floor(Math.max(0, f - trade90) / 4)
          return <g>
            <AppPhone x={420} y={540} s={1.0} press={(f % 12) < 4 && f >= trade90 && f < remember91 ? 1 : 0} />
            <g opacity={on(f, trade90, 8)}><rect x={620} y={260} width={220} height={80} rx={14} fill={P.navy3} /><text x={730} y={316} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 52px "Bebas Neue"' }}>{`TRADES ${Math.min(99, n)}`}</text></g>
            <g opacity={on(f, earns90, 8)}><Stack x={1100} y={GROUND - 10} n={Math.min(16, Math.round(n / 2))} w={180} /><Label x={1100} y={GROUND + 70} text="STOCK TRADES" size={44} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, options90, 8)}><Stack x={1450} y={GROUND - 10} n={Math.min(26, n)} w={180} color={P.coral} /><Label x={1450} y={GROUND + 70} text="OPTIONS" size={48} font="Bebas Neue" color={P.ink} /></g>
            {/* # game lights on the phone */}
            <g opacity={on(f, game, 8) * (1 - on(f, tap91 + 20, 10))}>{[0, 1, 2, 3, 4, 5].map((k) => { const a = k * Math.PI / 3 + f / 10; return <circle key={k} cx={420 + Math.cos(a) * 180} cy={540 + Math.sin(a) * 250} r={14} fill={[P.gold, P.coral, P.mint][k % 3]} /> })}</g>
            <g opacity={on(f, remember91, 10)}><Tower x={1750} y={GROUND} s={0.55} f={f} sign="WHO EARNS" glow={on(f, earns91, 8)} /></g>
          </g> })()}
      </g>}

      {/* # D) the payoff: four stations, the pile, the tagged order */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={1 - D2}>
          <Path pts={[[160, GROUND - 130], [1780, GROUND - 130]]} p={span(f, four92, sight)} />
          {([[sold, 'ORDER SOLD'], [gap93, 'THE GAP'], [cut93, 'THE CUT'], [better93, 'OUT OF SIGHT']] as [number, string][]).map(([at, t], k) => {
            const x = 420 + k * 400, lit = on(f, at, 8)
            return <g key={k} opacity={0.25 + 0.75 * lit} transform={`translate(${x} ${GROUND - 130 - 16 * pop(f, at, 14)})`}>
              {k === 0 && <Slip x={0} y={-130} s={1.1} tag={1} />}
              {k === 1 && <g transform="translate(0 -140) scale(0.42)"><Ladder x={0} y={0} gap={180} spread={1} /></g>}
              {k === 2 && <g><Cent x={-40} y={-110} r={42} t="$" /><Cent x={40} y={-140} r={34} t="$" /></g>}
              {k === 3 && <g><circle cx={0} cy={-120} r={56} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="10 8" /><Cent x={0} y={-120} r={26} o={0.35} /></g>}
              <circle cx={0} cy={60} r={36} fill={[P.mint, P.gold, P.sky, P.coral][k]} />
              <text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
              <Label x={0} y={150} text={t} size={46} font="Bebas Neue" color={P.ink} />
            </g> })}
        </g>
        <g opacity={D2}>
          <AppPhone x={520} y={540} s={1.0} zero={1} />
          <Stack x={1000} y={GROUND - 10} n={Math.round(lerp(6, 22, on(f, d26, 26)))} w={220} />
          <g opacity={on(f, d26, 8)}><Label x={1000} y={GROUND + 70} text="≈ $2.6B" size={64} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, order95, 8)} transform={`translate(1480 ${lerp(560, 500, on(f, isnt, 14))})`}><Slip x={0} y={0} s={1.5} tag={on(f, isnt, 8)} /></g>
          <g opacity={on(f, money96, 8)}><Label x={960} y={GROUND + 120} text="HOW THE MONEY WORKS · NOT INVESTMENT ADVICE" size={38} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      <Vignette id="hd-means" />
    </g>
  )
}

const BEATS = ['s96:not', 's96:advice', "s88:much", "s89:wants", "s90:app", "s90:most", "s91:next", "s91:feel", 's83:twist', 's84:free', 's84:not', 's84:customer', 's85:orders', 's85:sells', 's85:pay', "s86:doesn't", 's86:scam', 's87:few', 's87:hidden', 's87:tiny', 's87:4', 's87:95', 's88:check', 's88:publishes', 's88:firms', 's88:paid', 's89:change', 's90:trade', 's90:earns', 's90:more', 's90:options', 's91:game', 's91:remember', 's91:earns', 's91:tap', 's92:remember', 's92:four', 's93:sold', 's93:gap', 's93:cut', 's93:better', 's93:sight', 's94:nothing', 's94:26', 's95:free', 's95:order', "s95:isn't", 's96:money']
export const HD_MEANS = makePiece('hd-means', 'PFOF long ch7 + payoff: Leo\'s order slips leave with price tags and flow to the market maker while coins come back (your orders are sold); SCAM? stamp crossed; a tiny hidden cost vs the old $4.95 tag; a magnifier on a routing report; trades tick up and the coin piles grow, options biggest; game lights on the phone; who earns from every tap; the four stations light one by one; ≈$2.6B; the order slip with a price tag — the trade is free, your order isn\'t', {
  mood: 'light', Component: Means, beats: BEATS,
  sfx: [['s85:sells', 'pop', 0.2], ['s86:scam', 'swish', 0.25], ['s87:95', 'pop', 0.2], ['s88:paid', 'ding', 0.2], ['s90:options', 'cash', 0.25], ['s93:sold', 'pop', 0.2], ['s94:26', 'cash', 0.3], ["s95:isn't", 'thud', 0.3]] })
