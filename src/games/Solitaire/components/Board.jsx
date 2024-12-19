import React from 'react';

const Board = ({ columns, foundations, stock, waste }) => {
  return (
    <div className="board">
      {/* Ligne du haut */}
      <div className="top-row">
        <div className="stock-pile">
          <div className="stock">{stock.length > 0 ? 'Pioche' : 'Vide'}</div>
          <div className="waste">{waste.length > 0 ? 'Défausse' : 'Vide'}</div>
        </div>
        <div className="foundations">
          {foundations.map((_, index) => (
            <div key={index} className="foundation-slot">
              Fondation {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="columns">
        {columns.map((column, index) => (
          <div key={index} className="column-slot">
            Colonne {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
