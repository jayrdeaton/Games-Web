<template>
  <!-- The page Google Play's account deletion question links to: how to delete CardTastic's Daily Deal data without the game -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
    <div class="mb-6">
      <NuxtLink to="/" :class="backLink"
        ><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> All Games</NuxtLink
      >
    </div>

    <article :class="card" class="sm:p-8">
      <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Delete Your CardTastic Online Data</h1>
      <p class="text-sm text-zinc-500 mb-8">CardTastic by {{ SITE.company.name }}</p>

      <section :class="section">
        <p :class="body">Playing CardTastic's Daily Deals keeps some data on our game server. You can delete it at any time, in the game or by email. Everything else in CardTastic stays on your device, so a profile that has never played a Daily Deal has nothing to delete.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">In the Game</h2>
        <ol :class="[list, 'list-decimal']">
          <li>Open CardTastic on the device, or in the browser, you play Daily Deals on.</li>
          <li>On the home screen, open Settings with the gear icon, then choose the Profile row, which opens the profile that's playing. For another profile, open any game, choose Manage in its player menu, then choose that profile.</li>
          <li>On the profile's Edit Profile screen, under Online, choose Delete Online Data, then confirm with Delete.</li>
        </ol>
        <p :class="body" class="mt-3">It deletes that profile's online data, so do it for each profile that has played a Daily Deal. Deleting a profile in the game deletes its online data too. It takes effect right away and can't be undone. The option only appears for a profile that has played a Daily Deal.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Without the Game</h2>
        <p :class="body">
          If you no longer have CardTastic or the device you played on, email <a :href="`mailto:${SITE.email}?subject=${SUBJECT}`" :class="link">{{ SITE.email }}</a> with:
        </p>
        <ul :class="[list, 'list-disc']">
          <li>The tag and color your wins showed on the leaderboards, if you chose to show them</li>
          <li>A Daily Deal you won: the game, the day, and your score</li>
        </ul>
        <p :class="body" class="mt-3">CardTastic never sends your name, so these are what we use to find your player. We use your email address only to handle your request, and we'll reply once your data is deleted.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">What Is Deleted</h2>
        <ul :class="[list, 'list-disc']">
          <li>Your player ID</li>
          <li>Your tag and color, if you chose to show your wins on the leaderboards</li>
          <li>Every Daily Deal you started, with the moves, time, and score of the ones you won, so your wins come off every leaderboard, today's included</li>
        </ul>
      </section>

      <section>
        <h2 :class="heading">What Stays</h2>
        <p :class="body">Nothing stays on our server. Your profile and its stats, records, and saved games stay on your device: they were never sent. If you play a Daily Deal again, that profile starts over as a new player, with nothing from before.</p>
        <p :class="body" class="mt-3">The <NuxtLink to="/privacy" :class="link">privacy policy</NuxtLink> explains what the Daily Deals keep and why.</p>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { SITE } from '~/constants/site'
import { backLink, body, card, link } from '~/constants/styles'
import { deleteDataPath } from '~/utils/appLinks'

const SUBJECT = encodeURIComponent('Delete my CardTastic online data')

const section = 'mb-8'
const heading = 'text-lg font-semibold text-white mb-3'
const list = 'list-outside ml-5 mt-3 space-y-1.5 text-sm text-zinc-400 leading-relaxed'

usePageSeo({
  path: deleteDataPath('cardtastic'),
  title: `${SITE.name} | Delete CardTastic Online Data`,
  description: 'How to delete your CardTastic Daily Deal data, in the game or by email, and what is deleted and what stays.'
})
</script>
