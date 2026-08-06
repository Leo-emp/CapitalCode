// # Data fetcher — pulls real financial data from free APIs
// # Sources: FRED, Yahoo Finance, CoinGecko, World Bank, BLS, Treasury
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
  provider: 'fred' | 'yahoo' | 'coingecko' | 'worldbank' | 'treasury' | 'unknown'
  seriesId?: string
  symbol?: string
  coinId?: string
  // # World Bank uses indicator codes like NY.GDP.MKTP.CD
  indicatorId?: string
  // # World Bank country code (default: 'USA')
  countryCode?: string
}

// # Known data source mappings — maps script data_needs to API endpoints
// # AI Director references these keys in scene props.dataSource
const SOURCE_MAP: Record<string, DataSourceRef> = {
  // # ─── FRED (Federal Reserve Economic Data) ───────────────────────
  // # Monetary policy
  fed_funds_rate:           { provider: 'fred', seriesId: 'FEDFUNDS' },
  prime_rate:               { provider: 'fred', seriesId: 'DPRIME' },
  discount_rate:            { provider: 'fred', seriesId: 'INTDSRUSM193N' },
  // # Inflation
  cpi_all:                  { provider: 'fred', seriesId: 'CPIAUCSL' },
  core_cpi:                 { provider: 'fred', seriesId: 'CPILFESL' },
  pce_price_index:          { provider: 'fred', seriesId: 'PCEPI' },
  core_pce:                 { provider: 'fred', seriesId: 'PCEPILFE' },
  ppi_all:                  { provider: 'fred', seriesId: 'PPIACO' },
  // # Employment
  unemployment_rate:        { provider: 'fred', seriesId: 'UNRATE' },
  nonfarm_payrolls:         { provider: 'fred', seriesId: 'PAYEMS' },
  initial_jobless_claims:   { provider: 'fred', seriesId: 'ICSA' },
  labor_force_participation: { provider: 'fred', seriesId: 'CIVPART' },
  avg_hourly_earnings:      { provider: 'fred', seriesId: 'CES0500000003' },
  // # GDP & output
  gdp_growth:               { provider: 'fred', seriesId: 'GDP' },
  real_gdp:                 { provider: 'fred', seriesId: 'GDPC1' },
  industrial_production:    { provider: 'fred', seriesId: 'INDPRO' },
  capacity_utilization:     { provider: 'fred', seriesId: 'TCU' },
  // # Money supply
  m2_money_supply:          { provider: 'fred', seriesId: 'M2SL' },
  m1_money_supply:          { provider: 'fred', seriesId: 'M1SL' },
  monetary_base:            { provider: 'fred', seriesId: 'BOGMBASE' },
  // # Banking & credit
  fed_net_interest_margin:  { provider: 'fred', seriesId: 'USNIM' },
  bank_credit:              { provider: 'fred', seriesId: 'TOTBKCR' },
  consumer_credit:          { provider: 'fred', seriesId: 'TOTALSL' },
  credit_card_delinquency:  { provider: 'fred', seriesId: 'DRCCLACBS' },
  // # Housing
  housing_starts:           { provider: 'fred', seriesId: 'HOUST' },
  existing_home_sales:      { provider: 'fred', seriesId: 'EXHOSLUSM495S' },
  case_shiller_home_price:  { provider: 'fred', seriesId: 'CSUSHPINSA' },
  mortgage_rate_30yr:       { provider: 'fred', seriesId: 'MORTGAGE30US' },
  // # Consumer & business sentiment
  consumer_confidence:      { provider: 'fred', seriesId: 'UMCSENT' },
  ism_manufacturing:        { provider: 'fred', seriesId: 'MANEMP' },
  retail_sales:             { provider: 'fred', seriesId: 'RSXFS' },
  // # Treasury & debt (via FRED)
  us_national_debt:         { provider: 'fred', seriesId: 'GFDEBTN' },
  us_debt_to_gdp:           { provider: 'fred', seriesId: 'GFDEGDQ188S' },
  fed_balance_sheet:        { provider: 'fred', seriesId: 'WALCL' },

  // # ─── Treasury Yield Curve (api.fiscaldata.treasury.gov) ─────────
  // # Free, no API key — real-time US Treasury rates
  treasury_yield_curve:     { provider: 'treasury' },

  // # ─── Yahoo Finance (stocks, indices, commodities, forex) ────────
  // # Major indices
  sp500_ytd:                { provider: 'yahoo', symbol: '^GSPC' },
  nasdaq_ytd:               { provider: 'yahoo', symbol: '^IXIC' },
  dow_ytd:                  { provider: 'yahoo', symbol: '^DJI' },
  russell_2000:             { provider: 'yahoo', symbol: '^RUT' },
  vix:                      { provider: 'yahoo', symbol: '^VIX' },
  // # Global indices
  ftse_100:                 { provider: 'yahoo', symbol: '^FTSE' },
  dax:                      { provider: 'yahoo', symbol: '^GDAXI' },
  nikkei_225:               { provider: 'yahoo', symbol: '^N225' },
  hang_seng:                { provider: 'yahoo', symbol: '^HSI' },
  shanghai_composite:       { provider: 'yahoo', symbol: '000001.SS' },
  // # Mega-cap stocks (most-discussed in finance YouTube)
  aapl_price:               { provider: 'yahoo', symbol: 'AAPL' },
  msft_price:               { provider: 'yahoo', symbol: 'MSFT' },
  googl_price:              { provider: 'yahoo', symbol: 'GOOGL' },
  amzn_price:               { provider: 'yahoo', symbol: 'AMZN' },
  nvda_price:               { provider: 'yahoo', symbol: 'NVDA' },
  tsla_price:               { provider: 'yahoo', symbol: 'TSLA' },
  meta_price:               { provider: 'yahoo', symbol: 'META' },
  brk_price:                { provider: 'yahoo', symbol: 'BRK-B' },
  jpm_price:                { provider: 'yahoo', symbol: 'JPM' },
  v_price:                  { provider: 'yahoo', symbol: 'V' },
  // # Commodities (Yahoo Finance futures symbols)
  oil_wti:                  { provider: 'yahoo', symbol: 'CL=F' },
  oil_brent:                { provider: 'yahoo', symbol: 'BZ=F' },
  gold_price:               { provider: 'yahoo', symbol: 'GC=F' },
  silver_price:             { provider: 'yahoo', symbol: 'SI=F' },
  copper_price:             { provider: 'yahoo', symbol: 'HG=F' },
  natural_gas:              { provider: 'yahoo', symbol: 'NG=F' },
  wheat_price:              { provider: 'yahoo', symbol: 'ZW=F' },
  corn_price:               { provider: 'yahoo', symbol: 'ZC=F' },
  // # Forex pairs
  usd_eur:                  { provider: 'yahoo', symbol: 'EURUSD=X' },
  usd_jpy:                  { provider: 'yahoo', symbol: 'JPY=X' },
  usd_gbp:                  { provider: 'yahoo', symbol: 'GBPUSD=X' },
  usd_cny:                  { provider: 'yahoo', symbol: 'CNY=X' },
  dxy_dollar_index:         { provider: 'yahoo', symbol: 'DX-Y.NYB' },
  // # ETFs (commonly referenced in finance content)
  spy_etf:                  { provider: 'yahoo', symbol: 'SPY' },
  qqq_etf:                  { provider: 'yahoo', symbol: 'QQQ' },
  tlt_bonds_etf:            { provider: 'yahoo', symbol: 'TLT' },
  gld_gold_etf:             { provider: 'yahoo', symbol: 'GLD' },

  // # ─── CoinGecko (crypto — free, no API key) ─────────────────────
  bitcoin_price:            { provider: 'coingecko', coinId: 'bitcoin' },
  ethereum_price:           { provider: 'coingecko', coinId: 'ethereum' },
  solana_price:             { provider: 'coingecko', coinId: 'solana' },
  bnb_price:                { provider: 'coingecko', coinId: 'binancecoin' },
  xrp_price:                { provider: 'coingecko', coinId: 'ripple' },
  cardano_price:            { provider: 'coingecko', coinId: 'cardano' },
  total_crypto_market_cap:  { provider: 'coingecko', coinId: '__global__' },

  // # ─── World Bank (global macro — free, no API key) ───────────────
  // # GDP comparisons across countries
  world_gdp_us:             { provider: 'worldbank', indicatorId: 'NY.GDP.MKTP.CD', countryCode: 'USA' },
  world_gdp_china:          { provider: 'worldbank', indicatorId: 'NY.GDP.MKTP.CD', countryCode: 'CHN' },
  world_gdp_japan:          { provider: 'worldbank', indicatorId: 'NY.GDP.MKTP.CD', countryCode: 'JPN' },
  world_gdp_germany:        { provider: 'worldbank', indicatorId: 'NY.GDP.MKTP.CD', countryCode: 'DEU' },
  world_gdp_india:          { provider: 'worldbank', indicatorId: 'NY.GDP.MKTP.CD', countryCode: 'IND' },
  world_gdp_uk:             { provider: 'worldbank', indicatorId: 'NY.GDP.MKTP.CD', countryCode: 'GBR' },
  // # Trade & globalization
  world_trade_us:           { provider: 'worldbank', indicatorId: 'NE.TRD.GNFS.ZS', countryCode: 'USA' },
  world_trade_china:        { provider: 'worldbank', indicatorId: 'NE.TRD.GNFS.ZS', countryCode: 'CHN' },
  // # Inequality & development
  gini_us:                  { provider: 'worldbank', indicatorId: 'SI.POV.GINI', countryCode: 'USA' },
  poverty_rate_global:      { provider: 'worldbank', indicatorId: 'SI.POV.DDAY', countryCode: 'WLD' },
  // # Population & demographics
  population_us:            { provider: 'worldbank', indicatorId: 'SP.POP.TOTL', countryCode: 'USA' },
  population_china:         { provider: 'worldbank', indicatorId: 'SP.POP.TOTL', countryCode: 'CHN' },
  population_india:         { provider: 'worldbank', indicatorId: 'SP.POP.TOTL', countryCode: 'IND' },
  life_expectancy_us:       { provider: 'worldbank', indicatorId: 'SP.DYN.LE00.IN', countryCode: 'USA' },
  // # Inflation (World Bank version — for cross-country comparison)
  inflation_us:             { provider: 'worldbank', indicatorId: 'FP.CPI.TOTL.ZG', countryCode: 'USA' },
  inflation_china:          { provider: 'worldbank', indicatorId: 'FP.CPI.TOTL.ZG', countryCode: 'CHN' },
  inflation_uk:             { provider: 'worldbank', indicatorId: 'FP.CPI.TOTL.ZG', countryCode: 'GBR' },
  inflation_japan:          { provider: 'worldbank', indicatorId: 'FP.CPI.TOTL.ZG', countryCode: 'JPN' },
  // # Government debt (% of GDP)
  govt_debt_us:             { provider: 'worldbank', indicatorId: 'GC.DOD.TOTL.GD.ZS', countryCode: 'USA' },
  govt_debt_japan:          { provider: 'worldbank', indicatorId: 'GC.DOD.TOTL.GD.ZS', countryCode: 'JPN' },
  govt_debt_china:          { provider: 'worldbank', indicatorId: 'GC.DOD.TOTL.GD.ZS', countryCode: 'CHN' },
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
  // # Special case: total crypto market cap uses the /global endpoint
  if (coinId === '__global__') return fetchCoinGeckoGlobal()

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

// # Fetch total crypto market cap from CoinGecko /global
async function fetchCoinGeckoGlobal(): Promise<DataPoint[]> {
  const url = 'https://api.coingecko.com/api/v3/global'
  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  const mcap = data.data?.total_market_cap?.usd ?? 0
  // # Global endpoint returns a single snapshot, not historical
  return [{ date: new Date().toISOString().split('T')[0], value: mcap }]
}

// # ─── World Bank API (free, no key) ────────────────────────────────
// # Docs: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392
// # Returns annual data, typically 1-2 years behind

// # Parse World Bank API v2 JSON response → DataPoint[]
export function parseWorldBankResponse(raw: any): DataPoint[] {
  // # World Bank returns [metadata, data[]] — we want the second element
  if (!Array.isArray(raw) || raw.length < 2) return []
  const entries = raw[1]
  if (!Array.isArray(entries)) return []

  return entries
    .filter((e: any) => e.value !== null && e.value !== undefined)
    .map((e: any) => ({
      date: String(e.date),
      value: Number(e.value),
    }))
    // # World Bank returns newest first — reverse for chronological order
    .reverse()
}

// # Fetch indicator data from World Bank
async function fetchWorldBank(indicatorId: string, countryCode: string): Promise<DataPoint[]> {
  // # per_page=100 gets ~60 years of annual data
  const url = `https://api.worldbank.org/v2/country/${encodeURIComponent(countryCode)}/indicator/${encodeURIComponent(indicatorId)}?format=json&per_page=100`
  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  return parseWorldBankResponse(data)
}

// # ─── Treasury Yield Curve (Fiscal Data API — free, no key) ────────
// # Docs: https://fiscaldata.treasury.gov/datasets/average-interest-rates-on-us-treasury-securities/

// # Parse Treasury yield curve response → DataPoint[] with labels
export function parseTreasuryResponse(raw: Record<string, any>): DataPoint[] {
  const records = Array.isArray(raw.data) ? raw.data : []
  return records.map((r: any) => ({
    date: String(r.record_date ?? ''),
    value: Number(r.avg_interest_rate_amt ?? 0),
    // # Label contains maturity (e.g., "Treasury Bonds 30-Year")
    label: String(r.security_desc ?? ''),
  }))
}

// # Fetch latest Treasury yield rates
async function fetchTreasury(): Promise<DataPoint[]> {
  // # Get the most recent month of average interest rates
  const url = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&page[size]=20'
  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  return parseTreasuryResponse(data)
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
      case 'worldbank':
        // # World Bank: free, no key, annual data
        if (ref.indicatorId) chartData[source] = await fetchWorldBank(ref.indicatorId, ref.countryCode ?? 'USA')
        break
      case 'treasury':
        // # Treasury: free, no key, yield curve data
        chartData[source] = await fetchTreasury()
        break
      default:
        chartData[source] = []
    }
  }

  return { ...ctx, chartData }
}
