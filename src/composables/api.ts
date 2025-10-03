import { useAsyncState } from "@vueuse/core";
import { useNotification } from "@/composables/notification";

export function useApi<T, Args extends unknown[] = []>(
  promise: (...args: Args) => Promise<T>,
  {
    defaultData = null,
    errorMessage = "Failed to load data",
    resetOnExecute = true,
    onSuccess = (data: T) => data,
    onError,
    errorReporter,
  }: {
    defaultData?: T | null;
    errorMessage?: string;
    resetOnExecute?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (err: unknown) => void;
    errorReporter?: (err: unknown) => void;
  },
) {
  const { reportError, clearErrors } = useNotification(errorReporter);

  return useAsyncState(
    async (...args: Args) => {
      setTimeout(() => clearErrors(), 10000);
      return promise(...args);
    },
    defaultData as T,
    {
      immediate: false,
      resetOnExecute,
      onSuccess: (data: T) => onSuccess(data),
      onError: (err: unknown) => (onError ? onError(err) : reportError(err, errorMessage)),
    },
  );
}
