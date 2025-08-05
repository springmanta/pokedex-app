import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-500">
      <Link to="/pokedex">
        <img src="pokedex_logo_intro.png" alt="" className="w-64 h-auto cursor-pointer hover:scale-110 transition-transform duration-300"/>
      </Link>
    </div>
  );
}
