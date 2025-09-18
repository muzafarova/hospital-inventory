<template>
  <div ref="themeSwitcher" class="relative">
    <!-- Theme Switcher Button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      <!-- Theme Icon -->
      <SunIcon v-if="themeStore.theme === 'light'" />
      <MoonIcon v-else-if="themeStore.theme === 'dark'" />
      <SystemIcon v-else-if="themeStore.theme === 'system'" />

      <!-- Dropdown Arrow -->
      <DropdownArrow :isOpen="isOpen" />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
        role="menu"
        aria-orientation="vertical"
      >
        <button
          @click="themeStore.setTheme('light')"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{
            'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300':
              themeStore.theme === 'light',
          }"
          role="menuitem"
        >
          <SunIcon class="mr-3" />
          Light
          <CheckIcon v-if="themeStore.theme === 'light'" class="ml-auto" />
        </button>

        <button
          @click="themeStore.setTheme('dark')"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{
            'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300':
              themeStore.theme === 'dark',
          }"
          role="menuitem"
        >
          <MoonIcon class="mr-3" />
          Dark
          <CheckIcon v-if="themeStore.theme === 'dark'" class="ml-auto" />
        </button>

        <button
          @click="themeStore.setTheme('system')"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{
            'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300':
              themeStore.theme === 'system',
          }"
          role="menuitem"
        >
          <SystemIcon class="mr-3" />
          System
          <CheckIcon v-if="themeStore.theme === 'system'" class="ml-auto" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

import { useThemeStore } from '@/stores/theme'

import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SystemIcon from '@/components/icons/SystemIcon.vue'
import DropdownArrow from '@/components/icons/DropdownArrow.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'

const themeStore = useThemeStore()
const isOpen = ref(false)
const themeSwitcher = ref<HTMLElement | null>(null)

onClickOutside(themeSwitcher, () => (isOpen.value = false))
</script>
