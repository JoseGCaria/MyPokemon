export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} - Pokédex Project</p>
      <p style={styles.sub}>Dados fornecidos pela PokéAPI</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#2a2a2a",
    color: "#fff8f8",
    textAlign: "center",
    padding: "2rem",
    marginTop: "auto",
  },
  sub: {
    fontSize: "0.8rem",
    marginTop: "5px",
  }
};