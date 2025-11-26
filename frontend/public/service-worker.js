/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();
self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

// API calls (tasks)
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/tasks"),
  new NetworkFirst()
);

// Static assets (JS/CSS/images)
registerRoute(
  ({ request }) => request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate()
);
// inside service-worker.js
self.addEventListener("sync", async (event) => {
  if (event.tag === "sync-tasks") {
    event.waitUntil(syncPendingTasks());
  }
});
navigator.serviceWorker.ready.then(reg => {
  reg.sync.register("sync-tasks");
});
