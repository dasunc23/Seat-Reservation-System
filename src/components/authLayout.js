import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* Left side - Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-700 to-indigo-900 p-10 md:p-12 flex flex-col justify-between">
          <div>
            <Link to="/" className="inline-block mb-8">
              <div className="text-white text-3xl font-bold flex items-center">
                SeatReserve
              </div>
            </Link>
            
            <h1 className="text-3xl font-bold text-white mt-12 mb-4">{title}</h1>
            <p className="text-indigo-200">
              Reserve your perfect workspace with our seamless booking system
            </p>
          </div>
          
          <div className="mt-auto">
            <div className="flex space-x-3 mt-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
                  <div className="h-2 bg-white/30 rounded-full mb-2"></div>
                  <div className="h-2 bg-white/30 rounded-full w-3/4"></div>
                </div>
              ))}
            </div>
            <p className="text-indigo-300 text-sm mt-4">
              "This system has transformed how our interns find and book workspaces."
            </p>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full md:w-1/2 bg-white p-10 md:p-12">
          {children}
          
          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap justify-between text-sm">
              <div className="mb-4 md:mb-0">
                <span className="text-gray-500">© {new Date().getFullYear()} SeatReserve</span>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;