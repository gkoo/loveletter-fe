// Action Types
export const BARON_REVEAL = 'BARON_REVEAL';
export const CARD_REVEAL = 'CARD_REVEAL';
export const CLOSE_END_GAME_MODAL = 'CLOSE_END_GAME_MODAL';
export const DISMISS_ALERT_MESSAGE = 'DISMISS_ALERT_MESSAGE';
export const DISMISS_REVEAL = 'DISMISS_REVEAL';
export const END_GAME = 'END_GAME';
export const JOIN_ROOM = 'JOIN_ROOM';
export const LAST_CARD_PLAYED = 'LAST_CARD_PLAYED';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const NEW_LEADER = 'NEW_LEADER';
export const NEW_USER = 'NEW_USER';
export const TOGGLE_DRAW_NEW_CARD = 'TOGGLE_DRAW_NEW_CARD';
export const RECEIVE_DEBUG_INFO = 'RECEIVE_DEBUG_INFO';
export const RECEIVE_GAME_DATA = 'RECEIVE_GAME_DATA';
export const RECEIVE_INIT_DATA = 'RECEIVE_INIT_DATA';
export const SAVE_NAME = 'SAVE_NAME';
export const SHOW_ALERT = 'SHOW_ALERT';
export const SWITCH_CARD_DATA = 'SWITCH_CARD_DATA';
export const TOGGLE_RULES_MODAL = 'TOGGLE_RULES_MODAL';
export const USER_DISCONNECT = 'USER_DISCONNECT';

// Actions
export function baronReveal(baronData) {
  return {
    payload: baronData,
    type: BARON_REVEAL,
  }
}

export function closeEndGameModal() {
  return {
    type: CLOSE_END_GAME_MODAL,
  }
}

export function dismissAlertMessage() {
  return {
    type: DISMISS_ALERT_MESSAGE,
  }
}

export function dismissReveal() {
  return {
    type: DISMISS_REVEAL,
  }
}

export function endGame(winnerIds) {
  return {
    payload: winnerIds,
    type: END_GAME,
  }
}

export function joinRoom(roomCode) {
  return {
    payload: roomCode,
    type: JOIN_ROOM,
  }
}

export function receiveGameData(gameData) {
  return {
    payload: gameData,
    type: RECEIVE_GAME_DATA,
  }
}

export function newLeader(userId) {
  return {
    payload: { userId },
    type: NEW_LEADER,
  }
}

export function newMessage(message) {
  return {
    payload: { message },
    type: NEW_MESSAGE,
  }
}

export function newUser({ id, name, isLeader }) {
  return {
    payload: { id, name, isLeader },
    type: NEW_USER,
  }
}

export function toggleDrawNewCard({ show }) {
  return {
    payload: { show },
    type: TOGGLE_DRAW_NEW_CARD,
  }
}

export function receiveDebugInfo(data) {
  return {
    payload: data,
    type: RECEIVE_DEBUG_INFO,
  }
}

export function receiveInitData({ currUserId, messages, users }) {
  return {
    payload: { currUserId, messages, users },
    type: RECEIVE_INIT_DATA,
  }
}

export function saveName(name) {
  return {
    payload: { name },
    type: SAVE_NAME,
  }
}

export function userDisconnect(userId) {
  return {
    payload: { userId },
    type: USER_DISCONNECT,
  }
}

export function lastCardPlayed(data) {
  return {
    payload: data,
    type: LAST_CARD_PLAYED,
  }
}

export function cardReveal(data) {
  return {
    payload: data,
    type: CARD_REVEAL,
  }
}

export function showAlert(msg) {
  return {
    payload: msg,
    type: SHOW_ALERT,
  }
}

export function switchCardData(data) {
  return {
    payload: data,
    type: SWITCH_CARD_DATA,
  }
}

export function toggleRulesModal({ show }) {
  return {
    payload: { show },
    type: TOGGLE_RULES_MODAL,
  }
}
