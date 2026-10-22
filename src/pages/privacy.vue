<template>
  <!-- A reading column, like www's legal pages; the home page is the wide one -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
    <div class="mb-6">
      <NuxtLink to="/" :class="backLink"
        ><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> All Games</NuxtLink
      >
    </div>

    <article :class="card" class="sm:p-8">
      <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Privacy Policy</h1>
      <p class="text-sm text-zinc-500 mb-8">Last updated {{ UPDATED }}</p>

      <section :class="section">
        <p :class="body">This policy covers the Tastic games made by {{ SITE.company.name }} ({{ storeNames }}) on iPhone, iPad, Android, and the web, and this website, games.infinitetoken.com, including its 6502 cartridge pages.</p>
        <p :class="body" class="mt-3">The short version: the games don't collect, share, or sell your personal information. There are no accounts, no ads, no analytics, and no tracking.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Data That Stays on Your Device</h2>
        <p :class="body">Everything a game saves is stored on your device and never sent to us. That includes:</p>
        <ul :class="list">
          <li>Game progress, settings, stats, and achievements</li>
          <li>Player profiles: the names and colors you choose</li>
          <li>Puzzle packs you create in HangmanTastic</li>
        </ul>
        <p :class="body" class="mt-3">On iPhone and iPad, player profiles are shared between the Tastic games installed on the same device, using an App Group (an iOS feature that lets apps from the same developer share storage on that device). On the web, the games on this site share player profiles through your browser's storage for this site. Either way, profiles never leave your device.</p>
        <p :class="body" class="mt-3">Deleting a game deletes its data, and shared profiles are removed once every Tastic game is deleted from the device. On the web, clearing your browser data for this site removes everything the games saved.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Game Updates</h2>
        <p :class="body">When you open one of the mobile apps, it checks for a game update using Expo's update service. That request includes technical details needed to deliver the right update, such as the app version and platform, and a random installation ID that isn't linked to you. Like any internet request, it also includes your IP address. It never includes your profiles, progress, or other game data. See <a href="https://expo.dev/privacy" target="_blank" rel="noopener" :class="link">Expo's Privacy Policy</a>.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">This Website</h2>
        <p :class="body">This site and the web versions of the games are hosted on Vercel, which keeps standard request logs (such as IP addresses) to serve and protect the site. Neither the site nor the games set cookies. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" :class="link">Vercel's Privacy Policy</a>.</p>
      </section>

      <section v-if="SITE.tipUrl" :class="section">
        <h2 :class="heading">Tips</h2>
        <p :class="body">Tips are optional and paid on Stripe's own page, so your card details go to Stripe, never to us. We receive what Stripe shares with a business for each payment (such as the amount, your name, and your email address) and use it only to process the tip and keep our records. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener" :class="link">Stripe's Privacy Policy</a>.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">6502 Cartridges</h2>
        <p :class="body">The 6502 games run in {{ EMULATOR.author }}'s {{ EMULATOR.name }}, which loads from GitHub Pages, and the cartridges themselves load from GitHub. GitHub receives the same standard request details as any website you visit, such as your IP address. The emulator keeps the games' saved high scores in your browser. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener" :class="link">GitHub's Privacy Statement</a>.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Files You Share</h2>
        <p :class="body">HangmanTastic can export puzzle packs and progress backups as files. A file is only created when you ask for one, and it goes only where you send it.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Children</h2>
        <p :class="body">The games are made for players of all ages. Because they don't collect personal information from anyone, they don't collect it from children either.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Changes</h2>
        <p :class="body">If this policy changes, the new version will be posted here with a new date.</p>
      </section>

      <section>
        <h2 :class="heading">Contact</h2>
        <p :class="body">
          Questions about this policy? Email <a :href="`mailto:${SITE.email}`" :class="link">{{ SITE.email }}</a
          >.
        </p>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { EMULATOR, SITE, TASTIC_GAMES } from '~/constants/site'
import { backLink, body, card, link } from '~/constants/styles'

const UPDATED = 'October 22, 2026'
const names = TASTIC_GAMES.map((g) => g.storeName)
const storeNames = `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`

const section = 'mb-8'
const heading = 'text-lg font-semibold text-white mb-3'
const list = 'list-disc list-outside ml-5 mt-3 space-y-1.5 text-sm text-zinc-400 leading-relaxed'

useHead({ title: `${SITE.name} | Privacy Policy` })
</script>
