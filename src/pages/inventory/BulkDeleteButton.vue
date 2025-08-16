<template>
  <div class="flex items-center">
    <div class="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
      <span>{{ selected.length }}</span> items selected
    </div>
    <button
      @click="$emit('delete', selected)"
      class="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ selected: string[] }>()
defineEmits<{ delete: [value: string[]] }>()
</script>
