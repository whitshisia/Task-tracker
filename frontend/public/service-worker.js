/* eslint-disable no-restricted-globals */

// Development vs Production check
const isProd = process.env.NODE_ENV === "production";

// Skip waiting and take control immediately
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  self.clients.claim();
});

// Precache only in production (CRA build injects __WB_MANIFEST)
if (isProd && self.__WB_MANIFEST) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.2/workbox-sw.js');
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // API calls: Network first
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/api/tasks"),
    new workbox.strategies.NetworkFirst()
  );

  // Static assets: Stale while revalidate
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "image",
    new workbox.strategies.StaleWhileRevalidate()
  );
}

// Background sync event (SW listens, but registration happens in client)
self.addEventListener("sync", async (event) => {
  if (event.tag === "sync-tasks") {
    console.log("Syncing pending tasks...");
    // Call your sync function here
    if (typeof syncPendingTasks === "function") {
      event.waitUntil(syncPendingTasks());
    }
  }
});

// Fallback fetch for dev (so SW doesn’t break)
self.addEventListener("fetch", (event) => {
  if (!isProd) {
    return;
  }
});
