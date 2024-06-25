import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as courseActions from "../redux/course/courseActions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { saveAs } from 'file-saver';

const LessonActionsPage = () => {
  const { courseId } = useParams();
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [fileBase64, setFileBase64] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null); // Eklenen kısım
  const dispatch = useDispatch();

  const { course, currentUser } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
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

  const handleAssignmentClose = () => setShowAssignmentModal(false);
  const handleAssignmentShow = (assignmentId) => {
    setSelectedAssignmentId(assignmentId); // Eklenen kısım
    setShowAssignmentModal(true);
  };

  const downloadPdfFromBase64 = (base64Data, fileName) => {
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, fileName);
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result.split(',')[1]);
      setFieldValue('file', file);
    };
    reader.readAsDataURL(file);
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
                    <Button variant="primary" className="float-end" onClick={() => handleAssignmentShow(assignment.id)}>Gönder</Button>
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

      <Modal show={showAssignmentModal} onHide={handleAssignmentClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ödev Gönder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ file: null }}
            validationSchema={Yup.object({
              file: Yup.mixed().required('Bir dosya yüklemelisiniz.')
            })}
            onSubmit={(values, { setSubmitting }) => {
              const assigmentData = {
                assigmentDocument: fileBase64,
                assigmentId: selectedAssignmentId,
                studentId:currentUser.id
            };
            dispatch(courseActions.UploadAssigment(assigmentData));
              setSubmitting(false);
              handleAssignmentClose();
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Dosya Yükle</Form.Label>
                  <Form.Control type="file" onChange={(event) => handleFileChange(event, setFieldValue)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Gönder
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default LessonActionsPage;
