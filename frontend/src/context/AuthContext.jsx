import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('agroconnect_token');
    const savedUser = localStorage.getItem('agroconnect_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });
    if (data.success) {
      localStorage.setItem('agroconnect_token', data.token);
      localStorage.setItem('agroconnect_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${data.user.name}! 🌱`);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('agroconnect_token');
    localStorage.removeItem('agroconnect_user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('agroconnect_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
