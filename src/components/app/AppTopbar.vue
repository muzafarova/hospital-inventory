<template>
  <header
    class="sticky top-0 z-30 text-gray-700 before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md max-lg:before:bg-white/90 dark:text-gray-300 dark:max-lg:before:bg-gray-800/90"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div
        class="flex h-16 items-center justify-between"
        :class="'border-gray-200 lg:border-b dark:border-gray-700/60'"
      >
        <!-- Header: Left side -->
        <AppAccount />

        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          <!-- Theme Switcher -->
          <ThemeSwitcher />

          <!-- Divider -->
          <hr class="h-6 w-px border-none bg-gray-200 dark:bg-gray-700/60" />
          <AppUser />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

import AppUser from "./AppUser.vue";
import AppAccount from "./AppAccount.vue";
</script>
