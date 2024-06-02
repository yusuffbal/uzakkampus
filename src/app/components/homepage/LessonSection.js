import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

export const LessonSection = ({ title }) => {
  const lessons = ['Yapay Zeka 1', 'Yapay Zeka 2', 'Yapay Zeka 3', 'Yapay Zeka 4', 'Yapay Zeka 5', 'Yapay Zeka 6'];
  const [visibleLessons, setVisibleLessons] = useState(lessons.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextLessons = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex <= lessons.length - 3) {
      setCurrentIndex(nextIndex);
      setVisibleLessons(lessons.slice(nextIndex, nextIndex + 3));
    }
  };

  const showPreviousLessons = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setVisibleLessons(lessons.slice(prevIndex, prevIndex + 3));
    }
  };

  return (
    <div className="lesson-section-wrapper">
      <section className="section">
        <h2>{title}</h2>
        <Row className="scrollable-cards">
        <Card border="primary" style={{ width: '18rem' }} bg='Light'>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
        </Row>
        <div className="lesson-navigation">
          <Button className="custom-button" onClick={showPreviousLessons} disabled={currentIndex === 0}>Önceki</Button>
          <Button className="custom-button" onClick={showNextLessons} disabled={currentIndex === lessons.length - 3}>Sonraki</Button>
        </div>
      </section>
    </div>
  );
};
