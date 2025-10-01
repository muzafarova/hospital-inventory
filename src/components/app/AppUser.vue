<template>
  <AppUserProfile
    v-if="sessionStore.user"
    align="right"
    :username="sessionStore.user.username"
    :name="sessionStore.user.name"
    :email="sessionStore.user.email"
    :image="sessionStore.user.image"
    @logout="
      async () => {
        await sessionStore.logout();
        await router.push({ name: 'login' });
      }
    "
  />
</template>

<script setup lang="ts">
import AppUserProfile from "./AppUserProfile.vue";

import { useSessionStore } from "@/stores/session";
import { useRouter } from "vue-router";

const sessionStore = useSessionStore();
const router = useRouter();
</script>
