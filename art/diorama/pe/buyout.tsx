// ---------------------------------------------------------------- s23–s39: step two, the buyout.
// A) The general partner sweeps a magnifying glass over companies: a family shop (the owners hand over a key) and a
//    listed tower (share certificates fly to him, coins fly back); EQUITY = OWNERSHIP key; the ticker board goes off.
// B) Sunny Pizza (made-up): $100M tag, $10M profit a year. One $100M column builds: 30 gold from the fund, 70 blue
//    from the lenders. A cross: the loan is not the firm's — the blue part is chained onto the shop, which pays interest.
// C) Leverage = a lever: a small gold weight lifts the big shop. A buy-to-rent house: the tenant's rent pays the
//    mortgage. The house becomes the shop: it is both the house and the tenant.
// D) One year of Sunny Pizza: ten coins of profit, seven fly to the lenders as interest (10% of 70M), three stay.
// E) Hilton: $6.5B gold + ≈$20B blue; the fund itself has only a sliver of debt, the company carries the big block.
// F) Blocks of debt pile onto the shop: why on purpose?
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, House, Label, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground, Office } from '../power/kit2'
import { NoMark } from '../bank/kit'
import { Chain, DEBT, DEBT_D, EQ, EQ_D, FundVault, Glass, Hotel, Lender, Lock, MiniShop, MoneyColumn, PizzaShop, PriceTag, Share, Ticker } from './kit'

const GROUND = 930

// # a big brass key (ownership)
const Key: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = -20 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <circle cx={-120} cy={0} r={70} fill={EQ} stroke={EQ_D} strokeWidth={8} /><circle cx={-120} cy={0} r={30} fill="var(--cc-bg0, #F8EFDF)" />
    <rect x={-56} y={-18} width={240} height={36} rx={10} fill={EQ} stroke={EQ_D} strokeWidth={6} />
    <rect x={130} y={14} width={22} height={50} rx={4} fill={EQ} stroke={EQ_D} strokeWidth={5} /><rect x={168} y={14} width={22} height={36} rx={4} fill={EQ} stroke={EQ_D} strokeWidth={5} />
  </g>
)
// # a lever (plank on a triangle) tilted by `tilt` degrees, with a small weight on the left end and a load on the right
const Lever: React.FC<{ x: number; y: number; tilt: number; o?: number; children?: React.ReactNode; weight?: React.ReactNode }> = ({ x, y, tilt, o = 1, children, weight }) => (
  <g opacity={o}>
    <path d={`M${x - 70} ${y + 150} L${x} ${y} L${x + 70} ${y + 150} Z`} fill="#7A5A3A" />
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <rect x={-860} y={-20} width={1180} height={36} rx={14} fill="#B98A5A" /><rect x={-860} y={-20} width={1180} height={10} rx={5} fill="#D9AE7E" />
      <g transform="translate(-800 -20)">{weight}</g>
      <g transform="translate(200 -20)">{children}</g>
    </g>
  </g>
)

const Buyout: React.FC<PieceProps> = ({ f, c }) => {
  const looks = c('s23:looks'), company23 = c('s23:company'), believes = c('s23:believes'), more23 = c('s23:more')
  const family = c('s24:family'), business24 = c('s24:business'), stock24 = c('s24:stock'), market24 = c('s24:market'), buysout = c('s24:buys'), shareholder = c('s24:shareholder')
  const name25 = c('s25:name'), equity25 = c('s25:equity'), ownership = c('s25:ownership'), private25 = c('s25:private'), trade = c('s25:trade')
  const key26 = c('s26:key'), not26 = c('s26:not'), pay26 = c('s26:pay'), mostly26 = c('s26:mostly'), fund26 = c("s26:fund's")
  const madeup = c('s27:madeup'), sunny27 = c('s27:sunny'), shops27 = c('s27:shops'), d100 = c('s27:100'), d10 = c('s27:10'), profit27 = c('s27:profit'), year27 = c('s27:year')
  const d30 = c('s28:30'), fund28 = c('s28:fund')
  const d70 = c('s29:70'), borrowed29 = c('s29:borrowed'), banks29 = c('s29:banks'), lenders29 = c('s29:lenders')
  const miss = c('s30:miss'), loan30 = c('s30:loan'), not30 = c('s30:not'), back30 = c('s30:back')
  const deal31 = c('s31:deal'), owes = c('s31:owes'), pays31 = c('s31:pays'), interest31 = c('s31:interest'), profits31 = c('s31:profits')
  const leveraged = c('s32:leveraged'), leverage32 = c('s32:leverage'), borrowed32 = c('s32:borrowed'), bigger = c('s32:bigger'), alone = c('s32:alone')
  const house33 = c('s33:house'), rent33 = c('s33:rent'), mortgage33 = c('s33:mortgage'), tenants = c("s33:tenant's"), rent33b = c('s33:rent#2'), pays33 = c('s33:pays')
  const except = c('s34:except'), company34 = c('s34:company'), house34 = c('s34:house'), tenant34 = c('s34:tenant')
  const costs35 = c('s35:costs'), p10 = c('s35:10'), d70b = c('s35:70'), d7 = c('s35:7'), every35 = c('s35:every')
  const makes36 = c('s36:makes'), pays36 = c('s36:pays'), d3 = c('s36:3'), left36 = c('s36:left')
  const real37 = c('s37:real'), hilton37 = c('s37:hilton'), d65 = c('s37:65'), roughly = c('s37:roughly'), borrowed37 = c('s37:borrowed')
  const funds38 = c('s38:funds'), little38 = c('s38:little'), big38 = c('s38:big'), sits = c('s38:sits'), companies38 = c('s38:companies')
  const why39 = c('s39:why'), load = c('s39:load'), debt39 = c('s39:debt'), purpose = c('s39:purpose'), three39 = c('s39:three')

  const AB = key26 - 8, BC = leveraged - 8, CD = costs35 - 8, DE = real37 - 8, EF = why39 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)

  // # A) the GP and his magnifying glass
  const gpA: Beat[] = [[0, 'idle', 'thinking'], [looks, 'point', 'thinking'], [believes, 'think', 'thinking'], [family, 'receive', 'smiling'], [buysout, 'offer', 'smiling'], [equity25, 'holdUp', 'smiling'], [private25, 'point', 'neutral']]
  const glassX = lerp(lerp(700, 1080, span(f, looks, more23 + 20)), 1500, on(f, stock24, 20))
  // # B) cast
  const gpB: Beat[] = [[AB, 'idle', 'neutral'], [key26, 'explain', 'neutral'], [not26, 'crossNoA', 'neutral', 'crossNoB', 10], [madeup, 'present', 'smiling'], [d30, 'offer', 'smiling'], [miss, 'idle', 'neutral'], [not30, 'crossNoA', 'neutral', 'crossNoB', 10], [deal31, 'point', 'smug']]
  const debtSlide = on(f, owes, 22)
  return (
    <g>
      <Stage id="pe-buyout" frame={f} />
      <Headline f={f} lines={[[looks, 'FINDING A COMPANY', P.ink, 104], [stock24, 'OR A WHOLE LISTED COMPANY', P.ink, 98], [equity25, 'EQUITY = OWNERSHIP', P.ink, 106], [private25, 'PRIVATE = NOT ON THE MARKET', P.ink, 98], [key26, 'THE KEY MOVE', P.ink, 110], [madeup, 'MADE-UP EXAMPLE', P.ink, 104], [miss, 'WHO REPAYS THE LOAN?', P.ink, 104], [leveraged, 'A LEVERAGED BUYOUT', P.ink, 104], [house33, 'LIKE A RENTED-OUT HOUSE', P.ink, 100], [costs35, 'ONE YEAR AT SUNNY PIZZA', P.ink, 100], [real37, 'THE REAL HILTON DEAL', P.ink, 104], [funds38, 'THE DEBT SITS ON THE COMPANY', P.ink, 98], [why39, 'WHY LOAD UP ON DEBT?', P.ink, 104]]} />
      <Ground y={GROUND} />

      {/* # A) finding companies, buying out shareholders, equity = ownership, private = not traded */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="hero" beats={gpA} x={260} y={GROUND} s={0.98} />
        <g opacity={win(f, looks, stock24 + 20, 10)}><Glass x={glassX} y={560 + 20 * Math.sin(f / 12)} s={0.9} /></g>
        {/* family business: owners hand over a key */}
        <g opacity={on(f, company23, 10) * (1 - on(f, equity25, 10))}>
          <MiniShop x={900} y={GROUND} s={2.0} />
          <Person f={f} who="owner" beats={[[0, 'idle', 'smiling'], [business24, 'offer', 'smiling']]} x={1180} y={GROUND} s={0.8} flip />
        </g>
        {/* the listed tower with its ticker */}
        <g opacity={on(f, c('s24:company'), 10)}>
          <Office x={1500} y={GROUND} s={1.05} />
          <Ticker x={1500} y={330} s={0.85 + 0.06 * win(f, c('s25:comes'), c('s25:comes') + 20, 5)} off={on(f, trade, 16)} f={f} />
          <g opacity={on(f, name25, 8) * (1 - on(f, equity25, 8))}><PriceTag x={1300} y={560} t="BOUGHT" w={220} s={0.9} /></g>
          {[0, 1, 2, 3].map((k) => { const fl = fly(f, buysout + k * 6, [1440, 700], [380, 640], 20, 160); return fl.t > 0 && fl.t < 1 ? <Share key={k} x={fl.x} y={fl.y} s={0.7} r={-8 + k * 5} /> : null })}
          {[0, 1, 2].map((k) => { const fl = fly(f, shareholder + k * 6, [380, 640], [1440, 700], 20, 100); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
        </g>
        {/* equity = ownership: the key */}
        <g opacity={on(f, equity25, 10)} transform={`translate(0 ${-14 * pop(f, ownership, 12)})`}><Key x={900} y={640} s={1.25} /></g>
      </g>}

      {/* # B) Sunny Pizza and the $100M column */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={gpB} x={180} y={GROUND} s={0.92} />
        {/* "not mostly with the fund's money": the fund vault with a clean cross */}
        <g opacity={win(f, pay26, madeup, 8)}><FundVault x={620} y={GROUND} s={0.7} fill={0.7} /><NoMark x={620} y={720} o={on(f, mostly26, 8)} r={90} /></g>
        <g opacity={on(f, fund26, 8) * (1 - on(f, madeup, 8))}>{[0, 1, 2].map((k) => <Coin key={k} x={860 + k * 70} y={GROUND - 40 - 16 * pop(f, fund26 + k * 3, 12)} s={0.8} />)}</g>
        <g opacity={on(f, sunny27, 10)}><PizzaShop x={1450} y={GROUND} s={0.95} f={f} /></g>
        <g opacity={on(f, d100, 8) * (1 - on(f, d30, 10))}><PriceTag x={950} y={700} t="$100M" r={-6 + 3 * Math.sin(f / 15)} w={240} /></g>
        <g opacity={win(f, d10, d30, 8)}>
          {[0, 1, 2].map((k) => <Coin key={k} x={960 + k * 70} y={GROUND - 40 - 18 * pop(f, d10 + k * 3, 12)} s={0.9} />)}
          <Label x={1030} y={GROUND - 110} text={f >= year27 ? '$10M PROFIT / YEAR' : '$10M'} size={48} font="Bebas Neue" color={P.goldInk} />
        </g>
        {/* the price column: 30 gold, then 70 blue on top */}
        <g opacity={on(f, d30, 8)}>
          <MoneyColumn x={760} y={GROUND - 10} w={230} unit={4.6} labelSide="in" size={52}
            segs={[{ v: 30, col: EQ, colD: EQ_D, label: '$30M FUND', lo: on(f, fund28, 8) },
              { v: 70, col: DEBT, colD: DEBT_D, o: on(f, d70, 8), dy: -60 * (1 - on(f, d70, 16)), dx: lerp(0, 280, debtSlide), label: '$70M LOAN', lo: on(f, borrowed29, 8) }]} />
          <g opacity={1 - on(f, d70, 8)}><Label x={760} y={GROUND - 170} text="$100M" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* the lenders */}
        <g opacity={on(f, banks29, 10)}><Lender x={420} y={GROUND} s={0.62} /></g>
        {/* "the part most people miss": the loan part pulses, a question bubble */}
        <g opacity={win(f, c('s30:part'), not30, 6)}><circle cx={900} cy={360} r={56} fill={P.card} /><Label x={900} y={386} text="?" size={80} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={win(f, c('s29:other'), miss, 6)}><Lender x={560} y={GROUND} s={0.4} /></g>
        {/* not the firm's: dashed line to the GP, crossed */}
        <g opacity={win(f, loan30, deal31, 8)}><path d="M640 560 Q420 470 260 520" fill="none" stroke="#8A97AA" strokeWidth={6} strokeDasharray="14 12" /><NoMark x={450} y={500} o={on(f, not30, 8)} r={58} /></g>
        {/* the loan slides onto the shop and is chained to it */}
                <g opacity={on(f, owes + 14, 6)}><Lock x={1172} y={720} s={0.9} /></g>
        <g opacity={on(f, owes, 8)}><Label x={1450} y={1010} text="SUNNY PIZZA OWES IT" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        {/* it pays the interest out of its own profits: coins leave the shop to the left */}
        {f >= pays31 && [0, 1, 2].map((k) => { const fl = fly(f, interest31 + k * 7, [1450, 640], [420, 560], 22, 160); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
      </g>}

      {/* # C) the lever, the rented-out house, then the shop as both */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={win(f, BC, house33, 10)}>
          {(() => { const tilt = lerp(9, -9, on(f, bigger, 24))
            return <Lever x={1180} y={760} tilt={tilt}
              weight={<g opacity={on(f, leverage32, 8)}>{[0, 1, 2].map((k) => <Coin key={k} x={0} y={-36 - k * 22} s={0.9} />)}<Label x={0} y={-130} text="$30M" size={48} font="Bebas Neue" color={P.goldInk} /></g>}>
              <g opacity={on(f, leveraged, 8)}><PizzaShop x={0} y={0} s={0.5} f={f} /></g>
              <g opacity={on(f, borrowed32, 8)}><Label x={0} y={-300} text="+ BORROWED $70M" size={46} font="Bebas Neue" color={P.skyInk} /></g>
            </Lever> })()}
        </g>
        {/* the house to rent out */}
        <g opacity={on(f, house33, 10) * (1 - on(f, company34, 12))}><House x={760} y={GROUND} s={2.1} /></g>
        <g opacity={on(f, company34, 12)}><PizzaShop x={760} y={GROUND} s={0.9} f={f} /></g>
        <g opacity={on(f, house34, 8)}><Label x={760} y={1010} text={f >= tenant34 ? 'HOUSE + TENANT' : 'THE HOUSE'} size={48} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, rent33, 8) * (1 - on(f, company34, 12))}><Person f={f} who="worker" beats={[[0, 'idle', 'smiling'], [rent33b, 'offer', 'smiling']]} x={1180} y={GROUND} s={0.85} flip />
          <Label x={1180} y={1010} text="TENANT" size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, mortgage33, 10)}><Lender x={1600} y={GROUND} s={0.8} name="MORTGAGE" /></g>
        {/* rent → mortgage (from the tenant), then profits → loan (from the shop) */}
        {[0, 1, 2].map((k) => { const fl = fly(f, pays33 + k * 7, [1180, 620], [1600, 640], 20, 120); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
        {[0, 1, 2].map((k) => { const fl = fly(f, tenant34 + k * 7, [900, 640], [1600, 640], 22, 160); return fl.t > 0 && fl.t < 1 ? <Coin key={`t${k}`} x={fl.x} y={fl.y} s={0.6} /> : null })}
      </g>}

      {/* # D) one year: ten coins of profit, seven to the lenders */}
      {D > 0 && <g opacity={D}>
        <PizzaShop x={420} y={GROUND} s={0.8} f={f} />
        <Lender x={1600} y={GROUND} s={0.85} glow={on(f, d7, 10)} />
        <g opacity={on(f, costs35, 8)} transform={`translate(${lerp(1900, 1600, on(f, costs35, 16))} ${GROUND - 420 - 14 * pop(f, d70b, 12)})`}><rect x={-170} y={-50} width={340} height={96} rx={18} fill={DEBT} /><Label x={0} y={16} text="$70M LOAN" size={54} font="Bebas Neue" color="#FFFFFF" />
          <g opacity={on(f, p10, 8)} transform={`translate(170 -50) scale(${pop(f, p10, 12)})`}><circle r={52} fill={P.gold} stroke={P.goldD} strokeWidth={5} /><Label x={0} y={16} text="10%" size={44} font="Bebas Neue" color="#16294A" /></g></g>
        {Array.from({ length: 10 }, (_, k) => {
          const toBank = k >= 3, t0 = pays36 + (k - 3) * 4, fl = fly(f, t0, [960, GROUND - 40 - k * 34], [1450 + ((k - 3) % 3) * 70, GROUND - 40 - Math.floor((k - 3) / 3) * 34], 20, 160)
          const x = toBank && fl.t > 0 ? fl.x : 960, y = toBank && fl.t > 0 ? fl.y : GROUND - 40 - k * 34
          return <g key={k} opacity={Math.max(on(f, costs35 + k * 2, 6), 0)}><ellipse cx={x} cy={y + 6} rx={70} ry={20} fill={P.goldD} /><ellipse cx={x} cy={y} rx={70} ry={20} fill={P.gold} /></g>
        })}
        <g opacity={on(f, costs35 + 20, 8)} transform={`translate(960 ${GROUND - 420}) scale(${1 + 0.15 * win(f, makes36, makes36 + 20, 6)}) translate(-960 ${-(GROUND - 420)})`}><Label x={960} y={GROUND - 420} text="$10M PROFIT" size={50} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d7, 8)} transform={`translate(0 ${-10 * pop(f, d7, 12)})`}><Label x={1600} y={GROUND - 520} text="$7M INTEREST" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, every35, 8)}><Label x={1600} y={GROUND - 580} text="EVERY YEAR" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, d3, 8)} transform={`translate(0 ${-12 * pop(f, left36, 12)})`}><rect x={810} y={GROUND - 260} width={300} height={80} rx={16} fill={P.card} /><Label x={960} y={GROUND - 204} text="$3M LEFT" size={52} font="Bebas Neue" color={P.mintInk} /></g>
      </g>}

      {/* # E) the real Hilton deal; funds borrow little, companies carry the debt */}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, funds38, 12)}>
          <Hotel x={1450} y={GROUND} s={0.82} />
          <MoneyColumn x={760} y={GROUND - 10} w={240} unit={20} grow={on(f, hilton37, 20)} labelSide="in" size={52}
            segs={[{ v: 6.5, col: EQ, colD: EQ_D, label: '$6.5B', lo: on(f, d65, 8) }, { v: 19.5, col: DEBT, colD: DEBT_D, label: f >= roughly ? '≈ $20B' : '', lo: on(f, roughly, 8) }]} />
          <g opacity={on(f, borrowed37, 8)}><Label x={910} y={GROUND - 300} text="BORROWED" size={50} font="Bebas Neue" color={P.skyInk} anchor="start" /></g>
          <g opacity={on(f, d65 + 6, 8)}><Label x={520} y={GROUND - 60} text="INVESTORS" size={46} font="Bebas Neue" color={P.goldInk} anchor="end" /></g>
        </g>
        <g opacity={on(f, funds38, 12)}>
          <FundVault x={500} y={GROUND} s={0.8} fill={0.7} />
          <g opacity={on(f, little38, 8)}><rect x={340} y={GROUND - 330} width={320} height={16} rx={8} fill={DEBT} /><Label x={500} y={GROUND - 352} text="≈ 5% BORROWED" size={46} font="Bebas Neue" color={P.skyInk} /></g>
          <g opacity={on(f, big38, 10)}>
            <MiniShop x={1380} y={GROUND} s={2.2} sign={false} />
            <g transform={`translate(0 ${-40 * (1 - on(f, sits, 16))})`}><rect x={1170} y={GROUND - 480} width={420} height={150} rx={16} fill={DEBT} /><Label x={1380} y={GROUND - 388} text="BIG DEBT" size={60} font="Bebas Neue" color="#FFFFFF" /></g>
            <Label x={1380} y={1010} text="THE COMPANY" size={46} font="Bebas Neue" color={P.ink} />
          </g>
        </g>
      </g>}

      {/* # F) why on purpose? */}
      {F > 0 && <g opacity={F}>
        <PizzaShop x={960} y={GROUND} s={0.95} f={f} />
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, load + k * 5, 8)} transform={`translate(0 ${-50 * (1 - on(f, load + k * 5, 12))})`}><rect x={760} y={GROUND - 506 - k * 96} width={400} height={84} rx={14} fill={DEBT} /><rect x={960 + 40} y={GROUND - 506 - k * 96} width={120} height={84} fill={DEBT_D} opacity={0.4} /><Label x={960} y={GROUND - 450 - k * 96} text="DEBT" size={52} font="Bebas Neue" color="#FFFFFF" /></g>)}
        <g opacity={on(f, purpose, 8)}><Label x={1460} y={560} text="?" size={240} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, three39, 8)}><Label x={460} y={600} text="STEP 3 →" size={64} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s23")} x={260} y={720} rx={140} ry={220} />
        <Spot f={f} at={c("s23:firm")} x={260} y={720} rx={140} ry={220} />
        <Spot f={f} at={c("s23:today")} x={900} y={760} rx={220} ry={160} />
        <Spot f={f} at={c("s24:sometimes")} x={900} y={760} rx={220} ry={160} />
        <Spot f={f} at={c("s25:where")} x={1500} y={330} rx={230} ry={80} />
        <Spot f={f} at={c("s25:stock")} x={1500} y={330} rx={230} ry={80} />
        <Spot f={f} at={c("s26:now")} x={180} y={720} rx={140} ry={220} />
        <Spot f={f} at={c("s27:chain")} x={1450} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s27:worth")} x={950} y={700} rx={150} ry={80} />
        <Spot f={f} at={c("s27:makes")} x={1030} y={850} rx={150} ry={80} />
        <Spot f={f} at={c("s30:firm's")} x={230} y={720} rx={140} ry={220} />
        <Spot f={f} at={c("s30:pay")} x={450} y={500} rx={120} ry={90} />
        <Spot f={f} at={c("s31:70")} x={1040} y={640} rx={140} ry={220} />
        <Spot f={f} at={c("s31:own")} x={1450} y={760} rx={230} ry={160} />
        <Spot f={f} at={c("s32:buyout")} x={1380} y={640} rx={180} ry={160} />
        <Spot f={f} at={c("s33:bit")} x={760} y={760} rx={220} ry={180} />
        <Spot f={f} at={c("s35:70")} x={1600} y={510} rx={200} ry={80} />
        <Spot f={f} at={c("s36:sunny")} x={420} y={760} rx={200} ry={160} />
        <Spot f={f} at={c("s36:million")} x={960} y={760} rx={120} ry={180} />
        <Spot f={f} at={c("s37:deals")} x={760} y={700} rx={150} ry={230} />
        <Spot f={f} at={c("s37:came")} x={760} y={860} rx={150} ry={80} />
        <Spot f={f} at={c("s38:on")} x={1380} y={520} rx={230} ry={120} />
        <Spot f={f} at={c("s38:buy")} x={1380} y={760} rx={230} ry={170} />
        <Spot f={f} at={c("s39:is")} x={960} y={640} rx={230} ry={230} />
        <Spot f={f} at={c("s39:answer")} x={460} y={600} rx={140} ry={80} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-buyout" />
    </g>
  )
}

export const PE_BUYOUT = makePiece('pe-buyout', 'Step two, the buyout: the general partner sweeps a magnifying glass over companies — a family shop whose owner hands over a key, a listed tower whose share certificates fly to him for coins; a big key EQUITY = OWNERSHIP; the ticker switches to NOT TRADED. Made-up Sunny Pizza: $100M tag, $10M profit a year; the price column builds from $30M of fund gold and $70M of lender blue; a cross: not the firm\'s loan; the blue part slides onto the shop and is chained and locked; interest coins leave the shop. A lever: a small gold weight lifts the big shop (+ borrowed $70M). A house to rent out, tenant pays rent to the mortgage; the house becomes the shop (both house and tenant). One year: ten coins of profit, seven fly to the lenders as $7M interest (70M at 10%), $3M left. Hilton: $6.5B investors + ≈$20B borrowed; a fund borrows ≈5%, the company carries BIG DEBT; debt blocks pile on the shop, why?', {
  mood: 'light', Component: Buyout,
  beats: ["s23:looks", "s23:company", "s23:believes", "s23:more", "s24:family", "s24:business", "s24:stock", "s24:buys", "s24:shareholder", "s25:name", "s25:equity", "s25:ownership", "s25:private", "s25:trade", "s26:key", "s26:not", "s26:pay", "s26:mostly", "s26:fund's", "s27:madeup", "s27:sunny", "s27:100", "s27:10", "s27:year", "s28:30", "s28:fund", "s29:70", "s29:borrowed", "s29:banks", "s30:miss", "s30:loan", "s30:not", "s31:deal", "s31:owes", "s31:pays", "s31:interest", "s32:leveraged", "s32:leverage", "s32:borrowed", "s32:bigger", "s32:alone", "s33:house", "s33:rent", "s33:mortgage", "s33:rent#2", "s33:pays", "s34:except", "s34:company", "s34:house", "s34:tenant", "s35:costs", "s35:10", "s35:70", "s35:7", "s35:every", "s36:makes", "s36:pays", "s36:3", "s36:left", "s37:real", "s37:hilton", "s37:65", "s37:roughly", "s37:borrowed", "s38:funds", "s38:little", "s38:big", "s38:sits", "s39:why", "s39:load", "s39:purpose", "s39:three", "s24:company", "s25:comes", "s30:part", "s29:other", "s23", "s23:firm", "s23:today", "s24:sometimes", "s25:where", "s25:stock", "s26:now", "s27:chain", "s27:worth", "s27:makes", "s30:firm's", "s30:pay", "s31:70", "s31:own", "s32:buyout", "s33:bit", "s36:sunny", "s36:million", "s37:deals", "s37:came", "s38:on", "s38:buy", "s39:is", "s39:answer"],
  sfx: [['s24:buys', 'swish', 0.2], ['s25:ownership', 'chime', 0.15], ['s28:30', 'coin', 0.2], ['s29:70', 'thump', 0.2], ['s30:not', 'thud', 0.15], ['s31:owes', 'click', 0.25], ['s32:bigger', 'whoosh', 0.2], ['s35:7', 'coin', 0.25], ['s38:sits', 'thump', 0.2], ['s39:load', 'thud', 0.2]] })
