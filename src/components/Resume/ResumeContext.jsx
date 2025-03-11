// src/components/Resume/ResumeContext.js
import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <ResumeContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);