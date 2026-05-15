export const PokemonCard = ({ pokemon }) => {
  // PROTEÇÃO: Se o pokemon ainda não carregou, não tenta ler a URL
  if (!pokemon || !pokemon.url) return null;

  // Agora é seguro pegar o ID
  const id = pokemon.url.split("/")[6];
  const formattedId = id.padStart(3, '0');

  return (
    <div style={styles.pokedexCard}>
      {/* Topo da Pokédex */}
      <div style={styles.pokedexTop}>
        <div style={styles.pokedexLight}></div>
        <span style={styles.pokedexId}>#{formattedId}</span>
      </div>

      {/* Tela do Pokémon */}
      <div style={styles.pokedexScreen}>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
          alt={pokemon.name} 
          style={styles.pokedexImg} 
        />
      </div>

      {/* Visor de Nome */}
      <div style={styles.pokedexInfo}>
        <p style={styles.pokedexName}>{pokemon.name}</p>
        <div style={styles.pokedexDecoration}>
          <div style={{ ...styles.dot, background: "#ff0000" }}></div>
          <div style={{ ...styles.dot, background: "#0000ff" }}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pokedexCard: { 
    background: "#e3350d", 
    padding: "10px", 
    borderRadius: "15px 15px 15px 40px", 
    border: "4px solid #8b0000",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.99)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  pokedexTop: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5px" },
  pokedexLight: { width: "12px", height: "12px", background: "#00ffff", borderRadius: "50%", border: "2px solid white", boxShadow: "0 0 5px #00ffff" },
  pokedexId: { color: "#fff", fontWeight: "bold", fontSize: "12px", fontFamily: "monospace" },
  pokedexScreen: { background: "#222", border: "8px solid #dedede", borderRadius: "10px", padding: "10px", display: "flex", justifyContent: "center" },
  pokedexImg: { width: "100%", height: "auto", filter: "drop-shadow(2px 2px 2px #000)" },
  pokedexInfo: { background: "#51ad60", padding: "8px", borderRadius: "5px", border: "2px solid #2e6337", textAlign: "center" },
  pokedexName: { margin: "0", color: "#000", fontWeight: "bold", textTransform: "capitalize", fontSize: "14px", fontFamily: "monospace" },
  pokedexDecoration: { display: "flex", justifyContent: "center", gap: "8px", marginTop: "4px" },
  dot: { width: "6px", height: "6px", borderRadius: "50%", border: "1px solid #000" }
};