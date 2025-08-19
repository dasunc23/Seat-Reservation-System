import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';
import Alert from '../components/alert';

const LoginForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-gray-800/5 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-10 md:p-12 shadow-xl">
        {error && <Alert type="error" message={error} className="mb-6" />}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm text-lg"
              placeholder="you@office.com"
            />
          </div>
          
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
                className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm text-lg"
                placeholder="••••••••"
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
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <div className="pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              className="py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;