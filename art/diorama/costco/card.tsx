// ---------------------------------------------------------------- s15–s23a: membership — $65 a year (Executive $130, 2% back); 84M paid members, 150M cardholders, 42M Executive (≈ 3/4 of sales);
// fees ≈ $5.9B = ≈ 2% of revenue but no goods to buy — mostly profit (gym analogy); ≈ half of $11.7B operating profit; ≈ $16M a day; steady every year
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Calendar, camera, Coin, Col, Headline, Label, Person, Prop, win } from '../aimoney/common'
import { Cart, MemberCard, Warehouse } from './kit'

const Dumbbell: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><rect x={-90} y={-10} width={180} height={20} rx={8} fill="#8A97AA" />{[-110, 90].map((px) => <rect key={px} x={px} y={-50} width={20} height={100} rx={6} fill="#1B2233" />)}{[-135, 115].map((px) => <rect key={px} x={px} y={-36} width={20} height={72} rx={6} fill="#1B2233" />)}</g>
)

const CardScene: React.FC<PieceProps> = ({ f, c }) => {
  const look = c('s15:look')
  const member = c('s16:member'), d65 = c('s16:65'), year = c('s16:year')
  const executive = c('s16a:executive'), d130 = c('s16a:130'), back = c('s16a:back')
  const d84 = c('s17:84'), paying = c('s17:paying')
  const household = c('s17a:household'), d150 = c('s17a:150')
  const halfB = c('s17b:half'), d42 = c('s17b:42')
  const most = c('s17c:most'), three = c('s17c:three')
  const fees = c('s18:fees'), d59 = c('s18:59')
  const d2 = c('s19:2'), revenue = c('s19:revenue'), sliver = c('s19a:sliver')
  const product = c('s20:product'), shelf = c('s20:shelf'), box = c('s20:box'), straight = c('s20:straight')
  const gym = c('s20a:gym'), lift = c('s20a:lift'), pay = c('s20a:pay')
  const operating = c('s21:operating'), roughly = c('s21:roughly')
  const d16 = c('s22:16'), day = c('s22:day')
  const store = c('s23:store'), membership = c('s23:membership'), giant = c('s23:giant')
  const sales = c('s23a:sales'), steady = c('s23a:steady'), renews = c('s23a:renews')
  const A = win(f, c('s15'), d84), B = win(f, d84, fees), Cc = win(f, fees, gym), D = win(f, gym, store), E = on(f, store, 10)
  const hero: Beat[] = [[0, 'holdUp', 'smiling'], [c('s16:shop'), 'holdUp', 'smiling'], [member, 'present', 'smiling'], [c('s16:united'), 'point', 'neutral'], [c('s17:costco'), 'present', 'smiling'], [c('s17c:executive'), 'pointUp', 'smiling'], [c('s23:real'), 'think', 'thinking'], [executive, 'explain', 'neutral'], [d84, 'shock', 'shocked'], [halfB, 'countOne', 'neutral'], [fees, 'countA', 'smiling', 'countB', 14],
    [product, 'stop', 'neutral'], [gym, 'pull', 'smiling'], [pay, 'thumbsUp', 'smiling'], [operating, 'explain', 'neutral'], [d16, 'fistPump', 'smiling'], [store, 'present', 'smiling'], [steady, 'nodA', 'smiling', 'nodB', 16]]
  const S = 3.2 // # px per $1B on the revenue bar
  return (
    <g>
      <Stage id="cd" frame={f} />
      <Headline f={f} lines={[[c('s15'), 'NOW, THE CARD', P.ink, 140], [member, 'MEMBERS ONLY', P.ink, 140], [d65, '$65 A YEAR', P.goldInk, 140], [executive, 'EXECUTIVE: $130', P.goldInk, 130], [back, '+ 2% BACK ON MOST BUYS', P.mintInk, 112],
        [d84, '≈ 84 MILLION PAYING MEMBERS', P.ink, 108], [d150, '≈ 150 MILLION CARDS', P.ink, 124], [halfB, 'ABOUT HALF: EXECUTIVE', P.goldInk, 120], [three, '≈ ¾ OF ALL SALES', P.goldInk, 130],
        [fees, 'THEIR FEES', P.ink, 140], [d59, '≈ $5.9 BILLION', P.goldInk, 140], [d2, 'ONLY ≈ 2% OF REVENUE', P.ink, 124], [product, 'NO PRODUCT TO BUY', P.ink, 130], [straight, 'MOSTLY STRAIGHT TO PROFIT', P.mintInk, 112],
        [gym, 'LIKE A GYM', P.ink, 140], [pay, 'IT EARNS WHEN YOU JOIN', P.mintInk, 120], [operating, 'OPERATING PROFIT ≈ $11.7B', P.ink, 112], [roughly, 'FEES ≈ HALF OF IT', P.goldInk, 130], [d16, '≈ $16 MILLION A DAY', P.goldInk, 124],
        [store, 'NOT JUST A STORE', P.ink, 130], [membership, 'A MEMBERSHIP BUSINESS…', P.goldInk, 116], [giant, '…WITH A STORE ATTACHED', P.ink, 116], [steady, 'FEES ARE STEADY', P.mintInk, 130], [renews, 'EVERY YEAR, AT RENEWAL', P.ink, 116]]} />
      <g transform={camera(f, [[c("s16:member"), 1000, 600, 1.08], [c("s16a:executive"), 1520, 600, 1.08], [c("s16a:back"), 1520, 900, 1.1], [c("s17:84"), 960, 540, 1], [c("s17a:household"), 1100, 700, 1.06], [c("s17a:150"), 960, 540, 1.02], [c("s17b:half"), 1200, 680, 1.06], [c("s17c:most"), 1740, 600, 1.1], [c("s18:fees"), 960, 540, 1], [c("s19:2"), 1200, 560, 1.06], [c("s20:product"), 960, 540, 1], [c("s20:shelf"), 1160, 560, 1.08], [c("s20:box"), 1420, 560, 1.08], [c("s20:straight"), 1680, 700, 1.08], [c("s20a:pay"), 1520, 620, 1.08], [c("s21:operating"), 1100, 700, 1.06], [c("s22:16"), 1600, 700, 1.1], [c("s23:store"), 960, 540, 1], [c("s23:giant"), 1500, 800, 1.06], [c("s23a:sales"), 960, 540, 1], [c("s23a:steady"), 1300, 800, 1.06], [d65, 1240, 620, 1.05], [d84, 960, 540, 1], [fees, 960, 540, 1], [d59, 1300, 640, 1.06], [gym, 960, 540, 1], [store, 960, 540, 1]])}>
        {/* # A: the two cards and their prices */}
        <g opacity={A}>
          <MemberCard x={1000} y={600} s={1.3 * pop(f, c('s15'))} r={-6} title="GOLD STAR" glow={on(f, look, 8) * (1 - on(f, executive, 8))} />
          <g opacity={on(f, c('s16:united'), 6) * (1 - on(f, executive, 8))} transform={`translate(1400 520) scale(${pop(f, c('s16:united'))})`}><Prop id="map-pin" x={0} y={0} size={120} f={f} /><Label x={0} y={100} text="U.S." size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, c('s16a:purchases'), 6) * (1 - on(f, c('s17:end'), 8))} transform={`translate(1780 760) scale(${pop(f, c('s16a:purchases'))})`}><Prop id="receipt" x={0} y={0} size={140} f={f} />{(() => { const t = span(f, c('s16a:purchases') + 6, c('s16a:purchases') + 24); return t > 0 && t < 1 ? <Coin x={lerp(0, -200, t)} y={lerp(0, -160, t)} s={0.5} /> : null })()}</g>
          <g opacity={on(f, c('s17:costco'), 6)} transform={`translate(1500 960) scale(${pop(f, c('s17:costco')) * 0.4})`}><Warehouse x={0} y={0} label="COSTCO" /></g>
          <g opacity={on(f, c('s17:end'), 6)} transform={`translate(1780 760) scale(${pop(f, c('s17:end')) * 0.8})`}><Calendar x={0} y={0} text="2026" s={1.1} /></g>
          <g opacity={on(f, d65, 6)} transform={`translate(1000 870) scale(${pop(f, d65)})`}><rect x={-150} y={-50} width={300} height={100} rx={18} fill={P.gold} /><Label x={0} y={34} text={f >= year ? '$65 / YEAR' : '$65'} size={72} font="Bebas Neue" color={P.navy0} /></g>
          <MemberCard x={1520} y={560} s={1.3 * pop(f, executive)} r={5} o={on(f, executive, 6)} title="EXECUTIVE" exec />
          <g opacity={on(f, d130, 6)} transform={`translate(1520 830) scale(${pop(f, d130)})`}><rect x={-140} y={-50} width={280} height={100} rx={18} fill={P.gold} /><Label x={0} y={34} text="$130" size={80} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, back, 6)} transform={`translate(1520 960) scale(${pop(f, back)})`}><rect x={-140} y={-40} width={280} height={80} rx={16} fill={P.mint} /><Label x={0} y={26} text="+2% BACK" size={60} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        {/* # B: the members — a crowd, household cards, half gold (Executive), ¾ of sales */}
        <g opacity={B}>
          <g opacity={on(f, c('s17a:membership'), 6) * (1 - on(f, halfB, 8))} transform={`translate(1740 420) scale(${pop(f, c('s17a:membership'))})`}><Prop id="house" x={0} y={0} size={140} f={f} /></g>
          <g opacity={on(f, c('s17b:expensive'), 6) * (1 - on(f, most, 8))} transform={`translate(1740 420) scale(${pop(f, c('s17b:expensive'))})`}><Prop id="price-tag" x={0} y={0} size={140} f={f} /><Label x={0} y={100} text="$130" size={56} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, c('s17c:shopping'), 6)}>{Array.from({ length: 12 }, (_, k) => <g key={k} transform={`translate(${760 + (k % 4) * 192 + 40} ${605 + Math.floor(k / 4) * 170}) scale(0.12)`}><Cart x={0} y={0} fill={1} /></g>)}</g>
          <g opacity={on(f, c('s17c:sales'), 6)}>{[0, 1, 2, 3].map((k) => <Coin key={k} x={900 + k * 180} y={480 - ((f - c('s17c:sales') + k * 7) % 30) * 3} s={0.45} o={1 - ((f - c('s17c:sales') + k * 7) % 30) / 30} />)}</g>
          {Array.from({ length: 24 }, (_, k) => { const col = k % 8, row = Math.floor(k / 8), ex = f >= halfB && k % 2 === 0
            return <g key={k} opacity={on(f, d84 + col, 5)}><Mini look={['hero', 'buyer', 'owner', 'worker', 'investor'][k % 5]} x={760 + col * 96} y={560 + row * 170} scale={0.62 * (1 + 0.08 * Math.max(0, Math.sin(span(f, c('s17a:people'), c('s17a:people') + 12) * Math.PI)))} frame={f} seed={k + 400} mood="happy" />
              <rect x={760 + col * 96 + 22} y={500 + row * 170} width={40} height={26} rx={5} fill={ex ? P.gold : '#F7FAFF'} stroke={P.ink2} strokeWidth={2} opacity={on(f, paying, 6)} />
              {f >= household && <rect x={760 + col * 96 + 34} y={490 + row * 170} width={40} height={26} rx={5} fill="#F7FAFF" stroke={P.ink2} strokeWidth={2} opacity={on(f, household, 6) * (1 - on(f, halfB, 8))} />}</g> })}
          <g opacity={on(f, d42, 6)}><Label x={1620} y={1060} text="≈ 42 MILLION EXECUTIVE" size={52} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, most, 6)} transform={`translate(1740 600) scale(${pop(f, most)})`}><circle r={130} fill={P.card} /><path d={`M0 0 L0 -130 A130 130 0 1 1 ${-130 * on(f, three, 14)} 0 Z`} fill={P.gold} opacity={on(f, three, 6)} /><Label x={0} y={190} text="SHARE OF SALES" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # C: fees pour into a pile; revenue bar with a 2% sliver; no product — straight to profit */}
        <g opacity={Cc}>
          {Array.from({ length: 8 }, (_, k) => { const t = ((f - fees) / 26 + k / 8) % 1; return f >= fees && f < d2 ? <Coin key={k} x={lerp(900, 1300, t)} y={500 - Math.sin(t * Math.PI) * 140} s={0.6} o={Math.sin(t * Math.PI)} /> : null })}
          <g opacity={on(f, d59, 6) * (1 - on(f, d2, 8))} transform={`translate(1360 640) scale(${pop(f, d59)})`}><Prop id="treasure-chest" x={0} y={0} size={240} f={f} /><Label x={0} y={170} text="$5.9B" size={80} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, d2, 6) * (1 - on(f, product, 8))}>
            <Label x={760} y={470} text="COSTCO REVENUE ≈ $303B" size={52} font="Bebas Neue" color={P.ink} anchor="start" />
            <rect x={760} y={500} width={297 * S} height={130} rx={18} fill={P.sky} /><rect x={760 + 297 * S} y={500} width={Math.max(6, 5.9 * S)} height={130} fill={P.gold} />
            <Label x={760 + 297 * S / 2} y={585} text="GOODS ≈ 98%" size={60} font="Bebas Neue" color={P.navy0} />
            <g opacity={on(f, c('s19a:chart'), 6)} transform={`translate(${770 + 297 * S - 40} 470) scale(${pop(f, c('s19a:chart'))})`}><Prop id="magnifier" x={0} y={0} size={120} f={f} /></g>
            <g opacity={on(f, sliver, 6)}><path d={`M${770 + 297 * S} 640 L${770 + 297 * S} 720`} stroke={P.goldInk} strokeWidth={6} /><Label x={770 + 297 * S} y={780} text="FEES ≈ 2%" size={60} font="Bebas Neue" color={P.goldInk} anchor="end" /></g>
          </g>
          <g opacity={on(f, product, 6)}>
            {[[product, 'shopping-bag', 'PRODUCT'], [shelf, 'warehouse-boxes', 'SHELF'], [box, 'container', 'SHIPPING']].map(([at, id, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${900 + k * 260} 560) scale(${pop(f, at as number)})`}>
              <circle r={90} fill={P.card} /><Prop id={id as string} x={0} y={-4} size={110} f={f} /><path d="M-64 -64 L64 64" stroke={P.coral} strokeWidth={12} strokeLinecap="round" /><Label x={0} y={140} text={t as string} size={48} font="Bebas Neue" color={P.ink} /></g>)}
            <g opacity={on(f, c('s20:profit'), 6)} transform={`translate(1680 900) scale(${pop(f, c('s20:profit'))})`}><Prop id="vault-door" x={0} y={0} size={170} f={f} />{[0, 1, 2].map((k) => { const t = ((f - c('s20:profit')) / 20 + k / 3) % 1; return <Coin key={k} x={0} y={-200 + t * 160} s={0.45} o={Math.sin(t * Math.PI)} /> })}</g>
            <g opacity={on(f, straight, 6)} transform="translate(1680 600)"><Prop id="arrow-up" x={0} y={-40} size={140} f={f} /><Label x={0} y={90} text="PROFIT" size={60} font="Bebas Neue" color={P.mintInk} /></g>
          </g>
        </g>
        {/* # D: the gym analogy; then operating profit split in half; $16M a day */}
        <g opacity={D}>
          <g opacity={1 - on(f, operating, 8)}>
            <g transform={`translate(1000 620) scale(${pop(f, gym)})`}><rect x={-200} y={-160} width={400} height={320} rx={24} fill={P.card} /><Dumbbell x={0} y={span(f, lift, lift + 12) > 0 ? -40 * Math.abs(Math.sin((f - lift) / 6)) : 0} s={1.2} />
              <Label x={0} y={120} text="GYM" size={70} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, c('s20a:money'), 6)} transform="translate(1180 470)"><Coin x={0} y={0} s={0.8} /><path d="M-36 -36 L36 36" stroke={P.coral} strokeWidth={10} strokeLinecap="round" /></g>
            <g opacity={on(f, lift, 6)} transform="translate(1000 900)"><Label x={0} y={0} text="LIFTING: $0" size={56} font="Bebas Neue" color={P.ink2} /></g>
            <g opacity={on(f, pay, 6)} transform={`translate(1520 620) scale(${pop(f, pay)})`}><MemberCard x={0} y={0} title="GYM PASS" /><Label x={0} y={180} text="JOINING: $$$" size={56} font="Bebas Neue" color={P.mintInk} /></g>
          </g>
          <g opacity={on(f, operating, 6)}>
            <Col x={1100} y={960} h={540 * on(f, c('s21:117'), 20)} w={300} color={P.mint} value={f >= c('s21:117') ? '$11.7B' : ''} label="OPERATING PROFIT" />
            <g opacity={on(f, c('s21:membership'), 6) * (1 - on(f, d16, 8))} transform={`translate(1440 560) scale(${pop(f, c('s21:membership')) * 0.7})`}><MemberCard x={0} y={0} /></g>
            <g opacity={on(f, c('s22:arriving'), 6)}>{[0, 1, 2, 3].map((k) => { const t = ((f - c('s22:arriving')) / 22 + k / 4) % 1; return <Coin key={k} x={1020 + k * 50} y={260 + t * 150} s={0.45} o={Math.sin(t * Math.PI)} /> })}</g>
            <g opacity={on(f, c('s22:cart'), 6)} transform={`translate(${lerp(1960, 1640, on(f, c('s22:cart'), 24))} 1020) scale(0.45)`}><Cart x={0} y={0} fill={0} /></g>
            <rect x={950} y={420} width={300} height={270 * on(f, roughly, 16)} rx={14} fill={P.gold} />
            <Label x={1100} y={560} text={f >= roughly ? 'FEES ≈ ½' : ''} size={72} font="Bebas Neue" color={P.navy0} />
            <Label x={1100} y={830} text={f >= roughly ? 'GOODS ≈ ½' : ''} size={64} font="Bebas Neue" color={P.navy0} />
            <g opacity={on(f, d16, 6)} transform={`translate(1600 640) scale(${pop(f, d16)})`}><Calendar x={0} y={0} text="1 DAY" s={1.4} /><g transform="translate(0 220)"><rect x={-150} y={-50} width={300} height={100} rx={18} fill={P.gold} /><Label x={0} y={34} text="≈ $16M" size={80} font="Bebas Neue" color={P.navy0} /></g></g>
          </g>
        </g>
        {/* # E: a giant card with a store attached; sales wobble, fees run steady */}
        <g opacity={E}>
          <g opacity={1 - on(f, sales, 8)}>
            <MemberCard x={1180} y={560} s={2 * pop(f, store)} glow={on(f, membership, 10)} />
            <g opacity={on(f, giant, 6)} transform={`translate(1660 900) scale(${pop(f, giant) * 0.6})`}><Warehouse x={0} y={0} label="STORE" /></g>
          </g>
          <g opacity={on(f, sales, 6)}>
            <rect x={760} y={380} width={1000} height={580} rx={24} fill={P.card} />
            <g opacity={on(f, c('s23a:week'), 6)} transform="translate(1680 470) scale(0.6)"><Calendar x={0} y={0} text="WEEK" s={1} /></g>
            <g opacity={on(f, c('s23a:arrive'), 6)}>{[0, 1, 2].map((k) => <Coin key={k} x={1120 + k * 320} y={800 - k * 30 - 10 * Math.abs(Math.sin(f / 6 + k))} s={0.5} />)}</g>
            <path strokeDasharray="3000" strokeDashoffset={3000 * (1 - on(f, c('s23a:rise'), 30))} d={`M800 ${700} ${Array.from({ length: 30 }, (_, i) => `L${800 + i * 32} ${700 + Math.sin(i * 1.3) * 70 + Math.cos(i * 0.7) * 40}`).join(' ')}`} stroke={P.sky} strokeWidth={8} fill="none" />
            <Label x={800} y={440} text="SALES" size={52} font="Bebas Neue" color={P.skyInk} anchor="start" />
            <path d={`M800 860 ${Array.from({ length: 30 }, (_, i) => `L${800 + i * 32} ${860 - Math.floor(i / 10) * 30}`).join(' ')}`} stroke={P.goldInk} strokeWidth={10} fill="none" opacity={on(f, steady, 8)} />
            <Label x={1720} y={920} text={f >= steady ? 'FEES' : ''} size={52} font="Bebas Neue" color={P.goldInk} anchor="end" />
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="cd" />
    </g>
  )
}

export const CO_CARD = makePiece('co-card', 'Long: membership — $65 / $130 with 2% back; 84M paid members, 150M cards, 42M Executive ≈ ¾ of sales; fees ≈ $5.9B ≈ 2% of revenue, ≈ half of $11.7B operating profit, ≈ $16M a day', { mood: 'dark', Component: CardScene,
  beats: ["s15:look", "s16:member", "s16:65", "s16:year", "s16a:executive", "s16a:130", "s16a:back", "s17:84", "s17:paying", "s17a:household", "s17b:half", "s17b:42", "s17c:most", "s17c:three", "s18:fees", "s18:59", "s19:2", "s19:revenue", "s19a:sliver", "s20:product", "s20:shelf", "s20:box", "s20:straight", "s20a:gym", "s20a:lift", "s20a:pay", "s21:operating", "s21:roughly", "s22:16", "s22:day", "s23:store", "s23:membership", "s23:giant", "s23a:sales", "s23a:steady", "s23a:renews", "s15", "s16:shop", "s16:united", "s17:costco", "s17c:executive", "s23:real", "s17a:150", "s16a:purchases", "s17:end", "s17a:membership", "s17b:expensive", "s17c:shopping", "s17c:sales", "s17a:people", "s19a:chart", "s20:profit", "s20a:money", "s21:117", "s21:membership", "s22:arriving", "s22:cart", "s23a:week", "s23a:arrive", "s23a:rise"],
  sfx: [['s16:65', 'pop', 0.4], ['s16a:130', 'pop', 0.4], ['s17:84', 'impact', 0.5], ['s18:59', 'coin', 0.5], ['s20:straight', 'swish', 0.4], ['s21:roughly', 'ding', 0.5], ['s22:16', 'chime', 0.4]] })
