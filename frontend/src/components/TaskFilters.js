// src/components/TaskFilters.jsx
import React from "react";

export default function TaskFilters({
  q,
  setQ,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  onClear,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by title or description..."
        className="col-span-1 md:col-span-2 px-4 py-2 rounded-lg border border-gray-200"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-200"
      >
        <option value="">All Status</option>
        <option value="todo">To do</option>
        <option value="inprogress">In progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-200"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-200"
      >
        <option value="">All Categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
      </select>

      <div className="col-span-full flex justify-end gap-2">
        <button className="text-sm text-sky-600" onClick={onClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
