import React, { useState } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import { getCardValue } from './utils/gameLogic';
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
  const handleCardMove = (card, targetIndex, targetType) => {
    const updatedColumns = [...columns];
    const updatedFoundations = [...foundations];

    // Si la cible est une fondation (As)
    if (targetType === 'foundation') {
      const targetFoundation = updatedFoundations[targetIndex];

      // Vérifier si la fondation est vide
      if (targetFoundation.length === 0) {
        if (card.value !== 'A') {
          console.error('Seul un As peut être placé sur une fondation vide.');
          return;
        }
      } else {
        // Vérifier que la carte suit la règle du même symbole et de l’ordre croissant
        const lastCard = targetFoundation[targetFoundation.length - 1];
        if (
          lastCard.suit !== card.suit ||
          getCardValue(lastCard.value) + 1 !== getCardValue(card.value)
        ) {
          console.error('La carte ne respecte pas les règles des fondations.');
          return;
        }
      }

      // Si la carte provient de la défausse
      if (waste.some((c) => c.value === card.value && c.suit === card.suit)) {
        const updatedWaste = [...waste];
        updatedWaste.pop(); // Retirer la dernière carte de la défausse
        setWaste(updatedWaste);
      } else {
        // Sinon, elle provient d'une colonne jouable
        const originColumnIndex = columns.findIndex((column) =>
          column.some((c) => c.value === card.value && c.suit === card.suit),
        );

        if (originColumnIndex !== -1) {
          const originColumn = [...updatedColumns[originColumnIndex]];
          const cardIndexInOrigin = originColumn.findIndex(
            (c) => c.value === card.value && c.suit === card.suit,
          );
          originColumn.splice(cardIndexInOrigin); // Retirer la carte de la colonne
          updatedColumns[originColumnIndex] = originColumn;

          // Si une carte face cachée est en dernier, la révéler
          if (
            originColumn.length > 0 &&
            !originColumn[originColumn.length - 1].isFaceUp
          ) {
            originColumn[originColumn.length - 1].isFaceUp = true;
          }
        }
      }

      // Ajouter la carte à la fondation cible
      updatedFoundations[targetIndex] = [...targetFoundation, card];

      // Mettre à jour les états
      setColumns(updatedColumns);
      setFoundations(updatedFoundations);
      return;
    }
    const originColumnIndex = columns.findIndex((column) =>
      column.some((c) => c.value === card.value && c.suit === card.suit),
    );

    if (originColumnIndex !== -1) {
      const originColumn = [...updatedColumns[originColumnIndex]];
      const cardIndexInOrigin = originColumn.findIndex(
        (c) => c.value === card.value && c.suit === card.suit,
      );
      const cardsToMove = originColumn.splice(cardIndexInOrigin);
      updatedColumns[originColumnIndex] = originColumn;

      if (
        originColumn.length > 0 &&
        !originColumn[originColumn.length - 1].isFaceUp
      ) {
        originColumn[originColumn.length - 1].isFaceUp = true;
      }

      updatedColumns[targetIndex] = [
        ...updatedColumns[targetIndex],
        ...cardsToMove,
      ];

      setColumns(updatedColumns);
    }
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
