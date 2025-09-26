import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import {
  getProducts,
  deleteProducts,
  createProduct,
  updateProduct,
  type NewProductSpec,
} from '@/api/endpoints'
import Product from '@/entities/product'

import { useErrorStore } from '@/stores/error'
import { useAuth } from '@/composables/auth'

export const useInventoryStore = defineStore('inventory', () => {
  const errorStore = useErrorStore()

  // State
  const productsQuery = ref<{ limit: number; offset: number; name: string }>({
    limit: 100,
    offset: 0,
    name: '',
  })
  const productsSelection = ref<string[]>([])
  const {
    state: productsList,
    isLoading: loading,
    executeImmediate: listProducts,
  } = useAsyncState(
    async () => {
      errorStore.clear()
      console.log('🚚 fetching inventory', { ...productsQuery.value })
      return useAuth(getProducts, {
        offset: productsQuery.value.offset,
        limit: productsQuery.value.limit,
        name: productsQuery.value.name,
      })
    },
    null,
    {
      immediate: false,
      resetOnExecute: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to load inventory'),
    },
  )

  const { isLoading: removing, executeImmediate: remove } = useAsyncState(
    async (ids: string[]) => useAuth(deleteProducts, ids),
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to remove inventory'),
      onSuccess: async () => await listProducts(),
    },
  )

  const { isLoading: adding, executeImmediate: addProduct } = useAsyncState(
    async (data: NewProductSpec) => useAuth(createProduct, data),
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to add inventory item'),
      onSuccess: async () => await listProducts(),
    },
  )

  const { isLoading: editing, executeImmediate: editProduct } = useAsyncState(
    async (data: Product) => useAuth(updateProduct, data),
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to update inventory item'),
      onSuccess: async () => await listProducts(),
    },
  )

  // Actions
  async function loadProducts({
    limit = 100,
    offset = 0,
    name = '',
  }: {
    limit?: number
    offset?: number
    name?: string
  }) {
    productsQuery.value = { limit, offset, name }
    await listProducts()
  }

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
    adding,
    editing,
    productsList,
    productsSelection,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
    bulkRemoveProducts,
    updateSelection,
    clear,
  }
})
