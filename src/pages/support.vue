<template>
  <!-- A reading column, like www's legal pages; the home page is the wide one -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
    <div class="mb-6">
      <NuxtLink to="/" :class="backLink"
        ><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> All Games</NuxtLink
      >
    </div>

    <h1 class="text-3xl font-bold tracking-tight text-white mb-2">Support</h1>
    <p class="text-zinc-400 leading-relaxed mb-8">Found a bug, have an idea, or need a hand? We'd love to hear from you.</p>

    <div class="space-y-4">
      <div :class="card">
        <h2 class="font-semibold mb-1">Email</h2>
        <p :class="body" class="mb-4">Write to us about anything, and we'll get back to you. Tell us which game you're playing and on what device.</p>
        <a :href="`mailto:${SITE.email}`" :class="primaryButton">{{ SITE.email }}</a>
      </div>

      <div :class="card">
        <h2 class="font-semibold mb-1">Report an Issue</h2>
        <p :class="body" class="mb-4">Every game is open source. If you have a GitHub account, you can open an issue on its repository.</p>
        <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <li v-for="game in TASTIC_GAMES" :key="game.slug">
            <a :href="`${game.repo}/issues`" target="_blank" rel="noopener" :class="link">{{ game.name }}</a>
          </li>
          <li v-for="cart in CARTRIDGES" :key="cart.slug">
            <a :href="`${cart.repo}/issues`" target="_blank" rel="noopener" :class="link">{{ cart.name }} (6502)</a>
          </li>
        </ul>
      </div>

      <div :class="card">
        <h2 class="font-semibold mb-1">Privacy</h2>
        <p :class="body">The games don't collect personal information. <NuxtLink to="/privacy" :class="link">Read the privacy policy</NuxtLink>.</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CARTRIDGES, SITE, TASTIC_GAMES } from '~/constants/site'
import { backLink, body, card, link, primaryButton } from '~/constants/styles'

useHead({ title: `${SITE.name} | Support` })
</script>
