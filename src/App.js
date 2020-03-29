import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppHeader from './components/AppHeader';
import Calculator from './components/Calculator';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Container className="bg-light" style={{minHeight: '100vh'}}>
        <Row>
          <Col md={6}>
            <AppHeader />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Calculator />
          </Col>
        </Row>
      </Container>
    );
  };
}

export default App;
