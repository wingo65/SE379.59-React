import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Interface for Pokemon details
interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  description: string;
}
//Extracting Pokemon details
const PokemonDetails: React.FC = () => {
 
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [moves, setMoves] = useState<Move[]>([]);
  
  const navigate = useNavigate(); //Use useNavigate hook

  //Fetching Pokemon details based on the name parameter
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        //Err Handling
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [name]);

  //Fetching move details based on the fetched Pokemon details
  useEffect(() => {
    const fetchMoves = async () => {
      if (pokemon) {
        const movesData = await Promise.all(
          pokemon.moves.slice(0, 4).map(async (move) => {
            const response = await axios.get(move.move.url);
            const moveData: Move = {
              name: response.data.name,
              type: response.data.type.name,
              power: response.data.power,
              accuracy: response.data.accuracy,
              description: response.data.effect_entries.find((entry: any) => entry.language.name === 'en').effect,
            };
            return moveData;
          })
        );
        setMoves(movesData);
      }
    };

    fetchMoves();
  }, [pokemon]);


  const handleBackButtonClick = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

    //Return Pokemon details and moves
  return (
    pokemon ? (
      <div className="container mt-5">
        <button className="btn btn-primary mb-3" onClick={handleBackButtonClick}>Back</button> {/* Back button */}
        <h1 className="text-center mb-4">{pokemon.name}</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="img-fluid rounded mx-auto d-block" />
            <p className="text-center">Height: {pokemon.height}</p>
            <p className="text-center">Weight: {pokemon.weight}</p>
          </div>
        </div>
        <h2 className="text-center mt-4">Top 4 Moves</h2>
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            <ul className="list-group">
              {moves.map((move, index) => (
                <li key={index} className="list-group-item">
                  <strong>{move.name}</strong>
                  <p><strong>Type:</strong> {move.type}</p>
                  <p><strong>Power:</strong> {move.power}</p>
                  <p><strong>Accuracy:</strong> {move.accuracy}</p>
                  <p><strong>Description:</strong> {move.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center mt-5">Pokemon not found</div>
    )
  );
};

export default PokemonDetails;
