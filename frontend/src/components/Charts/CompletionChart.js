import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompletionChart = ({ timeRange }) => {
  // Mock data - replace with actual data from your API
  const data = {
    week: [
      { day: 'Mon', completed: 12, total: 20 },
      { day: 'Tue', completed: 8, total: 15 },
      { day: 'Wed', completed: 15, total: 18 },
      { day: 'Thu', completed: 10, total: 16 },
      { day: 'Fri', completed: 18, total: 22 },
      { day: 'Sat', completed: 5, total: 8 },
      { day: 'Sun', completed: 3, total: 5 },
    ],
    month: [
      { week: 'Week 1', completed: 45, total: 60 },
      { week: 'Week 2', completed: 52, total: 65 },
      { week: 'Week 3', completed: 48, total: 58 },
      { week: 'Week 4', completed: 55, total: 62 },
    ],
    quarter: [
      { month: 'Jan', completed: 180, total: 240 },
      { month: 'Feb', completed: 195, total: 250 },
      { month: 'Mar', completed: 210, total: 265 },
    ]
  };

  const chartData = data[timeRange] || data.week;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
          tick={{ fill: 'currentColor' }}
          className="text-gray-600 dark:text-gray-400 text-sm"
        />
        <YAxis 
          tick={{ fill: 'currentColor' }}
          className="text-gray-600 dark:text-gray-400 text-sm"
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(229, 231, 235)',
            borderRadius: '0.5rem',
            color: 'rgb(17, 24, 39)'
          }}
          labelStyle={{ color: 'rgb(17, 24, 39)' }}
        />
        <Line 
          type="monotone" 
          dataKey="completed" 
          stroke="#0ea5e9" 
          strokeWidth={2}
          dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#0284c7' }}
        />
        <Line 
          type="monotone" 
          dataKey="total" 
          stroke="#94a3b8" 
          strokeWidth={2}
          strokeDasharray="3 3"
          dot={{ fill: '#94a3b8', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CompletionChart;