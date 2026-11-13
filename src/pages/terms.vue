<template>
  <!-- A reading column, like www's legal pages; the home page is the wide one -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
    <div class="mb-6">
      <NuxtLink to="/" :class="backLink"
        ><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> All Games</NuxtLink
      >
    </div>

    <article :class="card" class="sm:p-8">
      <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Terms of Use</h1>
      <p class="text-sm text-zinc-500 mb-8">Last updated {{ UPDATED }}</p>

      <section :class="section">
        <p :class="body">These terms cover the Tastic games made by {{ COMPANY }} on iPhone, iPad, Android, and the web, and this website, games.infinitetoken.com, including its 6502 cartridge pages. Every game is on the <NuxtLink to="/" :class="link">home page</NuxtLink>.</p>
        <p v-if="MORE_TO_PLAY.length" :class="body" class="mt-3">
          The apps under <NuxtLink to="/#more" :class="link">{{ moreLabel }}</NuxtLink> live on their own sites and aren't covered here.
        </p>
        <p :class="body" class="mt-3">By playing the games or using this site, you agree to these terms.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">What the Games Are</h2>
        <p :class="body">The games are free. They have no ads, no accounts or sign-in, and nothing to buy. Player profiles, progress, stats, and settings are saved on your device, not with us. The <NuxtLink to="/privacy" :class="link">privacy policy</NuxtLink> explains the little that does leave your device, such as the mobile apps' check for game updates.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Playing the Games</h2>
        <p :class="body">The games are for personal play, on your own or with the people around you. Don't use them or this site to break the law, or to disrupt the site for other players.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Open Source</h2>
        <p :class="body">Every game's source code is on GitHub under the MIT License, linked from its card on the home page. That license, not these terms, sets what you can do with the code: use it, change it, and share it, in your own projects too, as long as its copyright and license notice go with it.</p>
        <p :class="body" class="mt-3">The license covers the code only. Each game's name, logo, and icons, and its original artwork and audio, aren't covered by it and remain all rights reserved. If you build on a game, give your version its own name and look. Material a game uses from other people, such as fonts and card artwork, stays under its own license.</p>
        <p :class="body" class="mt-3">The 6502 cartridges, and {{ EMULATOR.author }}'s {{ EMULATOR.name }} they run in, are open source under the MIT License too, each in its own repository on GitHub.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Updates</h2>
        <p :class="body">We may change, update, or stop offering any game, or this site, at any time. The iPhone, iPad, and Android apps also update themselves between store releases: they check for an update when you open them, download it in the background, and switch to it after a restart.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">No Warranty</h2>
        <p :class="body">The games and this site are provided as is, without warranty of any kind, express or implied. We don't promise they'll be free of bugs, always available, or suited to any particular purpose. If something breaks, <NuxtLink to="/support" :class="link">tell us</NuxtLink> and we'll try to fix it.</p>
        <p :class="body" class="mt-3">Your progress is saved only on your device, so if it's lost, for example when a game is deleted or your browser data is cleared, we can't restore it.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Limitation of Liability</h2>
        <p :class="body">To the fullest extent the law allows, {{ COMPANY }} isn't liable for any indirect, incidental, special, or consequential damages from using the games or this site, or from being unable to, including lost progress. Our total liability for any claim about them is limited to $50.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">App Store and Google Play</h2>
        <p :class="body">If you download a game from the App Store, Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener" :class="link">Licensed Application End User License Agreement</a> also applies. If you download one from Google Play, the <a href="https://play.google.com/about/play-terms/" target="_blank" rel="noopener" :class="link">Google Play Terms of Service</a> also apply. Support for the games comes from us, not from Apple or Google.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Governing Law</h2>
        <p :class="body">These terms are governed by the laws of the State of Nebraska, in the United States.</p>
      </section>

      <section :class="section">
        <h2 :class="heading">Changes</h2>
        <p :class="body">If these terms change, the new version will be posted here with a new date at the top. Playing the games after that means you accept the new version.</p>
      </section>

      <section>
        <h2 :class="heading">Contact</h2>
        <p :class="body">
          Questions about these terms? Email <a :href="`mailto:${SITE.email}`" :class="link">{{ SITE.email }}</a>.
        </p>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { EMULATOR, MORE_TO_PLAY, SECTIONS, SITE } from '~/constants/site'
import { backLink, body, card, link } from '~/constants/styles'

const UPDATED = 'November 12, 2026'
// The legal name, as in the footer and every game's LICENSE
const COMPANY = `${SITE.company.name} LLC`
const moreLabel = SECTIONS.find((s) => s.id === 'more')!.label

const section = 'mb-8'
const heading = 'text-lg font-semibold text-white mb-3'

usePageSeo({
  path: '/terms',
  title: `${SITE.name} | Terms of Use`,
  description: `The terms of use for ${SITE.company.name}'s games and this site. The games are free and open source, with no ads, no accounts and nothing to buy.`
})
</script>
