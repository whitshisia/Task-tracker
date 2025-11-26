// src/pages/Kanban.jsx
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../components/kanban/KanbanColumn";
import { api } from "../lib/api";

export default function Kanban() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    try {
      const data = await api("/tasks", "GET");
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const columns = {
    todo: tasks.filter((t) => !t.completed && t.status !== "inprogress"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.completed),
  };

  async function updateTask(id, updates) {
    try {
      await api(`/tasks/${id}`, "PATCH", updates);
    } catch (err) {
      console.error("Update failed", err);
    }
  }

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === to) return;

    const id = Number(draggableId);

    if (to === "todo") {
      updateTask(id, { completed: false, status: "todo" });
    } else if (to === "inprogress") {
      updateTask(id, { completed: false, status: "inprogress" });
    } else if (to === "done") {
      updateTask(id, { completed: true, status: "done" });
    }

    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn title="To Do" droppableId="todo" tasks={columns.todo} />
          <KanbanColumn
            title="In Progress"
            droppableId="inprogress"
            tasks={columns.inprogress}
          />
          <KanbanColumn title="Done" droppableId="done" tasks={columns.done} />
        </div>
      </DragDropContext>
    </div>
  );
}
