import React, { useState } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import { initializeGame } from './utils/gameLogic';
import './styles.css';

const Solitaire = () => {
  const [columns, setColumns] = useState(Array(7).fill([])); // Colonnes jouables
  const [foundations, setFoundations] = useState(Array(4).fill([])); // Fondations (4 piles)
  const [stock, setStock] = useState([]); // Pile de pioche
  const [waste, setWaste] = useState([]); // Pile de défausse

  // Initialisation du jeu
  React.useEffect(() => {
    const { initialColumns, initialStock } = initializeGame();
    setColumns(initialColumns);
    setStock(initialStock);
  }, []);

  return (
    <div className="solitaire">
      <h1>Jeu du Solitaire</h1>
      <Controls />
      <Board
        columns={columns}
        foundations={foundations}
        stock={stock}
        waste={waste}
      />
    </div>
  );
};

export default Solitaire;
