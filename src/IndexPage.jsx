import { Link } from 'react-router-dom';

export default function indexPage() {
  const categories = [
    {
      id: 'pokedex',
      name: 'Pokédex',
      color: 'bg-red-500',
      description: 'Browse Pokémon by generation'
    },
    {
      id: 'moves',
      name: 'Moves',
      color: 'bg-yellow-500',
      description: 'Discover Pokémon moves'
    },
    {
      id: 'abilities',
      name: 'Abilities',
      color: 'bg-blue-500',
      description: 'Explore Pokémon abilities'
    },
    {
      id: 'locations',
      name: 'Locations',
      color: 'bg-green-500',
      description: 'Randomly encounter your favorite Pokémon!'
    }
  ]

  return (
    <div
      className="pokemon-bg flex flex-col justify-center items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">What are you looking for?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map(category => (
          <Link key={category.id} to={`/${category.id}`}>
            <div
              className={`${category.color} text-white p-8 rounded-lg cursor-pointer hover:scale-105 transition-transform`}
            >
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
