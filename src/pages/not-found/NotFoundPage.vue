<template>
  <NotFoundLayout>
    <div class="mb-6">Hmm...this page doesn't exist. Try searching for something else!</div>
    <router-link
      to="/"
      class="inline-flex items-center justify-center rounded-lg border border-transparent bg-gray-900 px-3 py-2 text-sm leading-5 font-medium text-gray-100 shadow-sm transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
      >Back To Dashboard</router-link
    >
  </NotFoundLayout>
</template>

<script setup lang="ts">
import NotFoundLayout from "@/pages/not-found/NotFoundLayout.vue";
</script>
