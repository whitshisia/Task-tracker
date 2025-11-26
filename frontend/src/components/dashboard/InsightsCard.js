import React from 'react';
import { Lightbulb, TrendingUp, Target, Clock } from 'lucide-react';

const InsightsCard = ({ insights }) => {
  const getInsightIcon = (insight, index) => {
    if (insight.includes('Excellent') || insight.includes('crushing')) {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    } else if (insight.includes('momentum') || insight.includes('active')) {
      return <Target className="h-5 w-5 text-blue-500" />;
    } else if (insight.includes('time-blocking') || insight.includes('focus')) {
      return <Clock className="h-5 w-5 text-purple-500" />;
    }
    return <Lightbulb className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">AI Insights</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Smart suggestions</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-primary-50 dark:bg-primary-900/10 rounded-lg"
            >
              {getInsightIcon(insight, index)}
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {insight}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <Lightbulb className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Complete more tasks to get personalized insights
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Updated just now</span>
          <span>Powered by AI</span>
        </div>
      </div>
    </div>
  );
};

export default InsightsCard;