export default function PokemonCard({ pokemon, typeOptions }){
  //get the colors for the corresponding types
  const getTypeColor = (typeName) => {
    const typeOption = typeOptions.find(option => option.value === typeName);
    return typeOption ? typeOption.color : 'bg-gray-500';
  };

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
          <span key={type.type.name} className={`px-3 py-1 rounded-full text-white text-sm ${getTypeColor(type.type.name)}`}>
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
