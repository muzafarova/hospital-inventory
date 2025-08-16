import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { InventoryConfig } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import { getInventoryConfig } from '@/api/endpoints'

export const useInventorySpecStore = defineStore('inventory-spec', () => {
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()

  // State
  const data = ref<InventoryConfig | null>(null)
  const error = ref<string>('')
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)

  // Actions
  async function loadData() {
    if (!hospitalId.value) {
      return
    }
    console.log('🚚 fetch inventory configuration for', hospitalId.value)
    loading.value = true
    error.value = ''
    try {
      const response = await getInventoryConfig(hospitalId.value)

      if (response.success) {
        data.value = response.data
      } else {
        throw new Error(response.error || 'Failed to fetch inventory configuration')
      }
    } catch (err) {
      error.value = 'Failed to fetch inventory configuration'
      console.error('Inventory config fetch error: ', err instanceof Error ? err.message : err)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() =>
    error.value ? notificationStore.add(error.value, 'error') : notificationStore.clear(),
  )

  // Public interface
  return { data, error, loading, loadData }
})
