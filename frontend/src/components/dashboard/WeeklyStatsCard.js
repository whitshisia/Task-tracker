import React from "react";
import WeeklyBarChart from "../Charts/WeeklyBarChart";

const WeeklyStatsCard = ({ summary }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Weekly Stats</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-gray-700">
            Tasks updated this week:
          </p>
          <p className="text-3xl font-bold text-sky-600">
            {summary.tasks_this_week}
          </p>

          <p className="font-semibold mt-4 text-gray-700">
            Tasks completed this week:
          </p>
          <p className="text-3xl font-bold text-emerald-600">
            {summary.completed_this_week}
          </p>
        </div>

        <WeeklyBarChart summary={summary} />
      </div>
    </div>
  );
};

export default WeeklyStatsCard;
