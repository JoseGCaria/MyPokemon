import React, { memo } from 'react';

// Usamos memo para que o React só renderize o card se o nome ou a URL mudarem
export const PokemonCard = memo(({ name, url }) => {
  // Extração do ID de forma mais segura
  const id = url.split('/').filter(Boolean).pop();

  // URL para a arte oficial (muito mais bonita e em alta resolução)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-card" style={styles.card}>
      <img 
        src={imageUrl} 
        alt={name} 
        style={styles.image}
        // Fallback caso a imagem oficial falhe
        onError={(e) => { e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
      />
      <h3 style={styles.title}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
      <span style={styles.idLabel}>#{id.padStart(3, '0')}</span>
    </div>
  );
});

// Estilos básicos integrados (ou use seu CSS externo)
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
    background: '#fff',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    position: 'relative'
  },
  image: {
    width: '120px',
    height: '120px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '1.1rem',
    margin: '5px 0',
    color: '#333'
  },
  idLabel: {
    fontSize: '0.8rem',
    color: '#888',
    fontWeight: 'bold'
  }
};