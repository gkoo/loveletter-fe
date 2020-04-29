import React from 'react';
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './bootstrap.min.css';

function Homepage() {
  const nameLength = 4;
  let roomCode = '';

  for (let i = 0; i < nameLength; ++i) {
    const alphabetLength = 26;
    const charCode = Math.floor(Math.random() * alphabetLength);
    roomCode += String.fromCharCode('a'.charCodeAt(0) + charCode);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Hello World!</h1>
          <Link className='btn btn-primary' to={`/rooms/${roomCode}`}>
            Join a room
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
