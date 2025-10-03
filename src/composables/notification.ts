import { ref } from "vue";

const notifications = ref<string[]>([]);

export function useNotification() {
  function reportError(err: unknown, displayMessage: string) {
    console.error(err);
    notifications.value.push(displayMessage);
  }

  function clearErrors() {
    notifications.value = [];
  }

  return { reportError, clearErrors, notifications };
}
