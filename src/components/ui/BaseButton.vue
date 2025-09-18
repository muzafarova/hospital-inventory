<template>
  <button
    :class="{
      'btn px-2.5': size === 'base' && variant !== 'table',
      'btn-sm px-2': size === 'small',
      ' bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white':
        variant === 'accent',
      'text-sm text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full':
        variant === 'table',
      ' bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-gray-200 hover:border-gray-400 dark:border-gray-700/60 dark:hover:border-gray-600':
        ['default', 'danger'].includes(variant),
      'text-red-600 dark:text-red-300': variant === 'danger',
    }"
  >
    <slot>
      <span v-if="label">{{ label }}</span>
      <span v-else v-text="type" class="capitalized" />
    </slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * button type attribute as in HTML
     */
    type?: string
    /**
     * The label of the button
     */
    label?: string
    /**
     * size of the button
     */
    size?: 'small' | 'base'
    /**
     * semantic variant
     */
    variant?: 'accent' | 'default' | 'danger' | 'table'
  }>(),
  {
    type: 'button',
    size: 'base',
    variant: 'default',
  },
)
</script>
