import { ONLINE_GAMES } from '~/constants/site'
import { appleAppSiteAssociation } from '~/utils/appLinks'

// Prerendered to a static file (nuxt.config.ts). It has no extension, so the deploy's route for it sets its content type
// (src/utils/vercelRoutes.ts)
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/json')
  return appleAppSiteAssociation(ONLINE_GAMES)
})
