<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <nav
      v-if="total > count"
      class="mb-4 sm:mb-0 sm:order-1"
      role="navigation"
      aria-label="Navigation"
    >
      <ul class="flex justify-center">
        <li class="ml-3 first:ml-0">
          <span
            class="btn btn-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600"
            >&lt;- Previous</span
          >
        </li>
        <li class="ml-3 first:ml-0">
          <a
            class="btn btn-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
            href="#0"
            >Next -&gt;</a
          >
        </li>
      </ul>
    </nav>
    <div class="text-sm text-gray-500 text-center sm:text-left">
      Showing <span class="font-medium text-gray-600 dark:text-gray-300">1</span> to
      <span class="font-medium text-gray-600 dark:text-gray-300">{{ count }}</span> of
      <span class="font-medium text-gray-600 dark:text-gray-300">{{ total }}</span> results
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ total: number; count: number }>()
</script>
