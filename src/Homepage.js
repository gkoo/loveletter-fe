import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row';

import './bootstrap.min.css';

function Homepage() {
  const nameLength = 4;
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');

  let generatedRoomCode = '';
  for (let i = 0; i < nameLength; ++i) {
    const alphabetLength = 26;
    const charCode = Math.floor(Math.random() * alphabetLength);
    generatedRoomCode += String.fromCharCode('a'.charCodeAt(0) + charCode);
  }

  const onRoomCodeChange = (e) => setRoomCode(e.target.value);

  const joinRoom = () => history.push(`/rooms/${roomCode}`);

  return (
    <Container>
      <Row>
        <Col md={{ offset: 2 }}>
          <h1>Love Communique</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ offset: 2, span: 4 }}>
          <Card>
            <Card.Body>
              <h5>Create a new room</h5>
              <Form.Group>
              <Link className='btn btn-primary' to={`/rooms/${generatedRoomCode}`}>
                Create a room
              </Link>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Join a room</h5>
              <Form.Group controlId='roomCode'>
                <ButtonToolbar>
                  <InputGroup>
                    <Form.Control
                      placeholder='Room code'
                      value={roomCode}
                      onChange={onRoomCodeChange}
                    />
                  </InputGroup>
                  <ButtonGroup>
                    <Button variant='primary' onClick={joinRoom}>
                      Join room
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
