// ---------------------------------------------------------------- s36–s48: ten years, both ways (our maths): spend $400K a year, shares grow 7% (example).
// Selling: ≈ $1.13M tax, ends with ≈ $12.1M of shares. Borrowing: loan grows to ≈ $5.6M, shares ≈ $19.7M, net ≈ $14.1M → ≈ $2M more.
// Interest ≈ $1.59M > tax ≈ $1.13M — the win is the shares kept: each year selling takes out > $500K ($400K + > $100K tax).
// Borrowing stayed ahead above ≈ 1.7% a year growth; below that, or in a falling market, selling leaves more.
import React from 'react'
import { lerp, on, P, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, fly, Headline, Person, Pile, Prop as Prop0, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Bar, Example, Stack, Tag, TaxOffice , Accents, xcam, punch, type Acc } from './kit'

const PX = 26 // # pixels per $1M on the race bars
// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s38:money', 's38:way', 's40:ends', 's41:borrowing', 's42:years', 's46:interest', 's46:selling', 's47b:years', 's47c:all', 's41:year', 's41:more', 's47a:year', 's36:little', 's39:gain', 's40:ten', 's48:maths', 's48:borrowing', 's48:grew', 's36:test', 's36:every', 's37:both', 's37:ten', 's37:maths', 's38:less', 's38:400000', 's38:7', 's38:example', 's38:promise', 's39:selling', 's39:sells', 's39:tax', 's40:113', 's40:121',
    's41:borrowing', 's41:never', 's41:borrows', 's41:interest', 's41:growing', 's42:56', 's43:touched', 's43:197', 's44:take', 's44:141', 's45:2', 's45:more', 's46:surprise', 's46:159', 's46:113',
    's47:how', 's47:ahead', 's48:selling', 's47:keep', 's47a:500000', 's47a:400000', 's47a:100000', 's47b:gone', 's47b:earned', 's47c:nothing', 's47c:invested', 's47c:growing', 's48:17', 's48:below', 's48:falling', 's48:more#2']
const Ten: React.FC<PieceProps> = ({ f, c }) => {
  const oneYr = c('s36:little'), little = c('s36:little'), test = c('s36:test'), every = c('s36:every'), both = c('s37:both'), ten = c('s37:ten'), maths = c('s37:maths')
  const less = c('s38:less'), d400 = c('s38:400000'), d7 = c('s38:7'), example = c('s38:example'), promise = c('s38:promise')
  const selling = c('s39:selling'), sells = c('s39:sells'), tax39 = c('s39:tax'), d113 = c('s40:113'), d121 = c('s40:121')
  const borrowing = c('s41:borrowing'), never = c('s41:never'), borrows = c('s41:borrows'), interest = c('s41:interest'), growing = c('s41:growing')
  const d56 = c('s42:56'), touched = c('s43:touched'), d197 = c('s43:197'), take = c('s44:take'), d141 = c('s44:141'), d2 = c('s45:2'), more = c('s45:more')
  const surprise = c('s46:surprise'), i159 = c('s46:159'), t113 = c('s46:113'), ahead = c('s47:ahead'), sell48 = c('s48:selling'), how = c('s47:how'), keep = c('s47:keep')
  const out500 = c('s47a:500000'), spend = c('s47a:400000'), tax100 = c('s47a:100000'), gone = c('s47b:gone'), earned = c('s47b:earned'), nothing = c('s47c:nothing'), invested = c('s47c:invested'), grow47 = c('s47c:growing')
  const gain39 = c('s39:gain'), ten40 = c('s40:ten'), maths48 = c('s48:maths'), bor48 = c('s48:borrowing'), grew48 = c('s48:grew'), d17 = c('s48:17'), below = c('s48:below'), falling = c('s48:falling'), more48 = c('s48:more#2')
  const A = win(f, c('s36'), selling), B = win(f, selling, surprise), Cc = win(f, surprise, how), D = win(f, how, c('s48')), E = on(f, c('s48'), 8)
  const hero: Beat[] = [[0, 'present', 'neutral'], [little, 'shrug', 'neutral'], [every, 'explain', 'neutral'], [maths, 'pointUp', 'neutral'], [d400, 'countOne', 'neutral'], [promise, 'stop', 'neutral'],
    [selling, 'present', 'neutral'], [d121, 'explain', 'neutral'], [borrowing, 'present', 'neutral'], [d197, 'shock', 'shocked'], [take, 'explain', 'neutral'], [more, 'celebrate', 'smiling'],
    [surprise, 'scratchHead', 'thinking'], [i159, 'shock', 'shocked'], [how, 'think', 'thinking'], [keep, 'pointUp', 'smiling'], [out500, 'explain', 'neutral'], [gone, 'facepalm', 'worried'],
    [nothing, 'stop', 'neutral'], [grow47, 'celebrate', 'smiling'], [d17, 'measure', 'neutral'], [falling, 'nervous', 'worried']]
  // # years tick 1→10 on each race; bar heights in $M follow our model's year-end values (sell path / borrow path)
  const sellYr = span(f, sells, d121), borYr = span(f, borrows, d197)
  const SELL = [10, 10.16, 10.32, 10.5, 10.68, 10.88, 11.09, 11.32, 11.56, 11.82, 12.1]
  const at = (arr: number[], t: number) => { const u = t * (arr.length - 1), i = Math.min(arr.length - 2, Math.floor(u)); return lerp(arr[i], arr[i + 1], u - i) }
  const sellH = at(SELL, sellYr) * PX, stockH = 10 * Math.pow(1.07, borYr * 10) * PX, debtH = lerp(0, 5.59, borYr) * PX
  const yearSell = Math.max(1, Math.ceil(sellYr * 10)), yearBor = Math.max(1, Math.ceil(borYr * 10))
  const net = on(f, take, 16)
  const invB: Beat[] = [[0, 'idle', 'neutral'], [sells, 'offer', 'neutral'], [tax39, 'emptyPockets', 'worried'], [d121, 'shrug', 'neutral'], [borrowing, 'receive', 'smiling'],
    [interest, 'countA', 'neutral', 'countB', 14], [d197, 'shock', 'shocked'], [take, 'explain', 'neutral'], [more, 'fistPump', 'smiling']]
  const invD: Beat[] = [[0, 'idle', 'neutral'], [out500, 'receive', 'neutral'], [tax100, 'emptyPockets', 'worried'], [gone, 'despair', 'worried'], [nothing, 'holdChest', 'smiling'], [grow47, 'celebrate', 'smiling']]
  const chunk = (k: number) => fly(f, out500 + k * 3, [1380, 640], k === 0 ? [1080, 720] : [1720, 820], 22, 120)
  const XC = xcam(c, [["s38:money",1240,640,1.04],["s38:way",960,540,1],["s40:ends",1060,700,1.06],["s41:borrowing",960,540,1],["s42:years",1500,620,1.05],["s46:interest",1100,760,1.06],["s46:selling",1500,760,1.06],["s47b:years",1380,760,1.05],["s47c:all",960,540,1]])
  const XA: Acc[] = [["s41:year","cash-stack",1660,880,70,"s42:56"],["s41:more","interest-percent",1660,400,70,"s43:touched"],["s47a:year","calendar",1100,480,100,"s47b:gone"]]
  return (
    <g>
      <Stage id="bn" frame={f} />
      <Headline f={f} lines={[[test, 'THE REAL TEST', P.ink, 130], [ten, '10 YEARS, BOTH WAYS', P.ink, 120], [d400, '$400K A YEAR', P.ink, 120], [d7, '$400K A YEAR · 7% GROWTH', P.ink, 100],
        [selling, 'SELL', P.coralInk, 140], [borrowing, 'BORROW', P.mintInk, 140], [more, '≈ $2M MORE', P.mintInk, 140], [surprise, 'THE SURPRISE', P.goldInk, 130],
        [how, 'WHY BORROWING WON', P.ink, 120], [d17, 'THE LINE: ≈ 1.7% A YEAR', P.ink, 104]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [oneYr, 1240, 600, 1.03], [selling, 960, 540, 1], [surprise, 1240, 620, 1.04], [how, 960, 540, 1]])}>
        {/* # A: one calendar page (one year) → many; two roads, SELL and BORROW; our maths (calculator); $400K a year, 7% (EXAMPLE) */}
        <g opacity={A}>
          <At f={f} at={oneYr} x={1240} y={560}><Prop id="calendar" x={0} y={0} size={200} f={f} /></At>
          <g opacity={on(f, every, 6) * (1 - on(f, both, 8))}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, every + k * 3, 4)}><Prop id="calendar" x={900 + k * 160} y={840} size={110} f={f} /></g>)}</g>
          <g opacity={on(f, both, 6) * (1 - on(f, d400, 8))}>
            <At f={f} at={both} x={1060} y={860}><Stack x={0} y={0} n={8} basis={1} /></At><Tag f={f} at={both} x={1060} y={1050} text="SELL" size={60} color={P.coralInk} />
            <At f={f} at={both} x={1520} y={860}><Stack x={0} y={0} n={8} basis={1} /></At><Tag f={f} at={both} x={1520} y={1050} text="BORROW" size={60} color={P.mintInk} />
            <At f={f} at={maths} x={1290} y={480}><Prop id="calculator" x={0} y={0} size={140} f={f} /></At>
          </g>
          <g opacity={on(f, d400, 6)}>
            <At f={f} at={d400} x={1100} y={640}><Prop id="cash-stack" x={0} y={0} size={200} f={f} /></At><Tag f={f} at={d400} x={1100} y={790} text="$400K / YEAR" size={56} color={P.goldInk} />
            <At f={f} at={d7} x={1520} y={640}><Prop id="arrow-up" x={0} y={0} size={180} f={f} /></At><Tag f={f} at={d7} x={1520} y={790} text="+7% / YEAR" size={56} color={P.mintInk} />
            <Example f={f} at={example} x={1300} y={900} />
          </g>
        </g>
        {/* # B: the race — sell bar (gold) climbs slowly while a tax pile grows beside it; borrow bar climbs higher with a red loan on top; take the loan away → net; the +$2M gap */}
        <g opacity={B}>
          <Bar x={1060} y={980} h={sellH} color={P.gold} value={f >= d121 ? '$12.1M' : ''} label="SELL" />
          <Tag f={f} at={sells} x={1280} y={300} text={`YEAR ${f < borrowing ? yearSell : yearBor}`} size={56} color={P.ink2} o={1 - on(f, take, 6)} />
          <g opacity={on(f, tax39, 6)}><At f={f} at={tax39} x={820} y={960} s={0.45}><TaxOffice x={0} y={0} eat={(Math.sin(f / 6) + 1) / 2 * (1 - on(f, d121, 6))} /></At>
            <Pile x={820} y={800} n={sellYr * 9} s={0.6} /><Tag f={f} at={d113} x={820} y={690} text="$1.13M TAX" size={46} color={P.coralInk} /></g>
          {(() => { const k = fly(f, gain39, [1060, 980 - sellH], [820, 860], 18, 100); return k.o > 0 ? <g opacity={k.o} transform={`translate(${k.x} ${k.y})`}><Pile x={0} y={0} n={2} s={0.6} /></g> : null })()}
          <Tag f={f} at={ten40} x={1280} y={360} text="10 YEARS" size={44} color={P.ink2} o={1 - on(f, borrowing, 6)} />
          <g opacity={on(f, borrowing, 6)}>
            <Bar x={1500} y={980} h={lerp(stockH, stockH - debtH, net)} color={P.gold} value={f >= d141 ? '$14.1M' : f >= d197 ? '$19.7M' : ''} label="BORROW" />
            <g opacity={1 - net}><rect x={1410} y={980 - stockH} width={180} height={debtH} rx={10} fill={P.coral} opacity={on(f, interest, 8)} /></g>
            {debtH > 30 && <Label56 x={1500} y={980 - stockH + debtH / 2 + 18} text={f >= d56 ? '$5.6M LOAN' : 'LOAN'} o={(1 - net) * on(f, interest, 8)} />}
            
            <At f={f} at={never} x={1640} y={720}><Prop id="padlock" x={0} y={0} size={70} f={f} /></At>
            <At f={f} at={touched} x={1640} y={580}><Prop id="tick" x={0} y={0} size={60} f={f} /></At>
            {(() => { const k = fly(f, take + 2, [1500, 980 - stockH + debtH / 2], [1820, 1000], 18, 80); return k.o > 0 && k.t < 1 ? <rect x={k.x - 90} y={k.y - debtH / 2} width={180} height={debtH} rx={10} fill={P.coral} opacity={k.o} /> : null })()}
          </g>
          <g opacity={on(f, sells, 8)}><ellipse cx={1730} cy={820} rx={140} ry={240} fill="#F7FAFF" opacity={0.10} /><Person f={f} who="investor" beats={invB} x={1730} y={1040} s={0.8} /></g>
          <g opacity={on(f, d2, 6)}><path d={`M1150 ${980 - 12.1 * PX} L1410 ${980 - 12.1 * PX}`} stroke={P.ink2} strokeWidth={4} strokeDasharray="10 8" />
            <path d={`M1280 ${980 - 12.1 * PX} L1280 ${980 - 14.08 * PX}`} stroke={P.mint} strokeWidth={10} /><Tag f={f} at={d2} x={1280} y={980 - 14.08 * PX - 30} text="+$2M" size={60} color={P.mintInk} /></g>
        </g>
        {/* # C: the surprise — interest paid ($1.59M) is a taller pile than the tax on the selling path ($1.13M) */}
        <g opacity={Cc}>
          <g opacity={on(f, i159, 6)}><Bar x={1100} y={960} h={on(f, i159, 16) * 1.59 * 160} color={P.coral} value="$1.59M" label="INTEREST" /></g>
          <g opacity={on(f, t113, 6)}><Bar x={1500} y={960} h={on(f, t113, 16) * 1.13 * 160} color={P.coral} value="$1.13M" label="TAX (SELL)" /></g>
          <At f={f} at={surprise} x={1300} y={420}><Prop id="exclamation" x={0} y={0} size={110} f={f} /></At>
        </g>
        {/* # D: why — each year selling pulls > $500K of shares out: $400K to her wallet, > $100K to the tax office; those shares (and their growth) are gone;
            # borrowing takes nothing out — every share stays in and a money tree keeps growing */}
        <g opacity={D}>
          <g opacity={1 - on(f, nothing, 8)}>
            <At f={f} at={ahead} x={1720} y={520} o={1 - on(f, out500, 6)}><Prop id="trophy" x={0} y={0} size={140} f={f} /></At>
            <At f={f} at={keep} x={1380} y={980}><Stack x={0} y={0} n={10} basis={1} /></At>
            <ellipse cx={860} cy={820} rx={140} ry={240} fill="#F7FAFF" opacity={0.10} /><Person f={f} who="investor" beats={invD} x={860} y={1040} s={0.9} />
            {[0, 1].map((k) => { const p = chunk(k); return p.o > 0 ? <g key={k} opacity={p.o} transform={`translate(${p.x} ${p.y})`}><rect x={-110} y={-22} width={220} height={44} rx={8} fill={P.gold} /></g> : null })}
            <Tag f={f} at={out500} x={1380} y={520} text="> $500K OUT" size={60} color={P.coralInk} />
            <At f={f} at={spend} x={1080} y={720}><Prop id="wallet" x={0} y={0} size={100} f={f} /></At><Tag f={f} at={spend} x={1080} y={830} text="$400K" size={52} />
            <At f={f} at={tax100} x={1720} y={980} s={0.5}><TaxOffice x={0} y={0} eat={1} /></At><Tag f={f} at={tax100} x={1720} y={790} text="> $100K" size={52} color={P.coralInk} />
            <At f={f} at={earned} x={1720} y={600} s={0.9} o={1 - span(f, earned + 10, earned + 30) * 0.7}><Prop id="seedling" x={0} y={0} size={140} f={f} /><path d="M-60 -60 L60 60" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={on(f, earned + 8, 6)} /></At>
            <g opacity={on(f, gone, 6)}><rect x={1255} y={980 - 10 * 26 - 62} width={250} height={44} rx={8} fill="none" stroke={P.coralInk} strokeWidth={4} strokeDasharray="12 10" /></g>
          </g>
          <g opacity={on(f, nothing, 6)}>
            <At f={f} at={nothing} x={1140} y={980}><Stack x={0} y={0} n={12} basis={1} /></At>
            <ellipse cx={860} cy={820} rx={140} ry={240} fill="#F7FAFF" opacity={0.10} /><Person f={f} who="investor" beats={invD} x={860} y={1040} s={0.9} />
            <At f={f} at={invested} x={1140} y={560}><Prop id="padlock" x={0} y={0} size={110} f={f} /></At>
            <g opacity={on(f, grow47, 6)} transform={`translate(1580 940) scale(${lerp(0.5, 1.15, on(f, grow47, 30))})`}><Prop id="money-tree" x={0} y={-160} size={320} f={f} /></g>
          </g>
        </g>
        {/* # E: a growth gauge — above the ≈ 1.7% line borrowing wins (mint), below it selling wins (coral); a falling arrow */}
        <g opacity={E}>
          <At f={f} at={maths48} x={1720} y={400}><Prop id="calculator" x={0} y={0} size={120} f={f} /></At>
          <At f={f} at={grew48} x={1520} y={560}><Prop id="arrow-up" x={0} y={0} size={120} f={f} /></At>
          <g transform="translate(1260 980)">
            <rect x={-60} y={-560} width={120} height={560} rx={24} fill={P.card} />
            <rect x={-60} y={-560} width={120} height={400} rx={24} fill={P.mint} opacity={0.85 * on(f, bor48, 10)} /><rect x={-60} y={-160} width={120} height={160} rx={24} fill={P.coral} opacity={0.85 * on(f, below, 10)} />
            <path d="M-110 -160 L110 -160" stroke={P.ink} strokeWidth={8} opacity={on(f, d17, 6)} /><Tag f={f} at={d17} x={210} y={-140} text="≈ 1.7%" size={64} color={P.goldInk} />
            <Tag f={f} at={d17} x={-250} y={-380} text="BORROW WINS" size={52} color={P.mintInk} /><Tag f={f} at={below} x={-250} y={-60} text="SELL WINS" size={52} color={P.coralInk} />
          </g>
          <At f={f} at={falling} x={1640} y={820}><Prop id="arrow-down" x={0} y={0} size={170} f={f} /></At>
          <At f={f} at={sell48} x={1820} y={580}><Prop id="wallet" x={0} y={0} size={110} f={f} /></At>
          <At f={f} at={more48} x={1660} y={780}><Prop id="cash-stack" x={0} y={0} size={140} f={f} /></At>
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="bn" />
    </g>
  )
}
// # the loan label sits inside the red block
const Label56: React.FC<{ x: number; y: number; text: string; o: number }> = ({ x, y, text, o }) => <text x={x} y={y} textAnchor="middle" fill="#FFF" opacity={o} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 1 }}>{text}</text>

export const BB_TEN = makePiece('bb-ten', 'Long: 10-year race (our maths, example 7%): sell ≈ $12.1M (≈ $1.13M tax) vs borrow ≈ $19.7M − $5.6M loan = $14.1M (+≈ $2M); interest ≈ $1.59M; break-even ≈ 1.7%', { mood: 'dark', Component: Ten,
  beats: BEATS,
  sfx: [['s39:selling', 'whoosh', 0.4], ['s43:197', 'riser', 0.3], ['s44:take', 'swish', 0.4], ['s45:more', 'ding', 0.5], ['s46:surprise', 'impact', 0.5], ['s47a:500000', 'cash', 0.4], ['s48:17', 'click', 0.4]] })
