import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/css/style.css";

// Start MSW in development or when VITE_ENABLE_MSW is set (for e2e tests)
if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW) {
  const { worker } = await import("@mocks/browser");
  await worker.start({
    onUnhandledRequest(request: Request) {
      // Only warn for API requests
      if (request.url.includes("/api/")) {
        console.warn("Unhandled API request:", request.method, request.url);
      }
    },
  });
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
