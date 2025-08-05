import { useState } from 'react';

export default function PokemonModal({ pokemon, isOpen, onClose, typeOptions }) {
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

    <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className={"bg-slate-100 w-48 h-48 mt-6"}
    />

    <div className="text-sm flex gap-4 m-4">
      <button className="bg-slate-200 p-3 rounded-lg m-4" onClick={() => setActiveTab("About")}>About</button>
      <button className="bg-slate-200 p-3 rounded-lg m-4" onClick={() => setActiveTab("Base Stats")}>Base Stats</button>
      <button className="bg-slate-200 p-3 rounded-lg m-4" onClick={() => setActiveTab("Moves")}>Moves</button>
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
      <div className="text-sm text-gray-600">
      <div className="flex flex-wrap mb-3">
        <span className="bg-emerald-300 text-gray-800 px-2 py-1 rounded text-sm">
          Height: {pokemon.height / 10}m
        </span>
      </div>

      <div className="flex flex-wrap mb-3">
        <span className="bg-emerald-300 text-gray-800 px-2 py-1 rounded text-sm">
          Weight: {pokemon.weight / 10}kg
        </span>
      </div>

      <div className="flex flex-wrap mb-3">
        <span className="bg-emerald-300 text-gray-800 px-2 py-1 rounded text-sm">
          <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
        </span>
      </div>
      </div>
    )}


    {activeTab === "Base Stats" && (
      <div className="grid grid-cols-3 gap-6 mt-6">
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

    <button onClick={onClose} className="bg-slate-300 p-1.5 rounded-md mt-6 text-white hover:bg-slate-400 cursor-pointer">Close</button>
      </div>
    </div>
  )
}
