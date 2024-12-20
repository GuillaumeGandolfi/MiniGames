import React from 'react';
import Card from './Card';

const Board = ({
  columns,
  foundations,
  stock,
  waste,
  onCardMove,
  onDrawCard,
}) => {
  const handleDrop = (e, targetColumnIndex) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData('card'));
    onCardMove(cardData, targetColumnIndex); // Appeler la fonction de déplacement
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permet le drop
  };

  return (
    <div className="board">
      <div className="top-row">
        <div className="stock-pile">
          {/* Pioche avec onClick */}
          <div className="stock" onClick={onDrawCard}>
            {stock.length > 0 ? (
              <Card value="back" suit="" isFaceUp={false} />
            ) : (
              'Pioche vide'
            )}
          </div>
          <div className="waste">
            {waste.length > 0 ? (
              <Card
                {...waste[waste.length - 1]}
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    'card',
                    JSON.stringify(waste[waste.length - 1]),
                  );
                }}
              />
            ) : (
              'Défausse vide'
            )}
          </div>
        </div>
        <div className="foundations">
          {foundations.map((foundation, foundationIndex) => (
            <div
              key={foundationIndex}
              className="foundation-slot"
              onDragOver={(e) => e.preventDefault()} // Permet le drag
              onDrop={(e) => {
                e.preventDefault();
                const cardData = JSON.parse(e.dataTransfer.getData('card'));
                onCardMove(cardData, foundationIndex, 'foundation'); // Indiquer que c'est une fondation
              }}
            >
              {foundation.length > 0 ? (
                <Card {...foundation[foundation.length - 1]} />
              ) : (
                'Fondation vide'
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="columns">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="column-slot"
            onDragOver={handleDragOver} // Permettre le drag sur cette colonne
            onDrop={(e) => handleDrop(e, columnIndex)} // Gérer le drop
          >
            {column.map((card, cardIndex) => (
              <div key={cardIndex} style={{ '--card-index': cardIndex }}>
                <Card
                  {...card}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('card', JSON.stringify(card)); // Transmettre les données de la carte
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
