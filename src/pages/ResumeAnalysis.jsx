import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/Layout/Dashboard';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import ResumeUpload from '../components/Resume/ResumeUpload';
import SkillsMatch from '../components/Resume/SkillsMatch';
import Suggestions from '../components/Resume/Suggestions';
// import { analyzeResume, uploadResumeFile } from '../services/resume';

import { analyzeResume, uploadResume } from '../services/resume';


const ResumeAnalysis = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleTextInputChange = (e) => {
    if (e.target.name === 'resumeText') {
      setResumeText(e.target.value);
    } else if (e.target.name === 'jobDescription') {
      setJobDescription(e.target.value);
    }
  };

  const handleFileUpload = (file) => {
    setResumeFile(file);
    setResumeText(''); // Clear text input when file is uploaded
  };

  const validateInputs = () => {
    if ((!resumeText && !resumeFile) || !jobDescription) {
      setError('Please provide both a resume (text or file) and a job description.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleAnalyzeClick = async () => {
    if (!validateInputs()) return;
    
    try {
      setIsAnalyzing(true);
      setError(null);
      
      let results;
      if (resumeFile) {
        // Use file upload API
        const formData = new FormData();
        formData.append('resume_file', resumeFile);
        formData.append('job_description', jobDescription);
        results = await uploadResumeFile(formData);
      } else {
        // Use text analysis API
        results = await analyzeResume({
          resume_text: resumeText,
          job_description: jobDescription
        });
      }
      
      setAnalysisResults(results);
      setStep(2);
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError('Failed to analyze your resume. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAndContinue = () => {
    // Navigate to the analysis detail page after saving
    navigate(`/resume-analysis/${analysisResults.id}`);
  };

  const handleStartNewAnalysis = () => {
    if (analysisResults) {
      setShowConfirmModal(true);
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setStep(1);
    setResumeText('');
    setResumeFile(null);
    setJobDescription('');
    setAnalysisResults(null);
    setError(null);
    setShowConfirmModal(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {step === 1 ? 'Resume Analysis' : 'Analysis Results'}
        </h1>
        <p className="text-gray-600">
          {step === 1 
            ? 'Upload your resume and a job description to see how well they match.' 
            : 'Review your resume analysis and get suggestions for improvement.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {step === 1 ? (
        <Card>
          <ResumeUpload
            resumeText={resumeText}
            jobDescription={jobDescription}
            onTextChange={handleTextInputChange}
            onFileUpload={handleFileUpload}
            currentFile={resumeFile}
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleAnalyzeClick} 
              isLoading={isAnalyzing}
              disabled={isAnalyzing}
            >
              Analyze Resume
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {analysisResults && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <SkillsMatch 
                  matchedTechSkills={analysisResults.matched_tech_skills}
                  matchedSoftSkills={analysisResults.matched_soft_skills}
                  missingTechSkills={analysisResults.missing_tech_skills}
                  missingSoftSkills={analysisResults.missing_soft_skills}
                />
              </div>
              
              <Suggestions suggestions={analysisResults.suggestions} />
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handleStartNewAnalysis}
                >
                  Start New Analysis
                </Button>
                
                <Button onClick={handleSaveAndContinue}>
                  Save & Continue
                </Button>
              </div>
            </>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Start New Analysis"
      >
        <div className="mb-6">
          <p>Are you sure you want to start a new analysis? Your current results will not be saved.</p>
        </div>
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={resetForm}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default ResumeAnalysis;