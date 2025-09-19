<template>
  <header
    class="sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 text-gray-700 dark:text-gray-300"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-center justify-between h-16"
        :class="'lg:border-b border-gray-200 dark:border-gray-700/60'"
      >
        <!-- Header: Left side -->
        <div class="flex">
          <h1 class="font-semibold">{{ hospitalStore.data?.name || 'Hospital Inventory' }}</h1>
        </div>

        <!-- Header: Right side -->
        <div v-if="authStore.user" class="flex items-center space-x-3">
          <!-- Theme Switcher -->
          <ThemeSwitcher />

          <!-- Divider -->
          <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
          <AppProfile
            align="right"
            :username="authStore.user.username"
            :name="authStore.user.name"
            :email="authStore.user.email"
            :image="authStore.user.image"
            @logout="authStore.logout"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppProfile from './AppProfile.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useAuthStore } from '@/stores/auth'
import { useHospitalStore } from '@/stores/hospital'
const hospitalStore = useHospitalStore()
const authStore = useAuthStore()
</script>
