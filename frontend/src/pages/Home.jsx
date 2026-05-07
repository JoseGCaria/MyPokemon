import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Função para buscar Pokémons reais da API
  const fetchPokemons = async () => {
    setLoading(true);
    try {
      // Busca os 50 primeiros pokémons
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.error("Erro ao buscar Pokémons:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Bem-vindo a pokedex, {user?.name || "Admin"}!</h1>
      <p>Você está logado como: <strong>{user?.email}</strong></p>
      
      <div style={{ marginTop: "20px", marginBottom: "40px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button 
          onClick={fetchPokemons}
          style={{ padding: "10px 20px", cursor: "pointer", background: "#3432a4", color: "white", border: "1px solid #545353", fontWeight: "bold" }}
        >
          {loading ? "Carregando..." : "Ver Meus Pokémons"}
        </button>
        
        <button 
          onClick={handleLogout}
          style={{ padding: "10px 20px", cursor: "pointer", background: "#ff4d4d", color: "white", border: "none", fontWeight: "bold" }}
        >
          Sair (Logout)
        </button>
      </div>

      {/* Lista de Pokémons gerada após o clique */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", maxWidth: "800px", margin: "0 auto" }}>
        {pokemons.map((poke, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", background: "#f9f9f9", textTransform: "capitalize" }}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split('/')[6]}.png`} 
              alt={poke.name} 
            />
            <p><strong>{poke.name}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};