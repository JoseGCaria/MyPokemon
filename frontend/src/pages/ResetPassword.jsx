import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Adicionado Link aqui
import { internalApi } from "../services/api"; 

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo: estado de carregamento
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem!" });
      return;
    }

    setIsSubmitting(true);

    try {
      await internalApi.post("/reset-password", { 
        email, 
        code, 
        newPassword 
      });

      // Atualiza a persistência local (LocalStorage)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
      }

      alert("Senha alterada com sucesso!");
      navigate("/login");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Código inválido ou expirado.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>Redefinir Senha</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Confirme seu e-mail e digite o código enviado.</p>
      
      {message.text && (
        <div style={{ 
          background: message.type === "error" ? "#ff4d4d" : "#28a745", 
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

      <form onSubmit={handleSubmit} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "15px", 
        maxWidth: "320px", 
        margin: "0 auto" 
      }}>
        <input 
          type="email" 
          placeholder="Seu E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input 
          type="text" 
          placeholder="Código de Verificação" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input 
          type="password" 
          placeholder="Nova Senha" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input 
          type="password" 
          placeholder="Confirme a Nova Senha" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button 
          type="submit" 
          disabled={isSubmitting} // Desabilita enquanto envia
          style={{ 
            padding: "12px", 
            background: isSubmitting ? "#ccc" : "#3432a4", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {isSubmitting ? "Alterando..." : "Alterar Senha"}
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


