"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  user_type: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
    // Optionally, store user data or token in localStorage/sessionStorage
  };

  const logout = () => {
    setUser(null);
    // Optionally, clear user data or token from localStorage/sessionStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
