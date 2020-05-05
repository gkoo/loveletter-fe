import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';

function BaronRevealModal({ baronRevealData, players }) {
  baronRevealData.forEach(data => {
    data.name = players[data.playerId].name;
  });

  return (
    <Modal show={!!baronRevealData}>
      <Modal.Body className='reveal-modal-body'>
        {
          baronRevealData.map(revealData =>
            <div className='reveal-card'>
              <h4>{revealData.name}</h4>
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
