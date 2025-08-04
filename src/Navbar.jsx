import PokemonPicker from './PokemonPicker'

export default function Navbar({ showPicker, setPokemonId, setShowPicker }) {
  return(
    <div className="bg-blue-600 flex items-center space-x-4 pt-3 pb-3 pl-2">
      <img src="pokedex_logo.svg" alt="logo" className="h-16 w-auto" />
      <span className="text-xl font-semibold text-white hover:text-gray-300 cursor-pointer">Pokédex</span>
      <button
        className="text-white hover:text-gray-300 cursor-pointer bg-cyan-600 rounded-lg p-2"
        onClick={() => setShowPicker(prev => !prev)}
        >
          PokemonPicker
        </button>
        {showPicker && <PokemonPicker setPokemonId={setPokemonId} setShowPicker={setShowPicker}/>}
    </div>
  )
}
