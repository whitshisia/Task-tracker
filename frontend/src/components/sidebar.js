import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Trello, 
  BarChart3, 
  Settings,
  Plus 
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/app/tasks', icon: CheckSquare },
    { name: 'Kanban', href: '/app/kanban', icon: Trello },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const projects = [
    { name: 'Website Redesign', color: 'bg-blue-500', tasks: 12 },
    { name: 'Mobile App', color: 'bg-green-500', tasks: 8 },
    { name: 'Marketing', color: 'bg-purple-500', tasks: 5 },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            TaskFlow
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className={clsx(
                  'h-5 w-5 mr-3',
                  isActive ? 'text-primary-500' : 'text-gray-400'
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Projects Section */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Projects
            </h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.name}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${project.color} rounded-full mr-3`} />
                  <span>{project.name}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.tasks}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </button>
      </div>
    </div>
  );
};

export default Sidebar;