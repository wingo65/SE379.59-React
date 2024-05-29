import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonFilter from './PokemonFilter';
import { useInventory } from './Inventory'; 

interface Pokemon {
  name: string;
  url: string;
  image?: string;
  types?: string[];
}

const PokemonList: React.FC = () => {
  //Using the useInventory hook to access inventory data and functions
  const { inventory, toggleInventory } = useInventory(); 

  //State variables for managing Pokemon data and loading state
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  //Effect to fetch Pokemon data from the API
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
        const pokemonList = response.data.results;
        const detailedPokemonList = await Promise.all(pokemonList.map(async (poke: Pokemon) => {
          const details = await axios.get(poke.url);
          return {
            ...poke,
            image: details.data.sprites.front_default,
            types: details.data.types.map((typeInfo: any) => typeInfo.type.name)
          };
        }));

        setPokemon(detailedPokemonList);
        setFilteredPokemon(detailedPokemonList);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  //Effect to filter Pokemon based on selected type
  useEffect(() => {
    let filteredList = pokemon;
    if (selectedType !== '') {
      filteredList = filteredList.filter(poke => poke.types && poke.types.includes(selectedType));
    }
    setFilteredPokemon(filteredList);
  }, [selectedType, pokemon]);

  return (
    <div>
      {/*Component for filtering Pokemon by type*/}
      <PokemonFilter onFilterChange={setSelectedType} />
      {/*Displaying Pokemon grid */}
      <ul className="pokemon-grid">
        {filteredPokemon.map((poke, index) => (
          <li key={index} className="pokemon-item">
            {/*Link to Pokemon details page*/}
            <Link to={`/pokemon/${poke.name}`} className="Link-to-Pokemon">
              {poke.name}
              {poke.image && <img src={poke.image} alt={poke.name} />}
            </Link>
            {/*Button to add/remove Pokemon from inventory*/}
            <button onClick={() => toggleInventory(poke.name)}> 
              {inventory.includes(poke.name) ? 'Remove from Inventory' : 'Add to Inventory'} 
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
