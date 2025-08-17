import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { useInventoryStore } from '@/stores/inventory'
import { useErrorStore } from '@/stores/error'
import { deleteInventory } from '@/api/endpoints'

export const useInventoryUpdateStore = defineStore('inventory-update', () => {
  const authStore = useAuthStore()
  const inventoryStore = useInventoryStore()
  const errorStore = useErrorStore()

  // State
  const hospitalId = computed(() => authStore.user?.hospitalId)
  const { isLoading: loading, executeImmediate: deleteProducts } = useAsyncState(
    async (hospitalId, ids) => await deleteInventory(hospitalId, ids),
    null,
    {
      immediate: false,
      onError: (err) => errorStore.report(err, 'Failed to remove inventory'),
      onSuccess: async () => await inventoryStore.loadData(),
    },
  )

  // Actions
  async function removeProduct(id: string) {
    if (!id) {
      return
    }
    if (!hospitalId.value) {
      return
    }
    console.log('🚚 removing inventory item', id)
    await deleteProducts(hospitalId.value, [id])
  }

  async function bulkRemoveProducts(ids: string[]) {
    if (!Array.isArray(ids)) {
      return
    }
    if (!hospitalId.value) {
      return
    }
    console.log('🚚 mass-removing inventory', [...ids])
    await deleteProducts(hospitalId.value, ids)
  }

  // Public interface
  return { loading, removeProduct, bulkRemoveProducts }
})
