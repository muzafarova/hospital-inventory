<template>
  <LayoutLogin
    :username="authStore.account.username"
    :password="authStore.account.password"
    hint="admin"
    @update:username="(value) => (authStore.account.username = value)"
    @update:password="(value) => (authStore.account.password = value)"
    @submit="authStore.login"
  >
  </LayoutLogin>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import LayoutLogin from '@/components/LayoutLogin.vue'

const authStore = useAuthStore()
</script>
