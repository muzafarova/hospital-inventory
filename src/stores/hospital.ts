import { defineStore } from "pinia";

import { getHospital } from "@/api/endpoints";
import { useAuth } from "@/composables/auth";
import { useApi } from "@/composables/api";

export const useHospitalStore = defineStore("hospital", () => {
  const {
    state: data,
    isLoading: loading,
    executeImmediate: loadData,
  } = useApi(async () => useAuth(getHospital), { errorMessage: "Failed to fetch hospital" });

  return { data, loading, loadData };
});
