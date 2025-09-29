<template>
  <LoginLayout title="Hospital Inventory" :hint="authStore.hint">
    <form @submit.prevent="handleLogin">
      <div class="space-y-4">
        <BaseInput
          v-model="authStore.credentials.username"
          label="Username"
          id="username"
          required
        />
        <InputPassword
          v-model="authStore.credentials.password"
          label="Password"
          id="password"
          required
        />
      </div>
      <div class="mt-6 flex items-center justify-between">
        <router-link class="mr-1 text-sm underline hover:no-underline" to="/reset-password">
          Forgot Password?
        </router-link>
        <BaseButton type="submit" variant="accent">Sign In</BaseButton>
      </div>
    </form>
  </LoginLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

import LoginLayout from "@/pages/login/LoginLayout.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import InputPassword from "./InputPassword.vue";

const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  try {
    await authStore.login();
    await router.push({ name: "inventory" });
  } catch {}
}
</script>
