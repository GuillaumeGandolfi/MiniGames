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

  const startNewGame = () => {
    const { initialColumns, initialStock } = initializeGame();
    setColumns(initialColumns);
    setFoundations(Array(4).fill([])); // Vide les fondations
    setStock(initialStock);
    setWaste([]); // Vide la défausse
  };

  // Démarrer une nouvelle partie à l'initialisation
  React.useEffect(() => {
    startNewGame();
  }, []);

  // Déplacer une carte
  const handleCardMove = (card, targetColumnIndex) => {
    const updatedColumns = [...columns];
    updatedColumns[targetColumnIndex] = [
      ...updatedColumns[targetColumnIndex],
      card,
    ];
    setColumns(updatedColumns);
  };

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
        onNewGame={startNewGame}
        onUndo={() => console.log('Annuler')}
      />
      <Board
        columns={columns}
        foundations={foundations}
        stock={stock}
        waste={waste}
        onDrawCard={drawFromStock}
        onCardMove={handleCardMove}
      />
    </div>
  );
};

export default Solitaire;
