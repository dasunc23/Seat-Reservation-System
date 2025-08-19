import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContect';
import LoginForm from '../auth/loginForm';
import AuthLayout from '../components/authLayout';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <LoginForm 
        onSubmit={handleLogin} 
        loading={loading} 
      />
    </AuthLayout>
  );
};

export default LoginPage;