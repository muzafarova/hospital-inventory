<template>
  <button
    :type="type"
    :class="{
      'btn px-2.5': size === 'base' && variant !== 'inline',
      'btn-sm px-2': size === 'small',
      ' bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white':
        variant === 'accent',
      'text-sm text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full':
        variant === 'inline',
      ' bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-gray-200 hover:border-gray-400 dark:border-gray-700/60 dark:hover:border-gray-600':
        ['default', 'danger'].includes(variant),
      'text-red-600 dark:text-red-300': variant === 'danger',
    }"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * button type attribute as in HTML
     */
    type?: 'button' | 'submit' | 'reset'
    /**
     * The label of the button
     */
    size?: 'small' | 'base'
    /**
     * semantic variant
     */
    variant?: 'accent' | 'default' | 'danger' | 'inline'
  }>(),
  {
    type: 'button',
    size: 'base',
    variant: 'default',
  },
)

const accentClass = ''
</script>
