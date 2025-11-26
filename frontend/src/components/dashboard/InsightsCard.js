import React from "react";
import { Sparkles } from "lucide-react";

const InsightsCard = ({ insights }) => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={22} />
        <h2 className="text-xl font-bold">AI Insights</h2>
      </div>

      {insights.map((msg, i) => (
        <p key={i} className="text-white text-lg">
          • {msg}
        </p>
      ))}
    </div>
  );
};

export default InsightsCard;
