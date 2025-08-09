import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username: string, password: string) => {
    // Replace with real auth logic hitting db endpoint
    if (username === "admin" && password === "password") setIsLoggedIn(true);
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};