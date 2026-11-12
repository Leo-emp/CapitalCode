// ---------------------------------------------------------------- s40a–s40e: the weak spot is trust — if members found the same prices elsewhere, renewals and ≈ half of operating
// profit would fall; Costco guards prices; a hot dog price rise earns cents, a lost member costs $65 a year; rival clubs and online memberships compete for the wallet
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Coin, Col, Headline, Label, Person, Prop, win } from '../aimoney/common'
import { HotDog, MemberCard, Warehouse } from './kit'

const Weak: React.FC<PieceProps> = ({ f, c }) => {
  const weak = c('s40a:weak'), trust = c('s40a:trust')
  const same = c('s40b:same'), renewals = c('s40b:renewals'), fall = c('s40b:fall'), half = c('s40b:half'), operating = c('s40b:operating')
  const guards = c('s40c:guards'), rise = c('s40c:rise')
  const raising = c('s40d:raising'), cents = c('s40d:cents'), losing = c('s40d:losing'), d65 = c('s40d:65'), every = c('s40d:every')
  const rivals = c('s40e:rivals'), clubs = c('s40e:clubs'), online = c('s40e:online'), wallet = c('s40e:wallet')
  const A = win(f, c('s40a'), guards), B = win(f, guards, rivals), Cc = on(f, rivals, 10)
  const hero: Beat[] = [[0, 'nervous', 'worried'], [c('s40c:costco'), 'stop', 'neutral'], [c('s40e:memberships'), 'explain', 'neutral'], [trust, 'holdChest', 'neutral'], [same, 'lookFar', 'thinking'], [fall, 'despair', 'worried'], [guards, 'stop', 'neutral'], [raising, 'hold', 'neutral'], [losing, 'shock', 'shocked'], [rivals, 'point', 'thinking']]
  return (
    <g>
      <Stage id="wk" frame={f} tint="teal" />
      <Headline f={f} lines={[[c('s40a'), 'ONE WEAK SPOT', P.coralInk, 140], [trust, 'TRUST', P.goldInk, 160], [same, 'SAME PRICES ELSEWHERE?', P.ink, 124], [renewals, 'RENEWALS WOULD FALL', P.coralInk, 124], [half, 'FEES ≈ HALF THE PROFIT', P.coralInk, 116],
        [guards, 'SO COSTCO GUARDS ITS PRICES', P.ink, 108], [rise, 'EVEN WHEN COSTS RISE', P.ink, 124], [raising, 'A PRICIER HOT DOG?', P.ink, 124], [cents, 'A FEW CENTS', P.ink, 140], [losing, 'A LOST MEMBER…', P.coralInk, 130], [d65, '−$65 A YEAR', P.coralInk, 140], [every, 'EVERY YEAR', P.coralInk, 140],
        [rivals, 'RIVALS KNOW IT TOO', P.ink, 130], [clubs, 'OTHER WAREHOUSE CLUBS', P.ink, 120], [online, 'ONLINE MEMBERSHIPS', P.ink, 124], [wallet, 'ALL AFTER YOUR WALLET', P.goldInk, 124]]} />
      <g transform={camera(f, [[trust, 1240, 620, 1.06], [same, 960, 540, 1], [guards, 960, 540, 1], [rivals, 960, 540, 1]])}>
        {/* # A: the card cracks under a question; renewals drop and half the profit column dims */}
        <g opacity={A}>
          <g opacity={1 - on(f, same, 8)}><MemberCard x={1240} y={600} s={1.6 * pop(f, c('s40a'))} glow={on(f, trust, 10)} /><g opacity={on(f, weak, 6)}><Prop id="cracks" x={1300} y={560} size={260} f={f} /></g></g>
          <g opacity={on(f, c('s40b:members'), 6) * (1 - on(f, same, 8))}>{[0, 1, 2, 3].map((k) => <Mini key={k} look={['buyer', 'hero', 'worker', 'owner'][k]} x={lerp(900 + k * 90, 1500 + k * 90, span(f, c('s40b:members'), c('s40b:members') + 50))} y={960} scale={0.8} frame={f} seed={k + 120} />)}
            <g opacity={on(f, c('s40b:find'), 6)} transform="translate(1700 520)"><Prop id="magnifier" x={0} y={0} size={160} f={f} /></g></g>
          <g opacity={on(f, same, 6)}>
            <g transform={`translate(960 600) scale(${pop(f, same)})`}><Prop id="price-tag" x={-80} y={0} size={150} f={f} /><Label x={0} y={30} text="=" size={110} font="Bebas Neue" color={P.ink} /><Prop id="price-tag" x={80} y={0} size={150} f={f} /><Label x={0} y={150} text="ELSEWHERE" size={52} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, renewals, 6)} transform="translate(1340 600)"><Prop id="arrow-down" x={0} y={0} size={160} f={f} /><Label x={0} y={140} text="RENEWALS" size={52} font="Bebas Neue" color={P.coralInk} /></g>
            <g opacity={on(f, c('s40b:fees'), 6)}>{[0, 1, 2].map((k) => { const t = ((f - c('s40b:fees')) / 24 + k / 3) % 1; return <Coin key={k} x={1600 + k * 60} y={500 + t * 420} s={0.5} o={1 - t} /> })}</g>
            <g opacity={on(f, half, 6)}><Col x={1680} y={960} h={480} w={220} color={P.mint} value="" label={f >= operating ? 'OPERATING PROFIT' : ''} /><rect x={1570} y={480} width={220} height={240} rx={14} fill={P.coral} opacity={0.4 + 0.5 * on(f, fall, 10)} /><Label x={1680} y={620} text="½" size={110} font="Bebas Neue" color="#FFFFFF" /></g>
          </g>
        </g>
        {/* # B: a shield over the price tag; the hot dog's cents vs a lost member's $65 a year */}
        <g opacity={B}>
          <g opacity={on(f, c('s40c:costco'), 6) * (1 - on(f, raising, 8))} transform="translate(1660 960) scale(0.45)"><Warehouse x={0} y={0} label="COSTCO" /></g>
          <g opacity={on(f, c('s40c:carefully'), 6) * (1 - on(f, raising, 8))} transform="translate(1240 600)"><circle r={200} fill={P.gold} opacity={0.15 + 0.08 * Math.sin(f / 5)} /></g>
          <g opacity={1 - on(f, raising, 8)} transform={`translate(1240 600) scale(${pop(f, guards) * 1.3})`}><Prop id="shield" x={0} y={0} size={240} f={f} /><g transform="translate(0 10) scale(0.5)"><Prop id="price-tag" x={0} y={0} size={200} f={f} /></g>
            <g opacity={on(f, rise, 6)}>{[-180, 180].map((x) => <g key={x} transform={`translate(${x} ${-60 - 20 * Math.abs(Math.sin(f / 7))})`}><Prop id="arrow-up" x={0} y={0} size={90} f={f} /></g>)}</g></g>
          <g opacity={on(f, raising, 6)}>
            <HotDog x={980} y={580} s={0.9 * pop(f, raising)} />
            <g opacity={on(f, cents, 6)} transform="translate(980 820)">{[0, 1].map((k) => <Coin key={k} x={-40 + k * 80} y={0} s={0.6} text="¢" />)}<Label x={0} y={90} text="+ A FEW CENTS" size={52} font="Bebas Neue" color={P.ink} /></g>
            <Label x={1250} y={640} text={f >= losing ? 'VS' : ''} size={90} font="Bebas Neue" color={P.ink2} />
            <g opacity={on(f, losing, 6)} transform={`translate(1560 600) scale(${pop(f, losing)})`}><MemberCard x={0} y={0} s={0.9} r={-8} /><path d="M-150 -100 L150 100" stroke={P.coral} strokeWidth={14} strokeLinecap="round" /></g>
            <g opacity={on(f, d65, 6)} transform="translate(1560 840)"><rect x={-150} y={-50} width={300} height={100} rx={18} fill={P.coral} /><Label x={0} y={32} text={f >= every ? '−$65 / YEAR' : '−$65'} size={70} font="Bebas Neue" color="#FFFFFF" /></g>
          </g>
        </g>
        {/* # C: three cards reach for one wallet */}
        <g opacity={Cc}>
          <g transform={`translate(1240 860) scale(${pop(f, wallet)})`} opacity={on(f, wallet, 6)}><Prop id="wallet" x={0} y={0} size={200} f={f} /></g>
          <g transform={`translate(${40 * Math.sin((f - c('s40e:competing')) / 4) * on(f, c('s40e:competing'), 6)} ${60 * on(f, c('s40e:competing'), 20)})`}>
          <MemberCard x={900} y={520} s={0.8 * pop(f, rivals)} r={-10} title="COSTCO" />
          <MemberCard x={1240} y={460} s={0.8 * pop(f, clubs)} o={on(f, clubs, 6)} title="OTHER CLUB" exec />
          <g opacity={on(f, online, 6)} transform={`translate(1600 520) scale(${0.8 * pop(f, online)}) rotate(10)`}><MemberCard x={0} y={0} title="ONLINE PLUS" /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="wk" />
    </g>
  )
}

export const CO_WEAK = makePiece('co-weak', 'Long: the weak spot is trust — same prices elsewhere would cut renewals and ≈ half the profit; a hot dog rise earns cents, a lost member costs $65 a year; rivals compete', { mood: 'dark', Component: Weak,
  beats: ["s40a:weak", "s40a:trust", "s40b:same", "s40b:renewals", "s40b:fall", "s40b:half", "s40b:operating", "s40c:guards", "s40c:rise", "s40d:raising", "s40d:cents", "s40d:losing", "s40d:65", "s40d:every", "s40e:rivals", "s40e:clubs", "s40e:online", "s40e:wallet", "s40a", "s40c:costco", "s40e:memberships", "s40b:members", "s40b:find", "s40b:fees", "s40c:carefully", "s40e:competing"],
  sfx: [['s40a:trust', 'thud', 0.5], ['s40b:fall', 'crack', 0.4], ['s40c:guards', 'pop', 0.4], ['s40d:65', 'thud', 0.4], ['s40e:wallet', 'swish', 0.4]] })
