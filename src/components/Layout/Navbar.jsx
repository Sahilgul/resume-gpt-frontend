// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../Auth/AuthContext';

// const Navbar = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-600 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="text-white text-xl font-bold">
//                 ResumeGPT
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link
//                 to="/"
//                 className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Home
//               </Link>
//               {isAuthenticated && (
//                 <>
//                   <Link
//                     to="/dashboard"
//                     className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     to="/analysis"
//                     className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     New Analysis
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-white text-sm">Hello, {user?.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-1 rounded-md text-sm font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-1 rounded-md text-sm font-medium"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="flex items-center sm:hidden">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* Icon when menu is closed */}
//               <svg
//                 className="block h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu, show/hide based on menu state */}
//       <div className="sm:hidden" id="mobile-menu">
//         <div className="px-2 pt-2 pb-3 space-y-1">
//           <Link
//             to="/"
//             className="text-white block px-3 py-2 rounded-md text-base font-medium"
//           >
//             Home
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link
//                 to="/dashboard"
//                 className="text-white block px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 to="/analysis"
//                 className="text-white block px-3 py-2 rounded-md text-base font-medium"
//               >
//                 New Analysis
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <Link
//                 to="/login"
//                 className="text-white block px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-white block px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white text-xl font-bold">
              ResumeGPT
            </Link>
            <div className="hidden sm:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-gray-200 text-sm font-medium">
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="text-white hover:text-gray-200 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link to="/analysis" className="text-white hover:text-gray-200 text-sm font-medium">
                    New Analysis
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side - User Info & Logout */}
          <div className="hidden sm:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">Hello, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-1 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-gray-200 text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-1 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
