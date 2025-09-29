import { defineStore } from "pinia";
import { useAsyncState } from "@vueuse/core";

import { useErrorStore } from "@/stores/error";
import { getHospital } from "@/api/endpoints";
import { useAuth } from "@/composables/auth";

export const useHospitalStore = defineStore("hospital", () => {
  const errorStore = useErrorStore();

  // State
  const {
    state: data,
    isLoading: loading,
    executeImmediate: loadData,
  } = useAsyncState(
    async () => {
      errorStore.clear();
      console.log("🚚 fetching hospital info");
      return useAuth(getHospital);
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, "Failed to fetch hospital"),
    },
  );

  // Interface
  return { data, loading, loadData };
});
