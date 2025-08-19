import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContect';
import RegisterForm from '../auth/registerForm';
import AuthLayout from '../components/authLayout';
import Alert from '../components/alert';

  const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleRegister = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      await register(userData);
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
      {error && (
        <Alert type="error" message={error} className="mb-6" />
      )}
      
      {success && (
        <Alert type="success" message={success} className="mb-6" />
      )}
      
      <RegisterForm 
        onSubmit={handleRegister} 
        loading={loading} 
      />
    </AuthLayout>
  );
};

export default RegisterPage;