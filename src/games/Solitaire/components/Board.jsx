import React from 'react';
import Card from './Card';

const Board = ({ columns, foundations, stock, waste, onDrawCard }) => {
  return (
    <div className="board">
      <div className="top-row">
        <div className="stock-pile">
          {/* Pioche */}
          <div className="stock" onClick={onDrawCard}>
            {stock.length > 0 ? (
              <Card value="back" suit="" isFaceUp={false} />
            ) : (
              'Pioche vide'
            )}
          </div>
          {/* Défausse */}
          <div className="waste">
            {waste.length > 0 ? (
              <Card {...waste[waste.length - 1]} />
            ) : (
              'Défausse vide'
            )}
          </div>
        </div>
        <div className="foundations">
          {foundations.map((foundation, index) => (
            <div key={index} className="foundation-slot">
              {foundation.length > 0 ? (
                <Card {...foundation[foundation.length - 1]} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="columns">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="column-slot">
            {column.map((card, cardIndex) => (
              <div
                key={cardIndex}
                style={{
                  '--card-index': cardIndex,
                }} /* Définit le décalage visuel */
              >
                <Card {...card} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
