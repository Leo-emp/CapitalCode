// # Data fetcher — pulls real financial data from free APIs
// # Sources: FRED, Yahoo Finance, CoinGecko, Financial Modeling Prep
// # All data cached in Turso with 24-hour TTL (future enhancement)

import { envOr } from '@/lib/env'
import type { PipelineContext } from './orchestrator'

export interface DataPoint {
  date: string
  value: number
  label?: string
  open?: number
  high?: number
  low?: number
  volume?: number
}

interface DataSourceRef {
  provider: 'fred' | 'yahoo' | 'coingecko' | 'fmp' | 'unknown'
  seriesId?: string
  symbol?: string
  coinId?: string
}

// # Known data source mappings — maps script data_needs to API endpoints
const SOURCE_MAP: Record<string, DataSourceRef> = {
  // # FRED (Federal Reserve Economic Data)
  fed_funds_rate:       { provider: 'fred', seriesId: 'FEDFUNDS' },
  cpi_all:              { provider: 'fred', seriesId: 'CPIAUCSL' },
  unemployment_rate:    { provider: 'fred', seriesId: 'UNRATE' },
  gdp_growth:           { provider: 'fred', seriesId: 'GDP' },
  m2_money_supply:      { provider: 'fred', seriesId: 'M2SL' },
  fed_net_interest_margin: { provider: 'fred', seriesId: 'USNIM' },
  consumer_confidence:  { provider: 'fred', seriesId: 'UMCSENT' },
  housing_starts:       { provider: 'fred', seriesId: 'HOUST' },
  // # Yahoo Finance (stock/index data)
  sp500_ytd:            { provider: 'yahoo', symbol: '^GSPC' },
  nasdaq_ytd:           { provider: 'yahoo', symbol: '^IXIC' },
  dow_ytd:              { provider: 'yahoo', symbol: '^DJI' },
  vix:                  { provider: 'yahoo', symbol: '^VIX' },
  // # CoinGecko (crypto)
  bitcoin_price:        { provider: 'coingecko', coinId: 'bitcoin' },
  ethereum_price:       { provider: 'coingecko', coinId: 'ethereum' },
}

// # Resolve a data_needs reference to a provider + identifier
export function resolveDataSource(dataNeed: string): DataSourceRef {
  return SOURCE_MAP[dataNeed] ?? { provider: 'unknown' }
}

// # Parse FRED API response → DataPoint[]
export function parseFredResponse(raw: Record<string, any>): DataPoint[] {
  const observations = Array.isArray(raw.observations) ? raw.observations : []
  return observations
    .filter((obs: any) => obs.value !== '.' && !isNaN(Number(obs.value)))
    .map((obs: any) => ({
      date: String(obs.date),
      value: Number(obs.value),
    }))
}

// # Parse Yahoo Finance chart response → DataPoint[]
export function parseYahooResponse(raw: Record<string, any>): DataPoint[] {
  const timestamps = raw.timestamp ?? []
  const quote = raw.indicators?.quote?.[0] ?? {}

  return timestamps.map((ts: number, i: number) => ({
    date: new Date(ts * 1000).toISOString().split('T')[0],
    value: quote.close?.[i] ?? 0,
    open: quote.open?.[i],
    high: quote.high?.[i],
    low: quote.low?.[i],
    volume: quote.volume?.[i],
  }))
}

// # Fetch data from FRED API
async function fetchFred(seriesId: string): Promise<DataPoint[]> {
  const apiKey = envOr('FRED_API_KEY', '')
  if (!apiKey) return []

  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${encodeURIComponent(seriesId)}&api_key=${encodeURIComponent(apiKey)}&file_type=json&sort_order=desc&limit=100`
  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  return parseFredResponse(data)
}

// # Fetch data from Yahoo Finance
async function fetchYahoo(symbol: string): Promise<DataPoint[]> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1y&interval=1d`
  const res = await fetch(url, { headers: { 'User-Agent': 'CapitalCode/1.0' } })
  if (!res.ok) return []

  const data = await res.json()
  const result = data.chart?.result?.[0] ?? {}
  return parseYahooResponse(result)
}

// # Fetch data from CoinGecko
async function fetchCoinGecko(coinId: string): Promise<DataPoint[]> {
  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=usd&days=365`
  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  const prices = data.prices ?? []
  return prices.map(([ts, value]: [number, number]) => ({
    date: new Date(ts).toISOString().split('T')[0],
    value,
  }))
}

// # Build SVG slot-filler prompt — exported for testing
export function buildSvgPrompt(templateName: string, topic: string): string {
  return `Fill this SVG template "${templateName}" for the topic: "${topic}".
The template has labeled boxes connected by arrows.
Return JSON with label values. Each label must be ≤20 characters.
Return: { "labels": { "box1": "label text", "box2": "label text", "box3": "label text" }, "title": "short title" }`
}

// # Pipeline stage — fetches real data for chart scenes
export async function dataFetcherStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.scenePlan?.scenes) {
    throw new Error('No scene plan in context — run aiDirectorStage first')
  }

  const chartData: Record<string, DataPoint[]> = {}

  // # Collect all unique data sources from scene props
  const dataSources = new Set<string>()
  for (const scene of ctx.scenePlan.scenes) {
    if (scene.props?.dataSource) dataSources.add(scene.props.dataSource)
    // # Also check data_needs arrays from segments
    if (Array.isArray(scene.props?.dataSources)) {
      for (const ds of scene.props.dataSources) dataSources.add(ds)
    }
  }

  // # Fetch each data source
  for (const source of dataSources) {
    const ref = resolveDataSource(source)

    switch (ref.provider) {
      case 'fred':
        if (ref.seriesId) chartData[source] = await fetchFred(ref.seriesId)
        break
      case 'yahoo':
        if (ref.symbol) chartData[source] = await fetchYahoo(ref.symbol)
        break
      case 'coingecko':
        if (ref.coinId) chartData[source] = await fetchCoinGecko(ref.coinId)
        break
      default:
        chartData[source] = []
    }
  }

  return { ...ctx, chartData }
}
