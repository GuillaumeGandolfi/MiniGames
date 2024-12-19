import React, { useState } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import { initializeGame } from './utils/gameLogic';
import './styles.css';

const Solitaire = () => {
  const [columns, setColumns] = useState(Array(7).fill([]));
  const [foundations, setFoundations] = useState(Array(4).fill([]));
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);

  // Initialisation du jeu
  React.useEffect(() => {
    const { initialColumns, initialStock } = initializeGame();
    setColumns(initialColumns);
    setStock(initialStock);
  }, []);

  // Fonction pour tirer une carte de la pioche
  const drawFromStock = () => {
    if (stock.length > 0) {
      const card = stock.pop(); // Retire la dernière carte de la pioche
      card.isFaceUp = true; // La carte devient visible
      setStock([...stock]); // Met à jour la pioche
      setWaste([...waste, card]); // Ajoute la carte à la défausse
    }
  };

  return (
    <div className="solitaire">
      <h1>Jeu du Solitaire</h1>
      <Controls
        onNewGame={() => console.log('Nouvelle partie')}
        onUndo={() => console.log('Annuler')}
        onDrawCard={drawFromStock}
      />
      <Board
        columns={columns}
        foundations={foundations}
        stock={stock}
        waste={waste}
        onDrawCard={drawFromStock}
      />
    </div>
  );
};

export default Solitaire;
