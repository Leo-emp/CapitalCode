// ---------------------------------------------------------------- s79–s86: what the law says (US, from 2010).
// A shield settles over a gift card. A five-year track runs from BOUGHT to EARLIEST EXPIRY; a top-up moves the
// start along. A twelve-month calendar fills before a small FEE tag may appear, then at most one tag per month;
// the card flips to show its fee printed on the back. A coffee card with NO EXPIRY · NO FEES. Then the limits:
// the law book cannot open the closed drawer, and a store's shutter comes down on a card.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Doc, Headline, Tick, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Drawers, GiftCard, Storefront } from './kit'

const Shield: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -200 L170 -140 Q170 60 0 180 Q-170 60 -170 -140 Z" fill={P.sky} opacity={0.22} stroke={P.sky} strokeWidth={8} />
  </g>
)

const Law: React.FC<PieceProps> = ({ f, c }) => {
  const law79 = c('s79:law'), cards79 = c('s79:cards'), protection = c('s79:protection')
  const money80 = c('s80:money'), card80 = c('s80:card'), since = c('s80:since'), expire80 = c('s80:expire'), five80 = c('s80:five'), bought = c('s80:bought'), topped = c('s80:topped')
  const still = c('s81:still'), only = c('s81:only'), years81 = c('s81:years')
  const charge = c('s82:charge'), fee82 = c('s82:fee'), using82 = c('s82:using'), used82 = c('s82:used'), whole = c('s82:whole'), year82 = c('s82:year'), once = c('s82:once'), month = c('s82:month')
  const fee83 = c('s83:fee'), printed = c('s83:printed'), clearly = c('s83:clearly')
  const further = c('s84:further'), starbucks = c('s84:starbucks'), expiry = c('s84:expiry'), service = c('s84:service')
  const law85 = c('s85:law'), remember = c('s85:remember'), drawer = c('s85:drawer')
  const closes = c('s86:closes'), good = c('s86:good'), money86 = c('s86:money'), lost = c('s86:lost')
  const A = win(f, 0, charge - 2), B = win(f, charge - 2, further - 2), C = win(f, further - 2, law85 - 2), D = on(f, law85 - 2, 10)
  // # the five-year track: a top-up restarts the five years (the bar empties and grows again)
  const bar = f < topped ? on(f, five80, 24) : on(f, topped + 4, 24)
  return (
    <g>
      <Stage id="gc-law" frame={f} />
      <Headline f={f} lines={[[law79, 'US LAW SINCE 2010', P.ink, 104], [five80, 'NO EXPIRY FOR AT LEAST 5 YEARS', P.goldInk, 96], [still, 'IT CAN STILL EXPIRE, LATER', P.ink, 100], [charge, 'FEES FOR NOT USING THE CARD', P.ink, 96],
        [whole, 'ONLY AFTER A WHOLE YEAR', P.goldInk, 104], [once, 'AT MOST ONE A MONTH', P.goldInk, 104], [printed, 'PRINTED ON THE CARD', P.ink, 104], [further, 'SOME GO FURTHER', P.ink, 104], [law85, 'WHAT THE LAW CANNOT DO', P.coralInk, 100]]} />
      {/* # A: a shield over a card; the five-year track; a top-up restarts it */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, since - 2, 10)}><GiftCard x={960} y={600} s={1.2} r={-4} /><Shield x={960} y={600} s={pop(f, protection) * 1.3} o={on(f, protection, 10)} /><g opacity={on(f, cards79, 8)}><Doc x={420} y={640} s={0.9} title="LAW" lines={4} /></g></g>
        <g opacity={on(f, since - 2, 10)}>
          <rect x={300} y={600} width={1320} height={20} rx={10} fill={P.ink2} opacity={0.4} />
          <g opacity={on(f, since, 8) * (1 - on(f, money80, 8))}><Calendar x={300} y={450} text="2010" s={1.1} /></g>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, expire80 + k * 3, 6)}><circle cx={300 + k * 264} cy={610} r={18} fill={P.ink2} /><text x={300 + k * 264} y={690} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>{k === 0 ? 'YEAR 0' : `YEAR ${k}`}</text></g>)}
          <rect x={300} y={600} width={1320 * bar} height={20} rx={10} fill={P.mint} />
          <g opacity={on(f, years81, 8) * (1 - on(f, years81 + 30, 10))}><rect x={290} y={590} width={1340} height={40} rx={20} fill={P.mint} opacity={0.25} /></g>
          {/* # BOUGHT card at the start; a top-up moves it along; the earliest expiry moves with it */}
          <g opacity={on(f, money80, 8) * (1 - on(f, card80, 8))}><circle cx={300} cy={470} r={40} fill={P.gold} /><text x={300} y={486} textAnchor="middle" fill="#0E1B33" style={{ font: '400 44px "Bebas Neue"' }}>$</text></g>
          <g transform={`translate(300 470)`} opacity={on(f, card80, 8)}><GiftCard x={0} y={0} s={0.4} r={-6} /><text x={0} y={-90} textAnchor="middle" fill={P.ink} style={{ font: '400 46px "Bebas Neue"' }}>{f > topped ? 'LAST TOP-UP' : 'BOUGHT'}</text></g>
          <g transform={`translate(1560 470)`} opacity={on(f, five80 + 10, 8)}><rect x={-120} y={-44} width={240} height={88} rx={14} fill={P.coral} /><text x={0} y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>EARLIEST EXPIRY</text></g>
          <g opacity={on(f, only, 8)}><text x={960} y={860} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 2 }}>ONLY AFTER AT LEAST 5 YEARS</text></g>
        </g>
      </g>}
      {/* # B: twelve months must pass before any fee; then at most one per month; printed on the back */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, fee83 - 2, 10)}>
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, fee82 + k * 1.5, 6)}><Calendar x={330 + (k % 6) * 180} y={k < 6 ? 440 : 660} text={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][k]} s={0.8} /></g>)}
          <g opacity={on(f, charge, 8) * (1 - on(f, month - 4, 8))}><GiftCard x={1500} y={560} s={0.6} r={-6} /><text x={1500} y={720} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>NOT USED</text></g>
          <g opacity={on(f, used82, 8)}><path d={`M240 780 L${240 + 1080 * on(f, used82, 24)} 780`} stroke={P.mint} strokeWidth={10} strokeLinecap="round" /></g>
          <g opacity={on(f, year82, 8)}><text x={780} y={860} textAnchor="middle" fill={P.mintInk} style={{ font: '400 56px "Bebas Neue"' }}>12 MONTHS UNUSED</text></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, month + k * 5, 8)} transform={`translate(${1500 + 0} ${380 + k * 160}) scale(${pop(f, month + k * 5)})`}><rect x={-110} y={-48} width={220} height={96} rx={14} fill={P.coral} /><text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{['MONTH 13', 'MONTH 14', 'MONTH 15'][k]}</text></g>)}
          <g opacity={on(f, once, 8)}><text x={1500} y={900} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"' }}>1 FEE MAX EACH</text></g>
        </g>
        <g opacity={on(f, fee83 - 2, 10)}>
          {(() => { const flip = easeInOut(span(f, printed, printed + 16)); const sx = Math.abs(Math.cos(flip * Math.PI)); return <g transform={`translate(960 600) scale(${sx * 1.6} 1.6)`}>
            {flip < 0.5 ? <GiftCard x={0} y={0} s={1} /> : <g><rect x={-170} y={-104} width={340} height={208} rx={22} fill="#E8EEF5" /><rect x={-170} y={-70} width={340} height={40} fill="#1B2233" />
              <text x={-140} y={20} fill="#1E3A63" style={{ font: '400 30px "Bebas Neue"' }}>INACTIVITY FEE: AT MOST 1 A MONTH</text><text x={-140} y={60} fill="#1E3A63" style={{ font: '400 30px "Bebas Neue"' }}>AFTER 12 MONTHS UNUSED</text></g>}
          </g> })()}
          <g opacity={on(f, clearly, 8)}><Tick x={1300} y={460} o={on(f, clearly, 8)} r={48} /></g>
        </g>
      </g>}
      {/* # C: some go further — a coffee card with no expiry and no fees */}
      {C > 0 && <g opacity={C}>
        <GiftCard x={760} y={600} s={1.3} r={-4} title="COFFEE CARD" />
        <g opacity={on(f, expiry, 8)} transform={`translate(1360 520) scale(${pop(f, expiry)})`}><rect x={-200} y={-50} width={400} height={100} rx={16} fill={P.mint} /><text x={0} y={24} textAnchor="middle" fill="#0E1B33" style={{ font: '400 64px "Bebas Neue"' }}>NO EXPIRY DATE</text></g>
        <g opacity={on(f, service, 8)} transform={`translate(1360 680) scale(${pop(f, service)})`}><rect x={-200} y={-50} width={400} height={100} rx={16} fill={P.mint} /><text x={0} y={24} textAnchor="middle" fill="#0E1B33" style={{ font: '400 64px "Bebas Neue"' }}>NO SERVICE FEES</text></g>
        <g opacity={on(f, starbucks, 8)}><text x={760} y={860} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>STARBUCKS, IN THE US</text></g>
      </g>}
      {/* # D: the law cannot open a forgotten drawer, or a closed store */}
      {D > 0 && <g opacity={D}>
        <g opacity={on(f, remember, 8)}><Drawers x={600} y={980} s={1} open={0} dust={1} /><Doc x={320} y={560} s={0.6} title="LAW" lines={3} /><Tick x={600} y={460} o={on(f, drawer, 8)} r={44} ok={false} /></g>
        <g opacity={on(f, closes, 8)} transform="translate(1380 980) scale(0.95)"><Storefront x={0} y={0} sign="STORE" color="#7A4FB0" shutter={on(f, good, 20)} card={1 - on(f, money86, 10)} /></g>
        <g opacity={on(f, lost, 8)}><GiftCard x={1380} y={420} s={0.5} r={10} crack={on(f, lost, 12)} /></g>
      </g>}
      <Vignette id="gc-law" />
    </g>
  )
}

const BEATS = ['s79:law', 's79:cards', 's79:protection', 's80:since', 's80:expire', 's80:five', 's80:bought', 's80:topped', 's81:still', 's81:only', 's80:money', 's80:card', 's81:years', 's82:charge', 's82:fee', 's82:using', 's82:used', 's82:whole', 's82:year', 's82:once', 's82:month',
  's83:fee', 's83:printed', 's83:clearly', 's84:further', 's84:starbucks', 's84:expiry', 's84:service', 's85:law', 's85:remember', 's85:drawer', 's86:closes', 's86:good', 's86:money', 's86:lost']
export const GC_LAW = makePiece('gc-law', 'Gift cards long: a shield over a card; a five-year track from bought to the earliest expiry, a top-up moves it; twelve months must pass before a fee, then at most one a month; the fee printed on the back of the card; a coffee card with no expiry and no service fees; the law cannot open a forgotten drawer or a closed store', {
  mood: 'dark', Component: Law, beats: BEATS,
  sfx: [['s79:protection', 'chime', 0.3], ['s80:five', 'swish', 0.3], ['s80:topped', 'click', 0.3], ['s82:month', 'pop', 0.3], ['s83:printed', 'swish', 0.3], ['s84:expiry', 'ding', 0.3], ['s86:good', 'thump', 0.35]] })
