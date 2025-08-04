import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex justify-center bg-blue-700">
      <Link to="/pokedex">
        <img src="pokedex_logo_intro.png" alt="" className="cursor-pointer hover:scale-110 transition-transform duration-300"/>
      </Link>
    </div>
  );
}
