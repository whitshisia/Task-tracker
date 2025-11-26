import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyBarChart = () => {
  // Mock weekly activity data
  const data = [
    { day: 'Mon', completed: 8, created: 12 },
    { day: 'Tue', completed: 6, created: 8 },
    { day: 'Wed', completed: 12, created: 15 },
    { day: 'Thu', completed: 9, created: 11 },
    { day: 'Fri', completed: 14, created: 16 },
    { day: 'Sat', completed: 4, created: 6 },
    { day: 'Sun', completed: 2, created: 3 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-primary-600">
            Completed: {payload[0].value}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Created: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" vertical={false} />
        <XAxis 
          dataKey="day"
          tick={{ fill: 'currentColor' }}
          className="text-gray-600 dark:text-gray-400 text-xs"
        />
        <YAxis 
          tick={{ fill: 'currentColor' }}
          className="text-gray-600 dark:text-gray-400 text-xs"
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="completed" 
          fill="#0ea5e9" 
          radius={[2, 2, 0, 0]}
          name="Completed Tasks"
        />
        <Bar 
          dataKey="created" 
          fill="#94a3b8" 
          radius={[2, 2, 0, 0]}
          name="Created Tasks"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyBarChart;