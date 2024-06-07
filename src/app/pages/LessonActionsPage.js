import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Tabs, Tab } from 'react-bootstrap';

const LessonActionsPage = () => {
  const { lessonId } = useParams();

  return (
    <Container className="mt-5">
      <Card className="bg-white">
        <Card.Body>
          <Tabs defaultActiveKey="content" id="lesson-actions-tabs">
            <Tab eventKey="content" title="Ders İçeriği">
              {/* Ders İçeriği bileşeni burada */}
              <p>Ders içeriği ile ilgili bilgiler burada olacak.</p>
            </Tab>
            <Tab eventKey="documents" title="Doküman">
              {/* Doküman bileşeni burada */}
              <p>Dokümanlar burada olacak.</p>
            </Tab>
            <Tab eventKey="video" title="Video">
              {/* Video bileşeni burada */}
              <p>Videolar burada olacak.</p>
            </Tab>
            <Tab eventKey="homework" title="Ödev">
              {/* Ödev bileşeni burada */}
              <p>Ödevler burada olacak.</p>
            </Tab>
            <Tab eventKey="quiz" title="Quiz">
              {/* Quiz bileşeni burada */}
              <p>Quizler burada olacak.</p>
            </Tab>
            <Tab eventKey="exam" title="Sınav">
              {/* Sınav bileşeni burada */}
              <p>Sınavlar burada olacak.</p>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LessonActionsPage;
