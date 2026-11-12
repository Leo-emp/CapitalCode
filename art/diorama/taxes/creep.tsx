// ---------------------------------------------------------------- s64–s75: why the lines move every year (bracket creep).
// A golden-hour shop street. A big glass tank stands on the pavement in front of the last shop with its dashed bracket line.
// A) Prices go up (the price tags under the awnings climb, ↑) and Maya's pay slip grows to keep up. Imagine the line never
//    moved: it gets a padlock. Her raise only matches prices — the same shopping bag — yet her water now rises past the
//    frozen line and the top turns red: more tax, no real gain. BRACKET CREEP.
// B) To stop it, a worker climbs a ladder and lifts the line, every year. 2027: the jar of tax-free pay grows $16,100 →
//    $16,600; the line's tag flips 50,400 → 52,025. Maya's same $70,000 pay in the 2027 tanks: tax ≈ $6,290 — a 2026 chest
//    $6,570 beside it, −$280; the stairs moved, so she sits a little lower.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { StreetWorld, Tank, PriceTag, Ladder, Jar, Chest, Paycheck, Sign, BracketLine, Vig, TXT, INK, BRASS, BRASS2, CORAL, MINT, WARM, PAPER, Life } from './kit'

const PAVE = 960, TKX = 1480, TKW = 300, TKH = 520
const surf = (lv: number) => PAVE - TKH + 18 + (TKH - 36) * (1 - lv)

const Creep: React.FC<PieceProps> = ({ f, c }) => {
  const staircase = c('s64:staircase'), every = c('s64:every')
  const prices = c('s65:prices'), up = c('s65:up'), pay = c('s65:pay'), keep = c('s65:keep')
  const imagine = c('s66:imagine'), lines66 = c('s66:lines'), never = c('s66:never')
  const raise = c('s67:raise'), matches = c('s67:matches'), buy = c('s67:buy'), richer = c('s67:richer')
  const cross = c('s68:cross'), higher = c('s68:higher'), share = c('s68:share'), gain = c('s68:gain')
  const name = c('s69:name'), creep = c('s69:creep')
  const stop = c('s70:stop'), irs = c('s70:irs'), moves = c('s70:moves'), inflation = c('s70:inflation'), year70 = c('s70:year')
  const y2027 = c('s71:2027'), out = c('s71:out')
  const standard = c('s72:standard'), d16100 = c('s72:16100'), d16600 = c('s72:16600')
  const line73 = c('s73:line'), d50400 = c('s73:50400'), d52025 = c('s73:52025')
  const run = c('s74:run'), d70k = c('s74:70000'), b2027 = c('s74:2027'), d6290 = c('s74:6290')
  const d280 = c('s75:280'), same = c('s75:same'), stairs = c('s75:stairs'), lower = c('s75:lower')

  const A = 1 - on(f, stop - 6, 12), B = on(f, stop - 6, 12)
  // # the line: frozen at level .55 in A; lifted to .72 in B
  const lineLv = lerp(0.55, 0.72, on(f, moves, 30)) + 0.03 * on(f, c('s73:moves'), 24)
  const water = A > 0.5 ? lerp(0.45, 0.68, on(f, cross, 30)) : lerp(0.68, 0.64, on(f, run, 20))
  const redTop = A > 0.5 ? on(f, cross, 30) : 0
  const maya: Beat[] = [[staircase, 'idle', 'neutral'], [pay, 'holdUp', 'smiling'], [keep, 'holdUp', 'smiling'], [imagine, 'think', 'thinking'], [buy, 'hold', 'neutral'], [richer, 'shrug', 'worried'], [share, 'despair', 'worried'], [creep, 'facepalm', 'worried'], [stop, 'idle', 'neutral'], [moves, 'pointUp', 'smiling'], [standard, 'present', 'smiling'], [c('s72:person'), 'pointDown', 'smiling'], [c('s72:rises'), 'pointUp', 'smiling'], [c('s73:22'), 'idle', 'smiling'], [c('s73:begins'), 'pointUp', 'thinking'], [d70k, 'holdUp', 'smiling'], [d280, 'relief', 'smiling'], [lower, 'thumbsUp', 'smiling']]
  const worker: Beat[] = [[irs, 'reachUp', 'neutral'], [moves, 'push', 'smiling'], [inflation, 'reachUp', 'smiling'], [year70, 'thumbsUp', 'smiling']]
  const hp = hand(f, maya, 400, PAVE, 0.95, false)
  const holdingPay = (f >= pay && f < imagine) || (f >= d70k && f < d6290)
  const holdingBag = f >= buy && f < cross

  return (
    <g>
      <StreetWorld f={f} id="tx-creep" />
      {/* # price tags under the first two shops' awnings, climbing as prices go up */}
      <g opacity={1 - on(f, stop - 6, 12)}>{[760, 960, 1160].map((x, k) => { const rise = on(f, up + k * 4, 20); return <g key={k} opacity={on(f, prices + k * 3, 8)}><PriceTag x={x} y={lerp(620, 540, rise)} t={rise > 0.5 ? '↑' : '$'} r={k % 2 ? 6 : -6} col={k % 2 ? CORAL : '#3D7EA6'} /></g> })}</g>
      <g opacity={win(f, every, prices, 8)}><Sign x={960} y={236} t="EVERY YEAR" size={56} /></g>

      {/* # the street tank */}
      <g opacity={on(f, staircase - 6, 10)}>
        <Tank x={TKX} y={PAVE} w={TKW} h={TKH} level={water} rate={'12%'} f={f} lit={win(f, higher, share + 20, 6)} />
        {/* the part above the line turns red when the line is frozen */}
        <g opacity={redTop * (water > lineLv ? 1 : 0)}><rect x={TKX - TKW / 2 + 12} y={surf(water) + 4} width={TKW - 24} height={Math.max(0, surf(lineLv) - surf(water) - 4)} fill={CORAL} opacity={0.85} /></g>
        <BracketLine x1={TKX - TKW / 2 - 20} x2={TKX + TKW / 2 + 20} y={surf(lineLv)} o={on(f, lines66 - 6, 8)} />
        <g opacity={on(f, lines66, 8)}><Sign x={TKX} y={surf(lineLv) - 26} t={B > 0.5 ? (f >= d52025 ? '22% LINE: 52,025' : f >= d50400 ? '22% LINE: 50,400' : '22% LINE') : '22% LINE'} size={36} /></g>
        {/* padlock: the frozen line */}
        <g opacity={win(f, never, stop, 8)} transform={`translate(${TKX + TKW / 2 + 60} ${surf(lineLv)}) scale(${pop(f, never, 12)})`}>
          <path d="M-22 -10 L-22 -36 Q0 -62 22 -36 L22 -10" fill="none" stroke={BRASS2} strokeWidth={10} /><rect x={-34} y={-12} width={68} height={56} rx={10} fill={BRASS} stroke={BRASS2} strokeWidth={4} />
        </g>
        <g opacity={win(f, share, name, 8)}><Sign x={TKX} y={236} t="MORE TAX, NO REAL GAIN" size={44} col={CORAL} tc="#FFFFFF" /></g>
      </g>
      <g opacity={win(f, creep, stop, 8)} transform={`translate(${TKX} 216) scale(${pop(f, creep, 12)})`}><rect x={-230} y={-60} width={460} height={110} rx={18} fill={CORAL} stroke="#FFFFFF" strokeWidth={6} /><text y={24} textAnchor="middle" fill="#FFFFFF" style={TXT(78)}>BRACKET CREEP</text></g>

      {/* # Maya on the pavement */}
      <Person f={f} who="investorF" beats={maya} x={400} y={PAVE} s={0.95} />
      {holdingPay && <g transform={`translate(${hp.x + 50} ${hp.y - 60}) scale(${f >= d70k ? 0.8 : lerp(0.6, 0.85, on(f, keep, 20))})`}><Paycheck x={0} y={0} amount={f >= d70k ? '$70,000' : 'PAY ↑'} /></g>}
      {holdingBag && <g transform={`translate(${hp.x} ${hp.y + 10})`}>
        <path d="M-70 0 L70 0 L60 150 L-60 150 Z" fill="#D9B07A" stroke="#A9814F" strokeWidth={4} /><path d="M-36 0 Q-36 -50 0 -50 Q36 -50 36 0" fill="none" stroke="#A9814F" strokeWidth={6} />
        <circle cx={-30} cy={-6} r={22} fill={CORAL} /><rect x={0} y={-40} width={30} height={46} rx={6} fill={MINT} />
      </g>}
      <g opacity={win(f, matches, cross, 8)}><Sign x={900} y={236} t="SAME BAG, HIGHER PRICES" size={44} /></g>

      {/* # B) the fix: a worker on a ladder lifts the line */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={1 - on(f, y2027, 10)}>
          <Ladder x={TKX - TKW / 2 - 80} y={PAVE} h={400} />
          <Person f={f} who="worker" beats={worker} x={TKX - TKW / 2 - 80} y={PAVE - 200} s={0.6} />
          <g opacity={on(f, inflation, 8)}><Sign x={900} y={236} t="UP WITH INFLATION, EVERY YEAR" size={44} /></g>
        </g>
        <g opacity={on(f, y2027, 8) * (1 - on(f, run, 8))} transform={`translate(1480 250) scale(${pop(f, y2027, 12)})`}><rect x={-120} y={-60} width={240} height={110} rx={16} fill={WARM} stroke={BRASS2} strokeWidth={4} /><text y={26} textAnchor="middle" fill={INK} style={TXT(90)}>2027</text></g>
        {/* the tax-free jar grows */}
        <g opacity={win(f, standard, run, 10)}><Jar x={960} y={PAVE} s={lerp(0.8, 0.86, on(f, d16600, 20))} level={lerp(0.62, 0.72, on(f, c('s72:rises'), 20))} f={f} label={f >= d16600 ? '$16,600' : '$16,100'} /></g>
        {/* 2027 vs 2026 chests */}
        <g opacity={on(f, d6290 - 4, 10)}>
          <Chest x={1040} y={PAVE} s={0.62} n={12} total="$6,290" /><Sign x={1040} y={740} t="2027" size={44} col={MINT} tc="#FFFFFF" />
        </g>
        <g opacity={on(f, d280 - 6, 10)}>
          <Chest x={780} y={PAVE} s={0.62} n={14} total="$6,570" /><Sign x={780} y={740} t="2026" size={44} />
          <g transform={`translate(910 560) scale(${pop(f, d280, 12)})`}><rect x={-110} y={-50} width={220} height={90} rx={16} fill={MINT} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(64)}>−$280</text></g>
        </g>
        <g opacity={on(f, same, 8)}><Sign x={910} y={236} t="SAME PAY, LOWER ON THE STAIRS" size={42} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s67:she#3")} x={1480} y={620} kind="ripple" />
        <Life f={f} at={c("s67:before")} x={1480} y={620} kind="ripple" />
        <Life f={f} at={c("s68:for")} x={1480} y={620} kind="ripple" />
        <Life f={f} at={c("s69:is")} x={1480} y={620} kind="ripple" />
        <Life f={f} at={c("s72:16100")} x={960} y={720} kind="ripple" />
        <Life f={f} at={c("s74:buckets")} x={1040} y={820} kind="glint" />
        <Life f={f} at={c("s74:tax")} x={1040} y={820} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="tx-creep" k={0.22} />
      <Headline f={f} lines={[[staircase, 'THE STAIRS MOVE EVERY YEAR', INK, 84], [imagine, 'IF THE LINES NEVER MOVED', INK, 84], [stop, 'THE FIX', INK, 96], [y2027, 'THE 2027 NUMBERS', INK, 90]]} />
    </g>
  )
}

export const TX_CREEP = makePiece('tx-creep', "Bracket creep on a golden-hour shop street: price tags under the awnings climb (↑) and Maya's pay slip grows to keep up; a big glass tank on the pavement has a dashed 22% LINE that gets a padlock (imagine it never moved); with the same shopping bag at higher prices her water rises past the frozen line and the top turns red — MORE TAX, NO REAL GAIN — BRACKET CREEP; then a worker on a ladder lifts the line, up with inflation every year; a 2027 sign; the tax-free jar grows from $16,100 to $16,600; the line tag flips 50,400 → 52,025; Maya holds her same $70,000 pay and a 2027 chest shows ≈ $6,290 beside a 2026 chest of $6,570: −$280 — same pay, lower on the stairs.", {
  mood: 'light', Component: Creep,
  beats: ["s64:staircase", "s64:every", "s65:prices", "s65:up", "s65:pay", "s65:keep", "s66:imagine", "s66:lines", "s66:never", "s67:raise", "s67:matches", "s67:buy", "s67:richer", "s68:cross", "s68:higher", "s68:share", "s68:gain", "s69:name", "s69:creep", "s70:stop", "s70:irs", "s70:moves", "s70:inflation", "s70:year", "s71:2027", "s71:out", "s72:standard", "s72:16600", "s73:50400", "s73:52025", "s74:run", "s74:70000", "s74:6290", "s75:280", "s75:same", "s75:stairs", "s75:lower", "s73:moves", "s72:person", "s72:rises", "s73:22", "s73:begins", "s67:she#3", "s67:before", "s68:for", "s69:is", "s72:16100", "s74:buckets", "s74:tax"],
  sfx: [['s66:never', 'thud', 0.1], ['s69:creep', 'thud', 0.12], ['s70:moves', 'swish', 0.1], ['s75:280', 'pop', 0.1]] })
