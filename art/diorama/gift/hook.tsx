// ---------------------------------------------------------------- s1–s10: the hook.
// A coffee counter fills with a row of dashed, not-yet-made cups (1.7 billion owed in drinks); a fan of gift cards
// lands above them and little reward stars sit on the cups. Then the cups clear: a slice of the cards greys out
// and slides into the till as SALES while a dashed cup gets a red cross (no coffee made). After the brand card:
// you hold a gift card that turns into a present, which becomes three presents; each one opens on its line
// (money first, a jacket and a coin, a card going quiet), and the presents give way to a drawer with a card in it.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Counter, Headline, Person, Tick, win } from '../aimoney/common'
import { Hand } from '../kit'
import { Calendar } from '../charts'
import { Cup, Drawers, GiftCard, Jacket, Present, Till, Note } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const sept = c('s1:september'), owed = c('s1:owed'), bn = c('s1:17'), drinks = c('s1:drinks'), made = c('s1:made')
  const loaded = c('s2:loaded'), cards = c('s2:cards'), rewards = c('s2:rewards'), used = c('s2:used')
  const year3 = c('s3:year'), counted = c('s3:counted'), m208 = c('s3:208'), sales = c('s3:sales'), nobody = c('s3:nobody'), spend = c('s3:spend')
  const coffee = c('s4:coffee'), cup4 = c('s4:cup'), handed = c('s4:handed')
  const gift6 = c('s6:gift'), present = c('s6:present'), company = c('s6:company'), three = c('s6:three')
  const money7 = c('s7:money'), anything = c('s7:anything')
  const people8 = c('s8:people'), more8 = c('s8:more'), worth = c('s8:worth')
  const never9 = c('s9:never'), spent9 = c('s9:spent')
  const quiet = c('s5:quiet'), business = c('s5:business'), cards5 = c('s5:cards')
  const video = c('s10:video'), exactly = c('s10:exactly'), work10 = c('s10:work')
  const three10 = c('s10:three'), drawer = c('s10:drawer'), matters = c('s10:matters')
  const A = win(f, 0, year3 + 6), B = win(f, year3 - 8, gift6 - 30), C = on(f, gift6 - 4, 10) * (1 - on(f, drawer - 4, 10)), D = on(f, drawer - 4, 10)
  const cupsShown = Math.round(9 * span(f, owed, owed + 40))
  // # your hand holds the card (lifts on present, reaches out on money)
  const hp = { x: 420 + 60 * on(f, money7, 10) - 60 * on(f, anything, 10), y: 700 - 40 * on(f, present, 10) }
  const cardToBox = on(f, present, 12)
  return (
    <g>
      <Stage id="gc-hook" frame={f} />
      <Headline f={f} lines={[[sept, 'SEPTEMBER 2024', P.ink, 96], [bn, '$1.7 BILLION OWED IN DRINKS', P.goldInk, 104], [loaded, 'CARD MONEY + UNUSED REWARDS', P.ink, 96], [m208, '$208 MILLION COUNTED AS SALES', P.goldInk, 100],
        [coffee, 'NO COFFEE MADE FOR IT', P.ink, 100], [present, 'A PRESENT', P.ink, 104], [three, 'THREE PRESENTS FOR THE COMPANY', P.goldInk, 100], [drawer, 'THE CARD IN YOUR DRAWER', P.ink, 100]]} until={drawer + 200} />
      {/* # A: a counter with a row of dashed cups = drinks owed, not made; a fan of cards and reward stars */}
      {A > 0 && <g opacity={A}>
        <Counter x={960} y={760} w={1760} />
        <g opacity={on(f, sept, 8) * (1 - on(f, owed + 20, 10))} transform={`translate(960 600) scale(${pop(f, sept)})`}><Calendar x={0} y={0} text="SEP 24" s={1.2} /></g>
        {Array.from({ length: 9 }, (_, k) => k < cupsShown && <g key={k} transform={`translate(${260 + k * 175} 760) scale(${pop(f, owed + k * 4)})`}><Cup x={0} y={0} s={0.95} ghost /></g>)}
        <g opacity={on(f, drinks, 8)}><Label2 x={960} y={880} t="DRINKS NOT MADE YET" f={f} at={drinks} /></g>
        {[0, 1, 2, 3, 4].map((k) => { const t = easeInOut(span(f, loaded + k * 3, loaded + k * 3 + 16)); return <g key={k} opacity={on(f, loaded + k * 3, 6)}><GiftCard x={lerp(-200, 760 + k * 100, t)} y={lerp(300, 420 - Math.abs(k - 2) * 14, t)} s={0.62} r={(k - 2) * 7} color={['#2FA36B', '#3A6EA8', '#C94A3E', '#E9A23B', '#2FA36B'][k]} /></g> })}
        {[1, 4, 7].map((k, i) => <g key={k} opacity={on(f, rewards + i * 4, 8) * (1 - 0.55 * on(f, used, 10))} transform={`translate(${260 + k * 175} 560) scale(${pop(f, rewards + i * 4)})`}><path d="M0 -34 L10 -10 L34 -10 L14 6 L22 32 L0 16 L-22 32 L-14 6 L-34 -10 L-10 -10 Z" fill={P.gold} /></g>)}
        <g opacity={on(f, made, 8)}><path d="M150 700 L1770 700" stroke={P.ink2} strokeWidth={4} strokeDasharray="6 14" opacity={0.6} /></g>
      </g>}
      {/* # B: a slice of the cards greys out and slides into the till as SALES; a dashed cup gets a red cross */}
      {B > 0 && <g opacity={B}>
        <Counter x={960} y={760} w={1760} />
        <Till x={1320} y={760} s={1.1} open={on(f, m208 + 10, 12) * (1 - on(f, quiet, 12))} bills={on(f, sales, 12)} />
        <g opacity={on(f, business, 8)}><ellipse cx={1320} cy={640} rx={220} ry={160} fill={P.gold} opacity={0.16 + 0.05 * Math.sin(f / 6)} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, cards5 + k * 3, 6)}><GiftCard x={1560 + k * 40} y={980 - k * 26} s={0.3} r={(k - 1) * 10} /></g>)}
        {[0, 1, 2, 3, 4].map((k) => {
          const slice = k >= 3, grey = slice ? on(f, nobody, 10) : 0, t = slice ? easeInOut(span(f, m208, m208 + 22)) : 0
          return <g key={k} opacity={1 - (slice ? on(f, m208 + 18, 8) : 0)}><GiftCard x={lerp(460 + k * 100, 1320, t)} y={lerp(560 - Math.abs(k - 2) * 14, 560, t)} s={lerp(0.62, 0.3, t)} r={(k - 2) * 7} color={['#2FA36B', '#3A6EA8', '#C94A3E', '#E9A23B', '#2FA36B'][k]} crack={grey} /></g>
        })}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, sales + k * 3, 6)} transform={`translate(${1250 + k * 70} ${640 - k * 6})`}><Coin x={0} y={0} s={0.8} /></g>)}
        <g opacity={on(f, counted, 8)}><Label2 x={1320} y={930} t="COUNTED AS SALES" f={f} at={counted} /></g>
        <g opacity={on(f, spend, 8)}><Label2 x={560} y={930} t="EXPECTED NEVER TO BE SPENT" f={f} at={spend} /></g>
        <g opacity={on(f, coffee, 8)}><Cup x={860} y={760} s={1} ghost /><Tick x={860} y={560} o={on(f, coffee, 8)} r={44} ok={false} /></g>
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [counted, 'point', 'smiling'], [cup4, 'emptyPockets', 'smug'], [handed, 'shrug', 'smug']] as Beat[]} x={1700} y={1000} s={0.85} o={on(f, counted - 6, 8)} />
        <Counter x={1700} y={820} w={380} o={on(f, counted - 6, 8)} />
      </g>}
      {/* # C: you hold a gift card that becomes a present, then three presents open one by one */}
      {C > 0 && <g opacity={C}>
        <Hand x={hp.x - 40} y={hp.y + 70} r={-20} s={0.8} open={on(f, money7, 8) * (1 - on(f, anything, 8))} />
        <g opacity={1 - cardToBox}><GiftCard x={hp.x + 40} y={hp.y - 30} s={0.42} r={-8} /></g>
        <g opacity={cardToBox * (1 - on(f, three, 8))} transform={`translate(${hp.x + 40} ${hp.y + 40}) scale(${0.5 * pop(f, present)})`}><Present x={0} y={0} /></g>
        {[0, 1, 2].map((k) => {
          const at = [money7, people8, never9][k], open = on(f, at, 12)
          return <g key={k} opacity={on(f, three + k * 5, 8)} transform={`translate(${820 + k * 380} 900) scale(${pop(f, three + k * 5) * (1 + 0.08 * Math.sin(Math.PI * span(f, [video, exactly, work10][k], [video, exactly, work10][k] + 10)))})`}>
            <Present x={0} y={0} s={1} open={open} color={['#C94A3E', '#3A6EA8', '#2FA36B'][k]} n={String(k + 1)} />
          </g>
        })}
        {/* # 1: money goes in before anything comes out */}
        {(() => { const t = easeInOut(span(f, money7 + 4, money7 + 24)); return <g opacity={on(f, money7, 6)}><Note x={lerp(hp.x + 60, 780, t)} y={lerp(hp.y, 440, t) - Math.sin(t * Math.PI) * 120} s={1} /></g> })()}
        <g opacity={on(f, anything, 8)}><Label2 x={780} y={360} t="MONEY FIRST" f={f} at={anything} /></g>
        {/* # 2: a jacket and an extra coin */}
        <g opacity={on(f, people8 + 6, 8)}><Jacket x={1130} y={380} s={0.45} /></g>
        <g opacity={on(f, more8, 8)}><Coin x={1300} y={420} s={1.1} /><Label2 x={1300} y={330} t="+ MORE" f={f} at={more8} /></g>
        {/* # 3: a card that is never used goes grey */}
        <g opacity={on(f, never9, 8)}><GiftCard x={1560} y={470} s={0.45} r={-6} crack={on(f, spent9, 12)} /></g>
        <g opacity={on(f, worth, 8) * (1 - on(f, never9, 8))}><Label2 x={1200} y={260} t="MORE THAN THE CARD" f={f} at={worth} /></g>
      </g>}
      {/* # D: the drawer with a card in it */}
      {D > 0 && <g opacity={D}>
        <Drawers x={960} y={980} s={1.25} open={on(f, drawer, 16)} dust={on(f, matters, 12)}><GiftCard x={0} y={0} s={0.5} r={-4} amount="$?" /></Drawers>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three10, 8)} transform={`translate(${260 + k * 0} ${420 + k * 170}) scale(0.42)`}><Present x={0} y={0} color={['#C94A3E', '#3A6EA8', '#2FA36B'][k]} n={String(k + 1)} /></g>)}
      </g>}
      <Vignette id="gc-hook" />
    </g>
  )
}
// # a small caption that settles in on its word
const Label2: React.FC<{ x: number; y: number; t: string; f: number; at: number }> = ({ x, y, t, f, at }) => (
  <g transform={`translate(${x} ${y}) scale(${0.96 + 0.04 * on(f, at, 8)})`}>
    <text x={0} y={0} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>
  </g>
)

const BEATS = ['s3:year', 's5:quiet', 's5:business', 's5:cards', 's10:video', 's10:exactly', 's10:work', 's1:september', 's1:owed', 's1:17', 's1:drinks', 's1:made', 's2:loaded', 's2:cards', 's2:rewards', 's2:used', 's3:counted', 's3:208', 's3:sales', 's3:nobody', 's3:spend', 's4:coffee', 's4:cup', 's4:handed',
  's6:gift', 's6:present', 's6:company', 's6:three', 's7:money', 's7:anything', 's8:people', 's8:more', 's8:worth', 's9:never', 's9:spent', 's10:three', 's10:drawer', 's10:matters']
export const GC_HOOK = makePiece('gc-hook', 'Gift cards long: a counter of dashed not-yet-made cups (1.7 billion owed in drinks), a fan of cards and reward stars; a slice of cards greys and slides into the till as sales, a dashed cup crossed; you hold a card that becomes a present, three presents open (money first, a jacket and coin, a card going grey); a drawer with a card', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:17', 'chime', 0.35], ['s2:loaded', 'swish', 0.3], ['s3:208', 'coin', 0.4], ['s4:coffee', 'crack', 0.3], ['s6:three', 'pop', 0.35], ['s7:money', 'swish', 0.3], ['s10:drawer', 'click', 0.3]] })
