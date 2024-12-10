'use client';
import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Throw an error if the hook is used outside the provider
    if (!context) {
      throw new Error('useAuth must be used within an AuthContextProvider');
    }
  
    return context;
  };
