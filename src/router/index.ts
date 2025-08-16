import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard for authentication
router.beforeEach(async (to) => {
  // This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const authStore = useAuthStore()

  // Check session on first navigation
  if (authStore.user === null && !authStore.loading) {
    await authStore.checkAuth()
  }

  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  if (requiresAuth && !isAuthenticated) {
    return '/login'
  }

  if (requiresGuest && isAuthenticated) {
    return '/'
  }
})

export default router
