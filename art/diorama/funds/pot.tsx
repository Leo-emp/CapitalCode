// ---------------------------------------------------------------- s8–s17: step one, what a fund is (cream).
// A) A crowd of little people appears (1,000 people, $1,000 each). One person alone can buy only a few shares of a
//    few companies (three small buildings). Together they light up: $1,000,000 — enough for a long row of companies.
// B) Coins fly from the crowd into a big copper pot; a professional (the manager) stands beside it and coins flow
//    from the pot to the companies; the pot's label becomes FUND. Each person holds a slice token; when the
//    investments go up every slice grows (green arrow), when they go down every slice shrinks (red arrow).
// C) The manager's desk costs money: a fee scoop dips into the pot once a year (calendar page flips) — the EXPENSE
//    RATIO tag; a magnifier on the fee ("keep an eye on it"); then many pots stand in a row: $45 TRILLION in US funds.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, Stat, fly, win, type Beat } from '../aimoney/common'
import { Ground, Magnifier } from '../power/kit2'
import { CalPage, DollarBill } from '../bank/kit'
import { Tag } from '../money4/kit'
import { Scoop } from '../fee/kit'
import { Company } from '../invest/kit'
import { Crowd, Folk, Pot, Slice } from './kit'

const GROUND = 930
const K = {
  fund8: 's8:fund', anyway: 's8:anyway',
  picture: 's9:picture', k1000: 's9:1000', each9: 's9:each', k1000b: 's9:1000#2', dollars9: 's9:dollars', invest9: 's9:invest',
  own10: 's10:own', person10: 's10:person', afford: 's10:afford', few: 's10:few', shares10: 's10:shares', companies10: 's10:companies',
  together: 's11:together', one11: 's11:1', million: 's11:million', enough: 's11:enough', pieces: 's11:pieces', hundreds: 's11:hundreds', companies11: 's11:companies',
  put12: 's12:put', big12: 's12:big', pot12: 's12:pot', professional: 's12:professional', invests12: 's12:invests', them12: 's12:them', pot12b: 's12:pot#2', fund12: 's12:fund',
  owns13: 's13:owns', slice13: 's13:slice', based: 's13:based', much13: 's13:much', put13: 's13:put',
  investments: 's14:investments', up14: 's14:up', slice14: 's14:slice', up14b: 's14:up#2', go14b: 's14:go#2', down14: 's14:down', slice14b: 's14:slice#2', down14b: 's14:down#2',
  running: 's15:running', costs: 's15:costs', charges: 's15:charges', yearly: 's15:yearly', fee15: 's15:fee', expense: 's15:expense', small15: 's15:small', percentage: 's15:percentage', taken: 's15:taken', single: 's15:single', year15: 's15:year',
  eye: 's16:eye', fee16: 's16:fee', matter: 's16:matter', lot: 's16:lot',
  idea: 's17:idea', enormous: 's17:enormous', y2025: 's17:2025', funds17: 's17:funds', held17: 's17:held', k45: 's17:45', trillion: 's17:trillion',
}
type Key = keyof typeof K

const PotScene: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.put12 - 8, BC = q.running - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const solo = win(f, q.own10, q.together, 10), group = on(f, q.together, 12)
  const mBeats: Beat[] = [[0, 'idle', 'neutral'], [q.professional, 'waveA', 'smiling'], [q.invests12, 'present', 'smiling'], [q.up14, 'thumbsUp', 'smiling'], [q.down14, 'shrug', 'worried'],
    [BC, 'idle', 'neutral'], [q.charges, 'point', 'neutral'], [q.taken, 'reachDown', 'neutral'], [q.eye, 'idle', 'neutral']]
  const upT = on(f, q.up14, 12) * (1 - on(f, q.down14, 12)), downT = on(f, q.down14, 12)
  const sliceS = 1 + 0.25 * upT - 0.25 * downT
  // # the fee scoop dips into the pot on "charges" and again on "every year"
  const dip = Math.max(win(f, q.charges, q.charges + 40, 8), win(f, q.taken, q.taken + 40, 8), win(f, q.year15, q.year15 + 40, 8))
  return (
    <g>
      <Stage id="fd-pot" frame={f} />
      {/* # A) 1,000 people with $1,000 each; one alone vs all together */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={on(f, q.picture, 10) * (1 - solo)}>
          <Crowd x={960} y={430} cols={20} rows={6} gap={70} s={0.95} shown={120 * span(f, q.picture, q.k1000 + 24)} lit={120 * group} />
          <g opacity={on(f, q.k1000, 8) * (1 - group)}><Tag x={330} y={330} t="1,000 PEOPLE" r={-6} /></g>
          <g opacity={on(f, q.k1000b, 8) * (1 - group)}><Tag x={1590} y={330} t="$1,000 EACH" r={6} col="#9FD8B4" /></g>
        </g>
        {/* # one person alone: a few shares of a few companies */}
        <g opacity={solo}>
          <Folk x={500} y={GROUND - 40} s={4.2} col="#2A8FD0" />
          <g opacity={on(f, q.afford, 8)}><DollarBill x={720} y={560} s={0.8} t="$1,000" /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, q.few + k * 4, 8)}><Company x={1100 + k * 260} y={GROUND} s={0.55} name={['ACME', 'BOLT', 'CREST'][k]} col={['#5B7DB1', '#1E9A63', '#B4821C'][k]} /></g>)}
          <g opacity={on(f, q.shares10, 8)}><Label x={1360} y={GROUND + 60} text="A FEW SHARES OF A FEW COMPANIES" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # together: $1,000,000 and hundreds of companies */}
        <g opacity={group}>
          <g opacity={on(f, q.one11, 8)} transform={`translate(960 ${330 - 14 * pop(f, q.million, 14)})`}><rect x={-330} y={-80} width={660} height={140} rx={26} fill={P.card} stroke={P.goldInk} strokeWidth={5} /><Label x={0} y={24} text={f >= q.million ? '$1,000,000 TOGETHER' : '$1…'} size={84} font="Bebas Neue" color={P.goldInk} /></g>
          {Array.from({ length: 14 }, (_, k) => <g key={k} opacity={on(f, q.pieces + k * 2, 6)}><Company x={140 + k * 128} y={GROUND} s={0.3} name="" col={['#5B7DB1', '#1E9A63', '#B4821C', '#7A5AA8', '#D9483A'][k % 5]} /></g>)}
          <g opacity={on(f, q.hundreds, 8)}><Label x={960} y={GROUND + 60} text="SMALL PIECES OF HUNDREDS OF COMPANIES" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      {/* # B) the pot, the professional, the slices */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Crowd x={330} y={560} cols={6} rows={5} gap={62} s={0.85} lit={30 * on(f, q.put12, 10)} />
        {[0, 1, 2, 3, 4].map((k) => { const fl = fly(f, q.put12 + k * 5, [330, 560], [960, 640], 16, 120); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
        <g transform={`translate(0 ${-14 * pop(f, q.pot12, 14)})`}><Pot x={960} y={GROUND} s={0.95} fill={0.2 + 0.6 * span(f, q.put12, q.pot12 + 30) + 0.25 * upT - 0.25 * downT} label={f >= q.pot12b ? 'FUND' : 'ONE BIG POT'} glow={win(f, q.fund12, q.fund12 + 30)} /></g>
        <g opacity={on(f, q.professional, 10)}><Person f={f} who="investorF" beats={mBeats} x={1290} y={GROUND} s={0.95} flip /><Label x={1290} y={GROUND + 60} text="A PROFESSIONAL" size={40} font="Bebas Neue" color={P.ink2} /></g>
        {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, q.invests12 + k * 3, 6)}><Company x={1500 + (k % 3) * 150} y={k < 3 ? GROUND : GROUND - 250} s={0.28} name="" col={['#5B7DB1', '#1E9A63', '#B4821C', '#7A5AA8', '#D9483A'][k]} /></g>)}
        {[0, 1, 2].map((k) => { const fl = fly(f, q.invests12 + k * 6, [960, 620], [1560 + k * 100, 700], 18, 160); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.55} /> : null })}
        {/* # slices: big when more was put in */}
        <g opacity={on(f, q.owns13, 10)}>
          {[[180, 0.08, 'SMALL'], [330, 0.18, ''], [480, 0.3, 'BIGGER']].map(([x, fr, t], k) => <g key={k} opacity={k === 1 ? on(f, q.slice13, 8) : on(f, q.based + k * 6, 8)}><Slice x={x as number} y={260 + 16} s={0.55 * sliceS} frac={fr as number} /></g>)}
          <g opacity={on(f, q.much13, 8)}><Label x={330} y={360} text="SLICE = WHAT YOU PUT IN" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={upT} transform={`translate(960 ${300 - 30 * upT})`}><path d="M0 -60 L50 10 L20 10 L20 70 L-20 70 L-20 10 L-50 10 Z" fill="#1E9A63" /><Label x={110} y={20} text="EVERY SLICE UP" size={46} anchor="start" font="Bebas Neue" color={P.mintInk} o={on(f, q.slice14, 8)} /></g>
        <g opacity={downT} transform={`translate(960 ${300 + 30 * downT})`}><path d="M0 70 L50 0 L20 0 L20 -60 L-20 -60 L-20 0 L-50 0 Z" fill="#D9483A" /><Label x={110} y={20} text="EVERY SLICE DOWN" size={46} anchor="start" font="Bebas Neue" color={P.coralInk} o={on(f, q.slice14b, 8)} /></g>
      </g>}
      {/* # C) the yearly fee, then 45 trillion */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.enormous, 12)}>
          <Pot x={760} y={GROUND} s={0.95} fill={0.75 - 0.08 * span(f, q.charges, q.year15 + 40)} label="FUND" />
          <g transform={`translate(${1040 - 60 * dip} ${520 + 90 * dip}) rotate(${-25 * dip})`}><Scoop x={0} y={0} s={1.0} full={dip} /></g>
          <Person f={f} who="investorF" beats={mBeats} x={1330} y={GROUND} s={0.95} flip />
          <g opacity={on(f, q.yearly, 8)}><CalPage x={1640} y={430} s={0.9} m={f >= q.year15 ? 'YEAR 2' : 'YEAR 1'} d={f >= q.year15 ? 'FEE' : 'FEE'} /></g>
          <g opacity={on(f, q.expense, 8)} transform={`translate(400 ${420 - 10 * pop(f, q.expense, 12)})`}><Tag x={0} y={0} t="EXPENSE RATIO" r={-5} col="#F4C95D" /></g>
          <g opacity={on(f, q.percentage, 8)}><Label x={400} y={560} text="A SMALL % OF YOUR MONEY" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, q.eye, 10)} transform={`translate(${lerp(1200, 1040, on(f, q.eye, 16))} 560)`}><Magnifier x={0} y={0} s={1.1} /></g>
          <g opacity={on(f, q.matter, 8)}><Label x={760} y={GROUND + 60} text={f >= q.lot ? 'THE FEE MATTERS — A LOT' : 'THE FEE MATTERS…'} size={48} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, q.enormous, 12)}>
          {Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, q.enormous + k * 4, 8)}><Pot x={200 + k * 253} y={GROUND} s={0.45} fill={0.8} label="FUND" /></g>)}
          <g opacity={on(f, q.y2025, 8)}><Tag x={960} y={330} t="END OF 2025" r={-4} /></g>
          <g opacity={on(f, q.k45, 10)} transform={`translate(0 ${-14 * pop(f, q.trillion, 14)})`}><Stat x={960} y={560} big="$45 TRILLION" small="IN US FUNDS" w={760} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[q.fund8, 'WHAT IS A FUND?', P.ink, 110], [q.picture, '1,000 PEOPLE × $1,000', P.ink, 104], [q.own10, 'ON THEIR OWN…', P.ink, 106], [q.together, 'TOGETHER', P.ink, 110],
        [q.put12, 'ONE BIG POT = A FUND', P.ink, 104], [q.owns13, 'EACH PERSON OWNS A SLICE', P.ink, 100], [q.investments, 'UP TOGETHER, DOWN TOGETHER', P.ink, 100],
        [q.running, 'RUNNING IT COSTS MONEY', P.ink, 104], [q.expense, 'THE EXPENSE RATIO', P.coralInk, 106], [q.eye, 'KEEP AN EYE ON IT', P.coralInk, 106], [q.idea, 'A SIMPLE, HUGE IDEA', P.ink, 104]]} />
      <Vignette id="fd-pot" />
    </g>
  )
}

export const FD_POT = makePiece('fd-pot', 'What a fund is: a crowd of 1,000 little people with $1,000 each; one person alone buys a few shares of three companies; together they make $1,000,000 for a row of many companies; coins fly into a copper pot that a professional manages and coins flow on to companies; the pot is labelled FUND; slice tokens sized by what each put in; green arrow every slice up, red arrow every slice down; a fee scoop dips into the pot every year (calendar, EXPENSE RATIO tag, magnifier); a row of pots and $45 TRILLION in US funds', {
  mood: 'light', Component: PotScene, beats: Object.values(K),
  sfx: [['s9:1000', 'pop', 0.2], ['s11:million', 'coin', 0.25], ['s12:pot', 'pop', 0.2], ['s15:charges', 'whoosh', 0.2], ['s17:trillion', 'pop', 0.25]] })
