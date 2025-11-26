// src/components/TaskList.jsx
import React from "react";
import { Check, Trash2, Edit } from "lucide-react";

export default function TaskList({ tasks = [], onToggle, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center text-gray-400">
        No tasks yet — try adding one!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div
          key={t.id || t.remote_id}
          className="bg-white p-4 rounded-lg flex items-center justify-between shadow-sm"
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggle(t)}
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                t.completed ? "bg-sky-500 text-white" : "border border-gray-200"
              }`}
            >
              <Check size={16} />
            </button>

            <div>
              <div className="flex items-center gap-3">
                <h3 className={`font-medium ${t.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {t.title}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                  {t.priority || "—"}
                </span>
                {t.category && <span className="text-xs px-2 py-1 rounded-full bg-sky-50 text-sky-700">{t.category}</span>}
              </div>
              {t.description && <p className="text-sm text-gray-500 mt-1">{t.description}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onEdit(t)} className="text-sky-600 hover:text-sky-800">
              <Edit size={16} />
            </button>
            <button onClick={() => onDelete(t)} className="text-red-500 hover:text-red-700">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
