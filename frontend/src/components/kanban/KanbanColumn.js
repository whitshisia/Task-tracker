import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, color, tasks, onStatusChange, onTaskDelete, onAddTask }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onStatusChange(taskId, status);
    }
  };

  return (
    <div 
      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 min-h-[600px]"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, title.toLowerCase().replace(' ', '-'))}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 ${color} rounded-full`} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={onAddTask}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onTaskDelete}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;