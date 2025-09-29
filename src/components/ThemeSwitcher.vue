<template>
  <AppDropdown label="Theme">
    <template #button="{ dropdownOpen }">
      <span
        class="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <!-- Theme Icon -->
        <SunIcon v-if="theme === 'light'" />
        <MoonIcon v-else-if="theme === 'dark'" />
        <SystemIcon v-else-if="theme === 'system'" />

        <!-- Dropdown Arrow -->
        <DropdownArrow :isOpen="dropdownOpen" />
      </span>
    </template>

    <button
      @click="setTheme('light')"
      class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      :class="{
        'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300':
          theme === 'light',
      }"
      role="menuitem"
    >
      <SunIcon class="mr-3" />
      Light
      <CheckIcon v-if="theme === 'light'" class="ml-auto" />
    </button>

    <button
      @click="setTheme('dark')"
      class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      :class="{
        'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300': theme === 'dark',
      }"
      role="menuitem"
    >
      <MoonIcon class="mr-3" />
      Dark
      <CheckIcon v-if="theme === 'dark'" class="ml-auto" />
    </button>

    <button
      @click="setTheme('system')"
      class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      :class="{
        'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300':
          theme === 'system',
      }"
      role="menuitem"
    >
      <SystemIcon class="mr-3" />
      System
      <CheckIcon v-if="theme === 'system'" class="ml-auto" />
    </button>
  </AppDropdown>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/theme";

import AppDropdown from "@/components/AppDropdown.vue";
import SunIcon from "@/components/icons/SunIcon.vue";
import MoonIcon from "@/components/icons/MoonIcon.vue";
import SystemIcon from "@/components/icons/SystemIcon.vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

const { theme, setTheme } = useTheme();
</script>
