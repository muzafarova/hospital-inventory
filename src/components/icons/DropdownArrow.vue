<template>
  <svg
    class="size-3 transition-transform"
    :class="{ 'rotate-180': isOpen }"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
</script>
