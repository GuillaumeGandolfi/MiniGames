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
    setFoundations(Array(4).fill([]));
    setStock(initialStock);
    setWaste([]);
  };

  React.useEffect(() => {
    startNewGame();
  }, []);

  const handleCardMove = (card, targetIndex, targetType) => {
    const updatedColumns = [...columns];
    const updatedFoundations = [...foundations];

    // 1️⃣ 🔥 Gestion des fondations
    if (targetType === 'foundation') {
      const targetFoundation = updatedFoundations[targetIndex];

      if (targetFoundation.length === 0) {
        if (card.value !== 'A') {
          console.error('Seul un As peut être placé sur une fondation vide.');
          return;
        }
      } else {
        const lastCard = targetFoundation[targetFoundation.length - 1];
        if (
          lastCard.suit !== card.suit ||
          getCardValue(lastCard.value) + 1 !== getCardValue(card.value)
        ) {
          console.error('La carte ne respecte pas les règles des fondations.');
          return;
        }
      }

      if (waste.some((c) => c.value === card.value && c.suit === card.suit)) {
        const updatedWaste = [...waste];
        updatedWaste.pop();
        setWaste(updatedWaste);
      } else {
        const originColumnIndex = columns.findIndex((column) =>
          column.some((c) => c.value === card.value && c.suit === card.suit),
        );

        if (originColumnIndex !== -1) {
          const originColumn = [...updatedColumns[originColumnIndex]];
          const cardIndexInOrigin = originColumn.findIndex(
            (c) => c.value === card.value && c.suit === card.suit,
          );
          originColumn.splice(cardIndexInOrigin);
          updatedColumns[originColumnIndex] = originColumn;

          if (
            originColumn.length > 0 &&
            !originColumn[originColumn.length - 1].isFaceUp
          ) {
            originColumn[originColumn.length - 1].isFaceUp = true;
          }
        }
      }

      updatedFoundations[targetIndex] = [...targetFoundation, card];
      setColumns(updatedColumns);
      setFoundations(updatedFoundations);
      return;
    }

    // 2️⃣ 🃏 Gestion des cartes venant de la défausse vers les colonnes
    if (waste.some((c) => c.value === card.value && c.suit === card.suit)) {
      const updatedWaste = [...waste];
      updatedWaste.pop();

      const targetColumn = updatedColumns[targetIndex];

      if (targetColumn.length === 0) {
        if (card.value !== 'K') {
          console.error('Seul un Roi peut être placé sur une colonne vide.');
          return;
        }
      } else {
        const lastCard = targetColumn[targetColumn.length - 1];
        const isValidMove =
          getCardValue(lastCard.value) === getCardValue(card.value) + 1 &&
          (lastCard.suit === 'hearts' || lastCard.suit === 'diamonds') !==
            (card.suit === 'hearts' || card.suit === 'diamonds');

        if (!isValidMove) {
          console.error(
            "Déplacement invalide : il faut une carte de couleur opposée et d'une valeur immédiatement inférieure.",
          );
          return;
        }
      }

      updatedColumns[targetIndex] = [...targetColumn, card];
      setColumns(updatedColumns);
      setWaste(updatedWaste);
      return;
    }

    // 3️⃣ 🎴 Gestion des déplacements entre colonnes avec règles (NOUVEAU)
    const originColumnIndex = columns.findIndex((column) =>
      column.some((c) => c.value === card.value && c.suit === card.suit),
    );

    if (originColumnIndex !== -1) {
      const originColumn = [...updatedColumns[originColumnIndex]];
      const cardIndexInOrigin = originColumn.findIndex(
        (c) => c.value === card.value && c.suit === card.suit,
      );
      const cardsToMove = originColumn.splice(cardIndexInOrigin);

      const targetColumn = updatedColumns[targetIndex];

      if (targetColumn.length === 0) {
        if (card.value !== 'K') {
          console.error('Seul un Roi peut être placé sur une colonne vide.');
          return;
        }
      } else {
        const lastCard = targetColumn[targetColumn.length - 1];
        const isValidMove =
          getCardValue(lastCard.value) === getCardValue(card.value) + 1 &&
          (lastCard.suit === 'hearts' || lastCard.suit === 'diamonds') !==
            (card.suit === 'hearts' || card.suit === 'diamonds');

        if (!isValidMove) {
          console.error(
            "Déplacement invalide : il faut une carte de couleur opposée et d'une valeur immédiatement inférieure.",
          );
          return;
        }
      }

      updatedColumns[originColumnIndex] = originColumn;
      updatedColumns[targetIndex] = [...targetColumn, ...cardsToMove];

      if (
        originColumn.length > 0 &&
        !originColumn[originColumn.length - 1].isFaceUp
      ) {
        originColumn[originColumn.length - 1].isFaceUp = true;
      }

      setColumns(updatedColumns);
    }
  };

  const drawFromStock = () => {
    if (stock.length > 0) {
      const card = stock.pop();
      card.isFaceUp = true;
      setStock([...stock]);
      setWaste([...waste, card]);
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
