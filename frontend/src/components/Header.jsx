import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Menu } from "./Menu"; 

export const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div style={styles.headerSpacer}></div>

      <header style={styles.header}>
        <div style={styles.container}>
          
       
          <div style={styles.leftSection}>
            <button 
              onClick={() => setIsMenuOpen(true)} 
              style={styles.menuBtn}
              title="Abrir Menu"
            >
              ☰
            </button>
            <Link to="/" style={styles.logo}>
              <span style={{ color: "#ff0505c6" }}>Poké</span>
              <span style={{ color: "#3466af" }}>dex</span>
            </Link>
          </div>

          <nav style={styles.rightNav} className="desktop-nav">
            <div style={styles.desktopLinks}>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/favoritos" style={styles.link}>Favoritos</Link>
            </div>

            {user && (
              <>
                <div style={styles.divider}>|</div>
                <button onClick={logout} style={styles.logoutBtn}>Sair</button>
              </>
            )}
          </nav>

        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const styles = {
  headerSpacer: {
    height: "60px",
    width: "100%",
  },
  header: {
    backgroundColor: "#2a2a2a",
    color: "white",
    padding: "0 2rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    
  
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000, 
    
    height: "60px", 
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%"
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  menuBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.8rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    textDecoration: "none",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: "1px",
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  desktopLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "#eee",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    whiteSpace: "nowrap"
  },
  divider: {
    color: "#555",
    fontSize: "1.2rem",
    userSelect: "none"
  },
  logoutBtn: {
    backgroundColor: "#e3350d",
    color: "white",
    border: "none",
    padding: "6px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    whiteSpace: "nowrap"
  }
};