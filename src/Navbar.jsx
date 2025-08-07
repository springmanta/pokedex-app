import { Link } from 'react-router-dom';

export default function Navbar() {
  return(
    <div className="pokemon-bg flex justify-center items-center flex-row space-x-4 pt-3">
      <Link to="/indexpage">
        <img src="pokedex_logo_intro.png" alt="logo" className="w-32 md:w-40 lg:w-52" />
      </Link>
    </div>
  )
}
