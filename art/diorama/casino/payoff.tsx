// ---------------------------------------------------------------- s109–s122: the whole machine in one line.
// The loop draws itself: her chips circle the table and pass the house toll on every lap. A $1 coin loses a 5¢ wedge,
// then her $100 bill loses 40%. The 5.3% toll sign stays the same while her stack goes up and down; a lap counter
// ticks up. One player walks out ahead — one figure in four lit green. A spotlight on one player fades; across many
// tables the house tray fills. The dealer smiles at a winner, who pushes his chips straight back in. Finally a free
// drink slides onto the table — standing on a little pile of her own chips.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Chip, CHIP, ChipLoop, Cocktail, SplitBill, Stack, Table, Tray } from './kit'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const machine = c('s109:machine'), line = c('s109:line')
  const cut = c('s110:cut'), every = c('s110:every'), same = c('s110:same'), again = c('s110:again#2')
  const b5 = c('s111:5'), dollar = c('s111:dollar'), b40 = c('s111:40'), brought = c('s111:brought')
  const edge = c('s112:edge'), never = c('s112:never'), winning = c('s112:winning'), losing = c('s112:losing')
  const times = c('s113:times'), cut113 = c('s113:cut')
  const walk = c('s114:walk'), ahead = c('s114:ahead'), b1 = c('s115:1'), b4 = c('s115:4')
  const betting = c('s116:betting'), you = c('s116:you'), average = c('s117:average'), millions = c('s117:millions'), pays = c('s117:pays')
  const happy = c('s118:happy'), win118 = c('s118:win'), winner = c('s119:winner'), playing = c('s119:playing')
  const casino120 = c('s120:casino'), not120 = c('s120:not'), lose = c('s120:lose'), wins = c('s121:wins'), keep = c('s121:keep')
  const free = c('s122:free'), arrives = c('s122:arrives'), table = c('s122:table'), paying = c('s122:paying')
  const A = win(f, 0, edge - 2), Bp = win(f, edge - 2, walk - 2), Cp = win(f, walk - 2, happy - 2), D = win(f, happy - 2, free - 4), E = on(f, free - 4, 10)
  return (
    <g>
      <Stage id="cs-pay" frame={f} />
      <Headline f={f} lines={[[line, 'THE WHOLE MACHINE', P.goldInk, 116], [cut, 'A SMALL CUT OF EVERY BET', P.ink, 104], [same, 'THE SAME MONEY, AGAIN AND AGAIN', P.ink, 96], [b5, '5¢ OF EACH $1 BET…', P.ink, 108], [b40, '…40% OF WHAT YOU BROUGHT', P.coralInk, 104],
        [edge, 'THE EDGE NEVER CHANGES', P.goldInk, 108], [times, 'HOW MANY TIMES IT CUTS', P.ink, 104], [walk, 'SOME WALK OUT AHEAD', P.mintInk, 104], [b1, 'ABOUT 1 IN 4', P.mintInk, 116], [betting, 'NOT ON YOU…', P.ink, 108], [average, 'THE CASINO BETS ON THE AVERAGE', P.goldInk, 96],
        [happy, 'HAPPY TO SEE YOU WIN', P.ink, 108], [winner, 'A WINNER KEEPS PLAYING', P.goldInk, 108], [lose, 'IT DOES NOT WIN WHEN YOU LOSE', P.ink, 100], [keep, 'IT WINS WHEN YOU KEEP BETTING', P.goldInk, 100], [free, '', P.ink]]} />
      {/* # A: the loop and its toll; 5¢ of a dollar → 40% of the $100 */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, b5 - 4, 10)}>
          <ChipLoop cx={960} cy={600} rx={560 * on(f, machine, 16)} ry={240 * on(f, machine, 16)} f={f} start={machine} n={f >= same ? 10 : 6} lap={f >= again ? 45 : 80} toll={on(f, cut, 10)} />
          <Tray x={960} y={1000} s={0.6} fill={0.2 + 0.5 * on(f, every, 40)} o={on(f, cut, 8)} />
        </g>
        <g opacity={on(f, b5 - 4, 10)}>
          <g transform={`translate(560 560) scale(${pop(f, b5)})`}><circle r={160} fill={P.goldD} transform="translate(0 10)" /><circle r={160} fill={P.gold} /><text y={42} textAnchor="middle" fill={P.goldD} style={{ font: '400 130px "Bebas Neue"' }}>$1</text>
            <path d={`M0 0 L0 -160 A160 160 0 0 1 ${160 * Math.sin(0.33)} ${-160 * Math.cos(0.33)} Z`} fill={P.coral} transform={`translate(${30 * on(f, dollar, 10)} ${-30 * on(f, dollar, 10)})`} /></g>
          <g opacity={on(f, dollar, 8)}><Label x={560} y={820} text="5¢" size={80} font="Bebas Neue" color={P.coralInk} /></g>
          <SplitBill x={1240} y={480} s={1.05} lost={0.4} t={easeInOut(span(f, b40, brought + 12))} dx={260} dy={360} o={on(f, b40 - 6, 8)} />
          <g opacity={on(f, b40, 8)}><Label x={1640} y={720} text="40% → HOUSE" size={90} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      {/* # B: the edge sign never changes while her stack goes up and down; laps count */}
      {Bp > 0 && <g opacity={Bp}>
        <Table x={900} y={720} w={900} d={240} />
        <g transform={`translate(1240 500) scale(${pop(f, never)})`}><rect x={-120} y={-64} width={240} height={118} rx={18} fill={P.goldD} /><Label x={0} y={24} text="5.3%" size={80} font="Bebas Neue" color={P.navy0} /></g>
        <Stack x={700} y={840} n={Math.round(10 + 6 * on(f, winning, 12) - 11 * on(f, losing, 14))} s={0.8} color={CHIP.red} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [winning, 'fistPump', 'smiling'], [losing, 'despair', 'worried'], [times, 'think', 'thinking']] as Beat[]} x={380} y={1000} s={0.95} />
        {/* # "never changes": the 5.3% tag stamps every chip in the stack, winning or losing */}
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, never + k * 3, 6)}><rect x={760} y={790 - k * 40} width={70} height={30} rx={8} fill={P.goldD} /><Label x={795} y={814 - k * 40} text="5.3%" size={26} font="Bebas Neue" color={P.navy0} /></g>)}
        {/* # "how many times": chips fly from the stack to the HOUSE tray; its counter ticks on each one */}
        <g opacity={on(f, times - 6, 8)}><Tray x={1560} y={900} s={0.8} fill={0.2 + Math.min(0.6, Math.max(0, f - times) / 200)} label="HOUSE" />
          <rect x={1460} y={680} width={200} height={90} rx={16} fill={P.card} /><Label x={1560} y={742} text={`CUTS: ${Math.max(0, Math.floor((f - times) / 12))}`} size={56} font="Bebas Neue" color={P.ink} /></g>
        {f >= times && Array.from({ length: 3 }, (_, k) => { const ph = ((f - times) / 12 + k / 3) % 1; return <rect key={k} x={lerp(760, 1540, ph)} y={lerp(760, 860, ph) - Math.sin(ph * Math.PI) * 160} width={30} height={12} rx={4} fill={P.gold} /> })}
      </g>}
      {/* # C: one walks out ahead (1 in 4); the casino bets on the average */}
      {Cp > 0 && <g opacity={Cp}>
        <g opacity={1 - on(f, betting - 14, 8)}>
          <rect x={1680} y={380} width={220} height={620} rx={20} fill={P.navy3} /><rect x={1700} y={400} width={180} height={600} rx={14} fill={P.gold} opacity={0.25} /><Label x={1790} y={360} text="EXIT" size={50} font="Bebas Neue" color={P.ink} />
          <Person f={f} who="buyer" beats={[[0, 'walkA', 'smiling', 'walkB', 10], [b1, 'celebrate', 'smiling']] as Beat[]} x={lerp(300, 1790, span(f, walk, betting - 14))} y={1000} s={0.9} />
          <g opacity={on(f, ahead, 8)}><Stack x={lerp(300, 1790, span(f, walk, betting - 14)) + 110} y={880} n={14} s={0.6} color={CHIP.blue} /></g>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, b1 + k * 3, 8)} transform={`translate(${900 + k * 150} 420)`}><circle cx={0} cy={-60} r={36} fill={k === 0 && f >= b4 ? P.mint : P.navy4} /><path d="M-50 40 Q-50 -20 0 -20 Q50 -20 50 40 Z" fill={k === 0 && f >= b4 ? P.mint : P.navy4} /></g>)}
        </g>
        <g opacity={on(f, betting - 4, 10)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling']] as Beat[]} x={330} y={760} s={0.75} />
          <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [you, 'lookFar', 'neutral'], [average, 'point', 'smug']] as Beat[]} x={600} y={760} s={0.75} />
          <Table x={460} y={700} w={620} d={220} />
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, you + k * 2, 8)}><ellipse cx={1060 + (k % 3) * 300} cy={620 + Math.floor(k / 3) * 230} rx={120} ry={52} fill="#6B4426" /><ellipse cx={1060 + (k % 3) * 300} cy={614 + Math.floor(k / 3) * 230} rx={104} ry={40} fill="#1F7A52" /><circle cx={1110 + (k % 3) * 300} cy={606 + Math.floor(k / 3) * 230} r={14} fill={P.gold} opacity={0.5 + 0.5 * Math.sin(f / 6 + k)} /></g>)}
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, millions + k * 1.5, 8) * 0}><Mini look={['buyer', 'hero', 'owner', 'worker'][k % 4]} x={860 + (k % 6) * 150} y={700 + Math.floor(k / 6) * 260} scale={1.1} frame={f} seed={k + 5} /></g>)}
          <Tray x={1600} y={1000} s={0.9} fill={0.3 + 0.6 * on(f, pays, 20)} label="HOUSE" o={on(f, average, 8)} />
        </g>
      </g>}
      {/* # D: the dealer smiles at a winner, who pushes his chips straight back in; the loop turns */}
      {D > 0 && <g opacity={D}>
        <Table x={900} y={720} w={1000} d={240} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [happy, 'present', 'smiling'], [casino120, 'pointDown', 'neutral'], [not120, 'stop', 'neutral'], [lose, 'shrug', 'neutral'], [keep, 'present', 'smug']] as Beat[]} x={1300} y={820} s={0.78} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [win118, 'celebrate', 'smiling'], [playing, 'offer', 'smiling']] as Beat[]} x={420} y={1000} s={0.95} />
        <Stack x={680} y={860} n={Math.round(8 + 6 * on(f, win118, 10))} s={0.8} color={CHIP.blue} />
        {f >= playing && [0, 1, 2].map((k) => { const t = easeInOut(span(f, playing + k * 5, playing + 16 + k * 5)); return <Chip key={k} x={lerp(680, 960, t)} y={lerp(800, 840, t) - Math.sin(t * Math.PI) * 80} s={0.8} color={CHIP.blue} /> })}
        <g opacity={on(f, wins, 8)}><ChipLoop cx={900} cy={420} rx={420} ry={110} f={f} start={wins} n={6} lap={40} toll={1} color={CHIP.blue} /></g>
      </g>}
      {/* # E: a free drink arrives — standing on a little pile of her chips */}
      {E > 0 && <g opacity={E}>
        <Table x={960} y={720} w={1100} d={260} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [arrives, 'receive', 'smiling'], [paying, 'think', 'thinking']] as Beat[]} x={400} y={1000} s={0.95} />
        {(() => { const t = easeInOut(span(f, arrives - 6, table + 6)); return <g transform={`translate(${lerp(1900, 1060, t)} 800)`}>
          <g opacity={on(f, paying - 10, 10)}>{Array.from({ length: 5 }, (_, k) => <Chip key={k} x={0} y={-k * 9 * 0.8} s={0.8} color={CHIP.red} />)}</g>
          <Cocktail x={0} y={-40 * on(f, paying - 10, 10)} s={0.9} />
        </g> })()}
        <g opacity={on(f, paying, 8)}><Label x={1060} y={1000} text="PAID FOR BY YOUR CHIPS" size={56} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}
      <Vignette id="cs-pay" />
    </g>
  )
}

const BEATS = ['s120:casino', 's120:not', 's109:machine', 's109:line', 's110:cut', 's110:every', 's110:same', 's110:again#2', 's111:5', 's111:dollar', 's111:40', 's111:brought', 's112:edge', 's112:never', 's112:winning', 's112:losing', 's113:times', 's113:cut',
  's114:walk', 's114:ahead', 's115:1', 's115:4', 's116:betting', 's116:you', 's117:average', 's117:millions', 's117:pays', 's118:happy', 's118:win', 's119:winner', 's119:playing', 's120:lose', 's121:wins', 's121:keep', 's122:free', 's122:arrives', 's122:table', 's122:paying']
export const CS_PAYOFF = makePiece('cs-payoff', 'Casino long: the loop with the house toll; 5¢ of a dollar → 40% of the $100; the 5.3% sign never changes while her stack rises and falls; laps count; 1 in 4 walk out ahead; the casino bets on the average; a winner pushes chips back in; a free drink on a pile of her chips', {
  mood: 'dark', Component: Payoff, beats: BEATS,
  sfx: [['s109:line', 'whoosh', 0.3], ['s110:cut', 'coin', 0.35], ['s111:40', 'swish', 0.4], ['s112:never', 'impact', 0.35], ['s114:walk', 'pop', 0.3], ['s117:pays', 'cash', 0.4], ['s119:playing', 'click', 0.35], ['s121:keep', 'ding', 0.35], ['s122:arrives', 'swish', 0.35], ['s122:paying', 'coin', 0.4]] })
