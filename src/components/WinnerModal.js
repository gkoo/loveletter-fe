import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WinnerModal({ players, winnerIds, onClose }) {
  const winnerNames = winnerIds && winnerIds.map(winnerId => players[winnerId].name);
  return (
    <Modal show={!!winnerIds}>
      <Modal.Header>
        <Modal.Title>Game Over!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{winnerNames.join(' and ')} won the game!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WinnerModal;
