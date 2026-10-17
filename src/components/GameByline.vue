<template>
  <p class="text-sm text-gray-400 dark:text-zinc-500">
    by <a :href="author.url" target="_blank" rel="noopener" class="hover:text-gray-600 dark:hover:text-zinc-300 underline-offset-2 hover:underline transition-colors">{{ author.name }}</a>
  </p>
</template>

<script setup lang="ts">
import type { Author } from '~/constants/site'

defineProps<{ author: Author }>()
</script>
