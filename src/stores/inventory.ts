import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { ProductColumnKey, InventoryData } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useINotificationStore } from '@/stores/notification'
import { getInventory } from '@/api/endpoints'

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()
  const notificationStore = useINotificationStore()

  // State
  const data = ref<InventoryData | null>(null)

  const error = ref<string>('')
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)

  // TODO extract to a sepatate store
  const tableColumns = ref<[ProductColumnKey, string][]>([
    ['name', 'Product Name'],
    ['manufacturer', 'Manufacturer'],
    ['category', 'Canufacturer'],
    ['quantity', 'Quantity'],
    ['price', 'Price'],
    ['expiresAt', 'Expiry Date'],
  ])

  // Actions
  async function loadData() {
    if (!hospitalId.value) {
      return
    }

    console.log('🚚 fetch inventory for', hospitalId.value)
    loading.value = true
    error.value = ''
    try {
      const response = await getInventory({
        hospitalId: hospitalId.value,
        offset: data.value?.meta.offset || 0,
        limit: data.value?.meta.limit || 10,
      })

      if (response.success) {
        data.value = response.data
      } else {
        throw new Error(response.error || 'Login failed')
      }
    } catch (err) {
      error.value = 'Failed to fetch inventory'
      console.error('Inventory fetch error: ', err instanceof Error ? err.message : err)
    } finally {
      loading.value = false
    }
  }

  async function reset() {
    data.value = null
    error.value = ''
  }

  watchEffect(() =>
    error.value ? notificationStore.add(error.value, 'error') : notificationStore.clear(),
  )

  // Public interface
  return { data, loading, error, tableColumns, loadData, reset }
})
