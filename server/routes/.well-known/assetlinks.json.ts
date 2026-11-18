import { ONLINE_GAMES } from '~/constants/site'
import { assetLinks } from '~/utils/appLinks'

// Prerendered to a static file (nuxt.config.ts)
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/json')
  return assetLinks(ONLINE_GAMES)
})
