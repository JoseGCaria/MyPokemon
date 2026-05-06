import React from 'react';

export function PokemonCard({ name, url }) {
  // A PokeAPI não manda a imagem direto na lista, mas podemos 
  // extrair o ID da URL para pegar a imagem oficial.
  const id = url.split('/')[url.split('/').length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}