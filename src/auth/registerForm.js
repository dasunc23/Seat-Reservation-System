import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';
import Alert from '../components/alert';

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'intern'
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-gray-800/5 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-10 md:p-12 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm placeholder-gray-400 placeholder-opacity-75 text-lg"
              placeholder="Enter your full name (e.g., John Doe)"
            />
          </div>
          
          {/* Office Email */}
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
              Office Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm placeholder-gray-400 placeholder-opacity-75 text-lg"
                placeholder="your.name@company.com"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                @office.com
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-5 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm placeholder-gray-400 placeholder-opacity-75 text-lg"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-base font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-5 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm placeholder-gray-400 placeholder-opacity-75 text-lg"
                  placeholder="Repeat your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <Button
              type="submit"
              variant="primary"
              size="xl"
              fullWidth
              disabled={loading}
              className="py-5 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;