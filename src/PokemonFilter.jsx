import { useState } from 'react'

export default function PokemonFilter({ options, onToggle, selectedTypes, onClearAll }) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
  <div className="bg-sky-200 flex flex-wrap text-white pt-6 sticky top-0 z-10 pb-6 pr-5">
    <button
      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
      className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
    >
      <img src="filterball_gpt.png" alt="filter-button" className="w-16 h-auto" />
    </button>

    {showAdvancedFilters && (
      <div className="pl-8">
        <div className="">
          <div className="flex flex-wrap gap-2">
            {options.map(option => {
              const isSelected = selectedTypes.includes(option.value);
              return (
                <button
                  key={option.value}
                  className={`rounded-lg p-2 ${option.color} ${isSelected ? 'ring-1 ring-yellow-400 scale-105' : 'opacity-70'}`}
                  onClick={() => onToggle(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear button */}
        <button className="rounded-lg p-2 mt-2 bg-gray-600 text-white hover:bg-gray-500" onClick={onClearAll}>
          Clear
        </button>
      </div>
    )}
  </div>
  )
}
