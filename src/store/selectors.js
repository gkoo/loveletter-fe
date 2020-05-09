import { createSelector } from 'reselect';

export const alertMessageSelector = state => state.alertMessage;
export const debugEnabledSelector = state => state.debugEnabled;
export const gameStateSelector = state => state.gameState;
export const playersSelector = state => state.players;
export const playerOrderSelector = state => state.playerOrder;
export const usersSelector = state => state.users;
export const messagesSelector = state => state.messages;
export const nameSelector = state => state.name;
export const socketSelector = state => state.socket;
export const currUserIdSelector = state => state.currUserId;
export const currUserSelector = createSelector(
  currUserIdSelector,
  usersSelector,
  (currUserId, users) => users[currUserId],
)
export const currPlayerSelector = createSelector(
  currUserIdSelector,
  playersSelector,
  (currUserId, players) => players[currUserId],
)
// the id of the player whose turn it is
export const activePlayerIdSelector = state => state.activePlayerId;
export const activePlayerSelector = createSelector(
  playersSelector,
  activePlayerIdSelector,
  (players, activePlayerId) => players[activePlayerId]
);
export const baronRevealDataSelector = state => state.baronRevealData;
export const lastCardPlayedSelector = state => state.lastCardPlayed;
export const roomCodeSelector = state => state.roomCode;
export const showCardModalSelector = state => state.showCardModal;
export const cardRevealSelector = state => state.cardReveal;
export const switchCardDataSelector = state => state.switchCardData;
export const winnerIdsSelector = state => state.winnerIds;
