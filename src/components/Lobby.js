import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import LeaderPanel from './LeaderPanel';
import MessageLog from './MessageLog';
import PlayerList from './PlayerList';

function Lobby({ messages, users, socket }) {
  const onNewChatMessage = msg => socket.emit('chatMessage', msg);

  return (
    <>
      <Container className="lobby-container">
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
      </Container>
    </>
  );
};

export default Lobby;
