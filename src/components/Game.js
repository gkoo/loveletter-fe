import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Board from './Board';
import LeaderPanel from './LeaderPanel';
import MessageLog from './MessageLog';

function Game({ socket, messages, players }) {
  const onNewChatMessage = msg => socket.emit('chatMessage', msg);

  return (
    <Container>
      <Row>
        <Col lg={9}>
          <Board />
        </Col>
        <Col lg={3}>
          <LeaderPanel numPlayers={Object.keys(players).length}/>
          <MessageLog
            messages={messages}
            players={players}
            onNewMessage={onNewChatMessage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Game;
