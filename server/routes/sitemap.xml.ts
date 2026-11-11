import { SITEMAP_PATHS, sitemapXml } from '~/utils/seo'

// The pages in SITEMAP_PATHS (src/utils/seo.ts), prerendered to a static file (nuxt.config.ts)
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return sitemapXml(SITEMAP_PATHS)
})
