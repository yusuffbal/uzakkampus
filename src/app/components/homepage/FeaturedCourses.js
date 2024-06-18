import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const FeaturedCourses = ({ courses }) => {
  const history = useHistory();

  const handleButtonClick = (id) => {
    history.push(`/courses/${id}/`);
  };

  return (
    <div className="featured-courses d-flex flex-column h-100">
      {courses.map((course, index) => (
        <Card key={index} className="mb-2 flex-grow-1 d-flex flex-column">
          <Card.Body className="d-flex flex-column">
            <Card.Title>{course.name}</Card.Title>
            <Card.Text>{course.title}</Card.Text>
            <Button 
              variant="primary" 
              className="mt-auto" 
              onClick={() => handleButtonClick(course.id)}
            >
              Daha Fazla Detay
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedCourses;
