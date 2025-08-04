import { useState } from 'react'

export default function PokemonPicker({ setPokemonId, setShowPicker }) {
  const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(inputValue);
    if (id && id > 0 && id <= 1010) {
      setPokemonId(id);
      setShowPicker(false);
      setInputValue('');
    }
  };

  return (
    <div className=" rounded-lg shadow-xl border-1 p-2 max-w-sm">
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          placeholder="Pokemon Number"
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded mr-2"
          min="1"
          max="1010"
        />
        <button type="submit" className="bg-emerald-700 hover:bg-lime-900 text-white hover:text-gray-300 px-4 py-2 rounded">
          Catch 'Em!
        </button>
      </form>
    </div>
  );
}
