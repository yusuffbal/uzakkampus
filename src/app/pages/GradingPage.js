import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import GradingTable from '../components/gradingpage/GradingTable';
import CourseStats from '../components/gradingpage/CourseStats';

const GradingPage = () => {
  const [notes, setNotes] = useState([
    { id: 1, course: 'Math', midterm: 80, final: 90, makeup: 85, grade: 88 },
    { id: 2, course: 'Science', midterm: 70, final: 85, makeup: 80, grade: 82 },
    { id: 3, course: 'History', midterm: 75, final: 80, makeup: 78, grade: 79 },
  ]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={6} xl={12}>
          <Tabs defaultActiveKey="gradingTable" transition={false} id="grading-tabs" className="mb-3">
            <Tab eventKey="gradingTable" title="Grading Table">
              <GradingTable notes={notes} />
            </Tab>
            <Tab eventKey="courseStats" title="Course Stats">
              <CourseStats notes={notes} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default GradingPage;
