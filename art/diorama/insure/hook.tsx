// ---------------------------------------------------------------- s1–s8: the hook
// A) Morning coast road: your car rolls in, a $1,500 bill drops above it (s1); you never crash (tick), and the bill flies off to the insurer (s2);
//    question marks, then the office swallows it and glows (s3).
// B) The twist (s4): the office's two sides — the insurance side cracks red (LOSE BILLIONS), the other side still stacks gold (PROFIT);
//    a coin arrives TODAY, the crash it covers sits far off at MONTHS / YEARS (s5); in between, the coin drops in a reservoir and turns a wheel (s6).
// C) You run the company (s7): a town with rows of little cars, you stand by your office; five icons light for the promise (s8).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bill, C, Car, Cloud, Coin, Defs, Flag, Grain, House, Land, Lighthouse, Office, Reservoir, SkyBg, Stack, Tick, Umbrella, Wheel, big, fadeIn, scene } from './kit'

const G = 900
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const car = c('s1:car'), fifteen = c('s1:fifteen'), never = c('s2:never'), crash = c('s2:crash'), back = c('s2:back'), where = c('s3:where'), keep = c('s3:keep'), nowT = c('s3:now'), easy = c('s3:easy')
  const twist = c('s4:twist'), lose = c('s4:lose'), profit = c('s4:profit'), today = c('s5:today'), months = c('s5:months'), years = c('s5:years'), invest = c('s6:invest')
  const imagine = c('s7:imagine'), ten = c('s7:ten'), town = c('s7:town')
  const P = [c('s8:set'), c('s8:pay'), c('s8:invest'), c('s8:survive'), c('s8:check')]
  const AB = c('s4') - 6, BC = c('s7') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const fly = span(f, back - 4, back + 26)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="morning" f={f} />
        <Land f={f} G={G} />
        <Lighthouse x={1780} y={G - 60} s={0.9} f={f} />
        <rect x={0} y={G + 20} width={1920} height={70} fill="#5C6670" /><path d={`M0 ${G + 55} H1920`} stroke="#F4EBDD" strokeWidth={5} strokeDasharray="40 30" />
        <Office x={1480} y={G + 10} s={0.8} o={on(f, back - 10, 10)} glow={0.7 * on(f, keep, 10)} />
        <Car x={lerp(-200, 560, on(f, car - 10, 30))} y={G + 70} s={1.3} hue={C.sea} wheel={-f * 6 * (1 - on(f, car + 20, 10))} />
        <g transform={`translate(${lerp(560, 1480, fly)} ${lerp(G - 230, G - 260, fly) - 220 * Math.sin(Math.PI * fly)}) scale(${1 - 0.6 * fly})`}><Bill x={0} y={0} s={1.1} o={on(f, fifteen - 4, 8) * (1 - on(f, keep, 8))} /></g>
        <Tick x={760} y={G - 120} s={0.9} o={win(f, never, back, 8)} />
        <Flag x={760} y={G - 30} text="NO CRASH" size={36} o={win(f, crash, back, 8)} />
        <g opacity={win(f, nowT, keep + 10, 8)} transform="translate(560 300)"><ellipse cx={0} cy={0} rx={250} ry={90} fill={C.cream} stroke={C.navy} strokeWidth={5} /><circle cx={-60} cy={120} r={18} fill={C.cream} stroke={C.navy} strokeWidth={4} /><circle cx={-90} cy={160} r={10} fill={C.cream} stroke={C.navy} strokeWidth={3} />
          <text y={18} textAnchor="middle" fill={C.navy} style={big(52)}>{f >= easy ? 'THEY JUST KEEP IT?' : 'HMM...'}</text></g>
        {[0, 1, 2].map((k) => <text key={k} x={1000 + k * 120} y={G - 330 - (k % 2) * 50} fill={C.navy} opacity={win(f, where + k * 5, keep, 6)} style={big(110)}>?</text>)}
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="noon" f={f} sun={[1700, 200]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={1 - on(f, today - 6, 8)}>
          <Office x={960} y={G} s={1.05} />
          <g opacity={on(f, lose, 8)}><Stack x={560} y={G + 40} n={lerp(9, 2, on(f, lose, 18))} col="red" /><Flag x={560} y={G - 220} text="LOSE BILLIONS" size={40} color={C.red} ink="#fff" /><path d="M520 820 l20 30 l-14 18 l24 34" stroke={C.ink} strokeWidth={5} fill="none" opacity={on(f, lose + 6, 6)} /></g>
          <g opacity={on(f, profit, 8)}><Stack x={1360} y={G + 40} n={lerp(2, 12, on(f, profit, 18))} /><Flag x={1360} y={G - 260} text="STILL A PROFIT" size={40} color={C.green} ink="#fff" /></g>
        </g>
        <g opacity={on(f, today - 6, 8)}>
          <path d={`M300 ${G - 300} H1620`} stroke={C.ink} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 22" />
          <Coin x={300} y={G - 300} r={56} o={pop(f, today - 4, 10)} /><Flag x={300} y={G - 200} text="TODAY" size={40} o={on(f, today, 8)} />
          <g opacity={on(f, months - 4, 8)}><Car x={1260} y={G - 250} s={0.9} hue={C.roof} bent={1} /><Flag x={1260} y={G - 160} text="MONTHS" size={36} /></g>
          <g opacity={on(f, years - 4, 8)}><Car x={1620} y={G - 250} s={0.9} hue={C.plum} bent={1} /><Flag x={1620} y={G - 160} text="YEARS" size={36} /></g>
          <g opacity={on(f, c('s6:between') - 4, 10)}>
            <g transform={`translate(0 ${lerp(0, 330, span(f, invest - 8, invest + 6))})`}><Coin x={lerp(300, 820, span(f, invest - 8, invest + 6))} y={G - 300} r={40} o={1 - on(f, invest + 6, 4)} /></g>
            <Reservoir x={820} y={G + 40} w={420} h={200} level={0.2 + 0.4 * on(f, invest, 20)} f={f} />
            <Wheel x={1180} y={G - 110} r={110} spin={f * 3 * on(f, invest + 4, 20)} />
            <Flag x={1000} y={G + 110} text="INVESTED" size={40} color={C.gold} o={on(f, invest + 4, 8)} />
          </g>
        </g>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <SkyBg sky="morning" f={f} />
        <Land f={f} G={G} />
        <Lighthouse x={1820} y={G - 80} s={0.8} f={f} />
        {[0, 1, 2, 3, 4, 5].map((k) => <House key={k} x={180 + k * 300 + (k > 2 ? 300 : 0) - (k > 2 ? 300 : 0)} y={G - 110 - (k % 2) * 20} s={0.7} o={on(f, town - 20 + k * 3, 8)} tint={k % 2 ? C.wall : '#F7E2C8'} />)}
        {[...Array(30)].map((_, k) => { const col = k % 10, row = Math.floor(k / 10), a = ten + k
          return <Car key={k} x={140 + col * 180 + row * 60} y={G + 30 + row * 50} s={0.42} hue={[C.sea, C.roof, C.gold, C.plum, C.green][k % 5]} o={pop(f, a, 8)} /> })}
        <Office x={960} y={G - 90} s={0.75} o={on(f, imagine - 6, 10)} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'smiling'], [imagine, 'waveA', 'smiling', 'waveB', 14], [P[0], 'present', 'smiling'], [P[4], 'thumbsUp', 'smiling']]} x={1360} y={G + 20} s={0.8} o={on(f, imagine, 8)} />
        <Flag x={960} y={G + 160} text="10,000 DRIVERS" size={40} o={on(f, ten, 8) * (1 - on(f, P[0] - 6, 6))} />
        {(['price', 'crash', 'wheel', 'storm', 'board'] as const).map((k, i) => { const x = 360 + i * 300, y = 390, o = pop(f, P[i] - 2, 10)
          return o > 0.01 && <g key={k} opacity={o} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * o})`}>
            <circle r={110} fill={C.cream} stroke={C.navy} strokeWidth={6} />
            {k === 'price' && <Bill x={0} y={0} s={0.7} text="PRICE" />}
            {k === 'crash' && <Car x={0} y={40} s={0.8} hue={C.roof} bent={1} />}
            {k === 'wheel' && <Wheel x={0} y={-10} r={60} spin={f * 3} />}
            {k === 'storm' && <g><Cloud x={0} y={-10} s={0.6} dark /><path d="M10 10 l-20 40 l16 0 l-16 34 l40 -46 l-18 0 l14 -28 Z" fill={C.lamp} /></g>}
            {k === 'board' && <g><rect x={-70} y={-50} width={140} height={100} rx={10} fill={C.navy} /><text y={18} textAnchor="middle" fill={C.lamp} style={big(48)}>$B</text></g>}
          </g> })}
      </g>}
      <Headline f={f} lines={[[where, 'WHERE DOES IT GO?', C.navy, 104], [twist, 'THE TWIST', C.navy, 108], [imagine, 'YOU RUN THE INSURER', C.navy, 104]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s1:every","s2:most","s4:years","s4:itself","s5:fifteen","s5:covers","s7:insurance","s8:together","s8:step"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s1:car', 's1:fifteen', 's2:never', 's2:crash', 's2:back', 's3:where', 's3:now', 's3:easy', 's3:keep', 's4:twist', 's4:lose', 's4:profit', 's5:today', 's5:months', 's5:years', 's6:between', 's6:invest', 's7:imagine', 's7:ten', 's7:town', 's8:set', 's8:pay', 's8:invest', 's8:survive', 's8:check']
export const IN_HOOK = makePiece('ins-hook', 'Insurance hook in Harbour Town: your car rolls along a coast road, a $1,500 bill drops above it, NO CRASH tick, the bill flies into a stone insurer office with an umbrella sign, ? marks; the twist: a red crumbling stack LOSE BILLIONS beside a gold stack STILL A PROFIT; a coin TODAY on a timeline with crashed cars at MONTHS and YEARS; the coin drops in a reservoir that turns a water wheel (INVESTED); a town of cars, YOU RUN THE INSURER, five icons light (price, crash, wheel, storm, scoreboard)', {
  mood: 'light', Component: Hook, beats: [...BEATS, ...ACC],
  sfx: [['s1:fifteen', 'pop', 0.12], ['s2:never', 'ding', 0.12], ['s2:back', 'whoosh', 0.12], ['s4:lose', 'crack', 0.14], ['s4:profit', 'coin', 0.12], ['s5:today', 'pop', 0.1], ['s6:invest', 'chime', 0.12], ['s7:imagine', 'swish', 0.1], ['s8:set', 'pop', 0.08], ['s8:pay', 'pop', 0.08], ['s8:invest', 'pop', 0.08], ['s8:survive', 'pop', 0.08], ['s8:check', 'pop', 0.08]] })
