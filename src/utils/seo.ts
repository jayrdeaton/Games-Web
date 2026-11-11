import { CARTRIDGES, SITE, TASTIC_GAMES } from '../constants/site'

const listNames = (names: string[]) => `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`

/** A page's full address, for canonical links, link previews and the sitemap */
export const pageUrl = (path: string) => SITE.url + path

/** The link preview image every page shares (1200x630), rendered from scripts/og-image.html */
export const OG_IMAGE = `${SITE.url}/images/og.png`

export const HOME_TITLE = `${SITE.company.name} | Games`

/** The home page's description in search results and link previews: the games by name, which is what people search for */
export const HOME_DESCRIPTION = `Free games with no ads, no accounts and no tracking: ${listNames(TASTIC_GAMES.map((g) => g.name))}, plus 6502 cartridges. Play them in your browser.`

/** Every page search engines should index: this site's pages and the Tastic games proxied under /<slug>/ (a pack's
 *  games' own pages too), which are what people come for. Served as /sitemap.xml by server/routes/sitemap.xml.ts, prerendered (nuxt.config.ts) */
export const SITEMAP_PATHS = ['/', ...TASTIC_GAMES.flatMap((g) => [`/${g.slug}/`, ...(g.games ?? []).map((p) => `/${g.slug}/${p.path}`)]), ...CARTRIDGES.map((c) => `/6502/${c.slug}`), '/support', '/privacy']

export const sitemapXml = (paths: string[]) => {
  const urls = paths.map((path) => `  <url><loc>${pageUrl(path)}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
