import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';

function CardRevealModal({ showCardModal, cardReveal }) {
  return (
    <Modal show={!!showCardModal && !!cardReveal}>
      <Modal.Body className='reveal-modal-body'>
        {
          cardReveal.map(cardData =>
            <div className='reveal-card'>
              <h4>{cardData.label}</h4>
              <Card card={cardData.card} isDiscard={false} clickable={false} isRevealCard={true} />
            </div>
          )
        }
      </Modal.Body>
    </Modal>
  );
}

export default CardRevealModal;
