// ---------------------------------------------------------------- s54–s69: step three, the trust that never dies.
// A) Four generations in a row, each with its own gold stack: $100 → $60 → $36 → ≈ $22; at every hand-down the top 40% turns red and lifts away.
// B) A trust box with an hourglass (the old rule: about 100 years); South Dakota appears and the hourglass becomes an infinity loop.
// C) The DYNASTY trust: a couple puts in 2 × $15M = $30M; an arrow that skips the children to the grandchildren meets the
//    generation-skipping tax gate, which opens for the $15M-per-person allowance.
// D) The family around the trust lives off it (coins flow out) but owns none of it; when one of them dies, the tax office finds $0.
// E) The trust's stack grows (7% a year, an example): $30M → $228M (30 yrs) → $1.7B (60) → $13.2B (90); generations pass beneath it.
// F) Beside it, the same money outside a trust loses a red 40% slab at every death.
// G) South Dakota with a gold stack: ≈ $815 billion in its trust companies, end of 2024, +22% in one year.
import React from 'react'
import { clamp01, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { TaxOffice } from '../bbd/kit'
import { NoMark } from '../bank/kit'
import { Hourglass } from '../money4/kit'
import { BigArrow } from '../buffett/kit'
import { Mini } from '../../rig/Mini'
import { CashColumn, Pill, SouthDakota, TrustBox, TAXRED } from './kit'

const GROUND = 930
const LOOKS = ['investor', 'buyer', 'hero', 'owner']

// # an infinity loop drawn to t of its length
const Infinity8: React.FC<{ x: number; y: number; s?: number; t: number; o?: number }> = ({ x, y, s = 1, t, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 0 C-40 -60 -120 -60 -120 0 C-120 60 -40 60 0 0 C40 -60 120 -60 120 0 C120 60 40 60 0 0 Z" fill="none" stroke="#B4821C" strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - clamp01(t)} />
  </g>
)

const Dyn: React.FC<PieceProps> = ({ f, c }) => {
  const rate64 = c('s64:rate'), coming = c('s61:coming'), m30b = c('s61:30'), estate67 = c('s67:estate'), trust58 = c('s58:trust'), practice = c('s57:practice'), states58 = c('s58:states'), trust53 = c('s53:trust'), never53 = c('s53:never'), estate54 = c('s54:estate'), problem = c('s54:problem'), once = c('s54:once'), every = c('s54:every'), passes = c('s54:passes'), down = c('s54:down')
  const d100 = c('s55:100'), above = c('s55:above'), pass55 = c('s55:pass'), children55 = c('s55:children'), p40 = c('s55:40'), d60 = c('s55:60')
  const pass56 = c('s56:pass'), d36 = c('s56:36'), generation56 = c('s56:generation'), d22 = c('s56:22')
  const centuries = c('s57:centuries'), limit = c('s57:limit'), rule = c('s57:rule'), perpetuities = c('s57:perpetuities'), last57 = c('s57:last'), y100 = c('s57:100')
  const scrap = c('s58:scrap'), south = c('s58:south'), known = c('s58:known'), forever = c('s58:forever')
  const dynasty = c('s59:dynasty'), matter = c('s59:matter')
  const couple = c('s60:couple'), m30 = c('s60:30'), gift60 = c('s60:gift')
  const washington = c('s61:washington'), third = c('s61:third'), gst = c('s61:generationskipping'), skips = c('s61:skips'), grandchildren61 = c('s61:grandchildren'), same = c('s61:same'), m15 = c('s61:15'), person61 = c('s61:person'), free61 = c('s61:free')
  const inside = c('s62:inside'), belongs = c('s62:belongs'), not62 = c('s62:not'), grandchildren62 = c('s62:grandchildren')
  const live = c('s63:live'), owns = c('s63:owns'), dies63 = c('s63:dies'), nothing63 = c('s63:nothing'), tax63 = c('s63:tax')
  const grow = c('s64:grow'), p7 = c('s64:7'), example = c('s64:example')
  const y30 = c('s65:30'), generation65 = c('s65:generation'), m228 = c('s65:228')
  const y60 = c('s66:60'), b17 = c('s66:17'), y90 = c('s66:90'), b132 = c('s66:132')
  const none67 = c('s67:none'), dies67 = c('s67:dies'), compounding = c('s67:compounding')
  const outside = c('s68:outside'), lose = c('s68:lose'), p40b = c('s68:40'), died = c('s68:died')
  const companies = c('s69:companies'), dakota69 = c('s69:dakota'), b815 = c('s69:815'), y2024 = c('s69:2024'), p22 = c('s69:22')

  const cut = [c('s57') - 8, c('s59') - 8, c('s62') - 8, c('s64') - 8, c('s68') - 8, c('s69') - 8]
  const A = win(f, 0, cut[0]), B = win(f, cut[0], cut[1]), C = win(f, cut[1], cut[2]), D = win(f, cut[2], cut[3]), E = win(f, cut[3], cut[5]), G = on(f, cut[5], 10)

  // # A) the four generations: stack heights (px per dollar = 4)
  const vals = [100, 60, 36, 21.6], at = [d100, d60, d36, d22], xs = [330, 750, 1170, 1590]
  const bites = [p40, pass56, generation56]

  // # E) the growing trust stack (NOT to scale: each step is drawn bigger, labelled)
  const steps: [number, number, string, string][] = [[grow, 90, '$30M', 'TODAY'], [m228, 200, '$228M', '30 YEARS'], [b17, 330, '$1.7B', '60 YEARS'], [b132, 480, '$13.2B', '90 YEARS']]
  let h = 0, lab = '', yr = ''
  for (const [a, hh, l, y] of steps) { if (f >= a - 10) { h = lerp(h, hh, on(f, a - 10, 18)); lab = l; yr = y } }
  const outsideH = 430 * Math.pow(0.6, Math.floor(clamp01(span(f, lose, died + 20)) * 3 + 0.0001))

  return (
    <g>
      <Stage id="tt-dyn" frame={f} />
      <Headline f={f} lines={[[problem, 'THE TAX HITS AGAIN AND AGAIN', P.ink, 96], [d100, '$100 ABOVE THE TAX-FREE AMOUNT', P.ink, 92], [d60, 'GENERATION 1: $60 LEFT', P.ink, 100], [d36, 'GENERATION 2: $36', P.ink, 104], [d22, 'GENERATION 3: ≈ $22', P.coralInk, 104],
        [centuries, 'THE OLD LIMIT ON TRUSTS', P.ink, 104], [perpetuities, 'THE RULE AGAINST PERPETUITIES', P.ink, 92], [y100, 'ABOUT 100 YEARS, MAX', P.ink, 104], [scrap, 'THEN STATES SCRAPPED IT', P.ink, 100], [forever, 'A TRUST THAT LASTS FOREVER', P.goldInk, 100],
        [dynasty, 'THE DYNASTY TRUST', P.goldInk, 112], [m30, 'A COUPLE: UP TO $30M IN', P.ink, 104], [gift60, 'NO GIFT TAX', P.mintInk, 110], [third, 'A THIRD TAX…', P.ink, 104], [gst, 'THE GENERATION-SKIPPING TAX', P.coralInk, 92],
        [same, 'SAME $15M ALLOWANCE EACH', P.ink, 100], [free61, '$30M GOES IN FREE OF IT', P.mintInk, 100], [belongs, 'THE TRUST OWNS IT', P.ink, 108], [owns, 'NO ONE IN THE FAMILY OWNS IT', P.ink, 96], [nothing63, 'NOTHING TO TAX', P.mintInk, 110],
        [grow, 'LET IT GROW', P.ink, 110], [p7, 'SAY 7% A YEAR (AN EXAMPLE)', P.ink, 96], [none67, 'NO ESTATE TAX AT ANY DEATH', P.mintInk, 96], [outside, 'OUTSIDE A TRUST', P.coralInk, 104], [p40b, 'UP TO 40% AT EVERY DEATH', P.coralInk, 100],
        [companies, 'SOUTH DAKOTA TRUST COMPANIES', P.ink, 96], [b815, '≈ $815 BILLION (END OF 2024)', P.goldInk, 96], [p22, '+22% IN A SINGLE YEAR', P.mintInk, 104]]} />

      {/* # A) the tax at every hand-down */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={win(f, trust53 - 4, problem, 8)}><TrustBox x={960} y={GROUND} s={1.1} lock={1} glow={on(f, never53, 12)} /></g>
        <g opacity={win(f, estate54, every, 8)} transform={`translate(0 ${-40 * (1 - pop(f, estate54, 14))})`}><TaxOffice x={1100} y={GROUND} s={1.0} eat={on(f, once, 10)} /></g>
        {xs.map((x, k) => { const a = k === 0 ? d100 - 6 : at[k] - 6, shown = on(f, a, 12), bite = k < 3 ? bites[k] : 9e9
          return <g key={k} opacity={on(f, k === 0 ? problem - 6 : lerp(every, down, k / 3), 10)}>
            <Mini look={LOOKS[k]} x={x - 130} y={GROUND} scale={1.1} frame={f} seed={k + 3} mood={f > bite ? 'sad' : 'neutral'} />
            <CashColumn x={x + 40} y={GROUND} h={vals[k] * 4 * shown} w={150} color="gold" cut={f >= bite ? 0.4 : 0} lift={70 * span(f, bite, bite + 20)} cutO={1 - on(f, bite + 14, 10)} />
            <Pill x={x + 40} y={GROUND - vals[k] * 4 * shown - 46} text={k === 3 ? '≈ $22' : `$${vals[k]}`} size={48} w={140} color="#B4821C" o={on(f, at[k], 8)} />
            <Pill x={x} y={GROUND + 64} text={['YOU', 'CHILDREN', 'GRANDKIDS', 'GREAT-GRANDKIDS'][k]} size={36} w={k === 3 ? 300 : 210} o={on(f, k === 0 ? passes : lerp(every, down, k / 3), 8)} />
            {k < 3 && <g opacity={on(f, k === 0 ? down : at[k + 1] - 30, 8)}><path d={`M${x + 130} ${GROUND - 230} Q${x + 210} ${GROUND - 300} ${x + 290} ${GROUND - 230}`} fill="none" stroke="#B4821C" strokeWidth={8} strokeDasharray="18 12" markerEnd="" /><path d={`M${x + 290} ${GROUND - 230} l-26 -6 l10 24 Z`} fill="#B4821C" /></g>}
            {k < 3 && <Pill x={x + 40} y={GROUND - vals[k] * 4 - 130} text="-40% TAX" size={40} w={190} color={TAXRED} o={win(f, bite, bite + 50, 8)} />}
          </g> })}
      </g>}

      {/* # B) the old ~100-year limit, then South Dakota: forever */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <TrustBox x={520} y={GROUND} s={0.95} lock={1} glow={win(f, forever, forever + 40) + win(f, trust58, trust58 + 24)} />
        <g opacity={on(f, limit, 8) * (1 - on(f, forever, 10))}><Hourglass x={520} y={470} s={0.7} t={span(f, limit, scrap)} r={180 * on(f, practice, 14) + 8 * Math.sin((f - states58) / 2) * win(f, states58, scrap, 4)} /><Pill x={760} y={470} text="≈ 100 YEARS" size={46} w={250} o={on(f, y100, 8)} /></g>
        <g opacity={on(f, scrap, 8) * (1 - on(f, forever, 10))}><NoMark x={520} y={470} o={1} r={110} /></g>
        <Infinity8 x={520} y={470} s={1.1} t={span(f, forever - 4, forever + 20)} o={on(f, forever - 4, 6)} />
        <g opacity={on(f, south, 10)} transform={`translate(0 ${-30 * (1 - pop(f, south, 16))})`}><SouthDakota x={1360} y={640} s={1.1} label={on(f, known, 8)} /></g>
        <Pill x={1360} y={360} text={f >= forever ? 'TRUSTS CAN LAST FOREVER' : 'THE BEST KNOWN'} size={46} w={520} o={on(f, known, 8)} color={f >= forever ? '#B4821C' : '#16294A'} />
      </g>}

      {/* # C) the dynasty trust: $30M in, past the generation-skipping gate */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <TrustBox x={960} y={GROUND} s={1.05} label="DYNASTY" tint="#B88A2E" lock={on(f, gift60, 8)} open={win(f, m30, gift60, 8)} glow={win(f, dynasty, dynasty + 40) + win(f, m30b, m30b + 30)} />
        <Person f={f} who="investor" beats={[[cut[1], 'idle', 'smiling'], [couple, 'offer', 'smiling'], [gift60, 'thumbsUp', 'smiling']]} x={210} y={GROUND} s={1.0} />
        <Person f={f} who="investorF" beats={[[cut[1], 'idle', 'smiling'], [couple, 'offer', 'smiling'], [gift60, 'clapA', 'smiling', 'clapB', 12]]} x={450} y={GROUND} s={1.0} />
        {[0, 1].map((k) => { const t = span(f, m30, gift60 - 4); return <g key={k} opacity={on(f, m30 - 4, 8) * (1 - on(f, gift60, 8))}><CashColumn x={lerp(300 + k * 200, 900 + k * 120, t)} y={lerp(GROUND - 320, GROUND - 260, t) - 160 * Math.sin(Math.PI * t)} h={90} w={110} /></g> })}
        <Pill x={960} y={GROUND - 420} text="$15M + $15M = $30M" size={48} w={460} color="#1E7A4C" o={on(f, m30, 8) * (1 - on(f, third, 8))} />
        {/* the generation-skipping gate */}
        <g opacity={on(f, coming, 10)}>
          <g transform={`translate(1560 ${GROUND})`}><rect x={-30} y={-360} width={60} height={360} rx={10} fill="#8E5E36" /><g transform={`rotate(${-80 * on(f, free61, 16)} 0 -300)`}><rect x={-30} y={-320} width={330} height={40} rx={18} fill={TAXRED} /><rect x={60} y={-320} width={40} height={40} fill="#FFFFFF" /><rect x={180} y={-320} width={40} height={40} fill="#FFFFFF" /></g></g>
          <Pill x={1600} y={GROUND - 470} text="GENERATION-SKIPPING TAX" size={40} w={470} color={TAXRED} o={on(f, gst, 8)} />
          <g opacity={on(f, skips, 8)}><path d={`M1120 ${GROUND - 300} Q1440 ${GROUND - 620} 1800 ${GROUND - 260}`} fill="none" stroke="#B4821C" strokeWidth={8} strokeDasharray="20 12" strokeDashoffset={-f} /><Mini look="hero" x={1820} y={GROUND} scale={1.1} frame={f} seed={9} mood={f > free61 ? 'happy' : 'neutral'} /><Pill x={1820} y={GROUND + 64} text="GRANDKIDS" size={36} w={210} o={on(f, grandchildren61, 8)} /></g>
          <Pill x={1560} y={GROUND + 64} text={f >= free61 ? 'OPEN: $15M EACH' : '$15M EACH ALLOWED'} size={36} w={300} color="#1E7A4C" o={on(f, m15, 8)} />
        </g>
      </g>}

      {/* # D) the family lives off it but owns none of it */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <TrustBox x={960} y={GROUND} s={1.0} label="DYNASTY" tint="#B88A2E" lock={1} />
        {[[420, 'buyer', 0], [640, 'investorF', 1], [1300, 'hero', 2], [1520, 'owner', 3]].map(([x, who, k]) => { const gone = k === 0 ? on(f, dies63, 16) : 0
          return <g key={k as number} opacity={1 - gone * 0.85}>
            <Person f={f} who={who as string} beats={[[cut[2], 'idle', 'smiling'], [live, 'receive', 'smiling'], [owns, 'emptyPockets', 'neutral']]} x={x as number} y={GROUND} s={0.85} flip={(x as number) > 960} />
            <Pill x={x as number} y={GROUND + 64} text="OWNS: $0" size={34} w={170} o={on(f, owns + (k as number) * 3, 8)} />
          </g> })}
        {f >= live && [0, 1, 2, 3].map((k) => { const t = ((f - live) / 34 + k * 0.25) % 1, tx = [420, 640, 1300, 1520][k]; return f < dies63 + 30 ? <Coin key={k} x={lerp(960, tx, t)} y={lerp(GROUND - 220, GROUND - 380, t) - 120 * Math.sin(Math.PI * t)} s={0.7} o={Math.sin(Math.PI * t)} /> : null })}
        <Pill x={960} y={GROUND - 330} text="THE TRUST OWNS IT" size={46} w={400} o={on(f, belongs, 8) * (1 - on(f, live, 8))} />
        <g opacity={on(f, dies63 + 6, 10)}><TaxOffice x={300} y={GROUND - 0} s={0.6} shut={on(f, nothing63, 10)} /></g>
      </g>}

      {/* # E + F) the trust stack grows for 90 years; outside a trust, red bites */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <TrustBox x={760} y={GROUND} s={0.75} label="DYNASTY" tint="#B88A2E" lock={1} />
        <CashColumn x={760} y={GROUND - 165} h={h} w={260} color="gold" />
        <Pill x={1040} y={GROUND - 165 - h + 20} text={lab} size={52} w={220} color="#B4821C" o={on(f, grow, 8)} />
        <Pill x={1040} y={GROUND - 165 - h + 84} text={yr} size={36} w={200} color="#5C6F8E" o={on(f, y30, 8)} />
        <Pill x={1200} y={GROUND - 30} text="7% A YEAR: AN EXAMPLE" size={36} w={380} color="#5C6F8E" o={win(f, rate64, m228, 8)} />
        <Pill x={760} y={GROUND + 64} text="NOT TO SCALE" size={32} w={220} color="#5C6F8E" o={on(f, m228, 8)} />
        {/* generations come and go beneath the trust */}
        {[[y30, 'buyer'], [y60, 'hero'], [y90, 'owner']].map(([a, look], k) => <g key={k} opacity={on(f, (a as number) - 10, 8) * (1 - 0.7 * on(f, k < 2 ? [y60, y90][k] as number : compounding, 12))}><Mini look={look as string} x={380} y={GROUND} scale={1.5} frame={f} seed={k + 20} mood="happy" /></g>)}
        <Pill x={380} y={GROUND + 64} text={f >= y90 ? 'GENERATION 3' : f >= y60 ? 'GENERATION 2' : 'GENERATION 1'} size={34} w={230} o={on(f, y30, 8)} />
        <g opacity={on(f, estate67 - 4, 8) * (1 - on(f, outside, 8))}><TaxOffice x={1500} y={GROUND} s={0.75} shut={1} /></g>
        {/* F) outside a trust */}
        <g opacity={on(f, outside, 10)}>
          <CashColumn x={1450} y={GROUND} h={outsideH} w={200} color="gold" cut={f >= p40b ? 0.4 : 0} lift={30} cutO={f >= p40b ? 0.8 : 0} />
          <Pill x={1450} y={GROUND + 64} text="OUTSIDE A TRUST" size={36} w={300} color={TAXRED} />
          <Pill x={1450} y={GROUND - outsideH - 60} text="-40% EACH DEATH" size={40} w={320} color={TAXRED} o={on(f, p40b, 8)} />
        </g>
      </g>}

      {/* # G) South Dakota's trust companies */}
      {G > 0 && <g opacity={G}>
        <SouthDakota x={760} y={600} s={1.25} label={1} />
        <CashColumn x={1460} y={GROUND} h={520 * on(f, b815 - 10, 24)} w={260} color="gold" />
        <Pill x={1460} y={GROUND - 520 * on(f, b815 - 10, 24) - 60} text="≈ $815 BILLION" size={54} w={380} color="#B4821C" o={on(f, b815, 8)} />
        <Pill x={1460} y={GROUND + 64} text="END OF 2024" size={40} w={260} o={on(f, y2024, 8)} />
        <g opacity={on(f, p22, 8)} transform={`translate(1700 ${GROUND - 300})`}><BigArrow x={0} y={0} s={0.6} t={on(f, p22, 16)} color={P.mint} /></g>
        <Pill x={1700} y={GROUND - 440} text="+22%" size={52} w={160} color="#1E7A4C" o={on(f, p22, 8)} />
      </g>}
      <Vignette id="tt-dyn" />
    </g>
  )
}

const BEATS = ['s64:rate', 's61:coming', 's61:30', 's67:estate', 's58:trust', 's57:practice', 's58:states', 's53:trust', 's53:never', 's54:estate', 's68:taxfree', 's68:every', 's54:problem', 's54:once', 's54:every', 's54:passes', 's54:down', 's55:100', 's55:above', 's55:pass', 's55:children', 's55:40', 's55:60', 's56:pass', 's56:36', 's56:generation', 's56:22',
  's57:centuries', 's57:limit', 's57:rule', 's57:perpetuities', 's57:last', 's57:100', 's58:scrap', 's58:south', 's58:known', 's58:forever', 's59:dynasty', 's59:matter', 's60:couple', 's60:30', 's60:gift',
  's61:washington', 's61:third', 's61:generationskipping', 's61:skips', 's61:grandchildren', 's61:same', 's61:15', 's61:person', 's61:free', 's62:inside', 's62:belongs', 's62:not', 's62:grandchildren',
  's63:live', 's63:owns', 's63:dies', 's63:nothing', 's63:tax', 's64:grow', 's64:7', 's64:example', 's65:30', 's65:generation', 's65:228', 's66:60', 's66:17', 's66:90', 's66:132', 's67:none', 's67:dies', 's67:compounding',
  's68:outside', 's68:lose', 's68:40', 's68:died', 's69:companies', 's69:dakota', 's69:815', 's69:2024', 's69:22']
export const TT_DYN = makePiece('tt-dyn', 'Trusts step three, the dynasty trust: four generations in a row, each with a gold stack, $100 → $60 → $36 → ≈ $22, the top 40% turning red and lifting away at each hand-down; a trust box with an hourglass (about 100 years) that is crossed when states scrap the rule; South Dakota appears and an infinity loop draws (forever); a couple tosses two $15M blocks into the DYNASTY box ($30M, no gift tax); a generation-skipping arrow to the grandkids meets a red barrier that lifts for the $15M-each allowance; the family round the box receives coins but each owns $0, one fades and the tax office shows $0; the trust stack grows $30M → $228M → $1.7B → $13.2B over 30/60/90 years (not to scale) while generations come and go; a stack outside a trust loses a red 40% slab at each death; South Dakota with ≈ $815 billion (end 2024, +22%)', {
  mood: 'light', Component: Dyn, beats: BEATS,
  sfx: [['s55:40', 'thud', 0.2], ['s56:22', 'thud', 0.2], ['s58:forever', 'chime', 0.25], ['s60:30', 'cash', 0.2], ['s61:free', 'click', 0.2], ['s63:nothing', 'ding', 0.2], ['s66:132', 'riser', 0.2], ['s68:40', 'thud', 0.2], ['s69:815', 'cash', 0.2]] })
