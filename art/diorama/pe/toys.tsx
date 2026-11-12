// ---------------------------------------------------------------- s75–s86: when the debt wins (Toys R Us), and Hilton.
// A) Three firm towers (KKR, Bain, Vornado) buy the toy store: $6.6B tag; a column of $1.3B gold + borrowed blue chained
//    onto the store; then $400M of interest coins a year fly to the lenders.
// B) Shoppers walk from the toy store to three big rivals (Walmart, Target, Amazon). Every interest coin flies to the
//    lenders instead of to the store's paint, its price tags or its website (each crossed as named).
// C) September 2017: BANKRUPT, a $5B debt block; the next year a row of stores goes dark and a crowd of workers stands
//    (≈ 33,000 jobs at risk); the firms' gold coin cracks; a stack of fee envelopes sits beside them (Bloomberg).
// D) Hilton: storm clouds, then the sun; the ticker lights up in 2013; a $14B profit column; two endings side by side.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, Stamp, fly, win, type Beat } from '../aimoney/common'
import { Ground, CoinColumn } from '../power/kit2'
import { NoMark } from '../bank/kit'
import { DEBT, DEBT_D, EQ, EQ_D, Envelope, FirmHQ, Hotel, Lender, Lock, MoneyColumn, PriceTag, Ticker, ToyStore } from './kit'

const GROUND = 930

// # a big generic box store (a rival) with a name band
const BigBox: React.FC<{ x: number; y: number; name: string; col: string; s?: number; o?: number }> = ({ x, y, name, col, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={14} fill="#000" opacity={0.15} />
    <rect x={-180} y={-230} width={360} height={230} rx={8} fill="#E6E9EF" />
    <rect x={-180} y={-260} width={360} height={60} rx={8} fill={col} />
    <text y={-216} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{name}</text>
    <rect x={-60} y={-130} width={120} height={130} rx={6} fill="#BFE3FF" /><rect x={-3} y={-130} width={6} height={130} fill="#8A97AA" />
    {/* shopping cart icon */}
    <g transform="translate(-130 -150)"><path d="M0 0 h14 l12 50 h46 l10 -36 h-62" fill="none" stroke="#5C6F8E" strokeWidth={7} strokeLinejoin="round" /><circle cx={32} cy={62} r={7} fill="#5C6F8E" /><circle cx={66} cy={62} r={7} fill="#5C6F8E" /></g>
  </g>
)
// # a paint bucket (its stores), a laptop (its website)
const Paint: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}><path d="M-50 -60 h100 l-10 110 h-80 Z" fill="#5BCBFF" /><ellipse cx={0} cy={-60} rx={50} ry={14} fill="#2A8FD0" /><path d="M-50 -60 Q0 -130 50 -60" fill="none" stroke="#5C6F8E" strokeWidth={6} /></g>
)
const Laptop: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}><rect x={-70} y={-80} width={140} height={90} rx={8} fill="#2B4A78" /><rect x={-60} y={-70} width={120} height={70} rx={4} fill="#BFE3FF" /><rect x={-90} y={10} width={180} height={16} rx={6} fill="#8A97AA" /></g>
)

const Toys: React.FC<PieceProps> = ({ f, c }) => {
  const three75 = c('s75:three'), kkr = c('s75:kkr'), bain = c('s75:bain'), vornado = c('s75:vornado'), bought75 = c('s75:bought'), toys75 = c('s75:toys'), d66 = c('s75:66'), billion75 = c('s75:billion')
  const d13 = c('s76:13'), investors76 = c('s76:investors'), most76 = c('s76:most'), borrowed76 = c('s76:borrowed'), carried76 = c('s76:carried'), debt76 = c('s76:debt')
  const years77 = c('s77:years'), paid77 = c('s77:paid'), d400 = c('s77:400'), interest77 = c('s77:interest')
  const walmart = c('s78:walmart'), target = c('s78:target'), amazon = c('s78:amazon'), winning = c('s78:winning'), shoppers = c('s78:shoppers')
  const every79 = c('s79:every'), felt = c('s79:felt'), interest79 = c('s79:interest'), spend = c('s79:spend'), stores79 = c('s79:stores'), prices79 = c('s79:prices'), website = c('s79:website')
  const september = c('s80:september'), filed = c('s80:filed'), bankruptcy80 = c('s80:bankruptcy'), d5 = c('s80:5'), debt80 = c('s80:debt')
  const next81 = c('s81:next'), close = c('s81:close'), stores81 = c('s81:stores'), jobs = c('s81:jobs'), risk = c('s81:risk')
  const three82 = c('s82:three'), lost82 = c('s82:lost'), put82 = c('s82:put')
  const bloomberg = c('s83:bloomberg'), collected = c('s83:collected'), hundreds = c('s83:hundreds'), fees83 = c('s83:fees')
  const hilton84 = c('s84:hilton'), other84 = c('s84:other'), struggled = c('s84:struggled'), crisis = c('s84:crisis'), travel = c('s84:travel'), returned = c('s84:returned'), y2013 = c('s84:2013')
  const finally85 = c('s85:finally'), sold85 = c('s85:sold'), d14 = c('s85:14'), profit85 = c('s85:profit')
  const same86 = c('s86:same'), tool = c('s86:tool'), mountain = c('s86:mountain'), two86 = c('s86:two'), endings = c('s86:endings')

  const AB = walmart - 8, BC = september - 8, CD = hilton84 - 8, DE = same86 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = on(f, DE, 10)

  const firms: [string, number, number][] = [['KKR', kkr, 150], ['BAIN', bain, 360], ['VORNADO', vornado, 570]]
  return (
    <g>
      <Stage id="pe-toys" frame={f} />
      <Headline f={f} lines={[[three75, 'TOYS R US, 2005', P.ink, 106], [d13, 'MOSTLY BORROWED', P.ink, 106], [years77, '$400M A YEAR IN INTEREST', P.coralInk, 100], [walmart, 'RIVALS WIN THE SHOPPERS', P.ink, 104], [every79, 'INTEREST, NOT INVESTMENT', P.ink, 104], [september, 'SEPTEMBER 2017', P.coralInk, 110], [next81, 'STORES CLOSE', P.coralInk, 110], [three82, 'THE FIRMS LOSE THEIR STAKE…', P.ink, 100], [bloomberg, '…BUT KEPT THE FEES', P.goldInk, 104], [hilton84, 'HILTON: THE OTHER WAY', P.ink, 104], [same86, 'SAME TOOL, TWO ENDINGS', P.ink, 106]]} />
      <Ground y={GROUND} dark />

      {/* # A) the buyout of the toy store */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, toys75, 10)}><ToyStore x={1080} y={GROUND} s={0.95} f={f} /></g>
        {firms.map(([name, at, x]) => <g key={name} opacity={on(f, at, 8) * (1 - on(f, years77, 12))} transform={`translate(0 ${20 * (1 - pop(f, at, 12))})`}>
          <FirmHQ x={x} y={GROUND} s={0.5} name="" lit={0.7} /><Label x={x} y={GROUND + 64} text={name} size={46} font="Bebas Neue" color={P.ink} /></g>)}
        <g opacity={on(f, bought75, 8) * (1 - on(f, d13, 10))}><PriceTag x={1120} y={380} t={f >= billion75 ? '$6.6 BILLION' : f >= d66 ? '$6.6…' : 'SOLD'} w={320} r={-5 + 3 * Math.sin(f / 15)} /></g>
        {/* the deal column: $1.3B of equity + borrowed */}
        <g opacity={on(f, d13, 8)}>
          <MoneyColumn x={1720} y={GROUND - 10} w={210} unit={70} labelSide="in" size={48}
            segs={[{ v: 1.3, col: EQ, colD: EQ_D, label: '$1.3B' }, { v: 5.3, col: DEBT, colD: DEBT_D, o: on(f, most76, 8), label: f >= borrowed76 ? 'BORROWED' : '', lo: on(f, borrowed76, 8) }]} />
          <g opacity={on(f, investors76, 8) * (1 - on(f, most76, 8))}><Label x={1720} y={GROUND - 130} text="INVESTORS' MONEY" size={44} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, carried76, 8)} transform={`translate(0 ${-14 * pop(f, debt76, 12)})`}><Lock x={1580} y={700} s={1.0} /></g>
        {/* lenders + interest coins every year */}
        <g opacity={on(f, years77, 12)}><Lender x={330} y={GROUND} s={0.75} /></g>
        {f >= paid77 && [paid77, c('s77:about'), d400, c('s77:million'), c('s77:a'), c('s77:year'), c('s77:just'), interest77].map((t0, k) => { const fl = fly(f, t0, [900, 700], [400, 650], 22, 140); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
        <g opacity={on(f, d400, 8)}><rect x={510} y={360} width={420} height={90} rx={18} fill={P.card} /><Label x={720} y={422} text={f >= interest77 ? '$400M / YEAR' : '$400M'} size={60} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # B) rivals win shoppers; interest instead of investment */}
      {B > 0 && <g opacity={B}>
        <ToyStore x={430} y={GROUND} s={0.62} f={f} />
        <g opacity={1 - on(f, every79, 12)}>
          {([[walmart, 'WALMART', '#2E6CC4', 1080], [target, 'TARGET', '#D9483A', 1400], [amazon, 'AMAZON', '#3A4A63', 1720]] as [number, string, string, number][]).map(([at, n, col, x]) =>
            <g key={n} opacity={on(f, at, 8)} transform={`translate(0 ${20 * (1 - pop(f, at, 12))})`}><BigBox x={x} y={GROUND} name={n} col={col} s={0.78} /></g>)}
          {/* shoppers walk from the toy store to the rivals */}
          {(['worker', 'investorF', 'owner', 'buyer'] as const).map((who, k) => { const t = span(f, winning + k * 10, winning + k * 10 + 70)
            return t > 0 ? <g key={who} opacity={Math.min(1, t * 4) * (1 - span(f, winning + k * 10 + 60, winning + k * 10 + 70))}><Person f={f} who={who} beats={[[0, 'walkA', 'smiling', 'walkB', 12]]} x={lerp(700, 880 + k * 10, t)} y={GROUND} s={0.42} /></g> : null })}
        </g>
        <g opacity={on(f, every79, 12)}>
          <Lender x={1560} y={GROUND} s={0.8} />
          {f >= interest79 && Array.from({ length: 6 }, (_, k) => { const fl = fly(f, interest79 + k * 12, [600, 700], [1500, 640], 26, 200); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
          {([[stores79, 'STORES', 760], [prices79, 'PRICES', 1040], [website, 'WEBSITE', 1320]] as [number, string, number][]).map(([at, t, x]) => <g key={t} opacity={on(f, at - 30, 8)}>
            <g transform={`translate(${x} 400) scale(1.5) translate(${-x} -400)`}>{t === 'STORES' ? <Paint x={x} y={410} /> : t === 'PRICES' ? <PriceTag x={x - 70} y={400} t="$" w={150} s={0.9} /> : <Laptop x={x} y={420} />}</g>
            <Label x={x} y={560} text={t} size={48} font="Bebas Neue" color={P.ink} />
            <NoMark x={x} y={400} o={on(f, at, 8)} r={100} /></g>)}
        </g>
      </g>}

      {/* # C) bankruptcy, closings, jobs, the firms' loss and their fees */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={1 - on(f, next81, 12)}>
          <ToyStore x={960} y={GROUND} s={0.95} dark={on(f, filed, 16)} f={f} />
          <Stamp x={960} y={760} text="BANKRUPT" f={f} at={bankruptcy80} size={90} />
          <g opacity={on(f, d5, 8)} transform={`translate(0 ${-60 * (1 - on(f, d5, 14))})`}><rect x={720} y={300} width={480} height={120} rx={16} fill={DEBT} /><Label x={960} y={384} text={f >= debt80 ? '$5B OF DEBT' : '$5B'} size={70} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        <g opacity={win(f, next81, three82, 10)}>
          {[close, c('s81:all'), c('s81:us'), stores81, c('s81:about')].map((at, k) => <g key={k}><ToyStore x={260 + k * 350} y={620} s={0.4} dark={on(f, at, 10)} f={f} /></g>)}
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, jobs + k * 2, 6)}><Person f={f} who={(['worker', 'investorF', 'owner', 'buyer'] as const)[k % 4]} beats={[[0, 'idle', 'worried']]} x={300 + k * 120} y={GROUND} s={0.36} /></g>)}
          <g opacity={on(f, jobs, 8)}><Label x={960} y={GROUND + 70} text={f >= risk ? '≈ 33,000 JOBS AT RISK' : '≈ 33,000 JOBS'} size={54} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, three82, 10)}>
          {firms.map(([name, , x], k) => <g key={name}><FirmHQ x={x + 300} y={GROUND} s={0.5} name="" lit={0.6} /><Label x={x + 300} y={GROUND + 64} text={name} size={46} font="Bebas Neue" color={P.ink} /></g>)}
          {/* their gold stake cracks and fades */}
          <g opacity={1 - on(f, put82 + 10, 16)} transform={`translate(1350 ${560 + 60 * on(f, put82, 20)})`}><circle r={110} fill={EQ} stroke={EQ_D} strokeWidth={8} /><Label x={0} y={22} text="$1.3B" size={64} font="Bebas Neue" color="#16294A" />
            <path d="M-20 -105 L10 -40 L-15 10 L20 60 L0 105" fill="none" stroke="#16294A" strokeWidth={8} strokeDasharray="300" strokeDashoffset={300 * (1 - on(f, lost82, 12))} /></g>
          {/* the fees they kept */}
          {[collected, hundreds, c('s83:millions'), fees83, c('s83:company'), c('s83:way')].map((at, k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(0 ${-30 * (1 - pop(f, at, 12))})`}><Envelope x={1450 + (k % 2) * 30} y={GROUND - 70 - k * 60} s={0.9} r={(k % 2 ? 4 : -4)} t="" /></g>)}
          <g opacity={on(f, hundreds, 8)}><Label x={1460} y={GROUND - 520} text="FEES: HUNDREDS OF $ MILLIONS" size={46} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, bloomberg, 8)}><Label x={1460} y={GROUND + 70} text="SOURCE: BLOOMBERG" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # D) Hilton: the storm, the sun, back on the market, the profit */}
      {D > 0 && <g opacity={D}>
        {(() => { const storm = win(f, struggled - 6, travel + 10, 10), sun = on(f, travel, 20)
          return <>
            <g opacity={sun} transform={`translate(1500 ${420 - 120 * sun})`}><circle r={90} fill="#FFD25A" />{Array.from({ length: 10 }, (_, k) => <rect key={k} x={-6} y={-150} width={12} height={40} rx={6} fill="#FFD25A" transform={`rotate(${k * 36 + f})`} />)}</g>
            <g opacity={storm} transform={`translate(760 ${280 + 6 * Math.sin(f / 12)})`}><ellipse cx={-80} cy={0} rx={150} ry={80} fill="#5C6F8E" /><ellipse cx={80} cy={-30} rx={170} ry={100} fill="#6E7F99" />
              <path d="M0 70 l-30 70 h40 l-30 80" fill="none" stroke="#FFD25A" strokeWidth={10} strokeLinejoin="round" opacity={(Math.floor(f / 8) % 3 === 0) ? 1 : 0.2} /></g>
            <Hotel x={760} y={GROUND} s={0.9} lit={lerp(0.25, 1, sun) * (1 - 0.7 * storm) + 0.3 * storm} />
            <g opacity={on(f, returned, 10) * (1 - on(f, finally85, 10))}><Ticker x={1450} y={560} s={0.9} f={f} /><g opacity={on(f, y2013, 8)}><Label x={1450} y={700} text="BACK ON THE MARKET: 2013" size={50} font="Bebas Neue" color={P.mintInk} /></g></g>
            <g opacity={on(f, sold85, 10)}><CoinColumn x={1450} y={GROUND - 10} h={lerp(0, 400, on(f, d14, 30))} w={200} />
              <g opacity={on(f, d14, 8)}><rect x={1250} y={GROUND - 520} width={400} height={92} rx={18} fill={P.card} /><Label x={1450} y={GROUND - 456} text={f >= profit85 ? '≈ $14B PROFIT' : '≈ $14B'} size={60} font="Bebas Neue" color={P.goldInk} /></g></g>
          </> })()}
      </g>}

      {/* # E) same tool, two endings */}
      {E > 0 && <g opacity={E}>
        <Hotel x={520} y={GROUND} s={0.85} lit={1} />
        <ToyStore x={1450} y={GROUND} s={0.8} dark={1} f={f} />
        <g opacity={on(f, tool, 8)} transform={`translate(960 ${560 - 14 * pop(f, tool, 12)})`}><Lock x={0} y={0} s={1.6} /></g>
        <g opacity={on(f, mountain, 8)}>{[0, 1, 2].map((k) => <rect key={k} x={880} y={720 - k * 60} width={160} height={50} rx={10} fill={DEBT} opacity={on(f, mountain + k * 4, 6)} />)}</g>
        <g opacity={on(f, endings, 8)}><path d="M240 520 l0 -120 l-40 40 M240 400 l40 40" stroke="#3DDC97" strokeWidth={18} fill="none" strokeLinecap="round" /><path d="M1720 400 l0 120 l-40 -40 M1720 520 l40 -40" stroke="#F06B5B" strokeWidth={18} fill="none" strokeLinecap="round" /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s75:2005")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s75:66")} x={1120} y={380} rx={200} ry={70} />
        <Spot f={f} at={c("s75:dollars")} x={1120} y={380} rx={200} ry={70} />
        <Spot f={f} at={c("s76:billion")} x={1720} y={860} rx={120} ry={60} />
        <Spot f={f} at={c("s76:own")} x={1720} y={860} rx={120} ry={60} />
        <Spot f={f} at={c("s77:year")} x={720} y={410} rx={220} ry={60} />
        <Spot f={f} at={c("s77:just")} x={650} y={680} rx={180} ry={120} />
        <Spot f={f} at={c("s78:same")} x={430} y={780} rx={200} ry={150} />
        <Spot f={f} at={c("s79:felt")} x={430} y={780} rx={200} ry={150} />
        <Spot f={f} at={c("s79:dollar")} x={600} y={700} rx={150} ry={120} />
        <Spot f={f} at={c("s79:could")} x={1040} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s80:2017")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s80:us")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s85:blackstone")} x={760} y={650} rx={160} ry={230} />
        <Spot f={f} at={c("s85:shares")} x={1450} y={600} rx={120} ry={160} />
        <Spot f={f} at={c("s85:billion")} x={1450} y={700} rx={120} ry={200} />
        <Spot f={f} at={c("s85:dollars")} x={1450} y={700} rx={120} ry={200} />
        <Spot f={f} at={c("s86:borrowed")} x={960} y={690} rx={120} ry={100} />
        <Spot f={f} at={c("s86:money")} x={960} y={690} rx={120} ry={100} />
        <Spot f={f} at={c("s86:very")} x={240} y={460} rx={90} ry={90} />
        <Spot f={f} at={c("s86:different")} x={1720} y={460} rx={90} ry={90} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-toys" />
    </g>
  )
}

export const PE_TOYS = makePiece('pe-toys', 'When the debt wins: three firm towers (KKR, Bain, Vornado) buy the toy store for $6.6 billion; a column of $1.3B investors\' money + borrowed blue is locked onto the store; lenders appear and $400M of interest coins a year fly to them; shoppers walk from the toy store to three big rivals (Walmart, Target, Amazon); interest coins fly to the lenders while the store\'s paint (stores), price tag (prices) and laptop (website) are crossed out; September 2017: the store goes dark, BANKRUPT, a $5B debt block; next year a row of stores goes dark and a crowd of workers (≈33,000 jobs at risk); the firms\' $1.3B coin cracks and fades while a stack of fee envelopes rises beside them (Bloomberg); Hilton: storm clouds and lightning, then the sun, the ticker back on the market in 2013, a ≈$14B profit coin column; same tool (a lock) and a mountain of debt blocks between a lit hotel and a dark store, green and red arrows', {
  mood: 'dark', Component: Toys,
  beats: ["s75:kkr", "s75:bain", "s75:vornado", "s75:bought", "s75:toys", "s75:66", "s75:billion", "s76:13", "s76:investors", "s76:most", "s76:borrowed", "s76:carried", "s76:debt", "s77:years", "s77:paid", "s77:400", "s77:interest", "s78:walmart", "s78:target", "s78:amazon", "s78:winning", "s78:shoppers", "s79:every", "s79:felt", "s79:interest", "s79:spend", "s79:stores", "s79:prices", "s79:website", "s80:september", "s80:filed", "s80:bankruptcy", "s80:5", "s80:debt", "s81:next", "s81:close", "s81:stores", "s81:jobs", "s81:risk", "s82:three", "s82:lost", "s82:put", "s83:bloomberg", "s83:collected", "s83:hundreds", "s83:fees", "s84:hilton", "s84:struggled", "s84:crisis", "s84:travel", "s84:returned", "s84:2013", "s85:finally", "s85:sold", "s85:14", "s85:profit", "s86:same", "s86:tool", "s86:mountain", "s86:endings", "s77:about", "s77:million", "s77:a", "s77:year", "s77:just", "s81:all", "s81:us", "s81:about", "s83:millions", "s83:company", "s83:way", "s75:2005", "s75:dollars", "s76:billion", "s76:own", "s78:same", "s79:dollar", "s79:could", "s80:2017", "s80:us", "s85:blackstone", "s85:shares", "s85:billion", "s85:dollars", "s86:borrowed", "s86:money", "s86:very", "s86:different"],
  sfx: [['s75:bought', 'swish', 0.2], ['s76:debt', 'click', 0.25], ['s77:400', 'coin', 0.2], ['s79:spend', 'thud', 0.15], ['s80:bankruptcy', 'impact', 0.3], ['s81:close', 'thud', 0.2], ['s82:lost', 'crack', 0.25], ['s83:fees', 'flutter', 0.2], ['s84:travel', 'chime', 0.2], ['s85:14', 'cash', 0.2]] })
