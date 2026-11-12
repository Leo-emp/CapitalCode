// ---------------------------------------------------------------- s89–s103: what it means, and the payoff.
// A) "None of this means every fee is bad": a fee tag stamped BAD — the hero shakes his head, arms crossed. A fee buys
//    something: a fund run for you (the fund house), advice that may help you avoid a costly mistake (the adviser stops a
//    saver at the edge of a hole). A cheaper fund is not automatically better: two boxes open onto different insides.
//    Worth what it costs: a balance — what you get vs what it costs over all the years.
// B) Known in advance: a cloudy crystal ball (nobody knows the markets) beside a fee written down on paper; the prospectus
//    opens on its fee table and the fee row is circled; the adviser agreement; a magnifier looks it up; the jar with its
//    ring, year after year.
// C) The payoff: four icons for the four steps; a tiny 1% coin that multiplies into a big coral pile; the fee pile next to
//    everything the saver put in — taller.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, Headline, Label, Person, Stamp, win } from '../aimoney/common'
import { Balance } from '../casino/kit'
import { Ground, Magnifier } from '../power/kit2'
import { FundHouse, GhostPile, Prospectus, SaverJar, Scoop, Stack, Spot } from './kit'

const GROUND = 920
const Box: React.FC<{ x: number; y: number; open: number; inside: 'few' | 'many'; tag: string; o?: number }> = ({ x, y, open, inside, tag, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={170} ry={16} fill="#000" opacity={0.12} />
    {open > 0 && (inside === 'many'
      ? Array.from({ length: 9 }, (_, k) => <rect key={k} x={-120 + (k % 3) * 85} y={-260 - Math.floor(k / 3) * 40 * open} width={60} height={60} rx={8} fill={['#7FC8D8', '#F3D9A4', '#E8B4C8'][k % 3]} />)
      : [0, 1].map((k) => <rect key={k} x={-70 + k * 80} y={-260 - 40 * open} width={70} height={80} rx={8} fill="#E06B5B" />))}
    <rect x={-150} y={-220} width={300} height={220} rx={12} fill="#B9864C" />
    <g transform={`rotate(${-open * 40} -150 -220)`}><rect x={-160} y={-244} width={320} height={30} rx={8} fill="#C99A5E" /></g>
    <rect x={-80} y={-150} width={160} height={70} rx={12} fill={P.card} stroke={P.edge} strokeWidth={3} />
    <text y={-102} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>{tag}</text>
  </g>
)

const Means: React.FC<PieceProps> = ({ f, c }) => {
  const fee89 = c('s89:fee'), bad = c('s89:bad')
  const buys = c('s90:buys'), fund90 = c('s90:fund'), advice = c('s90:advice'), avoid = c('s90:avoid'), mistakes = c('s90:mistakes')
  const cheaper = c('s91:cheaper'), not91 = c('s91:not'), better = c('s91:better'), inside = c('s91:inside'), differ = c('s91:differ')
  const question = c('s92:question'), get92 = c('s92:get'), worth = c('s92:worth'), costs92 = c('s92:costs'), years92 = c('s92:years')
  const know = c('s93:know'), advance = c('s93:advance')
  const nobody = c('s94:nobody'), markets94 = c('s94:markets'), written = c('s94:written'), start = c('s94:start')
  const fees95 = c('s95:fees'), table = c('s95:table'), prospectus = c('s95:prospectus'), official = c('s95:official')
  const adviser96 = c("s96:adviser's"), agreement = c('s96:agreement')
  const worth97 = c('s97:worth'), look = c('s97:look'), pay97 = c('s97:pay'), picture = c('s97:picture'), whole = c('s97:whole'), decades97 = c('s97:decades')
  const four98 = c('s98:four')
  const small99 = c('s99:small'), everything99 = c('s99:everything'), never99 = c('s99:never'), added99 = c('s99:added'), decades99 = c('s99:decades')
  const one100 = c('s100'), nothing100 = c('s100:nothing'), small101 = c('s101:small'), repeated = c('s101:repeated'), become = c('s101:become'), big101 = c('s101:big')
  const working = c('s102:working'), cost102 = c('s102:cost'), put102 = c('s102:put')
  const s103 = c('s103'), advice103 = c('s103:advice')
  const AB = know - 4, BC = four98 - 4
  const A = win(f, fee89, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  // # A sub-steps
  const A1 = win(f, fee89, cheaper - 4), A2 = win(f, cheaper - 4, question - 4), A3 = on(f, question - 4, 8)
  return (
    <g>
      <Stage id="fe-means" frame={f} />
      <Spot f={f} at={c("s95:describes")} x={640} y={560} rx={260} ry={300} />
      <Spot f={f} at={c("s89:means")} x={700} y={560} rx={260} ry={140} />
      <Spot f={f} at={c("s92:pay")} x={960} y={600} rx={400} ry={260} />
      <Spot f={f} at={c("s93:fees")} x={1300} y={600} rx={220} ry={260} />
      <Spot f={f} at={c("s96")} x={1300} y={560} rx={220} ry={260} />
      <Spot f={f} at={c("s99:year")} x={300} y={600} rx={200} ry={200} />
      <Spot f={f} at={c("s102:example")} x={760} y={700} rx={200} ry={300} />
      <Spot f={f} at={c("s103:money")} x={1160} y={700} rx={200} ry={300} />
      <Headline f={f} lines={[[fee89, 'EVERY FEE IS BAD?', P.ink, 104], [buys, 'A FEE BUYS SOMETHING', P.ink, 104], [cheaper, 'CHEAPER ≠ AUTOMATICALLY BETTER', P.ink, 96], [question, '', P.ink], [worth, 'IS IT WORTH WHAT IT COSTS?', P.ink, 100], [know, 'YOU CAN KNOW IT IN ADVANCE', P.ink, 100], [table, 'THE FEE TABLE', P.ink, 110], [agreement, 'YOUR AGREEMENT', P.ink, 110], [look, 'LOOK UP WHAT YOU PAY', P.ink, 104], [four98, 'THE FOUR STEPS', P.ink, 110], [one100, '1% SOUNDS LIKE NOTHING', P.ink, 104], [big101, 'SMALL NUMBERS → BIG NUMBERS', P.coralInk, 100], [working, '', P.ink], [put102, 'MORE THAN EVERYTHING THEY PUT IN', P.coralInk, 92], [s103, 'NOT INVESTMENT ADVICE', P.ink2, 80]]} />

      {/* # A) not every fee is bad; what a fee buys; cheaper isn't automatically better; worth what it costs */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {A1 > 0 && <g opacity={A1}>
          <g opacity={1 - on(f, buys, 10)}>
            <g transform="translate(700 560) rotate(-6)"><path d="M-160 -70 L110 -70 L180 0 L110 70 L-160 70 Z" fill={P.paper} stroke={P.edge} strokeWidth={4} /><text x={-20} y={22} textAnchor="middle" fill={P.ink} style={{ font: '400 72px "Bebas Neue"' }}>FEE</text></g>
            <Stamp x={760} y={560} text="BAD" f={f} at={bad} color={P.coralInk} />
            <Person f={f} who="hero" beats={[[0, 'point', 'neutral'], [bad + 6, 'crossNoA', 'neutral', 'crossNoB', 10]]} x={1260} y={GROUND} s={0.78} />
          </g>
          <g opacity={on(f, buys, 10)}>
            <g opacity={on(f, buys, 8)}><FundHouse x={420} y={GROUND} s={0.8 * (1 + 0.05 * on(f, fund90, 6) * (1 - on(f, fund90 + 14, 8)))} /></g>
            {/* # advice that may help avoid a costly mistake: the adviser stops the saver at a hole's edge */}
            <g opacity={on(f, advice, 8)}>
              <ellipse cx={1640} cy={GROUND + 30} rx={150} ry={36} fill="#2A2418" />
              <Person f={f} who="buyer" beats={[[0, 'walkA', 'neutral', 'walkB', 12], [avoid, 'shock', 'shocked'], [mistakes + 10, 'relief', 'smiling']]} x={lerp(1200, 1440, on(f, advice, 30))} y={GROUND} s={0.7} />
              <Person f={f} who="investorF" beats={[[0, 'explain', 'smiling'], [avoid, 'stop', 'worried']]} x={1000} y={GROUND} s={0.7} />
            </g>
          </g>
        </g>}
        {A2 > 0 && <g opacity={A2}>
          <Box x={620} y={GROUND} open={on(f, inside, 16)} inside="few" tag="CHEAPER" />
          <Box x={1300} y={GROUND} open={on(f, inside + 6, 16)} inside="many" tag="?" />
          <Person f={f} who="hero" beats={[[0, 'point', 'neutral'], [not91, 'crossNoA', 'neutral', 'crossNoB', 10], [inside, 'present', 'smiling']]} x={960} y={GROUND} s={0.7} />
        </g>}
        {A3 > 0 && <g opacity={A3}>
          <Balance x={960} y={GROUND - 340} tilt={lerp(0, 0.4, on(f, costs92, 16)) - lerp(0, 0.4, on(f, years92, 16))} s={1.0}
            left={<g opacity={on(f, get92, 8)}><Label x={0} y={-30} text="WHAT YOU GET" size={44} font="Bebas Neue" color={P.ink} /></g>}
            right={<g opacity={on(f, costs92, 8)}><Stack x={0} y={-10} n={4 + Math.round(6 * on(f, years92, 16))} w={100} color={P.coral} /></g>} />
        </g>}
      </g>}

      {/* # B) known in advance: the crystal ball vs the written fee; the prospectus; the agreement; look it up */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, fees95, 10)}>
          <g opacity={on(f, nobody, 8)} transform="translate(560 640)"><circle r={130} fill="#B9D8F2" opacity={0.8} /><circle r={130} fill="#9AA5B5" opacity={0.4 + 0.2 * Math.sin(f / 6)} /><path d="M-90 130 L90 130 L70 180 L-70 180 Z" fill="#8E6232" /></g>
          <g opacity={on(f, markets94, 8)}><Label x={560} y={GROUND + 72} text="THE MARKETS: ?" size={56} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, written, 8)}><Doc x={1300} y={600} s={1.3} title="FEE: 1%" lines={4} /></g>
          <g opacity={on(f, start, 8)}><Label x={1300} y={GROUND + 72} text="BEFORE YOU START" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, fees95, 10) * (1 - on(f, picture, 10))}>
          <Prospectus x={640} y={560} s={1.0} open={on(f, table, 16)} mark={on(f, prospectus, 10)} />
          <g opacity={on(f, official, 8)}><Label x={640} y={GROUND + 60} text="PROSPECTUS" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, adviser96, 8)}><Doc x={1300} y={560} s={1.3} title="AGREEMENT" lines={5} /></g>
          <g opacity={on(f, look, 8)} transform={`translate(${lerp(1600, 760, on(f, look, 18))} 560)`}><Magnifier x={0} y={0} s={0.9} /></g>
        </g>
        <g opacity={on(f, picture, 10)}>
          <SaverJar x={960} y={GROUND} w={340} h={520} fill={0.85} />
          <g opacity={on(f, whole, 8)}><rect x={960 - 210} y={GROUND - 600} width={420} height={620} rx={50} fill="none" stroke={P.coral} strokeWidth={8} strokeDasharray="20 12" /></g>
          <g opacity={on(f, decades97, 8)}>{[0, 1, 2, 3].map((k) => <Scoop key={k} x={1300 + k * 70} y={GROUND - 520 + k * 90} s={0.6} r={-20} full={1} />)}</g>
        </g>
      </g>}

      {/* # C) the four steps; small numbers become big; more than everything they put in */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, one100, 10)}>
          {[[small99, 'scoop'], [everything99, 'jar'], [never99, 'ghost'], [added99, 'stack']].map(([at, kind], k) => <g key={k} opacity={on(f, at as number, 8)} transform={`translate(${300 + k * 440} 0)`}>
            {kind === 'scoop' && <Scoop x={-60} y={560} s={1.5} r={-10} full={1} />}
            {kind === 'jar' && <g><SaverJar x={0} y={GROUND - 200} w={240} h={330} fill={0.8} /><rect x={-160} y={GROUND - 590} width={320} height={410} rx={40} fill="none" stroke={P.coral} strokeWidth={8} strokeDasharray="18 12" /></g>}
            {kind === 'ghost' && <GhostPile x={0} y={GROUND - 200} n={12} w={170} />}
            {kind === 'stack' && <Stack x={0} y={GROUND - 200} n={Math.round(4 + 10 * on(f, decades99, 18))} w={170} color={P.coral} />}
            <Label x={0} y={GROUND - 110} text={['A SMALL CUT', 'FROM EVERYTHING', 'NEVER GROWS AGAIN', 'ADDED UP'][k]} size={52} font="Bebas Neue" color={P.ink} />
            <Label x={0} y={GROUND + 60} text={`STEP ${k + 1}`} size={44} font="Bebas Neue" color={P.ink2} />
          </g>)}
        </g>
        <g opacity={on(f, one100, 10) * (1 - on(f, working, 10))}>
          <g transform={`translate(960 ${GROUND - 300}) scale(${lerp(2.0, 1.0, on(f, repeated, 14))})`} opacity={1 - on(f, become, 10)}><Coin x={0} y={0} s={1.2} text="1%" /></g>
          {Array.from({ length: 24 }, (_, k) => { const at = repeated + k * 2, t = on(f, at, 10); return f >= at ? <Coin key={k} x={lerp(960, 560 + (k % 8) * 115, t)} y={lerp(GROUND - 300, GROUND - 60 - Math.floor(k / 8) * 70, t)} s={0.9} o={1 - on(f, become, 10)} /> : null })}
          <g opacity={on(f, become, 10)}><Stack x={960} y={GROUND - 10} n={Math.round(22 * on(f, big101, 16))} w={300} color={P.coral} /></g>
        </g>
        <g opacity={on(f, working, 10)}>
          <g opacity={on(f, working, 8)}><Stack x={760} y={GROUND - 10} n={20} w={240} color={P.coral} /><Label x={760} y={GROUND + 72} text="THE FEE'S COST" size={56} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, put102, 8)}><Stack x={1160} y={GROUND - 10} n={18} w={240} /><Label x={1160} y={GROUND + 72} text="WHAT THEY PUT IN" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, s103, 10)}><Person f={f} who="hero" beats={[[0, 'waveA', 'smiling', 'waveB', 16]]} x={1560} y={GROUND} s={0.78} /></g>
        </g>
      </g>}
      <Vignette id="fe-means" />
    </g>
  )
}

const BEATS = ['s89:fee', 's89:bad', 's90:buys', 's90:fund', 's90:advice', 's90:avoid', 's90:mistakes', 's91:cheaper', 's91:not', 's91:better', 's91:inside', 's91:differ', 's92:question', 's92:get', 's92:worth', 's92:costs', 's92:years', 's93:know', 's93:advance', 's94:nobody', 's94:markets', 's94:written', 's94:start', 's95:fees', 's95:table', 's95:prospectus', 's95:official', "s96:adviser's", 's96:agreement', 's97:worth', 's97:look', 's97:pay', 's97:picture', 's97:whole', 's97:decades', 's98:four', 's99:small', 's99:everything', 's99:never', 's99:added', 's99:decades', 's100', 's100:nothing', 's101:small', 's101:repeated', 's101:become', 's101:big', 's102:working', 's102:cost', 's102:put', 's103', 's103:advice', "s89:means", "s92:pay", "s93:fees", "s96", "s99:year", "s102:example", "s103:money", "s95:describes"]
export const FE_MEANS = makePiece('fe-means', 'Fee long: not every fee is bad (hero says no); a fee buys a fund run for you, advice that avoids mistakes; cheaper is not automatically better; is it worth what it costs; fees known in advance — the prospectus fee table, the agreement, look it up; the four steps; small numbers become big; more than everything put in', {
  mood: 'light', Component: Means, beats: BEATS,
  sfx: [['s89:bad', 'thud', 0.3], ['s90:avoid', 'swish', 0.25], ['s91:inside', 'pop', 0.25], ['s92:costs', 'tick', 0.25], ['s95:table', 'flutter', 0.3], ['s97:look', 'swish', 0.25], ['s99:small', 'pop', 0.2], ['s99:added', 'coin', 0.25], ['s101:big', 'riser', 0.3], ['s102:put', 'ding', 0.3]] })
