import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_STORAGE = 'authUser';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE);
    if(storedUser){
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error while parsing user from local storage.', error);
        localStorage.removeItem(LOCAL_STORAGE);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};