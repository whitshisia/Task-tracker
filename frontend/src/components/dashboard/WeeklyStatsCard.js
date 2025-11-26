import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

const WeeklyStatsCard = ({ summary }) => {
  const stats = [
    {
      label: 'Tasks Created',
      value: summary?.tasks_this_week || 0,
      change: '+12%',
      trend: 'up',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Tasks Completed',
      value: summary?.completed_this_week || 0,
      change: '+8%',
      trend: 'up',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Completion Rate',
      value: `${summary?.weekly_completion_percentage || 0}%`,
      change: '+5%',
      trend: 'up',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4" />;
    }
    return <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
          <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">This Week</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Weekly performance</p>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.color} mt-1`}>
                {stat.value}
              </p>
            </div>
            <div className={`flex items-center space-x-1 ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {getTrendIcon(stat.trend)}
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Compared to last week</span>
          <span>•</span>
          <span>7-day period</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStatsCard;