import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword } = useAuth();

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage("Enviando...");
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage("Sucesso! Verifique o Mailtrap.");
    } else {
      setMessage(result.message || "Erro ao enviar e-mail.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleSend}>
        <input 
          type="email" 
          placeholder="Digite seu e-mail cadastrado" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <button type="submit">Enviar Código</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};