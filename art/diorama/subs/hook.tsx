// ---------------------------------------------------------------- s1–s8: the hook (casino style).
// Maya's sunny design studio, one setting for the whole hook. She holds up the boxed suite (ALL CREATIVE APPS,
// $2,600); one big coin flies out the window to the ADOBE tower, and she puts the box on her shelf to keep. On
// "can't" a red cross lands on the box. On "rent" her laptop shows a $70 / MONTH plan; the wall calendar flips month
// after month, a coin leaving her wallet each time. Music, video, cloud storage and a car pop onto the laptop as
// monthly tiles; a big question mark; the ADOBE tower glows; its coin tower climbs while Maya opens a bill, worried.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, hand, Headline, win } from '../aimoney/common'
import { CoinTower, gestB } from '../buffett/hook'
import { BillEnv, CalPage, Cross, DayWindow, Desk, Maya, SoftBox, Studio, Tower } from './kit'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), whole = c('s1:whole'), creative = c('s1:creative'), n2600 = c('s1:2600'), once = c('s2:once'), keep = c('s2:keep')
  const cant = c('s3:buy'), rent = c('s4:rent'), n70 = c('s4:70'), month4 = c('s4:month'), long4 = c('s4:long')
  const music = c('s5:music'), video = c('s5:video'), storage = c('s5:storage'), car = c('s5:car'), bill5 = c('s5:bill')
  const stop6 = c('s6:stop'), charging = c('s6:charging'), clearest = c('s7:clearest'), switch7 = c('s7:switch'), numbers7 = c('s7:numbers')
  const worth8 = c('s8:worth'), costs8 = c('s8:costs'), think8 = c('s8:think')
  // # extra gesture words
  const G = [c('s1:photoshop'), c('s2:software'), c('s3:today'), c('s4:use'), c('s5:alone'), c('s6:companies'), c('s7:example'), c('s7:happened'), c('s8:customer'), c('s7:step'), c('s8:video'), c('s8:and')]
  const MX = 470, DX = 1060
  const beats = gestB([[0, 'hold', 'smiling'], [once, 'present', 'smiling'], [keep, 'point', 'smiling'], [cant, 'shock', 'shocked'], [rent, 'explain', 'neutral'], [n70, 'point', 'thinking'], [music, 'countA', 'neutral'], [car, 'countB', 'neutral'], [stop6, 'scratchHead', 'thinking'], [clearest, 'point', 'neutral'], [worth8, 'read', 'worried'], [costs8, 'shock', 'shocked']], G)
  // # the box: in Maya's hands, then onto the wall shelf
  const hp = hand(f, beats, MX, 1000, 1.15)
  const toShelf = easeInOut(span(f, once + 6, keep + 8))
  const bx = lerp(hp.x - 40, 250, toShelf), by = lerp(hp.y - 60, 520, toShelf)
  // # the calendar flips one month at a time after "rent"; a coin leaves each flip
  const mi = Math.max(0, Math.floor((f - rent) / 14)), monthsOn = on(f, rent, 8)
  return (
    <g>
      <StageBg id="sb-hook" frame={f} />
      <Studio />
      {/* # the window: the ADOBE tower and its growing coin tower */}
      <DayWindow x={1400} y={300} w={440} h={560} id="sb-hook">
        <Tower x={1560} y={860} s={0.75} glow={on(f, clearest, 8) * (1 - on(f, worth8, 8))} />
        <CoinTower x={1760} y={850} n={Math.min(16, Math.max(0, (f - worth8) / 1.3))} s={0.42} />
      </DayWindow>
      {/* # the wall shelf */}
      <rect x={120} y={640} width={260} height={18} rx={6} fill="#8E6A45" />
      {/* # the calendar on the wall, flipping months */}
      <g opacity={monthsOn * (1 - on(f, stop6, 8))}><CalPage x={250} y={340} top={MONTHS[mi % 12]} big="PAY" s={1} /></g>
      <Desk x={DX} glow={on(f, n70, 4) * (1 - on(f, n70 + 8, 12))}>
        {/* # the laptop: a $70 / MONTH plan, then monthly tiles for music, video, storage, car */}
        <g opacity={win(f, rent, music - 2, 6)} transform={`translate(${DX} 570) scale(${pop(f, rent)})`}><rect x={-160} y={-90} width={320} height={180} rx={16} fill="#FFF5E0" stroke={P.gold} strokeWidth={6} /><text y={-20} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>ALL APPS PLAN</text><text y={50} textAnchor="middle" fill={P.coralInk} opacity={on(f, n70, 4)} style={{ font: '400 60px "Bebas Neue"' }}>$70 / MONTH</text></g>
        {([[music, '♪', '#8A5CC2'], [video, '▶', '#E05A4C'], [storage, '☁', '#3A6EA8'], [car, 'CAR', '#2FA36B']] as [number, string, string][]).map(([at, ic, col], k) => <g key={k} opacity={win(f, at - 1, stop6, 6)} transform={`translate(${DX - 150 + (k % 2) * 300 * 0 + k * 100} 560) scale(${pop(f, at)})`}><rect x={-44} y={-60} width={88} height={120} rx={14} fill={col} /><text y={6} textAnchor="middle" fill="#FFFFFF" style={{ font: '700 50px Inter' }}>{ic}</text><text y={46} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 24px "Bebas Neue"' }}>/MONTH</text></g>)}
        <g opacity={on(f, clearest, 6)}><rect x={DX - 150} y={520} width={300} height={90} rx={45} fill="#C2384A" /><text x={DX} y={580} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 52px "Bebas Neue"' }}>SUBSCRIBE</text></g>
      </Desk>
      {/* # a plant by the desk */}
      <g transform="translate(1330 1000)"><rect x={-40} y={-90} width={80} height={90} rx={10} fill="#C98A5A" />{[-40, 0, 40].map((d, k) => <ellipse key={k} cx={d * 0.8} cy={-150 - (k % 2) * 30} rx={34} ry={80} fill={k === 1 ? '#3E9A62' : '#57B27A'} transform={`rotate(${d * 0.6} ${d * 0.8} -110)`} />)}</g>
      {/* # the big question mark */}
      <g opacity={win(f, stop6 - 2, clearest, 6)} transform={`translate(${DX} 520) scale(${pop(f, stop6) * 0.9})`}><text textAnchor="middle" y={70} fill={P.goldInk} style={{ font: '400 200px "Bebas Neue"' }}>?</text></g>
      {/* # the box: held, then on the shelf, crossed on "can't" */}
      <g opacity={on(f, whole - 2, 6) * (1 - on(f, rent + 10, 8))}><SoftBox x={bx} y={by} s={lerp(0.6, 0.62, toShelf)} name="ALL CREATIVE APPS" price={f > n2600 ? '$2,600' : undefined} /></g>
      <g opacity={1 - on(f, rent + 10, 8)}><Cross x={250} y={520} r={90} t={span(f, cant, cant + 10)} /></g>
      {/* # one coin once (to Adobe); then one coin every month */}
      {(() => { const p = fly(f, once - 2, [MX, 640], [1560, 500], 20, 220); return <g opacity={p.o}><Coin x={p.x} y={p.y} s={1.1} text="$2,600" /></g> })()}
      {Array.from({ length: 8 }, (_, k) => { const p = fly(f, rent + 10 + k * 14, [MX + 60, 700], [1560, 520], 14, 160); return <g key={k} opacity={p.o * (1 - on(f, stop6, 4))}><Coin x={p.x} y={p.y} s={0.6} /></g> })}
      {/* # the bill Maya opens at the end */}
      <g opacity={on(f, costs8 - 4, 8)} transform={`translate(250 ${lerp(700, 560, on(f, costs8 - 4, 12))})`}><BillEnv x={0} y={0} s={1} amount="MORE!" /></g>
      <Maya f={f} beats={beats} x={MX} s={1.15} />
      <Headline f={f} lines={[[n2600, '2012: ALL THE APPS, ABOUT $2,600 ONCE', P.ink, 92], [cant, 'TODAY: NOT FOR SALE THAT WAY', P.coralInk, 100], [n70, 'RENT IT: ABOUT $70 A MONTH', P.goldInk, 100], [music, 'EVERYTHING IS A MONTHLY BILL', P.ink, 100],
        [stop6, 'WHY CHARGE EVERY MONTH?', P.ink, 104], [clearest, 'ADOBE: THE CLEAREST EXAMPLE', P.ink, 100], [worth8, 'WORTH MORE TO THEM · COSTS US MORE', P.goldInk, 92]]} />
      <Vignette id="sb-hook" />
    </g>
  )
}

const BEATS = ['s7:step', 's8:video', 's8:and', 's1:photoshop', 's2:software', 's3:today', 's4:use', 's5:alone', 's6:companies', 's7:example', 's7:happened', 's8:customer', 's1', 's1:whole', 's1:creative', 's1:2600', 's2:once', 's2:keep', 's3:buy', 's4:rent', 's4:70', 's4:month', 's4:long', 's5:music', 's5:video', 's5:storage', 's5:car', 's5:bill', 's6:stop', 's6:charging', 's7:clearest', 's7:switch', 's7:numbers', 's8:worth', 's8:costs', 's8:think']
export const SB_HOOK = makePiece('sb-hook', 'Subscriptions long (casino-style): Maya’s sunny studio; she holds up the ALL CREATIVE APPS box ($2,600) and one big coin flies out of the window to the ADOBE tower; she puts the box on her shelf to keep and a red cross lands on it on “can’t”; her laptop shows an ALL APPS PLAN at $70 / MONTH while the wall calendar flips month after month and a coin leaves each time; music, video, storage and car tiles pop onto the laptop as /MONTH bills; a big question mark; the ADOBE tower glows and its coin tower climbs while Maya opens a bill, worried', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:2600', 'ding', 0.3], ['s2:once', 'coin', 0.3], ['s3:buy', 'swish', 0.3], ['s4:70', 'pop', 0.3], ['s5:car', 'click', 0.3], ['s8:costs', 'thud', 0.3]] })
