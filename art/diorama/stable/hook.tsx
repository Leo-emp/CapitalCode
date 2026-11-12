// ---------------------------------------------------------------- s1–s8: the hook.
// A) The coin company's glass office and a burger shop stand side by side; on "profit" a gold stack grows by each;
//    "10 billion" — Tether's stack towers; "8.6 billion" — the burger shop's is lower.
// B) The burger shop slides away. A burger on a tray at the office door gets a soft cross ("doesn't sell burgers"),
//    then a shopping bag ("anything you can hold"). "A coin": one big sky-blue coin turns in; "one dollar": a bill
//    slides beside it.
// C) Maya walks in holding a dollar; the vault appears; on "hand over" the bill flies into the vault and a coin flies
//    back to her hand.
// D) The vault door swings open: her dollar is inside, and little interest coins rise from it day after day (a day
//    counter turns); on "not for you" the coins drift off to the coin company, one that heads to Maya is crossed.
// E) Four stations along a dashed route — vault, government, interest, holder — pop in on "four simple steps";
//    a dollar travels the route; "who gets paid?".
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { GovBuilding, Stack } from '../fee/kit'
import { BurgerShop, Burger, CoinHQ, Cross, Dollar, Route, SCoin, Sprouts, Vault } from './kit'

const GROUND = 920

// # a shopping bag (anything you can hold)
const Bag: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-40 -70 Q-40 -110 0 -110 Q40 -110 40 -70" fill="none" stroke="#8E5B3A" strokeWidth={10} />
    <rect x={-70} y={-80} width={140} height={150} rx={14} fill="#E7A248" /><rect x={-70} y={-80} width={140} height={22} rx={10} fill="#C98436" />
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const crypto = c('s1:crypto'), profit1 = c('s1:profit'), mcd1 = c("s1:mcdonald's")
  const s2 = c('s2'), d10 = c('s2:10'), mcd2 = c("s2:mcdonald's"), d86 = c('s2:86'), profit2 = c('s2:profit')
  const s3 = c('s3'), sell = c('s3:sell'), burgers = c('s3:burgers'), anything = c('s3:anything'), hold3 = c('s3:hold')
  const coin4 = c('s4:coin'), worth = c('s4:worth'), exactly = c('s4:exactly'), one4 = c('s4:one'), dollar4 = c('s4:dollar')
  const s5 = c('s5'), real = c('s5:real'), people = c('s5:people'), hand5 = c('s5:hand'), coins5 = c('s5:coins')
  const s6 = c('s6'), hold6 = c('s6:hold'), dollar6 = c('s6:dollar'), earning = c('s6:earning'), interest = c('s6:interest'), every = c('s6:every'), day = c('s6:day')
  const not7 = c('s7:not'), you7 = c('s7:you')
  const s8 = c('s8'), follow = c('s8:follow'), four = c('s8:four'), simple = c('s8:simple'), steps = c('s8:steps'), who = c('s8:who'), paid = c('s8:paid')
  // # the stretches: A two companies, B what it sells, C Maya hands a dollar over, D the dollar earns, E the four steps
  const AB = s3, BC = c('s5:big'), CE = four - 4
  const A = win(f, 0, AB + 10), B = win(f, AB, BC), CD = win(f, BC, CE), E = on(f, CE, 10)
  // # Maya: walks in holding a dollar, hands it over, gets a coin back, holds it, shrugs at "not for you"
  const mayaX = lerp(-200, 340, on(f, s5, 28))
  const maya: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 12], [s5 + 26, 'hold', 'smiling'], [hand5, 'offer', 'smiling'], [coins5, 'receive', 'smiling'], [hold6, 'hold', 'smiling'], [not7, 'shrug', 'worried'], [you7 + 8, 'crossNoA', 'worried', 'crossNoB', 14]]
  const mh = hand(f, maya, mayaX, GROUND, 0.82)
  const billFly = fly(f, hand5 + 4, [mh.x, mh.y], [960, GROUND - 230], 20, 160)
  const coinFly = fly(f, coins5, [960, GROUND - 300], [mh.x, mh.y], 18, 140)
  return (
    <g>
      <Stage id="sc-hook" frame={f} />
      <Headline f={f} lines={[[profit1, "MORE PROFIT THAN McDONALD'S", P.ink, 88], [d10, 'TETHER: $10 BILLION+ PROFIT', P.ink, 92], [d86, "McDONALD'S: $8.6 BILLION", P.ink, 92], [s3, '', P.ink], [one4, '1 COIN = 1 DOLLAR', P.ink, 104], [s5, '', P.ink], [interest, 'EARNING INTEREST…', P.ink, 100], [not7, '…JUST NOT FOR YOU', P.coralInk, 108], [four, '4 SIMPLE STEPS', P.ink, 104], [who, 'WHO GETS PAID?', P.ink, 104]]} />

      {/* # "In 2025": the year turns over on a calendar, then makes way for the two companies */}
      <g opacity={win(f, 0, crypto + 8)}><Calendar x={960} y={500} text="2025" s={1.6} flip={on(f, 4, 14)} /></g>
      {/* # A + B) the coin company's office stays while the burger shop leaves */}
      {(A > 0 || B > 0) && <g opacity={Math.max(A, B)}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${lerp(40, 0, pop(f, crypto, 16))})`} opacity={on(f, crypto, 10)}><CoinHQ x={lerp(560, 640, on(f, s3, 20))} y={GROUND} s={0.95} sign="TETHER" /></g>
        {/* # the two profit stacks: they grow on their numbers */}
        <g opacity={A}>
          <g opacity={on(f, profit1, 10)}><Stack x={900} y={GROUND - 10} n={Math.round(lerp(4, 22, on(f, d10, 26)))} w={150} /></g>
          <g opacity={on(f, profit2, 6) * (1 - on(f, profit2 + 24, 10))}><ellipse cx={900} cy={GROUND - 260} rx={130} ry={260} fill={P.gold} opacity={0.25} /></g>
          <g opacity={on(f, d10, 8)}><Label x={900} y={GROUND + 70} text="$10B+" size={60} font="Bebas Neue" color={P.goldInk} /></g>
          <g transform={`translate(${lerp(0, 900, on(f, s3, 22))} 0)`}>
            <g transform={`translate(0 ${lerp(40, 0, pop(f, mcd1, 16)) - 18 * pop(f, mcd2, 10) * (1 - on(f, mcd2 + 12, 8))})`} opacity={on(f, mcd1, 10)}><BurgerShop x={1400} y={GROUND} s={0.9} /></g>
            <g opacity={on(f, mcd1, 10)}><Label x={1400} y={GROUND + 70} text="McDONALD'S" size={52} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, profit1, 10)}><Stack x={1690} y={GROUND - 10} n={Math.round(lerp(4, 17, on(f, d86, 26)))} w={150} /></g>
            <g opacity={on(f, d86, 8)}><Label x={1690} y={GROUND + 70} text="$8.6B" size={60} font="Bebas Neue" color={P.goldInk} /></g>
          </g>
        </g>
        {/* # B) not burgers, not anything you can hold — then the coin */}
        <g opacity={B * (1 - on(f, coin4, 10))}>
          <g opacity={on(f, burgers, 8)} transform={`translate(1060 ${GROUND - 180})`}>
            <rect x={-110} y={30} width={220} height={20} rx={10} fill="#8A97AA" /><Burger x={0} y={0} s={1.1} />
            <Cross x={0} y={-10} o={on(f, burgers + 12, 8)} size={64} />
          </g>
          <g opacity={on(f, anything, 8)}><Bag x={1380} y={GROUND - 120} s={1.1} /><Cross x={1380} y={GROUND - 140} o={on(f, hold3, 8)} size={64} /></g>
        </g>
        <g opacity={on(f, coin4, 10) * B}>
          <SCoin x={1140} y={lerp(330, 520, on(f, coin4, 20))} s={lerp(1.2, 2.8, on(f, coin4, 20))} spin={Math.max(0, 1 - span(f, coin4, worth)) * 2} glow={on(f, exactly, 10) * (1 - on(f, dollar4 + 20, 20))} />
          <g opacity={on(f, one4, 8)}><Label x={1370} y={560} text="=" size={130} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, dollar4, 8)} transform={`translate(${lerp(1800, 1620, on(f, dollar4, 14))} 520)`}><Dollar x={0} y={0} s={1.3} r={-4} /></g>
        </g>
      </g>}

      {/* # C + D) Maya, her dollar, the vault, the interest that goes elsewhere */}
      {CD > 0 && <g opacity={CD}>
        <Ground y={GROUND} />
        <g opacity={on(f, real, 10)} transform={`translate(0 ${lerp(40, 0, pop(f, real, 16))})`}>
          <Vault x={960} y={GROUND} s={0.95} door={on(f, dollar6, 18)} fill={on(f, hand5 + 22, 10) * 0.18} label="REAL DOLLARS" />
        </g>
        {/* # her dollar: in her hand, then flying into the vault */}
        {f < hand5 + 4 && <g opacity={on(f, people, 8)}><Dollar x={mh.x} y={mh.y - 20} s={0.55} r={-8} /></g>}
        {f >= hand5 + 4 && billFly.t < 1 && <Dollar x={billFly.x} y={billFly.y} s={0.55} r={-8 + 20 * billFly.t} o={billFly.o} />}
        {/* # the coin coming back, then held */}
        {f >= coins5 && coinFly.t < 1 && <SCoin x={coinFly.x} y={coinFly.y} s={0.6} spin={coinFly.t * 2} />}
        {f >= coins5 + 18 && <SCoin x={mh.x} y={mh.y - 30} s={0.6} />}
        <Person f={f} who="investorF" beats={maya} x={mayaX} y={GROUND} s={0.82} />
        <g opacity={on(f, people, 8) * (1 - on(f, s6, 8))}><Label x={mayaX} y={GROUND + 70} text="MAYA" size={48} font="Bebas Neue" color={P.ink2} /></g>
        {/* # interest sprouting from the dollar in the vault, day after day */}
        <g opacity={on(f, interest, 8) * (1 - on(f, not7 + 10, 10))}><Sprouts x={960} y={GROUND - 110} n={6} t={(f - interest) / 40} spread={180} /></g>
        <g opacity={on(f, every, 8) * (1 - on(f, s8 - 8, 8))}><Calendar x={1290} y={GROUND - 560} text={`DAY ${1 + Math.max(0, Math.floor((f - every) / 8))}`} s={1.0} flip={((f - every) % 8) / 8} /></g>
        {/* # the coin company: where the interest goes */}
        <g opacity={on(f, earning, 10)} transform={`translate(0 ${lerp(40, 0, pop(f, earning, 16))})`}><CoinHQ x={1620} y={GROUND} s={0.8} sign="COIN COMPANY" /></g>
        {f >= not7 && [0, 1, 2, 3].map((k) => { const fl = fly(f, not7 + k * 5, [960 + (k - 1.5) * 50, GROUND - 380], [1620, GROUND - 330], 22, 120); return fl.t < 1 ? <g key={k} opacity={fl.o} transform={`translate(${fl.x} ${fl.y})`}><circle r={16} fill={P.gold} /><circle r={11} fill="none" stroke={P.goldD} strokeWidth={3} /></g> : null })}
        {/* # one coin starts toward Maya and is crossed out */}
        <g opacity={on(f, not7, 6) * (1 - on(f, s8 - 8, 8))}>
          <g transform={`translate(${lerp(820, 640, on(f, not7, 12))} ${GROUND - 420})`}><circle r={22} fill={P.gold} /><circle r={15} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
          <Cross x={640} y={GROUND - 420} o={on(f, you7, 8)} size={48} />
        </g>
      </g>}

      {/* # E) the four steps: a dollar's route through four stations */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <Route pts={[[180, GROUND - 120], [560, GROUND - 120], [960, GROUND - 120], [1360, GROUND - 120], [1760, GROUND - 120]]} p={span(f, four - 4, steps + 30)} />
        {([[560, four, 'REAL DOLLARS IN'], [960, four + 6, 'LENT OUT'], [1360, simple, 'INTEREST'], [1760, steps, 'HOLDER']] as [number, number, string][]).map(([x, at, t], k) => (
          <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${GROUND - 120 - 20 * (1 - pop(f, at, 14))})`}>
            {k === 0 && <Vault x={0} y={-30} s={0.42} fill={0.5} />}
            {k === 1 && <GovBuilding x={0} y={-30} s={0.5} />}
            {k === 2 && <g><Stack x={0} y={-36} n={7} w={110} /></g>}
            {k === 3 && <g><SCoin x={0} y={-110} s={1.2} /></g>}
            <circle cx={0} cy={60} r={36} fill={[P.sky, P.navy3, P.gold, P.coral][k]} />
            <text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
            <Label x={0} y={150} text={t} size={44} font="Bebas Neue" color={P.ink} />
          </g>))}
        {/* # one dollar travels the route */}
        {(() => { const t = span(f, four, paid + 20), xs = [180, 560, 960, 1360, 1760], i = Math.min(3, Math.floor(t * 4)), u = t * 4 - i
          return <Dollar x={lerp(xs[i], xs[i + 1], u)} y={GROUND - 330 - Math.sin(u * Math.PI) * 40} s={0.7} o={on(f, four, 8)} /> })()}
      </g>}
      <Vignette id="sc-hook" />
    </g>
  )
}

const BEATS = ['s1:crypto', 's1:profit', "s1:mcdonald's", 's2:10', 's2:profit', "s2:mcdonald's", 's2:86', 's3', 's3:burgers', 's3:anything', 's3:hold', 's4:coin', 's4:one', 's4:dollar', 's5', 's5:real', 's5:people', 's5:hand', 's5:coins', 's6:hold', 's6:dollar', 's6:earning', 's6:interest', 's6:every', 's7:not', 's7:you', 's8:follow', 's8:four', 's8:simple', 's8:steps', 's8:paid']
export const SC_HOOK = makePiece('sc-hook', 'Stablecoin long hook: the coin company out-earns a burger shop ($10B+ vs $8.6B); it sells no burgers, just a coin worth $1; Maya hands over a real dollar and gets a coin; her dollar earns interest in the vault day after day — the coins drift to the company, not to her; four steps along a route', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:crypto', 'pop', 0.2], ['s2:10', 'cash', 0.3], ['s3:burgers', 'swish', 0.2], ['s4:coin', 'coin', 0.3], ['s5:hand', 'whoosh', 0.25], ['s6:interest', 'ding', 0.25], ['s7:not', 'swish', 0.25], ['s8:four', 'pop', 0.25]] })
