// ---------------------------------------------------------------- s66–s74: the staircase (sunrise over the terraced hill).
// A) Back to YOUR savings jar on the left; across a gap the orchard sits on a far cliff — a big scary jump (Maya at the
//    edge, crossed); then five stone terraces rise to fill the gap: a staircase.
// B) The recap: Maya climbs one terrace per step and each terrace fills with its own object on its words — 1 the cushion
//    tank on its pillow, 2 the corked bucket, 3 the 401(K) tank with the employer's tap, 4 a little orchard, 5 the drip
//    pipe with its timer — the sun rises behind the hill as she goes.
// C) A big cash pile appears and is crossed (you don't need one); the five numbers glow in order; the trees on the top
//    terrace grow with time. The closing line plays over the finished hill.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { Bucket, C, Coin, Drop, NoMark, Sky, Tank, Tap, Tree, TXT } from './kit'

const BASE = 930, RISE = 110, STEP = 330, LEFT = 110
const top = (k: number) => BASE - k * RISE           // # top y of terrace k (k = 0 is the ground strip)
const mid = (k: number) => LEFT + k * STEP + STEP / 2 // # centre x of terrace k's open strip

const Stair: React.FC<PieceProps> = ({ f, c }) => {
  const back66 = c('s66:back'), savings66 = c('s66:savings')
  const big67 = c('s67:big'), scary67 = c('s67:scary'), jump67 = c('s67:jump'), staircase67 = c('s67:staircase'), each67 = c('s67:each'), next67 = c('s67:next'), safer67 = c('s67:safer'), makes67 = c('s67:makes')
  const one68 = c('s68:one'), cushion68 = c('s68:cushion'), high68 = c('s68:highyield')
  const two69 = c('s69:two'), debt69 = c('s69:debt'), beats69 = c('s69:beats')
  const three70 = c('s70:three'), match70 = c('s70:match'), instant70 = c('s70:instant')
  const four71 = c('s71:four'), index71 = c('s71:index'), fund71 = c('s71:fund')
  const five72 = c('s72:five'), every72 = c('s72:every'), autopilot72 = c('s72:autopilot'), falls72 = c('s72:falls')
  const pile73 = c('s73:pile'), start73 = c('s73:start'), right73 = c('s73:right'), order73 = c('s73:order'), time73 = c('s73:time')
  const works74 = c('s74:works')

  const investing67 = c('s67:investing'), money70 = c('s70:money'), autopilot72b = c('s72:autopilot')
  const AB = one68 - 6
  const gapO = win(f, back66, staircase67 + 6, 10)
  const steps = [one68, two69, three70, four71, five72]
  const rise = (k: number) => on(f, [staircase67, each67, makes67, next67, safer67][k], 14) // # terraces rise on "staircase"
  // # Maya climbs: on each step word she walks up to that terrace
  const level = steps.filter((a) => f >= a).length
  const at = level ? steps[level - 1] : 0
  const walk = level ? span(f, at, at + 26) : 0
  const mx = level ? lerp(level > 1 ? mid(level - 2) - 110 : mid(0) - 110, mid(level - 1) - 110, walk) : mid(0) - 110
  const my = level ? lerp(level > 1 ? top(level - 2) : top(0), top(level - 1), walk) : BASE
  const mBeats: Beat[] = [[0, 'idle', 'neutral'], [jump67, 'nervous', 'worried'], [staircase67, 'relief', 'smiling'], ...steps.map((a, k) => [a, (['point', 'pointUp', 'point', 'pointUp', 'point'] as const)[k], 'smiling'] as Beat), ...steps.map((a, k) => [a + 30, (['present', 'thumbsUp', 'clapA', 'confident', 'present'] as const)[k], 'smiling'] as Beat), [investing67, 'lookFar', 'thinking'], [money70, 'clapA', 'smiling', 'clapB', 12], [autopilot72b, 'relax', 'smiling'], [pile73, 'crossNoA', 'neutral', 'crossNoB', 12], [right73, 'explain', 'smiling'], [time73, 'celebrate', 'smiling']].sort((p, q) => p[0] - q[0]) as Beat[]
  const sun = span(f, staircase67, time73 + 30)

  return (
    <g>
      <Sky id="sv-s-base" f={f} mood="dawn" sun={0.6 + 0.4 * sun} />
      {/* # A) the jar on the left, the orchard on a far cliff, the scary jump */}
      <g opacity={gapO}>
        <path d={`M-100 ${BASE} L 520 ${BASE} L 560 1200 L -100 1200 Z`} fill={C.hillNear} />
        <path d={`M1360 ${top(4)} L 2020 ${top(4)} L 2020 1200 L 1320 1200 Z`} fill={C.hillNear} />
        <Tank x={390} y={BASE} w={180} h={220} f={f} fill={0.5} label="SAVINGS" o={on(f, savings66, 10)} />
        {[0, 1, 2].map((k) => <Tree key={k} x={1500 + k * 140} y={top(4)} s={0.6} hue={k} fruit={1} />)}
        <g opacity={on(f, big67, 10)}><path d={`M 560 ${BASE - 40} Q 940 ${top(4) - 380} 1360 ${top(4) - 30}`} fill="none" stroke={C.ink2} strokeWidth={8} strokeDasharray="18 14" /></g>
        <NoMark x={940} y={480} r={120} o={on(f, jump67, 8) * (1 - on(f, staircase67, 8))} />
        <g opacity={on(f, scary67, 8) * (1 - on(f, staircase67, 8))}><text x={940} y={700} textAnchor="middle" fill={C.ink} style={TXT(56)}>ONE BIG JUMP?</text></g>
      </g>
      {/* # B) the five terraces (they rise on "staircase") */}
      {[0, 1, 2, 3, 4].map((k) => { const r = rise(k), lit = on(f, steps[k], 10), glow = f >= right73 ? on(f, right73 + k * 5, 8) : 0
        return <g key={k} opacity={r} transform={`translate(0 ${(1 - r) * 80})`}>
          <rect x={LEFT + k * STEP} y={top(k)} width={1920 - LEFT - k * STEP + 100} height={1200 - top(k)} fill={k % 2 ? C.stone : '#E0D6C4'} />
          <rect x={LEFT + k * STEP} y={top(k)} width={1920 - LEFT - k * STEP + 100} height={22} fill={C.leaf} />
          {Array.from({ length: 4 }, (_, j) => <rect key={j} x={LEFT + k * STEP + 20 + j * 76} y={top(k) + 40} width={56} height={22} rx={5} fill={C.stoneD} opacity={0.6} />)}
          <g transform={`translate(${LEFT + k * STEP + 36} ${top(k) + 100})`}><circle r={30} fill={lit > 0.5 || glow > 0.5 ? C.gold : C.ink} /><text y={13} textAnchor="middle" fill={lit > 0.5 || glow > 0.5 ? C.ink : '#FFFFFF'} style={TXT(42)}>{k + 1}</text></g>
          {glow > 0 && <rect x={LEFT + k * STEP - 4} y={top(k) - 8} width={STEP + 8} height={12} rx={6} fill={C.goldL} opacity={glow} />}
        </g> })}
      {/* # each terrace's object, on its words */}
      <g opacity={on(f, cushion68, 10)}><ellipse cx={mid(0) + 90} cy={top(0) - 8} rx={90} ry={22} fill="#E58C6B" /><Tank x={mid(0) + 90} y={top(0) - 26} w={130} h={170} f={f} fill={0.62} label={f >= high68 ? '≈ 4%' : '3–6 MO'} color="#59C9B8" /></g>
      <g opacity={on(f, debt69, 10)}><Bucket x={mid(1) + 90} y={top(1) - 2} s={0.5} f={f} fill={0.55} leak={1} plug={on(f, beats69, 12)} /></g>
      <g opacity={on(f, match70, 10)}><Tank x={mid(2) + 90} y={top(2) - 2} w={130} h={170} f={f} fill={0.3 + 0.3 * on(f, instant70, 20)} label="401(K)" />
        <Tap x={mid(2) + 60} y={top(2) - 200} s={0.5} open={on(f, match70 + 6, 10)} f={f} flip len={50} handle={C.green} /></g>
      <g opacity={on(f, index71, 10)}>{[0, 1, 2, 3].map((k) => <Tree key={k} x={mid(3) + 10 + k * 40} y={top(3) - 2} s={0.38} grow={on(f, fund71 + k * 4, 12)} hue={k} fruit={on(f, time73, 20)} />)}</g>
      <g opacity={on(f, every72, 10)}>
        <path d={`M ${mid(4) + 40} ${top(4) - 120} L ${mid(4) + 225} ${top(4) - 120} L ${mid(4) + 225} ${top(4) - 70}`} fill="none" stroke="#9AA6B2" strokeWidth={16} strokeLinecap="round" />
        <g transform={`translate(${mid(4) + 110} ${top(4) - 120})`}><circle r={34} fill={C.paper} stroke="#7C8794" strokeWidth={6} /><line x1={0} y1={0} x2={0} y2={-22} stroke={C.ink} strokeWidth={5} transform={`rotate(${f * 4})`} /></g>
        <Tree x={mid(4) + 225} y={top(4) - 2} s={0.5 + 0.3 * on(f, time73, 30)} hue={2} fruit={on(f, time73, 20)} />
        {[0, 1].map((k) => <Drop key={k} x={mid(4) + 225} y={top(4) - 64 + ((f * 3 + k * 20) % 40)} s={0.35} />)}
        <g opacity={on(f, falls72, 8)}><text x={mid(4) + 150} y={top(4) - 190} textAnchor="middle" fill={C.ink} style={TXT(40)}>EVEN IN A FALL</text></g>
      </g>
      {/* # Maya climbs */}
      <Person f={f} who="investorF" beats={mBeats} x={f < staircase67 ? mid(0) - 110 : 1700} y={f < staircase67 ? BASE : 1070} s={f < staircase67 ? 0.6 : 0.72} flip={f >= staircase67} o={f < staircase67 ? 1 - on(f, staircase67 - 8, 8) : on(f, staircase67, 10)} />
      {/* # C) no big pile needed */}
      <g opacity={win(f, pile73, right73, 8)} transform="translate(760 430)">
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-150 + (k % 4) * 76} y={-Math.floor(k / 4) * 44} width={70} height={40} rx={6} fill="#7FC495" stroke="#4E9A6A" strokeWidth={3} />)}
        <NoMark x={0} y={-30} r={130} o={on(f, pile73 + 6, 8)} />
      </g>
      <g opacity={on(f, start73, 8) * (1 - on(f, right73, 8))}><Coin x={mid(0) - 60} y={top(0) - 60 - 10 * Math.abs(Math.sin(f / 10))} s={0.7} /></g>

      <g opacity={on(f, works74, 12) * (0.6 + 0.4 * Math.sin(f / 8))}>{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={mid(k) + 90} cy={top(k) - 120} r={16} fill={C.goldL} />)}</g>
      <Headline f={f} lines={[[back66, 'YOUR SAVINGS ACCOUNT', C.ink, 96], [staircase67, 'NOT A JUMP: A STAIRCASE', C.ink, 96], [one68, '1: A CUSHION', C.ink, 100], [two69, '2: KILL EXPENSIVE DEBT', C.ink, 100], [three70, '3: TAKE THE FULL MATCH', C.ink, 100], [four71, '4: ONE LOW-FEE FUND', C.ink, 100], [five72, '5: AUTOPILOT', C.ink, 100], [right73, 'THE RIGHT ORDER + TIME', C.greenD, 100], [works74, 'HOW THE MONEY WORKS', C.ink, 96]]} />
    </g>
  )
}

export const SV_STAIR = makePiece('sv-stair', 'The staircase payoff: your savings jar on the left cliff, the orchard on a far cliff, a dashed leap across the gap crossed (one big jump?); five stone terraces rise to fill it; Maya climbs one terrace per step and each fills on its words: 1 the cushion tank on its pillow (≈4%), 2 the leaking bucket gets corked, 3 the 401(K) tank with the employer tap, 4 a little orchard, 5 a drip pipe with a timer (even in a fall); a big cash pile crossed, the five numbers glow in order, trees fruit with time as the sun rises', {
  mood: 'light', Component: Stair,
  beats: ["s66:back", "s66:savings", "s67:big", "s67:scary", "s67:jump", "s67:staircase", "s67:each", "s67:next", "s67:safer", "s67:makes", "s68:one", "s68:cushion", "s68:highyield", "s69:two", "s69:debt", "s69:beats", "s70:three", "s70:match", "s70:instant", "s71:four", "s71:index", "s71:fund", "s72:five", "s72:every", "s72:falls", "s73:pile", "s73:start", "s73:right", "s73:time", "s74:works", "s67:investing", "s70:money", "s72:autopilot"],
  sfx: [['s67:jump', 'thud', 0.12], ['s67:staircase', 'swish', 0.14], ['s68:one', 'pop', 0.1], ['s69:two', 'pop', 0.1], ['s70:three', 'pop', 0.1], ['s71:four', 'pop', 0.1], ['s72:five', 'pop', 0.1], ['s73:time', 'chime', 0.14]] })
