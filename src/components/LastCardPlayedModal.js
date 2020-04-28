import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';
import { CARD_PRIEST, CARD_BARON } from '../constants';

function LastCardPlayedModal({ currUserId, lastCardPlayed, players, showLastCardPlayed }) {
  if (!lastCardPlayed) {
    return <div />;
  }

  const { playerId, card, effectData, discarded } = lastCardPlayed;
  const playerName = players[playerId].name;

  let targetPlayerName = null;
  let targetPlayerId = effectData && effectData.targetPlayerId;

  if (targetPlayerId) {
    targetPlayerName = players[targetPlayerId].name;
  }

  const title = [playerName];
  if (targetPlayerName) {
    title.push(`⇢ ${targetPlayerName}`);
  } else if (discarded) {
    title.push('discarded');
  }

  const shouldHide = !showLastCardPlayed || (
    card.type === CARD_BARON && [playerId, targetPlayerId].includes(currUserId)
  ) || (
    card.type === CARD_PRIEST && currUserId === playerId
  );

  return (
    <Modal show={!shouldHide}>
      <Modal.Body className='reveal-modal-body'>
        <div className='baron-reveal-card'>
          <h4>{title.join(' ')}</h4>
          {
            card &&
              <Card
                key={card.id}
                card={card}
                clickable={false}
                isDiscard={false}
                isRevealCard={true}
              />
          }
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LastCardPlayedModal;
