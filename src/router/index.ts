import { createRouter, createMemoryHistory, Router } from "vue-router";

import { routes } from "./routes";

let router: Router | null = null;

// config router
export function installRouter(basePath: string) {
  if (!router) {
    router = createRouter({
      history: createMemoryHistory(basePath),
      routes,
    });
  }
  return router;
}

export function clearRouter() {
  router = null;
}
