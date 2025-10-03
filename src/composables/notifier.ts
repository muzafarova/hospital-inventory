import { ref } from "vue";

const notifications = ref<string[]>([]);

export function useNotifier(errorReporter: (err: unknown) => void = console.error) {
  function reportError(err: unknown, displayMessage: string) {
    errorReporter(err);
    notifications.value.push(displayMessage);
  }

  function clearErrors() {
    notifications.value = [];
  }

  return { reportError, clearErrors, notifications };
}
