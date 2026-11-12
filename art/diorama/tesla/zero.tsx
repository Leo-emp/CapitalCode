// ---------------------------------------------------------------- s27–s39: step two — an electric car counts as zero.
// A) A gas car (smoke from its pipe) beside an electric car with no pipe; the EV's tag reads 0 G. A company's meter: each
//    electric car sold knocks the average bar down a notch.
// B) Tesla: only electric cars, so its meter reads 0 with the limit far above; the gap between them fills gold, "spare
//    room". In the US the room turns into credit certificates that stack up; one flies to a rival.
// C) Europe: a pool ring draws around Tesla's cars and a rival's cars; their tags merge into one shared average; the gold
//    room slides from Tesla's side to the rival's. The group project: four students, marks 40, 50, 55 and 100; the class
//    average 61 clears the pass line of 60; the 100 card turns into TESLA and the others slide coins over.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2 } from '../uber/kit'
import { CreditCert, EVCar, Factory, GasCar, LimitMeter, PoolRing, TSpot } from './kit'

const GROUND = 920

const Zero: React.FC<PieceProps> = ({ f, c }) => {
  const step27 = c('s27:step'), electric27 = c('s27:electric'), counts27 = c('s27:counts'), zero27 = c('s27:zero')
  const battery = c('s28:battery'), exhaust = c('s28:exhaust'), pipe = c('s28:pipe'), rules28 = c('s28:rules'), zero28 = c('s28:zero')
  const every29 = c('s29:every'), sells29 = c('s29:sells'), pulls = c('s29:pulls'), down29 = c('s29:down'), hard = c('s29:hard')
  const look = c('s30:look'), tesla30 = c('s30:tesla')
  const only = c('s31:only'), electric31 = c('s31:electric'), zero31 = c('s31:zero'), far = c('s31:far'), limit31 = c('s31:limit')
  const leaves32 = c('s32:leaves'), doesnt = c("s32:doesn't"), spare32 = c('s32:spare'), room32 = c('s32:room')
  const united = c('s33:united'), turns = c('s33:turns'), credits33 = c('s33:credits'), certificate = c('s33:certificate'), sell33 = c('s33:sell'), another = c('s33:another')
  const europe34 = c('s34:europe'), pool34 = c('s34:pool')
  const different = c('s35:different'), join = c('s35:join'), together = c('s35:together'), judged = c('s35:judged'), one35 = c('s35:one'), shared = c('s35:shared'), average35 = c('s35:average')
  const either = c('s36:either'), extra = c('s36:extra'), passed = c('s36:passed'), needs = c('s36:needs')
  const group = c('s37:group'), project = c('s37:project'), average37 = c('s37:average'), student = c('s37:student'), perfect = c('s37:perfect'), lift = c('s37:lift'), pass37 = c('s37:pass')
  const tesla38 = c('s38:tesla'), student38 = c('s38:student'), willing = c('s38:willing'), pay38 = c('s38:pay'), table = c('s38:table')
  const step39 = c('s39:step'), zero39 = c('s39:zero'), sell39 = c('s39:sell')

  const AB = look - 6, BC = europe34 - 6
  const A = win(f, step27 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C1 = 1 - on(f, group - 6, 10), C2 = on(f, group - 6, 10) * (1 - on(f, step39 - 4, 10)), C3 = on(f, step39 - 4, 10)
  // # the company's average: knocked down by each electric car sold
  const avg = 112 - 6 * on(f, sells29, 8) - 6 * on(f, pulls, 8) - 6 * on(f, down29, 8) - 8 * on(f, hard, 8)
  const marks = [40, 50, 55, 100]
  const classAvg = marks.reduce((a, b) => a + b) / marks.length

  return (
    <g>
      <Stage id="ts-zero" frame={f} />
      <TSpot f={f} at={zero28} x={1300} y={640} rx={200} ry={180} />
      <TSpot f={f} at={spare32} x={1100} y={560} rx={180} ry={220} />
      <Headline f={f} lines={[[step27, 'STEP 2: ELECTRIC = ZERO', P.ink, 110], [every29, 'EACH EV PULLS THE AVERAGE DOWN', P.ink, 88], [tesla30, 'TESLA: ONLY ELECTRIC CARS', P.ink, 100], [spare32, 'SPARE ROOM UNDER THE LINE', P.ink, 96], [credits33, 'US: ROOM → CREDITS', P.ink, 100], [pool34, 'EUROPE: A POOL', P.ink, 104], [group, 'LIKE A GROUP PROJECT', P.ink, 104], [tesla38, 'TESLA IS THE TOP STUDENT', P.ink, 100], [step39, 'ROOM IT CAN SELL', P.ink, 104]]} />

      {/* # A) gas vs electric; the average falls */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, every29 - 6, 10)}>
          <g opacity={on(f, battery - 10, 8)}><GasCar x={520} y={GROUND} s={0.85} f={f} /><Label x={520} y={GROUND + 56} text="GAS CAR" size={44} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, exhaust, 8)}><circle cx={520 - 0.85 * 197} cy={GROUND - 0.85 * 38} r={36} fill="none" stroke={P.coral} strokeWidth={6} /><Label x={340} y={GROUND - 120} text="EXHAUST PIPE" size={36} font="Bebas Neue" color={P.coralInk} /></g></g>
          <EVCar x={1300} y={GROUND} s={0.85} f={f} glow={on(f, zero27, 10)} />
          <Label x={1300} y={GROUND + 56} text={f >= battery ? 'BATTERY CAR' : 'ELECTRIC CAR'} size={44} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, pipe, 8)}><circle cx={1300 - 0.85 * 190} cy={GROUND - 0.85 * 38} r={36} fill="none" stroke={P.mint} strokeWidth={6} strokeDasharray="10 8" /><Label x={1110} y={GROUND - 120} text="NO PIPE" size={36} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, counts27, 8)} transform={`translate(1300 ${560 - 20 * pop(f, zero28, 14)})`}><rect x={-100} y={-50} width={200} height={100} rx={16} fill={P.mint} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>0 G</text></g>
          <g opacity={on(f, rules28, 8)}><Label x={1300} y={460} text="UNDER THE RULES" size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, every29 - 6, 10)}>
          <LimitMeter x={480} y={GROUND - 20} value={avg} limit={100} scale={4.2} label="THE COMPANY'S AVERAGE" />
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, [every29, sells29, pulls, down29][k], 6)}><EVCar x={980 + k * 230} y={GROUND} s={0.4} f={f} /></g>)}
          {f >= sells29 && [0, 1, 2].map((k) => { const at = [sells29, pulls, down29][k], fl = fly(f, at, [980 + (k + 1) * 230, GROUND - 120], [480, GROUND - 20 - avg * 4.2], 14, 80); return fl.t < 1 ? <g key={k} transform={`translate(${fl.x} ${fl.y})`}><path d="M-20 -12 L0 12 L20 -12" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /></g> : null })}
          <g opacity={on(f, hard, 8)}><Label x={1320} y={GROUND + 56} text="EVERY EV SOLD" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}

      {/* # B) Tesla: zero, spare room, credits */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Factory x={330} y={GROUND} s={0.9} name="TESLA" color="#3E4A61" />
        <g opacity={on(f, only, 8) * (1 - on(f, united - 6, 10))}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, only + k * 3, 6)}><EVCar x={560 + k * 130} y={GROUND} s={0.3} f={f} /></g>)}</g>
        <g opacity={on(f, zero31 - 10, 8)}><LimitMeter x={960} y={GROUND - 20} value={lerp(20, 0, on(f, zero31, 16))} limit={100} scale={4.2} label="TESLA'S AVERAGE" /></g>
        {/* # the spare room: gold between 0 and the limit */}
        <g opacity={on(f, spare32, 8) * (1 - on(f, turns, 10))}><rect x={904} y={GROUND - 20 - 100 * 4.2} width={112} height={100 * 4.2} rx={10} fill={P.gold} opacity={0.75} /><text x={960} y={GROUND - 20 - 50 * 4.2} textAnchor="middle" fill={P.navy0} transform={`rotate(-90 960 ${GROUND - 20 - 50 * 4.2})`} style={{ font: '400 44px "Bebas Neue"' }}>SPARE ROOM</text></g>
        <g opacity={on(f, far, 8) * (1 - on(f, spare32, 8))}><path d={`M1080 ${GROUND - 40} L1080 ${GROUND - 20 - 100 * 4.2 + 20}`} stroke={P.ink2} strokeWidth={6} strokeDasharray="12 8" /><Label x={1100} y={GROUND - 240} text="FAR BELOW" size={40} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
        <g opacity={on(f, doesnt, 8) * (1 - on(f, united, 8))}><Person f={f} who="hero" beats={[[0, 'shrug', 'smiling']]} x={1500} y={GROUND} s={0.75} /><Label x={1500} y={GROUND + 56} text="NOT NEEDED" size={40} font="Bebas Neue" color={P.ink2} /></g>
        {/* # US: the room turns into certificates that stack; one flies to a rival */}
        {f >= turns && [0, 1, 2, 3].map((k) => { const fl = fly(f, turns + k * 5, [960, GROUND - 230], [1400, GROUND - 120 - k * 50], 16, 120); return <g key={k} opacity={k === 3 && f >= sell33 ? 1 - on(f, another, 10) : 1}><CreditCert x={fl.x} y={fl.y} s={0.55} r={k % 2 ? 4 : -4} /></g> })}
        <g opacity={on(f, certificate, 8)}><Label x={1400} y={GROUND + 56} text="CREDITS" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, sell33, 8)}><Factory x={1750} y={GROUND} s={0.5} name="RIVAL" f={f} smoke color="#6A5A6A" />
          {(() => { const fl = fly(f, sell33 + 2, [1400, GROUND - 270], [1750, GROUND - 200], 18, 120); return f >= sell33 + 2 && fl.t < 1 ? <CreditCert x={fl.x} y={fl.y} s={0.5} /> : null })()}
          {(() => { const fl = fly(f, another + 6, [1750, GROUND - 200], [1400, GROUND - 300], 18, 100); return f >= another + 6 && fl.t < 1 ? <Coin2 x={fl.x} y={fl.y} r={24} t="$" /> : null })()}</g>
      </g>}

      {/* # C) the pool; the group project */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {[0, 1].map((k) => <g key={k} opacity={on(f, europe34 + k * 4, 6)}><EVCar x={420 + k * 260} y={GROUND} s={0.5} f={f} /></g>)}
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, different + k * 4, 6)}><GasCar x={1100 + k * 260} y={GROUND} s={0.5} f={f} /></g>)}
          <Label x={550} y={GROUND + 56} text="TESLA" size={44} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, different, 8)}><Label x={1360} y={GROUND + 56} text="A RIVAL" size={44} font="Bebas Neue" color={P.ink} /></g>
          <PoolRing x={220} y={GROUND - 240} w={1480} h={250} p={span(f, join, together + 20)} label="ONE POOL" />
          {/* # tags merge into one shared average */}
          {[[550, '0 G'], [1360, '110 G']].map(([x, t], k) => { const m = on(f, one35, 20); return <g key={k} opacity={on(f, judged - 10, 8) * (1 - m * 0.9)} transform={`translate(${lerp(x as number, 960, m)} ${lerp(500, 440, m)})`}><rect x={-80} y={-36} width={160} height={72} rx={12} fill={k ? P.coral : P.mint} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{t}</text></g> })}
          <g opacity={on(f, shared, 8)} transform={`translate(960 ${440 - 14 * pop(f, average35, 12)})`}><rect x={-170} y={-44} width={340} height={88} rx={14} fill={P.gold} /><text y={18} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>ONE SHARED AVERAGE</text></g>
          {/* # either way: room passes across */}
          <g opacity={on(f, c('s36:result'), 8)}><Label x={960} y={GROUND + 56} text={f >= c('s36:same') ? 'SAME RESULT EITHER WAY' : 'EITHER WAY…'} size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, either, 8)}>{(() => { const fl = fly(f, passed, [550, 330], [1360, 330], 24, 100); return <g transform={`translate(${fl.x} ${fl.y})`}><rect x={-90} y={-40} width={180} height={80} rx={12} fill={P.gold} /><text y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 38px "Bebas Neue"' }}>SPARE ROOM</text></g> })()}</g>
          <g opacity={on(f, needs, 8)}><Label x={1360} y={260} text="NEEDS IT" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={C2}>
          {/* # four students, marks; the class average clears the pass line */}
          <line x1={240} y1={470} x2={1680} y2={470} stroke={P.ink} strokeWidth={6} strokeDasharray="18 12" opacity={on(f, pass37, 8)} />
          <g opacity={on(f, pass37, 8)}><Label x={1700} y={482} text="PASS 60" size={42} font="Bebas Neue" color={P.ink} anchor="start" /></g>
          {marks.map((m, k) => { const x = 360 + k * 360, top = k === 3 && f >= tesla38
            return <g key={k} opacity={on(f, group + k * 4, 6)}>
              <Mini look={['buyer', 'worker', 'owner', 'hero'][k]} x={x} y={GROUND} scale={1.05} frame={f} seed={k + 30} mood={k === 3 ? 'happy' : 'neutral'} />
              <g transform={`translate(${x} ${660 - (k === 3 ? 18 * pop(f, perfect, 12) : 0)})`}><rect x={-80} y={-46} width={160} height={92} rx={12} fill={top ? P.mint : P.card} stroke={P.edge} strokeWidth={3} /><text y={20} textAnchor="middle" fill={top ? '#FFFFFF' : P.ink} style={{ font: '400 56px "Bebas Neue"' }}>{top ? 'TESLA' : `${m}`}</text></g>
              {k < 3 && f >= willing && (() => { const fl = fly(f, pay38 + k * 5, [x, GROUND - 160], [360 + 3 * 360, GROUND - 200], 16, 100); return fl.t < 1 ? <Coin2 x={fl.x} y={fl.y} r={22} t="$" /> : null })()}
            </g> })}
          <g opacity={on(f, average37, 8)} transform={`translate(960 ${lerp(545, 400, on(f, lift, 20))})`}><rect x={-150} y={-40} width={300} height={80} rx={14} fill={P.gold} /><text y={16} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>{f >= lift ? `AVERAGE ${Math.round(classAvg)}` : `WITHOUT 100: ${Math.round((40 + 50 + 55) / 3)}`}</text></g>
          <g opacity={on(f, table, 8)}><Label x={960} y={GROUND + 56} text="PAY TO SIT AT ITS TABLE" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={C3}>
          <g opacity={on(f, c('s39:cars'), 8)}><EVCar x={600} y={GROUND} s={0.8} f={f} glow={on(f, c('s39:count'), 10)} /></g>
          <g opacity={on(f, zero39, 8)} transform="translate(600 520)"><rect x={-100} y={-50} width={200} height={100} rx={16} fill={P.mint} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>0 G</text></g>
          <g opacity={on(f, sell39, 8)}><CreditCert x={1300} y={560} s={1.2} r={-4} /><Label x={1300} y={GROUND + 56} text="ROOM TO SELL" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      <Vignette id="ts-zero" />
    </g>
  )
}

const BEATS = ['s36:result', 's36:same', 's39:cars', 's39:count', 's27:step', 's27:electric', 's27:counts', 's27:zero', 's28:battery', 's28:exhaust', 's28:pipe', 's28:rules', 's28:zero', 's29:every', 's29:sells', 's29:pulls', 's29:down', 's29:hard', 's30:look', 's30:tesla', 's31:only', 's31:electric', 's31:zero', 's31:far', 's31:limit', 's32:leaves', "s32:doesn't", 's32:spare', 's32:room', 's33:united', 's33:turns', 's33:credits', 's33:certificate', 's33:sell', 's33:another', 's34:europe', 's34:pool', 's35:different', 's35:join', 's35:together', 's35:judged', 's35:one', 's35:shared', 's35:average', 's36:either', 's36:extra', 's36:passed', 's36:needs', 's37:group', 's37:project', 's37:average', 's37:student', 's37:perfect', 's37:lift', 's37:pass', 's38:tesla', 's38:student', 's38:willing', 's38:pay', 's38:table', 's39:step', 's39:zero', 's39:sell']
export const TS_ZERO = makePiece('ts-zero', 'Tesla long step 2: a gas car with an exhaust pipe beside an electric car with none, 0 g; each EV sold knocks a company average down; Tesla sells only EVs so its meter reads 0, the gap to the limit is gold spare room; in the US it turns into credit certificates sold to a rival; in Europe a pool ring joins Tesla and a rival, tags merge into one shared average and the room passes across; a group project: marks 40, 50, 55 and 100 average 61, over the pass line of 60, the 100 is Tesla and the others pay to sit at its table', {
  mood: 'light', Component: Zero, beats: BEATS,
  sfx: [['s27:zero', 'pop', 0.2], ['s29:pulls', 'swish', 0.15], ['s32:spare', 'pop', 0.2], ['s33:turns', 'swish', 0.2], ['s35:join', 'whoosh', 0.2], ['s37:perfect', 'pop', 0.2], ['s38:pay', 'coin', 0.2]] })
