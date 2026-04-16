import { createContext, useContext, useMemo, useState } from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("dsa_user");
    return stored ? JSON.parse(stored) : null;
  });

  const updateLocalUser = (userData) => {
    if (userData) {
      localStorage.setItem("dsa_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("dsa_user");
    }
    setUser(userData);
  };

  const login = async (email, password) => {
    const { data } = await apiClient.post("/auth/login", { email, password });
    localStorage.setItem("dsa_token", data.data.token);
    updateLocalUser(data.data.user);
  };

  const register = async (name, email, password) => {
    const { data } = await apiClient.post("/auth/register", { name, email, password });
    localStorage.setItem("dsa_token", data.data.token);
    updateLocalUser(data.data.user);
  };

  const logout = () => {
    localStorage.removeItem("dsa_token");
    updateLocalUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      setUser: updateLocalUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
