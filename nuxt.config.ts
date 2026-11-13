import { readFileSync } from 'node:fs'

import tailwindcss from '@tailwindcss/vite'

import type {} from './.nuxt/nuxt.node.d.ts'
import { CARTRIDGES, SITE, TASTIC_GAMES } from './src/constants/site'
import { HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE } from './src/utils/seo'
import { vercelRoutes } from './src/utils/vercelRoutes'
const pkg: { displayName: string; description: string } = JSON.parse(readFileSync('./package.json', 'utf-8'))
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  srcDir: 'src',
  // PlatformChips and the platform types, shared with www.infinitetoken.com and jaydeaton.com
  extends: ['@infinitetoken/site-kit'],
  devtools: { enabled: true },
  // No @vite-pwa/nuxt, unlike the siblings: a service worker scoped to / would also control the proxied games under
  // /<slug>/ and could answer their navigations with this site's cached pages. No @nuxtjs/color-mode either: the site
  // is dark only, like www.infinitetoken.com.
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // "Infinite Token | Games", like www.infinitetoken.com's "Infinite Token | Software Development". The home page's
      // title and description, as defaults: each page sets its own through usePageSeo
      title: HOME_TITLE,
      meta: [
        { name: 'description', content: HOME_DESCRIPTION },
        { name: 'theme-color', content: '#09090b' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: pkg.displayName },
        { property: 'og:title', content: HOME_TITLE },
        { property: 'og:description', content: HOME_DESCRIPTION },
        { property: 'og:url', content: `${SITE.url}/` },
        // The link preview every page shares: scripts/og-image.html, rendered to public/images/og.png
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: HOME_TITLE },
        { name: 'twitter:description', content: HOME_DESCRIPTION },
        { name: 'twitter:image', content: OG_IMAGE }
      ],
      link: [
        // The .ico (48px, rendered from favicon.svg) is for browsers without SVG favicons
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        // The .png (192px, also rendered from favicon.svg) is for crawlers and services that look for a PNG favicon
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon.png' },
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
      routes: ['/', '/privacy', '/terms', '/support', '/sitemap.xml', ...CARTRIDGES.map((c) => `/6502/${c.slug}`)],
      crawlLinks: true,
      // The Tastic games are other deployments behind the proxy routes below, not pages of this site
      ignore: TASTIC_GAMES.map((g) => `/${g.slug}`)
    },
    vercel: {
      config: { routes: vercelRoutes(TASTIC_GAMES) }
    }
  }
})
