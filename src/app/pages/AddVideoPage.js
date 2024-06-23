import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as courseAction from '../redux/course/courseActions';

const AddVideoPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseAction.GetAllCourseFetch());
    }, [dispatch]);

   

    const { courseList } = useSelector(
        state => ({
            courseList: state.course.AllCourse,
        }),
        shallowEqual
    );

    const initialValues = {
        courseId: '',
        name: '',
        video: ''
    };

    const validationSchema = Yup.object({
        courseId: Yup.number().required('Ders seçmek zorunludur.'),
        name: Yup.string().required('İsim zorunludur.'),
        video: Yup.string().url('Geçerli bir URL giriniz.').required('Video URL zorunludur.')
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log(values);  
        dispatch(courseAction.AddVideo(values));  
        setSubmitting(false);
        resetForm();
    };

    return (
        <Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Video Ekle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleSubmit, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
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
                            <Col md={6}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="İsim"
                                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="video" className="mb-3">
                                    <Field
                                        name="video"
                                        type="text"
                                        placeholder="Video URL"
                                        className={`form-control ${touched.video && errors.video ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="video" component="div" className="invalid-feedback" />
                                </Form.Group>
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
};

export default AddVideoPage;
