import React from 'react';
import { Kanban, BarChart3, Smartphone, Users, Zap, Lock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Kanban,
      title: 'Visual Kanban Board',
      description: 'Drag and drop tasks across customizable columns. Visualize your workflow and track progress at a glance.',
    },
    {
      icon: BarChart3,
      title: 'AI-Powered Insights',
      description: 'Get smart productivity analytics and personalized recommendations to improve your workflow.',
    },
    {
      icon: Smartphone,
      title: 'Offline First',
      description: 'Work from anywhere, anytime. Your data syncs automatically when you reconnect.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share projects, assign tasks, and collaborate seamlessly with your team members.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed with instant search, quick actions, and smooth animations.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and regular backups.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Stay Productive
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to help you focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.9%</div>
            <div className="text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-400">Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">2M+</div>
            <div className="text-gray-600 dark:text-gray-400">Tasks Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">4.8/5</div>
            <div className="text-gray-600 dark:text-gray-400">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;