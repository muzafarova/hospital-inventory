import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { getInventory, deleteInventory } from '@/api/endpoints'
import { useErrorStore } from '@/stores/error'

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // State
  const selectedProducts = ref<string[]>([])
  const {
    state: data,
    isLoading: loading,
    executeImmediate: loadProducts,
  } = useAsyncState(
    async (query: { limit?: number; offset?: number }) => {
      const hospitalId = authStore.getHospitalId
      if (!hospitalId) {
        return null
      }

      errorStore.clear()
      console.log('🚚 fetch inventory for', hospitalId)
      return await getInventory({
        hospitalId,
        offset: query.offset || 0,
        limit: query.limit || 100,
      })
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to remove inventory'),
    },
  )
  const productStats = computed(() =>
    data.value
      ? `${data.value.meta.limit * data.value.meta.offset + 1} -
          ${data.value.products.length} of
          ${data.value.meta.total.toLocaleString()}`
      : '',
  )
  const { isLoading: removing, executeImmediate: deleteProducts } = useAsyncState(
    async (ids: string[]) => {
      const hospitalId = authStore.getHospitalId
      if (!hospitalId) {
        return
      }
      await deleteInventory(hospitalId, ids)
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to remove inventory'),
      onSuccess: async () => await loadProducts(),
    },
  )

  // Actions
  async function removeProduct(id: string) {
    if (!id) {
      return
    }
    console.log('🚚 removing inventory item', id)
    await deleteProducts([id])
  }

  async function bulkRemoveProducts(ids: string[]) {
    if (!Array.isArray(ids)) {
      return
    }
    console.log('🚚 mass-removing inventory', [...ids])
    await deleteProducts(ids)
  }

  function clear() {
    data.value = null
  }

  function updateSelection(selected: string[]) {
    selectedProducts.value = selected
  }

  // Interface
  return {
    data,
    loading,
    removing,
    productStats,
    selectedProducts,
    loadProducts,
    removeProduct,
    bulkRemoveProducts,
    updateSelection,
    clear,
  }
})
