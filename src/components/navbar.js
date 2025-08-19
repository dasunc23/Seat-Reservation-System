import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContect';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="w-full px-2 md:px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="mr-2"></span>
          SeatReserve
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="hidden sm:inline">Hello, {currentUser.name}</span>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="px-3 py-1 bg-indigo-700 rounded hover:bg-indigo-800 transition">
                  Admin Panel
                </Link>
              )}
              <Link to="/dashboard" className="px-3 py-1 bg-indigo-700 rounded hover:bg-indigo-800 transition">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 bg-indigo-700 rounded hover:bg-indigo-800 transition">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 bg-white text-indigo-600 rounded hover:bg-gray-100 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;