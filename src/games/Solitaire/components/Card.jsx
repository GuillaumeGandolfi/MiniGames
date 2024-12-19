import React from 'react';

const Card = ({ value, suit, isFaceUp }) => {
  const suitsSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  };

  return (
    <div className={`card ${isFaceUp ? 'face-up' : 'face-down'}`}>
      {isFaceUp && (
        <>
          <span className="card-value">{value}</span>
          <span className="card-suit">{suitsSymbols[suit]}</span>
        </>
      )}
    </div>
  );
};

export default Card;
