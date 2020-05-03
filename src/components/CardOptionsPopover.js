import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

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
  const [cardNumberGuess, setCardNumberGuess] = useState('');

  const onTargetedPlayerChange = value => {
    setCardTargetId(value);

    if (!showCardNumberButtons) { onPlayCard({ targetPlayerId: value }); }
  }

  const onCardNumberGuessChange = value => setCardNumberGuess(value);

  const onOkClick = () => {
    console.log(cardNumberGuess);
    onPlayCard({
      targetPlayerId: cardTargetId,
      cardNumberGuess,
    });
  };

  const alivePlayers = Object.values(allPlayers).filter(player => !player.isKnockedOut);

  const showCardNumberButtons = [CARD_GUARD, CARD_BISHOP].includes(card.type);

  const getTargetInstructions = () => {
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
      case CARD_CARDINAL:
        return 'Choose two players to switch hands. Then, choose one of the two players and look ' +
          'at their hand.';
      case CARD_BARONESS:
        return 'Choose one or two players and look at their hand.';
      case CARD_SYCOPHANT:
        return 'Choose a player. The card played next turn must target that player, if it has an ' +
          'effect.';
      case CARD_DOWAGER_QUEEN:
        return 'Choose another player. The two of you will compare hands and the player with ' +
          'the higher number is knocked out of the round.';
      case CARD_BISHOP:
        return 'Choose a player and guess the card number in their hand. If the player has that number ' +
          'in their hand, you receive a token.';
      default:
        console.error(`Unexpected card ${card.type} for getTargetInstructions`);
    }
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
      return discardCardButton();
    }

    return (
      <>
        {renderPlayerButtons(targetCandidates)}
        {showCardNumberButtons && renderCardNumberButtons(onCardNumberGuessChange)}
        {
          cardTargetId && cardNumberGuess &&
            <Button onClick={onOkClick}>OK</Button>
        }
      </>
    );
  };

  const onDiscard = () => { onPlayCard({ discard: true }) };

  const discardCardButton = () => {
    return (
      <>
        <p>
          There are no valid players to target. If you would still like to play this card,
          it will have no effect.
        </p>
        <Button onClick={onDiscard}>Discard</Button>
      </>
    );
  };

  const renderPlayerButtons = targetCandidates => {
    return (
      <ToggleButtonGroup name='playerToggle' onChange={onTargetedPlayerChange}>
        {
          targetCandidates.map(
            player =>
              <ToggleButton name='playerToggle' value={player.id}>
                {player.name}
              </ToggleButton>
          )
        }
      </ToggleButtonGroup>
    );
  };

  const renderCardNumberButtons = () => {
    const possibleNumbers = [2, 3, 4, 5, 6, 7, 8];

    return (
      <ToggleButtonGroup name="radio" onChange={onCardNumberGuessChange}>
        {
          possibleNumbers.map(number =>
            <ToggleButton key={number} type="radio" name="radio" value={number}>
              {number}
            </ToggleButton>
          )
        }
      </ToggleButtonGroup>
    );
  };

  return (
    <Overlay
      onHide={onHide}
      placement='right'
      rootClose={true}
      show={show}
      target={target}
    >
      <Popover>
        <Popover.Title as="h3">{label}</Popover.Title>
        <Popover.Content>
          <p>{getTargetInstructions()}</p>
          {getTargetButtons()}
        </Popover.Content>
      </Popover>
    </Overlay>
  );
}

export default CardOptionsPopover;
