// ---------------------------------------------------------------- s41–s46a: is the card worth it? example 5% savings → $65 fee covered at ≈ $1,300 a year; a family at $200 a month
// ($2,400 a year) saves ≈ $120; Executive (+$65, 2% back) pays off above ≈ $3,250; the catch: big packs wasted, impulse buys
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Calendar, camera, Coin, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { Cart, MemberCard, Warehouse } from './kit'

const W = 0.3 // # px per $1 of yearly spending on the bars

const Worth: React.FC<PieceProps> = ({ f, c }) => {
  const pay = c('s41:pay'), check = c('s41:check')
  const d5 = c('s42:5'), example = c('s42:example'), higher = c('s42:higher')
  const d1300 = c('s43:1300'), cover = c('s43:cover'), fee = c('s43:fee')
  const family = c('s43a:family'), d200 = c('s43a:200'), d2400 = c('s43a:2400'), d120 = c('s43a:120'), comfortably = c('s43a:comfortably')
  const executive = c('s44:executive'), d2 = c('s44:2'), d3250 = c('s44:3250')
  const less = c('s44a:less'), basic = c('s44a:basic')
  const catchW = c('s45:catch'), packs = c('s45:packs'), use = c('s45:use')
  const tub = c('s46:tub'), goes = c('s46:goes'), bigger = c('s46:bigger')
  const one = c('s46a:one'), ten = c('s46a:ten'), spending = c('s46a:spending')
  const A = win(f, c('s41'), executive), B = win(f, executive, catchW), Cc = on(f, catchW, 10)
  const hero: Beat[] = [[0, 'think', 'thinking'], [c('s43:5'), 'countOne', 'neutral'], [c('s46a:extra'), 'carryHeavy', 'neutral'], [c('s42:lower'), 'shrug', 'neutral'], [c('s42:number'), 'countOne', 'neutral'], [c('s43a:5'), 'pointUp', 'smiling'], [c('s46:bargain'), 'shrug', 'worried'], [c('s44:pays'), 'weighA', 'thinking', 'weighB', 18], [c('s44a:better'), 'thumbsUp', 'smiling'], [check, 'typeSit', 'neutral'], [d5, 'countOne', 'neutral'], [d1300, 'explain', 'neutral'], [family, 'present', 'smiling'], [comfortably, 'thumbsUp', 'smiling'],
    [executive, 'weighA', 'thinking', 'weighB', 18], [basic, 'nodA', 'smiling', 'nodB', 16], [catchW, 'stop', 'neutral'], [tub, 'facepalm', 'worried'], [ten, 'carryHeavy', 'worried']]
  const bx = 760
  return (
    <g>
      <Stage id="wt" frame={f} />
      <Headline f={f} lines={[[c("s44a:better"), "THE BETTER DEAL", P.mintInk, 124], [c('s41'), 'IS THE CARD WORTH IT?', P.ink, 124], [check, 'A SIMPLE CHECK', P.ink, 130], [d5, 'SAY YOU SAVE 5%', P.goldInk, 130], [example, 'JUST AN EXAMPLE', P.ink, 124], [higher, 'YOURS COULD DIFFER', P.ink, 124],
        [d1300, 'SPEND ≈ $1,300 A YEAR…', P.ink, 116], [cover, '…TO COVER THE $65 FEE', P.mintInk, 116], [family, 'A FAMILY, FOR EXAMPLE', P.ink, 124], [d2400, '$200 × 12 = $2,400 A YEAR', P.ink, 112], [d120, '5% SAVED ≈ $120', P.mintInk, 124], [comfortably, 'MORE THAN THE FEE', P.mintInk, 124],
        [executive, 'EXECUTIVE: +$65, 2% BACK', P.goldInk, 112], [d3250, 'PAYS OFF ABOVE ≈ $3,250', P.goldInk, 116], [basic, 'BELOW THAT: BASIC CARD', P.ink, 116],
        [catchW, 'ONE CATCH', P.coralInk, 140], [packs, 'BIG PACKS ONLY SAVE…', P.ink, 124], [use, '…IF YOU USE THEM', P.ink, 130], [goes, 'WASTED = NOT A BARGAIN', P.coralInk, 116], [bigger, 'JUST A BIGGER BILL', P.coralInk, 124],
        [one, 'IN FOR ONE THING…', P.ink, 124], [ten, '…OUT WITH TEN', P.coralInk, 130], [spending, 'STILL SPENDING', P.coralInk, 130]]} />
      <g transform={camera(f, [[d1300, 1240, 620, 1.04], [family, 960, 540, 1], [executive, 960, 540, 1], [catchW, 960, 540, 1]])}>
        {/* # A: the calculator check — 5% example; $1,300 covers $65; the family example */}
        <g opacity={A}>
          <g opacity={1 - on(f, d1300, 8)}>
            <g transform={`translate(1000 600) scale(${pop(f, c('s41'))})`}><MemberCard x={0} y={0} s={1.2} /><g opacity={on(f, pay, 6)} transform="translate(0 -190)"><circle r={50} fill={P.gold} /><Label x={0} y={26} text="?" size={80} font="Bebas Neue" color={P.navy0} /></g></g>
            <g opacity={on(f, c('s42:compared'), 6) * (1 - on(f, d1300, 8))} transform="translate(1060 1000)"><Warehouse x={-160} y={0} s={0.42} label="COSTCO" /><g transform="translate(200 -40)"><Prop id="shop-mini" x={0} y={0} size={170} f={f} /></g></g>
            <g opacity={on(f, c('s43:spend'), 6) * (1 - on(f, d1300, 8))} transform="translate(1760 860)"><Prop id="wallet" x={0} y={0} size={130} f={f} /></g>
            <g opacity={on(f, check, 6)} transform={`translate(1500 560) scale(${pop(f, check)})`}><Prop id="calculator" x={0} y={0} size={220} f={f} /></g>
            <g opacity={on(f, d5, 6)} transform={`translate(1500 830) scale(${pop(f, d5)})`}><rect x={-130} y={-50} width={260} height={100} rx={18} fill={P.gold} /><Label x={0} y={34} text="5% SAVED" size={72} font="Bebas Neue" color={P.navy0} /></g>
            <g opacity={on(f, example, 6)}><Label x={1500} y={950} text="EXAMPLE" size={48} font="Bebas Neue" color={P.ink2} /></g>
          </g>
          <g opacity={on(f, d1300, 6)}>
            <g opacity={1 - on(f, family, 8)}>
              <Label x={bx} y={500} text="YEARLY SPENDING AT COSTCO" size={50} font="Bebas Neue" color={P.ink} anchor="start" />
              <rect x={bx} y={520} width={1300 * W * 2.2 * on(f, d1300, 20)} height={110} rx={18} fill={P.sky} /><Label x={bx + 1300 * W * 2.2 + 20} y={596} text="$1,300" size={70} font="Bebas Neue" color={P.ink} anchor="start" />
              <g opacity={on(f, cover, 6)}><Label x={bx} y={720} text="× 5% = $65" size={84} font="Bebas Neue" color={P.mintInk} anchor="start" /><g transform="translate(1400 700) scale(0.7)"><MemberCard x={0} y={0} /></g></g>
              <g opacity={on(f, fee, 6)}><Label x={1400} y={880} text="FEE COVERED" size={52} font="Bebas Neue" color={P.mintInk} /></g>
            </g>
            <g opacity={on(f, family, 6)}>
              <g opacity={on(f, c('s43a:month'), 6) * (1 - on(f, c('s43a:year'), 8))} transform={`translate(1700 420) scale(${pop(f, c('s43a:month')) * 0.8})`}><Calendar x={0} y={0} text="MONTH" s={1} /></g>
              <g opacity={on(f, c('s43a:there'), 6)} transform="translate(1720 990) scale(0.45)"><Cart x={0} y={0} fill={1} /></g>
              <g opacity={on(f, c('s43a:year'), 6)}>{Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, c('s43a:year') + k * 1.2, 4)} transform={`translate(${1560 + (k % 6) * 54} ${380 + Math.floor(k / 6) * 90}) scale(0.4)`}><Prop id="receipt" x={0} y={0} size={140} f={f} /></g>)}</g>
              <g transform={`translate(${bx + 120} 640) scale(${pop(f, family) * 0.9})`}><Prop id="family" x={0} y={0} size={220} f={f} /></g>
              <g opacity={on(f, d200, 6)}><Label x={1100} y={540} text={f >= d2400 ? '$200 × 12 = $2,400' : '$200 / MONTH'} size={72} font="Bebas Neue" color={P.ink} anchor="start" /></g>
              <g opacity={on(f, d120, 6)}><rect x={1100} y={600} width={120 * 4 * on(f, d120, 16)} height={90} rx={16} fill={P.mint} /><Label x={1110} y={665} text="SAVED ≈ $120" size={56} font="Bebas Neue" color={P.navy0} anchor="start" />
                <rect x={1100} y={720} width={65 * 4} height={90} rx={16} fill={P.coral} /><Label x={1110} y={785} text="FEE $65" size={56} font="Bebas Neue" color="#FFFFFF" anchor="start" /></g>
            </g>
          </g>
        </g>
        {/* # B: Executive vs basic — the break-even line at $3,250 */}
        <g opacity={B}>
          <MemberCard x={980} y={540} s={0.9 * pop(f, executive)} r={-6} title="EXECUTIVE" exec />
          {[[c('s44:costs'), -1], [c('s44:gives'), 1]].map(([at, dir], k) => { const t = span(f, at, at + 24); return t > 0 && t < 1 ? <g key={k}>{[0, 1, 2].map((j) => <Coin key={j} x={980 + dir * (60 + t * 180) + j * 20} y={760 - Math.sin(t * Math.PI) * 120} s={0.5} />)}</g> : null })}
          <g opacity={on(f, c('s44:qualifying'), 6) * (1 - on(f, less, 8))} transform="translate(1720 860)"><Prop id="receipt" x={0} y={0} size={140} f={f} /><Tick x={50} y={-50} o={1} r={30} /></g>
          <g opacity={on(f, c('s44a:spend'), 6) * (1 - on(f, basic, 8))} transform="translate(1720 880)"><Prop id="wallet" x={0} y={0} size={120} f={f} /></g>
          <g opacity={on(f, d2, 6)} transform="translate(980 760)"><rect x={-170} y={-44} width={340} height={88} rx={16} fill={P.mint} /><Label x={0} y={28} text="+$65 · 2% BACK" size={56} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, d3250, 6)}>
            <rect x={1260} y={460} width={500} height={14} rx={7} fill={P.card} /><rect x={1260} y={460} width={lerp(0, 500, on(f, d3250, 20))} height={14} rx={7} fill={P.gold} />
            <path d="M1510 430 L1510 510" stroke={P.goldInk} strokeWidth={8} /><Label x={1510} y={560} text="$3,250" size={70} font="Bebas Neue" color={P.goldInk} />
            <Label x={1380} y={640} text={f >= less ? '← BASIC' : ''} size={56} font="Bebas Neue" color={P.ink} /><Label x={1660} y={640} text={f >= less ? 'EXECUTIVE →' : ''} size={56} font="Bebas Neue" color={P.goldInk} />
          </g>
          <g opacity={on(f, basic, 6)} transform="translate(1380 840) scale(0.7)"><MemberCard x={0} y={0} title="GOLD STAR" glow={1} /></g>
        </g>
        {/* # C: the catch — a giant tub going to waste; one item in, ten out */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, one, 8)}>
            <g transform={`translate(1100 640) scale(${pop(f, packs)})`} opacity={on(f, packs, 6)}><rect x={-140} y={-170} width={280} height={300} rx={30} fill="#F7FAFF" stroke="#C9D3E1" strokeWidth={6} /><rect x={-140} y={-170} width={280} height={60} rx={30} fill={P.sky} /><Label x={0} y={20} text="XXL" size={90} font="Bebas Neue" color={P.navy1} /></g>
            <g opacity={on(f, c('s46:finish'), 6)} transform="translate(1480 940)"><path d="M-90 -140 L90 -140 L70 40 L-70 40 Z" fill="#5C6F8E" /><rect x={-100} y={-160} width={200} height={26} rx={8} fill="#3A4A66" /></g>
            <g opacity={on(f, goes, 6)}>{[0, 1, 2].map((k) => <circle key={k} cx={1060 + k * 40} cy={720 + (k % 2) * 24} r={18} fill="#7AA35A" opacity={0.8} />)}<g transform="translate(1480 700)"><Prop id="cross" x={0} y={0} size={140} f={f} /></g></g>
            <g opacity={on(f, bigger, 6)} transform="translate(1480 900)"><Prop id="receipt" x={0} y={0} size={160} f={f} /></g>
          </g>
          <g opacity={on(f, c('s46a:walk'), 6) * (1 - on(f, one, 8))}><Mini look="buyer" x={lerp(900, 1240, span(f, c('s46a:walk'), c('s46a:walk') + 30))} y={1000} scale={0.9} frame={f} seed={66} /></g>
          <g opacity={on(f, c('s46a:good'), 6)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${900 + k * 160} 420) scale(0.7)`}><Prop id="price-tag" x={0} y={0} size={120} f={f} /><Tick x={50} y={-40} o={1} r={26} /></g>)}</g>
          <g opacity={on(f, one, 6)}>
            <Cart x={1240} y={980} s={1.1} fill={lerp(0.12, 1, on(f, ten, 24))} />
            <g opacity={on(f, spending, 6)} transform="translate(1680 520)"><Prop id="receipt" x={0} y={0} size={180} f={f} /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="wt" />
    </g>
  )
}

export const CO_WORTH = makePiece('co-worth', 'Long: is the card worth it — 5% example covers $65 at ≈ $1,300 a year; family $2,400 a year saves ≈ $120; Executive pays off above ≈ $3,250; big packs and impulse buys', { mood: 'light', Component: Worth,
  beats: ["s41:pay", "s41:check", "s42:5", "s42:example", "s42:higher", "s43:1300", "s43:cover", "s43:fee", "s43a:family", "s43a:200", "s43a:2400", "s43a:120", "s43a:comfortably", "s44:executive", "s44:2", "s44:3250", "s44a:less", "s44a:basic", "s45:catch", "s45:packs", "s45:use", "s46:tub", "s46:goes", "s46:bigger", "s46a:one", "s46a:ten", "s46a:spending", "s41", "s43:5", "s46a:extra", "s42:lower", "s42:number", "s43a:5", "s46:bargain", "s44:pays", "s44a:better", "s42:compared", "s43:spend", "s43a:month", "s43a:year", "s43a:there", "s44:costs", "s44:gives", "s44:qualifying", "s44a:spend", "s46:finish", "s46a:walk", "s46a:good"],
  sfx: [['s42:5', 'pop', 0.4], ['s43:1300', 'ding', 0.4], ['s43a:120', 'coin', 0.4], ['s44:3250', 'ding', 0.4], ['s45:catch', 'thud', 0.4], ['s46a:ten', 'pop', 0.4]] })
