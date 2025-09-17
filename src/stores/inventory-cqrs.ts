// CQRS-based Inventory Store
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import { 
  CreateProductCommandHandler,
  UpdateProductCommandHandler, 
  DeleteProductsCommandHandler,
  type CreateProductCommand,
  type UpdateProductCommand,
  type DeleteProductsCommand
} from '@/commands/ProductCommands'

import {
  ProductListQueryHandler,
  ProductStatsQueryHandler,
  type ProductListQuery,
  type ProductStatsQuery
} from '@/queries/ProductQueries'

import { useErrorStore } from '@/stores/error'
import { useAuthStore } from '@/stores/auth'

export const useInventoryCQRSStore = defineStore('inventory-cqrs', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // Command Handlers
  const createProductHandler = new CreateProductCommandHandler(/* dependencies */)
  const updateProductHandler = new UpdateProductCommandHandler(/* dependencies */)
  const deleteProductsHandler = new DeleteProductsCommandHandler(/* dependencies */)

  // Query Handlers
  const productListHandler = new ProductListQueryHandler(/* dependencies */)
  const productStatsHandler = new ProductStatsQueryHandler(/* dependencies */)

  // Query State (Read-only)
  const currentQuery = ref<ProductListQuery>({
    hospitalId: '',
    filters: { limit: 100, offset: 0 },
    sorting: { field: 'name', direction: 'asc' }
  })

  const {
    state: productList,
    isLoading: loadingProducts,
    executeImmediate: executeProductListQuery,
  } = useAsyncState(
    async () => {
      if (!currentQuery.value.hospitalId) return null
      return await productListHandler.handle(currentQuery.value)
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to load products'),
    }
  )

  const {
    state: productStats,
    isLoading: loadingStats,
    executeImmediate: executeStatsQuery,
  } = useAsyncState(
    async () => {
      if (!currentQuery.value.hospitalId) return null
      return await productStatsHandler.handle({
        hospitalId: currentQuery.value.hospitalId,
        filters: currentQuery.value.filters
      })
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to load product stats'),
    }
  )

  // Command State (Write operations)
  const {
    isLoading: creating,
    executeImmediate: executeCreateCommand,
  } = useAsyncState(
    async (command: CreateProductCommand) => {
      await createProductHandler.handle(command)
      // Refresh queries after successful command
      await Promise.all([
        executeProductListQuery(),
        executeStatsQuery()
      ])
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to create product'),
    }
  )

  const {
    isLoading: updating,
    executeImmediate: executeUpdateCommand,
  } = useAsyncState(
    async (command: UpdateProductCommand) => {
      await updateProductHandler.handle(command)
      // Refresh queries after successful command
      await Promise.all([
        executeProductListQuery(),
        executeStatsQuery()
      ])
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to update product'),
    }
  )

  const {
    isLoading: deleting,
    executeImmediate: executeDeleteCommand,
  } = useAsyncState(
    async (command: DeleteProductsCommand) => {
      await deleteProductsHandler.handle(command)
      // Refresh queries after successful command
      await Promise.all([
        executeProductListQuery(),
        executeStatsQuery()
      ])
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to delete products'),
    }
  )

  // Computed properties
  const isLoading = computed(() => 
    loadingProducts.value || loadingStats.value || creating.value || updating.value || deleting.value
  )

  // Actions
  async function loadProducts(filters: Partial<ProductListQuery['filters']>) {
    if (!authStore.hospitalId) return
    
    currentQuery.value = {
      ...currentQuery.value,
      hospitalId: authStore.hospitalId,
      filters: { ...currentQuery.value.filters, ...filters }
    }
    
    await executeProductListQuery()
  }

  async function loadStats(filters: Partial<ProductStatsQuery['filters']>) {
    if (!authStore.hospitalId) return
    
    await executeStatsQuery()
  }

  async function createProduct(productData: CreateProductCommand['product']) {
    if (!authStore.hospitalId) return
    
    await executeCreateCommand({
      hospitalId: authStore.hospitalId,
      product: productData
    })
  }

  async function updateProduct(productId: string, productData: UpdateProductCommand['product']) {
    if (!authStore.hospitalId) return
    
    await executeUpdateCommand({
      hospitalId: authStore.hospitalId,
      productId,
      product: productData
    })
  }

  async function deleteProducts(productIds: string[]) {
    if (!authStore.hospitalId) return
    
    await executeDeleteCommand({
      hospitalId: authStore.hospitalId,
      productIds
    })
  }

  return {
    // State
    productList,
    productStats,
    isLoading,
    creating,
    updating,
    deleting,
    
    // Actions
    loadProducts,
    loadStats,
    createProduct,
    updateProduct,
    deleteProducts,
  }
})