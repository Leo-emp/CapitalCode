// ============================================================
// ARTEFACT SCHEMAS — the JSON files Claude writes into a job
// folder, shared by every gate and step (one definition only).
// ============================================================

export const AREAS = ['investing', 'personal-finance', 'ai-tech', 'business', 'crypto'] as const
export type Area = (typeof AREAS)[number]
// # owner's topic split (spec §5)
export const AREA_SHARE: Record<Area, number> = { investing: 0.3, 'personal-finance': 0.25, 'ai-tech': 0.2, business: 0.2, crypto: 0.05 }

export const FORMATS = ['explainer', 'list', 'guide', 'case-study', 'news', 'comparison'] as const
export type Format = (typeof FORMATS)[number]

// ------------------------------------------------------------ script.json
export type Sentence = { id: string; text: string; stress?: string; facts?: string[] }
export type Chapter = { title: string; sentences: Sentence[] }
export type ScriptDoc = { title: string; area: Area; format: Format; thesis: string; chapters: Chapter[] }

// ------------------------------------------------------------ facts.json
export type Fact = { id: string; value: number | string; unit?: string; asOf: string; source: string; url: string; note?: string }
export type FactsDoc = { facts: Fact[] }

// ------------------------------------------------------------ words.json (from the voice)
export type TimedWord = { w: string; s: number; e: number; sid: string }

// ------------------------------------------------------------ plan.json (visual plan)
// # A cue is a spoken word inside a sentence: { sentence: 's12', word: 'million', nth?: 1 }
// # (word omitted → the sentence's first word).
export type Cue = { sentence: string; word?: string; nth?: number }
export type ActorTrackKey = { at: Cue; pose: string; expression?: string }
// # path: walk to another spot of the scene on a cue (living film); legs run one after another
export type ShotActor = { who: string; anchor: string; track: ActorTrackKey[]; flip?: boolean; path?: { at: Cue; to: string }[] }
// # on: 'hand' = held by actors[actor ?? 0] (follows the pose); 'floor' = stands on the anchor's ground line
// # give: on a cue the held prop moves into another actor's hand (living film hand-over)
export type ShotProp = { id: string; anchor: string; at: Cue; size?: number; on?: 'hand' | 'floor'; actor?: number; give?: { at: Cue; to: number } }
export type SceneShot = {
  id: string; start: Cue; kind: 'scene'; scene: string
  time?: 'night' | 'dusk' | 'rain' | 'fog'; tone?: 'none' | 'blue' | 'gold' | 'red' | 'green'; framing?: 'wide' | 'medium' | 'close'
  // # camera: on a cue, glide to a scene spot (or a point) and zoom — show what is being talked about
  camera?: { at: Cue; to: string | { x: number; y: number }; zoom?: number }[]
  // # kinetic text: a key word/number animating on near a spot (or top centre), now and then
  text?: { words: string; at: Cue; style: 'pop' | 'type' | 'stamp' | 'count'; anchor?: string }[]
  variant?: string; world?: 'night' | 'teal'; actors?: ShotActor[]; props?: ShotProp[]; slam?: { words: { text: string; tone?: string }[]; at: Cue[] }
}
export type SlideShot = { id: string; start: Cue; kind: 'slide'; slide: string; heading?: string; kicker?: string; source?: string; data: Record<string, unknown>; at: Cue[] }
// # An animated mini-scene that SHOWS what the voice says (art/vignettes), one cue per step
export type VignetteShot = { id: string; start: Cue; kind: 'vignette'; vignette: string; heading?: string; kicker?: string; source?: string; data: Record<string, unknown>; at: Cue[] }
export type ChapterShot = { id: string; start: Cue; kind: 'chapter'; n: number; title: string }
export type BrandShot = { id: string; start: Cue; kind: 'brand' }
// # A choreographed illustration (diorama style, art/diorama): animates on named cue words, brings its own sounds
export type PieceShot = { id: string; start: Cue; kind: 'piece'; piece: string }
// # enter.zoomInto (living film): this shot grows out of a spot of the previous scene shot, or a screen point
export type Enter = { enter?: { zoomInto: string | { x: number; y: number } } }
export type Shot = (SceneShot | SlideShot | VignetteShot | ChapterShot | BrandShot | PieceShot) & Enter
export type PlanDoc = { shots: Shot[]; sfx?: { at: Cue; name: string; volume?: number }[] }

// ------------------------------------------------------------ metadata.json (Publisher)
export type ThumbSpec = Record<string, unknown>
export type MetaDoc = { titles: string[]; description: string; tags: string[]; thumbnails: ThumbSpec[]; chapters?: { time: string; title: string }[] }

// # All sentences in reading order
export const allSentences = (s: ScriptDoc): Sentence[] => s.chapters.flatMap((c) => c.sentences)
export const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length
