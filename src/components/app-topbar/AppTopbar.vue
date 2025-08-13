<template>
  <nav v-if="authStore.user">
    Hospital ID: {{ authStore.user.hospitalId }}
    {{ authStore.user.username }}
    <button @click="authStore.logout">Logout</button>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
