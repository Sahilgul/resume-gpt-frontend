  import React from 'react';
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { AuthProvider, useAuth } from './components/Auth/AuthContext';
  import Navbar from './components/Layout/Navbar';
  import Footer from './components/Layout/Footer';
  import Home from './pages/Home';
  import Login from './pages/Login';
  import Register from './pages/Register';
  import Dashboard from './pages/Dashboard';
  import ResumeAnalysis from './pages/ResumeAnalysis';
  import './styles/main.css';

import AnalysisResults from './components/Resume/AnalysisResults'

import History from './pages/History'; 
import UserSettings from './pages/UserSettings'; 
// import UserSettings from './pages/UserSettings';


  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  function AppContent() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analysis" 
                element={
                  <ProtectedRoute>
                    <ResumeAnalysis />
                  </ProtectedRoute>
                } 
              />
              <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard/settings" 
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              } 
            />


<Route path="/analysis/results" element={
            <ProtectedRoute>
              <AnalysisResults />
            </ProtectedRoute>
          } />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }

  function App() {
    return (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    );
  }

  export default App;