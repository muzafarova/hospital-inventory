<template>
  <LoginLayout title="Hospital Inventory" :hint="authStore.hint">
    <form
      @submit.prevent="
        async () => {
          try {
            await authStore.login();
            await router.push({ path: '/' });
          } catch {}
        }
      "
    >
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
        <BaseButton type="submit" variant="accent" :disabled="authStore.authenticating">
          Sign In
        </BaseButton>
      </div>
    </form>
  </LoginLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

import BaseInput from "@/components/ui/form/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import LoginLayout from "./LoginLayout.vue";
import InputPassword from "./InputPassword.vue";

definePage({
  name: "login",
  meta: {
    requiresGuest: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();
</script>
