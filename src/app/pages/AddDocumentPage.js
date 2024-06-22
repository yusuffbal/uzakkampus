import { ErrorMessage, Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as courseAction from '../redux/course/courseActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

function AddDocumentPage() {
    const dispatch = useDispatch();
    const initialValues = {
        name: '',
        courseId: 0,
        document: '', // Base64 formatındaki dosya için alan
    };

    const [fileName, setFileName] = useState('');

    const validationSchema = Yup.object({
        name: Yup.string().required('Ders adı zorunludur.'),
        courseId: Yup.number().required('Ders seçmek zorunludur.'),
        document: Yup.string().required('Dosya yüklemek zorunludur.'), // Dosya alanını doğrula
    });

    useEffect(() => {
        dispatch(courseAction.GetAllCourseFetch());
    }, [dispatch]);

    const { courseList } = useSelector(
        state => ({
            courseList: state.course.AllCourse,
        }),
        shallowEqual
    );

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFieldValue('document', reader.result); // Dosyayı Base64 formatında kaydet
            setFileName(file.name); // Dosya adını ayarla
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(courseAction.AddDocument(values));
        console.log(values);
        setSubmitting(false);
        resetForm();
        setFileName(''); // Dosya adını sıfırla
    };

    return (
        <Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Döküman Yükle</h2>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleSubmit, setFieldValue, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Ödev Adı"
                                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="courseId" className="mb-3">
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
                            <Col md={12}>
                                <Card
                                    className={`text-center mb-3 ${touched.document && errors.document ? 'border-danger' : ''}`}
                                    onClick={() => document.getElementById('fileInput').click()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faFileUpload} style={{ fontSize: '4rem', color: '#007bff' }} />
                                        <Card.Title className="mt-2">Dosya Yükle</Card.Title>
                                        <Card.Text>{fileName && `Yüklenen Dosya: ${fileName}`}</Card.Text>
                                        <input
                                            id="fileInput"
                                            name="document"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(event) => handleFileChange(event, setFieldValue)}
                                        />
                                        <ErrorMessage name="document" component="div" className="invalid-feedback" />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Button type="submit" disabled={isSubmitting}>
                            Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default AddDocumentPage;
