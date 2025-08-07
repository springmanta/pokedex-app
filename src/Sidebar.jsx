import PokemonFilter from "./PokemonFilter";

export default function Sidebar({
  searchTerm, onSearchChange,
  filteredTypeOptions, toggleSelectedType, selectedTypes, clearAllFilters, selectedSort, onSortChange, selectedGeneration, generations
}) {

  //Find the name of the active generation to pass it on the search box placeholder
  const currentGen = generations.find(gen => gen.id === selectedGeneration);

  return (
      <div className="w-64 bg-white h-screen sticky top-0 border-r border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-4 items-center justify-center">
        <div>
          <img
            src="filterball_gpt.png"
            alt="Filters"
            className="w-16 h-auto mx-auto"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={`Search ${currentGen?.name} Pokemon...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        {/* Type Filters */}
        <PokemonFilter
          layout="sidebar"
          options={filteredTypeOptions}
          onToggle={toggleSelectedType}
          selectedTypes={selectedTypes}
          onClearAll={clearAllFilters}
          selectedSort={selectedSort}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
}
