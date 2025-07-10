// src/contexts/AuthProvider.tsx

"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { loginUser, registerUser, getMe } from '~/lib/api'; 
import { JwtResponse, LoginRequest, RegisterRequest, User } from '~/lib/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<string>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // DEBUGGING: Log whenever isLoading state changes
  console.log("AuthProvider rendering. IsLoading:", isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      // DEBUGGING: Check if the effect starts
      console.log("AuthProvider useEffect started: Initializing auth...");
      
      const storedToken = localStorage.getItem('skillbridge-token');
      
      if (storedToken) {
        console.log("Token found in localStorage.");
        setToken(storedToken);
        try {
          const userData = await getMe(storedToken);
          console.log("User data fetched successfully:", userData);
          setUser(userData);
        } catch (error) {
          console.error("Session validation failed:", error);
          localStorage.removeItem('skillbridge-token');
          Cookies.remove('skillbridge-token');
          setToken(null);
        }
      } else {
        console.log("No token found in localStorage.");
      }
      
      // DEBUGGING: Check if we are about to set loading to false
      console.log("About to set isLoading to false.");
      setIsLoading(false);
    };
    
    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response: JwtResponse = await loginUser(credentials);
    const { token } = response;
    localStorage.setItem('skillbridge-token', token);
    Cookies.set('skillbridge-token', token, { expires: 1, secure: true, sameSite: 'strict' });
    setToken(token);
    const userData = await getMe(token);
    setUser(userData);
  };
  
  const register = async (data: RegisterRequest) => {
    return await registerUser(data);
  };

  const logout = () => {
    localStorage.removeItem('skillbridge-token');
    Cookies.remove('skillbridge-token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}