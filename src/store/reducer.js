import io from 'socket.io-client';

import { env } from '../constants';
import * as actions from './actions';

import { socketIoServerUrl, STATE_PENDING, STATE_GAME_END } from '../constants';

const initialState = {
  alertMessage: undefined,
  debugEnabled: env !== 'production',
  gameState: STATE_PENDING,
  players: {},
  users: {},
  messages: [],
  socket: io(socketIoServerUrl),
};
const testState = {
  ...initialState,
  activePlayerId: 'steve',
  currUserId: 'gordon',
  gameState: 1,
  name: 'Gordon',
  players: {
    gordon: {
      id: 'gordon',
      name: 'Gordon',
      hand: [
        { id: 0, type: 3 },
        { id: 1, type: 2 },
      ],
      isLeader: true,
      discardPile: [{ id: 2, type: 5 }],
    },
    steve: {
      id: 'steve',
      name: 'Steve',
      hand: [
        { id: 0, type: 3 },
      ],
      discardPile: [{ id: 2, type: 5 }],
    },
  },
};

export default function reducer(state = initialState, action) {
  let name, newMessages, newPlayers, players;

  switch(action.type) {
    case actions.BARON_REVEAL:
      const baronRevealData = action.payload;
      return {
        ...state,
        baronRevealData,
      };

    case actions.CLOSE_END_GAME_MODAL:
      return {
        ...state,
        winnerIds: undefined,
      };

    case actions.DISMISS_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: undefined,
      };

    case actions.DISMISS_REVEAL:
      return {
        ...state,
        baronRevealData: undefined,
        priestRevealCard: undefined,
      };

    case actions.END_GAME:
      const winnerIds = action.payload;
      let alertMessage;
      if (winnerIds) {
        const winnerNames = winnerIds && winnerIds.map(winnerId => state.players[winnerId].name);
        alertMessage = `${winnerNames.join(' and ')} won the game!`;
      } else {
        alertMessage = 'The game has ended.';
      }
      return {
        ...state,
        gameState: STATE_GAME_END,
        alertMessage,
      };

    case actions.NEW_LEADER:
      const { playerId } = action.payload;
      const player = {
        ...state.players[playerId],
        isLeader: true,
      };
      newPlayers = {
        ...state.players,
        [playerId]: player,
      };
      return {
        ...state,
        players: newPlayers,
      };

    case actions.NEW_USER:
      const { id, isLeader } = action.payload;
      name = action.payload.name;
      const oldUser = state.users[id] || {};

      return {
        ...state,
        users: {
          ...state.users,
          [id]: {
            ...oldUser,
            name,
            isLeader,
          },
        },
      };

    case actions.USER_DISCONNECT:
      const disconnectedUserId = action.payload.userId;
      const newUsers = {};
      newPlayers = {};
      Object.keys(state.users).forEach(userId => {
        if (userId !== disconnectedUserId) {
          newUsers[userId] = state.users[userId];
        }
      });
      Object.keys(state.players).forEach(playerId => {
        if (playerId !== disconnectedUserId) {
          newPlayers[playerId] = state.players[playerId];
        }
      });
      return {
        ...state,
        players: newPlayers,
        users: newUsers,
      }

    case actions.NEW_MESSAGE:
      newMessages = [...state.messages, action.payload.message];
      return {
        ...state,
        messages: newMessages,
      };

    case actions.PRIEST_REVEAL:
      return {
        ...state,
        priestRevealCard: action.payload.card,
      };

    case actions.RECEIVE_DEBUG_INFO:
      console.log(action.payload);
      return state;

    case actions.RECEIVE_GAME_DATA:
      const { activePlayerId, roundNum } = action.payload;
      const gameState = action.payload.state;
      players = action.payload.players;

      newPlayers = {};
      Object.keys(players).forEach(playerId => {
        newPlayers[playerId] = {
          ...state.players[playerId],
          ...players[playerId],
        }
      });

      return {
        ...state,
        activePlayerId,
        gameState,
        players: newPlayers,
        roundNum,
      };

    case actions.RECEIVE_INIT_DATA:
      const { currUserId, messages, users } = action.payload;
      return {
        ...state,
        currUserId,
        messages,
        users,
      };

    case actions.SAVE_NAME:
      name = action.payload.name;
      return {
        ...state,
        debugEnabled: name === 'Gordon' || state.debugEnabled, // >_<
        name: name,
      };

    case actions.SHOW_ALERT:
      return {
        ...state,
        alertMessage: action.payload,
      };

    default:
      return state;
  }
};
