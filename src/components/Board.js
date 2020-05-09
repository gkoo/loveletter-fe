import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaronRevealModal from './BaronRevealModal';
import LastCardPlayedModal from './LastCardPlayedModal';
import CardRevealModal from './CardRevealModal';
import SwitchCardModal from './SwitchCardModal';
import WinnerModal from './WinnerModal';
import { closeEndGameModal } from '../store/actions';

import {
  activePlayerIdSelector,
  baronRevealDataSelector,
  currUserIdSelector,
  gameStateSelector,
  lastCardPlayedSelector,
  playersSelector,
  playerOrderSelector,
  showCardModalSelector,
  cardRevealSelector,
  switchCardDataSelector,
  winnerIdsSelector,
} from '../store/selectors';
import PlayerView from './PlayerView';
import { STATE_PENDING } from '../constants';

const getPlayersInOrder = (playerOrder, players, currUserId) => {
  const activePlayerTurnIdx = playerOrder.indexOf(currUserId);
  // Show current player at the top, then rest of the players in order of turn order
  const playerIdsInOrder = playerOrder.slice(activePlayerTurnIdx).concat(
    playerOrder.slice(0, activePlayerTurnIdx)
  );
  return playerIdsInOrder.map(playerId => players[playerId]);
};

function Board() {
  const activePlayerId = useSelector(activePlayerIdSelector);
  const baronRevealData = useSelector(baronRevealDataSelector);
  const currUserId = useSelector(currUserIdSelector);
  const gameState = useSelector(gameStateSelector);
  const lastCardPlayed = useSelector(lastCardPlayedSelector);
  const players = useSelector(playersSelector);
  const playerOrder = useSelector(playerOrderSelector);
  const cardReveal = useSelector(cardRevealSelector);
  const showCardModal = useSelector(showCardModalSelector);
  const switchCardData = useSelector(switchCardDataSelector);
  const winnerIds = useSelector(winnerIdsSelector);

  const dispatch = useDispatch();

  if (gameState === STATE_PENDING) {
    return (
      <>
        <h1>Waiting for game to start...</h1>
      </>
    );
  }

  if (Object.keys(players).length === 0) {
    return <div/>;
  }

  const onCloseEndGameModal = () => dispatch(closeEndGameModal());

  const playersInOrder = getPlayersInOrder(playerOrder, players, currUserId);

  return (
    <>
      {
        Object.values(playersInOrder).map(player => {
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
        <BaronRevealModal
          baronRevealData={baronRevealData}
          players={players}
          showCardModal={showCardModal}
        />
      }
      {
        cardReveal &&
          <CardRevealModal
            showCardModal={showCardModal}
            cardReveal={cardReveal}
          />
      }
      {
        <SwitchCardModal showCardModal={showCardModal} switchCardData={switchCardData} />
      }
      {
        <LastCardPlayedModal
          currUserId={currUserId}
          lastCardPlayed={lastCardPlayed}
          players={players}
          showCardModal={showCardModal}
        />
      }
      {
        winnerIds &&
          <WinnerModal players={players} winnerIds={winnerIds} onClose={onCloseEndGameModal}/>
      }
    </>
  );
}

export default Board;
