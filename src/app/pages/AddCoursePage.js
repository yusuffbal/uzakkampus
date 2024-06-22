import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as userAction from '../redux/auth/authActions';
import * as courseAction from '../redux/course/courseActions';


const AddCoursePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction.getTeacherList());
    }, [dispatch]);

    const { teacherList } = useSelector(
        state => ({
            teacherList: state.auth.teacherList,
        }),
        shallowEqual
    );

    const initialValues = {
        name: '',
        title: '',
        teacherId: '',
        credit: '',
        passinggrade: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Ders adı zorunludur.'),
        title: Yup.string().required('Başlık zorunludur.'),
        teacherId: Yup.number().required('Eğitmen seçmek zorunludur.'),
        credit: Yup.number().typeError('Kredi sayısı geçerli bir sayı olmalıdır.').required('Kredi sayısı zorunludur.'),
        passinggrade: Yup.number().typeError('Geçme notu geçerli bir sayı olmalıdır.').required('Geçme notu zorunludur.')
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(courseAction.CreateCourse(values));
        console.log(values);    
        setSubmitting(false);
        resetForm();
    };

    return (
        <Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Ders Ekle</h2>
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
                                        placeholder="Ders Adı"
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
                                <Form.Group controlId="teacherId" className="mb-3">
                                    <Field
                                        name="teacherId"
                                        as="select"
                                        placeholder="Eğitmen Seçiniz"
                                        className={`form-control ${touched.teacherId && errors.teacherId ? 'is-invalid' : ''}`}
                                    >
                                        <option value="" disabled>Eğitmen Seçiniz</option>
                                        {teacherList.map((teacher) => (
                                            <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="teacherId" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="credit" className="mb-3">
                                    <Field
                                        name="credit"
                                        type="text"
                                        placeholder="Kredi"
                                        className={`form-control ${touched.credit && errors.credit ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="credit" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="passinggrade" className="mb-3">
                                    <Field
                                        name="passinggrade"
                                        type="text"
                                        placeholder="Geçme Notu"
                                        className={`form-control ${touched.passinggrade && errors.passinggrade ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="passinggrade" component="div" className="invalid-feedback" />
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

export default AddCoursePage;
