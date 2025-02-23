// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUser = await AsyncStorage.getItem('user');
      setIsLoggedIn(loggedIn === 'true');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (userData) => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
