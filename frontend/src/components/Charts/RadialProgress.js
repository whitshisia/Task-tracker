import React from "react";

const RadialProgress = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <svg width="140" height="140" className="rotate-[-90deg]">
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="12"
        fill="none"
      />
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke="#0ea5e9"
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="rotate-90 fill-sky-700 font-semibold"
        fontSize="22"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default RadialProgress;
