import { describe, expect, it } from 'vitest'

import { TASTIC_GAMES } from '~/constants/site'
import { vercelRoutes } from '~/utils/vercelRoutes'

// Vercel matches route src patterns as regular expressions against the request path, then substitutes $1 into dest
const resolve = (path: string) => {
  for (const route of vercelRoutes(TASTIC_GAMES)) {
    const match = new RegExp(route.src).exec(path)
    if (!match) continue
    return 'dest' in route ? { proxy: route.dest.replace('$1', match[1] ?? '') } : { redirect: route.headers.Location, status: route.status }
  }
  return null
}

describe('vercelRoutes', () => {
  it.each(TASTIC_GAMES)('proxies /$slug/ and everything under it to the same path on its own deployment', ({ slug, origin }) => {
    expect(resolve(`/${slug}/`)).toEqual({ proxy: `${origin}/${slug}/` })
    expect(resolve(`/${slug}/_expo/static/js/web/entry.js`)).toEqual({ proxy: `${origin}/${slug}/_expo/static/js/web/entry.js` })
    expect(resolve(`/${slug}/canvaskit.wasm`)).toEqual({ proxy: `${origin}/${slug}/canvaskit.wasm` })
  })

  it.each(TASTIC_GAMES)('redirects the bare /$slug to /$slug/ permanently', ({ slug }) => {
    expect(resolve(`/${slug}`)).toEqual({ redirect: `/${slug}/`, status: 308 })
  })

  it("leaves this site's own pages alone, including the 6502 pages that share a game's name", () => {
    for (const path of ['/', '/privacy', '/support', '/6502/snake', '/6502/lightcycles', '/snakes', '/snake.png']) expect(resolve(path)).toBeNull()
  })

  it('points every game at an https origin with no trailing slash', () => {
    for (const { origin } of TASTIC_GAMES) expect(origin).toMatch(/^https:\/\/[a-z0-9-]+\.vercel\.app$/)
  })
})
