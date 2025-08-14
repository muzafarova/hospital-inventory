import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { User, Account } from '@/types'
import { useInventoryStore } from '@/stores/inventory'
import { useINotificationStore } from '@/stores/notification'
import { loginUser, logoutUser, checkSession } from '@/api/endpoints'

export const useAuthStore = defineStore('auth', () => {
  // Store dependencies
  // TODO decouple
  const router = useRouter()
  const inventorystore = useInventoryStore()
  const notificationStore = useINotificationStore()

  // Reactive state variables
  const account = ref<Account>({
    username: 'username',
    password: 'password',
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
      const response = await loginUser(account.value)

      if (response.success) {
        user.value = response.user
      } else {
        throw new Error(response.error || 'Login failed')
      }
    } catch (err) {
      error.value = 'Failed to login. Try again'
      console.error('Login error:', err instanceof Error ? err.message : err)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    if (!user.value) {
      return
    }

    try {
      await logoutUser(user.value)
      await inventorystore.reset()
      await router.push({ name: 'login' })
      user.value = null
    } catch (err) {
      error.value = 'Failed to logout. Try again'
      console.error('Logout error:', err instanceof Error ? err.message : err)
    }
  }

  async function checkAuth() {
    try {
      const response = await checkSession()

      if (response.success) {
        user.value = response.user
      } else {
        user.value = null
      }
    } catch (err: unknown) {
      console.warn(err)
      user.value = null
    }
  }

  // Notifies user on error
  watchEffect(() =>
    error.value ? notificationStore.add(error.value, 'error') : notificationStore.clear(),
  )

  // Public surface
  return { account, user, loading, error, isAuthenticated, login, logout, checkAuth }
})
