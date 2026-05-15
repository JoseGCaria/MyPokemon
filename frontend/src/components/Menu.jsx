import { Link } from "react-router-dom";

export const Menu = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div style={styles.overlay} onClick={onClose}></div>}

      {/* Menu Lateral */}
      <div style={{ ...styles.menu, left: isOpen ? "0" : "-300px" }}>
        <div style={styles.header}>
          <h2 style={styles.title}>Menu Pokédex</h2>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link} onClick={onClose}>🏠 Home</Link>
          <Link to="/favoritos" style={styles.link} onClick={onClose}>⭐ Meus Favoritos</Link>
          <hr style={styles.divider} />
        </nav>
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  menu: {
    position: "fixed",
    top: 0,
    width: "280px",
    height: "100vh",
    backgroundColor: "#2a2a2a",
    color: "white",
    zIndex: 1000,
    transition: "left 0.3s ease",
    boxShadow: "2px 0 10px rgba(0,0,0,0.5)",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: { fontSize: "1.2rem", margin: 0, color: "#ffcb05" },
  closeBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "2rem",
    cursor: "pointer",
  },
  nav: { display: "flex", flexDirection: "column", gap: "15px" },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "1.1rem",
    padding: "10px",
    borderRadius: "5px",
    transition: "background 0.2s",
  },
  divider: { border: "0.5px solid #444", width: "100%" }
};