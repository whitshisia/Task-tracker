import React from "react";
import RadialProgress from "./Charts/RadialProgress";

const ProductivityCard = ({ summary }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Productivity Score</h2>

      <div className="flex items-center gap-6">
        <RadialProgress percentage={summary.percent_completed} />
        <div>
          <p className="text-gray-700 text-lg">
            Completed: {summary.completed_tasks}/{summary.total_tasks}
          </p>
          <p className="text-gray-500 text-sm">
            Based on all tasks you've created
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductivityCard;
