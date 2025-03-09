import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sidebarItems = [
    { label: 'Overview', path: '/dashboard', icon: 'fas fa-home' },
    { label: 'New Analysis', path: '/resume-analysis', icon: 'fas fa-file-alt' },
    { label: 'History', path: '/dashboard/history', icon: 'fas fa-history' },
    { label: 'Settings', path: '/dashboard/settings', icon: 'fas fa-cog' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile unless toggled */}
        <div className={`bg-gray-800 text-white w-64 fixed h-full transition-all duration-300 z-10 lg:static lg:block ${isMenuOpen ? 'left-0' : '-left-64 lg:left-0'}`}>
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">ResumeGPT</h2>
          </div>
          <nav className="mt-4">
            <ul>
              {sidebarItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-4 py-3 hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700' : ''}`}
                  >
                    <i className={`${item.icon} mr-3`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-20"
          onClick={toggleMenu}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Main content */}
        <div className="flex-1 p-6 lg:pl-6">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;