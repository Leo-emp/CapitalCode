// ---------------------------------------------------------------- s1–s5: the personal hook (r81) on Maple Street.
// A morning paper street of five houses. You walk past them; each gets a FOR SALE sign with a price. Who picks it?
// The owner steps out holding her own price card — then shakes her head: not on her own. Prices climb while a
// MORTGAGE RATES 7%+ tag appears. September 2026: the middle house's sign reads $417,500 (the typical home), and 39 little
// up-arrows fill a strip (39 months of gains in a row). Then tiny paper houses fill every hill (the whole American market)
// and four paper step cards 1-2-3-4 land on the pavement.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { DayWorld, Street, House, LawnSign, Tag, Cross, Vig, Paper, ROOFS, WALLS, TXT, INK, CORAL, MINT, MUSTARD, PAPER, Life } from './kit'

const HX = [260, 620, 980, 1340, 1700], HY = 860

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const walking = c('s1:walking'), street = c('s1:street'), house1 = c('s1:house'), after = c('s1:after'), house2 = c('s1:house#2'), every = c('s1:every'), price = c('s1:price')
  const picks = c('s2:picks'), guess = c('s2:guess'), owner = c('s2:owner'), okay = c('s2:okay'), surprise = c('s2:surprise'), not = c('s2:not'), own = c('s2:own')
  const thinking = c('s3:thinking'), expensive = c('s3:expensive'), rates = c('s3:rates'), d7 = c('s3:7')
  const september = c('s4:september'), typical = c('s4:typical'), d417 = c('s4:417500'), higher = c('s4:higher'), d39 = c('s4:39th'), row = c('s4:row')
  const need = c('s5:need'), why = c('s5:why'), oneH = c('s5:house'), whole = c('s5:whole'), market = c('s5:market'), four = c('s5:four'), steps = c('s5:steps')

  const walker: Beat[] = [[walking, 'walkA', 'smiling', 'walkB', 9], [price, 'point', 'thinking'], [picks, 'think', 'thinking'], [thinking, 'scratchHead', 'thinking'], [rates, 'shock', 'shocked'], [september, 'idle', 'neutral'], [need, 'present', 'smiling'], [four, 'countA', 'smiling', 'countB', 10]]
  const ownerB: Beat[] = [[owner, 'holdUp', 'smiling'], [surprise, 'crossNoA', 'smiling', 'crossNoB', 9], [own, 'shrug', 'smiling']]
  const walkX = lerp(120, 760, on(f, walking, Math.max(1, price - walking))) // walks along the pavement while s1 plays
  const hp = hand(f, ownerB, HX[2] - 110, HY + 10, 0.62, false)
  const B = on(f, whole - 4, 14)
  const rise = on(f, expensive, 24)

  return (
    <g>
      <DayWorld f={f} id="re-hook" tone="morning" />
      {/* # tiny houses fill the hills: the whole American market */}
      <g opacity={B}>{Array.from({ length: 60 }, (_, i) => { const x = 40 + (i % 20) * 96 + (Math.floor(i / 20) % 2) * 48, y = 700 + Math.floor(i / 20) * 40; return <g key={i} opacity={on(f, whole + (i % 20) * 1.2, 8)}><House x={x} y={y} s={0.16} roof={ROOFS[i % 6]} wall={WALLS[(i + 2) % 6]} /></g> })}</g>
      <Street y={880} />
      {/* # the five houses of Maple Street */}
      {HX.map((x, k) => { const at = [street, house1, after, house2, every][k]; const dim = 1 - 0.55 * win(f, oneH, whole + 10, 10) * (k === 2 ? 0 : 1); return <g key={k} opacity={on(f, at, 10) * dim} transform={`translate(0 ${30 * (1 - pop(f, at, 14))})`}>
        <House x={x} y={HY} s={0.75} roof={ROOFS[k]} wall={WALLS[k]} v={k % 2} />
        <g opacity={on(f, price + k * 3, 8)}>
          <LawnSign x={x + 140} y={HY + 10} s={0.7} t={k === 2 && f >= d417 ? '$417,500' : '$ ?'} r={-3 * rise * (k % 2 ? 1 : -1)} />
        </g>
      </g> })}
      {/* the owner of the middle house with her own price card, then "not on their own" */}
      <g opacity={win(f, owner - 4, rates, 10)}>
        <Person f={f} who="owner" beats={ownerB} x={HX[2] - 110} y={HY + 10} s={0.62} />
        {f >= owner && f < surprise + 4 && <g transform={`translate(${hp.x} ${hp.y - 40}) scale(${pop(f, owner, 12)})`}><Paper d="M-70 -40 L70 -40 L70 40 L-70 40 Z" fill={PAPER} dx={4} dy={5} /><text y={16} textAnchor="middle" fill={INK} style={TXT(46)}>MY PRICE</text></g>}
      </g>
      <g opacity={win(f, picks, okay, 8)}><Tag x={980} y={330} t="WHO PICKS THE PRICE?" size={52} /></g>
      <g opacity={win(f, not, own + 20, 6)}><Tag x={980} y={330} t="NOT THE OWNER ALONE" size={52} col={CORAL} tc="#FFFFFF" /></g>
      {/* rates */}
      <g opacity={win(f, rates, september, 8)} transform={`translate(980 330) scale(${pop(f, rates, 12)})`}><Paper d="M-260 -60 L260 -60 L260 50 L-260 50 Z" fill={CORAL} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(70)}>{f >= d7 ? 'MORTGAGE RATES 7%+' : 'MORTGAGE RATES'}</text></g>
      {/* September 2026: typical home + 39 months in a row */}
      <g opacity={win(f, september, need, 8)}><Tag x={980} y={300} t={f >= typical ? 'TYPICAL HOME · SEPT 2026' : 'SEPTEMBER 2026'} size={46} /></g>
      <g opacity={win(f, higher, need, 8)} transform="translate(560 470)">
        {Array.from({ length: 39 }, (_, i) => <g key={i} opacity={on(f, d39 - 20 + i * 0.8, 4)} transform={`translate(${(i % 13) * 66} ${Math.floor(i / 13) * 56})`}><path d="M0 18 L0 -14 M-12 -2 L0 -16 L12 -2" stroke={MINT} strokeWidth={6} fill="none" strokeLinecap="round" /></g>)}
        <g opacity={on(f, row, 8)}><text x={400} y={200} textAnchor="middle" fill={INK} style={TXT(48)}>39 MONTHS IN A ROW</text></g>
      </g>
      {/* the walker on the pavement */}
      <g opacity={1 - on(f, whole - 4, 10)}><Person f={f} who="hero" beats={walker} x={walkX} y={1060} s={0.55} /></g>
      {/* four step cards */}
      {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, (k === 0 ? four : steps) + k * 4, 8)} transform={`translate(${600 + k * 240} 980) scale(${pop(f, (k === 0 ? four : steps) + k * 4, 12)})`}>
        <Paper d="M-80 -80 L80 -80 L80 40 L-80 40 Z" fill={[CORAL, MUSTARD, MINT, '#5C8FC2'][k]} />
        <text y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(100)}>{k + 1}</text>
      </g>)}
      <g opacity={win(f, why, whole, 8)}><Tag x={980} y={330} t="ONE HOUSE → THE WHOLE MARKET" size={48} /></g>
      <g opacity={on(f, market, 8) * (1 - on(f, four, 8))}><Tag x={980} y={330} t="THE WHOLE AMERICAN MARKET" size={50} /></g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s2:you")} x={980} y={640} kind="glint" />
        <Life f={f} at={c("s3:homes")} x={980} y={330} kind="glint" />
        <Life f={f} at={c("s5:we'll")} x={980} y={720} kind="flutter" />
        <Life f={f} at={c("s5:all")} x={980} y={720} kind="flutter" />
      </g>
      {/* # life:end */}
      <Vig id="re-hook" />
      <Headline f={f} lines={[[walking, 'YOUR STREET', INK, 84], [september, 'PRICES KEEP CLIMBING', INK, 84], [need, 'HOW REAL ESTATE ACTUALLY WORKS', INK, 84]]} />
    </g>
  )
}

export const RE_HOOK = makePiece('re-hook', 'Hook on a morning paper-cut Maple Street: you walk past five houses that each get a FOR SALE sign with a price; WHO PICKS THE PRICE? the owner of the middle house steps out with her own MY PRICE card, then shakes her head — NOT THE OWNER ALONE; signs tilt up as prices climb and a MORTGAGE RATES 7%+ card appears; TYPICAL HOME · SEPT 2026 — the middle sign reads $417,500 — and 39 green up-arrows fill a strip, 39 MONTHS IN A ROW; one house glows, then tiny paper houses fill every hill (THE WHOLE AMERICAN MARKET) and four paper step cards 1-2-3-4 land on the pavement.', {
  mood: 'light', Component: Hook,
  beats: ["s1:walking", "s1:street", "s1:house", "s1:after", "s1:house#2", "s1:every", "s1:price", "s2:picks", "s2:guess", "s2:owner", "s2:okay", "s2:surprise", "s2:not", "s2:own", "s3:thinking", "s3:expensive", "s3:rates", "s3:7", "s4:september", "s4:typical", "s4:417500", "s4:higher", "s4:39th", "s4:row", "s5:need", "s5:why", "s5:house", "s5:whole", "s5:market", "s5:four", "s5:steps", "s2:you", "s3:homes", "s5:we'll", "s5:all"],
  sfx: [['s2:not', 'thud', 0.1], ['s4:417500', 'pop', 0.1], ['s5:four', 'pop', 0.1]] })
