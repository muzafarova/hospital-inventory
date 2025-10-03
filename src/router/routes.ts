export const routes = [
  {
    path: "/login",
    name: "login",
    component: async () => await import("@/views/login/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/",
    name: "inventory",
    component: async () => await import("@/views/inventory/InventoryPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/404",
    name: "not-found",
    component: async () => await import("@/views/not-found/NotFoundPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
