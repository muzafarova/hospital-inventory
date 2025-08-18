import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { getInventory, deleteInventory } from '@/api/endpoints'
import { useErrorStore } from '@/stores/error'
import type { InventoryData } from '@/types'

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // State
  const data = ref<InventoryData | null>(null)
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)
  const stats = computed(() =>
    data.value
      ? `${data.value.meta.limit * data.value.meta.offset + 1} -
          ${data.value.products.length} of
          ${data.value.meta.total.toLocaleString()})`
      : '',
  )
  const selectedProducts = ref<string[]>([])

  // Actions
  const { isLoading: removing, executeImmediate: deleteProducts } = useAsyncState(
    async (hospitalId: string, ids: string[]) => await deleteInventory(hospitalId, ids),
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to remove inventory'),
      onSuccess: async () => await loadProducts(),
    },
  )

  async function loadProducts() {
    if (!hospitalId.value) {
      return
    }

    console.log('🚚 fetch inventory for', hospitalId.value)
    loading.value = true
    errorStore.clear()
    try {
      const response = await getInventory({
        hospitalId: hospitalId.value,
        offset: data.value?.meta.offset || 0,
        limit: data.value?.meta.limit || 100,
      })

      if (response.success) {
        data.value = response.data
      } else {
        throw new Error(response.error || 'Failed to fetch inventory')
      }
    } catch (err) {
      errorStore.report(err, 'Failed to fetch inventory')
    } finally {
      loading.value = false
    }
  }

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

  function clear() {
    data.value = null
  }

  function updateSelection(selected: string[]) {
    selectedProducts.value = selected
  }

  // Public interface
  return {
    data,
    loading,
    removing,
    stats,
    selectedProducts,
    loadProducts,
    removeProduct,
    bulkRemoveProducts,
    updateSelection,
    clear,
  }
})
