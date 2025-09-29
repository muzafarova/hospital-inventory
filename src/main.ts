import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/css/style.css";

// Start MSW in development
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest(request) {
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
