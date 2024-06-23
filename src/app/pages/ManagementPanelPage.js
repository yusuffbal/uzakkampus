import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaUserPlus, FaComments, FaTasks, FaFileAlt, FaVideo, FaClipboard, FaQuestion, FaUserGraduate } from 'react-icons/fa';

const ManagementPanel = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Link to="/add-course" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaBook size={50} className="mb-3" />
                <Card.Title>Ders Ekle</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-student-to-course" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaUserPlus size={50} className="mb-3" />
                <Card.Title>Derse Katılımcı Ekle</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-forum" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaComments size={50} className="mb-3" />
                <Card.Title>Forum Aç</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-assigment" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaTasks size={50} className="mb-3" />
                <Card.Title>Ödev Ver</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-document" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaFileAlt size={50} className="mb-3" />
                <Card.Title>Ders Dokümanı Ekle</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-video" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaVideo size={50} className="mb-3" />
                <Card.Title>Ders Videosu Ekle</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-exam" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaClipboard size={50} className="mb-3" />
                <Card.Title>Sınav Oluştur</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/create-quiz" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaQuestion size={50} className="mb-3" />
                <Card.Title>Quiz Oluştur</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/add-student" className="text-decoration-none">
            <Card className="shadow mb-4 text-center panel-card">
              <Card.Body>
                <FaUserGraduate size={50} className="mb-3" />
                <Card.Title>Öğrenci Ekle</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagementPanel;
