import { config } from 'dotenv'
config({ path: '.env.local' })

console.log('Discovering topics...')
const { discoverTopics } = await import('./src/pipeline/topic-discovery.js')
const topics = await discoverTopics()
console.log(JSON.stringify(topics, null, 2))
