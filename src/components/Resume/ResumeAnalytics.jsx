import React from 'react';
import Card from '../Common/Card';

const ResumeAnalytics = ({ matchData }) => {
  // Check if we have valid data
  if (!matchData || !matchData.techSkills || !matchData.softSkills) {
    return (
      <Card>
        <div className="text-center py-6">
          <p className="text-gray-500">No analytics data available yet.</p>
        </div>
      </Card>
    );
  }

  const { techSkills, softSkills } = matchData;
  
  // Calculate percentages
  const techTotal = techSkills.matched.length + techSkills.missing.length;
  const techMatchPercentage = Math.round((techSkills.matched.length / techTotal) * 100) || 0;
  
  const softTotal = softSkills.matched.length + softSkills.missing.length;
  const softMatchPercentage = Math.round((softSkills.matched.length / softTotal) * 100) || 0;
  
  // Helper function to get color based on percentage
  const getBarColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Resume Analytics</h2>
      
      <div className="space-y-8">
        {/* Technical Skills Chart */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Technical Skills Match</h3>
            <span className="text-lg font-bold">{techMatchPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${getBarColor(techMatchPercentage)}`} 
              style={{ width: `${techMatchPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Matched: {techSkills.matched.length}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Missing: {techSkills.missing.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Soft Skills Chart */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Soft Skills Match</h3>
            <span className="text-lg font-bold">{softMatchPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${getBarColor(softMatchPercentage)}`} 
              style={{ width: `${softMatchPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Matched: {softSkills.matched.length}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Missing: {softSkills.missing.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skill Distribution Chart */}
        <div>
          <h3 className="text-lg font-medium mb-4">Overall Skill Distribution</h3>
          
          <div className="flex h-40 items-end space-x-2">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(techSkills.matched.length / (techTotal + softTotal)) * 100}%` }}></div>
              <span className="text-xs mt-1">Matched Technical</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-red-500 rounded-t" style={{ height: `${(techSkills.missing.length / (techTotal + softTotal)) * 100}%` }}></div>
              <span className="text-xs mt-1">Missing Technical</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-green-500 rounded-t" style={{ height: `${(softSkills.matched.length / (techTotal + softTotal)) * 100}%` }}></div>
              <span className="text-xs mt-1">Matched Soft</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-yellow-500 rounded-t" style={{ height: `${(softSkills.missing.length / (techTotal + softTotal)) * 100}%` }}></div>
              <span className="text-xs mt-1">Missing Soft</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumeAnalytics;