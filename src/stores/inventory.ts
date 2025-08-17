import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { getInventory } from '@/api/endpoints'
import { useErrorStore } from '@/stores/error'
import type { InventoryData } from '@/types'

export const useInventoryStore = defineStore('inventory', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // State
  const data = ref<InventoryData | null>(null)
  // const error = ref<string>('')
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)

  // Actions
  async function loadData() {
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

  function clear() {
    data.value = null
  }

  // Public interface
  return { data, loading, loadData, clear }
})
