// ---------------------------------------------------------------- s23–s28 transforming sample (owner bar 2026-10-31): continuous transforming illustration,
// synced to the words, nothing covers anything, no frame held long, no camera moves. One certificate leaves her shelf and grows into a $1M
// bundle; the street slides away and the bundle splits into ten tall bars (1 blue = the $100K she paid, 9 gold = the $900K gain); the top of
// every gold bar turns coral (20%, then + 3.8%); the coral tops peel off, fly together into one $214K block, and a tax office rises from the
// ground to swallow it; the rest squeezes back into one bundle and flies into her arms as the street slides back; her shelf shows the gap.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person } from '../aimoney/common'
import { Cert, TaxOffice } from './kit'
import { House, Stall, Street } from './sell'

const N = 10, BW = 112, GAP = 130, X0 = 370, TOP = 310, H = 490
const BUX = 1150, BUY = 370 // # where the $1M bundle hangs: right of her, above the stall (never over her head) // # the ten bars: x of bar k = X0 + k * GAP
const TAXF = 0.238 // # 20% + 3.8% of the gain

const Sell3: React.FC<PieceProps> = ({ f, c }) => {
  const one = c('s23:one'), sells = c('s23:sells'), shares = c('s23:shares')
  const ten = c('s24:ten'), d100k = c('s24:100000'), original = c('s24:original')
  const d900 = c('s25:900000'), gain2 = c('s25:gain#2'), taxed = c('s25:taxed'), d20 = c('s26:20'), d38 = c('s26:38'), together = c('s27:together'), d238 = c('s27:238'), d214 = c('s27:214000'), office = c('s27:office')
  const keeps = c('s27a:keeps'), d786 = c('s27a:786000'), gone = c('s28:gone'), grow = c('s28:grow')
  // # the street slides down out of view while the bars are told, and back up when she keeps the rest
  const away = easeInOut(on(f, ten, 22)) * (1 - easeInOut(on(f, keeps, 22)))
  const streetY = away * 700
  // # her walk: by her shelf → steps aside to the far left while the bars fill the screen → back by her shelf
  const ix = lerp(700, 130, away)
  const inv: Beat[] = [[0, 'idle', 'neutral'], [one, 'present', 'smiling'], [sells, 'offer', 'smiling'], [ten, 'walkA', 'neutral', 'walkB', 10], [ten + 22, 'think', 'thinking'],
    [d100k, 'explain', 'neutral'], [d900, 'confident', 'smiling'], [taxed, 'nervous', 'worried'], [d20, 'oops', 'shocked'], [d214, 'despair', 'worried'],
    [keeps, 'walkA', 'neutral', 'walkB', 10], [keeps + 22, 'receive', 'neutral'], [d786 + 20, 'carry', 'worried'], [gone, 'facepalm', 'worried']]
  const hp = hand(f, inv, ix, 1000, 0.95)
  // # A: the certificate lifts off the shelf on "sells", flies to the middle and grows; on "shares" it becomes the $1M bundle
  const lift = easeInOut(span(f, sells, shares + 4)), toBundle = on(f, shares, 10)
  // # B: the bundle splits into ten bars on "ten years ago" (each bar slides out to its place)
  const split = easeInOut(span(f, ten, ten + 26))
  const blue = on(f, d100k, 10), gold = on(f, d900, 10)
  const slice = f < d38 ? lerp(0, 0.2, on(f, d20, 12)) : lerp(0.2, TAXF, on(f, d38, 10)) // # share of each gold bar that turns coral
  const peel = easeInOut(span(f, d214, d214 + 30)) // # the coral tops fly together into one block
  const swallow = easeInOut(span(f, office, office + 18))
  const officeUp = easeInOut(on(f, d214, 20)) * (1 - on(f, keeps + 30, 12))
  // # C: the rest squeezes into one bundle on "keeps", then flies into her arms on "786,000"
  const squeeze = easeInOut(span(f, keeps, keeps + 22)), toArms = easeInOut(span(f, d786, d786 + 20))
  const shake = f >= taxed && f < d20 ? Math.sin((f - taxed) * 1.6) * 4 * (1 - span(f, taxed, d20)) : 0
  const L = (x: number, y: number, text: string, color: string, o: number, size = 56) => o > 0.01 ? <Label x={x} y={y} text={text} size={size} font="Bebas Neue" color={color} o={o} /> : null
  // # bar k's place: one stack in the middle (before the split / after the squeeze) → spread out across the screen
  const spread = split * (1 - squeeze)
  const barX = (k: number) => lerp(lerp(BUX, 960, squeeze) + (k - 4.5) * 6, X0 + k * GAP, spread)
  const barW = lerp(56, BW, spread)
  const bundleScale = lerp(lerp(1, 0.4, squeeze), 0.18, toArms)
  const bundleX = lerp(lerp(960, 1150, squeeze), hp.x + 10, toArms), bundleY = lerp(lerp(TOP + H / 2, 330, squeeze), hp.y + 30, toArms)
  return (
    <g>
      <Stage id="bs3" frame={f} />
      {/* # the street (slides down out of view during the bars, back up at the end) */}
      <g transform={`translate(0 ${streetY})`} opacity={1 - away}>
        <Street f={f} />
        <House x={250} y={880} />
        <g transform="translate(470 880)">
          <rect x={-90} y={-330} width={180} height={330} rx={8} fill="#A86F42" />
          {Array.from({ length: 10 }, (_, k) => (k === 9 && f >= sells ? null : <g key={k} transform={`translate(0 ${-20 - k * 30})`}><rect x={-75} y={-12} width={150} height={24} rx={5} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={2} /><circle cx={60} cy={0} r={6} fill={P.gold} /></g>))}
          <g opacity={on(f, gone, 8)}><rect x={-80} y={-302} width={160} height={30} rx={6} fill="none" stroke={P.coral} strokeWidth={4} strokeDasharray="10 8" /></g>
          <g opacity={on(f, gone + 4, 8)} transform={`translate(0 -300) rotate(${lerp(0, 70, on(f, grow, 30))})`}><path d="M0 0 C 0 -30, 0 -40, 0 -55" stroke="#3DA672" strokeWidth={6} fill="none" /><ellipse cx={-14} cy={-50} rx={16} ry={8} fill="#3DA672" opacity={1 - 0.5 * on(f, grow, 30)} /><ellipse cx={14} cy={-58} rx={16} ry={8} fill="#3DA672" opacity={1 - 0.5 * on(f, grow, 30)} /></g>
        </g>
        <Stall x={1250} y={880} />
      </g>
      <g opacity={away}><rect x={0} y={TOP + H + 10} width={1920} height={1080 - TOP - H - 10} fill="#E6D3AE" /><rect x={0} y={TOP + H + 10} width={1920} height={8} fill="#D9C4A0" /></g>
      {/* # A: the certificate lifts off the shelf and grows in the middle of the sky */}
      {f >= sells && f < shares + 10 && <g opacity={1 - toBundle}><Cert x={lerp(470, BUX, lift)} y={lerp(590, BUY, lift) - Math.sin(Math.PI * lift) * 260} s={lerp(0.4, 1.4, lift)} /></g>}
      {/* # the $1M bundle (from "shares" until it splits on "ten") */}
      {f >= shares && f < ten + 26 && <g opacity={toBundle * (1 - split)} transform={`translate(${BUX} ${BUY})`}>
        <rect x={-300} y={-110} width={600} height={220} rx={18} fill="#7FC98A" stroke="#3E8A4E" strokeWidth={6} /><rect x={-270} y={-80} width={540} height={160} rx={12} fill="none" stroke="#3E8A4E" strokeWidth={3} />
        <Label x={0} y={30} text="$1M" size={110} font="Bebas Neue" color={P.navy0} /></g>}
      {/* # B: ten bars — 1 blue (paid), 9 gold (gain); the coral top of each gold bar is the tax */}
      {f >= ten && f < d786 + 22 && <g transform={f >= keeps ? `translate(${bundleX - 960} ${bundleY - (TOP + H / 2)}) translate(960 ${TOP + H / 2}) scale(${bundleScale}) translate(-960 ${-(TOP + H / 2)})` : ''}>
        {Array.from({ length: N }, (_, k) => {
          const x = barX(k), isBlue = k === 0
          const fill = isBlue ? (blue > 0.5 ? '#7FB2E5' : '#7FC98A') : (gold > 0.5 ? P.gold : '#7FC98A')
          // # after the peel, gold bars are shorter by the tax slice (what she keeps)
          const keptH = isBlue ? H : H * (1 - TAXF * on(f, d214 + 20, 8))
          return <g key={k} transform={`translate(0 ${isBlue ? 0 : shake})`}>
            <rect x={x - barW / 2} y={TOP + H - keptH} width={barW} height={keptH} rx={12} fill={fill} stroke="#00000022" strokeWidth={3} />
            {!isBlue && f < d214 + 4 && slice > 0 && <rect x={x - barW / 2} y={TOP} width={barW} height={H * slice} rx={12} fill={P.coral} />}
          </g>
        })}
      </g>}
      {/* # the coral tops peel off and fly together into one block on the right */}
      {f >= d214 && f < office + 18 && Array.from({ length: N - 1 }, (_, i) => { const k = i + 1, x = lerp(X0 + k * GAP, 1780, peel), y = lerp(TOP + (H * TAXF) / 2, 520, peel)
        return <rect key={k} x={x - lerp(BW, 160, peel) / 2} y={y - lerp(H * TAXF, 210, peel) / 2} width={lerp(BW, 160, peel)} height={lerp(H * TAXF, 210, peel)} rx={12} fill={P.coral} opacity={1 - swallow} transform={`translate(0 ${lerp(0, 320, swallow)}) `} /> })}
      {/* # the tax office rises from the ground on "214,000" and swallows the block on "office" */}
      <g transform={`translate(0 ${lerp(500, 0, officeUp)})`} opacity={officeUp}><TaxOffice x={1780} y={980} s={0.6} eat={on(f, d214 + 20, 8) * (1 - on(f, office + 20, 8))} /></g>
      {/* # labels: each one only while its line is said */}
      {L(X0, TOP - 50, '$100K PAID', P.skyInk, on(f, d100k, 8) * (1 - on(f, d900, 8)), 50)}
      {L(X0 + 5 * GAP, TOP - 50, '$900K GAIN', P.goldInk, on(f, d900, 8) * (1 - on(f, d20, 8)) + 0 * gain2, 64)}
      {L(X0 + 5 * GAP, TOP - 50, f >= together ? '20% + 3.8% = 23.8%' : f >= d38 ? '20% + 3.8%' : '20% TAX ON THE GAIN', P.coralInk, on(f, d20, 8) * (1 - on(f, d214, 8)), 60)}
      {L(1780, 380, '≈ $214K', P.coralInk, on(f, d214 + 20, 8) * (1 - on(f, office + 10, 8)), 64)}
      {L(hp.x + 180, hp.y - 120, '≈ $786K', P.mintInk, on(f, d786 + 20, 8) * (1 - on(f, gone, 8)), 60)}
      <Person f={f} who="investorF" beats={inv} x={ix} y={1000} s={0.95} />
      {f >= d786 + 20 && <g opacity={1 - on(f, gone + 10, 10)} transform={`translate(${hp.x + 10} ${hp.y + 30}) scale(0.3)`}><rect x={-230} y={-110} width={460} height={220} rx={18} fill="#7FC98A" stroke="#3E8A4E" strokeWidth={8} /><rect x={-230} y={-110} width={80} height={220} rx={18} fill="#7FB2E5" /></g>}
      <Headline f={f} lines={[[one, 'WAY ONE: SELL', P.coralInk, 120], [ten, 'WHAT SHE PAID · THE GAIN', P.ink, 104], [d20, 'THE GAIN IS TAXED', P.coralInk, 116], [d214, '≈ $214K TAX', P.coralInk, 124], [d786, 'SHE KEEPS ≈ $786K', P.ink, 116], [gone, 'THOSE SHARES ARE GONE', P.ink, 112]]} />
      <Vignette id="bs3" />
    </g>
  )
}

const BEATS: string[] = ['s23:one', 's23:sells', 's23:shares', 's24:ten', 's24:100000', 's24:original', 's25:900000', 's25:gain#2', 's25:taxed', 's26:20', 's26:38', 's27:together', 's27:238', 's27:214000', 's27:office',
  's27a:keeps', 's27a:786000', 's28:gone', 's28:grow']
export const BB3_SELL = makePiece('bb3-sell', 'Long (transforming sample): certificate → $1M bundle → ten bars (blue paid / gold gain) → coral tax tops peel into a $214K block swallowed by a rising tax office → the rest squeezes back into her arms ($786K) → shelf gap', {
  mood: 'light', Component: Sell3, beats: BEATS,
  sfx: [['s23:shares', 'swish', 0.4], ['s24:ten', 'whoosh', 0.4], ['s26:20', 'click', 0.3], ['s27:214000', 'whoosh', 0.4], ['s27:office', 'thud', 0.4], ['s27a:keeps', 'swish', 0.3], ['s28:gone', 'softpop', 0.3]] })
