import { readonly, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncState } from '@vueuse/core'

import { useErrorStore } from './error'
import { checkSession, loginUser, logoutUser } from '@/api/endpoints'
import User from '@/entities/user'

export const useSessionStore = defineStore('session', () => {
  const errorStore = useErrorStore()

  // State
  const authenticated = computed(() => user.value !== null)

  // Actions
  const setUser = (newUser: User | null) => (user.value = newUser)
  const getHospitalId = () => user.value?.hospitalId

  const {
    state: user,
    isLoading: loading,
    executeImmediate: login,
  } = useAsyncState(
    async (credentials: { username: string; password: string }) => {
      console.info('🗃️ Login as', credentials.username)
      errorStore.clear()
      return await loginUser(credentials)
    },
    null,
    {
      immediate: false,
      onError: (err: unknown) => errorStore.report(err, 'Failed to login'),
    },
  )

  const { isLoading: checking, executeImmediate: checkAuth } = useAsyncState(
    async () => {
      console.info('🗃️ Checking session')
      return await checkSession()
    },
    null,
    {
      immediate: false,
      onSuccess: (data: User | null) => {
        user.value = data
      },
      onError: () => {
        console.warn('Session not found')
        user.value = null
      },
    },
  )

  async function logout() {
    if (!user.value) {
      return
    }

    try {
      await logoutUser()
      user.value = null
    } catch (err) {
      errorStore.report(err, 'Failed to logout')
    }
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    checking: readonly(checking),
    authenticated: readonly(authenticated),
    getHospitalId,
    setUser,
    login,
    logout,
    checkAuth,
  }
})
