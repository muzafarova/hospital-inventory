import PageLogin from '@/pages/PageLogin.vue'
import PageInventory from '@/pages/inventory/PageInventory.vue'

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: PageLogin,
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    name: 'inventory',
    component: PageInventory,
    meta: { requiresAuth: true },
  },
  {
    path: '/404',
    name: 'not-found',
    component: async () => await import('@/pages/PageNotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
