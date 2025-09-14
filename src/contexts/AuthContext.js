'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from '@/lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = Cookies.get('access_token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await authAPI.getProfile();
          setUser(response.data);
          setIsAdmin(response.data.is_admin || false);
        } catch (error) {
          // Token is invalid, remove it
          Cookies.remove('access_token');
          setToken(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials, isAdminLogin = false) => {
    try {
      const response = isAdminLogin 
        ? await authAPI.adminLogin(credentials)
        : await authAPI.login(credentials);
      const { access_token } = response.data;
      
      // Store token in cookie
      Cookies.set('access_token', access_token, { expires: 7 }); // 7 days
      setToken(access_token);
      
      if (isAdminLogin) {
        // For admin login, set admin user data
        setUser({
          email: credentials.email,
          first_name: 'Admin',
          is_admin: true
        });
        setIsAdmin(true);
      } else {
        // Get user profile for regular login
        const profileResponse = await authAPI.getProfile();
        setUser(profileResponse.data);
        setIsAdmin(profileResponse.data.is_admin || false);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      // Auto-login after registration
      const loginResult = await login({
        email: userData.email,
        password: userData.password
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};