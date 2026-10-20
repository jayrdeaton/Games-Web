<template>
  <a v-if="links.appStore" :href="links.appStore" target="_blank" rel="noopener" :class="secondaryButton">App Store</a>
  <a v-if="links.googlePlay" :href="links.googlePlay" target="_blank" rel="noopener" :class="secondaryButton">Google Play</a>
</template>

<script setup lang="ts">
import type { StoreLinks } from '~/constants/site'
import { secondaryButton } from '~/constants/styles'

defineProps<{ links: StoreLinks }>()
</script>
