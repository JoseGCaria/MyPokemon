import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { MainLayout } from "./layouts/MainLayout"; 

// Importação das páginas
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Home } from "./pages/Home";

export default function App() {
  const { user, loading } = useAuth();

  // Enquanto o Firebase/Auth checa se o usuário existe, não mostramos nada (ou um loader)
  if (loading) return null; 

  return (
    <Routes>
      {/* ROTAS PÚBLICAS (Páginas limpas, sem menu) */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path="/reset-password" element={!user ? <ResetPassword /> : <Navigate to="/" />} />

      {/* ROTAS PRIVADAS (Envolvidas pelo Layout que tem Header/Footer) */}
      <Route element={user ? <MainLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<Home />} />
        {/* Futuras rotas como /perfil ou /favoritos entram aqui */}
      </Route>

      {/* REDIRECIONAMENTO GLOBAL */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}