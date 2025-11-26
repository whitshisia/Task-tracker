import React from "react";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col mb-4">
      <h1 className="text-3xl font-semibold text-sky-700">
        Your Productivity Overview
      </h1>
      <p className="text-gray-500">Track your performance this week</p>
    </header>
  );
};

export default DashboardHeader;
