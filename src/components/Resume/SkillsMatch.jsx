import React from 'react';
import Card from '../Common/Card';

const SkillsMatch = ({ matchData }) => {
  // Ensure we have valid data
  if (!matchData || !matchData.techSkills || !matchData.softSkills) {
    return (
      <Card>
        <div className="text-center py-6">
          <p className="text-gray-500">No skills matching data available yet.</p>
        </div>
      </Card>
    );
  }

  const { techSkills, softSkills } = matchData;

  // Calculate match percentages
  const techMatchPercentage = Math.round((techSkills.matched.length / 
    (techSkills.matched.length + techSkills.missing.length)) * 100) || 0;
  
  const softMatchPercentage = Math.round((softSkills.matched.length / 
    (softSkills.matched.length + softSkills.missing.length)) * 100) || 0;
  
  const overallMatchPercentage = Math.round((techMatchPercentage + softMatchPercentage) / 2);

  // Function to determine color based on percentage
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100 border-green-500';
    if (percentage >= 60) return 'bg-yellow-100 border-yellow-500';
    return 'bg-red-100 border-red-500';
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Skills Match Analysis</h2>
      
      {/* Overall Match Score */}
      <div className={`mb-8 p-4 border-l-4 ${getMatchBgColor(overallMatchPercentage)}`}>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Overall Match:</span>
          <span className={`text-xl font-bold ${getMatchColor(overallMatchPercentage)}`}>
            {overallMatchPercentage}%
          </span>
        </div>
      </div>
      
      {/* Technical Skills Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Technical Skills</h3>
          <span className={`font-bold ${getMatchColor(techMatchPercentage)}`}>
            {techMatchPercentage}% match
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Matched Technical Skills */}
          <div className="border rounded-md p-4">
            <h4 className="font-medium text-green-600 mb-2">Matched Skills</h4>
            {techSkills.matched.length > 0 ? (
              <ul className="list-disc list-inside">
                {techSkills.matched.map((skill, index) => (
                  <li key={index} className="mb-1 text-gray-700">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No matched technical skills found</p>
            )}
          </div>
          
          {/* Missing Technical Skills */}
          <div className="border rounded-md p-4">
            <h4 className="font-medium text-red-600 mb-2">Missing Skills</h4>
            {techSkills.missing.length > 0 ? (
              <ul className="list-disc list-inside">
                {techSkills.missing.map((skill, index) => (
                  <li key={index} className="mb-1 text-gray-700">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No missing technical skills detected</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Soft Skills Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Soft Skills</h3>
          <span className={`font-bold ${getMatchColor(softMatchPercentage)}`}>
            {softMatchPercentage}% match
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Matched Soft Skills */}
          <div className="border rounded-md p-4">
            <h4 className="font-medium text-green-600 mb-2">Matched Skills</h4>
            {softSkills.matched.length > 0 ? (
              <ul className="list-disc list-inside">
                {softSkills.matched.map((skill, index) => (
                  <li key={index} className="mb-1 text-gray-700">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No matched soft skills found</p>
            )}
          </div>
          
          {/* Missing Soft Skills */}
          <div className="border rounded-md p-4">
            <h4 className="font-medium text-red-600 mb-2">Missing Skills</h4>
            {softSkills.missing.length > 0 ? (
              <ul className="list-disc list-inside">
                {softSkills.missing.map((skill, index) => (
                  <li key={index} className="mb-1 text-gray-700">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No missing soft skills detected</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SkillsMatch;