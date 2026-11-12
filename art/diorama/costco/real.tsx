// ---------------------------------------------------------------- s47–s51a: the answer — ≈ $2 per $100 on goods, ≈ half of operating profit from the fee; low prices keep 84M members paying;
// the same idea behind other memberships; Costco sells trust up front — the card at the door
// # picture-first (owner r36/r37/r39): every line is a drawing; short labels only; one picture group at a time
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Calendar, camera, Coin, Headline, Label, Person, Prop, win } from '../aimoney/common'
import { CoinGrid, MemberCard, Warehouse } from './kit'

const Real: React.FC<PieceProps> = ({ f, c }) => {
  const really = c('s47:really'), money = c('s47:money')
  const goods = c('s48:goods'), every = c('s48:every'), spend = c('s48:spend')
  const half = c('s49:half'), operating = c('s49:operating'), fee = c('s49:fee')
  const low = c('s50:low'), weakness = c('s50:weakness'), reason = c('s50:reason'), d84 = c('s50:84'), paying = c('s50:paying'), year = c('s50:year')
  const idea = c('s50a:idea'), memberships = c('s50a:memberships'), clubs = c('s50a:clubs'), online = c('s50a:online'), access = c('s50a:access'), enough = c('s50a:enough'), renew = c('s50a:renew')
  const groceries = c('s51:groceries'), trust = c('s51:trust'), price = c('s51:price'), payUp = c('s51:pay'), front = c('s51:front')
  const next = c('s51a:next'), show = c('s51a:show'), door = c('s51a:door'), remember = c('s51a:remember'), makes = c('s51a:makes')
  const A = win(f, c('s47'), low), B = win(f, low, groceries), Cc = on(f, groceries, 10)
  const hero: Beat[] = [[0, 'scratchHead', 'thinking'], [c('s50a:subscriptions'), 'explain', 'neutral'], [c('s51:costco'), 'stop', 'neutral'], [goods, 'countOne', 'neutral'], [half, 'present', 'smiling'], [low, 'explain', 'neutral'], [reason, 'point', 'smiling'], [idea, 'explain', 'neutral'],
    [access, 'present', 'smiling'], [groceries, 'stop', 'neutral'], [trust, 'holdChest', 'smiling'], [show, 'point', 'smiling'], [remember, 'pointUp', 'smiling'], [makes, 'confident', 'smug']]
  const shopper: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 12], [door, 'holdUp', 'smiling']]
  return (
    <g>
      <Stage id="rl" frame={f} />
      <Headline f={f} lines={[[c('s47'), 'HOW DOES COSTCO EARN?', P.ink, 130], [every, '≈ $2 OF $100', P.coralInk, 140], [half, '≈ HALF FROM THE FEE', P.goldInk, 130], [d84, '84 MILLION MEMBERS', P.mintInk, 124],
        [memberships, 'THE SAME IDEA', P.ink, 140], [groceries, 'NOT GROCERIES…', P.ink, 140], [trust, '…TRUST', P.goldInk, 160], [door, 'THE CARD AT THE DOOR', P.ink, 124]]} />
      <g transform={camera(f, [[every, 1240, 620, 1.05], [half, 960, 540, 1], [low, 960, 540, 1], [groceries, 960, 540, 1], [door, 1240, 640, 1.05]])}>
        {/* # A: Costco with a question; the $100 of goods leaves just 2 coins; then two piles — goods vs the card's fees */}
        <g opacity={A}>
          <g opacity={1 - on(f, goods, 8)}>
            <Warehouse x={1240} y={880} s={1} label="COSTCO" />
            <g transform={`translate(1240 420) scale(${pop(f, c('s47')) * (1 + 0.1 * on(f, really, 8))})`}><circle r={80} fill={P.gold} /><Label x={0} y={40} text="?" size={130} font="Bebas Neue" color={P.navy0} /></g>
            <g opacity={on(f, money, 6)}>{[0, 1, 2].map((k) => <Coin key={k} x={1560 + k * 70} y={560 - 14 * Math.abs(Math.sin(f / 6 + k))} s={0.8} />)}</g>
          </g>
          <g opacity={on(f, goods, 6) * (1 - on(f, half, 8))}>
            <g opacity={on(f, every, 6)}>{Array.from({ length: 98 }, (_, k) => <circle key={k} cx={1240 + ((k % 10) - 4.5) * 41.8} cy={600 + (Math.floor(k / 10) - 4.5) * 41.8} r={17} fill="none" stroke={P.ink2} strokeWidth={2} strokeDasharray="5 5" />)}</g>
            <CoinGrid f={f} x={1240} y={600} s={0.95} ta={goods + 6} tb={goods + 18} tk={every} a={[1900, 400]} b={[1900, 800]} />
            <g opacity={on(f, spend, 6)} transform="translate(1720 900)"><Prop id="wallet" x={0} y={0} size={140} f={f} /></g>
          </g>
          <g opacity={on(f, half, 6)}>
            <g transform="translate(980 960)">{Array.from({ length: Math.round(on(f, half, 20) * 10) }, (_, k) => <g key={k} transform={`translate(0 ${-k * 24})`}><ellipse cx={0} cy={6} rx={100} ry={18} fill={P.goldD} /><ellipse cx={0} cy={0} rx={100} ry={18} fill={P.gold} /></g>)}<Label x={0} y={70} text="GOODS" size={52} font="Bebas Neue" color={P.ink} /></g>
            <g transform="translate(1440 960)">{Array.from({ length: Math.round(on(f, operating, 20) * 10) }, (_, k) => <g key={k} transform={`translate(0 ${-k * 24})`}><ellipse cx={0} cy={6} rx={100} ry={18} fill={P.goldD} /><ellipse cx={0} cy={0} rx={100} ry={18} fill="#F2D27A" /></g>)}<Label x={0} y={70} text="FEES" size={52} font="Bebas Neue" color={P.ink} /></g>
            <MemberCard x={1440} y={460} s={0.8 * pop(f, fee)} o={on(f, fee, 6)} glow={1} />
          </g>
        </g>
        {/* # B: low prices under a shield → 84 million members keep paying, every year; then other memberships do the same */}
        <g opacity={B}>
          <g opacity={1 - on(f, idea, 8)}>
            <g transform={`translate(940 560) scale(${pop(f, low) * 1.1})`}><Prop id="price-tag" x={0} y={0} size={170} f={f} /><g opacity={on(f, weakness, 6)}><Prop id="shield" x={110} y={70} size={120} f={f} /></g></g>
            <g opacity={on(f, reason, 6)}><path d="M1060 560 L1240 560" stroke={P.goldInk} strokeWidth={10} /><path d="M1230 540 L1260 560 L1230 580 Z" fill={P.goldInk} /></g>
            <g opacity={on(f, reason, 6)}>{Array.from({ length: 12 }, (_, k) => <Mini key={k} look={['hero', 'buyer', 'owner', 'worker'][k % 4]} x={1320 + (k % 6) * 80} y={760 + Math.floor(k / 6) * 170} scale={0.55} frame={f} seed={k + 600} mood="happy" />)}</g>
            {Array.from({ length: 6 }, (_, k) => { const t = ((f - paying) / 26 + k / 6) % 1; return f >= paying ? <Coin key={k} x={lerp(1500, 1700, t)} y={lerp(720, 420, t)} s={0.45} o={Math.sin(t * Math.PI)} /> : null })}
            <g opacity={on(f, paying, 6)} transform="translate(1720 400) scale(0.6)"><MemberCard x={0} y={0} /></g>
            <g opacity={on(f, year, 6)} transform={`translate(1240 360) scale(${pop(f, year) * 0.7})`}><Calendar x={0} y={0} text="YEAR" s={1} /></g>
          </g>
          <g opacity={on(f, idea, 6)}>
            <g opacity={on(f, memberships, 6)}><MemberCard x={930} y={540} s={0.9} r={-6} title="COSTCO" /></g>
            <g opacity={on(f, clubs, 6)} transform={`translate(1290 640) scale(${pop(f, clubs)})`}><Warehouse x={0} y={0} s={0.55} label="CLUB" /></g>
            <g opacity={on(f, online, 6)} transform={`translate(1650 540) scale(${pop(f, online)})`}><Prop id="laptop" x={-30} y={0} size={210} f={f} /><Prop id="warehouse-boxes" x={90} y={50} size={120} f={f} /></g>
            <g opacity={on(f, access, 6)} transform={`translate(1000 900) scale(${pop(f, access)})`}><Prop id="key" x={0} y={0} size={190} f={f} /></g>
            <g opacity={on(f, enough, 6)} transform={`translate(1330 ${900 + 20 * on(f, enough, 14)}) scale(${pop(f, enough)})`}><Prop id="price-tag" x={0} y={0} size={170} f={f} /></g>
            <g opacity={on(f, renew, 6)} transform="translate(1660 900) rotate(-10) scale(1.2)"><rect x={-110} y={-36} width={220} height={72} rx={12} fill="none" stroke={P.mint} strokeWidth={8} /><Label x={0} y={22} text="RENEWED" size={52} font="Bebas Neue" color={P.mintInk} /></g>
          </g>
        </g>
        {/* # C: a grocery basket crossed out; a handshake (trust) over a low price tag; the shopper shows the card at the door and coins pour in */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, next, 8)}>
            <g transform="translate(940 600)"><Prop id="grocery-basket" x={0} y={0} size={190} f={f} /><path d="M-100 -100 L100 100" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, groceries + 8, 6)} /></g>
            <g opacity={on(f, trust, 6)} transform={`translate(1400 560) scale(${pop(f, trust) * 1.3})`}><Prop id="handshake" x={0} y={0} size={200} f={f} /></g>
            <g opacity={on(f, price, 6)} transform="translate(1400 860)"><Prop id="price-tag" x={0} y={0} size={180} f={f} /><Prop id="arrow-down" x={130} y={0} size={100} f={f} /></g>
            {Array.from({ length: 4 }, (_, k) => { const t = span(f, payUp + k * 5, payUp + k * 5 + 20); return t > 0 && t < 1 ? <Coin key={k} x={lerp(940, 1700, t)} y={900 - Math.sin(t * Math.PI) * 200} s={0.5} /> : null })}
            <g opacity={on(f, payUp, 6)} transform="translate(1720 900) scale(0.6)"><MemberCard x={0} y={0} glow={on(f, front, 8)} /></g>
          </g>
          <g opacity={on(f, next, 6)}>
            <Warehouse x={1400} y={900} s={1.1} label="COSTCO" />
            <Person f={f} who="buyer" beats={shopper} x={lerp(900, 1100, span(f, next, door))} y={1190} s={1.1} life={9} />
            <MemberCard x={1180} y={500} s={0.7 * pop(f, show)} o={on(f, show, 6)} glow={on(f, door, 8)} />
            <g opacity={on(f, remember, 6)} transform="translate(1660 420)"><circle r={60} fill={P.white} /><circle cx={-60} cy={70} r={14} fill={P.white} /><Prop id="coin" x={0} y={0} size={80} f={f} /></g>
            {Array.from({ length: 6 }, (_, k) => { const t = ((f - makes) / 24 + k / 6) % 1; return f >= makes ? <Coin key={k} x={1180 + Math.sin(k) * 40} y={lerp(560, 820, t)} s={0.5} o={Math.sin(t * Math.PI)} /> : null })}
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="rl" />
    </g>
  )
}

export const CO_REAL = makePiece('co-real', 'Long: the answer — ≈ $2 per $100 on goods, ≈ half of operating profit from fees; low prices keep 84M members paying; other memberships copy it; Costco sells trust up front', { mood: 'light', Component: Real,
  beats: ["s47:really", "s47:money", "s48:goods", "s48:every", "s48:spend", "s49:half", "s49:operating", "s49:fee", "s50:low", "s50:weakness", "s50:reason", "s50:paying", "s50:year", "s50a:idea", "s50a:memberships", "s50a:clubs", "s50a:online", "s50a:access", "s50a:enough", "s50a:renew", "s51:groceries", "s51:trust", "s51:price", "s51:pay", "s51:front", "s51a:next", "s51a:show", "s51a:door", "s51a:remember", "s51a:makes", "s47", "s50a:subscriptions", "s51:costco"],
  sfx: [['s48:every', 'thud', 0.4], ['s49:fee', 'chime', 0.5], ['s50:84', 'pop', 0.4], ['s51:trust', 'impact', 0.5], ['s51a:door', 'chime', 0.5]] })
