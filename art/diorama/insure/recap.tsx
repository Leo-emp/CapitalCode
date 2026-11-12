// ---------------------------------------------------------------- s80–s87: the whole machine
// A) Dusk harbour wall with four lamp posts that light one by one, each with its little picture: 1 POOL (crowd), 2 PRICE (dial),
//    3 FLOAT (reservoir), 4 SURVIVE (umbrella over a smaller one + price tag) (s81–s84).
// B) Your $1,500 bill in the middle (s85); it splits into three streams: other people's crashes, the lights of the office, and the reservoir + wheel (s86);
//    a calm close: your umbrella over you, their water wheel turning (s87; no logo while the voice speaks).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bill, C, Car, Coin, Defs, Dot, Flag, Gauge, Grain, Land, Lighthouse, Office, Reservoir, SkyBg, Umbrella, Wheel, big, fadeIn, scene } from './kit'

const G = 900
const Post: React.FC<{ x: number; lit: number; o: number; n: number }> = ({ x, lit, o, n }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${G})`}>
    {lit > 0 && <circle cx={0} cy={-330} r={140} fill="url(#in-glow)" opacity={lit} />}
    <rect x={-8} y={-310} width={16} height={310} fill={C.ink} /><rect x={-30} y={-360} width={60} height={56} rx={8} fill={lit > 0.5 ? C.lamp : C.stoneD} stroke={C.ink} strokeWidth={4} />
    <path d="M-38 -360 L0 -390 L38 -360 Z" fill={C.ink} /><text y={-318} textAnchor="middle" fill={C.ink} style={big(40)}>{n}</text>
  </g>
)
const Recap: React.FC<PieceProps> = ({ f, c }) => {
  const actually = c('s80:actually'), one = c('s81:one'), pool = c('s81:pool'), predictable = c('s81:predictable'), two = c('s82:two'), risk = c('s82:risk'), combined = c('s82:combined'), claimsR = c('s82:claims'), collectR = c('s82:collect')
  const three = c('s83:three'), hold = c('s83:hold'), floatW = c('s83:float'), four = c('s84:four'), survive = c('s84:survive'), reins = c('s84:reinsurance'), raising = c('s84:raising')
  const next = c('s85:next'), fifteen = c('s85:fifteen'), picture = c('s85:picture'), crashes = c('s86:crashes'), lights = c('s86:lights'), invested = c('s86:invested')
  const protection = c('s87:protection'), pile = c('s87:pile'), whole = c('s87:whole')
  const AB = c('s85') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const at = [one, two, three, four], X = [330, 750, 1170, 1590]
  const split = (k: number) => span(f, [crashes, lights, invested][k] - 10, [crashes, lights, invested][k] + 20)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="dusk" f={f} sun={[1500, 640]} />
        <Land f={f} G={G} night />
        <rect x={0} y={G - 10} width={1920} height={40} fill={C.stoneD} />
        {X.map((x, k) => <Post key={k} x={x} n={k + 1} o={on(f, at[k] - 6, 8)} lit={on(f, at[k], 8)} />)}
        <g opacity={on(f, pool - 4, 8)}>{[...Array(9)].map((_, k) => <Dot key={k} x={390 + (k % 3) * 70} y={G - 60 - Math.floor(k / 3) * 60} s={1.3} col={[C.sea, C.roof, C.plum][k % 3]} />)}<Flag x={330} y={G + 80} text="POOL" size={44} color={f >= predictable ? C.lamp : C.cream} /></g>
        <g opacity={on(f, risk - 4, 8)}><Gauge x={750} y={G - 70} v={lerp(85, 97, on(f, claimsR, 20))} s={0.42} label="" /><circle cx={840} cy={G - 250} r={26} fill={C.green} opacity={on(f, collectR - 2, 8)} /><path d="M828 -250 l8 10 l16 -20" transform={`translate(0 ${G})`} fill="none" stroke="#fff" strokeWidth={6} opacity={on(f, collectR - 2, 8)} /><Flag x={750} y={G + 80} text="PRICE" size={44} color={f >= combined ? C.lamp : C.cream} /></g>
        <g opacity={on(f, hold - 4, 8)}><Reservoir x={1170} y={G - 10} w={240} h={150} level={0.7} f={f} /><Flag x={1170} y={G + 80} text="FLOAT" size={44} color={f >= floatW ? C.lamp : C.cream} /></g>
        <g opacity={on(f, survive - 4, 8)}><Umbrella x={1590} y={G - 120} s={0.5} /><Umbrella x={1590} y={G - 200} s={1} col={C.navy} col2={C.seaL} o={on(f, reins - 4, 8)} /><Flag x={1590} y={G + 80} text={f >= raising ? 'SURVIVE + RE-PRICE' : 'SURVIVE'} size={44} color={f >= raising ? C.lamp : C.cream} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="dusk" f={f} sun={[1500, 640]} />
        <Land f={f} G={G} night />
        <Lighthouse x={1820} y={G - 70} s={0.8} f={f} beam={1} />
        <g opacity={1 - on(f, protection - 6, 10)}>
          <g transform={`translate(960 ${lerp(420, 380, on(f, picture, 10))}) scale(${1.3 - 0.4 * on(f, crashes - 10, 10)})`}><Bill x={0} y={0} s={1} text="$1,500" o={on(f, next - 2, 8)} /></g>
          {[0, 1, 2].map((k) => { const t = split(k), tx = [420, 960, 1500][k]; return t > 0 && t < 1 ? <Coin key={k} x={lerp(960, tx, t)} y={lerp(440, 640, t) - 80 * Math.sin(Math.PI * t)} r={30} /> : null })}
          <g opacity={on(f, crashes - 4, 8)}><Car x={420} y={G} s={1} hue={C.roof} bent={1} /><Car x={260} y={G + 40} s={0.7} hue={C.plum} bent={1} /><Flag x={420} y={G - 240} text="OTHER PEOPLE'S CRASHES" size={34} /></g>
          <g opacity={on(f, lights - 4, 8)}><Office x={960} y={G + 10} s={0.7} glow={0.6 * on(f, lights, 10)} /><Flag x={960} y={G - 300} text="THE LIGHTS ON" size={34} /></g>
          <g opacity={on(f, invested - 6, 8)}><Reservoir x={1440} y={G + 10} w={260} h={170} level={0.7} f={f} /><Wheel x={1640} y={G - 220} r={90} spin={f * 3} /><Flag x={1500} y={G - 400} text="QUIETLY INVESTED" size={34} color={C.gold} /></g>
        </g>
        <g opacity={on(f, protection - 6, 10)}>
          <Umbrella x={640} y={G - 380} s={1.6} />
          <Person f={f} who="owner" beats={[[0, 'idle', 'smiling'], [protection, 'relax', 'smiling'], [whole, 'thumbsUp', 'smiling']]} x={640} y={G + 20} s={0.85} />
          <Flag x={640} y={G + 90} text="YOU: PROTECTION" size={40} color={C.cream} o={on(f, protection, 8)} />
          <Reservoir x={1300} y={G + 10} w={360} h={220} level={0.75} f={f} o={on(f, pile - 6, 8)} />
          <Wheel x={1560} y={G - 260} r={120} spin={f * 3} o={on(f, pile - 4, 8)} glow={0.5 * on(f, whole - 4, 10)} />
          <Flag x={1380} y={G + 90} text="THEM: A PILE TO INVEST" size={40} color={C.gold} o={on(f, pile, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[actually, 'HOW INSURERS MAKE MONEY', C.cream, 100], [next, 'WHERE YOUR $1,500 GOES', C.cream, 100], [whole, 'THAT\'S THE WHOLE BUSINESS', C.cream, 100]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s80:that's","s81:average","s82:come","s83:paid","s83:invest","s84:afterwards","s86:some","s86:comes","s87:premium"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s80:actually', 's81:one', 's81:pool', 's81:predictable', 's82:two', 's82:risk', 's82:claims', 's82:collect', 's82:combined', 's83:three', 's83:hold', 's83:float', 's84:four', 's84:survive', 's84:reinsurance', 's84:raising', 's85:next', 's85:fifteen', 's85:picture', 's86:crashes', 's86:lights', 's86:invested', 's87:protection', 's87:pile', 's87:whole']
export const IN_RECAP = makePiece('ins-recap', 'Recap on a dusk harbour wall: four lamp posts light in turn with pictures POOL (crowd), PRICE (97% dial), FLOAT (reservoir), SURVIVE + RE-PRICE (a navy reinsurer umbrella over a small one); then your $1,500 bill splits three coins to OTHER PEOPLE\'S CRASHES, THE LIGHTS ON (glowing office) and QUIETLY INVESTED (reservoir + wheel); the close: YOU: PROTECTION under an umbrella, THEM: A PILE TO INVEST with a glowing water wheel, THAT\'S THE WHOLE BUSINESS', {
  mood: 'dark', Component: Recap, beats: [...BEATS, ...ACC],
  sfx: [['s81:one', 'pop', 0.1], ['s82:two', 'pop', 0.1], ['s83:three', 'pop', 0.1], ['s84:four', 'pop', 0.1], ['s86:crashes', 'swish', 0.08], ['s86:lights', 'swish', 0.08], ['s86:invested', 'chime', 0.1], ['s87:whole', 'riser', 0.1]] })
