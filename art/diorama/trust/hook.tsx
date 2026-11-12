// ---------------------------------------------------------------- s1–s7: the hook.
// A) A casino at dusk; the billionaire hands bricks of cash to his two heirs; a cash column grows beside them ($7.9B by 2013).
// B) A tax office slides in and fires a red $2.8B bill at the column; a trust box drops in front of it and the bill is crossed.
// C) A briefcase (crossed), a palm island (crossed), then the trust box — which copies itself into a row ("over and over").
// D) 100 small figures (the 100 richest); more than half light up gold, each with a tiny box.
// E) The trust box swallows a tax bill; three numbered steps light up beneath.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { TaxOffice } from '../bbd/kit'
import { Briefcase } from '../buffett/kit'
import { NoMark, StepBadge } from '../bank/kit'
import { CashColumn, Casino, Island, Pill, RedBill, TrustBox, TAXRED, BOX } from './kit'

const GROUND = 930

// # one of the hundred: a simple round-headed figure; lit 0–1 turns it gold and shows a tiny box at its feet
const Rich: React.FC<{ x: number; y: number; lit: number }> = ({ x, y, lit }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cy={-46} r={13} fill={lit > 0.5 ? '#B88A2E' : '#8E9BB2'} />
    <path d="M-17 0 Q-17 -32 0 -32 Q17 -32 17 0 Z" fill={lit > 0.5 ? P.gold : '#B5C0D2'} />
    {lit > 0 && <g opacity={lit} transform={`translate(20 -4) scale(${0.6 + 0.4 * lit})`}><rect x={-9} y={-12} width={18} height={12} rx={2} fill={BOX.wood} /><rect x={-9} y={-15} width={18} height={4} rx={2} fill={BOX.woodL} /></g>}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const y2010 = c('s1:2010'), casino = c('s1:casino'), handing = c('s1:handing'), fortune = c('s1:fortune'), family = c('s1:family')
  const y2013 = c('s2:2013'), b79 = c('s2:79'), moved = c('s2:moved'), heirs = c('s2:heirs')
  const normally = c('s3:normally'), gift3 = c('s3:gift'), huge = c('s3:huge'), bill3 = c('s3:bill'), b28 = c('s3:28')
  const legally = c('s4:legally'), avoided = c('s4:avoided')
  const hidden = c('s5:hidden'), islands = c('s5:islands'), trust5 = c('s5:trust'), over5 = c('s5:over'), again = c('s5:again')
  const only6 = c('s6:only'), half = c('s6:half'), richest = c('s6:richest'), trusts6 = c('s6:trusts'), cut6 = c('s6:cut')
  const how7 = c('s7:how'), disappear = c('s7:disappear'), walk7 = c('s7:walk'), three = c('s7:three'), steps7 = c('s7:steps')

  const AB = normally - 8, BC = c('s5:no') - 8, CD = c('s6:and') - 8, DE = c('s7:so') - 8
  const A = win(f, 0, AB), Bw = win(f, AB, BC), C = win(f, BC, CD), D = win(f, CD, DE), E = on(f, DE, 10)
  // # the heirs and their column stay through A and B
  const AB2 = win(f, 0, BC)

  // # A) the billionaire hands bricks to the heirs from "handing" until "heirs"
  const adelson = c('s1:adelson')
  const bossBeats: Beat[] = [[0, 'idle', 'smug'], [adelson, 'confident', 'smug'], [handing, 'offer', 'smiling'], [moved, 'present', 'smiling'], [normally, 'armsCrossed', 'smug'], [legally, 'confident', 'smug']]
  const hp = hand(f, bossBeats, 820, GROUND, 1.05)
  const throws = Array.from({ length: 7 }, (_, k) => lerp(handing, heirs, k / 6))
  const colH = 40 + 470 * span(f, handing, heirs + 10)

  // # B) the bill flies at the column, the box drops, the bill is crossed and falls away
  const bt = span(f, bill3, bill3 + 20), billFly = { x: lerp(520, 1060, bt), y: lerp(520, 470, bt) - 300 * Math.sin(Math.PI * bt), o: on(f, bill3, 6) }
  const billDrop = span(f, avoided + 6, avoided + 30)

  // # C) the box copies itself into a row on "over … again"
  const copies = [0, 1, 2, 3].map((k) => (k === 0 ? 1 : on(f, lerp(over5, again, k / 3), 10)))
  const rowShift = on(f, over5, 16)

  // # D) which of the 100 light up: 53 of them, spread out, in a fixed shuffled order from "half" to "trusts"
  const order = Array.from({ length: 100 }, (_, k) => k).sort((a, b) => ((a * 37) % 101) - ((b * 37) % 101))
  const litAt = new Map(order.slice(0, 53).map((k, i) => [k, lerp(half, trusts6, i / 52)]))

  // # E) the bill sinks into the box on "disappear"
  const sink = span(f, disappear - 4, disappear + 16)

  return (
    <g>
      <Stage id="tt-hook" frame={f} />
      <Headline f={f} lines={[[y2010, 'A CASINO BILLIONAIRE', P.ink, 100], [b79, '$7.9 BILLION TO HIS HEIRS', P.ink, 100], [b28, 'THE TAX: ABOUT $2.8 BILLION', P.coralInk, 96], [legally, 'LEGALLY AVOIDED', P.mintInk, 110],
        [hidden, 'NO HIDDEN ACCOUNTS', P.ink, 100], [islands, 'NO SECRET ISLANDS', P.ink, 100], [trust5, 'A SPECIAL KIND OF TRUST', P.ink, 104], [half, 'MORE THAN HALF OF THE 100 RICHEST', P.ink, 92], [how7, 'HOW DOES A TRUST DO IT?', P.ink, 104], [three, '3 SIMPLE STEPS', P.ink, 110]]} />

      {/* # A + B) the ground, the casino, the billionaire and his heirs */}
      {AB2 > 0 && <g opacity={AB2}>
        <Ground y={GROUND} />
        <g opacity={A}><Casino x={330} y={GROUND} s={0.95 + 0.04 * pop(f, casino, 14)} o={on(f, casino - 10, 14)} f={f} /></g>
        <g opacity={Bw}><g transform={`translate(${lerp(-500, 0, on(f, AB, 18))} 0)`}><TaxOffice x={360} y={GROUND} s={1.15} eat={on(f, huge, 12) * (1 - on(f, avoided, 12))} /></g></g>
        <Person f={f} who="investor" beats={bossBeats} x={820} y={GROUND} s={1.05} />
        {f >= handing && f < heirs + 20 && throws.map((t0, k) => { const fl = fly(f, t0, [hp.x, hp.y], [1290, GROUND - 60 - Math.min(400, (k + 1) * 60)], 16, 120); return fl.t < 1 ? <g key={k} opacity={fl.o} transform={`translate(${fl.x} ${fl.y}) rotate(${fl.t * 30})`}><rect x={-46} y={-16} width={92} height={32} rx={5} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={3} /><rect x={-10} y={-16} width={20} height={32} fill="#F2E6CC" /></g> : null })}
        <CashColumn x={1290} y={GROUND} h={colH} w={190} o={on(f, handing, 10)} />
        <Pill x={1290} y={GROUND - colH - 54} text="$7.9 BILLION" size={50} o={on(f, b79, 8)} color="#1E7A4C" />
        <Pill x={1290} y={GROUND - colH - 128} text="2010 → 2013" size={40} o={on(f, y2013, 8) * (1 - on(f, normally, 8))} color="#5C6F8E" />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [family, 'receive', 'smiling'], [heirs, 'celebrate', 'smiling'], [bill3, 'shock', 'shocked'], [legally, 'relief', 'smiling']]} x={1540} y={GROUND} s={0.95} flip />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [fortune, 'receive', 'smiling'], [moved, 'clapA', 'smiling', 'clapB', 12], [bill3, 'nervous', 'worried'], [legally, 'thumbsUp', 'smiling']]} x={1740} y={GROUND} s={0.95} flip />
        {/* # B) the trust box that stops the bill */}
        <g opacity={on(f, legally, 10)} transform={`translate(0 ${-140 * (1 - pop(f, legally, 16))})`}><TrustBox x={1040} y={GROUND} s={0.62} lock={on(f, legally + 8, 10)} glow={win(f, legally, legally + 40, 8)} /></g>
        {f >= bill3 && <g opacity={billFly.o * (1 - billDrop)} transform={`translate(${billDrop * 120} ${billDrop * 380}) rotate(${billDrop * 50})`}>
          <RedBill x={billFly.x} y={billFly.y} s={0.62} r={-6} amount={f >= b28 ? '$2.8B' : '$ ? ? ?'} />
          <NoMark x={billFly.x} y={billFly.y} o={on(f, avoided, 8)} r={92} />
        </g>}
      </g>}

      {/* # C) not a briefcase, not an island: a trust, again and again */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-200 * rowShift})`} opacity={1 - on(f, trust5 - 14, 10)}>
          <g opacity={on(f, hidden - 6, 10)}><Briefcase x={560} y={760} s={1} open={0} /><NoMark x={560} y={700} o={on(f, hidden + 6, 8)} r={130} /></g>
          <g opacity={on(f, islands - 6, 10)}><Island x={1360} y={800} s={1.05} f={f} /><NoMark x={1360} y={680} o={on(f, islands + 6, 8)} r={150} /></g>
        </g>
        {copies.map((o, k) => o > 0.01 && on(f, trust5 - 4, 12) > 0 ? <TrustBox key={k} x={lerp(960, 360 + k * 400, rowShift)} y={GROUND} s={lerp(1.25, 0.8, rowShift) * (k === 0 ? 1 : 0.6 + 0.4 * pop(f, lerp(over5, again, k / 3), 14))} o={o * on(f, trust5, 12)} lock={1} glow={k === 0 ? win(f, trust5, trust5 + 40) : 0} /> : null)}
      </g>}

      {/* # D) the hundred richest, more than half lit */}
      {D > 0 && <g opacity={D}>
        {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), at = litAt.get(k), appear = lerp(CD - 6, richest, (col + row * 3) / 31)
          return <g key={k} opacity={on(f, appear, 8)} transform={`translate(0 ${-8 * pop(f, at ?? 9e9, 10) * 0})`}><Rich x={330 + col * 66} y={420 + row * 118} lit={at === undefined ? 0 : on(f, at, 8)} /></g> })}
        <Pill x={960} y={1010} text={f >= cut6 ? 'TO CUT THEIR ESTATE TAXES' : 'MORE THAN 50 OF 100'} size={46} o={on(f, half, 8)} color={f >= cut6 ? TAXRED : '#B4821C'} w={620} />
      </g>}

      {/* # E) the bill disappears into the box; three steps */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND - 260} o={0.0} />
        <TrustBox x={960} y={640 - 30 * win(f, walk7, walk7 + 18, 8)} s={1.05} open={win(f, how7 - 4, disappear + 18, 10)} lock={on(f, disappear + 18, 10)} glow={win(f, disappear, disappear + 30)} />
        <g opacity={1 - on(f, disappear + 10, 8)} transform={`translate(960 ${lerp(260, 520, sink)}) scale(${lerp(0.6, 0.25, sink)})`}><RedBill x={0} y={0} amount="$$$" /></g>
        {([[three, 'THE TAX'], [lerp(three, steps7, 0.5), 'THE GRAT'], [steps7, 'FOREVER']] as [number, string][]).map(([at, t], k) =>
          <StepBadge key={k} x={600 + k * 360} y={880 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 24, 6)} col="#2E4A78">
            {k === 0 && <g transform="scale(0.42)"><RedBill x={0} y={0} amount="40%" /></g>}
            {k === 1 && <g transform="translate(0 40) scale(0.22)"><TrustBox x={0} y={0} label="GRAT" lock={1} /></g>}
            {k === 2 && <path d="M-40 0 C-40 -30 -6 -30 0 0 C6 30 40 30 40 0 C40 -30 6 -30 0 0 C-6 30 -40 30 -40 0 Z" fill="none" stroke="#B4821C" strokeWidth={10} />}
          </StepBadge>)}
      </g>}
      <Vignette id="tt-hook" />
    </g>
  )
}

const BEATS = ['s1:adelson', 's1:2010', 's1:casino', 's1:handing', 's1:fortune', 's1:family', 's2:2013', 's2:79', 's2:moved', 's2:heirs', 's3:gift', 's3:huge', 's3:bill', 's3:28', 's4:legally', 's4:avoided',
  's5:hidden', 's5:islands', 's5:trust', 's5:over', 's5:again', 's6:only', 's6:richest', 's6:half', 's6:trusts', 's6:cut', 's7:how', 's7:disappear', 's7:walk', 's7:three', 's7:steps']
export const TT_HOOK = makePiece('tt-hook', 'Trusts long hook: a casino; the billionaire hands cash bricks to two heirs and a $7.9B column grows (2010→2013); a tax office fires a red $2.8B bill, a trust box drops in and the bill is crossed and falls; a briefcase and a palm island crossed, the trust box copies itself into a row; 100 small figures, more than half light gold with tiny boxes; the bill sinks into the box and three steps light up', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:handing', 'pop', 0.2], ['s3:bill', 'whoosh', 0.2], ['s4:legally', 'thud', 0.25], ['s5:trust', 'pop', 0.2], ['s6:half', 'pop', 0.15], ['s7:three', 'pop', 0.2]] })
