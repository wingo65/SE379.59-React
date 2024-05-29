import React from 'react';
import { Link } from 'react-router-dom'; 
import { useInventory } from './Inventory'; 

const InventoryPokemonList: React.FC = () => {
  const { inventory } = useInventory(); 

  return (
    <div className="InventoryPokemonList-container"> 
      <h1 className="InventoryPokemonList-header">Pokémon Inventory</h1> 
      {inventory.length === 0 ? (
        <p className="InventoryPokemonList-text">Whoops! Looks like your Inventory is Empty :(</p> 
      ) : (
        <ul className="pokemon-grid">
          {inventory.map((name, index) => (
            <li key={index} className="pokemon-item">
              <Link to={`/pokemon/${name}`} className="Link-to-Pokemon">
                {name}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                  alt={name}
                  className="pokemon-image"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryPokemonList; 
