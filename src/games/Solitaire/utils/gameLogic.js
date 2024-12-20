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

  // Générer un deck complet avec des cartes face cachée
  const deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value, isFaceUp: false });
    });
  });

  // Mélanger les cartes
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);

  // Répartir les cartes dans les 7 colonnes initiales
  const initialColumns = Array(7)
    .fill([])
    .map((_, i) =>
      shuffledDeck.splice(0, i + 1).map((card, index, arr) => ({
        ...card,
        isFaceUp: index === arr.length - 1, // La dernière carte de chaque colonne est face visible
      })),
    );

  // Le reste des cartes constitue la pile de pioche
  const initialStock = shuffledDeck;

  return {
    initialColumns, // Colonnes jouables
    initialStock, // Pioche
  };
};

export const getCardValue = (value) => {
  if (value === 'A') return 1;
  if (value === 'J') return 11;
  if (value === 'Q') return 12;
  if (value === 'K') return 13;
  return parseInt(value, 10);
};
