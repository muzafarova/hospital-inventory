<template>
  <NotFoundLayout>
    <div class="mb-6">Hmm...this page doesn't exist. Try searching for something else!</div>
    <router-link
      to="/"
      class="px-3 py-2 font-medium text-sm inline-flex items-center justify-center border border-transparent rounded-lg leading-5 shadow-sm transition bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
      >Back To Dashboard</router-link
    >
  </NotFoundLayout>
</template>

<script setup lang="ts">
import NotFoundLayout from '@/pages/not-found/NotFoundLayout.vue'
</script>
