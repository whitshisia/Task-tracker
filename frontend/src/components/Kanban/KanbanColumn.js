// src/components/kanban/KanbanColumn.jsx
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({ title, droppableId, tasks }) {
  return (
    <div className="flex-1 bg-gray-50 p-4 rounded-lg border h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-3 min-h-[200px] ${
              snapshot.isDraggingOver ? "bg-sky-50" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(dragProvided, dragSnapshot) => (
                  <KanbanCard
                    task={task}
                    provided={dragProvided}
                    snapshot={dragSnapshot}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
