<template>
  <!-- A plain link to the tip page, never an embedded widget: a widget would load the payment platform's scripts here,
       and the privacy policy says the site doesn't track anyone -->
  <section id="tip" :class="card" class="text-center">
    <h2 class="text-lg font-semibold mb-1">Enjoying the Games?</h2>
    <p :class="body" class="mb-4">They're free, with no ads and no tracking. If you'd like to say thanks, you can leave a tip.</p>
    <a :href="url" target="_blank" rel="noopener" :class="primaryButton">Tip</a>
  </section>
</template>

<script setup lang="ts">
import { body, card, primaryButton } from '~/constants/styles'

defineProps<{ url: string }>()
</script>
