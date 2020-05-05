import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AlertMessageModal from './components/AlertMessageModal';
import Game from './components/Game';
import Lobby from './components/Lobby';
import NameModal from './components/NameModal';
import { STATE_PENDING } from './constants';
import * as actions from './store/actions';
import * as selectors from './store/selectors';

import './bootstrap.min.css';
import './game.css';

function Room() {
  const dispatch = useDispatch();
  const alertMessage = useSelector(selectors.alertMessageSelector);
  const gameState = useSelector(selectors.gameStateSelector);
  const messages = useSelector(selectors.messagesSelector);
  const roomCode = useSelector(selectors.roomCodeSelector);
  const name = useSelector(selectors.nameSelector);
  const players = useSelector(selectors.playersSelector);
  const socket = useSelector(selectors.socketSelector);
  const users = useSelector(selectors.usersSelector);

  const roomCodeParam = useParams().roomCode;

  const onDismissAlertMessage = () => dispatch(actions.dismissAlertMessage());

  const ROOM_CODE_PREFIX = 'room-';

  // Join room using room code
  useEffect(() => {
    // Just store the room code so that we don't try to join the room multiple times
    if (!roomCode) {
      const socketIoRoomName = `${ROOM_CODE_PREFIX}${roomCodeParam}`;
      socket.emit('joinRoom', socketIoRoomName);
      dispatch(actions.joinRoom(socketIoRoomName));
    }
  }, [socket, dispatch, roomCode, roomCodeParam]);

  // Include second arg to prevent this from running multiple times
  useEffect(() => {
    if (!socket) { return; }

    socket.on('baronReveal', baronData => dispatch(actions.baronReveal(baronData)));
    socket.on('debugInfo', data => dispatch(actions.receiveDebugInfo(data)));
    socket.on('dismissReveal', () => dispatch(actions.dismissReveal()));
    socket.on('endGame', winnerIds => dispatch(actions.endGame(winnerIds)));
    socket.on('initData', data => dispatch(actions.receiveInitData(data)));
    socket.on('gameData', gameData => dispatch(actions.receiveGameData(gameData)));
    socket.on('newUser', user => dispatch(actions.newUser(user)));
    socket.on('newLeader', userId => dispatch(actions.newLeader(userId)));
    socket.on('message', message => dispatch(actions.newMessage(message)));
    socket.on('lastCardPlayed', playCardData => dispatch(actions.lastCardPlayed(playCardData)));
    socket.on('singleCardReveal', data => dispatch(actions.singleCardReveal(data)));
    socket.on('switchCardData', card => dispatch(actions.switchCardData(card)));
    socket.on('userDisconnect', userId => dispatch(actions.userDisconnect(userId)));
  }, [socket, dispatch]);

  return (
    <>
      {
        gameState === STATE_PENDING &&
          <Lobby
            messages={messages}
            roomCode={roomCodeParam}
            socket={socket}
            users={users}
          />
      }
      {
        gameState !== STATE_PENDING &&
          <Game
            socket={socket}
            messages={messages}
            players={players}
            users={users}
          />
      }
      <NameModal show={!name} />
      <AlertMessageModal alertMessage={alertMessage} onClose={onDismissAlertMessage}/>
    </>
  );
}

export default Room;
