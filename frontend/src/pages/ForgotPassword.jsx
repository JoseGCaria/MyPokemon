import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // Objeto para feedback colorido
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage({ type: "info", text: "Enviando código..." });
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage({ type: "success", text: "Sucesso! Verifique seu e-mail no Mailtrap." });
      
      setTimeout(() => {
        navigate("/reset-password");
      }, 2500); 
      
    } else {
      setMessage({ type: "error", text: result.message || "Erro ao enviar e-mail." });
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Recuperar Senha</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Enviaremos um código de 6 dígitos para o seu e-mail.
      </p>
      
      {message.text && (
        <div style={{ 
          background: message.type === "error" ? "#ff4d4d" : message.type === "success" ? "#28a745" : "#007bff", 
          color: "white", 
          padding: "10px", 
          marginBottom: "20px",
          borderRadius: "4px",
          maxWidth: "320px",
          margin: "0 auto 20px"
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSend} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "15px", 
        maxWidth: "320px", 
        margin: "0 auto" 
      }}>
        <input 
          type="email" 
          placeholder="Digite seu e-mail cadastrado" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button type="submit" style={{ 
          padding: "12px", 
          background: "#3432a4", 
          color: "white", 
          border: "none", 
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          Enviar Código de Recuperação
        </button>
      </form>

      <div style={{ marginTop: "25px" }}>
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
};