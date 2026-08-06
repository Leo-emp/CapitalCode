import { describe, it, expect } from 'vitest'
import {
  parseFredResponse,
  parseYahooResponse,
  parseWorldBankResponse,
  parseTreasuryResponse,
  resolveDataSource,
  buildSvgPrompt,
} from '@/pipeline/data-fetcher'

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

describe('parseWorldBankResponse', () => {
  // # World Bank API returns [metadata, dataArray] — two-element array
  it('extracts date-value pairs from World Bank response', () => {
    const raw = [
      { page: 1, pages: 1, total: 3 },
      [
        { date: '2023', value: 25462700000000 },
        { date: '2022', value: 25035164000000 },
        { date: '2021', value: 23315080560000 },
      ],
    ]
    const data = parseWorldBankResponse(raw)
    // # Should be reversed to chronological order (oldest first)
    expect(data).toHaveLength(3)
    expect(data[0].date).toBe('2021')
    expect(data[2].date).toBe('2023')
    expect(data[2].value).toBe(25462700000000)
  })

  it('filters out null values', () => {
    const raw = [
      { page: 1 },
      [
        { date: '2023', value: 100 },
        { date: '2022', value: null },
        { date: '2021', value: 80 },
      ],
    ]
    const data = parseWorldBankResponse(raw)
    expect(data).toHaveLength(2)
  })

  it('handles malformed response', () => {
    expect(parseWorldBankResponse({})).toEqual([])
    expect(parseWorldBankResponse([])).toEqual([])
    expect(parseWorldBankResponse([{ page: 1 }])).toEqual([])
    expect(parseWorldBankResponse('not an array')).toEqual([])
  })
})

describe('parseTreasuryResponse', () => {
  // # Treasury Fiscal Data API returns { data: [...records] }
  it('extracts rate data with labels from Treasury response', () => {
    const raw = {
      data: [
        { record_date: '2024-06-30', avg_interest_rate_amt: '4.625', security_desc: 'Treasury Bonds 30-Year' },
        { record_date: '2024-06-30', avg_interest_rate_amt: '4.250', security_desc: 'Treasury Notes 10-Year' },
      ],
    }
    const data = parseTreasuryResponse(raw)
    expect(data).toHaveLength(2)
    expect(data[0].date).toBe('2024-06-30')
    expect(data[0].value).toBe(4.625)
    expect(data[0].label).toBe('Treasury Bonds 30-Year')
    expect(data[1].label).toBe('Treasury Notes 10-Year')
  })

  it('handles empty response', () => {
    expect(parseTreasuryResponse({})).toEqual([])
    expect(parseTreasuryResponse({ data: [] })).toEqual([])
  })
})

describe('resolveDataSource', () => {
  // # ── FRED sources ──
  it('maps FRED series IDs correctly', () => {
    const source = resolveDataSource('fed_funds_rate')
    expect(source.provider).toBe('fred')
    expect(source.seriesId).toBe('FEDFUNDS')
  })

  it('maps expanded FRED sources', () => {
    expect(resolveDataSource('core_cpi').seriesId).toBe('CPILFESL')
    expect(resolveDataSource('nonfarm_payrolls').seriesId).toBe('PAYEMS')
    expect(resolveDataSource('mortgage_rate_30yr').seriesId).toBe('MORTGAGE30US')
    expect(resolveDataSource('us_debt_to_gdp').seriesId).toBe('GFDEGDQ188S')
    expect(resolveDataSource('credit_card_delinquency').seriesId).toBe('DRCCLACBS')
  })

  // # ── Yahoo Finance sources ──
  it('maps stock symbols to Yahoo', () => {
    const source = resolveDataSource('sp500_ytd')
    expect(source.provider).toBe('yahoo')
    expect(source.symbol).toBe('^GSPC')
  })

  it('maps individual stocks', () => {
    expect(resolveDataSource('aapl_price').symbol).toBe('AAPL')
    expect(resolveDataSource('nvda_price').symbol).toBe('NVDA')
    expect(resolveDataSource('tsla_price').symbol).toBe('TSLA')
  })

  it('maps commodities via Yahoo futures', () => {
    expect(resolveDataSource('oil_wti').symbol).toBe('CL=F')
    expect(resolveDataSource('gold_price').symbol).toBe('GC=F')
    expect(resolveDataSource('copper_price').symbol).toBe('HG=F')
    expect(resolveDataSource('wheat_price').symbol).toBe('ZW=F')
  })

  it('maps forex pairs via Yahoo', () => {
    expect(resolveDataSource('usd_eur').symbol).toBe('EURUSD=X')
    expect(resolveDataSource('usd_jpy').symbol).toBe('JPY=X')
    expect(resolveDataSource('dxy_dollar_index').symbol).toBe('DX-Y.NYB')
  })

  it('maps global indices', () => {
    expect(resolveDataSource('ftse_100').symbol).toBe('^FTSE')
    expect(resolveDataSource('nikkei_225').symbol).toBe('^N225')
    expect(resolveDataSource('hang_seng').symbol).toBe('^HSI')
  })

  it('maps ETFs', () => {
    expect(resolveDataSource('spy_etf').symbol).toBe('SPY')
    expect(resolveDataSource('tlt_bonds_etf').symbol).toBe('TLT')
  })

  // # ── CoinGecko sources ──
  it('maps crypto to CoinGecko', () => {
    const source = resolveDataSource('bitcoin_price')
    expect(source.provider).toBe('coingecko')
    expect(source.coinId).toBe('bitcoin')
  })

  it('maps expanded crypto', () => {
    expect(resolveDataSource('solana_price').coinId).toBe('solana')
    expect(resolveDataSource('xrp_price').coinId).toBe('ripple')
    expect(resolveDataSource('total_crypto_market_cap').coinId).toBe('__global__')
  })

  // # ── World Bank sources ──
  it('maps World Bank GDP indicators', () => {
    const us = resolveDataSource('world_gdp_us')
    expect(us.provider).toBe('worldbank')
    expect(us.indicatorId).toBe('NY.GDP.MKTP.CD')
    expect(us.countryCode).toBe('USA')

    const china = resolveDataSource('world_gdp_china')
    expect(china.countryCode).toBe('CHN')
  })

  it('maps World Bank inequality/development indicators', () => {
    expect(resolveDataSource('gini_us').indicatorId).toBe('SI.POV.GINI')
    expect(resolveDataSource('poverty_rate_global').countryCode).toBe('WLD')
  })

  it('maps World Bank cross-country inflation', () => {
    const uk = resolveDataSource('inflation_uk')
    expect(uk.provider).toBe('worldbank')
    expect(uk.indicatorId).toBe('FP.CPI.TOTL.ZG')
    expect(uk.countryCode).toBe('GBR')
  })

  // # ── Treasury sources ──
  it('maps Treasury yield curve', () => {
    const source = resolveDataSource('treasury_yield_curve')
    expect(source.provider).toBe('treasury')
  })

  // # ── Unknown fallback ──
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
