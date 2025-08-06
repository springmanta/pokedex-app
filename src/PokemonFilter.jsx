import { useState } from 'react'

export default function PokemonFilter({ options, onToggle, selectedTypes, onClearAll, selectedSort, onSortChange }) {
  const [showTypeFilters, setShowTypeFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showStatFilters, setShowStatFilters] = useState(false);

  const sortOptions = [
    { value: 'pokedex-asc', label: 'Pokedex Number (Low to High)' },
    { value: 'pokedex-desc', label: 'Pokedex Number (High to Low)' },
    { value: 'name-asc', label: 'Name (A to Z)' },
    { value: 'name-desc', label: 'Name (Z to A)' },
    { value: 'hp-desc', label: 'Highest HP' },
    { value: 'hp-asc', label: 'Lowest HP' },
  ];

  return (

  <div className="bg-sky-100 text-white z-10 pt-6 grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-10 pr-6">
    <button
      onClick={() => setShowTypeFilters(!showTypeFilters)}
      className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
    >
      <img src="filterball_gpt.png" alt="filter-button" className="w-16 h-auto" />
    </button>

    {showTypeFilters && (
      <div className="pl-8">
        <div className="">
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
                  className={`rounded-lg p-2 text-sm ${option.color} ${isSelected ? 'ring-1 ring-yellow-400 scale-105' : 'opacity-70'}`}
                  onClick={() => onToggle(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* <button className="rounded-lg p-2 mt-2 bg-gray-600 text-white text-sm hover:bg-gray-500" onClick={onClearAll}>
          Clear
        </button> */}
      </div>
    )}
  </div>
  )
}
