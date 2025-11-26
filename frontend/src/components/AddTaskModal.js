// src/components/AddTaskModal.jsx
import React, { useState, useEffect } from "react";

export default function AddTaskModal({ open, onClose, onSave, initial = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setPriority(initial.priority || "medium");
      setCategory(initial.category || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("");
    }
  }, [initial, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">{initial ? "Edit Task" : "Add Task"}</h3>

        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-2 rounded mt-2 mb-3" />

        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border p-2 rounded mt-2 mb-3" />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full border p-2 rounded mt-2">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <input value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border p-2 rounded mt-2" />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Cancel</button>
          <button
            onClick={() => {
              const payload = { title, description, priority, category };
              onSave(payload);
            }}
            className="px-4 py-2 rounded bg-sky-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
