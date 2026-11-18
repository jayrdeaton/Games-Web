<template>
  <!-- The page Google Play's account deletion question links to: how to delete HexFleet's online data without the game -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
    <div class="mb-6">
      <NuxtLink to="/" :class="backLink"
        ><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> All Games</NuxtLink
      >
    </div>

    <article :class="card" class="sm:p-8">
      <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Delete Your HexFleet Online Data</h1>
      <p class="text-sm text-zinc-500 mb-8">HexFleet by {{ SITE.company.name }}</p>

      <section :class="section">
        <p :class="body">Playing HexFleet online keeps some data on our game server. You can delete it at any time, in the game or by email. Playing offline sends none of it, so there's nothing to delete.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">In the Game</h2>
        <ol :class="[list, 'list-decimal']">
          <li>Open HexFleet on the device, or in the browser, you play online with.</li>
          <li>Open Settings with the gear icon.</li>
          <li>Under Online, choose Delete Online Data, then confirm with Delete.</li>
        </ol>
        <p :class="body" class="mt-3">It takes effect right away and can't be undone. The option only appears where you've played online.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Without the Game</h2>
        <p :class="body">
          If you no longer have HexFleet or the device you played on, email <a :href="`mailto:${SITE.email}?subject=${SUBJECT}`" :class="link">{{ SITE.email }}</a> with:
        </p>
        <ul :class="[list, 'list-disc']">
          <li>The name you played under</li>
          <li>An invite code from one of your matches, or the name of a friend you played</li>
        </ul>
        <p :class="body" class="mt-3">We use these to find your player, and your email address only to handle your request. We'll reply once your data is deleted.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">What Is Deleted</h2>
        <ul :class="[list, 'list-disc']">
          <li>Your player ID</li>
          <li>The name you play under, which becomes "Deleted player" in every match you played</li>
          <li>Your device's push token, if you allowed notifications</li>
        </ul>
        <p :class="body" class="mt-3">Any match you're still playing counts as a forfeit, and an invite nobody has joined is called off.</p>
      </section>

      <section>
        <h2 :class="heading">What Stays</h2>
        <p :class="body">Your friends keep their side of your matches, so those matches stay on the server with no name or player ID for you, and they don't expire. They still hold the faction and color you played, your moves, how each turn played out, and the match's invite code.</p>
        <p :class="body" class="mt-3">Battles already saved in Battle History on your device or a friend's stay there with the names they were saved with, and we can't reach them. Deleting HexFleet or clearing your browser's data removes the ones on your device.</p>
        <p :class="body" class="mt-3">The <NuxtLink to="/privacy" :class="link">privacy policy</NuxtLink> explains what online play keeps and why.</p>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { SITE } from '~/constants/site'
import { backLink, body, card, link } from '~/constants/styles'
import { deleteDataPath } from '~/utils/appLinks'

const SUBJECT = encodeURIComponent('Delete my HexFleet online data')

const section = 'mb-8'
const heading = 'text-lg font-semibold text-white mb-3'
const list = 'list-outside ml-5 mt-3 space-y-1.5 text-sm text-zinc-400 leading-relaxed'

usePageSeo({
  path: deleteDataPath('hexfleet'),
  title: `${SITE.name} | Delete HexFleet Online Data`,
  description: 'How to delete your HexFleet online data, in the game or by email, and what is deleted and what stays.'
})
</script>
