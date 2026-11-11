import { describe, expect, it } from 'vitest'

import { TASTIC_GAMES } from '~/constants/site'
import { vercelRoutes } from '~/utils/vercelRoutes'

// Vercel matches route src patterns as regular expressions against the request path, then substitutes $1 into dest
const resolve = (path: string) => {
  for (const route of vercelRoutes(TASTIC_GAMES)) {
    const match = new RegExp(route.src).exec(path)
    if (!match) continue
    return 'dest' in route ? { proxy: route.dest.replace('$1', match[1] ?? '') } : { redirect: route.headers.Location?.replace('$1', match[1] ?? ''), status: route.status }
  }
  return null
}

describe('vercelRoutes', () => {
  it.each(TASTIC_GAMES)('proxies /$slug/ to the bare /$slug on its own deployment, where cleanUrls serves the home page', ({ slug, origin }) => {
    expect(resolve(`/${slug}/`)).toEqual({ proxy: `${origin}/${slug}` })
  })

  it.each(TASTIC_GAMES)('proxies everything under /$slug/ to the same path on its own deployment', ({ slug, origin }) => {
    expect(resolve(`/${slug}/_expo/static/js/web/entry.js`)).toEqual({ proxy: `${origin}/${slug}/_expo/static/js/web/entry.js` })
    expect(resolve(`/${slug}/canvaskit.wasm`)).toEqual({ proxy: `${origin}/${slug}/canvaskit.wasm` })
  })

  it.each(TASTIC_GAMES)('redirects the bare /$slug to /$slug/ permanently', ({ slug }) => {
    expect(resolve(`/${slug}`)).toEqual({ redirect: `/${slug}/`, status: 308 })
  })

  it("redirects a renamed game's old path, and everything under it, to the same place under its new one", () => {
    const renamed = TASTIC_GAMES.filter((g) => g.formerSlugs?.length)
    expect(renamed.map((g) => g.slug)).toContain('cardtastic')
    for (const { slug, formerSlugs = [] } of renamed) {
      for (const former of formerSlugs) {
        expect(resolve(`/${former}`)).toEqual({ redirect: `/${slug}/`, status: 308 })
        expect(resolve(`/${former}/`)).toEqual({ redirect: `/${slug}/`, status: 308 })
        expect(resolve(`/${former}/play/klondike`)).toEqual({ redirect: `/${slug}/play/klondike`, status: 308 })
      }
    }
  })

  it('redirects a game that moved into a pack, and everything under its old path, to its page in the pack', () => {
    const moved = TASTIC_GAMES.flatMap(({ slug, games = [] }) => games.filter((g) => g.formerSlug).map((g) => ({ ...g, pack: slug })))
    expect(moved.map((g) => g.formerSlug)).toEqual(expect.arrayContaining(['lightcycles', 'snake']))
    for (const { formerSlug, pack, path } of moved) {
      for (const old of [`/${formerSlug}`, `/${formerSlug}/`, `/${formerSlug}/loadout`, `/${formerSlug}/_expo/static/js/web/entry.js`]) {
        expect(resolve(old)).toEqual({ redirect: `/${pack}/${path}`, status: 308 })
      }
    }
    expect(resolve('/lightcycles/')).toEqual({ redirect: '/dueltastic/loadout/trap', status: 308 })
    expect(resolve('/snake')).toEqual({ redirect: '/dueltastic/loadout/snake', status: 308 })
  })

  it("leaves this site's own pages alone, including the 6502 pages that share a game's name", () => {
    for (const path of ['/', '/privacy', '/support', '/6502/snake', '/6502/lightcycles', '/snakes', '/snake.png']) expect(resolve(path)).toBeNull()
  })

  it('points every game at an https origin with no trailing slash', () => {
    for (const { origin } of TASTIC_GAMES) expect(origin).toMatch(/^https:\/\/[a-z0-9-]+\.vercel\.app$/)
  })
})
