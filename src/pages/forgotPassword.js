import React, { useState } from 'react';
import AuthLayout from '../components/authLayout';
import Button from '../components/button';
import Alert from '../components/alert';
import { requestPasswordReset } from '../services/authService';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const res = await requestPasswordReset(email);
      setMessage(res.message || 'If that account exists, a reset link has been sent');
      // For dev convenience, if resetUrl provided, show it
      if (res.resetUrl) {
        setMessage(prev => `${prev}. Reset link: ${res.resetUrl}`);
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-gray-800/5 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-10 md:p-12 shadow-xl">
          {message && <Alert type="success" message={message} className="mb-6" />}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm text-lg"
                placeholder="you@office.com"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading} className="py-4 rounded-2xl text-lg">
                {loading ? 'Sending reset link...' : 'Send reset link'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;


