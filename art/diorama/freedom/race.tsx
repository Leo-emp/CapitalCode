// ---------------------------------------------------------------- s48–s60: step three, our own math — five savings rates, five roads.
// A) Our assumption: a sapling grows 5% a year after inflation; beside it, a taller tree for history (S&P 500 1928–2025, nearly 7% after inflation).
// B) Five lanes appear one by one, each a road whose length is the years to the number: 10% ≈ 51, 20% ≈ 37, 30% ≈ 28, 50% ≈ 17, 70% under 9. Maya walks each.
// C) What isn't in the math: a SALARY envelope is lifted off the table and crossed. A high earner ($200,000, spends 90%) walks the same 51-year lane beside Maya.
// D) Bigger number, bigger savings, same pace (two towers + two stacks rising together). A raise: spent → shopping bags (no faster); kept → the walker speeds up.
// E) The gap is the clock: EARN and SPEND bars, the gap between them turns into a clock face. Then a drawer of idle cash (won't grow).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, C, Cross, Defs, Envelope, Flag, FONT, Grain, Stack, Tag, Tower, Bundle, fadeIn, scene } from './kit'

const G = 930
const LANES: [string, number, string][] = [['10%', 51.4, 'ABOUT 51 YEARS'], ['20%', 36.7, 'ABOUT 37 YEARS'], ['30%', 28.0, 'ABOUT 28 YEARS'], ['50%', 16.6, 'ABOUT 17 YEARS'], ['70%', 8.8, 'UNDER 9 YEARS']]
const X0 = 330, PX = 26                       // # lane start x; px per year (51.4 y → 1336 px)

// # a tree that grows with g 0–1 (trunk + layered round canopy)
const Tree: React.FC<{ x: number; y: number; g: number; s?: number; color?: string }> = ({ x, y, g, s = 1, color = C.sage }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (0.25 + 0.75 * g)})`}>
    <ellipse cx={0} cy={4} rx={120} ry={16} fill="#000" opacity={0.15} />
    <path d="M-18 0 L-12 -220 L12 -220 L18 0 Z" fill={C.woodD} />
    <circle cx={0} cy={-300} r={130} fill={color} /><circle cx={-80} cy={-240} r={90} fill={color} /><circle cx={80} cy={-240} r={90} fill={color} />
    <circle cx={-30} cy={-340} r={60} fill="#fff" opacity={0.15} />
    <circle cx={60} cy={-220} r={80} fill="#000" opacity={0.08} />
  </g>
)

const Race: React.FC<PieceProps> = ({ f, c }) => {
  const own = c('s48:own'), math48 = c('s48:math'), grow48 = c('s48:grow'), five48 = c('s48:five'), inflation48 = c('s48:inflation')
  const purpose = c('s49:purpose'), lower49 = c('s49:lower'), history = c('s49:history'), y1928 = c('s49:1928'), y2025 = c('s49:2025'), sp49 = c('s49:sp'), seven49 = c('s49:seven'), inflation49 = c('s49:inflation')
  const ten50 = c('s50:ten'), reaches = c('s50:reaches'), fiftyone = c('s50:fifty')
  const twenty51 = c('s51:twenty'), thirty51 = c('s51:thirty')
  const thirty52 = c('s52:thirty'), twenty52 = c('s52:twenty')
  const half53 = c('s53:half'), seventeen = c('s53:seventeen')
  const seventy = c('s54:seventy'), nine = c('s54:nine')
  const notice = c('s55:notice'), isnt = c('s55:isn\'t'), salary55 = c('s55:salary')
  const earning56 = c('s56:earning'), two56 = c('s56:two'), ninety56 = c('s56:ninety'), same56 = c('s56:same'), path56 = c('s56:path'), ten56 = c('s56:ten')
  const bigger57 = c('s57:bigger'), spend57 = c('s57:spend'), savings57 = c('s57:savings'), pace = c('s57:pace')
  const raise = c('s58:raise'), speeds = c('s58:speeds'), extra = c('s58:extra'), kept58 = c('s58:kept'), spent58 = c('s58:spent')
  const gap = c('s59:gap'), earn59 = c('s59:earn'), spend59 = c('s59:spend'), clock = c('s59:clock')
  const drawer = c('s60:drawer'), grow60 = c('s60:grow'), where60 = c('s60:where')

  const AB = c('s50') - 6, BC = c('s55') - 6, CD = c('s57') - 6, DE = c('s59') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)

  // # B) lanes: each appears on its own rate word; Maya walks the lane while its years are said
  const laneAt = [ten50, twenty51, thirty52, half53, seventy]
  const yearsAt = [fiftyone, thirty51, twenty52, seventeen, nine]
  const laneY = (k: number) => 360 + k * 128

  return (
    <g>
      <Defs />
      {/* # A) our 5% vs history's nearly 7% */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="orchard" f={f} sun={[1650, 230]} ground={G} />
        <Tree x={720} y={G} g={on(f, grow48, 40) * 0.72} s={1.1} />
        <Tag x={720} y={G + 70} text={f >= inflation48 ? 'OUR MATH: 5% A YEAR AFTER INFLATION' : 'OUR MATH: 5% A YEAR'} size={36} o={on(f, five48, 8)} point="none" color={f >= inflation48 ? C.gold : C.cream} />
        <g opacity={on(f, history - 6, 10)}>
          <Tree x={1300} y={G} g={on(f, history, 40) + 0.06 * win(f, c('s49:averaged'), c('s49:averaged') + 16, 6)} s={1.1} color={C.moss} />
          <Tag x={1300} y={G + 70} text={f >= inflation49 ? 'S&P 500: NEARLY 7% AFTER INFLATION' : f >= seven49 ? 'S&P 500: NEARLY 7%' : 'S&P 500'} size={36} o={on(f, sp49, 8)} point="none" color={C.cream} />
          <Tag x={1300} y={300} text={f >= y2025 ? '1928 → 2025' : '1928'} size={40} o={on(f, y1928, 8)} point="none" />
        </g>
        <Person f={f} who="investorF" beats={[[0, 'explain', 'neutral'], [c('s48:let\'s'), 'think', 'thinking'], [math48, 'countOne', 'thinking'], [lower49, 'present', 'smiling']]} x={250} y={G} s={0.9} />
        <Tag x={720} y={300} text="A BIT LOWER, ON PURPOSE" size={40} o={on(f, purpose, 8) * (1 - on(f, history, 8))} point="none" color={C.gold} />
      </g>}

      {/* # B) five lanes, five road lengths */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="orchard" f={f} sun={null} ground={G + 120} />
        {LANES.map(([rate, yrs, label], k) => { const at = laneAt[k], y = laneY(k), len = yrs * PX, show = on(f, at - 4, 8), draw = on(f, at, 22)
          const walk = span(f, k === 0 ? c('s50:reaches') : at, yearsAt[k] + 14)
          return <g key={k} opacity={show}>
            <rect x={X0 - 150} y={y - 40} width={130} height={80} rx={16} fill={k === 3 || k === 4 ? C.cashD : C.terra} transform={k === 0 ? `translate(${X0 - 85} ${y}) scale(${1 + 0.12 * win(f, c('s50:pay'), c('s50:pay') + 16, 4)}) translate(${-(X0 - 85)} ${-y})` : undefined} />
            <text x={X0 - 85} y={y + 18} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}` }}>{rate}</text>
            <rect x={X0} y={y - 18} width={len * draw} height={36} rx={18} fill="#E9D3A8" />
            {Array.from({ length: Math.floor(yrs / 10) }, (_, j) => <rect key={j} x={X0 + (j + 1) * 10 * PX - 2} y={y - 18} width={4} height={36} fill="#C9B48E" opacity={draw} />)}
            <Flag x={X0 + len * draw} y={y + 16} f={f} s={0.32} color={k >= 3 ? C.cashD : C.terra} />
            <g opacity={on(f, yearsAt[k], 6)}><Tag x={X0 + len + 150} y={y} text={label} size={34} point="none" color={C.cream} /></g>
            <circle cx={X0 + len * walk} cy={y} r={14} fill={C.skyD} stroke="#fff" strokeWidth={4} opacity={walk > 0 && walk < 1 ? 1 : 0} />
          </g> })}
        <Tag x={X0 + 10 * PX * 2.5} y={1010} text="EACH LINE = 10 YEARS  ·  CAPITALCODE MATH, EXAMPLE 5% RETURN" size={28} o={on(f, ten50, 8)} point="none" />
      </g>}

      {/* # C) the salary isn't in it: a high earner walks the same 51-year road */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="orchard" f={f} sun={null} ground={G} />
        <g opacity={1 - on(f, earning56 - 6, 10)}>
          <g transform={`translate(960 ${lerp(G - 300, G - 360, on(f, isnt, 14))})`}><rect x={-420} y={-130} width={840} height={260} rx={20} fill={C.cream} stroke="#C9A877" strokeWidth={4} />
            <text x={-380} y={-50} fill={C.ink} style={{ font: `400 54px ${FONT.big}` }}>YEARS DEPEND ON: SAVINGS RATE, RETURN</text>
            <text x={-380} y={40} fill={C.inkSoft} style={{ font: `400 44px ${FONT.big}` }}>NOTHING ELSE</text></g>
          <g opacity={on(f, salary55 - 4, 8)}><Envelope x={1660} y={G - 120} s={1.1} text="SALARY" /><Cross x={1660} y={G - 120} r={140} p={on(f, salary55 + 6, 12)} /></g>
          <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [isnt, 'pointUp', 'smiling']]} x={380} y={G} s={0.9} />
        </g>
        <g opacity={on(f, earning56 - 6, 10)}>
          {[0, 1].map((k) => { const y = 520 + k * 260, at = k === 0 ? same56 : two56
            return <g key={k}>
              <rect x={X0 + 120} y={y - 18} width={51.4 * PX * on(f, same56, 20)} height={36} rx={18} fill="#E9D3A8" />
              <Flag x={X0 + 120 + 51.4 * PX * on(f, same56, 20)} y={y + 16} f={f} s={0.36} />
              <Tag x={X0 - 10} y={y - 110} text={k === 0 ? 'MAYA: $50,000, SAVES 10%' : (f >= c('s56:ninety') ? '$200,000, SPENDS 90%' : '$200,000 A YEAR')} size={32} o={on(f, at, 8)} point="none" color={C.cream} />
              <circle cx={X0 + 120 + 51.4 * PX * span(f, path56, ten56 + 30)} cy={y} r={16 + (k === 0 ? 6 * win(f, ten56, ten56 + 14, 4) : 0)} fill={k === 0 ? C.skyD : C.terra} stroke="#fff" strokeWidth={4} opacity={on(f, path56, 6)} />
            </g> })}
          <Tag x={1150} y={300} text="SAME 51-YEAR PATH" size={50} o={on(f, path56, 8)} point="none" color={C.gold} />
        </g>
      </g>}

      {/* # D) bigger number, bigger savings, same pace; a raise only helps if it's kept */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="orchard" f={f} sun={[1700, 230]} ground={G} />
        <g opacity={1 - on(f, raise - 6, 10)}>
          <Tower x={560} y={G} h={240 * on(f, c('s57:number') - 6, 14) + 4} w={150} label="MAYA'S" />
          <Tower x={900} y={G} h={600 * on(f, bigger57, 16) + 4} w={150} label={f >= c('s57:spend') ? "HIGH EARNER'S" : undefined} />
          <Stack x={1320} y={G} n={1 + 1 * on(f, savings57, 16)} s={0.9} /><Stack x={1600} y={G} n={1 + 4 * on(f, savings57, 16)} s={0.9} />
          <Tag x={730} y={G + 70} text="NUMBERS" size={34} o={1} point="none" /><Tag x={1460} y={G + 70} text="YEARLY SAVINGS" size={34} o={1} point="none" />
          <Tag x={1460} y={640} text="THEY ONLY KEEP PACE" size={46} o={on(f, pace, 8)} point="none" color={C.gold} />
        </g>
        <g opacity={on(f, raise - 6, 10)}>
          <Envelope x={960} y={300} s={1} text="+ RAISE" o={on(f, raise, 8)} />
          <g opacity={on(f, kept58 - 4, 8)}><Stack x={1300} y={G} n={4} /><Tag x={1300} y={G - 260} text="KEPT: FASTER" size={40} o={1} color={C.cashD} ink="#fff" /></g>
          <g opacity={on(f, spent58 - 4, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${520 + k * 110} ${G})`}><path d="M-46 0 L-54 -120 L54 -120 L46 0 Z" fill={[C.terra, C.sky, C.gold][k]} /><path d="M-24 -120 Q-24 -160 0 -160 Q24 -160 24 -120" fill="none" stroke={C.inkSoft} strokeWidth={6} /></g>)}
            <Tag x={630} y={G - 250} text="SPENT: NO FASTER" size={40} o={1} color={C.terra} ink="#fff" /></g>
          <Person f={f} who="investorF" beats={[[0, 'holdUp', 'smiling'], [speeds, 'pointUp', 'smiling'], [extra, 'holdUp', 'neutral'], [kept58, 'point', 'smiling'], [spent58, 'shrug', 'neutral']]} x={960} y={G} s={0.85} />
        </g>
      </g>}

      {/* # E) the gap is the clock; idle cash in a drawer won't grow */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky="orchard" f={f} sun={null} ground={G} />
        <g opacity={1 - on(f, c('s60:saved'), 10)}>
          <rect x={300} y={400} width={1200 * on(f, earn59 - 4, 16)} height={90} rx={20} fill={C.cash} /><Tag x={240} y={445} text="EARN" size={40} o={on(f, earn59, 8)} point="none" />
          <rect x={300} y={560} width={760 * on(f, spend59 - 4, 16)} height={90} rx={20} fill={C.terra} /><Tag x={240} y={605} text="SPEND" size={40} o={on(f, spend59, 8)} point="none" />
          <g opacity={on(f, gap, 10)}><rect x={1060} y={550} width={440} height={110} rx={20} fill="none" stroke={C.gold} strokeWidth={8} strokeDasharray="20 14" /><Tag x={1280} y={720} text="THE GAP" size={44} o={1} point="up" color={C.gold} /></g>
          <g opacity={on(f, clock - 6, 10)} transform="translate(1280 300)"><circle r={110} fill={C.cream} stroke={C.gold} strokeWidth={14} /><line x1={0} y1={0} x2={0} y2={-80} stroke={C.ink} strokeWidth={10} strokeLinecap="round" transform={`rotate(${(f - clock) * 6})`} /><line x1={0} y1={0} x2={56} y2={0} stroke={C.ink} strokeWidth={10} strokeLinecap="round" /><circle r={12} fill={C.terra} /></g>
        </g>
        <g opacity={on(f, c('s60:saved'), 10)} transform={`translate(960 ${G})`}>
          <rect x={-300} y={-360} width={600} height={360} rx={16} fill="url(#fr-woodg)" />
          <g transform={`translate(0 ${30 * on(f, drawer, 14)})`}><rect x={-260} y={-230} width={520} height={150} rx={10} fill="#8A5A38" /><rect x={-60} y={-170} width={120} height={20} rx={10} fill={C.gold} /></g>
          {[[-170, -250], [-40, -262], [90, -250], [200, -258]].map(([bx, by], k) => <g key={k} opacity={on(f, drawer + 6, 8)}><Bundle x={bx} y={by + 30 * on(f, drawer, 14)} s={0.9} r={k * 5 - 8} /></g>)}
          <Tag x={0} y={-430} text="WON'T GROW 5% A YEAR" size={42} o={on(f, grow60, 8) * (1 - on(f, where60, 6))} color={C.terra} ink="#fff" />
          <g opacity={on(f, where60, 8)} transform={`translate(0 ${-470 - 14 * pop(f, where60, 14)})`}><circle r={70} fill={C.cream} stroke={C.gold} strokeWidth={8} /><text y={34} textAnchor="middle" fill={C.terraD} style={{ font: `400 100px ${FONT.big}` }}>?</text></g>
        </g>
      </g>}

      <Headline f={f} lines={[[own, 'OUR OWN MATH', C.ink, 104], [ten50, 'YEARS TO REACH YOUR NUMBER', C.ink, 96], [notice, "WHAT'S MISSING? THE SALARY", C.terraD, 96], [earning56, 'A HIGH EARNER, SAVING 10%', C.ink, 96],
        [bigger57, 'BIGGER NUMBER, BIGGER SAVINGS', C.ink, 96], [raise, 'A RAISE ONLY HELPS IF IT IS KEPT', C.cashD, 92], [gap, 'THE GAP IS THE CLOCK', C.terraD, 104], [drawer, 'SO WHERE DOES IT GO?', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s48:let's", "s49:sp", "s49:averaged", "s49:inflation", "s56:ten", "s57:number", "s57:spend", "s58:speeds", "s58:extra", "s60:saved", 's48:own', 's48:math', 's48:grow', 's48:five', 's48:inflation', 's49:purpose', 's49:lower', 's49:history', 's49:1928', 's49:2025', 's49:seven', 's50:ten', 's50:pay', 's50:reaches', 's50:fifty', 's51:twenty', 's51:thirty', 's52:thirty', 's52:twenty',
  's53:half', 's53:seventeen', 's54:seventy', 's54:nine', 's55:notice', "s55:isn't", 's55:salary', 's56:earning', 's56:two', 's56:ninety', 's56:same', 's56:path', 's57:bigger', 's57:savings', 's57:pace',
  's58:raise', 's58:kept', 's58:spent', 's59:gap', 's59:earn', 's59:spend', 's59:clock', 's60:drawer', 's60:grow', 's60:year', 's60:where']
export const FR_RACE = makePiece('fr-race', 'Freedom step three math: a sapling for our 5% a year after inflation, a taller tree for the S&P 500 1928-2025 (nearly 7%); five lanes 10%/20%/30%/50%/70% drawn as roads whose length is the years (about 51, 37, 28, 17, under 9) with a dot walking each; YEARS DEPEND ON SAVINGS RATE AND RETURN card, a SALARY envelope crossed; Maya ($50,000, saves 10%) and a high earner ($200,000, spends 90%) on the same 51-year path; bigger number $4.5M vs $1.1M and bigger savings only keep pace; a + RAISE envelope: kept = faster, spent = shopping bags, no faster; EARN vs SPEND bars, THE GAP, a clock; a drawer of idle cash, WON\'T GROW 5% A YEAR', {
  mood: 'light', Component: Race, beats: BEATS,
  sfx: [['s48:grow', 'softpop', 0.15], ['s50:fifty', 'tick', 0.15], ['s51:thirty', 'tick', 0.15], ['s52:twenty', 'tick', 0.15], ['s53:seventeen', 'tick', 0.15], ['s54:nine', 'ding', 0.18], ['s55:salary', 'swish', 0.15], ['s59:clock', 'tick', 0.15], ['s60:drawer', 'thud', 0.15]] })
