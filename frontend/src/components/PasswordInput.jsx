import { useState } from "react";

// IMPORTANTE: Verifique se os nomes dos arquivos abaixo estão corretos
// De acordo com o seu print: pikachuOlhos.png e PikachuFechado.png
import pikachuAberto from "../assets/pikachuOlhos.png"; 
import pikachuFechado from "../assets/PikachuFechado.png"; 

export const PasswordInput = ({ value, onChange, placeholder = "Senha" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <input 
        type={showPassword ? "text" : "password"} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        required 
        style={styles.input}
      />
      
      <button 
        type="button" 
        onClick={togglePassword}
        style={styles.button}
        title={showPassword ? "Esconder senha" : "Ver senha"}
      >
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.button}>
         <img 
            src={showPassword ? pikachuFechado : pikachuAberto} 
            alt="Pikachu" 
            style={{ width: "60px", height: "auto" }} 
         />
        </button>
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100%",
    maxWidth: "400px", 
    margin: "0 auto",
  },
  input: {
    padding: "12px",
    paddingRight: "60px", 
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "16px",
    outline: "none"
  },
  button: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    outline: "none"
  },
  image: {
    width: "50px", 
    height: "auto",
    pointerEvents: "none" 
  }
};