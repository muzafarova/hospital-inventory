import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NotificationType } from '@/types'

export const useINotificationStore = defineStore('notification', () => {
  const notifications = ref<[string, NotificationType][]>([])

  function add(message: string, type: NotificationType = 'info') {
    notifications.value.push([message, type])
  }

  function clear() {
    notifications.value = []
  }

  return { notifications, add, clear }
})
