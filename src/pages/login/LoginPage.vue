<template>
  <LayoutLogin title="Hospital Inventory" :hint="hint">
    <form @submit.prevent="authStore.login">
      <div class="space-y-4">
        <BaseInput
          v-model="authStore.credentials.username"
          label="Username"
          id="username"
          required
        />
        <BaseInput
          v-model="authStore.credentials.password"
          label="Password"
          id="password"
          required
          :type="showPassword ? 'text' : 'password'"
          class="pr-9 relative"
        >
          <div class="absolute z-10 inset-0 left-auto flex items-center">
            <ShowPasswordToggle :show="showPassword" @click="showPassword = !showPassword" />
          </div>
        </BaseInput>
      </div>
      <div class="flex items-center justify-between mt-6">
        <router-link class="mr-1 text-sm underline hover:no-underline" to="/reset-password">
          Forgot Password?
        </router-link>
        <BaseButton type="submit" variant="accent">Sign In</BaseButton>
      </div>
    </form>
  </LayoutLogin>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

import LayoutLogin from '@/components/LayoutLogin.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ShowPasswordToggle from './ShowPasswordToggle.vue'

import { userCredentials } from '@/mocks/data.ts'

const authStore = useAuthStore()

const hint = computed(() => {
  const hints: string[] = []
  for (const username in userCredentials) {
    hints.push(`${username}:${userCredentials[username]}`)
  }
  return 'Credentials: ' + hints.join('; ')
})

const showPassword = ref(false)
</script>
