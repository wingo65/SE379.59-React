import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemonList from './components/InventoryList';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>PokéAPI</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Pokemon Inventory</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/favorites" element={<FavoritePokemonList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;