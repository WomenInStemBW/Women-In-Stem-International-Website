import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    blogs: 0,
    teams: 0,
    opportunities: 0,
    podcasts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [blogsCount, teamsCount, oppsCount, podcastsCount] = await Promise.all([
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('teams').select('*', { count: 'exact', head: true }),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }),
        supabase.from('podcast_episodes').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        blogs: blogsCount.count || 0,
        teams: teamsCount.count || 0,
        opportunities: oppsCount.count || 0,
        podcasts: podcastsCount.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #f7fafc;
        }

        .admin-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2d3748;
          margin: 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-email {
          color: #718096;
          font-size: 0.9rem;
        }

        .logout-btn {
          padding: 8px 20px;
          background: #c43c2dff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #a2544bff;
          transform: translateY(-1px);
        }

        .dashboard-content {
          padding: 40px 0;
        }

        .welcome-section {
          background: white;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .welcome-title {
          font-size: 1.8rem;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .welcome-text {
          color: #718096;
          font-size: 1.05rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .stat-title {
          color: #718096;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2d3748;
        }

        .actions-section {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .actions-title {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .action-btn {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-decoration: none;
          display: block;
        }

        .action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .action-btn.secondary {
          background: linear-gradient(135deg, #ea8966ff 0%, #a2544bff 100%);
        }

        .action-btn.green {
          background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }

          .user-info {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="admin-dashboard">
        {/* Header */}
        <div className="admin-header">
          <div className="container">
            <div className="header-content">
              <h1 className="admin-title">WiS Admin Dashboard</h1>
              <div className="user-info">
                <span className="user-username">{user?.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="container">
            {/* Welcome Section */}
            <div className="welcome-section">
              <h2 className="welcome-title">Welcome back!</h2>
              <p className="welcome-text">
                Manage your content, update team information, and keep your community informed.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Blog Posts</span>
                  <span className="stat-icon">📝</span>
                </div>
                <div className="stat-number">{loading ? '-' : stats.blogs}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Team Members</span>
                  <span className="stat-icon">👥</span>
                </div>
                <div className="stat-number">{loading ? '-' : stats.teams}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Opportunities</span>
                  <span className="stat-icon">🎯</span>
                </div>
                <div className="stat-number">{loading ? '-' : stats.opportunities}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Podcast Episodes</span>
                  <span className="stat-icon">🎙️</span>
                </div>
                <div className="stat-number">{loading ? '-' : stats.podcasts}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="actions-section">
              <h3 className="actions-title">Quick Actions</h3>
              <div className="actions-grid">
                <a href="/admin/blogs" className="action-btn">
                  📝 Manage Blogs
                </a>
                <a href="/admin/teams" className="action-btn secondary">
                  👥 Manage Teams
                </a>
                <a href="/admin/groups" className="action-btn green">
                  🎯 Manage Opportunities
                </a>
                <a href="/admin/podcasts" className="action-btn">
                  🎙️ Manage Podcasts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;