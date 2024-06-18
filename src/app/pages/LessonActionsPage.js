import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ListGroup, Button, Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const LessonActionsPage = () => {
  const { lessonId } = useParams();
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (url, title) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setShow(true);
  };

  return (
    <Container className="mt-5">
      <Card className="bg-white">
        <Card.Body>
          <Tabs defaultActiveKey="content" id="lesson-actions-tabs" className="mb-3">
            <Tab eventKey="content" title="Ders İçeriği">
              <h4>Ders İçeriği</h4>
              <p>Ders içeriği ile ilgili bilgiler burada olacak.</p>
              <ListGroup>
                <ListGroup.Item>Giriş ve Tanıtım</ListGroup.Item>
                <ListGroup.Item>Konu 1: Temel Kavramlar</ListGroup.Item>
                <ListGroup.Item>Konu 2: İleri Seviye Teknikler</ListGroup.Item>
                <ListGroup.Item>Konu 3: Uygulamalı Örnekler</ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="documents" title="Doküman">
              <h4>Dokümanlar</h4>
              <ListGroup>
                <ListGroup.Item>
                  <a href="#">Ders Notları - Bölüm 1</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#">Ders Notları - Bölüm 2</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#">Ders Notları - Bölüm 3</a>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="video" title="Video">
              <h4>Videolar</h4>
              <ListGroup>
                <ListGroup.Item>
                  <Button variant="link" onClick={() => handleShow('https://www.izlesene.com/video/irem-derici-milyonda-bir/10833184', 'Video 1 Title')}>Video 1</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="link" onClick={() => handleShow('https://www.youtube.com/watch?v=fkdwfwR_qrI', 'Video 2 Title')}>Video 2</Button>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="homework" title="Ödev">
              <h4>Ödevler</h4>
              <ListGroup>
                <ListGroup.Item>
                  Ödev 1: Proje Ödevi
                  <Button variant="primary" className="float-end">Gönder</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  Ödev 2: Araştırma Ödevi
                  <Button variant="primary" className="float-end">Gönder</Button>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="quiz" title="Quiz">
              <h4>Quizler</h4>
              <ListGroup>
                <ListGroup.Item>
                  Quiz 1: Temel Bilgiler
                  <Button variant="primary" className="float-end">Başlat</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quiz 2: İleri Seviye
                  <Button variant="primary" className="float-end">Başlat</Button>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="exam" title="Sınav">
              <h4>Sınavlar</h4>
              <ListGroup>
                <ListGroup.Item>
                  Ara Sınav
                </ListGroup.Item>
                <ListGroup.Item>
                  Final Sınavı
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>{videoTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer url={videoUrl} controls width="100%" />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default LessonActionsPage;
