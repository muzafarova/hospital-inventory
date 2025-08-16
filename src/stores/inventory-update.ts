import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import { useInventoryStore } from '@/stores/inventory'
import { deleteInventory } from '@/api/endpoints'

export const useInventoryUpdateStore = defineStore('inventory-update', () => {
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()
  const inventoryStore = useInventoryStore()

  // State
  const error = ref<string>('')
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)

  // Actions
  async function removeProduct(id: string) {
    if (!id) {
      return
    }
    console.log('🚚 removing inventory item', id)
    await remove([id])
  }

  async function bulkRemoveProducts(ids: string[]) {
    if (!Array.isArray(ids)) {
      return
    }

    console.log('🚚 mass-removing inventory', [...ids])
    await remove(ids)
  }

  async function remove(ids: string[]) {
    if (!hospitalId.value) {
      return
    }

    loading.value = true
    error.value = ''
    try {
      await deleteInventory(hospitalId.value, ids)
      await inventoryStore.loadData()
    } catch (err) {
      error.value = 'Failed to remove inventory'
      console.error('Inventory remove error', err)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() =>
    error.value ? notificationStore.add(error.value, 'error') : notificationStore.clear(),
  )

  // Public interface
  return { loading, error, removeProduct, bulkRemoveProducts }
})
