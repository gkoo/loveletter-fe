import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Board from './Board';
import MessageLog from './MessageLog';

function Game() {
  const onNewChatMessage = msg => socket.emit('chatMessage', msg);

  return (
    <Container>
      <Row>
        <Col>
          <Board />
        </Col>
        <Col>
          <MessageLog
            messages={messages}
            players={players}
            onNewChatMessage={onNewChatMessage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Game;
