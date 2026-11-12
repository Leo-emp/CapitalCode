import { config } from 'dotenv'
config({ path: '.env.local' })

const { generateScript } = await import('./src/pipeline/script-generator.js')
console.log('Generating script...')
const script = await generateScript('The AI Labor Shock: How White-Collar Jobs Are Quietly Being Automated', 'youtube_long')
console.log('\n=== TITLE ===')
console.log(script.title)
console.log('\n=== HOOK ===')
console.log(script.hook)
console.log('\n=== SEGMENTS ===')
for (const seg of script.segments) {
  console.log(`\n[${seg.type.toUpperCase()}] (${seg.durationHint}s) visual: ${seg.visualHint}`)
  console.log(seg.text)
  if (seg.sourceCitation) console.log(`  Source: ${seg.sourceCitation}`)
  if (seg.dataNeeds?.length) console.log(`  Data: ${seg.dataNeeds.join(', ')}`)
}
console.log('\n=== META ===')
console.log(`Words: ${script.wordCount} | Duration: ${script.estimatedDuration}s | Tags: ${script.tags.join(', ')}`)
