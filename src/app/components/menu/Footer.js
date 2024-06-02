// src/components/menu/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark py-1 fixed-bottom">
      <Container>
        <Row>
          <Col md={12} className="text-center text-md-left">
            <p>&copy; 2024 Uzak Kampüs</p>
          </Col>
          
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
