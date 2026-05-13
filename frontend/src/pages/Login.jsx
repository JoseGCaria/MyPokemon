import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  // CORREÇÃO: Adicionadas aspas vazias para evitar warnings de input não-controlado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tenta realizar o login com as credenciais fornecidas
    const success = login(email, password);
    
    if (success) {
      console.log("Login realizado com sucesso!");
      navigate("/");
    } else {
      console.error("Credenciais inválidas.");
      setError("E-mail ou senha inválidos!");
    }
  };

  return (
    <div style={{ 
      padding: "50px", 
      textAlign: "center", 
      fontFamily: "Arial, sans-serif" 
    }}>
      <h1>Login MyPokemon</h1>
      
      {error && (
        <div style={{ 
          background: "#ff4d4d", 
          color: "white", 
          padding: "10px", 
          marginBottom: "20px",
          borderRadius: "4px" 
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "15px", 
        maxWidth: "320px", 
        margin: "0 auto" 
      }}>
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        <button type="submit" style={{ 
          padding: "12px", 
          background: "#28a745", 
          color: "white", 
          border: "none", 
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          Login
        </button>
      </form>

      <div style={{ marginTop: "25px" }}>
        <p>Ainda não tem conta? <Link to="/register">Cadastre-se aqui</Link></p>
        <Link to="/forgot-password" style={{ color: "#007bff", textDecoration: "none" }}>
          Esqueceu sua senha?
        </Link>
      </div>
     
    </div>
  );
};