import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero = ({onGetStarted}) => {
  return (
    <section className="pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-8">
            <Star className="h-4 w-4 mr-2 fill-current" />
            Trusted by 50,000+ teams worldwide
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Task Management
            <span className="text-primary-500"> Made Simple</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            The all-in-one platform to organize tasks, track progress, and boost team productivity with AI-powered insights.
          </p>

          {/* CTA Buttons */}
          <div  className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            
            <button onClick={onGetStarted} className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-lg transition-colors flex items-center shadow-lg">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-semibold text-lg transition-colors flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-900"
                  ></div>
                ))}
              </div>
              <span>Join 50,000+ users</span>
            </div>
            <div className="flex items-center">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>4.8/5 from 2,000+ reviews</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1 shadow-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
              <div className="grid grid-cols-3 gap-4">
                {/* Mock Kanban columns */}
                {['To Do', 'In Progress', 'Done'].map((column, index) => (
                  <div key={column} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{column}</h3>
                      <span className="bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full">
                        {index + 3}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((task) => (
                        <div
                          key={task}
                          className="bg-white dark:bg-gray-600 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-500"
                        >
                          <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-400 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;