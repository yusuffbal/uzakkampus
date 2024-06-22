import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ListGroup, Button, Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as courseActions from "../redux/course/courseActions";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';


const LessonActionsPage = () => {
  const { courseId } = useParams();
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const dispatch = useDispatch();

  const { course } = useSelector(
    state => ({
      course: state.course.courseDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (courseId) {
      dispatch(courseActions.CourseById(courseId));
    }
  }, [courseId]);

  const handleClose = () => setShow(false);
  const handleShow = (url, title) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setShow(true);
  };

  const downloadPdfFromBase64 = (base64Data, fileName) => {
    // Base64 verisini decod eder
    const byteCharacters = atob(base64Data);

    // Uint8Array türünde bir dizi oluşturur
    const byteArray = new Uint8Array(byteCharacters.length);

    // Her karakteri diziye ekler
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Blob oluşturur
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Dosyayı indirir
    saveAs(blob, fileName);
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
                {/* Ders içeriği listesi buraya gelecek */}
              </ListGroup>
            </Tab>
            <Tab eventKey="documents" title="Doküman">
              <h4>Dokümanlar</h4>
              <ListGroup>
                {course && course.courseDocument && course.courseDocument.map((document, index) => (
                  <ListGroup.Item key={index}>
                    <Button variant="link" onClick={() => downloadPdfFromBase64(document.document, document.name)}>{document.name}</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>
            <Tab eventKey="video" title="Video">
              <h4>Videolar</h4>
              <ListGroup>
                {course && course.courseVideo && course.courseVideo.map((video, index) => (
                  <ListGroup.Item key={index}>
                    <Button variant="link" onClick={() => handleShow(video.video, video.name)}>{video.name}</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>
            <Tab eventKey="homework" title="Ödev">
              <h4>Ödevler</h4>
              <ListGroup>
                {course && course.courseAssigment && course.courseAssigment.map((assignment, index) => (
                  <ListGroup.Item key={index}>
                    {assignment.title}
                    <Button variant="primary" className="float-end">Gönder</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>
            <Tab eventKey="quiz" title="Quiz">
              <h4>Quizler</h4>
              <ListGroup>
                {course && course.courseQuiz && course.courseQuiz.map((quiz, index) => (
                  <ListGroup.Item key={index}>
                    {quiz.name}
                    <Button variant="primary" className="float-end">Başlat</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>
            <Tab eventKey="exam" title="Sınav">
              <h4>Sınavlar</h4>
              <ListGroup>
                {course && course.courseExams && course.courseExams.map((exam, index) => (
                  <ListGroup.Item key={index}>
                    {exam.name}
                  </ListGroup.Item>
                ))}
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
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default LessonActionsPage;
