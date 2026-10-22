<template>
  <main>
    <!-- Hero: www.infinitetoken.com's backdrop and animated logo, but short, so the first games show on load. The canvas
         leaves room above the stack for the ring that drops in, so the section needs little top padding. -->
    <section class="relative pt-2 pb-8 md:pb-10 px-6 overflow-hidden">
      <!-- The backdrop fades out at the bottom: the hero is short, so its edge would show as a line across the page -->
      <div class="absolute inset-0 mask-b-from-40% pointer-events-none" aria-hidden="true">
        <div class="absolute inset-0 dot-grid opacity-40" />
        <!-- On their own GPU layers (transform-gpu): otherwise iOS Safari re-blurs the patch under the animated canvas
             separately and its rectangle shows. No CSS filter on LogoStack (drop-shadow) for the same reason -->
        <div class="absolute -top-24 -left-48 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl transform-gpu" />
        <div class="absolute top-0 -right-48 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl transform-gpu" />
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <LogoStack :width="120" class="mx-auto mb-2" />
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          <span class="text-white">{{ SITE.company.name }}</span
          >{{ ' ' }}<span class="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Games</span>
        </h1>
        <p class="text-zinc-400 text-lg md:text-xl leading-relaxed">{{ SITE.tagline }}</p>
      </div>
    </section>

    <!-- Tastic games: each one is its own deployment, proxied under /<slug>/, so these are plain links rather than NuxtLinks -->
    <section id="tastic" :class="firstSectionClass">
      <div class="max-w-6xl mx-auto">
        <div :class="sectionHeader">
          <h2 :class="sectionTitle">{{ title('tastic') }}</h2>
          <p :class="sectionIntro">Made for one shared screen: play solo, against the CPU, or with a friend. The player profiles you create carry over to every Tastic game. {{ storeNote }}</p>
        </div>
        <div :class="cardRow">
          <div v-for="game in TASTIC_GAMES" :key="game.slug" :class="[gameCard, cardWidth]" class="flex flex-col">
            <div class="flex items-center gap-4 mb-3">
              <img :src="game.icon" :alt="`${game.name} icon`" width="56" height="56" class="w-14 h-14" />
              <div>
                <h3 class="text-lg font-semibold text-white">{{ game.name }}</h3>
                <GameByline :author="game.author" />
              </div>
            </div>
            <p :class="body" class="mb-5">{{ game.description }}</p>
            <div class="mt-auto flex flex-wrap gap-3">
              <a :href="`/${game.slug}/`" :class="primaryButton">Play</a>
              <StoreButtons :links="game" />
              <a :href="game.repo" target="_blank" rel="noopener" :class="secondaryButton">Source</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="COMING_SOON.length" id="coming-soon" :class="sectionClass">
      <div class="max-w-6xl mx-auto">
        <div :class="sectionHeader">
          <h2 :class="sectionTitle">{{ title('coming-soon') }}</h2>
          <p :class="sectionIntro">More Tastic games on the way. Your profiles will carry over to these too.</p>
        </div>
        <div :class="cardRow">
          <div v-for="game in COMING_SOON" :key="game.name" :class="[card, cardWidth]" class="flex flex-col">
            <div class="flex items-start justify-between gap-2 mb-3">
              <img :src="game.icon" :alt="`${game.name} icon`" width="48" height="48" class="w-12 h-12" />
              <span :class="badge">Coming Soon</span>
            </div>
            <h3 class="text-lg font-semibold text-white">{{ game.name }}</h3>
            <GameByline :author="game.author" class="mb-1" />
            <p :class="body" class="mb-5">{{ game.description }}</p>
            <div class="mt-auto">
              <a :href="game.repo" target="_blank" rel="noopener" :class="secondaryButton">Source</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="6502" :class="sectionClass">
      <div class="max-w-6xl mx-auto">
        <div :class="sectionHeader">
          <h2 :class="sectionTitle">{{ title('6502') }}</h2>
          <p :class="sectionIntro">
            Games written in 6502 assembly for
            <a :href="EMULATOR.computer" target="_blank" rel="noopener" :class="link">{{ EMULATOR.author }}'s AC6502</a>
            homebrew computers, running in his emulator. Best with a keyboard.
          </p>
        </div>
        <div :class="cardRow">
          <div v-for="cart in CARTRIDGES" :key="cart.slug" :class="[gameCard, cardWidth]" class="flex flex-col">
            <NuxtLink :to="`/6502/${cart.slug}`" class="block mb-4 overflow-hidden rounded-xl bg-black">
              <img :src="cart.screenshot" :alt="`${cart.name} title screen`" width="320" height="240" class="w-full aspect-4/3" />
            </NuxtLink>
            <h3 class="text-lg font-semibold text-white">{{ cart.name }}</h3>
            <GameByline :author="cart.author" class="mb-1" />
            <p :class="body" class="mb-5">{{ cart.description }}</p>
            <div class="mt-auto flex flex-wrap gap-3">
              <NuxtLink :to="`/6502/${cart.slug}`" :class="primaryButton">Play</NuxtLink>
              <a :href="cart.repo" target="_blank" rel="noopener" :class="secondaryButton">Source</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Not Tastic games: each lives on its own site, with its own privacy policy and support page -->
    <section v-if="MORE_TO_PLAY.length" id="more" :class="sectionClass">
      <div class="max-w-6xl mx-auto">
        <div :class="sectionHeader">
          <h2 :class="sectionTitle">{{ title('more') }}</h2>
          <p :class="sectionIntro">Not Tastic games, so your player profiles stay behind, but just as free: no ads, no accounts, and no tracking.</p>
        </div>
        <div :class="cardRow">
          <div v-for="app in MORE_TO_PLAY" :key="app.name" :class="[gameCard, cardWidth]" class="flex flex-col">
            <div class="flex items-center gap-4 mb-3">
              <img :src="app.icon" :alt="`${app.name} icon`" width="56" height="56" class="w-14 h-14" />
              <div>
                <h3 class="text-lg font-semibold text-white">{{ app.name }}</h3>
                <GameByline :author="app.author" />
              </div>
            </div>
            <p :class="body" class="mb-5">{{ app.description }}</p>
            <div class="mt-auto flex flex-wrap gap-3">
              <a :href="app.url" target="_blank" rel="noopener" :class="primaryButton">Play</a>
              <StoreButtons :links="app" />
              <a :href="app.repo" target="_blank" rel="noopener" :class="secondaryButton">Source</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="SITE.tipUrl" class="px-6 pb-16">
      <TipCard :url="SITE.tipUrl" class="max-w-3xl mx-auto" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { CARTRIDGES, COMING_SOON, EMULATOR, MORE_TO_PLAY, type SectionId, SECTIONS, SITE, TASTIC_GAMES } from '~/constants/site'
import { badge, body, card, gameCard, link, primaryButton, secondaryButton, sectionIntro, sectionTitle } from '~/constants/styles'

// Each card links its App Store listing once it's live; the intro says they're coming until every one is there
const storeNote = TASTIC_GAMES.every((g) => g.appStore) ? 'Get them for iPhone and iPad on the App Store, too.' : 'iPhone and iPad versions are coming to the App Store.'

const title = (id: SectionId) => SECTIONS.find((s) => s.id === id)!.label

// scroll-mt-16 lands a jump just under the 64px header. Tighter than www's sections (py-16 md:py-24): this page is a
// catalog, and the point is to get to the games.
const sectionClass = 'scroll-mt-16 py-12 md:py-16 px-6'
// The hero's bottom padding already separates the first one
const firstSectionClass = 'scroll-mt-16 pt-6 md:pt-8 pb-12 md:pb-16 px-6'
const sectionHeader = 'text-center mb-8'
// Flex-wrap instead of grid so a partial last row is centered, like www's cards (gap-6 = 1.5rem)
const cardRow = 'flex flex-wrap justify-center gap-6'
const cardWidth = 'w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]'
</script>
