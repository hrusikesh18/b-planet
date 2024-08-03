import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const accounts = [
      { username: 'hrusi@gmail.com', password: '12345', role: 'admin' },
      { username: 'normalUser1', password: 'userPass1', role: 'user' },
      { username: 'normalUser2', password: 'userPass2', role: 'user' }
    ];

    const userAccount = accounts.find(account => account.username === email);

    if (userAccount) {
      if (userAccount.password === password) {
        const loggedInUser = { email, role: userAccount.role };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        navigate(userAccount.role === 'admin' ? '/admin' : '/');
      } else {
        setError('Invalid Password');
      }
    } else {
      setError('Not a registered username');
    }
  };

  const updateUser = (updateData) => {
    const updatedUser = { ...user, ...updateData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const authState = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    error,
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
