import axios from 'axios';

// Instância para seu Backend (Recuperação de senha)
export const internalApi = axios.create({
  baseURL: 'http://localhost:3001'
});

// Instância para a PokeAPI
export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

// Serviço de Pokémons atualizado
export const getPokemonList = async (limit = 1025, offset = 0) => {
  try {
    // Usamos params do Axios para montar a URL: pokemon?limit=1025&offset=0
    const { data } = await pokeApi.get('pokemon', {
      params: {
        limit: limit,
        offset: offset
      }
    });
    
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar Pokémons:", error);
    throw error; 
  }
};