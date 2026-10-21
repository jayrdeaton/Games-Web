import { existsSync } from 'node:fs'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'
import TipCard from '~/components/TipCard.vue'
import { AUTHORS, CARTRIDGES, COMING_SOON, EMULATOR, MORE_TO_PLAY, SITE, TASTIC_GAMES } from '~/constants/site'

describe('home page', () => {
  it('renders the title and every game', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    expect(wrapper.find('h1').text()).toBe(SITE.name)
    for (const name of [...TASTIC_GAMES, ...MORE_TO_PLAY, ...CARTRIDGES].map((g) => g.name)) expect(wrapper.text()).toContain(name)
  })

  it('lists the coming-soon games with a badge and no Play button', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const section = wrapper.find('#coming-soon')
    for (const game of COMING_SOON) expect(section.text()).toContain(game.name)
    expect(section.findAll('span').filter((s) => s.text() === 'Coming Soon')).toHaveLength(COMING_SOON.length)
    expect(section.findAll('a').filter((a) => a.text() === 'Play')).toHaveLength(0)
  })

  it('shows no tip card or footer Tip link until a tip link is set', async () => {
    expect(SITE.tipUrl).toBe('')
    const wrapper = await mountSuspended(App, { route: '/' })
    expect(wrapper.find('#tip').exists()).toBe(false)
    expect(wrapper.findAll('footer a').filter((a) => a.text() === 'Tip')).toHaveLength(0)
  })

  it('links each Tastic game to its proxied path with a trailing slash, as a full page load rather than a router link', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    for (const game of TASTIC_GAMES) {
      const play = wrapper.find(`a[href="/${game.slug}/"]`)
      expect(play.exists()).toBe(true)
      expect(play.text()).toBe('Play')
    }
  })

  it('links each app in More to Play out to its own site', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    for (const app of MORE_TO_PLAY) expect(wrapper.find(`#more a[href="${app.url}"]`).text()).toBe('Play')
  })

  it('shows a store button only for a listing that is set', async () => {
    const isStoreButton = (link: { text: () => string }) => ['App Store', 'Google Play'].includes(link.text())
    const listed = [...TASTIC_GAMES, ...MORE_TO_PLAY].flatMap((entry) => [entry.appStore, entry.googlePlay]).filter(Boolean)
    const before = await mountSuspended(App, { route: '/' })
    expect(before.findAll('a').filter(isStoreButton)).toHaveLength(listed.length)
    for (const href of listed) expect(before.find(`a[href="${href}"]`).exists()).toBe(true)
    const game = TASTIC_GAMES.find((entry) => !entry.appStore)
    const app = MORE_TO_PLAY.find((entry) => !entry.googlePlay)
    game!.appStore = 'https://apps.apple.com/app/id1'
    app!.googlePlay = 'https://play.google.com/store/apps/details?id=com.example'
    try {
      const after = await mountSuspended(App, { route: '/' })
      expect(after.find(`a[href="${game!.appStore}"]`).text()).toBe('App Store')
      expect(after.find(`a[href="${app!.googlePlay}"]`).text()).toBe('Google Play')
      expect(after.findAll('a').filter(isStoreButton)).toHaveLength(listed.length + 2)
    } finally {
      delete game!.appStore
      delete app!.googlePlay
    }
  })

  it('says the Tastic games are coming to the App Store until every one is there', async () => {
    const intro = async () => (await mountSuspended(App, { route: '/' })).find('#tastic p').text()
    expect(await intro()).toContain('coming to the App Store')
    const listings = TASTIC_GAMES.map((game) => game.appStore)
    for (const game of TASTIC_GAMES) game.appStore ??= 'https://apps.apple.com/app/id1'
    try {
      expect(await intro()).not.toContain('coming')
    } finally {
      TASTIC_GAMES.forEach((game, index) => {
        if (listings[index]) game.appStore = listings[index]
        else delete game.appStore
      })
    }
  })

  it('links each cartridge to its 6502 page', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    for (const cart of CARTRIDGES) expect(wrapper.find(`a[href="/6502/${cart.slug}"]`).exists()).toBe(true)
  })

  it('opens every external link in a new tab safely', async () => {
    for (const route of ['/', '/privacy', '/support', `/6502/${CARTRIDGES[0]!.slug}`]) {
      const wrapper = await mountSuspended(App, { route })
      for (const a of wrapper.findAll('a[href^="http"]')) {
        expect(a.attributes('target')).toBe('_blank')
        expect(a.attributes('rel')).toContain('noopener')
      }
    }
  })
})

describe('6502 pages', () => {
  it.each(CARTRIDGES)("frames the emulator with $name's cartridge on the TMS9918A, muted, with saves kept", async (cart) => {
    const wrapper = await mountSuspended(App, { route: `/6502/${cart.slug}` })
    const src = new URL(wrapper.find('iframe').attributes('src')!)
    expect(`${src.origin}${src.pathname}`).toBe(EMULATOR.embed)
    expect(src.searchParams.get('cart')).toBe(cart.cart)
    expect(src.searchParams.get('vdp')).toBe('tms9918a')
    expect(src.searchParams.get('muted')).toBe('1')
    expect(src.searchParams.get('persist')).toBe('1')
    for (const c of cart.controls) expect(wrapper.text()).toContain(c.keys)
  })
})

describe('tip card', () => {
  it('links out to the tip page in a new tab, as a plain link', async () => {
    const wrapper = await mountSuspended(TipCard, { props: { url: 'https://buy.stripe.com/test_tip' } })
    const tip = wrapper.find('a')
    expect(tip.attributes('href')).toBe('https://buy.stripe.com/test_tip')
    expect(tip.attributes('target')).toBe('_blank')
    expect(tip.attributes('rel')).toContain('noopener')
    expect(tip.text()).toBe('Tip')
    expect(wrapper.find('script').exists()).toBe(false)
  })
})

describe('credits', () => {
  it('shows every game with a byline linked to its author', async () => {
    const home = await mountSuspended(App, { route: '/' })
    const games = [...TASTIC_GAMES, ...MORE_TO_PLAY, ...COMING_SOON, ...CARTRIDGES]
    for (const author of new Set(games.map((g) => g.author))) {
      const bylines = home.findAll(`a[href="${author.url}"]`).filter((a) => a.text() === author.name)
      expect(bylines).toHaveLength(games.filter((g) => g.author === author).length)
    }
  })

  it("credits each cartridge's author on its page", async () => {
    for (const cart of CARTRIDGES) {
      const page = await mountSuspended(App, { route: `/6502/${cart.slug}` })
      expect(page.find('h1').text()).toBe(cart.name)
      expect(page.find(`a[href="${cart.author.url}"]`).text()).toBe(cart.author.name)
    }
  })

  it('credits Wizards Lab to A.C. Wright and every other game to Jay', () => {
    for (const game of [...TASTIC_GAMES, ...MORE_TO_PLAY, ...COMING_SOON, ...CARTRIDGES]) expect(game.author).toBe(game.name === 'Wizards Lab' ? AUTHORS.aaron : AUTHORS.jay)
  })
})

describe('privacy and support', () => {
  it('names every Tastic game by its store name and gives the contact email', async () => {
    const wrapper = await mountSuspended(App, { route: '/privacy' })
    for (const game of TASTIC_GAMES) expect(wrapper.text()).toContain(game.storeName)
    expect(wrapper.html()).toContain(`mailto:${SITE.email}`)
  })

  it("links to every game's issue tracker", async () => {
    const wrapper = await mountSuspended(App, { route: '/support' })
    for (const repo of [...TASTIC_GAMES, ...CARTRIDGES].map((g) => g.repo)) expect(wrapper.find(`a[href="${repo}/issues"]`).exists()).toBe(true)
  })
})

describe('site content', () => {
  const all = JSON.stringify({ SITE, AUTHORS, TASTIC_GAMES, MORE_TO_PLAY, COMING_SOON, CARTRIDGES, EMULATOR })

  it('has no em or en dashes anywhere', () => {
    // Built from char codes so formatters can't turn the escapes back into literal dashes
    expect(all).not.toMatch(new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`))
  })

  it('uses https for every link', () => {
    for (const u of all.match(/"(https?:[^"]+)"/g) ?? []) expect(u).toMatch(/^"https:\/\//)
  })

  it('names each store listing after its game, plus "Tastic"', () => {
    // Jay named LightCycles' listing LightCycleTastic (2026-10-19)
    const exceptions: Record<string, string> = { LightCycles: 'LightCycleTastic' }
    for (const game of TASTIC_GAMES) expect(game.storeName).toBe(exceptions[game.name] ?? `${game.name}Tastic`)
  })

  it('links store listings in their short, region-free form', () => {
    for (const game of [...TASTIC_GAMES, ...MORE_TO_PLAY]) {
      if (game.appStore) expect(game.appStore).toMatch(/^https:\/\/apps\.apple\.com\/app\/id\d+$/)
      if (game.googlePlay) expect(game.googlePlay).toMatch(/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[\w.]+$/)
    }
  })

  it('pins every cartridge to a commit and ships every image it references', () => {
    for (const cart of CARTRIDGES) expect(cart.cart).toMatch(/^https:\/\/raw\.githubusercontent\.com\/[\w-]+\/[\w-]+\/[0-9a-f]{40}\/[\w/-]+\.crt$/)
    for (const image of [...TASTIC_GAMES.map((g) => g.icon), ...MORE_TO_PLAY.flatMap((a) => [a.icon, a.iconLight ?? a.icon]), ...COMING_SOON.map((g) => g.icon), ...CARTRIDGES.map((c) => c.screenshot)]) expect(existsSync(`public${image}`)).toBe(true)
  })
})
