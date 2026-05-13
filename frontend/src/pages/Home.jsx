import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPokemonList } from "../services/api";
import { useNavigate } from "react-router-dom"; // Importe o navigate

export const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Inicialize o navigate
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState("idle");

  // Função para deslogar e redirecionar
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const loadPokemons = async () => {
    setStatus("loading");
    try {
      const data = await getPokemonList();
      setPokemons(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={styles.container}>
      {/* Botão de Logout posicionado no topo */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Sair
        </button>
      </div>

      <h1>Olá, {user?.name}!</h1>
      
      <button onClick={loadPokemons} disabled={status === "loading"} style={styles.exploreButton}>
        {status === "loading" ? "Carregando..." : "Explorar Pokémons"}
      </button>

      {status === "error" && <p style={{ color: "red" }}>Houve um problema ao carregar.</p>}

      <div style={styles.grid}>
        {pokemons.map((p, i) => {
          const id = p.url.split("/")[6];
          return (
            <div key={i} style={styles.card}>
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                alt={p.name} 
                width="100" 
              />
              <p style={{ textTransform: "capitalize" }}><strong>{p.name}</strong></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "2rem", textAlign: "center", fontFamily: "sans-serif" },
  
  // Estilo do botão de sair (vermelho)
  logoutButton: {
    padding: "8px 16px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  // Estilo do botão de explorar (cinza igual ao da sua imagem)
  exploreButton: {
    padding: "10px 20px",
    cursor: "pointer",
    background: "#efefef",
    border: "1px solid #767676",
    borderRadius: "2px"
  },

  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
    gap: "1rem", 
    marginTop: "2rem" 
  },
  
  card: { 
    padding: "1rem", 
    background: "#fff", 
    borderRadius: "8px", 
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    border: "1px solid #eee"
  }
};