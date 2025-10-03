import { useErrorStore } from "@/stores/error";
import { useAsyncState } from "@vueuse/core";

export function useApi<T, Args extends unknown[] = []>(
  promise: (...args: Args) => Promise<T>,
  {
    defaultData = null,
    errorMessage = "Failed to load data",
    resetOnExecute = true,
    onSuccess = (data: T) => data,
    onError,
  }: {
    defaultData?: T | null;
    errorMessage?: string;
    resetOnExecute?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (err: unknown) => void;
  },
) {
  const errorStore = useErrorStore();

  return useAsyncState(
    async (...args: Args) => {
      setTimeout(() => errorStore.clear(), 10000);
      return promise(...args);
    },
    defaultData as T,
    {
      immediate: false,
      resetOnExecute,
      onSuccess: (data: T) => onSuccess(data),
      onError: (err: unknown) => (onError ? onError(err) : errorStore.report(err, errorMessage)),
    },
  );
}
