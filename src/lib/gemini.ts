import { GoogleGenAI } from '@google/genai'
import { env } from './env'

let _client: GoogleGenAI | null = null

// # Lazy singleton — avoids constructing client when env var is missing (tests)
function getClient(): GoogleGenAI {
  if (!_client) _client = new GoogleGenAI({ apiKey: env('GEMINI_API_KEY') })
  return _client
}

// # Strip markdown code fences that Gemini wraps around JSON responses
export function stripFences(text: string): string {
  let t = text.trim()
  if (t.startsWith('```')) {
    // # Remove opening fence line (```json or ```)
    t = t.split('\n').slice(1).join('\n')
    // # Remove closing fence
    if (t.endsWith('```')) t = t.slice(0, -3)
    t = t.trim()
  }
  return t
}

// # Call Gemini and parse the response as JSON
// # Strips markdown fences automatically — Gemini often wraps JSON in ```json blocks
export async function geminiJson<T>(prompt: string, model = 'gemini-2.5-flash'): Promise<T> {
  const client = getClient()
  const response = await client.models.generateContent({
    model,
    contents: prompt,
  })

  const raw = response.text ?? ''
  const cleaned = stripFences(raw)

  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error(`Gemini returned invalid JSON. Raw response:\n${raw.slice(0, 500)}`)
  }
}

// # Call Gemini and return plain text (for scripts, SVGs, etc.)
export async function geminiText(prompt: string, model = 'gemini-2.5-flash'): Promise<string> {
  const client = getClient()
  const response = await client.models.generateContent({
    model,
    contents: prompt,
  })
  return response.text?.trim() ?? ''
}

// # Call Gemini Vision with images — for safety net quality checks
// # Accepts base64-encoded images and returns parsed JSON
export async function geminiVision<T>(
  prompt: string,
  images: Array<{ base64: string; mimeType: string }>,
  model = 'gemini-2.5-flash'
): Promise<T> {
  const client = getClient()
  const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [
    { text: prompt },
    ...images.map((img) => ({
      inlineData: { data: img.base64, mimeType: img.mimeType },
    })),
  ]

  const response = await client.models.generateContent({
    model,
    contents: [{ role: 'user', parts }],
  })

  const raw = response.text ?? ''
  const cleaned = stripFences(raw)

  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error(`Gemini Vision returned invalid JSON. Raw response:\n${raw.slice(0, 500)}`)
  }
}
