import React from 'react';
import { CheckCircle, Circle, Clock, AlertCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import ConfirmModal from './ConfirmModal';

const TaskList = ({ tasks, viewMode, onTaskUpdate, onTaskDelete }) => {
  const [taskToDelete, setTaskToDelete] = React.useState(null);

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    
    switch (status) {
      case 'todo':
        return <Circle className="h-5 w-5 text-gray-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'done':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusToggle = (task) => {
    const newCompleted = !task.completed;
    const newStatus = newCompleted ? 'done' : 'todo';
    
    onTaskUpdate(task.id, {
      completed: newCompleted,
      status: newStatus,
      ...(newCompleted && { completed_at: new Date().toISOString() })
    });
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      onTaskDelete(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  if (viewMode === 'grid') {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <button
                  onClick={() => handleStatusToggle(task)}
                  className="flex-shrink-0 mt-1"
                >
                  {getStatusIcon(task.status, task.completed)}
                </button>
                
                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className={`font-semibold text-gray-900 dark:text-white mb-2 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>

              {task.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className={`px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <span>
                  {format(new Date(task.updated_at), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Try adjusting your filters or create a new task
            </p>
          </div>
        )}

        <ConfirmModal
          isOpen={!!taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Task"
          message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          confirmColor="red"
        />
      </>
    );
  }

  // List View
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`flex items-center px-6 py-4 ${
              index !== tasks.length - 1
                ? 'border-b border-gray-200 dark:border-gray-700'
                : ''
            } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
          >
            {/* Checkbox */}
            <button
              onClick={() => handleStatusToggle(task)}
              className="flex-shrink-0 mr-4"
            >
              {getStatusIcon(task.status, task.completed)}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-gray-900 dark:text-white truncate ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Updated {format(new Date(task.updated_at), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors">
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteClick(task)}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Try adjusting your filters or create a new task
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
      />
    </>
  );
};

export default TaskList;