// ============================================================
// PROPS — BUSINESS & WORLD family (20)
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import { Grad, INK, makeProp } from './frame'

const O = INK.outline
const BRICK = ['#D68A8F', '#B4626E', '#7A3A48']
const STEEL = ['#B8C4D2', '#7D8B9C', '#4A5666']

export const BUSINESS_PROPS = [
  makeProp('house', 'House', ['business', 'property', 'housing', 'wealth'], ({ u }) => (
    <g><defs><Grad id={u('w')} stops={['#F3C9B6', '#C98D88']} /></defs>
      <path d="M30 94 L100 36 L170 94 Z" fill="#E8806F" stroke={O} strokeWidth={4} />
      <rect x={44} y={92} width={112} height={78} fill={`url(#${u('w')})`} stroke={O} strokeWidth={4} />
      <rect x={60} y={110} width={30} height={26} fill="#FFD58A" stroke={O} strokeWidth={3} /><rect x={110} y={120} width={30} height={50} fill="#3A2A2E" stroke={O} strokeWidth={3} />
      <rect x={128} y={48} width={14} height={30} fill="#B4626E" stroke={O} strokeWidth={3} />
    </g>)),
  makeProp('car', 'Car', ['business', 'consumer', 'transport'], ({ u }) => (
    <g><defs><Grad id={u('b')} stops={['#5BCBFF', COLORS.blue, '#0D5A96']} /></defs>
      <path d="M24 126 L36 98 Q46 84 66 82 L124 80 Q146 80 158 96 L176 120 L176 140 L24 140 Z" fill={`url(#${u('b')})`} stroke={O} strokeWidth={4} />
      <path d="M62 88 L92 86 L92 106 L52 106 Z M100 86 L130 86 L146 106 L100 106 Z" fill="#BFE6FF" opacity={0.8} />
      {[58, 142].map((x) => <g key={x}><circle cx={x} cy={142} r={18} fill="#14181F" stroke={O} strokeWidth={4} /><circle cx={x} cy={142} r={7} fill="#7D8B9C" /></g>)}
      <rect x={164} y={112} width={10} height={8} rx={2} fill="#FFE38A" />
    </g>)),
  makeProp('shop-mini', 'Small shop', ['business', 'small-business', 'retail'], ({ u }) => (
    <g><defs><Grad id={u('w')} stops={BRICK} /></defs>
      <rect x={30} y={50} width={140} height={120} fill={`url(#${u('w')})`} stroke={O} strokeWidth={4} />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${30 + i * 20} 70 L${50 + i * 20} 70 L${50 + i * 20} 86 Q${40 + i * 20} 94 ${30 + i * 20} 86 Z`} fill={i % 2 ? '#F2E9DA' : '#D9434E'} stroke={O} strokeWidth={2} />)}
      <rect x={42} y={102} width={70} height={50} fill="#FFD58A" stroke={O} strokeWidth={3} /><rect x={122} y={102} width={36} height={68} fill="#1A2233" stroke={O} strokeWidth={3} />
      <rect x={30} y={44} width={140} height={14} fill="#3B1826" stroke={O} strokeWidth={3} />
    </g>)),
  makeProp('factory', 'Factory', ['business', 'industry', 'manufacturing'], ({ frame }) => (
    <g><path d="M24 170 L24 96 L64 118 L64 96 L104 118 L104 96 L144 118 L144 60 L170 60 L170 170 Z" fill="#5C6878" stroke={O} strokeWidth={4} />
      {[40, 80, 120].map((x) => <rect key={x} x={x} y={132} width={20} height={16} fill="#FFD58A" stroke={O} strokeWidth={2} />)}
      {[0, 1, 2].map((i) => { const t = ((frame / 40 + i / 3) % 1); return <circle key={i} cx={157 + t * 20} cy={52 - t * 46} r={10 + t * 14} fill="#9AA6B4" opacity={0.7 * (1 - t)} /> })}
    </g>)),
  makeProp('container', 'Shipping container', ['business', 'trade', 'logistics'], () => (
    <g><rect x={20} y={70} width={160} height={84} fill="#D9434E" stroke={O} strokeWidth={4} />
      {Array.from({ length: 11 }, (_, i) => <rect key={i} x={30 + i * 14} y={78} width={6} height={68} fill="#A9262B" />)}
      <rect x={20} y={62} width={160} height={10} fill="#A9262B" stroke={O} strokeWidth={3} /></g>)),
  makeProp('truck', 'Truck', ['business', 'logistics', 'transport'], () => (
    <g><rect x={20} y={64} width={110} height={78} fill="#F2E9DA" stroke={O} strokeWidth={4} />
      <path d="M130 86 L162 86 L180 112 L180 142 L130 142 Z" fill={COLORS.blue} stroke={O} strokeWidth={4} /><path d="M140 92 L160 92 L172 112 L140 112 Z" fill="#BFE6FF" />
      {[50, 150].map((x) => <circle key={x} cx={x} cy={146} r={16} fill="#14181F" stroke={O} strokeWidth={4} />)}
    </g>)),
  makeProp('crane', 'Construction crane', ['business', 'construction', 'property'], () => (
    <g><rect x={60} y={40} width={14} height={134} fill="#F7C531" stroke={O} strokeWidth={3} /><rect x={20} y={40} width={160} height={12} fill="#F7C531" stroke={O} strokeWidth={3} />
      <path d="M150 52 L150 100" stroke={O} strokeWidth={3} /><rect x={138} y={100} width={24} height={20} fill="#7D8B9C" stroke={O} strokeWidth={3} />
      <rect x={20} y={52} width={22} height={18} fill="#5C6878" stroke={O} strokeWidth={3} /><rect x={40} y={170} width={56} height={10} fill="#5C6878" /></g>)),
  makeProp('globe', 'Globe', ['business', 'world', 'economy', 'trade'], ({ u, frame }) => (
    <g><defs><Grad id={u('s')} stops={['#5BCBFF', '#1E6FA8', '#0D3A66']} x2={1} /><clipPath id={u('c')}><circle cx={100} cy={100} r={70} /></clipPath></defs>
      <circle cx={100} cy={100} r={70} fill={`url(#${u('s')})`} stroke={O} strokeWidth={4} />
      <g clipPath={`url(#${u('c')})`}><g transform={`translate(${-(frame * 0.6) % 140} 0)`}>{[0, 140].map((dx) => (
        <g key={dx} fill="#3DDC97" opacity={0.85}><path d={`M${50 + dx} 70 Q${70 + dx} 50 ${96 + dx} 66 L${90 + dx} 100 Q${70 + dx} 110 ${56 + dx} 96 Z`} /><path d={`M${110 + dx} 110 Q${136 + dx} 100 ${150 + dx} 124 L${130 + dx} 150 Q${112 + dx} 140 ${110 + dx} 110 Z`} /></g>))}</g></g>
      <ellipse cx={100} cy={100} rx={70} ry={24} fill="none" stroke="#BFE6FF" strokeWidth={2} opacity={0.5} />
    </g>)),
  makeProp('map-pin', 'Map pin', ['business', 'location', 'world'], () => (
    <g><path d="M100 176 Q46 110 46 80 A54 54 0 1 1 154 80 Q154 110 100 176 Z" fill={COLORS.red} stroke={O} strokeWidth={4} /><circle cx={100} cy={80} r={20} fill="#F7F3EA" /></g>)),
  makeProp('chart-board', 'Chart board', ['business', 'presentation', 'data'], () => (
    <g><rect x={30} y={30} width={140} height={104} rx={4} fill="#F7F3EA" stroke={O} strokeWidth={4} />
      <path d="M44 118 L72 96 L94 104 L120 70 L154 50" stroke={COLORS.green} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[52, 80, 108, 136].map((x, i) => <rect key={x} x={x} y={118 - [14, 26, 20, 40][i]} width={14} height={[14, 26, 20, 40][i]} fill={COLORS.blue} opacity={0.5} />)}
      <path d="M100 134 L76 176 M100 134 L124 176" stroke={O} strokeWidth={5} /></g>)),
  makeProp('laptop', 'Laptop', ['business', 'tech', 'work'], ({ frame }) => (
    <g><rect x={44} y={46} width={112} height={76} rx={6} fill="#26303F" stroke={O} strokeWidth={4} />
      <rect x={52} y={54} width={96} height={60} fill="#123A5E" />{[0, 1, 2].map((i) => <rect key={i} x={60} y={62 + i * 14} width={40 + ((frame / 4 + i * 13) % 40)} height={6} rx={3} fill="#4FB5E8" opacity={0.8} />)}
      <path d="M30 124 L170 124 L160 140 L40 140 Z" fill="#3E4A5C" stroke={O} strokeWidth={4} /></g>)),
  makeProp('phone', 'Smartphone', ['business', 'tech', 'consumer', 'app'], () => (
    <g><rect x={66} y={24} width={68} height={152} rx={14} fill="#1A2233" stroke={O} strokeWidth={4} />
      <rect x={72} y={36} width={56} height={124} rx={6} fill="#123A5E" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={78 + (i % 2) * 24} y={46 + Math.floor(i / 2) * 26} width={20} height={20} rx={5} fill={[COLORS.green, COLORS.blue, COLORS.champagne, COLORS.red][i]} />)}
      <rect x={90} y={164} width={20} height={4} rx={2} fill="#556275" /></g>)),
  makeProp('newspaper', 'Newspaper', ['business', 'news', 'media'], () => (
    <g><rect x={30} y={40} width={140} height={120} fill="#F2EDE2" stroke={O} strokeWidth={4} transform="rotate(-5 100 100)" />
      <g transform="rotate(-5 100 100)"><rect x={42} y={50} width={116} height={18} fill={O} /><rect x={42} y={76} width={54} height={40} fill="#B9AC96" />
        {[76, 88, 100, 112, 128, 140].map((y) => <rect key={y} x={y > 120 ? 42 : 104} y={y} width={y > 120 ? 116 : 54} height={6} rx={2} fill="#C4B9A6" />)}</g>
    </g>)),
  makeProp('handshake', 'Handshake', ['business', 'deal', 'partnership'], () => (
    <g>{/* # Two sleeves meeting, cuffs, clasped hands with fingers */}
      <path d="M8 120 L62 92 L76 118 L22 146 Z" fill="#7D8896" stroke={O} strokeWidth={4} /><path d="M192 120 L138 92 L124 118 L178 146 Z" fill={COLORS.blue} stroke={O} strokeWidth={4} />
      <path d="M58 90 L72 84 L86 112 L74 120 Z" fill="#F2F5F8" stroke={O} strokeWidth={3} /><path d="M142 90 L128 84 L114 112 L126 120 Z" fill="#F2F5F8" stroke={O} strokeWidth={3} />
      <path d="M72 96 Q100 76 128 96 L122 122 Q100 134 78 122 Z" fill="#2C3346" stroke={O} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={84 + i * 9} y={94 - Math.abs(i - 1.5) * 3} width={9} height={30} rx={4.5} fill="#3A4258" stroke={O} strokeWidth={2.5} />)}
      <path d="M116 96 Q124 106 114 116" stroke="#3A4258" strokeWidth={9} fill="none" strokeLinecap="round" /></g>)),
  makeProp('gavel', 'Gavel', ['business', 'legal', 'court', 'regulation'], () => (
    <g><rect x={50} y={52} width={80} height={36} rx={8} fill="#7A4A2A" stroke={O} strokeWidth={4} transform="rotate(-30 90 70)" />
      <rect x={94} y={78} width={14} height={86} rx={6} fill="#9A6A42" stroke={O} strokeWidth={4} transform="rotate(-30 90 70)" />
      <rect x={30} y={156} width={100} height={18} rx={4} fill="#5A3B2A" stroke={O} strokeWidth={4} /></g>)),
  makeProp('magnifier', 'Magnifying glass', ['business', 'research', 'investigation'], () => (
    <g><circle cx={86} cy={86} r={50} fill="rgba(191,230,255,0.25)" stroke={COLORS.champagne} strokeWidth={12} />
      <path d="M58 70 Q66 52 86 48" stroke="#fff" strokeWidth={6} fill="none" opacity={0.6} strokeLinecap="round" />
      <rect x={124} y={118} width={20} height={64} rx={8} fill="#3E281C" stroke={O} strokeWidth={4} transform="rotate(-45 134 150)" /></g>)),
  makeProp('clock', 'Clock', ['business', 'time', 'deadline'], ({ frame }) => (
    <g><circle cx={100} cy={100} r={72} fill="#F7F3EA" stroke={O} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={98} y={34} width={4} height={12} fill={O} transform={`rotate(${i * 30} 100 100)`} />)}
      <rect x={97} y={58} width={6} height={44} rx={3} fill={O} transform={`rotate(${frame * 0.5} 100 100)`} />
      <rect x={98} y={44} width={4} height={58} rx={2} fill={COLORS.red} transform={`rotate(${frame * 6} 100 100)`} /><circle cx={100} cy={100} r={6} fill={O} /></g>)),
  makeProp('calendar', 'Calendar', ['business', 'time', 'schedule'], () => (
    <g><rect x={36} y={40} width={128} height={124} rx={8} fill="#F7F3EA" stroke={O} strokeWidth={4} />
      <rect x={36} y={40} width={128} height={30} rx={8} fill={COLORS.red} stroke={O} strokeWidth={4} />
      {Array.from({ length: 15 }, (_, i) => <rect key={i} x={48 + (i % 5) * 22} y={82 + Math.floor(i / 5) * 24} width={16} height={16} rx={2} fill={i === 8 ? COLORS.red : '#D8CFC0'} />)}
      {[66, 134].map((x) => <rect key={x} x={x - 4} y={30} width={8} height={22} rx={3} fill={O} />)}</g>)),
  makeProp('trophy', 'Trophy', ['business', 'success', 'winner'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#FFF1B8', '#E9C25A', '#B98A2A']} x2={1} /></defs>
      <path d="M60 36 L140 36 L136 96 Q132 120 100 124 Q68 120 64 96 Z" fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <path d="M60 50 Q30 52 38 80 Q46 98 66 96 M140 50 Q170 52 162 80 Q154 98 134 96" stroke="#B98A2A" strokeWidth={8} fill="none" />
      <rect x={92} y={122} width={16} height={24} fill="#B98A2A" /><rect x={64} y={144} width={72} height={22} rx={4} fill="#5A3B2A" stroke={O} strokeWidth={4} /></g>)),
  makeProp('warehouse-boxes', 'Stacked boxes', ['business', 'logistics', 'inventory'], () => (
    <g>{[[40, 110], [100, 110], [70, 54]].map(([x, y], i) => (
      <g key={i}><rect x={x} y={y} width={60} height={56} fill="#C9A06B" stroke={O} strokeWidth={4} /><rect x={x + 24} y={y} width={12} height={22} fill="#E8D0A8" /></g>))}</g>)),
]
