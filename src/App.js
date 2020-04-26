import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlertMessageModal from './components/AlertMessageModal';
import Game from './components/Game';
import Lobby from './components/Lobby';
import NameModal from './components/NameModal';
import {
  baronReveal,
  dismissAlertMessage,
  dismissReveal,
  endGame,
  newUser,
  newLeader,
  newMessage,
  userDisconnect,
  priestReveal,
  receiveDebugInfo,
  receiveGameData,
  receiveInitData,
} from './store/actions';
import { STATE_PENDING } from './constants';
import {
  alertMessageSelector,
  gameStateSelector,
  messagesSelector,
  nameSelector,
  playersSelector,
  socketSelector,
  usersSelector,
} from './store/selectors';

import './bootstrap.min.css';
import './game.css';

function App() {
  const dispatch = useDispatch();
  const alertMessage = useSelector(alertMessageSelector);
  const gameState = useSelector(gameStateSelector);
  const messages = useSelector(messagesSelector);
  const name = useSelector(nameSelector);
  const players = useSelector(playersSelector);
  const socket = useSelector(socketSelector);
  const users = useSelector(usersSelector);

  const onDismissAlertMessage = () => dispatch(dismissAlertMessage());

  // Include second arg to prevent this from running multiple times
  useEffect(() => {
    socket.on('baronReveal', baronData => dispatch(baronReveal(baronData)));
    socket.on('debugInfo', data => dispatch(receiveDebugInfo(data)));
    socket.on('dismissReveal', () => dispatch(dismissReveal()));
    socket.on('endGame', winnerIds => dispatch(endGame(winnerIds)));
    socket.on('initData', data => dispatch(receiveInitData(data)));
    socket.on('gameData', gameData => dispatch(receiveGameData(gameData)));
    socket.on('newUser', user => dispatch(newUser(user)));
    socket.on('newLeader', playerId => dispatch(newLeader(playerId)));
    socket.on('message', message => dispatch(newMessage(message)));
    socket.on('priestReveal', card => dispatch(priestReveal(card)));
    socket.on('userDisconnect', userId => dispatch(userDisconnect(userId)));
  }, [socket, dispatch]);

  return (
    <>
      {
        gameState === STATE_PENDING &&
          <Lobby players={players} messages={messages} users={users} socket={socket} />
      }
      {
        gameState !== STATE_PENDING &&
          <Game socket={socket} messages={messages} players={players} />
      }
      <NameModal show={!name} />
      <AlertMessageModal alertMessage={alertMessage} onClose={onDismissAlertMessage}/>
    </>
  );
}

export default App;
