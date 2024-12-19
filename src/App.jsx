import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Solitaire from './games/Solitaire/Solitaire';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/solitaire">Solitaire</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solitaire" element={<Solitaire />} />
      </Routes>
    </Router>
  );
};

export default App;
