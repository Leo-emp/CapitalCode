// ============================================================
// PROPS — MONEY family (21). Drawn in a 200×200 box, dark ink
// outlines so they read on the night backgrounds.
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import { Grad, INK, makeProp } from './frame'

const O = INK.outline
const CASH = ['#9BE3B8', '#4FAF7E', '#2B7552']
const GOLD = ['#FFF1B8', '#E9C25A', '#B98A2A']
const METAL = [COLORS.champagneLight, COLORS.champagne, COLORS.champagneDark]

// # One banknote, reused by several props
const Note: React.FC<{ fill: string; x?: number; y?: number; r?: number }> = ({ fill, x = 0, y = 0, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r} 100 100)`}>
    <rect x={30} y={62} width={140} height={76} rx={6} fill={fill} stroke={O} strokeWidth={4} />
    <rect x={40} y={72} width={120} height={56} rx={4} fill="none" stroke="#1F5A3E" strokeWidth={2} opacity={0.6} />
    <circle cx={100} cy={100} r={18} fill="none" stroke="#1F5A3E" strokeWidth={3} />
    <text x={100} y={108} textAnchor="middle" fill="#1F5A3E" style={{ font: '700 22px Inter' }}>$</text>
  </g>
)
const Coin: React.FC<{ g: string; cx?: number; cy?: number; r?: number; mark?: string }> = ({ g, cx = 100, cy = 100, r = 60, mark = '$' }) => (
  <g>
    <circle cx={cx} cy={cy + 6} r={r} fill="#8A6A1E" stroke={O} strokeWidth={4} />
    <circle cx={cx} cy={cy} r={r} fill={`url(#${g})`} stroke={O} strokeWidth={4} />
    <circle cx={cx} cy={cy} r={r * 0.74} fill="none" stroke="#A9822A" strokeWidth={3} />
    <text x={cx} y={cy + r * 0.3} textAnchor="middle" fill="#7A5A12" style={{ font: `800 ${r * 0.85}px Inter` }}>{mark}</text>
  </g>
)

export const MONEY_PROPS = [
  makeProp('cash-stack', 'Cash stack', ['money', 'cash', 'wealth'], ({ u }) => (
    <g><defs><Grad id={u('c')} stops={CASH} /></defs>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={30} y={120 - i * 14} width={140} height={22} rx={4} fill={`url(#${u('c')})`} stroke={O} strokeWidth={4} />)}
      <rect x={88} y={62} width={24} height={82} fill="#F2E9DA" stroke={O} strokeWidth={3} />
    </g>)),
  makeProp('banknote', 'Banknote', ['money', 'cash'], () => <Note fill={CASH[1]} r={-8} />),
  makeProp('coin', 'Gold coin', ['money', 'coin', 'wealth'], ({ u }) => <g><defs><Grad id={u('g')} stops={GOLD} x2={1} /></defs><Coin g={u('g')} /></g>),
  makeProp('coin-stack', 'Coin stack', ['money', 'coin', 'savings'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={GOLD} x2={1} /></defs>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}><ellipse cx={100} cy={150 - i * 16} rx={56} ry={18} fill="#B98A2A" stroke={O} strokeWidth={4} />
          <ellipse cx={100} cy={144 - i * 16} rx={56} ry={18} fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} /></g>))}
    </g>)),
  makeProp('gold-bar', 'Gold bar', ['money', 'gold', 'wealth', 'commodity'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={GOLD} x2={1} /></defs>
      <path d="M40 140 L160 140 L140 80 L60 80 Z" fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <path d="M60 80 L140 80 L132 96 L68 96 Z" fill="#FFF6CF" opacity={0.7} />
      <text x={100} y={124} textAnchor="middle" fill="#7A5A12" style={{ font: '800 18px Inter' }}>999.9</text>
    </g>)),
  makeProp('credit-card', 'Credit card', ['money', 'debt', 'spending'], ({ u }) => (
    <g><defs><Grad id={u('c')} stops={['#3B4E78', '#1B2A48']} x2={1} /></defs>
      <rect x={30} y={60} width={140} height={90} rx={10} fill={`url(#${u('c')})`} stroke={O} strokeWidth={4} transform="rotate(-8 100 105)" />
      <g transform="rotate(-8 100 105)"><rect x={46} y={84} width={26} height={20} rx={3} fill={GOLD[1]} />
        <rect x={46} y={120} width={90} height={8} rx={4} fill={COLORS.champagne} opacity={0.7} /></g>
    </g>)),
  makeProp('wallet', 'Wallet', ['money', 'spending', 'personal'], () => (
    <g><Note fill={CASH[0]} y={-26} r={-6} />
      <rect x={34} y={86} width={132} height={74} rx={12} fill="#5A3B2A" stroke={O} strokeWidth={4} />
      <rect x={120} y={104} width={50} height={36} rx={8} fill="#72503A" stroke={O} strokeWidth={4} /><circle cx={140} cy={122} r={5} fill={GOLD[1]} />
    </g>)),
  makeProp('piggy-bank', 'Piggy bank', ['money', 'savings', 'personal'], () => (
    <g><ellipse cx={100} cy={112} rx={66} ry={48} fill="#F29BB0" stroke={O} strokeWidth={4} />
      <circle cx={160} cy={104} r={18} fill="#F7B6C6" stroke={O} strokeWidth={4} /><circle cx={156} cy={100} r={3} fill={O} /><circle cx={164} cy={100} r={3} fill={O} />
      <path d="M78 68 L90 50 L100 70 Z" fill="#E07F96" stroke={O} strokeWidth={4} /><rect x={86} y={62} width={30} height={7} rx={3} fill={O} />
      {[56, 82, 118, 144].map((x) => <rect key={x} x={x - 8} y={146} width={16} height={22} rx={4} fill="#E07F96" stroke={O} strokeWidth={3} />)}
    </g>)),
  makeProp('vault-door', 'Vault door', ['money', 'bank', 'security', 'wealth'], ({ u, frame }) => (
    <g><defs><Grad id={u('m')} stops={['#9AA6B4', '#5C6878', '#343D4A']} x2={1} /></defs>
      <circle cx={100} cy={100} r={80} fill={`url(#${u('m')})`} stroke={O} strokeWidth={5} />
      <circle cx={100} cy={100} r={58} fill="none" stroke="#2A323D" strokeWidth={6} />
      <g transform={`rotate(${frame * 1.5} 100 100)`}>{[0, 60, 120].map((a) => <rect key={a} x={96} y={52} width={8} height={96} rx={4} fill="#C9D2DC" transform={`rotate(${a} 100 100)`} />)}</g>
      <circle cx={100} cy={100} r={14} fill="#C9D2DC" stroke={O} strokeWidth={4} />
    </g>)),
  makeProp('contract', 'Contract', ['money', 'deal', 'business', 'legal'], () => (
    <g><rect x={48} y={30} width={104} height={140} rx={6} fill="#F2E9DA" stroke={O} strokeWidth={4} transform="rotate(4 100 100)" />
      <g transform="rotate(4 100 100)">{[54, 68, 82, 96, 110].map((y) => <rect key={y} x={62} y={y} width={y % 28 ? 76 : 56} height={6} rx={3} fill="#B9AC96" />)}
        <path d="M66 146 Q80 132 92 146 T120 142" stroke="#1B2A48" strokeWidth={3} fill="none" /></g>
    </g>)),
  makeProp('receipt', 'Receipt', ['money', 'spending', 'tax'], () => (
    <g><path d="M60 30 L140 30 L140 162 L130 172 L120 162 L110 172 L100 162 L90 172 L80 162 L70 172 L60 162 Z" fill="#F7F3EA" stroke={O} strokeWidth={4} />
      {[50, 66, 82, 98, 114].map((y) => <rect key={y} x={72} y={y} width={56} height={5} rx={2} fill="#C4B9A6" />)}
      <rect x={72} y={134} width={56} height={9} rx={2} fill={O} /></g>)),
  makeProp('price-tag', 'Price tag', ['money', 'price', 'shopping'], () => (
    <g><path d="M40 60 L120 40 L170 110 L100 160 Z" fill={COLORS.champagne} stroke={O} strokeWidth={4} /><circle cx={68} cy={66} r={9} fill={O} />
      <path d="M68 66 Q40 30 20 46" stroke={COLORS.champagneLight} strokeWidth={3} fill="none" />
      <text x={112} y={112} textAnchor="middle" fill={O} style={{ font: '800 34px Inter' }} transform="rotate(-24 112 104)">$</text></g>)),
  makeProp('calculator', 'Calculator', ['money', 'tax', 'math', 'business'], () => (
    <g><rect x={50} y={28} width={100} height={144} rx={12} fill="#26303F" stroke={O} strokeWidth={4} />
      <rect x={62} y={40} width={76} height={30} rx={4} fill="#9FE3C0" /><text x={132} y={63} textAnchor="end" fill="#1F4A35" style={{ font: '700 20px JetBrains Mono' }}>1,050</text>
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={64 + c * 26} y={82 + r * 22} width={20} height={16} rx={3} fill={c === 2 && r === 3 ? COLORS.champagne : '#3E4A5C'} />))}
    </g>)),
  makeProp('bank', 'Bank building', ['money', 'bank', 'finance', 'institution'], ({ u }) => (
    <g><defs><Grad id={u('m')} stops={METAL} /></defs>
      <path d="M24 72 L100 28 L176 72 Z" fill={`url(#${u('m')})`} stroke={O} strokeWidth={4} />
      <rect x={30} y={72} width={140} height={14} fill={COLORS.champagneDark} stroke={O} strokeWidth={4} />
      {[46, 78, 110, 142].map((x) => <rect key={x} x={x - 6} y={88} width={24} height={64} fill={COLORS.champagneLight} stroke={O} strokeWidth={3} />)}
      <rect x={22} y={152} width={156} height={18} fill={COLORS.champagneDark} stroke={O} strokeWidth={4} />
    </g>)),
  makeProp('dollar-sign', 'Dollar sign', ['money', 'symbol', 'usd'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={CASH} /></defs><text x={100} y={162} textAnchor="middle" fill={`url(#${u('g')})`} stroke={O} strokeWidth={5} paintOrder="stroke" style={{ font: '900 170px Inter' }}>$</text></g>)),
  makeProp('euro-sign', 'Euro sign', ['money', 'symbol', 'eur'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#9FC9FF', '#3E7FD8', '#1F4F96']} /></defs><text x={100} y={160} textAnchor="middle" fill={`url(#${u('g')})`} stroke={O} strokeWidth={5} paintOrder="stroke" style={{ font: '900 160px Inter' }}>€</text></g>)),
  makeProp('pound-sign', 'Pound sign', ['money', 'symbol', 'gbp'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#D7B8FF', '#8E5BD8', '#5A2E96']} /></defs><text x={100} y={160} textAnchor="middle" fill={`url(#${u('g')})`} stroke={O} strokeWidth={5} paintOrder="stroke" style={{ font: '900 160px Inter' }}>£</text></g>)),
  makeProp('tax-form', 'Tax form', ['money', 'tax', 'government'], () => (
    <g><rect x={46} y={26} width={108} height={148} rx={6} fill="#F7F3EA" stroke={O} strokeWidth={4} />
      <rect x={46} y={26} width={108} height={30} rx={6} fill={COLORS.red} /><text x={100} y={48} textAnchor="middle" fill="#fff" style={{ font: '800 18px Inter' }}>TAX</text>
      {[70, 90, 110, 130].map((y) => <g key={y}><rect x={58} y={y} width={12} height={12} fill="none" stroke={O} strokeWidth={2} /><rect x={78} y={y + 3} width={62} height={6} rx={3} fill="#C4B9A6" /></g>)}
    </g>)),
  makeProp('briefcase', 'Briefcase', ['money', 'business', 'work'], () => (
    <g><rect x={78} y={44} width={44} height={22} rx={6} fill="none" stroke={O} strokeWidth={8} />
      <rect x={30} y={62} width={140} height={100} rx={12} fill="#5A3B2A" stroke={O} strokeWidth={4} />
      <rect x={30} y={98} width={140} height={10} fill="#3E281C" /><rect x={90} y={92} width={20} height={22} rx={3} fill={GOLD[1]} stroke={O} strokeWidth={3} />
    </g>)),
  makeProp('money-bag', 'Money bag', ['money', 'wealth', 'profit'], () => (
    <g><path d="M70 50 Q100 70 130 50 L118 72 Q170 96 160 146 Q150 176 100 176 Q50 176 40 146 Q30 96 82 72 Z" fill="#C9A86B" stroke={O} strokeWidth={4} />
      <path d="M82 72 L118 72" stroke="#7A5A2E" strokeWidth={8} strokeLinecap="round" />
      <text x={100} y={150} textAnchor="middle" fill="#5A3E16" style={{ font: '900 54px Inter' }}>$</text></g>)),
  makeProp('atm', 'ATM', ['money', 'bank', 'cash'], () => (
    <g><rect x={46} y={24} width={108} height={152} rx={8} fill="#2E3A4C" stroke={O} strokeWidth={4} />
      <rect x={60} y={40} width={80} height={52} rx={4} fill="#4FB5E8" /><text x={100} y={72} textAnchor="middle" fill="#0A2A3E" style={{ font: '800 18px Inter' }}>ATM</text>
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={66 + c * 24} y={102 + r * 16} width={18} height={11} rx={2} fill="#556275" />))}
      <rect x={64} y={156} width={72} height={8} rx={3} fill={O} />
      <g transform="translate(100 166) scale(0.42) translate(-100 -100)"><Note fill={CASH[0]} /></g>
    </g>)),
]
