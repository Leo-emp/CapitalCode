// ---------------------------------------------------------------- s39–s47: step three, the savings rate.
// A) A warm workshop: a big brass gauge labelled SAVINGS RATE; a pay envelope drops into a splitting machine: SPEND sack left, KEEP stack right.
// B) Maya's $50,000: $45,000 spend / $5,000 keep; the gauge needle settles on 10%.
// C) The twist — two arms of the machine: the KEEP stack grows into a pile, AND the spending sack shrinks so the number tower drops. Her 10% number: $1,125,000.
// D) Compare 50%: spend $25,000 / keep $25,000; the gauge swings to 50%; the tower drops to $625,000 while her pile grows fast; two roads, the second far shorter.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, C, Check, Defs, Envelope, FONT, Gauge, Grain, Sack, Stack, Tag, Tower, Trail, Flag, fadeIn, scene } from './kit'

const G = 930

// # the splitting machine: a hopper on top, two chutes (left SPEND, right KEEP); split 0–1 opens the flaps; part 0–1 = share to KEEP
const Splitter: React.FC<{ x: number; y: number; f: number; run: number; o?: number }> = ({ x, y, f, run, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.2} />
    <rect x={-150} y={-420} width={300} height={300} rx={26} fill="#C08A54" /><rect x={-150} y={-420} width={70} height={300} rx={20} fill="#fff" opacity={0.15} />
    <path d="M-200 -520 L200 -520 L120 -420 L-120 -420 Z" fill="#9E6B40" />
    <circle cx={0} cy={-270} r={70} fill="#7A4C2E" /><circle cx={0} cy={-270} r={50} fill={C.gold} transform={`rotate(${run * f * 3})`} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-6} y={-316} width={12} height={92} rx={4} fill={C.goldD} transform={`rotate(${k * 45 + run * f * 3} 0 -270)`} />)}
    <path d="M-150 -170 L-300 -60 L-300 -10 L-150 -120 Z" fill="#9E6B40" /><path d="M150 -170 L300 -60 L300 -10 L150 -120 Z" fill="#9E6B40" />
    <rect x={-110} y={-120} width={220} height={120} fill="#7A4C2E" />
    <text x={-240} y={30} textAnchor="middle" fill={C.cream} style={{ font: `400 40px ${FONT.big}`, letterSpacing: 2 }}>SPEND</text>
    <text x={240} y={30} textAnchor="middle" fill={C.cream} style={{ font: `400 40px ${FONT.big}`, letterSpacing: 2 }}>KEEP</text>
  </g>
)
const Workshop: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="url(#fr-shop)" />
    {Array.from({ length: 7 }, (_, k) => <rect key={k} x={k * 290 - 40} y={0} width={10} height={G} fill="#000" opacity={0.06} />)}
    <rect x={0} y={G - 10} width={1920} height={160} fill="#6B4A36" /><rect x={0} y={G - 10} width={1920} height={160} fill="url(#fr-plank)" />
    {[300, 1620].map((lx) => <g key={lx}><line x1={lx} y1={0} x2={lx} y2={120} stroke="#2E2220" strokeWidth={4} /><path d={`M${lx - 50} 160 L${lx + 50} 160 L${lx + 30} 120 L${lx - 30} 120 Z`} fill="#2E2220" /><ellipse cx={lx} cy={170} rx={40} ry={12} fill="#FFE7A6" /><path d={`M${lx - 40} 170 L${lx - 260} ${G} L${lx + 260} ${G} L${lx + 40} 170 Z`} fill="#FFE7A6" opacity={0.07} /></g>)}
  </g>
)

const Rate: React.FC<PieceProps> = ({ f, c }) => {
  const number39 = c('s39:number'), video39 = c('s39:video'), important = c('s39:important'), savings39 = c('s39:savings'), rate39 = c('s39:rate')
  const share = c('s40:share'), take40 = c('s40:take'), keep40 = c('s40:keep'), spend40 = c('s40:spend')
  const fifty = c('s41:fifty'), pay41 = c('s41:pay')
  const spends42 = c('s42:spends'), forty42 = c('s42:forty'), keeps42 = c('s42:keeps'), five42 = c('s42:five'), ten42 = c('s42:ten')
  const twist = c('s43:twist'), two43 = c('s43:two'), same43 = c('s43:same')
  const every44 = c('s44:every'), spend44 = c('s44:spend'), invested = c('s44:invested'), pile44 = c('s44:pile'), faster = c('s44:faster'), lowers = c('s44:lowers'), number44 = c('s44:number'), shrinks = c('s44:shrinks')
  const hundred45 = c('s45:hundred'), thousand45 = c('s45:thousand'), spending45 = c('s45:spending'), twentyfive45 = c('s45:twenty'), million45 = c('s45:million'), dollars45 = c('s45:dollars')
  const compare = c('s46:compare'), half46 = c('s46:half'), spends46 = c('s46:spends'), twentyfive46 = c('s46:twenty'), six46 = c('s46:six'), adds = c('s46:adds'), twentyfiveB = c('s46:twenty#3')
  const salary47 = c('s47:salary'), shorter = c('s47:shorter'), road = c('s47:road')

  const AB = c('s41') - 6, BC = c('s43') - 6, CD = c('s46') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  // # the gauge value through the piece: 0 → 10% on "ten" → 50% on "half"
  const gv = lerp(lerp(0, 0.1, on(f, ten42, 20)), 0.5, on(f, half46, 24))
  // # an envelope drops into the hopper and splits into two streams
  const drop = (at: number) => ({ y: lerp(-80, 380, span(f, at, at + 14)), o: on(f, at, 4) * (1 - on(f, at + 12, 4)) })

  return (
    <g>
      <Defs />
      {/* # A) the workshop machine: pay in, spend left, keep right */}
      {A > 0 && <g opacity={A}>
        <Workshop />
        <Gauge x={960} y={520} v={0.1 + 0.3 * on(f, video39, 16) + 0.08 * Math.sin(f / 18) * on(f, rate39, 10)} s={1.15} o={win(f, number39 - 4, take40 + 4, 10)} text={f >= rate39 ? 'SAVINGS RATE' : ''} />
        <g opacity={on(f, take40 - 6, 10)}>
          <Splitter x={960} y={G} f={f} run={on(f, take40, 10)} />
          {(() => { const d = drop(take40); return <Envelope x={960} y={d.y} s={0.9} text="TAKE-HOME PAY" o={d.o} /> })()}
          <g opacity={on(f, keep40, 8)}><Stack x={1360} y={G} n={3 * on(f, keep40, 14)} /></g>
          <g opacity={on(f, spend40, 8)}><Sack x={560} y={G} s={1} /></g>
        </g>
        <Person f={f} who="investorF" beats={[[0, 'explain', 'neutral'], [c('s40:savings'), 'countOne', 'neutral'], [keep40, 'point', 'smiling']]} x={240} y={G} s={0.85} />
      </g>}

      {/* # B) Maya's $50,000: $45,000 spend, $5,000 keep → 10% */}
      {B > 0 && <g opacity={B}>
        <Workshop />
        <Splitter x={960} y={G} f={f} run={1} />
        {(() => { const d = drop(fifty); return <Envelope x={960} y={d.y} s={0.9} text="$50,000" o={d.o} /> })()}
        <g opacity={on(f, forty42 - 4, 8)}><Sack x={560} y={G} s={1.25} /><Tag x={560} y={G - 260} text="SPENDS $45,000" size={40} o={on(f, forty42, 8)} /></g>
        <g opacity={on(f, five42 - 4, 8)}><Stack x={1360} y={G} n={2} /><Tag x={1360} y={G - 170} text="KEEPS $5,000" size={40} o={on(f, five42, 8)} color={C.cashD} ink="#fff" /></g>
        <Gauge x={960} y={330} v={gv} s={0.7} text={f >= ten42 ? '10%' : ''} o={on(f, c('s42:savings'), 8)} />
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [ten42, 'pointUp', 'smiling']]} x={1680} y={G} s={0.85} flip />
        <Tag x={1680} y={G - 500} text="MAYA" size={36} o={on(f, fifty, 8) * (1 - on(f, ten42, 8))} />
      </g>}

      {/* # C) the twist: two things move at once */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="day" f={f} sun={[1700, 230]} ground={G} />
        {/* # left: her invested pile grows */}
        <g opacity={on(f, every44 - 4, 10)}><Stack x={480} y={G} n={2 + 4 * span(f, invested, faster + 10)} s={1.1} /><Tag x={480} y={G + 70} text="HER PILE GROWS" size={36} o={on(f, pile44, 8)} point="none" color={C.cashD} ink="#fff" /></g>
        {/* # middle: her spending sack shrinks */}
        <g opacity={on(f, spend44 - 4, 10)}><Sack x={960} y={G} s={lerp(1.3, 1.0, on(f, lowers, 20))} /><Tag x={960} y={G + 70} text="SPENDING SHRINKS" size={36} o={on(f, c('s44:spending'), 8)} point="none" /></g>
        {/* # right: the number tower (25 × spending) drops */}
        <g opacity={on(f, number44 - 4, 10)}>
          <Tower x={1440} y={G} h={lerp(560, 500, on(f, shrinks, 20)) + 12 * win(f, c('s45:times'), c('s45:times') + 14, 5)} w={220} label={f >= thousand45 ? '$1,125,000' : undefined} />
          <rect x={-120} y={-lerp(560, 500, on(f, shrinks, 20)) - 30} width={240} height={30} rx={12} fill={C.gold} opacity={win(f, million45, thousand45 + 20, 6) * 0.8} transform="translate(1440 930)" />
          <Check x={1600} y={G + 70} r={30} p={on(f, hundred45, 8)} />
          <Tag x={1440} y={G + 70} text={f >= twentyfive45 ? '25 × $45,000' : 'HER NUMBER'} size={36} o={1} point="none" color={f >= c('s45:dollars') ? C.gold : C.cream} />
        </g>
        {[[c('s43:moves'), 480], [same43, 1440]].map(([at, x], k) => <g key={k} opacity={win(f, at as number, invested + 20, 6)}><circle cx={x as number} cy={420} r={60} fill={C.gold} /><text x={x as number} y={444} textAnchor="middle" fill={C.ink} style={{ font: `400 70px ${FONT.big}` }}>{k + 1}</text></g>)}
      </g>}

      {/* # D) compare: Maya saving half */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="day" f={f} sun={[1700, 230]} ground={G} />
        <g opacity={1 - on(f, salary47 - 6, 10)}>
          <Gauge x={360} y={520} v={gv} s={0.62} text={f >= half46 ? '50%' : '10%'} />
          <g opacity={on(f, spends46 - 4, 8)}><Sack x={820} y={G} s={0.95} /><Tag x={820} y={G - 220} text="SPENDS $25,000" size={36} o={on(f, twentyfive46, 8)} /></g>
          <g opacity={on(f, c('s46:number') - 4, 8)}><Tower x={1180} y={G} h={lerp(500, 280, on(f, six46, 20)) - 10 * win(f, c('s46:hundred'), c('s46:hundred') + 14, 5)} w={190} label={f >= c('s46:thousand#2') ? '$625,000' : undefined} /></g>
          <g opacity={on(f, adds - 4, 8)}><Stack x={1580} y={G} n={2 + 5 * on(f, twentyfiveB, 24) + win(f, c('s46:year'), c('s46:year') + 20, 6)} s={1.05} /><Tag x={1580} y={G - 360} text="+$25,000 A YEAR" size={36} o={on(f, twentyfiveB, 8)} color={C.cashD} ink="#fff" /></g>
        </g>
        <g opacity={on(f, salary47 - 6, 10)}>
          <Trail d={`M180 ${G - 160} L1760 ${G - 160}`} p={on(f, salary47, 20)} w={34} />
          <Trail d={`M180 ${G + 20} L${lerp(1760, 860, on(f, shorter, 20))} ${G + 20}`} p={on(f, salary47, 20)} w={34} color={C.cashL} />
          <Flag x={1760} y={G - 170} f={f} s={0.6} text="10%" /><Flag x={lerp(1760, 860, on(f, shorter, 20))} y={G + 10} f={f} s={0.6} color={C.cashD} text="50%" />
          <Tag x={960} y={330} text={f >= c('s47:see') ? 'HOW MUCH SHORTER?' : 'SAME SALARY, SHORTER ROAD'} size={46} o={on(f, road, 8)} point="none" color={f >= c('s47:see') ? C.gold : C.cream} />
        </g>
      </g>}

      <Headline f={f} lines={[[important, 'STEP 3: YOUR SAVINGS RATE', C.ink, 100], [share, 'THE SHARE OF PAY YOU KEEP', C.terraD, 96], [fifty, 'MAYA: $50,000 TAKE-HOME', C.ink, 100], [ten42, 'SAVINGS RATE: 10%', C.cashD, 104],
        [twist, 'IT MOVES TWO THINGS AT ONCE', C.ink, 96], [million45, 'NUMBER: $1,125,000', C.cashD, 100], [compare, 'NOW: SAVING HALF', C.ink, 104], [six46, 'NUMBER: $625,000', C.cashD, 100]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s40:savings", "s42:savings", "s43:moves", "s44:spending", "s45:times", "s46:number", "s46:hundred", "s46:thousand#2", "s46:year", 's39:number', 's39:video', 's39:savings', 's39:rate', 's40:share', 's40:take', 's40:keep', 's40:spend', 's41:fifty', 's41:pay', 's42:forty', 's42:keeps', 's42:five', 's42:ten',
  's43:twist', 's43:two', 's43:same', 's44:every', 's44:spend', 's44:invested', 's44:pile', 's44:faster', 's44:lowers', 's44:number', 's44:shrinks', 's45:spending', 's45:twenty', 's45:million', 's45:hundred', 's45:thousand', 's45:dollars',
  's46:compare', 's46:half', 's46:spends', 's46:twenty', 's46:six', 's46:adds', 's46:twenty#3', 's47:salary', 's47:shorter', 's47:road', 's47:see']
export const FR_RATE = makePiece('fr-rate', 'Freedom step three: a warm workshop with a brass SAVINGS RATE gauge; a TAKE-HOME PAY envelope drops into a splitting machine, SPEND sack left, KEEP stack right; Maya\'s $50,000: SPENDS $45,000 / KEEPS $5,000, the gauge settles at 10%; the twist: her pile grows (1) and her spending sack shrinks so her number tower drops (2), 25 × $45,000 = $1,125,000; saving half: gauge to 50%, SPENDS $25,000, tower to $625,000, +$25,000 A YEAR; two roads, the 50% one far shorter', {
  mood: 'light', Component: Rate, beats: BEATS,
  sfx: [['s39:rate', 'click', 0.15], ['s40:take', 'whoosh', 0.15], ['s42:ten', 'ding', 0.15], ['s43:twist', 'swish', 0.15], ['s45:million', 'pop', 0.15], ['s46:half', 'click', 0.15], ['s47:shorter', 'whoosh', 0.15]] })
