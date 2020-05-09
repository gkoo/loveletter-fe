import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Board from './Board';
import Guide from './Guide';
import LeaderPanel from './LeaderPanel';
import MessageLog from './MessageLog';

function Game({ socket, messages, users }) {
  const onNewChatMessage = msg => socket.emit('chatMessage', msg);

  return (
    <Container>
      <Row>
        <Col><h1>Love Communique</h1></Col>
      </Row>
      <Row>
        <Col lg={9}>
          <Board />
        </Col>
        <Col lg={3}>
          <LeaderPanel numUsers={Object.keys(users).length}/>
          <MessageLog
            messages={messages}
            onNewMessage={onNewChatMessage}
          />
          <Guide />
        </Col>
      </Row>
      <div className='end-turn-button'>
        <Button onClick={() => socket.emit('nextTurnDebug')}>End Turn</Button>
      </div>
    </Container>
  );
}

export default Game;
