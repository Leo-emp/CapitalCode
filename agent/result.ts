// ============================================================
// CLI CONTRACT — every command ends with one machine-readable
// line `RESULT_JSON: {...}`; a refusal prints `[REFUSED] why`
// and exits 1; anything unexpected is printed (never silent)
// and exits 2. Claude reads these to decide the next step.
// ============================================================

export class Refusal extends Error {}

export const result = (obj: Record<string, unknown>) => console.log(`RESULT_JSON: ${JSON.stringify(obj)}`)

export const refuse = (msg: string): never => { throw new Refusal(msg) }

export const runCommand = async (fn: () => Promise<void> | void): Promise<number> => {
  try {
    await fn()
    return 0
  } catch (e) {
    if (e instanceof Refusal) {
      console.log(`[REFUSED] ${e.message}`)
      result({ ok: false, refused: e.message })
      return 1
    }
    console.error(`[ERROR] ${(e as Error).stack ?? String(e)}`)
    result({ ok: false, error: String((e as Error).message ?? e) })
    return 2
  }
}
