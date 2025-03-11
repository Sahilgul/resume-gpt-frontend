import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import Card from '../Common/Card';

// const ResumeUpload = ({ setAnalysisData }) => {
//   const [resumeText, setResumeText] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [resumeFile, setResumeFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [analysisData, setAnalysisData] = useState(null);

const ResumeUpload = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      
      // Read text from file
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeText && !resumeFile) {
      setError('Please provide your resume text or upload a resume file');
      return;
    }
    if (!jobDescription) {
      setError('Please provide a job description');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      // Retrieve the Bearer token
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }
      // Create FormData
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      if (resumeFile) {
        formData.append('resume_file', resumeFile); // Use the correct key expected by FastAPI
      } else {
        formData.append('resume_text', resumeText);
      }
      // Send API request with the Authorization header
      const response = await fetch('http://localhost:8000/resume/analyze-text', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`, // Attach the token
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to analyze resume: ${response.statusText}`);
      }
      const data = await response.json();
      // Store analysis results
      setAnalysisData(data);
      
      // Store in localStorage if you need to access from other components
      localStorage.setItem('analysisData', JSON.stringify(data));
      
      // Navigate to results page
      navigate('/analysis/results');
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!resumeText && !resumeFile) {
  //         setError('Please provide your resume text or upload a resume file');
  //         return;
  //     }

  //     if (!jobDescription) {
  //         setError('Please provide a job description');
  //         return;
  //     }

  //     setIsLoading(true);
  //     setError('');

  //     try {
  //         // Retrieve the Bearer token
  //         const token = localStorage.getItem("token");
  //         if (!token) {
  //             throw new Error("Unauthorized: No token found");
  //         }

  //         // Create FormData
  //         const formData = new FormData();
  //         formData.append('job_description', jobDescription);
  //         if (resumeFile) {
  //             formData.append('resume_file', resumeFile); // Use the correct key expected by FastAPI
  //         } else {
  //             formData.append('resume_text', resumeText);
  //         }

  //         // Send API request with the Authorization header
  //         const response = await fetch('http://localhost:8000/resume/analyze-text', {
  //             method: 'POST',
  //             body: formData,
  //             headers: {
  //                 "Authorization": `Bearer ${token}`, // Attach the token
  //             }
  //         });

  //         if (!response.ok) {
  //             throw new Error(`Failed to analyze resume: ${response.statusText}`);
  //         }

  //         const data = await response.json();

  //         // Store analysis results
  //         setAnalysisData(data);

  //         // Navigate to results page
  //         navigate('/analysis/results');

  //     } catch (err) {
  //         setError(err.message || 'An error occurred during analysis');
  //     } finally {
  //         setIsLoading(false);
  //     }
  // };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Resume Analysis</h2>
      <p className="text-gray-600 mb-6">
        Upload your resume and paste a job description to get personalized feedback and skills matching analysis.
      </p>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Resume (PDF, DOCX, or TXT)
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Or paste your resume text
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste your resume content here..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste the job description here..."
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      </form>
    </Card>
  );
};

export default ResumeUpload;