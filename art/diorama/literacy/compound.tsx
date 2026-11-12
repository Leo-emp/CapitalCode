// ---------------------------------------------------------------- s92–s104: lesson eight, compound growth
// A) s92–s95 inside card 8: a gold coin sprouts smaller coins which sprout their own; Ava (a made-up saver) puts $10,000
//            at an example 7%; year 1: a column of $10,000 gets a green $700 cap; year 2: $10,700 gets a bigger $749 cap.
// B) s96–s99 the columns at 10 / 20 / 30 years: $19,700, $38,700, $76,000 from one deposit; beside it a flat grey
//            column: taking the $700 out every year ends at $31,000 (counting what she took out).
// C) s100–s103 the study: the rule of 72 — 72 ÷ 7 ≈ 10 years, coins double 1 → 2 → 4; the credit card: 72 ÷ 22 ≈ 3.3
//            years, a red pile doubling; "3× AS FAST".
// D) s104    an hourglass (time can't be bought back) and card 9.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { C, Card, Coin, CreditCard, DESK, Defs, Grain, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Column, Hourglass, Jar, Num, Sheet, cues, Sweep } from './kit2'

const K = {
  compound: 's92:compound', earning: 's92:earning', already: 's92:already', earned: 's92:earned',
  ava: 's93:ava', puts: 's93:puts', ten93: 's93:ten', example: 's93:example', seven93: 's93:seven',
  one94: 's94:one', earns94: 's94:earns', hundred94: 's94:hundred',
  two95: 's95:two', seven95: 's95:seven', forty95: 's95:forty',
  gain: 's96:gain', bigger: 's96:bigger', earning96: 's96:earning',
  ten97: 's97:ten', nineteen: 's97:nineteen', twenty97: 's97:twenty', thirty97: 's97:thirty',
  thirty98: 's98:thirty', seventy98: 's98:seventy', deposit: 's98:deposit', never: 's98:never',
  taken: 's99:taken', every99: 's99:every', thirty99: 's99:thirty', counting: 's99:counting',
  shortcut: 's100:shortcut', rule: 's100:rule', divide: 's100:divide', double100: 's100:double',
  seven101: 's101:seven', doubles101: 's101:doubles', ten101: 's101:ten',
  credit102: 's102:credit', twenty102: 's102:twenty', doubles102: 's102:doubles', three102: 's102:three',
  against: 's103:against', three103: 's103:three', fast: 's103:fast',
  time104: 's104:time', back104: 's104:back', grow: 's104:grow',
}
const BASE = 930
const PX = 600 / 76000   // # pixels per dollar for the 30-year chart

const Compound: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s96') - 6, BC = c('s100') - 6, CD = c('s104') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  const sprout = (k: number) => on(f, lerp(t.earning, t.earned + 10, k / 6), 8)
  const yr1 = on(f, t.hundred94, 12), yr2 = on(f, t.forty95, 12)
  const dbl = f < t.doubles101 ? 1 : f < t.ten101 ? 2 : 4
  const redDbl = f < t.doubles102 ? 1 : f < t.three102 ? 2 : 4

  return (
    <g>
      <Defs />
      {/* ---------------- A) money earning money ---------------- */}
      {A > 0 && <g opacity={A}>
        <Sheet n={8} />
        <g opacity={1 - on(f, t.ava - 6, 10)}>
          <Coin x={960} y={640} r={130} o={on(f, t.compound - 6, 8)} />
          {[[-250, -80, 80], [250, -80, 80], [-380, 120, 50], [-160, 160, 50], [160, 160, 50], [380, 120, 50]].map(([dx, dy, r], k) => <Coin key={k} x={960 + dx * sprout(k)} y={640 + dy * sprout(k)} r={r} o={sprout(k)} />)}
        </g>
        <g opacity={on(f, t.ava - 6, 10)}>
          <Person f={f} who="investor" beats={[[0, 'waveA', 'smiling', 'waveB', 14], [t.puts, 'present', 'smiling'], [t.one94, 'point', 'thinking'], [t.forty95, 'thumbsUp', 'smiling']]} x={280} y={1010} s={0.9} />
          <Tag x={280} y={380} text="AVA · MADE-UP SAVER" size={36} />
          <Tag x={960} y={330} text="$10,000 AT AN EXAMPLE 7% A YEAR" size={42} point="none" color={C.paperD} o={on(f, t.ten93, 8)} />
          <Column x={860} base={BASE} h={10000 * PX * 2.4} w={220} color={C.cashD} under="YEAR 1" top={f >= t.hundred94 ? '+$700' : undefined} o={on(f, t.one94 - 4, 8)} />
          <rect x={750} y={BASE - 10000 * PX * 2.4 - 700 * PX * 2.4 * 6 * yr1} width={220} height={700 * PX * 2.4 * 6 * yr1} rx={8} fill={C.cash} opacity={yr1} />
          <Column x={1300} base={BASE} h={10700 * PX * 2.4} w={220} color={C.cashD} under="YEAR 2" top={f >= t.forty95 ? '+$749' : undefined} o={on(f, t.two95 - 4, 8)} />
          <rect x={1190} y={BASE - 10700 * PX * 2.4 - 749 * PX * 2.4 * 6 * yr2} width={220} height={749 * PX * 2.4 * 6 * yr2} rx={8} fill={C.cash} opacity={yr2} />
          <Tag x={1600} y={BASE - 120} text="CAPS DRAWN 6× TALLER" size={26} point="none" color={C.paperD} o={on(f, t.hundred94, 8) * 0.9} />
        </g>
      </g>}

      {/* ---------------- B) 10, 20, 30 years ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={8} />
        <Tag x={500} y={330} text="ONE $10,000 DEPOSIT · 7%" size={38} point="none" color={C.paperD} o={1} />
        {([[t.gain, 10000, 'START', '$10,000'], [t.nineteen, 19700, '10 YEARS', '$19,700'], [t.twenty97, 38700, '20 YEARS', '$38,700'], [t.seventy98, 76000, '30 YEARS', '$76,000']] as const).map(([at, v, under, top], k) => (
          <Column key={k} x={340 + k * 300} base={BASE} h={v * PX * on(f, at - 4, 16)} w={200} color={k ? C.cash : C.cashD} under={under} top={f >= at ? top : undefined} o={on(f, at - 6, 8)} />
        ))}
        <Tag x={1240} y={BASE - 640} text="NEVER ADDED TO" size={34} point="none" color={C.cashL} o={on(f, t.never, 8)} />
        <g opacity={on(f, t.taken - 4, 10)}>
          <Column x={1640} base={BASE} h={31000 * PX * on(f, t.thirty99 - 4, 16)} w={200} color={C.inkSoft} under="$700 TAKEN OUT" top={f >= t.thirty99 ? '$31,000' : undefined} />
          <Tag x={1640} y={BASE - 400} text="INCL. WHAT SHE TOOK" size={28} point="none" color={C.paperD} o={on(f, t.counting, 8)} />
        </g>
      </g>}

      {/* ---------------- C) the rule of 72 ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <Lamp x={1790} s={0.7} />
        <g opacity={1 - on(f, t.credit102 - 4, 10)}>
          <Num x={960} y={430} text="72 ÷ 7% ≈ 10 YEARS" size={110} color={C.brassL} o={on(f, f >= t.seven101 ? t.seven101 : t.divide, 8)} />
          <Num x={960} y={430} text="72 ÷ RATE = YEARS TO DOUBLE" size={84} color={C.paper} o={win(f, t.rule, t.seven101, 8)} />
          {Array.from({ length: dbl }, (_, k) => <Coin key={k} x={960 + (k - (dbl - 1) / 2) * 230} y={DESK - 50} r={100} o={on(f, t.seven101 - 4, 8)} />)}
          <Tag x={960} y={DESK + 160} text={dbl === 1 ? 'TODAY' : dbl === 2 ? '≈ 10 YEARS: × 2' : '≈ 20 YEARS: × 4'} size={40} point="none" o={on(f, t.seven101, 8)} />
        </g>
        <g opacity={on(f, t.credit102 - 4, 10)}>
          <CreditCard x={420} y={DESK - 160} s={1.1} r={-8} />
          <Num x={980} y={430} text="72 ÷ 22% ≈ 3.3 YEARS" size={100} color={C.tomato} o={on(f, t.twenty102, 8)} />
          {Array.from({ length: redDbl }, (_, k) => <Coin key={k} x={1100 + (k - (redDbl - 1) / 2) * 200} y={DESK - 40} r={86} label="−$" o={on(f, t.doubles102 - 4, 8)} />)}
          <ellipse cx={1100} cy={DESK - 40} rx={420} ry={140} fill={C.red} opacity={0.18 * on(f, t.doubles102, 8)} />
          <Tag x={1100} y={DESK + 160} text="A DEBT YOU NEVER PAY DOWN" size={38} point="none" color={C.tomato} ink="#fff" o={on(f, t.doubles102, 8)} />
          <Tag x={420} y={DESK + 40} text="≈ 3× AS FAST" size={50} point="none" color={C.paper} o={on(f, t.three103, 8)} />
        </g>
      </g>}

      {/* ---------------- D) time ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} />
        <Hourglass x={760} y={DESK + 100} s={1.3} t={span(f, CD, CD + 120)} />
        <Tag x={760} y={DESK + 190} text="TIME CAN'T BE BOUGHT BACK" size={40} point="none" o={on(f, t.back104, 8)} />
        <Card x={1360} y={DESK - 240} s={0.8} n={9} r={4} o={on(f, t.grow - 4, 8)} glow={on(f, t.grow, 10)} />
      </g>}

      <Headline f={f} lines={[[t.compound, 'COMPOUND GROWTH', C.ink, 110], [t.ava, 'MEET AVA', C.ink, 110], [t.gain, 'THE GAIN KEEPS GROWING', C.ink, 100], [t.taken, 'SPEND THE GAINS INSTEAD?', C.ink, 96],
        [t.shortcut, 'THE RULE OF 72', C.paper, 110], [t.credit102, 'ON A CARD, IT RUNS BACKWARDS', C.tomato, 96], [t.time104, 'THE ONE INGREDIENT: TIME', C.paper, 100]]} />
      <Sweep f={f} at={EXTRA['fl-compound'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_COMPOUND = makePiece('fl-compound', 'Lesson 8, compound growth: inside card 8 a gold coin sprouts smaller coins that sprout their own; Ava, a made-up saver, puts $10,000 at an example 7%; year 1 column gets a +$700 cap, year 2 a bigger +$749 cap; columns at 10, 20 and 30 years: $19,700, $38,700, $76,000 from one deposit never added to, beside a grey $31,000 column if she took the $700 out each year; the rule of 72: 72 ÷ 7% ≈ 10 years, coins double 1 → 2 → 4; a credit card: 72 ÷ 22% ≈ 3.3 years, a red debt pile doubling, about 3× as fast; an hourglass, time can\'t be bought back, and card 9', {
  mood: 'light', Component: Compound, beats: [...Object.values(K), ...EXTRA['fl-compound']],
  sfx: [['s94:hundred', 'pop', 0.14], ['s98:seventy', 'cash', 0.18], ['s101:doubles', 'pop', 0.14], ['s102:three', 'thud', 0.14], ['s104:grow', 'chime', 0.14]] })
void pop; void Jar
