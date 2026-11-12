// ---------------------------------------------------------------- s1–s7: the egg price nobody set.
// A) A supermarket shelf: a dozen eggs, a price tag pops up to $6.23 and gets a RECORD rosette. The carton slides aside:
//    a ballot box (crossed out: nobody voted), then a government building (crossed out: no government set it). A calendar
//    turns to 2026 and the tag drops to a green $2.35.
// B) A shopper with a cart scratches his head as tags jump up and fall down; four idea medallions roll in; each thing
//    named lights its idea (eggs, rent, inflation, mortgage rates); the presenter walks in and counts on his fingers.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { StoreWall, Ballot, Carton, CentralBank, Egg, GREEN, GREEN_D, NoCross, RED, Tag, TXT, Arrow, Rope } from './kit'
import { Basket } from '../money4/kit'

const GROUND = 930

// one idea medallion: a round plate with a small picture inside
const Idea: React.FC<{ x: number; y: number; n: number; k: number; o: number; lit: number }> = ({ x, y, n, k, o, lit }) => (
  <g transform={`translate(${x} ${y}) scale(${1.12 + 0.1 * lit})`} opacity={o}>
    {lit > 0 && <circle r={150} fill={P.gold} opacity={0.3 * lit} />}
    <circle r={122} fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={8} />
    {k === 0 && <g>{/* hourglass = limited */}<path d="M-50 -70 L50 -70 L8 0 L50 70 L-50 70 L-8 0 Z" fill="#F4C95D" stroke="#B88A2E" strokeWidth={6} /><path d="M-30 52 L30 52 L0 22 Z" fill="#B88A2E" /></g>}
    {k === 1 && <g>{/* tug rope = buyers vs sellers */}<Rope x1={-90} x2={90} y={-6} knot={0} /><circle cx={-96} cy={-30} r={18} fill="#4F78AA" /><circle cx={96} cy={-30} r={18} fill="#E5634F" /></g>}
    {k === 2 && <g transform="translate(0 40) scale(0.48)"><Basket x={0} y={0} shown={6} /></g>}
    {k === 3 && <g><circle r={62} fill="#E9C25A" stroke="#B88A2E" strokeWidth={6} /><text y={22} textAnchor="middle" fill={P.ink} style={TXT(70)}>%</text></g>}
    <text y={190} textAnchor="middle" fill={P.ink} style={TXT(44)}>{['LIMITS', 'PRICES', 'INFLATION', 'INTEREST'][k]}</text>
    <circle cx={86} cy={-86} r={30} fill={P.ink} /><text x={86} y={-72} textAnchor="middle" fill="#FFFFFF" style={TXT(42)}>{n}</text>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const march1 = c('s1:march'), dozen1 = c('s1:dozen'), america1 = c('s1:america')
  const cents = c('s1:cents'), average = c('s1:average')
  const d6 = c('s1:6'), highest = c('s1:highest'), recorded = c('s1:recorded')
  const nobody = c('s2:nobody'), voted = c('s2:voted'), government = c('s2:government'), set2 = c('s2:set')
  const later = c('s3:later'), d235 = c('s3:35')
  const who = c('s4:who'), jump = c('s4:jump'), fall = c('s4:fall')
  const handful = c('s5:handful'), simple = c('s5:simple'), ideas = c('s5:ideas'), basics = c('s5:basics')
  const see6 = c('s6:see'), economics5 = c('s5:economics')
  const eggs6 = c('s6:eggs'), rent = c('s6:rent'), inflation = c('s6:inflation'), mortgage = c('s6:mortgage')
  const build = c('s7:build'), step = c('s7:step'), count = c('s7:count'), fingers = c('s7:fingers')

  const AB = who - 8
  const A = win(f, 0, AB), B = on(f, AB, 10)
  const aside = on(f, nobody, 18) * (1 - on(f, later, 18))            // the carton steps aside for the ballot / government, then back
  const cheap = on(f, d235, 14)
  const tilesIn = [handful, simple, ideas, basics]
  const shift = on(f, build, 18) * 250
  const hero: Beat[] = [[build, 'walkA', 'smiling', 'walkB', 10], [step, 'present', 'smiling'], [c('s7:time'), 'explain', 'smiling'], [count, 'countOne', 'smiling'], [fingers, 'countA', 'smiling', 'countB', 14]]
  return (
    <g>
      <Stage id="ec-hook" frame={f} />
      <Headline f={f} lines={[[0, 'MARCH 2025 · US AVERAGE', P.ink, 64], [later, 'ONE YEAR LATER · US AVERAGE', P.ink, 64], [handful, 'THE BASICS OF ECONOMICS', P.ink, 100]]} />
      <StoreWall x={80} y={GROUND - 250} w={1760} o={0.42 * on(f, america1 - 20, 16) * (1 - on(f, handful - 10, 12))} />
      <Ground y={GROUND} />

      {/* # A) the shelf, the record price, who did NOT set it */}
      {A > 0 && <g opacity={A}>
        <g transform={`translate(${300 * aside} 0)`}>
          {/* shelf */}
          <g opacity={on(f, march1, 10)}><rect x={560} y={820} width={800} height={34} rx={8} fill="#C9B18A" /><rect x={580} y={854} width={24} height={76} fill="#A88F66" /><rect x={1316} y={854} width={24} height={76} fill="#A88F66" /></g>
          <g opacity={on(f, dozen1, 8)} transform={`translate(0 ${-30 * (1 - pop(f, dozen1, 14))})`}><Carton x={960} y={820} s={1.6} n={Math.min(12, Math.max(0, Math.round((f - dozen1) / 2)))} /></g>
          <g opacity={on(f, d6, 8)} transform={`translate(960 ${520 - 20 * (1 - pop(f, d6, 14))}) scale(${(1 + 0.18 * on(f, highest, 14) * (1 - cheap)) * (1 + 0.07 * win(f, cents, average, 5) + 0.07 * win(f, average, highest, 5))})`}>
            <line x1={0} y1={-150} x2={0} y2={-50} stroke="#8E7A5A" strokeWidth={4} />
            <Tag x={0} y={0} t={cheap > 0.5 ? '$2.35' : '$6.23'} s={1.3} col={cheap > 0.5 ? GREEN : '#F4C95D'} ink={cheap > 0.5 ? '#FFFFFF' : P.ink} />
          </g>
          {/* the RECORD rosette, attached to the tag */}
          <g opacity={on(f, recorded, 8) * (1 - cheap)} transform={`translate(1230 470) scale(${pop(f, recorded, 14)})`}>
            {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={Math.cos(k / 12 * 6.283) * 60} cy={Math.sin(k / 12 * 6.283) * 60} r={26} fill={RED} />)}
            <circle r={62} fill={RED} stroke="#FFFFFF" strokeWidth={5} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>RECORD</text>
          </g>
        </g>
        {/* nobody voted… */}
        <g opacity={win(f, voted - 4, government, 8)}><Ballot x={640} y={GROUND} s={1.4} /><NoCross x={640} y={GROUND - 170} s={1.6} o={on(f, voted + 8, 8)} /></g>
        {/* …and no government set it */}
        <g opacity={win(f, government - 4, later, 8)}><CentralBank x={620} y={GROUND} s={0.85} name="GOVERNMENT" /><NoCross x={620} y={GROUND - 150} s={1.5} o={on(f, set2, 8)} /></g>
        {/* one year later */}
        <g opacity={on(f, later - 6, 10)} transform="translate(420 520)"><Calendar x={0} y={0} text={cheap > 0.5 ? '2026' : '2025'} s={1.3} flip={on(f, later, 16)} /></g>
      </g>}

      {/* # B) who sets prices? four ideas */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, handful - 10, 12)}>
          <Person f={f} who="buyer" beats={[[AB, 'idle', 'thinking'], [who, 'scratchHead', 'thinking'], [fall, 'shrug', 'worried']]} x={520} y={GROUND} s={1.05} />
          <g transform={`translate(0 0)`}>
            <rect x={880} y={780} width={900} height={34} rx={8} fill="#C9B18A" /><rect x={900} y={814} width={24} height={116} fill="#A88F66" /><rect x={1736} y={814} width={24} height={116} fill="#A88F66" />
            <g transform="translate(1080 780)"><Carton x={0} y={0} s={1.05} /></g>
            <g transform="translate(1560 780) scale(0.95)"><Basket x={0} y={0} shown={8} /></g>
            <g opacity={on(f, jump, 8)}><line x1={1080} y1={330} x2={1080} y2={460 - 70 * on(f, jump, 14)} stroke="#8E7A5A" strokeWidth={4} /><Tag x={1080} y={510 - 70 * on(f, jump, 14)} t="UP" s={1.05} col={RED} ink="#FFFFFF" /><Arrow x={1290} y={470} dir="up" o={on(f, jump, 6)} /></g>
            <g opacity={on(f, fall, 8)}><line x1={1560} y1={330} x2={1560} y2={310 + 50 * on(f, fall, 14)} stroke="#8E7A5A" strokeWidth={4} /><Tag x={1560} y={360 + 50 * on(f, fall, 14)} t="DOWN" s={1.05} col={GREEN} ink="#FFFFFF" /><Arrow x={1770} y={420} dir="down" col={GREEN} o={on(f, fall, 8)} /></g>
          </g>
        </g>
        <g transform={`translate(${shift} 0)`}>
          {[0, 1, 2, 3].map((k) => {
            const at = tilesIn[k]
            // the thing named in s6 lights its idea: eggs + rent → idea 2 (prices), inflation → 3, mortgage rates → 4
            const l = k === 1 ? Math.max(win(f, eggs6, inflation, 6), 0) : k === 2 ? win(f, inflation, mortgage, 6) : k === 3 ? win(f, mortgage, build, 6) : 0
            return <g key={k} transform={`translate(0 ${30 * (1 - pop(f, at, 14))})`}><Idea x={480 + k * 320} y={540} n={k + 1} k={k} o={on(f, at, 8)} lit={Math.max(l, win(f, see6, eggs6, 6), win(f, economics5 + k * 4, economics5 + k * 4 + 10, 3))} /></g>
          })}
          {/* the things that each idea explains, popping in under their idea */}
          <g opacity={on(f, eggs6, 8)} transform={`translate(${800 - 40} 840) scale(${pop(f, eggs6, 12)})`}><Egg x={0} y={0} s={1.1} /></g>
          <g opacity={on(f, rent, 8)} transform={`translate(${800 + 50} 880) scale(${0.36 * pop(f, rent, 12)})`}><House x={0} y={0} /></g>
          <g opacity={on(f, inflation, 8)} transform={`translate(1120 850)`}><Arrow x={0} y={0} dir="up" s={0.9 * pop(f, inflation, 12)} /></g>
          <g opacity={on(f, mortgage, 8)} transform={`translate(1440 880) scale(${0.36 * pop(f, mortgage, 12)})`}><House x={0} y={0} color="#7FA8D8" /></g>
        </g>
        <g opacity={on(f, build, 10)}><Person f={f} who="hero" beats={hero} x={lerp(140, 330, on(f, build, 24))} y={GROUND} s={1} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s3:dozen")} x={960} y={700} rx={230} ry={170} />
        <Spot f={f} at={c("s4:prices")} x={1080} y={640} rx={220} ry={170} />
        <Spot f={f} at={c("s5:together")} x={1110} y={560} rx={230} ry={170} />
        <Spot f={f} at={c("s6:sense")} x={1110} y={560} rx={230} ry={170} />
        <Spot f={f} at={c("s7:examples")} x={1110} y={560} rx={230} ry={170} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-hook" />
    </g>
  )
}

export const EC_HOOK = makePiece('ec-hook', 'Hook: a dozen eggs on a supermarket shelf, a price tag pops to a record $6.23 with a RECORD rosette; a ballot box and a government building appear and are crossed out (nobody voted, no government set it); a calendar turns to March 2026 and the tag drops to a green $2.35; a shopper scratches his head as tags jump and fall; four idea medallions roll in and light as eggs, rent, inflation and mortgage rates are named; the presenter walks in and counts on his fingers.', {
  mood: 'light', Component: Hook,
  beats: ["s1:march", "s1:dozen", "s1:america", "s1:cents", "s1:average", "s1:6", "s1:highest", "s1:recorded", "s2:nobody", "s2:voted", "s2:government", "s2:set", "s3:later", "s3:35", "s4:who", "s4:jump", "s4:fall", "s5:handful", "s5:simple", "s5:ideas", "s5:basics", "s6:see", "s5:economics", "s6:eggs", "s6:rent", "s6:inflation", "s6:mortgage", "s7:build", "s7:step", "s7:count", "s7:fingers", "s7:time", "s3:dozen", "s4:prices", "s5:together", "s6:sense", "s7:examples"],
  sfx: [['s1:6', 'pop', 0.15], ['s1:recorded', 'ding', 0.15], ['s3:35', 'swish', 0.15], ['s5:handful', 'pop', 0.12]] })
