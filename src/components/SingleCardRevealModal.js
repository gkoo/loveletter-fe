import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';

function SingleCardRevealModal({ showCardModal, singleCardReveal }) {
  return (
    <Modal show={!!showCardModal && !!singleCardReveal}>
      <Modal.Body className='reveal-modal-body'>
        <h4>{singleCardReveal.label}</h4>
        <Card card={singleCardReveal.card} isDiscard={false} clickable={false} isRevealCard={true} />
      </Modal.Body>
    </Modal>
  );
}

export default SingleCardRevealModal;
