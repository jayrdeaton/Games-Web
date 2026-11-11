import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { CARTRIDGES, TASTIC_GAMES } from '~/constants/site'
import { HOME_DESCRIPTION, SITEMAP_PATHS, sitemapXml } from '~/utils/seo'

const PAGES_DIR = resolve(process.cwd(), 'src/pages')
const pageFiles = readdirSync(PAGES_DIR, { recursive: true, encoding: 'utf-8' }).filter((file) => file.endsWith('.vue'))

describe('search', () => {
  it('lists every page, game, pack game and cartridge in the sitemap', () => {
    const fixed = pageFiles.filter((file) => !file.includes('[')).map((file) => (file === 'index.vue' ? '/' : `/${file.replace(/\.vue$/, '')}`))
    const games = TASTIC_GAMES.flatMap((g) => [`/${g.slug}/`, ...(g.games ?? []).map((p) => `/${g.slug}/${p.path}`)])
    const carts = CARTRIDGES.map((c) => `/6502/${c.slug}`)
    expect([...SITEMAP_PATHS].sort()).toEqual([...fixed, ...games, ...carts].sort())
    expect(SITEMAP_PATHS).toContain('/dueltastic/loadout/trap')
  })

  it('has every page set its own title, description and canonical link', () => {
    for (const file of pageFiles) expect(readFileSync(resolve(PAGES_DIR, file), 'utf-8'), file).toContain('usePageSeo(')
  })

  it('names every Tastic game in the home page description', () => {
    for (const game of TASTIC_GAMES) expect(HOME_DESCRIPTION).toContain(game.name)
  })

  it('gives each page its full address', () => {
    const xml = sitemapXml(['/', '/cardtastic/'])
    expect(xml).toContain('<loc>https://games.infinitetoken.com/</loc>')
    expect(xml).toContain('<loc>https://games.infinitetoken.com/cardtastic/</loc>')
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
  })
})
