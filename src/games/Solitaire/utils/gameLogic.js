export const initializeGame = () => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];

  // Générer un deck complet
  const deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value });
    });
  });

  // Mélanger les cartes
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);

  // Répartir les cartes dans les colonnes initiales (1 à 7 cartes)
  const initialColumns = Array(7)
    .fill([])
    .map((_, i) => shuffledDeck.splice(0, i + 1));

  // Le reste des cartes est placé dans la pioche
  const initialStock = shuffledDeck;

  return {
    initialColumns,
    initialStock,
  };
};
