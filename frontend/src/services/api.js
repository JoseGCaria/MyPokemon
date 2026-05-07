import axios from 'axios';

// Criamos uma instância para não repetir a URL base sempre
export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

// Função para buscar a lista de 50 pokemons
export const getPokemonList = async () => {
  try {
    const response = await api.get('pokemon?limit=50');
    return response.data.results; // Retorna o array de nomes e URLs
  } catch (error) {
    console.error("Erro na requisição da API:", error);
    return [];
  }
};