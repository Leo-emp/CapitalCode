// ---------------------------------------------------------------- s15–s23: step one, find your number (part 2).
// A) A big 4% coin flips over to ×25; one sack of yearly spending multiplies into 25 sacks that pour into one tall tower: $1,000,000.
// B) 4% of the tower pours back into a $40,000 sack for Maya.
// C) Rule of thumb (Maya's thumbs up); a PROMISE paper crossed; a storm cloud over the road ahead.
// D) The mountain again: spending drops to $30,000, the tower shrinks to $750,000 and the finish flag slides down the trail, closer.
// E) Two people with the same pay but different spending: two towers; the flag stays closer for the lower spender; then a leaking bucket (next step).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, Bucket, C, Cross, Defs, Envelope, FlipCoin, FONT, Grain, Mountain, Sack, Tag, Tower, fadeIn, scene, trailAt } from './kit'

const G = 930

const Num2: React.FC<PieceProps> = ({ f, c }) => {
  const flip = c('s15:flip'), around = c('s15:around'), divided = c('s15:divided'), twentyfive15 = c('s15:twenty')
  const number16 = c('s16:number'), yearly = c('s16:yearly'), times16 = c('s16:times'), twenty16 = c('s16:twenty')
  const forty17 = c('s17:forty'), times17 = c('s17:times'), million17 = c('s17:million')
  const four18 = c('s18:four'), million18 = c('s18:million'), forty18 = c('s18:forty'), spends18 = c('s18:spends')
  const thumb = c('s19:thumb'), promise = c('s19:promise'), future = c('s19:future'), worse = c('s19:worse'), past = c('s19:past'), starting = c('s19:starting')
  const powerful = c('s20:powerful'), thirty20 = c('s20:thirty'), drops = c('s20:drops'), seven = c('s20:seven')
  const two21 = c('s21:two'), same21 = c('s21:same'), different = c('s21:different'), spends21 = c('s21:spends')
  const less22 = c('s22:less'), closer = c('s22:closer'), three22 = c('s22:three')
  const leaks = c('s23:leaks'), maya23 = c('s23:maya')

  const AB = c('s18') - 6, BC = c('s19') - 6, CD = c('s20') - 6, DE = c('s21') - 6, EF = c('s23') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = fadeIn(f, EF)

  // # A) 25 sacks fan out on "times twenty five" then pour into the tower on s17
  const fan = span(f, times16, twenty16 + 20), pour = span(f, forty17, million17)
  const towerH = 560 * on(f, forty17, 40)

  // # D) the tower shrinks from 1,000,000 to 750,000 on "drops"; the flag slides from the summit (t=1) to t=0.75
  const shrink = on(f, drops, 18), flagT = lerp(1, 0.72, on(f, drops + 6, 30))
  const [fx, fy] = trailAt(flagT)

  return (
    <g>
      <Defs />
      {/* # A) the 4% coin flips to ×25; 25 years of spending become one tower */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="day" f={f} sun={[1700, 230]} ground={G} />
        <g opacity={1 - on(f, yearly - 8, 8)}><FlipCoin x={960} y={560} t={span(f, flip, around + 14)} front="4%" back="×25" s={1.3} /><Tag x={960} y={850} text="1 ÷ 4% = 25" size={50} o={on(f, divided, 8)} point="none" /></g>
        {f >= yearly - 6 && Array.from({ length: 25 }, (_, k) => {
          const col = k % 9, row = Math.floor(k / 9)
          const gx = 170 + col * 140, gy = G - 10 - row * 170
          const sx = lerp(960, gx, k === 0 ? 0 : fan), sy = lerp(G - 10, gy, k === 0 ? 0 : fan)
          const tx = lerp(sx, 1500, pour), ty = lerp(sy, G - towerH, pour)
          const o = (k === 0 ? on(f, yearly - 6, 8) : on(f, lerp(times16, twenty16, k / 24), 6)) * (1 - span(f, forty17 + (k / 24) * (million17 - forty17) * 0.8, forty17 + (k / 24) * (million17 - forty17) * 0.8 + 12))
          return o > 0.01 ? <g key={k} opacity={o}><Sack x={tx} y={ty} s={0.62} label={k === 0 && fan < 0.2 ? '1 YEAR' : undefined} /></g> : null
        })}
        <Tag x={960} y={G + 70} text="YEARLY SPENDING × 25" size={44} o={win(f, yearly, forty17, 8)} point="none" />
        <g opacity={on(f, forty17, 8)}>
          <Tower x={1500} y={G} h={Math.max(4, towerH)} w={240} label={f >= million17 ? '$1,000,000' : undefined} />
          <Tag x={1500} y={G + 70} text="$40,000 × 25" size={40} o={on(f, times17, 8)} point="none" />
          <Person f={f} who="investorF" beats={[[0, 'point', 'thinking'], [million17, 'celebrate', 'smiling']]} x={1810} y={G} s={0.95} />
        </g>
      </g>}

      {/* # B) 4% of the tower pours back: one year of spending */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="day" f={f} sun={[1700, 230]} ground={G} />
        <Tower x={1300} y={G} h={560 - 22 * on(f, four18, 14)} w={240} label="$1,000,000" />
        <g opacity={on(f, four18, 8)}><path d={`M1180 ${G - 520} Q 960 ${G - 560} 880 ${G - 260}`} fill="none" stroke={C.cash} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={`${on(f, four18, 20)} 1`} />
          <Tag x={1060} y={G - 620} text="4%" size={54} o={on(f, four18, 8)} point="none" color={C.gold} /></g>
        <g opacity={on(f, forty18 - 4, 8)}><Sack x={860} y={G - 10} s={1.15} /><Tag x={860} y={G - 230} text="$40,000" size={46} o={on(f, forty18, 8)} /></g>
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [forty18, 'receive', 'smiling'], [spends18, 'thumbsUp', 'smiling']]} x={520} y={G} s={0.95} />
      </g>}

      {/* # C) a rule of thumb, not a promise; the future can be worse */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky={f >= future ? 'rain' : 'day'} f={f} sun={null} ground={G} />
        <Person f={f} who="investorF" beats={[[0, 'thumbsUp', 'smiling'], [promise, 'crossNoA', 'neutral', 'crossNoB', 10], [worse, 'nervous', 'worried'], [c('s19:treat'), 'explain', 'neutral'], [starting, 'confident', 'neutral']]} x={560} y={G} s={1} />
        <Tag x={560} y={G - 580} text="RULE OF THUMB" size={46} o={on(f, thumb, 8)} />
        <g opacity={win(f, promise - 6, future + 4, 8)}><g transform={`translate(1240 ${G - 300}) rotate(-4)`}><rect x={-150} y={-190} width={300} height={380} rx={12} fill={C.cream} stroke="#C9A877" strokeWidth={4} />
          <text y={-120} textAnchor="middle" fill={C.ink} style={{ font: `400 56px ${FONT.big}`, letterSpacing: 3 }}>PROMISE</text>
          <path d="M-80 120 q30 -40 60 0 t60 0" stroke={C.ink} strokeWidth={5} fill="none" /></g>
          <Cross x={1240} y={G - 300} r={170} p={on(f, promise + 4, 12)} /></g>
        <g opacity={on(f, future - 4, 12)}>
          <path d={`M900 ${G + 40} C 1200 ${G - 10} 1500 ${G + 30} 1900 ${G - 10}`} stroke="#C9B48E" strokeWidth={40} fill="none" strokeLinecap="round" />
          <g transform={`translate(${1420 + 20 * Math.sin(f / 30)} 360)`}><ellipse cx={0} cy={0} rx={240} ry={80} fill="#6E7690" /><ellipse cx={-110} cy={-40} rx={120} ry={80} fill="#7E86A0" /><ellipse cx={90} cy={-56} rx={130} ry={90} fill="#737B96" />
            {[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={-150 + k * 60} y1={80 + ((f * 6 + k * 40) % 200)} x2={-160 + k * 60} y2={110 + ((f * 6 + k * 40) % 200)} stroke="#DDE6F4" strokeWidth={4} strokeLinecap="round" />)}</g>
          <Tag x={1420} y={560} text="THE FUTURE CAN BE WORSE" size={38} o={on(f, worse, 8)} point="none" />
        </g>
      </g>}

      {/* # D) spend less: the number drops and the flag comes closer */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="day" f={f} sun={[300, 240]} ground={G} />
        <Mountain f={f} flagT={flagT} flagText={f >= seven ? '$750K' : '$1M'} />
        <Tower x={430} y={G} h={lerp(560, 420, shrink) + 14 * win(f, c('s20:shows'), c('s20:shows') + 16, 6)} w={200} label={f >= seven ? '$750,000' : '$1,000,000'} />
        <g opacity={on(f, thirty20 - 4, 8)}><Sack x={680} y={G - 10} s={lerp(0.9, 0.75, on(f, c('s20:instead'), 14))} /><Tag x={680} y={G - 200} text={f >= thirty20 ? '$30,000 A YEAR' : '$40,000 A YEAR'} size={34} o={1} /></g>
        <Tag x={fx + 76} y={fy - 270} text="CLOSER" size={40} o={on(f, drops + 30, 8)} color={C.cashD} ink="#fff" />
      </g>}

      {/* # E) same pay, different spending: different numbers */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky="day" f={f} sun={[1700, 240]} ground={G} />
        {[0, 1].map((k) => { const x0 = k === 0 ? 520 : 1400, big = k === 1
          return <g key={k} opacity={on(f, lerp(two21, same21, k), 10)}>
            <Person f={f} who={k === 0 ? 'investorF' : 'buyer'} beats={[[0, 'idle', 'neutral'], [different, k === 0 ? 'confident' : 'shrug', k === 0 ? 'smiling' : 'thinking'], [c('s21:one'), k === 0 ? 'idle' : 'point', 'neutral'], [c('s22:mind'), k === 0 ? 'pointUp' : 'idle', 'smiling']]} x={x0 - 180} y={G} s={0.85} flip={k === 1} />
            <Envelope x={x0 - 180} y={G - 560} s={0.7} text="SAME PAY" o={on(f, same21, 8) * (1 - on(f, different + 10, 8))} />
            <Tower x={x0 + 120} y={G} h={(big ? 560 : 380) * on(f, different, 20)} w={170} label={f >= spends21 ? (big ? 'SPENDS MORE' : 'SPENDS LESS') : undefined} />
          </g> })}
        <Tag x={960} y={G + 70} text="SPENDING LESS MOVES THE FINISH LINE CLOSER" size={38} o={on(f, less22, 8)} point="none" color={C.cashD} ink="#fff" />
        <Tag x={960} y={250} text="REMEMBER THIS IN STEP 3" size={40} o={on(f, three22, 8)} point="none" color={C.gold} />
      </g>}

      {/* # F) first, the leaks */}
      {F > 0 && <g opacity={F}>
        <Backdrop sky="rain" f={f} sun={null} ground={G} />
        <Bucket x={960} y={G} f={f} level={0.6} hole={on(f, leaks - 8, 10)} s={1.1} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [c('s23:though'), 'scratchHead', 'worried'], [leaks, 'shock', 'shocked']]} x={520} y={G} s={0.95} />
      </g>}

      <Headline f={f} lines={[[flip, 'FLIP THE 4% AROUND', C.ink, 104], [number16, 'YOUR NUMBER = SPENDING × 25', C.terraD, 96], [million17, "MAYA'S NUMBER: $1,000,000", C.cashD, 96], [four18, '4% COVERS HER YEAR', C.ink, 104],
        [thumb, 'A RULE OF THUMB, NOT A PROMISE', C.ink, 92], [powerful, 'SPEND LESS, NEED LESS', C.terraD, 104], [two21, 'SAME PAY, DIFFERENT NUMBERS', C.ink, 96], [leaks, 'FIRST: STOP THE LEAKS', C.redD, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s19:treat", "s20:shows", "s20:instead", "s21:one", "s23:though", 's15:flip', 's15:around', 's15:divided', 's15:twenty', 's16:number', 's16:yearly', 's16:times', 's16:twenty', 's17:forty', 's17:times', 's17:million', 's18:four', 's18:forty', 's18:spends',
  's19:thumb', 's19:promise', 's19:future', 's19:worse', 's19:starting', 's20:powerful', 's20:thirty', 's20:drops', 's20:seven', 's21:two', 's21:same', 's21:different', 's21:spends', 's22:less', 's22:closer', 's22:mind', 's22:three', 's23:maya', 's23:leaks']
export const FR_NUM2 = makePiece('fr-num2', 'Freedom step one (2): a 4% coin flips to ×25; one sack of yearly spending fans into 25 sacks that pour into a $1,000,000 tower ($40,000 × 25); 4% of the tower pours back into Maya\'s $40,000 sack; RULE OF THUMB thumbs-up, a PROMISE paper crossed, a storm cloud over the road; at $30,000 a year the tower shrinks to $750,000 and the finish flag slides down the mountain, CLOSER; same pay, two different towers; a leaking bucket', {
  mood: 'light', Component: Num2, beats: BEATS,
  sfx: [['s15:flip', 'swish', 0.18], ['s16:twenty', 'pop', 0.15], ['s17:million', 'chime', 0.2], ['s19:promise', 'swish', 0.15], ['s20:drops', 'whoosh', 0.18], ['s23:leaks', 'coin', 0.15]] })
