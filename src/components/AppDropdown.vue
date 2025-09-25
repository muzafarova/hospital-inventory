<template>
  <div class="relative">
    <button
      aria-haspopup="true"
      :aria-expanded="dropdownOpen"
      :aria-label="label"
      class="inline-flex"
      @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <slot name="button" :dropdownOpen>
        <span
          class="flex items-center space-x-2 p-2 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span>{{ label }}</span>
          <DropdownArrow
            :isOpen="dropdownOpen"
            :toggle="() => (dropdownOpen = !dropdownOpen)"
            class="size-3 ml-2"
          />
        </span>
      </slot>
    </button>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        ref="dropdown"
        v-show="dropdownOpen"
        class="absolute top-full min-w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden mt-2"
        :class="align === 'right' ? 'right-0' : 'left-0'"
        @focusin="dropdownOpen = true"
        @focusout="dropdownOpen = false"
        role="menu"
      >
        <slot :close="() => (dropdownOpen = false)" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import DropdownArrow from '@/components/icons/DropdownArrow.vue'

withDefaults(
  defineProps<{
    /** label of the dropdown */
    label: string
    /** alignment of the dropdown */
    align?: 'right' | 'left'
  }>(),
  {
    align: 'right',
    label: 'Toggle',
  },
)

const dropdownOpen = ref(false)
const dropdown = ref<HTMLElement | null>(null)

onClickOutside(dropdown, () => (dropdownOpen.value = false))

useEventListener(document, 'keydown', ({ code }: KeyboardEvent) => {
  if (!dropdownOpen.value || code !== 'Escape') return
  dropdownOpen.value = false
})
</script>
