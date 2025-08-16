<template>
  <button
    class="btn px-2.5"
    :class="{
      'btn-sm': size === 'small',
      ' bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white':
        variant === 'accent',
      ' bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-500 border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600':
        variant === 'default',
    }"
  >
    <slot><span v-text="type" class="capitalized" /></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ type?: string; size?: 'small' | 'base'; variant?: 'accent' | 'default' }>(),
  {
    type: 'button',
    size: 'base',
    variant: 'default',
  },
)
</script>
