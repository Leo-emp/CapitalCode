// ---------------------------------------------------------------- s1–s9: the hook (dawn).
// A) YOUR kitchen windowsill at dawn: a glass savings jar fills with money-water and gets a padlock (feels safe);
//    a 0.38% tag; $1,000 earns a tiny $3.80 drop; groceries beside it get price tags that climb +2.7%; the four
//    grocery bags the jar can buy shrink to three (buys a little less).
// B) The viewer (hero) lifts the jar to pour it on a stock chart: a red cross + his STOP (not yet); a top hat and a
//    trader screen are crossed (you don't need to be rich or an expert); five numbered stepping stones rise in order.
// C) A hillside plot over thirty years: a watering can pours $375 a month; year card 1996 → 2025; on the left the
//    cash jar fills a little ($184,000), on the right a sapling grows into a big fruit tree ($900,000); then the
//    whole hill becomes five terraces, lit one by one, and a coin waits on the first step.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { C, Coin, Drop, Ground, NoMark, PriceTag, Sky, Tank, Terrace, Tree, TXT, YearCard, num } from './kit'

const GROUND = 940

const Bag: React.FC<{ x: number; y: number; o?: number; s?: number }> = ({ x, y, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-50 0 L-58 -120 L58 -120 L50 0 Z" fill="#D8B98C" /><path d="M-58 -120 L58 -120 L52 -104 L-52 -104 Z" fill="#C49F6E" />
    <rect x={-30} y={-170} width={14} height={60} rx={6} fill={C.leafD} /><circle cx={-23} cy={-176} r={18} fill={C.leaf} />
    <rect x={4} y={-158} width={30} height={50} rx={8} fill="#F4F1EA" /><rect x={4} y={-150} width={30} height={12} fill={C.waterD} />
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const money1 = c('s1:money'), savings1 = c('s1:savings'), safe1 = c('s1:safe')
  const average2 = c('s2:average'), pays2 = c('s2:pays'), eight2 = c('s2:8')
  const k1 = c('s3:1000'), less3 = c('s3:less'), four3 = c('s3:4'), prices3 = c('s3:prices'), meanwhile3 = c('s3:meanwhile'), up3 = c('s3:up'), seven3 = c('s3:7')
  const every4 = c('s4:every'), quietly4 = c('s4:quietly'), less4 = c('s4:less')
  const thinking5 = c('s5:thinking'), pull5 = c('s5:pull'), stocks5 = c('s5:stocks'), no5 = c('s5:no'), yet5 = c('s5:yet')
  const rich6 = c('s6:rich'), expert6 = c('s6:expert'), turn6 = c('s6:turn'), right6 = c('s6:right'), order6 = c('s6:order')
  const imagine7 = c('s7:imagine'), m375 = c('s7:375'), month7 = c('s7:month'), thirty7 = c('s7:thirty'), years7 = c('s7:years')
  const k135 = c('s8:135000'), grown8 = c('s8:grown'), k900 = c('s8:900000'), cash8 = c('s8:cash'), k184 = c('s8:184000')
  const five9 = c('s9:five'), steps9 = c('s9:steps'), monthly9 = c('s9:monthly'), habit9 = c('s9:habit'), time9 = c('s9:time'), first9 = c('s9:first'), dollar9 = c('s9:dollar')

  const okay5 = c('s5:okay#2'), yet5b = c('s5:yet'), y2025s7 = c('s7:2025'), investing6 = c('s6:investing'), need6b = c('s6:need#2'), from7 = c('s7:from'), youd8 = c("s8:you'd"), today9 = c('s9:today'), savings9 = c('s9:savings')
  const AB = thinking5 - 8, BC = imagine7 - 8
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)

  // # A) the jar's water rises as the money arrives; bags shrink on "less"
  const jarFill = 0.15 + 0.5 * on(f, money1, 30)
  const bags = f >= less4 ? 3 : 4

  // # B) the viewer
  const bBeats: Beat[] = ([...[[AB, 'idle', 'neutral'], [thinking5, 'think', 'thinking'], [pull5, 'holdUp', 'smiling'], [no5, 'stop', 'neutral'], [rich6, 'shrug', 'smiling'], [turn6, 'explain', 'smiling'], [order6, 'pointUp', 'smiling']], [yet5b, 'crossNoA', 'neutral', 'crossNoB', 12], [okay5, 'nodA', 'smiling', 'nodB', 14], [investing6, 'present', 'smiling'], [need6b, 'pointUp', 'neutral']] as Beat[]).sort((p, q) => p[0] - q[0])
  const tip = span(f, pull5 + 6, stocks5 + 10) * (1 - on(f, no5, 10))

  // # C) thirty years
  const year = Math.round(lerp(1996, 2025, span(f, thirty7, k135)))
  const treeG = span(f, from7, k900 + 10)
  const cashFill = 0.12 + 0.28 * span(f, thirty7, k184)
  const stair = on(f, five9, 16)

  return (
    <g>
      <Sky id="sv-h-base" f={f} mood="dawn" />
      {/* # A) your kitchen windowsill at dawn */}
      {A > 0 && <g opacity={A}>
        <rect x={-100} y={-100} width={2200} height={1300} fill="#EFDCC3" />
        {/* the window onto the dawn hills */}
        <g><clipPath id="sv-h-win"><rect x={380} y={210} width={1160} height={560} rx={18} /></clipPath>
          <g clipPath="url(#sv-h-win)"><Sky id="sv-h-a" f={f} mood="dawn" /></g>
          <rect x={380} y={210} width={1160} height={560} rx={18} fill="none" stroke="#FFFFFF" strokeWidth={22} />
          <rect x={950} y={210} width={20} height={560} fill="#FFFFFF" /><rect x={380} y={480} width={1160} height={16} fill="#FFFFFF" /></g>
        {/* the sill */}
        <rect x={300} y={770} width={1320} height={44} rx={10} fill="#FFFFFF" /><rect x={320} y={814} width={1280} height={300} fill="#E2CBAA" />
        <rect x={300} y={812} width={1320} height={10} fill="#000" opacity={0.08} />
        {/* the jar */}
        <Tank x={700} y={770} w={250} h={330} f={f} fill={jarFill} label={f >= k1 ? '$1,000' : 'SAVINGS'} o={on(f, savings1 - 10, 12)} />
        {/* coins of money dropping in */}
        {[0, 1, 2].map((k) => { const t = span(f, money1 + k * 7, money1 + k * 7 + 16); return t > 0 && t < 1 ? <Coin key={k} x={700 + (k - 1) * 40} y={lerp(300, 520, t)} s={0.6} o={1 - t * 0.6} /> : null })}
        {/* padlock on the lid: feels safe */}
        <g opacity={on(f, safe1, 10)} transform={`translate(700 ${420 - 14 * pop(f, safe1, 12)})`}>
          <path d="M-30 0 L-30 -34 A30 30 0 0 1 30 -34 L30 0" fill="none" stroke="#8D99A6" strokeWidth={12} /><rect x={-46} y={-4} width={92} height={74} rx={14} fill={C.gold} /><circle cy={26} r={10} fill={C.goldD} /></g>
        {/* the 0.38% tag */}
        <g opacity={on(f, average2, 10)}><PriceTag x={970} y={520} r={-6} text={f >= eight2 ? '0.38%' : f >= pays2 ? '0.?' : '…'} color={C.waterD} s={1.1} /></g>
        {/* $3.80 a year drips in */}
        {f >= less3 && (() => { const t = span(f, less3, four3 + 20); return <g><Drop x={700} y={lerp(340, 560, t)} s={0.9} o={1 - span(f, four3 + 14, four3 + 22)} />
          <g opacity={on(f, four3, 8) * (1 - on(f, prices3, 8))}><rect x={420} y={560} width={150} height={64} rx={14} fill={C.paper} /><text x={495} y={606} textAnchor="middle" fill={C.greenD} style={TXT(50)}>+$3.80</text></g></g> })()}
        {/* groceries with price tags that climb */}
        <g opacity={on(f, meanwhile3, 12)}>
          {Array.from({ length: 4 }, (_, k) => <Bag key={k} x={1120 + k * 120} y={770} s={0.92} o={k < bags ? 1 : 1 - on(f, less4, 12)} />)}
          <g opacity={on(f, prices3, 8)} transform={`translate(0 ${-40 * on(f, up3, 18)})`}><PriceTag x={1300} y={570} r={6} text={f >= seven3 ? '+2.7%' : 'PRICES'} color={C.terra} s={1.1} /></g>
        </g>
        {/* the "buys" line: an arrow from the jar to the bags, thinning */}
        <g opacity={on(f, every4, 10)}>
          <path d={`M 860 650 Q 980 590 1080 660`} fill="none" stroke={C.ink2} strokeWidth={6} strokeDasharray="14 10" />
          <path d="M1080 660 l-26 -4 l12 -22 Z" fill={C.ink2} />
          {f >= quietly4 && <circle cx={970} cy={610} r={8 + 4 * Math.sin(f / 6)} fill={C.terra} opacity={0.6} />}
        </g>
      </g>}

      {/* # B) the viewer wants to pour it all into stocks — not yet */}
      {B > 0 && <g opacity={B}>
        <Sky id="sv-h-b" f={f} mood="dawn" /><Ground y={GROUND - 20} seed={3} />
        {/* the stock board */}
        <g opacity={on(f, stocks5 - 6, 12) * (1 - on(f, rich6, 10))} transform="translate(1340 420)">
          <rect x={-260} y={-190} width={520} height={360} rx={26} fill={C.ink} /><rect x={-240} y={-170} width={480} height={320} rx={18} fill="#24365A" />
          <path d="M-210 100 L-140 40 L-80 70 L-10 -20 L50 10 L120 -90 L200 -60" fill="none" stroke={C.green} strokeWidth={10} strokeLinejoin="round" />
          <text x={0} y={-118} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>STOCKS</text>
          <rect x={-14} y={170} width={28} height={160} fill={C.woodD} />
        </g>
        <Person f={f} who="hero" beats={bBeats} x={560} y={GROUND} s={0.92} />
        {/* the jar in his hands, tipping toward the board */}
        <g opacity={1 - on(f, rich6, 10)} transform={`translate(${760 + 60 * tip} ${640 - 60 * tip}) rotate(${50 * tip})`}><Tank x={0} y={140} w={180} h={220} f={f} fill={0.6} label="SAVINGS" /></g>
        <NoMark x={1100} y={560} r={130} o={win(f, no5, rich6, 8)} />
        {/* not rich, not an expert */}
        <g opacity={win(f, rich6, turn6, 8)}>
          <g transform="translate(1080 520)"><rect x={-90} y={-150} width={180} height={150} rx={10} fill={C.ink} /><rect x={-140} y={-10} width={280} height={30} rx={12} fill={C.ink} /><rect x={-90} y={-40} width={180} height={18} fill={C.red} /></g>
          <NoMark x={1080} y={460} r={120} o={on(f, rich6 + 6, 8)} />
          <g opacity={on(f, expert6, 8)} transform="translate(1500 500)"><rect x={-130} y={-110} width={260} height={180} rx={14} fill="#24365A" />{[0, 1, 2].map((k) => <path key={k} d={`M${-100} ${-60 + k * 50} l40 -20 l40 30 l40 -26 l40 10`} fill="none" stroke={k === 1 ? C.red : C.green} strokeWidth={6} />)}</g>
          <NoMark x={1500} y={490} r={120} o={on(f, expert6 + 6, 8)} />
        </g>
        {/* five stepping stones rise in order */}
        {Array.from({ length: 5 }, (_, k) => { const a = lerp(turn6, order6 + 4, k / 4), t = pop(f, a, 12)
          return <g key={k} opacity={on(f, a, 8)} transform={`translate(${980 + k * 170} ${GROUND - 30 - k * 90 - 16 * (1 - t)})`}>
            <rect x={-80} y={-20} width={160} height={50} rx={22} fill={C.stone} /><rect x={-80} y={-20} width={160} height={14} rx={7} fill={C.leaf} />
            <text y={22} textAnchor="middle" fill={C.ink} style={TXT(40)}>{k + 1}</text>
            {f >= right6 && <rect x={-86} y={-28} width={172} height={10} rx={5} fill={C.goldL} opacity={on(f, right6 + k * 4, 8)} />}
          </g> })}
      </g>}

      {/* # C) thirty years on a hillside plot */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="sv-h-c" f={f} mood="dawn" /><Ground y={GROUND - 40} seed={5} />
        <g opacity={1 - stair}>
          {/* the cash jar (left) */}
          <Tank x={560} y={GROUND - 40} w={230} h={300} f={f} fill={cashFill} label="CASH" o={on(f, imagine7 + 6, 12)} />
          <g opacity={on(f, k184, 10)}><rect x={430} y={GROUND - 420} width={260} height={74} rx={16} fill={C.paper} /><text x={560} y={GROUND - 366} textAnchor="middle" fill={C.ink} style={TXT(60)}>≈ $184,000</text></g>
          {/* the stock sapling → big tree (right) */}
          <g opacity={on(f, imagine7 + 6, 12) * (1 - on(f, k900, 8))}><rect x={1210} y={GROUND + 10} width={180} height={64} rx={14} fill={C.paper} /><text x={1300} y={GROUND + 58} textAnchor="middle" fill={C.greenD} style={TXT(52)}>STOCKS</text></g>
          <Tree x={1300} y={GROUND - 40} s={0.9 + 1.5 * treeG} grow={0.2 + 0.8 * treeG} fruit={on(f, k900, 20)} />
          <g opacity={on(f, k900, 10)}><rect x={1420} y={GROUND - 560} width={280} height={74} rx={16} fill={C.paper} /><text x={1560} y={GROUND - 506} textAnchor="middle" fill={C.greenD} style={TXT(62)}>≈ $900,000</text></g>
          {/* the watering can pours $375 a month */}
          <g opacity={win(f, m375 - 6, grown8 + 20, 10)} transform={`translate(1020 ${470 + 6 * Math.sin(f / 10)}) rotate(${-18 * on(f, month7, 10)})`}>
            <path d="M-90 -50 L60 -50 L70 60 L-80 60 Z" fill={C.terra} /><path d="M60 -20 L170 -70 L178 -56 L70 10 Z" fill={C.terraD} /><path d="M-90 -40 Q-150 0 -90 50" fill="none" stroke={C.terraD} strokeWidth={14} />
            <text x={-10} y={26} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>$375</text></g>
          {f >= month7 && f < grown8 + 20 && [0, 1, 2, 3].map((k) => <Drop key={k} x={1190 + k * 8} y={420 + ((f * 5 + k * 40) % 200)} s={0.7} />)}
          <g opacity={on(f, thirty7, 10)}><YearCard x={900} y={330} year={String(year)} top={f >= y2025s7 ? '1996 → 2025' : f >= years7 ? '30 YEARS' : 'FROM'} /></g>
          <g opacity={on(f, youd8, 8)}>{Array.from({ length: 5 }, (_, k) => <Coin key={k} x={960} y={GROUND - 30 - k * 16} s={0.5} o={on(f, youd8 + k * 3, 5)} />)}</g>
          <g opacity={on(f, k135, 10)}><rect x={760} y={GROUND + 10} width={400} height={70} rx={16} fill={C.ink} /><text x={960} y={GROUND + 62} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>PUT IN: $135,000</text></g>
        </g>
        {/* five terraces, lit one by one */}
        <g opacity={stair}>
          {Array.from({ length: 5 }, (_, k) => { const a = [five9, steps9, monthly9, habit9, time9][k]
            return <Terrace key={k} x={260 + k * 120} y={GROUND - 40 - (k + 1) * 110} w={1400 - k * 240} h={110} o={on(f, a - 4, 10)} lit={on(f, a, 8) * 0.8} n={String(k + 1)} /> })}
          <Coin x={420} y={GROUND - 190 - 20 * Math.abs(Math.sin(f / 10)) * on(f, first9, 8)} s={0.9} o={on(f, first9, 10)} />
          <g opacity={on(f, today9, 10) * (1 - stair)}><path d={`M 300 ${GROUND - 60} Q 900 ${GROUND - 400} 1600 ${GROUND - 560}`} fill="none" stroke={C.ink2} strokeWidth={8} strokeDasharray="16 12" /></g>
          <g opacity={on(f, savings9, 10)}><Tank x={300} y={GROUND - 150} w={110} h={130} f={f} fill={0.5} /></g>
          <g opacity={on(f, dollar9, 8)}><text x={420} y={GROUND + 40} textAnchor="middle" fill={C.ink} style={TXT(48)}>YOUR FIRST DOLLAR</text></g>
        </g>
      </g>}

      <Headline f={f} lines={[[savings1, 'YOUR SAVINGS ACCOUNT', C.ink, 96], [eight2, 'PAYS ABOUT 0.38% A YEAR', C.ink, 96], [seven3, 'PRICES ROSE ABOUT 2.7%', C.ink, 96], [quietly4, 'IT BUYS A LITTLE LESS', C.ink, 96], [no5, 'NOT YET', C.red, 110], [right6, 'IN THE RIGHT ORDER', C.ink, 96], [imagine7, '$375 A MONTH, 1996 → 2025', C.ink, 92], [five9, '5 STEPS', C.ink, 110]]} />
    </g>
  )
}

export const SV_HOOK = makePiece('sv-hook', 'Saving→investing hook: your kitchen windowsill at dawn, a glass savings jar fills and gets a padlock, a 0.38% tag, $1,000 earns a $3.80 drop, grocery price tags climb +2.7%, four bags shrink to three; the viewer lifts the jar to pour it onto a stock board, red cross + stop (not yet); top hat and trader screen crossed; five stepping stones rise in order; a hillside plot over 30 years: watering can pours $375 a month, year card 1996→2025, cash jar ≈$184,000 vs sapling grown into a fruit tree ≈$900,000; five terraces light up one by one, a coin on the first step', {
  mood: 'light', Component: Hook,
  beats: ["s1:money", "s1:savings", "s1:safe", "s2:average", "s2:pays", "s2:8", "s3:1000", "s3:less", "s3:4", "s3:prices", "s3:meanwhile", "s3:up", "s3:7", "s4:every", "s4:quietly", "s4:less", "s5:thinking", "s5:pull", "s5:stocks", "s5:no", "s6:rich", "s6:expert", "s6:turn", "s6:right", "s6:order", "s7:imagine", "s7:375", "s7:month", "s7:thirty", "s7:years", "s8:135000", "s8:grown", "s8:900000", "s8:184000", "s9:five", "s9:steps", "s9:monthly", "s9:habit", "s9:time", "s9:first", "s9:dollar", "s5:okay#2", "s5:yet", "s7:2025", "s6:investing", "s6:need#2", "s7:from", "s8:you'd", "s9:today", "s9:savings"],
  sfx: [['s1:money', 'coin', 0.15], ['s1:safe', 'click', 0.15], ['s3:4', 'softpop', 0.15], ['s5:no', 'thud', 0.18], ['s8:900000', 'chime', 0.15], ['s9:five', 'swish', 0.12]] })
