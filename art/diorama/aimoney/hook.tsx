// ---------------------------------------------------------------- s1–s6: ChatGPT's maker brought in ≈ $13B in 2025 and spent ≈ $34B (as reported);
// Nvidia kept ≈ $120B profit in its latest year; the famous product loses money, the equipment seller is one of the most profitable firms; follow the money
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, camera, Col, Gpu, Headline, Label, Person, Pile, Prop, Stamp, win } from './common'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const company = c('s1:company'), chatgpt = c('s1:chatgpt'), brought = c('s1:brought'), d13 = c('s1:13')
  const according = c('s2:according'), financial = c('s2:financial'), spent = c('s2:spent'), d34 = c('s2:34')
  const nvidia = c('s3:nvidia'), sells = c('s3:sells'), chips = c('s3:chips')
  const latest = c('s4:latest'), kept = c('s4:kept'), d120 = c('s4:120'), profit = c('s4:profit')
  const famous = c('s5:famous'), loses = c('s5:loses'), equipment = c('s5:equipment'), profitable = c('s5:profitable')
  const today = c('s6:today'), follow = c('s6:follow'), actually = c('s6:actually')
  const S = 10 // # px per $1B on the columns
  const A = win(f, c('s1'), today), B = on(f, today, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [chatgpt, 'present', 'smiling'], [d13, 'thumbsUp', 'smiling'], [spent, 'shock', 'shocked'], [nvidia, 'point', 'thinking'], [d120, 'oops', 'shocked'],
    [loses, 'shrug', 'worried'], [profitable, 'lookFar', 'thinking'], [today, 'explain', 'neutral'], [follow, 'pointUp', 'smiling'], [actually, 'scratchHead', 'thinking']]
  return (
    <g>
      <Stage id="ah" frame={f} />
      <Headline f={f} lines={[[c('s1'), '2025', P.ink, 150], [c("s2:times"), "AS REPORTED BY THE FINANCIAL TIMES", P.ink2, 96], [c("s2:get"), "TO BRING IN THAT $13 BILLION", P.ink, 108], [c("s5:earth"), "ONE OF THE MOST PROFITABLE ON EARTH", P.goldInk, 98], [c("s6:talking"), "EVERYONE IS TALKING ABOUT AI", P.ink, 108], [company, "CHATGPT'S MAKER", P.ink, 124], [d13, '2025 SALES: ≈ $13 BILLION', P.mintInk, 116], [d34, 'COSTS: ≈ $34 BILLION', P.coralInk, 120], [nvidia, 'NVIDIA: SELLS THE CHIPS', P.ink, 116],
        [d120, '≈ $120 BILLION PROFIT', P.goldInk, 124], [loses, 'THE FAMOUS PRODUCT LOSES MONEY', P.coralInk, 104], [profitable, 'THE SUPPLIER MAKES A FORTUNE', P.goldInk, 106],
        [today, 'FOLLOW THE MONEY', P.ink, 130], [actually, 'WHO IS ACTUALLY MAKING IT?', P.goldInk, 120]]} />
      <g transform={camera(f, [[d34, 860, 700, 1.05], [nvidia, 960, 540, 1], [d120, 1400, 700, 1.05], [famous, 960, 540, 1], [today, 960, 540, 1]])}>
        {/* # A: the AI company (left) — sales vs costs; the chip seller (right) — a glowing GPU and a growing pile of profit */}
        <g opacity={A}>
          <g opacity={on(f, c('s1'), 4)} transform={`translate(${lerp(1160, 760, on(f, d13, 14))} ${lerp(560, 330, on(f, d13, 14))}) scale(${pop(f, company) * lerp(2, 1, on(f, d13, 14))})`}><circle r={100} fill={P.card} /><Prop id="robot-head" x={0} y={-6} size={130} f={f} />
            <g opacity={on(f, brought, 4) * (1 - on(f, d13, 4))}><rect x={-90} y={-170} width={180} height={64} rx={14} fill={P.mint} /><Label x={0} y={-124} text={'$' + Math.max(0, Math.round(13 * span(f, brought, d13))) + 'B'} size={52} font="Bebas Neue" color={P.navy0} /></g>
            <Label x={0} y={150} text={f >= chatgpt ? 'AI CHATBOT MAKER' : ''} size={46} font="Bebas Neue" color={P.ink} /></g>
          <Col x={680} y={920} h={13 * S * on(f, d13, 16)} w={130} color={P.mint} value={f >= d13 ? '$13B' : ''} label={f >= d13 ? 'SALES' : ''} o={on(f, d13, 6)} />
          <Col x={850} y={920} h={34 * S * on(f, d34, 18)} w={130} color={P.coral} value={f >= d34 ? '$34B' : ''} label={f >= d34 ? 'COSTS' : ''} o={on(f, d34, 6)} />
          <g opacity={on(f, financial, 6)} transform="translate(765 1030)"><Label x={0} y={0} text="2025 · AS REPORTED (FT)" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <Stamp x={850} y={700} text="LOSS" f={f} at={loses} color={P.coralInk} size={90} />
          {/* # the chip seller */}
          <g opacity={on(f, nvidia, 6)}>
            <Gpu x={1460} y={500} s={pop(f, nvidia) * 1.05} glow={0.5 + 0.5 * Math.sin(f / 9) * on(f, chips, 10)} label={f >= nvidia ? 'NVIDIA' : ''} />
            {Array.from({ length: 4 }, (_, k) => { const t = ((f - sells) / 40 + k / 4) % 1; return f >= sells ? <g key={k} opacity={Math.sin(t * Math.PI) * (1 - on(f, latest, 8))} transform={`translate(${lerp(1460, 1820, t)} ${500 - Math.sin(t * Math.PI) * 80}) scale(0.3)`}><Gpu x={0} y={0} glow={1} /></g> : null })}
            <Pile x={1460} y={940} n={on(f, kept, 30) * 24} s={1.2} o={on(f, kept, 6)} />
            <g opacity={on(f, d120, 6)} transform={`translate(1700 880) scale(${pop(f, d120)})`}><rect x={-120} y={-56} width={240} height={112} rx={20} fill={P.gold} /><Label x={0} y={30} text="$120B" size={86} font="Bebas Neue" color={P.navy0} /></g>
            <g opacity={on(f, latest, 6)} transform="translate(1460 1030)"><Label x={0} y={0} text={f >= profit ? 'PROFIT · YEAR TO JAN 2026' : 'LATEST YEAR'} size={44} font="Bebas Neue" color={P.ink2} /></g>
            <g opacity={on(f, profitable, 6)} transform={`translate(1460 300) scale(${pop(f, profitable)})`}><Prop id="crown" x={0} y={0} size={140} f={f} /></g>
          </g>
          <g opacity={on(f, equipment, 6) * (1 - on(f, today, 8))}><path d="M1000 760 Q1150 700 1290 760" stroke={P.goldInk} strokeWidth={10} fill="none" strokeDasharray="18 12" /><path d="M1270 740 L1300 764 L1266 782 Z" fill={P.goldInk} /></g>
        </g>
        {/* # B: a trail of coins winds across the stage to a question mark — who ends up with the money? */}
        <g opacity={B}>
          {Array.from({ length: 9 }, (_, k) => { const t = easeInOut(span(f, follow + k * 3, follow + k * 3 + 24)), x = lerp(700, 700 + k * 120, t), y = 760 + Math.sin(k * 0.9) * 90
            return <g key={k} opacity={on(f, follow + k * 3, 6)} transform={`translate(${x} ${y})`}><circle r={34} fill={P.gold} /><circle r={24} fill="none" stroke={P.goldD} strokeWidth={4} /><Label x={0} y={13} text="$" size={38} font="Bebas Neue" color={P.goldD} /></g> })}
          <g opacity={on(f, actually, 6)} transform={`translate(1760 640) scale(${pop(f, actually) * 1.2})`}><circle r={100} fill={P.gold} /><Label x={0} y={46} text="?" size={160} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, today, 6) * (1 - on(f, follow + 20, 10))} transform={`translate(1240 640) scale(${pop(f, today)})`}><Prop id="magnifier" x={0} y={0} size={220} f={f} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="ah" />
    </g>
  )
}

export const AI_HOOK = makePiece('ai-hook', 'Long: ChatGPT maker ≈ $13B sales vs ≈ $34B costs (2025, reported); Nvidia ≈ $120B profit; famous product loses money, supplier rich; follow the money', { mood: 'dark', Component: Hook,
  beats: ["s1:company", "s1:chatgpt", "s1:brought", "s1:13", "s2:according", "s2:financial", "s2:spent", "s2:34", "s3:nvidia", "s3:sells", "s3:chips", "s4:latest", "s4:kept", "s4:120", "s4:profit", "s5:famous", "s5:loses", "s5:equipment", "s5:profitable", "s6:today", "s6:follow", "s6:actually", "s2:times", "s2:get", "s5:earth", "s6:talking"],
  sfx: [['s1:13', 'pop', 0.4], ['s2:34', 'thud', 0.5], ['s3:nvidia', 'whoosh', 0.4], ['s4:120', 'impact', 0.6], ['s5:loses', 'crack', 0.4], ['s5:profitable', 'chime', 0.4], ['s6:actually', 'riser', 0.4]] })
