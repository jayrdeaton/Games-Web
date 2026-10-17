import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  server: {
    fs: {
      strict: false
    }
  },
  test: {
    environment: 'nuxt',
    // The 6502 pages frame the emulator: keep happy-dom from fetching it over the network during tests
    environmentOptions: { happyDom: { settings: { disableIframePageLoading: true } } },
    globals: true,
    include: ['src/__tests__/**/*.test.ts']
  }
})
