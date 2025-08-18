import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Reactive async state composable https://vueuse.org/core/useAsyncState/
import { useAsyncState } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { getInventory, deleteInventory } from '@/api/endpoints'
import { useErrorStore } from '@/stores/error'

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // State
  const productsQuery = ref<{ limit: number; offset: number }>({ limit: 100, offset: 0 })
  const productsSelection = ref<string[]>([])
  const {
    state: productsList,
    isLoading: loading,
    executeImmediate: listProducts,
  } = useAsyncState(
    async () => {
      const hospitalId = authStore.getHospitalId
      if (!hospitalId) {
        return null
      }

      errorStore.clear()
      console.log('🚚 fetching inventory', { ...productsQuery.value })
      return await getInventory({
        hospitalId,
        offset: productsQuery.value.offset,
        limit: productsQuery.value.limit,
      })
    },
    null,
    {
      immediate: false,
      resetOnExecute: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to remove inventory'),
    },
  )
  const productStats = computed(() =>
    productsList.value
      ? `${productsList.value.meta.limit * productsList.value.meta.offset + 1} -
          ${productsList.value.products.length} of
          ${productsList.value.meta.total.toLocaleString()}`
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
      onSuccess: async () => await listProducts(),
    },
  )

  // Actions
  async function loadProducts({ limit = 100, offset = 0 }: { limit?: number; offset?: number }) {
    productsQuery.value = { limit, offset }
    await listProducts()
  }

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
    productsList.value = null
  }

  function updateSelection(selected: string[]) {
    productsSelection.value = selected
  }

  // Interface
  return {
    loading,
    removing,
    productsList,
    productStats,
    productsSelection,
    loadProducts,
    removeProduct,
    bulkRemoveProducts,
    updateSelection,
    clear,
  }
})
