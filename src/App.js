import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Game from './components/Game';
import Lobby from './components/Lobby';
import NameModal from './components/NameModal';
import {
  baronReveal,
  dismissReveal,
  endGame,
  newPlayer,
  newLeader,
  newMessage,
  playerDisconnect,
  priestReveal,
  receiveDebugInfo,
  receiveGameData,
  receiveInitData,
} from './store/actions';
import { STATE_PENDING } from './constants';
import {
  gameStateSelector,
  messagesSelector,
  nameSelector,
  playersSelector,
  socketSelector,
} from './store/selectors';

import './bootstrap.min.css';
import './game.css';

function App() {
  const dispatch = useDispatch();
  const gameState = useSelector(gameStateSelector);
  const messages = useSelector(messagesSelector);
  const name = useSelector(nameSelector);
  const players = useSelector(playersSelector);
  const socket = useSelector(socketSelector);

  // Include second arg to prevent this from running multiple times
  useEffect(() => {
    socket.on('baronReveal', baronData => dispatch(baronReveal(baronData)));
    socket.on('debugInfo', data => dispatch(receiveDebugInfo(data)));
    socket.on('dismissReveal', () => dispatch(dismissReveal()));
    socket.on('endGame', ({ winnerIds }) => dispatch(endGame(winnerIds)));
    socket.on('initData', data => dispatch(receiveInitData(data)));
    socket.on('gameData', gameData => dispatch(receiveGameData(gameData)));
    socket.on('newPlayer', player => dispatch(newPlayer(player)));
    socket.on('newLeader', playerId => dispatch(newLeader(playerId)));
    socket.on('message', message => dispatch(newMessage(message)));
    socket.on('priestReveal', card => dispatch(priestReveal(card)));
    socket.on('playerDisconnect', playerId => dispatch(playerDisconnect(playerId)));
  }, [socket, dispatch]);

  return (
    <>
      {
        gameState === STATE_PENDING &&
          <Lobby messages={messages} players={players} socket={socket} />
      }
      {
        gameState !== STATE_PENDING &&
          <Game socket={socket} messages={messages} players={players} />
      }
      <NameModal show={!name} />
    </>
  );
}

export default App;
