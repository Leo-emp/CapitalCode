// ============================================================
// PROPS — METAPHORS (20), owner 2026-10-25: objects that SHOW an
// idea (time, compounding, risk, safety, growth, luck…). Same
// house style; several move a little on their own.
// ============================================================
import React from 'react'
import { Grad, INK, makeProp } from './frame'

const O = INK.outline
const S = { stroke: O, strokeWidth: 4 } as const
const GOLD = ['#FFE3A0', '#E2B85C', '#B88A2E']

export const IDEA_PROPS = [
  makeProp('hourglass', 'Hourglass', ['time', 'patience', 'waiting', 'deadline', 'long-term'], ({ frame }) => {
    const k = (frame % 180) / 180
    return (
      <g>
        <rect x={50} y={26} width={100} height={14} rx={4} fill="#A0704A" {...S} /><rect x={50} y={160} width={100} height={14} rx={4} fill="#A0704A" {...S} />
        <path d="M62 40 L138 40 Q138 80 106 100 Q138 120 138 160 L62 160 Q62 120 94 100 Q62 80 62 40 Z" fill="#CFE8FF" {...S} opacity={0.9} />
        <path d={`M${70 + 26 * k} ${50 + 40 * k} L${130 - 26 * k} ${50 + 40 * k} L100 98 Z`} fill="#E9B949" />
        <rect x={98} y={98} width={4} height={60} fill="#E9B949" opacity={k < 0.98 ? 1 : 0} />
        <path d={`M70 156 L130 156 L${120 - 20 * (1 - k)} ${156 - 40 * k} L${80 + 20 * (1 - k)} ${156 - 40 * k} Z`} fill="#E9B949" />
      </g>
    )
  }),
  makeProp('snowball', 'Snowball rolling', ['compounding', 'growth', 'momentum', 'debt', 'long-term'], ({ frame }) => (
    <g>
      {/* # a snowy slope it rolls down, with a track behind it */}
      <path d="M0 120 L200 186 L200 196 L0 196 Z" fill="#C5D4E6" {...S} />
      <path d="M10 124 L60 140 L60 146 L10 130 Z" fill="#E8EEF5" />
      <g transform={`rotate(${frame * 3} 110 112)`}>
        <circle cx={110} cy={112} r={54} fill="#E8EEF5" {...S} />
        <circle cx={74} cy={98} r={10} fill="#C5D4E6" /><circle cx={116} cy={130} r={14} fill="#C5D4E6" /><circle cx={104} cy={90} r={6} fill="#C5D4E6" /><circle cx={124} cy={92} r={10} fill="#E2B85C" {...S} strokeWidth={2} />
      </g>
      <circle cx={30} cy={112} r={8} fill="#E8EEF5" {...S} strokeWidth={3} />
    </g>)),
  makeProp('ladder', 'Ladder', ['career', 'climb', 'progress', 'goals', 'steps'], () => (
    <g>
      <rect x={56} y={20} width={14} height={164} rx={4} fill="#A0704A" {...S} /><rect x={130} y={20} width={14} height={164} rx={4} fill="#A0704A" {...S} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={66} y={40 + i * 32} width={68} height={12} rx={3} fill={i === 0 ? '#E9B949' : '#C8962E'} {...S} strokeWidth={3} />)}
    </g>)),
  makeProp('dominoes', 'Falling dominoes', ['chain-reaction', 'risk', 'crash', 'contagion', 'domino'], ({ frame }) => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const fall = Math.max(0, Math.min(1, (frame / 10) - i * 0.6))
        return <g key={i} transform={`rotate(${fall * 62} ${46 + i * 30} 170)`}>
          <rect x={30 + i * 30} y={70} width={22} height={100} rx={4} fill={i === 0 ? '#F0454B' : '#F2E6CC'} {...S} />
          <circle cx={41 + i * 30} cy={96} r={4} fill={O} /><circle cx={41 + i * 30} cy={140} r={4} fill={O} />
        </g>
      })}
      <rect x={14} y={170} width={176} height={8} fill="#4E5E7C" />
    </g>)),
  makeProp('rocket', 'Rocket', ['growth', 'launch', 'startup', 'surge', 'boom'], ({ frame }) => (
    <g transform={`translate(0 ${Math.sin(frame / 6) * 3}) rotate(30 100 100)`}>
      <path d={`M88 150 Q100 ${186 + Math.sin(frame) * 8} 112 150 Z`} fill="#E9B949" /><path d="M92 150 Q100 170 108 150 Z" fill="#F0454B" />
      <path d="M100 20 Q134 50 132 120 L68 120 Q66 50 100 20 Z" fill="#E8EEF5" {...S} />
      <circle cx={100} cy={72} r={14} fill="#5BCBFF" {...S} />
      <path d="M68 100 L44 140 L72 128 Z M132 100 L156 140 L128 128 Z" fill="#F06B5B" {...S} />
      <rect x={70} y={118} width={60} height={30} rx={6} fill="#9AA8BC" {...S} />
    </g>)),
  makeProp('magnet', 'Magnet', ['attract', 'pull', 'flows', 'money-flows', 'concentration'], ({ frame }) => (
    <g>
      <path d="M50 40 L80 40 L80 110 Q80 140 100 140 Q120 140 120 110 L120 40 L150 40 L150 112 Q150 170 100 170 Q50 170 50 112 Z" fill="#F0454B" {...S} />
      <rect x={50} y={34} width={30} height={28} fill="#E8EEF5" {...S} /><rect x={120} y={34} width={30} height={28} fill="#E8EEF5" {...S} />
      {[0, 1, 2].map((i) => <path key={i} d={`M${60 + i * 40} ${22 - ((frame + i * 10) % 30) / 2} l8 -14 l8 14 Z`} fill="#5BCBFF" opacity={0.85} />)}
      <rect x={56} y={110} width={10} height={40} rx={5} fill="#FF8A8A" opacity={0.6} />
    </g>)),
  makeProp('leaky-bucket', 'Leaky bucket', ['leak', 'fees', 'losses', 'spending', 'waste'], ({ frame }) => (
    <g>
      <path d="M40 50 L160 50 L146 160 L54 160 Z" fill="#9AA8BC" {...S} />
      <path d="M46 70 L154 70 L148 118 L52 118 Z" fill="#5BCBFF" opacity={0.8} />
      <ellipse cx={100} cy={50} rx={60} ry={12} fill="#6A82A6" {...S} />
      {[[70, 130], [118, 146], [96, 104]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={4} fill={O} />
        <ellipse cx={x + 6} cy={y + 10 + ((frame * 2 + i * 12) % 30)} rx={4} ry={7} fill="#5BCBFF" /></g>)}
    </g>)),
  makeProp('seedling', 'Seedling in soil', ['growth', 'start', 'saving', 'patience', 'invest-early'], ({ frame }) => (
    <g>
      <path d="M100 140 Q98 110 100 80" stroke="#3BAA6E" strokeWidth={8} fill="none" />
      <g transform={`rotate(${Math.sin(frame / 20) * 4} 100 90)`}>
        <path d="M100 92 Q70 60 50 76 Q70 104 100 92 Z" fill="#5BBF85" {...S} strokeWidth={3} />
        <path d="M100 82 Q130 46 154 64 Q132 94 100 82 Z" fill="#3BAA6E" {...S} strokeWidth={3} />
      </g>
      <path d="M40 140 Q100 120 160 140 L150 172 L50 172 Z" fill="#6B4A33" {...S} />
      <circle cx={80} cy={154} r={10} fill="#E2B85C" {...S} strokeWidth={3} />
    </g>)),
  makeProp('money-tree', 'Money tree', ['wealth', 'growth', 'compounding', 'passive-income', 'dividends'], ({ u, frame }) => (
    <g><defs><Grad id={u('g')} stops={GOLD} x2={1} /></defs>
      <path d="M92 180 L96 110 L104 110 L108 180 Z" fill="#6B4A33" {...S} />
      <circle cx={70} cy={84} r={40} fill="#3BAA6E" {...S} /><circle cx={130} cy={84} r={40} fill="#3BAA6E" {...S} /><circle cx={100} cy={56} r={44} fill="#5BBF85" {...S} />
      {[[68, 70], [126, 96], [98, 42], [82, 106], [140, 64]].map(([x, y], i) => <circle key={i} cx={x} cy={y + Math.sin(frame / 15 + i) * 2} r={11} fill={`url(#${u('g')})`} {...S} strokeWidth={3} />)}
    </g>)),
  makeProp('umbrella', 'Umbrella', ['protection', 'safety', 'insurance', 'rainy-day', 'emergency-fund'], ({ frame }) => (
    <g>
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={20 + i * 22} y={((frame * 4 + i * 23) % 60) - 10} width={4} height={16} fill="#5BCBFF" opacity={0.7} />)}
      <path d="M24 100 Q100 10 176 100 Q157 88 138 100 Q119 88 100 100 Q81 88 62 100 Q43 88 24 100 Z" fill="#2AA8F2" {...S} />
      <path d="M100 30 Q130 60 138 100 Q119 88 100 100 Z" fill="#1A62B0" opacity={0.6} />
      <path d="M100 100 L100 164 Q100 180 116 176" stroke={O} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>)),
  makeProp('key', 'Key', ['access', 'solution', 'unlock', 'answer', 'secret'], ({ u }) => (
    <g transform="rotate(-30 100 100)"><defs><Grad id={u('k')} stops={GOLD} /></defs>
      <circle cx={60} cy={100} r={36} fill={`url(#${u('k')})`} {...S} /><circle cx={60} cy={100} r={14} fill="#2E3A55" {...S} strokeWidth={3} />
      <rect x={92} y={92} width={86} height={18} rx={4} fill={`url(#${u('k')})`} {...S} />
      <rect x={150} y={108} width={12} height={22} fill="#E2B85C" {...S} strokeWidth={3} /><rect x={168} y={108} width={10} height={16} fill="#E2B85C" {...S} strokeWidth={3} />
      <rect x={14} y={120} width={30} height={20} rx={4} fill="#F06B5B" {...S} strokeWidth={3} transform="rotate(20 29 130)" />
    </g>)),
  makeProp('padlock', 'Padlock', ['locked', 'security', 'locked-in', 'commitment', 'safety'], () => (
    <g>
      <path d="M56 92 L56 66 Q56 24 100 24 Q144 24 144 66 L144 92 L126 92 L126 66 Q126 42 100 42 Q74 42 74 66 L74 92 Z" fill="#9AA8BC" {...S} />
      <rect x={42} y={88} width={116} height={88} rx={14} fill="#E9B949" {...S} />
      <rect x={100} y={88} width={58} height={88} rx={14} fill="#C8962E" opacity={0.5} />
      <circle cx={100} cy={124} r={12} fill="#2E3A55" /><rect x={95} y={128} width={10} height={24} rx={4} fill="#2E3A55" />
    </g>)),
  makeProp('bomb', 'Bomb with lit fuse', ['risk', 'danger', 'debt', 'time-bomb', 'crisis'], ({ frame }) => (
    <g>
      <path d="M126 58 Q150 30 160 44" stroke="#A0704A" strokeWidth={6} fill="none" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M160 44 L${160 + Math.cos(i * 1.6 + frame) * 16} ${44 + Math.sin(i * 1.6 + frame) * 16}`} stroke="#E9B949" strokeWidth={4} />)}
      <circle cx={162} cy={42} r={6} fill="#F0454B" />
      <circle cx={92} cy={114} r={60} fill="#2E3A55" {...S} /><ellipse cx={72} cy={92} rx={14} ry={20} fill="#6A82A6" opacity={0.6} />
      <rect x={110} y={50} width={30} height={26} rx={4} fill="#4E5E7C" {...S} transform="rotate(35 125 63)" />
    </g>)),
  makeProp('parachute', 'Parachute', ['safety', 'soft-landing', 'protection', 'retirement', 'fallback'], ({ frame }) => (
    <g transform={`translate(${Math.sin(frame / 25) * 6} 0)`}>
      <path d="M20 80 Q100 -10 180 80 Q160 70 140 80 Q120 70 100 80 Q80 70 60 80 Q40 70 20 80 Z" fill="#F06B5B" {...S} />
      <path d="M60 80 Q80 30 100 26 Q120 30 140 80 Q120 70 100 80 Q80 70 60 80 Z" fill="#F2E6CC" />
      {[20, 60, 140, 180].map((x) => <path key={x} d={`M${x} 80 L100 150`} stroke={O} strokeWidth={2} />)}
      <rect x={82} y={146} width={36} height={36} rx={6} fill="#A0704A" {...S} /><path d="M92 156 h16 v16 h-16 Z" fill="#E2B85C" />
    </g>)),
  makeProp('anchor', 'Anchor', ['stability', 'safe', 'bonds', 'steady', 'holding'], () => (
    <g>
      <circle cx={100} cy={40} r={20} fill="#9AA8BC" {...S} /><circle cx={100} cy={40} r={9} fill="#2E3A55" />
      <rect x={92} y={54} width={16} height={110} rx={6} fill="#9AA8BC" {...S} />
      <rect x={66} y={70} width={68} height={14} rx={6} fill="#9AA8BC" {...S} />
      {[0, 1, 2].map((i) => <rect key={i} x={88} y={96 + i * 12} width={24} height={8} rx={4} fill="#C8962E" />)}<rect x={95} y={58} width={4} height={100} fill="#E8EEF5" opacity={0.6} />
      <path d="M36 120 Q40 176 100 176 Q160 176 164 120 L144 130 Q140 160 100 160 Q60 160 56 130 Z" fill="#9AA8BC" {...S} />
    </g>)),
  makeProp('scale-balance', 'Balance scale', ['balance', 'fair', 'compare', 'tradeoff', 'justice'], ({ frame }) => {
    const tilt = Math.sin(frame / 30) * 6
    return (
      <g>
        <rect x={96} y={40} width={8} height={130} fill="#C8962E" {...S} strokeWidth={3} /><rect x={66} y={168} width={68} height={14} rx={4} fill="#A0704A" {...S} />
        <g transform={`rotate(${tilt} 100 46)`}>
          <rect x={30} y={42} width={140} height={8} rx={4} fill="#E2B85C" {...S} strokeWidth={3} />
          {[40, 160].map((x) => <g key={x}><path d={`M${x} 50 L${x - 22} 100 M${x} 50 L${x + 22} 100`} stroke={O} strokeWidth={2} /><path d={`M${x - 30} 100 L${x + 30} 100 Q${x} 124 ${x - 30} 100 Z`} fill="#E9B949" {...S} strokeWidth={3} /></g>)}
        </g>
        <circle cx={100} cy={40} r={10} fill="#E2B85C" {...S} strokeWidth={3} />
      </g>
    )
  }),
  makeProp('thermometer', 'Thermometer', ['heat', 'overheating', 'inflation', 'temperature', 'pressure'], ({ frame }) => {
    const lvl = 0.55 + 0.25 * Math.sin(frame / 25)
    return (
      <g>
        <rect x={84} y={20} width={32} height={130} rx={16} fill="#F2E6CC" {...S} />
        <rect x={92} y={30 + 110 * (1 - lvl)} width={16} height={110 * lvl + 10} rx={8} fill="#F0454B" />
        <circle cx={100} cy={160} r={26} fill="#F0454B" {...S} />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={120} y={40 + i * 22} width={16} height={4} fill={O} />)}
      </g>
    )
  }),
  makeProp('treasure-chest', 'Treasure chest', ['wealth', 'savings', 'reward', 'jackpot', 'treasure'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={GOLD} /></defs>
      <path d="M32 90 Q32 44 100 44 Q168 44 168 90 Z" fill="#A0704A" {...S} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={64 + i * 24} cy={86 - (i % 2) * 8} r={12} fill={`url(#${u('g')})`} {...S} strokeWidth={3} />)}
      <rect x={32} y={88} width={136} height={84} rx={6} fill="#A0704A" {...S} />
      <rect x={32} y={88} width={136} height={14} fill="#E2B85C" {...S} strokeWidth={3} /><rect x={92} y={102} width={16} height={70} fill="#E2B85C" {...S} strokeWidth={3} />
      <rect x={88} y={112} width={24} height={22} rx={4} fill="#2E3A55" />
    </g>)),
  makeProp('crown', 'Crown', ['winner', 'leader', 'top', 'dominance', 'king'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={GOLD} /></defs>
      <path d="M32 150 L24 70 L66 104 L100 50 L134 104 L176 70 L168 150 Z" fill={`url(#${u('g')})`} {...S} />
      <rect x={30} y={146} width={140} height={22} rx={4} fill="#C8962E" {...S} />
      {[[24, 70], [100, 50], [176, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill="#F0454B" {...S} strokeWidth={3} />)}
      {[70, 100, 130].map((x, i) => <circle key={x} cx={x} cy={157} r={6} fill={['#5BCBFF', '#3DDC97', '#A07CFF'][i]} />)}
    </g>)),
  makeProp('dice', 'Dice', ['luck', 'gamble', 'chance', 'risk', 'speculation'], ({ frame }) => (
    <g>
      <g transform={`rotate(${-12 + Math.sin(frame / 18) * 4} 72 112)`}><rect x={30} y={70} width={84} height={84} rx={14} fill="#F2E6CC" {...S} />
        {[[52, 92], [92, 132], [72, 112]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} fill="#F0454B" />)}</g>
      <g transform={`rotate(${16 + Math.cos(frame / 18) * 4} 136 92)`}><rect x={100} y={56} width={72} height={72} rx={12} fill="#F06B5B" {...S} />
        {[[118, 74], [154, 74], [118, 110], [154, 110]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6} fill="#F2E6CC" />)}</g>
    </g>)),
]
