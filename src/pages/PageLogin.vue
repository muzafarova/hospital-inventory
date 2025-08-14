<template>
  <LayoutLogin
    :username="authStore.account.username"
    :password="authStore.account.password"
    :hint="hint"
    @update:username="(value) => (authStore.account.username = value)"
    @update:password="(value) => (authStore.account.password = value)"
    @submit="authStore.login"
  >
  </LayoutLogin>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LayoutLogin from '@/components/LayoutLogin.vue'
import { userCredentials } from '@/mocks/data.ts'
const authStore = useAuthStore()

const hint = computed(() => {
  const hints: string[] = []
  for (const username in userCredentials) {
    hints.push(`${username}:${userCredentials[username]}`)
  }
  return 'Credentials: ' + hints.join('; ')
})
</script>
