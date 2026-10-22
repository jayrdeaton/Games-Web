<template>
  <div class="min-h-dvh flex flex-col bg-zinc-950 text-white">
    <!-- Pinned, like www.infinitetoken.com's: the logo (back to the top), the home page's sections with the one in view
         underlined, and from md Support. Phones show the logo without the wordmark, so the tabs fit; the hero names the
         site. -->
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <div class="flex items-center gap-5 sm:gap-8 self-stretch min-w-0">
          <NuxtLink to="/" :aria-label="SITE.name" class="flex items-center gap-3 group shrink-0" @click="onHome && toTop()">
            <img src="/images/logo.svg" alt="" width="34" height="24" class="h-6 w-auto transition-opacity group-hover:opacity-80" />
            <span class="hidden sm:inline font-semibold text-white tracking-tight">{{ SITE.name }}</span>
          </NuxtLink>

          <nav aria-label="Sections" class="flex items-center gap-4 sm:gap-6 self-stretch">
            <template v-for="s in sections" :key="s.id">
              <!-- Plain anchors on the home page, so they still jump with JavaScript off -->
              <a v-if="onHome" :href="`#${s.id}`" :aria-current="current === s.id ? 'location' : undefined" :class="sectionLink" @click.prevent="jump(s.id)">
                <span class="lg:hidden">{{ s.short }}</span>
                <span class="hidden lg:inline">{{ s.label }}</span>
              </a>
              <NuxtLink v-else :to="`/#${s.id}`" :class="sectionLink">
                <span class="lg:hidden">{{ s.short }}</span>
                <span class="hidden lg:inline">{{ s.label }}</span>
              </NuxtLink>
            </template>
          </nav>
        </div>

        <div class="hidden md:flex items-center gap-6 shrink-0">
          <NuxtLink to="/support" class="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 font-medium transition-colors border border-white/10">Support</NuxtLink>
        </div>
      </div>
    </header>

    <!-- Under the 64px header -->
    <div class="flex-1 pt-16">
      <NuxtPage />
    </div>

    <footer class="border-t border-white/5 py-12 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
          <img src="/images/logo.svg" alt="" width="23" height="16" class="h-4 w-auto opacity-40" />
          <span class="text-zinc-600 text-sm">© {{ year }} Infinite Token LLC, Lincoln, NE</span>
        </div>
        <nav aria-label="Footer" class="flex flex-wrap gap-6 justify-center text-sm">
          <a :href="SITE.company.url" target="_blank" rel="noopener" :class="mutedLink">{{ SITE.company.name }}</a>
          <NuxtLink to="/privacy" :class="mutedLink">Privacy</NuxtLink>
          <NuxtLink to="/support" :class="mutedLink">Support</NuxtLink>
          <a v-if="SITE.tipUrl" :href="SITE.tipUrl" target="_blank" rel="noopener" :class="mutedLink">Tip</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { COMING_SOON, MORE_TO_PLAY, SECTIONS, SITE } from '~/constants/site'
import { mutedLink } from '~/constants/styles'

// The header's tabs: a section only while it has something in it
const sections = SECTIONS.filter((s) => (s.id === 'more' ? MORE_TO_PLAY.length : s.id === 'coming-soon' ? COMING_SOON.length : true))

const route = useRoute()
const onHome = computed(() => route.path === '/')
const { current, jump, toTop, update } = useSectionNav(sections.map((s) => s.id))
// The shell stays mounted across pages, so measure again once a new page has rendered
watch(
  () => route.path,
  () => nextTick(update)
)

const year = new Date().getFullYear()

// The underline sits on the header's bottom border
const sectionLink = 'flex items-center h-full -mb-px border-b-2 border-transparent whitespace-nowrap text-sm text-zinc-400 hover:text-white transition-colors aria-[current=location]:border-indigo-400 aria-[current=location]:text-white'
</script>
