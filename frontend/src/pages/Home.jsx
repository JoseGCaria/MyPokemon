import { useState, useEffect } from "react";
import { getPokemonList } from "../services/api";
import { PokemonCard } from "../components/PokemonCard";
import { Loader } from "../components/Loader"; 

export const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]); 
  const [status, setStatus] = useState("idle");
  const [searchTerm, setSearchTerm] = useState("");
  

  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    loadAllPokemons();
  }, []);

  const loadAllPokemons = async () => {
    setStatus("loading");
    try {
  
      const data = await getPokemonList(1025, 0); 
      setAllPokemons(data);
      setStatus("success");
    } catch (error) {
      console.error("Erro ao carregar:", error);
      setStatus("error");
    }
  };

  
  const filteredPokemons = allPokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const pokemonsToDisplay = searchTerm 
    ? filteredPokemons 
    : filteredPokemons.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20); 
  };

  return (
    <div style={styles.container}>
   
      <div style={styles.searchWrapper}>
        <input 
          type="text"
          placeholder="Pesquisar Pokémons (ex: Pikachu, Mewtwo...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

 
      {status === "loading" && <Loader />}

   
      {status === "success" && (
        <div style={styles.grid}>
          {pokemonsToDisplay.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      )}

   
      {status === "error" && (
        <div style={{ marginTop: "50px" }}>
          <p style={{ color: "#e3350d", fontWeight: "bold" }}>Ops! Ocorreu um erro ao carregar os dados.</p>
          <button onClick={loadAllPokemons} style={styles.loadMoreButton}>Tentar Novamente</button>
        </div>
      )}

      
      {status === "success" && filteredPokemons.length === 0 && searchTerm && (
        <div style={styles.emptyState}>
          <p>Nenhum Pokémon encontrado com o nome "<strong>{searchTerm}</strong>".</p>
        </div>
      )}

    
      {!searchTerm && visibleCount < filteredPokemons.length && status === "success" && (
        <div style={styles.paginationWrapper}>
          <button onClick={handleLoadMore} style={styles.loadMoreButton}>
            Carregar Mais Pokémons
          </button>
          <p style={styles.counterText}>
            Mostrando {visibleCount} de {filteredPokemons.length}
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { 
    padding: "2rem 1.5rem", 
    textAlign: "center", 
    backgroundColor: "#ffffff", 
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box"
  },
  searchWrapper: { 
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  searchInput: {
    padding: "15px 25px",
    width: "100%",
    maxWidth: "500px",
    borderRadius: "30px",
    border: "3px solid #e3350d",
    fontSize: "16px",
    outline: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    boxSizing: "border-box"
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
    gap: "25px", 
    marginTop: "2rem",
    maxWidth: "1200px", 
    margin: "0 auto",   
    boxSizing: "border-box"
  },
  paginationWrapper: { 
    marginTop: "40px", 
    paddingBottom: "60px",
  },
  loadMoreButton: {
    padding: "15px 50px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#e3350d",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(227, 53, 13, 0.3)",
    marginBottom: "10px"
  },
  counterText: {
    fontSize: "14px",
    color: "#000000",
    fontFamily: "monospace"
  },
  emptyState: {
    marginTop: "50px",
    color: "#666",
    fontSize: "18px"
  }
};