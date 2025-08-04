import { useState, useEffect } from 'react'

export default function PokemonCard({ pokemonId }){
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(pokemonData => {
        setPokemon(pokemonData);
        console.log(pokemonData);
        setLoading(false)
      });
  }, [pokemonId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-xl border-2 border-yellow-400 p-4 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <span className="text-red-600 font-bold">HP {pokemon.stats[0].base_stat}</span>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-full h-48 object-contain"
        />
      </div>

      <div className="flex gap-2 mb-4">
        {pokemon.types.map(type => (
          <span key={type.type.name} className="px-3 py-1 rounded-full bg-green-500 text-white text-sm">
            {type.type.name}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        <p><strong>Height:</strong> {pokemon.height / 10}m</p>
        <p><strong>Weight:</strong> {pokemon.weight / 10}kg</p>
      </div>
    </div>
  )
}
