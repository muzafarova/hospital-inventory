import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { checkSession, loginUser, logoutUser } from "@/api/endpoints";
import User from "@/entities/user";
import { useApi } from "@/composables/api";

export const useSessionStore = defineStore("session", () => {
  const user = ref<User | null>(null);
  const authenticated = computed(() => user.value !== null);

  const setUser = (newUser: User | null) => (user.value = newUser);
  const getHospitalId = () => user.value?.hospitalId;

  // Login
  const { isLoading: authenticating, executeImmediate: login } = useApi<
    User,
    [{ username: string; password: string }]
  >(
    async (credentials: { username: string; password: string }) => {
      console.info("🗃️ Login as", credentials.username);
      return await loginUser(credentials);
    },
    {
      errorMessage: "Failed to login",
      onSuccess: (data: User) => (user.value = data),
    },
  );

  // Check is session already exists
  const { isLoading: checking, executeImmediate: checkAuth } = useApi<User | null>(checkSession, {
    onSuccess: (data: User | null) => (user.value = data),
    onError: () => {
      console.warn("Session not found");
      user.value = null;
    },
  });

  // Logout
  const { executeImmediate: logout } = useApi<void>(logoutUser, {
    onSuccess: () => (user.value = null),
    errorMessage: "Failed to logout",
  });

  return {
    user,
    checking,
    authenticating,
    authenticated,
    getHospitalId,
    setUser,
    login,
    logout,
    checkAuth,
  };
});
