import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonFilter from './PokemonFilter';
import { useFavorites } from './Favorites';
//our interface
interface Pokemon {
  name: string;
  url: string;
  image?: string;
  types?: string[];
}

const PokemonList: React.FC = () => {
    //hook to manage favorites
  const { favorites, toggleFavorite } = useFavorites();
  //2 states to manage pokemon details
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //states for filtering 
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
//fetching from API on component
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
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);
//handle searching and filtering
  useEffect(() => {
    let filteredList = pokemon;
    //filtering by type
    if (selectedType !== '') {
      filteredList = filteredList.filter(poke => poke.types && poke.types.includes(selectedType));
    }
    //updating pokemon list based off search
    setFilteredPokemon(filteredList);
  }, [selectedType, pokemon]);
  //render list
  return (
    <div>
      <PokemonFilter onFilterChange={setSelectedType} />
      <ul>
        {filteredPokemon.map((poke, index) => (
          <li key={index}>
            <Link to={`/pokemon/${poke.name}`}>
              {poke.name}
              {poke.image && <img src={poke.image} alt={poke.name} />}
            </Link>
            <button onClick={() => toggleFavorite(poke.name)}>
              {favorites.includes(poke.name) ? 'Unfavorite' : 'Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;