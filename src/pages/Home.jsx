import { useEffect, useState } from 'react';
import { getPokemonList } from '../services/api';
import { PokemonCard } from '../components/PokemonCard';

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chamada à API ao carregar a página
    getPokemonList().then((data) => {
      setPokemons(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loader">Carregando Pokédex...</div>;

  return (
    <div className="home-container">
      <h1>Minha Pokédex</h1>
      <div className="pokemon-grid">
        {pokemons.map((poke) => (
          <PokemonCard 
            key={poke.name} 
            name={poke.name} 
            url={poke.url} 
          />
        ))}
      </div>
    </div>
  );
}