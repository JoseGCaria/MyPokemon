export const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.loaderContainer}>
        {/* A Pokébola giratória */}
        <div style={styles.pokeball}>
          <div style={styles.pokeballTop}></div>
          <div style={styles.pokeballCenter}>
            <div style={styles.pokeballButton}></div>
          </div>
          <div style={styles.pokeballBottom}></div>
        </div>
        <p style={styles.text}> Capturando Pokémons...</p>
      </div>
      
      {/* CSS Animation via JS */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh", // Ocupa metade da tela para não empurrar tudo
    width: "100%",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  pokeball: {
    width: "60px",
    height: "60px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    border: "3px solid #000",
    position: "relative",
    overflow: "hidden",
    animation: "spin 1s linear infinite", // Faz a pokébola girar
  },
  pokeballTop: {
    backgroundColor: "#e3350d", // Vermelho
    height: "50%",
    width: "100%",
    borderBottom: "3px solid #000",
  },
  pokeballCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "15px",
    height: "15px",
    backgroundColor: "#fff",
    border: "3px solid #000",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "10",
  },
  pokeballButton: {
    width: "5px",
    height: "5px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#e3350d",
  }
};