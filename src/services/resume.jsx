import api from './api';

const ResumeService = {
  // Upload resume file
  uploadResume: async (file, name) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      
      const response = await api.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Resume upload error:', error);
      throw error;
    }
  },

  // Submit resume text
  submitResumeText: async (name, textContent) => {
    try {
      const formData = new FormData();
      formData.append('text_content', textContent);
      formData.append('name', name);
      
      const response = await api.post('/resume/upload', formData);
      return response.data;
    } catch (error) {
      console.error('Resume text submission error:', error);
      throw error;
    }
  },

  // Analyze resume with job description
  analyzeResume: async (resumeId, jobDescription) => {
    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      
      const response = await api.post(`/resume/analyze/${resumeId}`, formData);
      return response.data;
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw error;
    }
  },

  // Analyze resume text directly
  analyzeResumeText: async (resumeText, jobDescription) => {
    try {
      const formData = new FormData();
      formData.append('resume_text', resumeText);
      formData.append('job_description', jobDescription);
      
      const response = await api.post('/resume/analyze-text', formData);
      return response.data;
    } catch (error) {
      console.error('Resume text analysis error:', error);
      throw error;
    }
  },

  // Get user stats (missing function)
  getUserStats: async () => {
    try {
      const response = await api.get('/resume/stats');
      return response.data;
    } catch (error) {
      console.error('Get user stats error:', error);
      throw error;
    }
  },

  // Get recent analyses (missing function)
  getRecentAnalyses: async (limit = 5) => {
    try {
      const response = await api.get(`/resume/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get recent analyses error:', error);
      throw error;
    }
  },
};

// Export the entire service as default
export default ResumeService;

// Export individual functions
export const {
  uploadResume,
  submitResumeText,
  analyzeResume,
  analyzeResumeText,
  getUserStats,
  getRecentAnalyses,
} = ResumeService;
