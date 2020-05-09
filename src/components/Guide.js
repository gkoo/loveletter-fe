import React from 'react';

import Button from 'react-bootstrap/Button';

function Guide({ onShowRules }) {
  return (
    <>
      <Button variant='link' onClick={onShowRules}>How to play</Button>
      <p><strong>Card Effects</strong></p>
      <ul>
        <li>(8) Princess: If discarded, you are knocked out of the round.</li>
        <li>(7) Countess: Discard if caught with King or Prince.</li>
        <li>(6) King: Trade hands with another player.</li>
        <li>(5) Prince: Choose a player to discard his or her hand.</li>
        <li>(4) Handmaid: Protection until your next turn.</li>
        <li>(3) Baron: Compare hands with another player; lower hand is out.</li>
        <li>(2) Priest: Look at another player's hand.</li>
        <li>(1) Guard: Guess a player's hand. If correct, that player is out.</li>
      </ul>
    </>
  );
}

export default Guide;
