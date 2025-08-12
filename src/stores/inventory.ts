import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { useAuthStore } from '@/stores/auth'

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
    skip: 0,
    total: 1,
  },
}

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()

  // State
  const data = ref<{
    products: Product[]
    meta: {
      total: number
      skip: number
      limit: number
    }
  } | null>(null)

  const error = ref<string>('')
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)

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

  // Public interface
  return { data, loading, error, loadData, reset }
})
