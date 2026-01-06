"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: number;
  board: string;
  userRole: string;
  token?: string; // auth token from backend, if available
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sisya_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
        console.log('UserContext: Restored logged-in user from localStorage:', userData.name);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('sisya_user');
      }
    }
  }, []);

  // Debug: Log state changes
  useEffect(() => {
    console.log('UserContext: State changed - isLoggedIn:', isLoggedIn, 'user:', user);
  }, [isLoggedIn, user]);

  const login = (userData: User) => {
    console.log('UserContext: User logged in successfully:', userData.name, 'with data:', userData);
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('sisya_user', JSON.stringify(userData));
    console.log('UserContext: User state updated and saved to localStorage');
  };

  const logout = () => {
    console.log('UserContext: User logged out');
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('sisya_user');
    console.log('UserContext: User state cleared and removed from localStorage');
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
