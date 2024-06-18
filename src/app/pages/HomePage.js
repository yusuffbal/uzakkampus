import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SummaryCard from '../components/homepage/SummaryCard';
import FeaturedCourses from '../components/homepage/FeaturedCourses';
import CourseProgressTable from '../components/homepage/CourseProgressTable';
import { getCurrentUser } from '../redux/auth/authActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as dashboardActions from "../redux/dashboard/dashboardActions";

const HomePage = () => {
  const dispatch = useDispatch();

  // Örnek veriler
  const [isLoading, setIsLoading] = useState(false);

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  
  const values = { email, password };


  useEffect(() => {
    dispatch(getCurrentUser(values));
    
  }, []);

  const { currentUser, dashboardAnaliyses,courseProgressData } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
      dashboardAnaliyses: state.dashboard.entities,
      courseProgressData: state.dashboard.progresstable
    }),
    shallowEqual
  );

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(dashboardActions.DashboardAnaliysesFetch(currentUser.id));
      dispatch(dashboardActions.DashboardProgressTableFetch(currentUser.id));
    }
    console.log("dashboardanaliyses: ",dashboardAnaliyses);
  }, [ currentUser]);





  const courseCount = dashboardAnaliyses?.coursesCount || 0;
  const upcomingExamsCount = dashboardAnaliyses?.examsQount || 0;
  const upcomingAssignmentsCount = dashboardAnaliyses?.assigmentsCount || 0;
  const upcomingQuizzesCount = dashboardAnaliyses?.quizCount || 0;
  const courses = dashboardAnaliyses?.courses || [];



  // Öne çıkan dersler için örnek veri
 






  return (
    <Container className="mt-4 h-100">
      <Row className="h-100">
        <Col lg={5} xl={5} className="d-flex flex-column">
          <Row className="flex-grow-1 mb-3">
            <Col md={6} className="d-flex">
              <SummaryCard title="Toplam Ders Sayısı" count={courseCount} />
            </Col>
            <Col md={6} className="d-flex">
              <SummaryCard title="Yaklaşan Sınav Sayısı" count={upcomingExamsCount} />
            </Col>
          </Row>
          <Row className="flex-grow-1 mb-3">
            <Col md={6} className="d-flex">
              <SummaryCard title="Yaklaşan Ödev Sayısı" count={upcomingAssignmentsCount} />
            </Col>
            <Col md={6} className="d-flex">
              <SummaryCard title="Yaklaşan Quiz Sayısı" count={upcomingQuizzesCount} />
            </Col>
          </Row>
        </Col>
        <Col lg={7} xl={7} className="d-flex flex-column">
          <FeaturedCourses courses={courses} />
        </Col>
      </Row>
      <CourseProgressTable data={courseProgressData} />

    </Container >
  );
};

export default HomePage;
