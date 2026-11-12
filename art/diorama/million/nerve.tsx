// ---------------------------------------------------------------- s23–s36: the year that tests your nerve (navy night: risk).
// A) 2008: Leo's million as 10 cash bricks (1 brick = $100,000) turns gold (stocks); a jagged line (not straight);
//    the calendar flips to DEC 2008, a crack opens and bricks fall in (634,000 left, a faded ghost of the lost 365,000);
//    a SELL booth; if he sells, the ghost bricks vanish (locked in) while a market arrow climbs past; if he holds, the
//    calendar runs 2009 → 2012 and the pile regrows above the dashed $1M line.
// B) The mix: the pile splits into 6 gold bricks (stocks) and 4 blue bricks (bonds); once a year one brick hops across
//    (rebalance); 2008 again: the gold stack shrinks, the blue stack grows 20%; 861,000 vs a 634,000 ghost line.
// C) The trade-off: a hilly road whose dips deepen and whose end climbs higher as a slider moves to STOCKS; bonds flatten
//    it; the slider settles at 60/40, Leo gives a thumbs-up; then one big bag vs three small bags (choice three).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, fly, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage, NoMark } from '../bank/kit'
import { bump, BrickPile, MixSlider, MoneyBag, Terrain } from './kit'

const GROUND = 930

const Nerve: React.FC<PieceProps> = ({ f, c }) => {
  const straight = c('s23:straight'), line23 = c('s23:line')
  const picture24 = c('s24:picture'), whole24 = c('s24:whole'), stocks24 = c('s24:stocks'), y2008 = c('s24:2008')
  const end25 = c('s25:end'), market25 = c('s25:market'), included25 = c('s25:included'), fallen25 = c('s25:fallen'), p37 = c('s25:37')
  const worth26 = c('s26:worth'), d634 = c('s26:634000'), paper26 = c('s26:paper'), lost26 = c('s26:lost'), d365 = c('s26:365000'), months26 = c('s26:months')
  const moment27 = c('s27:moment'), sell27 = c('s27:sell'), falling27 = c('s27:falling'), stop27 = c('s27:stop')
  const those28 = c('s28:those'), sells28 = c('s28:sells'), real28 = c('s28:real'), gone28 = c('s28:gone'), grow28 = c('s28:grow'), market28 = c('s28:market')
  const holds29 = c('s29:holds'), instead29 = c('s29:instead'), back29 = c('s29:back'), above29 = c('s29:above'), y2012 = c('s29:2012')
  const choice30 = c('s30:choice'), two30 = c('s30:two'), mix30 = c('s30:mix'), six30 = c('s30:six'), stocks30 = c('s30:stocks'), four30 = c('s30:four'), bonds30 = c('s30:bonds'), moves30 = c('s30:moves'), sixty30 = c('s30:sixtyforty')
  const y2008b = c('s31:2008'), fell31 = c('s31:fell'), bonds31 = c('s31:bonds'), rose31 = c('s31:rose'), p20 = c('s31:20')
  const mixed32 = c('s32:mixed'), d861 = c('s32:861000'), instead32 = c('s32:instead'), d634b = c('s32:634000')
  const painful = c('s33:painful'), easier = c('s33:easier'), selling33 = c('s33:selling')
  const tradeoff = c('s34:tradeoff'), more34 = c('s34:more'), growth34 = c('s34:growth'), deeper = c('s34:deeper'), falls34 = c('s34:falls')
  const bonds35 = c('s35:bonds'), soften = c('s35:soften')
  const choice36 = c('s36:choice'), picks36 = c('s36:picks'), live36 = c('s36:live'), y2008c = c('s36:2008'), three36 = c('s36:three'), today36 = c('s36:today'), little36 = c('s36:little')

  const AB = mix30 - 8, BC = tradeoff - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)

  // # A) the pile: 10 → 6.34 on "fallen"; regrows to 10.86 when held
  const drop = on(f, fallen25, 30)
  const regrow = span(f, instead29, y2012 + 10)
  const nA = lerp(10, 6.34, drop) + (f >= holds29 ? lerp(0, 10.86 - 6.34, regrow) : 0)
  const sellPath = f >= sells28 && f < holds29
  const ghostO = (f >= lost26 ? 0.22 : 0) * (1 - (sellPath ? on(f, gone28, 14) : 0)) * (1 - on(f, holds29, 10))
  const yrMonth = f < end25 ? 'JANUARY' : 'DECEMBER', yrNum = f < instead29 ? '2008' : String(Math.round(lerp(2008, 2012, regrow)))
  const aBeats: Beat[] = [[0, 'idle', 'neutral'], [picture24, 'carry', 'smiling'], [stocks24, 'present', 'smiling'], [fallen25, 'shock', 'shocked'], [c("s26:leo's"), 'facepalm', 'shocked'], [lost26, 'despair', 'worried'], [moment27, 'nervous', 'worried'], [sell27, 'point', 'worried'], [c('s27:falling'), 'stop', 'worried'], [sells28, 'oops', 'worried'], [c('s28:loss'), 'despair', 'worried'], [holds29, 'armsCrossed', 'neutral'], [back29, 'relief', 'smiling'], [y2012, 'celebrate', 'smiling']]

  // # B) the mix: 6 gold + 4 blue; 2008: gold × 0.634, blue × 1.20
  const crash = on(f, fell31, 26), boost = on(f, rose31, 26)
  const nGold = 6 * lerp(1, 0.6345, crash), nBlue = 4 * lerp(1, 1.201, boost)
  const hop = fly(f, moves30, [700, GROUND - 200], [1220, GROUND - 200], 22, 180)
  const bBeats: Beat[] = [[AB, 'idle', 'neutral'], [mix30, 'explain', 'smiling'], [moves30, 'carry', 'smiling'], [sixty30, 'thumbsUp', 'smiling'], [fell31, 'nervous', 'worried'], [rose31, 'relief', 'smiling'], [painful, 'slump', 'worried'], [easier, 'relax', 'smiling'], [selling33, 'crossNoA', 'neutral']]

  // # C) the slider: 0.5 → 1 (more stocks) → 0 (bonds) → 0.6
  const sl = 0.5 + 0.5 * on(f, more34, 20) - on(f, bonds35, 24) + 0.6 * on(f, picks36, 20)
  const ampK = 0.6 + 0.4 * on(f, deeper, 16), climbK = 0.7 + 0.3 * on(f, growth34, 16)
  const cBeats: Beat[] = [[BC, 'idle', 'thinking'], [more34, 'point', 'smiling'], [deeper, 'nervous', 'worried'], [bonds35, 'explain', 'neutral'], [picks36, 'weighA', 'thinking', 'weighB', 18], [live36, 'thumbsUp', 'smiling'], [three36, 'think', 'thinking']]

  const Booth = ({ o }: { o: number }) => (
    <g opacity={o} transform={`translate(1620 ${GROUND})`}>
      <rect x={-150} y={-260} width={300} height={260} rx={14} fill="#5D6878" /><rect x={-170} y={-120} width={340} height={30} rx={8} fill="#8B97A8" />
      <rect x={-120} y={-360} width={240} height={90} rx={14} fill={P.coral} /><text y={-298} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 72px "Bebas Neue"' }}>SELL</text>
    </g>
  )

  return (
    <g>
      <Stage id="m-nerve" frame={f} />
      <Ground y={GROUND} dark />

      {/* # A) 2008 */}
      {A > 0 && <g opacity={A}>
        {/* a jagged line (not straight), fades when 2008 starts */}
        <g opacity={win(f, straight, y2008, 8)}>
          <path d="M360 640 L520 560 L620 620 L760 470 L860 560 L1000 400 L1100 500 L1260 330 L1360 420 L1560 300" stroke={P.gold} strokeWidth={12} fill="none" strokeLinejoin="round" strokeDasharray="2200" strokeDashoffset={2200 * (1 - span(f, straight, line23 + 20))} />
          <line x1={360} y1={640} x2={1560} y2={300} stroke={P.ink2} strokeWidth={5} strokeDasharray="14 12" opacity={on(f, line23, 8) * 0.8} />
          <NoMark x={1100} y={300} o={on(f, line23, 8)} r={70} /></g>
        <g opacity={on(f, picture24, 8)}>
          {/* the crack */}
          
          <BrickPile x={960} y={GROUND} n={10} s={1.6} per={3} col={f >= stocks24 ? 'gold' : 'cash'} o={ghostO} />
          <BrickPile x={960} y={GROUND} n={nA} s={1.6} per={3} col={f >= stocks24 ? 'gold' : 'cash'} />
          {/* falling bricks */}
          {[0, 1, 2].map((k) => { const t = span(f, fallen25 + k * 6, fallen25 + 24 + k * 6); return t > 0 && t < 1 ? <g key={k} opacity={1 - t} transform={`translate(${880 + k * 80} ${GROUND - 260 + 330 * t * t}) rotate(${40 * t * (k - 1)})`}><rect x={-60} y={-20} width={120} height={40} rx={6} fill={P.gold} stroke={P.goldD} strokeWidth={4} /></g> : null })}
          <Label x={960} y={GROUND + 70} text={f >= above29 ? '≈ $1.09M' : f >= d634 ? '≈ $634,000' : f >= stocks24 ? '$1,000,000 IN STOCKS' : '$1,000,000'} size={58} font="Bebas Neue" color={P.ink} />
          <g opacity={win(f, market25, p37, 6)}><Label x={960} y={GROUND - 420} text={f >= included25 ? 'S&P 500 + PAYOUTS' : 'THE STOCK MARKET'} size={60} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={win(f, p37, real28, 8)}><Label x={960} y={GROUND - 420} text="−37%" size={110} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={ghostO > 0.01 && f >= d365 ? on(f, d365, 8) * (ghostO / 0.22) : 0}><Label x={960} y={GROUND - 320} text="−$365,000" size={64} font="Bebas Neue" color={P.coralInk} /></g>
          {/* the $1M line when held */}
          <g opacity={on(f, back29, 10)}><line x1={620} y1={GROUND - 4 * 44 * 1.6 + 8} x2={1300} y2={GROUND - 4 * 44 * 1.6 + 8} stroke={P.mint} strokeWidth={5} strokeDasharray="14 10" /><Label x={1320} y={GROUND - 4 * 44 * 1.6 + 22} text="$1M" size={52} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
        </g>
        <g opacity={on(f, y2008, 8)} transform={`translate(1660 ${360 - 10 * pop(f, end25, 12)})`}><CalPage x={0} y={0} s={0.95} m={f >= c('s26:twelve') && f < sell27 ? '12 MONTHS' : yrMonth} d={yrNum} col={f >= end25 && f < holds29 ? '#C94A3E' : '#2E5C9A'} /></g>
        <Booth o={win(f, sell27, holds29, 10)} />
        <g opacity={sellPath ? win(f, those28, gone28 + 10, 6) : 0}><rect x={960 - 3 * 64 * 1.6 - 10} y={GROUND - 4 * 44 * 1.6 - 10} width={3 * 128 * 1.6 + 20} height={2 * 44 * 1.6} rx={14} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="16 10" /></g>
        <g opacity={on(f, choice30, 8)} transform={`translate(960 ${GROUND - 470}) scale(${pop(f, two30, 14)})`}><circle r={90} fill={P.card} stroke={P.gold} strokeWidth={6} /><text y={34} textAnchor="middle" fill={P.gold} style={{ font: '400 110px "Bebas Neue"' }}>2</text></g>
        <NoMark x={1620} y={GROUND - 180} o={on(f, holds29, 8) * (1 - on(f, holds29 + 40, 10))} r={110} />
        {/* the market climbs past the empty spot */}
        <g opacity={win(f, grow28, holds29, 8)}><path d="M640 760 L760 690 L860 720 L1000 590 L1120 610 L1260 470" stroke={P.mint} strokeWidth={10} fill="none" strokeDasharray="1000" strokeDashoffset={1000 * (1 - span(f, market28, market28 + 18))} /></g>
        <g opacity={win(f, real28, holds29, 8)} transform={`translate(960 ${GROUND - 430}) rotate(-6) scale(${pop(f, real28, 12)})`}><rect x={-170} y={-44} width={340} height={80} rx={12} fill="none" stroke={P.coral} strokeWidth={8} /><text y={18} textAnchor="middle" fill={P.coral} style={{ font: '400 58px "Bebas Neue"' }}>LOSS LOCKED IN</text></g>
        <Person f={f} who="investor" beats={aBeats} x={300} y={GROUND} s={1.1} />
      </g>}

      {/* # B) the mix */}
      {B > 0 && <g opacity={B}>
        <BrickPile x={700} y={GROUND} n={6} s={1.3} per={3} col="gold" o={f >= fell31 ? 0.2 : 0} />
        <BrickPile x={700} y={GROUND} n={f >= six30 ? nGold : 0} s={1.3} per={3} col="gold" />
        <BrickPile x={1220} y={GROUND} n={f >= four30 ? nBlue : 0} s={1.3} per={3} col="blue" />
        <g opacity={win(f, c('s32:mixed'), d861 + 10, 6)}><ellipse cx={960} cy={GROUND - 100} rx={520} ry={160} fill={P.gold} opacity={0.12} /></g>
        <g opacity={on(f, six30, 8)}><Label x={700} y={GROUND + 66} text={f >= stocks30 ? (f >= fell31 ? 'STOCKS −37%' : '6 PARTS STOCKS') : '6 PARTS'} size={54} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, four30, 8)}><Label x={1220} y={GROUND + 66} text={f >= bonds30 ? (f >= p20 ? 'BONDS +20%' : '4 PARTS BONDS') : '4 PARTS'} size={54} font="Bebas Neue" color={P.skyInk} /></g>
        {/* rebalance hop */}
        {hop.o > 0 && f < sixty30 && <g transform={`translate(${hop.x} ${hop.y})`}><rect x={-60} y={-20} width={120} height={40} rx={6} fill={P.gold} stroke={P.goldD} strokeWidth={4} /></g>}
        <g opacity={win(f, sixty30, y2008b, 8)} transform={`translate(960 ${GROUND - 470}) scale(${pop(f, sixty30, 14)})`}><circle r={96} fill={P.card} stroke={P.gold} strokeWidth={6} /><text y={22} textAnchor="middle" fill={P.gold} style={{ font: '400 74px "Bebas Neue"' }}>60/40</text></g>
        <g opacity={on(f, y2008b, 8)} transform={`translate(1660 ${380 - 10 * pop(f, y2008b, 12)})`}><CalPage x={0} y={0} s={0.9} m="AGAIN IN" d="2008" col="#C94A3E" /></g>
        {/* totals */}
        <g opacity={on(f, d861, 8)}><Label x={960} y={GROUND - 430} text="TOGETHER ≈ $861,000" size={76} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d634b, 8)}><line x1={420} y1={GROUND - 330} x2={1500} y2={GROUND - 330} stroke={P.coral} strokeWidth={4} strokeDasharray="12 10" opacity={0.7} />
          <Label x={960} y={GROUND - 352} text="ALL STOCKS: ≈ $634,000" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        <Person f={f} who="investor" beats={bBeats} x={260} y={GROUND} s={1.05} />
      </g>}

      {/* # C) the trade-off road + slider */}
      {C > 0 && <g opacity={C}>
        <Terrain x={320} y={GROUND - 60} w={1300} amp={lerp(30, 110, sl) * ampK} climb={lerp(120, 380, sl) * climbK} f={f} col={sl > 0.5 ? '#E9C25A' : '#6FA8DC'} o={1 - on(f, choice36, 10)} />
        <g opacity={on(f, more34, 8) * (1 - on(f, bonds35, 8))}><Label x={960} y={450} text={f >= deeper ? 'HIGHER, BUT DEEPER DIPS' : 'MORE GROWTH'} size={58} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, soften, 8) * (1 - on(f, picks36, 8))}><Label x={960} y={450} text="SOFTER FALLS" size={58} font="Bebas Neue" color={P.skyInk} /></g>
        <MixSlider x={1000} y={300} t={sl} o={on(f, BC + 4, 10) * (1 - on(f, choice36, 10))} />
        <g opacity={win(f, picks36, choice36, 8)}><Label x={1000} y={400} text={f >= y2008c ? 'A MIX TO HOLD THROUGH 2008' : "LEO'S MIX: 60/40"} size={60} font="Bebas Neue" color={P.ink} /></g>
        {/* choice three: one bag vs three small bags */}
        <g opacity={on(f, choice36, 10)}>
          
          <g><MoneyBag x={820} y={600 - 20 * bump(f, [three36])} s={1.6} t="ALL" /><g opacity={on(f, today36, 8)}><Label x={820} y={670} text="ALL TODAY?" size={56} font="Bebas Neue" color={P.ink} /></g></g>
          <g>{[0, 1, 2].map((k) => <MoneyBag key={k} x={1180 + k * 130} y={600 - 20 * bump(f, [little36 + k * 6])} s={0.95} t="⅓" />)}<g opacity={on(f, little36, 8)}><Label x={1310} y={670} text="BIT BY BIT?" size={56} font="Bebas Neue" color={P.ink} /></g></g>
        </g>
        <Person f={f} who="investor" beats={cBeats} x={200} y={GROUND} s={1.0} />
      </g>}

      <Headline f={f} lines={[[straight, 'NOT A STRAIGHT LINE', P.ink, 100], [y2008, 'ALL IN STOCKS, 2008', P.ink, 100], [moment27, 'WHEN MANY PEOPLE SELL', P.coralInk, 96], [holds29, 'IF HE HOLDS ON', P.mintInk, 100], [mix30, 'CHOICE 2: THE MIX', P.ink, 104], [painful, 'STILL A DROP, BUT SMALLER', P.ink, 96], [tradeoff, 'THE TRADE-OFF', P.ink, 104], [three36, 'CHOICE 3: WHEN TO PUT IT IN', P.ink, 96]]} />
      <Vignette id="m-nerve" />
    </g>
  )
}

export const M_NERVE = makePiece('m-nerve', '2008 and the mix: a jagged line (not straight); Leo’s million as 10 bricks turns gold (stocks); Dec 2008 a crack swallows bricks, 634,000 left with a ghost of the lost 365,000; a SELL booth; selling locks the loss while the market climbs past; holding, the calendar runs to 2012 and the pile regrows above $1M; the mix: 6 gold + 4 blue bricks, one brick hops across each year (60/40); 2008: gold shrinks, blue grows 20%, together 861,000 vs a 634,000 line; a hilly road deepens with more stocks and flattens with bonds; the slider settles at 60/40; one big bag vs three small bags', {
  mood: 'dark', Component: Nerve,
  beats: ["s23:straight", "s23:line", "s24:picture", "s24:stocks", "s24:2008", "s25:end", "s25:market", "s25:included", "s25:fallen", "s25:37", "s26:634000", "s26:lost", "s26:365000", "s27:moment", "s27:sell", "s28:those", "s28:sells", "s28:real", "s28:gone", "s28:grow", "s28:market", "s29:holds", "s29:instead", "s29:back", "s29:above", "s29:2012", "s30:choice", "s30:two", "s30:mix", "s30:six", "s30:stocks", "s30:four", "s30:bonds", "s30:moves", "s30:sixtyforty", "s31:2008", "s31:fell", "s31:rose", "s31:20", "s32:861000", "s32:634000", "s33:painful", "s33:easier", "s33:selling", "s34:tradeoff", "s34:more", "s34:growth", "s34:deeper", "s35:bonds", "s35:soften", "s36:choice", "s36:picks", "s36:live", "s36:2008", "s36:three", "s36:today", "s36:little", "s26:leo's", "s27:falling", "s28:loss", "s26:twelve", "s32:mixed"],
  sfx: [['s25:fallen', 'crack', 0.2], ['s28:real', 'thud', 0.15], ['s29:2012', 'chime', 0.15], ['s30:moves', 'whoosh', 0.12], ['s31:fell', 'crack', 0.15], ['s32:861000', 'pop', 0.12]] })
