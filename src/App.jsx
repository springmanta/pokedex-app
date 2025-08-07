import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import IndexPage from './IndexPage';
import Pokedex from './Pokedex';
import Moves from './Moves';
import Abilities from './Abilities';
import Locations from './Locations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="indexpage" element={<IndexPage />} />
        <Route path="pokedex" element={<Pokedex />} />
        <Route path="moves" element={<Moves />} />
        <Route path="abilities" element={<Abilities />} />
        <Route path="locations" element={<Locations />} />
      </Routes>
    </Router>
  );
}

export default App
