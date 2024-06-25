import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import GradingTable from '../components/gradingpage/GradingTable';
import CourseStats from '../components/gradingpage/CourseStats';
import * as courseActions from "../redux/course/courseActions";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const GradingPage = () => {
  const dispatch = useDispatch();

  const { currentUser, grade } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
      grade: state.course.Grading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(courseActions.GetGradingFetch(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("grade: ", grade);
  }, [grade]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={6} xl={12}>
          <Tabs defaultActiveKey="gradingTable" transition={false} id="grading-tabs" className="mb-3">
            <Tab eventKey="gradingTable" title="Not Tablosu">
              <GradingTable notes={grade} />
            </Tab>
            <Tab eventKey="courseStats" title="Ders İstatistikleri">
              <CourseStats notes={grade} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default GradingPage;
