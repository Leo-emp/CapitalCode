// ---------------------------------------------------------------- s27–s41: step two, how a GRAT works (the worked example).
// A) GRANTOR · RETAINED · ANNUITY · TRUST: four word cards; their first letters fly into the box's plaque → GRAT.
// B) The billionaire carries a $100M stack of share certificates into the GRAT; two calendar pages (YEAR 1, YEAR 2) on its side.
// C) The rulebook opens; a dashed pipe runs from the box back to him ($100M + INTEREST); the IRS office sets the rate
//    (a month page flips, 6.2% a year); two $54.7M bundles travel back along the pipe, one per year.
// D) The 6.2% line on a growing column: what grows above the line glows gold and flows to the kids.
// E) He holds everything he gets back; the gift tag flips to ≈ $0; the IRS shows a $0 gift-tax sign.
// F) A young company: a small building with a big green arrow shooting up — shares before it goes public.
// G) ONE column does the maths: $100M grows 20% to $120M, the $54.7M payment slides to him, $65.3M left; grows to $78.4M,
//    the second payment slides out, $23.7M left; it slides to the kids (no gift tax, out of his estate); a 40% slice
//    (≈ $9.5M) that would have been tax is crossed out.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { TaxOffice, Stack, FlipTag } from '../bbd/kit'
import { NoMark, Spot } from '../bank/kit'
import { BigArrow } from '../buffett/kit'
import { CalPage } from '../subs/kit'
import { CashColumn, EstateRing, Pill, Rulebook, TrustBox, TAXRED } from './kit'

const GROUND = 930
const PX = 3  // # pixels per $1 million in the worked example (100M = 300 px)

// # a cash bundle travelling along the pipe (a short gold-banded block with its amount)
const Bundle: React.FC<{ x: number; y: number; o?: number; t?: string }> = ({ x, y, o = 1, t = '$54.7M' }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-80} y={-34} width={160} height={68} rx={8} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={4} /><rect x={-16} y={-34} width={32} height={68} fill="#F2E6CC" />
    <rect x={-86} y={-92} width={172} height={50} rx={25} fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={3} />
    <text y={-55} textAnchor="middle" fill="#1E7A4C" style={{ font: '400 40px "Bebas Neue"' }}>{t}</text>
  </g>
)

const Grat1: React.FC<PieceProps> = ({ f, c }) => {
  const long = c('s27:long'), grantor = c('s27:grantor'), retained = c('s27:retained'), annuity = c('s27:annuity'), trust27 = c('s27:trust'), calls = c('s27:calls'), grat27 = c('s27:grat')
  const madeup = c('s28:madeup'), puts = c('s29:puts'), m100 = c('s29:100'), stock29 = c('s29:stock'), lasts = c('s29:lasts'), two29 = c('s29:two'), years29 = c('s29:years')
  const rulebook = c('s30:rulebook'), pay30 = c('s30:pay'), full = c('s30:full'), plus30 = c('s30:plus'), interest30 = c('s30:interest')
  const picked = c('s31:picked'), irs = c('s31:irs'), month = c('s31:month'), november = c('s31:november'), r62 = c('s31:62')
  const bil34 = c('s34:billionaire'), pct33 = c('s33:percent'), billionaires40 = c("s40:billionaire's"), gift35 = c('s35:gift'), promises = c('s32:promises'), first29 = c('s29:first'), billionaire29 = c('s29:billionaire'), grats36 = c('s36:grats'), work36 = c('s36:work'), almost26 = c('s26:almost'), back32 = c('s32:back'), int32b = c('s32:interest'), down26 = c('s26:downside'), two32 = c('s32:two'), payments = c('s32:payments'), m547 = c('s32:547'), each = c('s32:each'), together = c('s32:together'), interest32 = c('s32:interest')
  const matter = c('s33:matter'), earns = c('s33:earns'), above = c('s33:above'), ends = c('s33:ends'), kids33 = c('s33:kids')
  const clever = c('s34:clever'), everything34 = c('s34:everything'), rules34 = c('s34:rules'), gift34 = c('s34:gift'), zero34 = c('s34:zero')
  const zero35b = c('s35:zero#2'), tax35 = c('s35:tax')
  const jump = c('s36:jump'), shares = c('s36:shares'), young = c('s36:young'), publicW = c('s36:public')
  const watch = c('s37:watch'), well = c('s37:well'), p20 = c('s37:20'), year37 = c('s37:year')
  const one38 = c('s38:one'), m120 = c('s38:120'), pays38 = c('s38:pays'), m547b = c('s38:547'), m653 = c('s38:653'), left38 = c('s38:left')
  const two39 = c('s39:two'), m784 = c('s39:784'), second39 = c('s39:second'), out39 = c('s39:out'), m237 = c('s39:237')
  const still39 = c('s39:still'), m237b = c('s40:237'), goes40 = c('s40:goes'), kids40 = c('s40:kids'), gift40 = c('s40:gift'), estate40 = c('s40:estate')
  const taxed41 = c('s41:taxed'), p40 = c('s41:40'), cost41 = c('s41:cost'), m95 = c('s41:95')

  const AB = c('s28') - 8, BC = c('s30') - 8, CD = c('s33') - 8, DE = c('s34') - 8, EF = c('s36') - 8, FG = c('s37') - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = win(f, EF, FG), G = on(f, FG, 10)

  // # A) the four words, then their initials gather into the plaque
  const words = [['GRANTOR', grantor], ['RETAINED', retained], ['ANNUITY', annuity], ['TRUST', trust27]] as [string, number][]
  const gather = span(f, calls + 8, grat27 + 10)

  // # B) carrying the stack in
  const bBeats: Beat[] = [[AB, 'idle', 'smiling'], [first29, 'countOne', 'smiling'], [billionaire29, 'carryHeavy', 'smiling'], [stock29, 'carryHeavy', 'smiling'], [lasts, 'present', 'smiling'], [two29, 'countOne', 'smiling']]
  const carry = span(f, puts, stock29 + 18)
  const bp = hand(f, bBeats, lerp(300, 520, carry), GROUND, 1.05)

  // # C) the pipe back to the billionaire; bundles move along it
  const pipe = (t: number) => ({ x: lerp(800, 540, t), y: lerp(GROUND - 300, GROUND - 40, t) - 220 * Math.sin(Math.PI * t) })
  const b1 = pipe(span(f, payments, m547 + 10)), b2 = pipe(span(f, each, together + 6))

  // # G) the worked example: value of the column (in $M) and the two payouts
  const v1 = lerp(100, 120, on(f, m120 - 6, 18))                   // # grows to 120
  const afterPay1 = on(f, pays38, 12)                              // # 54.7 leaves
  const v2 = lerp(65.3, 78.4, on(f, m784 - 6, 18))                 // # grows to 78.4
  const afterPay2 = on(f, second39, 12)
  const value = f < pays38 ? v1 : f < two39 ? lerp(120, 65.3, afterPay1) : f < second39 ? v2 : lerp(78.4, 23.7, afterPay2)
  const slide = on(f, goes40, 22)
  const back30 = c('s30:back')
  const colX = 960, topY = GROUND - value * PX
  const pay = (t0: number, startY: number, landY: number) => { const t = span(f, t0, t0 + 22); return { x: lerp(colX, 610, t), y: lerp(startY, landY, t) - 120 * Math.sin(Math.PI * t), on: f >= t0 } }
  const p1 = pay(pays38, GROUND - 65.3 * PX, GROUND), p2 = pay(second39, GROUND - 23.7 * PX, GROUND - 54.7 * PX - 6)
  const kidsX = lerp(colX, 1420, slide)
  const gBeats: Beat[] = [[FG, 'idle', 'smiling'], [well, 'think', 'thinking'], [p20, 'pointUp', 'smiling'], [pays38, 'receive', 'smiling'], [second39, 'receive', 'smiling'], [kids40, 'present', 'smug'], [cost41, 'confident', 'smug']]

  return (
    <g>
      <Stage id="tt-grat1" frame={f} />
      <Headline f={f} lines={[[long, 'A LONG NAME…', P.ink, 104], [grat27, '… CALLED A GRAT', P.ink, 110], [madeup, 'MADE-UP ROUND NUMBERS', P.ink2, 96], [m100, '1. $100 MILLION OF STOCK IN', P.ink, 96], [years29, 'FOR 2 YEARS', P.ink, 104],
        [rulebook, '2. IT MUST PAY HIM BACK', P.ink, 100], [plus30, '$100M + INTEREST', P.ink, 104], [irs, 'THE IRS SETS THE RATE', P.ink, 100], [r62, 'NOV 2026: 6.2% A YEAR', P.ink, 104], [m547, '2 PAYMENTS OF ≈ $54.7M', P.ink, 100],
        [matter, 'WHY THE RATE MATTERS', P.ink, 104], [above, 'GROWTH ABOVE 6.2% → THE KIDS', P.goldInk, 96], [clever, '3. THE CLEVER PART', P.ink, 104], [gift34, 'GIFT TO THE KIDS ≈ $0', P.mintInk, 104], [tax35, 'ZERO GIFT TAX', P.mintInk, 112],
        [jump, 'BEST FOR THINGS THAT JUMP', P.ink, 100], [watch, 'IF THE STOCK DOES WELL', P.ink, 100], [p20, 'SAY +20% A YEAR', P.ink, 104], [one38, 'YEAR 1', P.ink, 112], [two39, 'YEAR 2', P.ink, 112],
        [goes40, '$23.7M TO THE KIDS', P.goldInk, 104], [gift40, 'NO GIFT TAX', P.mintInk, 110], [estate40, 'NOT IN HIS ESTATE', P.mintInk, 104], [taxed41, 'TAX IT WOULD HAVE COST', P.ink, 100], [m95, '≈ $9.5 MILLION SAVED', P.mintInk, 104]]} />

      {/* # A) the long name becomes GRAT */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <TrustBox x={960} y={GROUND} s={1.05} lock={1} label={gather > 0.6 ? 'GRAT' : 'TRUST'} glow={win(f, grat27, grat27 + 30) + win(f, down26, down26 + 30)} open={win(f, almost26, down26 + 10, 8)} />
        {words.map(([w, at], k) => { const x0 = 330 + k * 420, y0 = 420, t = gather
          return <g key={k} opacity={on(f, at, 8)}>
            <g opacity={1 - on(f, calls, 10)} transform={`translate(${x0} ${y0 - 16 * pop(f, at, 12)})`}>
              <rect x={-180} y={-60} width={360} height={120} rx={20} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} />
              <text x={0} y={30} textAnchor="middle" style={{ font: '400 84px "Bebas Neue"', letterSpacing: 2 }}><tspan fill="#B4821C">{w[0]}</tspan><tspan fill="#16294A">{w.slice(1)}</tspan></text>
            </g>
            {t > 0 && t < 1 && <text x={lerp(x0 - 120, 960 - 45 + k * 30, t)} y={lerp(y0 + 30, GROUND - 104, t)} textAnchor="middle" fill="#B4821C" style={{ font: `400 ${lerp(84, 50, t)}px "Bebas Neue"` }}>{w[0]}</text>}
          </g> })}
      </g>}

      {/* # B) $100M of stock goes in for two years */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <TrustBox x={1060} y={GROUND} s={1.05} label="GRAT" lock={on(f, lasts, 8)} open={win(f, puts, lasts, 8)} />
        <Person f={f} who="investor" beats={bBeats} x={lerp(300, 520, carry)} y={GROUND} s={1.05} />
        <g opacity={on(f, m100 - 4, 8) * (1 - on(f, stock29 + 14, 6))}><Stack x={bp.x + 60} y={bp.y + 60} n={6} s={0.6} /><g transform={`translate(${bp.x + 60} ${bp.y - 170})`}><Pill x={0} y={0} text="$100M OF STOCK" size={42} w={320} /></g></g>
        {([[two29, 'YEAR 1'], [years29, 'YEAR 2']] as [number, string][]).map(([at, t], k) => <CalPage key={k} x={1420 + k * 230} y={GROUND - 330 - 10 * pop(f, at, 12)} s={0.85} top="GRAT" big={t} o={on(f, at, 8)} />)}
      </g>}

      {/* # C) pay him back: the rulebook, the pipe, the IRS rate, two payments */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <TrustBox x={900} y={GROUND} s={0.95} label="GRAT" lock={1} />
        <g opacity={on(f, rulebook, 8)} transform={`translate(0 ${-30 * (1 - pop(f, rulebook, 12))})`}><Rulebook x={900} y={GROUND - 420} s={0.7} open={on(f, pay30, 12)} /></g>
        <Person f={f} who="investor" beats={[[BC, 'idle', 'smiling'], [pay30, 'receive', 'smiling'], [picked, 'shrug', 'neutral'], [m547, 'countA', 'smiling', 'countB', 14], [together, 'present', 'smiling']]} x={300} y={GROUND} s={1.05} />
        <g opacity={on(f, back30, 10)}><path d={`M800 ${GROUND - 300} Q640 ${GROUND - 560} 540 ${GROUND - 130}`} fill="none" stroke="#B4821C" strokeWidth={9} strokeDasharray="22 14" strokeDashoffset={f} /></g>
        <Pill x={600} y={GROUND - 520} text={f >= interest30 ? '$100M + INTEREST' : '$100M'} size={46} w={360} o={on(f, full, 8) * (1 - on(f, payments, 8))} />
        <g opacity={on(f, irs, 10)} transform={`translate(${lerp(300, 0, on(f, irs, 16))} 0)`}><TaxOffice x={1560} y={GROUND} s={0.9} />
          <CalPage x={1560} y={GROUND - 420} s={0.8} top={f >= november ? '2026' : 'MONTH'} big={f >= november ? 'NOV' : ['JAN', 'FEB', 'MAR', 'APR', 'MAY'][Math.min(4, Math.floor(span(f, month, november) * 5))]} o={on(f, month - 4, 8)} />
          <Pill x={1560} y={GROUND - 600} text="6.2% A YEAR" size={52} w={300} color="#B4821C" o={on(f, r62, 8)} /></g>
        <Pill x={1180} y={GROUND - 120} text={f >= int32b ? '= $100M + INTEREST' : '= $100M'} size={44} w={380} color="#1E7A4C" o={on(f, back32, 8)} />
        <Spot f={f} at={promises} x={900} y={GROUND - 420} rx={150} ry={170} />
        {f >= payments && <Bundle x={b1.x} y={b1.y} o={on(f, payments, 6)} t="$54.7M" />}
        {f >= each && <Bundle x={b2.x} y={b2.y - 150 * span(f, together - 4, together + 8)} o={on(f, each, 6)} t="$54.7M" />}
      </g>}

      {/* # D) the 6.2% line: growth above it goes to the kids */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <CashColumn x={900} y={GROUND} h={lerp(300, 420, span(f, earns, above + 10))} w={220} />
        <g opacity={on(f, above, 8)}><rect x={790} y={GROUND - lerp(300, 420, span(f, earns, above + 10))} width={220} height={Math.max(0, lerp(300, 420, span(f, earns, above + 10)) - 319)} rx={6} fill={P.gold} opacity={0.75} /></g>
        <g opacity={on(f, matter, 8)}><line x1={720} y1={GROUND - 319} x2={1080} y2={GROUND - 319} stroke="#16294A" strokeWidth={6 + 6 * win(f, pct33, pct33 + 24, 6)} strokeDasharray="16 10" /><Pill x={580} y={GROUND - 319} text="6.2% LINE" size={44} w={230} /></g>
        <Person f={f} who="investor" beats={[[CD, 'think', 'thinking'], [ends, 'idle', 'smiling']]} x={300} y={GROUND} s={1.0} />
        <g opacity={on(f, ends, 8)}><path d={`M1020 ${GROUND - 400} Q1200 ${GROUND - 520} 1420 ${GROUND - 420}`} fill="none" stroke="#B4821C" strokeWidth={10} strokeDasharray="22 14" strokeDashoffset={-f} /></g>
        <g opacity={on(f, kids33 - 10, 10)}>
          <Person f={f} who="buyer" beats={[[CD, 'idle', 'smiling'], [kids33, 'celebrate', 'smiling']]} x={1540} y={GROUND} s={0.95} flip />
          <Person f={f} who="investorF" beats={[[CD, 'idle', 'smiling'], [kids33, 'clapA', 'smiling', 'clapB', 12]]} x={1730} y={GROUND} s={0.95} flip />
        </g>
      </g>}

      {/* # E) he gets everything back, so the gift is valued at about zero */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={[[DE, 'idle', 'smug'], [bil34, 'receive', 'smiling'], [everything34, 'countA', 'smiling', 'countB', 14], [zero34, 'taDa', 'smug']]} x={300} y={GROUND} s={1.05} />
        <g opacity={on(f, everything34, 8)}><CashColumn x={540} y={GROUND} h={200} w={140} /></g>
        <TrustBox x={960} y={GROUND} s={0.95} label="GRAT" lock={1} />
        <g opacity={on(f, gift34, 8)}><path d={`M1110 ${GROUND - 170} Q1180 ${GROUND - 260} 1170 ${GROUND - 330}`} fill="none" stroke="#B88A2E" strokeWidth={6} /></g>
        <FlipTag x={1250} y={GROUND - 390} s={0.9} o={on(f, gift34, 8)} a="GIFT" b="≈ $0" t={span(f, zero34 - 6, zero34 + 8)} color={f > zero34 ? '#7FD3A0' : P.gold} />
        <Spot f={f} at={gift35} x={1250} y={GROUND - 390} rx={200} ry={110} />
        <g opacity={on(f, c('s35'), 10)}><TaxOffice x={1620} y={GROUND} s={0.8} shut={on(f, zero35b, 10)} /></g>
      </g>}

      {/* # F) things that could jump in value */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <g opacity={on(f, grats36, 8)}><TrustBox x={300} y={GROUND} s={0.55} label="GRAT" lock={1} glow={win(f, work36, work36 + 30)} /></g>
        <g opacity={on(f, young - 8, 10)} transform={`translate(960 ${GROUND})`}><ellipse cx={0} cy={6} rx={220} ry={18} fill={P.shadow} opacity={0.18} /><rect x={-190} y={-330} width={380} height={330} rx={14} fill="#3A6EA8" />{Array.from({ length: 9 }, (_, k) => <rect key={k} x={-150 + (k % 3) * 110} y={-290 + Math.floor(k / 3) * 90} width={80} height={56} rx={6} fill={on(f, publicW, 14) > 0.5 && k % 2 === 0 ? '#FFE7A0' : '#BFE4FF'} />)}<rect x={-120} y={-390} width={240} height={60} rx={10} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} /><text y={-347} textAnchor="middle" fill="#16294A" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>YOUNG CO.</text></g>
        <g transform={`translate(1250 ${GROUND - 200})`} opacity={on(f, jump, 8)}><BigArrow x={0} y={0} s={1.2} t={on(f, jump, 18)} color={P.mint} /></g>
        <g opacity={on(f, shares, 8)}><Stack x={560} y={GROUND} n={Math.round(lerp(2, 8, span(f, shares, publicW + 10)))} s={1} /></g>
        <Pill x={1250} y={GROUND - 470} text="BEFORE IT GOES PUBLIC" size={44} w={470} o={on(f, publicW, 8)} color="#1E7A4C" />
      </g>}

      {/* # G) the worked example: one column grows, pays back twice, the rest goes to the kids */}
      {G > 0 && <g opacity={G}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={gBeats} x={300} y={GROUND} s={1.05} />
        {f < goes40 + 22 && <CashColumn x={colX} y={GROUND} h={value * PX * (f >= goes40 ? 1 - slide : 1)} w={220} color={f >= m237 ? 'gold' : 'green'} />}
        <Pill x={colX} y={GROUND + 64} text="INSIDE THE GRAT" size={40} w={320} o={on(f, FG, 10) * (1 - on(f, goes40, 10))} />
        <g opacity={win(f, still39, goes40, 8)}><ellipse cx={colX} cy={GROUND - 40} rx={200 + 20 * win(f, m237b, m237b + 16, 6)} ry={90} fill={P.gold} opacity={0.22} /></g>
        <Pill x={colX + 250} y={topY + 10} size={50} w={210} color={f >= m237 ? '#B4821C' : '#1E7A4C'}
          text={f >= m237 ? '$23.7M' : f >= m784 ? '$78.4M' : f >= m653 ? '$65.3M' : f >= m120 ? '$120M' : '$100M'} o={on(f, watch, 8) * (1 - on(f, goes40, 8))} />
        <Pill x={colX + 250} y={topY - 70} text="+20% A YEAR" size={40} w={250} color="#1E7A4C" o={win(f, p20, pays38, 8) + win(f, two39, second39, 8)} />
        {p1.on && <CashColumn x={p1.x} y={p1.y} h={54.7 * PX} w={150} />}
        {p2.on && <CashColumn x={p2.x} y={p2.y} h={54.7 * PX} w={150} />}
        <Pill x={790} y={GROUND - 54.7 * PX / 2} text="$54.7M" size={40} w={160} o={on(f, m547b, 8) * (1 - on(f, goes40, 8))} />
        <Pill x={790} y={GROUND - 54.7 * PX * 1.5} text="+ $54.7M" size={40} w={180} o={on(f, out39, 8) * (1 - on(f, goes40, 8))} />
        {f >= goes40 && <CashColumn x={kidsX} y={GROUND} h={23.7 * PX} w={220} color="gold" />}
        <Pill x={1420} y={GROUND - 23.7 * PX - 50} text="$23.7M" size={46} w={190} color="#B4821C" o={on(f, kids40, 8)} />
        <Person f={f} who="buyer" beats={[[FG, 'idle', 'neutral'], [kids40, 'celebrate', 'smiling'], [estate40, 'thumbsUp', 'smiling']]} x={1620} y={GROUND} s={0.95} flip />
        <Person f={f} who="investorF" beats={[[FG, 'idle', 'neutral'], [kids40, 'clapA', 'smiling', 'clapB', 12], [estate40, 'idle', 'smiling']]} x={1790} y={GROUND} s={0.95} flip />
        <g opacity={on(f, billionaires40, 10) * (1 - on(f, taxed41, 8))}><EstateRing x={420} y={GROUND - 10} rx={330} ry={60} label="" t={span(f, billionaires40, estate40 + 16)} /><Pill x={420} y={1010} text="HIS ESTATE" size={42} color="#B4821C" w={250} /></g>
        <g opacity={on(f, taxed41, 8)} transform={`translate(${lerp(1420, 1100, on(f, p40, 14))} ${lerp(380, 430, on(f, p40, 14))})`}>
          <rect x={-150} y={-70} width={300} height={140} rx={14} fill="#FFFFFF" stroke="#E2C9BF" strokeWidth={4} /><rect x={-150} y={-70} width={300} height={44} rx={14} fill={TAXRED} />
          <text y={-38} textAnchor="middle" fill="#FFF" style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>40% ESTATE TAX</text>
          <text y={46} textAnchor="middle" fill={TAXRED} style={{ font: '400 66px "Bebas Neue"' }}>{f >= m95 ? '≈ $9.5M' : '40%'}</text>
          <NoMark x={0} y={0} o={on(f, m95 + 8, 8)} r={95} />
        </g>
      </g>}
      <Vignette id="tt-grat1" />
    </g>
  )
}

const BEATS = ['s27:long', 's27:grantor', 's27:retained', 's27:annuity', 's27:trust', 's27:calls', 's27:grat', 's28:madeup', 's29:puts', 's29:100', 's29:stock', 's29:lasts', 's29:two', 's29:years',
  's30:rulebook', 's30:pay', 's30:back', 's30:full', 's30:plus', 's30:interest', 's31:picked', 's31:irs', 's31:month', 's31:november', 's31:62', 's26:almost', 's34:billionaire', 's33:percent', "s40:billionaire's", 's35:gift', 's32:promises', 's26:downside', 's29:first', 's29:billionaire', 's36:grats', 's36:work', 's32:payments', 's32:547', 's32:each', 's32:together', 's32:back', 's32:interest', 's39:still', 's40:237',
  's33:matter', 's33:earns', 's33:above', 's33:ends', 's33:kids', 's34:clever', 's34:everything', 's34:gift', 's34:zero', 's35:zero#2', 's35:tax', 's36:jump', 's36:shares', 's36:young', 's36:public',
  's37:watch', 's37:well', 's37:20', 's38:one', 's38:120', 's38:pays', 's38:547', 's38:653', 's39:two', 's39:784', 's39:second', 's39:out', 's39:237', 's40:goes', 's40:kids', 's40:gift', 's40:estate',
  's41:taxed', 's41:40', 's41:cost', 's41:95']
export const TT_GRAT1 = makePiece('tt-grat1', 'Trusts step two, the GRAT: four word cards (Grantor Retained Annuity Trust) whose initials fly into the box plaque; the billionaire carries a $100M stack of shares into the GRAT with YEAR 1 / YEAR 2 pages; the rulebook opens and a dashed pipe runs back to him ($100M + interest); the IRS office with a month page flipping to NOV 2026 and 6.2% a year; two $54.7M bundles travel back along the pipe; a growing column with a 6.2% line, the gold growth above it flows to the kids; he counts what he got back, the gift tag flips to ≈ $0 and the IRS shows a $0 sign; a young company building with a big green arrow; the worked example: one column grows to $120M, a $54.7M block slides to him, $65.3M grows to $78.4M, the second block slides out, $23.7M turns gold and slides to the kids; an estate ring round him; a 40% tax bill (≈ $9.5M) crossed out', {
  mood: 'light', Component: Grat1, beats: BEATS,
  sfx: [['s27:grat', 'pop', 0.2], ['s29:stock', 'thud', 0.15], ['s31:62', 'tick', 0.2], ['s32:547', 'cash', 0.2], ['s35:tax', 'ding', 0.2], ['s36:jump', 'whoosh', 0.2], ['s38:pays', 'cash', 0.2], ['s39:second', 'cash', 0.2], ['s40:kids', 'chime', 0.25], ['s41:95', 'pop', 0.2]] })
