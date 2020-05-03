import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import cx from 'classnames';

import {
  CARD_GUARD,
  CARD_PRIEST,
  CARD_BARON,
  CARD_HANDMAID,
  CARD_PRINCE,
  CARD_KING,
  CARD_COUNTESS,
  CARD_PRINCESS,
  CARD_JESTER,
  CARD_CARDINAL,
  CARD_BARONESS,
  CARD_SYCOPHANT,
  CARD_DOWAGER_QUEEN,
  CARD_BISHOP,
  enumsToValues,
} from '../constants';
import CardOptionsPopover from './CardOptionsPopover';
import { showAlert } from '../store/actions';

function Card({
  allPlayers,
  card,
  clickable,
  clickCallback,
  currPlayerId,
  currHand,
  isActivePlayer,
  isDiscard,
  isRevealCard,
}) {
  const [showCardOptions, setShowCardOptions] = useState(false);
  const dispatch = useDispatch();
  const popoverTarget = useRef(null);
  const hasTargetEffect = [
    CARD_GUARD,
    CARD_PRIEST,
    CARD_BARON,
    CARD_PRINCE,
    CARD_KING,
    CARD_JESTER,
    CARD_CARDINAL,
    CARD_BARONESS,
    CARD_SYCOPHANT,
    CARD_DOWAGER_QUEEN,
    CARD_BISHOP,
  ].includes(card.type);

  const { label, value } = enumsToValues[card.type];

  const onHideCardOptions = () => setShowCardOptions(false);

  const handleClick = card => {
    if (!clickable) { return; }
    if (isDiscard) { return; }

    const currHandTypes = currHand.map(card => card.type);
    const hasCountess = currHandTypes.includes(CARD_COUNTESS);
    const hasKing = currHandTypes.includes(CARD_KING);
    const hasPrince = currHandTypes.includes(CARD_PRINCE);

    if (hasCountess && (hasKing || hasPrince)) {
      if (card.type !== CARD_COUNTESS) {
        const warningMsg = 'If you ever have the Countess and either the King or Prince in your ' +
          'hand, you must discard the Countess.';
        dispatch(showAlert(warningMsg));
        return;
      }
    }

    if (hasTargetEffect) {
      setShowCardOptions(!showCardOptions);
      return;
    }

    clickCallback({ card, effectData: {} });
  };

  const classNames = cx('game-card', {
    discard: isDiscard,
    clickable,
    expanded: isActivePlayer || isRevealCard,
    guard: card.type === CARD_GUARD,
    priest: card.type === CARD_PRIEST,
    baron: card.type === CARD_BARON,
    handmaid: card.type === CARD_HANDMAID,
    prince: card.type === CARD_PRINCE,
    king: card.type === CARD_KING,
    countess: card.type === CARD_COUNTESS,
    princess: card.type === CARD_PRINCESS,
  });

  const renderCard = () => {
    return (
      <div className={classNames} ref={popoverTarget} onClick={() => handleClick(card)}>
        <div className='circle'>{value}</div>
        {!isDiscard && <div className='title'>{label}</div>}
      </div>
    );
  };

  if (isDiscard) { return renderCard(); }
  if (!hasTargetEffect) { return renderCard(); }
  if (!clickable) { return renderCard(); }

  // Choose to target this person with the card's effect
  const onPlayCard = (effectData) => {
    setShowCardOptions(false);
    clickCallback({ card, effectData })
  };

  // For cards with target effects
  return (
    <>
      {renderCard()}
      <CardOptionsPopover
        allPlayers={allPlayers}
        card={card}
        currPlayerId={currPlayerId}
        label={label}
        onPlayCard={onPlayCard}
        onHide={onHideCardOptions}
        show={showCardOptions}
        target={popoverTarget.current}
      />
    </>
  );
}

export default Card;
