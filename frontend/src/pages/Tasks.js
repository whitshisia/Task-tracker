// src/pages/Tasks.jsx
import React, { useEffect, useState, useMemo } from "react";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import { api } from "../lib/api"; // adjust if you exported default earlier

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await api("/tasks", "GET");
      // backend returns array of tasks
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  }

  async function handleSave(payload) {
    try {
      if (editing) {
        // PATCH
        await api(`/tasks/${editing.id}`, "PATCH", payload);
        setEditing(null);
      } else {
        // POST
        await api("/tasks", "POST", payload);
      }
      setOpen(false);
      load();
    } catch (err) {
      console.error(err);
      alert("Save failed: " + err.message);
    }
  }

  async function handleToggle(t) {
    try {
      await api(`/tasks/${t.id}`, "PATCH", { completed: !t.completed });
      load();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(t) {
    if (!confirm("Delete task?")) return;
    try {
      await api(`/tasks/${t.id}`, "DELETE");
      load();
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => (q ? (t.title + t.description).toLowerCase().includes(q.toLowerCase()) : true))
      .filter((t) => {
        if (!status) return true;
        if (status === "todo") return !t.completed;
        if (status === "done") return t.completed;
        return true;
      })
      .filter((t) => (priority ? (t.priority || "") === priority : true))
      .filter((t) => (category ? (t.category || "") === category : true));
  }, [tasks, q, status, priority, category]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-gray-500">Create, filter, and manage your tasks</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setEditing(null); setOpen(true); }}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add Task
          </button>
        </div>
      </div>

      <TaskFilters
        q={q}
        setQ={setQ}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        onClear={() => { setQ(""); setStatus(""); setPriority(""); setCategory(""); }}
      />

      <div className="mt-6">
        <TaskList
          tasks={filtered}
          onToggle={handleToggle}
          onEdit={(t) => { setEditing(t); setOpen(true); }}
          onDelete={handleDelete}
        />
      </div>

      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}
