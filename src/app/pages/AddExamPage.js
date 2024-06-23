import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as courseAction from '../redux/course/courseActions';
import * as examAction from '../redux/exam/examActions';

const examSchema = Yup.object().shape({
    examName: Yup.string().required('Sınav adı gereklidir'),
    examDescription: Yup.string().required('Açıklama gereklidir'),
    DateOfStart: Yup.date().required('Başlangıç tarihi gereklidir'),
    DateOfEnd: Yup.date().required('Bitiş tarihi gereklidir'),
    courseId: Yup.number().required('Ders seçimi gereklidir'),
    examType: Yup.number().required('Sınav tipi gereklidir')
});

const questionSchema = Yup.object().shape({
    examId: Yup.string().required('Sınav seçimi gereklidir'),
    answerText: Yup.string().required('Cevap metni gereklidir'),
    correct: Yup.string().required('Doğru cevap gereklidir'),
    Choice1: Yup.string().required('Yanlış cevap 1 gereklidir'),
    Choice2: Yup.string().required('Yanlış cevap 2 gereklidir'),
    Choice3: Yup.string().required('Yanlış cevap 3 gereklidir'),
    Choice4: Yup.string().required('Yanlış cevap 4 gereklidir')
});

function AddExamPage() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(courseAction.GetAllCourseFetch());
        dispatch(examAction.GetAllExamFetch());
    }, [dispatch]);

    const { courseList, examList } = useSelector(
        state => ({
            courseList: state.course.AllCourse,
            examList: state.exam.allExam
        })
    );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Sınav Oluştur</h2>
            <Formik
                initialValues={{
                    examName: '',
                    examDescription: '',
                    DateOfStart: '',
                    DateOfEnd: '',
                    courseId: 0,
                    examType: ''
                }}
                validationSchema={examSchema}
                onSubmit={(values) => {
                    dispatch(examAction.AddExam(values));
                }}
            >
                {({ errors, touched }) => (
                    <FormikForm>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formExamName">
                                    <Form.Label>Sınav Adı</Form.Label>
                                    <Field
                                        name="examName"
                                        type="text"
                                        className={`form-control ${errors.examName && touched.examName ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="examName" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formCourse">
                                    <Form.Label>Ders Seçimi</Form.Label>
                                    <Field
                                        name="courseId"
                                        as="select"
                                        placeholder="Ders Seçiniz"
                                        className={`form-control ${touched.courseId && errors.courseId ? 'is-invalid' : ''}`}
                                    >
                                        <option value="" disabled>Ders Seçiniz</option>
                                        {courseList.map((course) => (
                                            <option key={course.id} value={course.id}>{course.courseName}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="courseId" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formExamStartTime">
                                    <Form.Label>Başlangıç Tarihi</Form.Label>
                                    <Field
                                        name="DateOfStart"
                                        type="datetime-local"
                                        className={`form-control ${errors.DateOfStart && touched.DateOfStart ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="DateOfStart" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formExamEndTime">
                                    <Form.Label>Bitiş Tarihi</Form.Label>
                                    <Field
                                        name="DateOfEnd"
                                        type="datetime-local"
                                        className={`form-control ${errors.DateOfEnd && touched.DateOfEnd ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="DateOfEnd" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formExamDescription">
                                    <Form.Label>Açıklama</Form.Label>
                                    <Field
                                        name="examDescription"
                                        as="textarea"
                                        className={`form-control ${errors.examDescription && touched.examDescription ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="examDescription" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formExamType">
                                    <Form.Label>Sınav Tipi</Form.Label>
                                    <Field
                                        name="examType"
                                        as="select"
                                        className={`form-control ${errors.examType && touched.examType ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Sınav tipi seçiniz...</option>
                                        <option value="1">Vize</option>
                                        <option value="2">Final</option>
                                        <option value="3">Bütünleme</option>
                                    </Field>
                                    <ErrorMessage name="examType" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="primary" onClick={handleShow}>
                                Soru Ekle
                            </Button>

                            <Button variant="success" type="submit">
                                Sınavı Oluştur
                            </Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Soru Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            examId: '',  // Seçilen sınavın examId değeri
                            answerText: '',
                            correct: '',
                            Choice1: '',
                            Choice2: '',
                            Choice3: '',
                            Choice4: ''
                        }}
                        validationSchema={questionSchema}
                        onSubmit={(values) => {
                            dispatch(examAction.AddExamQuestion(values));
                            handleClose();
                        }}
                    >
                        {({ errors, touched }) => (
                            <FormikForm>
                                <Form.Group controlId="formExamId">
                                    <Form.Label>Sınav Seçimi</Form.Label>
                                    <Field
                                        name="examId"
                                        as="select"
                                        placeholder="Sınav Seçiniz"
                                        className={`form-control ${errors.examId && touched.examId ? 'is-invalid' : ''}`}
                                    >
                                        <option value="" disabled>Sınav seçiniz...</option>
                                        {examList.map((exam) => (
                                            <option key={exam.examId} value={exam.examId}>{exam.examName}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="examId" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formAnswerText">
                                    <Form.Label>Cevap Metni</Form.Label>
                                    <Field
                                        name="answerText"
                                        as="textarea"
                                        className={`form-control ${errors.answerText && touched.answerText ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="answerText" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formCorrectAnswer">
                                    <Form.Label>Doğru Cevap</Form.Label>
                                    <Field
                                        name="correct"
                                        type="text"
                                        className={`form-control ${errors.correct && touched.correct ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="correct" component="div" className="invalid-feedback" />
                                </Form.Group>

                               

                                <Form.Group controlId="formWrongAnswer1">
                                    <Form.Label>Yanlış Cevap 1</Form.Label>
                                    <Field
                                        name="Choice1"
                                        type="text"
                                        className={`form-control ${errors.Choice1 && touched.Choice1 ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="Choice1" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formWrongAnswer2">
                                    <Form.Label>Yanlış Cevap 2</Form.Label>
                                    <Field
                                        name="Choice2"
                                        type="text"
                                        className={`form-control ${errors.Choice2 && touched.Choice2 ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="Choice2" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formWrongAnswer3">
                                    <Form.Label>Yanlış Cevap 3</Form.Label>
                                    <Field
                                        name="Choice3"
                                        type="text"
                                        className={`form-control ${errors.Choice3 && touched.Choice3 ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="Choice3" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formWrongAnswer4">
                                    <Form.Label>Yanlış Cevap 4</Form.Label>
                                    <Field
                                        name="Choice4"
                                        type="text"
                                        className={`form-control ${errors.Choice4 && touched.Choice4 ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="Choice4" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <div className="d-flex justify-content-end mt-4">
                                        
                                    <Button variant="primary" type="submit">
                                        Soruyu Ekle
                                    </Button>
                                </div>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default AddExamPage;

