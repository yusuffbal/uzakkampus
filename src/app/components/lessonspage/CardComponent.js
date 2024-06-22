import React from 'react';
import { Card } from 'react-bootstrap';
import { FaInfoCircle, FaCog } from 'react-icons/fa';

const CardComponent = ({ lessonName, description, onDetail, onAction }) => {
  return (
    <Card style={{ width: '100%', maxWidth: '20rem', height: '15rem', overflow: 'hidden' }} className="mb-2">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title>{lessonName}</Card.Title>
        <div>
          <FaInfoCircle size={24} className="me-2" onClick={onDetail} style={{ cursor: 'pointer' }} />
          <FaCog size={24} onClick={onAction} style={{ cursor: 'pointer' }} />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
