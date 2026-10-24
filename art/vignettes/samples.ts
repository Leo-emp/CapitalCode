// ============================================================
// VIGNETTE SAMPLES — one valid data example per vignette (tests,
// style-bible stills, and worked examples for the director).
// ============================================================
// # One valid sample per vignette — the same data shape the Visual Director writes in plan.json
export const SAMPLES: Record<string, Record<string, unknown>> = {
  'money-flow': { groups: [{ label: '10 giants', share: 37.9, count: 10 }, { label: '490 others', share: 62.1, count: 490 }] },
  bubble: { label: 'Dot-com', value: '≈ 27%', items: ['Cisco', 'Intel', 'GE'], pop: true },
  loop: { steps: ['Price rises', 'Weight rises', 'More new dollars'], label: 'it feeds itself' },
  leaderboard: { before: ['GE', 'Exxon', 'Pfizer', 'Cisco', 'Citigroup', 'Walmart', 'Microsoft', 'AIG', 'Merck', 'Intel'], after: ['NVIDIA', 'Apple', 'Alphabet', 'Microsoft', 'Amazon', 'Broadcom', 'Micron', 'Meta', 'Tesla', 'Eli Lilly'] },
  pie: { slices: [{ label: 'Top 10', value: 37.9, tone: 'champagne' }, { label: 'Other 490', value: 62.1 }] },
  baskets: { baskets: ['S&P 500 fund', 'Tech fund', 'Growth fund'], items: ['NVIDIA', 'Apple', 'Microsoft'] },
  lottery: { tickets: 48, winners: 2, label: 'a few huge winners' },
  scale: { left: { label: 'Price paid', value: 40 }, right: { label: 'Profits', value: 27 } },
  crowd: { people: [{ look: 'investor', share: 38, label: 'Top 10' }, ...Array.from({ length: 23 }, (_, i) => ({ look: ['hero', 'buyer', 'owner', 'worker'][i % 4], share: 2.7 }))] },
  grid: { panels: [{ scene: 'shop-street', label: 'Shops' }, { scene: 'bank-interior', label: 'Banks' }, { prop: 'house', label: 'Homes' }, { prop: 'car', label: 'Cars' }] },
  circles: { items: [{ prop: 'coin', label: 'Cash' }, { prop: 'house', label: 'Property' }, { scene: 'stock-exchange', label: 'Stocks' }] },
  'crowd-giant': { giant: 'investor', crowd: 30, label: 'The top 10' },
  'slice-grows': { name: 'NVIDIA', from: 1.5, to: 7.5 },
  tracks: { long: { label: '30 years', years: 30 }, short: { label: '5 years', years: 5 } },
  'house-of-cards': { label: 'Built on 10 names', collapse: true },
  'money-mountain': { label: '$15 trillion', burn: false },
  'see-saw': { left: { label: '10 giants', value: 38 }, right: { label: '490 others', value: 62 } },
}
