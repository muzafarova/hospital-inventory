<template>
  <button
    :type="type"
    :class="{
      'inline-flex cursor-pointer items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:outline-none': true,
      'font-medium transition': variant !== 'inline',
      'rounded-md px-3 py-2 text-sm shadow-sm': size === 'base' && variant !== 'inline',
      'rounded-lg px-4 py-3 text-lg shadow-md': size === 'large' && variant !== 'inline',
      'rounded-sm px-2 py-1 text-sm shadow-sm': size === 'small' && variant !== 'inline',
      'rounded-xs px-2 py-0.5 text-xs shadow-xs': size === 'xs' && variant !== 'inline',
      'bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white':
        variant === 'accent',
      'border border-gray-200 bg-white text-gray-800 hover:border-gray-300 dark:border-gray-700/60 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600':
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
    type?: "button" | "submit" | "reset";
    /** label of the button */
    size?: "xs" | "small" | "base" | "large";
    /** semantic variant */
    variant?: "accent" | "default" | "danger" | "inline";
  }>(),
  {
    type: "button",
    size: "base",
    variant: "default",
  },
);
</script>
