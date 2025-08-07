export default function GenerationTabs({ generations, selectedGeneration, onGenerationChange }) {
    //generations list so that the user can pick the one they want to see
  return(
    <div className="flex gap-4 pt-6 justify-center overflow-x-auto scrollbar-hide">  {/* Add a container div */}

    {generations.map(gen => (
      <button
        key={gen.id}
        className={`rounded-md px-4 py-2 ${selectedGeneration === gen.id ? gen.color + ' text-white' : 'bg-orange-200'}`}
        onClick={() => onGenerationChange(gen.id)}
      >
        Gen {gen.id}
      </button>
    ))}
    </div>
  )
}
