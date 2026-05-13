import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Home } from "./pages/Home";
import { ResetPassword } from "./pages/ResetPassword";

export default function App() {
  const { user, loading } = useAuth();

  // Enquanto o AuthContext verifica o localStorage, não renderizamos nada
  // para evitar que o usuário veja a tela de login por meio segundo antes da Home.
  if (loading) return null; 

  return (
    <Routes>
      {/* ROTAS PÚBLICAS (Só acessíveis se NÃO estiver logado) */}
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/" />} 
      />
      <Route 
        path="/forgot-password" 
        element={!user ? <ForgotPassword /> : <Navigate to="/" />} 
      />
      <Route 
        path="/reset-password" 
        element={!user ? <ResetPassword /> : <Navigate to="/" />} 
      />

      {/* ROTA PRIVADA (Só acessível se ESTIVER logado) */}
      <Route 
        path="/" 
        element={user ? <Home /> : <Navigate to="/login" />} 
      />

      {/* REDIRECIONAMENTO GLOBAL (Qualquer rota inexistente manda para o login ou home) */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}