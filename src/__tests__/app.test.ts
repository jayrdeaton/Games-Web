import { existsSync } from 'node:fs'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

import App from '~/app.vue'
import TipCard from '~/components/TipCard.vue'
import { AUTHORS, CARTRIDGES, COMING_SOON, EMULATOR, MORE_TO_PLAY, SECTIONS, SITE, TASTIC_GAMES } from '~/constants/site'
import { HOME_DESCRIPTION } from '~/utils/seo'

describe('home page', () => {
  it('renders the title and every game', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    expect(wrapper.find('h1').text()).toBe(SITE.name)
    for (const name of [...TASTIC_GAMES, ...MORE_TO_PLAY, ...CARTRIDGES].map((g) => g.name)) expect(wrapper.text()).toContain(name)
  })

  it('lists the coming-soon games with a badge and no Play button, and drops the section while there are none', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const section = wrapper.find('#coming-soon')
    expect(section.exists()).toBe(COMING_SOON.length > 0)
    if (!COMING_SOON.length) return
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

  it('links a store chip only once its listing is live, and shows the rest as coming soon', async () => {
    const entries = [...TASTIC_GAMES, ...MORE_TO_PLAY]
    const listed = entries.flatMap((entry) => Object.values(entry.platforms)).filter((link) => link !== 'soon')
    const soon = entries.flatMap((entry) => Object.values(entry.platforms)).filter((link) => link === 'soon')
    const before = await mountSuspended(App, { route: '/' })
    for (const href of listed) expect(before.find(`a.platform-chip[href="${href}"]`).exists()).toBe(true)
    expect(before.findAll('.platform-chip--soon')).toHaveLength(soon.length)
    // Every card's first chip is its web version, the same page as its Play button
    for (const game of TASTIC_GAMES) expect(before.find(`a.platform-chip[href="/${game.slug}/"]`).text()).toBe('Web')
    for (const app of MORE_TO_PLAY) expect(before.find(`a.platform-chip[href="${app.url}"]`).text()).toBe('Web')
    const game = TASTIC_GAMES.find((entry) => entry.platforms.ios === 'soon')!
    game.platforms.ios = 'https://apps.apple.com/app/id1'
    try {
      const after = await mountSuspended(App, { route: '/' })
      expect(after.find(`a.platform-chip[href="${game.platforms.ios}"]`).text()).toBe('iPhone and iPad')
      expect(after.findAll('.platform-chip--soon')).toHaveLength(soon.length - 1)
    } finally {
      game.platforms.ios = 'soon'
    }
  })

  it('says the Tastic games are rolling out to the stores until every one is in both', async () => {
    const intro = async () => (await mountSuspended(App, { route: '/' })).find('#tastic p').text()
    const saved = TASTIC_GAMES.map((game) => ({ ...game.platforms }))
    try {
      expect(await intro()).toContain('iPhone, iPad and Android versions are rolling out.')
      for (const game of TASTIC_GAMES) game.platforms.ios = 'https://apps.apple.com/app/id1'
      expect(await intro()).toContain('Get them for iPhone and iPad, too, with Android on the way.')
      for (const game of TASTIC_GAMES) game.platforms.android = 'https://play.google.com/store/apps/details?id=com.example'
      expect(await intro()).toContain('Get them for iPhone, iPad and Android, too.')
    } finally {
      TASTIC_GAMES.forEach((game, index) => (game.platforms = saved[index]!))
    }
  })

  it('links each cartridge to its 6502 page', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    for (const cart of CARTRIDGES) expect(wrapper.find(`a[href="/6502/${cart.slug}"]`).exists()).toBe(true)
  })

  it('opens every external link in a new tab safely', async () => {
    for (const route of ['/', '/privacy', '/terms', '/support', `/6502/${CARTRIDGES[0]!.slug}`]) {
      const wrapper = await mountSuspended(App, { route })
      for (const a of wrapper.findAll('a[href^="http"]')) {
        expect(a.attributes('target')).toBe('_blank')
        expect(a.attributes('rel')).toContain('noopener')
      }
    }
  })
})

describe('header', () => {
  it('tabs every section that has entries, as an anchor on the home page and a link back to it from the others', async () => {
    const shown = SECTIONS.filter((s) => (s.id === 'more' ? MORE_TO_PLAY.length : s.id === 'coming-soon' ? COMING_SOON.length : true))
    const home = await mountSuspended(App, { route: '/' })
    for (const s of SECTIONS) {
      const isShown = shown.includes(s)
      expect(home.find(`section[id="${s.id}"]`).exists()).toBe(isShown)
      expect(home.find(`header a[href="#${s.id}"]`).exists()).toBe(isShown)
      if (isShown) expect(home.find(`header a[href="#${s.id}"]`).text()).toContain(s.short)
    }
    const support = await mountSuspended(App, { route: '/support' })
    for (const s of shown) expect(support.find(`header a[href="/#${s.id}"]`).exists()).toBe(true)
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

describe('privacy, terms and support', () => {
  it('names every Tastic game by its store name and gives the contact email', async () => {
    const wrapper = await mountSuspended(App, { route: '/privacy' })
    for (const game of TASTIC_GAMES) expect(wrapper.text()).toContain(game.storeName)
    expect(wrapper.html()).toContain(`mailto:${SITE.email}`)
  })

  it("links to every game's issue tracker", async () => {
    const wrapper = await mountSuspended(App, { route: '/support' })
    for (const repo of [...TASTIC_GAMES, ...CARTRIDGES].map((g) => g.repo)) expect(wrapper.find(`a[href="${repo}/issues"]`).exists()).toBe(true)
  })

  it.each(['/', '/privacy', '/terms', '/support', `/6502/${CARTRIDGES[0]!.slug}`])('links Terms right after Privacy in the footer on %s', async (route) => {
    const footer = (await mountSuspended(App, { route })).findAll('footer a').map((a) => a.text())
    expect(footer.indexOf('Privacy')).toBeGreaterThan(-1)
    expect(footer.indexOf('Terms')).toBe(footer.indexOf('Privacy') + 1)
  })

  it('links the privacy policy and the terms from the support page', async () => {
    const support = await mountSuspended(App, { route: '/support' })
    expect(support.find('main a[href="/privacy"]').exists()).toBe(true)
    expect(support.find('main a[href="/terms"]').exists()).toBe(true)
  })

  it('says the code is MIT licensed and the names and art are reserved, never that the code is proprietary', async () => {
    const wrapper = await mountSuspended(App, { route: '/terms' })
    const text = wrapper.find('main').text()
    expect(text).toContain('MIT License')
    expect(text).toContain('all rights reserved')
    expect(text).not.toMatch(/proprietary/i)
  })

  it('names Nebraska law as governing the terms', async () => {
    expect((await mountSuspended(App, { route: '/terms' })).find('main').text()).toContain('governed by the laws of the State of Nebraska')
  })

  it('links the privacy policy, the support page and the contact email from the terms, and sets the apps with their own sites aside', async () => {
    const wrapper = await mountSuspended(App, { route: '/terms' })
    expect(wrapper.find('main a[href="/privacy"]').exists()).toBe(true)
    expect(wrapper.find('main a[href="/support"]').exists()).toBe(true)
    expect(wrapper.find('main a[href="/"]').exists()).toBe(true)
    expect(wrapper.html()).toContain(`mailto:${SITE.email}`)
    expect(wrapper.find('main a[href="/#more"]').exists()).toBe(MORE_TO_PLAY.length > 0)
  })

  it.each(['/privacy', '/terms', '/support'])('writes %s without em or en dashes, or a spaced hyphen used as one', async (route) => {
    const text = (await mountSuspended(App, { route })).find('main').text()
    // Built from char codes so formatters can't turn the escapes back into literal dashes
    expect(text).not.toMatch(new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`))
    expect(text).not.toMatch(/\s-\s/)
  })
})

describe('page tags', () => {
  it.each([
    ['/privacy', 'Privacy Policy'],
    ['/terms', 'Terms of Use'],
    ['/support', 'Support']
  ])('gives %s its own title, description and canonical link', async (route, name) => {
    await mountSuspended(App, { route })
    const canonical = () => document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    await vi.waitFor(() => expect(canonical()).toBe(`${SITE.url}${route}`))
    expect(document.title).toBe(`${SITE.name} | ${name}`)
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
    expect(description).toBeTruthy()
    expect(description).not.toBe(HOME_DESCRIPTION)
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(`${SITE.url}${route}`)
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

  it('names each store listing after its game, plus "Tastic" unless it already ends in it', () => {
    // "CardTastic" alone was taken on the App Store (2026-11-08)
    const exceptions: Record<string, string> = { CardTastic: 'CardTastic: Solitaire & More' }
    for (const game of TASTIC_GAMES) expect(game.storeName).toBe(exceptions[game.name] ?? (game.name.endsWith('Tastic') ? game.name : `${game.name}Tastic`))
  })

  it("links a pack's games from its card", async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    for (const { slug, games = [] } of TASTIC_GAMES) for (const { name, path } of games) expect(wrapper.find(`a[href="/${slug}/${path}"]`).text()).toBe(name)
  })

  it('links store listings in their short, region-free form', () => {
    for (const { platforms } of [...TASTIC_GAMES, ...MORE_TO_PLAY]) {
      if (platforms.ios !== 'soon') expect(platforms.ios).toMatch(/^https:\/\/apps\.apple\.com\/app\/id\d+$/)
      if (platforms.android !== 'soon') expect(platforms.android).toMatch(/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[\w.]+$/)
    }
  })

  it('pins every cartridge to a commit and ships every image it references', () => {
    for (const cart of CARTRIDGES) expect(cart.cart).toMatch(/^https:\/\/raw\.githubusercontent\.com\/[\w-]+\/[\w-]+\/[0-9a-f]{40}\/[\w/-]+\.crt$/)
    for (const image of [...TASTIC_GAMES.map((g) => g.icon), ...MORE_TO_PLAY.map((a) => a.icon), ...COMING_SOON.map((g) => g.icon), ...CARTRIDGES.map((c) => c.screenshot)]) expect(existsSync(`public${image}`)).toBe(true)
  })
})
