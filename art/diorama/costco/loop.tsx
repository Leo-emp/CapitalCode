// ---------------------------------------------------------------- s32–s40: the loop — low prices → renewals (92.3% U.S./Canada, 89.8% worldwide: 9 in 10 come back) → steady,
// predictable fees → low prices still profitable → more members → more buying power; 890 → 939 warehouses; 2024 fee rise $60→$65, $120→$130; renewal 92.9% → 92.3%
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Calendar, camera, Coin, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { MemberCard, Warehouse } from './kit'

const Gauge: React.FC<{ x: number; y: number; v: number; t: number; label: string; o?: number }> = ({ x, y, v, t, label, o = 1 }) => {
  const a = Math.PI * (v / 100) * t
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d="M-160 0 A160 160 0 0 1 160 0" stroke={P.card} strokeWidth={44} fill="none" />
    <path d={`M-160 0 A160 160 0 0 1 ${-160 * Math.cos(a)} ${-160 * Math.sin(a)}`} stroke={P.mint} strokeWidth={44} fill="none" />
    <Label x={0} y={-20} text={`${v.toFixed(1)}%`} size={84} font="Bebas Neue" color={P.ink} /><Label x={0} y={60} text={label} size={46} font="Bebas Neue" color={P.ink2} />
  </g>
}

const Loop: React.FC<PieceProps> = ({ f, c }) => {
  const machine = c('s32:machine')
  const low = c('s33:low'), worth = c('s33:worth'), renew = c('s33:renew')
  const d92 = c('s34:92'), d90 = c('s34a:90')
  const d100 = c('s34b:10'), d9 = c('s34b:9'), again = c('s34b:again')
  const predictable = c('s34c:predictable'), next = c('s34c:next')
  const steady = c('s35:steady'), profit = c('s35:profit')
  const members = c('s36:members'), power = c('s36:power'), down = c('s36:down')
  const suppliers = c('s36a:suppliers'), enormous = c('s36a:enormous')
  const store = c('s37:store'), d890 = c('s37:890'), d939 = c('s37:939')
  const tested = c('s38:tested'), raised = c('s38:raised'), d60 = c('s38:60')
  const executive = c('s38a:executive'), d120 = c('s38a:120')
  const later = c('s39:later'), still = c('s39:still'), slightly = c('s39:slightly')
  const fair = c('s40:fair'), scare = c('s40:scare')
  const A = win(f, c('s32'), steady), B = win(f, steady, tested), Cc = on(f, tested, 10)
  const hero: Beat[] = [[0, 'explain', 'neutral'], [c('s33:members'), 'present', 'neutral'], [c('s34c:idea'), 'think', 'neutral'], [c('s37:in'), 'point', 'neutral'], [c('s34b:think'), 'think', 'thinking'], [c('s35:keep'), 'present', 'smiling'], [c('s38:in'), 'read', 'thinking'], [c('s34c:starts'), 'pointUp', 'smiling'], [c('s38:first'), 'countOne', 'neutral'], [c('s40:members'), 'nodA', 'smiling', 'nodB', 16], [low, 'pointUp', 'smiling'], [d92, 'fistPump', 'smiling'], [d100, 'countA', 'neutral', 'countB', 14], [predictable, 'read', 'smiling'], [steady, 'explain', 'neutral'],
    [power, 'confident', 'smug'], [d939, 'celebrate', 'smiling'], [raised, 'nervous', 'worried'], [still, 'relief', 'smiling'], [scare, 'thumbsUp', 'smiling']]
  // # the four nodes of the loop, around a circle
  const nodes: [string, string, number][] = [['LOW PRICES', 'price-tag', low], ['RENEWALS', 'calendar', renew], ['STEADY FEES', 'coin-stack', steady], ['BUYING POWER', 'warehouse-boxes', power]]
  const pos = (k: number) => ({ x: 1240 + Math.sin((k / 4) * Math.PI * 2) * 300, y: 600 - Math.cos((k / 4) * Math.PI * 2) * 240 })
  return (
    <g>
      <Stage id="lp" frame={f} />
      <Headline f={f} lines={[[c('s32'), 'THE WHOLE MACHINE', P.ink, 140], [low, 'LOW PRICES → WORTH IT', P.mintInk, 120], [renew, 'SO MEMBERS RENEW', P.ink, 130], [d92, 'U.S. & CANADA: ≈ 92% RENEW', P.mintInk, 108], [d90, 'WORLDWIDE: ≈ 90%', P.mintInk, 124],
        [d9, '9 IN 10 COME BACK', P.goldInk, 130], [predictable, 'PREDICTABLE FEES', P.ink, 130], [steady, 'STEADY FEES…', P.ink, 130], [profit, '…LOW PRICES, STILL PROFITABLE', P.mintInk, 104], [members, 'MORE MEMBERS', P.ink, 130], [power, 'MORE BUYING POWER', P.goldInk, 124],
        [down, 'PRICES DOWN AGAIN', P.mintInk, 124], [suppliers, 'SUPPLIERS WANT IN', P.ink, 130], [d890, '890 WAREHOUSES (2024)', P.ink, 116], [d939, '939 (2026)', P.goldInk, 140],
        [tested, '2024: THE TEST', P.ink, 140], [raised, 'FIRST FEE RISE SINCE 2017', P.coralInk, 112], [d60, '$60 → $65', P.goldInk, 140], [d120, 'EXECUTIVE: $120 → $130', P.goldInk, 116], [later, 'TWO YEARS LATER…', P.ink, 130], [still, 'STILL ≈ 92% RENEW', P.mintInk, 124],
        [fair, 'PRICES FEEL FAIR…', P.ink, 130], [scare, '…A FEW DOLLARS DON’T SCARE THEM', P.mintInk, 100]]} />
      <g transform={camera(f, [[c("s33:renew"), 1300, 500, 1.06], [c("s34a:90"), 1500, 720, 1.08], [c("s34b:10"), 960, 540, 1], [c("s34b:9"), 1060, 900, 1.08], [c("s34c:predictable"), 1100, 620, 1.08], [c("s35:steady"), 960, 540, 1], [c("s36:members"), 1240, 600, 1.06], [c("s36:power"), 960, 600, 1.08], [c("s36a:suppliers"), 1720, 900, 1.08], [c("s37:store"), 960, 540, 1], [c("s37:890"), 900, 900, 1.08], [c("s38:60"), 1000, 820, 1.08], [c("s38a:120"), 1500, 820, 1.08], [c("s39:later"), 960, 540, 1], [c("s39:still"), 1500, 760, 1.1], [c("s40:scare"), 1270, 460, 1.06], [d92, 1240, 620, 1.04], [d100, 960, 540, 1], [steady, 960, 540, 1], [d939, 1240, 640, 1.04], [tested, 960, 540, 1]])}>
        {/* # A: the loop starts: low prices → renewals; renewal gauges; 9 of 10 people come back; a calendar of next year's fees */}
        <g opacity={A}>
          <g opacity={1 - on(f, d92, 8)}>{nodes.slice(0, 2).map(([t, id, at], k) => { const p = pos(k); return <g key={k} opacity={on(f, at, 6)} transform={`translate(${p.x} ${p.y}) scale(${pop(f, at)})`}><circle r={110} fill={P.card} /><Prop id={id} x={0} y={0} size={120} f={f} /><Label x={0} y={160} text={t} size={46} font="Bebas Neue" color={P.ink} /></g> })}
            <g opacity={on(f, worth, 6)}><path d={`M${pos(0).x + 110} ${pos(0).y + 40} Q1560 380 ${pos(1).x - 20} ${pos(1).y - 110}`} stroke={P.goldInk} strokeWidth={10} fill="none" strokeDasharray="18 12" /></g>
            <g opacity={on(f, machine, 6) * (1 - on(f, low, 8))} transform={`translate(1240 620) scale(${pop(f, machine)})`}><circle r={150} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="22 16" strokeDashoffset={-f * 2} /><Prop id="cross" x={0} y={0} size={0} f={f} /></g></g>
          <g opacity={on(f, c('s34:united'), 6) * (1 - on(f, d92, 8))} transform={`translate(1240 620) scale(${pop(f, c('s34:united'))})`}><Prop id="map-pin" x={-110} y={0} size={140} f={f} /><Prop id="map-pin" x={110} y={0} size={140} f={f} /><Label x={-110} y={110} text="U.S." size={52} font="Bebas Neue" color={P.ink} /><Label x={110} y={110} text="CANADA" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, c('s34:renewed'), 6) * (1 - on(f, d100, 8))} transform={`translate(1040 470) scale(${pop(f, c('s34:renewed')) * 0.6})`}><MemberCard x={0} y={0} /><g transform="rotate(-12)"><rect x={-110} y={-30} width={220} height={60} rx={10} fill="none" stroke={P.mint} strokeWidth={8} /><Label x={0} y={18} text="RENEWED" size={44} font="Bebas Neue" color={P.mintInk} /></g></g>
          <g opacity={on(f, c('s34a:worldwide'), 6) * (1 - on(f, d100, 8))} transform={`translate(1500 470) scale(${pop(f, c('s34a:worldwide')) * 0.8})`}><Prop id="globe" x={0} y={0} size={160} f={f} /></g>
          <g opacity={on(f, d92, 6) * (1 - on(f, d100, 8))}><Gauge x={1040} y={720} v={92.3} t={on(f, d92, 20)} label="U.S. & CANADA" /><Gauge x={1500} y={720} v={89.8} t={on(f, d90, 20)} label="WORLDWIDE" o={on(f, d90, 6)} /></g>
          <g opacity={on(f, d100, 6) * (1 - on(f, predictable, 8))}>{Array.from({ length: 10 }, (_, k) => <Mini key={k} look={['hero', 'buyer', 'owner', 'worker', 'investor'][k % 5]} x={lerp(860 + k * 90, k === 9 ? 1900 : 860 + k * 90, on(f, again, 20))} y={880} scale={0.8} frame={f} seed={k + 500} mood={k === 9 ? 'neutral' : 'happy'} />)}
            <g opacity={on(f, d9, 6)}><path d="M820 940 L1650 940" stroke={P.mintInk} strokeWidth={8} /><Label x={1240} y={1010} text="9 OF 10 RENEW" size={56} font="Bebas Neue" color={P.mintInk} /></g></g>
          <g opacity={on(f, c('s34c:fees'), 6) * (1 - on(f, predictable, 8))}>{[0, 1, 2].map((k) => <Coin key={k} x={1120 + k * 110} y={620 - 12 * Math.abs(Math.sin(f / 6 + k))} s={0.9} />)}</g>
          <g opacity={on(f, predictable, 6)}><g transform={`translate(1100 620) scale(${pop(f, predictable)})`}><Calendar x={0} y={0} text={f >= next ? 'NEXT' : 'YEAR'} s={1.4} flip={span(f, c('s34c:before'), c('s34c:before') + 12)} /></g>
            {Array.from({ length: 5 }, (_, k) => <Coin key={k} x={1400 + (k % 3) * 80} y={700 - Math.floor(k / 3) * 70} s={0.8} o={on(f, predictable + 8 + k * 3, 4)} />)}</g>
        </g>
        {/* # B: the full loop of four nodes; suppliers; more warehouses */}
        <g opacity={B}>
          <g opacity={1 - on(f, store, 8)}>
            {nodes.map(([t, id, at], k) => { const p = pos(k); return <g key={k} opacity={on(f, Math.min(at, steady), 6)} transform={`translate(${p.x} ${p.y}) scale(${pop(f, Math.min(at, steady))})`}><circle r={110} fill={P.card} /><Prop id={id} x={0} y={0} size={120} f={f} /><Label x={0} y={160} text={t} size={46} font="Bebas Neue" color={P.ink} /></g> })}
            <g opacity={on(f, c('s35:prices'), 6) * (1 - on(f, members, 8))} transform="translate(1240 620)"><g transform={`translate(-60 ${30 * on(f, c('s35:prices'), 14)})`}><Prop id="price-tag" x={0} y={0} size={110} f={f} /></g><g opacity={on(f, c('s35:profit'), 6)} transform={`translate(70 ${-30 * on(f, c('s35:profit'), 14)})`}><Coin x={0} y={0} s={0.9} /></g></g>
            <g opacity={on(f, c('s36a:products'), 6) * (1 - on(f, store, 8))} transform="translate(1720 480)">{[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-90 + (k % 3) * 62} y={-60 + Math.floor(k / 3) * 62 - (k >= 3 ? 0 : 0)} width={56} height={56} rx={6} fill={['#E05A4C', '#3A6EA8', '#E9C25A'][k % 3]} opacity={on(f, c('s36a:products') + k * 2, 4)} />)}
              <g opacity={on(f, c('s36a:single'), 6)} transform="translate(0 150)">{Array.from({ length: Math.round(on(f, c('s36a:single'), 30) * 9) }, (_, k) => <rect key={k} x={-90 + (k % 3) * 62} y={-Math.floor(k / 3) * 62} width={56} height={56} rx={6} fill="#3DDC97" />)}</g></g>
            <ellipse cx={1240} cy={600} rx={300} ry={240} fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="20 16" strokeDashoffset={-f * 2} opacity={on(f, members, 8)} />
            <g opacity={on(f, members, 6)} transform="translate(1240 620)">{Array.from({ length: 6 }, (_, k) => <Mini key={k} look={['hero', 'buyer', 'owner'][k % 3]} x={-150 + k * 60} y={60} scale={0.4} frame={f} seed={k + 520} mood="happy" />)}</g>
            <g opacity={on(f, suppliers, 6)} transform={`translate(1720 940) scale(${pop(f, suppliers) * 0.8})`}><Prop id="truck" x={0} y={0} size={180} f={f} /><Label x={0} y={120} text={f >= enormous ? 'HUGE ORDERS' : 'SUPPLIERS'} size={52} font="Bebas Neue" color={P.ink} /></g>
          </g>
          <g opacity={on(f, store, 6)}>
            <g opacity={on(f, c('s37:count'), 6)}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, c('s37:count') + k * 3, 4)}><Warehouse x={1360 + (k % 3) * 170} y={460 + Math.floor(k / 3) * 140} s={0.24} /></g>)}</g>
            <rect x={800} y={880} width={400 * on(f, d890, 16)} height={90} rx={16} fill={P.sky} /><Label x={820} y={860} text="2024: 890" size={56} font="Bebas Neue" color={P.ink} anchor="start" />
            <rect x={800} y={700} width={422 * on(f, d939, 16)} height={90} rx={16} fill={P.mint} opacity={on(f, d939, 6)} /><Label x={820} y={680} text={f >= d939 ? '2026: 939' : ''} size={56} font="Bebas Neue" color={P.ink} anchor="start" />
            <g opacity={on(f, d939, 6)}>{Array.from({ length: 5 }, (_, k) => <Warehouse key={k} x={1380 + (k % 3) * 170} y={720 + Math.floor(k / 3) * 200} s={0.24} />)}</g>
          </g>
        </g>
        {/* # C: the 2024 test — fee tags flip, the renewal gauge barely moves */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, later, 8)}>
            <g opacity={on(f, c('s38:in'), 6) * (1 - on(f, raised, 8))} transform={`translate(1500 560) scale(${pop(f, c('s38:in'))})`}><Calendar x={0} y={0} text="2024" s={1.3} /></g>
            <g opacity={on(f, c('s38:since'), 6) * (1 - on(f, d60, 8))} transform={`translate(1500 560) scale(${pop(f, c('s38:since'))})`}><Calendar x={0} y={0} text="2017" s={1.3} /></g>
            <MemberCard x={1000} y={560} s={pop(f, tested)} r={-6} title="GOLD STAR" glow={on(f, c('s38:fee'), 8)} />
            <g opacity={on(f, d60, 6)} transform={`translate(1000 820) scale(${pop(f, d60)})`}><rect x={-160} y={-50} width={320} height={100} rx={18} fill={P.gold} /><Label x={0} y={34} text="$60 → $65" size={72} font="Bebas Neue" color={P.navy0} /></g>
            <MemberCard x={1500} y={560} s={pop(f, executive)} r={5} o={on(f, executive, 6)} title="EXECUTIVE" exec />
            <g opacity={on(f, d120, 6)} transform={`translate(1500 820) scale(${pop(f, d120)})`}><rect x={-170} y={-50} width={340} height={100} rx={18} fill={P.gold} /><Label x={0} y={34} text="$120 → $130" size={72} font="Bebas Neue" color={P.navy0} /></g>
          </g>
          <g opacity={on(f, later, 6)}>
            <Gauge x={1040} y={760} v={92.9} t={on(f, c('s39:renewal'), 16)} label="2024 (BEFORE)" o={on(f, c('s39:renewal'), 6)} />
            <g opacity={on(f, c('s40:dollars'), 6)} transform="translate(1270 980)">{[0, 1, 2].map((k) => <Coin key={k} x={-50 + k * 50} y={0} s={0.45} />)}</g>
            <Gauge x={1500} y={760} v={92.3} t={on(f, still, 16)} label="2026" o={on(f, still, 6)} />
            <g opacity={on(f, slightly, 6)}><Label x={1270} y={900} text="ONLY SLIGHTLY LOWER" size={56} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, scare, 6)} transform="translate(1270 420)"><Tick x={0} y={0} o={1} r={56} /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="lp" />
    </g>
  )
}

export const CO_LOOP = makePiece('co-loop', 'Long: the loop — low prices → renewals (92% / 90%) → steady fees → buying power; 890 → 939 warehouses; 2024 fee rise, renewals 92.9% → 92.3%', { mood: 'dark', Component: Loop,
  beats: ["s32:machine", "s33:low", "s33:worth", "s33:renew", "s34:92", "s34a:90", "s34b:10", "s34b:9", "s34b:again", "s34c:predictable", "s34c:next", "s35:steady", "s35:profit", "s36:members", "s36:power", "s36:down", "s36a:suppliers", "s36a:enormous", "s37:store", "s37:890", "s37:939", "s38:tested", "s38:raised", "s38:60", "s38a:executive", "s38a:120", "s39:later", "s39:still", "s39:slightly", "s40:fair", "s40:scare", "s32", "s33:members", "s34c:idea", "s37:in", "s34b:think", "s35:keep", "s38:in", "s34c:starts", "s38:first", "s40:members", "s34:united", "s34:renewed", "s34a:worldwide", "s34c:fees", "s34c:before", "s35:prices", "s36a:products", "s36a:single", "s37:count", "s38:since", "s38:fee", "s39:renewal", "s40:dollars"],
  sfx: [['s34:92', 'ding', 0.4], ['s34b:9', 'pop', 0.4], ['s35:steady', 'swish', 0.4], ['s37:939', 'impact', 0.4], ['s38:60', 'coin', 0.4], ['s39:still', 'chime', 0.5]] })
