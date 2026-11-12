// ---------------------------------------------------------------- s62–s72: why the number costs money (risk has a price).
// A) A lender's view: a group of ten borrowers; two of them turn red (missed payments); a price tag rises over the whole
//    group, and coins from it fill the hole the losses left.
// B) The home loan again with FICO's Aug-2025 averages: green 760–850 house at 6.9% = $1,654 a month, red 620–639 house at
//    7.9% = $1,823; +$169 a month; a grid of 360 little payment squares fills; interest columns $345K vs $406K, gap $61K.
// C) Not only mortgages: a car and a card get % tags; the lender compares two meters in seconds with a stopwatch.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, Car, Coin, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Tag } from '../econ/kit'
import { Card, Meter, Stopwatch, GREEN, RED, GOLD, TXT, INK } from './kit'
import { Dude } from '../econ/kit'

const GROUND = 930
const W = '#FFFFFF'

const Cost: React.FC<PieceProps> = ({ f, c }) => {
  const risk = c('s62:risk')
  const side = c('s63:side'), expect = c('s63:expect'), home64 = c('s64:home'), averages = c('s64:averages'), d250 = c('s64:250000'), years64 = c('s64:30')
  const group = c('s63:group'), miss = c('s63:miss'), charge = c('s63:charge'), losses = c('s63:losses')
  const back = c('s64:back')
  const p760 = c('s65:760'), p69 = c('s65:69'), p1654 = c('s65:1654')
  const p620 = c('s66:620'), p79 = c('s66:79'), p1823 = c('s66:1823')
  const p169 = c('s67:169'), every67 = c('s67:every')
  const gap = c('s68:gap'), small = c('s68:small'), again = c('s68:again'), p360 = c('s68:360')
  const interest = c('s69:interest'), p345 = c('s69:345000'), p406 = c('s69:406000')
  const house = c('s70:house'), loan70 = c('s70:loan'), p61 = c('s70:61000')
  const only = c('s71:only'), car = c('s71:car'), cards = c('s71:cards'), set = c('s71:set')
  const shortcut = c('s72:shortcut'), history = c('s72:history'), compare = c('s72:compare'), seconds = c('s72:seconds')

  const A = win(f, 0, back - 4), B = win(f, back - 4, only - 4), Cw = on(f, only - 4, 10)
  const red = (k: number) => (k === 3 || k === 7) ? on(f, miss + (k === 7 ? 5 : 0), 8) : 0
  const tagUp = on(f, charge, 20)
  const squares = Math.round(360 * on(f, again, 60))
  const colH = (v: number, at: number) => v * 0.75 * on(f, at, 30)
  return (
    <g>
      <Stage id="cs-cost" frame={f} tint="teal" />
      <Headline f={f} lines={[[risk, 'RISK HAS A PRICE', W, 100], [back, "FICO'S AVERAGES, AUG 2025 · $250,000 · 30 YEARS", W, 64], [only, 'NOT ONLY MORTGAGES', W, 96]]} />
      <Ground y={GROUND} dark />

      {/* # A) pricing a group */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="owner" beats={[[risk, 'think', 'thinking'], [side, 'explain', 'neutral'], [charge, 'point', 'neutral']]} x={300} y={GROUND} s={1} />
        <g opacity={on(f, expect, 8)}>
          <rect x={700} y={520} width={900} height={330} rx={26} fill="#FFFFFF" opacity={0.12} />
          {Array.from({ length: 10 }, (_, k) => <g key={k} transform={`translate(${790 + (k % 5) * 180} ${680 + Math.floor(k / 5) * 150})`}><Dude x={0} y={0} s={1.3} col={red(k) > 0.5 ? RED : '#9FC1E8'} /></g>)}
        </g>
        <g opacity={on(f, miss, 8)}><Label x={1150} y={505} text="SOME WILL MISS PAYMENTS" size={50} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, charge, 8)} transform={`translate(1150 ${lerp(450, 370, tagUp)})`}><Tag x={0} y={0} t="HIGHER PRICE FOR ALL" s={0.9} col={GOLD} r={0} /></g>
        {f >= losses && [0, 1].map((k) => <Coin key={k} x={lerp(1150, [790, 1510][k], on(f, losses + k * 6, 20))} y={lerp(420, [830, 680][k], on(f, losses + k * 6, 20))} s={1.1} o={1 - on(f, losses + 30, 10)} />)}
      </g>}

      {/* # B) the home loan, worked through */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, interest - 6, 10)}>
          <g opacity={on(f, averages, 8) * (1 - on(f, p760, 8))}><Label x={960} y={420} text="FICO NATIONAL AVERAGES" size={60} font="Bebas Neue" color={W} /><Label x={960} y={490} text="AUGUST 2025" size={50} font="Bebas Neue" color={P.gold} /></g>
          <g opacity={on(f, d250, 8) * (1 - on(f, p760, 8))}><Label x={960} y={600} text="$250,000 LOAN" size={64} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, years64, 8) * (1 - on(f, p760, 8))}><Label x={960} y={680} text="30 YEARS" size={64} font="Bebas Neue" color={W} /></g>
          {[0, 1].map((k) => <g key={k} opacity={on(f, k ? Math.min(p620, home64 + 8) : Math.min(p760, home64), 8)}>
            <House x={k ? 1440 : 480} y={GROUND} s={0.8} big={0.5} color={k ? '#7FA8D8' : '#E9C25A'} />
            <g transform={`translate(${k ? 1440 : 480} 370)`}><rect x={-140} y={-50} width={280} height={90} rx={14} fill={W} stroke={k ? RED : GREEN} strokeWidth={6} /><text y={18} textAnchor="middle" fill={k ? RED : GREEN} style={TXT(58)}>{k ? '620–639' : '760–850'}</text></g>
            <g opacity={on(f, k ? p79 : p69, 8)}><Tag x={k ? 1440 : 480} y={470} t={k ? '7.9%' : '6.9%'} s={0.9} col={k ? RED : GREEN} ink={W} r={0} /></g>
            <g opacity={on(f, k ? p1823 : p1654, 8)} transform={`translate(${k ? 1440 : 480} 570) scale(${k ? 1 : 1 + 0.1 * win(f, c('s65:month'), p620, 5)})`}><text textAnchor="middle" fill={W} style={TXT(66)}>{k ? '$1,823 A MONTH' : '$1,654 A MONTH'}</text></g>
          </g>)}
          <g opacity={on(f, p169, 8) * (1 - on(f, gap, 8))} transform={`translate(960 560) scale(${pop(f, p169, 12)})`}><rect x={-150} y={-56} width={300} height={100} rx={16} fill={RED} /><text y={16} textAnchor="middle" fill={W} style={TXT(60)}>+$169</text></g>
          <g opacity={on(f, every67, 8) * (1 - on(f, gap, 8))}><Label x={960} y={650} text="EVERY MONTH" size={44} font="Bebas Neue" color={W} /></g>
          {/* 360 payments */}
          <g opacity={on(f, gap, 8)}>
            {Array.from({ length: 360 }, (_, k) => k < squares ? <rect key={k} x={780 + (k % 20) * 18} y={360 + Math.floor(k / 20) * 18} width={14} height={14} rx={3} fill={RED} opacity={0.85} /> : null)}
            <g opacity={on(f, small, 8)}><Label x={960} y={720} text="~1 POINT HIGHER RATE" size={44} font="Bebas Neue" color={W} /></g>
            <g opacity={on(f, p360, 8)}><Label x={960} y={790} text="× 360 PAYMENTS" size={60} font="Bebas Neue" color={P.gold} /></g>
          </g>
        </g>
        <g opacity={on(f, interest - 6, 10)}>
          <rect x={700} y={GROUND - colH(345, p345)} width={200} height={colH(345, p345)} rx={14} fill={GREEN} />
          <rect x={1020} y={GROUND - colH(406, p406)} width={200} height={colH(406, p406)} rx={14} fill={RED} />
          <rect x={1020} y={GROUND - colH(406, p406)} width={200} height={0.75 * 61 * on(f, p61, 14)} rx={14} fill="#FFE48A" opacity={0.85} />
          <g opacity={on(f, p345, 8)}><text x={800} y={GROUND - colH(345, p345) - 24} textAnchor="middle" fill={W} style={TXT(60)}>$345K</text><Label x={800} y={GROUND + 60} text="760–850" size={44} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, p406, 8)}><text x={1120} y={GROUND - colH(406, p406) - 24} textAnchor="middle" fill={W} style={TXT(60)}>$406K</text><Label x={1120} y={GROUND + 60} text="620–639" size={44} font="Bebas Neue" color={RED} /></g>
          <g opacity={on(f, interest, 8)}><Label x={480} y={420} text="TOTAL INTEREST" size={60} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, house, 8)}><Label x={480} y={500} text="SAME HOUSE" size={50} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, loan70, 8)}><Label x={480} y={570} text="SAME LOAN" size={50} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, p61, 8)} transform={`translate(1520 ${GROUND - 420}) scale(${pop(f, p61, 12)})`}><rect x={-170} y={-56} width={340} height={100} rx={16} fill={RED} /><text y={16} textAnchor="middle" fill={W} style={TXT(64)}>$61,000 APART</text></g>
        </g>
      </g>}

      {/* # C) cars and cards too; a quick comparison */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={1 - on(f, shortcut - 6, 10)}>
          <g opacity={on(f, car, 8)}><g transform={`translate(600 ${GROUND})`}><Car x={0} y={0} s={1.3} /></g><Tag x={600} y={480} t="% RATE" s={0.9} col={GOLD} r={0} /></g>
          <g opacity={on(f, cards, 8)}><Card x={1320} y={640} s={1} /><Tag x={1320} y={430} t="% RATE" s={0.9} col={GOLD} r={0} /></g>
          <g opacity={on(f, set, 8)}><Label x={960} y={330} text="THE SCORE SETS THE PRICE" size={60} font="Bebas Neue" color={W} /></g>
        </g>
        <g opacity={on(f, shortcut - 6, 10)}>
          <Person f={f} who="owner" beats={[[shortcut, 'idle', 'thinking'], [compare, 'point', 'neutral']]} x={300} y={GROUND} s={1} />
          <g opacity={on(f, history, 8)}><Meter x={900} y={760} s={0.55} v={770} /></g>
          <g opacity={on(f, compare, 8)}><Meter x={1420} y={760} s={0.55} v={630} /></g>
          <g opacity={on(f, seconds, 8)}><Stopwatch x={1160} y={460} s={0.8} f={f} /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s63:think")} x={1150} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s63:more#2")} x={1150} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s64:are")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s64:2025")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s64:dollars")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s65:with")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s65:850")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s65:percent")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s65:dollars")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s66:639")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s66:percent")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s66:dollars")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s68:point")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s68:payments")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s69:dollars")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s69:the#3")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s70:dollars")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s72:for")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s72:into")} x={960} y={640} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-cost" />
    </g>
  )
}

export const CS_COST = makePiece('cs-cost', 'Why it costs money: a lender looks at a group of ten borrowers, two turn red (some will miss payments) and a HIGHER PRICE FOR ALL tag rises over the group as coins cover the losses; FICO\'s August-2025 averages on two houses — 760–850 at 6.9% = $1,654 a month, 620–639 at 7.9% = $1,823 — +$169 every month, a grid of 360 red payment squares fills (about 1 point higher, × 360 payments); interest columns $345K vs $406K, $61,000 apart; a car and a card get % tags (the score sets the price); a lender compares two meters with a stopwatch.', {
  mood: 'dark', Component: Cost,
  beats: ["s62:risk", "s63:side", "s63:expect", "s64:home", "s64:averages", "s64:250000", "s64:30", "s63:group", "s63:miss", "s63:charge", "s63:losses", "s64:back", "s65:760", "s65:69", "s65:1654", "s66:620", "s66:79", "s66:1823", "s67:169", "s67:every", "s68:gap", "s68:small", "s68:again", "s68:360", "s69:interest", "s69:345000", "s69:406000", "s70:house", "s70:loan", "s70:61000", "s71:only", "s71:car", "s71:cards", "s71:set", "s72:shortcut", "s72:history", "s72:compare", "s72:seconds", "s65:month", "s63:think", "s63:more#2", "s64:are", "s64:2025", "s64:dollars", "s65:with", "s65:850", "s65:percent", "s65:dollars", "s66:639", "s66:percent", "s66:dollars", "s68:point", "s68:payments", "s69:dollars", "s69:the#3", "s70:dollars", "s72:for", "s72:into"],
  sfx: [['s63:miss', 'pop', 0.1], ['s65:1654', 'pop', 0.1], ['s66:1823', 'pop', 0.1], ['s67:169', 'thud', 0.12], ['s70:61000', 'impact', 0.15]] })
