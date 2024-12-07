import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    email: "",
    token: "",
  });

  const login = (email, token) => {
    setAuthData({ email, token });
  };

  const logout = () => {
    setAuthData({ email: "", token: "" });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
