<template>
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-10">
    <div class="mb-6">
      <NuxtLink to="/#6502" :class="backLink">← All Games</NuxtLink>
    </div>

    <h1 class="text-3xl font-bold tracking-tight mb-2">{{ cart.name }}</h1>
    <GameByline :author="cart.author" class="-mt-1 mb-2 text-base" />
    <p class="text-gray-500 dark:text-zinc-400 leading-relaxed mb-6">{{ cart.description }}</p>

    <!-- The emulator boots the cartridge as soon as the frame loads and captures the keyboard only while the frame
         has focus, so a click on the screen is what hands it the keys -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800 bg-black shadow-sm dark:shadow-none">
      <iframe :src="src" :title="`${cart.name}, running in the ${EMULATOR.name}`" allow="autoplay; gamepad; fullscreen" class="block w-full aspect-4/3 border-0" />
    </div>
    <p class="mt-3 text-sm text-gray-400 dark:text-zinc-500">Click the screen to play. Sound starts muted: use the speaker button under the screen.</p>

    <div class="mt-8 grid sm:grid-cols-2 gap-4">
      <div :class="card">
        <h2 :class="sectionHeading">Controls</h2>
        <dl class="space-y-2 text-sm">
          <div v-for="c in cart.controls" :key="c.keys" class="flex flex-wrap justify-between gap-x-4">
            <dt class="font-medium">{{ c.keys }}</dt>
            <dd class="text-gray-500 dark:text-zinc-400">{{ c.action }}</dd>
          </div>
        </dl>
      </div>
      <div :class="card">
        <h2 :class="sectionHeading">About</h2>
        <p :class="body">
          A ROM cartridge written in 6502 assembly by {{ cart.author.name }}, running in <a :href="EMULATOR.repo" target="_blank" rel="noopener" :class="link">{{ EMULATOR.author }}'s {{ EMULATOR.name }}</a
          >.
        </p>
        <a :href="cart.repo" target="_blank" rel="noopener" :class="secondaryButton" class="mt-4">Source</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CARTRIDGES, EMULATOR, SITE } from '~/constants/site'
import { backLink, body, card, link, secondaryButton, sectionHeading } from '~/constants/styles'
import { embedUrl } from '~/utils/embedUrl'

const route = useRoute()
const found = CARTRIDGES.find((c) => c.slug === route.params.slug)
if (!found) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const cart = found
const src = embedUrl(EMULATOR.embed, cart.cart)

useHead({ title: `${cart.name} (6502) · ${SITE.name}` })
</script>
