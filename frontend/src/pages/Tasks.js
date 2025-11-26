// src/pages/Tasks.jsx
import React, { useEffect, useState, useMemo } from "react";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import ConfirmModal from "../components/ConfirmModal";
import { api } from "../lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  // Delete modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await api("/tasks", "GET");
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  }

  // Save or update task
  async function handleSave(payload) {
    try {
      if (editing) {
        await api(`/tasks/${editing.id}`, "PATCH", payload);
        setEditing(null);
      } else {
        await api("/tasks", "POST", payload);
      }

      setOpen(false);
      load();
    } catch (err) {
      console.error(err);
      alert("Save failed: " + err.message);
    }
  }

  // Toggle completed status
  async function handleToggle(task) {
    try {
      await api(`/tasks/${task.id}`, "PATCH", { completed: !task.completed });
      load();
    } catch (err) {
      console.error(err);
    }
  }

  // Open confirm delete modal
  function handleDelete(task) {
    setTaskToDelete(task);
    setShowConfirm(true);
  }

  // Confirm delete action
  async function confirmDelete() {
    try {
      await api(`/tasks/${taskToDelete.id}`, "DELETE");
      setShowConfirm(false);
      setTaskToDelete(null);
      load();
    } catch (err) {
      console.error(err);
    }
  }

  // Filter tasks
  const filtered = useMemo(() => {
    return tasks
      .filter(t =>
        q ? (t.title + t.description).toLowerCase().includes(q.toLowerCase()) : true
      )
      .filter(t => {
        if (!status) return true;
        if (status === "todo") return !t.completed;
        if (status === "done") return t.completed;
        return true;
      })
      .filter(t => (priority ? t.priority === priority : true))
      .filter(t => (category ? t.category === category : true));
  }, [tasks, q, status, priority, category]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-gray-500">
            Create, filter, and manage your tasks
          </p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Task
        </button>
      </div>

      {/* Filters */}
      <TaskFilters
        q={q}
        setQ={setQ}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        onClear={() => {
          setQ("");
          setStatus("");
          setPriority("");
          setCategory("");
        }}
      />

      {/* Task List */}
      <div className="mt-6">
        <TaskList
          tasks={filtered}
          onToggle={handleToggle}
          onEdit={(t) => {
            setEditing(t);
            setOpen(true);
          }}
          onDelete={handleDelete} // fixed here
        />
      </div>

      {/* Add / Edit Modal */}
      <AddTaskModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={showConfirm}
        title="Delete Task?"
        description={
          taskToDelete ? `Are you sure you want to delete "${taskToDelete.title}"?` : ""
        }
        onCancel={() => {
          setShowConfirm(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
