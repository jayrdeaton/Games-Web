<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 bg-white dark:bg-zinc-900" style="height: env(safe-area-inset-top)" aria-hidden="true" />
    <div class="fixed inset-x-0 z-30 bg-gray-200 dark:bg-zinc-800" style="top: env(safe-area-inset-top); height: 1px" aria-hidden="true" />
    <div class="fixed inset-x-0 bottom-0 z-30 bg-gray-200 dark:bg-zinc-800" style="height: 1px" aria-hidden="true" />
    <div class="min-h-dvh bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex flex-col" :class="{ 'transition-colors duration-200': mounted }">
      <header class="relative z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 pb-4 shrink-0" style="padding-top: calc(1rem + env(safe-area-inset-top))">
        <div class="max-w-3xl mx-auto flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="/images/logo.svg" alt="" width="34" height="24" class="h-6 w-auto" />
            <span class="text-base font-semibold tracking-tight">{{ SITE.name }}</span>
          </NuxtLink>
          <button :aria-label="colorMode.preference === 'system' ? 'System mode' : colorMode.preference === 'light' ? 'Light mode' : 'Dark mode'" :class="iconButton" @click="cycleColorMode">
            <!-- Monitor: auto/system -->
            <svg v-if="colorMode.preference === 'system'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <!-- Sun: light mode -->
            <svg v-else-if="colorMode.preference === 'light'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <!-- Moon: dark mode -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </header>

      <NuxtPage class="flex-1" />

      <footer class="relative z-40 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-6 text-center text-sm text-gray-400 dark:text-zinc-500 shrink-0">
        Powered by
        <a :href="SITE.company.url" target="_blank" rel="noopener" :class="mutedLink" class="ml-1">{{ SITE.company.name }}</a>
        <span class="mx-2">·</span>
        <NuxtLink to="/privacy" :class="mutedLink">Privacy</NuxtLink>
        <span class="mx-2">·</span>
        <NuxtLink to="/support" :class="mutedLink">Support</NuxtLink>
        <template v-if="SITE.tipUrl">
          <span class="mx-2">·</span>
          <a :href="SITE.tipUrl" target="_blank" rel="noopener" :class="mutedLink">Tip</a>
        </template>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SITE } from '~/constants/site'
import { mutedLink } from '~/constants/styles'

const colorMode = useColorMode()

const cycleColorMode = () => {
  const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (colorMode.preference === 'system') colorMode.preference = systemIsDark ? 'light' : 'dark'
  else if (colorMode.preference === 'dark') colorMode.preference = systemIsDark ? 'system' : 'light'
  else colorMode.preference = systemIsDark ? 'dark' : 'system'
}

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const iconButton = 'p-1.5 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors'
</script>
