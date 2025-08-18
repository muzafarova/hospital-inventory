import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InventoryConfig } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { getInventoryConfig } from '@/api/endpoints'
import { useErrorStore } from '@/stores/error'

export const useInventorySpecStore = defineStore('inventory-spec', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // State
  const data = ref<InventoryConfig | null>(null)
  const loading = ref(false)
  const hospitalId = computed(() => authStore.user?.hospitalId)

  // Actions
  async function loadData() {
    if (!hospitalId.value) {
      return
    }
    console.log('🚚 fetch inventory configuration for', hospitalId.value)
    loading.value = true
    errorStore.clear()
    try {
      const response = await getInventoryConfig(hospitalId.value)

      if (response.success) {
        data.value = response.data
      } else {
        throw new Error(response.error || 'Failed to fetch inventory configuration')
      }
    } catch (err) {
      errorStore.report(err, 'Failed to fetch inventory configuration')
    } finally {
      loading.value = false
    }
  }

  // Public interface
  return { data, loading, loadData }
})
