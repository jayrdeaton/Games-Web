<template>
  <p class="text-sm text-zinc-500">
    by <a :href="author.url" target="_blank" rel="noopener" class="hover:text-zinc-300 underline-offset-2 hover:underline transition-colors">{{ author.name }}</a>
  </p>
</template>

<script setup lang="ts">
import type { Author } from '~/constants/site'

defineProps<{ author: Author }>()
</script>
