import { describe, it, expect } from 'vitest'
import { parseFredResponse, parseYahooResponse, resolveDataSource, buildSvgPrompt } from '@/pipeline/data-fetcher'

describe('parseFredResponse', () => {
  it('extracts date-value pairs from FRED API response', () => {
    const raw = {
      observations: [
        { date: '2024-01-01', value: '5.33' },
        { date: '2024-02-01', value: '5.33' },
        { date: '2024-03-01', value: '5.50' },
      ],
    }
    const data = parseFredResponse(raw)
    expect(data).toHaveLength(3)
    expect(data[0]).toEqual({ date: '2024-01-01', value: 5.33 })
    expect(data[2].value).toBe(5.5)
  })

  it('filters out missing values (dots)', () => {
    const raw = {
      observations: [
        { date: '2024-01-01', value: '5.33' },
        { date: '2024-02-01', value: '.' },
      ],
    }
    const data = parseFredResponse(raw)
    expect(data).toHaveLength(1)
  })

  it('handles empty observations', () => {
    expect(parseFredResponse({})).toEqual([])
    expect(parseFredResponse({ observations: [] })).toEqual([])
  })
})

describe('parseYahooResponse', () => {
  it('extracts OHLCV from yahoo response', () => {
    const raw = {
      timestamp: [1704067200, 1704153600],
      indicators: {
        quote: [{
          open: [100, 102],
          high: [105, 107],
          low: [99, 101],
          close: [103, 106],
          volume: [1000000, 1200000],
        }],
      },
    }
    const data = parseYahooResponse(raw)
    expect(data).toHaveLength(2)
    expect(data[0].value).toBe(103)
    expect(data[0].open).toBe(100)
    expect(data[0].high).toBe(105)
    expect(data[1].volume).toBe(1200000)
  })

  it('handles empty response', () => {
    expect(parseYahooResponse({})).toEqual([])
  })
})

describe('resolveDataSource', () => {
  it('maps FRED series IDs correctly', () => {
    const source = resolveDataSource('fed_funds_rate')
    expect(source.provider).toBe('fred')
    expect(source.seriesId).toBe('FEDFUNDS')
  })

  it('maps stock symbols to Yahoo', () => {
    const source = resolveDataSource('sp500_ytd')
    expect(source.provider).toBe('yahoo')
    expect(source.symbol).toBe('^GSPC')
  })

  it('maps crypto to CoinGecko', () => {
    const source = resolveDataSource('bitcoin_price')
    expect(source.provider).toBe('coingecko')
    expect(source.coinId).toBe('bitcoin')
  })

  it('returns unknown provider for unmapped sources', () => {
    const source = resolveDataSource('completely_unknown_thing')
    expect(source.provider).toBe('unknown')
  })
})

describe('buildSvgPrompt', () => {
  it('includes template name and topic', () => {
    const prompt = buildSvgPrompt('money-flow-3box', 'How banks profit from deposits')
    expect(prompt).toContain('money-flow-3box')
    expect(prompt).toContain('How banks profit')
  })

  it('enforces 20 character label limit', () => {
    const prompt = buildSvgPrompt('money-flow-3box', 'test')
    expect(prompt).toContain('≤20 characters')
  })
})
