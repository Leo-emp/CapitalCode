// ---------------------------------------------------------------- s58–s69a: who pays for whom.
// A) Two members side by side, each with a $15 tag: Maya on a treadmill (12 visits, $1.25 a visit), Sam on his sofa
//    (1 visit, the whole $15).
// B) Both coins drop into one pot; the pot pours into the rent, staff and machines cards; Maya's treadmill lights up
//    all month while Sam's coin flies from his sofa to it; Sam gives a thumbs up (not cheated); then three sofas send
//    coins to the one treadmill.
// C) Everyone trains like Maya: the floor fills with runners; the building widens, machines and staff multiply; extra
//    floor costs coins; the $15 tag rises with an arrow. Then a see-saw: the stay-home side pulls the price back down
//    to $15 (an average, not a gift). The tag turns over to show the coins hidden inside.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { BillCard, GymFront, KeyTag, Pot, SeeSaw, Sofa, Treadmill, VisitStrip, Zzz } from './kit'

const Tag: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; color?: string }> = ({ x, y, text, s = 1, o = 1, color = '#F08A3C' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-100} y={-56} width={200} height={112} rx={20} fill={color} /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>{text}</text></g>
)

const WhoPays: React.FC<PieceProps> = ({ f, c }) => {
  const s58 = c('s58'), miss = c('s58:miss'), same = c('s59:same'), thing = c('s59:thing')
  const two = c('s60:two'), gym60 = c('s60:gym'), d15 = c('s60:15')
  const maya = c('s61:maya'), d12 = c('s61:12'), dollar = c('s61:dollar')
  const sam = c('s62:sam'), once = c('s62:once'), whole = c('s62:whole')
  const pot = c('s63:pot'), rent = c('s63:rent'), staff = c('s63:staff'), machines = c('s63:machines')
  const uses = c('s64:uses'), money = c('s64:money'), home = c('s64:home')
  const cheated = c('s64a:cheated'), using = c('s64a:using')
  const stay = c('s65:stay'), show = c('s65:show')
  const everyone = c('s66:everyone'), bigger = c('s67:bigger'), machines67 = c('s67:machines'), staff67 = c('s67:staff')
  const square = c('s67a:square'), cost = c('s67a:cost')
  const price = c('s68:price'), higher = c('s68:higher')
  const gift = c('s69:gift'), average = c('s69:average'), rarely = c('s69:rarely'), down = c('s69:down')
  const hidden = c('s69a:hidden')
  const A = win(f, s58, pot), B = win(f, pot, everyone), C = on(f, everyone, 12)
  const mayaB = [[0, 'idle', 'neutral'], [maya, 'runA', 'smiling', 'runB', 12]] as const
  const samB = [[0, 'idle', 'neutral'], [c('s64a:sam'), 'present', 'neutral'], [cheated, 'thumbsUp', 'smiling'], [c('s64a:gym'), 'point', 'neutral'], [using, 'shrug', 'neutral']] as const
  return (
    <g>
      <Stage id="gm-whopays" frame={f} />
      <Headline f={f} lines={[[miss, 'THE PART PEOPLE MISS', P.ink, 104], [same, 'SAME PRICE, NOT THE SAME THING', P.ink, 96], [dollar, 'MAYA: ≈ $1.25 A VISIT', P.mintInk, 104], [whole, 'SAM: $15 A VISIT', P.coralInk, 104], [pot, 'ONE POT', P.ink, 110], [stay, 'HOME PAYS FOR THE FLOOR', P.goldInk, 100], [everyone, 'IF EVERYONE CAME', P.ink, 104], [higher, 'FAR ABOVE $15', P.coralInk, 110], [average, 'AN AVERAGE, NOT A GIFT', P.goldInk, 100]]} />
      {/* # A) Maya and Sam */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, two, 6)}>
          <g transform={`rotate(${-8 * on(f, c('s59:not'), 6)} 760 560)`}><Tag x={760} y={560} text="$15" s={1.3 * pop(f, miss)} o={on(f, miss, 4)} /></g><g transform={`rotate(${8 * on(f, c('s59:not'), 6)} 1160 560)`}><Tag x={1160} y={560} text="$15" s={1.3 * pop(f, same)} o={on(f, same, 4)} /></g>
          <g opacity={on(f, c('s59:gets'), 4)}><Label x={960} y={760} text="≠" size={140} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, two, 4)}>
          <rect x={940} y={330} width={40} height={700 * on(f, gym60, 14)} rx={20} fill={P.ink2} opacity={0.2} />
          {/* # Maya */}
          <g opacity={on(f, maya, 4) + 0.35 * (1 - on(f, maya, 4))}>
            <Treadmill x={500} y={880} s={1} f={f} run={on(f, maya, 4)} used={on(f, maya, 4)} />
            <Person f={f} who="investorF" beats={mayaB as never} x={470} y={860} s={0.7} />
            <g transform={`translate(760 ${430 - 20 * Math.sin(Math.PI * span(f, c('s61:workouts'), c('s61:workouts') + 12))}) scale(${0.5 * pop(f, d15)})`}><KeyTag x={0} y={0} text="$15" /></g>
            <Label x={480} y={380} text="MAYA" size={56} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, d12, 4)}><VisitStrip x={480} y={990} n={Math.round(12 * span(f, d12, c('s61:month') + 6))} w={680} /></g>
          </g>
          {/* # Sam */}
          <g opacity={on(f, sam, 4) + 0.35 * (1 - on(f, sam, 4))}>
            <Sofa x={1440} y={900} s={0.8} /><Mini look="buyer" x={1440} y={870} scale={1.3} frame={f} seed={21} /><Zzz x={1500} y={690} f={f} o={on(f, sam, 4)} />
            <g transform={`translate(1160 430) scale(${0.5 * pop(f, d15 + 3)})`}><KeyTag x={0} y={0} text="$15" /></g>
            <Label x={1440} y={380} text="SAM" size={56} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, once, 4)}><VisitStrip x={1440} y={990} n={1} w={680} /><circle cx={1440 - 340 + 680 / 30 * 0.5} cy={990} r={20} fill="none" stroke={P.goldInk} strokeWidth={5} opacity={on(f, c('s62:workout'), 4)} /></g>
          </g>
        </g>
      </g>}
      {/* # B) one pot, the bills, and whose money pays for whose machine */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, uses, 6)}>
          {[0, 1].map((k) => { const p = fly(f, c('s63:payments') + k * 6, [k ? 1500 : 420, 520], [960, 620], 20, 160); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={1} o={p.o} text="15" /> : null })}
          <g opacity={on(f, c('s63:both'), 4)}><Pot x={960} y={900} s={0.9} fill={0.3 + 0.2 * on(f, pot + 20, 12)} label="THE GYM'S POT" /></g>
          {[['rent', 'RENT', rent, 420], ['staff', 'STAFF', staff, 1500], ['machines', 'MACHINES', machines, 1500]].map(([kind, label, at, x], k) => {
            const y = k === 0 ? 640 : k === 1 ? 480 : 820
            return <g key={k} opacity={on(f, at as number, 4)} transform={`translate(${x} ${y}) scale(${0.8 * pop(f, at as number)})`}><BillCard x={0} y={0} kind={kind as 'rent'} label={label as string} /></g>
          })}
          {[rent, staff, machines].map((at, k) => { const tgt: [number, number] = k === 0 ? [420, 640] : k === 1 ? [1500, 480] : [1500, 820]; const p = fly(f, at + 2, [960, 600], tgt, 18, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
        </g>
        <g opacity={on(f, uses, 4) * (1 - on(f, stay, 6))}>
          <Treadmill x={560} y={880} s={1} f={f} run={1} used={1} />
          <Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={530} y={860} s={0.7} />
          <circle cx={560} cy={700} r={230} fill={P.gold} opacity={0.1 * on(f, uses, 6) + 0.12 * on(f, c('s64:machines'), 6)} />
          <g opacity={on(f, c('s64:month'), 4)}><VisitStrip x={560} y={1010} n={12} w={600} /></g>
          <Sofa x={1440} y={900} s={0.8} />
          <Person f={f} who="buyer" beats={samB as never} x={1440} y={880} s={0.62} />
          {(() => { const p = fly(f, money, [1440, 640], [620, 560], 30, 220); return p.o > 0 ? <Coin x={p.x} y={p.y} s={1} o={p.o} text="15" /> : null })()}
          <g opacity={on(f, cheated, 4)}><Tick x={1640} y={560} o={1} r={44} /></g>
        </g>
        <g opacity={on(f, stay, 4)}>
          <Treadmill x={520} y={880} s={1} f={f} run={1} used={1} />
          <Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={490} y={860} s={0.7} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, (k === 0 ? c('s65:real') : k === 1 ? c('s65:members') : stay), 8)}><Sofa x={1180 + k * 280} y={560 + (k % 2) * 380} s={0.5} /><Mini look={['buyer', 'worker', 'owner'][k]} x={1180 + k * 280} y={540 + (k % 2) * 380} scale={0.8} frame={f} seed={k + 140} /></g>)}
          {Array.from({ length: 9 }, (_, k) => { const p = fly(f, stay + (k % 3) * 6 + Math.floor(k / 3) * 18, [1180 + (k % 3) * 280, 460 + (k % 2) * 380], [580, 600], 26, 160); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
          <g opacity={on(f, show, 4)}><Label x={520} y={1000} text="SHOWS UP" size={46} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      {/* # C) if everyone came; then the average */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, gift, 6)}>
          <g transform={`translate(760 900) scale(${lerp(0.9, 1.08, on(f, c('s67:gym'), 14)) + 0.17 * on(f, bigger, 24)} 1)`}><GymFront x={0} y={0} s={0.7} lit={1} doors={1} /></g>
          {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, (k < 3 ? c('s66:imagine') : k < 6 ? c('s66:maya') : everyone) + k * 2, 6)}><Mini look="investorF" x={300 + k * 120} y={1040} scale={0.75} frame={f} seed={k + 150} mood="happy" /></g>)}
          {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, (k < 3 ? machines67 : c('s67a:machine')) + k * 3, 6)}><Treadmill x={1300 + (k % 2) * 300} y={560 + Math.floor(k / 2) * 200} s={0.55} f={f} run={1} used={1} /></g>)}
          {Array.from({ length: 3 }, (_, k) => <g key={k} opacity={on(f, staff67 + k * 3, 4)}><Mini look="worker" x={1720 + k * 0} y={560 + k * 160} scale={0.7} frame={f} seed={k + 160} /></g>)}
          <g opacity={on(f, square, 4)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, cost + k * 5, [960, 420], [960 + (k - 2) * 60, 300], 16, 60); return <Coin key={k} x={p.o > 0 ? p.x : 960 + (k - 2) * 60} y={p.o > 0 ? p.y : 300} s={0.6} o={on(f, cost + k * 5, 4)} /> })}<Label x={960} y={400} text="EXTRA FLOOR = COST" size={44} font="Bebas Neue" color={P.ink2} o={1 - on(f, price, 4)} /></g>
          <g opacity={on(f, c('s68:pay'), 4)} transform={`translate(1500 ${lerp(360, 280, on(f, higher, 14))})`}><Tag x={0} y={0} text={f >= higher ? '$$$' : '$15'} color={f >= higher ? '#D9483A' : '#F08A3C'} /><Prop id="arrow-up" x={150} y={0} size={100} f={f} /></g>
        </g>
        <g opacity={on(f, gift, 4)}>
          <g opacity={on(f, gift, 4) * (1 - on(f, average, 6))} transform="translate(960 560)"><Prop id="shopping-bag" x={0} y={0} size={200} f={f} /><Prop id="cross" x={0} y={0} size={240} f={f} /></g>
          <g opacity={on(f, average, 4)}>
            <SeeSaw x={960} y={760} w={1000} tilt={lerp(-0.6, 0.7, on(f, rarely, 24))}
              left={<g><Mini look="investorF" x={-30} y={0} scale={0.8} frame={f} seed={170} mood="happy" /><Mini look="hero" x={40} y={0} scale={0.8} frame={f} seed={171} mood="happy" /><text x={0} y={-180} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>COME OFTEN</text></g>}
              right={<g opacity={on(f, rarely, 4)}><Sofa x={0} y={0} s={0.42} /><Mini look="buyer" x={-40} y={-10} scale={0.7} frame={f} seed={172} /><Mini look="owner" x={50} y={-10} scale={0.7} frame={f} seed={173} /><text x={0} y={-180} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>RARELY COME</text></g>} />
            <g transform={`translate(960 ${lerp(300, 420, on(f, down, 16))})`} opacity={on(f, c('s69:low'), 4)}><Tag x={0} y={0} text="$15" s={0.9} /><g opacity={on(f, down, 4)}><Prop id="arrow-down" x={150} y={0} size={90} f={f} /></g></g>
          </g>
          <g opacity={on(f, c('s69a:cheap'), 4)}><ellipse cx={960} cy={300} rx={160} ry={90} fill={P.gold} opacity={0.2} /></g>
          <g opacity={on(f, hidden, 4)}>{Array.from({ length: 6 }, (_, k) => <Coin key={k} x={900 + (k % 3) * 60} y={320 - Math.floor(k / 3) * 40 - 60 * on(f, hidden + k * 2, 6)} s={0.6} o={on(f, hidden + k * 2, 4)} />)}</g>
        </g>
      </g>}
      <Vignette id="gm-whopays" />
    </g>
  )
}

export const GM_WHOPAYS = makePiece('gm-whopays', 'Gym long: Maya (12 visits, $1.25) vs Sam (1 visit, $15); one pot pays rent, staff, machines; Sam\'s money pays for the treadmill Maya uses; stay-home members pay for those who show up; if everyone came the price would rise; $15 is an average pulled down by those who rarely come', {
  mood: 'light', Component: WhoPays,
  beats: ["s58", "s58:miss", "s59:same", "s59:thing", "s60:two", "s60:gym", "s60:15", "s61:maya", "s61:12", "s61:dollar", "s62:sam", "s62:once", "s62:whole", "s63:pot", "s63:rent", "s63:staff", "s63:machines", "s64:uses", "s64:money", "s64:home", "s64a:cheated", "s64a:using", "s65:stay", "s65:show", "s66:everyone", "s67:bigger", "s67:machines", "s67:staff", "s67a:square", "s67a:cost", "s68:price", "s68:higher", "s69:gift", "s69:average", "s69:rarely", "s69:down", "s69a:hidden", "s64a:sam", "s64a:gym", "s59:not", "s59:gets", "s61:workouts", "s61:month", "s62:workout", "s63:payments", "s63:both", "s64:machines", "s64:month", "s65:real", "s65:members", "s67:gym", "s66:imagine", "s66:maya", "s67a:machine", "s68:pay", "s69:low", "s69a:cheap"],
  sfx: [['s59:same', 'pop', 0.3], ['s61:maya', 'swish', 0.3], ['s62:sam', 'softpop', 0.3], ['s63:pot', 'coin', 0.4], ['s64:money', 'coin', 0.35], ['s65:stay', 'cash', 0.35], ['s67:bigger', 'riser', 0.3], ['s68:higher', 'impact', 0.35], ['s69:down', 'swish', 0.3], ['s69a:hidden', 'chime', 0.3]] })
