// # Few-shot script examples for the AI Director's Gemini prompt
// # These teach the model the exact segment structure, pacing, and citation
// # standards we expect. Paraphrased from How Money Works / Economics Explained
// # style analysis — not copied verbatim.

// # Three examples covering all formats:
// #   1. Long-form (12 segments, YouTube)
// #   2. Long-form brief structure (12 segments, compact reference)
// #   3. Short-form (5 segments, TikTok/Reels/Shorts)

export const FEW_SHOT_SCRIPTS: string = `
===== EXAMPLE 1: LONG-FORM (12 SEGMENTS) =====
Title: "How Banks Make $1.8 Trillion From Your Deposits"
Platform: youtube_long
Estimated Duration: 540s (9 minutes)
Word Count: ~1,950

Segment 1 — hook
  Content: Opens with the $1.8 trillion figure — the net interest income
  US commercial banks earned last year. States that every dollar you deposit
  generates roughly 30x more revenue for your bank than it costs them in
  interest payments to you.
  Word Count: ~35
  Duration: 12s
  Visual Hint: big_stat
  Emphasis Words: ["$1.8 trillion", "30x"]
  Source Citation: FDIC Quarterly Banking Profile, Q4 2024

Segment 2 — context
  Content: Explains fractional reserve banking at the simplest level. When you
  deposit $1,000, the bank keeps roughly $100 in reserve and lends out $900.
  That $900 ends up deposited somewhere else, creating another $810 in loans.
  This money multiplier effect means your $1,000 becomes roughly $10,000 of
  economic activity.
  Word Count: ~180
  Duration: 55s
  Visual Hint: flow_diagram
  Emphasis Words: ["fractional reserve", "money multiplier", "$10,000"]
  Source Citation: Federal Reserve Board, Regulation D

Segment 3 — data
  Content: Walks through the actual spread. Average savings account pays 0.46%
  APY. Average 30-year fixed mortgage charges 6.87%. That 6.41 percentage point
  gap is the net interest margin — the core of how banks print money. Shows a
  line chart of the spread widening since 2022 rate hikes.
  Word Count: ~160
  Duration: 48s
  Visual Hint: chart (LineChartDraw)
  Emphasis Words: ["0.46%", "6.87%", "6.41 points"]
  Source Citation: FDIC, Bankrate.com, March 2025
  Data Needs: ["avg_savings_apy_historical", "avg_mortgage_rate_30yr"]

Segment 4 — insight
  Content: Points out what most people miss: banks don't just profit from the
  spread — they profit from the asymmetry of information. Most depositors never
  comparison-shop rates. Fewer than 12% of Americans moved their savings to a
  higher-yield account in the past two years, even with online banks offering
  4.5%+ APY.
  Word Count: ~155
  Duration: 46s
  Visual Hint: text_overlay
  Emphasis Words: ["asymmetry", "12%", "4.5%"]
  Source Citation: Bankrate Annual Savings Survey, 2024

Segment 5 — data
  Content: Breaks down where bank revenue actually comes from using a stacked
  bar chart: 55% net interest income, 22% fees and service charges, 12% trading
  and investment banking, 11% other. The visual emphasizes that more than half
  comes directly from the deposit-to-loan spread.
  Word Count: ~140
  Duration: 42s
  Visual Hint: chart (StackedBar)
  Emphasis Words: ["55%", "net interest income"]
  Source Citation: Federal Reserve Economic Data (FRED), 2024
  Data Needs: ["bank_revenue_breakdown_pct"]

Segment 6 — comparison
  Content: Compares JPMorgan Chase vs. an average community bank. JPMorgan
  earned $89.3 billion in net interest income on $2.4 trillion in deposits.
  A typical community bank earns $12 million on $800 million in deposits.
  But community banks actually pay depositors more — their NIM is lower.
  Side-by-side bar comparison.
  Word Count: ~175
  Duration: 50s
  Visual Hint: comparison (ComparisonSplit)
  Emphasis Words: ["$89.3 billion", "JPMorgan", "community bank"]
  Source Citation: JPMorgan Chase 2024 10-K, FDIC Community Banking Study

Segment 7 — data
  Content: Shows the acceleration. Since 2020, total US bank deposits grew from
  $13.2 trillion to $17.8 trillion — a $4.6 trillion surge driven by pandemic
  stimulus. But interest paid to depositors barely moved. Area chart showing
  deposits growing while interest expense stays flat.
  Word Count: ~150
  Duration: 45s
  Visual Hint: chart (AreaChartFill)
  Emphasis Words: ["$4.6 trillion", "pandemic", "flat"]
  Source Citation: FRED Total Deposits, All Commercial Banks
  Data Needs: ["total_us_deposits_quarterly", "bank_interest_expense_quarterly"]

Segment 8 — implication
  Content: Explains what this means for the average person. If you have $10,000
  in a traditional savings account at 0.46% APY, you earn $46/year. That same
  $10,000 in a high-yield savings account at 4.75% earns $475. Over 10 years
  with compounding, the difference is $4,200 in lost earnings.
  Word Count: ~155
  Duration: 46s
  Visual Hint: counter (CounterAnimation)
  Emphasis Words: ["$46", "$475", "$4,200"]
  Source Citation: Calculated using compound interest formula, rates from Bankrate

Segment 9 — counter
  Content: Acknowledges the counterargument: banks provide real value. They
  absorb credit risk, fund mortgages and small business loans, and provide FDIC
  insurance up to $250,000. The 2023 banking crisis (SVB, Signature, First
  Republic) showed what happens when depositors lose confidence — $500 billion
  in deposits fled in two weeks.
  Word Count: ~165
  Duration: 50s
  Visual Hint: text_overlay
  Emphasis Words: ["credit risk", "$250,000", "$500 billion"]
  Source Citation: FDIC, Federal Reserve Supervision Report 2023

Segment 10 — data
  Content: Shows that despite the crisis, the Big Four banks (JPMorgan, BofA,
  Wells Fargo, Citi) actually gained deposits during the SVB panic. A bar chart
  shows the net deposit flow: regionals lost $450 billion, Big Four gained $120
  billion, the rest went to money market funds and treasuries.
  Word Count: ~150
  Duration: 45s
  Visual Hint: chart (BarChartGrow)
  Emphasis Words: ["Big Four", "$450 billion", "$120 billion"]
  Source Citation: Federal Reserve H.8 Release, March-May 2023
  Data Needs: ["deposit_flows_by_bank_tier_2023"]

Segment 11 — prediction
  Content: Projects forward. As the Fed cuts rates, the spread will compress
  slightly — but banks will cut deposit rates faster than loan rates adjust.
  Historical pattern shows deposit rates drop within 30 days of a Fed cut,
  while existing loan rates (especially fixed mortgages) hold for years.
  Net interest income will stay above $1.5 trillion through 2027.
  Word Count: ~160
  Duration: 48s
  Visual Hint: chart (LineChartDraw)
  Emphasis Words: ["30 days", "$1.5 trillion", "2027"]
  Source Citation: Federal Reserve dot plot projections, Goldman Sachs Research

Segment 12 — cta
  Content: "If your savings account pays less than 4%, your bank is keeping the
  difference — subscribe to see how to fix that."
  Word Count: ~20
  Duration: 8s
  Visual Hint: text_overlay
  Emphasis Words: ["4%", "subscribe"]


===== EXAMPLE 2: LONG-FORM BRIEF STRUCTURE (12 SEGMENTS) =====
Title: "Why Netflix Charges You More Every Year"
Platform: youtube_long
Estimated Duration: 480s (8 minutes)
Word Count: ~1,650

Segment 1 — hook (10s, ~25 words)
  Big stat: Netflix raised prices 9 times since 2014, from $7.99 to $22.99 —
  a 188% increase while US inflation was only 32%.
  Visual: big_stat | Source: Netflix investor letters, BLS CPI

Segment 2 — context (50s, ~160 words)
  How subscription pricing psychology works — the "boiling frog" model. Small
  annual increases that stay below the cancellation threshold. Churn data shows
  most users absorb a $1-2 increase without action.
  Visual: text_overlay | Source: Antenna churn analytics, 2024

Segment 3 — data (45s, ~145 words)
  Line chart of Netflix ARPU (average revenue per user) vs. content spend.
  ARPU rose from $9.50 to $17.30 while content budget went from $3B to $17B.
  Revenue growth outpaced content cost growth since 2022.
  Visual: chart (LineChartDraw) | Source: Netflix 10-K filings
  Data Needs: ["netflix_arpu_annual", "netflix_content_spend_annual"]

Segment 4 — insight (40s, ~130 words)
  The hidden leverage: password sharing crackdown added 30 million paying
  subscribers in 2023-2024. Each former freeloader now pays full price. Netflix
  effectively raised prices on 30 million people by infinity percent.
  Visual: text_overlay | Source: Netflix Q4 2024 earnings call

Segment 5 — data (42s, ~135 words)
  Bar chart comparing streaming service price increases since launch.
  Netflix: +188%, Disney+: +75%, Hulu: +43%, HBO Max: +33%.
  Netflix leads by a wide margin but also leads in subscriber retention.
  Visual: chart (BarChartGrow) | Source: Company announcements, compiled
  Data Needs: ["streaming_price_history_by_service"]

Segment 6 — comparison (48s, ~155 words)
  Netflix vs. cable TV total cost of ownership. Cable in 2014: $99/month for
  200 channels. Netflix + 3 other streaming services in 2025: $65/month. Cord
  cutting still saves money, but the gap is closing fast.
  Visual: comparison (ComparisonSplit) | Source: Leichtman Research Group

Segment 7 — data (40s, ~130 words)
  Waterfall chart showing what makes up Netflix's $33.7B annual revenue:
  Americas $15.2B, EMEA $10.8B, APAC $4.3B, LATAM $3.4B. The Americas
  subsidize international expansion where ARPU is much lower.
  Visual: chart (WaterfallChart) | Source: Netflix 2024 Annual Report
  Data Needs: ["netflix_revenue_by_region"]

Segment 8 — implication (44s, ~140 words)
  The ad tier changes everything. Netflix Standard with Ads costs $6.99 but
  generates $10-12 in combined subscription + ad revenue per user. Price
  increases on premium tiers push users toward ads, which is actually more
  profitable for Netflix.
  Visual: counter (CounterAnimation) | Source: Netflix ad tier metrics, eMarketer

Segment 9 — counter (48s, ~155 words)
  The risk: subscriber fatigue is real. Netflix lost 1.2 million subscribers
  in Q1 2022 after a price hike — the first decline in a decade. The stock
  dropped 35% in a single day. There is a ceiling, and Netflix almost hit it.
  Visual: text_overlay | Source: Netflix Q1 2022 earnings, Yahoo Finance

Segment 10 — data (42s, ~135 words)
  Gauge chart showing Netflix's pricing power score vs. competitors. Measures
  brand loyalty, content exclusivity, and switching cost. Netflix scores 82/100,
  Disney+ 71, HBO Max 68, Hulu 55. Higher score = more room to raise prices.
  Visual: chart (GaugeChart) | Source: Internal analysis based on Antenna + Ampere

Segment 11 — prediction (45s, ~145 words)
  Projects Netflix will hit $27.99/month for Standard by 2028 based on
  historical rate of increase. But ad tier will stay under $10 to maintain
  subscriber growth. The two-tier strategy mirrors cable TV's evolution.
  Visual: chart (LineChartDraw) | Source: Trend extrapolation from Netflix pricing history

Segment 12 — cta (6s, ~15 words)
  "The price will go up again next year — subscribe here to know when."
  Visual: text_overlay


===== EXAMPLE 3: SHORT-FORM (5 SEGMENTS) =====
Title: "The $400 Billion Problem Nobody Talks About"
Platform: tiktok
Estimated Duration: 75s
Word Count: ~195

Segment 1 — hook (8s, ~18 words)
  Americans paid $400 billion in credit card interest last year. That is more
  than the GDP of Thailand.
  Visual: big_stat (BigStatReveal)
  Emphasis Words: ["$400 billion", "Thailand"]
  Source Citation: Federal Reserve G.19 Release, Q4 2024

Segment 2 — context (18s, ~50 words)
  Average credit card APR hit 24.6% — the highest since tracking began in
  1994. The Fed raised rates 11 times since 2022, and card issuers passed every
  single basis point to consumers. Meanwhile, rewards programs got smaller.
  Visual: text_overlay (TextOverlay)
  Emphasis Words: ["24.6%", "11 times"]
  Source Citation: Federal Reserve, Bankrate

Segment 3 — data (22s, ~60 words)
  If you carry a $6,500 balance (the national average) and pay only minimums,
  you will pay $9,400 in interest before it is gone — 17 years from now. The
  counter animation ticks up from $6,500 to $15,900 total cost.
  Visual: counter (CounterAnimation)
  Emphasis Words: ["$6,500", "$9,400", "17 years"]
  Source Citation: Experian Consumer Credit Review 2024
  Data Needs: ["avg_credit_card_balance_us"]

Segment 4 — insight (20s, ~52 words)
  Card companies report "record low" delinquency rates — 2.1%. That sounds
  reassuring until you realize they write off the worst accounts. Charge-off
  rates hit 4.2%, meaning for every person paying late, two more already
  defaulted entirely. The real problem is twice as large as reported.
  Visual: text_overlay (TextOverlay + QuoteCard)
  Emphasis Words: ["2.1%", "4.2%", "twice"]
  Source Citation: Federal Reserve Bank of New York, Household Debt Report

Segment 5 — cta (7s, ~15 words)
  "Follow for more numbers they don't put on your statement."
  Visual: text_overlay (CallToAction)
  Emphasis Words: ["Follow"]
`
