import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { userCredentials } from "../../mocks/data";
import { useSessionStore } from "@/stores/session";

export const useAuthStore = defineStore("auth", () => {
  const sessionStore = useSessionStore();

  // State
  const credentials = ref({
    username: "",
    password: "",
  });
  const authenticating = computed(() => sessionStore.authenticating);
  const hint = computed(() => {
    const hints: string[] = [];
    for (const username in userCredentials) {
      hints.push(`${username}:${userCredentials[username]}`);
    }
    return "Credentials: " + hints.join("; ");
  });

  // Actions
  async function login() {
    await sessionStore.login(credentials.value);
  }

  // Interface
  return {
    credentials,
    hint,
    login,
    authenticating,
  };
});
