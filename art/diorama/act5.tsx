// ============================================================
// ACTS 5–6 — "How to think about your bet" and "The answer"
// (s74–s91), diorama pieces. Sourced: equal-weight top 10 ≈ 3.2%;
// 37.9 cents of every dollar on 10 companies (Jun 2026).
// ============================================================
import React from 'react'
import { Emblem } from '../logo/Emblem'
import { getProp } from '../props/registry'
import { Actor } from '../rig/Actor'
import { Mini } from '../rig/Mini'
import { expressionAt } from '../motion/acting'
import { poseAt, type PoseId } from '../rig/pose'
import { Calendar, countTo, Donut, Label, PriceTag } from './charts'
import { arc, between, Building, easeInOut, easeOut, FundBox, lerp, on, P, Pedestal, Platform, pop, rnd, span, Stage, Tower, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
const Tick: React.FC<{ x: number; y: number; o: number; ok?: boolean; r?: number }> = ({ x, y, o, ok = true, r = 46 }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={ok ? P.mint : P.coral} />
    {ok ? <path d={`M${-r * 0.45} 0 l${r * 0.3} ${r * 0.3} l${r * 0.6} ${-r * 0.65}`} stroke={P.white} strokeWidth={r * 0.22} fill="none" strokeLinecap="round" /> : <path d={`M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}`} stroke={P.white} strokeWidth={r * 0.22} strokeLinecap="round" />}</g>
)
// # a step badge: "1  Find your real bet"
const Step: React.FC<{ n: number; text: string; o: number }> = ({ n, text, o }) => (
  <g opacity={o}><circle cx={250} cy={140} r={48} fill={P.champ} /><text x={250} y={160} textAnchor="middle" fill={P.navy0} style={{ font: '400 64px "Bebas Neue"' }}>{n}</text>
    <Label x={320} y={162} text={text} size={60} font="Bebas Neue" anchor="start" color={P.ink} /></g>
)

// ---------------------------------------------------------------- s74–s77b: step 1 — find your real bet (the same giants, three times over)
const FUNDS = [['S&P 500', 's76:sp'], ['TECH', 's76:tech'], ['GROWTH', 's76:growth']] as const
const Step1: React.FC<PieceProps> = ({ f, c }) => {
  const simple = c('s74:simple'), first = c('s75:first'), same = c('s76:same'), three = c('s76:three'), add = c('s77:add'), surp = c('s77:surprised'), pub = c('s77a:publishes'), five = c('s77a:five'), write = c('s77b:write'), appear = c('s77b:appearing')
  const A = between(f, simple, first - 2), B = between(f, first - 2, c('s77a') - 4), C = on(f, c('s77a') - 4)
  const xs = [520, 960, 1400], merge = easeInOut(span(f, add, add + 30))
  const list = ['NVIDIA', 'Apple', 'Microsoft', 'Alphabet', 'Amazon']
  return (
    <g>
      <Stage id="s1" tint="teal" frame={f} />
      {/* # three simple steps, no advice */}
      <g opacity={A}>
        {['Find your real bet', 'Check your timeline', 'Know the other versions'].map((t, i) => (
          <g key={i} transform={`translate(${480 + i * 480} 560) scale(${pop(f, simple + i * 6)})`}>
            <rect x={-200} y={-180} width={400} height={360} rx={30} fill={P.card} opacity={0.75} /><rect x={-200} y={-180} width={400} height={360} rx={30} fill="none" stroke={P.champ} strokeWidth={4} />
            <circle cx={0} cy={-70} r={56} fill={P.champ} /><text x={0} y={-46} textAnchor="middle" fill={P.navy0} style={{ font: '400 76px "Bebas Neue"' }}>{i + 1}</text>
            <Label x={0} y={80} text={t} size={36} />
          </g>
        ))}
        <Label x={960} y={940} text="no one telling you what to buy" size={40} color={P.ink} o={on(f, c('s74:without'))} />
      </g>
      <g opacity={B}>
        <Step n={1} text="FIND YOUR REAL BET" o={on(f, first)} />
        {/* # "find out what your real bet is": a face-down card under a magnifier turns over to show the bet */}
        <g opacity={between(f, c('s75:find') - 4, c('s76:sp') - 2)} transform={`translate(960 ${lerp(600, 560, on(f, c('s75:real') - 4, 16))})`}>
          <g transform={`scale(${Math.abs(Math.cos(Math.PI * on(f, c('s75:bet'), 10)) * 0.999) + 0.001} 1)`}>
            <rect x={-150} y={-200} width={300} height={400} rx={26} fill={f < c('s75:bet') + 5 ? P.navy3 : P.paper} stroke={P.edge} strokeWidth={3} />
            {f < c('s75:bet') + 5 ? <Label x={0} y={40} text="?" size={160} font="Bebas Neue" color={P.champL} /> : <Prop id="dice" x={0} y={0} size={170} f={f} />}
          </g>
          <g transform={`translate(${lerp(420, 150, on(f, c('s75:find'), 20))} ${lerp(-260, -150, on(f, c('s75:find'), 20))})`}><Prop id="magnifier" x={0} y={0} size={230} f={f} /></g>
        </g>
        {FUNDS.map(([name, k], i) => {
          const x = lerp(xs[i], 960, merge), up = on(f, same + i * 4, 20) * (1 - merge)
          return (
            <g key={name} opacity={on(f, c(k))}>
              <g opacity={1 - merge}><FundBox id={`s1${i}`} x={xs[i]} y={760} s={0.8} label={name} open={on(f, same - 6)} /></g>
              {/* # the same handful of giants rise out of every fund */}
              {[0, 1, 2].map((t) => <Tower key={t} id={`s1${i}`} i={t} x={x + (t - 1) * 70} y={lerp(680, 900, merge) - up * 40} h={(140 + t * 50) * Math.max(up, merge)} w={54} glow={on(f, three)} />)}
            </g>
          )
        })}
        <Label x={960} y={340} text="×3" size={150} font="Bebas Neue" color={P.goldInk} o={between(f, three, add)} />
        {/* # added up: one big pile in the same names */}
        <g opacity={on(f, add + 20)}><Platform id="s1m" cx={960} cy={920} rx={360} ry={60} /><Label x={960} y={1010} text="how much sits in the same names" size={36} /></g>
        <g opacity={on(f, surp)}><Pedestal x={1560} y={900} r={110} /><Mini look="hero" x={1540} y={900} scale={1.4} frame={f} seed={21} mood="sad" /><Prop id="exclamation" x={1560} y={560} size={110} f={f} /></g>
      </g>
      {/* # every fund publishes its top holdings — five minutes; compare the lists */}
      <g opacity={C}>
        <Step n={1} text="FIND YOUR REAL BET" o={1} />
        {[0, 1, 2].map((i) => {
          const x = 480 + i * 480, o = on(f, (i === 0 ? pub : write) + i * 6)
          return (
            <g key={i} opacity={o} transform={`translate(0 ${(1 - o) * 40})`}>
              <rect x={x - 190} y={260} width={380} height={560} rx={24} fill={P.paper} stroke={P.edge} strokeWidth={3} />
              <rect x={x - 190} y={260} width={380} height={70} rx={24} fill={P.navy3} /><circle cx={x - 150} cy={295} r={9} fill={P.coral} /><circle cx={x - 122} cy={295} r={9} fill={P.gold} /><circle cx={x - 94} cy={295} r={9} fill={P.mint} />
              <Label x={x} y={380} text={`${FUNDS[i][0]}: TOP HOLDINGS`} size={34} font="Bebas Neue" color={P.navy0} />
              {list.map((n, r) => {
                const hi = r < 3 && f >= appear
                return <g key={n}><rect x={x - 160} y={410 + r * 76} width={320} height={58} rx={12} fill={hi ? P.gold : '#E8DCC0'} opacity={hi ? on(f, appear + r * 4) * 0.9 + 0.1 : 1} />
                  <Label x={x} y={450 + r * 76} text={i === 2 && r === 4 ? 'Tesla' : n} size={30} color={P.navy0} /></g>
              })}
            </g>
          )
        })}
        {f >= appear && [0, 1, 2].map((r) => <path key={r} d={`M670 ${439 + r * 76} L770 ${439 + r * 76} M1150 ${439 + r * 76} L1250 ${439 + r * 76}`} stroke={P.gold} strokeWidth={6} opacity={on(f, appear + r * 4)} strokeDasharray="10 8" />)}
        <g opacity={on(f, five)} transform="translate(1720 900)"><Prop id="clock" x={0} y={0} size={140} f={f} /><Label x={0} y={110} text="5 MINUTES" size={44} font="Bebas Neue" color={P.ink} /></g>
      </g>
      <Vignette id="s1" />
    </g>
  )
}

// ---------------------------------------------------------------- s78–s79a: step 2 — does it fit your timeline? (30 years vs 5)
const road = (t: number, len: number) => {
  // # a road that dips into a "sleepy decade" valley at 30–55% and climbs out after
  const x = 260 + t * len, dip = Math.exp(-((t - 0.42) ** 2) / 0.012) * 130
  return { x, dip }
}
const Step2: React.FC<PieceProps> = ({ f, c }) => {
  const second = c('s78:second'), y30 = c('s79:30'), sleepy = c('s79:sleepy'), easily = c('s79:easily'), needs = c('s79:needs'), five = c('s79:five'), afford = c('s79a:afford'), recover = c('s79a:recover')
  const longP = easeInOut(span(f, y30, recover + 20)), shortP = Math.min(0.42, easeInOut(span(f, needs - 10, five + 30)) * 0.42)
  const pts = (y: number, len: number, upTo: number) => Array.from({ length: 41 }, (_, i) => i / 40).filter((t) => t <= upTo).map((t) => { const r = road(t, len); return `${r.x} ${y + r.dip}` })
  return (
    <g>
      <Stage id="s2" frame={f} />
      <Step n={2} text="DOES IT FIT YOUR TIMELINE?" o={on(f, second)} />
      {/* # the 30-year road: long enough to climb out of the dip */}
      <g opacity={on(f, c('s79:investing'))}>
        <path d={`M${pts(470, 1400, 1).join(' L')}`} stroke={P.navy4} strokeWidth={36} fill="none" strokeLinecap="round" />
        <path d={`M${pts(470, 1400, longP).join(' L')}`} stroke={P.mint} strokeWidth={14} fill="none" strokeLinecap="round" />
        <Label x={1700} y={420} text="30 YEARS" size={56} font="Bebas Neue" color={P.mintInk} o={on(f, y30)} />
        <Mini look="hero" x={road(longP, 1400).x} y={470 + road(longP, 1400).dip - 10} scale={0.9} frame={f} seed={33} mood={longP > 0.6 ? 'happy' : 'neutral'} />
      </g>
      <Label x={260 + 0.42 * 1400} y={700} text="a long sleepy decade" size={36} color={P.ink} o={on(f, sleepy)} />
      {/* # the 5-year road ends at the bottom of the dip */}
      <g opacity={on(f, needs - 10)}>
        <path d={`M${pts(820, 1400, 0.42).join(' L')}`} stroke={P.navy4} strokeWidth={36} fill="none" strokeLinecap="round" />
        <path d={`M${pts(820, 1400, shortP).join(' L')}`} stroke={P.coral} strokeWidth={14} fill="none" strokeLinecap="round" />
        <Label x={260 + 0.46 * 1400} y={1000} text="NEEDS IT IN 5" size={50} font="Bebas Neue" color={P.coralInk} o={on(f, five)} />
        <Mini look="owner" x={road(shortP, 1400).x} y={820 + road(shortP, 1400).dip - 10} scale={0.9} frame={f} seed={34} mood={shortP > 0.35 ? 'sad' : 'neutral'} />
        <g opacity={on(f, afford)}><Prop id="hourglass" x={260 + 0.42 * 1400 + 120} y={860} size={110} f={f} /></g>
      </g>
      <Label x={960} y={260} text="MATTERS MOST IF YOU CAN’T WAIT" size={50} font="Bebas Neue" color={P.coralInk} o={on(f, c('s79a:concentration'))} />
      <Vignette id="s2" />
      <g opacity={0}>{easily}</g>
    </g>
  )
}

// ---------------------------------------------------------------- s80–s82: step 3 — other versions (equal weight: top 10 ≈ 3%)
const Step3: React.FC<PieceProps> = ({ f, c }) => {
  const third = c('s80:third'), ew = c('s81:equalweight'), same = c('s81:same'), three = c('s81:3'), costs = c('s82:costs'), diff = c('s82:different')
  const flat = easeInOut(span(f, same - 6, same + 26)), A = 1 - on(f, costs - 6), B = on(f, costs - 6)
  const H = Array.from({ length: 14 }, (_, k) => (k < 3 ? 420 - k * 60 : 220 - k * 10))
  return (
    <g>
      <Stage id="s3" tint="teal" frame={f} />
      <Step n={3} text="KNOW THE OTHER VERSIONS" o={on(f, third)} />
      <g opacity={A}>
        <Platform id="s3" cx={760} cy={860} rx={560} ry={90} />
        {H.map((h, k) => <Tower key={k} id="s3" i={k} x={330 + k * 66} y={850} h={lerp(h, 170, flat) * on(f, c('s80:versions') + k, 16)} w={48} glow={(1 - flat) * (k < 10 ? 0.4 : 0)} />)}
        <Label x={760} y={260} text={flat < 0.5 ? 'WEIGHTED BY SIZE' : 'EQUAL WEIGHT: SAME SHARE EACH'} size={56} font="Bebas Neue" color={P.ink} o={on(f, c('s80:index'))} />
        <g opacity={on(f, c('s81:top'))}>
          <Donut cx={1520} cy={560} r={210} part={lerp(37.9, 3.2, easeInOut(span(f, ew, three + 20)))} p={1} />
          <Label x={1520} y={585} text={`${lerp(37.9, 3.2, easeInOut(span(f, ew, three + 20))).toFixed(1)}%`} size={96} font="Bebas Neue" color={P.ink} />
          <Label x={1520} y={830} text="in the top 10" size={38} />
        </g>
      </g>
      <g opacity={B}>
        {[['WEIGHTED BY SIZE', P.gold, 560], ['EQUAL WEIGHT', P.sky, 1360]].map(([t, col, x], i) => (
          <g key={i} transform={`translate(${x} 560) scale(${pop(f, costs + i * 8)})`}>
            <rect x={-260} y={-220} width={520} height={440} rx={30} fill={P.card} opacity={0.8} /><rect x={-260} y={-220} width={520} height={440} rx={30} fill="none" stroke={col as string} strokeWidth={5} />
            <Label x={0} y={-150} text={t as string} size={48} font="Bebas Neue" color={col as string} />
            <Prop id={i ? 'scale-balance' : 'crown'} x={0} y={0} size={170} f={f} />
            <g opacity={on(f, c('s82:tradeoffs'))}><PriceTag x={-60} y={150} text="COSTS" s={0.7} r={0} /><Label x={130} y={170} text="trade-offs" size={34} /></g>
          </g>
        ))}
        <Label x={960} y={940} text="A GENUINELY DIFFERENT BET" size={64} font="Bebas Neue" color={P.ink} o={on(f, diff)} />
      </g>
      <Vignette id="s3" />
    </g>
  )
}

// ---------------------------------------------------------------- s83–s84b: know which bet you're making
const Choose: React.FC<PieceProps> = ({ f, c }) => {
  const none = c('s83:none'), bets = c('s84:bets'), deserve = c('s84:deserve'), making = c('s84:making'), worst = c('s84a:worst'), finding = c('s84b:finding'), years = c('s84b:years'), never = c('s84b:never'), placed = c('s84b:placed')
  const pick = easeInOut(span(f, making - 6, making + 20))
  const keys: [number, PoseId][] = [[0, 'idle'], [deserve, 'think'], [making, 'hold'], [finding, 'hold'], [never, 'facepalm']]
  const ex = expressionAt(f, [{ at: 0, pose: 'idle', expression: 'neutral' }, { at: deserve, pose: 'think', expression: 'thinking' }, { at: making, pose: 'hold', expression: 'smiling' }, { at: never, pose: 'facepalm', expression: 'shocked' }])
  const cards = [['WEIGHTED', P.gold], ['EQUAL', P.sky], ['YOUR MIX', P.mint]] as const
  return (
    <g>
      <Stage id="ch" frame={f} />
      <Label x={960} y={150} text={f < bets ? 'NO CHOICE IS RIGHT FOR EVERYONE' : f < worst ? 'KNOW WHICH BET YOU ARE MAKING' : f < finding ? 'THE WORST OUTCOME ISN’T A WRONG PICK…' : '…IT’S FINDING OUT YEARS LATER'} size={60} font="Bebas Neue" color={f < finding ? P.ink : P.coralInk} o={on(f, none)} />
      {cards.map(([t, col], i) => {
        const chosen = i === 0, x = chosen ? lerp(560 + i * 400, 1180, pick) : 560 + i * 400, y = chosen ? lerp(560, 600, pick) : 560
        const o = chosen ? 1 : 1 - pick * 0.6
        return (
          <g key={t} opacity={on(f, none + i * 5) * o} transform={`translate(${x} ${y}) scale(${pop(f, none + i * 5) * (chosen ? 1 + pick * 0.15 : 1)})`}>
            <rect x={-150} y={-200} width={300} height={400} rx={26} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-150} y={-200} width={300} height={90} rx={26} fill={col} />
            <Label x={0} y={-140} text={t} size={44} font="Bebas Neue" color={P.navy0} />
            <Prop id={(['crown', 'scale-balance', 'dice'] as const)[i]} x={0} y={30} size={170} f={f} />
          </g>
        )
      })}
      <g opacity={on(f, deserve)}>
        <Actor who="hero" pose={poseAt(f, 30, keys)} expression={ex.expression} blend={ex.from ? { from: ex.from, mix: ex.mix! } : undefined} x={420} y={1250} scale={1.5} frame={f} life={8} />
      </g>
      {/* # years later: calendars flip past */}
      {f >= years && <g transform={`translate(1600 300) scale(${pop(f, years)})`}><Calendar x={0} y={0} text={`${2026 + Math.round(12 * span(f, years, placed))}`} s={1.1} /></g>}
      <Vignette id="ch" />
    </g>
  )
}

// ---------------------------------------------------------------- s85–s91: the answer + brand
const Answer: React.FC<PieceProps> = ({ f, c }) => {
  const q = c('s85:diversified'), num = c('s86:number'), yes = c('s86:yes'), where = c('s87:where'), far = c('s87:far'), d38 = c('s88:38'), ten = c('s88:10'), priced = c('s88:priced'), fut = c('s88:future'), great = c('s89:great'), chose = c('s90:chose'), purpose = c('s90:purpose'), brand = c('s91:capitalcode')
  const A = 1 - on(f, d38 - 6), B = between(f, d38 - 6, great - 4), C = between(f, great - 4, brand - 6), D = on(f, brand - 6)
  return (
    <g>
      <Stage id="an" frame={f} />
      <g opacity={A}>
        <Label x={960} y={150} text="SO, IS YOUR INDEX FUND DIVERSIFIED?" size={64} font="Bebas Neue" color={P.ink} o={on(f, q)} />
        {/* # the fund itself, first, on "index fund" — then it gives way to the two answers */}
        <g opacity={between(f, c('s85:index'), num + 6)}><FundBox id="an0" x={960} y={560} s={1.2} open={on(f, q)} /></g>
        {/* # by number of companies: yes */}
        <g transform="translate(-380 0)" opacity={on(f, num)}>
          <Platform id="an" cx={960} cy={800} rx={340} ry={70} />
          {Array.from({ length: 60 }, (_, i) => <g key={i} opacity={on(f, num + i * 0.4)}><Building x={680 + (i % 15) * 40} y={760 + Math.floor(i / 15) * 22} s={0.55} seed={i * 3 + 1} /></g>)}
          <Label x={960} y={950} text="number of companies" size={40} o={on(f, num)} />
          <Tick x={960} y={380} o={on(f, yes)} r={70} />
        </g>
        {/* # where the money goes: far less */}
        <g transform="translate(380 0)" opacity={on(f, where)}>
          <Platform id="an2" cx={960} cy={800} rx={340} ry={70} />
          {Array.from({ length: 30 }, (_, i) => <Building key={i} x={680 + (i % 15) * 40} y={790 + Math.floor(i / 15) * 22} s={0.4} seed={i * 5 + 2} dim={0.6} />)}
          {[0, 1, 2, 3, 4].map((k) => <Tower key={k} id="an2" i={k} x={860 + k * 50} y={770} h={160 + k * 18} w={40} glow={1} />)}
          {f >= where && Array.from({ length: 16 }, (_, i) => { const t = ((f - where) / 24 + i / 16) % 1, p = arc({ x: 960, y: 300 }, { x: 860 + (i % 5) * 50, y: 600 }, easeInOut(t), 80); return <ellipse key={i} cx={p.x} cy={p.y} rx={12} ry={5} fill={P.gold} /> })}
          <Label x={960} y={950} text="where your money goes" size={40} o={on(f, where)} />
          <Tick x={960} y={380} o={on(f, far)} ok={false} r={70} />
        </g>
      </g>
      {/* # 38 cents of every dollar rides on 10 companies, priced for a future still to arrive */}
      <g opacity={B}>
        <g transform={`translate(700 540) scale(${pop(f, c('s88:almost'))})`}>
          <circle r={250} fill={P.goldD} /><Donut cx={0} cy={0} r={250} part={37.9} p={on(f, d38, 24)} color={P.gold} rest={P.cream} thick={250} />
          <circle r={200} fill="none" stroke={P.goldD} strokeWidth={6} opacity={0.5} />
        </g>
        <Label x={700} y={880} text={countTo(38, on(f, d38, 24), 0, '', '¢ of every $1')} size={80} font="Bebas Neue" color={P.ink} />
        <g opacity={on(f, ten)}><Platform id="an3" cx={1400} cy={800} rx={260} ry={60} />{Array.from({ length: 10 }, (_, k) => <Tower key={k} id="an3" i={k} x={1220 + k * 40} y={790} h={180 + (k % 3) * 40} w={32} glow={0.6} />)}<Label x={1400} y={930} text="on 10 companies" size={40} /></g>
        {f >= priced - 4 && <g transform={`translate(1460 330) scale(${pop(f, priced)})`}><PriceTag x={0} y={0} text="PRICED FOR THE FUTURE" s={0.9} r={-4} /></g>}
        <Label x={1400} y={190} text="a future that still has to arrive" size={38} color={P.ink} o={on(f, fut)} />
      </g>
      {/* # might be a great bet — just choose it on purpose */}
      <g opacity={C}>
        <ellipse cx={960} cy={720} rx={700} ry={180} fill={P.gold} opacity={0.08 * on(f, great)} />
        <Label x={960} y={190} text={f < chose ? 'IT MIGHT BE A GREAT BET' : 'JUST CHOOSE IT ON PURPOSE'} size={80} font="Bebas Neue" color={P.ink} o={on(f, great)} />
        <Pedestal x={960} y={860} r={180} />
        <Mini look="hero" x={880} y={860} scale={2} frame={f} seed={44} mood="happy" />
        {/* # the hero sets a bet chip down, deliberately */}
        <g transform={`translate(${lerp(1200, 1040, easeOut(span(f, chose, purpose + 6)))} ${lerp(560, 830, easeOut(span(f, chose, purpose + 6)))})`}><ellipse rx={56} ry={20} fill={P.goldD} /><ellipse cy={-8} rx={56} ry={20} fill={P.gold} /><Label x={0} y={2} text="MY BET" size={24} font="Bebas Neue" color={P.navy0} /></g>
        <Tick x={1180} y={640} o={on(f, purpose + 6)} r={46} />
      </g>
      {/* # brand */}
      <g opacity={D}>
        <g transform={`translate(960 470) scale(${pop(f, brand, 16)}) translate(-960 -470)`}><svg x={860} y={370} width={200} height={200}><Emblem size={200} /></svg></g>
        <Label x={960} y={660} text="CAPITALCODE" size={72} font="Bebas Neue" color={P.ink} o={on(f, brand + 6)} />
        <Label x={960} y={730} text="how the money actually works" size={40} weight={500} o={on(f, c('s91:money'))} />
      </g>
      <Vignette id="an" />
    </g>
  )
}

export const ACT5 = [
  makePiece('step1', 'Step 1: find your real bet — the same giants three times over', {
    beats: ['s74', 's74:simple', 's74:think', 's74:without', 's74:buy', 's75', 's75:first', 's75:find', 's75:real', 's75:bet', 's76', 's76:own', 's76:sp', 's76:500', 's76:tech', 's76:growth', 's76:holding', 's76:same', 's76:handful', 's76:giants', 's76:three', 's76:times',
      's77', 's77:add', 's77:everything', 's77:sits', 's77:same', 's77:names', 's77:surprised', 's77a', 's77a:every', 's77a:publishes', 's77a:top', 's77a:holdings', 's77a:single', 's77a:page', 's77a:website', 's77a:takes', 's77a:five', 's77a:minutes',
      's77b', 's77b:write', 's77b:ten', 's77b:biggest', 's77b:names', 's77b:each', 's77b:own', 's77b:see', 's77b:often', 's77b:same', 's77b:companies', 's77b:appearing'],
    sfx: [['s74:simple', 'pop', 0.4], ['s75:first', 'click', 0.6], ['s76:sp', 'softpop', 0.5], ['s76:tech', 'softpop', 0.5], ['s76:growth', 'softpop', 0.5], ['s76:same', 'riser', 0.4], ['s76:three', 'ding', 0.5], ['s77:add', 'whoosh', 0.5], ['s77:surprised', 'pop', 0.5],
      ['s77a:publishes', 'swish', 0.5], ['s77a:five', 'tick', 0.6], ['s77b:write', 'swish', 0.4], ['s77b:appearing', 'chime', 0.5]],
    Component: Step1,
  }),
  makePiece('step2', 'Step 2: does it fit your timeline? 30 years vs 5', {
    beats: ['s78', 's78:second', 's78:ask', 's78:bet', 's78:fits', 's78:timeline', 's79', 's79:someone', 's79:investing', 's79:30', 's79:years', 's79:sit', 's79:long', 's79:sleepy', 's79:decade', 's79:far', 's79:easily', 's79:someone#2', 's79:needs', 's79:money', 's79:five',
      's79a', 's79a:concentration', 's79a:matters', 's79a:people', 's79a:cannot', 's79a:afford', 's79a:wait', 's79a:market', 's79a:recover'],
    sfx: [['s78:second', 'click', 0.6], ['s79:30', 'tick', 0.5], ['s79:sleepy', 'swish', 0.4], ['s79:needs', 'pop', 0.4], ['s79:five', 'tick', 0.5], ['s79a:afford', 'thud', 0.5], ['s79a:recover', 'riser', 0.4]],
    Component: Step2,
  }),
  makePiece('step3', 'Step 3: other versions — equal weight, top 10 ≈ 3%', {
    beats: ['s80', 's80:third', 's80:know', 's80:other', 's80:versions', 's80:index', 's80:exist', 's81', 's81:equalweight', 's81:version', 's81:gives', 's81:every', 's81:same', 's81:share', 's81:top', 's81:10', 's81:only', 's81:3',
      's82', 's82:costs', 's82:tradeoffs', 's82:genuinely', 's82:different', 's82:bet'],
    sfx: [['s80:third', 'click', 0.6], ['s80:versions', 'pop', 0.3], ['s81:same', 'swish', 0.6], ['s81:3', 'ding', 0.5], ['s82:costs', 'softpop', 0.5], ['s82:different', 'chime', 0.4]],
    Component: Step3,
  }),
  makePiece('choose', 'Know which bet you are making', {
    beats: ['s83', 's83:none', 's83:choices', 's83:right', 's83:wrong', 's83:everyone', 's84', 's84:just', 's84:different', 's84:bets', 's84:deserve', 's84:know', 's84:which', 's84:making', 's84a', 's84a:worst', 's84a:outcome', 's84a:not', 's84a:picking', 's84a:wrong',
      's84b', 's84b:finding', 's84b:years', 's84b:later', 's84b:making', 's84b:bet', 's84b:never', 's84b:knew', 's84b:placed'],
    sfx: [['s83:none', 'pop', 0.4], ['s84:deserve', 'softpop', 0.4], ['s84:making', 'swish', 0.5], ['s84a:worst', 'click', 0.4], ['s84b:years', 'tick', 0.5], ['s84b:never', 'thud', 0.5]],
    Component: Choose,
  }),
  makePiece('answer', 'The answer — and the brand', {
    beats: ['s85', 's85:index', 's85:fund', 's85:diversified', 's86', 's86:number', 's86:companies', 's86:yes', 's87', 's87:where', 's87:money', 's87:really', 's87:goes', 's87:far', 's87:less', 's87:looks',
      's88', 's88:almost', 's88:38', 's88:every', 's88:dollar', 's88:rides', 's88:10', 's88:companies', 's88:priced', 's88:future', 's88:arrive', 's89', 's89:might', 's89:turn', 's89:great', 's89:bet', 's90', 's90:sure', 's90:chose', 's90:purpose',
      's91', 's91:capitalcode', 's91:money', 's91:works'],
    sfx: [['s85:diversified', 'click', 0.5], ['s86:number', 'pop', 0.3], ['s86:yes', 'ding', 0.6], ['s87:where', 'flutter', 0.5], ['s87:far', 'thud', 0.5], ['s88:38', 'tick', 0.6], ['s88:10', 'whoosh', 0.4], ['s88:priced', 'softpop', 0.6],
      ['s89:great', 'riser', 0.4], ['s90:chose', 'swish', 0.4], ['s90:purpose', 'coin', 0.7], ['s91:capitalcode', 'chime', 0.6]],
    Component: Answer,
  }),
]

void rnd; void Pedestal
