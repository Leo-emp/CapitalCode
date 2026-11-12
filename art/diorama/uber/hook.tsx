// ---------------------------------------------------------------- s1–s9: the hook.
// A) A city street; a ride car crosses; riders fill the pavement (202 million a month). The car's $20 tag peels to show
//    a hidden discount coupon under it.
// B) 2019: a red pile of lost money (−$8.6B) beside a long line of tiny trip tokens (6.9 billion); the pile breaks into
//    one red coin per trip: −$1.25 each.
// C) A rider pays a $20 bill that falls short of a taller "real cost" outline; on "someone else did" a money bag slides
//    in and fills the gap; on "billions" it swells. Six calendar pages flip by: six years in a row.
// D) The four steps as stations: the fare splits · the costs · who paid · why it stopped.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { Stack } from '../fee/kit'
import { Mini } from '../../rig/Mini'
import { CityRoad, Coin2, CostTile, FareBill, MoneyBag, RideCar } from './kit'

const GROUND = 920
const LOOKS = ['buyer', 'investorF', 'hero', 'investor', 'worker', 'owner']

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const d202 = c('s1:202'), people = c('s1:people'), uber1 = c('s1:uber'), month = c('s1:month')
  const years2 = c('s2:years'), rides2 = c('s2:rides'), hidden = c('s2:hidden'), discount = c('s2:discount')
  const s3 = c('s3'), lost3 = c('s3:lost'), d86 = c('s3:86'), business = c('s3:business')
  const handled = c('s4:handled'), d69 = c('s4:69'), trips4 = c('s4:trips'), food = c('s4:food')
  const divide = c('s5:divide'), lost5 = c('s5:lost'), d25 = c('s5:25'), every5 = c('s5:every')
  const took = c('s6:took'), didnt = c("s6:didn't"), full = c('s6:full'), ride6 = c('s6:ride')
  const someone = c('s7:someone'), else7 = c('s7:else'), billions = c('s7:billions')
  const oneoff = c('s8:oneoff'), six = c('s8:six'), row = c('s8:row')
  const follow = c('s9:follow'), four = c('s9:four'), simple = c('s9:simple'), steps = c('s9:steps'), who = c('s9:who'), stopped = c('s9:stopped')
  const AB = s3 - 4, BC = took - 6, CD = follow - 6
  const A = win(f, 0, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  return (
    <g>
      <Stage id="ub-hook" frame={f} />
      <Headline f={f} lines={[[d202, '≈ 202 MILLION PEOPLE A MONTH', P.ink, 92], [hidden, 'A HIDDEN DISCOUNT', P.ink, 104], [d86, '2019: −$8.6 BILLION', P.coralInk, 104], [d69, '≈ 6.9 BILLION TRIPS', P.ink, 104], [d25, '−$1.25 ON EVERY TRIP', P.coralInk, 104], [didnt, '', P.ink], [else7, 'SOMEONE ELSE PAID', P.ink, 104], [six, 'SIX YEARS IN A ROW', P.ink, 104], [four, '4 SIMPLE STEPS', P.ink, 104]]} />

      {/* # A) the street, the car, the riders, the hidden discount */}
      {A > 0 && <g opacity={A}>
        <CityRoad y={GROUND + 60} f={f} />
        <RideCar x={lerp(-200, 1000, span(f, 0, hidden))} y={GROUND} s={1.1} f={f} />
        {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, d202 + k * 2, 6)}><Mini look={LOOKS[k % 6]} x={140 + k * 150} y={GROUND - 70} scale={0.6} frame={f} seed={k + 1} mood="happy" /></g>)}
        {/* # the price tag on the car, and the coupon under it */}
        <g opacity={on(f, rides2, 8)} transform={`translate(1060 ${GROUND - 300})`}>
          <g transform={`rotate(${lerp(0, -40, on(f, hidden, 12))}) translate(${lerp(0, -60, on(f, hidden, 12))} 0)`}><rect x={-80} y={-40} width={160} height={80} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text x={0} y={18} textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"' }}>$20</text></g>
          <g opacity={on(f, discount, 8)} transform="translate(60 40)"><path d="M-80 -36 L80 -36 L80 -12 Q66 0 80 12 L80 36 L-80 36 L-80 12 Q-66 0 -80 -12 Z" fill={P.coral} /><text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>DISCOUNT</text></g>
        </g>
      </g>}

      {/* # B) 2019: the red pile, the trips, one red coin per trip */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, lost3, 10) * (1 - on(f, lost5, 14))}><Stack x={420} y={GROUND - 10} n={Math.round(lerp(3, 18, on(f, d86, 26)))} w={220} color={P.coral} />
          <g opacity={on(f, business, 8)}><Label x={420} y={GROUND + 70} text="LOST RUNNING THE BUSINESS" size={42} font="Bebas Neue" color={P.ink2} /></g></g>
        {/* # trips: a long line of small cars */}
        <g opacity={on(f, handled, 10)}>{Array.from({ length: 18 }, (_, k) => <g key={k} opacity={on(f, d69 + k, 6)} transform={`translate(${780 + (k % 6) * 180} ${GROUND - 40 - Math.floor(k / 6) * 150 - 16 * pop(f, every5 + (k % 6) * 2, 12) - 12 * pop(f, c('s5:trip') + k, 10)}) scale(0.28)`}><RideCar x={0} y={0} f={f} color={k % 4 === 3 ? '#5A6680' : '#2F2F3A'} /></g>)}
          <g opacity={on(f, food, 8)}><Label x={1230} y={GROUND + 70} text="RIDES + FOOD DELIVERIES" size={42} font="Bebas Neue" color={P.ink2} /></g></g>
        {/* # one red coin lands on each trip */}
        {f >= lost5 && Array.from({ length: 18 }, (_, k) => { const fl = fly(f, lost5 + k * 2, [420, GROUND - 200], [780 + (k % 6) * 180, GROUND - 120 - Math.floor(k / 6) * 150], 20, 120)
          return <g key={k}><circle cx={fl.x} cy={fl.y} r={20} fill={P.coral} /><text x={fl.x} y={fl.y + 7} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 22px "Bebas Neue"' }}>−</text></g> })}
      </g>}

      {/* # C) the rider pays less than the real cost; someone else fills the gap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [took, 'offer', 'smiling'], [someone, 'shrug', 'thinking']]} x={300} y={GROUND} s={0.8} />
        {/* # the real cost: a dashed outline taller than the $20 the rider pays */}
        <g opacity={on(f, didnt, 8)}><rect x={760} y={GROUND - 560} width={360} height={560} rx={18} fill="none" stroke={P.coralInk} strokeWidth={6} strokeDasharray="16 12" /><Label x={940} y={GROUND - 580} text="FULL COST" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, took, 8)}><rect x={780} y={GROUND - 440} width={320} height={440} rx={14} fill="#7FC98F" /><text x={940} y={GROUND - 200} textAnchor="middle" fill="#245C3A" style={{ font: '400 90px "Bebas Neue"' }}>$20</text></g>
        {/* # the gap fills from a money bag */}
        <g opacity={on(f, someone, 10)} transform={`translate(${lerp(1800, 1440, on(f, someone, 20))} 0)`}><MoneyBag x={0} y={GROUND} s={lerp(0.9, 1.3, on(f, billions, 20))} text="?" /></g>
        <g opacity={on(f, else7, 8)}><rect x={780} y={GROUND - 560 + 10} width={320} height={lerp(0, 110, on(f, else7, 20))} rx={14} fill={P.gold} /></g>
        {/* # six calendar pages: six years in a row */}
        <g opacity={on(f, oneoff, 8)}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, six + k * 3, 6)}><Calendar x={1260 + (k % 3) * 160} y={300 + Math.floor(k / 3) * 150} text="YEAR" s={0.6} /></g>)}</g>
      </g>}

      {/* # D) the four steps */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {([[four, 'THE FARE SPLITS'], [four + 6, 'THE COSTS'], [simple, 'WHO PAID'], [steps, 'WHY IT STOPPED']] as [number, string][]).map(([at, t], k) => {
          const x = 330 + k * 420
          return <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${GROUND - 140 - 20 * (1 - pop(f, at, 14))})`}>
            {k === 0 && <g transform="translate(0 -110)"><FareBill x={0} y={-60} w={260} split={1} /></g>}
            {k === 1 && <CostTile x={0} y={-110} kind="engineers" s={0.9} label={false} />}
            {k === 2 && <MoneyBag x={0} y={-30} s={0.9} />}
            {k === 3 && <path d="M-60 -60 L0 -160 L60 -60 Z M-24 -60 L-24 -20 L24 -20 L24 -60" fill={P.mint} />}
            <circle cx={0} cy={60} r={36} fill={[P.mint, P.coral, P.gold, P.sky][k]} />
            <text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
            <Label x={0} y={150} text={t} size={46} font="Bebas Neue" color={P.ink} />
          </g>
        })}
        <g opacity={on(f, who, 8) * (1 - on(f, stopped + 20, 10))}><Coin2 x={1170} y={300} r={34} t="?" /></g>
      </g>}
      <Vignette id="ub-hook" />
    </g>
  )
}

const BEATS = ['s1:202', 's1:people', 's1:month', 's2:years', 's2:rides', 's2:hidden', 's2:discount', 's3', 's3:lost', 's3:86', 's3:business', 's4:handled', 's4:69', 's4:food', 's5:divide', 's5:lost', 's5:25', 's5:every', 's5:trip', 's6:took', "s6:didn't", 's6:full', 's7:someone', 's7:else', 's7:billions', 's8:oneoff', 's8:six', 's9:follow', 's9:four', 's9:simple', 's9:steps', 's9:who', 's9:stopped']
export const UB_HOOK = makePiece('ub-hook', 'Uber long hook: a city street and a ride car, 202 million riders a month, the $20 tag peels to show a hidden discount coupon; 2019: a red −$8.6B pile and 6.9 billion trips, one red coin per trip (−$1.25); a rider\'s $20 falls short of the full cost, a money bag fills the gap (someone else paid billions), six years in a row; four steps', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:202', 'pop', 0.2], ['s2:discount', 'swish', 0.2], ['s3:86', 'thud', 0.3], ['s5:lost', 'coin', 0.25], ['s7:else', 'whoosh', 0.25], ['s9:four', 'pop', 0.25]] })
