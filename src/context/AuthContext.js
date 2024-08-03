// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock data
const accounts = [
  { username: 'hrusi@gmail.com', password: '12345', role: 'admin' },
  { username: 'normalUser1', password: 'userPass1', role: 'user' },
  { username: 'normalUser2', password: 'userPass2', role: 'user' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // Simulate server-side logic
    const userAccount = accounts.find(account => account.username === email);

    if (userAccount) {
      if (userAccount.password === password) {
        setUser({ email, role: userAccount.role });
        navigate(userAccount.role === 'admin' ? '/admin' : '/');
      } else {
        setError('Invalid Password');
      }
    } else {
      setError('Not a registered username');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const authState = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    error,
  };

  return <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>;
};
