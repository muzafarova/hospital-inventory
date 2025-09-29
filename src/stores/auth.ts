import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { userCredentials } from "@/mocks/data.ts";
import { useSessionStore } from "@/stores/session";

export const useAuthStore = defineStore("auth", () => {
  // State
  const credentials = ref({
    username: "",
    password: "",
  });
  const hint = computed(() => {
    const hints: string[] = [];
    for (const username in userCredentials) {
      hints.push(`${username}:${userCredentials[username]}`);
    }
    return "Credentials: " + hints.join("; ");
  });

  // Actions
  async function login() {
    const sessionStore = useSessionStore();
    await sessionStore.login(credentials.value);
  }

  // Interface
  return {
    credentials,
    hint,
    login,
  };
});
