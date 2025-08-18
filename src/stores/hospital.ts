import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error'
import { getHospital } from '@/api/endpoints'

export const useHospitalStore = defineStore('hospital', () => {
  const authStore = useAuthStore()
  const errorStore = useErrorStore()

  // State
  const {
    state: data,
    isLoading: loading,
    executeImmediate: loadData,
  } = useAsyncState(
    async () => {
      const hospitalId = authStore.hospitalId
      if (!hospitalId) {
        return null
      }

      errorStore.clear()
      console.log('🚚 fetching hospital info')
      return await getHospital(hospitalId)
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to fetch hospital'),
    },
  )

  // Interface
  return { data, loading, loadData }
})
