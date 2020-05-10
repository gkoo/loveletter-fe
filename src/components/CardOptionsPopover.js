import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import cx from 'classnames';

import {
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
} from '../constants';

const getTargetInstructions = (card) => {
  switch (card.type) {
    case CARD_GUARD:
      return 'Choose a player and a number other than 1. If that player has that number ' +
        'in their hand, that player is knocked out of the round.';
    case CARD_PRIEST:
      return 'Choose another player. You will be able to look at their hand. Do not reveal ' +
        'the hand to any other players.';
    case CARD_BARON:
      return 'Choose another player. The two of you will compare hands and the player with ' +
        'the lower number is knocked out of the round.';
    case CARD_PRINCE:
      return 'Choose a player, including yourself. That player discards his or her hand ' +
        '(but doesn’t apply its effect, unless it is the Princess) and draws a new one.';
    case CARD_KING:
      return 'Trade the card in your hand with the card held by another player of your choice.';
    case CARD_JESTER:
      return 'Choose the player you think is most likely to win the round. If, at the end of ' +
       'the game, you\'ve chosen correctly, you receive a token.';
    case CARD_BARONESS:
      return 'Choose one or two players and look at their hand(s).';
    case CARD_SYCOPHANT:
      return 'Choose a player. The card played next turn must target that player, if it has an ' +
        'effect.';
    case CARD_DOWAGER_QUEEN:
      return 'Choose another player. The two of you will compare hands and the player with ' +
        'the higher number is knocked out of the round.';
    case CARD_BISHOP:
      return 'Choose a player and guess the card number in their hand. If the player has that number ' +
        'in their hand, you receive a token.';
    case CARD_CARDINAL:
      return null;
    default:
      console.error(`Unexpected card ${card.type} for getTargetInstructions`);
  }
};

const discardCardButton = (onDiscardCallback) => {
  return (
    <>
      <p>
        There are no valid players to target. If you would still like to play this card,
        it will have no effect.
      </p>
      <Button onClick={onDiscardCallback}>Discard</Button>
    </>
  );
};

const renderCardNumberButtons = (onChangeCallback, restrictGuardGuess) => {
  const possibleNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (restrictGuardGuess) {
    possibleNumbers.splice(1, 1);
  }

  return (
    <div className='my-3'>
      <ToggleButtonGroup name="radio" onChange={onChangeCallback}>
        {
          possibleNumbers.map(number =>
            <ToggleButton key={number} type="radio" name="radio" value={number}>
              {number}
            </ToggleButton>
          )
        }
      </ToggleButtonGroup>
    </div>
  );
};

function CardOptionsPopover({
  allPlayers,
  card,
  currPlayerId,
  label,
  onPlayCard,
  onHide,
  show,
  target,
}) {
  const [cardTargetId, setCardTargetId] = useState('');
  const [cardMultiTargetIds, setCardMultiTargetId] = useState([]);
  const [cardNumberGuess, setCardNumberGuess] = useState('');

  const onTargetedPlayerChange = value => {
    setCardTargetId(value);

    if (card.type === CARD_CARDINAL) { return; }

    if (!showCardNumberButtons) {
      onPlayCard({ targetPlayerId: value });
    }
  };

  const onMultiTargetedPlayerChange = value => {
    if (value.length > 2) { return; }
    setCardMultiTargetId(value);
  };

  const onDiscard = () => { onPlayCard({ discard: true }) };

  const onCardNumberGuessChange = value => setCardNumberGuess(value);

  const onOkClick = () => {
    onPlayCard({
      targetPlayerId: cardTargetId,
      multiTargetPlayerIds: cardMultiTargetIds,
      cardNumberGuess,
    });
  };

  const alivePlayers = Object.values(allPlayers).filter(player => !player.isKnockedOut);

  const showCardNumberButtons = [CARD_GUARD, CARD_BISHOP].includes(card.type);

  const renderMultiPlayerButtons = targetCandidates => {
    return (
      <div className='my-3'>
        <ToggleButtonGroup
          name='multiPlayerToggle'
          value={cardMultiTargetIds}
          onChange={onMultiTargetedPlayerChange}
          type='checkbox'
        >
          {
            targetCandidates.map(
              player =>
                <ToggleButton key={player.id} name='multiPlayerToggle' value={player.id}>
                  {player.name}
                </ToggleButton>
            )
          }
        </ToggleButtonGroup>
      </div>
    );
  };

  const renderPlayerButtons = targetCandidates => {
    return (
      <div className='my-3'>
        <ToggleButtonGroup name='playerToggle' value={cardTargetId} onChange={onTargetedPlayerChange}>
          {
            targetCandidates.map(
              player =>
                <ToggleButton key={player.id} name='playerToggle' value={player.id}>
                  {player.name}
                </ToggleButton>
            )
          }
        </ToggleButtonGroup>
      </div>
    );
  };

  const getTargetButtons = () => {
    let targetCandidates;

    const includeSelfTarget = [CARD_PRINCE, CARD_CARDINAL, CARD_SYCOPHANT].includes(card.type);

    if (includeSelfTarget) {
      targetCandidates = alivePlayers;
    } else {
      targetCandidates = alivePlayers.filter(player => player.id !== currPlayerId);
    }
    // Remove handmaid from targets
    targetCandidates = targetCandidates.filter(
      player => !player.handmaidActive || player.id === currPlayerId,
    );

    if (targetCandidates.length === 0) {
      // Everyone else has a handmaid
      return discardCardButton(onDiscard);
    }
    if (card.type === CARD_CARDINAL && targetCandidates < 2) {
      return discardCardButton(onDiscard);
    }

    switch (card.type) {
      case CARD_CARDINAL:
        const shouldPickPlayerToReveal = (
          cardMultiTargetIds.length === 2 && !cardMultiTargetIds.includes(currPlayerId)
        );

        return (
          <>
            <p>Select two players to switch cards.</p>
            {renderMultiPlayerButtons(targetCandidates)}
            {
              shouldPickPlayerToReveal && 
                <div>
                  <p>Select the player's card to look at after they have switched.</p>
                  {
                    renderPlayerButtons(
                      cardMultiTargetIds.filter(id => id !== currPlayerId).map(id => allPlayers[id])
                    )
                  }
                </div>
            }
            {
              (!shouldPickPlayerToReveal || cardTargetId) && cardMultiTargetIds.length === 2 &&
                <p><Button onClick={onOkClick}>OK</Button></p>
            }
          </>
        );
      case CARD_BARONESS:
        return (
          <>
            {renderMultiPlayerButtons(targetCandidates)}
            {
              cardMultiTargetIds.length >= 1 &&
                <p><Button onClick={onOkClick}>OK</Button></p>
            }
          </>
        );
      default:
        return (
          <>
            {renderPlayerButtons(targetCandidates)}
            {
              showCardNumberButtons &&
                renderCardNumberButtons(onCardNumberGuessChange, card.type === CARD_GUARD)
            }
            {
              cardTargetId && cardNumberGuess &&
                <Button onClick={onOkClick}>OK</Button>
            }
          </>
        );
    }
  };

  const instructions = getTargetInstructions(card);

  const classNames = cx(
    'card-options-popover',
    {
      bishop: card.type === CARD_BISHOP,
      guard: card.type === CARD_GUARD,
    },
  );

  return (
    <Overlay
      onHide={onHide}
      placement='right'
      rootClose={true}
      show={show}
      target={target}
    >
      <Popover className={classNames}>
        <Popover.Title as="h3">{label}</Popover.Title>
        <Popover.Content>
          {instructions && <p>{instructions}</p>}
          {getTargetButtons()}
        </Popover.Content>
      </Popover>
    </Overlay>
  );
}

export default CardOptionsPopover;
