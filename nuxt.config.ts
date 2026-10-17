import { readFileSync } from 'node:fs'

import tailwindcss from '@tailwindcss/vite'

import type {} from './.nuxt/nuxt.node.d.ts'
import { CARTRIDGES, SITE, TASTIC_GAMES } from './src/constants/site'
import { vercelRoutes } from './src/utils/vercelRoutes'
const pkg: { displayName: string; description: string } = JSON.parse(readFileSync('./package.json', 'utf-8'))
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  srcDir: 'src',
  devtools: { enabled: true },
  // No @vite-pwa/nuxt, unlike the siblings: a service worker scoped to / would also control the proxied games under
  // /<slug>/ and could answer their navigations with this site's cached pages
  modules: ['@nuxtjs/color-mode'],
  vite: {
    plugins: [tailwindcss()]
  },
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      title: pkg.displayName,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
        { name: 'description', content: pkg.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: pkg.displayName },
        { property: 'og:title', content: pkg.displayName },
        { property: 'og:description', content: pkg.description },
        { property: 'og:url', content: SITE.url },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: pkg.displayName },
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
