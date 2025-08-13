<template>
  <LayoutLogin
    :username="authStore.account.username"
    :password="authStore.account.password"
    :error="authStore.error"
    hint="admin"
    @update:username="(value) => (authStore.account.username = value)"
    @update:password="(value) => (authStore.account.password = value)"
    @submit="authStore.login"
  />

  <form v-if="false" @submit.prevent="authStore.login">
    <div>
      <div>
        <label for="username" class="sr-only">Username</label>
        <input
          id="username"
          v-model="authStore.account.username"
          name="username"
          type="text"
          required
          placeholder="Username"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          v-model="authStore.account.password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          required
          placeholder="Password"
        />
        <button type="button" @click="showPassword = !showPassword">show password</button>
      </div>
    </div>

    <div v-if="authStore.error">
      {{ authStore.error }}
    </div>

    <div>
      <button
        type="submit"
        :disabled="authStore.loading"
        v-text="authStore.loading ? 'Signing in' : 'Sign in'"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LayoutLogin from '@/components/LayoutLogin.vue'

const authStore = useAuthStore()
const showPassword = ref(false)
</script>
