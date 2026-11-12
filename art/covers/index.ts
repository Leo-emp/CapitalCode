// # Every cover file is listed here
import type { Cover } from './registry'
import { VISA_1 } from './visa'
import { BANK_1 } from './bank'
import { MONEY4_1 } from './money4'
import { INVEST_1 } from './invest'
import { FUNDS_1 } from './funds'
import { NVSELL_1 } from './nvsell'
import { LOTTERY_1, SAVINGS_1 } from './shorts1'
import { AIRLINES_1, BNPL_1, DEBT1835_1, SHRINK_1 } from './longs1'
import { AIMONEY_1, BORROW_1, CAR_1, CASINO_1, COSTCO_1, FEE_1, GYMS_1, POWER_1 } from './old1'
import { AIBUNDLE_1, BUYBACK_1, CRYPTO_1, GIFT_1, INDEX_1, SALARY_1, STOCKAPP_1, UBER_1 } from './old2'
import { FOURPCT_1, GYM22_1, HUNDRED_1, INDEXS_1, MCD_1, MINPAY_1, NINETY9_1, POPCORN_1, SEATS_1, TRIAL_1, Y2000_1 } from './old3'
import { AMAZON_1, SPOTIFY_1, TESLA_1 } from './old4'
import { CREDIT_1, DEBT_1, ECON_1, FREEDOM_1, HOUSING_1, MORTGAGE_1, NINETOFIVE_1, PE_1, SUBS_1, TAX_1, TRUSTS_1 } from './new11'
import { MILLION_1 } from './million'
import { STAIR_1, STAIR_2, STAIR_3 } from './stair'
import { LIT_1, LIT_2, LIT_3 } from './literacy'
import { MARKET_1, MARKET_2, MARKET_3 } from './market'
import { INFLATE_1, INFLATE_2, INFLATE_3 } from './inflate'
import { LL_C1, LL_C2, LL_C3 } from './literacy2'
import { BD_C1, BD_C2, BD_C3 } from './bonds'
import { FED_C1, FED_C2, FED_C3 } from './fed'

export const COVERS: Cover[] = [VISA_1, BANK_1, MONEY4_1, INVEST_1, FUNDS_1, NVSELL_1, SAVINGS_1, LOTTERY_1, AIRLINES_1, BNPL_1, DEBT1835_1, SHRINK_1, COSTCO_1, GYMS_1, POWER_1, CASINO_1, FEE_1, BORROW_1, CAR_1, AIMONEY_1, SALARY_1, BUYBACK_1, GIFT_1, AIBUNDLE_1, UBER_1, CRYPTO_1, STOCKAPP_1, INDEX_1, FOURPCT_1, Y2000_1, MCD_1, MINPAY_1, HUNDRED_1, SEATS_1, POPCORN_1, TRIAL_1, NINETY9_1, GYM22_1, INDEXS_1, TESLA_1, AMAZON_1, SPOTIFY_1, MILLION_1, STAIR_1, STAIR_2, STAIR_3, MARKET_1, MARKET_2, MARKET_3, INFLATE_1, INFLATE_2, INFLATE_3, LIT_1, LIT_2, LIT_3, LL_C1, LL_C2, LL_C3, BD_C1, BD_C2, BD_C3, FED_C1, FED_C2, FED_C3, TRUSTS_1, PE_1, ECON_1, CREDIT_1, DEBT_1, TAX_1, FREEDOM_1, HOUSING_1, SUBS_1, MORTGAGE_1, NINETOFIVE_1]
export const getCover = (id: string) => {
  const c = COVERS.find((x) => x.id === id)
  if (!c) throw new Error(`unknown cover "${id}"`)
  return c
}
