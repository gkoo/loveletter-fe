import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {
  currUserSelector,
  debugEnabledSelector,
  socketSelector,
} from '../store/selectors';
import {
  STATE_GAME_END,
  STATE_PENDING,
  STATE_ROUND_END,
  STATE_STARTED,
} from '../constants';
import { gameStateSelector } from '../store/selectors';

function LeaderPanel({ numUsers }) {
  const currUser = useSelector(currUserSelector);
  const debugEnabled = useSelector(debugEnabledSelector);
  const gameState = useSelector(gameStateSelector);
  const socket = useSelector(socketSelector);

  if (!currUser || !currUser.isLeader) {
    return <div/>;
  }

  const startGame = e => {
    e.preventDefault();
    socket.emit('startGame');
  };

  const newGame = e => {
    e.preventDefault();
    socket.emit('setPending');
  };

  const nextRound = e => {
    e.preventDefault();
    socket.emit('nextRound');
  };

  const endGame = e => {
    e.preventDefault();
    socket.emit('endGame');
  };

  const debug = e => {
    e.preventDefault();
    socket.emit('debug');
  };

  const wrongNumPlayers = numUsers < 2 || numUsers > 4;

  const renderStartGameButton = () => {
    if (gameState === STATE_PENDING) {
      if (wrongNumPlayers) {
        return <Button onClick={startGame} disabled>Start game</Button>;
      }
      return <Button onClick={startGame}>Start game</Button>;
    }
    // TODO: make this take you back to the lobby
    return <Button onClick={newGame}>New game</Button>;
  };

  return (
    <div>
      <ButtonGroup>
        {[STATE_PENDING, STATE_GAME_END].includes(gameState) && renderStartGameButton()}
        {
          gameState === STATE_ROUND_END &&
            <Button onClick={nextRound}>Next round</Button>
        }
        {
          [STATE_STARTED, STATE_ROUND_END].includes(gameState) &&
            <Button onClick={endGame}>End game</Button>
        }
        {
          debugEnabled &&
            <Button onClick={debug}>Debug</Button>
        }
      </ButtonGroup>
    </div>
  );
};

export default LeaderPanel;
