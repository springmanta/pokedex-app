import { useState } from 'react'

export default function PokemonFilter({ options, onToggle, selectedTypes, onClearAll, selectedSort, onSortChange }) {
  const [showTypeFilters, setShowTypeFilters] = useState(false);

  const sortOptions = [
    { value: 'pokedex-asc', label: 'Pokedex Number (Low to High)' },
    { value: 'pokedex-desc', label: 'Pokedex Number (High to Low)' },
    { value: 'name-asc', label: 'Name (A to Z)' },
    { value: 'name-desc', label: 'Name (Z to A)' },
    { value: 'hp-desc', label: 'Highest HP' },
    { value: 'hp-asc', label: 'Lowest HP' },
  ];

  return (

  <div className="grid place-items-center bg-sky-100 text-white z-10 pt-6">
    <button
      onClick={() => setShowTypeFilters(!showTypeFilters)}
      className="flex pb-4"
    >
      <img
        src="filterball_gpt.png"
        alt="filter-button"
        className={`w-24 h-auto transition-transform duration-500 transform ${showTypeFilters ? "rotate-360" : "rotate-0"
      }`}
      />
    </button>

    {showTypeFilters && (
      <div className="flex w-46 px-8 justify-center items-center">
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg p-1 bg-slate-100 text-gray-700 text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {options.map(option => {
            const isSelected = selectedTypes.includes(option.value);
            return (
              <button
                key={option.value}
                className={`rounded-lg p-2 text-sm ${option.color} ${isSelected ? 'ring-2 ring-yellow-400' : 'opacity-70'}`}
                onClick={() => onToggle(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        <button className="rounded-lg p-2 text-sm bg-gray-600 text-white text-sm hover:bg-gray-500" onClick={onClearAll}>
          Clear
        </button>
        </div>
      </div>
    )}
  </div>
  )
}
