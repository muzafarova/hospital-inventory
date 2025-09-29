<template>
  <button
    :type="type"
    :class="{
      'cursor-pointer inline-flex items-center justify-center': true,
      'font-medium border border-transparent  transition': variant !== 'inline',
      'px-3 py-2 text-sm rounded-md shadow-sm': size === 'base' && variant !== 'inline',
      'px-4 py-3 text-lg rounded-lg shadow-md': size === 'large' && variant !== 'inline',
      'px-2 py-1 text-sm rounded-sm shadow-sm': size === 'small' && variant !== 'inline',
      'px-2 py-0.5 text-xs rounded-xs shadow-xs': size === 'xs' && variant !== 'inline',
      ' bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white':
        variant === 'accent',
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
    /** button type attribute as in HTML */
    type?: 'button' | 'submit' | 'reset'
    /** label of the button */
    size?: 'xs' | 'small' | 'base' | 'large'
    /** semantic variant */
    variant?: 'accent' | 'default' | 'danger' | 'inline'
  }>(),
  {
    type: 'button',
    size: 'base',
    variant: 'default',
  },
)
</script>
