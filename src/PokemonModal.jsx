import { useState } from 'react';

export default function PokemonModal({ pokemon, isOpen, onClose, typeOptions, onNext, onPrevious }) {
  const [activeTab, setActiveTab] = useState("About");

  if (!isOpen || !pokemon) return null;

  //color scheme depending on the types
  const getTypeColor = (typeName) => {
    const typeOption = typeOptions.find(option => option.value === typeName);
    return typeOption ? typeOption.color : 'bg-gray-500';
  };

  //color render for the tabs, depending on the stats value
  const getStatColor = (value) => {
  if (value >= 100) return 'bg-green-500';
  if (value >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
  };

  console.log("Rendering modal for:", pokemon.name, pokemon);

  return(

  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>

    <div
      className="bg-white rounded-3xl shadow-xl p-6 max-w-lg w-full mx-4 flex flex-col items-center justify-center"
      onClick={(e) => e.stopPropagation()}>

    <h2 className="text-xl font-bold capitalize grow">{pokemon.name}</h2>
    <p><strong>Pokedex:</strong> #{pokemon.id.toString().padStart(3, '0')}</p>
    <p><strong>Base Experience:</strong>{pokemon.base_experience}</p>

    <div className="flex items-center gap-4 mt-6">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-2xl p-2 rounded-full w-10 h-10 flex items-center justify-center"
        onClick={onPrevious}
      >
        ←
      </button>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="bg-slate-100 w-48 h-48"
      />

      <button
        className="bg-gray-200 hover:bg-gray-300 text-2xl p-2 rounded-full w-10 h-10 flex items-center justify-center"
        onClick={onNext}
      >
        →
      </button>
    </div>

    <div className="text-sm flex gap-4 m-4">
      <button className={`p-3 rounded-lg m-4 ${activeTab === "About" ? "ring-2 ring-slate-300" : "opacity-40 font-bold"}`} onClick={() => setActiveTab("About")}>About</button>
      <button className={`p-3 rounded-lg m-4 ${activeTab === "Base Stats" ? "ring-2 ring-slate-300" : "opacity-40 font-bold"}`} onClick={() => setActiveTab("Base Stats")}>Base Stats</button>
      <button className={`p-3 rounded-lg m-4 ${activeTab === "Moves" ? "ring-2 ring-slate-300" : "opacity-40 font-bold"}`} onClick={() => setActiveTab("Moves")}>Moves</button>
    </div>

    {/*
    <div className="flex gap-2 mt-4 mb-4">
      {pokemon.types.map(type => (
        <span key={type.type.name} className={`px-3 py-1 rounded-full text-white text-sm ${getTypeColor(type.type.name)}`}>
          {type.type.name}
        </span>
      ))}
    </div>
    */}

    {activeTab === "About" && (
    <div className="space-y-4 w-3/4 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">Height</span>
        <span className="font-medium">{pokemon.height / 10}m</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Weight</span>
        <span className="font-medium">{pokemon.weight / 10}kg</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Species</span>
        <span className="font-medium capitalize">{pokemon.species.name}</span>
      </div>

      <div>
        <span className="text-gray-500">Abilities</span>
        <div className="font-medium capitalize mt-1">
          {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
        </div>
      </div>
    </div>
  )}


    {activeTab === "Base Stats" && (
      <div className="grid grid-cols-3 gap-6">
        {pokemon.stats?.map(stat => (
        <div key={stat.stat.name} className="text-center">
          <div className="font-semibold capitalize">{stat.stat.name}</div>
          <div className="text-lg font-bold">{stat.base_stat}</div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className={`h-2 rounded ${getStatColor(stat.base_stat)}`}
              style={{ width: `${(stat.base_stat / 200) * 100}%` }}
            ></div>
          </div>

        </div>
      ))}
      </div>
    )}

    <button onClick={onClose} className="bg-slate-300 p-2 pl-3 pr-4 rounded-md mt-6 text-white hover:bg-gray-400">Close</button>
      </div>
    </div>
  )
}
