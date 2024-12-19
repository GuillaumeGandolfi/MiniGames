import React from 'react';

const Card = ({ value, suit, isFaceUp, onDragStart }) => {
  const cardImage = isFaceUp
    ? `/src/assets/cards/${value}_${suit}.png`
    : `/src/assets/cards/back.png`;

  return (
    <div
      className="card"
      draggable={true} // Rendre la carte déplaçable
      onDragStart={(e) => onDragStart(e, { value, suit, isFaceUp })} // Passer les données de la carte
    >
      <img src={cardImage} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
