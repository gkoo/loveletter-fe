import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaronRevealModal from './BaronRevealModal';
import DrawNewCardModal from './DrawNewCardModal';
import LastCardPlayedModal from './LastCardPlayedModal';
import CardRevealModal from './CardRevealModal';
import SwitchCardModal from './SwitchCardModal';
import WinnerModal from './WinnerModal';
import { closeEndGameModal, toggleDrawNewCard } from '../store/actions';

import * as selectors from '../store/selectors';
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
  const activePlayerId = useSelector(selectors.activePlayerIdSelector);
  const baronRevealData = useSelector(selectors.baronRevealDataSelector);
  const currUserId = useSelector(selectors.currUserIdSelector);
  const gameState = useSelector(selectors.gameStateSelector);
  const lastCardPlayed = useSelector(selectors.lastCardPlayedSelector);
  const players = useSelector(selectors.playersSelector);
  const playerOrder = useSelector(selectors.playerOrderSelector);
  const cardReveal = useSelector(selectors.cardRevealSelector);
  const showCardModal = useSelector(selectors.showCardModalSelector);
  const showDrawNewCardModal = useSelector(selectors.showDrawNewCardModalSelector);
  const socket = useSelector(selectors.socketSelector);
  const switchCardData = useSelector(selectors.switchCardDataSelector);
  const winnerIds = useSelector(selectors.winnerIdsSelector);

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
  const onDecideDrawNewCard = willDraw => {
    socket.emit('decideDrawNewCard', { willDraw });
    dispatch(toggleDrawNewCard({ show: false }))
  };

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
        <DrawNewCardModal show={showDrawNewCardModal} onDecide={onDecideDrawNewCard} />
      }
      {
        winnerIds &&
          <WinnerModal players={players} winnerIds={winnerIds} onClose={onCloseEndGameModal}/>
      }
    </>
  );
}

export default Board;
