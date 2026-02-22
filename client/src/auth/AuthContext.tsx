import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("dog_lips_token");
  });

  const isLoggedIn = !!token;

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://dog-lips-site-production.up.railway.app/auth/login", { 
        username, 
        password 
      });
      
      if (response.status === 200 && response.data.token) {
        const accessToken = response.data.token;
        sessionStorage.setItem("dog_lips_token", accessToken);
        setToken(accessToken);
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("dog_lips_token");
    setToken(null);
  };

  // Sync token state with localStorage across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "dog_lips_token") {
        setToken(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};