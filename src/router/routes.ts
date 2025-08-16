import LoginPage from '@/pages/login/LoginPage.vue'
import InventoryPage from '@/pages/inventory/InventoryPage.vue'

export const routes = [
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
