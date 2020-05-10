import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DrawNewCardModal({ onDecide, show }) {
  const onYesClick = () => {
    onDecide(true);
  };
  const onNoClick = () => {
    onDecide(false);
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>
          Draw a new card?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Because your card was guessed, you have the option to draw a new card. Would you like to
          draw a new card?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onNoClick}>
          No
        </Button>
        <Button variant="primary" onClick={onYesClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DrawNewCardModal
