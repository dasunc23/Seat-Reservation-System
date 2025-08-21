import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/authLayout';
import Button from '../components/button';
import Alert from '../components/alert';
import { resetPassword as resetPasswordApi } from '../services/authService';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!password || !confirm) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const res = await resetPasswordApi(token, password);
      setMessage(res.message || 'Password has been reset successfully');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-gray-800/5 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-10 md:p-12 shadow-xl">
          {message && <Alert type="success" message={message} className="mb-6" />}
          {error && <Alert type="error" message={error} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm text-lg"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-base font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm text-lg"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading} className="py-4 rounded-2xl text-lg">
                {loading ? 'Resetting...' : 'Reset password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;


