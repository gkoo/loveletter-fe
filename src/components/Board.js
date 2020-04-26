import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaronRevealModal from './BaronRevealModal';
import PriestRevealCardModal from './PriestRevealCardModal';
import WinnerModal from './WinnerModal';
import { closeEndGameModal } from '../store/actions';

import {
  activePlayerIdSelector,
  baronRevealDataSelector,
  gameStateSelector,
  playersSelector,
  priestRevealCardSelector,
  winnerIdsSelector,
} from '../store/selectors';
import PlayerView from './PlayerView';
import { STATE_PENDING } from '../constants';

function Board() {
  const activePlayerId = useSelector(activePlayerIdSelector);
  const baronRevealData = useSelector(baronRevealDataSelector);
  const gameState = useSelector(gameStateSelector);
  const players = useSelector(playersSelector);
  const priestRevealCard = useSelector(priestRevealCardSelector);
  const winnerIds = useSelector(winnerIdsSelector);

  const dispatch = useDispatch();

  if (gameState === STATE_PENDING) {
    return (
      <>
        <h1>Waiting for game to start...</h1>
      </>
    );
  }

  const onCloseEndGameModal = () => dispatch(closeEndGameModal());

  return (
    <>
      <h1>Love Communique</h1>
      {
        Object.values(players).map(player => {
          return (
            <PlayerView
              key={player.id}
              player={player}
              allPlayers={players}
              active={player.id === activePlayerId}
            />
          )
        })
      }
      {
        !!baronRevealData &&
          <BaronRevealModal baronRevealData={baronRevealData} players={players} />
      }
      {
        priestRevealCard &&
          <PriestRevealCardModal priestRevealCard={priestRevealCard} />
      }
      {
        winnerIds &&
          <WinnerModal players={players} winnerIds={winnerIds} onClose={onCloseEndGameModal}/>
      }
    </>
  );
}

export default Board;
