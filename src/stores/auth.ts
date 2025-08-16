import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { UserCredentials } from '@/types'
import User from '@/entities/user'

import { useInventoryStore } from '@/stores/inventory'
import { useNotificationStore } from '@/stores/notification'
import { loginUser, logoutUser, checkSession } from '@/api/endpoints'

export const useAuthStore = defineStore('auth', () => {
  // Store dependencies
  // TODO decouple
  const router = useRouter()
  const inventorystore = useInventoryStore()
  const notificationStore = useNotificationStore()

  // Reactive state variables
  const account = ref<UserCredentials>({
    username: '',
    password: '',
  })
  const user = ref<User | null>(null)
  const error = ref<string>('')
  const loading = ref(false)
  const isAuthenticated = computed(() => user.value !== null)

  // Actions
  async function login() {
    console.info('🗃️ Login as', account.value.username, account.value.password)

    loading.value = true
    error.value = ''
    try {
      user.value = await loginUser(account.value)
      await router.push({ name: 'inventory' })
    } catch (err) {
      error.value = 'Failed to login.'
      console.error('Login error', err)
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

      await inventorystore.reset()
      await router.push({ name: 'login' })
    } catch (err) {
      error.value = 'Failed to logout'
      console.error('Logout error:', err)
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

  // Notifies user on error
  watchEffect(() =>
    error.value ? notificationStore.add(error.value, 'error') : notificationStore.clear(),
  )

  // Public surface
  return { account, user, loading, error, isAuthenticated, login, logout, checkAuth }
})
