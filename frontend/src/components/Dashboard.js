import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  CheckSquare, 
  BarChart3, 
  Settings,
  Plus,
  TrendingUp,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import Layout from './Layout';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="main-content">
        <div className="content-header">
          <h1>Dashboard</h1>
          <p>Here's what's happening with your tasks today</p>
        </div>

        <div className="task-sections">
          <div className="task-section">
            <div className="section-header">
              <h2>Overdue</h2>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="card">
              <p>No overdue tasks</p>
            </div>
          </div>

          <div className="task-section">
            <div className="section-header">
              <h2>Today's Tasks</h2>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="card">
              <p>No tasks for today</p>
            </div>
          </div>

          <div className="task-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <div 
                className="action-item"
                onClick={() => navigate('/tasks')}
              >
                <Plus size={18} />
                <span>Add New Task</span>
              </div>
              <div 
                className="action-item"
                onClick={() => navigate('/analytics')}
              >
                <BarChart3 size={18} />
                <span>View Analytics</span>
              </div>
              <div className="action-item">
                <TrendingUp size={18} />
                <span>Sync Tasks</span>
              </div>
            </div>
          </div>

          <div className="ai-insights">
            <Zap size={24} style={{ marginBottom: '10px' }} />
            <h3>AI Insights</h3>
            <p>Welcome to Smart Task Tracker! Start by adding your first task.</p>
          </div>

          <div className="search-container">
            <input 
              type="text" 
              className="search-box"
              placeholder="Type here to search..."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;