import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import PokemonCard from './PokemonCard'

const fetchPokemonList = async (startId, count = 20) => {
  const pokemonIds = [];
  for (let i = startId; i < startId + count; i++) {
    pokemonIds.push(i);
  }

  const fetchPromises = pokemonIds.map(id =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
  );

  const pokemonData = await Promise.all(fetchPromises)

  return pokemonData;
}

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const loadMorePokemon = async () => {
    const newPokemon = await fetchPokemonList(loadedCount + 1, 20)
    setPokemonList(prev => [...prev, ...newPokemon]);
    setLoadedCount(prev => prev + 20)
  };

  useEffect(() => {
    const loadInitialPokemon = async () => {
      const initialPokemon = await fetchPokemonList(1, 20);
      setPokemonList(initialPokemon);
      setLoadedCount(20);
    };
    loadInitialPokemon();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-sky-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-8">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-center p-4 bg-sky-200 pb-10">
        <button className="bg-slate-500 text-white rounded-lg shadow-xl p-4 hover:bg-slate-400" onClick={loadMorePokemon}>Load More</button>
      </div>
    </>
  )
}
