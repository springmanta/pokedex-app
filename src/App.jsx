import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Pokedex from './Pokedex';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pokedex" element={<Pokedex />} />
      </Routes>
    </Router>
  );
}

export default App
