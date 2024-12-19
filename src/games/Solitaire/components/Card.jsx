import React from 'react';

const Card = ({ value, suit, isFaceUp }) => {
  const cardImage = isFaceUp
    ? `/src/assets/cards/${value}_${suit}.png`
    : `/src/assets/cards/back.png`;

  const handleImageError = (e) => {
    e.target.src = '/src/assets/cards/back.png';
  };

  return (
    <div className="card">
      <img
        src={cardImage}
        alt={`${value} of ${suit}`}
        onError={handleImageError}
      />
    </div>
  );
};

export default Card;
