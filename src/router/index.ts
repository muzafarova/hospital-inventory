import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard for authentication
router.beforeEach(async (to) => {
  // This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const sessionStore = useSessionStore()
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  // Check session on first navigation
  if (!(sessionStore.authenticated || sessionStore.checking)) {
    await sessionStore.checkAuth()
  }

  if (requiresAuth && !sessionStore.authenticated) {
    return '/login'
  }

  if (requiresGuest && sessionStore.authenticated) {
    return '/'
  }
})

export default router
