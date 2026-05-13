import { createContext, useContext, useState, useEffect } from "react";
import { internalApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) setUser(JSON.parse(loggedUser));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);

    if (found || (email === "admin@admin.com" && password === "admin")) {
      const userData = found || { name: "Admin", email };
      setUser(userData);
      localStorage.setItem("loggedUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.email === email)) return false;

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const forgotPassword = async (email) => {
    try {
      await internalApi.post("/send-recovery-email", { email });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Erro na conexão." 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, forgotPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);