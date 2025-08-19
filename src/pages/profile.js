import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContect';
import API from '../services/api';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name || '',
        email: currentUser.email || ''
      });
    }
  }, [currentUser]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await API.put('/auth/me', userData);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }
    
    try {
      await API.put('/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage({ type: 'success', text: 'Password updated successfully' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to update password' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleUserUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={currentUser?.role || ''}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
        
        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;