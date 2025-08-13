import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { User, Account } from '@/types'
import { useInventoryStore } from '@/stores/inventory'

// TODO temp logic to be mocked properly with MSW
const mockUser = { username: 'admin', hospitalId: 'hopc-001' }
let hasSession = true
let loginThrows = true

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const inventorystore = useInventoryStore()

  // State
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
      user.value = await new Promise((resolve, reject) =>
        setTimeout(() => (loginThrows ? reject('Hiccup') : resolve(mockUser)), 300),
      )
      await router.push({ name: 'inventory' })
    } catch (err) {
      error.value = 'Failed to login'
      console.error('Login error:', err instanceof Error ? err.message : err)
    } finally {
      loading.value = false
      loginThrows = false
    }
  }
  async function logout() {
    inventorystore.reset()
    user.value = null
    hasSession = false
    await router.push({ name: 'login' })
  }
  async function checkAuth() {
    user.value = hasSession ? mockUser : null
  }

  // Public interface
  return { account, user, loading, error, isAuthenticated, login, logout, checkAuth }
})
