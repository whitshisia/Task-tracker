import React from "react";

const WeeklyBarChart = ({ summary }) => {
  const total = summary.tasks_this_week || 1;
  const completed = summary.completed_this_week;

  const percentage = (completed / total) * 100;

  return (
    <div className="flex flex-col justify-center">
      <div className="text-center text-gray-700 mb-2">
        Weekly Completion
      </div>

      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-2">
        {completed} / {total} updated tasks
      </p>
    </div>
  );
};

export default WeeklyBarChart;
