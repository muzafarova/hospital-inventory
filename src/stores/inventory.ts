import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductColumnKey } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useINotificationStore } from '@/stores/notification'

// TODO temp solution
let loadingThrows = true
const mockInventory = {
  products: [
    {
      id: 'product-1',
      name: 'Product name',
      category: 'Equipment',
      manufacturer: 'Tools LLC',
      quantity: 10,
    },
  ],
  meta: {
    limit: 100,
    offset: 0,
    total: 1,
  },
}

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()
  const notificationStore = useINotificationStore()

  // State
  const data = ref<{
    products: Product[]
    meta: {
      total: number
      offset: number
      limit: number
    }
  } | null>(null)

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
      data.value = await new Promise((resolve, reject) =>
        setTimeout(() => (loadingThrows ? reject('Hiccup') : resolve(mockInventory)), 1000),
      )
    } catch (err) {
      loadingThrows = !loadingThrows
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
