// ---------------------------------------------------------------- s63–s67: it matters even without AI stocks — Nvidia was nearly 8% of the S&P 500 (Oct 2026); add Microsoft,
// Alphabet, Amazon and Meta and a big slice of an ordinary retirement fund rides on the boom; they rise together and could fall together;
// shovel sales last only while people dig — Brannan lost most of his fortune and died poor in 1889
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, Calendar, camera, Coin, Headline, Label, Person, Phone, hand, Prop, Shovel, win } from './common'

const arc = (r: number, a0: number, a1: number) => {
  const p = (a: number) => `${Math.sin(a * Math.PI * 2) * r} ${-Math.cos(a * Math.PI * 2) * r}`
  return `M0 0 L${p(a0)} A${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${p(a1)} Z`
}

const You: React.FC<PieceProps> = ({ f, c }) => {
  const matters = c('s63:matters'), stock = c('s63:stock')
  const own = c('s64:own'), index = c('s64:index'), nvidia = c('s64:nvidia'), d8 = c('s64:8'), october = c('s64:october')
  const add = c('s65:add'), microsoft = c('s65:microsoft'), alphabet = c('s65:alphabet'), meta = c('s65:meta'), slice = c('s65:slice'), retirement = c('s65:retirement'), riding = c('s65:riding')
  const rise = c('s65a:rise'), slows = c('s65a:slows'), together = c('s65a:together')
  const history = c('s66:history'), lesson = c('s66:lesson'), shovel = c('s66:shovel'), digging = c('s66:digging')
  const brannan = c('s67:brannan'), lost = c('s67:lost'), died = c('s67:died'), y1889 = c('s67:1889')
  const A = win(f, matters, history), B = on(f, history, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [matters, 'explain', 'neutral'], [stock, 'shrug', 'neutral'], [own, 'phone', 'neutral'], [d8, 'shock', 'shocked'], [add, 'countA', 'neutral', 'countB', 14], [riding, 'nervous', 'worried'],
    [rise, 'celebrate', 'smiling'], [slows, 'despair', 'worried'], [history, 'read', 'thinking'], [digging, 'explain', 'neutral'], [lost, 'facepalm', 'worried']]
  const hp = hand(f, hero, 300, 1190, 1.4)
  const brannanB: Beat[] = [[0, 'idle', 'smiling'], [lost, 'slump', 'worried'], [died, 'despair', 'worried']]
  // # the index fund pie: grey, Nvidia's 7.78% in green on "8", then the four others as a soft gold band on "slice"
  const big = on(f, slice, 20)
  return (
    <g>
      <Stage id="yu" frame={f} />
      <Headline f={f} lines={[[c("s63:bought"), "NEVER BOUGHT AN AI STOCK?", P.ink, 116], [c("s65:boom"), "THIS SPENDING BOOM", P.coralInk, 120], [c("s65a:fund"), "…YOUR FUND RISES TOO", P.mintInk, 116], [c("s65a:if"), "IF THE SPENDING SLOWS…", P.ink, 116], [c("s66:last"), "ONLY LAST…", P.ink, 124], [c("s67:later"), "LATER IN LIFE", P.ink, 124], [matters, 'THIS MATTERS TO YOU', P.ink, 130], [stock, 'EVEN WITHOUT AI STOCKS', P.ink, 124], [index, 'AN S&P 500 INDEX FUND', P.ink, 120], [d8, 'NVIDIA ALONE: ≈ 8%', P.mintInk, 124],
        [add, '+ MICROSOFT, ALPHABET, AMAZON, META', P.ink, 92], [slice, 'A BIG SLICE OF IT', P.goldInk, 124], [riding, 'RIDING ON THIS BOOM', P.coralInk, 124],
        [rise, 'WHEN THESE STOCKS RISE…', P.mintInk, 116], [slows, '…THEY COULD FALL TOGETHER', P.coralInk, 112],
        [history, 'ONE MORE LESSON', P.ink, 130], [shovel, 'SHOVEL SALES…', P.ink, 124], [digging, '…WHILE PEOPLE KEEP DIGGING', P.goldInk, 116], [brannan, 'SAM BRANNAN', P.ink, 130], [lost, 'LOST MOST OF HIS FORTUNE', P.coralInk, 112], [died, 'DIED POOR, 1889', P.coralInk, 124]]} />
      <g transform={camera(f, [[d8, 1300, 600, 1.05], [add, 960, 540, 1], [rise, 960, 540, 1], [history, 960, 540, 1], [died, 1200, 640, 1.05]])}>
        <g opacity={A}>
          {f >= own && f < rise && <Phone x={hp.x + 170} y={hp.y - 20} s={0.9} r={8} o={on(f, own, 6) * (1 - on(f, nvidia, 8))}><Label x={0} y={-60} text="MY FUND" size={44} font="Bebas Neue" color={P.navy1} /><Label x={0} y={20} text="S&P 500" size={56} font="Bebas Neue" color={P.navy0} /></Phone>}
          <g opacity={on(f, matters, 6) * (1 - on(f, index, 8))} transform={`translate(1240 620) scale(${pop(f, matters) * 1.1})`}><Prop id="wallet" x={0} y={0} size={220} f={f} /></g>
          {/* # the pie */}
          <g opacity={on(f, index, 6) * (1 - on(f, rise, 8))} transform={`translate(1240 640) scale(${pop(f, index)})`}>
            <circle r={280} fill="#C9D3E1" /><circle r={280} fill="none" stroke={P.ink2} strokeWidth={4} />
            {big > 0 && <circle r={292} fill="none" stroke={P.goldInk} strokeWidth={12} strokeDasharray="22 14" opacity={big} />}
            {f >= d8 && <path d={arc(280, 0, 0.078 * on(f, d8, 14))} fill={P.mint} />}
            <Label x={0} y={0} text="S&P 500" size={70} font="Bebas Neue" color={P.navy1} /><Label x={0} y={60} text="INDEX FUND" size={52} font="Bebas Neue" color={P.navy2} />
          </g>
          <g opacity={on(f, d8, 6) * (1 - on(f, rise, 8))}><Label x={1400} y={300} text="NVIDIA ≈ 7.8%" size={56} font="Bebas Neue" color={P.mintInk} anchor="start" /><Label x={1400} y={350} text={f >= october ? 'OCT 2026' : ''} size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
          {[[microsoft, 'MICROSOFT'], [alphabet, 'ALPHABET'], [alphabet + 8, 'AMAZON'], [meta, 'META']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 6) * (1 - on(f, rise, 8))} transform={`translate(1620 ${470 + k * 90}) scale(${pop(f, at as number)})`}>
            <rect x={-10} y={-36} width={250} height={72} rx={14} fill={P.gold} /><Label x={115} y={18} text={t as string} size={48} font="Bebas Neue" color={P.navy0} /></g>)}
          <g opacity={on(f, retirement, 6) * (1 - on(f, rise, 8))} transform="translate(780 940)"><Prop id="piggy-bank" x={0} y={0} size={170} f={f} /><Label x={0} y={100} text="RETIREMENT" size={44} font="Bebas Neue" color={P.ink} /></g>
          {/* # together: five lines moving as one, up then down */}
          <g opacity={on(f, rise, 6)}>
            <rect x={760} y={360} width={1020} height={600} rx={24} fill={P.card} />
            {[0, 1, 2, 3, 4].map((k) => { const pts = Array.from({ length: 41 }, (_, i) => { const t = i / 40, up = Math.min(1, t * 1.6), down = Math.max(0, (t - 0.6) / 0.4) * on(f, slows, 30)
              const y = 860 - up * 360 * on(f, rise, 40) + down * 300 + Math.sin(i * 0.9 + k) * 10 + k * 14; return `${800 + t * 940} ${y}` })
              return <path key={k} d={`M${pts.join(' L')}`} stroke={[P.mint, P.sky, P.gold, P.coral, '#7C6CF0'][k]} strokeWidth={8} fill="none" opacity={0.9} /> })}
            <Label x={1270} y={1020} text={f >= together ? 'YOUR FUND MOVES WITH THEM' : ''} size={52} font="Bebas Neue" color={P.ink} />
          </g>
        </g>
        {/* # B: the shovel store's last days — Brannan, old, the coins blow away, a calendar reads 1889 */}
        <g opacity={B}>
          <g opacity={on(f, shovel, 6)} transform={`translate(1240 760) scale(${pop(f, shovel)})`}><rect x={-260} y={-200} width={520} height={240} rx={14} fill="#A8743F" /><rect x={-230} y={-260} width={460} height={80} rx={10} fill={P.cream} />
            <Label x={0} y={-204} text={f >= lost ? 'CLOSED' : 'SHOVELS'} size={60} font="Bebas Neue" color={f >= lost ? P.coralInk : '#5A3A1C'} />
            {[-140, -40, 60, 160].map((x, k) => <g key={k} opacity={1 - on(f, digging + k * 4, 10)}><Shovel x={x} y={-30} s={0.5} /></g>)}</g>
          <g opacity={on(f, lesson, 6) * (1 - on(f, shovel, 8))} transform={`translate(1240 620) scale(${pop(f, lesson)})`}><Prop id="hourglass" x={0} y={0} size={200} f={f} /></g>
          {Array.from({ length: 6 }, (_, k) => { const t = span(f, lost + k * 4, lost + k * 4 + 40); return f >= lost ? <Coin key={k} x={1240 + t * 700 + k * 20} y={700 - t * 260 + Math.sin(t * 6 + k) * 30} s={0.6} o={1 - t} /> : null })}
          <g opacity={on(f, y1889, 6)} transform={`translate(1240 360) scale(${pop(f, y1889)})`}><Calendar x={0} y={0} text="1889" s={1.2} /></g>
          <Person f={f} who="investor" beats={brannanB} x={1640} y={1190} s={1.1} flip life={7} o={on(f, brannan, 8)} />
          {f >= digging && f < brannan && [0, 1].map((k) => <g key={k} opacity={1 - on(f, brannan - 10, 10)}><Mini look={['worker', 'buyer'][k]} x={lerp(760 + k * 120, 600 + k * 100, span(f, digging, digging + 30))} y={1010} scale={0.95} frame={f} seed={k + 280} mood="sad" /></g>)}
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="yu" />
    </g>
  )
}

export const AI_YOU = makePiece('ai-you', 'Long: index-fund exposure — Nvidia ≈ 8% of the S&P 500 (Oct 2026), plus Microsoft, Alphabet, Amazon, Meta; they rise and could fall together; Brannan lost his fortune, died poor in 1889', { mood: 'light', Component: You,
  beats: ["s63:matters", "s63:stock", "s64:own", "s64:index", "s64:nvidia", "s64:8", "s64:october", "s65:add", "s65:microsoft", "s65:alphabet", "s65:meta", "s65:slice", "s65:retirement", "s65:riding", "s65a:rise", "s65a:slows", "s65a:together", "s66:history", "s66:lesson", "s66:shovel", "s66:digging", "s67:brannan", "s67:lost", "s67:died", "s67:1889", "s63:bought", "s65:boom", "s65a:fund", "s65a:if", "s66:last", "s67:later"],
  sfx: [['s64:8', 'pop', 0.5], ['s65:slice', 'swish', 0.4], ['s65a:rise', 'riser', 0.3], ['s65a:slows', 'thud', 0.4], ['s66:shovel', 'pop', 0.4], ['s67:lost', 'crack', 0.4], ['s67:1889', 'thud', 0.4]] })
