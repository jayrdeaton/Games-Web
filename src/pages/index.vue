<template>
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-10 space-y-12">
    <section class="text-center">
      <h1 class="text-4xl font-bold tracking-tight mb-3">{{ SITE.name }}</h1>
      <p class="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed">{{ SITE.tagline }}</p>
    </section>

    <!-- Tastic games: each one is its own deployment, proxied under /<slug>/, so these are plain links rather than NuxtLinks -->
    <section id="tastic">
      <h2 :class="sectionHeading">Tastic Games</h2>
      <p class="text-sm text-gray-500 dark:text-zinc-400 mb-4">Made for one shared screen: play solo, against the CPU, or with a friend. The player profiles you create carry over to every Tastic game. {{ storeNote }}</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="game in TASTIC_GAMES" :key="game.slug" :class="card" class="flex flex-col">
          <div class="flex items-center gap-4 mb-3">
            <img :src="game.icon" :alt="`${game.name} icon`" width="56" height="56" class="w-14 h-14" />
            <div>
              <h3 class="text-lg font-semibold">{{ game.name }}</h3>
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
    </section>

    <!-- Not Tastic games: each lives on its own site, with its own privacy policy and support page -->
    <section id="more">
      <h2 :class="sectionHeading">More to Play</h2>
      <p class="text-sm text-gray-500 dark:text-zinc-400 mb-4">Not Tastic games, so your player profiles stay behind, but just as free: no ads, no accounts, and no tracking.</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="app in MORE_TO_PLAY" :key="app.name" :class="card" class="flex flex-col">
          <div class="flex items-center gap-4 mb-3">
            <img :src="app.icon" :alt="`${app.name} icon`" width="56" height="56" class="w-14 h-14" :class="app.iconLight && 'hidden dark:block'" />
            <img v-if="app.iconLight" :src="app.iconLight" :alt="`${app.name} icon`" width="56" height="56" class="w-14 h-14 dark:hidden" />
            <div>
              <h3 class="text-lg font-semibold">{{ app.name }}</h3>
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
    </section>

    <section id="coming-soon">
      <h2 :class="sectionHeading">Coming Soon</h2>
      <p class="text-sm text-gray-500 dark:text-zinc-400 mb-4">More Tastic games on the way. Your profiles will carry over to these too.</p>
      <div class="grid sm:grid-cols-3 gap-4">
        <div v-for="game in COMING_SOON" :key="game.name" :class="card" class="flex flex-col">
          <div class="flex items-start justify-between gap-2 mb-3">
            <img :src="game.icon" :alt="`${game.name} icon`" width="48" height="48" class="w-12 h-12" />
            <span :class="badge">Coming Soon</span>
          </div>
          <h3 class="text-lg font-semibold">{{ game.name }}</h3>
          <GameByline :author="game.author" class="mb-1" />
          <p :class="body" class="mb-5">{{ game.description }}</p>
          <div class="mt-auto">
            <a :href="game.repo" target="_blank" rel="noopener" :class="secondaryButton">Source</a>
          </div>
        </div>
      </div>
    </section>

    <section id="6502">
      <h2 :class="sectionHeading">6502 Cartridges</h2>
      <p class="text-sm text-gray-500 dark:text-zinc-400 mb-4">
        Games written in 6502 assembly for
        <a :href="EMULATOR.computer" target="_blank" rel="noopener" :class="link">{{ EMULATOR.author }}'s AC6502</a>
        homebrew computers, running in his emulator. Best with a keyboard.
      </p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="cart in CARTRIDGES" :key="cart.slug" :class="card" class="flex flex-col">
          <NuxtLink :to="`/6502/${cart.slug}`" class="block mb-4 overflow-hidden rounded-xl bg-black">
            <img :src="cart.screenshot" :alt="`${cart.name} title screen`" width="320" height="240" class="w-full aspect-4/3" />
          </NuxtLink>
          <h3 class="text-lg font-semibold">{{ cart.name }}</h3>
          <GameByline :author="cart.author" class="mb-1" />
          <p :class="body" class="mb-5">{{ cart.description }}</p>
          <div class="mt-auto flex flex-wrap gap-3">
            <NuxtLink :to="`/6502/${cart.slug}`" :class="primaryButton">Play</NuxtLink>
            <a :href="cart.repo" target="_blank" rel="noopener" :class="secondaryButton">Source</a>
          </div>
        </div>
      </div>
    </section>

    <TipCard v-if="SITE.tipUrl" :url="SITE.tipUrl" />
  </main>
</template>

<script setup lang="ts">
import { CARTRIDGES, COMING_SOON, EMULATOR, MORE_TO_PLAY, SITE, TASTIC_GAMES } from '~/constants/site'
import { badge, body, card, link, primaryButton, secondaryButton, sectionHeading } from '~/constants/styles'

// Each card links its App Store listing once it's live; the intro says they're coming until every one is there
const storeNote = TASTIC_GAMES.every((g) => g.appStore) ? 'Get them for iPhone and iPad on the App Store, too.' : 'iPhone and iPad versions are coming to the App Store.'
</script>
