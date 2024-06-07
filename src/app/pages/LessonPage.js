import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // useHistory import edildi
import CardComponent from '../components/lessonspage/CardComponent';

// Örnek ders verileri
const lessons = [
  { id: 1, name: 'Ders 1', description: 'Ders 1 Açıklaması' },
  { id: 2, name: 'Ders 2', description: 'Ders 2 Açıklaması' },
  { id: 3, name: 'Ders 3', description: 'Ders 3 Açıklaması' },
  { id: 4, name: 'Ders 4', description: 'Ders 4 Açıklaması' },
  { id: 5, name: 'Ders 5', description: 'Ders 5 Açıklaması' },
];

const LessonPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLessons, setFilteredLessons] = useState(lessons);
  const history = useHistory(); // useHistory kullanımı

  const handleDetail = () => {
    setShowModal(true);
    // Dersin detaylarını yükleme işlemleri buraya eklenebilir
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAction = (lessonId) => {
    history.push(`/courses/${lessonId}/actions`);
  };

  const handleSearch = () => {
    setFilteredLessons(lessons.filter(lesson => 
      lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Card className="mt-4 bg-white p-3">
        <Card.Body>
          <Form className="d-flex mb-3">
            <Form.Control
              type="text"
              placeholder="Ders arayın..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="primary" onClick={handleSearch} className="ms-2">
              Ara
            </Button>
          </Form>
          <Row xs={1} sm={2} md={3}>
            {filteredLessons.map((lesson) => (
              <Col key={lesson.id}>
                <CardComponent
                  lessonName={lesson.name}
                  description={lesson.description}
                  onDetail={handleDetail}
                  onAction={() => handleAction(lesson.id)} // lessonId ile handleAction fonksiyonu çağrıldı
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Detaylar Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ders Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dersin genel bilgileri buraya gelebilir.
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
