// ---------------------------------------------------------------- s52–s61: what the formula leaves out.
// A) A big credit report in the middle. Things the score ignores arrive beside it one sentence at a time, get a cross, and
//    leave: pay and a briefcase (salary, job) → a birthday cake and a house pin (age, where you live) → four different people
//    and wedding rings (race, religion, sex, marital status) → a % tag (your card's interest rate) → a $1,000,000 vault that
//    bounces off the report (savings) → a phone checking your own score: a soft check, the needle doesn't move.
// B) A high earner who misses payments (low meter) vs a student who pays a small card on time (higher meter).
// C) The report glows: track record. A price tag swings onto the meter: why does it cost money?
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Glass } from '../pe/kit'
import { Note, Tag } from '../econ/kit'
import { Briefcase, Cake, Card, Meter, NoCross, Report, Vault, GREEN, RED, TXT, INK } from './kit'

const GROUND = 930
const Ring: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}><circle r={34} fill="none" stroke="#E9C25A" strokeWidth={12} /><path d="M-10 -40 l10 -18 l10 18 z" fill="#BFE4FF" /></g>

const NotIn: React.FC<PieceProps> = ({ f, c }) => {
  const leaves = c('s52:leaves'), surprises = c('s52:surprises')
  const salary = c('s53:salary'), job = c('s53:job'), work = c('s53:work')
  const age = c('s54:age'), live = c('s54:live')
  const race = c('s55:race'), religion = c('s55:religion'), sex = c('s55:sex'), marital = c('s55:marital'), out55 = c('s55:out')
  const rate = c('s56:rate'), cards = c('s56:cards'), formula = c('s56:formula')
  const savings = c('s57:savings'), appear = c('s57:appear'), million = c('s57:million'), point = c('s57:point')
  const checking = c('s58:checking'), soft = c('s58:soft'), lower = c('s58:lower')
  const earner = c('s59:earner'), misses = c('s59:misses'), student = c('s59:student'), small = c('s59:small'), time59 = c('s59:time')
  const watches = c('s60:watches'), record = c('s60:record')
  const why = c('s61:why'), cost = c('s61:cost'), money = c('s61:money')

  const A = win(f, 0, earner - 4), B = win(f, earner - 4, watches - 4), Cw = on(f, watches - 4, 10)
  // # each "not in it" group lives for its own sentence, then leaves
  const G = (a: number, b: number) => win(f, a - 4, b - 2, 8)
  const bounce = on(f, appear, 22)
  return (
    <g>
      <Stage id="cs-notin" frame={f} />
      <Headline f={f} lines={[[leaves, 'NOT IN YOUR SCORE', P.ink, 100], [earner, 'WHO SCORES HIGHER?', P.ink, 96], [watches, 'ONLY YOUR TRACK RECORD', P.ink, 96]]} />
      <Ground y={GROUND} />

      {/* # A) the report, and everything it ignores */}
      {A > 0 && <g opacity={A}>
        <Report x={960} y={600} s={1.1} marks={[1, 1, 1, 1, 1, 1]} glow={win(f, surprises, salary, 6)} />
        {/* salary, job */}
        <g opacity={G(salary, age)}>
          <g opacity={on(f, salary, 8)}><Note x={460} y={480} t="PAY" s={1.1} /><NoCross x={460} y={480} s={0.9} o={on(f, salary + 10, 8)} /><Label x={460} y={600} text="SALARY" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, job, 8)}><Briefcase x={1460} y={560} s={1} /><NoCross x={1460} y={490} s={0.9} o={on(f, work, 8)} /><Label x={1460} y={640} text="JOB · EMPLOYER" size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* age, where you live */}
        <g opacity={G(age, race)}>
          <g opacity={on(f, age, 8)}><Cake x={460} y={560} s={1} /><NoCross x={460} y={480} s={0.9} o={on(f, age + 10, 8)} /><Label x={460} y={640} text="AGE" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, live, 8)}><g transform="translate(1460 600) scale(0.45)"><House x={0} y={0} /></g><NoCross x={1460} y={500} s={0.9} o={on(f, live + 10, 8)} /><Label x={1460} y={660} text="WHERE YOU LIVE" size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* race, religion, sex, marital status */}
        <g opacity={G(race, rate)}>
          {['buyer', 'investorF', 'worker', 'owner'].map((who, k) => <g key={k} opacity={on(f, [race, religion, sex, sex + 6][k], 8)}><Person f={f} who={who} beats={[[race, 'idle', 'smiling']]} x={[200, 360, 1560, 1720][k]} y={GROUND} s={0.6} flip={k > 1} /></g>)}
          <g opacity={on(f, marital, 8)}><Ring x={1615} y={470} /><Ring x={1665} y={470} /></g>
          <g opacity={on(f, out55, 8)}><NoCross x={280} y={560} s={0.8} /><NoCross x={1640} y={560} s={0.8} /></g>
        </g>
        {/* the card's interest rate */}
        <g opacity={G(rate, savings)}>
          <g opacity={on(f, rate, 8)}><Card x={460} y={520} s={0.7} /><g transform="translate(560 420)"><Tag x={0} y={0} t="%" s={0.8} col={RED} ink="#FFFFFF" r={0} /></g></g>
          <g opacity={on(f, cards, 8)}><Label x={460} y={680} text="YOUR CARD'S RATE" size={46} font="Bebas Neue" color={P.ink} /></g>
          <NoCross x={460} y={520} s={0.9} o={on(f, formula, 8)} />
        </g>
        {/* savings bounce off */}
        <g opacity={G(savings, checking)}>
          <g opacity={on(f, savings, 8)} transform={`translate(${lerp(1560, 1300, bounce) + 260 * on(f, million, 20)} ${-80 * Math.sin(Math.PI * bounce)})`}><Vault x={0} y={GROUND} s={0.9} /></g>
          <g opacity={on(f, point, 8)}><Label x={1600} y={420} text="+0 POINTS" size={70} font="Bebas Neue" color={RED} /></g>
          <g opacity={on(f, appear, 8)}><Label x={460} y={520} text="NOT ON THE REPORT" size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* checking your own score */}
        <g opacity={G(checking, earner)}>
          <g opacity={on(f, checking, 8)}><Meter x={1480} y={760} s={0.6} v={720} /><Glass x={1380} y={560} s={0.6} /></g>
          <g opacity={on(f, soft, 8)}><Label x={460} y={520} text="A SOFT CHECK" size={60} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, lower, 8)}><Label x={460} y={600} text="SCORE UNCHANGED" size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) the high earner vs the student */}
      {B > 0 && <g opacity={B}>
        <rect x={956} y={360} width={8} height={GROUND - 360} rx={4} fill={P.ink2} opacity={0.3} />
        <Person f={f} who="investor" beats={[[earner, 'confident', 'smug'], [misses, 'oops', 'worried']]} x={300} y={GROUND} s={1} />
        <g opacity={on(f, earner, 8)}><Note x={620} y={760} t="$$$" s={0.9} /><Note x={640} y={700} t="$$$" s={0.9} r={6} /></g>
        <g opacity={on(f, misses, 8)}><Report x={660} y={500} s={0.4} marks={[1, 0, 0, 1, 0, 1]} /></g>
        <g opacity={on(f, misses + 10, 10)}><Meter x={480} y={330} s={0.4} v={610} /></g>
        <Person f={f} who="worker" beats={[[student, 'idle', 'smiling'], [time59, 'thumbsUp', 'smiling']]} x={1620} y={GROUND} s={1} flip />
        <g opacity={on(f, small, 8)}><Card x={1300} y={720} s={0.55} used={0.1} bar /></g>
        <g opacity={on(f, time59, 8)}><Report x={1280} y={500} s={0.4} marks={[1, 1, 1, 1, 1, 1]} /><Meter x={1440} y={330} s={0.4} v={760} /></g>
      </g>}

      {/* # C) track record, and the price */}
      {Cw > 0 && <g opacity={Cw}>
        <Report x={700} y={600} s={1.1} marks={[1, 1, 1, 1, 1, 1]} glow={on(f, record, 12)} />
        <g opacity={on(f, why, 8)}><Meter x={1340} y={760} s={0.7} v={720} /></g>
        <g opacity={on(f, cost, 8)} transform={`translate(1340 ${lerp(300, 420, on(f, cost, 16))}) rotate(${8 * Math.sin((f - cost) / 6) * (1 - on(f, money + 20, 20))})`}><Tag x={0} y={0} t="$ PRICE" s={1.1} col={P.gold} r={0} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s52:this")} x={960} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s53:it")} x={960} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s54:and")} x={960} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s58:it")} x={960} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s59:so")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s59:end")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s59:month")} x={960} y={640} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-notin" />
    </g>
  )
}

export const CS_NOTIN = makePiece('cs-notin', 'What the score leaves out: a big credit report in the middle while things the formula ignores arrive one sentence at a time, get a red cross and leave — a PAY note and a briefcase (salary, job), a birthday cake and a house (age, where you live), four different people and wedding rings (race, religion, sex, marital status), a card with a % tag (your card\'s rate), a $1,000,000 vault that bounces off (+0 points), a magnifier over a meter (a soft check, score unchanged); then a high earner in a suit with cash but late marks and a low meter, vs a student with a small card, all on-time ticks and a higher meter; the report glows and a $ PRICE tag swings onto the meter.', {
  mood: 'light', Component: NotIn,
  beats: ["s52:leaves", "s52:surprises", "s53:salary", "s53:job", "s53:work", "s54:age", "s54:live", "s55:race", "s55:religion", "s55:sex", "s55:marital", "s55:out", "s56:rate", "s56:cards", "s56:formula", "s57:savings", "s57:appear", "s57:million", "s57:point", "s58:checking", "s58:soft", "s58:lower", "s59:earner", "s59:misses", "s59:student", "s59:small", "s59:time", "s60:watches", "s60:record", "s61:why", "s61:cost", "s61:money", "s52:this", "s53:it", "s54:and", "s58:it", "s59:so", "s59:end", "s59:month"],
  sfx: [['s53:salary', 'pop', 0.1], ['s57:appear', 'thud', 0.12], ['s58:soft', 'ding', 0.1], ['s61:cost', 'coin', 0.12]] })
