import { ref, readonly, computed } from 'vue'
import { defineStore } from 'pinia'

import User from '@/entities/user'
import { checkSession, loginUser, logoutUser } from '@/api/endpoints'
import { useErrorStore } from './error'

export const useSessionStore = defineStore('session', () => {
  const errorStore = useErrorStore()

  // State
  const user = ref<User | null>(null)
  const loading = ref(false)
  const authenticated = computed(() => user.value !== null)

  // Actions
  const setUser = (newUser: User | null) => (user.value = newUser)
  const getHospitalId = () => user.value?.hospitalId

  async function login(credentials: { username: string; password: string }) {
    console.info('🗃️ Login as', credentials.username)
    loading.value = true
    errorStore.clear()
    try {
      user.value = await loginUser(credentials)
    } catch (err) {
      errorStore.report(err, 'Failed to login')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function checkAuth() {
    loading.value = true
    try {
      user.value = await checkSession()
    } catch {
      console.warn('Session not found')
      user.value = null
    } finally {
      loading.value = false
    }
  }

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
    authenticated: readonly(authenticated),
    setUser,
    getHospitalId,
    checkAuth,
    login,
    logout,
  }
})
