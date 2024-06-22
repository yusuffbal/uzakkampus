import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as forumActions from "../redux/forum/forumActions";
import * as courseActions from "../redux/course/courseActions";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { currentUser, forum, course } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
      forum: state.forum.entities,
      course: state.course.entities,

    }),
    shallowEqual
  );

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(forumActions.ForumByUserIdFetch(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(courseActions.CourseByUserIdFetch(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("forum, course: ",forum,course);
  }, [forum,course])
  

  const userInfo = {
    name: currentUser.name || 'John Doe',
    email: currentUser.email || 'john.doe@example.com',
    avatar: currentUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg', // Örnek avatar URL
    type: currentUser.type || 1, // Kullanıcı tipi: 1 - Öğrenci, 2 - Eğitmen, 3 - Sistem Yöneticisi
    courses: [
      { id: 1, title: 'React\'e Giriş', instructor: 'Jane Smith' },
      { id: 2, title: 'Gelişmiş JavaScript', instructor: 'Michael Johnson' },
      { id: 3, title: 'Web Geliştirme Temelleri', instructor: 'Emily Brown' }
    ],
    forums: [
      { id: 1, title: 'React Forumu', description: 'React ile ilgili tartışmalar ve öneriler' },
      { id: 2, title: 'JavaScript Tartışma Grubu', description: 'JavaScript konuları hakkında bilgi paylaşımı' },
      { id: 3, title: 'Web Geliştirme Sohbeti', description: 'Web geliştirme genel konuları üzerine sohbetler' }
    ]
  };

  // Kullanıcı tipine göre uygun başlık
  let profileTitle;
  switch (userInfo.type) {
    case 1:
      profileTitle = 'Öğrenci';
      break;
    case 2:
      profileTitle = 'Eğitmen';
      break;
    case 3:
      profileTitle = 'Sistem Yöneticisi';
      break;
    default:
      profileTitle = 'Profil';
      break;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="profile-card shadow mb-4">
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faUser} size="5x" className="avatar mb-3" />
              <Card.Title className="mb-2">{userInfo.name}</Card.Title>
              <Card.Text className="text-muted mb-4">{userInfo.email}</Card.Text>
              <Card.Text className="mb-3"><strong>{profileTitle}</strong></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Row>
            <Col>
              <Card className="courses-card shadow mb-4">
                <Card.Body>
                  <Card.Title className="text-center mb-4">Alınan Dersler</Card.Title>
                  <ListGroup variant="flush">
                    {course.map(course => (
                      <ListGroup.Item key={course.id} className="course-item">
                        <div>
                          <p className="mb-1"><strong>{course.courseName}</strong></p>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="forums-card shadow mb-4">
                <Card.Body>
                  <Card.Title className="text-center mb-4">Faaliyet Forumları</Card.Title>
                  <ListGroup variant="flush">
                    {forum.map(forum => (
                      <ListGroup.Item key={forum.id} className="forum-item">
                        <div>
                          <p className="mb-1"><strong>{forum.title}</strong></p>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
