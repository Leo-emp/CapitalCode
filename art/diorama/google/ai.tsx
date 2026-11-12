// ---------------------------------------------------------------- s86–s99: the AI question (casino-style rebuild).
// Back in the room from the opening. You type "how often to replace running shoes" and an AI OVERVIEW box slides in
// at the top of the screen, pushing the links and the Sponsored rows down; the answer is just there, no click. Through
// the window: a city of tiny people lights up — 2 BILLION+ MONTHLY USERS (July 2025). A big question mark: will people
// still click ads? The pointer clicks a Sponsored row and a coin pops — Google only gets paid on a click. In the
// window, two arrows climb side by side (AI ANSWERS ↑, PAID CLICKS +6% ↑); then a humming data centre with
// "≈ $91B SPENT IN 2025". Finally you shrug under a question mark: nobody knows yet.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, win } from '../aimoney/common'
import { gestB } from '../buffett/hook'
import { Pointer, Rack, Row, SearchBar } from './kit'
import { Laptop, NightWindow, Room } from './hook'

const Ai: React.FC<PieceProps> = ({ f, c }) => {
  const changing = c('s86:changing'), ai87 = c('s87:ai'), top = c('s87:top'), written = c('s88:written'), links = c('s88:links')
  const replace = c('s89:replace'), click89 = c('s89:click'), overviews = c('s90:overviews'), july = c('s91:july'), n2 = c('s91:2'), monthly = c('s91:monthly')
  const question = c('s92:question'), answer93 = c('s93:answer'), ads93 = c('s93:ads'), paid94 = c('s94:paid'), click94 = c('s94:click')
  const search95 = c('s95:search'), less = c('s95:less'), growing = c('s96:growing'), n6 = c('s96:6'), both = c('s97:both'), clicks97 = c('s97:clicks')
  const expensive = c('s98:expensive'), n91 = c('s98:91'), data = c('s98:data'), nobody = c('s99:nobody'), clicks99 = c('s99:clicks')
  // # extra gesture words
  const G = [c('s95:that'), c('s87:more'), c('s88:ai'), c('s89:simply'), c('s91:boss'), c('s93:will'), c('s94:remember'), c('s95:its'), c('s95:ai'), c('s96:paid'), c('s97:ai'), c('s98:alphabet'), c('s98:things'), c('s99:ai'), c('s99:this')]
  const LX = 620, LY = 720, SX = LX, SY = LY - 150
  const aiH = easeInOut(span(f, ai87, ai87 + 16))
  // # what the window shows: the city of users → the arrows → the data centre
  const W1 = win(f, july - 4, paid94, 10), W2 = win(f, search95 - 4, expensive - 2, 10), W3 = on(f, expensive - 2, 10)
  const clickT = span(f, click94, click94 + 12)
  return (
    <g>
      <StageBg id="gg-ai" frame={f} />
      <Room />
      <NightWindow x={1160} y={280} w={640} h={600} f={f} id="gg-ai">
        {/* # 2 billion+ monthly users: a city of tiny people lighting up */}
        <g opacity={W1}>
          {Array.from({ length: 40 }, (_, k) => <g key={k} opacity={on(f, july + (k % 20), 4)}><circle cx={1200 + (k % 10) * 62} cy={420 + Math.floor(k / 10) * 80} r={14} fill={P.gold} /><rect x={1188 + (k % 10) * 62} y={438 + Math.floor(k / 10) * 80} width={24} height={30} rx={8} fill={P.gold} /></g>)}
          <text x={1480} y={790} textAnchor="middle" fill="#FFFFFF" opacity={on(f, n2, 6)} style={{ font: '400 64px "Bebas Neue"' }}>2 BILLION+ MONTHLY USERS</text>
          <text x={1480} y={850} textAnchor="middle" fill={P.gold} opacity={on(f, monthly, 6)} style={{ font: '400 44px "Bebas Neue"' }}>AI OVERVIEWS · JULY 2025</text>
        </g>
        {/* # two arrows climbing side by side */}
        <g opacity={W2}>
          {[[search95, 'SEARCHES', 'GOOGLE: MORE, NOT LESS', '#1A73E8', 1330], [n6, 'PAID CLICKS', '+6% IN 2025', P.mint, 1630]].map(([at, lab, sub, col, x], k) => { const h = 300 * easeInOut(span(f, at as number, (at as number) + 20)); return <g key={k} opacity={on(f, at as number, 6)}>
            <rect x={(x as number) - 50} y={800 - h} width={100} height={h} fill={col as string} /><path d={`M${(x as number) - 90} ${800 - h} L${x} ${700 - h} L${(x as number) + 90} ${800 - h} Z`} fill={col as string} />
            <text x={x as number} y={850} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{lab as string}</text>
            <text x={x as number} y={360} textAnchor="middle" fill={P.gold} opacity={on(f, (at as number) + 12, 6)} style={{ font: '400 44px "Bebas Neue"' }}>{sub as string}</text></g> })}
        </g>
        {/* # the data centre */}
        <g opacity={W3}>
          {[0, 1, 2, 3].map((k) => <Rack key={k} x={1250 + k * 150} y={820} s={0.9} f={f} />)}
          <g opacity={on(f, n91, 6)}><rect x={1250} y={330} width={460} height={90} rx={14} fill="#0D1424" opacity={0.9} /><text x={1480} y={392} textAnchor="middle" fill={P.gold} style={{ font: '400 58px "Bebas Neue"' }}>≈ $91B SPENT IN 2025</text></g>
        </g>
      </NightWindow>
      {/* # everything in front of the window a little smaller (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.85) translate(-960 -1000)">
      {/* # the laptop: search → AI Overview on top, links and ads pushed down */}
      <g transform={`translate(${LX} 1000) scale(1.35) translate(${-LX} -1000)`}><Laptop x={LX} y={LY} glow={on(f, changing, 6) * (1 - on(f, ai87, 10))}>
        <SearchBar x={SX} y={SY - 105} w={720} s={0.55} text={f > replace - 6 ? 'replace running shoes?' : 'running shoes'} />
        <g transform={`translate(${SX - 205} ${SY - 50})`}>
          <g opacity={aiH}><rect x={-10} y={-10} width={420 * 1} height={110 * aiH} rx={10} fill="#E8F0FE" />
            <text x={6} y={22} fill="#1A73E8" style={{ font: '700 20px Inter' }}>✦ AI Overview</text>
            {[0, 1, 2].map((k) => <rect key={k} x={6} y={36 + k * 20} width={(380 - k * 60) * on(f, written + k * 4, 8)} height={10} rx={5} fill="#9DB9F2" />)}
            {f > click89 && <text x={6} y={96} fill="#1B5E3A" style={{ font: '700 18px Inter' }}>✓ answered — no click needed</text>}
          </g>
          <g transform={`translate(0 ${lerp(0, 112, aiH)}) scale(0.4)`}>
            {[0].map((k) => <Row key={k} x={0} y={30} w={900} sponsored title="Running shoes – Shop A" hi={k === 0 ? on(f, click94, 4) * (1 - on(f, search95, 8)) : 0} o={1 - 0.5 * on(f, ads93, 8) * (1 - on(f, paid94, 8))} />)}
            <Row x={0} y={170} w={900} title="How to choose running shoes" />
          </g>
        </g>
      </Laptop></g>
      {/* # the pointer clicks a Sponsored row; a coin pops */}
      <g opacity={win(f, paid94 - 4, search95, 6)}><Pointer x={lerp(900, 560, easeInOut(span(f, paid94 - 4, click94)))} y={lerp(860, 560, easeInOut(span(f, paid94 - 4, click94)))} s={1} click={clickT} /></g>
      <g opacity={win(f, click94 + 4, search95, 6)} transform={`translate(560 ${lerp(500, 380, on(f, click94 + 4, 12))}) scale(${pop(f, click94 + 4)})`}><Coin x={0} y={0} s={1} /></g>
      {/* # the big question marks */}
      <g opacity={win(f, question - 2, paid94, 8)} transform={`translate(1000 300) scale(${pop(f, question)})`}><text textAnchor="middle" y={70} fill={P.coralInk} style={{ font: '400 200px "Bebas Neue"' }}>?</text></g>
      <g opacity={on(f, nobody - 2, 8)} transform={`translate(1000 300) scale(${pop(f, nobody)})`}><text textAnchor="middle" y={70} fill={P.goldInk} style={{ font: '400 200px "Bebas Neue"' }}>?</text></g>
      <Person f={f} who="buyer" beats={gestB([[0, 'type', 'neutral'], [ai87, 'shock', 'shocked'], [written, 'read', 'thinking'], [replace, 'type', 'neutral'], [click89, 'thumbsUp', 'smiling'], [july, 'lookFar', 'shocked'], [question, 'scratchHead', 'thinking'], [paid94, 'point', 'neutral'], [search95, 'lookFar', 'smiling'], [both, 'present', 'smiling'], [expensive, 'lookFar', 'worried'], [nobody, 'shrug', 'thinking']], G)} x={160} y={1000} s={1.15} />
      </g>
      <Headline f={f} lines={[[changing, 'SOMETHING IS CHANGING', P.ink, 104], [ai87, 'AN AI ANSWER AT THE TOP', P.goldInk, 104], [replace, 'EXAMPLE: ANSWERED WITHOUT A CLICK', P.ink, 96], [overviews, 'AI OVERVIEWS', P.goldInk, 120],
        [july, 'JULY 2025: OVER 2 BILLION MONTHLY USERS', P.ink, 92], [question, 'WILL PEOPLE STILL CLICK ADS?', P.coralInk, 100], [paid94, 'GOOGLE IS PAID PER CLICK', P.ink, 104], [search95, 'GOOGLE: PEOPLE SEARCH MORE, NOT LESS', P.ink, 92],
        [n6, '2025: PAID CLICKS STILL +6%', P.mintInk, 104], [expensive, 'AI IS EXPENSIVE: ~$91B SPENT IN 2025', P.ink, 92], [nobody, 'NOBODY KNOWS YET', P.ink, 110]]} />
      <Vignette id="gg-ai" />
    </g>
  )
}

const BEATS = ['s95:that', 's87:more', 's88:ai', 's89:simply', 's91:boss', 's93:will', 's94:remember', 's95:its', 's95:ai', 's96:paid', 's97:ai', 's98:alphabet', 's98:things', 's99:ai', 's99:this', 's86:changing', 's87:ai', 's87:top', 's88:written', 's88:links', 's89:replace', 's89:click', 's90:overviews', 's91:july', 's91:2', 's91:monthly', 's92:question', 's93:answer', 's93:ads', 's94:paid', 's94:click', 's95:search', 's95:less',
  's96:growing', 's96:6', 's97:both', 's97:clicks', 's98:expensive', 's98:91', 's98:data', 's99:nobody', 's99:clicks']
export const GG_AI = makePiece('gg-ai', 'Google long (casino-style): back in the room from the opening; you search replace running shoes? and an AI Overview slides in at the top of the laptop screen, pushing links and Sponsored rows down — answered, no click needed; through the window a city of tiny people lights up: 2 BILLION+ MONTHLY USERS, AI OVERVIEWS · JULY 2025; a big question mark; a pointer clicks a Sponsored row and a coin pops; two arrows climb in the window (SEARCHES: Google says more, not less; PAID CLICKS +6% in 2025); then a humming data centre ≈ $91B SPENT IN 2025; you shrug under a question mark', {
  mood: 'light', Component: Ai, beats: BEATS,
  sfx: [['s87:ai', 'swish', 0.3], ['s91:2', 'chime', 0.3], ['s94:click', 'click', 0.35], ['s96:6', 'ding', 0.3], ['s98:91', 'thud', 0.3]] })
