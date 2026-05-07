import { createContext, useContext, useState, useEffect } from "react";

// 1. Criação do contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica se há um usuário logado no localStorage ao iniciar
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // --- FUNÇÃO DE LOGIN ---
  const login = (email, password) => {
    // Regra para Admin (Acesso direto para testes)
    if (email === "admin@admin.com" && password === "admin") {
      const adminUser = { name: "Administrador", email: "admin@admin.com" };
      setUser(adminUser);
      localStorage.setItem("loggedUser", JSON.stringify(adminUser));
      console.log("✅ Acesso concedido como Admin!");
      return true;
    }

    // Busca usuários cadastrados no localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);

    if (found) {
      setUser(found);
      localStorage.setItem("loggedUser", JSON.stringify(found));
      return true;
    }

    return false;
  };

  // --- FUNÇÃO DE CADASTRO (Corrige o erro 'register is not a function') ---
  const register = (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Verifica se o e-mail já existe
      if (users.find((u) => u.email === email)) {
        return false;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("✅ Usuário cadastrado com sucesso:", newUser);
      return true;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return false;
    }
  };

  // --- FUNÇÃO DE LOGOUT ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  // --- FUNÇÃO DE RECUPERAÇÃO (Backend) ---
  const forgotPassword = async (email) => {
    try {
      const response = await fetch("http://localhost:3001/send-recovery-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: "Erro ao enviar e-mail." };
      }
    } catch (error) {
      return { success: false, message: "Servidor offline." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// 2. Exportação do Hook personalizado (Para usar como: const { login } = useAuth())
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};