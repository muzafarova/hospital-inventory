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
        <div class="flex">
          <h1 class="font-semibold">{{ hospitalStore.data?.name || "Hospital Inventory" }}</h1>
        </div>

        <!-- Header: Right side -->
        <div v-if="sessionStore.user" class="flex items-center space-x-3">
          <!-- Theme Switcher -->
          <ThemeSwitcher />

          <!-- Divider -->
          <hr class="h-6 w-px border-none bg-gray-200 dark:bg-gray-700/60" />
          <AppProfile
            align="right"
            :username="sessionStore.user.username"
            :name="sessionStore.user.name"
            :email="sessionStore.user.email"
            :image="sessionStore.user.image"
            @logout="handleLogout"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { useHospitalStore } from "@/stores/hospital";

import AppProfile from "./AppProfile.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const hospitalStore = useHospitalStore();
const sessionStore = useSessionStore();
const router = useRouter();

async function handleLogout() {
  await sessionStore.logout();
  await router.push({ name: "login" });
}
</script>
