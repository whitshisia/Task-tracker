import { openDB } from "idb";

export const db = await openDB("taskTrackerDB", 1, {
  upgrade(db) {
    db.createObjectStore("tasks", { keyPath: "id" });
    db.createObjectStore("syncQueue", { autoIncrement: true });
  },
});
export async function syncPendingTasks() {
  const all = await db.getAll("syncQueue");

  for (const item of all) {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" }
      });

      // Remove from queue after success
      await db.delete("syncQueue", item.id);
    } catch (err) {
      console.log("Still offline, retry later");
      break;
    }
  }
}
export async function saveTaskLocally(task) {
  return db.put("tasks", task);
}

export async function queueForSync(task) {
  return db.add("syncQueue", task);
}
