import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import User from '@/entities/user'

import { useErrorStore } from '@/stores/error'

import { loginUser, logoutUser, checkSession } from '@/api/endpoints'

export const useAuthStore = defineStore('auth', () => {
  // Store dependencies
  const router = useRouter()
  const errorStore = useErrorStore()

  // State
  const credentials = ref({
    username: '',
    password: '',
  })
  const user = ref<User | null>(null)
  const loading = ref(false)
  const isAuthenticated = computed(() => user.value !== null)
  const hospitalId = computed(() => user.value?.hospitalId)

  // Actions
  async function login() {
    console.info('🗃️ Login as', credentials.value.username)
    loading.value = true
    errorStore.clear()
    try {
      user.value = await loginUser(credentials.value)
      await router.push({ name: 'inventory' })
    } catch (err) {
      errorStore.report(err, 'Failed to login')
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    if (!user.value) {
      return
    }

    loading.value = true
    try {
      await logoutUser()
      user.value = null
      await router.push({ name: 'login' })
    } catch (err) {
      errorStore.report(err, 'Failed to logout')
    } finally {
      loading.value = true
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
      loading.value = true
    }
  }

  // Interface
  return { credentials, user, loading, isAuthenticated, hospitalId, login, logout, checkAuth }
})
