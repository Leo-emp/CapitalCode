// ---------------------------------------------------------------- s34–s50: the same money, again and again.
// The example player walks up with a $100 bill that turns into ten $10 chips. One chip goes on RED; the wheel spins
// and a spin counter ticks. A win drops a chip back; a loss is swept and the next chip goes on. "0 / 100 spins".
// After 10 spins a tall glass tube marked BET has filled to $100 while her own stack is still almost full beside a
// small jar marked BROUGHT. The tube is the HANDLE; a gold toll gate on its inlet shaves a sliver, the wallet jar is
// untouched. Our maths notebook opens; the tube rises to $760 while her chips circle the table again and again
// through the toll; 5.3% of it drops into the house as $40 — not one bad bet but 76 tiny slivers. A dollar coin
// loses a 5¢ sliver; her $100 bill splits and 40% of it slides into the house.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Doc, Headline, Person, hand, win } from '../aimoney/common'
import { Chip, CHIP, ChipLoop, SplitBill, Stack, Table, Wheel } from './kit'

// # a tall glass tube that fills (the handle); max = the value at the top
const Tube: React.FC<{ x: number; y: number; h: number; fill: number; label: string; value: string; o?: number; color?: string; glow?: number }> = ({ x, y, h, fill, label, value, o = 1, color = P.sky, glow = 0 }) => (
  <g opacity={o}>
    {glow > 0 && <rect x={x - 90} y={y - h - 20} width={180} height={h + 40} rx={60} fill={P.gold} opacity={0.2 * glow} />}
    <rect x={x - 70} y={y - h} width={140} height={h} rx={50} fill="#DDEBF7" opacity={0.3} stroke="#A9C4DE" strokeWidth={6} />
    <rect x={x - 56} y={y - 14 - (h - 28) * Math.min(1, fill)} width={112} height={(h - 28) * Math.min(1, fill)} rx={40} fill={color} />
    <Label x={x} y={y + 70} text={label} size={50} font="Bebas Neue" color={P.ink} />
    <Label x={x} y={y - h - 30} text={value} size={64} font="Bebas Neue" color={P.goldInk} />
  </g>
)

const Loop: React.FC<PieceProps> = ({ f, c }) => {
  const walks = c('s34:walks'), wheel = c('s34:wheel'), b100 = c('s34:100')
  const bets = c('s35:bets'), red = c('s35:red'), spin = c('s35:spin'), spin2 = c('s35:spin#2')
  const wins = c('s36:wins'), back = c('s36:back'), loses = c('s37:loses'), next = c('s37:next')
  const stop = c('s38:stop'), b100s = c('s38:100'), runs = c('s38:runs')
  const ten = c('s39:10'), bet39 = c('s39:bet'), brought = c('s39:brought')
  const almost = c('s40:almost'), front = c('s40:front'), some = c('s40:some'), won = c('s40:won'), key = c('s41:key'), not42 = c('s42:not'), same42 = c('s42:same'), total = c('s43:total'), bet43 = c('s43:bet')
  const bets42 = c('s42:bets'), brought42 = c('s42:brought')
  const handle = c('s43:handle'), charged = c('s43:charged'), wallet = c('s43:wallet')
  const worked = c('s44:worked'), exactly = c('s44:exactly'), happens = c('s44:happens'), player44 = c('s44:player'), avg45 = c('s45:average')
  const b760 = c('s45:760'), table = c('s45:table'), same = c('s45:same'), over2 = c('s45:over#2')
  const edge = c('s46:edge'), every = c('s46:every'), bets46 = c('s46:bets'), not46 = c('s46:not'), money = c('s46:money')
  const b53 = c('s47:53'), b760b = c('s47:760'), b40 = c('s47:40')
  const b40c = c('s48:40'), not48 = c('s48:not'), one48 = c('s48:one'), bad = c('s48:bad'), b76 = c('s49:76'), cuts = c('s49:cuts'), every49 = c('s49:every')
  const casino50 = c('s50:casino'), takes50 = c('s50:takes'), b5 = c('s50:5'), dollar = c('s50:dollar'), losing = c('s50:losing'), b40b = c('s50:40'), walked = c('s50:walked')
  // # phases: A = at the table (s34–s38), B = tubes (s39–s44), C = the loop to $760 (s45–s47), D = 76 cuts + the split (s48–s50)
  const A = win(f, 0, ten - 4), Bp = win(f, ten - 4, b760 - 4), Cp = win(f, b760 - 4, not48 - 2), D = on(f, not48 - 2, 10)
  const IX = lerp(-200, 360, easeInOut(span(f, walks, wheel + 10)))
  const pb: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 10], [wheel + 10, 'idle', 'smiling'], [b100, 'holdUp', 'smiling'], [bets, 'offer', 'neutral'], [wins, 'fistPump', 'smiling'], [loses, 'facepalm', 'worried'], [next, 'offer', 'neutral'], [stop, 'countOne', 'neutral']]
  const hp = hand(f, pb, IX, 1000, 0.95)
  const spins = Math.min(9, Math.floor(Math.max(0, f - spin) / 22) + (f >= spin ? 1 : 0))
  // # her stack: 10 chips; −1 on "bets", +1 on "wins" (paid), −1 on "loses", −1 on "next"
  const stackA = 10 - (f >= bets + 8 ? 1 : 0) + (f >= back ? 1 : 0) - (f >= next ? 1 : 0)
  // # the handle tube: $100 after 10 spins (B), $760 in C (rescaled: the tube's top is $760 there)
  const tubeB = easeInOut(span(f, ten, bet39 + 10))
  const tubeC = easeInOut(span(f, b760 - 20, b760 + 10)) * 0.25 + 0.75 * easeInOut(span(f, table, over2 + 10)) * (f >= table ? 1 : 0)
  return (
    <g>
      <Stage id="cs-loop" frame={f} />
      <Headline f={f} lines={[[b100, 'ONE PLAYER · $100', P.ink, 108], [spin, '$10 ON RED, SPIN AFTER SPIN', P.ink, 100], [b100s, 'STOP AT 100 SPINS…', P.ink, 100], [runs, '…OR WHEN THE MONEY RUNS OUT', P.ink, 96], [ten, 'AFTER 10 SPINS', P.ink, 108], [key, 'THAT IS THE KEY', P.goldInk, 112],
        [handle, 'THE HANDLE', P.goldInk, 120], [worked, 'OUR CALCULATION · EXAMPLE PLAYER', P.ink, 92], [b760, 'ABOUT $760 BET', P.goldInk, 112], [b53, '5.3%', P.goldInk, 120], [b760b, '5.3% × $760', P.goldInk, 116], [b40, '5.3% × $760 ≈ $40', P.goldInk, 112], [one48, 'NOT ONE BAD BET', P.ink, 108], [b76, '76 SMALL CUTS', P.goldInk, 112], [b5, '≈5¢ OF EACH $1 BET', P.ink, 104], [losing, '…BUT 40% OF HIS $100', P.coralInk, 108]]} />
      {/* # A: she walks up, her $100 becomes chips, she bets on red, the wheel spins */}
      {A > 0 && <g opacity={A} transform={camera(f, [[0, 960, 560, 1], [spin, 1000, 560, 1.06], [stop, 960, 560, 1]], 18)}>
        <Table x={960} y={720} w={1160} d={260} red={on(f, red, 8)} />
        <Wheel cx={1390} cy={800} r={130} rot={f * (f >= spin ? 3 : 0.5)} ball={f >= wins - 4 && f < loses - 4 ? 18 : -1} numbers={false} />
        <g opacity={on(f, spin, 8)}><rect x={1290} y={560} width={200} height={70} rx={14} fill={P.card} /><Label x={1390} y={612} text={f >= stop ? `${spins} / 100` : `SPIN ${spins}`} size={48} font="Bebas Neue" color={P.ink} /></g>
        <Person f={f} who="investor" beats={pb} x={IX} y={1000} s={0.95} />
        {/* # the $100 bill in her hand, then her chip stack on the rail */}
        {f >= b100 && f < bets && <g transform={`translate(${hp.x} ${hp.y - 30}) scale(0.4)`}><SplitBill x={0} y={0} lost={0} t={0} /></g>}
        <g opacity={on(f, bets - 6, 8)}><Stack x={700} y={860} n={stackA} s={0.8} color={CHIP.red} /></g>
        {/* # the chip on RED: placed on "bets"; won on "wins" (a gold chip joins and both go back); swept on "loses"; a new one on "next" */}
        {f >= bets && f < loses + 16 && <g opacity={1 - easeInOut(span(f, loses, loses + 14))}><Chip x={lerp(700, 830, easeInOut(span(f, bets, bets + 12))) + easeInOut(span(f, loses, loses + 14)) * 500} y={lerp(780, 850, easeInOut(span(f, bets, bets + 12)))} s={0.9} color={CHIP.red} label="$10" /></g>}
        {f >= wins && f < back + 10 && <Chip x={lerp(1500, 880, easeInOut(span(f, wins, wins + 12)))} y={850} s={0.9} color={CHIP.gold} label="$10" />}
        {f >= next && <Chip x={lerp(700, 830, easeInOut(span(f, next, next + 12)))} y={lerp(780, 850, easeInOut(span(f, next, next + 12)))} s={0.9} color={CHIP.red} label="$10" />}
        <g opacity={on(f, runs, 8)}><Label x={700} y={600} text="OR UNTIL $0" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, b100s, 8)}><Label x={1390} y={530} text="100 SPINS" size={44} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # B: the BET tube fills to $100 after 10 spins while her stack is still nearly whole */}
      {Bp > 0 && <g opacity={Bp}>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [almost, 'shrug', 'smiling'], [key, 'think', 'thinking'], [handle, 'point', 'neutral'], [wallet, 'pockets', 'smiling'], [worked, 'idle', 'neutral']] as Beat[]} x={300} y={1000} s={0.95} />
        <ellipse cx={620} cy={880} rx={110 * on(f, front, 10)} ry={40 * on(f, front, 10)} fill={P.gold} opacity={0.3 * (1 - on(f, key, 10))} />
        <Stack x={640} y={940} n={f >= almost ? 8 : 10} s={1.2} color={CHIP.red} />
        {f >= some && f < key && [0, 1].map((k) => <Chip key={k} x={620} y={900 - (6 + k) * 9 * 0.8} s={0.8} color={CHIP.gold} />)}
        <g opacity={on(f, brought, 8)}><Tube x={960} y={900} h={520} fill={1} label={f >= wallet ? 'YOUR WALLET' : 'BROUGHT'} value="$100" color={P.mint} /></g>
        <Tube x={1300} y={900} h={520} fill={tubeB} label={f >= handle ? 'HANDLE' : 'BET'} value={'$' + Math.round(100 * tubeB)} glow={on(f, key, 10) * (1 - on(f, bets42, 10)) + on(f, total, 10) * (1 - on(f, charged, 10))} />
        <g opacity={on(f, not42, 8) * (1 - on(f, total, 8))}><Label x={1130} y={700} text={f >= same42 ? "≠" : "?"} size={150} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, bet43, 8) * (1 - on(f, worked, 8))}><Label x={1300} y={1040} text="EVERY $10 BET ADDS UP" size={40} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, won, 8) * (1 - on(f, key, 8))}><Label x={620} y={700} text="SOME BETS WON" size={50} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # the toll gate on the tube's inlet: a sliver drips into the house on "charged" */}
        <g opacity={on(f, charged, 8)}>
          <rect x={1380} y={330} width={160} height={46} rx={12} fill={P.goldD} /><Label x={1460} y={366} text="EDGE" size={34} font="Bebas Neue" color={P.navy0} />
          {[0, 1, 2].map((k) => { const ph = ((f - charged) / 24 + k / 3) % 1; return <rect key={k} x={1450} y={390 + ph * 480} width={22} height={10} rx={3} fill={P.gold} opacity={1 - ph} /> })}
          <rect x={1400} y={890} width={120} height={50} rx={10} fill={P.navy3} />
        </g>
        <g opacity={on(f, worked, 10)} transform={`translate(1700 560) scale(${0.9 + 0.15 * on(f, happens, 12)})`}><Doc x={0} y={0} s={1} title="OUR MATHS" lines={f >= happens ? 5 : on(f, exactly, 10) > 0.5 ? 4 : 3} />
          <g opacity={on(f, player44, 8)}><circle cx={90} cy={110} r={22} fill={P.navy3} /><path d="M58 160 Q58 132 90 132 Q122 132 122 160 Z" fill={P.navy3} /></g>
          <g opacity={on(f, avg45, 8)}><Label x={0} y={250} text="ON AVERAGE" size={46} font="Bebas Neue" color={P.ink} /></g></g>
      </g>}
      {/* # C: chips circle the table; the tube climbs to $760; 5.3% falls into the house = $40 */}
      {Cp > 0 && <g opacity={Cp}>
        <ChipLoop cx={760} cy={600} rx={480} ry={230} f={f} start={b760 - 10} n={8} lap={f >= bets46 ? 60 : 90} toll={on(f, edge, 10)} />
        <g opacity={on(f, not46, 8) * (1 - on(f, b53, 8))} transform="translate(300 300)"><rect x={-80} y={-60} width={160} height={120} rx={20} fill={P.mint} opacity={0.5} /><Label x={0} y={18} text="$100" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, same, 8)}><Label x={760} y={612} text="THE SAME $100" size={60} font="Bebas Neue" color={P.ink} /></g>
        <Tube x={1500} y={960} h={620} fill={tubeC} label="HANDLE" value={`$${Math.round(100 + 660 * Math.max(0, (tubeC - 0.13) / 0.87))}`} />
        <g opacity={on(f, every, 8) * (1 - on(f, b53, 8))}><Label x={760} y={980} text="EVERY BET PAYS THE TOLL" size={56} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, money, 8) * (1 - on(f, b53, 8))}><Label x={760} y={200 + 40} text="NOT JUST THE $100" size={52} font="Bebas Neue" color={P.ink2} /></g>
        {/* # the $40 pile in the house */}
        <g opacity={on(f, b760b, 8)}><rect x={1700} y={820} width={170} height={140} rx={14} fill={P.navy3} /><rect x={1712} y={960 - 120 * on(f, b40, 20)} width={146} height={120 * on(f, b40, 20) - 10} rx={10} fill={P.gold} />
          <Label x={1785} y={790} text={f >= b40 ? '$40' : 'HOUSE'} size={64} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, b40c, 8)}><ellipse cx={1785} cy={890} rx={150 + 20 * Math.sin(f / 4)} ry={110} fill={P.gold} opacity={0.18} /><Label x={1785} y={1040} text="FROM ONE NIGHT" size={42} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # D: not one bad bet, 76 small cuts; 5¢ of each dollar; 40% of her $100 */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, casino50 - 4, 10)}>
          <ChipLoop cx={640} cy={600} rx={460} ry={230} f={f} start={b760 - 10} n={8} lap={60} toll={1} />
          <rect x={1700} y={820} width={170} height={140} rx={14} fill={P.navy3} /><rect x={1712} y={840} width={146} height={110} rx={10} fill={P.gold} /><Label x={1785} y={790} text="$40" size={64} font="Bebas Neue" color={P.goldInk} />
          <g opacity={on(f, one48, 8)} transform={`translate(640 520) scale(${pop(f, one48)})`}><Chip x={0} y={0} s={1.6} color={CHIP.red} label="$10" />
            <path d="M-110 -110 L110 110 M110 -110 L-110 110" stroke={P.coral} strokeWidth={22} strokeLinecap="round" opacity={on(f, bad, 8)} /></g>
          {Array.from({ length: 76 }, (_, k) => <rect key={k} x={1250 + (k % 12) * 52} y={260 + Math.floor(k / 12) * 56} width={36} height={14} rx={5} fill={P.gold} opacity={on(f, b76 + k * 0.5, 4)} />)}
          <g opacity={on(f, every49, 8)}><Label x={1250 + 5.5 * 52} y={690} text="ONE ON EVERY BET" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, casino50 - 4, 10)}>
          <g transform={`translate(520 560) scale(${pop(f, casino50)})`}><circle r={180} fill={P.goldD} transform="translate(0 12)" /><circle r={180} fill={P.gold} />
            <text y={44} textAnchor="middle" fill={P.navy0} style={{ font: '400 140px "Bebas Neue"' }}>$1</text>
            <path d={`M0 0 L0 -180 A180 180 0 0 1 ${180 * Math.sin(0.314)} ${-180 * Math.cos(0.314)} Z`} fill={P.coral} transform={`translate(${30 * on(f, takes50, 10)} ${-30 * on(f, takes50, 10)})`} /></g>
          <g opacity={on(f, b5, 8)}><Label x={800} y={360} text="5¢" size={90} font="Bebas Neue" color={P.coralInk} /></g>
          <SplitBill x={1300} y={560} s={1.1} lost={0.4} t={easeInOut(span(f, b40b, walked + 10))} dx={300} dy={330} o={on(f, losing - 6, 8)} />
          <g opacity={on(f, b40b, 8)}><Label x={1600} y={950} text="40% → HOUSE" size={64} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      <Vignette id="cs-loop" />
    </g>
  )
}

const BEATS = ['s40:front', 's40:some', 's42:not', 's42:same', 's43:total', 's43:bet', 's46:bets', 's46:not', 's50:casino', 's50:takes', 's44:happens', 's44:player', 's45:average', 's48:40', 's48:not', 's34:walks', 's34:wheel', 's34:100', 's35:bets', 's35:red', 's35:spin', 's35:spin#2', 's36:wins', 's36:back', 's37:loses', 's37:next', 's38:stop', 's38:100', 's38:runs', 's39:10', 's39:bet', 's39:brought',
  's40:almost', 's40:won', 's41:key', 's42:bets', 's42:brought', 's43:handle', 's43:charged', 's43:wallet', 's44:worked', 's44:exactly', 's45:760', 's45:table', 's45:same', 's45:over#2', 's46:edge', 's46:every', 's46:money',
  's47:53', 's47:760', 's47:40', 's48:one', 's48:bad', 's49:76', 's49:cuts', 's49:every', 's50:5', 's50:dollar', 's50:losing', 's50:40', 's50:walked']
export const CS_LOOP = makePiece('cs-loop', 'Casino long: example player turns $100 into chips, bets red spin after spin; the BET tube (handle) passes $100 after 10 spins; the edge tolls the handle; chips loop to $760; $40 to the house; 76 cuts; 5¢ per $1 vs 40% of $100', {
  mood: 'light', Component: Loop, beats: BEATS,
  sfx: [['s34:100', 'cash', 0.4], ['s35:bets', 'click', 0.4], ['s36:wins', 'coin', 0.45], ['s37:loses', 'swish', 0.4], ['s39:bet', 'tick', 0.3], ['s41:key', 'ding', 0.35], ['s43:charged', 'coin', 0.35], ['s45:760', 'riser', 0.3], ['s47:40', 'cash', 0.4], ['s48:bad', 'thud', 0.35], ['s49:76', 'tick', 0.3], ['s50:40', 'swish', 0.4]] })
