<template>
  <div>
    <!-- Header -->
    <header>
      <p v-if="authStore.user">
        Welcome, {{ authStore.user.username }} | Hospital ID:
        {{ authStore.user.hospitalId }}
      </p>
      <button @click="authStore.logout">Logout</button>
    </header>

    <!-- Main Content -->
    <main>
      <br />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
