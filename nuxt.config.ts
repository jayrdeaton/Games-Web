import { readFileSync } from 'node:fs'

import tailwindcss from '@tailwindcss/vite'

import type {} from './.nuxt/nuxt.node.d.ts'
import { CARTRIDGES, SITE, TASTIC_GAMES } from './src/constants/site'
import { vercelRoutes } from './src/utils/vercelRoutes'
const pkg: { displayName: string; description: string } = JSON.parse(readFileSync('./package.json', 'utf-8'))
const title = `${SITE.company.name} | Games`
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  srcDir: 'src',
  devtools: { enabled: true },
  // No @vite-pwa/nuxt, unlike the siblings: a service worker scoped to / would also control the proxied games under
  // /<slug>/ and could answer their navigations with this site's cached pages. No @nuxtjs/color-mode either: the site
  // is dark only, like www.infinitetoken.com.
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      // "Infinite Token | Games", like www.infinitetoken.com's "Infinite Token | Software Development"
      title,
      meta: [
        { name: 'description', content: pkg.description },
        { name: 'theme-color', content: '#09090b' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: pkg.displayName },
        { property: 'og:title', content: title },
        { property: 'og:description', content: pkg.description },
        { property: 'og:url', content: SITE.url },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: pkg.description }
      ],
      link: [
        // The .ico (48px, rendered from favicon.svg) is for browsers without SVG favicons
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/images/icon-180.png' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true
  },
  nitro: {
    prerender: {
      routes: ['/', '/privacy', '/support', ...CARTRIDGES.map((c) => `/6502/${c.slug}`)],
      crawlLinks: true,
      // The Tastic games are other deployments behind the proxy routes below, not pages of this site
      ignore: TASTIC_GAMES.map((g) => `/${g.slug}`)
    },
    vercel: {
      config: { routes: vercelRoutes(TASTIC_GAMES) }
    }
  }
})
