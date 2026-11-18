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
        <p :class="body" class="mt-3">The short version: the games don't sell or share your personal information, and there's no sign-in, no ads, no analytics, and no tracking. Everything stays on your device, except what HexFleet needs when you choose to play a friend online.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Data That Stays on Your Device</h2>
        <p :class="body">Apart from HexFleet's online play (below), everything a game saves is stored on your device and never sent to us. That includes:</p>
        <ul :class="list">
          <li>Game progress, settings, stats, and achievements</li>
          <li>Player profiles: the names and colors you choose</li>
          <li>Puzzle packs you create in HangmanTastic</li>
        </ul>
        <p :class="body" class="mt-3">On iPhone and iPad, player profiles are shared between the Tastic games installed on the same device, using an App Group (an iOS feature that lets apps from the same developer share storage on that device). On the web, the games on this site share player profiles through your browser's storage for this site. Either way, profiles stay on your device; only the name you play under is sent when you play HexFleet online.</p>
        <p :class="body" class="mt-3">Deleting a game deletes its data, and shared profiles are removed once every Tastic game is deleted from the device. On the web, clearing your browser data for this site removes everything the games saved.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Online Play in HexFleet</h2>
        <p :class="body">HexFleet's online play, in beta, runs on our own game server, which carries each match between your phone and your friend's. Nothing is sent until you start or join an online match, and it never asks for an email, a password, or your real name. To run your matches, the server keeps:</p>
        <ul :class="list">
          <li>The name, faction, and color you play under: your player profile's name, or one you type</li>
          <li>A random player ID. Your device keeps a signed key that proves the ID is yours</li>
          <li>Your matches: the moves each side planned and how each turn played out</li>
          <li>If you allow notifications, your device's push token, so we can tell you when it's your move</li>
        </ul>
        <p :class="body" class="mt-3">Your friend sees the name, faction, and color you play under, and each of you is sent only what your side of the battle can see. Notifications go through Expo's push service and on to Apple or Google, carrying the message itself, such as "Turn 3 against Sam: your move." The server runs on Amazon Web Services and keeps its data with Supabase, both in the United States. Like any internet request, it sees your IP address, which it uses only in memory to limit how often requests can come in; it isn't logged or stored. We use this information only to run your matches, and we never sell it.</p>
        <p :class="body" class="mt-3">Matches stay on the server after they end. To remove your online data, use Delete Online Data in HexFleet's Settings: matches you're still playing are forfeited, your name is replaced in your friends' copies of past matches, and your player ID and push token are deleted. Deleting the app doesn't do this, so use Delete Online Data first. See <a href="https://expo.dev/privacy" target="_blank" rel="noopener" :class="link">Expo's Privacy Policy</a> and <a href="https://supabase.com/privacy" target="_blank" rel="noopener" :class="link">Supabase's Privacy Policy</a>.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Game Updates</h2>
        <p :class="body">When you open one of the mobile apps, it checks for a game update using Expo's update service. That request includes technical details needed to deliver the right update, such as the app version and platform, and a random installation ID that isn't linked to you. If an update fails to start, the next check also reports which update failed and the error it hit, so a broken update can be fixed. Like any internet request, it also includes your IP address. It never includes your profiles, progress, or other game data. See <a href="https://expo.dev/privacy" target="_blank" rel="noopener" :class="link">Expo's Privacy Policy</a>.</p>
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
        <p :class="body">The games are made for players of all ages. Played on one device, they collect nothing from anyone. HexFleet's online play keeps only what's listed above: a name the player picks, which doesn't have to be a real one, and matches with friends they invite. There's no chat, and it never asks for contact details.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Changes</h2>
        <p :class="body">If this policy changes, the new version will be posted here with a new date.</p>
      </section>

      <section>
        <h2 :class="heading">Contact</h2>
        <p :class="body">
          Questions about this policy? Email <a :href="`mailto:${SITE.email}`" :class="link">{{ SITE.email }}</a>.
        </p>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { EMULATOR, ONLINE_GAMES, SITE, TASTIC_GAMES } from '~/constants/site'
import { backLink, body, card, link } from '~/constants/styles'

const UPDATED = 'November 17, 2026'
// The Tastic games, then the online games that aren't one of them (HexFleet), so the policy names every game it covers
const names = [...TASTIC_GAMES.map((g) => g.storeName), ...ONLINE_GAMES.filter((o) => !TASTIC_GAMES.some((g) => g.slug === o.slug)).map((o) => o.name)]
const storeNames = `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`

const section = 'mb-8'
const heading = 'text-lg font-semibold text-white mb-3'
const list = 'list-disc list-outside ml-5 mt-3 space-y-1.5 text-sm text-zinc-400 leading-relaxed'

usePageSeo({
  path: '/privacy',
  title: `${SITE.name} | Privacy Policy`,
  description: `The privacy policy for ${SITE.company.name}'s games and this site. No sign-in, ads, analytics or tracking, and nothing leaves your device but what HexFleet's online play needs.`
})
</script>
