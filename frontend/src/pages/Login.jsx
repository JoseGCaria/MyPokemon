import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput"; 

// Importação da imagem local presente na sua pasta assets
import bgImage from "../assets/pokemon-fundo.avif";

export const Login = () => {
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("rememberedEmail") || "";
  });
  
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Estado para o checkbox (inicia como true se já houver um email salvo)
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberedEmail"));

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const success = login(email, password);
    
    if (success) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate("/");
    } else {
      setError("E-mail ou senha inválidos!");
    }
  };

  return (
    <div 
      style={{ 
        ...styles.pageWrapper, 
        backgroundImage: `url(${bgImage})` 
      }} 
      className="login-page"
    >
      <div style={styles.centralContainer}>
      
        <div style={styles.headerTextSection}>
          <h1 style={styles.mainTitle}>Pokédex</h1>
          <p style={styles.subtitle}>
            Sistema de cadastro de Pokémon
          </p>
        </div>

        <div style={styles.cardContainer}>
          <h2 style={styles.cardTitle}>Bem-vindo!</h2>
          <p style={styles.cardSubtitle}>Faça login ou crie sua conta para começar</p>

          {error && <div style={styles.errorBadge}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>E-mail</label>
              <input 
                type="email" 
                placeholder="E_mail" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          
            <div style={styles.inputGroup}>
              <label style={styles.label}>Senha</label>
              <PasswordInput
              type="password"
                placeholder="Sua senha"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={styles.input}
                required
              />
            </div>

         
            <div style={styles.rememberWrapper}>
              <label style={styles.rememberLabel}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                Lembrar meu e-mail
              </label>
            </div>

            <button type="submit" style={styles.loginBtn}>
              Entrar
            </button>
          </form>

       
          <div style={styles.footerLinks}>
            <p style={styles.registerText}>
              Ainda não tem conta? <Link to="/register" style={styles.link}>Cadastre-se aqui</Link>
            </p>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    boxSizing: "border-box"
  },
  centralContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "450px", 
    gap: "1.5rem"
  },
  headerTextSection: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  mainTitle: {
    fontSize: "4.5rem",
    fontWeight: "900",
    margin: "0 0 0.2rem 0",
    letterSpacing: "-1px",
    color: "#ffffff",
    textShadow: "3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000, 1px 1px 0px #000000" 
  },
  subtitle: {
    fontSize: "1.35rem",
    margin: "0",
    color: "#ffffff",
    fontWeight: "600",
    textShadow: "1px 1px 6px rgba(0, 0, 0, 0.8)"
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem 2.2rem 2rem 2.2rem",
    width: "100%",
    boxShadow: "0 12px 40px rgb(0, 0, 0)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: "border-box"
  },
  cardTitle: {
    fontSize: "2rem",
    color: "#1a1a1a",
    margin: "0 0 0.5rem 0",
    fontWeight: "700"
  },
  cardSubtitle: {
    fontSize: "0.95rem",
    color: "#666",
    margin: "0 0 2rem 0",
    textAlign: "center"
  },
  errorBadge: { 
    background: "#ff4d4d", 
    color: "white", 
    padding: "11px", 
    marginBottom: "1.5rem", 
    borderRadius: "6px",
    width: "100%",
    textAlign: "center",
    fontSize: "0.9rem",
    fontWeight: "600",
    boxSizing: "border-box"
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    width: "100%"
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#333",
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid #dcdcdc",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#f9fbfd",
    boxSizing: "border-box"
  },
  rememberWrapper: { 
    textAlign: "left", 
    display: "flex", 
    alignItems: "center",
    width: "100%"
  },
  rememberLabel: { 
    fontSize: "0.9rem", 
    color: "#444", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center", 
    gap: "8px",
    fontWeight: "500"
  },
  checkbox: { 
    cursor: "pointer", 
    width: "16px", 
    height: "16px" 
  },
  loginBtn: {
    backgroundColor: "#0a12ffd1", 
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "0.4rem",
    width: "100%",
    boxShadow: "0 4px 12px rgba(180, 29, 29, 0.25)",
    transition: "background-color 0.2s ease"
  },
  footerLinks: { 
    marginTop: "1.5rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    width: "100%"
  },
  registerText: {
    fontSize: "0.9rem",
    color: "#444",
    margin: 0
  },
  link: { 
    color: "#f90606ba", 
    fontWeight: "bold", 
    textDecoration: "none" 
  },
  forgotLink: { 
    color: "#f90606ba", 
    textDecoration: "none", 
    fontSize: "0.85rem",
    fontWeight: "500"
  }
};