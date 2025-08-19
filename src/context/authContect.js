import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, register as registerService, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const user = await getCurrentUser();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email);
      const data = await loginService(email, password);
      console.log('Login response:', data);

      // Store token and user data
      localStorage.setItem('token', data.token);
      setCurrentUser(data);
      console.log('Login successful, user set:', data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerService(userData);

      // Store token and user data
      localStorage.setItem('token', data.token);
      setCurrentUser(data);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);