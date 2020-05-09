import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';
import { CARD_CARDINAL, CARD_PRIEST, CARD_BARON } from '../constants';

function LastCardPlayedModal({
  baronRevealData,
  currUserId,
  lastCardPlayed,
  players,
  showCardModal,
  singleCardReveal,
}) {
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

  let multiTargetPlayerNames = null;
  let multiTargetPlayerIds = effectData && effectData.multiTargetPlayerIds;

  if (multiTargetPlayerIds) {
    multiTargetPlayerNames = multiTargetPlayerIds.map(id => players[id].name);
  }

  const shouldShow = () => {
    if (!showCardModal) { return false; }

    if (card.type === CARD_CARDINAL) {
      return !multiTargetPlayerIds.includes(currUserId) && currUserId !== playerId;
    }
    if (card.type === CARD_BARON) {
      return ![playerId, targetPlayerId].includes(currUserId);
    }
    if (card.type === CARD_PRIEST) {
      return currUserId !== playerId;
    }
    return true;
  };

  const title = [playerName];
  if (targetPlayerName) {
    title.push(`⇢ ${targetPlayerName}`);
  } else if (discarded) {
    title.push('discarded');
  }

  if (card.type === CARD_CARDINAL) {
    return (
      <Modal show={shouldShow()}>
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
  };

  return (
    <Modal show={shouldShow()}>
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
