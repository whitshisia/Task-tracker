import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const ProductivityCard = ({ summary }) => {
  // Mock productivity data - replace with actual data from your API
  const productivityData = [
    { day: 'Mon', productivity: 65, tasks: 8 },
    { day: 'Tue', productivity: 72, tasks: 10 },
    { day: 'Wed', productivity: 85, tasks: 12 },
    { day: 'Thu', productivity: 78, tasks: 9 },
    { day: 'Fri', productivity: 90, tasks: 14 },
    { day: 'Sat', productivity: 45, tasks: 5 },
    { day: 'Sun', productivity: 30, tasks: 3 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-primary-600">
            Productivity: {payload[0].value}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tasks: {payload[0].payload.tasks}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weekly Productivity
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your performance over the last 7 days
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {summary?.productivity_score || 0}%
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
            <span>+5.2%</span>
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={productivityData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" vertical={false} />
          <XAxis 
            dataKey="day"
            tick={{ fill: 'currentColor' }}
            className="text-gray-600 dark:text-gray-400 text-xs"
          />
          <YAxis 
            tick={{ fill: 'currentColor' }}
            className="text-gray-600 dark:text-gray-400 text-xs"
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="productivity"
            stroke="#0ea5e9"
            fill="url(#productivityGradient)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="productivity"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#0284c7' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Last 7 days</span>
        <span>Peak: {Math.max(...productivityData.map(d => d.productivity))}%</span>
      </div>
    </div>
  );
};

export default ProductivityCard;