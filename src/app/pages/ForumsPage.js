import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export const forums = [
    {
      Id: 1,
      Title: "General Discussion",
      Description: "Discuss anything related to the course.",
      Posts: [
        {
          Id: 1,
          Title: "Welcome to the forum!",
          Description: "Introduce yourself and meet other students.",
          Image: null,
        },
        {
          Id: 2,
          Title: "Course Feedback",
          Description: "Share your feedback about the course.",
          Image: null,
        },
      ],
    },
    {
      Id: 2,
      Title: "Assignments Help",
      Description: "Get help with assignments.",
      Posts: [
        {
          Id: 3,
          Title: "Assignment 1 Discussion",
          Description: "Discuss Assignment 1 here.",
          Image: null,
        },
        {
          Id: 4,
          Title: "Assignment 2 Tips",
          Description: "Tips and tricks for Assignment 2.",
          Image: null,
        },
      ],
    },
    {
      Id: 3,
      Title: "Exam Preparation",
      Description: "Prepare for the exams together.",
      Posts: [
        {
          Id: 5,
          Title: "Midterm Exam Preparation",
          Description: "How to prepare for the midterm exam.",
          Image: null,
        },
        {
          Id: 6,
          Title: "Final Exam Tips",
          Description: "Tips for the final exam.",
          Image: null,
        },
      ],
    },
  ];
  

const ForumsPage = () => {

    
  return (
    <div className="container mt-5">
      <h2>Forums</h2>
      <div className="row">
        {forums.map(forum => (
          <div className="col-md-4" key={forum.Id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{forum.Title}</Card.Title>
                <Card.Text>{forum.Description}</Card.Text>
                <Link to={`/forums/${forum.Id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumsPage;
