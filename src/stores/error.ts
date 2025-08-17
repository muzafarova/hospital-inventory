import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  // State
  // const error = ref<string>('')
  const notifications = ref<string[]>([])

  // Actions
  // function addMessage(message: string) {
  //   notifications.value.push(message)
  // }

  function report(err: unknown, displayMessage: string) {
    console.error(err)
    // error.value = displayMessage
    notifications.value.push(displayMessage)
  }

  function clear() {
    // error.value = ''
    notifications.value = []
  }

  // watchEffect(() => addMessage(error.value))

  // Public interface
  return { report, clear, notifications }
})
