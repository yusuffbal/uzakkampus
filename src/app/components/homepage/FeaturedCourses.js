import React from 'react';
import { Card, Button } from 'react-bootstrap';

const FeaturedCourses = ({ courses }) => {
  return (
    <div className="featured-courses d-flex flex-column h-100">
      {courses.map((course, index) => (
        <Card key={index} className="mb-2 flex-grow-1 d-flex flex-column">
          
          <Card.Body className="d-flex flex-column">
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>{course.description}</Card.Text>
            <Button variant="primary" href={course.link} className="mt-auto">Daha Fazla Detay</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedCourses;
