import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import LeaderPanel from './LeaderPanel';
import MessageLog from './MessageLog';
import PlayerList from './PlayerList';

function Lobby({ messages, roomCode, users, socket }) {
  const onNewChatMessage = msg => socket.emit('chatMessage', msg);

  return (
    <>
      <Container className="lobby-container">
        <Row>
          <Col className='lobby-title'>
            <h5>room code</h5>
            <h1 className='room-code'>{roomCode}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6} lg={{ offset: 3, span: 3 }}>
            <PlayerList users={users} />
          </Col>
          <Col xs={6} lg={{ span: 3 }}>
            <LeaderPanel numUsers={Object.keys(users).length}/>
            <MessageLog
              messages={messages}
              onNewMessage={onNewChatMessage}
            />
          </Col>
        </Row>
        <Row className='share-link'>
          <Col xs={{ offset: 3, span: 6 }}>
            Share this link and invite your friends!
            <Form.Control value={window.location.href} disabled />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Lobby;
