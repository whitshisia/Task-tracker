// src/components/kanban/KanbanCard.jsx
import React from "react";
import { GripVertical } from "lucide-react";

export default function KanbanCard({ task, provided, snapshot }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`p-3 bg-white rounded-lg shadow-sm border 
        ${snapshot.isDragging ? "shadow-md scale-[1.02]" : ""}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <GripVertical size={16} className="text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-700">{task.title}</h3>
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 mb-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 text-xs">
        {task.priority && (
          <span className="px-2 py-1 rounded bg-sky-50 text-sky-700">
            {task.priority}
          </span>
        )}
        {task.category && (
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">
            {task.category}
          </span>
        )}
      </div>
    </div>
  );
}
