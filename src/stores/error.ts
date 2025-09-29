import { ref } from "vue";
import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", () => {
  // State
  const notifications = ref<string[]>([]);

  // Actions
  function report(err: unknown, displayMessage: string) {
    console.error(err);
    notifications.value.push(displayMessage);
  }

  function clear() {
    notifications.value = [];
  }

  // Interface
  return { report, clear, notifications };
});
