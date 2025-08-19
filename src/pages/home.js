import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContect';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Reserve Your Perfect Workspace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Simple, efficient desk booking for interns. Find and reserve your ideal seat in seconds.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {currentUser ? (
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-white text-indigo-600 rounded-lg border border-indigo-600 text-center font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full">
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`p-4 rounded-lg text-center ${
                      i % 4 === 0 ? 'bg-green-200' : 
                      i % 4 === 1 ? 'bg-red-200' : 
                      i % 4 === 2 ? 'bg-blue-200' : 'bg-yellow-200'
                    }`}>
                      <div className="font-bold">A-{i+1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Seat Reservation System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy Booking',
                description: 'Reserve your seat in just a few clicks with our intuitive interface.',
                icon: '📅'
              },
              {
                title: 'Real-time Availability',
                description: 'See which seats are available in real-time to avoid conflicts.',
                icon: '🔄'
              },
              {
                title: 'Admin Management',
                description: 'Easily manage seating arrangements and view utilization reports.',
                icon: '👨‍💼'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;