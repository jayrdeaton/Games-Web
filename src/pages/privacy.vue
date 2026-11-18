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
        <p :class="body" class="mt-3">The short version: the games don't sell or share your personal information, and there's no sign-in, no ads, and no tracking. The only analytics are the update totals described under Game Updates. What you save in a game stays on your device, except what's needed when you choose to play a friend online in HexFleet or play a daily deal in CardTastic.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Data That Stays on Your Device</h2>
        <p :class="body">Apart from HexFleet's online play and CardTastic's daily leaderboards (below), everything a game saves is stored on your device and never sent to us. That includes:</p>
        <ul :class="list">
          <li>Game progress, settings, stats, and achievements</li>
          <li>Player profiles: the names and colors you choose</li>
          <li>Puzzle packs you create in HangmanTastic</li>
        </ul>
        <p :class="body" class="mt-3">On iPhone and iPad, player profiles are shared between the Tastic games installed on the same device, using an App Group (an iOS feature that lets apps from the same developer share storage on that device). On the web, the games on this site share player profiles through your browser's storage for this site. Either way, profiles stay on your device, except the details the two sections below list, sent only when you use those features.</p>
        <p :class="body" class="mt-3">Deleting a game deletes its data, and shared profiles are removed once every Tastic game is deleted from the device. On the web, clearing your browser data for this site removes everything the games saved.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Online Play in HexFleet</h2>
        <p :class="body">HexFleet's online play, in beta, runs on our own game server, which carries each match between your device and your friend's, in the app or in your browser. Nothing is sent until you start or join an online match, and it never asks for an email, a password, or your real name. To run your matches, the server keeps:</p>
        <ul :class="list">
          <li>The name, faction, and color you play under: your player profile's name, or one you type</li>
          <li>A random player ID. Your device keeps a signed key that proves the ID is yours: in the app's secure storage, or in your browser's storage for this site</li>
          <li>Your matches: each one's invite code, the moves each side planned, and how each turn played out</li>
          <li>If you allow notifications in the app, your device's push token, so we can tell you when it's your move. The browser version doesn't send notifications</li>
        </ul>
        <p :class="body" class="mt-3">Your friend sees the name, faction, and color you play under, and so can anyone who opens that match's invite link or code in the game. Each of you is sent only what your side of the battle can see. Notifications go through Expo's push service and on to Apple or Google, carrying the message itself, such as "Turn 3 against Sam: your move.", so the name you play under can appear in a friend's notifications. The server runs on Amazon Web Services and keeps its data with Supabase, both in the United States. Like any internet request, it sees your IP address, which it uses only in memory to limit how often requests can come in; it isn't logged or stored. We use this information only to run your matches, and we never sell it.</p>
        <p :class="body" class="mt-3">
          We keep your online data until you delete it. It doesn't expire, and matches stay on the server after they end. To delete it, use Delete Online Data in HexFleet's Settings or, if you no longer have the game, <NuxtLink :to="deleteDataPath('hexfleet')" :class="link">ask us by email</NuxtLink>. Matches you're still playing are forfeited, invites nobody has joined are called off, and your player ID, name, and push token are deleted. Your friends keep their side of your matches, so those matches stay on the server with your name replaced by "Deleted player" and no player ID, along with the faction, color, and moves you played. Battles already saved in Battle History on your device or a friend's stay there with the names they were saved with, and we can't reach them. Deleting the app or clearing your browser's data doesn't remove anything from the server, so use Delete Online Data first. See
          <a href="https://expo.dev/privacy" target="_blank" rel="noopener" :class="link">Expo's Privacy Policy</a> and <a href="https://supabase.com/privacy" target="_blank" rel="noopener" :class="link">Supabase's Privacy Policy</a>.
        </p>
      </section>

      <section :class="section">
        <h2 :class="heading">Daily Leaderboards in CardTastic</h2>
        <p :class="body">CardTastic's daily deals give everyone the same shuffle and rank the day's winners. They run on the same game server as HexFleet's online play, with the same hosting and the same handling of your IP address. Nothing is sent until you start a daily deal, and it never asks for an email or a password. The server keeps:</p>
        <ul :class="list">
          <li>Your player profile's name, tag (one emoji or up to three characters), and color</li>
          <li>A random player ID. Your device keeps a signed key that proves the ID is yours: in the app's secure storage, or in your browser's storage for this site</li>
          <li>When you started each daily deal and, if you win it, when you finished, with your moves, time, and score</li>
          <li>The moves of your winning game, which the server replays to check the result</li>
        </ul>
        <p :class="body" class="mt-3">Leaderboards are visible to everyone playing. They show your tag and color with your moves, time, and score, and never your name. Tags are checked against a list of offensive words and emoji. We use this information only to run the leaderboards, and we never sell it. Deleting your online data in CardTastic's Settings removes your player ID and everything you've posted to the boards.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Game Updates</h2>
        <p :class="body">When you open one of the mobile apps, it checks for a game update using Expo's update service. That request includes technical details needed to deliver the right update, such as the app version and platform, and a random installation ID that isn't linked to you. If an update fails to start, the next check also reports which update failed and the error it hit, so a broken update can be fixed. Expo uses these checks to give us totals for each update: how many times it launched, how many launches failed, its crash rate, and how many different installs ran it. We use them to see whether an update is working, and we see only the totals, not individual players. Like any internet request, the check also includes your IP address. It never includes your profiles, progress, or other game data. See <a href="https://expo.dev/privacy" target="_blank" rel="noopener" :class="link">Expo's Privacy Policy</a>.</p>
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
        <p :class="body">The games are made for players of all ages. Played on one device, they collect nothing from anyone. HexFleet's online play and CardTastic's daily leaderboards keep only what's listed above: a name the player picks, which doesn't have to be a real one, and their matches or daily results. Leaderboards show a tag and color, never the name. There's no chat, and neither asks for contact details.</p>
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
import { deleteDataPath } from '~/utils/appLinks'

const UPDATED = 'November 18, 2026'
// The Tastic games, then the online games that aren't one of them (HexFleet), so the policy names every game it covers
const names = [...TASTIC_GAMES.map((g) => g.storeName), ...ONLINE_GAMES.filter((o) => !TASTIC_GAMES.some((g) => g.slug === o.slug)).map((o) => o.name)]
const storeNames = `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`

const section = 'mb-8'
const heading = 'text-lg font-semibold text-white mb-3'
const list = 'list-disc list-outside ml-5 mt-3 space-y-1.5 text-sm text-zinc-400 leading-relaxed'

usePageSeo({
  path: '/privacy',
  title: `${SITE.name} | Privacy Policy`,
  description: `The privacy policy for ${SITE.company.name}'s games and this site. No sign-in, ads or tracking, and what you save in a game stays on your device, apart from what online play and daily leaderboards need.`
})
</script>
