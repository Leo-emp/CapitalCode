// ---------------------------------------------------------------- s28–s32: Nvidia does not manufacture; its advanced chips are made in Taiwan by TSMC, which almost every
// advanced AI chip designer depends on; TSMC 2025 sales ≈ $122B (+36%), ≈ $60 of every $100 kept after production costs (gross margin 59.9%); the supplier does well too
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, Calendar, camera, Doc, Fab, Gpu, Headline, Label, Person, Pile, Prop, Split, win } from './common'

const Tsmc: React.FC<PieceProps> = ({ f, c }) => {
  const manufacture = c('s28:manufacture'), own = c('s28:own')
  const advanced = c('s29:advanced'), taiwan = c('s29:taiwan'), tsmc = c('s29:tsmc')
  const almost = c('s29a:almost'), designing = c('s29a:designing'), depends = c('s29a:depends'), factories = c('s29a:factories')
  const in30 = c('s30:in'), sales = c("s30:tsmc's"), d122 = c('s30:122'), d36 = c('s30:36')
  const kept = c('s31:kept'), d60 = c('s31:60'), production = c('s31:production')
  const supplier = c('s32:supplier'), well = c('s32:well')
  const A = win(f, manufacture, in30), B = win(f, in30, supplier), Cc = on(f, supplier, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [manufacture, 'read', 'neutral'], [own, 'stop', 'neutral'], [taiwan, 'point', 'smiling'], [almost, 'explain', 'neutral'], [d122, 'shock', 'shocked'], [d36, 'fistPump', 'smiling'],
    [kept, 'explain', 'neutral'], [d60, 'thumbsUp', 'smiling'], [supplier, 'present', 'smiling'], [well, 'clapA', 'smiling', 'clapB', 12]]
  return (
    <g>
      <Stage id="ts" frame={f} />
      <Headline f={f} lines={[[c("s30:single"), "IN A SINGLE YEAR", P.mintInk, 124], [c("s31:sales"), "OF EVERY $100 OF SALES", P.ink, 116], [c("s32:shovel"), "EVEN THE SHOVEL SELLER…", P.ink, 116], [manufacture, 'NVIDIA DOES NOT MAKE ITS CHIPS', P.ink, 104], [advanced, 'ITS MOST ADVANCED CHIPS…', P.ink, 112], [taiwan, '…ARE MADE IN TAIWAN', P.ink, 120], [tsmc, 'BY TSMC', P.goldInk, 140],
        [almost, 'ALMOST EVERY AI CHIP DESIGNER', P.ink, 106], [depends, 'DEPENDS ON ITS FACTORIES', P.goldInk, 112],
        [sales, 'TSMC SALES, 2025', P.ink, 124], [d122, '≈ $122 BILLION', P.goldInk, 130], [d36, 'UP 36% IN A YEAR', P.mintInk, 124], [d60, '≈ $60 KEPT FROM EVERY $100', P.mintInk, 112],
        [supplier, '…HAS A SUPPLIER', P.ink, 124], [well, 'DOING VERY WELL TOO', P.mintInk, 116]]} />
      <g transform={camera(f, [[tsmc, 1300, 640, 1.06], [almost, 960, 540, 1], [d122, 1100, 620, 1.05], [kept, 960, 540, 1], [supplier, 960, 540, 1]])}>
        {/* # A: the design leaves Nvidia (no factory of its own) and travels to TSMC's fab in Taiwan; other designers' blueprints follow */}
        <g opacity={A}>
          <g opacity={on(f, manufacture, 6)} transform={(() => { const t = easeInOut(span(f, taiwan, taiwan + 30)); return `translate(${lerp(820, 1300, t)} ${lerp(560, 560, t) - Math.sin(t * Math.PI) * 120}) rotate(-4) scale(${lerp(0.9, 0.4, t) * pop(f, manufacture)})` })()}>
            <Doc x={0} y={0} title="CHIP DESIGN" lines={4} /></g>
          <g opacity={on(f, manufacture, 6) * (1 - on(f, taiwan, 8))} transform="translate(820 860)"><Label x={0} y={0} text="NVIDIA" size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, manufacture, 6) * (1 - on(f, advanced, 8))} transform={`translate(1300 640) scale(${pop(f, manufacture)})`}><Prop id="factory" x={0} y={0} size={180} f={f} /><path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></g>
          <Fab x={1480} y={900} s={0.9} o={on(f, advanced, 8)} label={f >= tsmc ? 'TSMC' : ''} f={f} />
          <g opacity={on(f, taiwan, 6)} transform={`translate(1760 520) scale(${pop(f, taiwan)})`}><Prop id="map-pin" x={0} y={0} size={110} f={f} /><Label x={0} y={100} text="TAIWAN" size={52} font="Bebas Neue" color={P.ink} /></g>
          {Array.from({ length: 3 }, (_, k) => { const t = ((f - (taiwan + 30)) / 36 + k / 3) % 1; return f >= taiwan + 30 ? <g key={k} opacity={Math.sin(t * Math.PI) * (1 - on(f, almost, 8))} transform={`translate(${lerp(1600, 1880, t)} ${860 - Math.sin(t * Math.PI) * 60}) scale(0.28)`}><Gpu x={0} y={0} glow={1} /></g> : null })}
          {Array.from({ length: 4 }, (_, k) => { const at = designing + k * 4, t = easeInOut(span(f, depends + k * 3, depends + k * 3 + 26))
            return <g key={k} opacity={on(f, at, 6) * (1 - on(f, sales, 8))}>
              <Mini look={['investor', 'owner', 'buyer', 'worker'][k]} x={720 + k * 150} y={1010} scale={0.95} frame={f} seed={k + 150} />
              <g opacity={1 - t * 0.9} transform={`translate(${lerp(720 + k * 140, 1440, t)} ${lerp(700, 760, t) - Math.sin(t * Math.PI) * 120}) scale(0.25)`}><Doc x={0} y={0} lines={3} /></g></g> })}
          <g opacity={on(f, factories, 6)}>{[0, 1, 2].map((k) => <rect key={k} x={1300 + k * 120} y={640} width={80} height={80} rx={10} fill={P.gold} opacity={0.25 + 0.25 * Math.sin(f / 6 + k)} />)}</g>
        </g>
        {/* # B: TSMC's numbers — a column of sales, then $100 split into $60 kept and $40 costs */}
        <g opacity={B}>
          <Fab x={1580} y={980} s={0.6} f={f} label="TSMC" />
          <g opacity={on(f, in30, 6) * (1 - on(f, sales, 8))} transform={`translate(1240 640) scale(${pop(f, in30)})`}><Calendar x={0} y={0} text="2025" s={1.3} /></g>
          <g opacity={on(f, sales, 6) * (1 - on(f, kept, 8))}>
            <rect x={760} y={470} width={1220 * 0 + 122 * 5.6 * on(f, d122, 24)} height={130} rx={18} fill={P.gold} />
            <Label x={760} y={450} text="2025 SALES" size={52} font="Bebas Neue" color={P.ink} anchor="start" />
            <Label x={760 + 122 * 5.6 + 24} y={560} text={f >= d122 ? '$122B' : ''} size={70} font="Bebas Neue" color={P.ink} anchor="start" />
            <g opacity={on(f, d36, 6)} transform={`translate(1060 740) scale(${pop(f, d36)})`}><rect x={-160} y={-60} width={320} height={120} rx={20} fill={P.mint} /><Label x={-20} y={34} text="+36%" size={96} font="Bebas Neue" color={P.navy0} /><g transform="translate(110 0)"><Prop id="arrow-up" x={0} y={0} size={80} f={f} /></g></g>
          </g>
          <g opacity={on(f, kept, 6)}>
            <Label x={760} y={560} text="EVERY $100 OF SALES" size={52} font="Bebas Neue" color={P.ink} anchor="start" />
            <Split x={760} y={590} kept={60} t={on(f, d60, 24)} w={760} keptText="≈ $60 KEPT" costText={f >= production ? 'COSTS' : ''} />
          </g>
        </g>
        {/* # C: the chain — the factory feeds the shovel seller; both piles grow */}
        <g opacity={Cc}>
          <Fab x={820} y={820} s={0.7} f={f} label="TSMC" />
          <Gpu x={1500} y={660} s={0.9} glow={0.8} label="NVIDIA" />
          <path d="M1060 700 Q1200 600 1320 640" stroke={P.goldInk} strokeWidth={10} fill="none" strokeDasharray="18 12" /><path d="M1300 620 L1336 644 L1298 664 Z" fill={P.goldInk} />
          <Pile x={820} y={1000} n={on(f, well, 24) * 12} s={1} /><Pile x={1500} y={1000} n={on(f, supplier, 24) * 15} s={1} />
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="ts" />
    </g>
  )
}

export const AI_TSMC = makePiece('ai-tsmc', 'Long: Nvidia is fabless; TSMC in Taiwan makes its advanced chips and most AI chip designers depend on it; TSMC 2025 sales ≈ $122B (+36%), ≈ $60 of every $100 kept; the supplier does well', { mood: 'light', Component: Tsmc,
  beats: ["s28:manufacture", "s28:own", "s29:advanced", "s29:taiwan", "s29:tsmc", "s29a:almost", "s29a:designing", "s29a:depends", "s29a:factories", "s30:in", "s30:tsmc's", "s30:122", "s30:36", "s31:kept", "s31:60", "s31:production", "s32:supplier", "s32:well", "s30:single", "s31:sales", "s32:shovel"],
  sfx: [['s28:own', 'crack', 0.4], ['s29:tsmc', 'pop', 0.5], ['s29a:depends', 'whoosh', 0.4], ['s30:122', 'impact', 0.5], ['s30:36', 'ding', 0.4], ['s31:60', 'chime', 0.5], ['s32:well', 'coin', 0.4]] })
