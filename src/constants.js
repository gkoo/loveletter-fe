export const env = process.env.NODE_ENV;
export const socketIoServerUrl = (
  env === 'production' ?
    'https://love-communique-node.herokuapp.com/' :
    'http://localhost:5000'
);


export const CARD_GUARD = 0;
export const CARD_PRIEST = 1;
export const CARD_BARON = 2;
export const CARD_HANDMAID = 3;
export const CARD_PRINCE = 4;
export const CARD_KING = 5;
export const CARD_COUNTESS = 6;
export const CARD_PRINCESS = 7;
export const CARD_ASSASSIN = 8;
export const CARD_JESTER = 9;
export const CARD_CARDINAL = 10;
export const CARD_BARONESS = 11;
export const CARD_SYCOPHANT = 12;
export const CARD_COUNT = 13;
export const CARD_CONSTABLE = 14;
export const CARD_DOWAGER_QUEEN = 15;
export const CARD_BISHOP = 16;

export const STATE_PENDING = 0;
export const STATE_STARTED = 1;
export const STATE_ROUND_END = 2;
export const STATE_GAME_END = 3;

export const enumsToValues = {
  [CARD_GUARD]: {
    label: 'Guard',
    value: '1',
  },
  [CARD_PRIEST]: {
    label: 'Priest',
    value: '2',
  },
  [CARD_BARON]: {
    label: 'Baron',
    value: '3',
  },
  [CARD_HANDMAID]: {
    label: 'Handmaid',
    value: '4',
  },
  [CARD_PRINCE]: {
    label: 'Prince',
    value: '5',
  },
  [CARD_KING]: {
    label: 'King',
    value: '6',
  },
  [CARD_COUNTESS]: {
    label: 'Countess',
    value: '7',
  },
  [CARD_PRINCESS]: {
    label: 'Princess',
    value: '8',
  },
  [CARD_ASSASSIN]: {
    label: 'Assassin',
    value: '0',
  },
  [CARD_JESTER]: {
    label: 'Jester',
    value: '0',
  },
  [CARD_CARDINAL]: {
    label: 'Cardinal',
    value: '2',
  },
  [CARD_BARONESS]: {
    label: 'Baroness',
    value: '3',
  },
  [CARD_SYCOPHANT]: {
    label: 'Sycophant',
    value: '4',
  },
  [CARD_COUNT]: {
    label: 'Count',
    value: '5',
  },
  [CARD_CONSTABLE]: {
    label: 'Constable',
    value: '6',
  },
  [CARD_DOWAGER_QUEEN]: {
    label: 'Dowager Queen',
    value: '7',
  },
  [CARD_BISHOP]: {
    label: 'Bishop',
    value: '9',
  },
};
