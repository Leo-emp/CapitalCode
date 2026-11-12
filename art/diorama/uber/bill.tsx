// ---------------------------------------------------------------- s82–s99: the bill comes due + payoff.
// A) Mia and her ride today: the full-cost outline from the hook; her $20 now fills it to the top ("mostly, you do");
//    the investor's gold top-up piece slides out and his bag closes ("isn't filling it anymore"); a thin green cap
//    rises above the outline ("and then some"); the DISCOUNT coupon tears in two ("the hidden discount is over").
// B) The running total gauge, still red: three green year pages pop ("three profitable years"), the red bar shrinks
//    from −$32.8B to −$10.6B (end 2025) but stays below zero; a TAX page with "+$5B, ONE-TIME" is pinned beside it.
// C) The lesson: a new app shows a price tag that looks too cheap; a dashed gap under it with a "?"; an investor bag
//    slides under the gap ("betting on the future"); on "works" a tick; the coupon drops, and the price tag grows back
//    to full as it slides to the customer.
// D) Payoff: four numbered steps light up on their words (fare, slice, didn't cover, investors paid). Billions of rides
//    as a grid; the late 2010s calendar; "someone else" — the money bag; next time: a ride and a food bag with a "?",
//    Mia's $20 bill. Finally the disclaimer.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2, FareBill, MapPhone, MoneyBag, RideCar, TotalGauge, USpot } from './kit'

const GROUND = 920

const Bill: React.FC<PieceProps> = ({ f, c }) => {
  const who82 = c('s82:who'), today82 = c('s82:today')
  const mostly = c('s83:mostly'), you83 = c('s83:you')
  const investors84 = c('s84:investors'), filled84 = c('s84:filled'), gap84 = c('s84:gap'), isnt = c("s84:isn't"), anymore = c('s84:anymore')
  const earns85 = c('s85:earns'), profit85 = c('s85:profit'), covers = c('s85:covers'), then85 = c('s85:then')
  const words86 = c('s86:words'), hidden = c('s86:hidden'), over86 = c('s86:over')
  const even87 = c('s87:even'), three87 = c('s87:three'), profitable = c('s87:profitable'), years87 = c('s87:years'), still87 = c('s87:still'), earned87 = c('s87:earned'), lost87 = c('s87:lost')
  const end88 = c('s88:end'), y25 = c('s88:2025'), running88 = c('s88:running'), d106 = c('s88:106'), red88 = c('s88:red')
  const after89 = c('s89:after'), onetime = c('s89:onetime'), d5 = c('s89:5'), tax89 = c('s89:tax'), helped = c('s89:helped')
  const lesson = c('s90:lesson'), beyond = c('s90:beyond')
  const app91 = c('s91:app'), cheap91 = c('s91:cheap'), true91 = c('s91:true'), asking = c('s91:asking'), gap91 = c('s91:gap')
  const sometimes = c('s92:sometimes'), investors92 = c('s92:investors'), betting = c('s92:betting'), future = c('s92:future')
  const works = c('s93:works'), discount93 = c('s93:discount'), ends = c('s93:ends'), full93 = c('s93:full'), moves = c('s93:moves'), customer = c('s93:customer')
  const remember94 = c('s94:remember'), four94 = c('s94:four')
  const fare95 = c('s95:fare'), slice95 = c('s95:slice'), years95 = c('s95:years'), didnt = c("s95:didn't"), costs95 = c('s95:costs'), investors95 = c('s95:investors'), gap95 = c('s95:gap')
  const billions96 = c('s96:billions'), rides96 = c('s96:rides'), cheaper96 = c('s96:cheaper'), cost96 = c('s96:cost')
  const cheap97 = c('s97:cheap'), late = c('s97:late'), y2010s = c('s97:2010s'), magic = c('s97:magic'), paid97 = c('s97:paid'), someone = c('s97:someone'), else97 = c('s97:else')
  const next98 = c('s98:next'), ride98 = c('s98:ride'), delivery = c('s98:delivery'), oddly = c('s98:oddly'), remember98 = c('s98:remember'), d20 = c('s98:20'), ask98 = c('s98:ask'), rest98 = c('s98:rest')
  const this99 = c('s99:this'), advice = c('s99:advice')

  const AB = three87 - 2, BC = lesson - 6, CD = remember94 - 6
  const A = win(f, who82 - 40, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const D1 = 1 - on(f, billions96 - 6, 10), D2 = on(f, billions96 - 6, 10) * (1 - on(f, next98 - 6, 10)), D3 = on(f, next98 - 6, 10)
  // # the running total: −32.8 at the start of B, climbing to −10.6 on "106" (never above zero)
  const total = lerp(-32.8, -10.628, on(f, d106, 40) * 0.6 + on(f, three87, 60) * 0.4)

  return (
    <g>
      <Stage id="ub-bill" frame={f} />
      <USpot f={f} at={you83} x={940} y={560} rx={200} ry={220} />
      <USpot f={f} at={over86} x={1500} y={420} rx={160} ry={140} />
      <USpot f={f} at={d106} x={760} y={560} rx={160} ry={220} />
      <USpot f={f} at={gap95} x={1560} y={560} rx={180} ry={180} />
      <Headline f={f} lines={[[who82, 'WHO PAYS TODAY?', P.ink, 110], [you83, 'MOSTLY, YOU DO', P.ink, 110], [over86, 'THE HIDDEN DISCOUNT IS OVER', P.ink, 96], [even87, 'STILL NOT EARNED BACK', P.ink, 104], [d106, 'END OF 2025: ≈ −$10.6B', P.coralInk, 100], [lesson, 'THE LESSON', P.ink, 110], [asking, 'WHO IS PAYING THE GAP?', P.ink, 104], [remember94, 'THE 4 STEPS', P.ink, 110], [billions96, 'CHEAPER THAN THEY COST', P.ink, 104], [someone, 'PAID FOR BY SOMEONE ELSE', P.ink, 100], [ask98, 'ASK WHO PAYS THE REST', P.ink, 104], [this99, '', P.ink]]} />

      {/* # A) Mia pays the full cost now */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'phone', 'thinking'], [mostly, 'shrug', 'smiling'], [you83, 'offer', 'smiling'], [over86, 'idle', 'thinking']]} x={330} y={GROUND} s={0.85} />
        <g opacity={on(f, today82, 8)}><RideCar x={560} y={GROUND - 10} s={0.45} f={f} rider /></g>
        {/* # the full-cost outline and the rider's part filling it */}
        <rect x={760} y={GROUND - 560} width={360} height={560} rx={18} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="16 12" /><Label x={940} y={GROUND - 625} text="FULL COST" size={46} font="Bebas Neue" color={P.ink2} />
        {(() => { const h = lerp(420, 560, on(f, you83, 18)) + lerp(0, 40, on(f, then85, 14))
          return <g><rect x={780} y={GROUND - h} width={320} height={h} rx={14} fill="#7FC98F" /><text x={940} y={GROUND - 200} textAnchor="middle" fill="#245C3A" style={{ font: '400 70px "Bebas Neue"' }}>YOU PAY</text>
            <g opacity={on(f, then85, 8)}><rect x={780} y={GROUND - h} width={320} height={40} rx={12} fill={P.mint} /><Label x={1150} y={GROUND - h + 30} text="+ PROFIT" size={42} font="Bebas Neue" color={P.mintInk} anchor="start" /></g></g> })()}
        {/* # the investor's old gold top-up, sliding away */}
        <g opacity={(1 - on(f, isnt, 20)) * on(f, who82, 8)} transform={`translate(${lerp(0, 600, on(f, filled84, 30))} 0)`}><rect x={780} y={GROUND - 560} width={320} height={130} rx={12} fill={P.gold} opacity={1 - on(f, you83, 10) * 0.0} /><text x={940} y={GROUND - 480} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>INVESTORS</text></g>
        <g opacity={on(f, investors84, 8)}><MoneyBag x={1640} y={GROUND} s={lerp(1, 0.75, on(f, anymore, 16))} text={f >= anymore ? '×' : '$'} /><Label x={1640} y={GROUND + 60} text="INVESTORS" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, gap84, 8) * (1 - on(f, isnt, 10))}><Label x={1640} y={GROUND - 240} text="EVERY TRIP'S GAP" size={40} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, earns85, 8) * (1 - on(f, words86, 8))} transform="translate(1640 400)"><circle r={56} fill={P.mint} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{f >= profit85 ? '+' : ''}</text></g>
        <g opacity={on(f, covers, 8) * (1 - on(f, words86, 8))}><Label x={1640} y={500} text="COVERS ITS COSTS" size={42} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # the coupon from the start tears in two */}
        <g opacity={on(f, words86, 8)} transform="translate(1500 420)">
          {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 60 * on(f, over86, 14)} ${30 * on(f, over86, 14)}) rotate(${sd * 14 * on(f, over86, 14)})`}>
            <clipPath id={`ubcut${sd}`}><rect x={sd < 0 ? -160 : 0} y={-60} width={160} height={120} /></clipPath>
            <g clipPath={`url(#ubcut${sd})`}><path d="M-150 -50 L150 -50 L150 -16 Q130 0 150 16 L150 50 L-150 50 L-150 16 Q-130 0 -150 -16 Z" fill={P.coral} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{f >= hidden ? 'HIDDEN DISCOUNT' : 'DISCOUNT'}</text></g></g>)}
        </g>
      </g>}

      {/* # B) still in the red: the running total at the end of 2025 */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <TotalGauge x={760} y={330} value={total} scale={14} />
        <g opacity={on(f, d106, 8)}><Label x={760} y={330 + 10.6 * 14 + 80} text="−$10.6B" size={60} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, even87, 8) * (1 - on(f, d106, 8))}><Label x={760} y={330 + 32.8 * 14 + 80} text="END 2022: −$32.8B" size={46} font="Bebas Neue" color={P.ink2} /></g>
        {/* # three profitable years */}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three87 + k * 4, 6) * (1 - on(f, end88 - 4, 10))}><Calendar x={1120 + k * 170} y={320} text={['2023', '2024', '2025'][k]} s={0.62} />
          <g opacity={on(f, profitable, 8)}><circle cx={1120 + k * 170} cy={430} r={26} fill={P.mint} /><text x={1120 + k * 170} y={442} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>+</text></g></g>)}
        <g opacity={on(f, years87, 8) * (1 - on(f, end88 - 4, 10))}><Label x={1290} y={510} text="PROFITABLE YEARS" size={42} font="Bebas Neue" color={P.mintInk} /></g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [still87, 'think', 'thinking'], [lost87, 'armsCrossed', 'thinking'], [helped, 'shrug', 'thinking']]} x={260} y={GROUND} s={0.8} />
        <g opacity={on(f, earned87, 8) * (1 - on(f, end88, 8))}><path d="M900 640 L900 480" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /><path d="M880 500 L900 480 L920 500" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /><Label x={1000} y={560} text="CLIMBING BACK" size={40} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
        <g opacity={on(f, running88, 8)}><Label x={760} y={250} text="RUNNING TOTAL" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, y25, 8) * (1 - on(f, after89 - 4, 10))}><Calendar x={1120} y={330} text="END 2025" s={0.8} /></g>
        <g opacity={on(f, red88, 8)}><Label x={760} y={GROUND + 60} text="STILL BELOW $0" size={44} font="Bebas Neue" color={P.coralInk} /></g>
        {/* # the one-time tax benefit */}
        <g opacity={on(f, after89, 8)} transform={`translate(1500 ${700 - 20 * pop(f, after89, 14)})`}>
          <rect x={-150} y={-160} width={300} height={320} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={4} />
          <text y={-100} textAnchor="middle" fill={P.navy0} style={{ font: '400 48px "Bebas Neue"' }}>{'TAX BENEFIT'}</text>
          <g opacity={on(f, d5, 8)}><text y={0} textAnchor="middle" fill={P.mintInk} style={{ font: '400 100px "Bebas Neue"' }}>+$5B</text></g>
          <g opacity={on(f, onetime, 8)} transform={`translate(0 100) rotate(-8) scale(${lerp(1.3, 1, pop(f, onetime, 12))})`}><rect x={-110} y={-32} width={220} height={64} rx={10} fill="none" stroke={P.coralInk} strokeWidth={6} /><text y={14} textAnchor="middle" fill={P.coralInk} style={{ font: '400 42px "Bebas Neue"' }}>ONE-TIME</text></g>
        </g>
        <g opacity={on(f, helped, 8)}><path d="M1350 700 Q1100 760 870 640" fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="12 10" /></g>
      </g>}

      {/* # C) the lesson: too cheap to be true → who pays the gap? */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, beyond, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, beyond + k * 4, 6)} transform={`translate(260 ${360 + k * 190}) scale(1.05)`}>
          <rect x={-90} y={-60} width={180} height={120} rx={26} fill={['#2F2F3A', '#7FC98F', P.sky][k]} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{['RIDES', 'FOOD', 'NEW APP'][k]}</text></g>)}</g>
        <g opacity={on(f, app91, 8)}><MapPhone x={760} y={560} s={0.95} price={f >= cheap91 ? 'SO CHEAP!' : 'RIDE'} status={f >= true91 ? 'TOO CHEAP?' : ''} /></g>
        {/* # the real cost vs the price: a dashed gap with a "?" */}
        <g opacity={on(f, cheap91, 8)}>
          <rect x={1100} y={GROUND - 520} width={220} height={520} rx={14} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="14 10" /><Label x={1210} y={GROUND - 540} text="REAL COST" size={42} font="Bebas Neue" color={P.ink2} />
          <rect x={1110} y={GROUND - lerp(160, 520, on(f, full93, 20))} width={200} height={lerp(160, 520, on(f, full93, 20))} rx={12} fill="#7FC98F" /><Label x={1210} y={GROUND + 56} text="YOU PAY" size={42} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, asking, 8) * (1 - on(f, investors92, 8))} transform={`translate(1210 ${560 - 16 * pop(f, asking, 14)})`}><circle r={54} fill={P.coral} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>?</text></g>
        <g opacity={on(f, gap91, 8) * (1 - on(f, full93, 10))}><rect x={1110} y={GROUND - 520} width={200} height={360} rx={12} fill={f >= investors92 ? P.gold : P.coral} opacity={f >= investors92 ? 0.9 : 0.15} /></g>
        <g opacity={on(f, sometimes, 8)} transform={`translate(${lerp(1900, 1640, on(f, investors92, 16))} 0)`}><MoneyBag x={0} y={GROUND} s={1} /><Label x={0} y={GROUND + 60} text="INVESTORS" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, betting, 8) * (1 - on(f, works, 8))}><Calendar x={1640} y={360} text={f >= future ? 'THE FUTURE' : 'LATER'} s={0.7} /></g>
        <g opacity={on(f, works, 8)} transform={`translate(1640 380) scale(${lerp(0.6, 1, pop(f, works, 14))})`}><circle r={64} fill={P.mint} /><path d="M-26 0 L-6 20 L28 -20" fill="none" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" /></g>
        {/* # the discount coupon drops off the phone */}
        <g opacity={on(f, discount93, 8) * (1 - on(f, ends + 20, 10))} transform={`translate(760 ${lerp(300, GROUND - 40, on(f, ends, 18))}) rotate(${lerp(0, 30, on(f, ends, 18))})`}><path d="M-110 -40 L110 -40 L110 -12 Q96 0 110 12 L110 40 L-110 40 L-110 12 Q-96 0 -110 -12 Z" fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>DISCOUNT</text></g>
        <g opacity={on(f, moves, 8)}><Mini look="investorF" x={1450} y={GROUND} scale={0.9} frame={f} seed={95} mood="neutral" /><g opacity={on(f, customer, 8)}><Label x={1450} y={GROUND + 60} text="CUSTOMER" size={40} font="Bebas Neue" color={P.ink} /></g></g>
      </g>}

      {/* # D) payoff */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={D1}>
          {([[fare95, 'YOU PAY A FARE', P.mint], [slice95, 'UBER KEEPS A SLICE', P.sky], [didnt, "SLICE < COSTS", P.coral], [investors95, 'INVESTORS PAID THE GAP', P.gold]] as [number, string, string][]).map(([at, t, col], k) => {
            const x = 300 + k * 440
            return <g key={k} opacity={lerp(0.25, 1, on(f, at, 8)) * on(f, four94, 8)} transform={`translate(${x} ${560 - 20 * pop(f, at, 14)})`}>
              <circle cx={0} cy={-200} r={40} fill={col} /><text x={0} y={-182} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 52px "Bebas Neue"' }}>{k + 1}</text>
              {k === 0 && <FareBill x={0} y={-100} w={300} />}
              {k === 1 && <FareBill x={0} y={-100} w={300} split={on(f, slice95, 14)} />}
              {k === 2 && <g><rect x={-110} y={-120} width={90} height={160} rx={10} fill={P.navy3} /><rect x={20} y={-160} width={90} height={200} rx={10} fill="#9D7FD0" /><rect x={-110} y={-160} width={90} height={40} rx={8} fill="none" stroke={P.coral} strokeWidth={5} strokeDasharray="8 6" opacity={on(f, costs95, 8)} /></g>}
              {k === 3 && <g><MoneyBag x={-30} y={40} s={0.7} />{(() => { const fl = fly(f, gap95 - 6, [-30, -60], [80, -120], 16, 80); return f >= gap95 - 6 ? <Coin2 x={fl.x} y={fl.y} r={22} t="$" /> : null })()}</g>}
              <Label x={0} y={140} text={t} size={42} font="Bebas Neue" color={P.ink} />
            </g> })}
          <g opacity={on(f, years95, 8) * (1 - on(f, costs95, 8))}><Label x={1180} y={820} text="FOR YEARS" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={D2}>
          {/* # billions of rides, cheaper than they cost */}
          {Array.from({ length: 15 }, (_, k) => <g key={k} opacity={on(f, rides96 + k, 5) * (1 - on(f, magic + 6, 10))} transform={`translate(${260 + (k % 5) * 200} ${400 + Math.floor(k / 5) * 170}) scale(0.28)`}><RideCar x={0} y={0} f={f} /></g>)}
          {f >= cheaper96 && Array.from({ length: 15 }, (_, k) => <circle key={k} cx={330 + (k % 5) * 200} cy={330 + Math.floor(k / 5) * 170} r={14} fill={P.gold} opacity={on(f, cheaper96 + k, 5) * (1 - on(f, magic + 6, 10))} />)}
          <g opacity={on(f, cost96, 8) * (1 - on(f, magic + 6, 10))}><Label x={660} y={GROUND + 40} text="EACH GOLD COIN: PAID BY INVESTORS" size={40} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, late, 8)}><Calendar x={1480} y={330} text={f >= y2010s ? 'LATE 2010s' : 'THEN'} s={0.8} /></g>
          <g opacity={on(f, magic, 8)} transform="translate(1480 600)"><path d="M-60 60 L50 -50" stroke={P.ink} strokeWidth={14} strokeLinecap="round" /><path d="M50 -50 L60 -80 L70 -50 L100 -40 L70 -30 L60 0 L50 -30 L20 -40 Z" fill={P.gold} />
            <line x1={-90} y1={-90} x2={110} y2={110} stroke={P.coralInk} strokeWidth={10} strokeLinecap="round" opacity={on(f, magic + 8, 6)} /><Label x={10} y={150} text="NOT MAGIC" size={42} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, paid97, 8)} transform={`translate(${lerp(1900, 1740, on(f, someone, 14))} 0)`}><MoneyBag x={0} y={GROUND} s={0.9} /><g opacity={on(f, else97, 8)}><Label x={0} y={GROUND + 56} text="SOMEONE ELSE" size={40} font="Bebas Neue" color={P.ink} /></g></g>
          <g opacity={on(f, cheap97, 8) * (1 - on(f, magic + 6, 10))}><Label x={660} y={300} text="CHEAP RIDES" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={D3}>
          {/* # next time: a ride and a delivery that feel oddly cheap; Mia's $20; who pays the rest? */}
          <Person f={f} who="investorF" beats={[[0, 'phone', 'thinking'], [remember98, 'point', 'smiling'], [ask98, 'think', 'thinking'], [this99, 'idle', 'smiling']]} x={300} y={GROUND} s={0.85} />
          <g opacity={on(f, ride98, 8)}><RideCar x={760} y={GROUND - 10} s={0.6} f={f} /></g>
          <g opacity={on(f, delivery, 8)} transform="translate(1080 900) scale(1.1)"><path d="M-60 -110 L60 -110 L70 0 L-70 0 Z" fill="#7FC98F" /><path d="M-30 -110 Q-30 -150 0 -150 Q30 -150 30 -110" fill="none" stroke="#3E8E5A" strokeWidth={8} /></g>
          <g opacity={on(f, oddly, 8)} transform={`translate(920 ${560 - 14 * pop(f, oddly, 14)})`}><rect x={-120} y={-44} width={240} height={88} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={18} textAnchor="middle" fill={P.mintInk} style={{ font: '400 54px "Bebas Neue"' }}>ODDLY CHEAP</text></g>
          <g opacity={on(f, d20, 8)} transform={`translate(0 ${-16 * pop(f, c('s99:money'), 12)})`}><FareBill x={1500} y={300} w={420} text="$20" /><Label x={1500} y={540} text="MIA'S $20" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, rest98, 8)} transform={`translate(1500 ${700 - 16 * pop(f, rest98, 14)})`}><circle r={60} fill={P.coral} /><text y={26} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 80px "Bebas Neue"' }}>?</text></g>
          <g opacity={on(f, c('s99:not'), 8)}><Label x={960} y={1030} text="HOW THE MONEY WORKS — NOT INVESTMENT ADVICE" size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      <Vignette id="ub-bill" />
    </g>
  )
}

const BEATS = ['s82:who', 's82:today', 's83:mostly', 's83:you', 's84:investors', 's84:filled', 's84:gap', "s84:isn't", 's84:anymore', 's85:earns', 's85:profit', 's85:covers', 's85:then', 's86:words', 's86:hidden', 's86:over', 's87:even', 's87:three', 's87:profitable', 's87:years', 's87:still', 's87:earned', 's87:lost', 's88:end', 's88:2025', 's88:running', 's88:106', 's88:red', 's89:after', 's89:onetime', 's89:5', 's89:tax', 's89:helped', 's90:lesson', 's90:beyond', 's91:app', 's91:cheap', 's91:true', 's91:asking', 's91:gap', 's92:sometimes', 's92:investors', 's92:betting', 's92:future', 's93:works', 's93:discount', 's93:ends', 's93:full', 's93:moves', 's93:customer', 's94:remember', 's94:four', 's95:fare', 's95:slice', 's95:years', "s95:didn't", 's95:costs', 's95:investors', 's95:gap', 's96:billions', 's96:rides', 's96:cheaper', 's96:cost', 's97:cheap', 's97:late', 's97:2010s', 's97:magic', 's97:paid', 's97:someone', 's97:else', 's98:next', 's98:ride', 's98:delivery', 's98:oddly', 's98:remember', 's98:20', 's98:ask', 's98:rest', 's99:this', 's99:money', 's99:not', 's99:advice']
export const UB_BILL = makePiece('ub-bill', 'Uber long ending: who pays today — mostly you: Mia\'s fare fills the full-cost outline, the investors\' gold top-up slides away, a thin profit cap; the DISCOUNT coupon tears (the hidden discount is over); the running total still red, rising from −$32.8B to −$10.6B at end 2025 after three profitable years, a one-time $5B tax benefit; the lesson: an oddly cheap app price, who pays the gap, investors betting on the future, the discount ends and the full price moves back to the customer; payoff: the four steps, billions of rides cheaper than they cost, not magic, someone else paid; next time ask who pays the rest; not investment advice', {
  mood: 'light', Component: Bill, beats: BEATS,
  sfx: [['s83:you', 'pop', 0.25], ["s84:isn't", 'swish', 0.2], ['s86:over', 'swish', 0.25], ['s88:106', 'thud', 0.25], ['s89:onetime', 'pop', 0.2], ['s91:asking', 'pop', 0.2], ['s93:works', 'pop', 0.2], ['s93:ends', 'swish', 0.2], ['s95:gap', 'coin', 0.25], ['s97:magic', 'swish', 0.2], ['s98:rest', 'pop', 0.25]] })
