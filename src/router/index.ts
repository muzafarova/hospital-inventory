import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import LoginPage from '@/pages/LoginPage.vue'
import InventoryPage from '@/pages/InventoryPage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    name: 'inventory',
    component: InventoryPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/404',
    name: 'not-found',
    component: async () => await import('@/pages/NotFoundPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard for authentication
router.beforeEach(async (to) => {
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
