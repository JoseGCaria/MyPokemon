import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Importação correta
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { register } = useAuth(); // Usando o hook useAuth
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Chama a função de registro do nosso Context
    const success = register(name, email, password);

    if (success) {
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para o login após cadastrar
    } else {
      setError("Este e-mail já está cadastrado ou houve um erro.");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Criar Conta MyPokemon</h1>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "0 auto" }}>
        <input 
          type="text" 
          placeholder="Nome Completo" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: "10px" }}
        />
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "10px" }}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
          Finalizar Cadastro
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Já tem uma conta? <Link to="/login">Voltar para o Login</Link>
      </p>
    </div>
  );
};