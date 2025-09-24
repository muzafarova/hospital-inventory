import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import User from '@/entities/user'
import { userCredentials } from '@/mocks/data.ts'

import { useErrorStore } from '@/stores/error'
import { useHospitalStore } from './hospital'
import { loginUser, logoutUser, checkSession } from '@/api/endpoints'

export const useAuthStore = defineStore('auth', () => {
  // Store dependencies
  const errorStore = useErrorStore()
  const hospitalStore = useHospitalStore()

  // State
  const credentials = ref({
    username: '',
    password: '',
  })
  const user = ref<User | null>(null)
  const loading = ref(false)
  const isAuthenticated = computed(() => user.value !== null)
  const hint = computed(() => {
    const hints: string[] = []
    for (const username in userCredentials) {
      hints.push(`${username}:${userCredentials[username]}`)
    }
    return 'Credentials: ' + hints.join('; ')
  })

  // Actions
  const getHospitalId = () => user.value?.hospitalId

  async function login() {
    console.info('🗃️ Login as', credentials.value.username)
    loading.value = true
    errorStore.clear()
    try {
      user.value = await loginUser(credentials.value)
    } catch (err) {
      errorStore.report(err, 'Failed to login')
      throw err
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

  async function checkAuth() {
    loading.value = true
    try {
      user.value = await checkSession()
      await hospitalStore.loadData()
    } catch {
      console.warn('Session not found')
      user.value = null
    } finally {
      loading.value = true
    }
  }

  // Interface
  return {
    credentials,
    user,
    loading,
    isAuthenticated,
    getHospitalId,
    login,
    logout,
    checkAuth,
    hint,
  }
})
