export default function PokemonFilter({ options, onToggle, selectedTypes, onClearAll }) {

  return (
    <div className="justify-center text-white pl-6">
      {options.map(option => {
        const isSelected = selectedTypes.includes(option.value);

        return (
          <button
            key={option.value}
            className={`rounded-lg p-2 m-2 ${option.color} ${isSelected ? 'ring-2 ring-gray scale-105' : 'opacity-70 text-bold'}`}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </button>
        );
      })}
      <button className="rounded-lg p-2 m-2 bg-gray-600 text-white hover:bg-gray-500" onClick={onClearAll}>
        Clear
      </button>
    </div>
  )
}
