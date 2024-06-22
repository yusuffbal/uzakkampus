import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CardComponent from '../components/lessonspage/CardComponent';
import * as courseActions from "../redux/course/courseActions";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const LessonPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const { currentUser, course } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
      course: state.course.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(courseActions.CourseByUserIdFetch(currentUser.id));
    }
  }, [currentUser]);

  const handleDetail = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAction = (courseId) => {
    history.push(`/courses/${courseId}/actions`);
  };

  return (
    <Container>
      <Card className="mt-4 bg-white p-3">
        <Card.Body>
          <Row xs={1} sm={2} md={3}>
            {course && Array.isArray(course) && course.map((singleCourse) => (
              <Col key={singleCourse.id}>
                <CardComponent
                  lessonName={singleCourse.courseName}
                  description={singleCourse.courseTitle}
                  onDetail={() => handleDetail(singleCourse)}
                  onAction={() => handleAction(singleCourse.id)}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ders Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <div>
              <p><strong>Ders Adı:</strong> {selectedCourse.courseName}</p>
              <p><strong>Ders Başlığı:</strong> {selectedCourse.courseTitle}</p>
              {/* Diğer bilgileri buraya ekleyebilirsiniz */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LessonPage;
