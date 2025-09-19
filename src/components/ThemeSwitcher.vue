<template>
  <AppDropdown label="Theme">
    <template #button="{ dropdownOpen }">
      <span
        class="flex items-center space-x-2 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
      >
        <!-- Theme Icon -->
        <SunIcon v-if="themeStore.theme === 'light'" />
        <MoonIcon v-else-if="themeStore.theme === 'dark'" />
        <SystemIcon v-else-if="themeStore.theme === 'system'" />

        <!-- Dropdown Arrow -->
        <DropdownArrow :isOpen="dropdownOpen" />
      </span>
    </template>

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
  </AppDropdown>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

import AppDropdown from '@/components/AppDropdown.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SystemIcon from '@/components/icons/SystemIcon.vue'
import DropdownArrow from '@/components/icons/DropdownArrow.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'

const themeStore = useThemeStore()
</script>
