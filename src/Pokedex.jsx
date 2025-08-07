import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import PokemonCard from './PokemonCard'
import PokemonFilter from './PokemonFilter'
import PokemonModal from './PokemonModal'
import GenerationTabs from './GenerationTabs'
import Sidebar from './Sidebar'

// First Import of 20 pokemons, as soon as the page first renders
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

  console.log(pokemonData);
  return pokemonData;
}

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [selectedSort, setSelectedSort] = useState("pokedex-asc");
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //caching to be compliant with Poke Api rules
  const [pokemonCache, setPokemonCache] = useState(new Map());

  const generations = [
    { id: 1, name: 'Generation I', startId: 1, endId: 151, color: 'bg-red-500' },      // Kanto - Red/Blue
    { id: 2, name: 'Generation II', startId: 152, endId: 251, color: 'bg-blue-500' }, // Johto - Gold/Silver
    { id: 3, name: 'Generation III', startId: 252, endId: 386, color: 'bg-green-500' }, // Hoenn - Emerald
    { id: 4, name: 'Generation IV', startId: 387, endId: 493, color: 'bg-purple-500' }, // Sinnoh - Diamond/Pearl
  ];

  //first generation fetch
  useEffect(() => {
    const loadPokemonGeneration = async () => {
      const currentGen = generations.find(gen => gen.id === selectedGeneration);
      const pokemonCount = currentGen.endId - currentGen.startId + 1;

      const pokemonGeneration = await fetchPokemonList(currentGen.startId, pokemonCount);
      setPokemonList(pokemonGeneration);

      //caching the pokemon as they're fetched
      pokemonGeneration.forEach(pokemon => {
        setPokemonCache(prev => new Map(prev).set(pokemon.id, pokemon));
      })
      setLoadedCount(pokemonCount);
    };
    loadPokemonGeneration();
  }, [selectedGeneration]);

  //if we want to load 20 more
  // const loadMorePokemon = async () => {
  //   const newPokemon = await fetchPokemonList(loadedCount + 1, 20)
  //   setPokemonList(prev => [...prev, ...newPokemon]);
  //     //caching new pokemon
  //     newPokemon.forEach(pokemon => {
  //       setPokemonCache(prev => new Map(prev).set(pokemon.id, pokemon));
  //     })
  //   setLoadedCount(prev => prev + 20)
  // };

  //open modal
  const openModal = (pokemon) => {
    const index = pokemonList.findIndex(p => p.id === pokemon.id);
    setCurrentPokemonIndex(index);
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  }

  //close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  }

  //buttons to navigate through pokemons without having to close the modal
  const nextPokemon = () => {
    if (currentPokemonIndex === pokemonList.length - 1){
      setCurrentPokemonIndex(0)
      setSelectedPokemon(pokemonList[0])
    } else {
      const newIndex = currentPokemonIndex + 1;
      setCurrentPokemonIndex(newIndex);
      setSelectedPokemon(pokemonList[newIndex]);
    }
  }

  const previousPokemon = () => {
    if (currentPokemonIndex === 0) {
      const lastIndex = pokemonList.length -1;
      setCurrentPokemonIndex(lastIndex)
      setSelectedPokemon(pokemonList[lastIndex]);
    } else {
      const newIndex = currentPokemonIndex -1;
      setCurrentPokemonIndex(newIndex);
      setSelectedPokemon(pokemonList[newIndex]);
    }
  }

  //Options for the filter
  const typeOptions = [
    { value: 'normal', label: 'Normal', color: 'bg-gray-400' },
    { value: 'fire', label: 'Fire', color: 'bg-red-500' },
    { value: 'water', label: 'Water', color: 'bg-blue-500' },
    { value: 'electric', label: 'Electric', color: 'bg-yellow-400' },
    { value: 'grass', label: 'Grass', color: 'bg-green-500' },
    { value: 'ice', label: 'Ice', color: 'bg-cyan-400' },
    { value: 'fighting', label: 'Fighting', color: 'bg-red-700' },
    { value: 'poison', label: 'Poison', color: 'bg-purple-500' },
    { value: 'ground', label: 'Ground', color: 'bg-yellow-600' },
    { value: 'flying', label: 'Flying', color: 'bg-indigo-400' },
    { value: 'psychic', label: 'Psychic', color: 'bg-pink-500' },
    { value: 'bug', label: 'Bug', color: 'bg-green-400' },
    { value: 'rock', label: 'Rock', color: 'bg-yellow-800' },
    { value: 'ghost', label: 'Ghost', color: 'bg-purple-800' },
    { value: 'dragon', label: 'Dragon', color: 'bg-purple-600' },
    { value: 'dark', label: 'Dark', color: 'bg-gray-800' },
    { value: 'steel', label: 'Steel', color: 'bg-gray-600' },
    { value: 'fairy', label: 'Fairy', color: 'bg-pink-300' }
  ];

  //display only the types from the current pokemon on the list
  const availableTypes = [...new Set(
    pokemonList.flatMap(pokemon =>
      pokemon.types.map(type => type.type.name)
    )
  )];

  const filteredTypeOptions = typeOptions.filter(option =>
    availableTypes.includes(option.value)
  );

  //filter toggling
  const toggleSelectedType = (type) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  //Pokemon list filtered based on the selected types
  const filteredPokemon = selectedTypes.length === 0
    ? pokemonList
    : pokemonList.filter(pokemon =>
      pokemon.types.some(type => selectedTypes.includes(type.type.name))
    );

  //Button to reset the selected filters
  const clearAllFilters = () => {
    setSelectedTypes([]);
  };

  //switch case for the dropdown select on the filter
  const sortPokemon = (pokemonArray, sortOption) => {
    const sorted = [...pokemonArray];
    switch (sortOption) {
      case 'pokedex-asc':
        return sorted.sort((a, b) => a.id - b.id);
      case 'pokedex-desc':
        return sorted.sort((a, b) => b.id - a.id);
      case 'hp-desc':
        return sorted.sort((a, b) => b.stats[0].base_stat - a.stats[0].base_stat);
      case 'hp-asc':
        return sorted.sort((a, b) => a.stats[0].base_stat - b.stats[0].base_stat);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }

  const searchedPokemon = searchTerm
    ? filteredPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPokemon;

  const sortedPokemon = sortPokemon(searchedPokemon, selectedSort);

  return (
    <>
      <div className="relative z-50">
        <Navbar />
        <button
          className="md:hidden fixed left-4 top-4 z-[60] p-2 rounded-md bg-black bg-opacity-20 hover:bg-opacity-30 transition-all"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex bg-sky-100 min-h-screen">
        {/* Sidebar with responsive visibility */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          fixed md:relative
          z-[55] md:z-auto
          w-80 md:w-auto
          h-screen md:h-auto
          top-0 md:top-auto
          left-0 md:left-auto
          pt-16 md:pt-0
        `}>
          <Sidebar
            selectedGeneration={selectedGeneration}
            generations={generations}
            // Search props
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            // Filter props that PokemonFilter needs
            filteredTypeOptions={filteredTypeOptions}
            toggleSelectedType={toggleSelectedType}
            selectedTypes={selectedTypes}
            clearAllFilters={clearAllFilters}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[50] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col p-4">
          <div className="pb-4">
            <GenerationTabs
              selectedGeneration={selectedGeneration}
              onGenerationChange={setSelectedGeneration}
              generations={generations}
            />
          </div>

          <div className="flex justify-center w-full bg-sky-100 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-7xl">
              {sortedPokemon.map(pokemon => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  typeOptions={typeOptions}
                  onClick={() => openModal(pokemon)}
                  isOpen={isModalOpen}
                  isClosed={closeModal}
                />
              ))}
            </div>
          </div>
        </div>

        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={isModalOpen}
          onClose={closeModal}
          typeOptions={typeOptions}
          onNext={nextPokemon}
          onPrevious={previousPokemon}
        />
      </div>
    </>
  )
}
