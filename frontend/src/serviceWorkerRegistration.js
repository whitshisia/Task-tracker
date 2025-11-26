// src/serviceWorkerRegistration.js
export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/service-worker.js");
        console.log("Service Worker registered:", registration);

        // Register background sync for tasks
        if ("sync" in registration) {
          registration.sync.register("sync-tasks").catch(err =>
            console.log("Sync registration failed:", err)
          );
        }
      } catch (err) {
        console.log("Service Worker registration failed:", err);
      }
    });
  }
}
