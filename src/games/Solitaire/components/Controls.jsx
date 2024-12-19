import React from 'react';

const Controls = ({ onNewGame, onUndo }) => {
  return (
    <div className="controls">
      <button onClick={onNewGame}>Nouvelle Partie</button>
      <button onClick={onUndo}>Annuler</button>
    </div>
  );
};

export default Controls;
