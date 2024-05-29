import React, { useState, useEffect } from 'react';
import axios from 'axios';
//Interface for Pokemon type
interface Type {
  name: string;
  url: string;
}

//Props interface for the filter component
interface FilterProps {
  onFilterChange: (type: string) => void;//Callback function to handle filter changes
}
//PokemonFilter component
const PokemonFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  //Fetch Pokemon types from the API
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
      }
    };

    fetchTypes();
  }, []);

    //Handler for select change event
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div>
      <select value={selectedType} onChange={handleChange}>
        <option value="">All Types</option>
        {types.map((type, index) => (
          <option key={index} value={type.name}>{type.name}</option>
        ))}
      </select>
    </div>
  );
};

export default PokemonFilter;