// ---------------------------------------------------------------- s62–s73: why winners still lose.
// Back to the example player. A field of 100 players like her (our calculation): 47 light green after the first spin,
// 85 have been green at some point, but after 100 spins only 25 are still green and 50 have gone grey with an empty
// tray. Her stack grows early while the toll sign on the table keeps reading 5.3%; she sits down and stays. The door:
// a player leaves with a small stack, a ghost of the bigger one he had earlier behind him. Her winnings ride the loop
// back into play through the same 5.3% toll; she cheers while the house tray fills; one chip gets a tick (she doesn't
// have to lose it) and the loop spins faster on "keep betting".
import React from 'react'
import { easeInOut, lerp, on, P, pop, rnd, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Headline, Person, win, Tick } from '../aimoney/common'
import { Chip, CHIP, ChipLoop, Stack, Table, Tray } from './kit'

// # a fixed shuffle of 100 players so the same dots stay "ahead" from beat to beat
const ORDER = Array.from({ length: 100 }, (_, i) => i).sort((a, b) => rnd(a * 3.1 + 7) - rnd(b * 3.1 + 7))
const rank = new Map(ORDER.map((i, k) => [i, k]))

const Winners: React.FC<PieceProps> = ({ f, c }) => {
  const back = c('s62:back'), b100 = c('s62:100')
  const half = c('s63:half'), up = c('s63:up'), first = c('s63:first')
  const calc = c('s64:calculation'), b85 = c('s64:85'), b100b = c('s64:100'), ahead = c('s64:ahead'), night = c('s64:night')
  const b100s = c('s65:100'), b1 = c('s65:1'), b4 = c('s65:4'), still = c('s65:still')
  const half66 = c('s66:half'), lost = c('s66:lost'), whole = c('s66:whole')
  const early = c('s67:early'), change = c('s67:change'), maths = c('s67:maths')
  const keeps = c('s68:keeps'), table = c('s68:table')
  const left = c('s69:left'), less = c('s69:less'), up69 = c('s69:up'), why = c('s69:why')
  const chip = c('s70:chip'), wins = c('s70:wins'), play = c('s70:play'), same = c('s70:same'), toll = c('s70:toll')
  const wins71 = c('s71:wins'), win71 = c('s71:win')
  const lose = c('s72:lose'), single = c('s72:single'), keep = c('s73:keep'), betting = c('s73:betting')
  const A = win(f, 0, early - 2), Bp = win(f, early - 2, chip - 2), Cp = on(f, chip - 2, 10)
  // # the field of 100: green = ahead now, coral = lost everything
  const spins65 = c('s65:spins')
  const greenN = f >= spins65 ? Math.round(lerp(85, 25, easeInOut(span(f, spins65, b4)))) : f >= b85 ? Math.round(lerp(47, 85, easeInOut(span(f, b85, ahead)))) : f >= up ? Math.round(47 * easeInOut(span(f, up, first))) : 0
  const bustN = f >= half66 ? Math.round(50 * easeInOut(span(f, half66, lost + 6))) : 0
  return (
    <g>
      <Stage id="cs-win" frame={f} />
      <Headline f={f} lines={[[back, 'OUR PLAYER · $100', P.ink, 108], [half, 'UP AFTER 1 SPIN: ALMOST HALF', P.mintInk, 100], [b85, '85 IN 100 AHEAD AT SOME POINT', P.mintInk, 100], [b100s, 'BUT AFTER 100 SPINS…', P.ink, 104], [b1, '…ONLY 1 IN 4 STILL AHEAD', P.mintInk, 100], [half66, 'HALF LOST THE WHOLE $100', P.coralInk, 100],
        [early, 'WINNING EARLY…', P.mintInk, 108], [change, '…DOES NOT CHANGE THE MATHS', P.ink, 104], [left, 'UP EARLIER, LESS AT THE END', P.ink, 100], [chip, 'WINNINGS GO BACK IN', P.ink, 104], [toll, 'SAME 5.3% TOLL', P.goldInk, 112], [wins71, 'THE CASINO WINS EVEN WHEN YOU WIN', P.goldInk, 92], [keep, 'IT NEEDS YOU TO KEEP BETTING', P.goldInk, 100]]} />
      {/* # A: the field of 100 players */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [up, 'fistPump', 'smiling'], [still, 'think', 'thinking'], [lost, 'despair', 'worried']] as Beat[]} x={300} y={1000} s={0.95} />
        <g opacity={on(f, back, 8) * (1 - on(f, half, 8))}><Stack x={560} y={900} n={10} s={0.8} color={CHIP.red} /></g>
        {Array.from({ length: 100 }, (_, i) => {
          const k = rank.get(i)!, col = i % 10, row = Math.floor(i / 10), x = 760 + col * 98, y = 300 + row * 72
          const isGreen = k < greenN, isBust = !isGreen && k >= 100 - bustN
          const appear = on(f, half + i * 0.25, 8)
          return <g key={i} opacity={appear} transform={`translate(${x} ${y}) scale(${isGreen ? 1.12 : 1})`}>
            <circle cx={0} cy={-22} r={13} fill={isGreen ? P.mint : isBust ? '#8A97AA' : P.navy4} />
            <path d="M-18 14 Q-18 -8 0 -8 Q18 -8 18 14 Z" fill={isGreen ? P.mint : isBust ? '#8A97AA' : P.navy4} />
          </g>
        })}
        <g opacity={on(f, b100b, 8) * (1 - on(f, b4, 8))}><Label x={760 + 4.5 * 98} y={1040} text="100 PLAYERS LIKE HIM · OUR CALCULATION" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, calc, 8) * (1 - on(f, b4, 8))} transform={`translate(300 300) scale(${pop(f, calc)})`}><rect x={-90} y={-110} width={180} height={220} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={3} />{[0, 1, 2, 3].map((k) => <rect key={k} x={-60} y={-70 + k * 40} width={120 - (k % 2) * 40} height={12} rx={6} fill="#C8B994" />)}</g>
        <g opacity={on(f, b4, 8) * (1 - on(f, whole, 8))}><Label x={760 + 4.5 * 98} y={1040} text="25 OF 100 STILL AHEAD" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, whole, 8) * (1 - on(f, early - 6, 6))}><Label x={760 + 4.5 * 98} y={1040} text="50 LOST THE WHOLE $100" size={52} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # B: an early win changes nothing; she stays; the exit door */}
      {Bp > 0 && <g opacity={Bp}>
        <Table x={900} y={720} w={900} d={240} />
        {/* # the toll sign on the table never changes */}
        <g opacity={on(f, change, 8)} transform={`translate(1200 520) scale(${pop(f, change)})`}><rect x={-110} y={-60} width={220} height={110} rx={18} fill={P.goldD} /><Label x={0} y={22} text="5.3%" size={72} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, maths, 8)}><Label x={1200} y={430} text="EVERY BET" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <Stack x={700} y={840} n={Math.round(10 + 6 * on(f, early, 16))} s={0.8} color={CHIP.red} />
        <Person f={f} who="investor" beats={[[0, 'fistPump', 'smiling'], [keeps, 'confident', 'smiling'], [left, 'idle', 'neutral']] as Beat[]} x={lerp(380, 520, on(f, keeps, 12))} y={1000} s={0.95} />
        {/* # the exit: a player leaves with less than the ghost stack he had earlier */}
        <g opacity={on(f, left, 10)}>
          <rect x={1560} y={360} width={240} height={620} rx={20} fill={P.navy3} /><rect x={1580} y={380} width={200} height={600} rx={14} fill={P.gold} opacity={0.25} />
          <Label x={1680} y={340} text="EXIT" size={50} font="Bebas Neue" color={P.ink} />
          <Person f={f} who="buyer" beats={[[0, 'walkA', 'worried', 'walkB', 10]] as Beat[]} x={lerp(1300, 1660, span(f, left, why + 20))} y={1000} s={0.8} />
          <g opacity={on(f, up69, 8) * 0.35}><Stack x={1380} y={760} n={12} s={0.6} color={CHIP.blue} /><Label x={1380} y={600} text="EARLIER" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, less, 8)}><Stack x={lerp(1300, 1660, span(f, left, why + 20)) + 60} y={880} n={3} s={0.6} color={CHIP.blue} /></g>
        </g>
      </g>}
      {/* # C: her winnings ride the loop back through the toll; the house fills while she cheers; keep betting */}
      {Cp > 0 && <g opacity={Cp}>
        <ChipLoop cx={820} cy={560} rx={480} ry={220} f={f} start={chip} n={f >= keep ? 12 : 8} lap={f >= keep ? 45 : 80} toll={on(f, same, 10)} color={CHIP.gold} />
        <g opacity={on(f, toll, 8)}><Label x={820} y={560 + 220 + 130} text="5.3%" size={70} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, wins, 8)}><Label x={820} y={575} text="HIS WINNINGS" size={56} font="Bebas Neue" color={P.ink} /></g>
        <Tray x={1560} y={900} s={0.8} fill={0.2 + 0.6 * on(f, wins71, 40)} label="HOUSE" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [wins, 'fistPump', 'smiling'], [win71, 'celebrate', 'smiling'], [lose, 'thumbsUp', 'smiling'], [keep, 'offer', 'smiling']] as Beat[]} x={1560} y={720} s={0.75} />
        <g opacity={on(f, single, 8) * (1 - on(f, keep, 8))} transform="translate(300 300)"><Chip x={0} y={0} s={1.6} color={CHIP.red} label="$10" /><Tick x={90} y={-60} o={on(f, single, 8)} r={44} /></g>
        <g opacity={on(f, play, 8) * (1 - on(f, single - 4, 8))}><Label x={300} y={300} text="BACK INTO PLAY" size={52} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, betting, 8)}><Label x={300} y={300} text="KEEP BETTING" size={64} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}
      <Vignette id="cs-win" />
    </g>
  )
}

const BEATS = ['s65:spins', 's64:calculation', 's62:back', 's62:100', 's63:half', 's63:up', 's63:first', 's64:85', 's64:100', 's64:ahead', 's64:night', 's65:100', 's65:1', 's65:4', 's65:still', 's66:half', 's66:lost', 's66:whole',
  's67:early', 's67:change', 's67:maths', 's68:keeps', 's68:table', 's69:left', 's69:less', 's69:up', 's69:why', 's70:chip', 's70:wins', 's70:play', 's70:same', 's70:toll', 's71:wins', 's71:win', 's72:lose', 's72:single', 's73:keep', 's73:betting']
export const CS_WINNERS = makePiece('cs-winners', 'Casino long: 100 players like her — 47 up after one spin, 85 ahead at some point, 25 at the end, 50 bust; an early win changes nothing (5.3% sign); the exit with less; winnings loop back through the toll; the house fills while she cheers', {
  mood: 'light', Component: Winners, beats: BEATS,
  sfx: [['s63:up', 'pop', 0.3], ['s64:85', 'chime', 0.3], ['s65:4', 'thud', 0.35], ['s66:lost', 'thud', 0.35], ['s67:change', 'click', 0.35], ['s69:left', 'whoosh', 0.3], ['s70:toll', 'coin', 0.4], ['s71:wins', 'cash', 0.4], ['s73:keep', 'swish', 0.35]] })
