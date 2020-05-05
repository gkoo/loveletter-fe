import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Card from './Card';

function SwitchCardModal({ switchCardData }) {
  const renderCard = cardData => {
    return(
      <div className='reveal-card'>
        <h4>{cardData.name}</h4>
        <Card
          key={cardData.card.id}
          card={cardData.card}
          clickable={false}
          isDiscard={false}
          isRevealCard={true}
        />
      </div>
    );
  };

  return (
    <Modal show={!!switchCardData} size='lg'>
      <Modal.Body className='reveal-modal-body'>
        {renderCard(switchCardData[0])}
        <div className='reveal-card px-3'>
          <div style={{ paddingTop: '50px' }}>
          ← Switch →
          </div>
        </div>
        {renderCard(switchCardData[1])}
      </Modal.Body>
    </Modal>
  );
}

export default SwitchCardModal;
