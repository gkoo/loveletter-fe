import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';

function BaronRevealModal({ baronRevealData, players, showCardModal }) {
  return (
    <Modal show={!!showCardModal && !!baronRevealData}>
      <Modal.Body className='reveal-modal-body'>
        {
          baronRevealData &&
            baronRevealData.map(revealData =>
              <div className='reveal-card'>
                <h4>{players[revealData.playerId].name}</h4>
                <Card
                  key={revealData.card.id}
                  card={revealData.card}
                  clickable={false}
                  isDiscard={false}
                  isRevealCard={true}
                />
              </div>
            )
        }
      </Modal.Body>
    </Modal>
  );
}

export default BaronRevealModal;
