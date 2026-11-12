// ---------------------------------------------------------------- s31–s45: step two — pouring Maya's $43,900 into the tanks.
// A) Night waterworks, three big tanks on rising brick steps (10%, 12%, 22%) and the tax chest on the ground; Maya stands
//    beside the chest. The tap fills the 10% tank to $12,400; a coin pile $1,240 appears above it. The water spills over into
//    the 12% tank: $31,500 (43,900 − 12,400), coins $3,780. A dashed line marks 50,400 at the top of the 12% tank; the tap
//    stops at 43,900, the 22% tank stays EMPTY. STEP 3: the two coin piles fly into the chest: $5,020, her tax for the year.
// B) Her bracket vs her average: HER BRACKET 12% on the 12% tank; a 12% × $60,000 card is crossed; her whole $60,000 pay
//    slip beside the chest; a big gold coin with an 8.4% slice (5,020 ÷ 60,000), 8 cent coins out of a dollar; AVERAGE
//    (EFFECTIVE) RATE 8.4% vs MARGINAL RATE 12% (a drop falls into the 12% tank: her next dollar).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { NightWorld, Tap, Stream, Chest, Paycheck, Cross, Sign, Coin, BracketLine, Vig, TXT, INK, BRASS, BRASS2, CORAL, MINT, WARM, PAPER, Life } from './kit'
import { Steps3, Works, Overflow, CoinTag, WaterTag, WX, WY, WW, WTOP, WSURF } from './works'

const L1 = 31500 / 38000 // how full the 12% tank gets for Maya

const Fill: React.FC<PieceProps> = ({ f, c }) => {
  const holds = c('s31:holds'), d12400 = c('s31:12400'), p10 = c('s31:10')
  const fills = c('s32:fills'), up = c('s32:up'), of32 = c('s32:of'), d1240 = c('s32:1240')
  const still = c('s33:still'), spills = c('s33:spills'), b12 = c('s33:12')
  const much = c('s34:much'), d43900 = c('s34:43900'), minus = c('s34:minus'), d31500 = c('s34:31500')
  const p12 = c('s35:12'), d3780 = c('s35:3780')
  const hold36 = c('s36:hold'), d50400 = c('s36:50400'), stops = c('s36:stops'), full = c('s36:full'), empty = c('s36:empty')
  const step3 = c('s37:step'), add = c('s37:add'), plus = c('s37:plus'), d5020 = c('s37:5020')
  const federal = c('s38:federal'), year = c('s38:year')
  const people = c('s39:people'), bracket = c('s39:bracket'), highest = c('s39:highest'), reaches = c('s39:reaches')
  const pay40 = c('s40:pay'), compare = c('s40:compare'), d60k = c('s40:60000')
  const divided = c('s41:divided'), d84 = c('s41:84')
  const cents = c('s42:cents'), every = c('s42:every')
  const name = c('s43:name'), average = c('s43:average'), effective = c('s43:effective')
  const p12m = c('s44:12'), marginal = c('s44:marginal'), next = c('s44:next')
  const two = c('s45:two'), mixing = c('s45:mixing'), myth = c('s45:myth')

  const A = 1 - on(f, people - 6, 12), B = on(f, people - 6, 12)
  const lv0 = on(f, fills, 40), lv1 = L1 * on(f, spills, 60)
  const flying = on(f, plus, 24)
  const maya: Beat[] = [[holds, 'idle', 'smiling'], [fills, 'present', 'smiling'], [spills, 'pointUp', 'thinking'], [much, 'countA', 'thinking', 'countB', 12], [c('s35:31500'), 'measure', 'thinking'], [c('s35:is'), 'countOne', 'thinking'], [stops, 'stop', 'neutral'], [add, 'clapA', 'smiling', 'clapB', 8], [d5020, 'pointDown', 'smiling'], [year, 'idle', 'smiling']]
  const tapOpen = on(f, fills - 6, 16) * (1 - on(f, stops, 16))

  return (
    <g>
      <NightWorld f={f} id="tx-fill" moon={false} />
      <Steps3 />
      {/* # the three tanks stay for the whole piece; the 22% tank leaves in B */}
      <Works f={f} lv={[lv0, lv1, 0]} o={[1, 1, 1 - on(f, people - 6, 12)]}
        lit={[win(f, p10, fills + 10, 6) + win(f, d1240 - 10, d1240 + 20, 6), win(f, b12, d31500, 6) + win(f, p12, d3780 + 20, 6) + win(f, bracket, reaches + 20, 6) + win(f, marginal, next + 30, 6), win(f, empty, step3, 6)]}
        capLit={[win(f, d12400, fills, 6), win(f, d50400, stops, 6), 0]} />
      <g opacity={1 - on(f, people - 6, 12)}><Overflow k={0} f={f} o={on(f, spills - 8, 10)} flow={win(f, spills, stops + 10, 8)} lvNext={lv1} /></g>
      {/* the tap pours into the 10% tank, then (after it is full) the water carries on into the 12% tank via the pipe */}
      <g opacity={1 - on(f, people - 6, 12)}>
        <Tap x={220} y={400} open={tapOpen} />
        <Stream x={300} y0={440} y1={WSURF(0, lv0) + 10} f={f} o={tapOpen} />
      </g>
      {/* amounts in the water */}
      <WaterTag k={0} lv={lv0} t="$12,400" o={win(f, up, people - 6, 8)} />
      <WaterTag k={1} lv={lv1} t="$31,500" o={on(f, d31500, 8) * (1 - on(f, people - 6, 8))} />
      {/* the 50,400 line at the top of the 12% tank, and the empty gap below it */}
      <g opacity={win(f, d50400, step3, 8)}>
        <BracketLine x1={WX[1] - WW / 2} x2={WX[1] + WW / 2} y={WSURF(1, 1)} />
        <Sign x={WX[1] - 60} y={396} t="50,400 LINE" size={38} col={PAPER} />
        <g opacity={on(f, full, 8)}><rect x={WX[1] - WW / 2 + 14} y={WSURF(1, 1)} width={WW - 28} height={WSURF(1, L1) - WSURF(1, 1)} fill="#FFFFFF" opacity={0.12 + 0.06 * Math.sin(f / 5)} /></g>
      </g>
      <g opacity={win(f, empty, step3, 8)}><Sign x={WX[2]} y={WTOP(2) + 200} t="EMPTY" size={50} /></g>
      {/* the sum on the sky */}
      <g opacity={win(f, minus, d3780, 8)}><Sign x={960} y={290} t="43,900 − 12,400 = 31,500" size={50} /></g>

      {/* # coin piles above the tanks, then flying into the chest */}
      {A > 0.001 && <g opacity={A}>
        <g transform={`translate(${lerp(0, 1600 - WX[0], flying)} ${lerp(0, 560, flying)}) scale(${lerp(1, 0.6, flying)})`}><CoinTag x={WX[0]} y={360} t="$1,240" o={on(f, d1240, 8) * (1 - on(f, plus + 22, 4))} s={pop(f, d1240, 12)} /></g>
        <g transform={`translate(${lerp(0, 1600 - WX[1], on(f, plus + 6, 24))} ${lerp(0, 560, on(f, plus + 6, 24))}) scale(${lerp(1, 0.6, on(f, plus + 6, 24))})`}><CoinTag x={WX[1]} y={330} t="$3,780" o={on(f, d3780, 8) * (1 - on(f, plus + 28, 4))} s={pop(f, d3780, 12)} /></g>
        <g opacity={on(f, of32, 8) * (1 - on(f, d1240, 8))}><Sign x={WX[0] + 40} y={300} t="10% OF $12,400" size={40} /></g>
        <g opacity={on(f, p12, 8) * (1 - on(f, d3780, 8))}><Sign x={WX[1] + 40} y={270} t="12% OF $31,500" size={40} /></g>
        <Chest x={1600} y={940} s={0.95} n={on(f, plus + 20, 4) * 6 + on(f, plus + 28, 4) * 10} total={f >= d5020 ? '$5,020' : undefined} open={on(f, add, 14)} />
        <g opacity={on(f, step3, 8) * (1 - on(f, add, 8))}><Sign x={1600} y={640} t="STEP 3" size={60} /></g>
        <g opacity={on(f, federal, 8)}><Sign x={1600} y={640} t="TAX FOR THE YEAR" size={44} /></g>
        <g><rect x={1760} y={560} width={12} height={380} fill="#3A2C25" /><circle cx={1766} cy={556} r={18} fill={WARM} /><ellipse cx={1800} cy={760} rx={210} ry={300} fill={WARM} opacity={0.16} /></g>
        <Person f={f} who="investorF" beats={maya} x={1840} y={940} s={0.72} flip />
      </g>}

      {/* # B) bracket vs average */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, bracket, 8) * (1 - on(f, two, 8))}><Sign x={WX[1]} y={WTOP(1) - 40} t="HER BRACKET: 12%" size={48} col={WARM} /></g>
        <g opacity={win(f, highest, pay40, 8)}><path d={`M${WX[1]} ${WTOP(1) - 10} L${WX[1]} ${WSURF(1, L1) - 10}`} stroke={WARM} strokeWidth={8} strokeDasharray="14 10" /></g>
        {/* not 12% of all her pay */}
        <g opacity={win(f, pay40, compare + 6, 8)}><Sign x={1500} y={560} t="12% × $60,000?" size={60} col={PAPER} /><g opacity={on(f, pay40 + 10, 8)}><Cross x={1500} y={530} s={0.9} /></g></g>
        {/* tax chest vs whole pay */}
        <g opacity={win(f, compare, d84 - 6, 10)}>
          <Chest x={1260} y={940} s={0.75} n={12} total="$5,020" />
          <g opacity={on(f, d60k, 8)}><Paycheck x={1640} y={760} s={1} amount="$60,000" /></g>
          
        </g>
        <g opacity={win(f, divided, cents, 8)}><Sign x={1460} y={330} t="5,020 ÷ 60,000" size={56} /></g>
        {/* a big gold coin: an 8.4% slice */}
        <g opacity={win(f, d84 - 6, two, 10)} transform="translate(1460 640)">
          <circle r={190} fill="#F2C75C" stroke={BRASS2} strokeWidth={10} /><circle r={160} fill="none" stroke="#FFE39A" strokeWidth={5} />
          <path d={`M0 0 L0 -190 A190 190 0 0 1 ${190 * Math.sin(0.084 * 2 * Math.PI * on(f, d84, 20))} ${-190 * Math.cos(0.084 * 2 * Math.PI * on(f, d84, 20))} Z`} fill={CORAL} />
          <text y={60} textAnchor="middle" fill={BRASS2} style={TXT(150)}>$1</text>
          <g opacity={on(f, d84, 8)}><text x={120} y={-200} fill="#FFFFFF" style={TXT(80)}>≈ 8.4%</text></g>
        </g>
        {/* 8 cents out of every dollar */}
        <g opacity={win(f, cents, name, 8)}>{Array.from({ length: 8 }, (_, k) => <Coin key={k} x={1720 + (k % 3) * 64} y={lerp(640, 900 - Math.floor(k / 3) * 60, on(f, cents + k * 3, 16))} s={0.9} t="¢" />)}</g>
        <g opacity={on(f, average, 8) * (1 - on(f, two, 8))}><Sign x={1460} y={940} t={f >= effective ? 'AVERAGE (EFFECTIVE) RATE' : 'AVERAGE RATE'} size={44} col={MINT} /></g>
        {/* marginal: the next dollar drops into the 12% tank */}
        <g opacity={win(f, marginal, two, 8)}><Sign x={WX[1]} y={WTOP(1) - 40} t="MARGINAL RATE: 12%" size={48} col={WARM} /></g>
        <g opacity={win(f, next, two, 6)}><path d="M0 -24 Q18 0 0 20 Q-18 0 0 -24 Z" fill={WARM} transform={`translate(${WX[1]} ${lerp(WTOP(1) + 20, WSURF(1, L1) - 20, on(f, next, 20))})`} /></g>
        {/* two numbers side by side */}
        <g opacity={on(f, two, 10)}>
          <g transform={`translate(1180 600) scale(${pop(f, two, 12)})`}><rect x={-170} y={-120} width={340} height={220} rx={20} fill={MINT} stroke="#FFFFFF" strokeWidth={6} /><text y={10} textAnchor="middle" fill="#FFFFFF" style={TXT(110)}>8.4%</text><text y={70} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>AVERAGE</text></g>
          <g transform={`translate(1620 600) scale(${pop(f, two + 6, 12)})`}><rect x={-170} y={-120} width={340} height={220} rx={20} fill={WARM} stroke="#FFFFFF" strokeWidth={6} /><text y={10} textAnchor="middle" fill={INK} style={TXT(110)}>12%</text><text y={70} textAnchor="middle" fill={INK} style={TXT(40)}>MARGINAL</text></g>
          <g opacity={on(f, mixing, 8)}><text x={1400} y={600} textAnchor="middle" fill="#FFFFFF" style={TXT(90)}>≠</text></g>
          <g opacity={on(f, myth, 8)}><Sign x={1400} y={860} t="MIXING THEM UP = THE MYTH" size={44} col={PAPER} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s32:12400")} x={400} y={760} kind="ripple" />
        <Life f={f} at={c("s34:43900")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s34:already")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s36:can")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s36:so")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s36:43900")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s36:percent#2")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s37:1240")} x={1600} y={800} kind="glint" />
        <Life f={f} at={c("s37:3780")} x={1600} y={800} kind="glint" />
        <Life f={f} at={c("s38:dollars")} x={1600} y={800} kind="glint" />
        <Life f={f} at={c("s38:5020")} x={1600} y={800} kind="glint" />
        <Life f={f} at={c("s39:in")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s39:true")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s40:pay#2")} x={1460} y={560} kind="glint" />
        <Life f={f} at={c("s42:maya")} x={1460} y={560} kind="glint" />
        <Life f={f} at={c("s43:that")} x={1460} y={560} kind="glint" />
        <Life f={f} at={c("s44:12")} x={820} y={720} kind="ripple" />
        <Life f={f} at={c("s44:it")} x={820} y={720} kind="ripple" />
      </g>
      <g><Life f={f} at={c("s32:tax")} x={400} y={360} kind="glint" /></g>
      {/* # life:end */}
      <Vig id="tx-fill" />
      <Headline f={f} lines={[[holds, "POURING MAYA'S $43,900", '#FFFFFF', 84], [step3, 'ADD UP THE BUCKETS', '#FFFFFF', 88], [people, 'HER BRACKET VS. HER AVERAGE', '#FFFFFF', 84]]} />
    </g>
  )
}

export const TX_FILL = makePiece('tx-fill', "Step two at the night waterworks: three big glass tanks (10%, 12%, 22%) on rising brick steps and the tax chest on the ground with Maya beside it; the tap fills the 10% tank to $12,400 and a coin pile $1,240 appears; the water spills over by copper pipe into the 12% tank, $31,500 (43,900 − 12,400), coins $3,780; a dashed 50,400 LINE marks the top of the 12% tank, the tap stops at 43,900 and the 22% tank stays EMPTY; STEP 3: both coin piles fly into the chest, $5,020, tax for the year; then HER BRACKET: 12% on the 12% tank, a crossed 12% × $60,000 card, the chest beside her whole $60,000 pay slip, 5,020 ÷ 60,000, a big gold $1 coin with an 8.4% slice, eight cent coins, AVERAGE (EFFECTIVE) RATE vs MARGINAL RATE: 12% with her next dollar dropping into the 12% tank, and two cards 8.4% ≠ 12%.", {
  mood: 'dark', Component: Fill,
  beats: ["s31:holds", "s31:12400", "s31:10", "s32:fills", "s32:up", "s32:of", "s32:1240", "s33:still", "s33:spills", "s33:12", "s34:much", "s34:minus", "s34:31500", "s35:12", "s35:3780", "s36:50400", "s36:stops", "s36:full", "s36:empty", "s37:step", "s37:add", "s37:plus", "s37:5020", "s38:federal", "s38:year", "s39:people", "s39:bracket", "s39:highest", "s39:reaches", "s40:pay", "s40:compare", "s40:60000", "s41:divided", "s41:84", "s42:cents", "s42:every", "s43:name", "s43:average", "s43:effective", "s44:marginal", "s44:next", "s45:two", "s45:mixing", "s45:myth", "s35:31500", "s35:is", "s32:12400", "s34:43900", "s34:already", "s36:can", "s36:so", "s36:43900", "s36:percent#2", "s37:1240", "s37:3780", "s38:dollars", "s38:5020", "s39:in", "s39:true", "s40:pay#2", "s42:maya", "s43:that", "s44:12", "s44:it", "s32:tax"],
  sfx: [['s32:1240', 'pop', 0.1], ['s35:3780', 'pop', 0.1], ['s37:5020', 'pop', 0.12], ['s40:pay', 'thud', 0.1]] })
