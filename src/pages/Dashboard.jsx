import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/Layout/Dashboard';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import { getUserStats, getRecentAnalyses } from '../services/resume';
import { useAuth } from '../components/Auth/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, analysesData] = await Promise.all([
          getUserStats(),
          getRecentAnalyses(5) // Get 5 most recent analyses
        ]);
        
        setStats(statsData);
        setRecentAnalyses(analysesData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Dashboard statistics cards
  const StatCard = ({ title, value, icon, color }) => (
    <Card className="h-full" hoverable>
      <div className="flex items-center">
        <div className={`rounded-full p-3 mr-4 ${color}`}>
          <i className={`${icon} text-white text-xl`}></i>
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-gray-600">Here's an overview of your resume analysis activity.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Analyses" 
              value={stats?.totalAnalyses || 0} 
              icon="fas fa-file-alt" 
              color="bg-blue-500"
            />
            <StatCard 
              title="Jobs Matched" 
              value={stats?.jobsMatched || 0} 
              icon="fas fa-briefcase" 
              color="bg-green-500"
            />
            <StatCard 
              title="Skills Gap Found" 
              value={stats?.skillsGap || 0} 
              icon="fas fa-exclamation-circle" 
              color="bg-yellow-500"
            />
            <StatCard 
              title="Resume Score" 
              value={`${stats?.averageScore || 0}%`} 
              icon="fas fa-star" 
              color="bg-purple-500"
            />
          </div>

          {/* Recent Activity */}
          <Card 
            title="Recent Analyses" 
            footer={
              <Link to="/history">
                <Button variant="outline" size="sm">View All History</Button>
              </Link>
            }
          >
            {recentAnalyses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">You haven't analyzed any resumes yet.</p>
                <Link to="/resume-analysis">
                  <Button>Analyze Your Resume</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {recentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{analysis.jobTitle || 'Job Analysis'}</p>
                      <p className="text-sm text-gray-500">{new Date(analysis.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mr-3">
                        {analysis.matchScore}% Match
                      </span>
                      <Link to={`/resume-analysis/${analysis.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </DashboardLayout>
    
  );
};

export default Dashboard;