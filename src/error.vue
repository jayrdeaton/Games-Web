<template>
  <div class="min-h-dvh bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex items-center justify-center px-6">
    <main class="text-center">
      <p class="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{{ error.statusCode }}</p>
      <h1 class="text-2xl font-bold tracking-tight mb-3">{{ error.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}</h1>
      <p class="text-gray-500 dark:text-zinc-400 mb-8">{{ error.statusCode === 404 ? "That page doesn't exist." : error.statusMessage }}</p>
      <button :class="primaryButton" @click="clearError({ redirect: '/' })">Home</button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { primaryButton } from '~/constants/styles'

defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
</script>
