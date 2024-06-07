import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SummaryCard from '../components/homepage/SummaryCard';
import FeaturedCourses from '../components/homepage/FeaturedCourses';
import CourseProgressTable from '../components/homepage/CourseProgressTable';
import { getCurrentUser } from '../redux/auth/authActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();

  // Örnek veriler
  const courseCount = 8; // Toplam ders sayısı
  const upcomingExamsCount = 3; // Yaklaşan sınav sayısı
  const upcomingAssignmentsCount = 2; // Yaklaşan ödev sayısı
  const upcomingQuizzesCount = 1; // Yaklaşan quiz sayısı

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  
  const values = { email, password };


  useEffect(() => {
    console.log("bilgi ",values);
    dispatch(getCurrentUser(values));
  }, []);

  const { currentUser } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
    }),
    shallowEqual
  );


  useEffect(() => {
    console.log("currentUser ",currentUser);
  }, [currentUser]);


  // Öne çıkan dersler için örnek veri
  const featuredCourses = [
    {
      id: 1,
      title: "Web Geliştirme Kursu",
      description: "Modern web teknolojileriyle tanışın.",
      link: "/courses/1"
    },
    {
      id: 2,
      title: "Mobil Uygulama Geliştirme",
      description: "iOS ve Android için uygulama geliştirme.",
      link: "/courses/2"
    },
    // Diğer kurslar...
  ];


  const courseProgressData = [
    { name: 'Ders Adı 1', instructor: 'Eğitmen 1', progress: 70, midtermGrade: 85, finalGrade: 90 },
    { name: 'Ders Adı 2', instructor: 'Eğitmen 2', progress: 50, midtermGrade: 75, finalGrade: 80 },
    { name: 'Ders Adı 3', instructor: 'Eğitmen 3', progress: 80, midtermGrade: 90, finalGrade: 95 },
    { name: 'Ders Adı 4', instructor: 'Eğitmen 4', progress: 60, midtermGrade: 80, finalGrade: 85 },
    // Diğer dersler...
  ];
  



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
          <FeaturedCourses courses={featuredCourses} />
        </Col>
      </Row>
      <CourseProgressTable data={courseProgressData} />




      {/* Diğer içerikler buraya eklenebilir */ }
    </Container >
  );
};

export default HomePage;
