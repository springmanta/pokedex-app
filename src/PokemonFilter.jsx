export default function PokemonFilter({ options }) {
  return (
    <div className="justify-center text-white pl-6">
      {options.map(option => (
        <button key={option.value} className={`rounded-lg p-2 m-2 ${option.color}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
