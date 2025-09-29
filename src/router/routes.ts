export const routes = [
  {
    path: "/login",
    name: "login",
    component: async () => await import("@/pages/login/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/",
    name: "inventory",
    component: async () => await import("@/pages/inventory/InventoryPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/404",
    name: "not-found",
    component: async () => await import("@/pages/not-found/NotFoundPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
