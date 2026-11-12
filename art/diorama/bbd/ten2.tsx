// ---------------------------------------------------------------- s36–s48 (sample redo 2026-10-31, owner rules r55–r57): a cream garden, NO camera moves,
// nothing piles up — each idea replaces the last. One investor + a flipping calendar ("every year") → she splits into two twins on two
// garden plots (SELL / BORROW), each with a $10M money tree. SELL: the borrow side dims; each year a chunk of the tree goes to her basket
// and a slice down a drain to the tax office → $1.13M tax, tree $12.1M; the tax office then leaves. BORROW: the sell side dims; the bank
// sends cash each year, a red loan vine climbs to $5.6M, the tree grows to $19.7M; "take away the loan" cuts the vine off to the bank →
// $14.1M; both plots return, +$2M between the tree tops. Surprise: two piles, $1.13M tax vs $1.59M interest. Why: this year's > $500K
// chunk leaves the sell tree ($400K basket, > $100K drain), old chunks wither; the borrow tree keeps everything and glows. Last: a gauge
// between the trees, ≈ 1.7% — it drops and the sell side lights when growth is below the line.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Headline, Person, Pile, win } from '../aimoney/common'
import { TaxOffice } from './kit'
import { BankHall, Cash, MoneyTree, Pipe } from './world'
import { Street } from './sell'

// # model values (our maths, facts.json): sell-path shares by year, borrow-path shares and loan
const SELL = [10, 10.16, 10.32, 10.5, 10.68, 10.88, 11.09, 11.32, 11.56, 11.82, 12.1]
const at = (arr: number[], t: number) => { const u = Math.max(0, Math.min(1, t)) * (arr.length - 1), i = Math.min(arr.length - 2, Math.floor(u)); return lerp(arr[i], arr[i + 1], u - i) }
const size = (v: number) => v / 19.7 // # tree size in proportion to the money (19.7M = full size)

const Ten: React.FC<PieceProps> = ({ f, c }) => {
  const little = c('s36:little'), test = c('s36:test'), every = c('s36:every'), both = c('s37:both'), ten = c('s37:ten')
  const money = c('s38:money'), d400 = c('s38:400000'), d7 = c('s38:7'), example = c('s38:example')
  const selling = c('s39:selling'), sells = c('s39:sells'), tax39 = c('s39:tax'), d113 = c('s40:113'), d121 = c('s40:121')
  const borrowing = c('s41:borrowing'), borrows = c('s41:borrows'), interest = c('s41:interest')
  const d56 = c('s42:56'), touched = c('s43:touched'), d197 = c('s43:197'), take = c('s44:take'), d141 = c('s44:141'), d2 = c('s45:2'), more = c('s45:more')
  const surprise = c('s46:surprise'), i159 = c('s46:159'), t113 = c('s46:113'), how = c('s47:how'), keep = c('s47:keep')
  const out500 = c('s47a:500000'), spend = c('s47a:400000'), tax100 = c('s47a:100000'), gone = c('s47b:gone'), earned = c('s47b:earned'), nothing = c('s47c:nothing'), grow47 = c('s47c:growing')
  const maths48 = c('s48:maths'), d17 = c('s48:17'), below = c('s48:below'), falling = c('s48:falling')
  // # word reactions: a short swell (0→1→0 over 14 frames) on the word that names the thing
  const pulse = (k: number) => { const t = f - k; return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 }
  const pp = (...ks: string[]) => Math.max(...ks.map((k) => pulse(c(k))))
  const both38 = pp('s38:shares', 's38:grow')
  const sellSwell = 1 + 0.07 * Math.max(both38, pp('s39:on', 's39:gain', 's39:sale', 's40:ends', 's47a:selling', 's47a:takes', 's48:left')), borSwell = 1 + 0.07 * Math.max(both38, pp('s41:never', 's47c:takes', 's47:borrowing', 's47:shares', 's47c:all', 's47c:stay', 's47c:invested', 's48:borrowing'))
  const calSwell = 1 + 0.15 * pp('s37:maths', 's40:ten', 's42:years'), vineSwell = 1 + 0.6 * pp('s41:pays', 's41:growing', 's42:loan'), basketSwell = 1 + 0.18 * pp('s38:way', 's41:400000')
  // # fixed big framing (no camera): plots at 560 / 1360, trees drawn large, twins at the outer edges, the "third party"
  // # (tax office or bank) in the middle only while it is being talked about, values on plaques under each tree
  const LX = 560, RX = 1360, GY = 900, TW_L = 175, TW_R = 1790, TS = 1.55, MID = 960
  // # the ten years: SELL runs "sells" → "12.1", BORROW runs "borrows" → "19.7"
  const sellT = span(f, sells, d121), borT = span(f, borrows, d197)
  const sellV = at(SELL, sellT), stockV = 10 * Math.pow(1.07, borT * 10), debtV = lerp(0, 5.59, borT)
  const netCut = on(f, take, 24)
  const rightV = lerp(stockV, 14.08, netCut)
  // # the calendar: flips 1→10 on "every year", reads 10 YEARS on "ten", then counts each path's years
  const year = f < ten ? Math.max(1, Math.ceil(span(f, every, every + 40) * 10)) : f < selling ? 10 : f < borrowing ? Math.max(1, Math.ceil(sellT * 10)) : Math.max(1, Math.ceil(borT * 10))
  const calO = on(f, little, 8) * (1 - on(f, d141, 10))
  // # focus: while one path is told, the other plot dims (nothing else is added to it)
  const sellFocus = win(f, selling, borrowing, 12), borFocus = win(f, borrowing, d2, 12)
  const dimL = 1 - 0.65 * borFocus, dimR = 1 - 0.65 * sellFocus
  // # the twins: one investor splits into two on "both"
  const split = easeInOut(on(f, both, 18))
  const one: Beat[] = [[0, 'idle', 'neutral'], [test, 'present', 'thinking'], [every, 'countA', 'neutral', 'countB', 12]]
  const twinL: Beat[] = [[0, 'idle', 'neutral'], [selling, 'carry', 'neutral'], [tax39, 'emptyPockets', 'worried'], [d121, 'shrug', 'neutral'], [t113, 'point', 'neutral'], [spend, 'receive', 'neutral'], [gone, 'despair', 'worried'], [below, 'confident', 'smiling']]
  const twinR: Beat[] = [[0, 'idle', 'neutral'], [borrowing, 'receive', 'smiling'], [interest, 'countA', 'neutral', 'countB', 14], [d197, 'shock', 'shocked'], [take, 'offer', 'neutral'], [more, 'fistPump', 'smiling'],
    [i159, 'oops', 'worried'], [keep, 'holdChest', 'smiling'], [grow47, 'celebrate', 'smiling'], [falling, 'nervous', 'worried']]
  const treeTop = (v: number) => GY - 470 * size(v) * TS
  const crownY = (v: number) => GY - 300 * size(v) * TS
  // # a plot: a soil bed and a plaque under the tree with the path's name and, once it is said, its value
  const plot = (x: number, label: string, color: string, value: string, valueO: number) => <g>
    <rect x={x - 290} y={GY - 6} width={580} height={30} rx={10} fill="#B98B5E" />
    <g transform={`translate(${x} ${GY + 78})`}><rect x={-140} y={-52} width={280} height={104} rx={14} fill={color} />
      <Label x={0} y={valueO > 0.5 ? -12 : 16} text={label} size={valueO > 0.5 ? 36 : 48} font="Bebas Neue" color={P.navy0} />
      <g opacity={valueO}><Label x={0} y={36} text={value} size={52} font="Bebas Neue" color={P.navy0} /></g></g>
  </g>
  const basket = (x: number, lbl: number) => <g transform={`translate(${x} ${GY}) scale(${basketSwell})`}><path d="M-60 -70 L60 -70 L46 0 L-46 0 Z" fill="#C98F5A" /><path d="M-60 -70 L60 -70" stroke="#7A4E2D" strokeWidth={8} />
    <g opacity={lbl}><Label x={0} y={-92} text="$400K / YR" size={40} font="Bebas Neue" color={P.goldInk} /></g></g>
  // # this year's chunk on the sell path: from the crown, most to her hands, a slice down the drain to the tax office
  const yearPhase = (sellT * 10) % 1
  return (
    <g>
      <Stage id="bn3" frame={f} />
      <Street f={f} />
      {/* # the calendar in the sky (big and alone at first: "one year proves very little … every year"), then smaller above the plots */}
      <g opacity={calO} transform={`translate(${MID} ${lerp(330, 270, split)}) scale(${lerp(1.4, 0.95, split) * calSwell})`}>
        <rect x={-110} y={-70} width={220} height={140} rx={14} fill={P.white} /><rect x={-110} y={-70} width={220} height={40} rx={14} fill={P.coral} /><rect x={-110} y={-44} width={220} height={14} fill={P.coral} />
        <Label x={0} y={52} text={f >= ten && f < selling ? '10 YEARS' : `YEAR ${year}`} size={54} font="Bebas Neue" color={P.navy0} />
      </g>
      {/* # one investor first; on "both" she becomes two twins walking out to the outer edges */}
      <g opacity={on(f, little, 8) * (1 - split)}><Person f={f} who="investorF" beats={one} x={MID} y={1050} s={0.95} /></g>
      {/* # the two plots grow in on "both ways" */}
      <g opacity={split}>
        <g opacity={dimL}>
          {plot(LX, 'SELL', P.coral, '$12.1M', on(f, d121, 8))}
          <MoneyTree x={LX} y={GY} size={size(f < selling ? 10 : sellV) * split} s={TS * sellSwell} />
        </g>
        <g opacity={dimR}>
          {plot(RX, 'BORROW', P.mint, f >= d141 ? '$14.1M' : '$19.7M', on(f, d197, 8))}
          <MoneyTree x={RX} y={GY} size={size(f < borrowing ? 10 : rightV) * split} s={TS * borSwell} />
        </g>
      </g>
      {/* # s38: a basket beside each twin ($400K a year), then "+7% a year" between the trees, then "AN EXAMPLE" replaces it */}
      <g opacity={win(f, d400, selling, 8)}>{basket(330, on(f, d400, 8) * (1 - on(f, d7, 8)))}{basket(1630, on(f, d400, 8) * (1 - on(f, d7, 8)))}</g>
      <g opacity={win(f, d7, example, 8)}><Label x={MID} y={620} text="+7% A YEAR" size={64} font="Bebas Neue" color={P.mintInk} /></g>
      <g opacity={win(f, example, selling, 8)} transform={`translate(${MID} 600) scale(${1 + 0.15 * pp('s38:promise')})`}><rect x={-130} y={-36} width={260} height={72} rx={36} fill={P.sky} /><Label x={0} y={18} text="AN EXAMPLE" size={44} font="Bebas Neue" color={P.navy0} /></g>
      {/* # SELL: the tax office stands in the middle only for this part; each year a chunk leaves the crown → her hands + a slice down the drain */}
      <g opacity={win(f, selling, borrowing, 10)}>
        <TaxOffice x={MID} y={GY} s={0.55} eat={on(f, tax39, 8)} />
        <Pipe a={[LX + 120, GY - 30]} b={[MID - 110, GY - 110]} f={f} open={1} flow={on(f, tax39, 8) * (1 - on(f, d121, 8))} />
        {f > sells && f < d121 && <g opacity={Math.sin(Math.PI * yearPhase)}><circle cx={lerp(LX - 60, TW_L + 70, yearPhase)} cy={lerp(crownY(sellV), GY - 200, yearPhase)} r={32} fill={P.gold} /><circle cx={lerp(LX + 60, MID - 110, yearPhase)} cy={lerp(crownY(sellV), GY - 110, yearPhase)} r={14} fill={P.coral} /></g>}
        <g opacity={on(f, c('s40:adds'), 8)} transform={`translate(${MID} ${GY + 70}) scale(${1 + 0.18 * pp('s40:tax')}) translate(${-MID} ${-(GY + 70)})`}><Pile x={MID} y={GY + 70} n={span(f, c('s40:adds'), d113 + 10) * 7} s={0.7} /></g>
        <g opacity={on(f, d113, 8)}><Label x={MID} y={GY - 300} text="$1.13M TAX" size={54} font="Bebas Neue" color={P.coralInk} /></g>
      </g>
      {/* # BORROW: the bank stands in the middle only for this part; cash flies to her each year; the loan vine climbs on her side; "take away the loan" sends it to the bank */}
      <g opacity={win(f, borrowing, d2, 10)}>
        <BankHall x={MID} y={GY} s={0.55} lit={on(f, borrows, 8)} />
        {f > borrows && f < d197 && <Cash x={lerp(MID + 60, TW_R - 70, (borT * 10) % 1)} y={GY - 260 - Math.sin(Math.PI * ((borT * 10) % 1)) * 220} s={0.7} />}
        <g opacity={on(f, interest, 8) * (1 - netCut)}>
          <rect x={RX + 285} y={GY - 460} width={10} height={460} fill="#7A4E2D" />
          <path d={`M${RX + 290} ${GY} ${Array.from({ length: 12 }, (_, k) => `Q ${RX + 290 + (k % 2 ? 28 : -28)} ${GY - (k + 0.5) * 38 * (debtV / 5.59)} ${RX + 290} ${GY - (k + 1) * 38 * (debtV / 5.59)}`).join(' ')}`} stroke={P.coral} strokeWidth={14 * vineSwell} fill="none" strokeLinecap="round" />
          {(() => { const u = span(f, c('s41:more'), c('s41:more') + 18); return u > 0 && u < 1 ? <circle cx={lerp(MID + 60, RX + 290, u)} cy={GY - 300 - Math.sin(Math.PI * u) * 120} r={22} fill={P.coral} /> : null })()}
          <g opacity={on(f, d56, 8)}><Label x={1775} y={Math.max(390, GY - 456 * (debtV / 5.59) + 10)} text="$5.6M LOAN" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {f >= take && f < take + 36 && <g opacity={1 - span(f, take + 26, take + 36)}>{(() => { const u = easeInOut(span(f, take, take + 30)), x = lerp(RX + 290, MID, u), y = lerp(GY - 300, GY - 240, u)
          return <g><circle cx={x} cy={y} r={70} fill={P.coral} /><Label x={x} y={y + 14} text="$5.6M" size={40} font="Bebas Neue" color={P.white} /></g> })()}</g>}
      </g>
      {/* # s45: both plots back; +$2M between the tree tops */}
      <g opacity={win(f, d2, surprise, 8)}>
        <path d={`M${LX + 170} ${treeTop(12.1)} L${RX - 170} ${treeTop(12.1)}`} stroke={P.ink2} strokeWidth={4} strokeDasharray="12 10" />
        <path d={`M${RX - 190} ${treeTop(12.1)} L${RX - 190} ${treeTop(14.08)}`} stroke={P.mint} strokeWidth={12} />
        <Label x={MID} y={treeTop(13.1) - 20} text="+$2M" size={72} font="Bebas Neue" color={P.mintInk} />
      </g>
      {/* # s46 the surprise: two piles in the middle — tax $1.13M vs interest $1.59M (the interest pile is bigger) */}
      <g opacity={win(f, surprise, how, 10)}>
        <g opacity={on(f, t113, 8)} transform={`translate(820 ${GY + 60}) scale(${1 + 0.15 * pp('s46:tax')}) translate(-820 ${-(GY + 60)})`}><Pile x={820} y={GY + 60} n={on(f, t113, 16) * 7} s={0.7} /><Label x={820} y={GY - 110} text="$1.13M TAX" size={44} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, i159, 8)} transform={`translate(1000 ${GY + 60}) scale(${1 + 0.15 * pp('s46:interest', 's46:more')}) translate(-1000 ${-(GY + 60)})`}><Pile x={1000} y={GY + 60} n={span(f, i159, c('s46:interest') + 12) * 10} s={0.7} /><Label x={1000} y={GY - 170} text="$1.59M INTEREST" size={44} font="Bebas Neue" color={P.coralInk} /></g>
      </g>
      {/* # s47 why: this year's > $500K chunk leaves the sell crown ($400K to her, > $100K down the drain to the tax office); then old chunks wither */}
      <g opacity={win(f, out500, nothing, 10)}>
        <TaxOffice x={MID} y={GY} s={0.55} o={on(f, tax100, 8)} eat={on(f, tax100, 8)} />
        {(() => { const u = easeInOut(span(f, out500, out500 + 20)), v = easeInOut(span(f, spend, spend + 20)), w = easeInOut(span(f, tax100, tax100 + 24))
          const cx = lerp(LX, LX + 60, u), cy = lerp(crownY(12.1), treeTop(12.1) - 30, u)
          return <g>
            {f < spend && <g><circle cx={cx} cy={cy} r={60} fill={P.gold} /><Label x={cx} y={cy - 82} text="> $500K OUT" size={50} font="Bebas Neue" color={P.coralInk} /></g>}
            {f >= spend && <circle cx={lerp(cx, TW_L + 70, v)} cy={lerp(cy, GY - 200, v)} r={48} fill={P.gold} />}
            {f >= spend && f < gone + 20 && <circle cx={lerp(cx + 40, MID - 110, w)} cy={lerp(cy, GY - 110, w)} r={24} fill={P.coral} opacity={1 - span(f, gone, gone + 20)} />}
          </g> })()}
        <g opacity={on(f, gone, 8)}>{[0, 1, 2, 3].map((k) => <circle key={k} cx={LX - 160 + k * 46} cy={GY - 18} r={20 * (1 + 0.3 * pp('s47b:years', 's47b:after'))} fill={lerp(0, 1, on(f, earned, 20)) > 0.5 ? '#8E844F' : P.gold} />)}</g>
      </g>
      {/* # s47c: borrowing takes nothing out — the borrow crown glows while it keeps growing */}
      <g opacity={win(f, nothing, maths48, 10)}><circle cx={RX} cy={crownY(14.08)} r={250} fill={P.mint} opacity={0.18 + 0.06 * Math.sin(f / 6)} /></g>
      {/* # s48: a gauge in the middle — it fills as the shares grow; borrowing wins above ≈ 1.7%; below it (or falling) it drops and the sell side lights */}
      <g opacity={on(f, maths48, 8)} transform={`translate(${MID} ${GY - 120})`}>
        {(() => { const g = lerp(lerp(0.1, 0.8, easeInOut(span(f, c('s48:shares'), c('s48:grew') + 14))), lerp(lerp(0.35, 0.22, on(f, falling, 12)), 0.1, on(f, c('s48:market'), 12)), on(f, below, 16)); return <g>
          <rect x={-34} y={-340} width={68} height={340} rx={22} fill="#1B2233" />
          <rect x={-25} y={-340 * g + 9} width={50} height={340 * g - 18} rx={16} fill={g > 0.4 ? P.mint : P.coral} />
          <path d="M-64 -136 L64 -136" stroke={P.ink} strokeWidth={6} opacity={on(f, d17, 8)} /><Label x={-150} y={-120} text="≈ 1.7%" size={56} font="Bebas Neue" color={P.goldInk} o={on(f, d17, 8)} />
        </g> })()}
      </g>
      <g opacity={on(f, c('s48:selling'), 10)}><circle cx={LX} cy={crownY(12.1)} r={230} fill={P.gold} opacity={0.18} /></g>
      {/* # the twins stand at the outer edges (never in front of a tree, a pile, the gauge or the middle building) */}
      <g opacity={split}>
        <g opacity={dimL}><Person f={f} who="investorF" beats={twinL} x={lerp(MID, TW_L, split)} y={1050} s={0.95} /></g>
        <g opacity={dimR}><Person f={f} who="investorF" beats={twinR} x={lerp(MID, TW_R, split)} y={1050} s={0.95} /></g>
      </g>
      <Headline f={f} lines={[[test, 'THE REAL TEST', P.ink, 124], [both, 'BOTH WAYS, 10 YEARS', P.ink, 116], [d400, '$400K A YEAR', P.ink, 116], [d7, '7% GROWTH A YEAR', P.ink, 116],
        [selling, 'SELL', P.coralInk, 136], [borrowing, 'BORROW', P.mintInk, 136], [more, '≈ $2M MORE', P.mintInk, 136], [surprise, 'THE SURPRISE', P.goldInk, 130], [how, 'WHY BORROWING WON', P.ink, 116], [d17, 'THE LINE: ≈ 1.7% A YEAR', P.ink, 100]]} />
      <Vignette id="bn3" />
    </g>
  )
}

const BEATS: string[] = ['s38:shares', 's38:grow', 's39:on', 's40:ends', 's47a:selling', 's47a:takes', 's41:never', 's47c:takes', 's37:maths', 's41:pays', 's38:way', 's41:400000', 's38:promise', 's40:tax', 's47b:years', 's47b:after', 's39:gain', 's39:sale', 's40:ten', 's40:adds', 's41:more', 's41:growing', 's42:years', 's42:loan', 's46:interest', 's46:more', 's46:tax', 's47:borrowing', 's47:shares', 's47c:all', 's47c:stay', 's47c:invested', 's48:borrowing', 's48:shares', 's48:grew', 's48:market', 's48:selling', 's48:left', 's36:little', 's36:test', 's36:every', 's37:both', 's37:ten', 's38:money', 's38:400000', 's38:7', 's38:example', 's39:selling', 's39:sells', 's39:tax', 's40:113', 's40:121',
  's41:borrowing', 's41:borrows', 's41:interest', 's42:56', 's43:touched', 's43:197', 's44:take', 's44:141', 's45:2', 's45:more', 's46:surprise', 's46:159', 's46:113', 's47:how', 's47:keep',
  's47a:500000', 's47a:400000', 's47a:100000', 's47b:gone', 's47b:earned', 's47c:nothing', 's47c:growing', 's48:maths', 's48:17', 's48:below', 's48:falling']
export const BB2_TEN = makePiece('bb2-ten', 'Long (sample redo, cream, no camera): one investor + calendar → twins on two plots; sell tree cut yearly ($12.1M, $1.13M tax) vs borrow tree $19.7M with a $5.6M loan vine → $14.1M (+$2M); tax vs interest piles; why; ≈1.7% gauge', {
  mood: 'light', Component: Ten, beats: BEATS,
  sfx: [['s39:selling', 'whoosh', 0.4], ['s43:197', 'riser', 0.3], ['s44:take', 'swish', 0.4], ['s45:more', 'ding', 0.5], ['s46:surprise', 'impact', 0.5], ['s47a:500000', 'cash', 0.4], ['s48:17', 'click', 0.4]] })
