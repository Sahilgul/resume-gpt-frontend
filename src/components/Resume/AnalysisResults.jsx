import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Common/Card';
import Button from '../Common/Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const AnalysisResults = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the analysis data from localStorage
    const storedData = localStorage.getItem('analysisData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAnalysisData(parsedData);
      } catch (error) {
        console.error('Error parsing analysis data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const handleBackToUpload = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center p-10">
          <p className="text-lg">Loading analysis results...</p>
        </div>
      </Card>
    );
  }

  if (!analysisData) {
    return (
      <Card>
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">No Analysis Data Found</h2>
          <p className="mb-6">We couldn't find any resume analysis data. Please try uploading your resume again.</p>
          <Button onClick={handleBackToUpload}>Back to Upload</Button>
        </div>
      </Card>
    );
  }

  // const formattedSuggestions = <ReactMarkdown>{analysisData.suggestions}</ReactMarkdown>;
  const formattedSuggestions = (
    <ReactMarkdown remarkPlugins={[remarkGfm]} breaks>
      {analysisData.suggestions}
    </ReactMarkdown>
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Resume Analysis Results</h2>
          <Button onClick={handleBackToUpload}>Back to Upload</Button>
        </div>
        
        {/* Skills Match Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Skills Analysis</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div>
              <h4 className="font-bold text-lg mb-3 text-green-700">Matched Skills</h4>
              
              {/* Technical Skills */}
              <div className="mb-4">
                <h5 className="font-semibold mb-2">Technical Skills</h5>
                {analysisData.matched_tech_skills && analysisData.matched_tech_skills.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisData.matched_tech_skills.map((skill, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{skill.job_skill}</span>
                        <span className="text-gray-500"> - {Math.round(skill.similarity * 100)}% match</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No technical skills matched</p>
                )}
              </div>
              
              {/* Soft Skills */}
              <div>
                <h5 className="font-semibold mb-2">Soft Skills</h5>
                {analysisData.matched_soft_skills && analysisData.matched_soft_skills.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisData.matched_soft_skills.map((skill, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{skill.job_skill}</span>
                        <span className="text-gray-500"> - {Math.round(skill.similarity * 100)}% match</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No soft skills matched</p>
                )}
              </div>
            </div>
            
            {/* Missing Skills */}
            <div>
              <h4 className="font-bold text-lg mb-3 text-red-700">Missing Skills</h4>
              
              {/* Technical Skills */}
              <div className="mb-4">
                <h5 className="font-semibold mb-2">Technical Skills</h5>
                {analysisData.missing_tech_skills && analysisData.missing_tech_skills.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisData.missing_tech_skills.map((skill, index) => (
                      <li key={index} className="text-sm">{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No missing technical skills</p>
                )}
              </div>
              
              {/* Soft Skills */}
              <div>
                <h5 className="font-semibold mb-2">Soft Skills</h5>
                {analysisData.missing_soft_skills && analysisData.missing_soft_skills.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisData.missing_soft_skills.map((skill, index) => (
                      <li key={index} className="text-sm">{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No missing soft skills</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Suggestions Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Improvement Suggestions</h3>
          <div className="prose max-w-none">
            {formattedSuggestions}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResults;