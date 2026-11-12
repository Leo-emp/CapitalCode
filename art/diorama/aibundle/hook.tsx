// ---------------------------------------------------------------- s1–s5: the hook.
// A) The subscription box (Word, Excel…) with its $69.99 tag; on "43" the tag flips to $99.99 with a +43% sticker;
//    one person beside it reacts. The AI spark flies in and drops into the box's seat ("added to the plan").
// B) Australia: the map, the regulator's building with scales, a crowd filling the map (2.7 million). Then the
//    renewal email: PAY MORE or CANCEL; the cheaper plan is a door hidden behind the card that only slides out
//    when CANCEL is pressed.
// C) Why push AI into what you already pay for: the spark is pushed into the box, a wallet's coins flow in, and the
//    tag climbs again. D) The answer: the spark talks in a bubble and a coin drops out of it (one simple fact);
//    a second subscription box slides in with its own spark (more than one app).
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Wallet } from '../gift/kit'
import { Mini } from '../../rig/Mini'
import { AUS_PATH, Australia, Bubble, Coin, Email, Regulator, Spark, Spot, SubBox, Tag } from './kit'

const GROUND = 930
// # where the crowd stands on the map (map centre 600,560, scale 1.1): rows of small people inside the outline
const CROWD: [number, number][] = [[-170, -40], [-110, -60], [-50, -90], [10, -110], [70, -90], [130, -60], [190, -20],
  [-190, 40], [-130, 20], [-70, 0], [-10, -20], [50, 0], [110, 20], [170, 50], [-140, 100], [-80, 80], [-20, 70], [40, 80], [100, 110]]

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), microsoft = c('s1:microsoft'), price = c('s1:price'), word = c('s1:word'), excel = c('s1:excel'), subscription = c('s1:subscription')
  const one = c('s1:one'), person = c('s1:person'), d43 = c('s1:43')
  const reason = c('s2:reason'), ai2 = c('s2:ai'), copilot = c('s2:copilot'), added = c('s2:added'), plan2 = c('s2:plan'), wanted = c('s2:wanted'), not2 = c('s2:not')
  const australia = c('s3:australia'), regulator = c('s3:regulator'), says = c('s3:says'), d27 = c('s3:27'), million = c('s3:million'), customers = c('s3:customers')
  const not3 = c('s3:not'), told = c('s3:told'), cheaper = c('s3:cheaper'), without = c('s3:without'), unless = c('s3:unless'), cancel = c('s3:cancel')
  const why = c('s4:why'), company = c('s4:company'), push = c('s4:push'), already = c('s4:already'), pay4 = c('s4:pay'), charge = c('s4:charge'), more4 = c('s4:more')
  const answer = c('s5:answer'), simple = c('s5:simple'), fact = c('s5:fact'), explains = c('s5:explains'), more5 = c('s5:more'), app5 = c('s5:app')

  // # the four groups, one at a time (the old one leaves before the next arrives)
  const A = win(f, s1, australia), B1 = win(f, australia - 2, not3), B2 = win(f, not3 - 2, why), C = win(f, why - 2, answer), D = on(f, answer - 2, 8)
  const nina: Beat[] = [[0, 'idle', 'neutral'], [person, 'point', 'neutral'], [d43, 'shock', 'shocked'], [copilot, 'think', 'thinking'], [wanted, 'shrug', 'worried']]

  // # the AI spark: flies in from the top right on "AI", drops into the box's seat on "added"
  const sparkIn = on(f, ai2, 16), sparkSeat = on(f, added, 18)
  const sx = lerp(lerp(1900, 1600, sparkIn), 1225, sparkSeat), sy = lerp(lerp(120, 330, sparkIn), 330, sparkSeat) - Math.sin(sparkSeat * Math.PI) * 120

  // # the tag: $69.99 until "43", then $99.99 with the sticker
  const flipped = f >= d43
  return (
    <g>
      <Stage id="ab-hook" frame={f} />
      <Spot f={f} at={word} x={851} y={549} rx={110} ry={110} />
      <Spot f={f} at={excel} x={1069} y={549} rx={110} ry={110} />
      <Spot f={f} at={d43} x={1560} y={660} rx={240} ry={150} />
      <Spot f={f} at={regulator} x={1400} y={680} rx={240} ry={260} />
      <Spot f={f} at={cheaper} x={1400} y={600} rx={220} ry={260} />
      <Headline f={f} lines={[[s1, 'JANUARY 2025', P.ink, 120], [microsoft, 'MICROSOFT 365 · WORD AND EXCEL', P.ink, 100], [d43, '+43% FOR ONE PERSON (US)', P.coralInk, 110],
        [copilot, 'THE AI ASSISTANT: COPILOT', P.ink, 104], [plan2, 'ADDED TO THE PLAN', P.ink, 110],
        [australia, 'AUSTRALIA', P.ink, 120], [says, 'THE REGULATOR SAYS…', P.ink, 110], [million, '2.7 MILLION CUSTOMERS', P.goldInk, 110],
        [told, 'NOT TOLD ABOUT A CHEAPER PLAN', P.ink, 100], [cancel, 'UNLESS THEY TRIED TO CANCEL', P.coralInk, 100],
        [why, 'WHY PUT AI IN WHAT YOU ALREADY PAY FOR?', P.ink, 92], [more4, 'AND CHARGE YOU MORE?', P.coralInk, 110],
        [simple, 'ONE SIMPLE FACT ABOUT AI', P.goldInk, 110], [more5, 'MORE THAN ONE APP', P.ink, 110]]} />

      {/* # A) the box, the tag, one person, the spark landing */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${lerp(40, 0, on(f, s1, 14))})`}>
          <SubBox x={960} y={560} s={1.15 * pop(f, s1, 16)} title={f >= microsoft ? 'MICROSOFT 365' : ''} tiles={on(f, word, 8) * 0.25 + on(f, excel, 8) * 0.25 + on(f, subscription, 18) * 0.5}
            lit={[on(f, word, 6) * (1 - on(f, excel, 10)), on(f, excel, 6) * (1 - on(f, subscription, 10)), 0, 0]} seat={on(f, ai2, 10) * (1 - on(f, added + 14, 8))} />
        </g>
        <g opacity={on(f, price, 8)}><Tag x={1560} y={640} s={1.35 * pop(f, price) * (flipped ? lerp(1, 1.12, on(f, d43, 10)) : 1)} r={lerp(-4, 4, Math.sin(f / 30) * 0.5 + 0.5)}
          text={flipped ? '$99.99' : '$69.99'} color={flipped ? P.gold : '#F3E3B5'} sticker="+43%" stickerO={on(f, d43, 10)} /></g>
        <g opacity={on(f, one, 8)}><Person f={f} who="investorF" beats={nina} x={330} y={GROUND} s={1.05} /></g>
        {f >= ai2 - 2 && <Spark x={sx} y={sy} s={lerp(1.7, 1.05, sparkSeat)} f={f} glow={1} o={on(f, ai2, 6)} />}
        <g opacity={on(f, copilot, 8) * (1 - on(f, added, 8))}><Label x={1600} y={500} text="COPILOT" size={64} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # B1) Australia: the map, the regulator, the crowd */}
      {B1 > 0 && <g opacity={B1}>
        <Ground y={GROUND} />
        <g transform={`translate(${lerp(-200, 0, on(f, australia, 16))} 0)`}><Australia x={600} y={560} s={1.1 * pop(f, australia, 16)} /></g>
        <g opacity={on(f, regulator, 8)}><Regulator x={1420} y={GROUND} s={0.8 * pop(f, regulator, 14)} tilt={Math.sin(f / 20) * 0.3 * on(f, says, 10)} /></g>
        {/* # the crowd fills the map group by group as "2.7 million" is said */}
        <clipPath id="ab-aus"><path d={AUS_PATH} transform="translate(600 560) scale(1.1)" /></clipPath>
        <g clipPath="url(#ab-aus)">{CROWD.map(([dx, dy], k) => {
          const t = on(f, d27 + k * 2, 8)
          return t > 0 ? <g key={k} opacity={t}><Mini look={['buyer', 'investorF', 'worker', 'owner', 'investor'][k % 5]} x={600 + dx * 1.1} y={560 + dy * 1.1 + 70} scale={0.5 * (0.7 + 0.3 * t)} frame={f} seed={k} mood={f >= customers ? 'neutral' : 'neutral'} /></g> : null
        })}</g>
        <g opacity={on(f, million, 8)}><Label x={600} y={GROUND + 90} text="≈ 2.7 MILLION" size={72} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # B2) the renewal email: two buttons; the hidden third door slides out only when CANCEL is pressed */}
      {B2 > 0 && <g opacity={B2}>
        <Email x={820} y={590} s={1.3 * pop(f, not3 - 2, 14)} doorHint={on(f, cheaper, 10)} pressCancel={on(f, unless, 8) * (1 - on(f, cancel + 12, 8)) + on(f, cancel, 6) * 0.6} door={on(f, cancel, 18)} />
        <g opacity={on(f, without, 8) * (1 - on(f, cancel, 8))}><Label x={1430} y={930} text="A CHEAPER PLAN?" size={60} font="Bebas Neue" color={P.mintInk} /></g>
      </g>}

      {/* # C) the spark is pushed into the box; a wallet pays in; the tag climbs */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <SubBox x={900} y={560} s={1.1} title="MICROSOFT 365" seat={on(f, company, 8) * (1 - on(f, push + 16, 8))} />
        {(() => { const t = on(f, push, 16), x = lerp(1560, 1153, t), y = lerp(300, 340, t) - Math.sin(t * Math.PI) * 90
          return <g opacity={on(f, company, 8)}><Spark x={x} y={y} s={1.05} f={f} glow={1} />
            </g> })()}
        <g opacity={on(f, already, 8)}><Wallet x={300} y={780} s={1.6 * pop(f, already)} open={on(f, pay4, 10)} /></g>
        {f >= pay4 && [0, 1, 2, 3].map((k) => { const t0 = pay4 + k * 8 + Math.floor((f - pay4) / 32) * 32, fl = fly(f, t0, [300, 680], [640, 620], 22, 140)
          return fl.t < 1 && f < answer - 4 ? <Coin key={k} x={fl.x} y={fl.y} r={36} o={fl.o} /> : null })}
        <g opacity={on(f, charge, 8)}><Tag x={1560} y={680} s={1.3 * pop(f, charge) * (f >= more4 ? 1.1 : 1)} text={f >= more4 ? '$99.99' : '$69.99'} color={f >= more4 ? P.gold : '#F3E3B5'} sticker="+$30" stickerO={on(f, more4, 10)} /></g>
      </g>}

      {/* # D) the answer: the spark talks; a coin drops out of the answer; a second box slides in */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g transform={`translate(${lerp(0, -300, on(f, more5, 20))} 0)`}>
          <SubBox x={900} y={600} s={0.95} title="MICROSOFT 365" />
          <Spark x={1118} y={410} s={0.9} f={f} glow={1} />
          <g opacity={on(f, answer, 8)}><Bubble x={1390} y={290} s={1.0 * pop(f, answer)} lines={Math.min(3, 3 * on(f, answer, 24))} /></g>
          {/* # one simple fact: every answer drops a coin */}
          {f >= fact && (() => { const fl = fly(f, fact, [1250, 330], [1250, 860], 20, -30); return <Coin x={fl.x} y={Math.min(fl.y, 860)} r={52} o={on(f, fact, 4)} t="$" /> })()}
                  </g>
        {/* # more than one app: Google's Workspace box slides in with its own spark */}
        <g opacity={on(f, more5, 10)} transform={`translate(${lerp(500, 0, on(f, more5, 20))} 0)`}>
          <SubBox x={1360} y={600} s={0.95} title="WORKSPACE" color={P.teal2} tiles={on(f, app5, 14)} letters="DSMC" tileColors={['#4A86E8', '#2FA86B', '#D9534F', '#F0B429']} />
          <Spark x={1578} y={410} s={0.9} f={f + 20} glow={1} o={on(f, app5, 10)} />
        </g>
      </g>}
      <Vignette id="ab-hook" />
    </g>
  )
}

const BEATS = ["s1", "s1:microsoft", "s1:price", "s1:word", "s1:excel", "s1:subscription", "s1:one", "s1:person", "s1:43", "s2:reason", "s2:ai", "s2:copilot", "s2:added", "s2:wanted", "s3:australia", "s3:regulator", "s3:says", "s3:27", "s3:million", "s3:customers", "s3:not", "s3:told", "s3:cheaper", "s3:without", "s3:unless", "s3:cancel", "s4:why", "s4:company", "s4:push", "s4:already", "s4:pay", "s4:charge", "s4:more", "s5:answer", "s5:simple", "s5:fact", "s5:explains", "s5:more", "s5:app"]
export const AB_HOOK = makePiece('ab-hook', 'AI bundle long hook: Microsoft 365 box, $69.99 tag flips to $99.99 (+43%), Copilot spark lands in the box; Australia map, regulator, 2.7 million crowd; renewal email PAY MORE / CANCEL with the hidden CLASSIC door; spark pushed in, wallet pays, tag +$30; the answer bubble drops a coin; Google Workspace box joins', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:43', 'pop', 0.25], ['s2:added', 'chime', 0.2], ['s3:million', 'softpop', 0.2], ['s3:cancel', 'click', 0.25], ['s4:more', 'cash', 0.2], ['s5:fact', 'coin', 0.25]] })
