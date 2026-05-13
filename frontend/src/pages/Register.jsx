import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Chama a função de registro do nosso Context
    const success = register(name, email, password);

    if (success) {
      alert("✅ Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para o login após cadastrar
    } else {
      setError("Este e-mail já está cadastrado ou houve um erro.");
    }
  };

  return (
    <div style={{ 
      padding: "50px", 
      textAlign: "center",
      fontFamily: "Arial, sans-serif" 
    }}>
      <h1>Criar Conta MyPokemon</h1>
      
      {/* Caixa de erro com o mesmo estilo do Login */}
      {error && (
        <div style={{ 
          background: "#ff4d4d", 
          color: "white", 
          padding: "10px", 
          marginBottom: "20px",
          borderRadius: "4px",
          maxWidth: "300px",
          margin: "0 auto 20px"
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
          type="text" 
          placeholder="Nome Completo" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
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
          Finalizar Cadastro
        </button>
      </form>

      <div style={{ marginTop: "25px" }}>
        <p>
          Já tem uma conta? <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>Voltar para o Login</Link>
        </p>
      </div>
    </div>
  );
};

