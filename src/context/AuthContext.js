import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const isLoggedInToken = localStorage.getItem('isLogged');
  const sessionIdToken = localStorage.getItem('sessionId');
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInToken);
  const [sessionId, setSessionId] = useState(sessionIdToken);

  const login = (sessionId) => {
    localStorage.setItem('isLogged', 'true')
    localStorage.setItem('sessionId', sessionId);
    setIsLoggedIn(true);
    setSessionId(sessionId);
  };

  const logout = () => {

    localStorage.removeItem('isLogged');
    localStorage.removeItem('sessionId');
    setIsLoggedIn(false);
    setSessionId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, sessionId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};