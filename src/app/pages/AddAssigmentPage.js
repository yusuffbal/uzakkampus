import { ErrorMessage, Field, Formik } from 'formik';
import React, { useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as courseAction from '../redux/course/courseActions';

function AddAssigmentPage() {
    const dispatch = useDispatch();
    const initialValues = {
        name: '',
        title: '',
        courseId: 0,
        description: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Ders adı zorunludur.'),
        title: Yup.string().required('Başlık zorunludur.'),
        courseId: Yup.number().required('Ders seçmek zorunludur.'),
        description: Yup.string().required('Açıklama zorunludur.'),
    });

    useEffect(() => {
        dispatch(courseAction.GetAllCourseFetch());
    }, []);

    const { courseList } = useSelector(
        state => ({
            courseList: state.course.AllCourse,
        }),
        shallowEqual
    );

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(courseAction.CreateAssigment(values));
        console.log(values);    
        setSubmitting(false);
        resetForm();
    };

  return (
<Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Ödev Oluştur</h2>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleSubmit, touched, errors }) => (
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
                                <Form.Group controlId="title" className="mb-3">
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Başlık"
                                        className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
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
                                            <option key={course.id} value={course.id}>{course.courseName} </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="courseId" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="description" className="mb-3">
                                    <Field
                                        name="description"
                                        type="text"
                                        rows={1}
                                        as="textarea"
                                        placeholder="Açıklama"
                                        className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" disabled={isSubmitting}>
                            Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>  )
}

export default AddAssigmentPage