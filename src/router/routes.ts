export const routes = [
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
