// ---------------------------------------------------------------- s46–s63: the raise.
// A) The office: Maya's boss hands her a +$10,000 raise slip; her pay slip flips $60,000 → $70,000; a −$16,100 chip lifts
//    off (step one again) and $53,900 is left.
// B) The waterworks, the myth: the water crosses the 50,400 line into the 22% tank; then the myth paints ALL the water red:
//    a red chest ≈ $11,900, more than double her old $5,020 chest; Maya is shocked; a cross on the red chest.
// C) The real way: the tanks fill in order again — 10%: $12,400 → $1,240; 12% all the way to the line: $38,000 → $4,560;
//    only $3,500 lands in the 22% tank → $770; the three coin piles fly into the chest: $6,570.
// D) Before $5,020 vs now $6,570: +$1,550. Myth $11,900 vs real $6,570: off by more than $5,000. Her $10,000 raise as one
//    glass bar that splits: $8,450 kept, $1,550 tax. Old dollars never moved; only the new dollars met 22%. Her average-rate
//    dial moves 8.4% → 9.4% and Maya celebrates with more money.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { OfficeWorld, NightWorld, Tap, Stream, Chest, Paycheck, Cross, Sign, BracketLine, Vig, TXT, INK, BRASS, BRASS2, CORAL, MINT, WARM, PAPER, GLASS, Life } from './kit'
import { Steps3, Works, Overflow, CoinTag, WaterTag, WX, WW, WTOP, WSURF } from './works'

const L2 = 0.14 // the 22% tank holds only $3,500 of its $55,300 range; drawn a little fuller so it reads (labelled)
const RED3 = [CORAL, CORAL, CORAL]

const Raise: React.FC<PieceProps> = ({ f, c }) => {
  const test = c('s46:test'), boss = c('s46:boss'), gives = c('s46:gives'), d10k = c('s46:10000')
  const d60k = c('s47:60000'), d70k = c('s47:70000')
  const again = c('s48:again'), d16100 = c('s48:16100'), d53900 = c('s48:53900')
  const crosses = c('s49:crosses'), d50400 = c('s49:50400'), now49 = c('s49:now'), p22 = c('s49:22')
  const myth50 = c('s50:myth')
  const all = c('s51:all'), taxed51 = c('s51:taxed'), d11900 = c('s51:11900'), double = c('s51:double')
  const hurt = c('s52:hurt'), not52 = c('s52:not')
  const pour = c('s53:pour'), real53 = c('s53:real')
  const first = c('s54:first'), d1240 = c('s54:1240')
  const way = c('s55:way'), d38000 = c('s55:38000'), d4560 = c('s55:4560')
  const only = c('s56:only'), d3500 = c('s56:3500'), land = c('s56:land')
  const d770 = c('s57:770')
  const add = c('s58:add'), plus2 = c('s58:plus#2'), d6570 = c('s58:6570')
  const before = c('s59:before'), d5020 = c('s59:5020'), d1550 = c('s59:1550')
  const compare = c('s60:compare'), m11900 = c('s60:11900'), r6570 = c('s60:6570'), d5000 = c('s60:5000')
  const extra = c('s61:extra'), keeps = c('s61:keeps'), d8450 = c('s61:8450'), other = c('s61:other')
  const old = c('s62:old'), never = c('s62:never'), newD = c('s62:new'), higher = c('s62:higher')
  const average = c('s63:average'), d84 = c('s63:84'), d94 = c('s63:94'), more = c('s63:more'), less = c('s63:less')

  const A = 1 - on(f, crosses - 6, 12), W = on(f, crosses - 6, 12)
  const red = win(f, all, pour, 12)
  // # fill levels: shown full at the crossing (the result), emptied for the myth/real replay, refilled in order
  const refill = on(f, pour - 10, 8)
  const lv = [lerp(1, on(f, first, 30), refill), lerp(1, on(f, way, 40), refill), lerp(L2, L2 * on(f, only, 24), refill)]
  const sayAt = [c('s58:1240'), c('s58:4560'), c('s58:770')]
  const flyT = (k: number) => on(f, sayAt[k], 24)
  const tagEnd = (k: number) => 1 - on(f, sayAt[k] + 22, 4)
  const bossB: Beat[] = [[boss, 'idle', 'smiling'], [gives, 'offer', 'smiling'], [d10k, 'thumbsUp', 'smiling']]
  const mayaO: Beat[] = [[test, 'idle', 'neutral'], [gives, 'receive', 'smiling'], [d10k, 'holdUp', 'smiling'], [again, 'pointDown', 'thinking'], [d53900, 'holdUp', 'smiling']]
  const mayaW: Beat[] = [[crosses, 'idle', 'neutral'], [p22, 'pointUp', 'thinking'], [d11900, 'shock', 'shocked'], [hurt, 'despair', 'worried'], [not52, 'crossNoA', 'smiling', 'crossNoB', 10], [pour, 'present', 'smiling'], [c('s56:land'), 'pointUp', 'smiling'], [c('s57:22'), 'countOne', 'thinking'], [c('s57:3500'), 'measure', 'thinking'], [add, 'clapA', 'smiling', 'clapB', 8], [c('s58:new'), 'present', 'smiling'], [d6570, 'pointDown', 'smiling'], [before, 'idle', 'neutral'], [d1550, 'countOne', 'thinking'], [d5000, 'shrug', 'smiling'], [keeps, 'holdChest', 'smiling'], [more, 'celebrate', 'smiling'], [less, 'thumbsUp', 'smiling']]
  const hp = hand(f, mayaO, 640, 880, 1, false)

  return (
    <g>
      {/* # A) the office */}
      {A > 0.001 && <g opacity={A}>
        <OfficeWorld f={f} id="tx-raise-o" />
        <Person f={f} who="investorF" beats={mayaO} x={640} y={880} s={1} />
        <Person f={f} who="investor" beats={bossB} x={1400} y={880} s={1} flip />
        {f >= gives + 6 && <g transform={`translate(${hp.x + 60} ${hp.y - 70}) scale(${pop(f, gives + 6, 12)})`}>
          <Paycheck x={0} y={0} s={0.9} title={f >= d60k ? 'PAY' : 'RAISE'} amount={f >= d53900 ? '$53,900' : f >= d70k ? '$70,000' : f >= d60k ? '$60,000' : f >= d10k ? '+$10,000' : '+$'} />
        </g>}
        <g opacity={win(f, d16100, d53900 + 20, 8)} transform={`translate(${lerp(hp.x + 60, 1000, on(f, d16100, 20))} ${lerp(hp.y - 160, 330, on(f, d16100, 20))})`}><rect x={-120} y={-44} width={240} height={80} rx={14} fill={MINT} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(52)}>−$16,100</text></g>
        <g opacity={on(f, d53900, 8)}><Sign x={1000} y={480} t="TAXABLE INCOME" size={44} /></g>
      </g>}

      {/* # B–D) the waterworks */}
      {W > 0.001 && <g opacity={W}>
        <NightWorld f={f} id="tx-raise-n" moon={false} />
        <Steps3 />
        <g opacity={1 - win(f, before - 4, old - 4, 10) - 0.9 * on(f, average, 10)}>
          <Works f={f} lv={lv} col={red > 0.5 ? RED3 : undefined}
            lit={[win(f, d1240 - 10, d1240 + 20, 6) + win(f, old, newD, 6), win(f, d4560 - 10, d4560 + 20, 6) + win(f, old, newD, 6), win(f, p22, myth50, 6) + win(f, d770 - 10, d770 + 20, 6) + win(f, newD, average, 6)]} />
          <Overflow k={0} f={f} flow={win(f, way, only, 8)} lvNext={lv[1]} />
          <Overflow k={1} f={f} flow={win(f, only, d770, 8)} lvNext={lv[2]} />
          <Tap x={220} y={400} open={win(f, pour, only, 10)} />
          <Stream x={300} y0={440} y1={WSURF(0, lv[0]) + 10} f={f} o={win(f, pour, way, 8)} />
          {/* the 50,400 line */}
          <g opacity={win(f, d50400, myth50, 8) + win(f, way, d3500 + 30, 8)}><BracketLine x1={WX[1] - WW / 2} x2={WX[1] + WW / 2} y={WSURF(1, 1)} /><Sign x={WX[1] - 60} y={396} t="50,400 LINE" size={38} /></g>
          <g opacity={win(f, now49, myth50, 8)}><Sign x={WX[2] + 60} y={WTOP(2) - 120} t="NOW IN THE 22% BRACKET" size={40} col={WARM} /></g>
          {/* amounts in the water (real way) */}
          <WaterTag k={1} lv={lv[1]} t="$38,000" o={win(f, d38000, before, 8)} />
          <WaterTag k={2} lv={0.6} t="$3,500" o={0} />
          <g opacity={win(f, d3500, d770 - 4, 8)}><Sign x={WX[2] + 60} y={WTOP(2) - 120} t="$3,500 (ABOVE THE LINE)" size={40} /></g>
          {/* the myth: everything red */}
          <g opacity={win(f, taxed51, pour, 8)}><Sign x={960} y={300} t="ALL $53,900 × 22%" size={56} col={CORAL} tc="#FFFFFF" /></g>
          {/* old vs new dollars */}
          <WaterTag k={0} lv={1} t="OLD" o={win(f, old, average, 8)} />
          <WaterTag k={1} lv={1} t="OLD" o={win(f, old, average, 8)} />
          <g opacity={win(f, newD, average, 8)}><Sign x={WX[2] + 60} y={WTOP(2) - 120} t="NEW DOLLARS: 22%" size={44} col={WARM} /></g>
        </g>
        {/* coin piles (real way) fly into the chest */}
        {[[WX[0], 360, '$1,240', d1240], [WX[1], 330, '$4,560', d4560], [WX[2], 330, '$770', d770]].map(([x, y, t, at], k) => <g key={k} transform={`translate(${lerp(0, 1600 - (x as number), flyT(k))} ${lerp(0, 600 - (y as number) + 50, flyT(k))}) scale(${lerp(1, 0.6, flyT(k))})`}>
          <CoinTag x={x as number} y={y as number} t={t as string} o={on(f, at as number, 8) * tagEnd(k)} s={pop(f, at as number, 12)} />
        </g>)}
        {/* the chest(s) */}
        <g opacity={1 - on(f, extra, 10)}>
          <g opacity={win(f, all - 4, pour, 10) + on(f, add - 10, 10)}>
            <Chest x={1600} y={940} s={0.9} n={red > 0.5 ? 18 : on(f, sayAt[0] + 22, 4) * 5 + on(f, sayAt[1] + 22, 4) * 6 + on(f, sayAt[2] + 22, 4) * 3} total={red > 0.5 ? (f >= d11900 ? '≈ $11,900' : undefined) : (f >= d6570 ? '$6,570' : undefined)} open={1} />
          </g>
          <g opacity={win(f, double, pour, 8)}><Sign x={1520} y={650} t="BEFORE: $5,020" size={44} /></g>
          <g opacity={win(f, not52, pour, 6)}><Cross x={1600} y={770} s={1.2} /></g>
          {/* before vs now */}
          <g opacity={win(f, d5020 - 4, compare, 8)}><Chest x={1240} y={940} s={0.6} n={6} total="$5,020" /><Sign x={1240} y={700} t="BEFORE" size={40} /></g>
          <g opacity={win(f, d1550, compare, 8)} transform={`translate(1420 520) scale(${pop(f, d1550, 12)})`}><rect x={-130} y={-50} width={260} height={90} rx={16} fill={WARM} /><text y={22} textAnchor="middle" fill={INK} style={TXT(64)}>+$1,550</text></g>
          {/* myth vs real */}
          <g opacity={win(f, m11900 - 4, extra, 8)}><Chest x={1150} y={940} s={0.6} n={18} total="$11,900" /><Sign x={1150} y={700} t="MYTH" size={40} col={CORAL} tc="#FFFFFF" /></g>
          <g opacity={win(f, r6570, extra, 8)}><Sign x={1600} y={640} t="REAL" size={44} col={MINT} tc="#FFFFFF" /></g>
          <g opacity={win(f, d5000, extra, 8)} transform={`translate(1380 460) scale(${pop(f, d5000, 12)})`}><rect x={-170} y={-50} width={340} height={90} rx={16} fill={PAPER} stroke={BRASS2} strokeWidth={4} /><text y={22} textAnchor="middle" fill={CORAL} style={TXT(58)}>OFF BY $5,000+</text></g>
        </g>
        {/* the raise as one glass bar that splits: kept vs tax */}
        <g opacity={win(f, extra, old, 10)} transform="translate(960 330)">
          <rect x={-560} y={-70} width={1120} height={140} rx={30} fill={GLASS} opacity={0.18} />
          <rect x={-540} y={-52} width={1080 * 0.845 - 8} height={104} rx={22} fill={MINT} transform={`translate(${-30 * on(f, keeps, 16)} 0)`} />
          <rect x={-540 + 1080 * 0.845} y={-52} width={1080 * 0.155} height={104} rx={22} fill={CORAL} transform={`translate(${30 * on(f, keeps, 16)} 0)`} />
          <rect x={-560} y={-70} width={1120} height={140} rx={30} fill="none" stroke={GLASS} strokeWidth={6} />
          <g opacity={1 - on(f, keeps, 8)}><text y={26} textAnchor="middle" fill="#FFFFFF" style={TXT(76)}>+$10,000 RAISE</text></g>
          <g opacity={on(f, d8450, 8)}><text x={-90} y={26} textAnchor="middle" fill="#FFFFFF" style={TXT(76)}>KEPT $8,450</text></g>
          <g opacity={on(f, d8450 + 10, 8)}><text x={480} y={26} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>TAX $1,550</text></g>
          <g opacity={on(f, other, 8)}><text y={120} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>BEFORE OTHER TAXES</text></g>
        </g>
        {/* her average-rate dial */}
        <g opacity={on(f, average, 10)} transform="translate(1560 560)">
          <circle r={190} fill="#1E2552" stroke={BRASS} strokeWidth={14} />
          {Array.from({ length: 16 }, (_, k) => { const a = -120 + k * 16; return <line key={k} x1={150 * Math.sin((a * Math.PI) / 180)} y1={-150 * Math.cos((a * Math.PI) / 180)} x2={170 * Math.sin((a * Math.PI) / 180)} y2={-170 * Math.cos((a * Math.PI) / 180)} stroke="#FFFFFF" strokeWidth={k % 5 ? 3 : 6} /> })}
          {(() => { const v = lerp(8.4, 9.4, on(f, d94, 24)) * on(f, d84, 20), a = (-120 + v * 16) * Math.PI / 180; return <g><line x1={0} y1={0} x2={130 * Math.sin(a)} y2={-130 * Math.cos(a)} stroke={CORAL} strokeWidth={12} strokeLinecap="round" /><circle r={18} fill={BRASS} /><text y={110} textAnchor="middle" fill="#FFFFFF" style={TXT(76)}>{`${v.toFixed(1)}%`}</text></g> })()}
          <text y={-60} textAnchor="middle" fill={WARM} style={TXT(40)}>AVERAGE RATE</text>
        </g>
        <g opacity={on(f, more, 8)}><Sign x={1560} y={860} t="MORE MONEY, NOT LESS" size={48} col={MINT} tc="#FFFFFF" /></g>
        <g><rect x={1760} y={560} width={12} height={380} fill="#3A2C25" /><circle cx={1766} cy={556} r={18} fill={WARM} /><ellipse cx={1800} cy={760} rx={210} ry={300} fill={WARM} opacity={0.16} /></g>
        <Person f={f} who="investorF" beats={mayaW} x={1840} y={940} s={0.72} flip />
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s48:income")} x={760} y={420} kind="glint" />
        <Life f={f} at={c("s50:next")} x={820} y={640} kind="ripple" />
        <Life f={f} at={c("s51:dollars")} x={820} y={640} kind="ripple" />
        <Life f={f} at={c("s51:percent")} x={820} y={640} kind="ripple" />
        <Life f={f} at={c("s51:tax")} x={820} y={640} kind="ripple" />
        <Life f={f} at={c("s52:were")} x={820} y={640} kind="ripple" />
        <Life f={f} at={c("s51:before")} x={820} y={640} kind="ripple" />
        <Life f={f} at={c("s53:buckets")} x={400} y={640} kind="ripple" />
        <Life f={f} at={c("s54:like")} x={400} y={640} kind="ripple" />
        <Life f={f} at={c("s55:now")} x={820} y={620} kind="ripple" />
        <Life f={f} at={c("s56:bucket")} x={1240} y={800} kind="ripple" />
        <Life f={f} at={c("s60:the#2")} x={1600} y={800} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="tx-raise" />
      </g>}
      <Headline f={f} lines={[[test, 'THE BIG TEST: A $10,000 RAISE', INK, 84], [crosses, 'SHE CROSSES THE LINE', '#FFFFFF', 88], [myth50, 'WHAT THE MYTH SAYS', CORAL, 92], [real53, 'THE REAL WAY', MINT, 96], [before, 'WHAT THE RAISE REALLY COST', '#FFFFFF', 84], [old, 'ONLY THE NEW DOLLARS', '#FFFFFF', 88]]} />
    </g>
  )
}

export const TX_RAISE = makePiece('tx-raise', "The raise: in the office Maya's boss hands her a +$10,000 raise slip, her pay flips $60,000 → $70,000, a green −$16,100 chip lifts off and $53,900 of taxable income is left; at the night waterworks the water crosses the 50,400 LINE into the 22% tank (NOW IN THE 22% BRACKET); the myth paints all the water red — ALL $53,900 × 22% — a red chest ≈ $11,900 beside her old $5,020 chest, Maya shocked, then a cross; the real way: the tanks fill in order again, $1,240 from the 10% tank, $38,000 to the line in the 12% tank → $4,560, only $3,500 above the line in the 22% tank → $770, the coin piles fly into the chest: $6,570; BEFORE $5,020 vs now, +$1,550; MYTH $11,900 vs REAL $6,570, OFF BY $5,000+; her raise as one glass bar splitting into KEPT $8,450 and TAX $1,550 (before other taxes); OLD dollars in the first tanks never moved, NEW DOLLARS: 22%; an average-rate dial moves 8.4% → 9.4% and Maya celebrates: MORE MONEY, NOT LESS.", {
  mood: 'dark', Component: Raise,
  beats: ["s46:test", "s46:boss", "s46:gives", "s46:10000", "s47:60000", "s47:70000", "s48:again", "s48:16100", "s48:53900", "s49:crosses", "s49:50400", "s49:now", "s49:22", "s50:myth", "s51:all", "s51:taxed", "s51:11900", "s51:double", "s52:hurt", "s52:not", "s53:pour", "s54:first", "s54:1240", "s55:way", "s55:38000", "s55:4560", "s56:only", "s56:3500", "s56:land", "s57:770", "s58:add", "s58:6570", "s59:before", "s59:5020", "s59:1550", "s60:compare", "s60:11900", "s60:6570", "s60:5000", "s61:extra", "s61:keeps", "s61:8450", "s61:other", "s62:old", "s62:never", "s62:new", "s62:higher", "s63:average", "s63:84", "s63:94", "s63:more", "s63:less", "s58:1240", "s58:4560", "s58:770", "s57:22", "s57:3500", "s58:new", "s48:income", "s50:next", "s51:dollars", "s51:percent", "s51:tax", "s52:were", "s51:before", "s53:buckets", "s54:like", "s55:now", "s56:bucket", "s60:the#2"],
  sfx: [['s46:gives', 'swish', 0.1], ['s51:11900', 'thud', 0.14], ['s52:not', 'thud', 0.12], ['s58:6570', 'pop', 0.12], ['s61:8450', 'pop', 0.1]] })
