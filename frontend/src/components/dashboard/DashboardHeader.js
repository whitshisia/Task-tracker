import React from 'react';
import { Plus, Calendar, Bell } from 'lucide-react';

const DashboardHeader = ({ onAddTask, summary }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getProductivityMessage = () => {
    if (!summary) return 'Loading your productivity insights...';
    
    const completionRate = summary.completion_percentage;
    
    if (completionRate >= 80) {
      return "You're crushing it! Keep up the amazing work. 🚀";
    } else if (completionRate >= 60) {
      return "Great progress! You're on track to meet your goals. 👍";
    } else if (completionRate >= 40) {
      return "Steady progress. Every task completed counts! 💪";
    } else {
      return "Time to get started! You've got this. 🌟";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
          {getProductivityMessage()}
        </p>
      </div>

      <div className="flex items-center space-x-3 mt-4 lg:mt-0">
        <button className="hidden sm:flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium">
          <Calendar className="h-4 w-4 mr-2" />
          Today
        </button>
        
        <button className="hidden sm:flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium">
          <Bell className="h-4 w-4 mr-2" />
          Reminders
        </button>

        <button
          onClick={onAddTask}
          className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;