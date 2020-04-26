import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import Card from './Card';
import {
  activePlayerIdSelector,
  currPlayerIdSelector,
  gameStateSelector,
  socketSelector,
} from '../store/selectors';
import { STATE_STARTED } from '../constants';

function PlayerView({ player, active, allPlayers }) {
  const activePlayerId = useSelector(activePlayerIdSelector);
  const currPlayerId = useSelector(currPlayerIdSelector);
  const gameState = useSelector(gameStateSelector);
  const socket = useSelector(socketSelector);

  const playerIsCurrPlayer = player.id === currPlayerId;
  const playerIsActivePlayer = player.id === activePlayerId;

  const handleClick = ({ card, effectData }) => {
    if (!active) { return; }

    socket.emit('playCard', { cardId: card.id, effectData });
  };

  const renderTokens = () => {
    const tokens = [];
    for (let i=0; i < player.numTokens; ++i) {
      tokens.push('❤️');
    }
    return tokens.join('');
  };

  return (
    <div className={cx('player-view', { active })}>
      <div className='player-name'>
        <h3>{player.name} {renderTokens()}</h3>
      </div>
      {
        player.discardPile && player.discardPile.map(
          discardCard => (
            <Card
              key={discardCard.id}
              card={discardCard}
              isActivePlayer={playerIsActivePlayer}
              isDiscard={true}
            />
          )
        )
      }
      {
        player.hand && player.hand.map(
          card => (
            <Card
              allPlayers={allPlayers}
              card={card}
              clickable={playerIsCurrPlayer && playerIsActivePlayer && gameState === STATE_STARTED}
              clickCallback={handleClick}
              currPlayerId={currPlayerId}
              currHand={player.hand}
              isActivePlayer={playerIsActivePlayer}
              isDiscard={false}
              key={card.id}
            />
          )
        )
      }
    </div>
  );
}

export default PlayerView;
