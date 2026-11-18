<template>
  <!-- An online game's invite (https://games.infinitetoken.com/<slug>/join/<code>), for someone without the game: where
       it's installed, the link opens the match in it and never shows this page. Every invite is this one prerendered
       page (src/utils/vercelRoutes.ts's inviteRoutes), so the code is read from the address once it's in the browser,
       and the page fetches nothing -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
    <div class="mb-6">
      <NuxtLink to="/" :class="backLink"
        ><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> All Games</NuxtLink
      >
    </div>

    <img :src="game.icon" alt="" class="w-20 h-20 mb-4" />
    <h1 class="text-3xl font-bold tracking-tight text-white mb-2">You're Invited to a {{ game.name }} Match</h1>
    <p class="text-zinc-400 leading-relaxed mb-8">A friend is waiting for you. Get {{ game.name }}, then join their match with this code.</p>

    <div class="space-y-4">
      <div :class="card">
        <h2 :class="sectionHeading">Invite Code</h2>
        <template v-if="code">
          <p ref="codeText" class="font-mono text-5xl sm:text-6xl font-bold tracking-[0.2em] text-white mb-4 select-all">{{ code }}</p>
          <button type="button" :class="primaryButton" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </template>
        <p v-else-if="mounted" :class="body">This link is missing its code. Ask your friend for the six letters and numbers on their invite.</p>
      </div>

      <div :class="card">
        <h2 class="font-semibold mb-1">1. Get {{ game.name }}</h2>
        <p :class="body" class="mb-4">{{ getText }}</p>
        <PlatformChips :platforms="game.get" :name="game.name" label="" class="text-zinc-400" />
      </div>

      <div :class="card">
        <h2 class="font-semibold mb-1">2. Join the Match</h2>
        <p :class="body" class="mb-4">Open {{ game.name }}, go to Online, and paste the code under Have a Code. If you already have {{ game.name }}, this opens the match in it.</p>
        <a v-if="code" :href="`${game.scheme}://join/${code}`" :class="secondaryButton" :aria-label="`Open the match in ${game.name}`">Open</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ONLINE_GAMES } from '~/constants/site'
import { backLink, body, card, primaryButton, secondaryButton, sectionHeading } from '~/constants/styles'
import { inviteCode, invitePath } from '~/utils/appLinks'
import { pageUrl } from '~/utils/seo'

const route = useRoute()
const found = ONLINE_GAMES.find((g) => g.slug === route.params.game)
if (!found) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const game = found

// The code is only in the address, so it's read once the page is in the browser. Nuxt's router starts on the path the
// page was prerendered at (/<slug>/join) and puts that in the address bar, so this script, which runs before Nuxt does,
// notes the address the invite was opened at first. The address is then put back, so a copy of it still has the code
useHead({ script: [{ key: 'invite-opened-at', innerHTML: 'window.__inviteOpenedAt = location.pathname' }] })
const router = useRouter()
const code = ref<string | null>(null)
const mounted = ref(false)
onMounted(() => {
  const openedAt = (window as { __inviteOpenedAt?: string }).__inviteOpenedAt ?? location.pathname
  code.value = inviteCode(openedAt.split('/join/')[1]?.replace(/\/$/, ''))
  if (code.value && route.params.code !== code.value) void router.replace(`${invitePath(game.slug)}/${code.value}`)
  mounted.value = true
})

const copied = ref(false)
const codeText = useTemplateRef<HTMLElement>('codeText')
const copy = async () => {
  if (!code.value) return
  try {
    await navigator.clipboard.writeText(code.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // No clipboard here (an old browser, or one that refuses): the code is selected instead, ready to copy by hand
    if (codeText.value) window.getSelection()?.selectAllChildren(codeText.value)
  }
}

// While the game is only in friends' builds, its buttons are test builds, and before those exist there's nothing to link
const getText = computed(() => (Object.values(game.get).some((link) => link !== 'soon') ? `Install it on your phone, then come back to this page to join.` : `${game.name} isn't in the stores yet. Ask your friend how to get it.`))

usePageSeo({
  path: invitePath(game.slug),
  title: `You're invited to a ${game.name} match`,
  description: `A friend is waiting for you in ${game.name}. Open this link on your phone to join their match.`
})
// The same preview for every invite (the message it's sent in names who sent it), and no invite in search results
useSeoMeta({ ogImage: pageUrl(game.ogImage), twitterImage: pageUrl(game.ogImage), robots: 'noindex' })
</script>
