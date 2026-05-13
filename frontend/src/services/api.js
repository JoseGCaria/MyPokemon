import axios from 'axios';

// Instância para seu Backend (Recuperação de senha)
export const internalApi = axios.create({
  baseURL: 'http://localhost:3001'
});

// Instância para a PokeAPI
export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

// Serviço de Pokémons
export const getPokemonList = async (limit = 1000) => {
  try {
    const { data } = await pokeApi.get(`pokemon?limit=${limit}`);
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar Pokémons:", error);
    throw error; // Lançamos o erro para o componente tratar
  }
};