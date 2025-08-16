<template>
  <LayoutLogin title="Hospital Inventory" :hint="hint">
    <form @submit.prevent="authStore.login">
      <div class="space-y-4">
        <BaseInput v-model="authStore.account.username" label="Username" id="username" required />
        <BaseInput
          v-model="authStore.account.password"
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
        <div class="mr-1">
          <router-link class="text-sm underline hover:no-underline" to="/reset-password">
            Forgot Password?
          </router-link>
        </div>
        <BaseButton type="submit" variant="accent">Sign In</BaseButton>
        <!-- class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap ml-3" -->
        <!-- to="/"
        >
          Sign In -->
      </div>
    </form>
  </LayoutLogin>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

import LayoutLogin from '@/components/LayoutLogin.vue'
import BaseInput from '@/components/library/BaseInput.vue'
import BaseButton from '@/components/library/BaseButton.vue'
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
