import { useState } from 'react'
import Navbar from './Navbar'
import PokemonCard from './PokemonCard'


function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <Navbar setShowPicker={setShowPicker} setPokemonId={setPokemonId} showPicker={showPicker} />
        <div className="flex flex-col items-center p-8 space-y-4">
          <PokemonCard pokemonId={pokemonId}/>
        </div>
    </>
  )
}

export default App
