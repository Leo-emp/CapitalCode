// ---------------------------------------------------------------- s64–s78: why so much goes unspent (Bankrate 2024).
// Ten people on round bases: four light up gold and hold a card (43 percent, more than 4 in 10); one steps forward
// with a card worth 244 on average. Then three panels: a card past its date (20%), a card slipping through a crack
// in the floor (17%), a shop with its shutter down (12%); the panels overlap into one ring: about a third lost
// money. Why: a bill next to a card (money that does not look like money); a wallet, a drawer, a card that only
// fits one shop door, a clock; a 1.15 balance under a menu whose cheapest drink is 3; a hand that paid and got
// nothing back.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Headline, Person, Tick, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Cup, Drawers, Figure, GiftCard, Storefront, Wallet, Note } from './kit'

const Unspent: React.FC<PieceProps> = ({ f, c }) => {
  const sitting = c('s64:sitting'), used64 = c('s64:used')
  const personal = c('s65:personal'), bankrate = c('s65:bankrate'), surveyed = c('s65:surveyed'), adults65 = c('s65:adults')
  const p43 = c('s66:43'), unused = c('s66:unused'), voucher = c('s66:voucher'), credit = c('s66:credit')
  const four = c('s67:4'), ten = c('s67:10')
  const among = c('s68:among'), average = c('s68:average'), waiting = c('s68:waiting'), d244 = c('s68:244')
  const many69 = c('s69:many'), people69 = c('s69:people'), never69 = c('s69:never'), back69 = c('s69:back')
  const p20 = c('s70:20'), surveyed70 = c('s70:surveyed'), let70 = c('s70:let'), expire = c('s70:expire')
  const p17 = c('s71:17'), lost71 = c('s71:lost')
  const p12 = c('s72:12'), useless = c('s72:useless'), closed = c('s72:closed'), used72 = c('s72:used')
  const people73 = c('s73:people'), group = c('s73:group'), lost73 = c('s73:lost'), card73 = c('s73:card'), together = c('s73:together'), third = c('s73:third')
  const happen = c('s74:happen'), easily = c('s74:easily')
  const look = c('s75:look'), money75 = c('s75:money')
  const wallet = c('s76:wallet'), drawer = c('s76:drawer'), one76 = c('s76:one'), place = c('s76:place'), forget = c('s76:forget')
  const last = c('s77:last'), awkward = c('s77:awkward'), little = c('s77:little'), stop = c('s77:stop')
  const ends = c('s78:ends'), holding = c('s78:holding'), paid = c('s78:paid'), nothing = c('s78:nothing'), back78 = c('s78:back')
  const A = win(f, 0, many69 - 2), B = win(f, many69 - 2, happen - 2), C1 = win(f, happen - 2, wallet - 2), C2 = win(f, wallet - 2, last - 2), C3 = win(f, last - 2, ends - 2), D = on(f, ends - 2, 10)
  const ring = on(f, people73, 24)
  return (
    <g>
      <Stage id="gc-uns" frame={f} />
      <Headline f={f} lines={[[sitting, 'HOW MANY HAVE UNUSED CARDS?', P.ink, 96], [bankrate, 'BANKRATE SURVEY · 2024', P.ink, 96], [p43, '43% HAVE AN UNUSED CARD', P.goldInk, 104], [average, '$244 ON AVERAGE', P.goldInk, 116],
        [never69, 'MONEY THAT NEVER COMES BACK', P.ink, 96], [together, 'ABOUT 1 IN 3 LOST MONEY', P.goldInk, 104], [happen, 'WHY SO EASILY?', P.ink, 104], [look, "MONEY THAT DOESN'T LOOK LIKE MONEY", P.ink, 88],
        [wallet, 'EASY TO FORGET', P.ink, 104], [awkward, 'THE AWKWARD LAST FEW DOLLARS', P.ink, 96], [paid, 'PAID. NOTHING BACK.', P.coralInk, 104]]} />
      {/* # A: ten people; four light up with a card; one steps forward with the average 244 */}
      {A > 0 && <g opacity={A}>
        {Array.from({ length: 10 }, (_, k) => {
          const lit = k < 4 ? on(f, p43 + k * 3, 8) : 0, fwd = k === 1 ? easeInOut(span(f, among, average + 6)) : 0
          return <g key={k} opacity={on(f, surveyed + k * 2, 6) * (k === 1 ? 1 : 1 - on(f, among, 10))}>
            <Figure x={lerp(250 + k * 158, 960, fwd)} y={lerp(760, 940, fwd)} s={lerp(1, 1.6, fwd)} hi={lit} card={on(f, unused + k * 2, 8) * (k < 4 ? 1 : 0)} />
          </g>
        })}
        <g opacity={on(f, personal, 8) * (1 - on(f, surveyed, 8))} transform={`translate(960 560) scale(${pop(f, personal)})`}><rect x={-120} y={-150} width={240} height={300} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-50} y={-170} width={100} height={40} rx={10} fill={P.navy3} />{[0, 1, 2, 3].map((k) => <g key={k}><rect x={-90} y={-90 + k * 56} width={30} height={30} rx={6} fill={k < 2 ? P.mint : '#C8B994'} /><rect x={-44} y={-82 + k * 56} width={120} height={14} rx={7} fill="#C8B994" /></g>)}</g>
        <g opacity={on(f, adults65, 8) * (1 - on(f, p43, 8))}><text x={960} y={880} textAnchor="middle" fill={P.ink2} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>MORE THAN 2,000 AMERICAN ADULTS</text></g>
        <g opacity={on(f, voucher, 8) * (1 - on(f, among, 8))}><text x={960} y={880} textAnchor="middle" fill={P.ink2} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>GIFT CARD · VOUCHER · STORE CREDIT</text></g>
        <g opacity={on(f, four, 8) * (1 - on(f, among, 8))} transform={`translate(${250 + 1.5 * 158} 470) scale(${pop(f, four)})`}><rect x={-170} y={-60} width={340} height={110} rx={20} fill={P.card} /><text x={0} y={26} textAnchor="middle" fill={P.goldInk} style={{ font: '400 76px "Bebas Neue"' }}>4 IN 10+</text></g>
        <g opacity={on(f, ten, 8) * (1 - on(f, among, 8))}><path d="M180 820 L1740 820" stroke={P.ink2} strokeWidth={4} strokeDasharray="6 12" /></g>
        <g opacity={on(f, waiting, 8)} transform={`translate(1460 600) scale(${pop(f, d244)})`}><GiftCard x={0} y={0} s={1} r={-5} amount="$244" color="#3A6EA8" /><text x={0} y={180} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"' }}>AVERAGE WAITING</text></g>
      </g>}
      {/* # B: three ways it is lost — expired 20%, lost 17%, store closed 12%; they overlap into about a third */}
      {B > 0 && <g opacity={B}>
        {[[p20, 360, 'EXPIRED', '20%'], [p17, 960, 'LOST', '17%'], [p12, 1560, 'STORE CLOSED', '12%']].map(([at, x, t, p], k) => {
          const cx = lerp(x as number, 960 + (k - 1) * 200, ring), cy = lerp(620, 640, ring)
          return <g key={k} opacity={Math.max(0.35 * on(f, people69 + k * 3, 8), on(f, (at as number) - 2, 8))}>
            <circle cx={cx} cy={cy} r={lerp(250, 230, ring)} fill={['#C94A3E', '#3A6EA8', '#7A4FB0'][k]} opacity={0.14 + 0.1 * ring} />
            <circle cx={cx} cy={cy} r={lerp(250, 230, ring)} fill="none" stroke={['#C94A3E', '#3A6EA8', '#7A4FB0'][k]} strokeWidth={6} strokeDasharray="14 12" opacity={0.6} />
            <g opacity={(1 - ring) * on(f, (at as number) - 2, 8)}>
              {k === 0 && <g><g opacity={on(f, let70, 8)}><Calendar x={x as number - 80} y={560} text="EXP" s={1} /></g><g opacity={on(f, surveyed70, 8)}><GiftCard x={x as number + 70} y={640} s={0.5} r={8} crack={on(f, expire, 12)} /></g></g>}
              {k === 1 && <g><rect x={x as number - 160} y={720} width={320} height={16} rx={8} fill={P.ink2} opacity={0.5} /><path d={`M${x as number - 40} 720 L${x as number} 740 L${x as number + 40} 720`} fill="none" stroke={P.ink} strokeWidth={6} />
                <GiftCard x={x as number} y={lerp(560, 760, easeInOut(span(f, lost71, lost71 + 20)))} s={0.5} r={lerp(0, 50, span(f, lost71, lost71 + 20))} o={1 - on(f, lost71 + 18, 6)} color="#3A6EA8" /></g>}
              {k === 2 && <g transform={`translate(${x} 760) scale(0.62)`}><Storefront x={0} y={0} sign="STORE" color="#7A4FB0" shutter={on(f, closed, 18)} card={1 - on(f, used72, 10)} /></g>}
              <text x={x as number} y={420} textAnchor="middle" fill={P.goldInk} style={{ font: '400 88px "Bebas Neue"' }}>{p as string}</text>
              <text x={x as number} y={880} textAnchor="middle" fill={P.ink} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 2 }}>{t as string}</text>
            </g>
          </g>
        })}
        <g opacity={on(f, third, 8)} transform={`translate(960 640) scale(${pop(f, third)})`}><text x={0} y={30} textAnchor="middle" fill={on(f, lost73, 8) > 0.5 ? P.coralInk : P.ink} style={{ font: '400 110px "Bebas Neue"' }}>34%</text></g>
        <g opacity={on(f, card73, 8)}><GiftCard x={960} y={lerp(380, 470, on(f, card73, 14))} s={0.3} r={12} crack={1} /></g>
        <g opacity={ring}><text x={960} y={960} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>SOME PEOPLE ARE IN MORE THAN ONE GROUP</text></g>
      </g>}
      {/* # C1: a bill and a card side by side — one looks like money */}
      {C1 > 0 && <g opacity={C1}>
        <g opacity={on(f, easily, 8)}><Note x={640} y={600} s={2.2} text="50" /><text x={640} y={820} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>LOOKS LIKE MONEY</text><Tick x={860} y={480} o={on(f, look, 8)} r={40} /></g>
        <g opacity={on(f, money75, 8)}><GiftCard x={1300} y={600} s={1.1} r={-4} amount="$50" /><text x={1300} y={820} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>LOOKS LIKE PLASTIC</text></g>
      </g>}
      {/* # C2: a wallet, a drawer, one shop door only, a clock */}
      {C2 > 0 && <g opacity={C2}>
        <g opacity={on(f, wallet, 8)}><Wallet x={330} y={640} s={1.4} open={0.4} /><GiftCard x={330} y={520} s={0.35} r={-10} /></g>
        <g opacity={on(f, drawer, 8)}><Drawers x={800} y={900} s={0.8} open={on(f, drawer, 12)}><GiftCard x={0} y={0} s={0.4} r={-4} /></Drawers></g>
        <g opacity={on(f, one76, 8)} transform="translate(1300 900) scale(0.7)"><Storefront x={0} y={0} sign="ONE SHOP" color="#2FA36B" card={on(f, place, 8)} /></g>
        <g opacity={on(f, forget, 8)} transform={`translate(1680 560) scale(${pop(f, forget)})`}><circle r={90} fill={P.paper} stroke={P.edge} strokeWidth={4} /><line x1={0} y1={0} x2={Math.sin(f / 6) * 64} y2={-Math.cos(f / 6) * 64} stroke="#1E3A63" strokeWidth={8} strokeLinecap="round" /><circle r={10} fill={P.coral} /></g>
      </g>}
      {/* # C3: a 1.15 balance below a menu whose cheapest drink is 3 (example) */}
      {C3 > 0 && <g opacity={C3}>
        <rect x={1060} y={300} width={520} height={360} rx={20} fill="#2A2F38" />
        {[['LATTE', '$5'], ['TEA', '$3'], ['COOKIE', '$3']].map(([n, p], k) => <g key={k}><text x={1110} y={390 + k * 90} fill="#F2E6CC" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{n}</text><text x={1530} y={390 + k * 90} textAnchor="end" fill={P.gold} style={{ font: '400 56px "Bebas Neue"' }}>{p}</text></g>)}
        <GiftCard x={600} y={560} s={1} r={-5} amount="$1.15" o={on(f, last - 2, 8)} crack={on(f, stop, 14) * 0.7} />
        <g opacity={on(f, little, 8)}><Tick x={820} y={430} o={on(f, little, 8)} r={44} ok={false} /><text x={600} y={760} textAnchor="middle" fill={P.ink2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>TOO LITTLE TO BUY ANYTHING</text></g>
        <g opacity={on(f, awkward, 8) * (1 - on(f, little, 8))}><text x={600} y={760} textAnchor="middle" fill={P.ink2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>EXAMPLE</text></g>
      </g>}
      {/* # D: the person paid and got nothing back */}
      {D > 0 && <g opacity={D}>
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [holding, 'hold', 'neutral'], [paid, 'emptyPockets', 'worried'], [nothing, 'shrug', 'worried']] as Beat[]} x={760} y={1000} s={1} />
        {(() => { const t = easeInOut(span(f, paid, paid + 24)); return <g opacity={on(f, paid, 6) * (1 - on(f, paid + 22, 6))}><Note x={lerp(900, 1500, t)} y={lerp(640, 420, t)} s={1} text="50" /></g> })()}
        <g opacity={on(f, back78, 8)}><Cup x={1400} y={800} s={1} ghost /><Tick x={1400} y={560} o={on(f, back78, 8)} r={46} ok={false} /></g>
      </g>}
      <Vignette id="gc-uns" />
    </g>
  )
}

const BEATS = ['s65:personal', 's69:many', 's69:people', 's70:surveyed', 's70:let', 's72:used', 's73:people', 's64:sitting', 's64:used', 's65:bankrate', 's65:surveyed', 's65:adults', 's66:43', 's66:unused', 's66:voucher', 's66:credit', 's67:4', 's67:10', 's68:among', 's68:average', 's68:waiting', 's68:244',
  's69:never', 's69:back', 's70:20', 's70:expire', 's71:17', 's71:lost', 's72:12', 's72:useless', 's72:closed', 's73:group', 's73:lost', 's73:card', 's73:together', 's73:third', 's74:happen', 's74:easily', 's75:look', 's75:money',
  's76:wallet', 's76:drawer', 's76:one', 's76:place', 's76:forget', 's77:last', 's77:awkward', 's77:little', 's77:stop', 's78:ends', 's78:holding', 's78:paid', 's78:nothing', 's78:back']
export const GC_UNSPENT = makePiece('gc-unspent', 'Gift cards long: ten people, four light up with a card (43%), one steps forward with the 244 average; three panels expired 20%, lost 17%, store closed 12% overlap into 34%; a bill looks like money, a card like plastic; wallet, drawer, one shop, a clock; a 1.15 balance under a menu; a hand that paid and got nothing back', {
  mood: 'light', Component: Unspent, beats: BEATS,
  sfx: [['s66:43', 'pop', 0.3], ['s68:244', 'ding', 0.35], ['s70:20', 'click', 0.3], ['s71:lost', 'swish', 0.3], ['s72:closed', 'thump', 0.35], ['s73:third', 'chime', 0.35], ['s78:paid', 'swish', 0.3]] })
