import React from 'react';
import Layout from './Layout';

const Analytics = () => {
  return (
    <Layout>
      <div className="main-content">
        <div className="content-header">
          <h1>Analytics</h1>
        </div>

        <div className="card">
          <h3>AI Productivity Analysis</h3>
          <p>Generate your first weekly report by completing some tasks!</p>
          
          <div style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Productivity Score</span>
              <span>0%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Weekly Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <span>This Week</span>
            <span>0%</span>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">2.5h</div>
              <div className="stat-label">Avg. Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">4.2</div>
              <div className="stat-label">Tasks/Day</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">7</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">92%</div>
              <div className="stat-label">Efficiency</div>
            </div>
          </div>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            className="search-box"
            placeholder="Type here to search..."
          />
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right', color: '#666', fontSize: '14px' }}>
          <div>25°C</div>
          <div>+38 PM</div>
          <div>11/10/2025</div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;