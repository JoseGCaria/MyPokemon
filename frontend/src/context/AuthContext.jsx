import { createContext, useContext, useState, useEffect } from "react";
import { internalApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser));
      } catch (e) {
        localStorage.removeItem("loggedUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);

    // Verificação de Admin ou Usuário Comum
    if (found || (email === "admin@admin.com" && password === "admin")) {
      const userData = found || { name: "Admin", email };
      
      setUser(userData);
      
      // 1. Grava a sessão (Usuário logado no momento)
      localStorage.setItem("loggedUser", JSON.stringify(userData));
      
      // 2. Grava a lembrança do e-mail (Persiste mesmo após logout)
      localStorage.setItem("rememberedEmail", email);
      
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.email === email)) return false;

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    
    // Opcional: Já salva o e-mail no registro para facilitar o primeiro login
    localStorage.setItem("rememberedEmail", email);
    
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
    // IMPORTANTE: Removemos apenas a sessão. 
    // O "rememberedEmail" NÃO é removido aqui para que continue na tela de login.
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, forgotPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);